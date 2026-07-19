window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-signal-scanner',
  title:'FUI Signal Scanner',
  cat:'FUI & Terminal',
  rootClass:'d-fui-scan',
  tags:['fui','spectrum','scanner','radio'],
  libs:[],
  desc:'A narrowband spectrum scanner sweeps sixty-four exact signal columns, pauses over a pointer-selected band, and surfaces deterministic contact spikes. Its discrete geometry gives the fictional radio interface the cadence of real instrumentation.',
  seen:'Seen on: WireTapper-style OSINT radio mapping tools and spectrum-analysis interfaces',
  hint:'move across the spectrum',
  html:`<div class="d-fui-scan" role="region" aria-label="Interactive radio spectrum scanner">
  <header class="d-fui-scan-topbar"><span>INTRX / RF SPECTRUM</span><span class="d-fui-scan-live"><i class="d-fui-scan-live-dot"></i>SCANNING</span></header>
  <section class="d-fui-scan-panel" tabindex="0" role="slider" aria-label="Selected radio band" aria-valuemin="91.2" aria-valuemax="165.6" aria-valuenow="128.4" aria-valuetext="128.4 megahertz">
    <i class="d-fui-scan-corner d-fui-scan-corner-tl"></i><i class="d-fui-scan-corner d-fui-scan-corner-tr"></i><i class="d-fui-scan-corner d-fui-scan-corner-bl"></i><i class="d-fui-scan-corner d-fui-scan-corner-br"></i>
    <div class="d-fui-scan-panel-head"><span>NOISE FLOOR / −84dB</span><span class="d-fui-scan-mode">AUTO SWEEP</span></div>
    <div class="d-fui-scan-plot">
      <div class="d-fui-scan-bars" aria-hidden="true"></div>
      <i class="d-fui-scan-sweep" aria-hidden="true"></i>
      <div class="d-fui-scan-band" aria-hidden="true"><output class="d-fui-scan-frequency">128.4MHz</output><i class="d-fui-scan-bracket"></i></div>
    </div>
    <div class="d-fui-scan-scale" aria-hidden="true"><span>88</span><span>128.4</span><span>168.8 MHz</span></div>
  </section>
  <footer class="d-fui-scan-footer"><span>64 BANDS</span><span>Δ 1.28MHz</span><span>SWEEP 3.2S</span><span class="d-fui-scan-status">CLEAR</span></footer>
  <span class="d-fui-scan-announcement" aria-live="polite">Spectrum scanner active</span>
  <i class="d-fui-scan-scanline" aria-hidden="true"></i>
</div>`,
  css:`
.d-fui-scan{position:relative;width:100%;height:320px;box-sizing:border-box;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 12px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-scan:before{content:'';position:absolute;inset:0;z-index:9;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.02) 2px 3px),radial-gradient(circle at center,transparent 50%,rgba(0,0,0,.35) 100%)}
.d-fui-scan-topbar,.d-fui-scan-footer{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-scan-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-fui-scan-live-dot{width:5px;height:5px;border-radius:50%;background:#fa7319;box-shadow:0 0 9px rgba(250,115,25,.35);animation:d-fui-scan-live-pulse 1.6s ease-in-out infinite}
.d-fui-scan-panel{position:relative;z-index:2;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:4px;background:#101012;outline:none;cursor:crosshair}.d-fui-scan-panel:focus-visible{box-shadow:inset 0 0 0 2px rgba(250,115,25,.5)}.d-fui-scan-panel-head{position:absolute;z-index:6;left:10px;right:10px;top:8px;display:flex;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-scan-mode{color:#9b9ba3}
.d-fui-scan-plot{position:absolute;left:50%;bottom:27px;width:191px;height:194px;transform:translateX(-50%)}.d-fui-scan-bars{position:absolute;left:0;right:0;bottom:0;height:174px;display:flex;align-items:flex-end;column-gap:1px}.d-fui-scan-bar{position:relative;display:block;flex:0 0 2px;width:2px;height:var(--d-fui-scan-height);--d-fui-scan-scale:1;--d-fui-scan-shift:0px;--d-fui-scan-blip-scale:.6}.d-fui-scan-body{position:absolute;inset:0;background:#5c5c66;transform:scaleY(var(--d-fui-scan-scale));transform-origin:50% 100%;transition:background-color 160ms linear;will-change:transform,background-color}.d-fui-scan-bar.d-fui-scan-is-swept .d-fui-scan-body{background:#ececef}.d-fui-scan-bar.d-fui-scan-is-selected .d-fui-scan-body{background:#67e8f9}
.d-fui-scan-tip{position:absolute;left:0;top:0;width:2px;height:2px;background:#fa7319;transform:translateY(var(--d-fui-scan-shift));will-change:transform}.d-fui-scan-bar.d-fui-scan-is-selected .d-fui-scan-tip{background:#67e8f9}.d-fui-scan-blip{position:absolute;left:-1px;top:-7px;width:4px;height:4px;border-radius:50%;background:#f87171;box-shadow:0 0 9px rgba(248,113,113,.45);opacity:0;transform:translateY(var(--d-fui-scan-shift)) scale(var(--d-fui-scan-blip-scale));will-change:opacity,transform}
.d-fui-scan-sweep{position:absolute;z-index:4;left:0;top:20px;bottom:0;width:1px;background:#fa7319;box-shadow:0 0 9px rgba(250,115,25,.55);will-change:transform}.d-fui-scan-band{position:absolute;z-index:5;left:0;top:0;width:25px;height:18px;pointer-events:none;will-change:transform}.d-fui-scan-bracket{position:absolute;left:0;bottom:0;width:25px;height:12px;box-sizing:border-box;border-left:1px solid #fa7319;border-right:1px solid #fa7319;border-top:1px solid #fa7319}.d-fui-scan-frequency{position:absolute;left:50%;bottom:16px;padding:3px 4px;border-radius:2px;background:rgba(10,10,11,.86);color:#67e8f9;font:12px/1 'JetBrains Mono',monospace;letter-spacing:.03em;transform:translateX(-50%);white-space:nowrap;font-variant-numeric:tabular-nums}
.d-fui-scan-scale{position:absolute;left:calc(50% - 96px);bottom:9px;width:192px;display:flex;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1}.d-fui-scan-footer{border-top:1px solid #232327}.d-fui-scan-status{color:#4ade80}.d-fui-scan.d-fui-scan-has-contact .d-fui-scan-status{color:#f87171}
.d-fui-scan-corner{position:absolute;z-index:7;width:8px;height:8px;pointer-events:none}.d-fui-scan-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-scan-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-scan-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-scan-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-scan.d-fui-scan-is-paused .d-fui-scan-corner{border-color:#fa7319}
.d-fui-scan-announcement{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.d-fui-scan-scanline{position:absolute;z-index:8;left:13px;right:13px;top:31px;height:1px;background:#fa7319;opacity:.07;pointer-events:none;animation:d-fui-scan-stage-line 5.2s linear infinite}
@keyframes d-fui-scan-live-pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-scan-stage-line{from{transform:translateY(0)}to{transform:translateY(256px)}}
@media(max-width:520px){.d-fui-scan{padding-inline:8px}.d-fui-scan-footer span:nth-child(2){display:none}}
@media(prefers-reduced-motion:reduce){.d-fui-scan *{animation:none!important;transition:none!important}.d-fui-scan-live-dot{opacity:1}.d-fui-scan-scanline{top:160px}}
`,
  js:`const panel=root.querySelector('.d-fui-scan-panel');
const plot=root.querySelector('.d-fui-scan-plot');
const barsNode=root.querySelector('.d-fui-scan-bars');
const sweepNode=root.querySelector('.d-fui-scan-sweep');
const bandNode=root.querySelector('.d-fui-scan-band');
const frequencyNode=root.querySelector('.d-fui-scan-frequency');
const statusNode=root.querySelector('.d-fui-scan-status');
const announcement=root.querySelector('.d-fui-scan-announcement');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const barCount=64;
const plotWidth=191;
const sweepDuration=3200;
const bases=[];
const bars=[];
let selectedStart=29;
let sweepElapsed=0;
let sweepX=0;
let paused=false;
let pauseUntil=0;
let lastPauseKey='';
let visible=true;
let running=false;
let last=0;
let simulationTime=0;
let frames=0;
let pauses=0;
let contacts=0;
let contactIndex=-1;
let contactStart=0;
let contactEnd=Infinity;
let nextContactAt=Infinity;
let nextContactIndex=-1;
let nextContactDelay=0;
let observer=null;
const nearState=Array(barCount).fill(false);
const boostStart=Array(barCount).fill(-Infinity);
const baseRandom=mulberry32(0x51A11042);
const contactRandom=mulberry32(0xC01A7C7);
root.dataset.barCount=String(barCount);
root.dataset.barWidth='2';
root.dataset.barGap='1';
root.dataset.tipHeight='2';
root.dataset.sweepDuration=String(sweepDuration);
root.dataset.influence='20';
root.dataset.boost='1.15';
root.dataset.scanResponse='200';
root.dataset.pauseDuration='800';
root.dataset.contactMin='6000';
root.dataset.contactMax='10000';
root.dataset.contactScale='2';
root.dataset.contactFade='1200';
root.dataset.bandMin='91.2';
root.dataset.bandMax='165.6';
root.dataset.bandDelta='1.28';
root.dataset.selectedCount='6';
root.dataset.reduced=String(reduced);
function mulberry32(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let value=Math.imul(seed^seed>>>15,1|seed);value=value+Math.imul(value^value>>>7,61|value)^value;return ((value^value>>>14)>>>0)/4294967296}}
for(let index=0;index<barCount;index++){
  const wave=Math.sin(index*.43)*12+Math.sin(index*.17+1.8)*8;
  const noise=(baseRandom()-.5)*22;
  const peak=index%13===5?18:0;
  const height=Math.round(Math.max(28,Math.min(96,58+wave+noise+peak)));
  bases.push(height);
  const bar=document.createElement('i');
  bar.className='d-fui-scan-bar';
  bar.style.setProperty('--d-fui-scan-height',height+'px');
  const body=document.createElement('span');
  body.className='d-fui-scan-body';
  const tip=document.createElement('span');
  tip.className='d-fui-scan-tip';
  const blip=document.createElement('b');
  blip.className='d-fui-scan-blip';
  bar.appendChild(body);
  bar.appendChild(tip);
  bar.appendChild(blip);
  barsNode.appendChild(bar);
  bars.push(bar);
}
function expose(source){
  root.dataset.selectedStart=String(selectedStart);
  root.dataset.selectedCount=String(bars.filter(function(bar){return bar.classList.contains('d-fui-scan-is-selected')}).length);
  root.dataset.scannedCount=String(bars.filter(function(bar){return bar.classList.contains('d-fui-scan-is-swept')}).length);
  root.dataset.sweepX=sweepX.toFixed(2);
  root.dataset.paused=String(paused);
  root.dataset.pauses=String(pauses);
  root.dataset.frames=String(frames);
  root.dataset.contacts=String(contacts);
  root.dataset.contactIndex=String(contactIndex);
  root.dataset.contactActive=String(contactIndex>=0);
  root.dataset.nextContactDelay=String(nextContactDelay);
  root.dataset.nextContactIndex=String(nextContactIndex);
  root.dataset.simulationTime=simulationTime.toFixed(0);
  root.dataset.running=String(running);
  root.dataset.source=source;
  root.classList.toggle('d-fui-scan-is-paused',paused);
  root.classList.toggle('d-fui-scan-has-contact',contactIndex>=0);
  statusNode.textContent=contactIndex>=0?'CONTACT':'CLEAR';
}
function bandCenter(){return selectedStart*3+8.5}
function updateBand(source){
  bars.forEach(function(bar,index){bar.classList.toggle('d-fui-scan-is-selected',index>=selectedStart&&index<selectedStart+6)});
  const centerIndex=selectedStart+2.5;
  const frequency=88+centerIndex/63*80.8;
  const topHeight=Math.max.apply(Math,bases.slice(selectedStart,selectedStart+6));
  const x=selectedStart*3-4;
  const y=Math.max(23,174-topHeight-25);
  bandNode.style.transform='translate3d('+x+'px,'+y+'px,0)';
  frequencyNode.textContent=frequency.toFixed(1)+'MHz';
  panel.setAttribute('aria-valuenow',frequency.toFixed(1));
  panel.setAttribute('aria-valuetext',frequency.toFixed(1)+' megahertz');
  root.dataset.frequency=frequency.toFixed(1);
  root.dataset.selectionSource=source;
  expose(source);
}
function chooseBand(clientX,source){
  const rect=plot.getBoundingClientRect();
  const x=Math.max(0,Math.min(rect.width,clientX-rect.left));
  const nearest=Math.round(x/rect.width*(barCount-1));
  selectedStart=Math.max(0,Math.min(barCount-6,nearest-2));
  updateBand(source);
}
function updateSweepClasses(){
  let count=0;
  bars.forEach(function(bar,index){
    const near=Math.abs(index*3+1-sweepX)<=20;
    if(near&&!nearState[index])boostStart[index]=simulationTime;
    nearState[index]=near;
    bar.classList.toggle('d-fui-scan-is-swept',near);
    const boostAge=simulationTime-boostStart[index];
    let scale=boostAge>=0&&boostAge<200?1+Math.sin(boostAge/200*Math.PI)*.15:1;
    if(index===contactIndex)scale=2;
    bar.style.setProperty('--d-fui-scan-scale',scale.toFixed(3));
    bar.style.setProperty('--d-fui-scan-shift',(-(scale-1)*bases[index]).toFixed(2)+'px');
    if(near)count++;
  });
  root.dataset.scannedCount=String(count);
}
function planContact(){
  nextContactDelay=Math.floor(6000+contactRandom()*4001);
  nextContactAt=simulationTime+nextContactDelay;
  nextContactIndex=Math.floor(contactRandom()*barCount);
  root.dataset.nextContactDelay=String(nextContactDelay);
  root.dataset.nextContactIndex=String(nextContactIndex);
}
function showContact(index,timed){
  if(contactIndex>=0)bars[contactIndex].classList.remove('d-fui-scan-is-contact');
  contactIndex=index;
  contactStart=simulationTime;
  contactEnd=timed?simulationTime+1200:Infinity;
  contacts++;
  bars[index].classList.add('d-fui-scan-is-contact');
  const blip=bars[index].querySelector('.d-fui-scan-blip');
  blip.style.opacity='1';
  bars[index].style.setProperty('--d-fui-scan-blip-scale','1');
  announcement.textContent='Radio contact detected at band '+String(index+1);
  expose('contact');
}
function updateContact(){
  if(contactIndex<0&&simulationTime>=nextContactAt){showContact(nextContactIndex,true);planContact()}
  if(contactIndex<0||contactEnd===Infinity)return;
  const index=contactIndex;
  const progress=Math.max(0,Math.min(1,(simulationTime-contactStart)/1200));
  const blip=bars[index].querySelector('.d-fui-scan-blip');
  blip.style.opacity=(1-progress).toFixed(3);
  bars[index].style.setProperty('--d-fui-scan-blip-scale',(1+.35*Math.sin(progress*Math.PI)-.4*progress).toFixed(3));
  root.dataset.contactProgress=progress.toFixed(3);
  if(simulationTime>=contactEnd){bars[index].classList.remove('d-fui-scan-is-contact');blip.style.opacity='0';bars[index].style.setProperty('--d-fui-scan-blip-scale','.6');contactIndex=-1;announcement.textContent='Spectrum clear';expose('contact clear')}
}
function start(){if(reduced||!visible||running||!root.isConnected)return;running=true;last=performance.now();requestAnimationFrame(frame)}
function frame(now){
  if(!root.isConnected){running=false;if(observer)observer.disconnect();return}
  if(!visible){running=false;return}
  const delta=Math.min(50,Math.max(0,now-last));
  last=now;
  simulationTime+=delta;
  frames++;
  if(simulationTime<pauseUntil)paused=true;
  else{
    paused=false;
    const before=sweepElapsed/sweepDuration;
    const after=(sweepElapsed+delta)/sweepDuration;
    const selectedNorm=bandCenter()/plotWidth;
    const crossing=Math.floor(before-selectedNorm)+1+selectedNorm;
    const key=Math.floor(crossing)+':'+selectedStart;
    if(crossing<=after&&key!==lastPauseKey){
      sweepElapsed=crossing*sweepDuration;
      pauseUntil=simulationTime+800;
      paused=true;
      pauses++;
      lastPauseKey=key;
    }else sweepElapsed+=delta;
  }
  sweepX=(sweepElapsed%sweepDuration)/sweepDuration*plotWidth;
  sweepNode.style.transform='translate3d('+sweepX.toFixed(2)+'px,0,0)';
  updateContact();
  updateSweepClasses();
  expose(paused?'band pause':'sweep');
  requestAnimationFrame(frame);
}
panel.addEventListener('pointermove',function(event){chooseBand(event.clientX,'pointer')},{passive:true});
panel.addEventListener('keydown',function(event){
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'||event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();selectedStart=Math.max(0,Math.min(barCount-6,selectedStart+((event.key==='ArrowLeft'||event.key==='ArrowDown')?-1:1)));updateBand('keyboard')}
  else if(event.key==='Home'||event.key==='End'){event.preventDefault();selectedStart=event.key==='Home'?0:barCount-6;updateBand('keyboard')}
});
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start()},{threshold:.05});observer.observe(root)}
updateBand('initial');
if(reduced){sweepElapsed=sweepDuration*.28;sweepX=plotWidth*.28;sweepNode.style.transform='translate3d('+sweepX.toFixed(2)+'px,0,0)';showContact(47,false);updateSweepClasses();paused=false;expose('reduced')}else{planContact();start()}`,
  prompt:`Build a self-contained 320px-tall fictional radio spectrum scanner using JetBrains Mono and only #0a0a0b, #101012, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, accent #fa7319, info #67e8f9, success #4ade80, and error #f87171. Frame the scanner as a 4px-radius FUI panel with four 8px corner ticks, scanlines, and an always-visible accent activity dot.

Render exactly 64 DOM spectrum bars, each exactly 2px wide with a 1px gap. Give every bar a seeded noise height, a #5c5c66 body, and an exact 2px #fa7319 tip. Move one exact 1px accent sweep line left to right on a linear 3.2-second cycle. Bars whose centers enter the sweep's 20px influence turn #ececef and run a one-shot 200ms sine pulse from scaleY(1) through an exact scaleY(1.15) peak and back to scaleY(1).

Map pointer x to the nearest band and select exactly six adjacent bars in #67e8f9. Position a bracket above those six bars and show a one-decimal MHz value; center the initial group at 128.4MHz. Advertise the achievable 91.2–165.6MHz band-center range to assistive technology. When the sweep crosses the currently selected group, freeze the sweep's elapsed clock at that exact position for 800ms, brighten the panel corners to accent, then continue without a timing jump. Support Left, Right, Up, and Down arrows plus Home and End on the focusable slider-like panel.

On seeded-random intervals from 6 to 10 seconds, choose one bar and spike it to exactly scaleY(2). Show a #f87171 blip dot above it whose opacity and scale decay over exactly 1.2 seconds, then clear the contact. Drive sweep, pauses, pulses, and contacts from one visibility-aware active-time requestAnimationFrame loop that disconnects with the root; use a passive pointer listener and animate bar transforms and colors rather than layout. Under prefers-reduced-motion, run no frame loop or timers: show a static sweep position, selected six-bar group, and one representative contact spike with a visible error dot, while pointer and keyboard band selection still update instantly.`
});
