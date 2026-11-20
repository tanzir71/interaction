const H=require('./ambient-atmospheres-harness'),{assert,chromium}=H;
async function verify({factory,reference,dpr,reduced,width,height,mode}){
 let checks=0;const equal=(actual,expected,label)=>{checks++;if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error(label+' / '+JSON.stringify(actual).slice(0,500)+' != '+JSON.stringify(expected).slice(0,500));};
 const nativeGetContext=HTMLCanvasElement.prototype.getContext,originalCompile=WebGL2RenderingContext.prototype.getShaderParameter,createShader=WebGL2RenderingContext.prototype.createShader,deleteShader=WebGL2RenderingContext.prototype.deleteShader,ownedShaders=new Set();
 if(mode==='unavailable')HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:nativeGetContext.call(this,type,...args);};
 if(mode==='compile-failure'){
  WebGL2RenderingContext.prototype.createShader=function(...args){const shader=createShader.apply(this,args);ownedShaders.add(shader);return shader;};
  WebGL2RenderingContext.prototype.deleteShader=function(shader){ownedShaders.delete(shader);return deleteShader.call(this,shader);};
  WebGL2RenderingContext.prototype.getShaderParameter=function(shader,pname){return pname===this.COMPILE_STATUS?false:originalCompile.call(this,shader,pname);};
 }
 const surface=document.createElement('canvas'),expectedSurface=document.createElement('canvas');surface.className='recovery-canvas';document.body.append(surface,expectedSurface);
 let core,ref;
 try{core=eval('('+factory+')')(surface,{width,height,dpr,reduced});ref=eval('('+reference+')')(expectedSurface,{width,height,dpr,reduced});await Promise.all([core.ready,ref.ready]);}
 finally{HTMLCanvasElement.prototype.getContext=nativeGetContext;WebGL2RenderingContext.prototype.getShaderParameter=originalCompile;WebGL2RenderingContext.prototype.createShader=createShader;WebGL2RenderingContext.prototype.deleteShader=deleteShader;}
 const digest=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join(''),model=()=>equal(core.inspect(),ref.inspect(),'complete source model');
 const planes=async()=>{const a=core.pixels(),b=ref.pixels();equal(a.map(p=>[p.width,p.height]),b.map(p=>[p.width,p.height]),'all native fallback planes');for(let i=0;i<a.length;i++)equal(await digest(a[i].bytes),await digest(b[i].bytes),'entire exact native fallback plane');};
 const input={type:'pointer',event:'pointermove',u:.73,v:.2};core.dispatch(input);ref.dispatch(input);core.dispatch({type:'click',index:1});ref.dispatch({type:'click',index:1});
 for(let i=1;i<=35;i++){core.tick(i*1000/60);ref.tick(i*1000/60);model();}
 if(!reduced){core.dispatch({type:'click',index:2});ref.dispatch({type:'click',index:2});}model();
 if(mode!=='recovery'){
   equal(core.lifecycle().renderer.gpu.available,false,'unavailable renderer uses original Canvas');await planes();equal(ownedShaders.size,0,'failed compilation releases every shader');
 }else{
   core.dispatch(input);ref.dispatch(input);model();
   const before=core.inspect(),beforeGPU=await digest(core.pixels()[0].bytes),gpuCanvas=surface.nextElementSibling,gl=gpuCanvas.getContext('webgl2'),extension=gl.getExtension('WEBGL_lose_context');equal(!!extension,true,'actual context loss available');
   const lost=new Promise(resolve=>gpuCanvas.addEventListener('webglcontextlost',()=>setTimeout(resolve,0),{once:true}));extension.loseContext();await lost;
   equal(core.inspect(),before,'context loss leaves every original state and sample unchanged');equal(core.lifecycle().renderer.gpu.lost,true,'actual GPU context is lost');equal(core.lifecycle().renderer.gpu.presented,false,'lost GPU output yields to native Canvas');await planes();
   core.dispatch({type:'pointer',event:'pointermove',u:.15,v:.9});ref.dispatch({type:'pointer',event:'pointermove',u:.15,v:.9});model();await planes();
   const paused=core.inspect(),restored=new Promise(resolve=>gpuCanvas.addEventListener('webglcontextrestored',()=>setTimeout(resolve,0),{once:true}));extension.restoreContext();await restored;
   equal(core.inspect(),paused,'restoration repaints without a model step');equal(core.lifecycle().renderer.gpu.lost,false,'actual GPU context restores');equal(core.lifecycle().renderer.gpu.presented,true,'restored native texture pipeline is presented');
   core.dispatch(input);ref.dispatch(input);model();equal(await digest(core.pixels()[0].bytes),beforeGPU,'restored GPU plane is deterministic at the exact same pose');
 }
 core.dispose();ref.dispose();core.dispose();const life=core.lifecycle();equal([life.dead,life.pendingFrames,life.listenerCount,life.observerTargets,life.backings],[true,0,0,0,[[1,1]]],'all original resources released');equal([life.renderer.dead,life.renderer.cacheBytes,life.renderer.gpu.dead,life.renderer.gpu.resources,life.renderer.gpu.count,life.renderer.gpu.backing],[true,0,true,0,0,[1,1]],'all GPU and cache resources released');equal(document.querySelectorAll('canvas').length,2,'owned GPU output removed');return{checks,mode,dpr,reduced,width,height};
}
(async()=>{const results=[];for(const mode of ['recovery','unavailable','compile-failure'])for(const dpr of[1,2])for(const reduced of[false,true]){const browser=await chromium.launch({headless:true});try{const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(H.base+'/.artifacts/ambient-atmospheres/blank.html');const k=H.kernels('aurora-curtains'),r=await page.evaluate(verify,{factory:k.full,reference:k.native,width:368,height:268,dpr,reduced,mode});assert.deepEqual(errors,[]);results.push(r);console.log('PASS full Aurora '+mode+' DPR'+dpr+' reduced '+reduced);}finally{await browser.close();}}H.save('gpu',__filename,{checks:results.reduce((n,r)=>n+r.checks,0),results,scope:'Current emitted full Aurora: real WebGL loss/restoration with no model step, byte-exact original Canvas fallback, unavailable GPU, failed shader compilation, deterministic recovery and complete resource disposal.'});})().catch(e=>{console.error(e.stack?.slice(0,3000));process.exitCode=1;});
