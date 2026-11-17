const{ids,same,near,ok,open,finish}=require('./physics-remaining-harness');
async function drag(r,id,mode,touch,reduced){
 const p=r.page;await r.mount(id,{mode,clock:true,width:mode==='thumb'?280:390});
 const C=id===ids[2]?'d-cloth':id===ids[4]?'d-inertia':'d-snap',lab=p.locator('.'+C+(mode==='thumb'?'-native-lab':'-lab')),b=await lab.boundingBox(),initial=(await r.inspect()).motion;
 let from,to,index;
 if(id===ids[2]){index=69;const point=initial.points[index];const x=mode==='thumb'?46.5+(point.x-initial.points[0].x)*151/(13*initial.spacingX):point.x,y=mode==='thumb'?18.04+(point.y-initial.points[0].y)*81.9278/(8*initial.spacingY):point.y;from={x:b.x+x/(mode==='thumb'?240:368)*b.width,y:b.y+y/(mode==='thumb'?196:236)*b.height};to={x:from.x-18,y:from.y+14}}
 if(id===ids[4]){const h=await p.locator('.'+C+(mode==='thumb'?'-native-handle':'-handle')).boundingBox();from={x:h.x+h.width*.5,y:h.y+h.height*.5};to={x:from.x+12,y:from.y+9}}
 if(id===ids[5]){index=0;const h=await p.locator('.'+C+(mode==='thumb'?'-native-tile':'-tile')).first().boundingBox();from={x:h.x+h.width/2,y:h.y+h.height/2};to={x:b.x+initial.points[5].x/initial.width*b.width,y:b.y+initial.points[5].y/initial.height*b.height}}
 let cdp;if(touch){cdp=await r.context.newCDPSession(p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[from]});await p.waitForTimeout(20);await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[to]});await p.waitForTimeout(20)}else{await p.mouse.move(from.x,from.y);await p.mouse.down();await p.mouse.move(to.x,to.y,{steps:3})}
 let m=(await r.inspect()).motion;
 if(id===ids[2]){same(m.drag,index,'actual cloth vertex grabbed');if(!reduced){const point=m.points[index],x=mode==='thumb'?46.5+(point.x-initial.points[0].x)*151/(13*initial.spacingX):point.x,y=mode==='thumb'?18.04+(point.y-initial.points[0].y)*81.9278/(8*initial.spacingY):point.y;near(b.x+x/(mode==='thumb'?240:368)*b.width,to.x,'scaled cloth follows physical pointer x',.3);near(b.y+y/(mode==='thumb'?196:236)*b.height,to.y,'scaled cloth follows physical pointer y',.3)}else same(m.points[index],initial.points[index],'reduced cloth keeps still geometry');ok(m.points.every(point=>!point.pinned||point.x===point.ox&&point.y===point.oy),'physical dragging preserves all pins')}
 if(id===ids[4]){same(m.dragging,true,'actual titlebar captured');near(m.x,initial.x+(to.x-from.x)/b.width*initial.width,'scaled physical window x',.3);near(m.y,initial.y+(to.y-from.y)/b.height*initial.height,'scaled physical window y',.3)}
 if(id===ids[5]){same(m.drag,0,'actual module grabbed');const body=m.bodies[0];near(body.x+m.tileWidth/2,initial.points[5].x,'physical module reaches selected slot x',.4);near(body.y+m.tileHeight/2,initial.points[5].y,'physical module reaches selected slot y',.4)}
 if(touch)await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await p.mouse.up();m=(await r.inspect()).motion;
 if(id===ids[2])same(m.drag,-1,'native cloth release');if(id===ids[4]){same(m.dragging,false,'native window release');ok(Math.abs(m.vx)<=950&&Math.abs(m.vy)<=950,'original throw clamps')}if(id===ids[5]){same(m.drag,-1,'native module release');same(m.bodies[0].slot,5,'nearest occupied slot chosen');same(m.bodies[mode==='thumb'?1:5].slot,0,'occupied module swaps to old slot')}
 if(touch)await cdp.detach();
}
(async()=>{
 for(const reducedMotion of['no-preference','reduce'])for(const touch of[false,true]){
  const r=await open({context:touch?{viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion}:{reducedMotion}});try{
   for(const mode of['thumb','full'])for(const id of[ids[2],ids[4],ids[5]])await drag(r,id,mode,touch,reducedMotion==='reduce');
   await r.close();
  }catch(e){await r.browser.close();throw e}
 }
 const r=await open();try{
  for(const mode of['thumb','full']){
   await r.mount(ids[4],{mode,clock:true});const h=await r.page.locator(mode==='thumb'?'.d-inertia-native-handle':'.d-inertia-handle').boundingBox();await r.page.mouse.move(h.x+h.width/2,h.y+h.height/2);await r.page.mouse.down();same((await r.inspect()).motion.dragging,true,'capture exists before caller hold');await r.page.evaluate(()=>document.querySelector('#physics-test')._runtime.suspend());await r.page.waitForFunction(()=>document.querySelector('#physics-test')._root.__PhysicsInspect().held);const held=(await r.inspect()).motion;same(await r.page.evaluate(()=>[...document.querySelectorAll('*')].some(n=>[1,2,3,4].some(id=>n.hasPointerCapture?.(id)))),false,'caller hold releases actual browser capture');await r.tick(9000);same((await r.inspect()).motion,held,'held grab freezes all fields');await r.page.mouse.up();await r.page.evaluate(()=>document.querySelector('#physics-test')._runtime.resume());await r.page.waitForFunction(()=>!document.querySelector('#physics-test')._root.__PhysicsInspect().held);same((await r.inspect()).motion.dragging,false,'resume finalizes interrupted grab');
  }
  await r.close();
 }catch(e){await r.browser.close();throw e}
 finish('drag');
})().catch(e=>{console.error(e);process.exitCode=1});
