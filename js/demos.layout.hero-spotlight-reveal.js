/* INTRX registry - premium hero spotlight reveal */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'hero-spotlight-reveal',
  title:'Hero Spotlight Reveal',
  cat:'Layout & UI',
  rootClass:'d-layout-hero-spotlight-reveal',
  tags:['hero','spotlight','entrance sequence'],
  libs:[],
  desc:'A premium hero assembles through a timed spotlight, masked headline, supporting copy, actions, grain, and rule before settling into a responsive luminous idle.',
  seen:'Seen on: the premium hero genre by uihssn, Pankaj, and JayBorda',
  hint:'move across the settled hero to steer the light, or use Replay to run the entrance sequence again',
  html:`<div class="d-layout-hero-spotlight-reveal" role="region" aria-label="Premium hero spotlight reveal">
  <div class="d-layout-hero-spotlight-reveal-head" aria-hidden="true"><span>HERO / ENTRANCE</span><span class="d-layout-hero-spotlight-reveal-mode"><i></i> WAITING</span></div>
  <div class="d-layout-hero-spotlight-reveal-stage" role="group" aria-label="Premium product hero with pointer-responsive spotlight">
    <div class="d-layout-hero-spotlight-reveal-light-wrap" aria-hidden="true"><div class="d-layout-hero-spotlight-reveal-light"></div></div>
    <div class="d-layout-hero-spotlight-reveal-copy">
      <h2 aria-label="Build beyond the obvious"><span><b data-text="Build beyond">Build beyond</b></span><span><b data-text="the obvious.">the obvious.</b></span></h2>
      <p>Interfaces with a point of view, tuned for the moment they become real.</p>
      <div class="d-layout-hero-spotlight-reveal-actions"><button class="d-layout-hero-spotlight-reveal-primary" type="button">Start building <i aria-hidden="true">&#8594;</i></button><button type="button">View system</button></div>
    </div>
    <button class="d-layout-hero-spotlight-reveal-replay" type="button" aria-label="Replay hero entrance">REPLAY <i aria-hidden="true">&#8635;</i></button>
    <div class="d-layout-hero-spotlight-reveal-grain" aria-hidden="true"></div>
    <i class="d-layout-hero-spotlight-reveal-rule" aria-hidden="true"></i>
  </div>
  <div class="d-layout-hero-spotlight-reveal-foot" aria-hidden="true"><span>SEQUENCE / 1000MS</span><span>IDLE / 6S SWEEP</span></div>
  <span class="d-layout-hero-spotlight-reveal-status" aria-live="polite" aria-atomic="true">Hero waiting to enter the viewport</span>
</div>`,
  css:`
.d-layout-hero-spotlight-reveal{--d-layout-hero-spotlight-reveal-drift-x:0px;--d-layout-hero-spotlight-reveal-drift-y:0px;--d-layout-hero-spotlight-reveal-specular:-120%;position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate;touch-action:pan-y}
.d-layout-hero-spotlight-reveal *{box-sizing:border-box}
.d-layout-hero-spotlight-reveal-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-layout-hero-spotlight-reveal-mode{display:flex;align-items:center;gap:5px;color:#9b9ba3}
.d-layout-hero-spotlight-reveal-mode i{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.45)}
.d-layout-hero-spotlight-reveal-stage{position:absolute;top:38px;right:12px;bottom:25px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(ellipse at 50% 42%,#161619 0,#0a0a0b 70%);outline:none}
.d-layout-hero-spotlight-reveal-stage::after{position:absolute;z-index:7;inset:0;box-shadow:inset 0 0 55px 22px rgba(0,0,0,.48);content:'';pointer-events:none}
.d-layout-hero-spotlight-reveal-light-wrap{position:absolute;z-index:0;top:45%;left:50%;width:310px;height:230px;transform:translate3d(calc(-50% + var(--d-layout-hero-spotlight-reveal-drift-x)),calc(-50% + var(--d-layout-hero-spotlight-reveal-drift-y)),0);will-change:transform}
.d-layout-hero-spotlight-reveal-light{width:100%;height:100%;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.3) 0 12%,rgba(167,139,250,.12) 34%,rgba(167,139,250,.035) 58%,transparent 72%);opacity:0;transform:scale(.6);transition:opacity 900ms cubic-bezier(.22,1,.36,1) 100ms,transform 900ms cubic-bezier(.22,1,.36,1) 100ms;will-change:transform,opacity}
.d-layout-hero-spotlight-reveal-copy{position:absolute;z-index:3;top:49px;right:26px;left:26px;text-align:center}
.d-layout-hero-spotlight-reveal-copy h2{margin:0;color:#ececef;font-family:Inter,system-ui,sans-serif;font-size:clamp(31px,11cqw,46px);font-weight:650;line-height:.86;letter-spacing:-.055em}
.d-layout-hero-spotlight-reveal-copy h2>span{display:block;overflow:hidden;padding:0 4px 4px}
.d-layout-hero-spotlight-reveal-copy h2 b{position:relative;display:inline-block;font-weight:inherit;letter-spacing:.06em;transform:translateY(110%);transition:transform 700ms cubic-bezier(.22,1,.36,1),letter-spacing 700ms cubic-bezier(.22,1,.36,1);will-change:transform}
.d-layout-hero-spotlight-reveal-copy h2>span:first-child b{transition-delay:250ms}
.d-layout-hero-spotlight-reveal-copy h2>span:nth-child(2) b{transition-delay:370ms}
.d-layout-hero-spotlight-reveal-copy h2 b::after{position:absolute;inset:0;color:transparent;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.08) 50%,transparent 65%);background-position:var(--d-layout-hero-spotlight-reveal-specular) 0;background-size:220% 100%;background-clip:text;-webkit-background-clip:text;content:attr(data-text);mix-blend-mode:screen;opacity:0;pointer-events:none}
.d-layout-hero-spotlight-reveal-copy>p{max-width:330px;margin:12px auto 0;color:#9b9ba3;font-family:Inter,system-ui,sans-serif;font-size:9px;line-height:1.45;opacity:0;transform:translateY(8px);transition:opacity 400ms ease 700ms,transform 400ms cubic-bezier(.22,1,.36,1) 700ms}
.d-layout-hero-spotlight-reveal-actions{margin-top:13px;display:flex;align-items:center;justify-content:center;gap:7px}
.d-layout-hero-spotlight-reveal-actions button{height:31px;padding:0 11px;border:1px solid #33333a;border-radius:6px;outline:none;color:#9b9ba3;background:rgba(16,16,18,.58);font-family:inherit;font-size:7px;font-weight:700;letter-spacing:.045em;opacity:0;transform:translateY(8px);transition:opacity 350ms ease,transform 350ms cubic-bezier(.22,1,.36,1);cursor:pointer}
.d-layout-hero-spotlight-reveal-actions button:first-child{transition-delay:850ms}
.d-layout-hero-spotlight-reveal-actions button:nth-child(2){transition-delay:920ms}
.d-layout-hero-spotlight-reveal-actions button:hover,.d-layout-hero-spotlight-reveal-actions button:focus-visible{color:#ececef;background:#19191c}
.d-layout-hero-spotlight-reveal-actions .d-layout-hero-spotlight-reveal-primary{border-color:#a78bfa;color:#ececef;background:rgba(167,139,250,.08)}
.d-layout-hero-spotlight-reveal-primary i{margin-left:5px;color:#a78bfa;font-style:normal}
.d-layout-hero-spotlight-reveal-replay{position:absolute;z-index:8;top:9px;right:9px;height:23px;padding:0 7px;border:1px solid #33333a;border-radius:5px;outline:none;color:#777781;background:rgba(16,16,18,.7);font-family:inherit;font-size:6px;font-weight:700;letter-spacing:.06em;cursor:pointer}
.d-layout-hero-spotlight-reveal-replay i{margin-left:3px;color:#a78bfa;font-size:9px;font-style:normal}
.d-layout-hero-spotlight-reveal-replay:hover,.d-layout-hero-spotlight-reveal-replay:focus-visible{border-color:#a78bfa;color:#ececef}
.d-layout-hero-spotlight-reveal-grain{position:absolute;z-index:5;inset:0;background:repeating-radial-gradient(circle at 17% 29%,#fff 0 .45px,transparent .65px 3px),repeating-linear-gradient(117deg,transparent 0 4px,#fff 4px 4.5px,transparent 4.5px 8px);background-size:7px 7px,11px 11px;opacity:0;mix-blend-mode:soft-light;transition:opacity 400ms ease 1000ms;pointer-events:none}
.d-layout-hero-spotlight-reveal-rule{position:absolute;z-index:6;right:16px;bottom:20px;left:16px;height:1px;display:block;background:#33333a;opacity:0;transform:scaleX(0);transform-origin:left;transition:opacity 450ms ease 1000ms,transform 450ms cubic-bezier(.22,1,.36,1) 1000ms}
.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-visible .d-layout-hero-spotlight-reveal-light{opacity:1;transform:scale(1)}
.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-visible .d-layout-hero-spotlight-reveal-copy h2 b{letter-spacing:.01em;transform:translateY(0)}
.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-visible .d-layout-hero-spotlight-reveal-copy>p,.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-visible .d-layout-hero-spotlight-reveal-actions button{opacity:1;transform:translateY(0)}
.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-visible .d-layout-hero-spotlight-reveal-grain{opacity:.03}
.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-visible .d-layout-hero-spotlight-reveal-rule{opacity:1;transform:scaleX(1)}
.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-settled .d-layout-hero-spotlight-reveal-copy h2 b::after{opacity:1}
.d-layout-hero-spotlight-reveal-foot{position:absolute;right:16px;bottom:9px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-layout-hero-spotlight-reveal-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-layout-hero-spotlight-reveal-stage{right:10px;left:10px}.d-layout-hero-spotlight-reveal-head,.d-layout-hero-spotlight-reveal-foot{right:13px;left:13px}.d-layout-hero-spotlight-reveal-copy{right:16px;left:16px}.d-layout-hero-spotlight-reveal-copy h2{font-size:31px}.d-layout-hero-spotlight-reveal-copy>p{font-size:8px}.d-layout-hero-spotlight-reveal-actions button{padding:0 8px}}
@media(prefers-reduced-motion:reduce){.d-layout-hero-spotlight-reveal-light,.d-layout-hero-spotlight-reveal-copy h2 b,.d-layout-hero-spotlight-reveal-copy>p,.d-layout-hero-spotlight-reveal-actions button,.d-layout-hero-spotlight-reveal-grain,.d-layout-hero-spotlight-reveal-rule{transition:opacity 300ms ease!important;transition-delay:0ms!important}.d-layout-hero-spotlight-reveal-light{transform:scale(1)!important}.d-layout-hero-spotlight-reveal-copy h2 b{letter-spacing:.01em!important;opacity:0;transform:none!important}.d-layout-hero-spotlight-reveal.d-layout-hero-spotlight-reveal-visible .d-layout-hero-spotlight-reveal-copy h2 b{opacity:1}.d-layout-hero-spotlight-reveal-copy>p,.d-layout-hero-spotlight-reveal-actions button{transform:none!important}.d-layout-hero-spotlight-reveal-rule{transform:scaleX(1)!important}.d-layout-hero-spotlight-reveal-copy h2 b::after{display:none}}
`,
  js:`
const field=root.querySelector('.d-layout-hero-spotlight-reveal-stage'),replay=root.querySelector('.d-layout-hero-spotlight-reveal-replay'),actions=Array.from(root.querySelectorAll('.d-layout-hero-spotlight-reveal-actions button')),mode=root.querySelector('.d-layout-hero-spotlight-reveal-mode'),status=root.querySelector('.d-layout-hero-spotlight-reveal-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal},passiveListener={signal:controller.signal,passive:true},visibleClass='d-layout-hero-spotlight-reveal-visible',settledClass='d-layout-hero-spotlight-reveal-settled';
let started=false,phase='waiting',sequenceTime=0,idleTime=0,targetX=0,targetY=0,currentX=0,currentY=0,lastWall=0,frameId=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function startReveal(source){started=true;phase=reduced?'static':'revealing';sequenceTime=0;idleTime=0;targetX=targetY=currentX=currentY=0;root.classList.remove(visibleClass,settledClass);root.style.setProperty('--d-layout-hero-spotlight-reveal-drift-x','0px');root.style.setProperty('--d-layout-hero-spotlight-reveal-drift-y','0px');root.style.setProperty('--d-layout-hero-spotlight-reveal-specular','-120%');root.offsetWidth;root.classList.add(visibleClass);mode.lastChild.textContent=source==='replay'?' REPLAYING':' REVEALING';status.textContent=reduced?'Hero revealed with reduced motion':'Hero entrance sequence started';lastWall=0;requestFrame()}
function pointerTarget(event){const bounds=field.getBoundingClientRect();targetX=Math.max(-20,Math.min(20,((event.clientX-bounds.left)/bounds.width-.5)*40));targetY=Math.max(-20,Math.min(20,((event.clientY-bounds.top)/bounds.height-.5)*40))}
field.addEventListener('pointermove',pointerTarget,passiveListener);field.addEventListener('pointerleave',function(){targetX=0;targetY=0},listener);replay.addEventListener('click',function(){startReveal('replay')},listener);actions.forEach(function(button){button.addEventListener('click',function(){status.textContent=button.textContent.trim()+' selected'},listener)});
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible&&(phase==='revealing'||phase==='idle')}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(40,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;if(phase==='revealing'){sequenceTime+=delta;if(sequenceTime>=1600){phase='idle';idleTime=0;root.classList.add(settledClass);mode.lastChild.textContent=' IDLE / LIVE';status.textContent='Hero entrance settled; spotlight follows the pointer'}}else idleTime+=delta;if(phase==='idle'){const blend=1-Math.pow(.96,delta/16.6667);currentX+=(targetX-currentX)*blend;currentY+=(targetY-currentY)*blend;const sweep=-120+(idleTime%6000)/6000*340;root.style.setProperty('--d-layout-hero-spotlight-reveal-drift-x',currentX.toFixed(2)+'px');root.style.setProperty('--d-layout-hero-spotlight-reveal-drift-y',currentY.toFixed(2)+'px');root.style.setProperty('--d-layout-hero-spotlight-reveal-specular',sweep.toFixed(2)+'%')}requestFrame()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible){if(!started)startReveal('scroll');else requestFrame()}else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.2});intersectionObserver.observe(root)}else startReveal('scroll');
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
`,
  prompt:`Build one self-contained responsive 320px Layout and UI hero card that begins as a background-zero stage with a dark vignette and reveals on IntersectionObserver entry, with a replay chip that restarts the same DOM sequence. At 100 milliseconds, bloom an accent radial spotlight whose core occupies twelve percent, scaling from 0.6 to 1 over 900 milliseconds with soft ease-out. At 250 milliseconds, lift the first masked headline line from translateY 110 percent while easing letter spacing from 0.06em to 0.01em over 700 milliseconds; start the second line 120 milliseconds later. At 700 milliseconds, fade the supporting line upward eight pixels. At 850 milliseconds, reveal an accent-bordered primary button, then stagger in a ghost secondary. At 1000 milliseconds, fade deterministic film grain to exactly three-percent opacity and draw a one-pixel line-one rule under the fold. After 1600 milliseconds, lerp a wrapper spotlight toward normalized pointer coordinates by 0.04 per nominal frame, capped at plus or minus twenty pixels, and sweep an eight-percent white screen-blend highlight clipped to the headline every six seconds. Pause the single frame loop offscreen and while hidden, clean up detached instances, and make reduced motion use only immediate geometry plus one 300-millisecond opacity reveal with no idle drift or specular animation.`
});
