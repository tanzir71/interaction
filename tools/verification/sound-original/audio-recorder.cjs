// Native OfflineAudioContext owns automation and DSP. This adapter records the
// complete source graph while advancing its renderer only at fixture boundaries.
// No AudioContext or speaker destination is created by these captures.
function createAudioRecorder({now,sampleRate=48000,lengthSeconds=22,available=true}){
 const contexts=[],commands=[],nodeByNative=new WeakMap(),nativeByProxy=new WeakMap(),nameByNative=new WeakMap();let sequence=0;
 const number=v=>{if(typeof v==='number'&&!Number.isFinite(v))throw Error('Nonfinite audio argument');return v;};
 const unwrap=v=>nativeByProxy.get(v)||v;
 const encode=v=>{const native=unwrap(v);if(nameByNative.has(native))return{$audio:nameByNative.get(native)};if(Array.isArray(v))return v.map(encode);if(v===null||['number','string','boolean','undefined'].includes(typeof v))return number(v);throw Error('Unrecorded audio argument');};
 function log(c,target,op,args=[]){commands.push({id:++sequence,wall:now(),audioTime:c.native.currentTime,target,op,args:args.map(encode)});}
 function wrapParam(c,param,name){if(nodeByNative.has(param))return nodeByNative.get(param);nameByNative.set(param,name);const bound=new Map(),proxy=new Proxy(param,{
  get(target,key){if(key==='value'){const value=target.value;log(c,name,'get:value',[value]);return value;}const value=Reflect.get(target,key,target);if(typeof value!=='function')return value;if(!bound.has(key))bound.set(key,(...args)=>{if(!['setValueAtTime','exponentialRampToValueAtTime','linearRampToValueAtTime','setTargetAtTime','cancelScheduledValues','cancelAndHoldAtTime'].includes(key))throw Error('Uncaptured AudioParam method '+String(key));log(c,name,key,args);const result=value.apply(target,args.map(unwrap));return result===target?proxy:result;});return bound.get(key);},
  set(target,key,value){if(key!=='value'&&key!=='automationRate')throw Error('Uncaptured AudioParam property '+String(key));log(c,name,'set:'+key,[value]);return Reflect.set(target,key,value,target);}
 });nodeByNative.set(param,proxy);nativeByProxy.set(proxy,param);return proxy;}
 function wrapNode(c,node,kind){if(nodeByNative.has(node))return nodeByNative.get(node);const name=c.id+'/node'+c.nodes.length,record={name,kind};c.nodes.push(record);nameByNative.set(node,name);const bound=new Map(),proxy=new Proxy(node,{
  get(target,key){const value=Reflect.get(target,key,target);if(value instanceof AudioParam)return wrapParam(c,value,name+'.'+key);if(typeof value!=='function')return value;if(!bound.has(key))bound.set(key,(...args)=>{if(!['connect','disconnect','start','stop','addEventListener','removeEventListener'].includes(key))throw Error('Uncaptured AudioNode method '+String(key));if(key==='addEventListener'||key==='removeEventListener')return value.apply(target,args);log(c,name,key,args);const result=value.apply(target,args.map(unwrap));return nodeByNative.get(result)||result;});return bound.get(key);},
  set(target,key,value){if(!['type','buffer','loop','loopStart','loopEnd','onended','channelCount','channelCountMode','channelInterpretation'].includes(key))throw Error('Uncaptured AudioNode property '+String(key));if(key!=='onended')log(c,name,'set:'+key,[value]);return Reflect.set(target,key,unwrap(value),target);}
 });nodeByNative.set(node,proxy);nativeByProxy.set(proxy,node);return proxy;}
 function wrapBuffer(c,buffer){const name=c.id+'/buffer'+c.buffers.length;nameByNative.set(buffer,name);c.buffers.push({name,length:buffer.length,sampleRate:buffer.sampleRate,native:buffer});const proxy=new Proxy(buffer,{get(target,key){if(key==='getChannelData')return channel=>{log(c,name,'getChannelData',[channel]);return target.getChannelData(channel);};const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;}});nodeByNative.set(buffer,proxy);nativeByProxy.set(proxy,buffer);return proxy;}
 function sync(c){const wall=now();if(wall<c.lastWall)throw Error('Audio wall clock must be monotonic');if(c.logicalState==='running')c.elapsed+=(wall-c.lastWall)/1000;c.lastWall=wall;}
 function Audio(){
  if(!available)throw Error('WebAudio is unavailable');const native=new OfflineAudioContext(1,Math.ceil(lengthSeconds*sampleRate),sampleRate),c={id:'audio'+contexts.length,native,logicalState:'suspended',lastWall:now(),elapsed:0,nodes:[],buffers:[],started:false,rendering:null,renderError:null,output:null};contexts.push(c);log(c,c.id,'construct',[sampleRate,native.length]);const destination=wrapNode(c,native.destination,'destination');
  Object.defineProperties(this,{currentTime:{get:()=>native.currentTime},sampleRate:{get:()=>native.sampleRate},state:{get:()=>c.logicalState},destination:{get:()=>destination}});
  for(const [method,kind]of [['createGain','gain'],['createOscillator','oscillator'],['createBufferSource','bufferSource'],['createBiquadFilter','biquad']])this[method]=(...args)=>{const value=wrapNode(c,native[method](...args),kind);log(c,c.id,method,[...args,value]);return value;};
  this.createBuffer=(...args)=>{const buffer=wrapBuffer(c,native.createBuffer(...args));log(c,c.id,'createBuffer',[...args,buffer]);return buffer;};
  this.resume=()=>{if(c.logicalState==='closed')return Promise.reject(Error('Closed audio context'));sync(c);c.logicalState='running';log(c,c.id,'resume');return Promise.resolve();};
  this.suspend=()=>{if(c.logicalState==='closed')return Promise.reject(Error('Closed audio context'));sync(c);c.logicalState='suspended';log(c,c.id,'suspend');return Promise.resolve();};
  this.close=()=>{sync(c);c.logicalState='closed';log(c,c.id,'close');return Promise.resolve();};
 }
 async function advance(){for(const c of contexts){sync(c);if(c.logicalState!=='running')continue;const frames=Math.ceil((c.elapsed*c.native.sampleRate-1e-7)/128)*128,current=Math.round(c.native.currentTime*c.native.sampleRate);if(frames<=current)continue;if(frames>=c.native.length)throw Error('Offline capture exceeded its declared duration');
   // A request inside the preceding render quantum avoids floating-point
   // ambiguity at an exact boundary; the native renderer supplies the clock.
   const wait=c.native.suspend((frames-64)/c.native.sampleRate);
   if(!c.started){c.started=true;c.rendering=c.native.startRendering();c.rendering.catch(error=>{c.renderError=error;});}else await c.native.resume();await wait;
   if(Math.round(c.native.currentTime*c.native.sampleRate)!==frames)throw Error('Unexpected native render quantum');if(c.renderError)throw c.renderError;
  }}
 function snapshot(){return{commands:commands.slice(),contexts:contexts.map(c=>({id:c.id,state:c.logicalState,currentTime:c.native.currentTime,sampleRate:c.native.sampleRate,nodes:c.nodes.map(n=>({...n})),buffers:c.buffers.map(b=>({name:b.name,length:b.length,sampleRate:b.sampleRate,channels:Array.from({length:b.native.numberOfChannels},(_,i)=>b.native.getChannelData(i).slice())}))}))};}
 async function finish(){const pcm=[];for(const c of contexts){if(!c.started){c.started=true;c.rendering=c.native.startRendering();}else if(c.native.state==='suspended')await c.native.resume();c.output=await c.rendering;pcm.push({context:c.id,sampleRate:c.output.sampleRate,length:c.output.length,channels:Array.from({length:c.output.numberOfChannels},(_,i)=>c.output.getChannelData(i).slice())});}return pcm;}
 return{Audio:available?Audio:undefined,advance,snapshot,finish,summary:()=>({contexts:contexts.length,nodes:contexts.reduce((n,c)=>n+c.nodes.length,0),buffers:contexts.reduce((n,c)=>n+c.buffers.length,0),commands:commands.length,noiseSamples:contexts.reduce((n,c)=>n+c.buffers.reduce((m,b)=>m+b.length*b.native.numberOfChannels,0),0)})};
}
module.exports={createAudioRecorder};
