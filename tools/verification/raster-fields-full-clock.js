const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const H=require('./raster-fields-harness'),{openFull:open,A,dir}=H,hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
let checks=0;const results=[],eq=(a,b,label)=>{checks++;assert.deepEqual(a,b,label)},ok=(v,label)=>{checks++;assert(v,label)};
const press=async(h,key)=>{await h.field().focus();await h.field().press(key)};
(async()=>{
  const h=await open();try{
    for(const config of A.configs){let reference;
      for(const hz of [60,120,240]){
        await h.mount(config.kind,{width:328,height:360});
        if(config.kind==='matrix'){
          await h.page.locator('[data-shape=square]').click();await h.frames(hz/10,hz);await h.page.locator('[data-shape=diamond]').click();await h.frames(hz/10,hz);await h.page.locator('[data-shape=cross]').click();await h.frames(hz,hz);
          await h.action('reset');await h.frames(hz*27,hz);ok(Number((await h.inspect()).data.scrollDistance)>1040,'Whole 104-column track wraps through actual host');
        }else{
          const sequence=config.kind==='donut'?['Home','ArrowRight','Shift+ArrowDown',' ',' ','Home']:config.kind==='morph'?['Home','ArrowRight',' ','ArrowDown','Enter','Escape','R']:['ArrowLeft','Home','ArrowDown'];
          for(const key of sequence){await press(h,key);await h.frames(hz,hz)}
          if(config.kind==='morph'){await h.frames(hz*8,hz);ok(Number((await h.inspect()).data.autoTriggers)>=1,'Complete autonomous radial story')}
          if(config.kind==='globe'){await h.frames(hz*12,hz);ok(Number((await h.inspect()).data.activeTime)>12000,'Complete original orbit')}
        }
        await h.page.evaluate(()=>document.querySelector('#field-test')._runtime.suspend());await h.page.waitForTimeout(0);const frozen=(await h.inspect(true)).model;await h.frames(hz*2,hz);eq((await h.inspect(true)).model,frozen,'Callback rate cannot advance a held model');
        await h.page.evaluate(()=>document.querySelector('#field-test')._runtime.resume());await h.page.waitForTimeout(0);await h.frames(hz,hz);
        const state=await h.inspect(true);if(!reference)reference=state;else{eq(state.model,reference.model,config.kind+' complete source model at '+hz+'Hz');ok(Math.abs(state.time-reference.time)<1e-7,'Fixed source clock is refresh-rate independent');ok(Math.abs(state.accumulator-reference.accumulator)<1e-7,'Fractional phase is refresh-rate independent')}
        results.push({kind:config.kind,hz,time:state.time,accumulator:state.accumulator,sourceTime:state.data.activeTime||state.data.simulationTime});
      }
    }
    for(const config of A.configs){
      await h.mount(config.kind,{width:328,height:360});const before=(await h.inspect(true)).model;
      await h.page.evaluate(()=>document.querySelector('#field-test').dataset.stageTheme='light');await h.page.waitForFunction(()=>document.querySelector('#field-test')._root.__FieldInspect().theme==='light');
      eq((await h.inspect(true)).model,before,'Theme changes preserve every model value and counter');eq(await h.page.locator('canvas').evaluate(c=>Array.from(c.getContext('2d').getImageData(0,0,1,1).data)),[244,244,244,255],'Light theme paints opaque neutral padding');
      await h.page.evaluate(()=>document.querySelector('#field-test')._runtime.suspend());await h.page.waitForTimeout(0);
      await h.page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'});document.dispatchEvent(new Event('visibilitychange'))});await h.page.waitForTimeout(0);
      const hidden=(await h.inspect(true)).model;await h.action('reset');await h.frames(120);eq((await h.inspect(true)).model,hidden,'Document and caller holds preserve queued Reset');
      await h.page.evaluate(()=>document.querySelector('#field-test')._runtime.resume());await h.page.waitForTimeout(0);eq((await h.inspect()).held,true,'Caller release preserves document hold');ok((await h.inspect()).queued>0,'Document hold preserves deliberate intent');
      await h.page.evaluate(()=>{delete document.hidden;delete document.visibilityState;document.dispatchEvent(new Event('visibilitychange'))});await h.page.waitForFunction(()=>!document.querySelector('#field-test')._root.__FieldInspect().held);eq((await h.inspect()).queued,0,'Last document release flushes intent');
    }
    eq(h.errors,[],'Clock and hold browser errors');
  }finally{await h.close()}
  const report={verifiedAt:new Date().toISOString(),checks,results,sourceHashes:H.hashes(__filename),scope:'Complete live source models at controlled 60/120/240Hz, interrupted input, full message/orbit/auto stories, exact theme invariance, caller/document holds and deferred intent. This is a numerical timing check, not a frame-performance profile.',errors:[]};
  fs.writeFileSync(dir+'/host-clock-proof.json',JSON.stringify(report,null,2));console.log('PASS '+checks+' full-field clock/theme/hold checks');
})().catch(error=>{console.error(error);process.exitCode=1});
