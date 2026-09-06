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
  css: `.d-awave{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0 0 10px;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end}.d-awave>span,.d-awave>[class$="-meter"],.d-awave>[class$="-weights"],.d-awave>[class$="-spectrum"],.d-awave>[class$="-scale"],.d-awave>[class$="-ramp"],.d-awave>[class$="-weight"],.d-awave>[class$="-waves"]{display:none}.d-awave>[class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#d5dcca}.d-awave canvas{width:100%;height:100%;display:block}.d-awave>[class$="-stage"]>*:not(canvas){display:none}.d-awave [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-awave button{position:relative;min-height:28px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;cursor:pointer;z-index:5}.d-awave button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-awave button:focus-visible,.d-awave:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-awave [class$="-actions"]{display:flex;gap:8px}`,
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
  prompt: `Build Synthetic ASCII Wave as a native300×320px component. Use the sine-driven glyph field as a full image with one pause control. Keep the computed RGB wave colors and keyboard stirrer, without camera legends or meters. Keep visible interface text in regular Inter400–500. Literal ASCII/bitmap glyph rendering and terminal code retain their intentional fixed-width character metrics. Preserve real interactive states, polite announcements, keyboard focus, cancellation, resize cleanup and reduced-motion alternatives. Hide technical headers and decorative readout/footer panels without removing nodes used by the behavior.`
});
