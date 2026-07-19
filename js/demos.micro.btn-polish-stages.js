/* INTRX registry - five-stage button polish walkthrough */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'btn-polish-stages',
  title:'Button Polish Stages',
  cat:'Buttons & Micro',
  rootClass:'d-micro-btn-polish-stages',
  tags:['button','walkthrough','polish'],
  libs:[],
  desc:'One button progresses from a flat rectangle to a detailed production control, making each layer of polish visible on the same element.',
  seen:"Seen on: Tran Mau Tri Tam's how I polish a button walkthrough",
  hint:'click anywhere to add the next layer of polish',
  html:`<div class="d-micro-btn-polish-stages d-micro-btn-polish-stages-s1" role="region" aria-label="Five-stage button polish walkthrough">
  <div class="d-micro-btn-polish-stages-head" aria-hidden="true"><span>BUTTONS / POLISH</span><span>LIVE WALKTHROUGH</span></div>
  <div class="d-micro-btn-polish-stages-stage">
    <span class="d-micro-btn-polish-stages-guide" aria-hidden="true"><i></i><i></i></span>
    <button class="d-micro-btn-polish-stages-button" type="button" aria-label="Get started. Polish stage 1 of 5. Activate anywhere to advance."><span>Get started</span><i aria-hidden="true">→</i></button>
    <div class="d-micro-btn-polish-stages-caption" aria-hidden="true">
      <span class="d-micro-btn-polish-stages-caption-item d-micro-btn-polish-stages-caption-active">flat foundation</span>
      <span class="d-micro-btn-polish-stages-caption-item">+ radius &amp; padding</span>
      <span class="d-micro-btn-polish-stages-caption-item">+ elevation</span>
      <span class="d-micro-btn-polish-stages-caption-item">+ motion &amp; focus</span>
      <span class="d-micro-btn-polish-stages-caption-item">+ arrow &amp; pulse</span>
    </div>
    <span class="d-micro-btn-polish-stages-chip" aria-hidden="true">1 / 5</span>
    <span class="d-micro-btn-polish-stages-ghost" aria-hidden="true"><i></i><small>AUTO</small></span>
  </div>
  <div class="d-micro-btn-polish-stages-foot" aria-hidden="true"><span>CLICK ANYWHERE / WRAPS</span><span class="d-micro-btn-polish-stages-mode">01 FLAT</span></div>
  <span class="d-micro-btn-polish-stages-status" aria-live="polite" aria-atomic="true">Stage 1 of 5, flat foundation</span>
</div>`,
  css:`
.d-micro-btn-polish-stages{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-micro-btn-polish-stages *{box-sizing:border-box}
.d-micro-btn-polish-stages-head,.d-micro-btn-polish-stages-foot{position:absolute;right:14px;left:14px;z-index:3;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em;pointer-events:none}
.d-micro-btn-polish-stages-head{top:15px}.d-micro-btn-polish-stages-foot{bottom:10px;font-size:8px}
.d-micro-btn-polish-stages-stage{position:absolute;top:38px;right:12px;bottom:27px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(circle at 50% 46%,rgba(250,115,25,.08),transparent 36%),#101012;cursor:pointer}
.d-micro-btn-polish-stages-guide{position:absolute;top:50%;left:50%;width:236px;height:112px;pointer-events:none;transform:translate(-50%,-58%);opacity:.42}
.d-micro-btn-polish-stages-guide i{position:absolute;background:#29292f}.d-micro-btn-polish-stages-guide i:first-child{top:50%;left:0;width:100%;height:1px}.d-micro-btn-polish-stages-guide i:last-child{top:0;left:50%;width:1px;height:100%}
.d-micro-btn-polish-stages-button{position:absolute;top:46%;left:50%;display:inline-flex;align-items:center;justify-content:center;min-width:112px;padding:10px 16px;border:1px solid transparent;border-radius:0;background:#2e2e34;color:#ececef;box-shadow:none;appearance:none;outline-offset:4px;font:600 12px/1 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:nowrap;cursor:pointer;transform:translate(-50%,-50%);transform-origin:center;transition:padding .15s ease-in-out,border-radius .15s ease-in-out,border-color .15s ease-in-out,background-color .15s ease-in-out,box-shadow .15s ease-in-out,transform .15s ease-in-out,letter-spacing .15s ease-in-out}
.d-micro-btn-polish-stages-button:focus-visible{outline:1px solid #72727c}
.d-micro-btn-polish-stages-button>i{display:inline-block;width:0;max-width:0;margin-left:0;overflow:hidden;font-style:normal;opacity:0;transform:translateX(-5px);transition:width .15s ease-in-out,max-width .15s ease-in-out,margin-left .15s ease-in-out,opacity .15s ease-in-out,transform .15s ease-in-out}
.d-micro-btn-polish-stages-button::after{content:'';position:absolute;inset:-1px;border:1px solid #fa7319;border-radius:inherit;opacity:0;pointer-events:none}
.d-micro-btn-polish-stages-s2 .d-micro-btn-polish-stages-button,.d-micro-btn-polish-stages-s3 .d-micro-btn-polish-stages-button,.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button{padding:12px 20px;border-radius:8px}
.d-micro-btn-polish-stages-s3 .d-micro-btn-polish-stages-button,.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button{border-color:#3b3b43;box-shadow:inset 0 1px rgba(255,255,255,.07),0 7px 18px rgba(0,0,0,.2)}
.d-micro-btn-polish-stages-s3 .d-micro-btn-polish-stages-button:hover,.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button:hover,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button:hover,.d-micro-btn-polish-stages-button.d-micro-btn-polish-stages-auto-hover{background:#1b1b1f}
.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button{transition-duration:.15s,.15s,.15s,.15s,.15s,.2s,.15s}
.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button:hover,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button:hover,.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button.d-micro-btn-polish-stages-auto-hover,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button.d-micro-btn-polish-stages-auto-hover{transform:translate(-50%,calc(-50% - 1px))}
.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button:active,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button:active,.d-micro-btn-polish-stages-button.d-micro-btn-polish-stages-auto-press{transform:translate(-50%,calc(-50% - 1px)) scale(.97);transition-timing-function:cubic-bezier(.2,1.65,.4,1)}
.d-micro-btn-polish-stages-s4 .d-micro-btn-polish-stages-button:focus-visible,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button:focus-visible{outline:2px solid rgba(250,115,25,.4);outline-offset:4px}
.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button{letter-spacing:.01em}
.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button:hover>i,.d-micro-btn-polish-stages-s5 .d-micro-btn-polish-stages-button.d-micro-btn-polish-stages-auto-hover>i{width:12px;max-width:12px;margin-left:6px;opacity:1;transform:none}
.d-micro-btn-polish-stages-button.d-micro-btn-polish-stages-pulse::after{animation:d-micro-btn-polish-stages-pulse .32s ease-out}
.d-micro-btn-polish-stages-caption{position:absolute;top:calc(46% + 43px);left:50%;width:190px;height:18px;transform:translateX(-50%);pointer-events:none}
.d-micro-btn-polish-stages-caption-item{position:absolute;inset:0;color:#72727c;font:500 9px/18px 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.04em;text-align:center;opacity:0;transform:translateY(4px);transition:opacity .2s ease,transform .2s ease}
.d-micro-btn-polish-stages-caption-item.d-micro-btn-polish-stages-caption-active{opacity:1;transform:none}
.d-micro-btn-polish-stages-chip{position:absolute;top:17px;right:17px;min-width:34px;padding:5px 6px;border:1px solid #303037;border-radius:999px;background:#161619;color:#9b9ba3;font:600 8px/1 'JetBrains Mono',ui-monospace,monospace;text-align:center;letter-spacing:.06em;pointer-events:none}
.d-micro-btn-polish-stages-ghost{position:absolute;z-index:4;top:0;left:0;width:18px;height:24px;opacity:0;pointer-events:none;transform:translate(-3px,-2px)}
.d-micro-btn-polish-stages-ghost i{display:block;width:0;height:0;border-top:12px solid #ececef;border-right:7px solid transparent;filter:drop-shadow(0 2px 3px rgba(0,0,0,.45));transform:rotate(-22deg)}
.d-micro-btn-polish-stages-ghost small{position:absolute;top:17px;left:8px;color:#fa7319;font:700 6px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.08em}
.d-micro-btn-polish-stages-mode{color:#fa7319}
.d-micro-btn-polish-stages-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@keyframes d-micro-btn-polish-stages-pulse{0%{opacity:.85;transform:scale(1)}100%{opacity:0;transform:scale(1.12)}}
@container (max-width:340px){.d-micro-btn-polish-stages-head,.d-micro-btn-polish-stages-foot{right:10px;left:10px;font-size:7px}.d-micro-btn-polish-stages-stage{right:9px;left:9px}.d-micro-btn-polish-stages-guide{width:78%}}
@media (prefers-reduced-motion:reduce){.d-micro-btn-polish-stages-button,.d-micro-btn-polish-stages-button>i,.d-micro-btn-polish-stages-caption-item{animation:none;transition:none}.d-micro-btn-polish-stages-ghost{display:none}}
`,
  js:`
const stageElement=root.querySelector('.d-micro-btn-polish-stages-stage'),button=root.querySelector('.d-micro-btn-polish-stages-button'),captions=Array.from(root.querySelectorAll('.d-micro-btn-polish-stages-caption-item')),chip=root.querySelector('.d-micro-btn-polish-stages-chip'),ghost=root.querySelector('.d-micro-btn-polish-stages-ghost'),mode=root.querySelector('.d-micro-btn-polish-stages-mode'),status=root.querySelector('.d-micro-btn-polish-stages-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
const stageClasses=['d-micro-btn-polish-stages-s1','d-micro-btn-polish-stages-s2','d-micro-btn-polish-stages-s3','d-micro-btn-polish-stages-s4','d-micro-btn-polish-stages-s5'],names=['flat foundation','radius and padding','elevation','motion and focus','arrow and pulse'],modeNames=['01 FLAT','02 SHAPE','03 DEPTH','04 MOTION','05 DETAIL'];
let current=0,autoRunning=false,autoElapsed=0,lastWall=0,frameId=0,pulseFired=false,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function clamp(value,minimum,maximum){return Math.max(minimum,Math.min(maximum,value))}
function mix(from,to,amount){return from+(to-from)*amount}
function easeInOut(value){return value<.5?4*value*value*value:1-Math.pow(-2*value+2,3)/2}
function clearAuto(){autoRunning=false;autoElapsed=0;lastWall=0;pulseFired=false;ghost.style.opacity='0';button.classList.remove('d-micro-btn-polish-stages-auto-hover','d-micro-btn-polish-stages-auto-press','d-micro-btn-polish-stages-pulse')}
function setStage(next,announce){root.classList.remove(...stageClasses);current=next;root.classList.add(stageClasses[current]);captions.forEach(function(caption,index){caption.classList.toggle('d-micro-btn-polish-stages-caption-active',index===current)});chip.textContent=current+1+' / 5';mode.textContent=modeNames[current];button.setAttribute('aria-label','Get started. Polish stage '+(current+1)+' of 5, '+names[current]+'. Activate anywhere to advance.');if(announce)status.textContent='Stage '+(current+1)+' of 5, '+names[current];if(current===4&&!reduced)startAuto();else if(current!==4)clearAuto()}
function eligible(){return autoRunning&&!reduced&&!cleaned&&visible&&documentVisible}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(frame)}
function startAuto(){clearAuto();autoRunning=true;status.textContent='Stage 5 detail auto demonstration started';requestFrame()}
function updateAuto(){const width=stageElement.clientWidth,height=stageElement.clientHeight,startX=width*.82,startY=height*.76,targetX=width*.5+28,targetY=height*.46+12,arrival=clamp(autoElapsed/300,0,1),departure=clamp((autoElapsed-1200)/300,0,1),move=easeInOut(arrival),x=mix(startX,targetX,move)+departure*22,y=mix(startY,targetY,move)+departure*18;ghost.style.left=x.toFixed(2)+'px';ghost.style.top=y.toFixed(2)+'px';ghost.style.opacity=String(Math.min(arrival,1-departure));const hovering=autoElapsed>=300&&autoElapsed<1200,pressing=autoElapsed>=650&&autoElapsed<850;button.classList.toggle('d-micro-btn-polish-stages-auto-hover',hovering);button.classList.toggle('d-micro-btn-polish-stages-auto-press',pressing);if(autoElapsed>=650&&!pulseFired){pulseFired=true;button.classList.remove('d-micro-btn-polish-stages-pulse');void button.offsetWidth;button.classList.add('d-micro-btn-polish-stages-pulse')}}
function frame(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(50,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;autoElapsed+=delta;updateAuto();if(autoElapsed>=1500){clearAuto();setStage(0,true);status.textContent='Auto demonstration complete. Wrapped to stage 1';return}requestFrame()}
function advance(){if(autoRunning)return;setStage((current+1)%5,true)}
function onPointerDown(event){if(current!==4||event.button!==0)return;button.classList.remove('d-micro-btn-polish-stages-pulse');void button.offsetWidth;button.classList.add('d-micro-btn-polish-stages-pulse')}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}
function cleanup(){if(cleaned)return;cleaned=true;if(frameId)cancelAnimationFrame(frameId);frameId=0;controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
root.addEventListener('click',advance,listener);button.addEventListener('pointerdown',onPointerDown,listener);button.addEventListener('animationend',function(){button.classList.remove('d-micro-btn-polish-stages-pulse')},listener);document.addEventListener('visibilitychange',onVisibility,listener);
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){visible=!!entries.length&&entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.04});intersectionObserver.observe(root)}if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
setStage(0,false);
`,
  prompt:`Build a self-contained responsive 320px Buttons and Micro walkthrough around one persistent centered native button labeled Get started. The whole card advances and wraps on click while the same button gains one production layer at a time. Stage 1 is a flat bg2 rectangle with zero radius and no decorative states. Stage 2 morphs over 150ms ease-in-out to 8px radius and 12px by 20px padding. Stage 3 adds a line1 border, a one-pixel lighter inset top edge, depth shadow, and a hover fill of #1b1b1f. Stage 4 adds a 150ms one-pixel hover lift, scale 0.97 on press with a 200ms elastic return, and a two-pixel accent focus ring at forty-percent opacity. Stage 5 changes label tracking to 0.01em, slides an arrow from zero width and margin to a six-pixel gap on hover, and emits a one-pixel accent border pulse on press. Stack five captions below the button and crossfade the active text over 200ms: flat foundation, + radius and padding, + elevation, + motion and focus, and + arrow and pulse. Keep a truthful 1 / 5 chip. On entering stage 5, animate a noninteractive ghost cursor for 1.5 seconds through approach, hover, press, release, and exit, then wrap to stage 1. Use one capped requestAnimationFrame only for that auto-demo, pause without catch-up while hidden or offscreen, clean up detached instances, retain native keyboard activation and polite status. Under reduced motion, request no frames and let deliberate activation advance through all five stable stages and wrap manually.`
});
