/* Actual keyboard routes and shell contrast. Component interiors have separate suites. */
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=(process.argv[2]||'http://127.0.0.1:4173').replace(/\/$/,''),rows=[];
const files=['index.html','css/foundations.css','js/shell/main.js','js/shell/ui.js','js/shell/views/home.js','js/shell/views/library.js','js/shell/views/docs.js','js/shell/views/detail.js',__filename];
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const inputs=Object.fromEntries(files.map(file=>[file,hash(file)]));let checks=0;
function check(value,message){assert(value,message);checks++;}
async function contrast(page,selectors){
  const values=await page.evaluate(selectors=>{
    const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d',{willReadFrequently:true});
    const rgba=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].map((v,i)=>i===3?v/255:v);};
    const over=(a,b)=>a.slice(0,3).map((v,i)=>v*a[3]+b[i]*(1-a[3]));
    const luminance=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
    return selectors.flatMap(selector=>[...document.querySelectorAll(selector)].filter(n=>n.getClientRects().length&&getComputedStyle(n).visibility!=='hidden').map(node=>{
      const ancestors=[];for(let n=node;n;n=n.parentElement)ancestors.unshift(n);
      let background=[255,255,255],opacity=1;for(const n of ancestors){const style=getComputedStyle(n);background=over(rgba(style.backgroundColor),background);opacity*=Number(style.opacity);}
      const style=getComputedStyle(node),size=parseFloat(style.fontSize),large=size>=24||(size>=18.666&&Number(style.fontWeight)>=700);
      const foreground=rgba(style.color);foreground[3]*=opacity;const a=luminance(over(foreground,background)),b=luminance(background);
      return {selector,text:node.textContent.trim().slice(0,70),ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),minimum:large?3:4.5};
    }));
  },selectors);
  for(const value of values)check(value.ratio>=value.minimum,'Shell text contrast '+JSON.stringify(value));return values;
}
async function focus(page,selector){
  await page.keyboard.press('Tab');await page.locator(selector).focus();
  const ring=await page.locator(selector).evaluate(node=>{const s=getComputedStyle(node);return {focused:node===document.activeElement,width:parseFloat(s.outlineWidth),offset:parseFloat(s.outlineOffset),style:s.outlineStyle};});
  check(ring.focused&&ring.width>=2&&ring.offset>=2&&ring.style!=='none','Visible outside keyboard focus '+selector);return ring;
}
(async()=>{const browser=await chromium.launch({args:['--enable-unsafe-swiftshader']});try{
  for(const width of [1440,390,360])for(const theme of ['dark','light']){
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await context.addInitScript(theme=>{localStorage.setItem('intrx-theme',theme);window.shellCopies=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>shellCopies.push(text)}});},theme);
    try{
      await page.goto(base+'/#/',{waitUntil:'networkidle'});
      const search=page.locator('#search-trigger'),name=await search.getAttribute('aria-label');
      check(/^Search \d+ interactions ⌘K$/.test(name),'Search has its complete name and shortcut at every width');
      check(name===(await search.locator('span:not(.shell-icon)').textContent())+' '+(await search.locator('kbd').textContent()),'Entire visible search wording remains in its accessible name');
      await focus(page,'#search-trigger');await page.keyboard.press('Enter');await page.waitForSelector('#palette-search');
      check(await page.locator('#palette-search').evaluate(n=>n===document.activeElement),'Keyboard opens and focuses search');await page.keyboard.press('Escape');
      check(await search.evaluate(n=>n===document.activeElement),'Closing search restores its trigger');
      check(await page.locator('.promo-strip').getAttribute('role')==='region','Setup strip is a named landmark');
      const list=page.locator('.command-tabs');
      check(await list.locator(':scope > :not([role="tab"])').count()===0,'Install tabs contain only tabs');
      if(await list.isVisible()){
        await list.locator('[data-command=npx]').focus();await page.keyboard.press('ArrowRight');
        check(await list.locator('[data-command=bun]').getAttribute('aria-selected')==='true','Arrow key selects Bun command');
        await page.locator('#command-copy').click();check(await page.evaluate(()=>shellCopies.at(-1).startsWith('bunx ')),'Adjacent copy button copies selected command');
      }
      const colors=await contrast(page,['.group-tabs button span','.eyebrow','.badge--new','.code-runtime','.code-package','.desktop-hero em','.mobile-hero em']);
      await page.goto(base+'/#/library',{waitUntil:'networkidle'});
      check(await page.locator('#library-grid').getAttribute('aria-pressed')===null,'Grid has no button-only ARIA attribute');
      await page.locator('button[data-density=rows]').click();
      check(await page.locator('#library-grid').getAttribute('data-density')==='rows','Rows button changes density');
      check(await page.locator('button[data-density=rows]').getAttribute('aria-pressed')==='true','Rows button announces selected density');
      check(await page.locator('button[data-density=grid]').getAttribute('aria-pressed')==='false','Grid button announces deselected density');
      check(await page.locator('#library-grid').getAttribute('aria-pressed')===null,'Changing density keeps grid semantics');
      await page.goto(base+'/#/c/elastic-tabs',{waitUntil:'networkidle'});await page.waitForSelector('#source-content .syntax-tag');
      const sourceFocus=await focus(page,'#source-content');
      if(width<600){await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('#source-content').scrollLeft>0);check(true,'Native keyboard scrolls source');}
      colors.push(...await contrast(page,['.syntax-tag','.syntax-string','.syntax-keyword','.a11y-chips span']));
      await page.goto(base+'/#/docs',{waitUntil:'networkidle'});await page.waitForSelector('.docs-table');await focus(page,'.docs-table');
      if(width<600){await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('.docs-table').scrollLeft>0);check(true,'Native keyboard scrolls documentation table');}
      colors.push(...await contrast(page,['.docs-content a']));
      check(errors.length===0,'No shell errors '+errors.join(', '));
      rows.push({width,theme,colors,sourceFocus});console.log('PASS shell keyboard/semantics/contrast',width,theme);
    }finally{await context.close();}
  }
  for(const[file,value]of Object.entries(inputs))check(hash(file)===value,'Stable source '+file);
  fs.mkdirSync('.artifacts',{recursive:true});fs.writeFileSync('.artifacts/shell-accessibility.json',JSON.stringify({at:new Date().toISOString(),scope:'Shared shell controls and foreground text; demo interiors and pixel focus clipping require their own audits',checks,inputs,rows},null,2)+'\n');
  console.log('PASS',checks,'actual shell checks in',rows.length,'responsive/theme stories');
}finally{await browser.close();}})().catch(error=>{console.error(error.stack);process.exitCode=1;});
