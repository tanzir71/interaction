window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-terminal-boot',
  title:'FUI Terminal Boot',
  cat:'FUI & Terminal',
  rootClass:'d-fui-boot',
  tags:['fui','terminal','boot','state-machine'],
  libs:[],
  desc:'A compact fictional boot console emits, resolves, and clears fourteen device mounts through a cancellation-safe loop. Seeded timing keeps the terminal organic while preserving a reproducible inspection state.',
  seen:'Seen on: Thijs\' tmux-ide teasers and terminal-aesthetic interface accounts',
  hint:'watch the boot cycle',
  html:`<div class="d-fui-boot" role="region" aria-label="Fictional system boot terminal">
  <header class="d-fui-boot-topbar"><span>INTRX / BOOT SEQUENCE</span><span class="d-fui-boot-link"><i class="d-fui-boot-link-dot"></i>LOCAL BUS</span></header>
  <section class="d-fui-boot-screen" aria-label="Boot output">
    <i class="d-fui-boot-corner d-fui-boot-corner-tl"></i><i class="d-fui-boot-corner d-fui-boot-corner-tr"></i><i class="d-fui-boot-corner d-fui-boot-corner-bl"></i><i class="d-fui-boot-corner d-fui-boot-corner-br"></i>
    <div class="d-fui-boot-screen-inner"><div class="d-fui-boot-lines"></div></div>
  </section>
  <footer class="d-fui-boot-footer">
    <div class="d-fui-boot-progress-head"><span class="d-fui-boot-phase">INITIALIZING</span><span class="d-fui-boot-count">00 / 14</span></div>
    <div class="d-fui-boot-progress-row"><output class="d-fui-boot-progress" aria-label="Boot progress">░░░░░░░░░░░░░░░░░░░░░░░░</output><i class="d-fui-boot-cursor" aria-hidden="true">▮</i></div>
  </footer>
  <span class="d-fui-boot-announcement" aria-live="polite">Boot sequence initialized</span>
  <i class="d-fui-boot-scanline" aria-hidden="true"></i>
</div>`,
  css:`
.d-fui-boot{position:relative;width:100%;height:320px;box-sizing:border-box;display:grid;grid-template-rows:18px minmax(0,1fr) 40px;gap:4px;overflow:hidden;padding:8px 12px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-boot:before{content:'';position:absolute;inset:0;z-index:7;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.02) 2px 3px),radial-gradient(circle at center,transparent 52%,rgba(0,0,0,.35) 100%)}
.d-fui-boot-topbar{z-index:2;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}.d-fui-boot-link{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-fui-boot-link-dot{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.35);animation:d-fui-boot-link-pulse 1.6s ease-in-out infinite}
.d-fui-boot-screen{position:relative;z-index:2;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:4px;background:#101012}.d-fui-boot-screen-inner{width:100%;height:100%;box-sizing:border-box;padding:5px 9px;will-change:transform,opacity}.d-fui-boot-lines{display:grid;grid-auto-rows:15px;color:#9b9ba3;font-size:12px;line-height:15px;font-variant-numeric:tabular-nums;white-space:nowrap}
.d-fui-boot-line{height:15px;min-width:0;overflow:hidden;color:#9b9ba3;opacity:1;transform:translateY(0);animation:d-fui-boot-line-in 120ms cubic-bezier(.22,1,.36,1) both}.d-fui-boot-line span{color:#5c5c66}.d-fui-boot-line b{display:inline-block;min-width:31px;color:#5c5c66;font-weight:500}.d-fui-boot-line b.d-fui-boot-ok{color:#4ade80}.d-fui-boot-line b.d-fui-boot-warn{color:#fbbf24}.d-fui-boot-line.d-fui-boot-ready{color:#a78bfa;font-weight:500;letter-spacing:.08em}.d-fui-boot-line.d-fui-boot-ready span{color:#a78bfa}
.d-fui-boot-corner{position:absolute;z-index:3;width:8px;height:8px;pointer-events:none}.d-fui-boot-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-boot-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-boot-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-boot-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}
.d-fui-boot-footer{position:relative;z-index:2;display:grid;grid-template-rows:12px 22px;gap:2px}.d-fui-boot-progress-head{display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:8px;line-height:1;letter-spacing:.08em}.d-fui-boot-phase{color:#9b9ba3}.d-fui-boot-progress-row{display:flex;align-items:center;gap:7px;min-width:0;border-top:1px solid #232327}.d-fui-boot-progress{color:#a78bfa;font:12px/1 'JetBrains Mono',monospace;letter-spacing:1px;white-space:nowrap}.d-fui-boot-cursor{color:#a78bfa;font:12px/1 'JetBrains Mono',monospace;animation:d-fui-boot-cursor-blink 530ms steps(1,end) infinite}
.d-fui-boot-announcement{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.d-fui-boot-scanline{position:absolute;z-index:6;left:13px;right:13px;top:31px;height:1px;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.35);opacity:.1;pointer-events:none;animation:d-fui-boot-scan 4.8s linear infinite}
.d-fui-boot.d-fui-boot-is-wiping .d-fui-boot-screen-inner{animation:d-fui-boot-wipe 250ms cubic-bezier(.65,0,.35,1) forwards}.d-fui-boot.d-fui-boot-is-ready .d-fui-boot-corner{border-color:#a78bfa}.d-fui-boot.d-fui-boot-is-ready .d-fui-boot-phase{color:#a78bfa}
@keyframes d-fui-boot-link-pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-boot-cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}}@keyframes d-fui-boot-line-in{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}@keyframes d-fui-boot-scan{from{transform:translateY(0)}to{transform:translateY(238px)}}@keyframes d-fui-boot-wipe{to{transform:translateY(-100%);opacity:0}}
@media(max-width:520px){.d-fui-boot{padding-inline:8px}.d-fui-boot-screen-inner{padding-inline:6px}.d-fui-boot-progress{letter-spacing:.5px}}
@media(prefers-reduced-motion:reduce){.d-fui-boot *{animation:none!important;transition:none!important}.d-fui-boot-link-dot,.d-fui-boot-cursor{opacity:1}.d-fui-boot-scanline{top:160px}.d-fui-boot-line{opacity:1;transform:none}}
`,
  js:`const screen=root.querySelector('.d-fui-boot-screen');
const linesNode=root.querySelector('.d-fui-boot-lines');
const progress=root.querySelector('.d-fui-boot-progress');
const phaseNode=root.querySelector('.d-fui-boot-phase');
const countNode=root.querySelector('.d-fui-boot-count');
const announcement=root.querySelector('.d-fui-boot-announcement');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const totalLines=14;
const progressLength=24;
let token=0;
let timers=new Set();
let emitted=0;
let resolved=0;
let warnings=0;
let cycles=0;
let events=0;
let jitters=0;
let phase='initializing';
let random=Math.random;
let schedule=[];
let warningIndex=0;
let jitterIndex=0;
let emissionDelays=[];
let resolutionDelays=[];
root.dataset.total=String(totalLines);
root.dataset.progressLength=String(progressLength);
root.dataset.readyHold='2500';
root.dataset.wipeDuration='250';
root.dataset.cursorBlink='530';
root.dataset.reduced=String(reduced);
function mulberry32(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let value=Math.imul(seed^seed>>>15,1|seed);value=value+Math.imul(value^value>>>7,61|value)^value;return ((value^value>>>14)>>>0)/4294967296}}
function clearTimers(){timers.forEach(clearTimeout);timers.clear();token++}
function later(fn,delay,mine){
  const timer=setTimeout(function(){timers.delete(timer);if(root.isConnected&&mine===token)fn()},delay);
  timers.add(timer);
}
function expose(source){
  root.dataset.phase=phase;
  root.dataset.emitted=String(emitted);
  root.dataset.resolved=String(resolved);
  root.dataset.lines=String(linesNode.querySelectorAll('.d-fui-boot-line:not(.d-fui-boot-ready)').length);
  root.dataset.progress=String(Math.round(resolved/totalLines*progressLength));
  root.dataset.warnings=String(warnings);
  root.dataset.cycles=String(cycles);
  root.dataset.events=String(events);
  root.dataset.jitters=String(jitters);
  root.dataset.emissionDelays=emissionDelays.join(',');
  root.dataset.resolutionDelays=resolutionDelays.join(',');
  root.dataset.warningIndex=String(warningIndex);
  root.dataset.jitterIndex=String(jitterIndex);
  root.dataset.source=source;
  phaseNode.textContent=phase==='ready'?'READY':phase==='wiping'?'CLEARING':'MOUNTING DEVICES';
  countNode.textContent=String(resolved).padStart(2,'0')+' / 14';
  const filled=Math.round(resolved/totalLines*progressLength);
  progress.textContent='█'.repeat(filled)+'░'.repeat(progressLength-filled);
  root.classList.toggle('d-fui-boot-is-ready',phase==='ready');
}
function appendLine(index,item){
  const line=document.createElement('div');
  line.className='d-fui-boot-line';
  if(item){line.dataset.emitDelay=String(item.emit);line.dataset.resolveDelay=String(item.resolve)}
  const status=document.createElement('b');
  status.textContent='[ .. ]';
  const message=document.createElement('span');
  message.textContent=' mounting /dev/intrx'+String(index).padStart(2,'0');
  line.appendChild(status);
  line.appendChild(message);
  linesNode.appendChild(line);
  return {line:line,status:status};
}
function resolveLine(entry,index,mine){
  if(!root.isConnected||mine!==token)return;
  const warning=index===warningIndex;
  entry.status.textContent=warning?'[WARN]':'[ OK ]';
  entry.status.className=warning?'d-fui-boot-warn':'d-fui-boot-ok';
  if(warning)warnings++;
  resolved++;
  events++;
  expose(warning?'warning':'resolved');
  maybeReady(mine);
}
function jitter(mine){
  if(reduced||mine!==token||!root.isConnected)return;
  jitters++;
  screen.style.transform='translateX(1px)';
  root.dataset.jitters=String(jitters);
  requestAnimationFrame(function(){if(root.isConnected&&mine===token)screen.style.transform='translateX(0)'});
}
function emit(index,mine){
  if(!root.isConnected||mine!==token||index>=totalLines)return;
  const entry=appendLine(index,schedule[index]);
  emitted++;
  events++;
  expose('emitted');
  later(function(){resolveLine(entry,index,mine)},schedule[index].resolve,mine);
  if(index===jitterIndex)requestAnimationFrame(function(){jitter(mine)});
  if(index+1<totalLines)later(function(){emit(index+1,mine)},schedule[index+1].emit,mine);
}
function maybeReady(mine){
  if(mine!==token||emitted!==totalLines||resolved!==totalLines||phase==='ready')return;
  phase='ready';
  const ready=document.createElement('div');
  ready.className='d-fui-boot-line d-fui-boot-ready';
  const label=document.createElement('span');
  label.textContent='READY.';
  ready.appendChild(label);
  linesNode.appendChild(ready);
  events++;
  expose('ready');
  announcement.textContent='Boot sequence ready. Fourteen devices resolved.';
  later(function(){wipe(mine)},2500,mine);
}
function wipe(mine){
  if(!root.isConnected||mine!==token)return;
  phase='wiping';
  root.classList.add('d-fui-boot-is-wiping');
  expose('wipe');
  announcement.textContent='Clearing boot output';
  later(begin,250,mine);
}
function begin(){
  clearTimers();
  cycles++;
  random=mulberry32(0x1A7B00+cycles*97);
  emitted=0;
  resolved=0;
  warnings=0;
  schedule=Array.from({length:totalLines},function(){return {emit:Math.floor(90+random()*111),resolve:Math.floor(300+random()*601)}});
  warningIndex=Math.floor(random()*totalLines);
  jitterIndex=Math.floor(random()*totalLines);
  emissionDelays=schedule.map(function(item){return item.emit});
  resolutionDelays=schedule.map(function(item){return item.resolve});
  phase='booting';
  linesNode.textContent='';
  root.classList.remove('d-fui-boot-is-wiping','d-fui-boot-is-ready');
  screen.style.transform='translateX(0)';
  expose('cycle');
  const mine=token;
  later(function(){emit(0,mine)},schedule[0].emit,mine);
}
function renderReduced(){
  clearTimers();
  cycles=0;
  random=mulberry32(0x1A7B61);
  warningIndex=9;
  jitterIndex=0;
  linesNode.textContent='';
  emitted=0;
  resolved=0;
  warnings=0;
  emissionDelays=[];
  resolutionDelays=[];
  for(let index=0;index<totalLines;index++){
    const item={emit:90+index%6*20,resolve:300+index%7*90};
    const entry=appendLine(index,item);
    const warning=index===9;
    entry.status.textContent=warning?'[WARN]':'[ OK ]';
    entry.status.className=warning?'d-fui-boot-warn':'d-fui-boot-ok';
    if(warning)warnings++;
    emitted++;
    resolved++;
    events++;
    emissionDelays.push(item.emit);
    resolutionDelays.push(item.resolve);
  }
  const ready=document.createElement('div');
  ready.className='d-fui-boot-line d-fui-boot-ready';
  const label=document.createElement('span');
  label.textContent='READY.';
  ready.appendChild(label);
  linesNode.appendChild(ready);
  phase='ready';
  expose('reduced');
  announcement.textContent='Boot sequence ready. Fourteen devices resolved.';
}
if(reduced)renderReduced();else begin();`,
  prompt:`Build a self-contained 320px-tall fictional boot terminal on #0a0a0b with #101012 panels, #232327 and #2e2e34 framing, primary #ececef, secondary #9b9ba3 and #5c5c66 text, accent #a78bfa, success #4ade80, and warning #fbbf24. Use JetBrains Mono at exactly 12px for output, 4px hard-tech corners, four 8px corner ticks, a scanline texture, and an always-visible accent cursor or activity light.

Drive the terminal with a token-cancelled booting, ready, and wiping state machine. Emit exactly 14 lines such as [ .. ] mounting /dev/intrx00 at seeded-random intervals from 90 to 200ms. For each line, independently replace the pending marker after a seeded-random 300 to 900ms with [ OK ] in success green or, rarely, [WARN] in warning yellow. Do not enter ready until all 14 lines have appeared and all 14 statuses have resolved. Fill an exact 24-character progress bar made only from █ and ░ according to resolved count, and blink a ▮ block cursor on a 530ms steps loop. Add occasional single-frame translateX(1px) CRT jitter without starting a second perpetual frame loop.

After resolution, append READY. in accent, hold that complete state for exactly 2.5 seconds, then clear the screen with a 250ms upward translate-and-fade wipe before beginning a fresh seeded cycle. Keep fourteen 15px output rows plus READY legible inside the 320px stage with no scroll or overflow. Cancel and token-gate every timeout, check root.isConnected before every continued callback or animation frame, animate transforms and opacity, and announce only major ready and clearing phases through one polite live region. Under prefers-reduced-motion, disable scan, blink, line entrances, jitter, wipe, and looping timers; immediately render a complete representative state with 14 resolved rows, one rare warning, the full 24-character bar, a static cursor, and READY.`
});
