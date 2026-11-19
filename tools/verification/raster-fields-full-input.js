const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const H=require('./raster-fields-harness'),{openFull:open,A,dir}=H,hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
let checks=0;const results=[];
const eq=(a,b,label)=>{checks++;assert.deepEqual(a,b,label)},ok=(v,label)=>{checks++;assert(v,label)},near=(a,b,label,tolerance=1e-10)=>{checks++;assert(Math.abs(a-b)<=tolerance,label+': '+a+' != '+b)};
async function visiblePoint(h,u=.5,v=.5){return h.page.locator('[class$="-viewport"]').evaluate((node,{u,v})=>{const b=node.getBoundingClientRect();return{x:b.left+b.width*u,y:b.top+b.height*v}},{u,v})}
(async()=>{
  for(const reduced of [false,true]){
    const h=await open({deviceScaleFactor:2,reducedMotion:reduced?'reduce':'no-preference'});
    try{
      await h.mount('donut',{width:360,height:360});const p=await visiblePoint(h);
      await h.page.locator('canvas').evaluate(canvas=>{canvas.__events=[];for(const type of ['pointerdown','pointermove'])canvas.addEventListener(type,event=>canvas.__events.push({type,x:event.clientX,y:event.clientY,id:event.pointerId}))});
      await h.page.mouse.move(p.x,p.y);await h.page.mouse.down();eq((await h.inspect()).captured,1,'Physical mouse capture');
      await h.page.mouse.move(p.x+6,p.y-4);const moved=await h.inspect(true);
      const oracle=await h.page.locator('canvas').evaluate((canvas,view)=>{const down=canvas.__events.find(e=>e.type==='pointerdown'),move=canvas.__events.at(-1),b=canvas.getBoundingClientRect();return{dx:(move.x-down.x)/b.width*(view.width+2*view.padding),dy:(move.y-down.y)/b.height*(view.height+2*view.padding)}},moved.presentation);
      near(moved.model.state.velocityB,Math.max(-.22,Math.min(.22,oracle.dx*.008)),'Physical scaled X drag gain');near(moved.model.state.velocityA,Math.max(-.22,Math.min(.22,oracle.dy*.008)),'Physical scaled Y drag gain');
      await h.page.mouse.up();eq((await h.inspect()).captured,0,'Physical mouse release');eq((await h.inspect(true)).model.state.dragging,false,'Native drag ends');
      await h.field().focus();await h.field().press('Home');await h.field().press('ArrowRight');near((await h.inspect(true)).model.state.angleB,.32,'Native arrow preserves original angle step');
      await h.field().press('Shift+ArrowUp');near((await h.inspect(true)).model.state.angleA,.36,'Native shifted angle step');
      await h.mount('morph',{width:360,height:360});const origin=await visiblePoint(h,.24,.7);
      const expectedOrigin=await h.page.locator('canvas').evaluate((canvas,{point,state})=>{const b=canvas.getBoundingClientRect(),view=state.presentation;return{x:Math.max(0,Math.min(210,(point.x-b.left)/b.width*(view.width+2*view.padding)-view.padding-79)),y:Math.max(0,Math.min(192,(point.y-b.top)/b.height*(view.height+2*view.padding)-view.padding-38))}},{point:origin,state:await h.inspect()});
      await h.page.mouse.click(origin.x,origin.y);const morph=await h.inspect(true);near(morph.model.state.originX,expectedOrigin.x,'Native click radial X origin',.02);near(morph.model.state.originY,expectedOrigin.y,'Native click radial Y origin',.02);
      await h.frames(30);await h.field().press('Enter');const reversal=await h.inspect(true);eq(reversal.model.lastTriggerBefore,reversal.model.lastTriggerFrom,'Native interruption preserves every visible source value');
      await h.field().press('Escape');eq((await h.inspect()).data.morphing,'false','Native Escape cancels');
      const vp=await visiblePoint(h),pageScroll=await h.page.evaluate(()=>scrollY);await h.page.mouse.move(vp.x,vp.y);await h.page.mouse.wheel(180,140);await h.page.waitForTimeout(140);
      const scrolled=await h.inspect();ok(scrolled.camera.left>0&&scrolled.camera.top>0,'Actual native two-axis wheel');eq(await h.page.evaluate(()=>scrollY),pageScroll,'Internal wheel does not move page');
      const moves=(await h.inspect()).data.keyboardMoves;await h.viewport().focus();await h.viewport().press('End');await h.page.waitForFunction(()=>{const n=document.querySelector('[class$="-viewport"]');return Math.abs(n.scrollTop-(n.scrollHeight-n.clientHeight))<1.5});let camera=(await h.inspect()).camera;ok(Math.abs(camera.top-(camera.worldHeight-camera.height))<1.5,'Native End reaches final row');
      await h.viewport().press('Home');await h.page.waitForFunction(()=>document.querySelector('[class$="-viewport"]').scrollTop===0);eq((await h.inspect()).camera.top,0,'Native Home reaches first row');eq((await h.inspect()).data.keyboardMoves,moves,'Viewport keys do not steer the model');
      await h.mount('matrix',{width:360,height:360});await h.page.locator('[data-shape=diamond]').click();eq((await h.inspect()).data.shapeName,'diamond','Native shape click');
      await h.page.locator('[data-shape=diamond]').press('ArrowRight');eq((await h.inspect()).data.shapeName,'cross','Native radio Right');eq(await h.page.locator('[data-shape=cross]').evaluate(n=>document.activeElement===n),true,'Native radio focus follows');
      await h.page.locator('[data-shape=cross]').press('ArrowRight');eq((await h.inspect()).data.shapeName,'circle','Native radio wrap');await h.page.locator('[data-shape=circle]').press('End');eq((await h.inspect()).data.shapeName,'cross','Native radio End');
      await h.page.locator('[data-shape=cross]').press('Home');eq((await h.inspect()).data.shapeName,'circle','Native radio Home');
      const columnPoint=await visiblePoint(h,.75,.5),columnOracle=await h.page.locator('canvas').evaluate((canvas,p)=>{const b=canvas.getBoundingClientRect(),logical=(p.x-b.left)/b.width*576-8;return Math.max(0,Math.min(55,Math.round((logical-5)/10)))},columnPoint);
      await h.page.mouse.move(columnPoint.x,columnPoint.y);eq(Number((await h.inspect()).data.pointerColumn),columnOracle,'Physical complete matrix-column mapping');
      await h.mount('globe',{width:360,height:360});await h.field().focus();await h.field().press('ArrowRight');near((await h.inspect(true)).model.state.targetTiltZ,3*Math.PI/180,'Native globe axis key');await h.field().press('Home');near((await h.inspect(true)).model.state.targetTiltZ,0,'Native globe centering');
      const globePoint=await visiblePoint(h,.7,.35),globeOracle=await h.page.locator('canvas').evaluate((canvas,p)=>{const b=canvas.getBoundingClientRect();return{x:Math.max(-1,Math.min(1,((p.x-b.left)/b.width*376-8)/360*2-1)),y:Math.max(-1,Math.min(1,((p.y-b.top)/b.height*260-8)/244*2-1))}},globePoint);
      await h.page.mouse.move(globePoint.x,globePoint.y);const tilt=(await h.inspect(true)).model.state;near(tilt.targetTiltX,-globeOracle.y*18*Math.PI/180,'Physical globe X axis',.0001);near(tilt.targetTiltZ,globeOracle.x*18*Math.PI/180,'Physical globe Z axis',.0001);
      await h.mount('donut',{width:360,height:360});const disposePoint=await visiblePoint(h);await h.page.mouse.move(disposePoint.x,disposePoint.y);await h.page.mouse.down();eq((await h.inspect()).captured,1,'Capture before disposal');
      await h.page.evaluate(()=>document.querySelector('#field-test')._runtime.dispose());eq((await h.inspect()).captured,0,'Host disposal releases capture');eq((await h.inspect()).lifecycle.captures,0,'Core disposal releases capture');await h.page.mouse.up();eq(h.errors,[],'Physical desktop browser errors');
      results.push({device:'mouse/keys/wheel',reduced,dpr:2});
    }finally{await h.close()}
  }
  for(const reduced of [false,true]){
    const h=await open({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2,reducedMotion:reduced?'reduce':'no-preference'});
    try{
      await h.mount('donut',{width:358,height:360});const cdp=await h.context.newCDPSession(h.page),p=await visiblePoint(h);
      const touch=(type,x,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'||type==='touchCancel'?[]:[{x,y,id:17}]});
      await touch('touchStart',p.x,p.y);await touch('touchMove',p.x+20,p.y-15);await touch('touchMove',p.x+45,p.y-25);await touch('touchEnd');
      const stirred=await h.inspect();ok(Number(stirred.data.dragMoves)>0,'Physical moving touch spins torus');eq(stirred.captured,0,'Touch release clears capture');eq(stirred.data.dragging,'false','Native touch drag ends');
      await h.action('pan');eq((await h.inspect()).pan,true,'Native Pan toggle');const before=(await h.inspect()).camera,pageScroll=await h.page.evaluate(()=>scrollY),panPoint=await visiblePoint(h,.65,.7);
      await touch('touchStart',panPoint.x,panPoint.y);for(let n=1;n<=6;n++){await touch('touchMove',panPoint.x-15*n,panPoint.y-15*n);await h.page.waitForTimeout(20)}await h.page.waitForTimeout(120);await touch('touchMove',panPoint.x-90,panPoint.y-90);await touch('touchEnd');await h.page.waitForTimeout(160);
      const after=(await h.inspect()).camera;ok(after.left>before.left||after.top>before.top,'Actual native touch camera pan');eq(await h.page.evaluate(()=>scrollY),pageScroll,'Touch camera does not move page');eq((await h.inspect()).captured,0,'Pan mode never captures');
      // A native fling consumes a tap while it is stopping. Finish that browser
      // gesture before replacing its scroll container and testing a radio tap.
      await h.page.waitForFunction(()=>{const n=document.querySelector('[class$="-viewport"]'),now=performance.now(),position=n.scrollLeft+','+n.scrollTop;const last=window.__panSettle;if(!last||last.position!==position){window.__panSettle={position,at:now};return false}return now-last.at>=300},{},{polling:50,timeout:5000});
      await h.mount('matrix',{width:358,height:360});await h.page.evaluate(()=>{window.__radioEvents=[];for(const type of ['pointerdown','pointerup','touchstart','touchend','click'])document.querySelector('[data-shape=square]').addEventListener(type,e=>window.__radioEvents.push({type:e.type,target:e.target.dataset.shape}))});const box=await h.page.locator('[data-shape=square]').boundingBox();await h.page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);
      try{await h.page.waitForFunction(()=>document.querySelector('#field-test')._root.__FieldInspect().data.shapeName==='square',{},{timeout:2000})}catch(error){fs.writeFileSync(dir+'/touch-radio-failure.json',JSON.stringify({reduced,box,state:await h.inspect(),events:await h.page.evaluate(()=>window.__radioEvents)},null,2));throw error}eq((await h.inspect()).data.shapeName,'square','Native touch chooses matrix shape');
      eq(h.errors,[],'Physical touch browser errors');results.push({device:'touch',reduced,dpr:2});
    }finally{await h.close()}
  }
  const report={verifiedAt:new Date().toISOString(),checks,results,sourceHashes:H.hashes(__filename),scope:'Physical mouse, native keyboard/radio focus, actual wheel and CDP touch. Independent scaled coordinates, complete camera access, torus capture and disposal. Both motion preferences and DPR2.',errors:[]};
  fs.writeFileSync(dir+'/host-input-proof.json',JSON.stringify(report,null,2));console.log('PASS '+checks+' physical full-field checks');
})().catch(error=>{console.error(error);process.exitCode=1});
