/* INTRX registry - dynamic hardware notch */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'dynamic-notch',
  title:'Dynamic Notch',
  cat:'Skeuomorph',
  rootClass:'d-skeuo-dynamic-notch',
  tags:['notch','morph','hardware'],
  libs:[],
  desc:'A hardware-black island alternates between timer and now-playing events through a precise collapse-first spring morph.',
  seen:"Seen on: iamnoman's MacBook notch case study and Apple Dynamic Island",
  hint:'hover the expanded island · activate to advance the event',
  html:`<div class="d-skeuo-dynamic-notch" role="region" aria-label="Morphing hardware notch demonstration">
  <div class="d-skeuo-dynamic-notch-head" aria-hidden="true"><span>SKEUO / DYNAMIC NOTCH</span><span>EVENT CHANNEL</span></div>
  <div class="d-skeuo-dynamic-notch-stage">
    <button class="d-skeuo-dynamic-notch-island" type="button" aria-label="Dynamic notch. Activate to advance to the next event.">
      <span class="d-skeuo-dynamic-notch-sensor" aria-hidden="true"><i></i></span>
      <span class="d-skeuo-dynamic-notch-timer" aria-hidden="true">
        <span class="d-skeuo-dynamic-notch-ring"><i></i></span>
        <span class="d-skeuo-dynamic-notch-timer-copy"><small>TIMER</small><b class="d-skeuo-dynamic-notch-count">00:42</b></span>
      </span>
      <span class="d-skeuo-dynamic-notch-player" aria-hidden="true" hidden>
        <span class="d-skeuo-dynamic-notch-album"></span>
        <span class="d-skeuo-dynamic-notch-track"><b>Ambient Bloom</b><small>Kaito / Nocturne</small></span>
        <span class="d-skeuo-dynamic-notch-equalizer"><i></i><i></i><i></i></span>
      </span>
    </button>
    <span class="d-skeuo-dynamic-notch-wallpaper-copy" aria-hidden="true"><b>09:41</b><small>FOCUS / ACTIVE</small></span>
    <span class="d-skeuo-dynamic-notch-window" aria-hidden="true"><i></i><i></i><i></i></span>
  </div>
  <div class="d-skeuo-dynamic-notch-foot" aria-hidden="true"><span>4S EVENT CYCLE</span><span class="d-skeuo-dynamic-notch-mode">TIMER</span></div>
  <span class="d-skeuo-dynamic-notch-status" aria-live="polite" aria-atomic="true">Timer event entering</span>
</div>`,
  css:`
.d-skeuo-dynamic-notch{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#fff;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-skeuo-dynamic-notch *{box-sizing:border-box}
.d-skeuo-dynamic-notch-head,.d-skeuo-dynamic-notch-foot{position:absolute;right:14px;left:14px;z-index:3;display:flex;align-items:center;justify-content:space-between;color:#7a7a7f;font-size:9px;line-height:1;letter-spacing:.08em;pointer-events:none}
.d-skeuo-dynamic-notch-head{top:15px}.d-skeuo-dynamic-notch-foot{bottom:10px;font-size:8px}
.d-skeuo-dynamic-notch-stage{position:absolute;top:38px;right:12px;bottom:27px;left:12px;overflow:hidden;border:1px solid #333;border-radius:10px;background:radial-gradient(circle at 18% 82%,rgba(255,255,255,.05),transparent 38%),radial-gradient(circle at 82% 20%,rgba(250,115,25,.2),transparent 44%),linear-gradient(145deg,#262626,#161619 58%,#101012)}
.d-skeuo-dynamic-notch-stage::before{content:'';position:absolute;inset:0;background:linear-gradient(118deg,transparent 0 36%,rgba(255,255,255,.035) 36.2% 36.6%,transparent 36.8% 62%,rgba(250,115,25,.06) 62.2% 62.6%,transparent 62.8%);pointer-events:none}
.d-skeuo-dynamic-notch-stage::after{content:'';position:absolute;right:50%;bottom:13px;width:78px;height:5px;border:1px solid rgba(236,236,239,.08);border-radius:999px;background:rgba(10,10,11,.3);transform:translateX(50%);pointer-events:none}
.d-skeuo-dynamic-notch-island{position:absolute;z-index:3;top:11px;left:50%;width:90px;height:24px;padding:0;overflow:hidden;border:0;border-radius:999px;background:#000;color:#fff;appearance:none;outline:none;cursor:pointer;transform:translateX(-50%) scale(1);transform-origin:50% 0;transition:transform .18s ease;will-change:width,height,border-radius,transform}
.d-skeuo-dynamic-notch-island:focus-visible{box-shadow:0 0 0 2px rgba(250,115,25,.72),0 8px 24px rgba(0,0,0,.38)}
.d-skeuo-dynamic-notch-island.d-skeuo-dynamic-notch-expanded:hover{transform:translateX(-50%) scale(1.06)}
.d-skeuo-dynamic-notch-sensor{position:absolute;top:50%;left:50%;width:8px;height:8px;border:1px solid #161619;border-radius:50%;background:#0a0a0b;opacity:1;transform:translate(-50%,-50%)}
.d-skeuo-dynamic-notch-sensor i{position:absolute;top:2px;left:2px;width:2px;height:2px;border-radius:50%;background:#262626;box-shadow:0 0 3px rgba(255,255,255,.12)}
.d-skeuo-dynamic-notch-timer,.d-skeuo-dynamic-notch-player{position:absolute;inset:0;display:flex;align-items:center;opacity:0;transform:translateY(0);transition:transform .18s ease}
.d-skeuo-dynamic-notch-timer[hidden],.d-skeuo-dynamic-notch-player[hidden]{display:none}
.d-skeuo-dynamic-notch-island:hover .d-skeuo-dynamic-notch-timer,.d-skeuo-dynamic-notch-island:hover .d-skeuo-dynamic-notch-player{transform:translateY(-1px)}
.d-skeuo-dynamic-notch-timer{justify-content:center;gap:8px;padding:0 10px}
.d-skeuo-dynamic-notch-ring{position:relative;width:21px;height:21px;flex:0 0 21px;border-radius:50%;background:conic-gradient(#fa7319 0 var(--timer-angle,360deg),#262626 var(--timer-angle,360deg) 360deg)}
.d-skeuo-dynamic-notch-ring i{position:absolute;inset:3px;border-radius:50%;background:#000}
.d-skeuo-dynamic-notch-timer-copy{display:grid;gap:1px;text-align:left;white-space:nowrap}
.d-skeuo-dynamic-notch-timer-copy small{color:#7a7a7f;font:600 6px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.1em}
.d-skeuo-dynamic-notch-timer-copy b{color:#fff;font:600 11px/1 'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums}
.d-skeuo-dynamic-notch-player{gap:8px;padding:0 10px}
.d-skeuo-dynamic-notch-album{position:relative;width:36px;height:36px;flex:0 0 36px;border-radius:7px;overflow:hidden;background:linear-gradient(145deg,#fa7319 0 44%,#333 45% 66%,#161619 67%)}
.d-skeuo-dynamic-notch-album::before{content:'';position:absolute;inset:7px;border:1px solid rgba(255,255,255,.36);border-radius:50%}
.d-skeuo-dynamic-notch-album::after{content:'';position:absolute;top:15px;left:15px;width:6px;height:6px;border-radius:50%;background:#101012}
.d-skeuo-dynamic-notch-track{min-width:0;display:grid;flex:1;gap:4px;text-align:left;white-space:nowrap}
.d-skeuo-dynamic-notch-track b{overflow:hidden;color:#fff;font:600 9px/1 Roboto Mono,JetBrains Mono,monospace;text-overflow:ellipsis}
.d-skeuo-dynamic-notch-track small{overflow:hidden;color:#7a7a7f;font:500 7px/1 Roboto Mono,JetBrains Mono,monospace;text-overflow:ellipsis}
.d-skeuo-dynamic-notch-equalizer{height:18px;display:flex;align-items:flex-end;gap:2px;flex:0 0 13px}
.d-skeuo-dynamic-notch-equalizer i{width:3px;height:var(--bar-height,5px);border-radius:2px;background:#fa7319;box-shadow:0 0 4px rgba(250,115,25,.24)}
.d-skeuo-dynamic-notch-wallpaper-copy{position:absolute;top:84px;left:22px;display:grid;gap:5px;color:rgba(236,236,239,.72);pointer-events:none}
.d-skeuo-dynamic-notch-wallpaper-copy b{font:500 30px/1 Roboto Mono,JetBrains Mono,monospace;letter-spacing:-.04em}.d-skeuo-dynamic-notch-wallpaper-copy small{color:rgba(236,236,239,.38);font:600 7px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.12em}
.d-skeuo-dynamic-notch-window{position:absolute;right:22px;bottom:35px;width:88px;height:52px;padding:12px 10px;display:grid;gap:6px;border:1px solid rgba(236,236,239,.07);border-radius:8px;background:rgba(10,10,11,.18);backdrop-filter:blur(5px);pointer-events:none}
.d-skeuo-dynamic-notch-window i{height:3px;border-radius:3px;background:rgba(236,236,239,.12)}.d-skeuo-dynamic-notch-window i:nth-child(2){width:72%}.d-skeuo-dynamic-notch-window i:nth-child(3){width:48%;background:rgba(250,115,25,.23)}
.d-skeuo-dynamic-notch-mode{color:#fa7319}
.d-skeuo-dynamic-notch-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container (max-width:340px){.d-skeuo-dynamic-notch-head,.d-skeuo-dynamic-notch-foot{right:10px;left:10px;font-size:7px}.d-skeuo-dynamic-notch-stage{right:9px;left:9px}.d-skeuo-dynamic-notch-wallpaper-copy{left:16px}.d-skeuo-dynamic-notch-window{right:16px}}
@media (prefers-reduced-motion:reduce){.d-skeuo-dynamic-notch-island,.d-skeuo-dynamic-notch-timer,.d-skeuo-dynamic-notch-player{transition:none}}
`,
  js:`
const stageElement=root.querySelector('.d-skeuo-dynamic-notch-stage'),island=root.querySelector('.d-skeuo-dynamic-notch-island'),sensor=root.querySelector('.d-skeuo-dynamic-notch-sensor'),timer=root.querySelector('.d-skeuo-dynamic-notch-timer'),player=root.querySelector('.d-skeuo-dynamic-notch-player'),ring=root.querySelector('.d-skeuo-dynamic-notch-ring'),count=root.querySelector('.d-skeuo-dynamic-notch-count'),bars=Array.from(root.querySelectorAll('.d-skeuo-dynamic-notch-equalizer i')),mode=root.querySelector('.d-skeuo-dynamic-notch-mode'),status=root.querySelector('.d-skeuo-dynamic-notch-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
const cycleDuration=4000,expandDuration=600,contentDelay=150,contentFade=150,collapseStart=3700,baseWidth=90,baseHeight=24;
let activeTime=0,lastWall=0,frameId=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,lastAnnounced=-1,reducedKind=1,resizeObserver=null,intersectionObserver=null,connectionObserver=null;
function clamp(value,minimum,maximum){return Math.max(minimum,Math.min(maximum,value))}
function mix(from,to,amount){return from+(to-from)*amount}
function easeOut(value){return 1-Math.pow(1-value,3)}
function easeInOut(value){return value<.5?4*value*value*value:1-Math.pow(-2*value+2,3)/2}
function target(kind){const maximum=Math.max(baseWidth,stageElement.clientWidth-28);return kind===0?{width:Math.min(150,maximum),height:32,radius:16}:{width:Math.min(210,maximum),height:56,radius:18}}
function dimensions(local,goal){if(local<expandDuration){const progress=local/expandDuration,peak=.68;if(progress<peak){const amount=easeOut(progress/peak);return{width:mix(baseWidth,goal.width*1.08,amount),height:mix(baseHeight,goal.height*1.04,amount),radius:mix(baseHeight/2,goal.radius,amount)}}const amount=easeInOut((progress-peak)/(1-peak));return{width:mix(goal.width*1.08,goal.width,amount),height:mix(goal.height*1.04,goal.height,amount),radius:goal.radius}}if(local<collapseStart)return goal;const amount=easeInOut((local-collapseStart)/(cycleDuration-collapseStart));return{width:mix(goal.width,baseWidth,amount),height:mix(goal.height,baseHeight,amount),radius:mix(goal.radius,baseHeight/2,amount)}}
function setKind(kind){const timerActive=kind===0;timer.hidden=!timerActive;player.hidden=timerActive;mode.textContent=timerActive?'TIMER':'NOW PLAYING'}
function setBars(time){const phases=[.4,2.7,4.9];bars.forEach(function(bar,index){const primary=.5+.5*Math.sin(time*.0091+phases[index]),secondary=.5+.5*Math.sin(time*.0157+phases[index]*1.8),height=3+Math.round(primary*7+secondary*4);bar.style.setProperty('--bar-height',height+'px')})}
function render(){const cycle=Math.floor(activeTime/cycleDuration),local=activeTime-cycle*cycleDuration,kind=cycle%2,goal=target(kind),size=dimensions(local,goal),fadeIn=clamp((local-(expandDuration+contentDelay))/contentFade,0,1),fadeOut=clamp((collapseStart-local)/contentFade,0,1),opacity=Math.min(fadeIn,fadeOut),expanded=local>=expandDuration&&local<collapseStart;setKind(kind);island.style.width=size.width.toFixed(3)+'px';island.style.height=size.height.toFixed(3)+'px';island.style.borderRadius=size.radius.toFixed(3)+'px';island.classList.toggle('d-skeuo-dynamic-notch-expanded',expanded);timer.style.opacity=kind===0?String(opacity):'0';player.style.opacity=kind===1?String(opacity):'0';sensor.style.opacity=String(1-opacity);const remaining=Math.max(0,42-Math.floor(local/1000));count.textContent='00:'+String(remaining).padStart(2,'0');ring.style.setProperty('--timer-angle',(remaining/42*360).toFixed(2)+'deg');setBars(activeTime);island.setAttribute('aria-label',kind===0?'Timer '+count.textContent+'. Activate to advance to now playing.':'Now playing Ambient Bloom by Kaito. Activate to advance to timer.');if(expanded&&cycle!==lastAnnounced){lastAnnounced=cycle;status.textContent=kind===0?'Timer event expanded':'Now playing event expanded'}}
function renderReduced(){const kind=reducedKind,goal=target(kind);setKind(kind);island.style.width=goal.width+'px';island.style.height=goal.height+'px';island.style.borderRadius=goal.radius+'px';island.classList.add('d-skeuo-dynamic-notch-expanded');timer.style.opacity=kind===0?'1':'0';player.style.opacity=kind===1?'1':'0';sensor.style.opacity='0';count.textContent='00:42';ring.style.setProperty('--timer-angle','360deg');[8,15,6].forEach(function(height,index){bars[index].style.setProperty('--bar-height',height+'px')});island.setAttribute('aria-label',kind===0?'Timer 00:42. Activate to show now playing.':'Now playing Ambient Bloom by Kaito. Activate to show timer.')}
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(frame)}
function frame(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(50,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;activeTime+=delta;render();requestFrame()}
function onActivate(){if(reduced){reducedKind=reducedKind?0:1;renderReduced();status.textContent=reducedKind===0?'Timer event shown without motion':'Now playing event shown without motion';return}const local=activeTime%cycleDuration;if(local<collapseStart)activeTime+=collapseStart-local;status.textContent='Current event collapsing before the next event';render();requestFrame()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}
function cleanup(){if(cleaned)return;cleaned=true;if(frameId)cancelAnimationFrame(frameId);frameId=0;controller.abort();if(resizeObserver)resizeObserver.disconnect();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
island.addEventListener('click',onActivate,listener);document.addEventListener('visibilitychange',onVisibility,listener);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(function(){if(reduced)renderReduced();else render()});resizeObserver.observe(stageElement)}if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){visible=!!entries.length&&entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.04});intersectionObserver.observe(root)}if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
if(reduced){renderReduced();status.textContent='Now playing event shown without motion'}else{render();requestFrame()}
`,
  prompt:`Render the card as one dark matte-steel material using grayscale, #333 seams, mono uppercase micro-labels, and #fa7319 as the only accent; use no emoji. Build a self-contained responsive 320px Skeuomorph card with a subtle dark matte-steel desktop wallpaper and a top-center hardware-black notch. Its collapsed pill is exactly 90 by 24 pixels. Alternate events on a deterministic four-second clock. TIMER expands to 150 by 32 pixels and shows a orange conic ring with a monospaced countdown. NOW PLAYING expands to 210 by 56 pixels and shows a 36px procedural orange/charcoal album square, two text lines, and three 3px #fa7319 equalizer bars with deterministic irregular bounce. Every expansion lasts 600ms: rise once to 108 percent of the target width near 68 percent progress, then settle with exactly one bounce. After the shell lands, wait 150ms and fade its content in over 150ms. Fade content away before the last 300ms of each cycle, collapse fully to the 90 by 24 pill with ease-in-out, swap the hidden content only at the cycle boundary, and then expand the other event so contents never cross-morph. Hovering a settled island scales the shell to 106 percent and lifts its contents one pixel. Use one native button with dynamic accessible labels, visible focus, a polite atomic status, capped requestAnimationFrame time, hidden-page and offscreen pause without catch-up, resize handling, and detach cleanup. In reduced motion, request no frames and show a settled event that activation switches instantly.`
});
