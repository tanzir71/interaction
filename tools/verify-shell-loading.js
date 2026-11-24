/* Slow-catalog startup, retained paint, ordered input and initial scroll ownership. */
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=(process.argv[2]||'http://127.0.0.1:4173').replace(/\/$/,''),rows=[];let checks=0;
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files=['index.html','css/foundations.css','js/shell/main.js','js/shell/router.js','js/shell/registry.js','js/shell/views/home.js','registry/index.json',__filename];
const inputs=Object.fromEntries(files.map(f=>[f,hash(f)])),catalog=JSON.parse(fs.readFileSync('registry/index.json','utf8'));
const catalogHash=crypto.createHash('sha256').update(JSON.stringify(catalog)).digest('hex');
function check(value,message){assert(value,message);checks++;}
const frames=page=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
async function hold(browser,{width=390,height=900,theme='dark',reduced=true,failed=false}={}){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage(),errors=[],requests=[];
  await context.addInitScript(theme=>localStorage.setItem('intrx-theme',theme),theme);
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));let release,calls=0;
  const pending=new Promise(resolve=>release=resolve);
  await page.route('**/registry/index.json',async route=>{calls++;await pending;if(failed)await route.fulfill({status:503,body:'Unavailable'});else await route.continue();});
  await page.goto(base+'/#/',{waitUntil:'domcontentloaded'});await page.waitForSelector('.home-hero h1');await page.evaluate(()=>document.fonts.ready);await frames(page);
  return {page,context,errors,requests,release,calls:()=>calls,async close(){release();await context.close();check(errors.length===0,'No startup errors '+errors.join(', '));}};
}
(async()=>{const browser=await chromium.launch({...process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{},args:['--enable-unsafe-swiftshader']});try{
  for(const width of[1440,390,375,360])for(const theme of['dark','light'])for(const reduced of[false,true]){
    const rig=await hold(browser,{width,theme,reduced}),{page}=rig;
    try{
      const before=await page.evaluate(()=>{window.keptHomeHeading=document.querySelector('.home-hero h1');const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [r.x,r.y,r.width,r.height];};return {heading:rect('.home-hero h1'),prose:rect('.home-hero>p'),actions:rect('.home-hero .hero-actions'),scrollY,time:performance.now(),text:keptHomeHeading.innerText};});
      check(before.text.includes(width===1440?'Interactions for the web':'The details make'),'Real responsive heading paints before catalog');
      check(await page.locator('#app').getAttribute('aria-busy')==='true','Pending catalog is announced busy');
      check(!rig.requests.some(u=>/\/js\/demos\./.test(u)),'Pending shell does not boot component modules');
      check(await page.locator('.mobile-triggers').evaluate(n=>getComputedStyle(n).visibility)==='hidden','Unresolved trigger counts stay hidden');
      rig.release();await page.waitForFunction(()=>INTRX.shellStarted);await page.evaluate(()=>document.fonts.ready);await frames(page);
      const after=await page.evaluate(async()=>{const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [r.x,r.y,r.width,r.height];};const bytes=new TextEncoder().encode(JSON.stringify(INTRX.catalog)),digest=await crypto.subtle.digest('SHA-256',bytes);return {same:keptHomeHeading===document.querySelector('.home-hero h1'),heading:rect('.home-hero h1'),prose:rect('.home-hero>p'),actions:rect('.home-hero .hero-actions'),scrollY,text:document.querySelector('.home-hero h1').innerText,catalogHash:[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join(''),count:document.querySelector('.home-hero>p .mobile-only').textContent.split(' ')[0],counts:[...document.querySelectorAll('.mobile-triggers .n')].map(n=>Number(n.textContent)),expected:[INTRX.catalog.length,...INTRX.triggers.map(t=>INTRX.catalog.filter(d=>d.trigger===t).length)]};});
      check(after.same,'Heading node survives catalog hydration');
      for(const key of['heading','prose','actions']){assert.deepEqual(after[key],before[key],key+' geometry stays fixed');checks++;}
      check(after.scrollY===before.scrollY,'Hydration does not move the page');check(after.text===before.text,'Heading copy stays intact');
      check(after.catalogHash===catalogHash,'Complete catalog metadata survives early response consumption');check(after.count===String(catalog.length),'Hero uses actual catalog count');
      assert.deepEqual(after.counts,after.expected,'Every trigger count hydrates from actual metadata');checks++;
      check(rig.calls()===1,'Catalog response is requested and consumed once');
      check(await page.locator('.home-hero').count()===1,'One retained hero');
      check(await page.locator('#site-header').evaluate(n=>getComputedStyle(n).backdropFilter)==='blur(16px)','Original reference blur stays intact');
      await page.mouse.move(width/2,200);await page.mouse.wheel(0,500);await page.waitForFunction(()=>scrollY>50);check(await page.locator('#site-header').evaluate(n=>n.getBoundingClientRect().top===0&&getComputedStyle(n).backdropFilter==='blur(16px)'),'Real scrolling retains the sticky reference header');
      await page.evaluate(()=>scrollTo(0,0));await page.waitForFunction(()=>scrollY===0);check(true,'Real page returns without scroll locks');
      rows.push({kind:'hydration',width,theme,reduced,before,after,catalogRequests:rig.calls()});
    }finally{await rig.close();}
    console.log('PASS retained startup',width,theme,reduced?'reduced':'normal');
  }
  for(const action of['search','escape','agent','last-agent','route','failed','failed-agent','failed-agent-desktop','scroll']){
    const rig=await hold(browser,{width:action==='failed-agent-desktop'?1440:390,height:action==='scroll'?320:900,failed:action.startsWith('failed')}),{page}=rig;let scrollBefore=0;
    try{
      if(['search','escape','last-agent','route','failed'].includes(action))await page.locator('#search-trigger').click();
      if(action==='escape')await page.keyboard.press('Escape');
      if(['agent','last-agent','failed-agent'].includes(action))await page.locator('.home-hero [data-agent]').click();
      if(action==='failed-agent-desktop')await page.locator('#connect-agent').click();
      if(action==='route'){await page.getByRole('link',{name:'Browse components',exact:true}).click();await page.waitForFunction(()=>document.documentElement.dataset.route==='library');}
      if(action==='scroll'){await page.mouse.move(200,200);await page.mouse.wheel(0,40);await page.waitForFunction(()=>scrollY>0);scrollBefore=await page.evaluate(()=>scrollY);}
      rig.release();
      if(action.startsWith('failed')){
        await page.locator('.not-found h1').waitFor();check(await page.locator('#app').getAttribute('aria-busy')===null,'Failed load retires busy state');
        if(action==='failed')check(await page.getByRole('dialog').count()===0,'Failed startup does not open stale search');
        else{
          await page.getByRole('dialog',{name:'Connect your agent'}).waitFor();check(await page.locator('.config-card').isVisible(),'Static agent setup survives catalog failure');await page.keyboard.press('Escape');
          const target=action==='failed-agent-desktop'?'#connect-agent':'.not-found button';check(await page.locator(target).evaluate(n=>n===document.activeElement),'Failed startup restores focus to an available control');
          if(action==='failed-agent-desktop'){await page.locator('#connect-agent').click();await page.getByRole('dialog',{name:'Connect your agent'}).waitFor();check(true,'Agent setup remains usable after the failed startup settles');}
        }
      }
      else{
        await page.waitForFunction(()=>INTRX.shellStarted);await frames(page);
        if(action==='search'){await page.waitForSelector('#palette-search');check(await page.locator('#palette-search').evaluate(n=>n===document.activeElement),'Queued search receives focus after startup');await page.keyboard.press('Escape');check(await page.locator('#search-trigger').evaluate(n=>n===document.activeElement),'Queued search returns focus to its trigger');}
        if(['agent','last-agent'].includes(action)){await page.getByRole('dialog').waitFor();check(await page.locator('#palette-search').count()===0,'Latest agent intent supersedes queued search');await page.keyboard.press('Escape');check(await page.locator('.home-hero [data-agent]').evaluate(n=>n===document.activeElement),'Queued agent setup returns focus to its retained trigger');}
        if(action==='escape')check(await page.getByRole('dialog').count()===0,'Escape cancels an action awaiting data');
        if(action==='route'){check(await page.locator('.library-main').count()===1,'Pending navigation reaches requested view');check(await page.getByRole('dialog').count()===0,'Navigation cancels stale search');}
        if(action==='scroll')check(await page.evaluate(()=>scrollY)===scrollBefore,'User scroll survives initial router hydration');
      }
      check(rig.calls()===1,'One response for ordered startup '+action);rows.push({kind:'intent',action,scrollBefore});
    }finally{await rig.close();}
    console.log('PASS ordered startup',action);
  }
  for(const[f,h]of Object.entries(inputs))check(hash(f)===h,'Stable source '+f);
  fs.mkdirSync('.artifacts',{recursive:true});fs.writeFileSync('.artifacts/shell-loading.json',JSON.stringify({at:new Date().toISOString(),browser:browser.version(),checks,inputs,rows},null,2)+'\n');console.log('PASS',checks,'startup checks across',rows.length,'real browser stories');
}finally{await browser.close();}})().catch(error=>{console.error(error.stack);process.exitCode=1;});
