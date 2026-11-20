// A literal-source browser environment. Explicit sizes and observer priming are
// fixture controls, not inferred native Figma geometry. Synthetic pointer capture
// follows the browser's real untrusted-event behavior; physical input is separate.
async function runOriginal({original,observation,config,fonts,asset,normalizerSource,retain=true,expected=null}){
  const dataBlocks={},normalize=eval("("+normalizerSource+")")(dataBlocks);
  const enc=bytes=>{let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(s);};
  const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(value)))),x=>x.toString(16).padStart(2,'0')).join('');
  const pack=v=>{
    if(typeof v==='number'&&(!Number.isFinite(v)||Object.is(v,-0)))return{$number:Object.is(v,-0)?'-0':String(v)};
    if(Array.isArray(v)){
      if(v.length&&v.every(x=>typeof x==='number')){const byte=v.every(x=>Number.isInteger(x)&&x>=0&&x<=255&&!Object.is(x,-0)),a=new Uint8Array(v.length*(byte?1:8));if(byte)a.set(v);else{const d=new DataView(a.buffer);v.forEach((x,i)=>d.setFloat64(i*8,x,true));}return{$vector:enc(a),format:byte?'u8':'f64le',length:v.length};}
      if(v.length>3&&v.every(x=>x&&typeof x==='object'&&!Array.isArray(x))){const keys=Object.keys(v[0]);if(v.every(x=>Object.keys(x).join('\0')===keys.join('\0')))return{$rows:v.length,columns:Object.fromEntries(keys.map(k=>[k,pack(v.map(x=>x[k]))]))};}
      return v.map(pack);
    }
    if(!v||typeof v!=='object')return v;
    return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,pack(x)]));
  };
  const numbers=v=>typeof v==='number'?1:v&&typeof v==='object'?Object.values(v).reduce((n,x)=>n+numbers(x),0):0;
  for(const entry of fonts){const face=new FontFace(entry.name,Uint8Array.from(atob(entry.bytes),c=>c.charCodeAt(0)),{weight:'100 900'});await face.load();document.fonts.add(face);}await document.fonts.ready;
  document.body.style.margin='0';const style=document.createElement('style');style.textContent=original.css;document.head.append(style);document.body.innerHTML=original.html;
  const root=document.body.firstElementChild,scene=root.querySelector('[class$="-scene"],[class$="-stage"]')||root,canvas=scene.querySelector('canvas');
  const size=dimensions=>{root.style.cssText='position:absolute;left:0;top:0;width:'+dimensions[0]+'px;height:'+(dimensions[1]+96)+'px;';scene.style.cssText='position:absolute;left:0;top:0;right:auto;bottom:auto;width:'+dimensions[0]+'px;height:'+dimensions[1]+'px;border:0;padding:0;';if(canvas)canvas.style.cssText='display:block;width:100%;height:100%;';};size(config.size);
  const surfaces=[],contexts=new Map(),images=[],surfaceNames=new Map(),gradientNames=new Map();let calls=[],trace=true,paintCommands=0;
  const shortBytes=bytes=>{let h=2166136261;for(const b of bytes)h=Math.imul(h^b,16777619)>>>0;return h.toString(16).padStart(8,'0');};
  const arg=v=>{if(v instanceof CanvasGradient)return{$gradient:gradientNames.get(v)};if(v instanceof HTMLCanvasElement)return{$canvas:surfaceNames.get(v)};if(v instanceof HTMLImageElement)return{$image:images.indexOf(v),width:v.naturalWidth,height:v.naturalHeight};if(v instanceof ImageData)return{$imageData:[v.width,v.height],bytes:shortBytes(v.data)};if(v&&typeof v==='object')throw Error('Unexpected canvas argument');return v;};
  const wrapSurface=node=>{
    if(surfaceNames.has(node))return node;const name='canvas'+surfaces.length;surfaceNames.set(node,name);surfaces.push(node);const get=node.getContext.bind(node);
    node.getContext=(kind,options)=>{if(kind!=='2d')throw Error('Unexpected context');if(contexts.has(node))return contexts.get(node).proxy;const native=get(kind,options),bound=new Map();const proxy=new Proxy(native,{
      get(t,k){const v=Reflect.get(t,k,t);if(typeof v!=='function')return v;if(!bound.has(k))bound.set(k,(...args)=>{if(k!=='measureText'&&k!=='getImageData'&&k!=='createImageData'){paintCommands++;if(trace)calls.push(['call',name,k,...args.map(arg)]);}const result=v.apply(t,args);if(result instanceof CanvasGradient){const name='gradient'+gradientNames.size;gradientNames.set(result,name);const add=result.addColorStop.bind(result);result.addColorStop=(...stops)=>{paintCommands++;if(trace)calls.push(['gradient',name,'addColorStop',...stops]);return add(...stops);};}return result;});return bound.get(k);},
      set(t,k,v){paintCommands++;if(trace)calls.push(['set',name,k,arg(v)]);return Reflect.set(t,k,v,t);}
    });contexts.set(node,{native,proxy,options});return proxy;};return node;
  };if(canvas)wrapSurface(canvas);
  const imageLoads=[];
  function CaptureImage(){const im=new Image();images.push(im);const desc=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');Object.defineProperty(im,'src',{get(){return desc.get.call(im);},set(value){const name=value.match(/^\{\{asset:([\w-]+)\}\}$/)?.[1];if(!name||!asset.uris[name])throw Error('Unknown original photograph '+value);imageLoads.push(new Promise((resolve,reject)=>{im.addEventListener('load',resolve,{once:true});im.addEventListener('error',()=>reject(Error('Original image decode failed')),{once:true});}));desc.set.call(im,asset.uris[name]);}});return im;}
  let now=0,nextID=0,docVisible=true;const frames=new Map(),resizeObservers=[],intersectionObservers=[],mutationObservers=[];
  class RO{constructor(cb){this.callback=cb;this.targets=[];resizeObservers.push(this);}observe(t){this.targets.push(t);}unobserve(t){this.targets=this.targets.filter(x=>x!==t);}disconnect(){this.targets=[];}}
  class IO{constructor(cb){this.callback=cb;this.targets=[];intersectionObservers.push(this);}observe(t){this.targets.push(t);}unobserve(t){this.targets=this.targets.filter(x=>x!==t);}disconnect(){this.targets=[];}}
  class MO{constructor(cb){this.native=new MutationObserver(cb);this.connected=false;mutationObservers.push(this);}observe(t,o){this.connected=true;this.native.observe(t,o);}disconnect(){this.connected=false;this.native.disconnect();}takeRecords(){return this.native.takeRecords();}}
  Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>docVisible?'visible':'hidden'});
  const windowProxy=new EventTarget();Object.assign(windowProxy,{devicePixelRatio:config.dpr,ResizeObserver:RO,IntersectionObserver:IO,MutationObserver:MO,matchMedia:()=>({matches:config.reduced})});
  const documentProxy=new Proxy(document,{get(t,k){if(k==='createElement')return(tag,...args)=>{const n=t.createElement(tag,...args);return tag==='canvas'?wrapSurface(n):n;};const v=Reflect.get(t,k,t);return typeof v==='function'?v.bind(t):v;}});
  const raf=cb=>{frames.set(++nextID,cb);return nextID;},cancel=id=>frames.delete(id);
  const run=new Function('root','requestAnimationFrame','cancelAnimationFrame','ResizeObserver','IntersectionObserver','MutationObserver','performance','window','document','matchMedia','Image',original.js+'\n;'+observation);
  run(root,raf,cancel,RO,IO,MO,{now:()=>now},windowProxy,documentProxy,()=>({matches:config.reduced}),CaptureImage);
  await Promise.all(imageLoads);
  const resize=()=>resizeObservers.forEach(o=>o.targets.length&&o.callback(o.targets.map(t=>({target:t,contentRect:t.getBoundingClientRect()}))));resize();
  const intersect=visible=>intersectionObservers.forEach(o=>o.targets.length&&o.callback(o.targets.map(t=>({target:t,isIntersecting:visible}))));intersect(true);
  if(!root.__captureInspect)throw Error('Missing inspector');
  const target=e=>e.target==='input-surface'?root.querySelector(config.inputSelector):e.target==='canvas'?canvas:e.target==='button'?root.querySelectorAll('button')[e.index||0]:e.target==='root'?root:e.target==='titlebar'?root.querySelector('[class$="-titlebar"]'):e.target==='tab'?root.querySelectorAll('[role=tab]')[e.index??Number(root.dataset.activeTab||0)]:e.target==='slider'?root.querySelectorAll('input')[e.index||0]:e.target==='inject'?root.querySelector('button'):scene;
  const dispatch=e=>{
    if(e.type==='key')target(e).dispatchEvent(new KeyboardEvent('keydown',{key:e.key,shiftKey:e.shiftKey,repeat:e.repeat,bubbles:true,cancelable:true}));
    else if(e.type==='pointer'){const r=target(e).getBoundingClientRect(),event=new PointerEvent(e.event,{clientX:r.left+r.width*e.u,clientY:r.top+r.height*e.v,pointerId:e.pointerId,pointerType:e.pointerType,isPrimary:e.isPrimary,button:0,buttons:/up|cancel|leave/.test(e.event)?0:1,bubbles:true,cancelable:true});Object.defineProperty(event,'timeStamp',{value:e.timeStamp===undefined?now:e.timeStamp});target(e).dispatchEvent(event);}
    else if(e.type==='click')target(e).click();
    else if(e.type==='range'||e.type==='change'){const input=root.querySelectorAll('input')[e.index];if(e.value!==undefined)input.value=String(e.value);input.dispatchEvent(new Event(e.type==='range'?'input':'change',{bubbles:true}));}
    else if(e.type==='reset'){const name={'terminal-window':'__terminalWindowReset','engraving-lines-warp':'__engravingLinesWarpReset','pixel-lissajous-lab':'__pixelLissajousLabReset'}[config.id];root[name]();}
    else if(e.type==='submit')root.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
    else if(e.type==='intersection')intersect(e.visible);
    else if(e.type==='document'){docVisible=e.visible;document.dispatchEvent(new Event('visibilitychange'));}
    else if(e.type==='resize'){size(e.restore?config.size:e.size);resize();windowProxy.dispatchEvent(new Event('resize'));}
    else throw Error('Unknown scenario event '+e.type);
  };
  const checkpoints=new Set([0,1,config.frames]);for(let f=60;f<=config.frames;f+=60)checkpoints.add(f);
  for(const e of config.events)for(const f of [e.frame-1,e.frame,e.frame+1])if(f>=0&&f<=config.frames)checkpoints.add(f);
  const pixelFrames=new Set([0,1,23,60,120,239,300,369,400,519,550,610,700,730,900,config.frames]);
  // Bootstrap includes native image callbacks with unspecified completion order.
  // Start frame paint accounting only after all images and observer priming.
  calls=[];paintCommands=0;
  const dom=()=>({html:root.innerHTML,class:root.className,focus:document.activeElement?.className||'',nodes:Array.from(root.querySelectorAll('[role=tabpanel],[role=tab],input,[class$="-titlebar"],[class$="-shell"]')).map(n=>({class:n.className,width:n.clientWidth,height:n.clientHeight,scrollTop:n.scrollTop,scrollHeight:n.scrollHeight,value:n.value??null,tabIndex:n.tabIndex,selected:n.getAttribute('aria-selected'),hidden:n.getAttribute('aria-hidden'),opacity:n.style.opacity,transform:n.style.transform}))});
  const rows=[],errors=[];let numericValues=0,checkpointsCount=0,pixelCheckpoints=0,totalPaintCommands=0;
  for(let frame=0;frame<=config.frames;frame++){
    const take=checkpoints.has(frame),events=config.events.filter(e=>e.frame===frame);
    if(frame){trace=take;calls=[];paintCommands=0;events.forEach(dispatch);now+=frame===610?150:frame===620?1:config.stepMS;const jobs=[...frames.values()];frames.clear();jobs.forEach(cb=>cb(now));}
    const row={frame,now,events,pendingFrames:frames.size,data:{...root.dataset},paintCommands,state:root.__captureState()};totalPaintCommands+=paintCommands;
    if(take){const model=await normalize(root.__captureInspect()),presentation=dom();numericValues+=numbers(model);const packed=pack(model);row.modelSHA256=await digest(packed);row.domSHA256=await digest(presentation);row.paintSHA256=await digest(calls);if(retain){row.model=packed;row.dom=presentation;row.paint=calls.slice();}checkpointsCount++;}
    if(pixelFrames.has(frame)){
      const planes=surfaces.map(c=>({name:surfaceNames.get(c),width:c.width,height:c.height,pixels:enc(contexts.get(c).native.getImageData(0,0,c.width,c.height).data)}));
      row.pixelsSHA256=await digest(planes);if(retain)row.planes=planes;pixelCheckpoints++;
    }
    if(expected){const ref=expected.rows[frame];for(const k of ['now','pendingFrames','paintCommands','modelSHA256','domSHA256','paintSHA256','pixelsSHA256'])if(row[k]!==ref[k])errors.push({frame,key:k,expected:ref[k],actual:row[k]});if(JSON.stringify(row.data)!==JSON.stringify(ref.data))errors.push({frame,key:'data'});if(JSON.stringify(row.state)!==JSON.stringify(ref.state))errors.push({frame,key:'state'});}
    rows.push(row);
    if(frame%120===0)await Promise.resolve();
  }
  const beforeRemoval=await normalize(root.__captureInspect());root.remove();await Promise.resolve();await Promise.resolve();
  now+=1000/60;const finalJobs=[...frames.values()];frames.clear();finalJobs.forEach(cb=>cb(now));await Promise.resolve();
  const cleanup={pendingFrames:frames.size,resizeTargets:resizeObservers.reduce((n,o)=>n+o.targets.length,0),intersectionTargets:intersectionObservers.reduce((n,o)=>n+o.targets.length,0),mutationConnected:mutationObservers.filter(o=>o.connected).length,connected:root.isConnected,model:pack(await normalize(root.__captureInspect())),beforeRemoval:pack(beforeRemoval)};
  if(expected&&JSON.stringify(cleanup)!==JSON.stringify(expected.cleanup))errors.push({frame:'cleanup',key:'cleanup'});
  // Preserve the original persistent rAF and resize debt without adding cleanup.
  const originalCleanupDebt=true;
  if(!originalCleanupDebt&&(cleanup.pendingFrames||cleanup.resizeTargets||cleanup.intersectionTargets||cleanup.mutationConnected))throw Error('Original cleanup regression');
  return{config,rows,cleanup,dataBlocks,contextOptions:surfaces.map(c=>({name:surfaceNames.get(c),options:contexts.get(c).options})),summary:{frames:rows.length,numericValues,checkpoints:checkpointsCount,pixelCheckpoints,totalPaintCommands,originalCleanupDebt,errors}};
}
module.exports={runOriginal};
