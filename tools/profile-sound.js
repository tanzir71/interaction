const H=require('./verification/sound-harness'),{fs,assert,hash,dir}=H;
const rate=Number(process.argv.find(a=>a.startsWith('--cpu='))?.slice(6)||4),selected=process.argv.find(a=>a.startsWith('--ids='))?.slice(6).split(','),modes=(process.argv.find(a=>a.startsWith('--modes='))?.slice(8)||'thumb,full').split(','),tag=Date.now();
assert([1,4].includes(rate));assert(modes.every(m=>['thumb','full'].includes(m)));

async function story({kind,C,mode}){
 const stage=document.querySelector('#sound-profile'),root=stage._root,field=root.querySelector('.'+C+'-field'),textarea=root.querySelector('textarea'),scroll=root.querySelector('.'+C+'-scroll');
 const start=performance.now(),intervals=[],events=[],longTasks=[],fired=new Set();let previous=null,lastInput=-Infinity,inputs=0;
 const observer=new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(e=>({at:e.startTime-start,duration:e.duration}))));observer.observe({type:'longtask'});
 const action=a=>{const b=stage.querySelector('[data-action='+a+']');if(!b)throw Error('Missing profile action '+a);b.click();};
 const key=(key,type='keydown')=>field.dispatchEvent(new KeyboardEvent(type,{bubbles:true,key}));
 const input=()=>{
  if(kind==='kit')root.querySelector('[data-voice='+['tick','confirm','warn','toggle'][inputs%4]+']').click();
  if(kind==='typing'){const letter='asdfg'[inputs%5];textarea.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:letter,code:'Key'+letter.toUpperCase()}));textarea.value+=letter;textarea.dispatchEvent(new InputEvent('input',{bubbles:true,data:letter,inputType:'insertText'}));textarea.dispatchEvent(new KeyboardEvent('keyup',{bubbles:true,key:letter,code:'Key'+letter.toUpperCase()}));}
  if(kind==='theremin')key(['ArrowRight','ArrowUp','ArrowLeft','ArrowDown'][Math.floor(inputs/4)%4]);
  if(kind==='chime')action('add');
  if(kind==='drums')root.querySelector('[data-cell="'+[0,8,17,25][inputs%4]+'"]').click();
  if(kind==='drone')scroll.scrollTop=(scroll.scrollHeight-scroll.clientHeight)*(.5+.45*Math.sin(inputs*.35));
  inputs++;
 };
 const once=(name,at,t,job)=>{if(t>=at&&!fired.has(name)){fired.add(name);job();events.push({name,at:t});}};
 await new Promise(resolve=>requestAnimationFrame(function frame(now){
  if(previous!==null)intervals.push(now-previous);previous=now;const t=now-start;
  once('input',200,t,()=>{if(kind==='theremin')key(' ');input();});
  if(((t>350&&t<1900)||(t>4200&&t<6500))&&t-lastInput>=(kind==='chime'?650:kind==='drums'?400:100)){lastInput=t;input();}
  once('release',2000,t,()=>{if(kind==='theremin')key(' ','keyup');});
  once('interrupt',2400,t,()=>{stage._runtime.suspend();});
  once('reset',3600,t,()=>{action(kind==='chime'?'clear':'reset');});
  once('resume',4000,t,()=>{stage._runtime.resume();if(kind==='drums')action('play');if(kind==='theremin')key(' ');});
  once('finish',6800,t,()=>{if(kind==='theremin')key(' ','keyup');if(kind==='drone')scroll.scrollTop=scroll.scrollHeight-scroll.clientHeight;});
  if(t>=8000)resolve();else requestAnimationFrame(frame);
 }));
 const end=performance.now();observer.disconnect();const sum=intervals.reduce((a,b)=>a+b,0),sorted=intervals.slice().sort((a,b)=>a-b),state=window.readSoundProfile();
 return{duration:end-start,frames:intervals.length,fps:intervals.length/sum*1000,p95:sorted[Math.ceil(sorted.length*.95)-1],gaps:intervals.flatMap((ms,i)=>ms>25?[{frame:i+1,ms}]:[]),longTasks,events,inputs,storyComplete:['input','release','interrupt','reset','resume','finish'].every(n=>fired.has(n)),source:state.state,sourceClock:state.sourceClock,audio:state.audio,held:state.held,speakerAttempts};
}

async function activate(page,c){
 const stage=page.locator('#sound-profile');
 if(['kit','typing','drone'].includes(c.kind))await stage.locator('[data-action=enable]').click();
 else if(c.kind==='theremin'){await stage.locator('.'+c.C+'-field').focus();await stage.locator('.'+c.C+'-field').press('Space');}
 else await stage.locator('[data-action='+ (c.kind==='chime'?'add':'play')+']').click();
 await page.waitForFunction(()=>readSoundProfile().audio.contexts.some(c=>c.state==='running'&&!c.pending));
}

(async()=>{
 const sourceHashes=H.hashes(__filename),results=[],scenes=H.configs.filter(c=>!selected||selected.includes(c.id)||selected.includes(c.kind));assert(scenes.length);
 fs.writeFileSync(dir+'/profile-blank.html','<!doctype html><base href="/"><meta charset="utf-8"><body></body>');
 for(const mode of modes)for(const mobile of[false,true])for(const c of scenes){
  const cacheFile=dir+'/profile-result-'+c.kind+'-'+mode+'-'+(mobile?'mobile':'desktop')+'-cpu'+rate+'.json',cached=fs.existsSync(cacheFile)?JSON.parse(fs.readFileSync(cacheFile)):null;
  if(process.argv.includes('--reuse')&&cached&&JSON.stringify(cached.sourceHashes)===JSON.stringify(sourceHashes)){assert.deepEqual(H.hashes(__filename),sourceHashes);results.push(cached.result);console.log('CHECK current timing '+c.kind+' '+mode+' '+mobile+' CPU'+rate);continue;}
  const browser=await H.chromium.launch({headless:true}),context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1000,height:900},deviceScaleFactor:mobile?2:1,reducedMotion:'no-preference'}),page=await context.newPage(),errors=[];
  await context.addInitScript(H.audioSink);page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto(H.base+'/.artifacts/sound/profile-blank.html');for(const f of['css/style.css','css/fonts.css'])await page.addStyleTag({url:H.base+'/'+f});
   await page.evaluate(assets=>window.INTRX={resolveAssets:v=>v.replace(/\{\{asset:([\w-]+)\}\}/g,(_,n)=>'/'+assets[n])},JSON.parse(fs.readFileSync('assets/demo-assets.json')));
   for(const f of['js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:H.base+'/'+f});
   await page.evaluate(()=>Promise.all([document.fonts.load('400 17.5px "Geist Mono"'),document.fonts.load('500 17.5px Geist')]));
   const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate});const trace=[];cdp.on('Tracing.dataCollected',e=>trace.push(...e.value));
   await cdp.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing,disabled-by-default-devtools.timeline.frame',transferMode:'ReportEvents'});
   await page.evaluate(({demo,width,height,mode})=>{
    window.soundProfileStart=performance.now();document.body.innerHTML='<div id="sound-profile" class="stage" style="position:relative;width:'+width+'px;height:'+height+'px"></div>';
    INTRX.mountStage(demo,document.querySelector('#sound-profile'),mode);window.readSoundProfile=(full=false)=>{const r=document.querySelector('#sound-profile')._root;return(r.__NativeSoundInspect||r.__SoundInspect)(full);};
   },{demo:H.demos.get(c.id),width:mode==='thumb'?mobile?328:372:mobile?328:650,height:mode==='thumb'?264:mobile?420:660,mode});
   await page.waitForFunction(()=>{if(document.querySelector('#sound-profile').dataset.bootError==='true')throw Error('Sound profile boot failed');return readSoundProfile().ready;});
   await page.waitForFunction(()=>performance.getEntriesByName('first-contentful-paint').length>0);
   const startup=await page.evaluate(()=>({ready:performance.now()-soundProfileStart,firstPaint:performance.getEntriesByName('first-contentful-paint')[0].startTime-soundProfileStart}));
   await activate(page,c);const activated=await page.evaluate(()=>readSoundProfile().audio);assert(activated.contexts.length>0,'Trusted activation precedes timing');
   const motion=await page.evaluate(story,{kind:c.kind,C:c.C,mode});assert(motion.storyComplete);assert.equal(motion.held,false);assert.equal(motion.speakerAttempts,0);assert(motion.audio.contexts.some(c=>c.state==='running'),'Audio remains active after resume');
   await page.evaluate(()=>document.querySelector('#sound-profile')._runtime.dispose());await page.waitForFunction(()=>{const v=readSoundProfile();return v.dead&&v.audio.contexts.length===0&&!v.audio.closing;});assert.deepEqual(errors,[]);
   const stopped=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');await stopped;
   const file='profile-'+c.kind+'-'+mode+'-'+(mobile?'mobile':'desktop')+'-cpu'+rate+'-'+tag+'-trace.json';fs.writeFileSync(dir+'/'+file,JSON.stringify({traceEvents:trace}));
   const result={kind:c.kind,mode,mobile,cpu:rate,dpr:mobile?2:1,startup,trustedAudioActivation:true,motion,trace:{file,sha256:hash(fs.readFileSync(dir+'/'+file)),events:trace.length}};
   results.push(result);fs.writeFileSync(cacheFile,JSON.stringify({at:new Date().toISOString(),sourceHashes,result}));
   console.log(c.kind+' '+mode+' '+(mobile?'mobile':'desktop')+' / '+motion.fps.toFixed(2)+'fps / '+motion.gaps.length+' gaps / '+startup.firstPaint.toFixed(1)+'ms FCP');
   fs.writeFileSync(dir+'/profile-progress-cpu'+rate+'.json',JSON.stringify({at:new Date().toISOString(),cases:results.length,total:modes.length*2*scenes.length,last:c.kind+' '+mode+' '+mobile}));
  }finally{await browser.close();}
 }
 assert.deepEqual(H.hashes(__filename),sourceHashes);
 fs.writeFileSync(dir+'/performance-cpu'+rate+'-'+tag+'.json',JSON.stringify({at:new Date().toISOString(),sourceHashes,parameters:{cpu:rate,ids:selected||scenes.map(c=>c.id),modes},results,complete:true,timingGatePassed:false,scope:'Isolated emitted native/full Sound instruments, desktop DPR1 and mobile DPR2 at CPU1/4. Eight-second stories exercise complete original instruments with actual running AudioContexts, trusted activation, interrupted caller holds, queued Reset and resume. Audio is redirected to an inaudible MediaStream; speaker connections are rejected. Real RAF intervals, long tasks, first paint, readiness and CDP traces are recorded. Fonts are prepared before mounting; state is read only at endpoints. Physical input and exact original synthesis/PCM are verified separately. Public route transfer and final timing gates remain open.'},null,2)+'\n');
})().catch(e=>{console.error(e.stack?.slice(0,3000));process.exitCode=1;});
