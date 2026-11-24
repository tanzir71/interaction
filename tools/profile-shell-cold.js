/* Actual cold navigation and trusted warm caption timing, with every trace retained. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const option=name=>process.argv.find(arg=>arg.startsWith('--'+name+'='))?.slice(name.length+3);
if(process.argv.includes('--help')){console.log('node tools/profile-shell-cold.js [URL] [--ids=elastic-tabs] [--repeats=3] [--cpu=1] [--output=.artifacts/shell-cold] [--record-only]\nCold empty contexts and real warm caption clicks at 1440/390px in both themes. Preserves the earlier font-ready heading/two-frame stage method, actual Back scroll, browser traces, resources and long tasks. No startup sample is discarded. The 300ms result is a local observation, not an all-component or CPU4 frame-rate certificate.');process.exit(0);}
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=(process.argv.find(arg=>/^https?:/.test(arg))||'http://127.0.0.1:4173').replace(/\/$/,''),ids=(option('ids')||'elastic-tabs').split(','),repeats=Number(option('repeats')||3),cpu=Number(option('cpu')||1),catalog=JSON.parse(fs.readFileSync('registry/index.json','utf8'));
assert(ids.length&&new Set(ids).size===ids.length&&ids.every(id=>catalog.some(item=>item.id===id)));assert(Number.isInteger(repeats)&&repeats>0);assert(cpu>=1&&Number.isFinite(cpu));
const output=path.resolve(option('output')||'.artifacts/shell-cold',new Date().toISOString().replace(/[:.]/g,'-'));assert(!fs.existsSync(output));fs.mkdirSync(output,{recursive:true});
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex'),hash=file=>sha(fs.readFileSync(file)),files=[__filename,'index.html','css/foundations.css','css/fonts.css','registry/index.json','assets/fonts/geist-variable.woff2','assets/fonts/geist-mono-variable.woff2','assets/fonts/inter-latin-variable.woff2',...fs.readdirSync('js/shell').filter(file=>file.endsWith('.js')).map(file=>'js/shell/'+file),...fs.readdirSync('js/shell/views').filter(file=>file.endsWith('.js')).map(file=>'js/shell/views/'+file),'js/demo-runtime.js',...new Set(ids.map(id=>catalog.find(item=>item.id===id).module.split('?')[0]))];
const report={started:new Date().toISOString(),base,cpu,ids,repeats,inputs:Object.fromEntries(files.map(file=>[file,hash(file)])),method:['One fresh browser process; one empty browser context per sample. No priming sample or outlier is removed.','Heading paint preserves the earlier document.fonts.ready plus two animation-frame method. Stage paint preserves two frames after the actual full boot. Assets-ready is separate.','Warm starts at trusted caption pointerdown; Back must restore the actual click-time library scroll.','CPU throttling is applied before navigation. Network is local without emulated latency; OS caches and other applications are not controlled.','The explicit 300ms result covers only the recorded local routes/settings. It does not establish all-component startup, native CPU4 frame rate or Lighthouse acceptance.'],cases:[]};
const save=()=>fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n'),guard=()=>{for(const[file,value]of Object.entries(report.inputs))assert.equal(hash(file),value,'Stable profile input '+file);};save();
async function finishTrace(session){const done=new Promise(resolve=>session.once('Tracing.tracingComplete',resolve));await session.send('Tracing.end');const{stream}=await done;let json='';for(;;){const row=await session.send('IO.read',{handle:stream});json+=row.base64Encoded?Buffer.from(row.data,'base64').toString():row.data;if(row.eof)break;}await session.send('IO.close',{handle:stream});return json;}
async function main(){
 const browser=await chromium.launch({...(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{}),args:['--enable-unsafe-swiftshader']});report.browser=browser.version();
 try{for(const id of ids)for(const width of[1440,390])for(const theme of['dark','light'])for(let repeat=1;repeat<=repeats;repeat++)for(const mode of['cold','warm']){
  guard();const name=[id,width,theme,repeat,mode].join('-'),context=await browser.newContext({viewport:{width,height:900},reducedMotion:'no-preference'}),page=await context.newPage(),errors=[],session=await context.newCDPSession(page);page.on('pageerror',error=>errors.push(error.message));let tracing=false,result,error;
  try{
   await session.send('Emulation.setCPUThrottlingRate',{rate:cpu});
   await context.addInitScript(({id,theme,mode})=>{
    localStorage.setItem('intrx-theme',theme);const timing=window.detailTiming={id,start:mode==='cold'?0:null,longTasks:[],lcp:[]},frames=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    new PerformanceObserver(list=>timing.longTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration,name:e.name})))).observe({type:'longtask',buffered:true});
    new PerformanceObserver(list=>timing.lcp.push(...list.getEntries().map(e=>({start:e.startTime,render:e.renderTime,load:e.loadTime,size:e.size,url:e.url,element:e.element?.tagName,classes:e.element?.getAttribute('class')})))).observe({type:'largest-contentful-paint',buffered:true});
    document.addEventListener('pointerdown',event=>{const caption=event.target.closest('.tile-details');if(caption?.closest('.tile')?.id==='tile-'+id){timing.start=performance.now();timing.libraryScroll=scrollY;performance.mark('intrx-route-input');}},true);
    const observer=new MutationObserver(()=>{if(timing.heading!==undefined||!document.querySelector('.detail-header h1'))return;timing.heading=performance.now();performance.mark('intrx-route-heading');(async()=>{await document.fonts.ready;await frames();timing.headingPaint=performance.now();})();});observer.observe(document,{childList:true,subtree:true});
    document.addEventListener('intrx:boot',event=>{if(event.detail.mode!=='full'||event.detail.id!==id)return;timing.boot=performance.now();performance.mark('intrx-route-boot');(async()=>{await frames();timing.stagePaint=performance.now();await document.fonts.ready;await Promise.all([...event.target.querySelectorAll('img')].map(image=>image.decode()));await frames();timing.assetsReady=performance.now();})();},true);
   },{id,theme,mode});
   await session.send('Tracing.start',{categories:'devtools.timeline,toplevel,blink.user_timing,loading,v8',transferMode:'ReturnAsStream'});tracing=true;
   await page.goto(base+'/'+(mode==='cold'?'#/c/'+id:'#/library'),{waitUntil:'domcontentloaded'});
   if(mode==='warm'){
    await page.waitForFunction(()=>INTRX.shellStarted);
    while(!await page.locator('#tile-'+id).count()){assert(await page.locator('#show-more').isVisible(),'Catalog contains warm caption '+id);await page.locator('#show-more').click();}
    await page.evaluate(()=>scrollTo(0,120));await page.locator('#tile-'+id+' .tile-details').click();
   }
   await page.waitForFunction(()=>detailTiming.start!==null&&detailTiming.headingPaint!==undefined&&detailTiming.assetsReady!==undefined);
   const timing=await page.evaluate(()=>({...detailTiming,scrollY,paint:performance.getEntriesByType('paint').map(e=>({name:e.name,start:e.startTime})),resources:performance.getEntriesByType('resource').map(e=>({name:e.name,start:e.startTime,duration:e.duration,transfer:e.transferSize,encoded:e.encodedBodySize,decoded:e.decodedBodySize,initiator:e.initiatorType})),navigation:performance.getEntriesByType('navigation').map(e=>e.toJSON())}));
   result={timing,headerPaint:timing.headingPaint-timing.start,stagePaint:timing.stagePaint-timing.start,assetsReady:timing.assetsReady-timing.start};
   if(mode==='warm'){await page.goBack();await page.waitForFunction(expected=>INTRX.router.current==='#/library'&&scrollY===expected,timing.libraryScroll);result.backScroll=await page.evaluate(()=>scrollY);}
  }catch(e){error=e.stack;}
  finally{
   if(tracing){const data=await finishTrace(session),bytes=zlib.gzipSync(data),file=name+'.trace.json.gz';fs.writeFileSync(path.join(output,file),bytes);const events=JSON.parse(data).traceEvents,heading=events.find(e=>e.name==='intrx-route-heading'),boot=events.find(e=>e.name==='intrx-route-boot'),paintAfter=mark=>{const paint=mark&&events.find(e=>e.name==='Paint'&&e.ts>=mark.ts);return paint?{afterMarkMs:(paint.ts-mark.ts)/1000,durationMs:(paint.dur||0)/1000}:null;};result={...result,trace:{file,sha256:sha(bytes),headingPaint:paintAfter(heading),bootPaint:paintAfter(boot)}};}
   await session.detach();await context.close();
  }
  const row={id,width,theme,repeat,mode,...result,errors,...(error?{error}:{})};report.cases.push(row);save();console.log(JSON.stringify({name,heading:row.headerPaint,stage:row.stagePaint,assets:row.assetsReady,error,errors}));guard();assert(!error,error);assert.deepEqual(errors,[]);
 }
 report.finished=new Date().toISOString();report.allRecordedPaintsUnder300=report.cases.every(row=>row.headerPaint<300&&row.stagePaint<300&&!row.errors.length);report.sourceStable=true;save();if(!report.allRecordedPaintsUnder300&&!process.argv.includes('--record-only'))process.exitCode=1;
 }finally{await browser.close();}
}
main().catch(error=>{report.error=error.stack;save();console.error(error.stack);process.exitCode=1;});
