#!/usr/bin/env node
/* Browser evidence for virtual-model boundaries and intrinsic keyboard commands. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {demos,filesById}=require('./load-registry')(),{renderedSource,norm,curves}=require('./motion-audit'),models=require('./motion-models.json').models;
const ids=['terminal-window','flip-clock','slot-machine-reel','zippo-flame','drams-015','wax-seal-stamp','vinyl-player-card','agent-thinking-drawer','punch-card-keyboard'];
const base=(process.argv[2]||'http://127.0.0.1:4173').replace(/\/$/,''),dir='.artifacts/remediation-cleanup';
fs.mkdirSync(dir,{recursive:true});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const inputs=Object.fromEntries([...ids.map(id=>filesById.get?.(id)||filesById[id]),'tools/verify-remediation-scope.js','tools/motion-audit.js','tools/motion-models.json','tools/stage-component-controls.js','tools/stage-component-controls.json','tools/verification/skeuo-original/source-function.cjs','assets/demo-assets.json','js/meta.stage.js','js/demo-runtime.js','js/shell/stage.js','css/style.css','css/fonts.css'].map(f=>[f,hash(fs.readFileSync(f))]));
const prefix="let auditNow=0,auditSerial=0;const auditFrames=new Map(),auditTimers=new Map();ctx.now=()=>auditNow;requestAnimationFrame=f=>{const id=++auditSerial;auditFrames.set(id,f);return id;};cancelAnimationFrame=id=>auditFrames.delete(id);setTimeout=(f,delay=0)=>{const id=++auditSerial;auditTimers.set(id,{f,due:auditNow+Math.max(1,+delay||0)});return id;};clearTimeout=id=>auditTimers.delete(id);root.__AuditTick=dt=>{if(stage._runtime.suspended||document.hidden)return;auditNow+=dt;for(let limit=0;limit<100;limit++){const entry=[...auditTimers].filter(([id,t])=>t.due<=auditNow+1e-7).sort((a,b)=>a[1].due-b[1].due)[0];if(!entry)break;auditTimers.delete(entry[0]);entry[1].f();}const pending=[...auditFrames.values()];auditFrames.clear();for(const f of pending)f(auditNow);};";
function inspect(){const root=document.querySelector('.stage')._root;return(root.__NativeSkeuoInspect||root.__SkeuoInspect||root.__KnobsInspect||root.__NativeTerminalInspect||root.__TerminalInspect||root.__agentThinkingDrawerInspect)?.()||null;}
function paintedSnapshot(){
 const stage=document.querySelector('.stage'),root=stage._root,styles=[],animations=[];
 function visible(node){if(!document.contains(node))return false;const box=Element.prototype.getBoundingClientRect.call(node);if(box.width<1||box.height<1||box.right<=0||box.bottom<=0)return false;for(let n=node;n&&n!==document.documentElement;n=n.parentElement){const s=getComputedStyle(n);if(s.display==='none'||s.visibility==='hidden'||+s.opacity<.0001)return false;}return true;}
 for(const node of[root,...root.querySelectorAll('*')])if(visible(node)){
  const s=getComputedStyle(node),durations=s.transitionDuration.split(',').map(parseFloat);
  if(durations.some(n=>n>0))styles.push({tag:node.tagName,class:node.className?.baseVal??node.className,property:s.transitionProperty,curve:s.transitionTimingFunction,duration:s.transitionDuration});
 }
 for(const a of document.getAnimations())if(a.effect?.target&&visible(a.effect.target))animations.push({type:a.constructor.name,curve:a.effect.getTiming().easing,duration:a.effect.getTiming().duration});
 const hiddenModels=[...document.body.children].filter(n=>n.style.left==='-10000px').map(n=>({hidden:getComputedStyle(n).visibility,inert:n.inert,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height}));
 return{styles,animations,hiddenModels};
}
(async()=>{const browser=await chromium.launch({headless:true}),rows=[];let paintedChecks=0,formatStates=0;
try{for(const reduced of[false,true])for(const mode of['thumb','full'])for(const theme of['dark','light']){
 const context=await browser.newContext({viewport:{width:1200,height:900},reducedMotion:reduced?'reduce':'no-preference'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.goto(base+'/tools/fixtures/framer-data/rig.html');for(const f of['css/style.css','css/fonts.css'])await page.addStyleTag({url:base+'/'+f});await page.evaluate(assets=>window.INTRX={resolveAssets:v=>v.replace(/\{\{asset:([\w-]+)\}\}/g,(m,key)=>assets[key]?'/'+assets[key]:m)},JSON.parse(fs.readFileSync('assets/demo-assets.json')));for(const f of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:base+'/'+f});
 try{for(const id of ids){const demo=demos.find(d=>d.id===id);assert(demo);const scoped=renderedSource(demo,models);
  await page.evaluate(({demo,mode,theme,prefix})=>{document.querySelector('.stage')?._runtime?.dispose();document.body.innerHTML='<div class="stage demo-stage" style="position:relative;width:650px;height:680px"></div>';const stage=document.querySelector('.stage');INTRX.mountStage({...demo,js:prefix+demo.js,stage:{...demo.stage,theme},_styled:false},stage,mode);},{demo,mode,theme,prefix});
  await page.waitForFunction(()=>{const r=document.querySelector('.stage')._root;if(!r)return false;const f=r.__NativeSkeuoInspect||r.__SkeuoInspect||r.__KnobsInspect||r.__NativeTerminalInspect||r.__TerminalInspect||r.__agentThinkingDrawerInspect;return f&&f().ready!==false;});
  await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.querySelectorAll('.stage img')].map(n=>n.decode())]));
  const start=await page.evaluate(inspect);let states=0,samples=0;
  async function check(){const snapshot=await page.evaluate(paintedSnapshot);for(const r of snapshot.styles){for(const m of r.curve.match(/cubic-bezier\([^)]*\)/g)||[])assert(curves.has(norm(m)),id+' painted transition '+m);assert(!/\blinear\b/.test(r.curve),id+' linear UI transition');paintedChecks++;}for(const r of snapshot.animations){if(/^cubic-bezier/.test(r.curve))assert(curves.has(norm(r.curve)),id+' painted animation '+r.curve);paintedChecks++;}for(const r of snapshot.hiddenModels){assert.equal(r.hidden,'hidden');assert.equal(r.inert,true);assert.equal(r.width,0);assert.equal(r.height,0);}samples++;}
  await check();
  if(id==='punch-card-keyboard'){
   const selector=mode==='thumb'?'.d-punch-native':'.d-punch-host-plane';
   for(let bits=0;bits<16;bits++){
    await page.locator(selector+' button[data-action=reset]').click();
    for(const[action,mask]of[['bold',1],['italic',2],['case',4],['right',8]])if(bits&mask)await page.locator(selector+' button[data-action='+action+']').click();
    const s=(await page.evaluate(inspect)).state;assert.equal(s.bold,!!(bits&1));assert.equal(s.italic,!!(bits&2));assert.equal(s.upper,!!(bits&4));assert.equal(s.align,bits&8?'right':'left');states++;formatStates++;
    const beforeReset=await page.evaluate(inspect);await page.evaluate(()=>document.querySelector('.stage')._root.__AuditTick(37));
    await page.locator(selector+' button[data-action=reset]').click();const reset=await page.evaluate(inspect);assert.equal(reset.state.bold,false);assert.equal(reset.state.italic,false);assert.equal(reset.state.upper,false);assert.equal(reset.state.align,'left');assert(reset.sourceClock>beforeReset.sourceClock&&reset.sourceClock>start.sourceClock,'Formatting Reset must advance normally without rewinding the source clock');
   }
   if(mode==='thumb'){const caps=await page.locator('.d-punch-native-cap').count();assert.equal(caps,6);const reset=page.locator('[data-native-node="170:1830"]');assert.equal(await reset.getAttribute('aria-label'),'Reset formatting');assert.deepEqual(await reset.evaluate(n=>({left:n.style.left,top:n.style.top,width:n.offsetWidth,height:n.offsetHeight})),{left:'144px',top:'88px',width:40,height:40});}
  }else{
   const buttons=page.locator('.stage-dock button:not([hidden])');let clicked=false;
   for(let i=0;i<await buttons.count();i++)if(await buttons.nth(i).isVisible()){await buttons.nth(i).click();clicked=true;break;}
   assert(clicked,id+' must expose a working shared action');
  }
  for(let frame=0;frame<120;frame++){await page.evaluate(()=>document.querySelector('.stage')._root.__AuditTick(1000/60));if(frame%12===0)await check();}
  await check();const after=await page.evaluate(inspect);assert(after&&!after.dead,id+' live renderer');
  await page.evaluate(()=>document.querySelector('.stage')._runtime.dispose());assert.equal(await page.locator('body > [style*="left: -10000px"]').count(),0,id+' virtual host disposal');
  rows.push({id,mode,theme,reduced,modelRegions:scoped.excluded,samples,formatStates:states,originalSourcePreserved:true});console.log('PASS '+id+' '+mode+' '+theme+' '+(reduced?'reduced':'normal'));
 }}finally{assert.deepEqual(errors,[]);await context.close();}
}
 for(const[f,h]of Object.entries(inputs))assert.equal(hash(fs.readFileSync(f)),h,f+' changed during verification');
 const result={at:new Date().toISOString(),inputs,rows,paintedChecks,formatStates,scope:'72 native/full dark/light normal/reduced browser stories check painted timing, zero-size hidden terminal models, actual shared actions, complete sixteen-state formatting and intrinsic Reset semantics. Exact model bodies and all CSS/renderer code remain bound by the static audit. This scope check supplements the existing numerical, geometry and offline suites; it does not replace final motion or performance acceptance.'};
 fs.writeFileSync(dir+'/results.json',JSON.stringify(result,null,2)+'\n');console.log('PASS '+rows.length+' browser stories / '+formatStates+' formatting states / '+paintedChecks+' painted timing checks');
}finally{await browser.close();}})().catch(error=>{console.error(error.stack);process.exitCode=1;});
