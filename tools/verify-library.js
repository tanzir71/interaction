/* End-to-end checks for the library shell, preview lifecycle and new collection.
   Install Playwright as a development tool, then:
   node tools/verify-library.js http://127.0.0.1:4173 [browser-CDP-url]
   PLAYWRIGHT_MODULE may point to an existing Playwright installation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const expectedCount = 343 + 4 + JSON.parse(fs.readFileSync('DRAMS_CATALOG.json','utf8')).items.length;
const expectedNewCount = 16 + 4 + 52;

(async () => {
  const browser = process.argv[3] ? await chromium.connectOverCDP(process.argv[3]) : await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
  const context = await browser.newContext({viewport:{width:1440,height:1000}, permissions:['clipboard-read','clipboard-write']});
  const page = await context.newPage(), errors=[];
  const dialog = page.getByRole('dialog');
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type()==='error' && message.text().includes('[INTRX]')) errors.push(message.text()); });
  const url = process.argv[2] || 'http://127.0.0.1:4173';
  fs.mkdirSync('.artifacts',{recursive:true});
  let checks=0;
  const check=(condition,label)=>{assert.ok(condition,label);checks++;};
  const open=async id=>{
    await page.evaluate(id=>{location.hash=id;},id);
    await page.locator('.modal.open').waitFor();
    await page.waitForFunction(id=>document.querySelector('.modal-title').textContent===INTRX.demos.find(d=>d.id===id).title,id);
    // The modal enters with a small scale animation. Measure its settled layout.
    await page.locator('.modal').evaluate(async el=>Promise.all(el.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
  };
  const close=async()=>{await page.locator('.modal-close').click();};
  try {
    await page.goto(url,{waitUntil:'networkidle'});
    check(await page.locator('#cards > .tile').count()===expectedCount,expectedCount+' cards');
    check(await page.locator('.tile-details').count()===expectedCount,'Every preview has a details button');
    await page.screenshot({path:'.artifacts/library-desktop.png'});
    await page.locator('[data-filter="drams"]').click();
    check(await page.locator('.tile:not(.hidden)').count()===52,'DRAMS filter exposes the complete collection');
    check(await page.locator('.tile:not(.hidden)').first().getAttribute('id')==='drams-001','DRAMS catalog stays in source order');
    await page.getByRole('button',{name:'New additions',exact:false}).click();
    check(await page.locator('.tile:not(.hidden)').count()===expectedNewCount,'New additions filter');
    await page.getByRole('searchbox').fill('react bits dot');
    check(await page.locator('.tile:not(.hidden)').count()===1,'Multi-word source search');
    await page.getByRole('searchbox').fill('no-such-pattern-xyz');
    check(await page.locator('#empty-state').isVisible(),'Search empty state');
    await page.locator('#clear-filters').click();
    check(await page.locator('.tile:not(.hidden)').count()===expectedCount,'Clear restores library');

    // Boot the complete registry through the real intersection observer.
    const all=await page.evaluate(async()=>{
      const results=[];document.documentElement.style.scrollBehavior='auto';
      for(const demo of INTRX.demos){
        demo._card.scrollIntoView({behavior:'instant',block:'center'});
        for(let i=0;i<30&&!demo._card.querySelector('.demo-stage > *');i++)await new Promise(r=>setTimeout(r,20));
        results.push({id:demo.id,booted:!!demo._card.querySelector('.demo-stage > *'),failed:demo._card.textContent.includes('demo failed to boot')});
      }
      return results;
    });
    check(all.every(d=>d.booted&&!d.failed),'Every registered preview boots: '+JSON.stringify(all.filter(d=>!d.booted||d.failed)));
    console.log('PASS: all '+expectedCount+' previews boot');

    // Start interaction checks on a fresh page so old third-party demos do not
    // retain their own global listeners after the exhaustive boot audit.
    await page.goto(url,{waitUntil:'networkidle'});

    const showcase=await page.evaluate(()=>INTRX.demos.filter(d=>['Interactive Showcase','Framer Collection','DRAMS'].includes(d.cat)).map(d=>({id:d.id,rootClass:d.rootClass,cat:d.cat})));
    const exports=[];
    for(const d of showcase){
      await open(d.id);
      check(await page.locator('.source-link').count()===1,d.id+' source credit');
      const root=page.locator('.modal-preview .'+d.rootClass);
      check(Math.abs((await root.boundingBox()).height-320)<2,d.id+' native height');
      await page.getByRole('tab',{name:'Code',exact:true}).click();
      const code=await page.locator('.pane-code pre').textContent();
      check(code.startsWith('<!DOCTYPE html>'),d.id+' standalone document');
      if(d.cat==='DRAMS')check(code.includes('DRAMS by 1042 Studio')&&!/<iframe/i.test(code),d.id+' native export with creator credit');
      exports.push({id:d.id,code});
      await close();
    }
    // Photographic and font-dependent components must export their local assets.
    const photographicIds=['scroll-clip-morph','scroll-video-scrubber','image-trail','tilt-card'];
    const originalHardwareIds=await page.evaluate(()=>INTRX.demos.filter(d=>d.cat==='Skeuomorph').map(d=>d.id));
    for(const id of [...new Set([...photographicIds,'text-blur-focus',...originalHardwareIds])]){
      await open(id);
      await page.getByRole('tab',{name:'Code',exact:true}).click();
      const code=await page.locator('.pane-code pre').textContent();
      check(!code.includes('{{asset:'),id+' export resolves asset references');
      const usesBundledFonts=await page.evaluate(id=>/Inter|Manrope|Newsreader|--font-ui|--font-editorial/.test(INTRX.demos.find(d=>d.id===id).css),id);
      check(usesBundledFonts?code.includes('data:font/woff2;base64,'):code.includes('"Segoe UI",Arial,sans-serif'),id+' export preserves its selected font or system fallback');
      if(photographicIds.includes(id))check(code.includes('data:image/webp;base64,'),id+' export embeds photography');
      exports.push({id,code});await close();
    }
    // Execute the actual code-tab exports offline, outside the library runtime.
    const standalone=await context.newPage();
    const exportErrors=[];standalone.on('pageerror',e=>exportErrors.push(e.message));
    await standalone.route('**/*',route=>route.abort());
    for(const d of exports){
      await standalone.goto('about:blank');
      await standalone.setContent(d.code);
      await standalone.evaluate(()=>document.fonts.ready);
      await standalone.waitForTimeout(80);
      check(await standalone.locator('.demo-stage > div').count()===1,d.id+' offline export renders');
      check(await standalone.locator('img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0)),d.id+' offline images load');
    }
    check(exportErrors.length===0,'Offline exports have no errors: '+exportErrors.join(';'));
    await standalone.close();
    console.log('PASS: '+exports.length+' standalone exports, embedded assets and source links');

    await page.goto(url,{waitUntil:'networkidle'});

    await open('showcase-dot-field');
    await page.locator('.modal-preview [tabindex="0"]').press('ArrowRight');
    check(await page.locator('.modal-preview [data-interacted=true]').count()===1,'Canvas keyboard input');
    await page.locator('.modal-preview canvas').click({position:{x:100,y:100}});
    check(await page.locator('.modal.open').count()===1,'Demo interaction preserves dialog');
    await page.getByRole('tab',{name:'LLM Prompt',exact:true}).click();
    await page.getByRole('button',{name:'Copy prompt',exact:true}).click();
    const copied=await page.evaluate(()=>navigator.clipboard.readText());
    check(copied.includes('Inertial Dot Field'),'Prompt clipboard contains expected text');
    await page.getByRole('tab',{name:'LLM Prompt',exact:true}).press('ArrowLeft');
    check(await page.getByRole('tab',{name:'Code',exact:true}).getAttribute('aria-selected')==='true','Keyboard tab navigation');
    await page.locator('.modal-close').focus();await page.keyboard.press('Shift+Tab');
    check(await page.evaluate(()=>document.querySelector('.modal').contains(document.activeElement)),'Modal focus trap');
    await page.locator('.modal-reset').click();
    check(await page.locator('.modal-preview [data-interacted=true]').count()===0,'Reset creates fresh state');
    await close();
    check(await page.evaluate(()=>!document.querySelector('.layout').inert),'Closing restores page interaction');
    const stopped=await page.evaluate(async()=>{
      const stage=document.querySelector('.modal-preview .demo-stage');let cleanup=0,callbacks=0;
      const runtime=INTRX.createRuntime(stage);runtime.cleanup=()=>cleanup++;
      runtime.requestAnimationFrame(()=>callbacks++);runtime.setTimeout(()=>callbacks++,10);runtime.setInterval(()=>callbacks++,10);
      runtime.dispose();runtime.dispose();await new Promise(resolve=>setTimeout(resolve,40));
      return cleanup===1&&callbacks===0;
    });
    check(stopped,'Preview disposal calls cleanup');

    await open('showcase-circular-gallery');
    await dialog.getByRole('button',{name:'Next artwork'}).click();
    check(await page.locator('.modal-preview [data-index="1"]').count()===1,'Gallery next');
    const track=page.locator('.modal-preview [class$="-track"]'),box=await track.boundingBox();
    await page.mouse.move(box.x+box.width*.6,box.y+90);await page.mouse.down();await page.mouse.move(box.x+box.width*.6-150,box.y+90,{steps:10});await page.mouse.up();
    check(await page.locator('.modal-preview [data-index="2"]').count()===1,'Gallery drag');
    await close();
    await open('showcase-card-swap');await dialog.getByRole('button',{name:'Next card'}).click();
    check(await page.locator('.modal-preview [data-index="1"]').count()===1,'Card stack next');await close();
    await open('showcase-elastic-slider');await dialog.getByRole('slider',{name:'Volume'}).fill('90');
    check(await page.locator('.modal-preview output').textContent()==='90','Elastic slider native input');await close();
    await open('showcase-mask-reveal');await dialog.getByRole('button',{name:'Reveal the hidden message'}).click();
    check(await dialog.getByRole('button',{name:'Reveal the hidden message'}).getAttribute('aria-pressed')==='true','Mask expand');await close();
    await open('showcase-converging-paths');
    await page.locator('.modal-preview [tabindex]').evaluate(el=>{el.scrollTop=el.scrollHeight;});
    await page.waitForFunction(()=>document.querySelector('.modal-preview [data-progress="1.000"]'));
    check(await page.locator('.modal-preview [class$="-value"]').textContent()==='100%','Path drawing follows scroll');await close();
    await open('showcase-tracing-story');await page.locator('.modal-preview [tabindex]').evaluate(el=>{el.scrollTop=el.scrollHeight;});
    await page.waitForFunction(()=>document.querySelector('.modal-preview [data-chapter="2"]'));
    check(await page.locator('.modal-preview strong').textContent()==='Respond.','Sticky story tracks chapter');await close();
    console.log('PASS: new pointer, drag, scroll and keyboard interactions');

    await page.goto(url,{waitUntil:'networkidle'});

    for(const id of ['css3d-isometric-hover','btn-border-beam','input-float-label','lenis-smooth-scroll','slider-stack-deck']){
      await open(id);const h=await page.locator('.modal-preview .demo-stage > *').boundingBox();
      check(Math.abs(h.height-320)<2,id+' native 320px layout');
      await page.screenshot({path:'.artifacts/'+id+'.png'});await close();
    }
    await open('lenis-smooth-scroll');
    await page.locator('.modal-preview .d-smooth-viewport').hover();await page.mouse.wheel(0,220);await page.waitForTimeout(350);
    check(await page.locator('.modal-preview .d-smooth-viewport').evaluate(el=>el.scrollTop)>0,'Lenis scrolls inside its viewport');
    check(await page.locator('.modal-preview .d-lenis').count()===1,'Lenis preserves root styling after scroll');await close();
    await open('input-float-label');const email=page.locator('.modal-preview input');await email.fill('hello@example.com');await email.press('Tab');
    check(await page.locator('.modal-preview [data-floated="true"]').count()===1,'Filled input label stays raised');
    check(await page.evaluate(()=>{const input=document.querySelector('.modal-preview input');return document.querySelectorAll('[id="'+input.id+'"]').length===1&&input.labels.length===1;}),'Input ids and labels are instance-safe');await close();
    await open('slider-stack-deck');
    for(let i=0;i<6;i++){await page.locator('.modal-preview .d-deck-keep').click();await page.waitForTimeout(470);}
    check(await page.locator('.modal-preview .d-stack-deck').getAttribute('data-dismissed')==='6','Legacy deck cycles beyond one full queue');
    check(await page.locator('.modal-preview [data-depth="0"]').evaluate(el=>getComputedStyle(el).opacity==='1'),'Recycled card has no stale flyout animation');await close();

    await page.emulateMedia({reducedMotion:'reduce'});await open('showcase-dot-field');
    const first=await page.locator('.modal-preview canvas').evaluate(c=>c.toDataURL());await page.waitForTimeout(100);
    check(first===await page.locator('.modal-preview canvas').evaluate(c=>c.toDataURL()),'Reduced motion is static');
    await page.locator('.modal-preview [tabindex="0"]').press('ArrowRight');
    check(first!==await page.locator('.modal-preview canvas').evaluate(c=>c.toDataURL()),'Reduced motion still responds to keyboard');await close();
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.setViewportSize({width:390,height:844});await page.goto(url,{waitUntil:'networkidle'});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile has no horizontal overflow');
    await page.locator('#nav-toggle').click();await page.getByRole('searchbox').fill('elastic');
    check(await page.locator('.tile:not(.hidden)').count()>0,'Mobile search');
    await page.locator('#nav a[data-id="showcase-elastic-slider"]').click();
    check(await page.locator('.modal.open').count()===1,'Mobile search opens matching details');
    check(await page.locator('#nav-toggle').getAttribute('aria-expanded')==='false','Mobile drawer closes on selection');await close();
    await page.keyboard.press('Control+k');
    check(await page.getByRole('searchbox').evaluate(el=>el===document.activeElement),'Mobile keyboard shortcut opens search');
    await page.getByRole('searchbox').fill('');await page.keyboard.press('Escape');
    await page.locator('.sidebar').evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished.catch(()=>{}))));
    await page.screenshot({path:'.artifacts/library-mobile.png'});
    check(errors.length===0,'No runtime errors: '+errors.join('; '));
    fs.writeFileSync('.artifacts/verification.json',JSON.stringify({checks,previews:all.length,exports:exports.length,errors},null,2));
    console.log('PASS: '+checks+' checks, '+all.length+' previews, '+exports.length+' offline code exports; desktop + mobile screenshots saved.');
  } finally { await context.close();await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
