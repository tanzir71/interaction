const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),base=process.env.INTRX_TEST_URL||process.argv[2]||'http://127.0.0.1:4173',root=path.resolve(__dirname,'../..'),dir=path.join(root,'.artifacts/drams-switches-core');
fs.mkdirSync(dir,{recursive:true});
const html='<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body></body>';
async function open(browser,{reduced=false,touch=false,viewport={width:1100,height:900},dpr=1}={}){
 const context=await browser.newContext({viewport,reducedMotion:reduced?'reduce':'no-preference',hasTouch:touch,isMobile:touch,deviceScaleFactor:dpr}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.stack||e.message));await page.goto(base+'/tools/fixtures/drams-switches-core/rig.html');await page.evaluate(()=>window.INTRX={resolveAssets:v=>v});for(const file of['css/style.css','css/fonts.css'])await page.addStyleTag({url:base+'/'+file});for(const file of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:base+'/'+file});
 async function mount(d,{mode='full',width=640,height=720}={}){await page.evaluate(({d,mode,width,height})=>{document.querySelector('.stage')?._runtime?.dispose();document.body.replaceChildren();Object.assign(document.body.style,{margin:'0',minHeight:'2000px',background:'#151515'});const s=document.createElement('div');s.className='demo-stage stage';Object.assign(s.style,{width:width+'px',height:height+'px',position:'relative'});document.body.append(s);INTRX.mountStage(d,s,mode);},{d,mode,width,height});await page.evaluate(()=>document.fonts.ready);return page.locator('.'+d.rootClass+'-input');}
 return{context,page,errors,mount,inspect:()=>page.evaluate(()=>document.querySelector('.stage')._root.__SwitchInspect()),async close(){await context.close();assert.deepEqual(errors,[]);}};
}
module.exports={open,chromium,base,dir,root};
