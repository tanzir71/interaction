/* INTRX registry - CSS 3D exploded device */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'css3d-exploded-device',
  title:'CSS 3D Exploded Device',
  cat:'3D & Perspective',
  rootClass:'d-three-css3d-exploded-device',
  tags:['CSS 3D','exploded view','device'],
  libs:[],
  desc:'A four-layer device separates into chassis, logic, panel, and glass while a delayed technical guide identifies every plane.',
  seen:'Seen on: hardware product pages and isometric exploded views by Praha',
  hint:'hover to explode the device; click or press Enter to pin it open, and Escape to assemble',
  html:`<div class="d-three-css3d-exploded-device" role="region" aria-label="Interactive exploded device view">
  <div class="d-three-css3d-exploded-device-head" aria-hidden="true"><span>DEVICE / ANATOMY</span><span class="d-three-css3d-exploded-device-mode">ASSEMBLED</span></div>
  <div class="d-three-css3d-exploded-device-stage" role="button" tabindex="0" aria-expanded="false" aria-pressed="false" aria-label="Four-layer device. Hover to preview the exploded view. Press Enter or Space to pin it, and Escape to assemble." aria-keyshortcuts="Enter Space Escape">
    <div class="d-three-css3d-exploded-device-scene" aria-hidden="true">
      <div class="d-three-css3d-exploded-device-layer d-three-css3d-exploded-device-body"><span></span><i></i></div>
      <div class="d-three-css3d-exploded-device-layer d-three-css3d-exploded-device-board"><span></span><span></span></div>
      <div class="d-three-css3d-exploded-device-layer d-three-css3d-exploded-device-screen"><span></span><span></span><b>RUN</b></div>
      <div class="d-three-css3d-exploded-device-layer d-three-css3d-exploded-device-glass"></div>
    </div>
    <div class="d-three-css3d-exploded-device-labels" aria-hidden="true">
      <div class="d-three-css3d-exploded-device-label d-three-css3d-exploded-device-label-glass"><i></i><span>GLASS</span></div>
      <div class="d-three-css3d-exploded-device-label d-three-css3d-exploded-device-label-panel"><i></i><span>PANEL</span></div>
      <div class="d-three-css3d-exploded-device-label d-three-css3d-exploded-device-label-logic"><i></i><span>LOGIC</span></div>
      <div class="d-three-css3d-exploded-device-label d-three-css3d-exploded-device-label-chassis"><i></i><span>CHASSIS</span></div>
    </div>
  </div>
  <div class="d-three-css3d-exploded-device-foot" aria-hidden="true"><span>4 LAYERS / Z150</span><span>28X / -18Y</span></div>
  <span class="d-three-css3d-exploded-device-status" aria-live="polite" aria-atomic="true">Device assembled in four layers</span>
</div>`,
  css:`
.d-three-css3d-exploded-device{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate;touch-action:pan-y}
.d-three-css3d-exploded-device *{box-sizing:border-box}
.d-three-css3d-exploded-device-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-three-css3d-exploded-device-mode{color:#fa7319}
.d-three-css3d-exploded-device-stage{position:absolute;top:38px;right:12px;bottom:25px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;outline:none;background:radial-gradient(ellipse at 42% 52%,rgba(250,115,25,.085),transparent 46%),linear-gradient(180deg,#101012,#0d0d0f);perspective:1000px;cursor:pointer;touch-action:pan-y}
.d-three-css3d-exploded-device-stage::before,.d-three-css3d-exploded-device-stage::after{position:absolute;z-index:5;width:14px;height:14px;content:'';pointer-events:none}
.d-three-css3d-exploded-device-stage::before{top:9px;left:9px;border-top:1px solid rgba(250,115,25,.3);border-left:1px solid rgba(250,115,25,.3)}
.d-three-css3d-exploded-device-stage::after{right:9px;bottom:9px;border-right:1px solid rgba(250,115,25,.3);border-bottom:1px solid rgba(250,115,25,.3)}
.d-three-css3d-exploded-device-stage:focus-visible{border-color:#fa7319;box-shadow:0 0 0 1px #fa7319}
.d-three-css3d-exploded-device-scene{--d-three-css3d-exploded-device-sway:0deg;position:absolute;z-index:2;top:51%;left:42%;width:132px;height:174px;transform:translate(-50%,-50%) rotateX(28deg) rotateY(calc(-18deg + var(--d-three-css3d-exploded-device-sway)));transform-style:preserve-3d;will-change:transform}
.d-three-css3d-exploded-device-layer{position:absolute;transform-style:preserve-3d;backface-visibility:hidden;transition:transform 500ms ease-in-out,box-shadow 80ms ease;will-change:transform}
.d-three-css3d-exploded-device-body{inset:0;border:1px solid #33333a;border-radius:14px;background:#19191c;box-shadow:0 7px 0 #0a0a0b,0 14px 24px rgba(0,0,0,.38);transform:translateZ(0);transition-delay:120ms}
.d-three-css3d-exploded-device-body span{position:absolute;top:9px;right:12px;width:4px;height:4px;border-radius:50%;background:#33333a;box-shadow:-101px 0 #33333a,-101px 142px #33333a,0 142px #33333a}
.d-three-css3d-exploded-device-body i{position:absolute;right:-4px;top:48px;width:3px;height:38px;border-radius:0 2px 2px 0;background:#232327}
.d-three-css3d-exploded-device-board{inset:7px;border:1px solid #33333a;border-radius:10px;background:linear-gradient(90deg,transparent 29%,rgba(92,92,102,.26) 30% 31%,transparent 32% 67%,rgba(92,92,102,.22) 68% 69%,transparent 70%),linear-gradient(0deg,transparent 22%,rgba(92,92,102,.22) 23% 24%,transparent 25% 73%,rgba(92,92,102,.22) 74% 75%,transparent 76%),#101012;transform:translateZ(8px);transition-delay:80ms}
.d-three-css3d-exploded-device-board::before,.d-three-css3d-exploded-device-board::after{position:absolute;content:'';background:linear-gradient(90deg,#33333a 0 18px,transparent 18px 26px,#33333a 26px 46px,transparent 46px);height:1px;opacity:.8}
.d-three-css3d-exploded-device-board::before{top:28px;left:8px;width:72px}
.d-three-css3d-exploded-device-board::after{right:8px;bottom:34px;width:65px;transform:rotate(180deg)}
.d-three-css3d-exploded-device-board span{position:absolute;width:25px;height:18px;border:1px solid rgba(236,236,239,.18);border-radius:3px;background:#fa7319;box-shadow:0 0 10px rgba(250,115,25,.14)}
.d-three-css3d-exploded-device-board span:first-child{top:47px;left:22px}
.d-three-css3d-exploded-device-board span:last-child{right:20px;bottom:31px;width:19px;height:24px}
.d-three-css3d-exploded-device-screen{inset:11px;padding:23px 13px;border:1px solid #232327;border-radius:8px;background:radial-gradient(circle at 72% 22%,rgba(250,115,25,.1),transparent 24%),#0a0a0b;transform:translateZ(16px);transition-delay:40ms}
.d-three-css3d-exploded-device-screen span{display:block;height:5px;margin-bottom:8px;border-radius:3px;background:#5c5c66}
.d-three-css3d-exploded-device-screen span:first-child{width:72%}
.d-three-css3d-exploded-device-screen span:nth-child(2){width:48%;opacity:.68}
.d-three-css3d-exploded-device-screen b{position:absolute;right:13px;bottom:15px;padding:6px 8px;border-radius:4px;color:#0a0a0b;background:#fa7319;font-size:7px;line-height:1;letter-spacing:.07em}
.d-three-css3d-exploded-device-glass{inset:10px;border:1px solid #33333a;border-radius:9px;background:linear-gradient(135deg,rgba(255,255,255,.13),rgba(255,255,255,.035) 42%,rgba(255,255,255,.08));box-shadow:inset 0 0 16px rgba(255,255,255,.025);backdrop-filter:blur(1px);transform:translateZ(24px);transition-delay:0ms}
.d-three-css3d-exploded-device.d-three-css3d-exploded-device-expanded .d-three-css3d-exploded-device-body{transform:translateZ(0);transition-delay:0ms}
.d-three-css3d-exploded-device.d-three-css3d-exploded-device-expanded .d-three-css3d-exploded-device-board{transform:translateZ(50px);transition-delay:40ms}
.d-three-css3d-exploded-device.d-three-css3d-exploded-device-expanded .d-three-css3d-exploded-device-screen{transform:translateZ(100px);transition-delay:80ms}
.d-three-css3d-exploded-device.d-three-css3d-exploded-device-expanded .d-three-css3d-exploded-device-glass{transform:translateZ(150px);transition-delay:120ms}
.d-three-css3d-exploded-device.d-three-css3d-exploded-device-contact .d-three-css3d-exploded-device-body{box-shadow:0 7px 0 #0a0a0b,0 0 24px rgba(250,115,25,.32)}
.d-three-css3d-exploded-device-labels{position:absolute;z-index:3;inset:0;pointer-events:none}
.d-three-css3d-exploded-device-label{position:absolute;right:9px;display:flex;align-items:center;justify-content:flex-end;width:45%;color:#9b9ba3;font-size:10px;line-height:1;letter-spacing:.08em;opacity:0;transform:translateX(-6px);transition:opacity 200ms ease,transform 200ms ease}
.d-three-css3d-exploded-device-label i{width:0;height:1px;margin-right:7px;background:#33333a;transform-origin:right;transition:width 200ms ease}
.d-three-css3d-exploded-device-label i::before{display:block;width:3px;height:3px;margin-top:-1px;border-radius:50%;background:#33333a;content:''}
.d-three-css3d-exploded-device-label-glass{top:47px}
.d-three-css3d-exploded-device-label-panel{top:91px}
.d-three-css3d-exploded-device-label-logic{top:139px}
.d-three-css3d-exploded-device-label-chassis{top:190px}
.d-three-css3d-exploded-device.d-three-css3d-exploded-device-expanded .d-three-css3d-exploded-device-label{opacity:1;transform:none;transition-delay:620ms}
.d-three-css3d-exploded-device.d-three-css3d-exploded-device-expanded .d-three-css3d-exploded-device-label i{width:clamp(25px,10cqw,58px);transition-delay:620ms}
.d-three-css3d-exploded-device-foot{position:absolute;right:16px;bottom:9px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-three-css3d-exploded-device-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-three-css3d-exploded-device-stage{right:10px;left:10px}.d-three-css3d-exploded-device-head,.d-three-css3d-exploded-device-foot{right:13px;left:13px}.d-three-css3d-exploded-device-scene{left:39%;width:112px;height:151px}.d-three-css3d-exploded-device-label{right:6px;font-size:9px}.d-three-css3d-exploded-device-label-glass{top:48px}.d-three-css3d-exploded-device-label-panel{top:92px}.d-three-css3d-exploded-device-label-logic{top:138px}.d-three-css3d-exploded-device-label-chassis{top:185px}}
@media(prefers-reduced-motion:reduce){.d-three-css3d-exploded-device *,.d-three-css3d-exploded-device *::before,.d-three-css3d-exploded-device *::after{animation:none!important;transition:none!important}}
`,
  js:`
const field=root.querySelector('.d-three-css3d-exploded-device-stage'),scene=root.querySelector('.d-three-css3d-exploded-device-scene'),board=root.querySelector('.d-three-css3d-exploded-device-board'),mode=root.querySelector('.d-three-css3d-exploded-device-mode'),status=root.querySelector('.d-three-css3d-exploded-device-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
const expandedClass='d-three-css3d-exploded-device-expanded',contactClass='d-three-css3d-exploded-device-contact';
let pinned=false,pointerInside=false,open=false,activeTime=0,lastWall=0,frameId=0,flashFrames=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function sync(next,message){open=next;root.classList.toggle(expandedClass,open);field.setAttribute('aria-expanded',open?'true':'false');field.setAttribute('aria-pressed',pinned?'true':'false');mode.textContent=open?(pinned?'PINNED':'EXPLODED'):'ASSEMBLED';if(message)status.textContent=message}
function togglePinned(){pinned=!pinned;sync(pinned||pointerInside,pinned?'Exploded device pinned open':pointerInside?'Exploded device preview active':'Device assembling into four layers')}
field.addEventListener('pointerenter',function(){pointerInside=true;if(!pinned)sync(true,'Exploded device preview; four layers separating')},listener);field.addEventListener('pointerleave',function(){pointerInside=false;if(!pinned)sync(false,'Device assembling into four layers')},listener);field.addEventListener('click',togglePinned,listener);
field.addEventListener('keydown',function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();togglePinned()}else if(event.key==='Escape'&&(open||pinned)){event.preventDefault();pinned=false;pointerInside=false;sync(false,'Device assembled in four layers')}},listener);
board.addEventListener('transitionend',function(event){if(event.propertyName!=='transform'||open||reduced)return;root.classList.add(contactClass);flashFrames=1;status.textContent='Four device layers made soft contact';requestFrame()},listener);
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(40,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;activeTime=(activeTime+delta)%8000;const sway=Math.sin(activeTime/8000*Math.PI*2)*3;scene.style.setProperty('--d-three-css3d-exploded-device-sway',sway.toFixed(3)+'deg');if(flashFrames>0&&!--flashFrames)root.classList.remove(contactClass);requestFrame()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.05});intersectionObserver.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
if(reduced){scene.style.setProperty('--d-three-css3d-exploded-device-sway','0deg');status.textContent='Device ready without idle motion'}else requestFrame();
`,
  prompt:`Build one self-contained responsive 320px CSS 3D device card in the 3D and Perspective category. Place a four-plane device inside a perspective 1000px scene rotated X 28 degrees and Y minus 18 degrees. The chassis is a rounded background-two slab, the logic board uses background-one with fine line-one traces and exactly two accent chips, the panel uses background-zero with two text bars and one accent button, and the glass is eight-percent translucent white with a line-one border and a slight one-pixel backdrop blur. In the assembled state, set the planes to translateZ 0, 8, 16, and 24px. On hover or keyboard activation, move them to 0, 50, 100, and 150px over 500 milliseconds ease-in-out, staggered 40 milliseconds from the bottom upward. After all layers settle, draw one-pixel leader lines and fade in ten-pixel text-two labels reading CHASSIS, LOGIC, PANEL, and GLASS over 200 milliseconds. Reverse the stagger on collapse and show a soft one-frame contact flash. Sway the complete scene by plus or minus three degrees on an eight-second sine cycle, pause while hidden, clean up detached instances, support pinning with Enter or Space and assembly with Escape, and remove all sway and transitions for reduced motion.`
});
