/* Browser contracts for actions, cleanup, live caps and touch opt-in.
   PLAYWRIGHT_MODULE may point to an existing development installation. */
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
 const url=process.argv[2]||'http://127.0.0.1:4173';
 try{
  const desktop=await browser.newContext({viewport:{width:1440,height:900}}),page=await desktop.newPage();
  await page.goto(url,{waitUntil:'networkidle'});
  const live=()=>page.evaluate(()=>[...document.querySelectorAll('[data-intrx-tile] .demo-stage')].filter(s=>s._runtime&&!s._runtime.suspended).length);
  assert.ok(await live()<=6,'desktop live preview cap');
  await page.evaluate(()=>location.hash='/c/elastic-tabs');await page.locator('.detail-stage [data-action=next]').waitFor();
  assert.equal(await live(),0,'opening detail suspends all tiles');
  await page.locator('.detail-stage [data-action="next"]').click();assert.equal(await page.locator('.detail-stage .d-etabs-demo').getAttribute('data-active'),'1');
  await page.locator('.detail-stage [data-action="replay"]').click();assert.equal(await page.locator('.detail-stage .d-etabs-demo').getAttribute('data-active'),'0');
  await page.evaluate(()=>INTRX.router.go('#/library'));await page.locator('#library-grid').waitFor();
  const contract=await page.evaluate(()=>{
    const stage=document.createElement('div');stage.style.cssText='position:fixed;width:400px;height:400px';document.body.appendChild(stage);
    const emitted=[];stage.addEventListener('intrx:change',event=>emitted.push(event.detail));
    const demo={id:'test-actions',title:'Test actions',rootClass:'test-actions',html:'<div class="test-actions">0</div>',css:'.test-actions{color:inherit}',
      js:'let count=0;ctx.onAction("increment",()=>{root.textContent=String(++count);ctx.emit("change",count)});return {actions:{clear(){root.textContent="0"}},cleanup(){stage.dataset.cleaned="true"}};',
      designSize:'sm',stage:{theme:'dark',overflow:'clip'},controls:[{label:'Increment',action:'increment'},{label:'Clear',action:'clear'}]};
    const runtime=INTRX.mountStage(demo,stage,'full');stage.querySelector('[data-action="increment"]').click();
    const incremented=stage._root.textContent;stage.querySelector('[data-action="clear"]').click();const cleared=stage._root.textContent;
    runtime.dispose();const cleaned=stage.dataset.cleaned;stage.remove();return {incremented,cleared,cleaned,emitted};
  });
  assert.deepEqual(contract,{incremented:'1',cleared:'0',cleaned:'true',emitted:[1]});
  await desktop.close();
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),touch=await mobile.newPage();
  await touch.goto(url.replace(/\/$/,'')+'/#/library/cursor',{waitUntil:'networkidle'});
  await touch.locator('#tile-cursor-drag-ghost').scrollIntoViewIfNeeded();await touch.locator('#tile-cursor-drag-ghost .stage-play').waitFor({state:'visible'});
  const stage=touch.locator('#tile-cursor-drag-ghost .demo-stage');
  assert.ok(await stage.evaluate(s=>s.inert&&s.style.touchAction==='pan-y'),'touch drag starts suspended and allows page scrolling');
  await touch.locator('#tile-cursor-drag-ghost .stage-play').click();
  assert.ok(await stage.evaluate(s=>!s.inert&&!s._runtime.suspended&&s.style.touchAction==='none'),'touch interaction requires explicit play');
  assert.ok(await touch.evaluate(()=>[...document.querySelectorAll('[data-intrx-tile] .demo-stage')].filter(s=>s._runtime&&!s._runtime.suspended).length)<=1,'touch live preview cap');
  await touch.locator('#tile-cursor-drag-ghost .tile-details').focus();await touch.keyboard.press('Space');
  assert.ok(await stage.evaluate(s=>s.inert&&s._runtime.suspended),'Space toggles a focused tile to a frozen poster');
  await mobile.close();console.log('PASS: action registration/return values, events, cleanup, desktop/touch live caps, touch opt-in, keyboard pause');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
