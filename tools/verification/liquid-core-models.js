/* Production model methods against1,440 unchanged original module frames and full-field hashes. */
const crypto=require('node:crypto'),assert=require('node:assert/strict'),{F,ids,open,same,addChecks,finish}=require('./liquid-core-harness');
(async()=>{const r=await open();try{const maps={};for(let i=0;i<ids.length;i++){await r.mount(ids[i],{hold:true});const methods=await r.page.evaluate(()=>Object.fromEntries(Object.entries(document.querySelector('#liquid-test')._root.__LiquidModels).map(([k,v])=>[k,v.toString()])));maps[['buttons','ferro','water','lava'][i]]=new Function('clamp','return {'+Object.values(methods).join(',')+'}')((x,a,b)=>Math.max(a,Math.min(b,x)));}const factory=kind=>maps[kind];
let checks=0;const hash=v=>crypto.createHash('sha256').update(new Uint8Array(v.buffer,v.byteOffset,v.byteLength)).digest('hex'),equal=(a,b,label)=>{checks++;if(typeof b==='number')assert(Math.abs(a-b)<1e-10,label+': '+a+' vs '+b);else assert.deepEqual(a,b,label)};
for(const[kind,id]of[['buttons','liquid-blob-buttons'],['ferro','ferrofluid-dots'],['water','water-ripple-2d'],['lava','lava-lamp']]){
 const M=factory(kind),n=M.initial();let now=0,rgba=new Uint8ClampedArray(kind==='ferro'?288*180*4:0);
 for(let i=0;i<360;i++){
  if(kind==='buttons'){if([0,40,80,160].includes(i))M.toggle(n,i===160?0:Math.floor(i/40));if(i===15)M.move(n,0,.2,.8);if(i===30)M.excite(n,0,46);if(i===100||i===190)M.pulse(n);if(i===180||i===300)M.reset(n);if(i===320)M.move(n,2,1,0)}
  if(kind==='ferro'){if(i===0||i===200){n.pointer={x:144,y:90,inside:true};n.pulse=100}if(i===40)n.pointer={x:44,y:36,inside:true};if(i===75)n.pointer={x:280,y:172,inside:true};if(i===100||i===260)n.south=!n.south;if(i===120)n.pointer.inside=false;if(i===150||i===170){n.paused=!n.paused;if(!n.paused)n.last=now}if(i===300)n.pointer={x:144,y:90,inside:true}}
  if(kind==='water'){if(i===0||i===200)M.disturb(n,64,80*.44,145,7);if(i===40)M.disturb(n,28.3,16.2,26,2.8);if(i===80)M.disturb(n,122,73,118,6);if(i===100||i===120)n.paused=!n.paused;if(i===180||i===300)M.clear(n);if(i===240)M.disturb(n,2,2,145,7)}
  if(kind==='lava'){if(i===40)n.heat=100;if(i===90||i===260)M.merge(n);if(i===120||i===240)M.palette(n);if(i===150||i===180){n.paused=!n.paused;if(!n.paused)n.last=now}if(i===220)n.heat=20}
  const dt=i===280?250:1000/60;now+=dt;M.advance(n,kind==='water'?false:kind==='buttons'?dt:now);const expected=F[id].frames[i];
  if(kind==='buttons'){
   for(const key of['energy','active'])equal(n[key],expected[key],id+' '+i+' '+key);equal(n.running?1:0,expected.raf,'Original decay clock');
   for(let j=0;j<3;j++){equal(n.nodes[j].active===undefined?undefined:String(n.nodes[j].active),expected.blobs[j].active,'Original membrane toggle '+i+'/'+j);equal(n.nodes[j].excited===undefined?undefined:String(n.nodes[j].excited),expected.blobs[j].excited,'Original excitation ordering '+i+'/'+j)}
  }
  if(kind==='ferro'){
   if(!n.paused)rgba=M.raster(n);for(const key of['south','paused','pulse','last','frameCount','coverage'])equal(n[key],expected[key],id+' '+i+' '+key);
   equal(n.pointer,expected.pointer,'Pointer');for(let j=0;j<35;j++)for(const key of['bx','by','x','y','r','cr'])equal(n.dots[j][key],expected.dots[j][key],'Ferro source '+j+' '+key);
   equal(hash(rgba),expected.rgba,'Full original ferro scalar pixels '+i);
  }
  if(kind==='water'){
   for(const key of['paused','frameCount','splashes','energy','peak'])equal(n[key],expected[key],id+' '+i+' '+key);
   for(const key of['current','previous','next','rgba'])equal(hash(n[key]),expected[key],'Complete original water '+key+' frame '+i);
  }
  if(kind==='lava'){
   for(const key of['heat','hue','paused','last','frames','forced'])equal(n[key],expected[key],id+' '+i+' '+key);equal(M.overlaps(n),expected.overlaps,'Original pair overlaps');
   for(let j=0;j<7;j++)for(const key of['x','y','r','speed','phase'])equal(n.bodies[j][key],expected.bodies[j][key],'Lava body '+j+' '+key);
  }
 }
}

same(checks,100080,'Complete original field/state checks');addChecks(checks);await r.close();finish('models');}catch(e){await r.browser.close();throw e}})().catch(e=>{console.error(e);process.exitCode=1});
