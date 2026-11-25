/* Native background tabs, without Playwright focus or document-property emulation. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const option=name=>process.argv.find(v=>v.startsWith('--'+name+'='))?.slice(name.length+3);
if(process.argv.includes('--help')){
  console.log('Usage: node tools/verify-page-visibility.js [http://127.0.0.1:4173] [--ids=id,...] [--modes=full,thumb] [--motion=normal,reduced] [--output=.artifacts/page-visibility]\nSet INTRX_CHROME_EXECUTABLE or CHROME_PATH. Uses Chrome native tab activation through CDP, with no browser-driver focus emulation or replacement visibility getters. Retains every case, failure and source hash.');process.exit(0);
}
const root=path.resolve(__dirname,'..'),base=(process.argv.find(v=>/^https?:/.test(v))||'http://127.0.0.1:4173').replace(/\/$/,''),R=require('./load-registry')(),ids=option('ids')?.split(',')||R.demos.map(d=>d.id),modes=(option('modes')||'full,thumb').split(','),motions=(option('motion')||'normal,reduced').split(','),chrome=process.env.INTRX_CHROME_EXECUTABLE||process.env.CHROME_PATH;
assert(chrome&&fs.existsSync(chrome),'Set a local Chrome executable');assert(ids.length&&new Set(ids).size===ids.length&&ids.every(id=>R.demos.some(d=>d.id===id)),'Unknown or duplicate component IDs');assert(modes.length&&modes.every(m=>['full','thumb'].includes(m)),'Invalid modes');assert(motions.length&&motions.every(m=>['normal','reduced'].includes(m)),'Invalid motion setting');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),files=[__filename,'tools/load-registry.js','tools/fixtures/showcase-fields/rig.html','registry/index.json','assets/demo-assets.json','css/foundations.css','css/fonts.css','js/demo-runtime.js','js/shell/registry.js','js/shell/access.js','js/shell/stage.js','js/meta.stage.js','js/registry-files.json',...new Set(ids.map(id=>R.filesById[id]))],inputs=Object.fromEntries(files.map(f=>[path.relative(root,path.resolve(f)).replaceAll('\\','/'),hash(fs.readFileSync(f))]));
const out=path.resolve(root,option('output')||'.artifacts/page-visibility',new Date().toISOString().replace(/[:.]/g,'-'));assert(!fs.existsSync(out),'Run directory exists');fs.mkdirSync(out,{recursive:true});
const report={started:new Date().toISOString(),scope:'Native Chrome hidden tabs. Every selected component mounts in each selected mode/motion, then freezes its real runtime clock, probe callbacks, DOM, Canvas/WebGL calls, inspection state and existing animation times while the browser reports a trusted hidden event. Foreground and caller ownership are tested independently. This does not establish input-specific hidden intent, offscreen behavior, pixel fidelity, motion recipes, accessibility or frame rate.',inputs,ids,modes,motions,chrome,rows:[],failures:[],checks:0},save=()=>fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');save();
const wait=ms=>new Promise(r=>setTimeout(r,ms));
class CDP{
  constructor(url){this.sequence=0;this.jobs=new Map();this.ws=new WebSocket(url);this.ready=new Promise((resolve,reject)=>{this.ws.addEventListener('open',resolve,{once:true});this.ws.addEventListener('error',reject,{once:true});});this.ws.addEventListener('message',e=>{const m=JSON.parse(e.data),job=this.jobs.get(m.id);if(!job)return;this.jobs.delete(m.id);clearTimeout(job.timeout);m.error?job.reject(Error(JSON.stringify(m.error))):job.resolve(m.result);});this.ws.addEventListener('close',()=>{for(const job of this.jobs.values()){clearTimeout(job.timeout);job.reject(Error('Chrome CDP closed'));}this.jobs.clear();});}
  async send(method,params={},sessionId){await this.ready;const id=++this.sequence;return new Promise((resolve,reject)=>{const timeout=setTimeout(()=>{this.jobs.delete(id);reject(Error('CDP timeout: '+method));},30000);this.jobs.set(id,{resolve,reject,timeout});this.ws.send(JSON.stringify({id,method,params,...sessionId?{sessionId}:{}}));});}
}
function check(value,message){assert(value,message);report.checks++;}
function same(a,b,message){assert.deepEqual(a,b,message);report.checks++;}
let cdp,sessionId;
async function evaluate(expression){const result=await cdp.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId);if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value;}
async function until(expression,message){for(let i=0;i<150;i++){try{if(await evaluate(expression))return;}catch(e){if(!e.message.includes('Execution context was destroyed')&&!e.message.includes('Cannot find context'))throw e;}await wait(20);}throw Error('Timed out: '+message);}
const setup=async()=>{
  const tag=document.createElement('base');tag.href=location.origin+'/';document.head.prepend(tag);
  for(const file of['css/foundations.css','css/fonts.css']){const link=document.createElement('link');link.rel='stylesheet';link.href=file;await new Promise((resolve,reject)=>{link.onload=resolve;link.onerror=reject;document.head.append(link);});}
  for(const file of['js/shell/registry.js','js/shell/access.js','js/demo-runtime.js','js/shell/stage.js']){const script=document.createElement('script');script.src=file;await new Promise((resolve,reject)=>{script.onload=resolve;script.onerror=reject;document.head.append(script);});}
  await INTRX.initCatalog();await document.fonts.ready;
  window.visibilityAudit={events:[],errors:[],paint:0};
  document.addEventListener('visibilitychange',event=>visibilityAudit.events.push({hidden:document.hidden,state:document.visibilityState,trusted:event.isTrusted,time:performance.now()}));
  addEventListener('error',event=>visibilityAudit.errors.push(event.message));addEventListener('unhandledrejection',event=>visibilityAudit.errors.push(String(event.reason?.stack||event.reason)));
  for(const [Type,names]of[[globalThis.CanvasRenderingContext2D,['clearRect','fillRect','strokeRect','fill','stroke','drawImage','putImageData','fillText','strokeText']],[globalThis.OffscreenCanvasRenderingContext2D,['clearRect','fillRect','strokeRect','fill','stroke','drawImage','putImageData','fillText','strokeText']],[globalThis.WebGLRenderingContext,['clear','drawArrays','drawElements']],[globalThis.WebGL2RenderingContext,['clear','drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced']]])if(Type)for(const name of names){const original=Type.prototype[name];if(typeof original!=='function')continue;Type.prototype[name]=function(...args){visibilityAudit.paint++;return original.apply(this,args);};}
  return{count:INTRX.catalog.length,hidden:document.hidden,documentOverrides:Object.hasOwn(document,'hidden')||Object.hasOwn(document,'visibilityState')};
};
const mount=async(id,mode)=>{
  const errorStart=visibilityAudit.errors.length;visibilityAudit.events=[];
  document.querySelector('.stage')?._runtime?.dispose();document.body.replaceChildren();scrollTo(0,0);
  const demo=await INTRX.loadDemo(id),entry=INTRX.byId.get(id),stage=document.createElement('div');stage.className='demo-stage stage';Object.assign(document.body.style,{margin:'0',background:'#151515'});Object.assign(stage.style,{position:'relative',width:(mode==='thumb'?372:640)+'px',height:(mode==='thumb'?264:600)+'px'});document.body.append(stage);
  INTRX.mountStage({...demo,fullAssetRefs:entry.fullAssetRefs},stage,mode);if(stage.dataset.bootError)throw Error('Boot error: '+id);
  await document.fonts.ready;await Promise.all([...stage.querySelectorAll('img')].map(n=>n.decode()));
  // Cursor compositions also decode template images outside the live DOM.
  // Finish that resource preparation before auditing an existing composition.
  if(typeof stage._root.__CursorInspect==='function'){
    const start=performance.now();
    while(stage._root.__CursorInspect().ready===false){
      if(stage.dataset.bootError||performance.now()-start>10000)throw Error('Cursor resources not ready: '+id);
      await new Promise(resolve=>setTimeout(resolve,20));
    }
  }
  window.visibilityProbe={frames:0,timers:0,queued:0};const runtime=stage._runtime;function frame(){visibilityProbe.frames++;runtime.requestAnimationFrame(frame);}runtime.requestAnimationFrame(frame);runtime.setInterval(()=>visibilityProbe.timers++,10);return{controls:[...stage.querySelectorAll('.dock-btn')].map(n=>n.textContent),errorStart};
};
const snapshot=()=>{
  const stage=document.querySelector('.stage'),root=stage._root,runtime=stage._runtime,inspect={};
  for(const name of Object.getOwnPropertyNames(root).filter(n=>/^__/.test(n)&&/inspect$/i.test(n)&&typeof root[n]==='function'))inspect[name]=root[name]();
  const animations=stage.getAnimations({subtree:true}).map(a=>({type:a.constructor.name,time:a.currentTime,state:a.playState,rate:a.playbackRate,target:a.effect?.target?.className?.baseVal??a.effect?.target?.className}));
  return{hidden:document.hidden,visibility:document.visibilityState,documentOverrides:Object.hasOwn(document,'hidden')||Object.hasOwn(document,'visibilityState'),suspended:runtime.suspended,clock:runtime.now(),probe:{...visibilityProbe},paint:visibilityAudit.paint,html:stage.innerHTML,inspect,animations,events:[...visibilityAudit.events],errors:[...visibilityAudit.errors],wall:performance.now()};
};
const frozenKeys=['hidden','visibility','documentOverrides','suspended','clock','probe','paint','html','inspect','animations','errors'];
const summary=s=>({...s,html:hash(s.html),inspect:hash(JSON.stringify(s.inspect))});
(async()=>{
  const profile=path.join(out,'chrome-profile'),child=spawn(chrome,['--headless=new','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','--enable-unsafe-swiftshader','about:blank'],{windowsHide:true,stdio:['ignore',fs.openSync(path.join(out,'chrome.stdout.log'),'w'),fs.openSync(path.join(out,'chrome.stderr.log'),'w')]});
  try{
    const portFile=path.join(profile,'DevToolsActivePort');for(let i=0;i<150&&!fs.existsSync(portFile);i++)await wait(50);assert(fs.existsSync(portFile),'Chrome debugging endpoint unavailable');const[port,endpoint]=fs.readFileSync(portFile,'utf8').trim().split(/\r?\n/);cdp=new CDP('ws://127.0.0.1:'+port+endpoint);report.browser=await cdp.send('Browser.getVersion');
    const fixtureURL=base+'/tools/fixtures/showcase-fields/rig.html',target=await cdp.send('Target.createTarget',{url:fixtureURL,background:false});({sessionId}=await cdp.send('Target.attachToTarget',{targetId:target.targetId,flatten:true}));await cdp.send('Runtime.enable',{},sessionId);await until('document.readyState==="complete"&&location.href==='+JSON.stringify(fixtureURL),'Fixture load');check(!(await evaluate('document.hidden')),'Foreground starts visible');const initial=await evaluate('('+setup.toString()+')()');check(!initial.hidden&&!initial.documentOverrides,'Native visible document without replacement getters');check(initial.count===R.demos.length,'Complete current catalog');
    const cover=await cdp.send('Target.createTarget',{url:'about:blank',background:true});
    for(const motion of motions){await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:motion==='reduced'?'reduce':'no-preference'}]},sessionId);
      for(const id of ids)for(const mode of modes){const key=[id,mode,motion].join('-');report.active=key;save();let a,b,resumed,caller,error;
        try{
          await cdp.send('Target.activateTarget',{targetId:target.targetId});await until('!document.hidden','Foreground before mount');const started=await evaluate('('+mount.toString()+')('+JSON.stringify(id)+','+JSON.stringify(mode)+')');await until('visibilityProbe.frames>=2&&visibilityProbe.timers>=1&&!document.querySelector(".stage")._runtime.suspended','Live initial runtime');
          await cdp.send('Target.activateTarget',{targetId:cover.targetId});await until('document.hidden&&document.querySelector(".stage")._runtime.suspended','Actual native hidden page');await wait(50);a=await evaluate('('+snapshot.toString()+')()');await evaluate('document.querySelector(".stage")._runtime.setTimeout(()=>visibilityProbe.queued++,0)');await wait(140);b=await evaluate('('+snapshot.toString()+')()');
          check(a.hidden&&a.visibility==='hidden'&&!a.documentOverrides,'Native hidden properties '+key);check(a.events.at(-1)?.hidden&&a.events.at(-1)?.trusted,'Trusted hidden event '+key);for(const field of frozenKeys)same(b[field],a[field],'Frozen '+field+' '+key);
          await cdp.send('Target.activateTarget',{targetId:target.targetId});await until('!document.hidden','Native foreground return');resumed=await evaluate('('+snapshot.toString()+')()');check(!resumed.suspended&&!resumed.documentOverrides,'Visibility releases its own hold '+key);check(resumed.events.at(-1)?.trusted&&!resumed.events.at(-1)?.hidden,'Trusted visible event '+key);const visibleAt=resumed.events.at(-1).time;check(resumed.clock-b.clock<=resumed.wall-visibleAt+1,'Hidden wall time excluded '+key);await until('visibilityProbe.queued===1&&visibilityProbe.frames>'+b.probe.frames,'Pending jobs resume '+key);
          await evaluate('document.querySelector(".stage")._runtime.suspend()');await cdp.send('Target.activateTarget',{targetId:cover.targetId});await until('document.hidden','Caller-owned background');await cdp.send('Target.activateTarget',{targetId:target.targetId});await until('!document.hidden','Caller-owned return');caller=await evaluate('('+snapshot.toString()+')()');check(caller.suspended,'Caller hold survives visible return '+key);same(caller.errors.slice(started.errorStart),[],'No component errors '+key);await evaluate('document.querySelector(".stage")._runtime.resume()');await until('!document.querySelector(".stage")._runtime.suspended','Caller releases its hold');
        }catch(e){error=e.stack;report.failures.push({key,error});}
        finally{const evidence={key,a,b,resumed,caller,error},bytes=zlib.gzipSync(JSON.stringify(evidence));fs.writeFileSync(path.join(out,key+'.json.gz'),bytes);report.rows.push({id,mode,motion,pass:!error,evidence:key+'.json.gz',sha256:hash(bytes),...(a?{hidden:summary(a)}:{}),...(b?{after:summary(b)}:{}),...(resumed?{resumed:summary(resumed)}:{}),...(error?{error}:{})});save();await evaluate('document.querySelector(".stage")?._runtime?.dispose()').catch(()=>{});}
        console.log((error?'FAIL':'PASS')+' '+key+(error?' '+error.split('\n')[0]:''));
      }
    }
    for(const[file,expected]of Object.entries(inputs))same(hash(fs.readFileSync(path.join(root,file))),expected,'Stable source '+file);report.finished=new Date().toISOString();report.sourceStable=true;delete report.active;save();check(report.failures.length===0,'Native visibility failures: '+report.failures.length);console.log('PASS '+report.checks+' checks in '+report.rows.length+' actual browser visibility stories');
  }finally{save();if(cdp){await cdp.send('Browser.close').catch(()=>{});cdp.ws.close();}else child.kill();}
})().catch(e=>{report.error=e.stack;save();console.error(e.stack);process.exitCode=1;});
