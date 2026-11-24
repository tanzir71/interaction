/* Actual browser geometry reads after the original SVG/counter paint must stay empty. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {open,chromium,base}=require('./verification/showcase-spatial-harness'),R=require('./load-registry')(),demo=R.demos.find(d=>d.id==='showcase-converging-paths');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),rows=[];
const files=['js/demos.showcase.js','js/meta.stage.js','css/foundations.css','css/fonts.css','js/demo-runtime.js','js/shell/stage.js','tools/verification/showcase-spatial-harness.js',__filename];
const inputs=Object.fromEntries(files.map(file=>[file,hash(file)]));
(async()=>{const browser=await chromium.launch({...process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{},args:['--enable-unsafe-swiftshader']});try{
  for(const mode of['thumb','full'])for(const theme of['dark','light'])for(const reduced of[false,true])for(const compact of[false,true]){
    const rig=await open(browser,{reduced,dpr:compact?2:1,viewport:compact?{width:390,height:812}:{width:1200,height:1000}});
    try{
      await rig.page.evaluate(theme=>{document.documentElement.dataset.theme=theme;document.querySelectorAll('link[rel="stylesheet"]').forEach(link=>{if(new URL(link.href).pathname==='/css/style.css')link.remove();});},theme);
      await rig.page.addStyleTag({url:base+'/css/foundations.css'});
      await rig.mount(demo,{mode,width:mode==='thumb'?(compact?344:372):(compact?344:640),height:mode==='thumb'?264:650,clock:true});
      const result=await rig.page.evaluate(({mode,reduced})=>{
        const root=document.querySelector('.stage')._root,viewport=root.querySelector('.'+root.className+(mode==='thumb'?'-native-scroller':'-full-scroller')),counter=root.querySelector('.'+root.className+'-full-paint [class$="-value"]');
        const text=Object.getOwnPropertyDescriptor(Node.prototype,'textContent'),descriptors={};
        const reads=[],writes=[];let recording=false,painted=false,story=0;
        Object.defineProperty(counter,'textContent',{configurable:true,get(){return text.get.call(this);},set(value){if(recording){painted=true;writes.push({story,value});}return text.set.call(this,value);}});
        for(const key of['scrollTop','scrollHeight','clientHeight']){
          let prototype=viewport,descriptor;while(prototype&&!descriptor){descriptor=Object.getOwnPropertyDescriptor(prototype,key);prototype=Object.getPrototypeOf(prototype);}if(!descriptor?.get)throw Error('Missing geometry getter '+key);descriptors[key]=descriptor;
          Object.defineProperty(viewport,key,{configurable:true,get(){if(recording&&painted)reads.push({story,key});return descriptor.get.call(this);},...descriptor.set?{set(value){return descriptor.set.call(this,value);}}:{}});
        }
        function sample(run){story++;painted=false;recording=true;try{run();}finally{recording=false;}}
        if(reduced){const extent=viewport.scrollHeight-viewport.clientHeight;for(const fraction of[.15,.45,.8,1,.32]){viewport.scrollTo({top:extent*fraction,left:0,behavior:'instant'});sample(()=>viewport.dispatchEvent(new Event('scroll')));}}
        else{document.querySelector('.dock-btn').click();for(let frame=1;frame<=360;frame++)sample(()=>root.__Tick(1000/60));}
        const state=root.__SpatialInspect(),actualTop=viewport.scrollTop,extent=viewport.scrollHeight-viewport.clientHeight,progress=extent?actualTop/extent:0,source=Number(root.dataset.sourceProgress),original=Number(root.dataset.progress);
        for(const key of Object.keys(descriptors))delete viewport[key];delete counter.textContent;
        document.querySelector('.stage')._runtime.dispose();const disposed=root.__SpatialInspect();
        return{stories:story,reads,writes:writes.length,actualTop,extent,source,original,progress,paths:state.painter.originalPaths,nativePaths:state.painter.nativePaths,disposed:{dead:disposed.dead,frame:disposed.frame,queue:disposed.queue,captures:disposed.captures,animations:disposed.animations}};
      },{mode,reduced});
      assert(result.writes>0,'The original model actually paints');
      assert.deepEqual(result.reads,[],'Geometry reads after original SVG/counter writes: '+JSON.stringify(result.reads.slice(0,8)));
      assert(Math.abs(result.source-result.progress)<1e-12,'Source uses actual fractional browser scrolling');assert(Math.abs(result.original-result.progress)<=.000500001,'Original rounded progress copy');
      assert.equal(result.paths,10);assert.equal(result.nativePaths,10);assert.equal(result.disposed.dead,true);assert.equal(result.disposed.frame,false);assert.equal(result.disposed.queue,0);assert.equal(result.disposed.animations,0);assert.deepEqual(result.disposed.captures,[]);
      rows.push({mode,theme,reduced,compact,...result});console.log('PASS',mode,theme,reduced?'reduced':'normal',compact?'compact':'desktop',result.writes,'original paints; no geometry reads after paint');
    }finally{await rig.close();}
  }
  for(const[file,expected]of Object.entries(inputs))assert.equal(hash(file),expected,'Changed source '+file);
  fs.writeFileSync('.artifacts/showcase-paths-render.json',JSON.stringify({at:new Date().toISOString(),inputs,browser:browser.version(),rows},null,2)+'\n');
  console.log('PASS',rows.length,'current Stage browser stories');
}finally{await browser.close();}})().catch(error=>{console.error(error.stack);process.exitCode=1;});
