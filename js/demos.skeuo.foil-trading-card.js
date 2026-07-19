/* INTRX registry - palette foil trading card */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'foil-trading-card',
  title:'Foil Trading Card',
  cat:'Skeuomorph',
  rootClass:'d-skeuo-foil-trading-card',
  tags:['foil','tilt','collectible'],
  libs:[],
  desc:'An embossed collectible card carries a procedural crest through palette foil, cursor glare, spring tilt, and a restrained sparkle reveal.',
  seen:'Seen on: Pokémon-holo CSS experiments and trading-card collect UIs',
  hint:'move across the card to steer the foil; focus it and use arrows, Home, or Escape',
  html:`<div class="d-skeuo-foil-trading-card" role="region" aria-label="Interactive foil trading card">
  <div class="d-skeuo-foil-trading-card-head" aria-hidden="true"><span>ARCHIVE / FOIL</span><span>№ 001</span></div>
  <div class="d-skeuo-foil-trading-card-stage">
    <div class="d-skeuo-foil-trading-card-entry">
      <div class="d-skeuo-foil-trading-card-card" role="img" tabindex="0" aria-label="Aether geometric foil card. Move the pointer across it, or use arrow keys to tilt. Press Home or Escape to center." aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight Home Escape">
        <div class="d-skeuo-foil-trading-card-meta" aria-hidden="true"><span>DIVISION / 07</span><span>RARE</span></div>
        <div class="d-skeuo-foil-trading-card-crest" aria-hidden="true"><i></i><b></b><em></em><span></span></div>
        <div class="d-skeuo-foil-trading-card-title" aria-hidden="true"><strong>AETHER</strong><span>PRISMATIC RELIC</span></div>
        <div class="d-skeuo-foil-trading-card-foil d-skeuo-foil-trading-card-foil-color" aria-hidden="true"></div>
        <div class="d-skeuo-foil-trading-card-foil d-skeuo-foil-trading-card-foil-glare" aria-hidden="true"></div>
      </div>
      <div class="d-skeuo-foil-trading-card-sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    </div>
  </div>
  <div class="d-skeuo-foil-trading-card-foot" aria-hidden="true"><span>160 × 220</span><span>PALETTE HOLO</span></div>
  <span class="d-skeuo-foil-trading-card-status" aria-live="polite" aria-atomic="true">Foil card waiting to enter</span>
</div>`,
  css:`
.d-skeuo-foil-trading-card{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-skeuo-foil-trading-card *{box-sizing:border-box}
.d-skeuo-foil-trading-card-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.1em}
.d-skeuo-foil-trading-card-stage{position:absolute;top:35px;right:12px;bottom:23px;left:12px;display:grid;place-items:center;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(circle at 50% 45%,rgba(167,139,250,.08),transparent 48%),linear-gradient(145deg,#101012,#0d0d0f);perspective:700px}
.d-skeuo-foil-trading-card-entry{position:relative;width:160px;height:220px;opacity:0;transform:rotateY(90deg);transform-style:preserve-3d}
.d-skeuo-foil-trading-card-entry.d-skeuo-foil-trading-card-entered{animation:d-skeuo-foil-trading-card-entry .5s cubic-bezier(.22,.78,.25,1) forwards}
.d-skeuo-foil-trading-card-card{--foil-x:50%;--foil-y:50%;--glare-x:50%;position:absolute;inset:0;overflow:hidden;border:1px solid #232327;border-radius:12px;outline:none;background:linear-gradient(145deg,#121215,#101012 55%,#0c0c0e);box-shadow:0 18px 34px rgba(0,0,0,.46),inset 0 1px rgba(255,255,255,.035);cursor:crosshair;transform:rotateX(0deg) rotateY(0deg);transform-style:preserve-3d;will-change:transform}
.d-skeuo-foil-trading-card-card::before{position:absolute;z-index:2;inset:6px;border:1px solid #2e2e34;border-radius:7px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025),0 1px 0 rgba(255,255,255,.025);content:'';pointer-events:none}
.d-skeuo-foil-trading-card-card::after{position:absolute;z-index:1;top:38px;right:14px;bottom:43px;left:14px;border-top:1px solid rgba(46,46,52,.7);border-bottom:1px solid rgba(46,46,52,.7);content:'';pointer-events:none}
.d-skeuo-foil-trading-card-card:focus-visible{box-shadow:0 18px 34px rgba(0,0,0,.46),0 0 0 2px #0a0a0b,0 0 0 3px #a78bfa}
.d-skeuo-foil-trading-card-meta{position:absolute;z-index:3;top:18px;right:14px;left:14px;display:flex;justify-content:space-between;color:#5c5c66;font-size:7px;line-height:1;letter-spacing:.1em}
.d-skeuo-foil-trading-card-crest{position:absolute;z-index:3;top:52px;left:39px;width:82px;height:118px;filter:drop-shadow(0 7px 8px rgba(0,0,0,.3))}
.d-skeuo-foil-trading-card-crest i,.d-skeuo-foil-trading-card-crest b,.d-skeuo-foil-trading-card-crest em,.d-skeuo-foil-trading-card-crest span{position:absolute;display:block;clip-path:polygon(50% 0,100% 24%,84% 74%,50% 100%,16% 74%,0 24%)}
.d-skeuo-foil-trading-card-crest i{inset:0;background:#2e2e34}
.d-skeuo-foil-trading-card-crest b{inset:2px;background:#161619}
.d-skeuo-foil-trading-card-crest em{inset:19px 15px;background:#2e2e34}
.d-skeuo-foil-trading-card-crest span{inset:21px 17px;background:linear-gradient(155deg,#1d1d21,#161619)}
.d-skeuo-foil-trading-card-title{position:absolute;z-index:3;right:14px;bottom:18px;left:14px;display:flex;align-items:flex-end;justify-content:space-between}
.d-skeuo-foil-trading-card-title strong{color:#c7c7ce;font-size:11px;line-height:1;font-weight:600;letter-spacing:.08em}
.d-skeuo-foil-trading-card-title span{color:#5c5c66;font-size:6px;line-height:1;letter-spacing:.08em}
.d-skeuo-foil-trading-card-foil{position:absolute;z-index:4;inset:0;border-radius:12px;pointer-events:none;-webkit-mask:url("data:image/svg+xml,%3Csvg%20xmlns='http%3A%2F%2Fwww%2Ew3%2Eorg%2F2000%2Fsvg'%20viewBox='0%200%20160%20220'%3E%3Crect%20x='6.5'%20y='6.5'%20width='147'%20height='207'%20rx='7'%20fill='none'%20stroke='white'%20stroke-width='1.5'/%3E%3Cpolygon%20points='80,52%20121,80%20109,139%2080,170%2051,139%2039,80'%20fill='white'/%3E%3C/svg%3E") center/100% 100% no-repeat;mask:url("data:image/svg+xml,%3Csvg%20xmlns='http%3A%2F%2Fwww%2Ew3%2Eorg%2F2000%2Fsvg'%20viewBox='0%200%20160%20220'%3E%3Crect%20x='6.5'%20y='6.5'%20width='147'%20height='207'%20rx='7'%20fill='none'%20stroke='white'%20stroke-width='1.5'/%3E%3Cpolygon%20points='80,52%20121,80%20109,139%2080,170%2051,139%2039,80'%20fill='white'/%3E%3C/svg%3E") center/100% 100% no-repeat}
.d-skeuo-foil-trading-card-foil-color{opacity:.6;background:linear-gradient(120deg,transparent 13%,#a78bfa 31%,#67e8f9 50%,#4ade80 69%,transparent 87%);background-size:220% 220%;background-position:var(--foil-x) var(--foil-y);mix-blend-mode:color-dodge}
.d-skeuo-foil-trading-card-foil-glare{opacity:.25;background:linear-gradient(90deg,transparent,rgba(255,255,255,.98),transparent);background-repeat:no-repeat;background-size:40px 100%;background-position:calc(var(--glare-x) - 20px) 0;mix-blend-mode:screen}
.d-skeuo-foil-trading-card-sparkles{position:absolute;inset:0;pointer-events:none}
.d-skeuo-foil-trading-card-sparkles i{position:absolute;width:10px;height:10px;opacity:0;transform:scale(0) rotate(45deg)}
.d-skeuo-foil-trading-card-sparkles i::before,.d-skeuo-foil-trading-card-sparkles i::after{position:absolute;top:50%;left:50%;background:#a78bfa;box-shadow:0 0 6px rgba(167,139,250,.6);content:''}
.d-skeuo-foil-trading-card-sparkles i::before{width:10px;height:1px;margin:-.5px 0 0 -5px}.d-skeuo-foil-trading-card-sparkles i::after{width:1px;height:10px;margin:-5px 0 0 -.5px}
.d-skeuo-foil-trading-card-sparkles i:nth-child(1){top:13px;left:-13px}.d-skeuo-foil-trading-card-sparkles i:nth-child(2){top:47px;right:-16px}.d-skeuo-foil-trading-card-sparkles i:nth-child(3){top:108px;left:-17px}.d-skeuo-foil-trading-card-sparkles i:nth-child(4){right:-13px;bottom:53px}.d-skeuo-foil-trading-card-sparkles i:nth-child(5){bottom:8px;left:13px}.d-skeuo-foil-trading-card-sparkles i:nth-child(6){right:20px;bottom:-12px}
.d-skeuo-foil-trading-card-entered .d-skeuo-foil-trading-card-sparkles i{animation:d-skeuo-foil-trading-card-sparkle .38s cubic-bezier(.2,.8,.3,1) both}.d-skeuo-foil-trading-card-entered .d-skeuo-foil-trading-card-sparkles i:nth-child(1){animation-delay:.1s}.d-skeuo-foil-trading-card-entered .d-skeuo-foil-trading-card-sparkles i:nth-child(2){animation-delay:.16s}.d-skeuo-foil-trading-card-entered .d-skeuo-foil-trading-card-sparkles i:nth-child(3){animation-delay:.22s}.d-skeuo-foil-trading-card-entered .d-skeuo-foil-trading-card-sparkles i:nth-child(4){animation-delay:.28s}.d-skeuo-foil-trading-card-entered .d-skeuo-foil-trading-card-sparkles i:nth-child(5){animation-delay:.34s}.d-skeuo-foil-trading-card-entered .d-skeuo-foil-trading-card-sparkles i:nth-child(6){animation-delay:.4s}
.d-skeuo-foil-trading-card-foot{position:absolute;right:16px;bottom:8px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:8px;line-height:1;letter-spacing:.09em}
.d-skeuo-foil-trading-card-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@keyframes d-skeuo-foil-trading-card-entry{0%{opacity:0;transform:rotateY(90deg)}100%{opacity:1;transform:rotateY(0)}}
@keyframes d-skeuo-foil-trading-card-sparkle{0%{opacity:0;transform:scale(0) rotate(45deg)}55%{opacity:1;transform:scale(1.25) rotate(45deg)}100%{opacity:0;transform:scale(.5) rotate(45deg)}}
@container(max-width:340px){.d-skeuo-foil-trading-card-stage{right:10px;left:10px}.d-skeuo-foil-trading-card-head,.d-skeuo-foil-trading-card-foot{right:13px;left:13px}}
@media(prefers-reduced-motion:reduce){.d-skeuo-foil-trading-card *,.d-skeuo-foil-trading-card *::before,.d-skeuo-foil-trading-card *::after{animation:none!important;transition:none!important}.d-skeuo-foil-trading-card-entry{opacity:1;transform:none}.d-skeuo-foil-trading-card-sparkles i{opacity:.45;transform:scale(.55) rotate(45deg)}}
`,
  js:`
const entry=root.querySelector('.d-skeuo-foil-trading-card-entry'),card=root.querySelector('.d-skeuo-foil-trading-card-card'),status=root.querySelector('.d-skeuo-foil-trading-card-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal},passiveListener={signal:controller.signal,passive:true};
let targetX=0,targetY=0,currentX=0,currentY=0,pointerPosition=.5,hovering=false,keyboardActive=false,returning=false,returnTime=0,returnStartX=0,returnStartY=0,lastWall=0,frameId=0,entered=false,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function clamp(value,minimum,maximum){return Math.max(minimum,Math.min(maximum,value))}
function render(){card.style.transform='rotateX('+currentX.toFixed(3)+'deg) rotateY('+currentY.toFixed(3)+'deg)';card.style.setProperty('--foil-x',(50+currentY*1.5).toFixed(2)+'%');card.style.setProperty('--foil-y',(50-currentX*1.5).toFixed(2)+'%');card.style.setProperty('--glare-x',(pointerPosition*100).toFixed(2)+'%')}
function needsFrame(){return!reduced&&!cleaned&&visible&&documentVisible&&(hovering||keyboardActive||returning||Math.abs(targetX-currentX)>.01||Math.abs(targetY-currentY)>.01)}
function requestFrame(){if(!frameId&&needsFrame())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!needsFrame()){lastWall=0;return}const delta=lastWall?Math.min(40,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;if(returning){returnTime+=delta;const progress=Math.min(1,returnTime/520);let factor;if(progress<.72){const p=progress/.72;factor=1-1.11*(1-Math.pow(1-p,3))}else{const p=(progress-.72)/.28;factor=-.11*Math.pow(1-p,2)}currentX=returnStartX*factor;currentY=returnStartY*factor;if(progress>=1){currentX=0;currentY=0;targetX=0;targetY=0;returning=false}}else{currentX+=(targetX-currentX)*.1;currentY+=(targetY-currentY)*.1}render();requestFrame()}
function applyTarget(x,y,message){pointerPosition=clamp(x,0,1);targetX=clamp((.5-y)*20,-10,10);targetY=clamp((x-.5)*28,-14,14);returning=false;lastWall=0;if(reduced){currentX=targetX;currentY=targetY;render()}else requestFrame();if(message)status.textContent=message}
function release(){hovering=false;keyboardActive=false;targetX=0;targetY=0;returning=true;returnTime=0;returnStartX=currentX;returnStartY=currentY;lastWall=0;status.textContent='Foil card springing to center';if(reduced){currentX=0;currentY=0;returning=false;render()}else requestFrame()}
card.addEventListener('pointerenter',function(event){hovering=true;const bounds=entry.getBoundingClientRect();applyTarget((event.clientX-bounds.left)/bounds.width,(event.clientY-bounds.top)/bounds.height,'Foil tracking pointer')},passiveListener);card.addEventListener('pointermove',function(event){hovering=true;const bounds=entry.getBoundingClientRect();applyTarget((event.clientX-bounds.left)/bounds.width,(event.clientY-bounds.top)/bounds.height,'Foil tracking pointer')},passiveListener);card.addEventListener('pointerleave',release,listener);
card.addEventListener('keydown',function(event){if(event.key==='Escape'||event.key==='Home'){event.preventDefault();release();return}const directions={ArrowLeft:[0,-4],ArrowRight:[0,4],ArrowUp:[3,0],ArrowDown:[-3,0]},direction=directions[event.key];if(!direction)return;event.preventDefault();keyboardActive=true;hovering=false;returning=false;targetX=clamp(targetX+direction[0],-10,10);targetY=clamp(targetY+direction[1],-14,14);pointerPosition=.5+targetY/28;status.textContent='Foil tilted by keyboard';if(reduced){currentX=targetX;currentY=targetY;render()}else requestFrame()},listener);card.addEventListener('blur',release,listener);
function enter(){if(entered)return;entered=true;entry.classList.add('d-skeuo-foil-trading-card-entered');status.textContent=reduced?'Foil card ready without entry motion':'Foil card entering'}
entry.addEventListener('animationend',function(event){if(event.target===entry){status.textContent='Foil card ready'}},listener);
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;if(visible){enter();requestFrame()}else if(frameId){cancelAnimationFrame(frameId);frameId=0;lastWall=0}},{threshold:.2});intersectionObserver.observe(root)}else enter();
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
if(reduced)enter();render();
`,
  prompt:`Build one self-contained responsive 320px Skeuomorph scene with an exactly 160 by 220 pixel trading card, twelve-pixel radius, dark panel-token base, and a one-pixel line-token embossed frame inset six pixels. Center a procedural geometric crest made from layered panel and line-token polygons. Under a 700-pixel perspective, map pointer position to rotateY plus or minus fourteen degrees and inverse rotateX plus or minus ten degrees, easing toward the pointer by lerp 0.1; on leave, spring through one restrained overshoot and settle. Mask two overlays to the crest and inset frame: first, a 120-degree accent-to-info-to-success linear gradient at sixty-percent color-dodge whose background position moves at tilt angle times 1.5; second, a forty-pixel white glare band at twenty-five-percent screen blend that follows pointer x. When the card first intersects the viewport, flip it from rotateY ninety degrees to zero over 500 milliseconds with a soft ease-out while six small accent sparkle crosses pop around it in a stagger. Include keyboard tilt and centering, pause work while hidden, clean up detached instances, and present the final stable card under reduced motion.`
});
