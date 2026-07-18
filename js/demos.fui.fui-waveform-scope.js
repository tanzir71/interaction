window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-waveform-scope',
  title:'FUI Waveform Scope',
  cat:'FUI & Terminal',
  rootClass:'d-fui-scope',
  tags:['fui','canvas','oscilloscope','waveform'],
  libs:[],
  desc:'A pointer-tunable oscilloscope layers harmonics into a persistent phosphor trace with an exact frame-decay model. Pointer and keyboard activation can freeze the live signal for a measured hold.',
  seen:'Seen on: fictional interface dashboards and hardware audio oscilloscopes',
  hint:'move to tune · click to hold',
  html:`<div class="d-fui-scope" role="region" aria-label="Interactive waveform oscilloscope">
  <header class="d-fui-scope-topbar"><span>INTRX / SIGNAL SCOPE</span><span class="d-fui-scope-live"><i class="d-fui-scope-live-dot"></i>CH-A LIVE</span></header>
  <section class="d-fui-scope-panel">
    <i class="d-fui-scope-corner d-fui-scope-corner-tl"></i><i class="d-fui-scope-corner d-fui-scope-corner-tr"></i><i class="d-fui-scope-corner d-fui-scope-corner-bl"></i><i class="d-fui-scope-corner d-fui-scope-corner-br"></i>
    <div class="d-fui-scope-readout"><output class="d-fui-scope-values">FREQ 2.40kHz / AMP 62%</output><span class="d-fui-scope-hold">HOLD</span></div>
    <canvas class="d-fui-scope-canvas" tabindex="0" role="button" aria-pressed="false" aria-label="Live oscilloscope. Move the pointer to tune frequency and amplitude; click or press Enter or Space to hold the trace for one and a half seconds."></canvas>
    <div class="d-fui-scope-axis-labels" aria-hidden="true"><span>+1.0</span><span>0.0</span><span>−1.0</span></div>
  </section>
  <footer class="d-fui-scope-footer"><span>GRID 8×6</span><span>DECAY ×0.88</span><span>LERP 0.08</span><span class="d-fui-scope-state">RUN</span></footer>
  <span class="d-fui-scope-announcement" aria-live="polite">Oscilloscope running</span>
  <i class="d-fui-scope-scanline" aria-hidden="true"></i>
</div>`,
  css:`
.d-fui-scope{position:relative;width:100%;height:320px;box-sizing:border-box;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 12px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-scope:before{content:'';position:absolute;inset:0;z-index:7;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.02) 2px 3px),radial-gradient(circle at center,transparent 50%,rgba(0,0,0,.35) 100%)}
.d-fui-scope-topbar,.d-fui-scope-footer{position:relative;z-index:8;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}.d-fui-scope-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-fui-scope-live-dot{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.35);animation:d-fui-scope-live-pulse 1.6s ease-in-out infinite}
.d-fui-scope-panel{position:relative;z-index:2;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:4px;background:#101012}.d-fui-scope-canvas{display:block;width:100%;height:100%;outline:none;cursor:crosshair;touch-action:none}.d-fui-scope-canvas:focus-visible{box-shadow:inset 0 0 0 2px rgba(167,139,250,.55)}
.d-fui-scope-readout{position:absolute;z-index:4;left:9px;right:9px;top:7px;display:flex;align-items:center;justify-content:space-between;pointer-events:none}.d-fui-scope-values{padding:4px 6px;border:1px solid #232327;border-radius:3px;background:rgba(10,10,11,.84);color:#ececef;font:10px/1 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}.d-fui-scope-hold{padding:4px 6px;border:1px solid rgba(251,191,36,.45);border-radius:999px;background:rgba(251,191,36,.08);color:#fbbf24;font-size:9px;line-height:1;letter-spacing:.08em;opacity:0;transform:translateY(-3px);transition:opacity 120ms linear,transform 180ms cubic-bezier(.22,1,.36,1)}.d-fui-scope.d-fui-scope-is-holding .d-fui-scope-hold{opacity:1;transform:translateY(0)}
.d-fui-scope-axis-labels{position:absolute;z-index:3;left:6px;top:39px;bottom:9px;display:flex;flex-direction:column;justify-content:space-between;color:#5c5c66;font-size:7px;line-height:1;pointer-events:none}.d-fui-scope-footer{font-size:8px;border-top:1px solid #232327}.d-fui-scope-state{color:#4ade80}.d-fui-scope.d-fui-scope-is-holding .d-fui-scope-state{color:#fbbf24}
.d-fui-scope-corner{position:absolute;z-index:5;width:8px;height:8px;pointer-events:none}.d-fui-scope-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-scope-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-scope-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-scope-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-scope.d-fui-scope-is-holding .d-fui-scope-corner{border-color:#fbbf24}
.d-fui-scope-announcement{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.d-fui-scope-scanline{position:absolute;z-index:6;left:13px;right:13px;top:31px;height:1px;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.35);opacity:.08;pointer-events:none;animation:d-fui-scope-scan 5.6s linear infinite}
@keyframes d-fui-scope-live-pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-scope-scan{from{transform:translateY(0)}to{transform:translateY(256px)}}
@media(max-width:520px){.d-fui-scope{padding-inline:8px}.d-fui-scope-values{font-size:9px}}
@media(prefers-reduced-motion:reduce){.d-fui-scope *{animation:none!important;transition:none!important}.d-fui-scope-live-dot{opacity:1}.d-fui-scope-scanline{top:160px}.d-fui-scope-hold{transform:none}}
`,
  js:`const canvas=root.querySelector('.d-fui-scope-canvas');
const context=canvas.getContext('2d');
const trail=document.createElement('canvas');
const trailContext=trail.getContext('2d');
const readout=root.querySelector('.d-fui-scope-values');
const stateNode=root.querySelector('.d-fui-scope-state');
const announcement=root.querySelector('.d-fui-scope-announcement');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let targetFrequency=2.4;
let targetAmplitude=.62;
let frequency=2.4;
let amplitude=.62;
let phase=0;
let holdUntil=0;
let holding=false;
let holdTimer=0;
let visible=true;
let running=false;
let last=0;
let frames=0;
let draws=0;
let holds=0;
let width=0;
let height=0;
let resizeObserver=null;
let intersectionObserver=null;
root.dataset.gridColumns='8';
root.dataset.gridRows='6';
root.dataset.trailDecay='0.88';
root.dataset.fadeAlpha='0.12';
root.dataset.coreStroke='2';
root.dataset.glowStroke='7';
root.dataset.gridStroke='#232327';
root.dataset.axisStroke='#2e2e34';
root.dataset.buffer='offscreen';
root.dataset.lerp='0.08';
root.dataset.holdDuration='1500';
root.dataset.reduced=String(reduced);
function expose(source){
  root.dataset.frequency=frequency.toFixed(3);
  root.dataset.amplitude=amplitude.toFixed(3);
  root.dataset.targetFrequency=targetFrequency.toFixed(3);
  root.dataset.targetAmplitude=targetAmplitude.toFixed(3);
  root.dataset.phase=phase.toFixed(3);
  root.dataset.holding=String(holding);
  root.dataset.frames=String(frames);
  root.dataset.draws=String(draws);
  root.dataset.holds=String(holds);
  root.dataset.running=String(running);
  root.dataset.source=source;
  readout.textContent='FREQ '+frequency.toFixed(2)+'kHz / AMP '+Math.round(amplitude*100)+'%';
  stateNode.textContent=holding?'HOLD':'RUN';
  canvas.setAttribute('aria-pressed',holding?'true':'false');
  root.classList.toggle('d-fui-scope-is-holding',holding);
}
function resize(){
  const rect=canvas.getBoundingClientRect();
  const dpr=Math.min(2,devicePixelRatio||1);
  width=Math.max(1,Math.round(rect.width*dpr));
  height=Math.max(1,Math.round(rect.height*dpr));
  if(canvas.width!==width||canvas.height!==height){
    canvas.width=width;
    canvas.height=height;
    trail.width=width;
    trail.height=height;
    context.setTransform(dpr,0,0,dpr,0,0);
    trailContext.setTransform(dpr,0,0,dpr,0,0);
    width=rect.width;
    height=rect.height;
    trailContext.clearRect(0,0,width,height);
  }else{width=rect.width;height=rect.height}
  renderFrame(false);
}
function drawGrid(){
  context.clearRect(0,0,width,height);
  context.fillStyle='#101012';
  context.fillRect(0,0,width,height);
  context.lineWidth=1;
  context.strokeStyle='#232327';
  context.beginPath();
  for(let column=0;column<=8;column++){const x=Math.round(column*width/8)+.5;context.moveTo(x,0);context.lineTo(x,height)}
  for(let row=0;row<=6;row++){const y=Math.round(row*height/6)+.5;context.moveTo(0,y);context.lineTo(width,y)}
  context.stroke();
  context.strokeStyle='#2e2e34';
  context.beginPath();
  context.moveTo(Math.round(width/2)+.5,0);context.lineTo(Math.round(width/2)+.5,height);
  context.moveTo(0,Math.round(height/2)+.5);context.lineTo(width,Math.round(height/2)+.5);
  context.stroke();
}
function tracePath(target){
  target.beginPath();
  const center=height/2;
  const scale=height*.43*amplitude;
  for(let x=0;x<=width;x+=1.5){
    const unit=x/width;
    const angle=unit*Math.PI*2*frequency;
    const signal=Math.sin(angle+phase)*.72+Math.sin(angle*2.03-phase*.7)*.18+Math.sin(angle*.51+phase*1.3)*.1;
    const y=center-signal*scale;
    if(x===0)target.moveTo(x,y);else target.lineTo(x,y);
  }
}
function renderFrame(decay){
  if(!width||!height)return;
  if(decay){
    trailContext.save();
    trailContext.globalCompositeOperation='destination-out';
    trailContext.fillStyle='rgba(0,0,0,.12)';
    trailContext.fillRect(0,0,width,height);
    trailContext.restore();
  }else trailContext.clearRect(0,0,width,height);
  trailContext.save();
  trailContext.globalCompositeOperation='lighter';
  trailContext.lineJoin='round';
  trailContext.lineCap='round';
  tracePath(trailContext);
  trailContext.strokeStyle='rgba(74,222,128,.10)';
  trailContext.lineWidth=7;
  trailContext.stroke();
  tracePath(trailContext);
  trailContext.strokeStyle='#4ade80';
  trailContext.lineWidth=2;
  trailContext.stroke();
  trailContext.restore();
  drawGrid();
  context.save();
  context.globalCompositeOperation='lighter';
  context.drawImage(trail,0,0,width,height);
  context.restore();
  draws++;
  expose(decay?'frame':'static');
}
function setHold(value,source,now){
  clearTimeout(holdTimer);
  holding=value;
  if(value){
    holds++;
    holdUntil=(now||performance.now())+1500;
    announcement.textContent='Waveform held for one and a half seconds';
    if(reduced)holdTimer=setTimeout(function(){if(!root.isConnected)return;holding=false;expose('hold complete')},1500);
  }else announcement.textContent='Waveform running';
  expose(source);
}
function activate(source){setHold(true,source,performance.now());if(!reduced)start()}
function updateTarget(event){
  if(holding){root.dataset.source='held pointer ignored';return}
  const rect=canvas.getBoundingClientRect();
  const x=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
  const y=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
  targetFrequency=.5+x*7.5;
  targetAmplitude=.1+(1-y)*.8;
  root.dataset.pointerX=x.toFixed(3);
  root.dataset.pointerY=y.toFixed(3);
  if(reduced){frequency=targetFrequency;amplitude=targetAmplitude;renderFrame(false)}else start();
}
function start(){if(reduced||!visible||running||!root.isConnected)return;running=true;last=performance.now();requestAnimationFrame(frame)}
function frame(now){
  if(!root.isConnected){running=false;if(resizeObserver)resizeObserver.disconnect();if(intersectionObserver)intersectionObserver.disconnect();return}
  if(!visible){running=false;return}
  const delta=Math.min(50,Math.max(0,now-last));
  last=now;
  frames++;
  if(holding&&now>=holdUntil)setHold(false,'hold complete',now);
  if(!holding){
    frequency+=(targetFrequency-frequency)*.08;
    amplitude+=(targetAmplitude-amplitude)*.08;
    phase+=delta*.0024;
    renderFrame(true);
  }
  requestAnimationFrame(frame);
}
canvas.addEventListener('pointermove',updateTarget,{passive:true});
canvas.addEventListener('pointerleave',function(){targetFrequency=2.4;targetAmplitude=.62;if(reduced){frequency=targetFrequency;amplitude=targetAmplitude;renderFrame(false)}});
canvas.addEventListener('click',function(){activate('pointer')});
canvas.addEventListener('keydown',function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();activate('keyboard')}else if(event.key==='Escape'&&holding){setHold(false,'keyboard release',performance.now())}});
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas)}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start()},{threshold:.05});intersectionObserver.observe(root)}
resize();
if(reduced){phase=.55;renderFrame(false);expose('reduced')}else start();`,
  prompt:`Build a self-contained 320px-tall fictional oscilloscope using one visible canvas and one persistent offscreen trail canvas. Use JetBrains Mono and only #0a0a0b, #101012, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, accent #a78bfa, success #4ade80, and warning #fbbf24. Frame the scope as a 4px-radius FUI panel with four 8px corner ticks, scanlines, a visible accent activity dot, a top-left live readout, and a warning HOLD chip.

Redraw a crisp 1px graticule with exactly 8 horizontal divisions across and 6 vertical divisions down on every visible frame, using #232327 grid lines and #2e2e34 center axes. On the persistent buffer, draw a layered harmonic waveform from a primary sine at 72 percent, a second harmonic at 18 percent, and a low component at 10 percent. Render a soft 7px success-green additive glow plus an exact 2px #4ade80 core. Before each live trace, use destination-out at alpha 0.12 so previous phosphor pixels multiply by exactly 0.88 per frame, then composite the buffer over the freshly redrawn grid with lighter blending.

Map root-local pointer x linearly from 0.5 to 8 waveform cycles and pointer y inversely from 10 to 90 percent amplitude. Ease both live values every frame with current += (target - current) times exactly 0.08, and keep the text synchronized in the form FREQ 2.40kHz / AMP 62%. Click, Enter, or Space freezes phase advance, trail fading, and drawing for exactly 1.5 seconds. While frozen, show a #fbbf24 HOLD pill, warning-colored corner ticks, RUN-to-HOLD footer state, and aria-pressed true; use the animation timestamp as the single release clock.

Resize both canvases with a device-pixel-ratio cap of 2, keep one guarded requestAnimationFrame loop, pause it offscreen with IntersectionObserver, use a passive pointer listener, animate only transforms and opacity in the DOM, and stop when the root disconnects. Give the canvas a visible keyboard focus treatment and announce hold/run changes politely. Under prefers-reduced-motion, schedule no perpetual frame loop: draw one representative static trace, update frequency and amplitude immediately on pointer movement, and use one root-guarded 1.5-second timeout only to expose the requested HOLD state.`
});
