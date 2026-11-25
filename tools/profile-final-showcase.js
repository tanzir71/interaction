/* Current Stage styles and real source clocks; measurements are findings, not acceptance. */
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict');
if(process.argv.includes('--help')){console.log('Usage: node tools/profile-final-showcase.js [http://127.0.0.1:4173] [--ids=showcase-threads,...] [--cpu=1,4] [--modes=thumb,full] [--reference=candidate.json] [--output=.artifacts/final-showcase-profiles]\nRequires external Playwright via PLAYWRIGHT_MODULE; optionally set INTRX_CHROME_EXECUTABLE. Run without other heavy checks. Each run preserves all reports and traces. An optional reference has {definitions:[demo,...]} and may change only JS in memory; it never edits production modules.');process.exit(0);}
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),registry=require('./load-registry')();
const root=path.resolve(__dirname,'..'),hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const option=name=>process.argv.find(value=>value.startsWith('--'+name+'='))?.slice(name.length+3);
const base=(process.argv.find(value=>/^https?:/.test(value))||'http://127.0.0.1:4173').replace(/\/$/,'');
const all=[...require('./fixtures/showcase-fields/configs.json'),...require('./fixtures/showcase-spatial/native-configs.json')].map(value=>value.id);
const ids=option('ids')?.split(',')||all,cpus=(option('cpu')||'1,4').split(',').map(Number),modes=(option('modes')||'thumb,full').split(',');
const referenceFile=option('reference');
const referencePath=referenceFile&&path.resolve(root,referenceFile);
if(referencePath){
  const {definitions}=JSON.parse(fs.readFileSync(referencePath,'utf8'));
  assert(Array.isArray(definitions)&&definitions.length,'Reference definitions must be a nonempty array');
  assert.equal(new Set(definitions.map(candidate=>candidate.id)).size,definitions.length,'Duplicate reference IDs');
  for(const candidate of definitions){
    assert(ids.includes(candidate.id),'Candidate ID is profiled');
    const original=registry.demos.find(demo=>demo.id===candidate.id);
    assert(original,'Unknown reference ID');
    assert.equal(typeof candidate.js,'string','Reference JS must be a string');
    const {js:originalJS,...originalFields}=JSON.parse(JSON.stringify(original)),{js:candidateJS,...candidateFields}=candidate;
    assert.deepEqual(candidateFields,originalFields,'Only renderer JS may differ: '+candidate.id);
  }
  for(const candidate of definitions)registry.demos.find(demo=>demo.id===candidate.id).js=candidate.js;
}
assert(ids.length&&ids.every(id=>all.includes(id)),'Unknown or missing Showcase ID');
assert.equal(new Set(ids).size,ids.length,'Duplicate Showcase IDs');
assert(cpus.length&&cpus.every(cpu=>Number.isFinite(cpu)&&cpu>=1),'CPU rates must be at least 1');
assert(modes.length&&modes.every(mode=>['thumb','full'].includes(mode)),'Modes must be thumb or full');
const styles=['css/foundations.css','css/fonts.css'],scripts=['js/demo-runtime.js','js/shell/stage.js'];
const files=[...new Set([path.relative(root,__filename),...styles,...scripts,'tools/load-registry.js','js/shell/registry.js','js/shell/access.js','js/meta.stage.js','js/registry-files.json',...ids.map(id=>registry.filesById[id]),'tools/fixtures/showcase-fields/rig.html','tools/fixtures/showcase-fields/configs.json','tools/fixtures/showcase-spatial/native-configs.json'])];
if(referencePath)files.push(path.relative(root,referencePath));
for(const match of fs.readFileSync(path.join(root,'css/fonts.css'),'utf8').matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g))if(!/^(?:https?:|data:)/.test(match[1]))files.push(path.relative(root,path.resolve(root,'css',match[1])).replaceAll('\\','/'));
const inputs=Object.fromEntries([...new Set(files)].map(file=>[file.replaceAll('\\','/'),hash(path.join(root,file))]));
const runId=new Date().toISOString().replace(/[:.]/g,'-')+'-'+inputs['js/demos.showcase.js'].slice(0,12);
const out=path.resolve(root,option('output')||'.artifacts/final-showcase-profiles',runId);
assert(!fs.existsSync(out),'Run directory already exists');fs.mkdirSync(out,{recursive:true});
const report={at:new Date().toISOString(),runId,scope:'Ten Showcase scenes, current foundations, prepared fonts, native/full source-clock Dock stories. This does not establish cold-route, trusted-input, recipe, contrast or site-wide acceptance.',inputs,ids,cpus,modes,styles,notes:[
  'Each completed sample and compressed trace stays in its own run directory; no older run is overwritten.',
  'Mesh runs for twelve seconds to include its original breath. Other scenes run for eight seconds. Paths completes one six-second replay; other scenes receive six Dock actions.',
  'Fonts are prepared before mounting and CPU throttling. First trace Paint and two-frame readiness include mount and image decoding; route and font transfer are excluded.',
  'The live page uses foundations.css. Frozen style.css is not a substitute for current Stage styles.',
  'The sampler uses requestAnimationFrame without layout polling during the story. It records initialization and story long tasks and checks disposal.',
  'Run sequentially without other heavy agent checks. Other applications are not controlled. Measurements do not automatically pass a timing gate.'
],cases:[]};
if(referencePath)report.reference={file:path.relative(root,referencePath).replaceAll('\\','/'),sha256:hash(referencePath),scope:'Compared renderer candidate; production modules are unchanged.'};
const save=()=>fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
function guard(){for(const[file,expected]of Object.entries(inputs))assert.equal(hash(path.join(root,file)),expected,'Changed during measurement: '+file);}
async function finishTrace(cdp){const complete=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');const{stream}=await complete;let data='';for(;;){const part=await cdp.send('IO.read',{handle:stream});data+=part.base64Encoded?Buffer.from(part.data,'base64').toString():part.data;if(part.eof)break;}await cdp.send('IO.close',{handle:stream});return data;}
(async()=>{
  const browser=await chromium.launch({...(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{}),args:['--mute-audio','--enable-unsafe-swiftshader']});
  report.browser=browser.version();console.log('Recording',path.relative(root,out).replaceAll('\\','/'));
  try{
    try{const cdp=await browser.newBrowserCDPSession(),info=await cdp.send('SystemInfo.getInfo');report.gpu={devices:info.gpu.devices,featureStatus:info.gpu.featureStatus};await cdp.detach();}catch(error){report.gpu={unavailable:String(error.message||error)};}
    for(const cpu of cpus)for(const id of ids)for(const mode of modes)for(const compact of[false,true]){
      guard();const duration=id==='showcase-mesh-surface'?12000:8000,events=id==='showcase-converging-paths'?[100]:[100,900,1700,2500,3300,4100];
      const name=[id,mode,compact?'compact-dpr2':'desktop-dpr1','cpu'+cpu].join('-');
      const context=await browser.newContext({viewport:compact?{width:390,height:812}:{width:1200,height:1000},deviceScaleFactor:compact?2:1,reducedMotion:'no-preference'}),page=await context.newPage(),errors=[];
      page.on('pageerror',error=>errors.push(error.message));let cdp,tracing=false,result,error;
      try{
        await page.goto(base+'/tools/fixtures/showcase-fields/rig.html');await page.evaluate(()=>window.INTRX={resolveAssets:value=>value});
        for(const file of styles)await page.addStyleTag({url:base+'/'+file});
        for(const file of scripts)await page.addScriptTag({url:base+'/'+file});
        await page.evaluate(()=>Promise.all([document.fonts.load('16px Geist'),document.fonts.load('16px "Geist Mono"'),document.fonts.load('16px Inter')]));
        cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:cpu});
        await cdp.send('Tracing.start',{categories:'devtools.timeline,toplevel,blink.user_timing,v8',transferMode:'ReturnAsStream'});tracing=true;
        const demo=JSON.parse(JSON.stringify(registry.demos.find(demo=>demo.id===id)));
        result=await page.evaluate(async({demo,mode,compact,events,duration})=>{
          const stage=document.createElement('div');stage.className='demo-stage stage';
          Object.assign(stage.style,{position:'relative',width:(mode==='thumb'?372:compact?390:640)+'px',height:(mode==='thumb'?264:compact?650:720)+'px'});document.body.replaceChildren(stage);
          const longTasks=[],observer=new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(entry=>({start:entry.startTime,duration:entry.duration}))));observer.observe({type:'longtask'});
          performance.mark('intrx-final-profile-start');const t0=performance.now();INTRX.mountStage(demo,stage,mode);
          await Promise.all([...stage.querySelectorAll('img')].map(image=>image.decode()));await document.fonts.ready;
          const readyMs=performance.now()-t0;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));const twoFrameReadyMs=performance.now()-t0;
          const frames=[];let first,last,index=0;
          await new Promise(resolve=>{function tick(time){if(first===undefined)first=last=time;else{frames.push(time-last);last=time;}const elapsed=time-first;while(index<events.length&&events[index]<=elapsed){const action=stage.querySelector('.dock-btn');if(!action)throw Error('Missing original Dock action');action.click();index++;}if(elapsed<duration)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
          await new Promise(resolve=>setTimeout(resolve,0));longTasks.push(...observer.takeRecords().map(entry=>({start:entry.startTime,duration:entry.duration})));observer.disconnect();
          const inspect=stage._root.__FieldInspect||stage._root.__SpatialInspect,state=JSON.parse(JSON.stringify(inspect())),sorted=[...frames].sort((a,b)=>a-b),elapsed=frames.reduce((sum,value)=>sum+value,0);
          stage._runtime.dispose();const disposed=inspect();
          return{readyMs,twoFrameReadyMs,frames:frames.length,elapsed,fps:1000*frames.length/elapsed,median:sorted[Math.floor(sorted.length*.5)],p95:sorted[Math.floor(sorted.length*.95)],max:Math.max(...frames),gapsOver25ms:frames.filter(value=>value>25).length,longTasks,events:index,state,disposed:{dead:disposed.dead,frame:disposed.frame,queue:disposed.queue,retained:disposed.retained,animations:disposed.animations,captures:disposed.captures,painterDead:disposed.painter.dead}};
        },{demo,mode,compact,events,duration});
      }catch(caught){error=caught.stack||String(caught);}
      finally{
        if(tracing){const raw=await finishTrace(cdp),traceFile=path.join(out,name+'.trace.json.gz'),bytes=zlib.gzipSync(raw);fs.writeFileSync(traceFile,bytes,{flag:'wx'});
          const trace=JSON.parse(raw).traceEvents,mark=trace.find(event=>event.name==='intrx-final-profile-start'),paint=mark&&trace.find(event=>event.name==='Paint'&&event.pid===mark.pid&&event.ts>=mark.ts);
          result={...result,trace:path.relative(root,traceFile).replaceAll('\\','/'),traceSHA256:hash(traceFile),firstPaintMs:paint?(paint.ts-mark.ts)/1000:null,firstPaintDurationMs:paint?.dur/1000||null};}
        await context.close();
      }
      const row={name,id,mode,cpu,compact,duration,...result,errors,...(error?{error}:{})};report.cases.push(row);save();
      console.log(JSON.stringify({case:name,fps:row.fps,paint:row.firstPaintMs,p95:row.p95,gaps:row.gapsOver25ms,error}));
      assert(!error,error);assert.deepEqual(errors,[]);assert.equal(row.events,events.length);assert.equal(row.state.dead,false);assert.equal(row.state.native,mode==='thumb');
      assert.equal(row.state.queue,0);assert.equal(row.state.retained,0);assert.equal(row.state.animations,0);assert.deepEqual(row.state.captures,[]);
      if(id==='showcase-converging-paths'){assert.equal(row.state.auto,mode==='thumb');if(mode==='full')assert(row.state.model.state.progress>.998);}else{assert(row.state.frame);assert(row.state.draws>400);assert.equal(row.state.dockTimers,0);assert.equal(row.state.model.api.down,false);}
      assert.equal(row.disposed.dead,true);assert.equal(row.disposed.frame,false);assert.equal(row.disposed.queue,0);assert.equal(row.disposed.retained,0);assert.equal(row.disposed.animations,0);assert.deepEqual(row.disposed.captures,[]);
      // Paths owns SVG elements and exposes renderer lifetime through the root.
      if(id!=='showcase-converging-paths')assert.equal(row.disposed.painterDead,true);guard();
    }
    report.finished=new Date().toISOString();report.sourceStable=true;save();console.log('Recorded',report.cases.length,'stories; final acceptance remains open.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error.stack);process.exitCode=1;});
