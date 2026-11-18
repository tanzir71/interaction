/* Record actual frame timing for the four final perspective scenes.
   PLAYWRIGHT_MODULE may point to an existing Playwright installation.
   This records measurements; it does not convert timing findings into a pass.
   node tools/profile-perspective-final.js http://127.0.0.1:4173 --cpu=4
*/
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const args=process.argv.slice(2),option=(name,fallback)=>args.find(a=>a.startsWith('--'+name+'='))?.slice(name.length+3)||fallback;
const base=(args.find(a=>!a.startsWith('--'))||'http://127.0.0.1:4173').replace(/\/$/,''),rate=Number(option('cpu','4'));
assert([1,4].includes(rate),'Use --cpu=1 or --cpu=4');
const available=Object.keys(JSON.parse(fs.readFileSync('tools/fixtures/perspective-final-models.json')).models),ids=[...new Set(option('ids',available.join(',')).split(','))];
assert(ids.length&&ids.every(id=>available.includes(id)),'Select ids from the four final perspective scenes');
const file=option('out','.artifacts/performance/perspective-final-cpu'+rate+'.json'),catalog=JSON.parse(fs.readFileSync('registry/index.json')),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const inputs=[...new Set(ids.map(id=>catalog.find(d=>d.id===id).module.split('?')[0])),'css/style.css','css/fonts.css','js/demo-runtime.js','js/shell/stage.js','js/shell/registry.js','js/meta.stage.js','registry/index.json'];
const hashes=()=>Object.fromEntries(inputs.map(p=>[p,hash(p)])),sourceHashes=hashes(),harnessHash=hash(__filename);
const report={base,cpuRate:rate,framesPerCase:480,startedAt:new Date().toISOString(),complete:false,ids,sourceHashes,harnessHash,results:[],errors:[]};
fs.mkdirSync(path.dirname(file),{recursive:true});const save=()=>fs.writeFileSync(file,JSON.stringify(report,null,2));save();

function measure({id,mode,rate}){
 return new Promise((resolve,reject)=>{
  const stage=document.querySelector('#profile-final'),root=stage._root,field=root.querySelector('[class$="-field"]'),intervals=[],tasks=[],samples=[];
  const observer=new PerformanceObserver(list=>list.getEntries().forEach(entry=>tasks.push(entry.duration)));observer.observe({type:'longtask'});
  let n=0,previous=null;
  const deadline=setTimeout(()=>{observer.disconnect();reject(Error('Profile exceeded 60 seconds'))},60000);
  const key=key=>field.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
  const action=name=>{const button=stage.querySelector('[data-action="'+name+'"]');if(!button)throw Error('Missing profile action '+name);button.click()};
  function frame(now){
   try{
    if(previous!==null)intervals.push(now-previous);previous=now;
    if(id==='voxel-assemble'){
     if([20,80,180,260,360].includes(n))action('activate');
     if([130,300,410].includes(n))key(' ');if(n===440)action('reset');
    }else if(id==='css3d-exploded-device'){
     if(n===20)action('activate');if(n===80)key('ArrowUp');if(n===160)key(' ');if(n===240)key('Escape');
     if(n===320)field.dispatchEvent(new PointerEvent('pointerenter',{pointerType:'mouse'}));
     if(n===380)field.dispatchEvent(new PointerEvent('pointerleave',{pointerType:'mouse'}));if(n===440)action('reset');
    }else if(id==='css3d-depth-hero'){
     if(n===20)key('ArrowRight');if(n===80)key('ArrowUp');if(n===160)action('activate');
     if([260,300].includes(n))key(' ');if(n===350)key('Home');if(n===420)key('ArrowLeft');
    }else{
     if([20,320].includes(n))action('activate');
     const items=[...root.querySelectorAll(mode==='thumb'?'.d-iso-native-item':'.d-iso-legend-button')];
     if(n===80)items[0].focus();if(n===160)items[2].focus();if(n===260)key('Escape');
     if(n===380)action('reset');if(n===420)items.at(-1).focus();
    }
    if(n%20===0)samples.push({frame:n,phase:root.dataset.phase,progress:root.dataset.progress,selected:root.dataset.selected,depth:root.dataset.depth});
    if(++n<480)requestAnimationFrame(frame);
    else{
     clearTimeout(deadline);observer.disconnect();const sorted=intervals.slice().sort((a,b)=>a-b);
     resolve({id,mode,cpuRate:rate,frames:intervals.length,fps:1000/(intervals.reduce((a,b)=>a+b,0)/intervals.length),p95:sorted[Math.floor(sorted.length*.95)],max:sorted.at(-1),slowIntervals:intervals.flatMap((duration,index)=>duration>25?[{frame:index+1,duration}]:[]),longTasks:tasks,samples});
    }
   }catch(error){clearTimeout(deadline);observer.disconnect();reject(error)}
  }
  requestAnimationFrame(frame);
 });
}

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:900}}),cdp=await page.context().newCDPSession(page),errors=[];
  page.on('pageerror',error=>errors.push(error.message));await cdp.send('Emulation.setCPUThrottlingRate',{rate});
  await page.goto(base+'/#/docs',{waitUntil:'networkidle'});
  const live=await page.evaluate(ids=>ids.map(id=>({id,module:INTRX.catalog.find(d=>d.id===id)?.module})),ids);
  assert.deepEqual(live,ids.map(id=>({id,module:catalog.find(d=>d.id===id).module})),'Browser and local catalog agree');
  for(const id of ids)for(const mode of['thumb','full']){
   await page.mouse.move(1,1);await page.evaluate(async id=>{await INTRX.loadDemo(id)},id);
   await page.evaluate(({id,mode})=>{
    document.querySelector('#profile-final')?._runtime?.dispose();INTRX.disposeView();
    document.querySelector('#app').innerHTML='<div id="profile-final" class="stage demo-stage" style="position:relative;width:'+(mode==='thumb'?372:650)+'px;height:'+(mode==='thumb'?264:570)+'px"></div>';
    INTRX.mountStage(INTRX.demos.find(d=>d.id===id),document.querySelector('#profile-final'),mode);
   },{id,mode});
   await page.waitForFunction(()=>{const s=document.querySelector('#profile-final');if(s?.dataset.bootError==='true')throw Error('Profile boot failure');return s?._root?.__PerspectiveInspect?.().ready});
   await page.waitForTimeout(900);
   const result=await page.evaluate(measure,{id,mode,rate});assert.deepEqual(errors,[],'Browser errors');
   result.module=catalog.find(d=>d.id===id).module;result.sourceSHA256=sourceHashes[result.module.split('?')[0]];result.verifiedAt=new Date().toISOString();
   report.results.push(result);save();console.log(id+' '+mode+' cpu='+rate+' fps='+result.fps.toFixed(2)+' p95='+result.p95.toFixed(1)+'ms slow='+result.slowIntervals.length+' longTasks='+result.longTasks.length);
  }
  assert.deepEqual(hashes(),sourceHashes,'Sources unchanged throughout measurement');assert.equal(hash(__filename),harnessHash,'Profiler unchanged');
  report.complete=true;report.completedAt=new Date().toISOString();save();console.log('Recorded '+report.results.length+' profiles in '+file);
 }finally{await browser.close()}
})().catch(error=>{report.errors.push(String(error));save();console.error(error);process.exitCode=1});
