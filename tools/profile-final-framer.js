/* Current shell styles and original Framer source-clock stories; retain all observations. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const option=name=>process.argv.find(value=>value.startsWith('--'+name+'='))?.slice(name.length+3);
if(process.argv.includes('--help')){console.log('node tools/profile-final-framer.js [URL] [--ids=framer-rolling-balance,...] [--cpu=1,4] [--modes=thumb,full] [--reference=candidate.json] [--output=.artifacts/final-framer-profiles]\nRequires external PLAYWRIGHT_MODULE; optionally INTRX_CHROME_EXECUTABLE. Uses current foundations, registry/Dock bootstrap and prepared fonts. An optional {definitions:[demo,...]} reference may change only JS in memory. Run sequentially without other heavy checks. Keeps every report and trace; does not automatically accept a performance gate.');process.exit(0);}
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),R=require('./load-registry')(),configs=require('./fixtures/framer-data/configs.json'),root=path.resolve(__dirname,'..');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,file))).digest('hex'),base=(process.argv.find(value=>/^https?:/.test(value))||'http://127.0.0.1:4173').replace(/\/$/,'');
const ids=option('ids')?.split(',')||configs.map(value=>value.id),cpus=(option('cpu')||'1,4').split(',').map(Number),modes=(option('modes')||'thumb,full').split(',');
assert(ids.length&&ids.every(id=>configs.some(value=>value.id===id)),'Unknown Framer ID');assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
assert(cpus.length&&cpus.every(cpu=>Number.isFinite(cpu)&&cpu>=1));assert(modes.length&&modes.every(mode=>['thumb','full'].includes(mode)));
const referenceFile=option('reference'),referencePath=referenceFile&&path.resolve(root,referenceFile);
if(referencePath){
  const {definitions}=JSON.parse(fs.readFileSync(referencePath,'utf8'));
  assert(Array.isArray(definitions)&&definitions.length,'Reference definitions must be a nonempty array');assert.equal(new Set(definitions.map(value=>value.id)).size,definitions.length,'Duplicate reference IDs');
  for(const value of definitions){assert(ids.includes(value.id),'Candidate ID is profiled');assert.equal(typeof value.js,'string','Reference JS must be a string');const {js:originalJS,...originalFields}=JSON.parse(JSON.stringify(R.demos.find(demo=>demo.id===value.id))),{js:candidateJS,...candidateFields}=value;assert.deepEqual(candidateFields,originalFields,'Only renderer JS may differ: '+value.id);}
  for(const value of definitions)R.demos.find(demo=>demo.id===value.id).js=value.js;
}
const styles=['css/foundations.css','css/fonts.css'],scripts=['js/shell/registry.js','js/demo-runtime.js','js/shell/stage.js'];
const files=[path.relative(root,__filename),...styles,...scripts,'tools/load-registry.js','js/meta.stage.js','js/registry-files.json','tools/fixtures/framer-data/rig.html','tools/fixtures/framer-data/configs.json','tools/fixtures/framer-data/artwork.json',...ids.map(id=>R.filesById[id])];
if(referencePath)files.push(path.relative(root,referencePath));
for(const match of fs.readFileSync(path.resolve(root,'css/fonts.css'),'utf8').matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g))if(!/^(?:https?:|data:)/.test(match[1]))files.push(path.relative(root,path.resolve(root,'css',match[1])));
for(const row of require('./fixtures/framer-data/artwork.json').rows)files.push('assets/components/framer-data/'+row.file);
const inputs=Object.fromEntries([...new Set(files)].map(file=>[file.replaceAll('\\','/'),hash(file)])),runId=new Date().toISOString().replace(/[:.]/g,'-')+'-'+inputs['js/demos.framer-data.js'].slice(0,12),out=path.resolve(root,option('output')||'.artifacts/final-framer-profiles',runId);
assert(!fs.existsSync(out));fs.mkdirSync(out,{recursive:true});
const report={at:new Date().toISOString(),runId,scope:'Four Framer scenes with current foundations, registry/Dock bootstrap, original source clocks and eight-second stories. Prepared fonts and local decoded artwork; not cold-route or site-wide acceptance.',inputs,styles,scripts,ids,cpus,modes,notes:[
  'Fresh context per native/full and desktop DPR1/compact DPR2 case. Fonts are ready before CPU throttling and mount tracing.',
  'Metric counts four times. Balance makes a payment at 100ms and replays at 4100ms. Focus starts at 100ms and pauses at 6100ms. Finance visits its three original periods.',
  'One sampler RAF, no frame-time layout polling. Actual original models, source-clock frames, end state and runtime disposal are inspected.',
  'Each report and compressed trace is retained. Trace first Paint is separate from complete decoded readiness and two-frame readiness.',
  'Own heavy verification runs sequentially. Other applications and OS load are not controlled. Synthetic Dock clicks do not prove trusted input or complete recipe acceptance.'
],cases:[]};
if(referencePath)report.reference={file:path.relative(root,referencePath).replaceAll('\\','/'),sha256:hash(referencePath),scope:'In-memory renderer candidate; production modules are unchanged.'};
const save=()=>fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
function guard(){for(const[file,sha]of Object.entries(inputs))assert.equal(hash(file),sha,'Stable input '+file);}
async function finishTrace(cdp){const done=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');const{stream}=await done;let text='';for(;;){const item=await cdp.send('IO.read',{handle:stream});text+=item.base64Encoded?Buffer.from(item.data,'base64').toString():item.data;if(item.eof)break;}await cdp.send('IO.close',{handle:stream});return text;}
(async()=>{
  const browser=await chromium.launch({...(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{}),args:['--mute-audio','--enable-unsafe-swiftshader']});report.browser=browser.version();save();console.log('Recording',path.relative(root,out).replaceAll('\\','/'));
  try{
    for(const cpu of cpus)for(const id of ids)for(const mode of modes)for(const compact of[false,true]){
      guard();const kind=configs.find(value=>value.id===id).kind,events=kind==='metric'?[{at:100,action:'press'},{at:1600,action:'press'},{at:3100,action:'press'},{at:4600,action:'press'}]:kind==='balance'?[{at:100,action:'press'},{at:4100,action:'replay'}]:kind==='focus'?[{at:100,action:'press'},{at:6100,action:'press'}]:[{at:100,action:'press'},{at:2100,action:'press'},{at:4100,action:'press'}];
      const name=[id,mode,compact?'compact-dpr2':'desktop-dpr1','cpu'+cpu].join('-'),context=await browser.newContext({viewport:compact?{width:390,height:812}:{width:1200,height:1000},deviceScaleFactor:compact?2:1,reducedMotion:'no-preference'}),page=await context.newPage(),errors=[];
      page.on('pageerror',error=>errors.push(error.message));let cdp,tracing=false,result,error;
      try{
        await page.goto(base+'/tools/fixtures/framer-data/rig.html');for(const file of styles)await page.addStyleTag({url:base+'/'+file});for(const file of scripts)await page.addScriptTag({url:base+'/'+file});
        await page.evaluate(()=>Promise.all([document.fonts.load('16px Geist'),document.fonts.load('16px "Geist Mono"'),document.fonts.load('16px Inter')]));
        cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:cpu});await cdp.send('Tracing.start',{categories:'devtools.timeline,toplevel,blink.user_timing,v8',transferMode:'ReturnAsStream'});tracing=true;
        result=await page.evaluate(async({demo,mode,compact,events})=>{
          INTRX.register(demo);const stage=document.createElement('div');stage.className='stage demo-stage';Object.assign(stage.style,{position:'relative',width:(mode==='thumb'?compact?347:372:compact?344:640)+'px',height:(mode==='thumb'?264:compact?650:720)+'px'});document.body.replaceChildren(stage);
          const longTasks=[],observer=new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(value=>({start:value.startTime,duration:value.duration}))));observer.observe({type:'longtask'});
          performance.mark('intrx-framer-current-start');const started=performance.now();INTRX.mountStage(demo,stage,mode);await Promise.all([...stage.querySelectorAll('img')].map(image=>image.decode()));await document.fonts.ready;const readyMs=performance.now()-started;
          await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));const twoFrameReadyMs=performance.now()-started,frames=[];let first,last,index=0;
          await new Promise(resolve=>{function tick(time){if(first===undefined)first=last=time;else{frames.push(time-last);last=time;}const elapsed=time-first;while(index<events.length&&events[index].at<=elapsed){const button=stage.querySelector('.dock-btn[data-action="'+events[index].action+'"]');if(!button)throw Error('Missing original Dock action');button.click();index++;}if(elapsed<8000)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
          await new Promise(resolve=>setTimeout(resolve,0));longTasks.push(...observer.takeRecords().map(value=>({start:value.startTime,duration:value.duration})));observer.disconnect();const inspect=stage._root.__FramerInspect,state=JSON.parse(JSON.stringify(inspect())),sorted=[...frames].sort((a,b)=>a-b),elapsed=frames.reduce((a,b)=>a+b,0);
          stage._runtime.dispose();const after=inspect();return{readyMs,twoFrameReadyMs,frames:frames.length,elapsed,fps:1000*frames.length/elapsed,median:sorted[Math.floor(sorted.length*.5)],p95:sorted[Math.floor(sorted.length*.95)],max:Math.max(...frames),gapsOver25ms:frames.filter(value=>value>25).length,longTasks,events:index,state,disposed:{dead:after.dead,frame:after.frame,queue:after.queue,retained:after.retained,motion:after.motion,model:after.model}};
        },{demo:JSON.parse(JSON.stringify(R.demos.find(value=>value.id===id))),mode,compact,events});
      }catch(caught){error=caught.stack||String(caught);}
      finally{
        if(tracing){const raw=await finishTrace(cdp),file=path.join(out,name+'.trace.json.gz');fs.writeFileSync(file,zlib.gzipSync(raw),{flag:'wx'});const trace=JSON.parse(raw).traceEvents,mark=trace.find(value=>value.name==='intrx-framer-current-start'),paint=mark&&trace.find(value=>value.name==='Paint'&&value.pid===mark.pid&&value.ts>=mark.ts);result={...result,trace:path.relative(root,file).replaceAll('\\','/'),traceSHA256:hash(file),firstPaintMs:paint?(paint.ts-mark.ts)/1000:null};}
        await context.close();
      }
      const row={name,id,kind,mode,cpu,compact,...result,errors,...(error?{error}:{})};report.cases.push(row);save();console.log(JSON.stringify({case:name,fps:row.fps,p95:row.p95,gaps:row.gapsOver25ms,error}));
      assert(!error,error);assert.deepEqual(errors,[]);assert.equal(row.events,events.length);assert.equal(row.state.dead,false);assert.equal(row.state.native,mode==='thumb');assert.equal(row.state.held,false);
      assert(!row.state.frame&&!row.state.queue&&!row.state.retained&&!row.state.motion.pending&&!row.state.model.pending&&!row.state.model.animations);if(kind==='focus')assert.equal(row.state.model.state.running,false);
      assert(row.disposed.dead&&!row.disposed.frame&&!row.disposed.queue&&!row.disposed.retained&&!row.disposed.motion.pending&&!row.disposed.model.pending&&!row.disposed.model.animations);guard();
    }
    report.finished=new Date().toISOString();report.sourceStable=true;save();console.log('Recorded',report.cases.length,'stories; timing acceptance requires review.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error.stack);process.exitCode=1;});
