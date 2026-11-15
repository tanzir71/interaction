const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup(options={}){
 let time=0,id=0;const jobs=new Map(),listeners=new Map(),observers=[];
 const document={hidden:false,addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name)};
 const schedule=(fn,ms)=>{const key=++id;jobs.set(key,{fn,at:time+ms});return key;};
 const context={window:{INTRX:{}},document,console,performance:{now:()=>time},requestAnimationFrame:fn=>schedule(fn,16),cancelAnimationFrame:key=>jobs.delete(key),setTimeout:(fn,ms)=>schedule(fn,ms),clearTimeout:key=>jobs.delete(key)};
 context.window.IntersectionObserver=class{constructor(callback){this.callback=callback;this.disconnects=0;observers.push(this);}observe(target){this.target=target;}disconnect(){this.disconnects++;}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/demo-runtime.js'),'utf8'),context);
 const stageEvents=new Map(),stage={dataset:{mode:options.mode},isConnected:true,getAnimations:()=>[],addEventListener:(name,fn)=>stageEvents.set(name,fn),removeEventListener:name=>stageEvents.delete(name)};
 return {runtime:context.window.INTRX.createRuntime(stage),stage,jobs,context,stageEvents,observers,
  advance(ms){const end=time+ms;for(;;){const next=[...jobs].filter(([,job])=>job.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;time=next[1].at;jobs.delete(next[0]);next[1].fn(time);}time=end;},
  visibility(hidden){document.hidden=hidden;listeners.get('visibilitychange')?.();},intersection(visible){observers[0].callback([{isIntersecting:visible,intersectionRatio:visible?1:0}]);},listeners};
}
test('timeouts retain their remaining delay while suspended without native wakes',()=>{
 const s=setup();let calls=0;s.runtime.setTimeout(()=>calls++,100);s.advance(40);s.runtime.suspend();assert.equal(s.jobs.size,0);
 s.advance(1000);assert.equal(calls,0);s.runtime.resume();s.advance(59);assert.equal(calls,0);s.advance(1);assert.equal(calls,1);
});
test('intervals and pending frames stop and resume on the virtual clock',()=>{
 const s=setup();let ticks=0,times=[];s.runtime.setInterval(()=>ticks++,10);s.runtime.requestAnimationFrame(t=>times.push(t));s.advance(16);
 s.runtime.suspend();assert.equal(s.jobs.size,0);s.advance(1000);assert.equal(ticks,1);
 s.runtime.requestAnimationFrame(t=>times.push(t));assert.equal(s.jobs.size,0);s.runtime.resume();s.advance(16);
 assert.deepEqual(times,[16,32]);assert.equal(ticks,3);
});
test('speed changes preserve pending delay and scale subsequent runtime time',()=>{
 const s=setup();let calls=0;s.runtime.setTimeout(()=>calls++,100);s.advance(20);s.runtime.setSpeed(2);s.advance(39);assert.equal(calls,0);s.advance(1);assert.equal(calls,1);
 assert.throws(()=>s.runtime.setSpeed(3),{name:'RangeError'});
});
test('document visibility pauses deadlines and resumes without hidden elapsed time',()=>{
 const s=setup();let calls=0,timestamp;s.runtime.setTimeout(()=>calls++,100);s.advance(40);s.visibility(true);assert.equal(s.jobs.size,0);s.advance(1000);
 s.visibility(false);s.runtime.requestAnimationFrame(t=>timestamp=t);s.advance(16);assert.equal(timestamp,56);s.advance(44);assert.equal(calls,1);
});
test('full viewport holds freeze deadlines and exclude offscreen and hidden wall time',()=>{
 const s=setup({mode:'full'});let calls=0,timestamp;s.runtime.setTimeout(()=>calls++,100);s.advance(40);s.intersection(false);
 assert.equal(s.runtime.suspended,true);assert.equal(s.stage.dataset.suspended,'true');assert.equal(s.jobs.size,0);s.advance(1000);s.visibility(true);s.advance(1000);s.visibility(false);
 assert.equal(s.jobs.size,0);s.intersection(true);s.runtime.requestAnimationFrame(t=>timestamp=t);s.advance(16);assert.equal(timestamp,56);s.advance(44);assert.equal(calls,1);
});
test('returning to the viewport cannot override a caller pause',()=>{
 const s=setup({mode:'full'});let calls=0;s.runtime.setTimeout(()=>calls++,100);s.runtime.suspend();s.intersection(false);s.advance(1000);s.intersection(true);
 assert.equal(s.runtime.suspended,true);assert.equal(s.jobs.size,0);s.runtime.resume();s.advance(100);assert.equal(calls,1);
});
test('viewport holds retain speed changes, clean up once and leave thumbnail ownership to LiveTiles',()=>{
 const s=setup({mode:'full'});let calls=0;s.runtime.setTimeout(()=>calls++,100);s.advance(20);s.intersection(false);s.runtime.setSpeed(2);s.advance(1000);assert.equal(s.jobs.size,0);
 s.intersection(true);s.advance(39);assert.equal(calls,0);s.advance(1);assert.equal(calls,1);s.runtime.dispose();s.runtime.dispose();assert.equal(s.observers[0].disconnects,1);
 s.intersection(false);s.intersection(true);assert.equal(s.jobs.size,0);const thumb=setup({mode:'thumb'});assert.equal(thumb.observers.length,0);thumb.runtime.dispose();
});
test('disposal cancels all work, detaches visibility handling, and cleans up once',()=>{
 const s=setup();let calls=0,cleanup=0;s.runtime.cleanup=()=>cleanup++;s.runtime.onDispose(()=>cleanup++);
 s.runtime.requestAnimationFrame(()=>calls++);s.runtime.setTimeout(()=>calls++,10);s.runtime.setInterval(()=>calls++,10);
 s.runtime.dispose();s.runtime.dispose();s.advance(1000);assert.equal(calls,0);assert.equal(cleanup,2);assert.equal(s.jobs.size,0);assert.equal(s.listeners.size,0);
});
test('lifecycle preserves authored CSS pause while resuming only runtime-paused Web Animations',()=>{
 const s=setup();
 class CSSAnimation{constructor(){this.playState='running';this.plays=0;this.pauses=0;}pause(){this.pauses++;this.playState='paused';}play(){this.plays++;this.playState='running';}updatePlaybackRate(rate){this.rate=rate;}}
 s.context.window.CSSAnimation=CSSAnimation;
 const css=new CSSAnimation(),wa={playState:'running',plays:0,pause(){this.playState='paused';},play(){this.plays++;this.playState='running';},updatePlaybackRate(rate){this.rate=rate;}},authorPaused={...wa,playState:'paused',plays:0};
 s.stage.getAnimations=()=>[css,wa,authorPaused];
 s.runtime.suspend();assert.equal(s.stage.dataset.suspended,'true');assert.equal(css.pauses,0);assert.equal(wa.playState,'paused');
 s.runtime.resume();assert.equal(css.plays,0);assert.equal(wa.plays,1);assert.equal(authorPaused.plays,0);
 s.runtime.setSpeed(2);assert.equal(css.rate,2);assert.equal(css.plays,0);assert.equal(css.pauses,0);
 s.runtime.dispose();assert.equal(s.stage.dataset.suspended,'true');
});
test('CSS transitions created after a speed change inherit that speed and listeners clean up',()=>{
 const s=setup();s.runtime.setSpeed(2);const animation={rate:1,updatePlaybackRate(value){this.rate=value;}};s.stage.getAnimations=()=>[animation];
 s.stageEvents.get('transitionrun')();assert.equal(animation.rate,2);
 s.runtime.dispose();assert.equal(s.stageEvents.size,0);
});
test('default-speed CSS events do not rescan animations, while explicit speed reset still synchronizes',()=>{
 const s=setup();let scans=0;const animation={playState:'finished',rate:.75,updatePlaybackRate(value){this.rate=value;}};
 s.stage.getAnimations=()=>{scans++;return[animation];};
 s.stageEvents.get('animationstart')({type:'animationstart'});s.stageEvents.get('transitionrun')({type:'transitionrun'});
 assert.equal(scans,0);assert.equal(animation.rate,.75);
 s.runtime.setSpeed(2);assert.equal(animation.rate,2);s.runtime.setSpeed(1);assert.equal(animation.rate,1);
 const resetScans=scans;s.stageEvents.get('transitionrun')({type:'transitionrun'});assert.equal(scans,resetScans);s.runtime.dispose();
});
test('metadata defaults merge beneath inline values and remain replaceable',()=>{
 const context={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../js/shell/registry.js'),'utf8'),context);
 const R=context.window.INTRX;
 R.meta({example:{designSize:'md',stage:{theme:'dark',overflow:'clip'},a11y:{keyboard:false,reducedMotion:false}}});
 const demo={id:'example',stage:{theme:'light'},a11y:{keyboard:true}};R.register(demo);
 assert.equal(demo.stage.theme,'light');assert.equal(demo.stage.overflow,'clip');assert.equal(demo.a11y.keyboard,true);assert.equal(demo.designSize,'md');
 R.meta({example:{designSize:'sm',stage:{theme:'dark',overflow:'scroll'},a11y:{keyboard:false,reducedMotion:true}}});
 assert.equal(demo.designSize,'sm');assert.equal(demo.stage.theme,'light');assert.equal(demo.stage.overflow,'scroll');assert.equal(demo.a11y.reducedMotion,true);
});
test('fit uses declared geometry, mode padding and reserved dock space',()=>{
 const context={window:{INTRX:{}}};vm.runInNewContext(fs.readFileSync(require.resolve('../js/shell/stage.js'),'utf8'),context);
 const R=context.window.INTRX,content={dataset:{},style:{}},root={style:{},parentElement:content},stage={clientWidth:348,clientHeight:264,dataset:{}};
 const meta={designSize:'md',controls:[{label:'Next',action:'next'}]};
 assert.equal(R.fitStage(stage,root,meta,'thumb'),168/360);assert.equal(root.style.width,'480px');assert.equal(content.style.inset,'24px 24px 72px');
 stage.clientWidth=1200;stage.clientHeight=800;assert.equal(R.fitStage(stage,root,meta,'full'),1);
 assert.equal(R.fitStage(stage,root,{designSize:'bleed',controls:[]},'full'),1);assert.equal(content.style.inset,'0');assert.equal(root.style.width,'1200px');
});

test('hero thumbnails fit their declared plane while full exports retain full geometry',()=>{
 const context={window:{INTRX:{}}};vm.runInNewContext(fs.readFileSync(require.resolve('../js/shell/stage.js'),'utf8'),context);
 const R=context.window.INTRX,content={dataset:{},style:{}},root={style:{},parentElement:content},stage={clientWidth:286,clientHeight:196,dataset:{}};
 const meta={designSize:[220,220],thumbDesignSize:[220,100],thumb:'hero',controls:[{label:'Fill',action:'fill'}]};
 assert.equal(R.fitStage(stage,root,meta,'thumb'),1);assert.equal(root.style.height,'100px');
 assert.equal(R.fitStage(stage,root,meta,'full'),84/220);assert.equal(root.style.height,'220px');
 assert.equal(R.fitStage(stage,root,{...meta,thumb:'full'},'thumb'),100/220);assert.equal(root.style.height,'220px');
 stage.clientHeight=400;assert.equal(R.fitStage(stage,root,meta,'full'),1);assert.equal(root.style.height,'220px');
});
