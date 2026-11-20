async function runSoundOriginal({original,observation,config,audioSource,normalizerSource,assets}){
 const store={},normalize=eval('('+normalizerSource+')')(store),encode=bytes=>{let value='';for(let i=0;i<bytes.length;i+=8192)value+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(value);},digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(value)))),x=>x.toString(16).padStart(2,'0')).join('');
 let wall=0,sequence=0,randomState=config.seed??0x51a7,randomCalls=0,capture=null;const frames=new Map(),timers=new Map(),observers=[],listeners=[],ownedNodes=new WeakSet(),errors=[];
 const math=Object.create(Math);math.random=()=>{randomCalls++;randomState=(Math.imul(1664525,randomState)+1013904223)>>>0;return randomState/4294967296;};
 const audio=eval('('+audioSource+')')({now:()=>wall,sampleRate:config.sampleRate,lengthSeconds:config.lengthSeconds,available:config.available});
 const style=document.createElement('style');style.textContent=original.css.replace(/\{\{asset:([\w-]+)\}\}/g,(_,name)=>{if(!assets[name])throw Error('Missing original asset '+name);return assets[name];});document.head.append(style);document.body.style.margin='0';document.body.innerHTML=original.html;
 const root=document.body.firstElementChild,scene=root.querySelector('[class$="-stage"]'),canvas=root.querySelector('canvas'),scroll=root.querySelector('.d-drone-scroll');let size=config.size.slice(),scrollValue=0;
 const box=()=>({x:0,y:0,left:0,top:0,width:size[0],height:size[1],right:size[0],bottom:size[1],toJSON(){return{};}});
 const resize=dimensions=>{size=dimensions.slice();root.style.cssText='position:absolute;left:0;top:0;width:'+size[0]+'px;height:'+(size[1]+96)+'px;';scene.style.cssText='position:absolute;left:0;top:0;width:'+size[0]+'px;height:'+size[1]+'px;right:auto;bottom:auto;border:0;padding:0;';if(canvas)canvas.style.cssText='position:absolute;left:0;top:0;width:'+size[0]+'px;height:'+size[1]+'px;';};resize(size);scene.getBoundingClientRect=box;if(canvas)canvas.getBoundingClientRect=box;
 if(scroll)Object.defineProperty(scroll,'scrollTop',{configurable:true,get:()=>scrollValue,set:value=>{scrollValue=Math.max(0,Math.min(scroll.scrollHeight-scroll.clientHeight,Number(value)||0));}});
 scene.setPointerCapture=id=>{capture=id;};scene.releasePointerCapture=id=>{if(capture===id)capture=null;};scene.hasPointerCapture=id=>capture===id;
 const nativeAdd=EventTarget.prototype.addEventListener;let trace=true,paint=[],paintCount=0,nativeContext=null;
 const sourceOwned=node=>{if(node===root||root.contains(node))return true;for(let p=node;p;p=p.parentNode)if(ownedNodes.has(p))return true;return false;};
 EventTarget.prototype.addEventListener=function(type,fn,options){if(this instanceof Node&&sourceOwned(this))listeners.push({target:this,type,fn,options});return nativeAdd.call(this,type,fn,options);};
 const onError=event=>{errors.push(event.message);event.preventDefault();};window.addEventListener('error',onError);
 if(canvas){const get=canvas.getContext.bind(canvas);canvas.getContext=(kind,options)=>{if(kind!=='2d')throw Error('Unexpected source Canvas context');if(nativeContext)return nativeContext.proxy;const native=get(kind,options),bound=new Map(),proxy=new Proxy(native,{
  get(target,key){const value=Reflect.get(target,key,target);if(typeof value!=='function')return value;if(!bound.has(key))bound.set(key,(...args)=>{if(!['getImageData','measureText','createImageData'].includes(key)){paintCount++;if(trace)paint.push(['call',key,...args]);}return value.apply(target,args);});return bound.get(key);},
  set(target,key,value){paintCount++;if(trace)paint.push(['set',key,value]);return Reflect.set(target,key,value,target);}
 });nativeContext={native,proxy};return proxy;};}
 const windowProxy=new EventTarget();windowProxy.AudioContext=audio.Audio;windowProxy.webkitAudioContext=audio.Audio;windowProxy.devicePixelRatio=config.dpr;
 const documentProxy=new Proxy(document,{get(target,key){if(key==='createElement')return(...args)=>{const node=target.createElement(...args);ownedNodes.add(node);return node;};const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;}});
 class RO{constructor(callback){this.callback=callback;this.targets=[];observers.push(this);}observe(target){this.targets.push(target);}disconnect(){this.targets=[];}}
 const raf=fn=>{const id=++sequence;frames.set(id,fn);return id;},cancel=id=>frames.delete(id),timer=(fn,delay,repeat,args)=>{const id=++sequence,ms=Math.max(repeat?1:0,Number(delay)||0);timers.set(id,{fn,args,ms,repeat,due:wall+ms});return id;},clear=id=>timers.delete(id);
 const run=new Function('root','window','document','performance','Math','ResizeObserver','devicePixelRatio','requestAnimationFrame','cancelAnimationFrame','setTimeout','clearTimeout','setInterval','clearInterval','matchMedia',original.js+'\n;'+observation);
 let initialized=false;
 try{
  run(root,windowProxy,documentProxy,{now:()=>wall},math,RO,config.dpr,raf,cancel,(fn,delay,...args)=>timer(fn,delay,false,args),clear,(fn,delay,...args)=>timer(fn,delay,true,args),clear,()=>({matches:false}));initialized=true;
  const prime=()=>observers.forEach(o=>o.targets.length&&o.callback(o.targets.map(target=>({target,contentRect:target.getBoundingClientRect()}))));prime();
  if(!root.__sourceState||!root.__sourceInspect)throw Error('Missing complete source probes');
  const dispatch=event=>{
   if(event.type==='click'){const node=root.querySelectorAll(event.selector)[event.index||0];if(!node)throw Error('Missing original click target '+event.selector+' '+event.index);node.click();}
   else if(event.type==='hover'){root.querySelectorAll('[data-voice]')[event.index].dispatchEvent(new PointerEvent('pointerenter',{pointerId:7,pointerType:'mouse',isPrimary:true}));}
   else if(event.type==='key'){const node=root.querySelector('textarea');node.dispatchEvent(new KeyboardEvent('keydown',{key:event.key,ctrlKey:!!event.ctrlKey,metaKey:!!event.metaKey,altKey:!!event.altKey,shiftKey:!!event.shiftKey,repeat:!!event.repeat,isComposing:!!event.isComposing,bubbles:true,cancelable:true}));if(event.text!==undefined)node.value=event.text;}
   else if(event.type==='pointer'){const e=new PointerEvent(event.event,{clientX:event.u*size[0],clientY:event.v*size[1],pointerId:event.pointerId,pointerType:'mouse',isPrimary:true,button:0,buttons:/up|cancel/.test(event.event)?0:1,bubbles:true,cancelable:true});scene.dispatchEvent(e);if(/up|cancel/.test(event.event))capture=null;}
   else if(event.type==='scroll'){scroll.scrollTop=event.value==='max'?scroll.scrollHeight-scroll.clientHeight:event.value;scroll.dispatchEvent(new Event('scroll'));}
   else if(event.type==='resize'){resize(event.restore?config.size:event.size);prime();windowProxy.dispatchEvent(new Event('resize'));}
   else throw Error('Unknown original Sound event '+event.type);
  };
  const advance=async target=>{if(target<wall)throw Error('Sound clock must be monotonic');let fired=0;for(;;){const next=[...timers].filter(([,job])=>job.due<=target).sort((a,b)=>a[1].due-b[1].due||a[0]-b[0])[0];if(!next)break;if(++fired>10000)throw Error('Unbounded source timer burst');const[id,job]=next;wall=job.due;await audio.advance();if(job.repeat)job.due+=job.ms;else timers.delete(id);job.fn(...job.args);}wall=target;await audio.advance();};
  const checkpoints=new Set([0,1,config.frames]);for(let frame=60;frame<=config.frames;frame+=60)checkpoints.add(frame);for(const e of config.events)for(const frame of[e.frame-1,e.frame,e.frame+1])if(frame>=0&&frame<=config.frames)checkpoints.add(frame);
  const pixelFrames=new Set([0,1,23,60,120,139,140,239,300,400,450,610,700,730,760,930,config.frames]),rows=[];let numericValues=0,totalPaintCommands=0,modelCount=0,pixelBytes=0;
  const numbers=value=>typeof value==='number'?1:value&&typeof value==='object'?Object.values(value).reduce((sum,v)=>sum+numbers(v),0):0;
  for(let frame=0;frame<=config.frames;frame++){
   trace=checkpoints.has(frame);paint=[];paintCount=0;const events=config.events.filter(e=>e.frame===frame);
   if(frame){await advance(wall+(frame===610?150:frame===620?1:config.stepMS));events.forEach(dispatch);const jobs=[...frames.values()];frames.clear();jobs.forEach(fn=>fn(wall));}
   const row={frame,now:wall,events,state:root.__sourceState(),random:{state:randomState,calls:randomCalls},pendingFrames:frames.size,pendingTimers:timers.size,audioContexts:audio.summary().contexts,audioCommands:audio.summary().commands,paintCommands:paintCount};totalPaintCommands+=paintCount;
   if(trace){const model=await normalize({source:root.__sourceInspect(),audio:audio.snapshot(),schedule:[...timers].map(([id,job])=>({id,due:job.due,repeat:job.repeat,delay:job.ms})),capture}),input=root.querySelector('textarea'),dom={html:root.innerHTML,styles:root.style.cssText,scene:scene.style.cssText,input:input?{value:input.value,start:input.selectionStart,end:input.selectionEnd,focused:document.activeElement===input}:null};row.model=model;row.modelSHA256=await digest(model);row.dom=dom;row.domSHA256=await digest(dom);row.paint=paint.slice();row.paintSHA256=await digest(row.paint);numericValues+=numbers(model);modelCount++;}
   if(canvas&&pixelFrames.has(frame)){const bytes=nativeContext.native.getImageData(0,0,canvas.width,canvas.height).data;row.planes=[{width:canvas.width,height:canvas.height,pixels:encode(bytes)}];pixelBytes+=bytes.length;}
   if(errors.length)throw Error('Original source failed: '+errors.join('; '));rows.push(row);
  }
  const graph=await normalize(audio.snapshot()),pcm=await normalize(await audio.finish()),audioSummary=audio.summary();root.remove();await Promise.resolve();
  const cleanup={connected:root.isConnected,pendingFrames:frames.size,pendingTimers:timers.size,observerTargets:observers.reduce((n,o)=>n+o.targets.length,0),registeredListeners:listeners.length,logicalContexts:graph.contexts.map(c=>({id:c.id,state:c.state})),capture};
  return{config,rows,dataBlocks:store,finalAudioGraph:graph,pcm,cleanup,summary:{states:rows.length,models:modelCount,numericValues,pixelBytes,totalPaintCommands,randomCalls,...audioSummary,errors},scope:{audio:'Native OfflineAudioContext DSP and AudioParams at render-quantum boundaries. The facade models granted activation as running while the offline renderer is paused; real autoplay policy and physical gestures require separate host tests.',input:'Explicit fixture clocks, timer-before-event ordering, controlled scroll offsets, normalized pad coordinates and emulated pointer capture. Native physical input is verified separately.',originalCleanupDebt:true}};
 }finally{EventTarget.prototype.addEventListener=nativeAdd;window.removeEventListener('error',onError);if(!initialized)root.remove();}
}
module.exports={runSoundOriginal};
