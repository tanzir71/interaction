const H=require('./verification/skeuo-controls-harness'),{fs,assert,hash,dir}=H;
const rate=Number(process.argv.find(a=>a.startsWith('--cpu='))?.slice(6)||4),selected=process.argv.find(a=>a.startsWith('--ids='))?.slice(6).split(','),modes=(process.argv.find(a=>a.startsWith('--modes='))?.slice(8)||'thumb,full').split(','),tag=Date.now();
assert([1,4].includes(rate));assert(modes.every(m=>['thumb','full'].includes(m)));

async function story({kind,C,mode}){
 const stage=document.querySelector('#skeuo-controls-profile'),root=stage._root,start=performance.now(),intervals=[],events=[],longTasks=[],fired=new Set();let previous=null,pressed=null,cycles=0,lastInput=-Infinity;
 const observer=new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(e=>({at:e.startTime-start,duration:e.duration}))));observer.observe({type:'longtask'});
 const input=root.querySelector(mode==='thumb'?'.'+C+'-native-range':'.'+C+'-host-plane input'),button=()=>mode==='thumb'?kind==='focus'?root.querySelector('[data-native-mode='+(cycles%2?'pause':'play')+']'):root.querySelector('.'+C+'-native-rocker'):root.querySelector('.'+C+'-host-plane > .'+C+'-model:not(.'+C+'-motion-ghost) button');
 const pointer=(node,type)=>node.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:5,pointerType:'mouse',isPrimary:true,button:0,buttons:type==='pointerdown'?1:0})),down=()=>{pressed=kind==='fader'?input:button();pointer(pressed,'pointerdown');},up=()=>{if(!pressed)return;pointer(pressed,'pointerup');if(kind!=='fader'){pressed.click();cycles++;}pressed=null;},action=()=>stage.querySelector('[data-action='+(kind==='fader'?'reset':'toggle')+']').click(),once=(name,at,t,job)=>{if(t>=at&&!fired.has(name)){fired.add(name);job();events.push({name,at:t});}};
 await new Promise(resolve=>requestAnimationFrame(function frame(now){if(previous!==null)intervals.push(now-previous);previous=now;const t=now-start;
  once('press',180,t,down);once('release',kind==='fader'?1800:300,t,up);
  if(kind!=='fader'){once('press-again',1000,t,down);once('release-again',1120,t,up);}once('interrupt-press',2180,t,down);once('interrupt-release',2300,t,up);once('hold',2400,t,()=>stage._runtime.suspend());once('queued-action',3600,t,action);once('resume',4000,t,()=>stage._runtime.resume());once('second-press',4300,t,down);once('second-release',kind==='fader'?6500:4420,t,up);
  if(kind==='fader'&&((t>200&&t<1750)||(t>4350&&t<6450))&&t-lastInput>=64){lastInput=t;input.value=String(Math.round(50+45*Math.sin(t/450)));input.dispatchEvent(new Event('input',{bubbles:true}));cycles++;}if(kind!=='fader'){once('last-press',5700,t,down);once('last-release',5820,t,up);}once('finish',7000,t,action);if(t>=8000)resolve();else requestAnimationFrame(frame);
 }));const end=performance.now();observer.disconnect();const sum=intervals.reduce((a,b)=>a+b,0),sorted=intervals.slice().sort((a,b)=>a-b),v=readControlsProfile();return{duration:end-start,frames:intervals.length,fps:intervals.length/sum*1000,p95:sorted[Math.ceil(sorted.length*.95)-1],gaps:intervals.flatMap((ms,i)=>ms>25?[{frame:i+1,ms}]:[]),longTasks,events,cycles,storyComplete:['press','release','interrupt-press','interrupt-release','hold','queued-action','resume','second-press','second-release','finish'].every(n=>fired.has(n)),source:v.state,held:v.held,audioCalls:controlAudioCalls};
}

(async()=>{
 const sourceHashes=H.hashes(__filename),results=[],scenes=H.configs.filter(c=>!selected||selected.includes(c.id)||selected.includes(c.kind));assert(scenes.length);
 fs.writeFileSync(dir+'/profile-blank.html','<!doctype html><base href="/"><meta charset="utf-8"><body></body>');
 for(const mode of modes)for(const mobile of[false,true])for(const c of scenes){
  const cacheFile=dir+'/profile-result-'+c.kind+'-'+mode+'-'+(mobile?'mobile':'desktop')+'-cpu'+rate+'.json',cached=fs.existsSync(cacheFile)?JSON.parse(fs.readFileSync(cacheFile)):null;
  if(process.argv.includes('--reuse')&&cached&&JSON.stringify(cached.sourceHashes)===JSON.stringify(sourceHashes)){assert.deepEqual(H.hashes(__filename),sourceHashes);results.push(cached.result);console.log('CHECK current timing '+c.kind+' '+mode+' '+mobile+' CPU'+rate);continue;}
  const browser=await H.chromium.launch({headless:true}),context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1000,height:900},deviceScaleFactor:mobile?2:1,reducedMotion:'no-preference'}),page=await context.newPage(),errors=[];
  await context.addInitScript(H.rejectAudio);page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto(H.base+'/.artifacts/skeuo-controls/profile-blank.html');for(const f of['css/style.css','css/fonts.css'])await page.addStyleTag({url:H.base+'/'+f});
   await page.evaluate(assets=>window.INTRX={resolveAssets:v=>v.replace(/\{\{asset:([\w-]+)\}\}/g,(_,n)=>'/'+assets[n])},JSON.parse(fs.readFileSync('assets/demo-assets.json')));
   for(const f of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:H.base+'/'+f});
   await page.evaluate(()=>Promise.all([document.fonts.load('400 17.5px "Geist Mono"'),document.fonts.load('500 17.5px Geist')]));
   const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate});const trace=[];cdp.on('Tracing.dataCollected',e=>trace.push(...e.value));
   await cdp.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing,disabled-by-default-devtools.timeline.frame',transferMode:'ReportEvents'});
   await page.evaluate(({demo,width,height,mode})=>{
    window.controlsProfileStart=performance.now();document.body.innerHTML='<div id="skeuo-controls-profile" class="demo-stage stage" style="position:relative;width:'+width+'px;height:'+height+'px"></div>';
    INTRX.mountStage(demo,document.querySelector('#skeuo-controls-profile'),mode);window.readControlsProfile=(full=false)=>{const r=document.querySelector('#skeuo-controls-profile')._root;return(r.__NativeSkeuoInspect||r.__SkeuoInspect)(full);};
   },{demo:H.demos.get(c.id),width:mode==='thumb'?mobile?328:372:mobile?328:650,height:mode==='thumb'?264:mobile?420:660,mode});
   await page.waitForFunction(()=>{if(document.querySelector('#skeuo-controls-profile').dataset.bootError==='true')throw Error('Sound profile boot failed');return readControlsProfile().ready;});
   await page.waitForFunction(()=>performance.getEntriesByName('first-contentful-paint').length>0);
   const startup=await page.evaluate(()=>({ready:performance.now()-controlsProfileStart,firstPaint:performance.getEntriesByName('first-contentful-paint')[0].startTime-controlsProfileStart}));
   assert.equal(await page.evaluate(()=>controlAudioCalls),0);
   const motion=await page.evaluate(story,{kind:c.kind,C:c.C,mode});assert(motion.storyComplete);assert.equal(motion.held,false);assert.equal(motion.audioCalls,0);
   await page.evaluate(()=>document.querySelector('#skeuo-controls-profile')._runtime.dispose());await page.waitForFunction(()=>{const v=readControlsProfile();return v.dead&&v.lifecycle.listeners===0&&v.lifecycle.pendingFrames===0&&v.lifecycle.pendingTimers===0;});assert.deepEqual(errors,[]);
   const stopped=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');await stopped;
   const file='profile-'+c.kind+'-'+mode+'-'+(mobile?'mobile':'desktop')+'-cpu'+rate+'-'+tag+'-trace.json';fs.writeFileSync(dir+'/'+file,JSON.stringify({traceEvents:trace}));
   const result={kind:c.kind,mode,mobile,cpu:rate,dpr:mobile?2:1,startup,audioConstructed:motion.audioCalls,motion,trace:{file,sha256:hash(fs.readFileSync(dir+'/'+file)),events:trace.length}};
   results.push(result);fs.writeFileSync(cacheFile,JSON.stringify({at:new Date().toISOString(),sourceHashes,result}));
   console.log(c.kind+' '+mode+' '+(mobile?'mobile':'desktop')+' / '+motion.fps.toFixed(2)+'fps / '+motion.gaps.length+' gaps / '+startup.firstPaint.toFixed(1)+'ms FCP');
   fs.writeFileSync(dir+'/profile-progress-cpu'+rate+'.json',JSON.stringify({at:new Date().toISOString(),cases:results.length,total:modes.length*2*scenes.length,last:c.kind+' '+mode+' '+mobile}));
  }finally{await browser.close();}
 }
 assert.deepEqual(H.hashes(__filename),sourceHashes);
 fs.writeFileSync(dir+'/performance-cpu'+rate+'-'+tag+'.json',JSON.stringify({at:new Date().toISOString(),sourceHashes,parameters:{cpu:rate,ids:selected||scenes.map(c=>c.id),modes},results,complete:true,timingGatePassed:false,scope:'Isolated emitted native/full Skeuomorph controls at CPU1/4, desktop DPR1 and mobile DPR2. Eight-second scripted DOM events exercise real source controllers and press/toggle/spring rendering, active caller holds, queued actions and resume. Actual RAF intervals, long tasks, cold first paint, readiness and CDP traces are recorded. Fonts are prepared before mounting; state is read only at endpoints. Physical input and original-model equivalence are verified separately. All three controls reject audio construction. Measurements exclude route transfer and do not pass final timing gates.'},null,2)+'\n');
})().catch(e=>{console.error(e.stack?.slice(0,3000));process.exitCode=1;});
