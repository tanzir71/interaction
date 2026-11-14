/* Phase 4 interaction/portable-export regression checks for remediated demos.
   PLAYWRIGHT_MODULE may point to a development installation. */
const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--enable-unsafe-swiftshader']});
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']}),page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 let checks=0;const check=(condition,label)=>{assert.ok(condition,label);checks++;};
 const open=async id=>{await page.evaluate(id=>INTRX.router.go('#/c/'+id),id);await page.waitForFunction(id=>document.querySelector('.detail-stage')?._ctx?.mode==='full'&&document.querySelector('.detail-stage').dataset.stage===id,id);};
 const root=selector=>page.locator('.detail-stage').locator(selector);
 const ids=['btn-border-beam','elastic-tabs','toast-stack','btn-success-morph','checkbox-draw-check','copy-inline-feedback','btn-shimmer-sweep','btn-icon-hop','btn-ripple-material','btn-jelly-press'];
 try{
  fs.mkdirSync('.artifacts/exemplars',{recursive:true});
  await page.goto(process.argv[2]||'http://127.0.0.1:4173',{waitUntil:'networkidle'});
  await open('btn-border-beam');
  await page.waitForFunction(()=>document.querySelector('.source-lines')?.textContent.includes('<!DOCTYPE html>'));
  check(await page.locator('script[src*="demo-assets"]').count()===0,'Initial detail source preview defers the portable asset bundle');
  check(await root('.d-beam-demo').getAttribute('data-running')==='true','Beam starts its ambient loop');
  await page.locator('.detail-stage [data-action="toggle"]').click();
  await root('.d-beam-demo-orbit').evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const paused=await root('.d-beam-demo-orbit').evaluate(el=>getComputedStyle(el).offsetDistance);await page.waitForTimeout(100);
  check(await root('.d-beam-demo-orbit').evaluate(el=>getComputedStyle(el).offsetDistance)===paused,'Pause freezes the current perimeter position');
  await page.locator('#demo-speed').selectOption('2');
  await page.locator('.detail-stage').evaluate(stage=>{stage._runtime.suspend();stage._runtime.resume();});await page.waitForTimeout(100);
  check(await root('.d-beam-demo-orbit').evaluate(el=>getComputedStyle(el).offsetDistance)===paused,'Speed and lifecycle changes preserve author pause');
  await page.locator('.detail-stage [data-action="toggle"]').click();await page.waitForTimeout(100);
  check(await root('.d-beam-demo-orbit').evaluate(el=>getComputedStyle(el).offsetDistance)!==paused,'Resume advances the perimeter');
  await page.locator('.detail-stage').evaluate(stage=>stage._runtime.suspend());await page.waitForTimeout(50);
  const suspended=await root('.d-beam-demo-orbit').evaluate(el=>getComputedStyle(el).offsetDistance);await page.waitForTimeout(100);
  check(await root('.d-beam-demo-orbit').evaluate(el=>getComputedStyle(el).offsetDistance)===suspended,'Runtime suspension freezes a running CSS loop');
  await page.locator('.detail-stage').evaluate(stage=>stage._runtime.resume());
  await root('.d-beam-demo-button').click();await root('.d-beam-demo-button').press('Space');
  check(await root('.d-beam-demo').getAttribute('data-activations')==='2','Native pointer and keyboard activation');

  await open('elastic-tabs');
  await page.locator('.detail-stage [data-action="next"]').click();
  check(await root('.d-etabs-demo').getAttribute('data-active')==='1','Shared Next selects Drafts');
  const beforeKey=Number(await root('.d-etabs-demo').getAttribute('data-moves'));
  await root('[role="tab"]').nth(1).focus();await page.keyboard.press('End');
  check(Number(await root('.d-etabs-demo').getAttribute('data-moves'))===beforeKey+1,'Shell tab helpers do not duplicate a demo keyboard action');
  check(await root('[role="tab"]').nth(3).getAttribute('aria-selected')==='true','End selects Archive');
  await page.keyboard.press('ArrowRight');
  check(await root('[role="tab"]').first().getAttribute('aria-selected')==='true','Arrow navigation wraps and moves focus');
  await root('[role="tab"]').nth(2).click();await root('[role="tab"]').nth(1).click();
  await page.waitForFunction(()=>document.querySelector('.detail-stage .d-etabs-demo').dataset.running==='false');
  check(await root('.d-etabs-demo-indicator').evaluate(el=>{const a=el.getBoundingClientRect(),b=el.parentElement.querySelector('[aria-selected="true"]').getBoundingClientRect();return Math.abs(a.left-b.left)<1&&Math.abs(a.width-b.width)<1;}),'Rapid retargeting settles on actual selected-tab geometry');
  await page.locator('.stage-viewport').evaluate(el=>el.style.width='300px');await page.waitForTimeout(300);
  await root('[role="tab"]').nth(3).click();await page.waitForFunction(()=>document.querySelector('.detail-stage .d-etabs-demo').dataset.running==='false');
  check(await root('.d-etabs-demo-indicator').evaluate(el=>Math.abs(el.getBoundingClientRect().left-el.parentElement.querySelector('[aria-selected="true"]').getBoundingClientRect().left)<1),'Measured indicator stays aligned after stage scaling');

  await open('toast-stack');
  const survivor=await root('.d-toast-demo-card').first().elementHandle();
  await page.locator('.detail-stage [data-action="add"]').click();
  check(await survivor.evaluate(el=>el.isConnected),'Adding preserves existing card nodes and in-flight reflow');
  for(let i=0;i<5;i++)await page.locator('.detail-stage [data-action="add"]').click();
  check(await root('.d-toast-demo-card').count()===5,'Rapid additions respect the five-card cap');
  check(await root('.d-toast-demo').getAttribute('data-order')==='9,8,7,6,5','New toasts retain deterministic front-to-back order');
  await page.locator('.detail-stage [data-action="dismiss"]').click();await page.locator('.detail-stage [data-action="dismiss"]').click();
  await page.waitForFunction(()=>document.querySelector('.detail-stage .d-toast-demo').dataset.count==='4');
  check(await root('.d-toast-demo').getAttribute('data-dismissals')==='1','Repeated dismissal during exit removes one identity');
  await root('.d-toast-demo-stack').focus();
  check(await root('.d-toast-demo').getAttribute('data-fanned')==='true','Keyboard focus reveals the stack');
  await page.keyboard.press('Escape');check(await root('.d-toast-demo').getAttribute('data-fanned')==='false','Escape compacts the stack');
  await page.keyboard.press('Delete');await page.waitForFunction(()=>document.querySelector('.detail-stage .d-toast-demo').dataset.count==='3');
  check(true,'Delete dismisses the middle notification');
  await page.locator('.detail-stage [data-action="dismiss"]').click();await page.locator('#replay-detail').click();await page.waitForTimeout(300);
  check(await root('.d-toast-demo').getAttribute('data-count')==='3','Replay cancels exits before reseeding');

  await open('btn-success-morph');await root('.d-success-demo-button').press('Space');
  check(await root('.d-success-demo-button').getAttribute('aria-busy')==='true','Publish reports its pending operation');
  await page.locator('#replay-detail').click();await page.waitForTimeout(1000);
  check(await root('.d-success-demo').getAttribute('data-state')==='ready','Replay cancels a pending publish');
  await page.locator('#demo-speed').selectOption('2');await page.locator('.detail-stage [data-action="run"]').click();await page.waitForTimeout(50);
  check(await root('.d-success-demo-button').evaluate(el=>el.getAnimations({subtree:true}).length>0&&el.getAnimations({subtree:true}).every(animation=>animation.playbackRate===2)),'New CSS transitions inherit the selected runtime speed');
  await page.waitForFunction(()=>document.querySelector('.d-success-demo').dataset.state==='success');
  check(await root('.d-success-demo-button').getAttribute('aria-label')==='Published','Publish resolves to a confirmed state');
  await root('.d-success-demo-button').press('Space');check(await root('.d-success-demo').getAttribute('data-runs')==='1','A completed operation ignores repeated activation');

  await open('checkbox-draw-check');check(await root('input:checked').count()===2,'Checklist starts with its two selected options');
  await root('input').nth(2).focus();await page.keyboard.press('Space');check(await root('input:checked').count()===3,'Native Space toggles the third checkbox');
  await root('label').first().click();check(await root('input:checked').count()===2,'Native label changes its own input');
  await page.locator('.detail-stage [data-action="replay"]').click();check(await root('input').evaluateAll(inputs=>inputs.map(i=>i.checked).join(','))==='true,true,false','Checklist replay restores the exact seed');

  await open('copy-inline-feedback');await root('.d-copy-demo-button').click();await page.waitForFunction(()=>document.querySelector('.d-copy-demo').dataset.phase==='feedback');
  check(await page.evaluate(()=>navigator.clipboard.readText())==='sk_live_example_4f2a','Copy writes the documented fictional example');
  await page.waitForFunction(()=>document.querySelector('.d-copy-demo').dataset.phase==='idle');check(await root('.d-copy-demo-label').textContent()==='Copy','Copy acknowledgement returns to ready');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>new Promise(resolve=>window.resolveExampleWrite=resolve)}}));
  await root('.d-copy-demo-button').click();await page.locator('.detail-stage [data-action="replay"]').click();await page.evaluate(()=>window.resolveExampleWrite());
  check(await root('.d-copy-demo').getAttribute('data-phase')==='idle','Replay invalidates a pending clipboard write');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(Error('Denied'))}}));
  await root('.d-copy-demo-button').click();await page.waitForFunction(()=>document.querySelector('.d-copy-demo').dataset.phase==='error');
  check(await root('.d-copy-demo').getAttribute('data-copied')==='false'&&await root('.d-copy-demo-label').textContent()==='Retry','Clipboard failure retains retry input without claiming success');
  await page.evaluate(()=>{delete navigator.clipboard;delete window.resolveExampleWrite;});
  await open('elastic-tabs');await page.getByRole('tab',{name:'CSS',exact:true}).click();
  await page.evaluate(()=>{window.originalSourceCode=INTRX.getCode;INTRX.getCode=()=>new Promise(resolve=>window.resolveSourceCopy=resolve);});
  await page.locator('#copy-source').click();check(await page.locator('#copy-source').getAttribute('aria-busy')==='true','Deferred source copy gives immediate preparation feedback');
  await page.getByRole('tab',{name:'LLM prompt',exact:true}).click();await page.evaluate(()=>window.resolveSourceCopy('<!DOCTYPE html>'));
  await page.waitForFunction(async()=>String(await navigator.clipboard.readText()).startsWith('.d-etabs-demo'));
  check(true,'Deferred copy retains the format selected at activation');
  await page.evaluate(()=>{INTRX.getCode=window.originalSourceCode;delete window.originalSourceCode;delete window.resolveSourceCopy;});
  const textContrast=async(selector,background)=>page.locator('.detail-stage').evaluate((stage,{selector,background})=>{const rgb=value=>value.match(/[\d.]+/g).slice(0,3).map(Number),luma=value=>rgb(value).map(x=>{x/=255;return x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4);}).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);const a=luma(getComputedStyle(stage.querySelector(selector)).color),b=luma(getComputedStyle(stage.querySelector(background)).backgroundColor);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);},{selector,background});
  await open('copy-inline-feedback');await page.locator('button[data-stage-theme="light"]').click();await root('.d-copy-demo-button').click();await page.waitForFunction(()=>document.querySelector('.d-copy-demo').dataset.copied==='true');await page.waitForTimeout(250);
  check(await textContrast('.d-copy-demo-label','.d-copy-demo-button')>=4.5,'Light-stage copied text retains accessible contrast');
  await open('btn-success-morph');await page.locator('button[data-stage-theme="light"]').click();await page.locator('.detail-stage [data-action="run"]').click();await page.waitForFunction(()=>document.querySelector('.d-success-demo').dataset.state==='success');await page.waitForTimeout(400);
  check(await textContrast('.d-success-demo-confirm','.d-success-demo-button')>=4.5,'Light-stage confirmation text retains accessible contrast');

  await open('btn-shimmer-sweep');check(await root('.d-shimmer-demo').getAttribute('data-running')==='true','Shimmer starts its ambient pass');
  await page.locator('.detail-stage [data-action="toggle"]').click();await page.waitForTimeout(40);
  const sheen=await root('.d-shimmer-demo-sheen').evaluate(el=>getComputedStyle(el).backgroundPosition);
  await page.locator('.detail-stage').evaluate(stage=>{stage._runtime.setSpeed(2);stage._runtime.suspend();stage._runtime.resume();});await page.waitForTimeout(100);
  check(await root('.d-shimmer-demo-sheen').evaluate(el=>getComputedStyle(el).backgroundPosition)===sheen,'Shimmer author pause survives speed and suspension');
  await page.locator('.detail-stage [data-action="toggle"]').click();await page.waitForTimeout(100);
  check(await root('.d-shimmer-demo-sheen').evaluate(el=>getComputedStyle(el).backgroundPosition)!==sheen,'Shimmer resumes from the paused pass');
  await root('.d-shimmer-demo-button').press('Space');check(await root('.d-shimmer-demo').getAttribute('data-activations')==='1','Shimmer native Space activates once');

  await open('btn-icon-hop');await page.mouse.move(0,0);check(await root('.d-hop-demo').getAttribute('data-running')==='false','Arrow starts docked');
  await root('.d-hop-demo-button').hover();check(await root('.d-hop-demo').getAttribute('data-running')==='true','Mouse hover starts arrow intent');
  await page.mouse.move(0,0);await page.waitForTimeout(40);const arrow=await root('.d-hop-demo-arrow').evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(100);
  check(await root('.d-hop-demo-arrow').evaluate(el=>getComputedStyle(el).transform)===arrow,'Leaving pauses the arrow at its current position');
  await root('.d-hop-demo-button').focus();await page.keyboard.press('Space');check(await root('.d-hop-demo').getAttribute('data-running')==='true'&&await root('.d-hop-demo').getAttribute('data-activations')==='1','Keyboard focus and activation supply arrow intent');
  await page.locator('.detail-stage [data-action="replay"]').click();check(await root('.d-hop-demo').getAttribute('data-running')==='false'&&await root('.d-hop-demo-arrow').evaluate(el=>getComputedStyle(el).transform==='matrix(1, 0, 0, 1, 0, 0)'),'Arrow replay returns to its original pose');

  await open('btn-ripple-material');await page.locator('.stage-viewport').evaluate(el=>el.style.width='240px');await page.waitForTimeout(150);
  await root('.d-ripple-demo-button').evaluate(button=>button.addEventListener('pointerdown',event=>{const r=button.querySelector('.d-ripple-demo-wave').getBoundingClientRect();window.rippleOriginError=Math.hypot(r.left+r.width/2-event.clientX,r.top+r.height/2-event.clientY);},{once:true}));
  const rippleBox=await root('.d-ripple-demo-button').boundingBox();await page.mouse.move(rippleBox.x+rippleBox.width*.2,rippleBox.y+rippleBox.height*.7);await page.mouse.down();await page.mouse.up();
  const geometry=await root('.d-ripple-demo').evaluate(el=>({origin:el.dataset.origin.split(',').map(Number),radius:Number(el.dataset.radius),width:parseFloat(getComputedStyle(el.querySelector('.d-ripple-demo-layer')).width),height:parseFloat(getComputedStyle(el.querySelector('.d-ripple-demo-layer')).height),ripples:Number(el.dataset.ripples)}));
  check(await page.evaluate(()=>window.rippleOriginError<.1),'Scaled pointer press maps to the unscaled padding box: '+JSON.stringify(geometry));
  check(Math.abs(geometry.radius-Math.max(...[[0,0],[geometry.width,0],[0,geometry.height],[geometry.width,geometry.height]].map(([x,y])=>Math.hypot(x-geometry.origin[0],y-geometry.origin[1]))))<.02,'Ripple reaches the farthest actual corner');
  check(geometry.ripples===1,'Pointerdown and native click create one wave');
  await root('.d-ripple-demo-button').press('Space');check(await root('.d-ripple-demo').evaluate(el=>{const [x,y]=el.dataset.origin.split(',').map(Number),s=getComputedStyle(el.querySelector('.d-ripple-demo-layer'));return Math.abs(x-parseFloat(s.width)/2)<.01&&Math.abs(y-parseFloat(s.height)/2)<.01;}),'Keyboard ripple is centered');
  check(await root('.d-ripple-demo').getAttribute('data-active')==='2','Independent ripple waves overlap');
  await page.waitForFunction(()=>document.querySelector('.detail-stage .d-ripple-demo').dataset.active==='0');check(await root('.d-ripple-demo-wave').count()===0,'Completed waves remove their nodes');
  await page.locator('.detail-stage [data-action="run"]').click();await page.locator('.detail-stage [data-action="replay"]').click();check(await root('.d-ripple-demo-wave').count()===0,'Clear cancels active ripple feedback immediately');

  await open('btn-jelly-press');await root('.d-jelly-demo-button').hover();await page.mouse.down();await page.waitForTimeout(650);
  check(await root('.d-jelly-demo').getAttribute('data-phase')==='held'&&await root('.d-jelly-demo-button').evaluate(el=>Math.abs(new DOMMatrixReadOnly(getComputedStyle(el).transform).d-.82)<.002),'Long hold remains compressed beyond the former one-shot duration');
  await page.mouse.move(0,0);await page.mouse.up();await page.waitForFunction(()=>document.querySelector('.detail-stage .d-jelly-demo').dataset.phase==='rest');check(await root('.d-jelly-demo').getAttribute('data-pressing')==='false','Captured outside release returns to rest');
  await root('.d-jelly-demo-button').focus();await page.keyboard.down('Space');await page.waitForTimeout(100);check(await root('.d-jelly-demo').getAttribute('data-pressing')==='true','Space holds Jelly Press');
  const presses=await root('.d-jelly-demo').getAttribute('data-presses');await page.keyboard.down('Space');check(await root('.d-jelly-demo').getAttribute('data-presses')===presses,'Repeated keydown does not restart compression');
  await page.keyboard.up('Space');await page.waitForTimeout(30);await page.keyboard.down('Space');await page.waitForTimeout(100);check(await root('.d-jelly-demo').getAttribute('data-phase')==='held','A fresh press retargets the in-flight release');await page.keyboard.up('Space');
  await page.locator('.detail-stage [data-action="run"]').click();await page.locator('.detail-stage [data-action="replay"]').click();await page.waitForTimeout(350);
  check(await root('.d-jelly-demo').getAttribute('data-phase')==='rest'&&await root('.d-jelly-demo-button').evaluate(el=>getComputedStyle(el).transform==='none'),'Replay cancels simulated holds and spring frames');

  const touch=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844}}),touchPage=await touch.newPage();
  touchPage.on('pageerror',error=>errors.push(error.message));await touchPage.goto((process.argv[2]||'http://127.0.0.1:4173')+'/#/c/btn-icon-hop');await touchPage.waitForFunction(()=>document.querySelector('.detail-stage')?._ctx?.mode==='full');await touchPage.locator('.detail-stage .d-hop-demo-button').tap();
  check(await touchPage.locator('.detail-stage .d-hop-demo').getAttribute('data-running')==='true','Touch starts one arrow cycle without hover');await touchPage.waitForFunction(()=>document.querySelector('.detail-stage .d-hop-demo').dataset.running==='false');check(true,'Touch arrow intent finishes without a sticky focus loop');await touchPage.locator('.detail-stage .d-hop-demo-button').tap();await touchPage.locator('.detail-stage [data-action="toggle"]').tap();await touchPage.locator('.detail-stage [data-action="toggle"]').tap();await touchPage.waitForTimeout(1400);check(await touchPage.locator('.detail-stage .d-hop-demo').getAttribute('data-running')==='true','Manual playback cancels an older touch stop timer');await touch.close();

  const exports=[];
  for(const id of ids){await open(id);check(await root('footer,header').count()===0,id+' has no demo-owned frame or toolbar');check(await page.locator('.detail-stage').evaluate(stage=>[stage._root,...stage._root.querySelectorAll('*')].every(el=>[...el.classList].every(name=>name.startsWith(stage._root.classList[0])))),id+' keeps all demo classes in its namespace');const output=await page.evaluate(async id=>{const demo=await INTRX.loadDemo(id),code=await INTRX.getCode(demo),preview=await (await fetch(INTRX.byId.get(id).sourcePreview)).json();return {code,matches:preview.source===INTRX.compactSource(code).split('\n').slice(0,18).join('\n')&&preview.lineCount===code.split('\n').length};},id);check(output.matches,id+' preview exactly matches the complete portable source');exports.push({id,code:output.code});}
  const offline=await context.newPage();await offline.route('**/*',route=>route.abort());offline.on('pageerror',error=>errors.push(error.message));
  for(const {id,code}of exports){await offline.goto('about:blank');await offline.setContent(code);await offline.evaluate(()=>document.fonts.ready);check(await offline.locator('img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0)),id+' portable assets work offline');check(await offline.locator('.stage-dock button:disabled').count()===0,id+' exported actions are connected');}
  const probe=await page.evaluate(()=>INTRX.getCode({id:'export-css-probe',title:'CSS lifecycle probe',tier:'free',rootClass:'export-css-probe',html:'<div class="export-css-probe"></div>',css:'.export-css-probe::before{content:"";display:block;width:8px;height:8px;animation:export-css-loop 1000ms linear infinite}@keyframes export-css-loop{to{transform:rotate(360deg)}}',js:'/* native CSS lifecycle probe */',designSize:[100,100],stage:{theme:'dark',overflow:'clip'},controls:[],libs:[]}));
  await offline.setContent(probe);await offline.locator('.demo-stage').evaluate(stage=>{stage._runtime.setSpeed(2);stage._runtime.suspend();});await offline.waitForTimeout(50);
  check(await offline.locator('.export-css-probe').evaluate(el=>getComputedStyle(el,'::before').animationPlayState)==='paused','Exported lifecycle suspends CSS pseudo-element loops');
  check(await offline.locator('.export-css-probe').evaluate(el=>el.getAnimations({subtree:true}).some(a=>a.playState==='paused')),'Exported pseudo-element animation actually stops');
  await offline.close();

  await page.emulateMedia({reducedMotion:'reduce'});
  for(const id of ids){await open(id);await page.waitForTimeout(80);const before=await page.locator('.detail-stage').screenshot();await page.waitForTimeout(150);check(before.equals(await page.locator('.detail-stage').screenshot()),id+' reduced-motion still frame');}
  await open('toast-stack');check(await root('.d-toast-demo').getAttribute('data-count')==='3','Reduced motion keeps notifications available');
  await page.locator('.detail-stage [data-action="add"]').click();check(await root('.d-toast-demo').getAttribute('data-count')==='4','Reduced-motion input still works');
  await open('btn-ripple-material');await root('.d-ripple-demo-button').press('Space');check(await root('.d-ripple-demo-wave').evaluate(el=>getComputedStyle(el).animationName)==='d-ripple-demo-fade','Reduced-motion ripple fades without radial growth');await page.waitForFunction(()=>document.querySelector('.detail-stage .d-ripple-demo').dataset.active==='0');
  await open('btn-jelly-press');await root('.d-jelly-demo-button').focus();await page.keyboard.down('Space');await page.waitForTimeout(180);check(await root('.d-jelly-demo-button').evaluate(el=>getComputedStyle(el).transform==='none'&&Number(getComputedStyle(el).opacity)===.8),'Reduced-motion hold gives opacity feedback with a stable shape');await page.keyboard.up('Space');

  const fits=await page.evaluate(async ids=>{
   INTRX.disposeView();const app=document.querySelector('#app');app.innerHTML='<section style="display:grid;grid-template-columns:repeat(3,372px);gap:16px;padding:24px" id="exemplar-grid"></section>';const fits=[];
   for(const id of ids){const demo=await INTRX.loadDemo(id),card=document.createElement('article');card.innerHTML='<h2 style="font-size:15px">'+demo.title+'</h2><div class="demo-stage stage" style="width:372px;height:264px"></div>';app.firstElementChild.appendChild(card);const stage=card.querySelector('.stage');INTRX.mountStage(demo,stage,'thumb');await document.fonts.ready;
    for(const [width,height]of [[372,264],[286,196]]){stage.style.width=width+'px';stage.style.height=height+'px';await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));const zoom=stage._ctx.scale;const text=[...stage._root.querySelectorAll('*')].filter(el=>!el.children.length&&el.textContent.trim()&&getComputedStyle(el).clipPath==='none');fits.push({id,width,minFont:Math.min(...text.map(el=>parseFloat(getComputedStyle(el).fontSize)*zoom))});}
    stage.style.width='372px';stage.style.height='264px';
   }return fits;
  },ids);
  for(const fit of fits)check(fit.minFont>=11,fit.id+' readable at '+fit.width+'px');
  await page.locator('#exemplar-grid').screenshot({path:'.artifacts/exemplars/v4-components.png'});
  check(!errors.length,'No runtime errors: '+errors.join(';'));
  fs.writeFileSync('.artifacts/exemplars/results.json',JSON.stringify({checks,ids,fits,errors},null,2));
  console.log('PASS: '+checks+' exemplar interaction, reduced-motion, native-size and offline-export checks');
 }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
