/* Capture native static frames for search and related-component thumbnails.
   PLAYWRIGHT_MODULE may point to an existing development installation. */
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:800,height:700},deviceScaleFactor:1,reducedMotion:'reduce'});
  await page.goto(process.argv[2]||'http://127.0.0.1:4173',{waitUntil:'networkidle'});
  const ids=await page.evaluate(()=>INTRX.catalog.map(item=>item.id));
  await page.evaluate(()=>{INTRX.disposeView();document.getElementById('app').innerHTML='<div class="demo-stage stage" id="poster-stage" style="width:360px;height:264px;position:relative"></div>';});
  fs.mkdirSync('assets/posters',{recursive:true});
  const errors=[];
  for(const [index,id]of ids.entries()){
   await page.evaluate(async id=>{const stage=document.querySelector('#poster-stage'),demo=await INTRX.loadDemo(id);INTRX.mountStage(demo,stage,'thumb');await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));stage._runtime.suspend();if(stage.dataset.bootError)throw Error('Poster boot failed: '+id);},id);
   await page.locator('#poster-stage').screenshot({path:path.join('assets/posters',id+'.png'),animations:'disabled'});
   if((index+1)%40===0)console.log('Captured '+(index+1)+' / '+ids.length+' posters');
  }
  console.log('PASS: '+ids.length+' native poster frames');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
