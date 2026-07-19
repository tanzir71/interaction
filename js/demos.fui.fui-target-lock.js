window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-target-lock',
  title:'FUI Target Lock',
  cat:'FUI & Terminal',
  rootClass:'d-fui-lock',
  tags:['fui','hud','cursor','targeting'],
  libs:[],
  desc:'A cursor-tracking HUD reticle that acquires drifting telemetry chips with staggered corner brackets and a typed geometry readout. Keyboard focus triggers the same lock sequence for an equally precise non-pointer path.',
  seen:'Seen on: Steve Lauda\'s FUI series and videogame targeting HUDs',
  hint:'hover or focus a target',
  html:`<div class="d-fui-lock" role="region" aria-label="Target acquisition interface">
  <div class="d-fui-lock-topbar"><span>INTRX / ACQUISITION</span><span class="d-fui-lock-tracking"><i class="d-fui-lock-tracking-dot"></i>TRACKING</span></div>
  <button class="d-fui-lock-chip d-fui-lock-chip-a" type="button" data-target="NODE-A1" aria-label="Lock target Node A1"><i class="d-fui-lock-chip-glow" aria-hidden="true"></i><span>NODE-A1</span><strong>VECTOR</strong><small>52.31 / 13.08</small></button>
  <button class="d-fui-lock-chip d-fui-lock-chip-b" type="button" data-target="SIG-04" aria-label="Lock target Signal 04"><i class="d-fui-lock-chip-glow" aria-hidden="true"></i><span>SIG-04</span><strong>UPLINK</strong><small>128.4 MHZ</small></button>
  <button class="d-fui-lock-chip d-fui-lock-chip-c" type="button" data-target="ARC-72" aria-label="Lock target Arc 72"><i class="d-fui-lock-chip-glow" aria-hidden="true"></i><span>ARC-72</span><strong>ORBIT</strong><small>ALT 412 KM</small></button>
  <button class="d-fui-lock-chip d-fui-lock-chip-d" type="button" data-target="GRID-F9" aria-label="Lock target Grid F9"><i class="d-fui-lock-chip-glow" aria-hidden="true"></i><span>GRID-F9</span><strong>CONTACT</strong><small>RANGE 08.2</small></button>
  <div class="d-fui-lock-reticle" aria-hidden="true"><i class="d-fui-lock-reticle-circle"></i><i class="d-fui-lock-reticle-h"></i><i class="d-fui-lock-reticle-v"></i><b class="d-fui-lock-reticle-dot"></b></div>
  <div class="d-fui-lock-brackets" aria-hidden="true"><i class="d-fui-lock-bracket d-fui-lock-bracket-tl"></i><i class="d-fui-lock-bracket d-fui-lock-bracket-tr"></i><i class="d-fui-lock-bracket d-fui-lock-bracket-bl"></i><i class="d-fui-lock-bracket d-fui-lock-bracket-br"></i></div>
  <output class="d-fui-lock-readout" aria-live="polite"></output>
  <div class="d-fui-lock-footer"><span>LERP 0.10</span><span class="d-fui-lock-state">SEEKING TARGET</span><span>SYS 04</span></div>
  <i class="d-fui-lock-scanline" aria-hidden="true"></i>
</div>`,
  css:`
.d-fui-lock{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate;cursor:crosshair}
.d-fui-lock:before{content:'';position:absolute;inset:0;z-index:-2;background-color:#0a0a0b;background-image:radial-gradient(circle,#232327 1px,transparent 1.2px);background-position:11px 11px;background-size:24px 24px}
.d-fui-lock:after{content:'';position:absolute;inset:0;z-index:8;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.02) 2px 3px),radial-gradient(circle at center,transparent 42%,rgba(0,0,0,.35) 100%)}
.d-fui-lock-topbar,.d-fui-lock-footer{position:absolute;z-index:7;left:14px;right:14px;height:18px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em;pointer-events:none}.d-fui-lock-topbar{top:7px}.d-fui-lock-footer{bottom:6px;border-top:1px solid #232327}.d-fui-lock-state{color:#9b9ba3}
.d-fui-lock-tracking{display:flex;align-items:center;gap:6px;color:#fa7319}.d-fui-lock-tracking-dot{width:5px;height:5px;border-radius:50%;background:#fa7319;box-shadow:0 0 10px rgba(250,115,25,.35);animation:d-fui-lock-activity 1.6s ease-in-out infinite}
.d-fui-lock-chip{position:absolute;z-index:2;width:128px;height:44px;box-sizing:border-box;margin:0;padding:7px 9px;border:1px solid #232327;border-radius:4px;background:#101012;color:#ececef;font:10px/1 'JetBrains Mono',monospace;letter-spacing:.08em;text-align:left;appearance:none;outline:none;cursor:crosshair;will-change:transform,border-color;transition:background 240ms cubic-bezier(.22,1,.36,1),border-color 240ms cubic-bezier(.22,1,.36,1)}
.d-fui-lock-chip:before,.d-fui-lock-chip:after{content:'';position:absolute;width:7px;height:7px;opacity:.55;transition:border-color 180ms cubic-bezier(.22,1,.36,1),opacity 180ms cubic-bezier(.22,1,.36,1)}.d-fui-lock-chip:before{left:3px;top:3px;border-left:1px solid #2e2e34;border-top:1px solid #2e2e34}.d-fui-lock-chip:after{right:3px;bottom:3px;border-right:1px solid #2e2e34;border-bottom:1px solid #2e2e34}
.d-fui-lock-chip span{color:#5c5c66;font-size:8px}.d-fui-lock-chip strong{float:right;color:#9b9ba3;font-size:8px;font-weight:500}.d-fui-lock-chip small{display:block;margin-top:7px;color:#ececef;font-size:9px;letter-spacing:.03em;font-variant-numeric:tabular-nums}
.d-fui-lock-chip-glow{position:absolute;inset:-1px;box-sizing:border-box;border:1px solid #fa7319;border-radius:4px;opacity:0;pointer-events:none}
.d-fui-lock-chip:hover,.d-fui-lock-chip:focus-visible,.d-fui-lock-chip.d-fui-lock-is-locked{background:#161619;border-color:#2e2e34}.d-fui-lock-chip:hover:before,.d-fui-lock-chip:hover:after,.d-fui-lock-chip:focus-visible:before,.d-fui-lock-chip:focus-visible:after,.d-fui-lock-chip.d-fui-lock-is-locked:before,.d-fui-lock-chip.d-fui-lock-is-locked:after{border-color:#fa7319;opacity:1}
.d-fui-lock-chip.d-fui-lock-is-locked{animation-play-state:paused!important}.d-fui-lock-chip.d-fui-lock-is-locked .d-fui-lock-chip-glow{animation:d-fui-lock-border-pulse 1.6s ease-in-out infinite}
.d-fui-lock-chip-a{left:22px;top:59px;animation:d-fui-lock-drift-a 5s cubic-bezier(.37,0,.63,1) infinite}.d-fui-lock-chip-b{right:22px;top:76px;animation:d-fui-lock-drift-b 6.2s cubic-bezier(.37,0,.63,1) infinite}.d-fui-lock-chip-c{left:50px;bottom:50px;animation:d-fui-lock-drift-c 7.1s cubic-bezier(.37,0,.63,1) infinite}.d-fui-lock-chip-d{right:48px;bottom:46px;animation:d-fui-lock-drift-d 8s cubic-bezier(.37,0,.63,1) infinite}
.d-fui-lock-reticle{position:absolute;z-index:3;left:0;top:0;width:42px;height:42px;pointer-events:none;will-change:transform}.d-fui-lock-reticle-circle{position:absolute;left:10px;top:10px;width:20px;height:20px;box-sizing:border-box;border:1px solid #5c5c66;border-radius:50%}.d-fui-lock-reticle-h,.d-fui-lock-reticle-v{position:absolute;background:#5c5c66;opacity:.8}.d-fui-lock-reticle-h{left:0;top:20px;width:42px;height:1px}.d-fui-lock-reticle-v{left:20px;top:0;width:1px;height:42px}.d-fui-lock-reticle-dot{position:absolute;left:19px;top:19px;width:3px;height:3px;background:#fa7319;box-shadow:0 0 8px rgba(250,115,25,.35)}
.d-fui-lock-brackets{position:absolute;z-index:5;inset:0;pointer-events:none}.d-fui-lock-bracket{position:absolute;left:0;top:0;width:10px;height:10px;box-sizing:border-box;opacity:0;will-change:transform,opacity}.d-fui-lock-bracket-tl{border-left:2px solid #fa7319;border-top:2px solid #fa7319}.d-fui-lock-bracket-tr{border-right:2px solid #fa7319;border-top:2px solid #fa7319}.d-fui-lock-bracket-bl{border-left:2px solid #fa7319;border-bottom:2px solid #fa7319}.d-fui-lock-bracket-br{border-right:2px solid #fa7319;border-bottom:2px solid #fa7319}
.d-fui-lock-readout{position:absolute;z-index:6;min-width:128px;height:18px;box-sizing:border-box;padding:5px 6px 3px;border-top:1px solid #fa7319;background:rgba(10,10,11,.88);color:#fa7319;font:8px/1 'JetBrains Mono',monospace;letter-spacing:.04em;opacity:0;pointer-events:none;transition:opacity 120ms linear;font-variant-numeric:tabular-nums}
.d-fui-lock-scanline{position:absolute;z-index:1;left:0;top:31px;width:1px;height:250px;background:#fa7319;box-shadow:0 0 8px rgba(250,115,25,.35);opacity:.16;pointer-events:none;animation:d-fui-lock-scan 6s linear infinite}
@keyframes d-fui-lock-activity{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-lock-scan{from{transform:translateX(0)}to{transform:translateX(100vw)}}
@keyframes d-fui-lock-drift-a{0%,100%{transform:translate3d(-3px,4px,0)}50%{transform:translate3d(3px,-2px,0)}}@keyframes d-fui-lock-drift-b{0%,100%{transform:translate3d(4px,-5px,0)}50%{transform:translate3d(-2px,1px,0)}}@keyframes d-fui-lock-drift-c{0%,100%{transform:translate3d(-4px,-2px,0)}50%{transform:translate3d(2px,4px,0)}}@keyframes d-fui-lock-drift-d{0%,100%{transform:translate3d(1px,5px,0)}50%{transform:translate3d(-5px,-1px,0)}}
@keyframes d-fui-lock-border-pulse{0%,100%{opacity:.05;box-shadow:0 0 12px rgba(250,115,25,.05)}50%{opacity:.2;box-shadow:0 0 12px rgba(250,115,25,.35)}}
@media(max-width:520px){.d-fui-lock-chip-a{left:14px}.d-fui-lock-chip-b{right:14px}.d-fui-lock-chip-c{left:25px}.d-fui-lock-chip-d{right:24px}}
@media(prefers-reduced-motion:reduce){.d-fui-lock *{animation:none!important;transition-duration:1ms!important}.d-fui-lock-chip.d-fui-lock-is-locked .d-fui-lock-chip-glow{opacity:.2;box-shadow:0 0 12px rgba(250,115,25,.2)}.d-fui-lock-scanline{left:50%;opacity:.16}.d-fui-lock-tracking-dot{opacity:1}}
`,
  js:`const chips=Array.from(root.querySelectorAll('.d-fui-lock-chip'));
const reticle=root.querySelector('.d-fui-lock-reticle');
const brackets=Array.from(root.querySelectorAll('.d-fui-lock-bracket'));
const readout=root.querySelector('.d-fui-lock-readout');
const stateLabel=root.querySelector('.d-fui-lock-state');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease='cubic-bezier(.22,1,.36,1)';
const hoverState=new WeakMap();
let target={x:root.clientWidth/2,y:root.clientHeight/2};
let current={x:target.x,y:target.y};
let active=null;
let token=0;
let typeTimer=0;
let locks=0;
let frames=0;
let bracketVisible=false;
root.dataset.chips=String(chips.length);
root.dataset.brackets=String(brackets.length);
root.dataset.lerp='0.1';
root.dataset.locked='false';
root.dataset.active='';
root.dataset.readout='';
root.dataset.locks='0';
root.dataset.frames='0';
root.dataset.source='pointer';
root.dataset.reduced=String(reduced);
function transform(point){return 'translate3d('+point.x.toFixed(2)+'px,'+point.y.toFixed(2)+'px,0)'}
function setReticle(){reticle.style.transform=transform({x:current.x-21,y:current.y-21})}
function reticlePoints(){return [{x:current.x-15,y:current.y-15},{x:current.x+5,y:current.y-15},{x:current.x-15,y:current.y+5},{x:current.x+5,y:current.y+5}]}
function capture(el,fallback){
  const value=getComputedStyle(el).transform;
  if(!value||value==='none')return fallback;
  const matrix=new DOMMatrixReadOnly(value);
  return {x:matrix.m41,y:matrix.m42};
}
function parkBrackets(){
  const points=reticlePoints();
  brackets.forEach(function(bracket,index){bracket.getAnimations().forEach(function(animation){animation.cancel()});bracket.style.transform=transform(points[index]);bracket.style.opacity='0'});
}
function fly(bracket,from,to,over,duration,delay,fade,runToken){
  bracket.getAnimations().forEach(function(animation){animation.cancel()});
  if(reduced){bracket.style.transform=transform(to);bracket.style.opacity=fade?'0':'1';return}
  const animation=bracket.animate([{transform:transform(from),opacity:fade?1:.35},{offset:.82,transform:transform(over),opacity:1},{transform:transform(to),opacity:fade?0:1}],{duration:duration,delay:delay,easing:ease,fill:'both'});
  animation.onfinish=function(){if(!root.isConnected||runToken!==token)return;bracket.style.transform=transform(to);bracket.style.opacity=fade?'0':'1';animation.cancel()};
}
function geometry(chip){
  const base=root.getBoundingClientRect();
  const rect=chip.getBoundingClientRect();
  return {x:Math.round(rect.left-base.left),y:Math.round(rect.top-base.top),w:Math.round(rect.width),h:Math.round(rect.height)};
}
function targetPoints(rect){return [{x:rect.x-3,y:rect.y-3},{x:rect.x+rect.w-7,y:rect.y-3},{x:rect.x-3,y:rect.y+rect.h-7},{x:rect.x+rect.w-7,y:rect.y+rect.h-7}]}
function typeGeometry(text,runToken){
  clearTimeout(typeTimer);
  readout.textContent='';
  root.dataset.readout='';
  readout.style.opacity='1';
  if(reduced){readout.textContent=text;root.dataset.readout=text;return}
  let index=0;
  function next(){
    if(!root.isConnected||runToken!==token)return;
    readout.textContent=text.slice(0,index+1);
    index++;
    if(index<text.length)typeTimer=setTimeout(next,20);
    else root.dataset.readout=text;
  }
  next();
}
function lock(chip,source){
  if(active===chip)return;
  const runToken=++token;
  clearTimeout(typeTimer);
  if(active)active.classList.remove('d-fui-lock-is-locked');
  active=chip;
  chip.classList.add('d-fui-lock-is-locked');
  const rect=geometry(chip);
  const starts=bracketVisible?brackets.map(function(bracket,index){return capture(bracket,reticlePoints()[index])}):reticlePoints();
  const ends=targetPoints(rect);
  const directions=[{x:-4,y:-4},{x:4,y:-4},{x:-4,y:4},{x:4,y:4}];
  brackets.forEach(function(bracket,index){fly(bracket,starts[index],ends[index],{x:ends[index].x+directions[index].x,y:ends[index].y+directions[index].y},260,index*30,false,runToken)});
  bracketVisible=true;
  const readoutX=Math.max(6,Math.min(root.clientWidth-134,rect.x));
  const readoutY=Math.min(root.clientHeight-29,rect.y+rect.h+7);
  readout.style.left=readoutX+'px';
  readout.style.top=readoutY+'px';
  const text='W:'+rect.w+' H:'+rect.h+' X:'+rect.x+' Y:'+rect.y;
  typeGeometry(text,runToken);
  locks++;
  root.dataset.locked='true';
  root.dataset.active=chip.dataset.target;
  root.dataset.locks=String(locks);
  root.dataset.source=source;
  stateLabel.textContent='LOCK / '+chip.dataset.target;
}
function unlock(chip){
  if(active!==chip)return;
  const runToken=++token;
  clearTimeout(typeTimer);
  const starts=brackets.map(function(bracket,index){return capture(bracket,targetPoints(geometry(chip))[index])});
  const ends=reticlePoints();
  chip.classList.remove('d-fui-lock-is-locked');
  active=null;
  brackets.forEach(function(bracket,index){fly(bracket,starts[index],ends[index],ends[index],200,0,true,runToken)});
  bracketVisible=false;
  readout.style.opacity='0';
  root.dataset.locked='false';
  root.dataset.active='';
  root.dataset.readout='';
  stateLabel.textContent='SEEKING TARGET';
  setTimeout(function(){if(root.isConnected&&runToken===token)readout.textContent=''},200);
}
function maybeUnlock(chip){const state=hoverState.get(chip);if(state&&!state.hover&&!state.focus)unlock(chip)}
root.addEventListener('pointermove',function(event){
  const rect=root.getBoundingClientRect();
  target.x=Math.max(21,Math.min(rect.width-21,event.clientX-rect.left));
  target.y=Math.max(31,Math.min(rect.height-27,event.clientY-rect.top));
  if(reduced&&!active){current.x=target.x;current.y=target.y;setReticle();parkBrackets()}
},{passive:true});
chips.forEach(function(chip){
  const state={hover:false,focus:false};hoverState.set(chip,state);
  chip.addEventListener('pointerenter',function(){state.hover=true;lock(chip,'pointer')});
  chip.addEventListener('pointerleave',function(){state.hover=false;maybeUnlock(chip)});
  chip.addEventListener('focus',function(){state.focus=true;lock(chip,'keyboard')});
  chip.addEventListener('blur',function(){state.focus=false;maybeUnlock(chip)});
  chip.addEventListener('keydown',function(event){if(event.key==='Escape'){state.focus=false;chip.blur();unlock(chip)}});
});
function frame(){
  if(!root.isConnected)return;
  if(!active){current.x+=(target.x-current.x)*.1;current.y+=(target.y-current.y)*.1;setReticle()}
  frames++;
  if(frames%10===0)root.dataset.frames=String(frames);
  requestAnimationFrame(frame);
}
setReticle();
parkBrackets();
if(!reduced)requestAnimationFrame(frame);`,
  prompt:`Build a self-contained 320px-tall FUI target-acquisition stage using JetBrains Mono and only the dark palette #0a0a0b, #101012, #161619, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, and accent #fa7319. Use 4px hard-tech surfaces, scanlines, small corner ticks, and a faint dot grid with an exact 24px pitch. Keep one accent tracking light visibly active while idle.

Place exactly four 128 by 44px telemetry chip buttons around the stage. Drift them no farther than plus or minus 6px on distinct sine-like ease-in-out loops lasting 5 to 8 seconds. At center, draw a reticle from two crossed 1px hairlines and a 20px circular ring in muted text gray, plus a tiny accent center dot. While idle, follow root-local pointer coordinates with one requestAnimationFrame loop and the exact smoothing formula current += (target - current) times 0.1.

Hovering or keyboard-focusing a chip must pause that chip at its current drift position and acquire it with one shared set of four L-shaped corner brackets. Each bracket is exactly 10 by 10px with two 2px accent borders. Animate the brackets from the reticle corners to the measured chip corners over 260ms using cubic-bezier(0.22,1,0.36,1), stagger them by 30ms, move each 4px outward beyond its destination, then settle. Type a root-local geometry line in the form W:128 H:44 X:.. Y:.. beneath the chip at 20ms per character. The locked chip keeps a 1px accent glow border whose alpha pulses from 5 percent to 20 percent on a 1.6 second loop. On pointer leave or blur, return all brackets to the reticle and fade them over exactly 200ms, clear the readout, and resume drift.

Use transform and opacity animation, one self-stopping animation-frame loop, passive pointer tracking, cancellation tokens for rapid target switching, and root.isConnected checks before continued frames or timers. Make all chips native buttons with visible focus feedback and expose lock state through a polite live output. Under prefers-reduced-motion, stop drift, scan, glow pulse, and continuous cursor smoothing; snap the reticle and brackets immediately and reveal the complete readout without typewriter delay while keeping hover and keyboard state changes understandable.`
});
