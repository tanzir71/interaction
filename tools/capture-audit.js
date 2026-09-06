/* Render audit contact sheets using the real app, in isolated browser contexts.
   node tools/capture-audit.js <output-dir> 'Category|Category' [base-url] [cdp-url]
   Use ids prefixed by @ to render selected demos instead of categories.
   PLAYWRIGHT_MODULE can point to an existing playwright(-core) installation. */
const fs = require('node:fs'), path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
  const dir=process.argv[2],selector=process.argv[3];
  if(!dir||!selector)throw Error('Output directory and category list are required');
  fs.mkdirSync(dir,{recursive:true});
  const browser=process.argv[5]?await chromium.connectOverCDP(process.argv[5]):await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
  const context=await browser.newContext({viewport:{width:1200,height:1750},deviceScaleFactor:1});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const base=process.argv[4]||'http://127.0.0.1:4173';
  const selection=selector.split('|'),manifest=[];
  try{
    await page.goto(base,{waitUntil:'domcontentloaded'});
    const demos=await page.evaluate(selection=>INTRX.demos.filter(d=>selection.includes(d.cat)||selection.includes('@'+d.id)).sort((a,b)=>Number(a._num)-Number(b._num)).map(d=>({id:d.id,title:d.title,cat:d.cat,num:d._num,rootClass:d.rootClass})),selection);
    for(let offset=0;offset<demos.length;offset+=12){
      if(offset)await page.goto(base,{waitUntil:'domcontentloaded'});
      const batch=demos.slice(offset,offset+12),prefix=String(offset/12+1).padStart(2,'0');
      const sheetWidth=Number(process.env.AUDIT_TILE_WIDTH||376)*3+24;
      await page.addStyleTag({content:'.sidebar,.topbar,.library-head,.grid-strip,.library-toolbar,.agent-strip,.scope-faq,.footer{display:none!important}.layout{padding:0!important}.main{padding:12px!important}#cards{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;width:'+sheetWidth+'px;gap:12px!important;padding:0!important}.cat-divider{display:none!important}.tile{height:396px!important}.tile-details{font-size:12px!important}.tile-hint{font-size:10px!important}html{scroll-behavior:auto!important}'});
      await page.evaluate(ids=>{
        for(const d of INTRX.demos)d._card.style.display=ids.includes(d.id)?'':'none';
        window.scrollTo(0,0);
      },batch.map(d=>d.id));
      await page.waitForFunction(ids=>ids.every(id=>document.getElementById(id).querySelector('.demo-stage > *')),batch.map(d=>d.id));
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(700);
      await page.locator('#cards').screenshot({path:path.join(dir,prefix+'-rest.png')});
      const metrics=await page.evaluate(ids=>ids.map(id=>{
        const card=document.getElementById(id),stage=card.querySelector('.demo-stage'),root=stage.firstElementChild;
        const children=[root,...root.querySelectorAll('*')];
        const scroll=children.find(el=>/(auto|scroll)/.test(getComputedStyle(el).overflowY)&&el.scrollHeight>el.clientHeight+40);
        if(scroll)scroll.scrollTop=(scroll.scrollHeight-scroll.clientHeight)*.52;
        const r=stage.getBoundingClientRect(),x=r.left+r.width*.58,y=r.top+r.height*.48;
        const target=document.elementFromPoint(x,y)||root;
        target.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,clientX:x,clientY:y,pointerId:1}));
        target.dispatchEvent(new MouseEvent('mousemove',{bubbles:true,clientX:x,clientY:y}));
        return{id,rootHeight:root.getBoundingClientRect().height,zoom:getComputedStyle(root).zoom,background:getComputedStyle(root).backgroundColor,hasScroll:!!scroll,failed:card.textContent.includes('demo failed to boot')};
      }),batch.map(d=>d.id));
      await page.waitForTimeout(550);
      await page.locator('#cards').screenshot({path:path.join(dir,prefix+'-active.png')});
      batch.forEach((demo,i)=>manifest.push({...demo,...metrics[i],sheet:prefix,position:i+1,rest:path.join(dir,prefix+'-rest.png'),active:path.join(dir,prefix+'-active.png')}));
      fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify({demos:manifest,errors},null,2));
      console.log('Captured '+Math.min(offset+12,demos.length)+'/'+demos.length+' → '+dir+'/'+prefix);
    }
    if(errors.length)console.log('Runtime errors: '+JSON.stringify(errors));
  }finally{await context.close();await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
