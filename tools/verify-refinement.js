/* Focused browser checks for the redesigned type and native DRAMS sliders.
   PLAYWRIGHT_MODULE and CHROME_PATH may select an existing browser runtime. */
const fs=require('node:fs'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
 const context=await browser.newContext({viewport:{width:1200,height:900}}),page=await context.newPage(),errors=[],checks=[];
 const dir='.artifacts/refinement-focused';fs.mkdirSync(dir,{recursive:true});page.on('pageerror',e=>errors.push(e.message));
 const check=(v,label)=>{assert.ok(v,label);checks.push(label)};
 async function open(id){await page.evaluate(id=>location.hash=id,id);await page.waitForFunction(id=>document.querySelector('.modal.open .modal-title')?.textContent===INTRX.demos.find(d=>d.id===id).title,id);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(220);return page.locator('.modal-preview .demo-stage > *');}
 async function close(){await page.locator('.modal-close').click()}
 try{
  await page.goto(process.argv[2]||'http://127.0.0.1:4173',{waitUntil:'networkidle'});
  await page.addStyleTag({content:'.modal-preview .demo-stage{width:300px!important;max-width:100%;margin-inline:auto}'});
  let root=await open('text-accordion-squeeze');const row=root.locator('.d-typeaccordion-lines button').nth(1);await row.hover();await page.waitForTimeout(700);
  const typography=await row.locator('b').evaluate(el=>({font:getComputedStyle(el).fontFamily,transform:getComputedStyle(el).transform,size:parseFloat(getComputedStyle(el).fontSize)}));
  check(typography.font.includes('Inter')&&typography.transform==='none'&&typography.size>32,'082 hover uses Inter at its natural glyph proportions');
  await root.screenshot({path:dir+'/082-hover.png'});await row.click();check(await row.getAttribute('aria-pressed')==='true','082 persistent selection');await row.press('ArrowDown');check(await root.locator('.d-typeaccordion-lines button').nth(2).evaluate(el=>el===document.activeElement),'082 keyboard selection');await close();
  root=await open('text-broken-grid');await root.screenshot({path:dir+'/086-scattered.png'});const trigger=root.locator('.d-brokengrid-field>button');await trigger.hover();await page.waitForTimeout(750);check(await root.evaluate(el=>el.classList.contains('is-united')),'086 pieces unite on hover');check(await root.locator('.d-brokengrid-piece').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).transform==='matrix(1, 0, 0, 1, 0, 0)')),'086 all six pieces align without type deformation');await root.screenshot({path:dir+'/086-together.png'});await close();
  for(const id of ['image-trail','tilt-card','text-blur-focus','stat-counter','text-numbers-slot']){root=await open(id);await page.waitForTimeout(1800);check(await root.evaluate(el=>getComputedStyle(el).fontFamily.includes('Inter')),id+' uses locally loaded Inter');await root.screenshot({path:dir+'/'+id+'.png'});await close();}
  for(const number of ['002','003','004','005','009','012','020','021','022','034','040','045']){
   root=await open('drams-'+number);const slider=root.getByRole('slider');const before=Number(await slider.getAttribute('aria-valuenow'));await slider.press('ArrowRight');check(Number(await slider.getAttribute('aria-valuenow'))>before,'DRAMS '+number+' keyboard increase');await slider.press('Home');const box=await slider.boundingBox();await page.mouse.move(box.x+box.width*.35,box.y+box.height*.55);await page.mouse.down();await page.mouse.move(box.x+box.width*.75,box.y+box.height*.2,{steps:12});await page.mouse.up();check(Number(await slider.getAttribute('aria-valuenow'))>Number(await slider.getAttribute('aria-valuemin')),'DRAMS '+number+' pointer drag changes value');await root.screenshot({path:dir+'/drams-'+number+'-operated.png'});await close();
  }
  root=await open('drams-010');await root.getByRole('button').click();check(await root.getAttribute('data-revealed')==='true','DRAMS010 surprise opens');await root.screenshot({path:dir+'/drams-010-operated.png'});await close();
  root=await open('drams-043');await root.getByRole('button').click();await root.getByRole('searchbox').fill('Motion');await root.getByRole('searchbox').press('Enter');check(await root.getAttribute('data-query')==='Motion','DRAMS043 submits entered query locally');await root.screenshot({path:dir+'/drams-043-operated.png'});await root.getByRole('searchbox').press('Escape');check(await root.getAttribute('data-open')==='false','DRAMS043 Escape folds search');check(await page.locator('.modal.open').count()===1,'Handled Escape preserves the library dialog');await close();
  root=await open('drams-044');await root.getByRole('button').press('Space');check(await root.getAttribute('data-popped')==='true','DRAMS044 keyboard pops confirmation');await root.screenshot({path:dir+'/drams-044-operated.png'});await close();
  await page.emulateMedia({reducedMotion:'reduce'});root=await open('drams-045');await root.getByRole('slider').press('End');check(await root.getByRole('slider').getAttribute('aria-valuenow')==='3','DRAMS stepper remains usable with reduced motion');await close();
  check(errors.length===0,'No browser runtime errors: '+errors.join('; '));fs.writeFileSync(dir+'/results.json',JSON.stringify({checks:checks.length,labels:checks,errors},null,2));console.log('PASS '+checks.length+' refinement and DRAMS interaction checks');
 }finally{await context.close();await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
