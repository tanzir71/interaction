/* Routed-shell, complete lazy-preview coverage, and offline export checks. */
const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {demos}=require('./load-registry')();
(async()=>{
 const browser=process.argv[3]?await chromium.connectOverCDP(process.argv[3]):await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&m.text().includes('[INTRX]'))errors.push(m.text());});
 const url=(process.argv[2]||'http://127.0.0.1:4173').replace(/\/$/,''),exports=[];let checks=0;
 const check=(condition,label)=>{assert.ok(condition,label);checks++;};fs.mkdirSync('.artifacts',{recursive:true});
 const route=async hash=>{await page.evaluate(hash=>INTRX.router.go(hash),hash);await page.waitForFunction(hash=>INTRX.router.current===hash,hash);};
 const open=async id=>{await route('#/c/'+id);await page.waitForFunction(id=>document.querySelector('.detail-stage')?._ctx?.mode==='full'&&document.querySelector('.detail-stage').dataset.stage===id,id);};
 const library=async()=>{await route('#/library');await page.locator('#library-grid').waitFor();};
 const showAll=async()=>{while(await page.locator('#show-more').isVisible())await page.locator('#show-more').click();};
 try{
  await page.goto(url+'/#/',{waitUntil:'networkidle'});
  check(await page.evaluate(()=>INTRX.catalog.length)===demos.length,'Catalog covers every demo');
  check(await page.locator('.tile').count()===12,'Home has two featured sections');
  check(!await page.locator('script[src*="gsap"],script[src*="lenis"],script[src*="demo-assets"]').count(),'Home defers animation libraries and portable assets');
  await page.screenshot({path:'.artifacts/library-home-desktop.png'});
  await library();check(await page.locator('#library-grid>.tile').count()===Math.min(12,demos.length),'Twelve-item batches');
  await page.locator('#show-more').click();check(await page.locator('#library-grid>.tile').count()===24,'Show more');
  await page.locator('[data-trigger="hover"]').click();check(Number(await page.locator('#library-count').textContent())===demos.filter(d=>d.trigger==='hover').length,'Registry gesture counts');
  await page.locator('[data-trigger="all"]').click();await page.locator('#sort-order').selectOption('az');
  check((await page.locator('.tile-details').first().textContent()).includes([...demos].sort((a,b)=>a.title.localeCompare(b.title))[0].title),'Alphabetical sort');
  await page.locator('[data-density="rows"]').click();check(await page.locator('#library-grid').getAttribute('data-density')==='rows','Rows density');
  await route('#/library/drams');await showAll();check(await page.locator('.tile').count()===demos.filter(d=>d.cat==='DRAMS').length,'Collection route and batching');
  await route('#/new');check(Number(await page.locator('#library-count').textContent())===await page.evaluate(()=>INTRX.catalog.filter(d=>d.isNew).length),'Computed new count');
  await page.keyboard.press('Control+k');const search=page.getByRole('dialog',{name:'Search interactions'}).getByRole('combobox');await search.fill('elastc');
  check((await page.locator('#palette-results').textContent()).includes('Elastic Tabs'),'Fuzzy search');
  await search.press('ArrowDown');check(await search.getAttribute('aria-activedescendant')==='palette-option-1','Palette arrow navigation');
  await search.fill('no-such-component-zzzzzz');check(await page.locator('.palette-empty').isVisible(),'Palette empty state');
  await search.fill('elastic tabs');await search.press('Enter');await page.waitForFunction(()=>location.hash==='#/c/elastic-tabs'&&!!document.querySelector('.detail-stage')?._runtime);
  check(await page.getByRole('dialog').count()===0,'Search opens a full detail view');
  await page.locator('#search-trigger').click();await page.locator('#palette-search').fill('tabs');await page.keyboard.press('Escape');check(await page.getByRole('dialog').count()===0,'Escape closes a nonempty search');check(await page.evaluate(()=>document.activeElement.id)==='search-trigger','Palette restores focus');
  await page.locator('#fullscreen-detail').click();await page.waitForFunction(()=>!!document.fullscreenElement);await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.fullscreenElement);check(true,'Fullscreen enters and Escape exits');
  await page.locator('.detail-stage [data-action="next"]').click();check(await page.locator('.d-etabs-demo').getAttribute('data-active')==='1','Dock action does not reset state');
  await page.locator('#demo-speed').selectOption('2');check(await page.locator('.detail-stage').evaluate(s=>s._runtime.speed)===2,'Runtime speed');
  await page.locator('[data-viewport="mobile"]').click();await page.waitForFunction(()=>document.querySelector('.stage-viewport').getBoundingClientRect().width<=391);check(await page.locator('.stage-viewport').evaluate(el=>el.clientWidth<=390),'Viewport frame');
  await page.locator('[data-viewport="desktop"]').click();await page.locator('button[data-stage-theme="light"]').click();check(await page.locator('.detail-stage').getAttribute('data-stage-theme')==='light','Stage theme');
  await page.locator('#replay-detail').click();check(await page.locator('.d-etabs-demo').getAttribute('data-active')==='0','Replay');
  await page.getByRole('tab',{name:'HTML',exact:true}).focus();await page.keyboard.press('ArrowRight');check(await page.getByRole('tab',{name:'CSS',exact:true}).getAttribute('aria-selected')==='true','Keyboard source tabs');
  await library();await showAll();
  const all=await page.evaluate(async()=>{const out=[];for(const item of INTRX.catalog){const tile=document.getElementById('tile-'+item.id);tile.scrollIntoView({block:'center',behavior:'instant'});const stage=tile.querySelector('.demo-stage');for(let i=0;i<150&&!stage._root&&!stage.dataset.bootError;i++)await new Promise(r=>setTimeout(r,20));out.push({id:item.id,booted:!!stage._root,failed:stage.dataset.bootError==='true'});}return out;});
  check(all.length===demos.length&&all.every(d=>d.booted&&!d.failed),'Every preview boots: '+JSON.stringify(all.filter(d=>!d.booted||d.failed)));
  console.log('PASS: all '+all.length+' lazy previews boot');
  await page.locator('#tile-elastic-tabs').scrollIntoViewIfNeeded();const scroll=await page.evaluate(()=>scrollY);await page.locator('#tile-elastic-tabs .tile-details').click();await page.waitForFunction(()=>location.hash==='#/c/elastic-tabs');await page.goBack();await page.waitForFunction(()=>location.hash==='#/library');
  check(Math.abs((await page.evaluate(()=>scrollY))-scroll)<4,'Back restores route scroll');
  await page.goto(url+'/#/',{waitUntil:'networkidle'});
  const ids=[...new Set([...demos.filter(d=>['Interactive Showcase','Framer Collection','DRAMS','Skeuomorph'].includes(d.cat)).map(d=>d.id),'scroll-clip-morph','scroll-video-scrubber','image-trail','tilt-card','text-blur-focus'])];
  for(const id of ids){
   await open(id);const d=demos.find(d=>d.id===id);
   if(d.source)check(await page.locator('.source-link').count()===1,id+' source credit');
   check(await page.locator('.detail-stage').evaluate(s=>Math.abs(s._root.getBoundingClientRect().height-s._root.offsetHeight*s._ctx.scale)<2),id+' declared geometry');
   await page.getByRole('tab',{name:'Single file',exact:true}).click();await page.locator('#copy-source').click();
   const code=await page.evaluate(()=>navigator.clipboard.readText());check(code.startsWith('<!DOCTYPE html>'),id+' copied document');check(!code.includes('{{asset:'),id+' resolved assets');
   if(d.cat==='DRAMS')check(code.includes('DRAMS by 1042 Studio')&&!/<iframe/i.test(code),id+' native source attribution');
   exports.push({id,rootClass:d.rootClass,code});
  }
  const standalone=await context.newPage(),exportErrors=[];standalone.on('pageerror',e=>exportErrors.push(e.message));await standalone.route('**/*',route=>route.abort());
  for(const item of exports){await standalone.goto('about:blank');await standalone.setContent(item.code);await standalone.evaluate(()=>document.fonts.ready);await standalone.waitForTimeout(40);check(await standalone.locator('.'+item.rootClass).count()===1,item.id+' offline root');check(await standalone.locator('img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0)),item.id+' offline images');}
  check(!exportErrors.length,'Offline export errors: '+exportErrors.join(';'));await standalone.close();console.log('PASS: '+exports.length+' offline exports');
  await open('showcase-circular-gallery');await page.getByRole('button',{name:'Next artwork'}).click();check(await page.locator('.detail-stage [data-index="1"]').count()===1,'Gallery next');
  await open('showcase-elastic-slider');await page.getByRole('slider',{name:'Volume'}).fill('90');check(await page.locator('.detail-stage output').textContent()==='90','Native slider');
  await open('showcase-converging-paths');await page.locator('.detail-stage [tabindex]').evaluate(el=>el.scrollTop=el.scrollHeight);await page.waitForFunction(()=>document.querySelector('.detail-stage [data-progress="1.000"]'));check(await page.locator('.detail-stage [class$="-value"]').textContent()==='100%','Scroll drawing');
  await open('input-float-label');await page.locator('.detail-stage input').fill('hello@example.com');await page.locator('.detail-stage input').press('Tab');check(await page.locator('.detail-stage [data-floated="true"]').count()===1,'Filled labels stay raised');
  await open('slider-stack-deck');for(let i=0;i<6;i++){await page.locator('.detail-stage .d-deck-keep').click();await page.waitForFunction(count=>document.querySelector('.detail-stage .d-stack-deck').dataset.dismissed===String(count),i+1);}check(await page.locator('.detail-stage [data-depth="0"]').evaluate(el=>getComputedStyle(el).opacity==='1'),'Continuous deck recycling');
  await page.emulateMedia({reducedMotion:'reduce'});await open('showcase-dot-field');const frame=await page.locator('.detail-stage canvas').evaluate(c=>c.toDataURL());await page.waitForTimeout(100);check(frame===await page.locator('.detail-stage canvas').evaluate(c=>c.toDataURL()),'Static reduced motion');await page.locator('.detail-stage [tabindex="0"]').press('ArrowRight');check(frame!==await page.locator('.detail-stage canvas').evaluate(c=>c.toDataURL()),'Reduced-motion keyboard input');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});await page.goto(url+'/#/',{waitUntil:'networkidle'});check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No mobile overflow');await page.locator('#browse-trigger').click();check(await page.getByRole('dialog',{name:'Browse components'}).isVisible(),'Browse sheet');await page.locator('.browse-sheet a[href="#/library/layout-ui"]').click();check(await page.getByRole('dialog').count()===0,'Browse closes on navigation');
  await open('elastic-tabs');check(await page.locator('.detail-stage').evaluate(stage=>stage.clientWidth>300&&stage._ctx.scale>.3),'Mobile detail stage has usable geometry');check(await page.locator('.mobile-copy-bar').isVisible(),'Sticky mobile copy actions');await page.getByRole('tab',{name:'Agent',exact:true}).click();check(await page.locator('.agent-rail').isVisible(),'Mobile agent panel');await page.screenshot({path:'.artifacts/library-detail-mobile.png'});
  await page.locator('#theme-toggle').evaluate(el=>el.click());check(await page.evaluate(()=>document.documentElement.dataset.theme)==='light','Light theme');await route('#/docs/mcp-setup');check(await page.locator('.docs-content h1').textContent()==='MCP setup','Markdown docs route');
  check(!errors.length,'No runtime errors: '+errors.join(';'));
  fs.writeFileSync('.artifacts/verification.json',JSON.stringify({checks,previews:all.length,exports:exports.length,errors},null,2));console.log('PASS: '+checks+' checks; '+all.length+' previews; '+exports.length+' offline exports; desktop/mobile shell');
 }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
