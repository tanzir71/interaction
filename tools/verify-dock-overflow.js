/* Actual v4 thumbnail overflow, original button identities and held artwork. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),R=require('./load-registry')(),fixture=require('./fixtures/dock-overflow-before.json'),assets=require('../assets/demo-assets.json');
const option=n=>process.argv.find(v=>v.startsWith('--'+n+'='))?.slice(n.length+3),base=(process.argv.find(v=>/^https?:/.test(v))||'http://127.0.0.1:4173').replace(/\/$/,''),out=path.resolve(option('output')||'.artifacts/dock-overflow',new Date().toISOString().replace(/[:.]/g,'-')),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const ids=option('ids')?.split(',')||R.demos.filter(d=>d.controls.length>2).map(d=>d.id);
assert(ids.every(id=>R.demos.some(d=>d.id===id&&d.controls.length===3)));fs.mkdirSync(out,{recursive:true});
const files=[__filename,'tools/fixtures/dock-overflow-before.json','js/shell/registry.js','css/foundations.css','css/fonts.css','js/demo-runtime.js','js/shell/stage.js','js/shell/export.js','tools/build-registry.js','js/export-data.js','registry/index.json',...new Set(ids.map(id=>R.filesById[id]))],inputs=Object.fromEntries(files.map(f=>[f,hash(fs.readFileSync(f))]));
const report={started:new Date().toISOString(),inputs,ids,rows:[],scope:'Actual three-action native/full controls, original button objects/state/names, settled held source DOM/style/geometry and trusted enabled actions. Preparation observes finite initial CSS transitions finishing or browser pauses settling; it never advances source time or overrides animation time. Exact native PNG roundtrips disable GPU readback; physical keyboard/touch and offline contexts are separate checks. No first-frame, CPU4 or whole-handoff acceptance claim.'},save=()=>fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2)+'\n');save();
async function setup(browser){
  const context=await browser.newContext({viewport:{width:700,height:800}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/tools/fixtures/showcase-fields/rig.html');
  await page.evaluate(url=>{const element=document.createElement('base');element.href=url;document.head.prepend(element);},base+'/');
  for(const f of['css/foundations.css','css/fonts.css'])await page.addStyleTag({url:base+'/'+f});
  for(const f of['js/shell/registry.js','js/demo-runtime.js','js/shell/stage.js'])await page.addScriptTag({url:base+'/'+f});
  await page.evaluate(assets=>{
    INTRX.resolveAssets=value=>value.replace(/\{\{asset:([\w-]+)\}\}/g,(_,name)=>assets[name]);window.originalNaming=INTRX.nameDockControls;
    const create=INTRX.createRuntime;INTRX.createRuntime=stage=>{const runtime=create(stage);runtime.suspend();return runtime;};
    window.dockCalls=[];const add=EventTarget.prototype.addEventListener,remove=EventTarget.prototype.removeEventListener,wrappers=new WeakMap();
    EventTarget.prototype.addEventListener=function(type,fn,options){
      if(type==='click'&&this instanceof Element&&this.matches('.stage,.dock-btn[data-action]')&&typeof fn==='function'){
        const capture=typeof options==='boolean'?options:!!options?.capture;let functions=wrappers.get(this);if(!functions){functions=new Map();wrappers.set(this,functions);}let phases=functions.get(fn);if(!phases){phases=new Map();functions.set(fn,phases);}
        if(!phases.has(capture)){const kind=this.matches('.stage')?(capture?'stage-capture':'stage-bubble'):'button';phases.set(capture,function(event){const action=event.target.closest?.('.stage-dock button[data-action]')?.dataset.action;if(action)dockCalls.push({action,trusted:event.isTrusted,path:kind});return fn.call(this,event);});}
        return add.call(this,type,phases.get(capture),options);
      }return add.call(this,type,fn,options);
    };
    EventTarget.prototype.removeEventListener=function(type,fn,options){const capture=typeof options==='boolean'?options:!!options?.capture;return remove.call(this,type,type==='click'?(wrappers.get(this)?.get(fn)?.get(capture)||fn):fn,options);};
  },assets);
  return{context,page,errors,close:()=>context.close()};
}
async function mount(rig,d,mode){
  await rig.page.evaluate(({d,mode,old})=>{
    document.querySelector('.stage')?._runtime.dispose();document.body.replaceChildren();Object.assign(document.body.style,{margin:'0',minHeight:'1500px',background:'#151515'});
    const stage=document.createElement('div');stage.className='demo-stage stage';stage.style.cssText='position:relative;width:372px;height:'+(mode==='thumb'?264:560)+'px;margin:24px';document.body.append(stage);
    INTRX.nameDockControls=new Function('return ('+old+')')();INTRX.register(d);INTRX.mountStage(d,stage,mode);INTRX.nameDockControls=originalNaming;
    stage.querySelector('.stage-dock').style.visibility='hidden';window.subject={stage,d};
  },{d:JSON.parse(JSON.stringify(d)),mode,old:fixture.namingFunction});
  await rig.page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
  const preparation=await rig.page.evaluate(()=>subject.stage.getAnimations({subtree:true}).map(a=>({type:a.constructor.name,state:a.playState,pending:a.pending,time:a.currentTime})));
  await rig.page.waitForFunction(()=>subject.stage.getAnimations({subtree:true}).every(a=>!a.pending&&(a.playState==='paused'||a.playState==='finished')),null,{timeout:3000});
  return{initialAnimations:preparation,settled:true};
}
async function preserve(rig){
  return rig.page.evaluate(()=>{
    const{stage,d}=subject,dock=stage.querySelector('.stage-dock'),root=stage._root,buttons=[...dock.querySelectorAll('button[data-action]')];
    const buttonState=b=>({text:b.textContent,label:b.getAttribute('aria-label'),labelledby:b.getAttribute('aria-labelledby'),disabled:b.disabled,hidden:b.hidden,display:b.style.display}),before=buttons.map(buttonState),initialVisible=buttons.filter(b=>!b.hidden&&getComputedStyle(b).display!=='none').length,html=root.outerHTML,clock=stage._runtime.now();
    const metrics=()=>[root,...root.querySelectorAll('*')].map(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return[n.tagName,r.x,r.y,r.width,r.height,s.fontSize,s.transform,s.opacity,s.color,n instanceof HTMLImageElement?[n.naturalWidth,n.naturalHeight]:null];}),geometry=JSON.stringify(metrics());
    INTRX.nameDockControls(stage,d.controls);
    if(root.outerHTML!==html)throw Error('Shared UI changed original source DOM');
    if(stage._runtime.now()!==clock||!stage._runtime.suspended)throw Error('Shared UI advanced held source time');
    if(JSON.stringify(metrics())!==geometry)throw Error('Shared UI changed original artwork geometry/style');
    for(let i=0;i<buttons.length;i++){
      const b=buttons[i];if(!b.isConnected||JSON.stringify(buttonState(b))!==JSON.stringify(before[i]))throw Error('Original action object/state/name changed');
      const label=document.getElementById(b.getAttribute('aria-labelledby'));if(label&&label.parentElement!==b.parentElement)throw Error('Fixed naming sibling lost ownership');
    }
    const main=[...dock.children].filter(n=>n.matches('button')&&!n.hidden&&getComputedStyle(n).display!=='none'),menu=dock.querySelector('.dock-overflow');
    if(stage.dataset.mode==='thumb'){
      if(main.length>2)throw Error('At most two visible thumbnail pills required');
      if(initialVisible>2&&(!menu?.hidden||menu.querySelectorAll('button[data-action]').length!==2))throw Error('Every overflow action remains in the closed disclosure');
      if(initialVisible<=2&&menu)throw Error('Do not create an unnecessary disclosure for hidden full-only actions');
    }else if(menu||main.length!==initialVisible||buttons.some(button=>button.parentElement!==dock))throw Error('Full composition preserves every original direct control and its visibility');
    const count=dock.childElementCount;INTRX.nameDockControls(stage,d.controls);if(dock.childElementCount!==count)throw Error('Enhancement is not idempotent');
    return{mode:stage.dataset.mode,sourceDOMExact:true,geometryExact:true,clock,buttons:before,initialVisible,mainControls:main.length,menu:!!menu,pillHeight:main.at(-1)?.getBoundingClientRect().height,pillType:main.at(-1)?getComputedStyle(main.at(-1)).fontSize:null};
  });
}
async function actions(rig,d,mode){
  await rig.page.locator('.stage-dock').evaluate(n=>n.style.visibility='');const results=[];
  for(const control of d.controls){
    const button=rig.page.locator('.stage-dock button[data-action="'+control.action+'"]');
    if(await button.evaluate(n=>n.hidden||getComputedStyle(n).display==='none')){results.push({action:control.action,hidden:true});continue;}
    if(await button.isDisabled()){results.push({action:control.action,disabled:true});continue;}
    if(!await button.isVisible())await rig.page.getByRole('button',{name:'More actions',exact:true}).click();
    const before=await rig.page.evaluate(()=>dockCalls.length);await button.click();const calls=await rig.page.evaluate(n=>dockCalls.slice(n),before);
    assert(calls.length&&calls.every(call=>call.action===control.action&&call.trusted),'Original button or delegated Stage listener receives trusted input');
    assert(calls.filter(call=>call.path==='button').length<=1,'No duplicate target delivery');
    if(mode==='thumb'&&await rig.page.locator('.dock-overflow').count())assert(await rig.page.locator('.dock-overflow').isHidden(),'Action closes disclosure despite controller propagation handling');
    results.push({action:control.action,trusted:true,paths:calls.map(call=>call.path)});
  }return results;
}
(async()=>{
  const browser=await chromium.launch({...(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{}),args:['--disable-gpu','--mute-audio']});report.artworkBrowser=browser.version();
  try{const rig=await setup(browser);try{
    for(const id of ids){const d=R.demos.find(d=>d.id===id);
      for(const mode of['thumb','full']){
        const preparation=await mount(rig,d,mode);let before;if(mode==='thumb')before=await rig.page.locator('.stage').screenshot();
        const row=await preserve(rig);row.preparation=preparation;
        if(mode==='thumb'){
          const after=await rig.page.locator('.stage').screenshot();fs.writeFileSync(out+'/'+id+'-native-before.png',before);fs.writeFileSync(out+'/'+id+'-native-after.png',after);
          assert(before.equals(after),'Exact held native artwork PNG '+id);row.pngSHA256=hash(before);assert.equal(row.pillHeight,28);assert.equal(row.pillType,'12px');
        }
        row.actions=await actions(rig,d,mode);await rig.page.evaluate(()=>subject.stage._runtime.dispose());
        if(mode==='thumb'&&await rig.page.locator('.dock-more').count()){assert(await rig.page.locator('.dock-more').isDisabled());assert(await rig.page.locator('.dock-overflow').isHidden());}
        assert.deepEqual(rig.errors,[]);report.rows.push({id,...row});save();console.log('PASS',id,mode);
      }
    }
  }finally{await rig.close();}}finally{await browser.close();}
  for(const[f,h]of Object.entries(inputs))assert.equal(hash(fs.readFileSync(f)),h,'Stable source '+f);
  report.finished=new Date().toISOString();report.sourceStable=true;save();console.log('PASS',report.rows.length,'actual thumbnail/full Dock stories');
})().catch(e=>{report.error=e.stack;save();console.error(e.stack);process.exitCode=1;});
