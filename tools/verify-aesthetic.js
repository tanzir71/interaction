/* Interaction regression checks for the aesthetic audit, at a 300px preview width.
   node tools/verify-aesthetic.js [base-url] [browser-CDP-url]
   PLAYWRIGHT_MODULE may point to an existing Playwright installation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = process.argv[3] ? await chromium.connectOverCDP(process.argv[3]) : await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
  const context = await browser.newContext({viewport:{width:1200,height:900}});
  const page = await context.newPage(), errors=[], results=[];
  page.on('pageerror',e=>errors.push(e.message));
  const check=(v,label)=>{assert.ok(v,label);results.push(label);};
  let root;
  const open=async id=>{
    await page.evaluate(id=>INTRX.router.go('#/c/'+id),id);
    await page.waitForFunction(id=>document.querySelector('.detail-stage')?._ctx?.mode==='full'&&document.querySelector('.detail-stage').dataset.stage===id,id);
    root=page.locator('.detail-stage').locator('.'+await page.evaluate(id=>INTRX.demos.find(d=>d.id===id).rootClass,id));
    check(await root.count()===1,id+' boots at a constrained stage width');
  };
  const close=()=>page.evaluate(()=>INTRX.router.go('#/library'));
  const shot=async name=>root.screenshot({path:'.artifacts/aesthetic-interactions/'+name+'.png'});
  try {
    fs.mkdirSync('.artifacts/aesthetic-interactions',{recursive:true});
    await page.goto(process.argv[2]||'http://127.0.0.1:4173',{waitUntil:'networkidle'});
    await page.addStyleTag({content:'.stage-viewport{width:300px!important;margin-inline:auto}'});
    await open('scroll-image-sequence');
    const scroller=page.locator('.detail-stage .d-sequence-scroll');
    const frames=[];
    for(const [position,expected] of [[0,1],[24/47,25],[1,48]]) {
      await scroller.evaluate((el,p)=>{el.scrollTop=(el.scrollHeight-el.clientHeight)*p;},position);
      await page.waitForFunction(n=>document.querySelector('.detail-stage [role=progressbar]').getAttribute('aria-valuenow')===String(n),expected);
      frames.push(await root.locator('canvas').evaluate(c=>c.toDataURL()));
      check(await root.locator('[role=progressbar]').getAttribute('aria-valuetext')==='Frame '+expected+' of 48','Sequence accessible frame '+expected);
    }
    check(new Set(frames).size===3,'Sequence renders distinct start, middle and final imagery');
    await shot('sequence-last-frame');
    await root.getByRole('button',{name:'Rewind'}).click();
    await page.waitForFunction(()=>document.querySelector('.detail-stage [role=progressbar]').getAttribute('aria-valuenow')==='1');
    check(await scroller.evaluate(el=>el===document.activeElement),'Rewind restores keyboard focus');
    await scroller.press('End');
    await page.waitForFunction(()=>document.querySelector('.detail-stage [role=progressbar]').getAttribute('aria-valuenow')==='48');
    check(true,'Keyboard End reaches last sequence frame');await close();

    await open('scroll-text-highlight');
    await root.locator('.d-read-scroller').evaluate(el=>{el.scrollTop=el.scrollHeight;});
    await page.waitForFunction(()=>document.querySelector('.detail-stage .d-read-progress').getAttribute('aria-valuenow')==='100');
    check(await root.locator('.d-read-word').evaluateAll(els=>els.length>10&&els.every(el=>Number(el.style.getPropertyValue('--fill'))===1)),'Reading passage fills every word at completion');
    check(await root.locator('.d-read-copy').evaluate(el=>{const r=el.getBoundingClientRect(),p=el.parentElement.getBoundingClientRect();return r.left>=p.left&&r.right<=p.right&&r.top>=p.top&&r.bottom<=p.bottom;}),'Complete passage fits narrow sticky panel');await shot('reading-complete');await close();

    await open('stat-counter');
    await page.waitForFunction(()=>Array.from(document.querySelectorAll('.detail-stage .d-count-stat b')).map(el=>el.textContent).join('|')==='128|14|99%');
    check(await root.locator('.d-count-grid').evaluate(el=>el.scrollWidth<=el.clientWidth),'All three final stats fit at 300px');await shot('stats');await close();

    await open('text-typewriter-caret');
    await root.locator('.d-typewriter-toggle').click();
    const paused=await root.locator('.d-typewriter-output span').textContent();
    await page.waitForTimeout(350);
    check(await root.locator('.d-typewriter-output span').textContent()===paused,'Typewriter pause holds exact character state');
    await root.locator('.d-typewriter-toggle').click();
    await page.waitForFunction(s=>document.querySelector('.detail-stage .d-typewriter-output span').textContent!==s,paused);
    check(true,'Typewriter resumes');await close();

    await open('text-anagram-shuffle');
    const tokens=await root.locator('.d-anagram-glyph').evaluateAll(els=>els.map(el=>el.dataset.id).sort());
    await root.locator('.d-anagram-word').click();
    await page.waitForFunction(()=>document.querySelector('.detail-stage .d-anagram-head b').textContent==='TASTE');
    check(JSON.stringify(tokens)===JSON.stringify(await root.locator('.d-anagram-glyph').evaluateAll(els=>els.map(el=>el.dataset.id).sort())),'Anagram preserves repeated-letter identities');
    await shot('anagram-taste');await root.locator('.d-anagram-reset').click();
    await page.waitForFunction(()=>document.querySelector('.detail-stage .d-anagram-head b').textContent==='STATE');check(true,'Anagram resets');await close();

    await open('text-broken-grid');
    await root.locator('.d-brokengrid-field > button').click();
    check(await root.locator('.d-brokengrid-field > button').getAttribute('aria-pressed')==='true','Broken grid supports persistent click latch');
    await page.waitForTimeout(800);await shot('grid-united');
    await root.locator('.d-brokengrid-reset').click();
    check(!(await root.getAttribute('class')).includes('is-united'),'Broken grid reset separates fragments');await close();

    await open('text-numbers-slot');await root.locator('[data-value="1984"]').click();
    await page.waitForFunction(()=>document.querySelector('.detail-stage .d-numberslot-head b').textContent==='1984');
    check(await root.locator('.d-numberslot-machine').getAttribute('aria-label')==='Current value 1984','All four number reels settle and announce value');
    check(await root.locator('.d-numberslot-reel').evaluateAll(els=>els.map(el=>{const m=new DOMMatrix(getComputedStyle(el).transform);return String(Math.round(-m.m42/el.parentElement.clientHeight)%10);}).join(''))==='1984','Visible reel cells match final value after geometry change');await shot('reels-1984');await close();

    await open('cursor-inverted-lens');await root.focus();await root.press('ArrowRight');
    check((await root.locator('.d-lens-status').textContent()).startsWith('Lens X'),'Lens keyboard movement updates position');
    await root.press(' ');check(await root.locator('.d-lens-zoom').getAttribute('aria-pressed')==='true','Lens keyboard zoom toggles');await shot('lens-keyboard');await close();

    await open('proximity-type');await root.locator('.d-prox-word span').nth(3).hover();
    await page.waitForFunction(()=>Array.from(document.querySelectorAll('.detail-stage .d-prox-word span')).some(el=>getComputedStyle(el).color==='rgb(250, 115, 25)'));
    check(true,'Proximity animation uses the final orange accent');await shot('proximity-hover');await close();

    await open('cursor-hover-preview');await root.locator('.d-preview-link').first().hover();await page.waitForTimeout(350);await shot('link-preview-hover');
    check(await root.locator('.d-preview-link strong').evaluateAll(els=>els.every(el=>el.scrollWidth<=el.clientWidth+1)),'Project titles remain on one line without clipping');await close();
    check(errors.length===0,'No runtime errors in aesthetic interactions: '+errors.join('; '));
    fs.writeFileSync('.artifacts/aesthetic-interactions/results.json',JSON.stringify({checks:results.length,previewWidth:300,results,errors},null,2));
    console.log('PASS: '+results.length+' aesthetic regression checks at 300px');
  } finally {await context.close();await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
