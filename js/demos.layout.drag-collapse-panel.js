/* INTRX registry - resistance collapse side panel */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'drag-collapse-panel',
  title:'Drag Collapse Panel',
  cat:'Layout & UI',
  rootClass:'d-layout-drag-collapse-panel',
  tags:['drag','panel','resistance'],
  libs:[],
  desc:'A docked inspector follows its resize edge, turns compression into resistance, and resolves a slow pull or fast flick into a tactile tab.',
  seen:"Seen on: Sebastiano Guerriero's drag-to-collapse demo",
  hint:'drag the panel’s left edge left, flick after 40px, or use the separator keys; click the tab to reopen',
  html:`<div class="d-layout-drag-collapse-panel" role="region" aria-label="Draggable collapsible side panel">
  <div class="d-layout-drag-collapse-panel-head" aria-hidden="true"><span>LAYOUT / RESISTANCE</span><span class="d-layout-drag-collapse-panel-mode">OPEN</span></div>
  <div class="d-layout-drag-collapse-panel-stage">
    <div class="d-layout-drag-collapse-panel-workspace" aria-hidden="true"><span>WORKSPACE / 04</span><i></i><i></i><i></i><b>Drag the edge<br>to reveal space.</b></div>
    <aside class="d-layout-drag-collapse-panel-panel" aria-label="Inspector panel">
      <div class="d-layout-drag-collapse-panel-edge" role="separator" tabindex="0" aria-label="Resize or collapse inspector" aria-orientation="vertical" aria-valuemin="28" aria-valuemax="300" aria-valuenow="300" aria-valuetext="Inspector width 300 pixels" aria-keyshortcuts="ArrowLeft ArrowRight Home End Enter Space"><i aria-hidden="true"></i></div>
      <header class="d-layout-drag-collapse-panel-header"><span class="d-layout-drag-collapse-panel-grip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span><strong>INSPECTOR</strong><em class="d-layout-drag-collapse-panel-hint">DRAG TO RESIZE</em></header>
      <div class="d-layout-drag-collapse-panel-content" aria-hidden="true">
        <span>LAYOUT PROPERTIES</span>
        <article><i></i><div><b></b><b></b></div></article>
        <article><i></i><div><b></b><b></b></div></article>
        <article><i></i><div><b></b><b></b></div></article>
      </div>
      <button class="d-layout-drag-collapse-panel-tab" type="button" aria-label="Expand inspector panel"><span>OPEN PANEL</span></button>
    </aside>
  </div>
  <div class="d-layout-drag-collapse-panel-foot" aria-hidden="true"><span>1:1 → ×0.4</span><span>FLICK / SNAP</span></div>
  <span class="d-layout-drag-collapse-panel-status" aria-live="polite" aria-atomic="true">Inspector panel open at 300 pixels</span>
</div>`,
  css:`
.d-layout-drag-collapse-panel{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-layout-drag-collapse-panel *{box-sizing:border-box}
.d-layout-drag-collapse-panel-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.09em}
.d-layout-drag-collapse-panel-mode{color:#a78bfa}
.d-layout-drag-collapse-panel-stage{position:absolute;top:36px;right:8px;bottom:23px;left:8px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#0d0d0f}
.d-layout-drag-collapse-panel-workspace{position:absolute;inset:0;padding:18px;color:#5c5c66;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:22px 22px;font-size:8px;line-height:1;letter-spacing:.09em}
.d-layout-drag-collapse-panel-workspace>i{position:absolute;width:46px;height:32px;border:1px solid #232327;border-radius:6px;background:#101012}.d-layout-drag-collapse-panel-workspace>i:nth-of-type(1){top:54px;left:18px}.d-layout-drag-collapse-panel-workspace>i:nth-of-type(2){top:54px;left:72px}.d-layout-drag-collapse-panel-workspace>i:nth-of-type(3){top:94px;left:18px;width:100px}
.d-layout-drag-collapse-panel-workspace>b{position:absolute;bottom:20px;left:18px;color:#777780;font-size:11px;line-height:1.25;font-weight:500;letter-spacing:-.02em}
.d-layout-drag-collapse-panel-panel{position:absolute;top:17px;right:0;bottom:17px;width:300px;overflow:hidden;border:1px solid #232327;border-right:0;border-radius:10px 0 0 10px;background:#101012;box-shadow:-12px 0 28px rgba(0,0,0,.32);will-change:width}
.d-layout-drag-collapse-panel-edge{position:absolute;z-index:4;top:0;bottom:0;left:0;width:8px;outline:none;cursor:col-resize;touch-action:none}
.d-layout-drag-collapse-panel-edge::before{position:absolute;top:50%;left:2px;width:3px;height:42px;margin-top:-21px;border-radius:2px;background:#2e2e34;content:'';transition:background-color .15s ease}
.d-layout-drag-collapse-panel-edge i{position:absolute;top:50%;left:1px;width:5px;height:5px;margin-top:-2.5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 6px rgba(167,139,250,.3)}
.d-layout-drag-collapse-panel-edge:focus-visible::before{background:#a78bfa}
.d-layout-drag-collapse-panel-header{height:43px;padding:0 12px;display:flex;align-items:center;gap:8px;overflow:hidden;border-bottom:1px solid #232327;white-space:nowrap}
.d-layout-drag-collapse-panel-header strong{color:#c7c7ce;font-size:9px;line-height:1;font-weight:600;letter-spacing:.08em}
.d-layout-drag-collapse-panel-hint{margin-left:auto;color:#5c5c66;font-size:7px;line-height:1;font-style:normal;letter-spacing:.07em}
.d-layout-drag-collapse-panel-grip{width:10px;display:grid;grid-template-columns:repeat(2,3px);gap:2px}
.d-layout-drag-collapse-panel-grip i{width:3px;height:3px;border-radius:50%;background:#5c5c66;transition:background-color .15s ease}
.d-layout-drag-collapse-panel-content{padding:15px 14px;overflow:hidden;opacity:1}
.d-layout-drag-collapse-panel-content>span{display:block;margin-bottom:12px;color:#5c5c66;font-size:7px;line-height:1;letter-spacing:.09em}
.d-layout-drag-collapse-panel-content article{height:43px;margin-top:8px;padding:8px;display:grid;grid-template-columns:27px minmax(0,1fr);gap:9px;align-items:center;border:1px solid #232327;border-radius:7px;background:#161619}
.d-layout-drag-collapse-panel-content article>i{width:27px;height:27px;border-radius:5px;background:#232327}
.d-layout-drag-collapse-panel-content article>div{display:flex;flex-direction:column;gap:7px}
.d-layout-drag-collapse-panel-content article b{display:block;height:5px;border-radius:3px;background:#2e2e34}.d-layout-drag-collapse-panel-content article b:last-child{width:62%;background:#232327}
.d-layout-drag-collapse-panel-tab{position:absolute;z-index:5;inset:0;display:none;width:100%;padding:0;border:0;border-left:1px solid #a78bfa;border-radius:0;background:#101012;color:#9b9ba3;font-family:inherit;font-size:8px;font-weight:600;letter-spacing:.1em;cursor:e-resize;outline:none;touch-action:none}
.d-layout-drag-collapse-panel-tab span{display:block;white-space:nowrap;transform:rotate(90deg)}
.d-layout-drag-collapse-panel-tab:focus-visible{box-shadow:inset 2px 0 #a78bfa;color:#ececef}
.d-layout-drag-collapse-panel-panel.d-layout-drag-collapse-panel-threshold .d-layout-drag-collapse-panel-grip i{background:#fbbf24}
.d-layout-drag-collapse-panel-panel.d-layout-drag-collapse-panel-threshold .d-layout-drag-collapse-panel-edge::before{background:#fbbf24}
.d-layout-drag-collapse-panel-panel.d-layout-drag-collapse-panel-tab-active .d-layout-drag-collapse-panel-tab{display:grid;place-items:center;opacity:calc(1 - var(--content-opacity,0))}
.d-layout-drag-collapse-panel-panel.d-layout-drag-collapse-panel-tab-active .d-layout-drag-collapse-panel-edge{pointer-events:none;opacity:0}
.d-layout-drag-collapse-panel-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
.d-layout-drag-collapse-panel-foot{position:absolute;right:16px;bottom:8px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:8px;line-height:1;letter-spacing:.08em}
@container(max-width:340px){.d-layout-drag-collapse-panel-stage{right:7px;left:7px}.d-layout-drag-collapse-panel-head,.d-layout-drag-collapse-panel-foot{right:13px;left:13px}}
@media(prefers-reduced-motion:reduce){.d-layout-drag-collapse-panel *,.d-layout-drag-collapse-panel *::before,.d-layout-drag-collapse-panel *::after{animation:none!important;transition:none!important}}
`,
  js:`
const panel=root.querySelector('.d-layout-drag-collapse-panel-panel'),edge=root.querySelector('.d-layout-drag-collapse-panel-edge'),tab=root.querySelector('.d-layout-drag-collapse-panel-tab'),content=root.querySelector('.d-layout-drag-collapse-panel-content'),hint=root.querySelector('.d-layout-drag-collapse-panel-hint'),mode=root.querySelector('.d-layout-drag-collapse-panel-mode'),status=root.querySelector('.d-layout-drag-collapse-panel-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
const openWidth=300,tabWidth=28,directDistance=60,resistance=.4,collapseThreshold=100,flickThreshold=40,flickVelocity=.55;let width=openWidth,phase='open',dragKind='',startX=0,startWidth=openWidth,lastX=0,lastTime=0,velocity=0,threshold=false,frameId=0,lastWall=0,animation=null,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function clamp(value,minimum,maximum){return Math.max(minimum,Math.min(maximum,value))}
function easeOut(value){return 1-Math.pow(1-value,3)}function easeInOut(value){return value<.5?4*value*value*value:1-Math.pow(-2*value+2,3)/2}
function compressionForRaw(raw){return raw<=directDistance?Math.max(0,raw):directDistance+(raw-directDistance)*resistance}
function render(source){const compression=openWidth-width,opacity=clamp(1-compression/collapseThreshold,0,1),atThreshold=phase==='dragging'&&compression>collapseThreshold;panel.style.width=width.toFixed(2)+'px';panel.style.setProperty('--content-opacity',opacity.toFixed(3));content.style.opacity=opacity.toFixed(3);panel.classList.toggle('d-layout-drag-collapse-panel-threshold',atThreshold);panel.classList.toggle('d-layout-drag-collapse-panel-tab-active',phase==='collapsed'||phase==='expand-drag');hint.textContent=atThreshold?'RELEASE TO COLLAPSE':'DRAG TO RESIZE';edge.setAttribute('aria-valuenow',String(Math.round(width)));edge.setAttribute('aria-valuetext','Inspector width '+Math.round(width)+' pixels');mode.textContent=phase==='collapsed'?'TAB':phase==='collapsing'?'COLLAPSING':phase==='expanding'||phase==='expand-drag'?'EXPANDING':phase==='dragging'?'DRAG':'OPEN';if(atThreshold&&!threshold)status.textContent='Collapse threshold reached; release to collapse';threshold=atThreshold}
function setFinal(next){animation=null;lastWall=0;if(next==='collapsed'){width=tabWidth;phase='collapsed';status.textContent='Inspector collapsed to vertical tab'}else{width=openWidth;phase='open';status.textContent='Inspector open at 300 pixels'}render('settle')}
function startAnimation(kind){if(frameId){cancelAnimationFrame(frameId);frameId=0}dragKind='';lastWall=0;if(reduced){setFinal(kind==='collapse'?'collapsed':'open');return}phase=kind==='collapse'?'collapsing':kind==='expand'?'expanding':'rebound';animation={kind:kind,from:width,elapsed:0,duration:kind==='collapse'?300:kind==='expand'?480:400};render('animate');requestFrame()}
function animate(delta){animation.elapsed+=delta;const progress=Math.min(1,animation.elapsed/animation.duration),from=animation.from;if(animation.kind==='collapse')width=from+(tabWidth-from)*easeInOut(progress);else if(animation.kind==='rebound'){if(progress<.72){const p=progress/.72;width=from+(openWidth+6-from)*easeOut(p)}else{const p=(progress-.72)/.28;width=openWidth+6+(openWidth-(openWidth+6))*easeOut(p)}}else if(progress<280/480){const p=progress/(280/480);width=from+(openWidth+8-from)*easeOut(p)}else{const p=(progress-280/480)/(200/480);width=openWidth+8+(openWidth-(openWidth+8))*easeInOut(p)}render('frame');if(progress>=1)setFinal(animation&&animation.kind==='collapse'?'collapsed':'open')}
function eligible(){return!cleaned&&visible&&documentVisible&&Boolean(animation)}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(40,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;animate(delta);requestFrame()}
function beginCollapseDrag(event){if(phase!=='open'&&phase!=='rebound')return;if(frameId){cancelAnimationFrame(frameId);frameId=0}animation=null;phase='dragging';dragKind='collapse';startX=lastX=event.clientX;startWidth=width;lastTime=performance.now();velocity=0;try{edge.setPointerCapture(event.pointerId)}catch(error){}event.preventDefault();render('press')}
function moveCollapseDrag(event){if(dragKind!=='collapse')return;const now=performance.now(),deltaTime=Math.max(8,now-lastTime),raw=openWidth-startWidth+startX-event.clientX,effective=compressionForRaw(raw);velocity=(lastX-event.clientX)/deltaTime;lastX=event.clientX;lastTime=now;width=clamp(openWidth-effective,tabWidth,openWidth);render('drag')}
function endCollapseDrag(event,cancelled){if(dragKind!=='collapse')return;try{if(edge.hasPointerCapture(event.pointerId))edge.releasePointerCapture(event.pointerId)}catch(error){}dragKind='';const compression=openWidth-width,shouldCollapse=!cancelled&&(compression>collapseThreshold||(compression>flickThreshold&&velocity>flickVelocity));status.textContent=shouldCollapse?'Inspector released to collapse':'Inspector released below threshold';startAnimation(shouldCollapse?'collapse':'rebound')}
edge.addEventListener('pointerdown',beginCollapseDrag,listener);edge.addEventListener('pointermove',moveCollapseDrag,listener);edge.addEventListener('pointerup',function(event){endCollapseDrag(event,false)},listener);edge.addEventListener('pointercancel',function(event){endCollapseDrag(event,true)},listener);
function beginExpandDrag(event){if(phase!=='collapsed')return;phase='expand-drag';dragKind='expand';startX=event.clientX;startWidth=width;try{tab.setPointerCapture(event.pointerId)}catch(error){}event.preventDefault();render('tab press')}
function moveExpandDrag(event){if(dragKind!=='expand')return;width=clamp(startWidth+Math.max(0,event.clientX-startX),tabWidth,openWidth);render('tab drag')}
function endExpandDrag(event){if(dragKind!=='expand')return;try{if(tab.hasPointerCapture(event.pointerId))tab.releasePointerCapture(event.pointerId)}catch(error){}dragKind='';status.textContent='Inspector expanding with overshoot';startAnimation('expand')}
tab.addEventListener('pointerdown',beginExpandDrag,listener);tab.addEventListener('pointermove',moveExpandDrag,listener);tab.addEventListener('pointerup',endExpandDrag,listener);tab.addEventListener('pointercancel',endExpandDrag,listener);tab.addEventListener('click',function(){if(phase==='collapsed')startAnimation('expand')},listener);
edge.addEventListener('keydown',function(event){if(!['ArrowLeft','ArrowRight','Home','End','Enter',' '].includes(event.key))return;event.preventDefault();if(event.key==='End'||((event.key==='Enter'||event.key===' ')&&phase!=='collapsed')){startAnimation('collapse');return}if(event.key==='Home'||((event.key==='Enter'||event.key===' ')&&phase==='collapsed')){startAnimation('expand');return}phase='open';width=clamp(width+(event.key==='ArrowRight'?20:-20),tabWidth,openWidth);status.textContent='Inspector resized to '+Math.round(width)+' pixels by keyboard';render('keyboard')},listener);
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.05});intersectionObserver.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
render('initial');
`,
  prompt:`Build one self-contained responsive 320px Layout and UI scene with a panel exactly 300 pixels wide docked right. Use a dark panel-token face, a header with six grip dots, and three skeleton content rows. Make its left edge a pointer-captured vertical separator with a col-resize cursor. Dragging left narrows the panel one-to-one through the first sixty pixels, then applies rubber-band resistance so additional drag counts at 0.4. Fade content in direct proportion to effective compression. Beyond one hundred effective pixels, turn the grip warning-colored and show RELEASE TO COLLAPSE. On release below threshold, spring to 300 pixels over 400 milliseconds with one overshoot. Beyond threshold, animate to a 28-pixel vertical tab over 300 milliseconds ease-in-out. A fast left flick collapses from any effective compression over forty pixels. The collapsed tab has a rotated label and accent left border; click it or drag it right to expand through a plus-eight-pixel overshoot and a 200-millisecond settle. Add separator keyboard controls and live status, pause while hidden, clean up detached instances, and snap state changes under reduced motion.`
});
