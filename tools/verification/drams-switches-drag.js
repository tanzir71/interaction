module.exports=async function verifyDrag({browser,open,demos,configs,check,equal}){
 const rig=await open(browser);
 try{for(const d of demos)for(const mode of['thumb','full']){
  const c=configs.find(c=>c.id===d.id),specs=mode==='thumb'?c.nativeChannels:c.fullChannels,axis=mode==='thumb'?c.nativeAxis:c.fullAxis,primary=specs.find(s=>s.id===(mode==='thumb'?c.nativePrimary:c.fullPrimary));
  if(axis===null)continue;
  await rig.mount(d,{mode,width:mode==='thumb'?328:390,height:mode==='thumb'?264:650,clock:true});
  const distance=primary.on[axis]-primary.off[axis];
  await rig.page.evaluate(({axis,distance})=>{const s=document.querySelector('.stage'),r=s._root,b=r.querySelector('.'+r.className+'-input');window.__switchPacket=(type,p=0)=>b.dispatchEvent(new PointerEvent(type,{pointerId:33,bubbles:true,clientX:(100+(axis===0?p*distance:0))*s._ctx.scale,clientY:(100+(axis===1?p*distance:0))*s._ctx.scale}));b.dispatchEvent(new KeyboardEvent('keydown',{key:'Home',bubbles:true}));r.__Tick(2000);__switchPacket('pointerdown');r.__Tick(20);__switchPacket('pointermove',.5);},{axis,distance});
  let state=await rig.inspect();check(Math.abs(state.motion.channels[0].position[0]-.5)<1e-9,d.id+' direct pointer follow');equal(state.model.checked,false,'drag waits for release');
  await rig.page.evaluate(()=>{const r=document.querySelector('.stage')._root;r.querySelector('.'+r.className+'-input').dispatchEvent(new KeyboardEvent('keydown',{key:'a',bubbles:true}));});
  equal((await rig.inspect()).motion.channels[0].kind,'drag',d.id+' unrelated key preserves grab');
  await rig.page.evaluate(()=>document.querySelector('.stage')._runtime.suspend());await rig.page.waitForTimeout(0);
  await rig.page.evaluate(()=>__switchPacket('pointermove',.25));equal((await rig.inspect()).model.checked,false);
  await rig.page.evaluate(()=>document.querySelector('.stage')._runtime.resume());await rig.page.waitForTimeout(0);
  state=await rig.inspect();check(Math.abs(state.motion.channels[0].position[0]-.25)<1e-9,d.id+' pending drag follows after hold');equal(state.motion.channels[0].kind,'drag',d.id+' resumed grab stays direct');equal(state.motion.channels[0].velocity[0],0,'held movement creates no release velocity');
  await rig.page.evaluate(()=>__switchPacket('pointermove',1.1));state=await rig.inspect();check(Math.abs(state.motion.channels[0].position[0]-1.055)<1e-9,d.id+' 0.55 rubber band');
  await rig.page.evaluate(()=>__switchPacket('pointermove',10));state=await rig.inspect();check(Math.abs((state.motion.channels[0].position[0]-1)*distance)<=8.00001,d.id+' eight pixel overrun');
  await rig.page.evaluate(()=>{document.querySelector('.stage')._root.__Tick(100);__switchPacket('pointerup',10);});state=await rig.inspect();equal(state.motion.channels[0].initialVelocity[0],0,d.id+' stale velocity does not fling');
  await rig.tick(2000);equal((await rig.inspect()).motion.active,0);equal((await rig.inspect()).pointers,[]);
  await rig.page.evaluate(()=>{__switchPacket('pointerdown');__switchPacket('pointermove',.4);document.querySelector('.stage')._runtime.dispose();});state=await rig.inspect();equal(state.dead,true);equal(state.frame,false);equal(state.motion.active,0);equal(state.pointers,[]);equal(state.retained,0);equal(state.animations,0);
 }}finally{await rig.close();}
};
