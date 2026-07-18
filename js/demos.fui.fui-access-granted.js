window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-access-granted',
  title:'FUI Access Granted',
  cat:'FUI & Terminal',
  rootClass:'d-fui-auth',
  tags:['fui','authorization','terminal','security'],
  libs:[],
  desc:'A deterministic authorization target choreographs broken fingerprint arcs, twin scans, a machine-speed hash, and a restrained grant or denial stamp. Every fourth run rejects, making both semantic outcomes available without sacrificing the cinematic FUI cadence.',
  seen:'Seen in movie FUI authorization sequences and hacker-terminal interface tropes',
  hint:'click to authenticate',
  html:`<div class="d-fui-auth" role="region" aria-label="Interactive authorization terminal" aria-busy="false">
  <header class="d-fui-auth-topbar"><span>INTRX / IDENTITY GATE</span><span class="d-fui-auth-live"><i class="d-fui-auth-live-dot"></i>SECURE LINK</span></header>
  <button class="d-fui-auth-panel" type="button" aria-label="Begin authorization scan" aria-disabled="false">
    <i class="d-fui-auth-corner d-fui-auth-corner-tl"></i><i class="d-fui-auth-corner d-fui-auth-corner-tr"></i><i class="d-fui-auth-corner d-fui-auth-corner-bl"></i><i class="d-fui-auth-corner d-fui-auth-corner-br"></i>
    <span class="d-fui-auth-panel-head"><span>BIOMETRIC / NODE 07</span><span class="d-fui-auth-mode">STANDBY</span></span>
    <span class="d-fui-auth-core">
      <svg class="d-fui-auth-glyph" viewBox="0 0 160 160" aria-hidden="true">
        <circle class="d-fui-auth-arc d-fui-auth-arc-1" cx="80" cy="80" r="20"></circle>
        <circle class="d-fui-auth-arc d-fui-auth-arc-2" cx="80" cy="80" r="31"></circle>
        <circle class="d-fui-auth-arc d-fui-auth-arc-3" cx="80" cy="80" r="42"></circle>
        <circle class="d-fui-auth-arc d-fui-auth-arc-4" cx="80" cy="80" r="53"></circle>
        <circle class="d-fui-auth-arc d-fui-auth-arc-5" cx="80" cy="80" r="64"></circle>
        <circle class="d-fui-auth-center" cx="80" cy="80" r="4"></circle>
      </svg>
      <span class="d-fui-auth-label">AWAITING AUTH</span>
    </span>
    <span class="d-fui-auth-hash-wrap"><span>HASH / </span><span class="d-fui-auth-hash"></span></span>
    <span class="d-fui-auth-stamp"></span>
    <i class="d-fui-auth-sweep" aria-hidden="true"></i>
  </button>
  <footer class="d-fui-auth-footer"><span>AES-256</span><span>16 CHAR TOKEN</span><span>1 IN 4 DENIED</span><span class="d-fui-auth-state">READY</span></footer>
  <i class="d-fui-auth-stage-line" aria-hidden="true"></i>
</div><span class="d-fui-auth-announcement" aria-live="polite" aria-atomic="true"></span>`,
  css:`
.d-fui-auth{position:relative;width:100%;height:320px;box-sizing:border-box;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 12px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-auth:before{content:'';position:absolute;inset:0;z-index:12;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.02) 2px 3px),radial-gradient(circle at center,transparent 52%,rgba(0,0,0,.35) 100%)}
.d-fui-auth-topbar,.d-fui-auth-footer{position:relative;z-index:13;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-auth-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-fui-auth-live-dot{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.35);animation:d-fui-auth-live-pulse 1.6s ease-in-out infinite}
.d-fui-auth-panel{position:relative;z-index:2;display:block;width:100%;min-height:0;overflow:hidden;box-sizing:border-box;padding:0;border:1px solid #232327;border-radius:4px;background:#101012;color:inherit;font:inherit;text-align:inherit;appearance:none;cursor:pointer;outline:none}.d-fui-auth-panel:focus-visible{box-shadow:inset 0 0 0 2px rgba(167,139,250,.45)}.d-fui-auth-panel-head{position:absolute;z-index:8;left:10px;right:10px;top:8px;display:flex;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-auth-mode{color:#9b9ba3}
.d-fui-auth-core{position:absolute;z-index:3;left:50%;top:30px;width:150px;display:flex;flex-direction:column;align-items:center;transform:translateX(-50%)}.d-fui-auth-glyph{display:block;width:128px;height:128px;overflow:visible;transform-origin:50% 50%;will-change:transform}.d-fui-auth-arc{fill:none;stroke:#5c5c66;stroke-width:2.5;stroke-linecap:square;transform-origin:80px 80px}.d-fui-auth-arc-1{stroke-dasharray:18 8;transform:rotate(12deg)}.d-fui-auth-arc-2{stroke-dasharray:26 11;transform:rotate(-21deg)}.d-fui-auth-arc-3{stroke-dasharray:34 14;transform:rotate(34deg)}.d-fui-auth-arc-4{stroke-dasharray:42 17;transform:rotate(-9deg)}.d-fui-auth-arc-5{stroke-dasharray:52 21;transform:rotate(23deg)}.d-fui-auth-center{fill:#a78bfa}.d-fui-auth-label{margin-top:2px;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;animation:d-fui-auth-await 1.4s ease-in-out infinite}.d-fui-auth.d-fui-auth-is-active .d-fui-auth-arc{stroke:#a78bfa}.d-fui-auth.d-fui-auth-is-active .d-fui-auth-label{color:#a78bfa;animation:none}.d-fui-auth.d-fui-auth-has-result .d-fui-auth-glyph{opacity:.18}.d-fui-auth.d-fui-auth-has-result .d-fui-auth-label{opacity:0}
.d-fui-auth-hash-wrap{position:absolute;z-index:5;left:12px;right:12px;bottom:18px;display:flex;justify-content:center;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-auth-hash{min-width:118px;color:#ececef;font:12px/1 'JetBrains Mono',monospace;letter-spacing:.06em;font-variant-numeric:tabular-nums}.d-fui-auth-stamp{position:absolute;z-index:7;left:50%;top:48%;color:#4ade80;font:500 26px/1 'JetBrains Mono',monospace;letter-spacing:.03em;white-space:nowrap;opacity:0;transform:translate(-50%,-50%) scale(1.6);transform-origin:50% 50%;will-change:transform,opacity,text-shadow}.d-fui-auth-stamp.d-fui-auth-is-granted{color:#4ade80}.d-fui-auth-stamp.d-fui-auth-is-denied{color:#f87171}.d-fui-auth-stamp.d-fui-auth-is-split{text-shadow:-2px 0 #67e8f9,2px 0 #f87171}
.d-fui-auth-sweep{position:absolute;z-index:6;left:0;right:0;top:0;height:1px;background:#a78bfa;box-shadow:0 0 12px rgba(167,139,250,.35);opacity:0;will-change:transform,opacity}.d-fui-auth-footer{border-top:1px solid #232327}.d-fui-auth-state{color:#4ade80}.d-fui-auth.d-fui-auth-is-active .d-fui-auth-state{color:#a78bfa}.d-fui-auth.d-fui-auth-is-denied .d-fui-auth-state{color:#f87171}
.d-fui-auth-corner{position:absolute;z-index:9;width:8px;height:8px;pointer-events:none}.d-fui-auth-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-auth-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-auth-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-auth-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-auth.d-fui-auth-is-active .d-fui-auth-corner{border-color:#a78bfa}
.d-fui-auth-announcement{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.d-fui-auth-stage-line{position:absolute;z-index:11;left:13px;right:13px;top:31px;height:1px;background:#a78bfa;opacity:.06;pointer-events:none;animation:d-fui-auth-stage-drift 5.2s linear infinite}
@keyframes d-fui-auth-live-pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-auth-await{0%,100%{opacity:.32}50%{opacity:1}}@keyframes d-fui-auth-stage-drift{from{transform:translateY(0)}to{transform:translateY(256px)}}
@media(max-width:520px){.d-fui-auth{padding-inline:8px}.d-fui-auth-footer span:nth-child(2){display:none}.d-fui-auth-stamp{font-size:26px}}
@media(prefers-reduced-motion:reduce){.d-fui-auth *{animation:none!important;transition:none!important}.d-fui-auth-live-dot,.d-fui-auth-label{opacity:1}.d-fui-auth-stage-line{top:160px}}
`,
  js:`const panel=root.querySelector('.d-fui-auth-panel');
const glyph=root.querySelector('.d-fui-auth-glyph');
const arcs=[...root.querySelectorAll('.d-fui-auth-arc')];
const label=root.querySelector('.d-fui-auth-label');
const modeLabel=root.querySelector('.d-fui-auth-mode');
const hashNode=root.querySelector('.d-fui-auth-hash');
const stamp=root.querySelector('.d-fui-auth-stamp');
const sweep=root.querySelector('.d-fui-auth-sweep');
const stateLabel=root.querySelector('.d-fui-auth-state');
const announcement=stage.querySelector('.d-fui-auth-announcement');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const spinDuration=600;
const scanDuration=400;
const scanPasses=2;
const hashDelay=18;
const stampDuration=220;
const borderDuration=800;
const shakeDistance=6;
const shakeCycles=3;
const shakeDuration=300;
const resultAt=800;
const resetDelay=3000;
let phase='idle';
let run=0;
let outcome='';
let fullHash='';
let typed=0;
let elapsed=0;
let rotation=0;
let scanPass=0;
let scansCompleted=0;
let stampScale=1;
let shakeX=0;
let borderAlpha=0;
let frames=0;
let flickers=0;
let flickerFrame=-1;
let landed=false;
let ignored=0;
let resets=0;
let token=0;
let visible=true;
let running=false;
let last=0;
let observer=null;
let resetTimer=0;
root.dataset.spinDuration=String(spinDuration);
root.dataset.spinEasing='cubic-bezier(0.65,0,0.35,1)';
root.dataset.scanDuration=String(scanDuration);
root.dataset.scanPasses=String(scanPasses);
root.dataset.hashDelay=String(hashDelay);
root.dataset.stampDuration=String(stampDuration);
root.dataset.stampEasing='cubic-bezier(0.22,1,0.36,1)';
root.dataset.borderDuration=String(borderDuration);
root.dataset.shakeDistance=String(shakeDistance);
root.dataset.shakeCycles=String(shakeCycles);
root.dataset.shakeDuration=String(shakeDuration);
root.dataset.resetDelay=String(resetDelay);
root.dataset.denyEvery='4';
root.dataset.reduced=String(reduced);
function mulberry32(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let value=Math.imul(seed^seed>>>15,1|seed);value=value+Math.imul(value^value>>>7,61|value)^value;return ((value^value>>>14)>>>0)/4294967296}}
function makeHash(number){const random=mulberry32((0xA117C0DE^Math.imul(number,0x9E3779B9))>>>0);let value='';for(let index=0;index<16;index++)value+=Math.floor(random()*16).toString(16).toUpperCase();return value}
function bezier(progress,x1,y1,x2,y2){
  const p=Math.max(0,Math.min(1,progress));
  const curve=function(t,a,b){const c=3*a;const d=3*(b-a)-c;const e=1-c-d;return ((e*t+d)*t+c)*t};
  const slope=function(t,a,b){const c=3*a;const d=3*(b-a)-c;const e=1-c-d;return (3*e*t+2*d)*t+c};
  let t=p;
  for(let index=0;index<5;index++){const difference=curve(t,x1,x2)-p;const speed=slope(t,x1,x2);if(Math.abs(speed)<.000001)break;t=Math.max(0,Math.min(1,t-difference/speed))}
  return curve(t,y1,y2);
}
function expose(source){
  root.dataset.phase=phase;
  root.dataset.run=String(run);
  root.dataset.outcome=outcome;
  root.dataset.hashLength=String(typed);
  root.dataset.hash=fullHash;
  root.dataset.elapsed=elapsed.toFixed(0);
  root.dataset.rotation=rotation.toFixed(2);
  root.dataset.scanPass=String(scanPass);
  root.dataset.scansCompleted=String(scansCompleted);
  root.dataset.stampScale=stampScale.toFixed(3);
  root.dataset.shakeX=shakeX.toFixed(2);
  root.dataset.borderAlpha=borderAlpha.toFixed(3);
  root.dataset.frames=String(frames);
  root.dataset.flickers=String(flickers);
  root.dataset.flickerActive=String(stamp.classList.contains('d-fui-auth-is-split'));
  root.dataset.ignored=String(ignored);
  root.dataset.resets=String(resets);
  root.dataset.running=String(running);
  root.dataset.source=source;
}
function clearFeedback(){
  root.classList.remove('d-fui-auth-is-active','d-fui-auth-has-result','d-fui-auth-is-granted','d-fui-auth-is-denied');
  stamp.className='d-fui-auth-stamp';
  stamp.textContent='';
  stamp.style.opacity='0';
  stamp.style.transform='translate(-50%,-50%) scale(1.6)';
  glyph.style.transform='rotate(0deg)';
  sweep.style.opacity='0';
  sweep.style.transform='translateY(0)';
  hashNode.textContent='';
  panel.style.borderColor='#232327';
  panel.style.boxShadow='';
}
function reset(source){
  clearTimeout(resetTimer);
  resetTimer=0;
  token++;
  phase='idle';
  outcome='';
  fullHash='';
  typed=0;
  elapsed=0;
  rotation=0;
  scanPass=0;
  scansCompleted=0;
  stampScale=1;
  shakeX=0;
  borderAlpha=0;
  landed=false;
  flickerFrame=-1;
  running=false;
  clearFeedback();
  label.textContent='AWAITING AUTH';
  modeLabel.textContent='STANDBY';
  stateLabel.textContent='READY';
  panel.setAttribute('aria-label','Begin authorization scan');
  panel.setAttribute('aria-disabled','false');
  root.setAttribute('aria-busy','false');
  announcement.textContent='Awaiting authorization.';
  if(source==='auto')resets++;
  expose(source);
}
function showResult(instant){
  phase='result';
  root.setAttribute('aria-busy','false');
  typed=16;
  hashNode.textContent=fullHash;
  scanPass=2;
  scansCompleted=2;
  sweep.style.opacity='0';
  root.classList.add('d-fui-auth-has-result');
  stamp.classList.add(outcome==='granted'?'d-fui-auth-is-granted':'d-fui-auth-is-denied');
  stamp.textContent=outcome==='granted'?'ACCESS GRANTED':'ACCESS DENIED';
  stamp.style.opacity='1';
  stampScale=instant?1:1.6;
  stamp.style.transform='translate(-50%,-50%) scale('+stampScale+')';
  modeLabel.textContent=outcome==='granted'?'VERIFIED':'REJECTED';
  stateLabel.textContent=outcome==='granted'?'GRANTED':'DENIED';
  panel.setAttribute('aria-label',outcome==='granted'?'Access granted':'Access denied');
  root.classList.toggle('d-fui-auth-is-granted',outcome==='granted');
  root.classList.toggle('d-fui-auth-is-denied',outcome==='denied');
  announcement.textContent=outcome==='granted'?'Access granted.':'Access denied.';
  if(instant){
    rotation=360;
    glyph.style.transform='rotate(360deg)';
    borderAlpha=0;
    const currentToken=token;
    resetTimer=setTimeout(function(){if(root.isConnected&&token===currentToken&&phase==='result')reset('auto')},resetDelay);
  }
}
function begin(source){
  if(phase!=='idle'){ignored++;expose('ignored');return}
  clearFeedback();
  token++;
  run++;
  outcome=run%4===0?'denied':'granted';
  fullHash=makeHash(run);
  typed=0;
  elapsed=0;
  rotation=0;
  scanPass=1;
  scansCompleted=0;
  stampScale=1.6;
  shakeX=0;
  borderAlpha=0;
  landed=false;
  flickerFrame=-1;
  phase='authenticating';
  root.classList.add('d-fui-auth-is-active');
  label.textContent='SCANNING CREDENTIAL';
  modeLabel.textContent='AUTH RUN '+String(run).padStart(2,'0');
  stateLabel.textContent='SCANNING';
  panel.setAttribute('aria-label','Authorization scan in progress');
  panel.setAttribute('aria-disabled','true');
  root.setAttribute('aria-busy','true');
  announcement.textContent='Authorization scan started.';
  expose(source);
  if(reduced){elapsed=resultAt;rotation=360;hashNode.textContent=fullHash;root.classList.add('d-fui-auth-is-active');showResult(true);root.setAttribute('aria-busy','false');running=false;expose('reduced result')}
  else start();
}
function start(){if(reduced||!visible||running||phase==='idle'||!root.isConnected)return;running=true;last=performance.now();requestAnimationFrame(frame)}
function updateAuthentication(){
  const spinProgress=Math.min(1,elapsed/spinDuration);
  rotation=360*bezier(spinProgress,.65,0,.35,1);
  glyph.style.transform='rotate('+rotation.toFixed(2)+'deg)';
  typed=Math.min(16,Math.floor(elapsed/hashDelay));
  hashNode.textContent=fullHash.slice(0,typed);
  if(elapsed<scanDuration*scanPasses){
    scanPass=Math.min(2,Math.floor(elapsed/scanDuration)+1);
    scansCompleted=Math.floor(elapsed/scanDuration);
    const local=(elapsed%scanDuration)/scanDuration;
    sweep.style.opacity='1';
    sweep.style.transform='translateY('+(local*Math.max(1,panel.clientHeight-1)).toFixed(1)+'px)';
  }else{sweep.style.opacity='0';scanPass=2;scansCompleted=2}
  if(elapsed>=resultAt)showResult(false);
}
function updateResult(){
  const age=Math.max(0,elapsed-resultAt);
  if(flickerFrame>=0&&frames>flickerFrame){stamp.classList.remove('d-fui-auth-is-split');flickerFrame=-1}
  if(outcome==='granted'){
    const progress=Math.min(1,age/stampDuration);
    stampScale=1.6-.6*bezier(progress,.22,1,.36,1);
    stamp.style.transform='translate(-50%,-50%) scale('+stampScale.toFixed(3)+')';
    if(age>=stampDuration&&!landed){landed=true;flickers++;flickerFrame=frames;stamp.classList.add('d-fui-auth-is-split')}
    if(age>=stampDuration){
      const decay=Math.min(1,(age-stampDuration)/borderDuration);
      borderAlpha=.4*(1-decay);
      panel.style.borderColor=borderAlpha>0?'rgba(74,222,128,'+borderAlpha.toFixed(3)+')':'#232327';
      panel.style.boxShadow=borderAlpha>0?'0 0 12px rgba(74,222,128,'+(borderAlpha*.85).toFixed(3)+')':'none';
    }
  }else{
    const progress=Math.min(1,age/shakeDuration);
    shakeX=age<shakeDuration?Math.sin(progress*shakeCycles*Math.PI*2)*shakeDistance:0;
    stampScale=1;
    stamp.style.transform='translate(calc(-50% + '+shakeX.toFixed(2)+'px),-50%) scale(1)';
  }
  if(age>=resetDelay){reset('auto');return false}
  return true;
}
function frame(now){
  if(!root.isConnected){running=false;if(observer)observer.disconnect();return}
  if(!visible){running=false;return}
  const delta=Math.min(50,Math.max(0,now-last));
  last=now;
  elapsed+=delta;
  frames++;
  if(phase==='authenticating')updateAuthentication();
  if(phase==='result'&&!updateResult())return;
  expose(phase);
  requestAnimationFrame(frame);
}
panel.addEventListener('click',function(){begin('pointer')});
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start()},{threshold:.05});observer.observe(root)}
reset('initial')`,
  prompt:`Build a self-contained 320px-tall fictional authorization terminal using JetBrains Mono and only #0a0a0b, #101012, #161619, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, accent #a78bfa, info #67e8f9, success #4ade80, warning #fbbf24, and error #f87171. Use a 4px-radius hard-tech panel, four 8px corner ticks, FUI scanlines, a persistent accent readiness dot, 10px uppercase labels with 0.08em tracking, 12px tabular hash data, and one exact 26px weight-500 result stamp.

The authorization target must be a native button. Idle shows at least five concentric broken SVG arcs in #5c5c66 around an accent center and AWAITING AUTH blinking on an exact 1.4-second cycle. On activation, ignore further activations until reset, set aria-busy true, turn arcs accent, and rotate the glyph 0→360 degrees over exactly 600ms using cubic-bezier(0.65,0,0.35,1). At the same time, move one exact 1px accent scanline across the panel twice at exactly 400ms per pass and type a deterministic uppercase 16-character hexadecimal hash at exactly 18ms per character. Reveal the result at 800ms.

Guarantee exactly one denial in every four runs with runNumber modulo 4: three grants followed by one denial. ACCESS GRANTED uses #4ade80 and scales 1.6→1 over exactly 220ms with cubic-bezier(0.22,1,0.36,1). On its landing frame, apply one painted-frame text split using only #67e8f9 and #f87171 shadows, then flash the panel border with #4ade80 at 40% and decay it over exactly 800ms. ACCESS DENIED uses #f87171 and shakes horizontally at 6px amplitude for exactly three cycles over 300ms. Hold either semantic result for exactly 3 seconds from its reveal, then reset to idle without moving focus.

Drive the normal sequence from one root-disconnecting, visibility-aware active-time requestAnimationFrame loop with a capped delta so offscreen time never fast-forwards. Expose exact duration and state metadata for verification. Keep rapid hash output out of live regions; use one polite announcement for scan start, grant, denial, and reset. Keep the busy native button focusable with aria-disabled plus a JavaScript phase guard. Under prefers-reduced-motion, blink nothing and run no frame loop: activation instantly shows the full hash, accent arcs, and predetermined result with no spin, sweeps, typing, stamp scale, shake, split, or border decay; use one token-guarded 3-second timeout for the semantic hold, then reset instantly.`
});
