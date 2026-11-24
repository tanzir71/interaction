const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const R=require('../load-registry')(),assets=require('../../assets/demo-assets.json'),catalog=require('../../registry/index.json');
const base=(process.argv.find(v=>/^https?:/.test(v))||'http://127.0.0.1:4173').replace(/\/$/,'');
async function frames(page,count=2){await page.evaluate(count=>new Promise(resolve=>{function next(){if(--count<=0)resolve();else requestAnimationFrame(next);}requestAnimationFrame(next);}),count);}
async function mount(browser,d,{width=390,theme='dark',reduced=false,mode='full',held=true}={}){
 const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:width<600?2:1,reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/tools/fixtures/showcase-fields/rig.html');
 await page.evaluate(({base,assets,theme})=>{const b=document.createElement('base');b.href=base+'/';document.head.prepend(b);document.documentElement.dataset.theme=theme;window.INTRX={resolveAssets:v=>v.replace(/\{\{asset:([\w-]+)\}\}/g,(_,n)=>{if(!assets[n])throw Error('Unknown asset '+n);return base+'/'+assets[n];})};},{base,assets,theme});
 for(const file of['css/foundations.css','css/fonts.css'])await page.addStyleTag({url:base+'/'+file});
 for(const file of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:base+'/'+file});
 const entry=catalog.find(e=>e.id===d.id);
 await page.evaluate(({d,width,mode,held})=>{
  const create=INTRX.createRuntime;window.__diffPending=new Set();window.__diffRequests=0;window.__diffCancels=0;
  INTRX.createRuntime=stage=>{const r=create(stage),raf=r.requestAnimationFrame,cancel=r.cancelAnimationFrame;r.requestAnimationFrame=fn=>{let id;id=raf(time=>{window.__diffPending.delete(id);fn(time);});if(id){window.__diffPending.add(id);window.__diffRequests++;}return id;};r.cancelAnimationFrame=id=>{window.__diffPending.delete(id);window.__diffCancels++;cancel(id);};if(held)r.suspend();return r;};
  document.body.replaceChildren();document.body.style.margin='0';const s=document.createElement('div');s.className='demo-stage stage';Object.assign(s.style,{position:'relative',width:(mode==='thumb'?Math.min(372,width):width)+'px',height:(mode==='thumb'?264:720)+'px'});document.body.append(s);INTRX.mountStage(d,s,mode);if(s.dataset.bootError)throw Error('Diff failed to boot');
 },{d:{...d,fullAssetRefs:entry.fullAssetRefs,stage:{...d.stage,theme}},width,mode,held});
 await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(n=>n.decode())));await frames(page);
 return{context,page,errors,async close(){await page.evaluate(()=>document.querySelector('.stage')?._runtime?.dispose());await context.close();if(errors.length)throw Error(errors.join('; '));}};
}
async function snapshot(page){return page.evaluate(()=>{const s=document.querySelector('.stage'),r=s._root;const read=n=>{const c=getComputedStyle(n),a=n.getBoundingClientRect();return{transform:c.transform,opacity:c.opacity,filter:c.filter,height:c.height,color:c.color,background:c.backgroundColor,x:a.x,y:a.y,width:a.width,paintedHeight:a.height};};return{clock:s._runtime.now(),suspended:s._runtime.suspended,model:r.__agentDiffReviewInspect(),rows:[...r.querySelectorAll('.d-agent-agent-diff-review-line')].map(read),animations:r.getAnimations({subtree:true}).map(a=>({property:a.transitionProperty,state:a.playState,time:a.currentTime,pending:a.pending,rate:a.playbackRate})),pending:window.__diffPending?.size??null,requests:window.__diffRequests??null,cancels:window.__diffCancels??null};});}
async function settlePause(page){await page.evaluate(async()=>{const s=document.querySelector('.stage');s._runtime.suspend();await Promise.all(s._root.getAnimations({subtree:true}).map(a=>a.ready.catch(()=>{})));});await frames(page);}
async function ready(page){await page.evaluate(()=>document.querySelector('.stage')._runtime.resume());await page.waitForFunction(()=>document.querySelector('.stage')._root.__agentDiffReviewInspect().state.phase==='ready');await page.waitForTimeout(600);}
module.exports={chromium,R,mount,frames,snapshot,settlePause,ready};
