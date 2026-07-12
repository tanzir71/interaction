/* INTRX registry — published synthetic ASCII wave only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'ascii-webcam-style-wave',
  title: 'Synthetic ASCII Wave',
  cat: 'Raster & Glitch',
  rootClass: 'd-awave',
  tags: ['canvas', 'ascii-art', 'sine-field'],
  libs: [],
  desc: 'A camera-like ASCII signal made entirely from three layered sine fields. Pointer velocity injects a decaying spiral disturbance, bending glyph density and color without requesting camera access.',
  seen: 'Seen on: audiovisual portfolios, terminal-inspired installations, experimental event sites',
  hint: 'stir the signal, pause or step phase, and use arrow keys',
  html: `
<div class="d-awave" tabindex="0" aria-label="Synthetic animated ASCII field. Move to stir it, use arrow keys to move the stirrer, Space pauses or steps phase, Home centers, and R resets.">
  <span class="d-awave-kicker">SYNTHETIC INPUT / NO CAMERA</span>
  <div class="d-awave-stage">
    <canvas class="d-awave-canvas" role="img" aria-label="An animated ASCII glyph field generated from layered sine waves and cursor disturbance"></canvas>
    <div class="d-awave-stir" aria-hidden="true"><i></i><b>STIR</b></div>
    <span class="d-awave-rec" aria-hidden="true"><i></i>SYN</span>
  </div>
  <div class="d-awave-meter" aria-hidden="true"><span>STIR</span><strong>018</strong><b>%</b></div>
  <div class="d-awave-waves" aria-hidden="true"><i></i><i></i><i></i></div>
  <button class="d-awave-pause" type="button" aria-pressed="false">Pause field</button>
  <p class="d-awave-status" aria-live="polite">Synthetic signal running</p>
</div>`,
  css: `
.d-awave { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #100b1c; color: #c8b7ff; touch-action: none; }
.d-awave:focus-visible { box-shadow: inset 0 0 0 2px #b89cff; }
.d-awave::before { content: ''; position: absolute; inset: 0; opacity: .18; pointer-events: none;
  background-image: radial-gradient(rgba(200,183,255,.28) .65px, transparent .65px); background-size: 7px 7px; }
.d-awave-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(200,183,255,.42); background: #06040d; box-shadow: 9px 9px 0 rgba(184,156,255,.1); }
.d-awave-canvas { display: block; width: 100%; height: 100%; }
.d-awave-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .14;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(200,183,255,.17) 3px 4px); mix-blend-mode: screen; }
.d-awave-stir { position: absolute; left: 0; top: 0; width: 104px; height: 104px; margin: -52px 0 0 -52px;
  border: 1px solid rgba(255,122,91,.78); border-radius: 50%; color: #ff7a5b; pointer-events: none; opacity: .32; will-change: transform, opacity; }
.d-awave-stir::before, .d-awave-stir::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-awave-stir::before { width: 15px; height: 1px; }.d-awave-stir::after { width: 1px; height: 15px; }
.d-awave-stir i { position: absolute; inset: 10px; border: 1px dashed rgba(255,122,91,.55); border-radius: 50%; }
.d-awave-stir b { position: absolute; right: 9px; bottom: 8px; font: 7px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-awave.d-awave-active .d-awave-stir { opacity: 1; }
.d-awave-rec { position: absolute; right: 8px; top: 7px; display: flex; align-items: center; gap: 5px; color: rgba(255,255,255,.72);
  font: 7px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-awave-rec i { width: 5px; height: 5px; border-radius: 50%; background: #ff7a5b; box-shadow: 0 0 8px rgba(255,122,91,.7); }
.d-awave-kicker { position: absolute; left: 17px; top: 18px; color: rgba(200,183,255,.56); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-awave-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(200,183,255,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-awave-meter strong { min-width: 34px; color: #c8b7ff; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-awave-meter b { font-weight: 400; }
.d-awave-waves { position: absolute; left: 17px; top: 43px; display: grid; gap: 3px; }
.d-awave-waves i { display: block; width: 54px; height: 3px; opacity: .52;
  background: repeating-linear-gradient(90deg, #b89cff 0 4px, transparent 4px 7px); }
.d-awave-waves i:nth-child(2) { width: 42px; margin-left: 7px; opacity: .34; }.d-awave-waves i:nth-child(3) { width: 30px; margin-left: 14px; opacity: .22; }
.d-awave-pause { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(200,183,255,.4);
  border-radius: 999px; background: rgba(16,11,28,.84); color: #c8b7ff; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-awave-pause:hover, .d-awave-pause[aria-pressed="true"] { background: #c8b7ff; color: #100b1c; transform: translateY(-2px); }
.d-awave-pause:focus-visible { outline: 2px solid #ff7a5b; outline-offset: 3px; }
.d-awave-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(200,183,255,.5); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-awave-stage { width: 75%; height: 190px; }.d-awave-waves { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-awave-stir { will-change: auto; }.d-awave-pause { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-awave-canvas');
const stageEl = root.querySelector('.d-awave-stage');
const stirMark = root.querySelector('.d-awave-stir');
const meter = root.querySelector('.d-awave-meter strong');
const pauseButton = root.querySelector('.d-awave-pause');
const status = root.querySelector('.d-awave-status');
const context = canvas.getContext('2d', { alpha: false });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const RAMP = ' .,:;irsXA253hMHGS#9B&@', CELL_WIDTH = 8, CELL_HEIGHT = 10;
let width = 1, height = 1, dpr = 1, cells = [];
let target = { x: .5, y: .5 }, current = { x: .5, y: .5 }, previousPointer = { x: .5, y: .5 };
let stirTarget = .18, stir = .18, phaseTime = 0, lastTime = null, paused = false, active = false, dirty = true, lastDraw = 0;

function buildGrid() {
  cells = [];
  for (let y = CELL_HEIGHT * .82; y < height; y += CELL_HEIGHT) {
    for (let x = CELL_WIDTH * .5; x < width; x += CELL_WIDTH) cells.push({ x: x, y: y, nx: x / width, ny: y / height });
  }
  context.font = '700 ' + Math.round(CELL_HEIGHT * 1.02) + 'px "JetBrains Mono", monospace';
  context.textAlign = 'center'; context.textBaseline = 'alphabetic'; dirty = true;
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0); buildGrid();
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setTarget(x, y, kick, message) {
  const nextX = Math.max(0, Math.min(1, x)), nextY = Math.max(0, Math.min(1, y));
  const speed = Math.hypot(nextX - previousPointer.x, nextY - previousPointer.y);
  target.x = nextX; target.y = nextY; previousPointer.x = nextX; previousPointer.y = nextY;
  stirTarget = Math.max(stirTarget, Math.min(1, (kick || 0) + speed * 8)); dirty = true;
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  active = true; root.classList.add('d-awave-active'); const box = stageEl.getBoundingClientRect();
  setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, .48, 'Synthetic field stirring');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, .26, 'Synthetic field stirring');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () {
  active = false; root.classList.remove('d-awave-active'); stirTarget = 0; status.textContent = paused ? 'Synthetic signal paused' : 'Synthetic signal running'; dirty = true;
});

function togglePause() {
  if (reduced) {
    phaseTime += .35; dirty = true; status.textContent = 'Static phase advanced'; return;
  }
  paused = !paused; pauseButton.setAttribute('aria-pressed', String(paused)); pauseButton.textContent = paused ? 'Resume field' : 'Pause field';
  status.textContent = paused ? 'Synthetic signal paused' : 'Synthetic signal running'; dirty = true;
}
if (reduced) { pauseButton.textContent = 'Step phase'; status.textContent = 'Reduced motion · static phase'; }
pauseButton.addEventListener('click', function () { togglePause(); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === pauseButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'r', 'R'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { togglePause(); return; }
  if (event.key === 'r' || event.key === 'R') { phaseTime = 0; stirTarget = .18; status.textContent = 'Synthetic phase reset'; dirty = true; return; }
  if (event.key === 'Home') setTarget(.5, .5, .72, 'Stirrer centered');
  else {
    const step = event.shiftKey ? .12 : .055;
    setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), .72, 'Keyboard field stirring');
  }
  active = true; root.classList.add('d-awave-active');
});

function fieldValue(cell) {
  const layerA = Math.sin(cell.nx * 12.4 + phaseTime * 1.35);
  const layerB = Math.sin(cell.ny * 15.2 - phaseTime * .9);
  const layerC = Math.sin((cell.nx + cell.ny) * 9.1 + phaseTime * .63);
  let value = layerA * .38 + layerB * .34 + layerC * .28;
  const dx = cell.x - current.x * width, dy = cell.y - current.y * height, distance = Math.hypot(dx, dy);
  const influence = Math.pow(Math.max(0, 1 - distance / Math.min(118, Math.max(82, width * .25))), 2) * stir;
  value += Math.sin(Math.atan2(dy, dx) * 3 + distance * .095 - phaseTime * 4.2) * influence * 1.15;
  return { normalized: Math.max(0, Math.min(1, .5 + value * .42)), influence: influence };
}
function render() {
  context.fillStyle = '#06040d'; context.fillRect(0, 0, width, height);
  for (const cell of cells) {
    const field = fieldValue(cell), glyphIndex = Math.round(field.normalized * (RAMP.length - 1));
    const red = Math.round(200 + field.influence * 55), green = Math.round(183 - field.influence * 61), blue = Math.round(255 - field.influence * 164);
    const jitter = Math.sin(cell.nx * 8 + phaseTime * 1.7) * field.influence * 2.2;
    context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'; context.fillText(RAMP[glyphIndex], cell.x, cell.y + jitter);
  }
  stirMark.style.transform = 'translate(' + (current.x * width).toFixed(2) + 'px,' + (current.y * height).toFixed(2) + 'px) rotate(' + (phaseTime * 34).toFixed(2) + 'deg) scale(' + (.88 + stir * .2).toFixed(3) + ')';
  stirMark.style.opacity = (.25 + stir * .75).toFixed(3); meter.textContent = String(Math.round(stir * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (lastTime === null) lastTime = time;
  const deltaTime = Math.min(.05, Math.max(0, (time - lastTime) / 1000)); lastTime = time;
  if (!reduced && !paused) { phaseTime += deltaTime; dirty = true; }
  if (reduced) { current.x = target.x; current.y = target.y; stir = stirTarget; }
  else {
    const delta = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(stirTarget - stir);
    current.x += (target.x - current.x) * .18; current.y += (target.y - current.y) * .18; stir += (stirTarget - stir) * .2;
    if (delta > .0005) dirty = true;
  }
  stirTarget *= active ? .955 : .9;
  if (active) stirTarget = Math.max(.22, stirTarget);
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained synthetic ASCII signal animation on canvas with no camera, media stream, permission request, image, or webcam API. Create a fixed 8×10px glyph grid at the measured CSS size. For each cell calculate three independent layers: sin(nx*12.4+time*1.35), sin(ny*15.2-time*0.9), and sin((nx+ny)*9.1+time*0.63), weighted 0.38, 0.34, and 0.28. Convert clamp(0.5+combined*0.42,0,1) into an index in a monotonic ASCII density ramp.

Track a normalized stirrer and infer pointer speed from distance between consecutive normalized pointer positions. Convert speed plus a small pointer or keyboard kick into a clamped stir target. Around the eased stirrer, calculate squared radial influence within an 82–118px radius. Add sin(atan2(dy,dx)*3+distance*0.095-time*4.2)*influence*1.15 to the layered field so pointer motion produces a spiral disturbance rather than merely translating the grid. Tint influenced glyphs from lavender toward orange and allow at most 2.2px vertical jitter.

Advance phase from capped frame delta, ease pointer coordinates by 0.18 and stir by 0.2, decay the stir target after input, render near 30fps, and keep a low active floor while hovered. Pointermove remains passive. Add a visible stir reticle, signal/stir telemetry, polite status, and a semantic pause control. Arrow keys move the virtual stirrer by 0.055, Shift+Arrow by 0.12, Home centers, Space pauses, and R resets phase, without intercepting button keys.

Cap canvas DPR at 2 and rebuild grid positions on resize. Under prefers-reduced-motion, never advance phase automatically: snap stir position and strength directly, preserve pointer and keyboard disturbance, and turn the pause button into an explicit 0.35-radian phase-step control. The static field must still use all three sine layers and the spiral equation. Do not reference getUserMedia, mediaDevices, video elements, or camera permissions anywhere in the implementation.`
});
