const H=require('./verification/skeuo-instruments-harness'),{fs,assert,hash,dir}=H;
const rate=Number(process.argv.find(a=>a.startsWith('--cpu='))?.slice(6)||4),selected=process.argv.find(a=>a.startsWith('--ids='))?.slice(6).split(','),modes=(process.argv.find(a=>a.startsWith('--modes='))?.slice(8)||'thumb,full').split(','),tag=Date.now();
assert([1,4].includes(rate));assert(modes.every(m=>['thumb','full'].includes(m)));

async function story({kind,C,mode}){
 const stage=document.querySelector('#skeuo-instruments-profile'),root=stage._root,start=performance.now(),intervals=[],events=[],longTasks=[],fired=new Set();let previous=null,cycles=0,lastInput=-Infinity;
 const observer=new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(e=>({at:e.startTime-start,duration:e.duration}))));observer.observe({type:'longtask'});
 const control=()=>root.querySelector((mode==='thumb'?'.'+C+'-native':'.'+C+'-host-plane')+(kind==='gauge'?' input':' button[data-action=bold]')),dock=name=>{stage.querySelector('.stage-dock [data-action='+name+']').click();cycles++;},range=value=>{const n=control();n.value=value;n.dispatchEvent(new Event('input',{bubbles:true}));cycles++;},buttonKey=type=>control().dispatchEvent(new KeyboardEvent(type,{key:'Enter',bubbles:true})),click=()=>{control().click();cycles++;},action=()=>{if(kind==='gauge')range(-8);else if(kind==='macro')click();else dock('forward');},press=high=>{if(kind==='gauge')range(high?3:-20);else if(kind==='macro')buttonKey('keydown');else dock('play');},release=(activate=true)=>{if(kind==='macro'){buttonKey('keyup');if(activate)click();}},once=(name,at,t,job)=>{if(t>=at&&!fired.has(name)){fired.add(name);job();events.push({name,at:t});}};
 await new Promise(resolve=>requestAnimationFrame(function frame(now){if(previous!==null)intervals.push(now-previous);previous=now;const t=now-start;
 once('press',180,t,()=>press(true));once('release',300,t,()=>release());once('press-again',1000,t,()=>press(false));once('release-again',1120,t,()=>release());once('interrupt-press',2180,t,()=>press(true));once('interrupt-release',2300,t,()=>{if(kind==='gauge')range(-20);else if(kind==='tape')dock('rewind');else release(false);});once('hold',2400,t,()=>stage._runtime.suspend());once('queued-action',3600,t,action);once('resume',4000,t,()=>stage._runtime.resume());once('second-press',4300,t,()=>press(false));once('second-release',4420,t,()=>release());once('last-press',5700,t,()=>press(true));once('last-release',5820,t,()=>release());once('finish',7000,t,action);
 if(kind==='gauge'&&((t>350&&t<2100)||(t>4450&&t<5400))&&t-lastInput>=64){lastInput=t;range(-15+cycles%19);}
 if(t>=8000)resolve();else requestAnimationFrame(frame);
 }));const end=performance.now();observer.disconnect();const sum=intervals.reduce((a,b)=>a+b,0),sorted=intervals.slice().sort((a,b)=>a-b),value=readInstrumentsProfile();return{duration:end-start,frames:intervals.length,fps:intervals.length/sum*1000,p95:sorted[Math.ceil(sorted.length*.95)-1],gaps:intervals.flatMap((ms,i)=>ms>25?[{frame:i+1,ms}]:[]),longTasks,events,cycles,storyComplete:['press','release','interrupt-press','interrupt-release','hold','queued-action','resume','second-press','second-release','finish'].every(n=>fired.has(n)),source:value.state,held:value.held,audioCalls};
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
   await page.goto(H.base+'/.artifacts/skeuo-instruments/profile-blank.html');for(const f of['css/style.css','css/fonts.css'])await page.addStyleTag({url:H.base+'/'+f});
   await page.evaluate(assets=>window.INTRX={resolveAssets:v=>v.replace(/\{\{asset:([\w-]+)\}\}/g,(_,n)=>'/'+assets[n])},JSON.parse(fs.readFileSync('assets/demo-assets.json')));
   for(const f of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:H.base+'/'+f});
   await page.evaluate(()=>Promise.all([document.fonts.load('400 17.5px "Geist Mono"'),document.fonts.load('500 17.5px Geist'),document.fonts.load('500 13.5px Inter')]));
   const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate});const trace=[];cdp.on('Tracing.dataCollected',e=>trace.push(...e.value));
   await cdp.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing,disabled-by-default-devtools.timeline.frame',transferMode:'ReportEvents'});
   await page.evaluate(({demo,width,height,mode})=>{
    window.instrumentsProfileStart=performance.now();performance.mark('instruments-mount');document.body.innerHTML='<div id="skeuo-instruments-profile" class="demo-stage stage" style="position:relative;width:'+width+'px;height:'+height+'px"></div>';
    INTRX.mountStage(demo,document.querySelector('#skeuo-instruments-profile'),mode);window.readInstrumentsProfile=(full=false)=>{const r=document.querySelector('#skeuo-instruments-profile')._root;return(r.__NativeSkeuoInspect||r.__SkeuoInspect)(full);};
   },{demo:H.demos.get(c.id),width:mode==='thumb'?mobile?328:372:mobile?328:650,height:mode==='thumb'?264:mobile?420:660,mode});
   await page.waitForFunction(()=>{if(document.querySelector('#skeuo-instruments-profile').dataset.bootError==='true')throw Error('Instruments profile boot failed');return readInstrumentsProfile().ready;});
   const startup=await page.evaluate(()=>({ready:performance.now()-instrumentsProfileStart,firstContentfulPaint:performance.getEntriesByName('first-contentful-paint')[0]?.startTime-instrumentsProfileStart}));
   assert.equal(await page.evaluate(()=>audioCalls),0);
   const motion=await page.evaluate(story,{kind:c.kind,C:c.C,mode});assert(motion.storyComplete);assert.equal(motion.held,false);assert.equal(motion.audioCalls,0);
   await page.evaluate(()=>document.querySelector('#skeuo-instruments-profile')._runtime.dispose());await page.waitForFunction(()=>{const v=readInstrumentsProfile();return v.dead&&v.lifecycle.listeners===0&&v.lifecycle.pendingFrames===0&&v.lifecycle.pendingTimers===0;});assert.deepEqual(errors,[]);
   const stopped=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');await stopped;
   const file='profile-'+c.kind+'-'+mode+'-'+(mobile?'mobile':'desktop')+'-cpu'+rate+'-'+tag+'-trace.json';fs.writeFileSync(dir+'/'+file,JSON.stringify({traceEvents:trace}));
   const mark=trace.find(e=>e.name==='instruments-mount'),paint=trace.find(e=>e.name==='Paint'&&e.ts>=mark?.ts);assert(mark&&paint,'Browser trace includes first paint after the mount mark');startup.firstPaint=(paint.ts-mark.ts)/1000;startup.firstPaintMetric='first trace Paint after mount';startup.firstContentfulPaint=Number.isFinite(startup.firstContentfulPaint)?startup.firstContentfulPaint:null;
   const result={kind:c.kind,mode,mobile,cpu:rate,dpr:mobile?2:1,startup,audioConstructed:motion.audioCalls,motion,trace:{file,sha256:hash(fs.readFileSync(dir+'/'+file)),events:trace.length}};
   results.push(result);fs.writeFileSync(cacheFile,JSON.stringify({at:new Date().toISOString(),sourceHashes,result}));
   console.log(c.kind+' '+mode+' '+(mobile?'mobile':'desktop')+' / '+motion.fps.toFixed(2)+'fps / '+motion.gaps.length+' gaps / '+startup.firstPaint.toFixed(1)+'ms first trace Paint');
   fs.writeFileSync(dir+'/profile-progress-cpu'+rate+'.json',JSON.stringify({at:new Date().toISOString(),cases:results.length,total:modes.length*2*scenes.length,last:c.kind+' '+mode+' '+mobile}));
  }finally{await browser.close();}
 }
 assert.deepEqual(H.hashes(__filename),sourceHashes);
 fs.writeFileSync(dir+'/performance-cpu'+rate+'-'+tag+'.json',JSON.stringify({at:new Date().toISOString(),sourceHashes,parameters:{cpu:rate,ids:selected||scenes.map(c=>c.id),modes},results,complete:true,timingGatePassed:false,scope:'Isolated emitted native/full Skeuomorph instruments demos at CPU1/4, desktop DPR1 and mobile DPR2. Eight-second scripted DOM events exercise real source controllers and needle springs, all formatting macro states and complete tape reel/transport output, active caller holds, queued actions and resume. Actual RAF intervals, long tasks, first browser trace Paint after the mount mark, readiness and CDP traces are recorded. PaintTiming FCP is separately recorded when available; the CSS-only native macro caps need not emit FCP. Fonts are prepared before mounting; state is read only at endpoints. Physical input and original-model equivalence are verified separately. All three controls reject audio construction. Measurements exclude route transfer and do not pass final timing gates.'},null,2)+'\n');
})().catch(e=>{console.error(e.stack?.slice(0,3000));process.exitCode=1;});
