/* INTRX registry — published halftone demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'halftone-dots',
  title: 'Luminance Halftone Field',
  cat: 'Raster & Glitch',
  rootClass: 'd-half',
  tags: ['canvas', 'halftone', 'luminance'],
  libs: [],
  desc: 'A classic 15-degree print screen samples a designed grayscale source into area-correct ink dots. The pointer acts like local pressure, swelling nearby dots while the original luminance structure remains legible.',
  seen: 'Seen on: editorial identities, print-inspired portfolios, culture and music campaigns',
  hint: 'move through the print screen, pin the pressure, or use arrow keys',
  html: `
<div class="d-half" tabindex="0" aria-label="Interactive luminance halftone. Arrow keys move the pressure field, Home centers it, Space pins it, and Escape releases it.">
  <span class="d-half-kicker">AM SCREEN / 15°</span>
  <div class="d-half-stage">
    <canvas class="d-half-canvas" role="img" aria-label="A grayscale poster represented by rotated halftone dots whose radius follows luminance"></canvas>
    <div class="d-half-probe" aria-hidden="true"><i></i><b>PRESS</b></div>
    <span class="d-half-registration" aria-hidden="true">+</span>
  </div>
  <div class="d-half-meter" aria-hidden="true"><span>PRESSURE</span><strong>028</strong><b>%</b></div>
  <div class="d-half-scale" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <button class="d-half-pin" type="button" aria-pressed="false">Pin pressure</button>
  <p class="d-half-status" aria-live="polite">Ambient screen pressure</p>
</div>`,
  css: `
.d-half { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #f1e9d8; color: #141b36; touch-action: none; }
.d-half:focus-visible { box-shadow: inset 0 0 0 2px #ff563f; }
.d-half::before { content: ''; position: absolute; inset: 0; opacity: .22; pointer-events: none;
  background-image: radial-gradient(rgba(20,27,54,.28) .65px, transparent .65px); background-size: 6px 6px; }
.d-half-stage { position: absolute; left: 50%; top: 50%; width: min(68%, 452px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(20,27,54,.42); background: #f7f0df; box-shadow: 9px 9px 0 rgba(20,27,54,.12); }
.d-half-canvas { display: block; width: 100%; height: 100%; }
.d-half-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .13;
  background: repeating-linear-gradient(90deg, transparent 0 2px, rgba(20,27,54,.16) 2px 3px); mix-blend-mode: multiply; }
.d-half-probe { position: absolute; left: 0; top: 0; width: 112px; height: 112px; margin: -56px 0 0 -56px;
  border: 1px solid rgba(255,86,63,.82); border-radius: 50%; color: #ff563f; pointer-events: none; opacity: .42; will-change: transform, opacity; }
.d-half-probe::before, .d-half-probe::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-half-probe::before { width: 15px; height: 1px; }.d-half-probe::after { width: 1px; height: 15px; }
.d-half-probe i { position: absolute; inset: 11px; border: 1px dashed rgba(255,86,63,.5); border-radius: 50%; }
.d-half-probe b { position: absolute; right: 10px; bottom: 9px; font: 7px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-half.d-half-active .d-half-probe { opacity: 1; }
.d-half-registration { position: absolute; right: 8px; top: 4px; color: rgba(255,86,63,.82); font: 26px/1 "JetBrains Mono", monospace; }
.d-half-kicker { position: absolute; left: 17px; top: 18px; color: rgba(20,27,54,.58); font: 8px "JetBrains Mono", monospace; letter-spacing: .14em; }
.d-half-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(20,27,54,.5); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-half-meter strong { min-width: 34px; color: #141b36; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-half-meter b { font-weight: 400; }
.d-half-scale { position: absolute; left: 17px; top: 43px; display: flex; align-items: center; gap: 5px; }
.d-half-scale i { display: block; border-radius: 50%; background: #141b36; }
.d-half-scale i:nth-child(1) { width: 2px; height: 2px; }.d-half-scale i:nth-child(2) { width: 4px; height: 4px; }
.d-half-scale i:nth-child(3) { width: 6px; height: 6px; }.d-half-scale i:nth-child(4) { width: 8px; height: 8px; }
.d-half-scale i:nth-child(5) { width: 10px; height: 10px; }.d-half-scale i:nth-child(6) { width: 12px; height: 12px; }
.d-half-pin { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(20,27,54,.4);
  border-radius: 999px; background: rgba(241,233,216,.82); color: #141b36; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-half-pin:hover, .d-half-pin[aria-pressed="true"] { background: #141b36; color: #f7f0df; transform: translateY(-2px); }
.d-half-pin:focus-visible { outline: 2px solid #ff563f; outline-offset: 3px; }
.d-half-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(20,27,54,.54); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-half-stage { width: 74%; height: 190px; }.d-half-scale { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-half-probe { will-change: auto; }.d-half-pin { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-half-canvas');
const stageEl = root.querySelector('.d-half-stage');
const probe = root.querySelector('.d-half-probe');
const meter = root.querySelector('.d-half-meter strong');
const pinButton = root.querySelector('.d-half-pin');
const status = root.querySelector('.d-half-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ANGLE = 15 * Math.PI / 180, CELL = 9;
let width = 1, height = 1, dpr = 1, dots = [];
let target = { x: .64, y: .42 }, current = { x: target.x, y: target.y };
let targetPressure = .28, pressure = targetPressure, hovering = false, pinned = false, dirty = true, lastDraw = 0;

function drawSource() {
  const wash = source.createLinearGradient(0, 0, width, height);
  wash.addColorStop(0, '#f5f5f5'); wash.addColorStop(.46, '#a9a9a9'); wash.addColorStop(1, '#242424');
  source.fillStyle = wash; source.fillRect(0, 0, width, height);
  source.fillStyle = '#111'; source.beginPath(); source.arc(width * .72, height * .35, height * .26, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#e5e5e5'; source.beginPath(); source.arc(width * .72, height * .35, height * .12, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#333'; source.beginPath(); source.moveTo(0, height * .75); source.lineTo(width * .47, height * .38);
  source.lineTo(width * .62, height); source.lineTo(0, height); source.closePath(); source.fill();
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(height * .34) + 'px Inter, sans-serif'; source.textBaseline = 'bottom'; source.fillText('DOT', width * .05, height * .95);
}
function buildDots() {
  drawSource(); const pixels = source.getImageData(0, 0, width, height).data;
  const cos = Math.cos(ANGLE), sin = Math.sin(ANGLE), cx = width * .5, cy = height * .5;
  const reach = Math.hypot(width, height) * .7 + CELL * 2; dots = [];
  for (let v = -reach; v <= reach; v += CELL) {
    for (let u = -reach; u <= reach; u += CELL) {
      const x = cx + u * cos - v * sin, y = cy + u * sin + v * cos;
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      const index = (Math.floor(y) * width + Math.floor(x)) * 4;
      const luminance = (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
      const darkness = Math.max(0, Math.min(1, 1 - luminance));
      dots.push({ x: x, y: y, darkness: darkness, radius: CELL * .52 * Math.sqrt(darkness) });
    }
  }
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = width; sourceCanvas.height = height; context.setTransform(dpr, 0, 0, dpr, 0, 0); buildDots(); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setTarget(x, y, message) {
  target.x = Math.max(0, Math.min(1, x)); target.y = Math.max(0, Math.min(1, y)); dirty = true;
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  hovering = true; targetPressure = 1; root.classList.add('d-half-active');
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local dots swelling');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local dots swelling');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () {
  hovering = false; if (!pinned) { targetPressure = .28; root.classList.remove('d-half-active'); status.textContent = 'Ambient screen pressure'; dirty = true; }
});
function setPinned(next) {
  pinned = next; targetPressure = pinned || hovering ? 1 : .28;
  root.classList.toggle('d-half-active', pinned || hovering); pinButton.setAttribute('aria-pressed', String(pinned));
  pinButton.textContent = pinned ? 'Release pressure' : 'Pin pressure'; status.textContent = pinned ? 'Pressure field pinned' : hovering ? 'Local dots swelling' : 'Ambient screen pressure'; dirty = true;
}
pinButton.addEventListener('click', function () { setPinned(!pinned); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === pinButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { setPinned(!pinned); return; }
  if (event.key === 'Escape') { setPinned(false); hovering = false; targetPressure = .28; root.classList.remove('d-half-active'); status.textContent = 'Pressure released'; return; }
  if (event.key === 'Home') setTarget(.5, .5, 'Pressure field centered');
  else {
    const step = event.shiftKey ? .12 : .055;
    setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard pressure field');
  }
  hovering = true; targetPressure = 1; root.classList.add('d-half-active');
});

function render() {
  context.fillStyle = '#f7f0df'; context.fillRect(0, 0, width, height);
  const px = current.x * width, py = current.y * height, fieldRadius = Math.min(106, Math.max(72, width * .23));
  for (const dot of dots) {
    const proximity = Math.max(0, 1 - Math.hypot(dot.x - px, dot.y - py) / fieldRadius);
    const influence = proximity * proximity * pressure;
    const radius = Math.min(CELL * .92, dot.radius + influence * (CELL * .46 + (1 - dot.darkness) * CELL * .16));
    const red = Math.round(20 + influence * 235), green = Math.round(27 + influence * 59), blue = Math.round(54 - influence * 3);
    context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'; context.beginPath(); context.arc(dot.x, dot.y, Math.max(.18, radius), 0, Math.PI * 2); context.fill();
  }
  probe.style.transform = 'translate(' + (current.x * width).toFixed(2) + 'px,' + (current.y * height).toFixed(2) + 'px) scale(' + (.86 + pressure * .14).toFixed(3) + ')';
  probe.style.opacity = (.32 + pressure * .68).toFixed(3); meter.textContent = String(Math.round(pressure * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (reduced) { current.x = target.x; current.y = target.y; pressure = targetPressure; }
  else {
    const delta = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(targetPressure - pressure);
    current.x += (target.x - current.x) * .17; current.y += (target.y - current.y) * .17; pressure += (targetPressure - pressure) * .14;
    if (delta > .0005) dirty = true;
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained amplitude-modulated halftone dot interaction on canvas. First draw a deliberate grayscale source poster into an offscreen canvas at the measured CSS size and cache its pixels. Create a square sampling lattice with 9px spacing, rotated exactly 15 degrees around the image center. Iterate a grid large enough to cover the rotated bounds, transform every lattice coordinate into image x/y, discard samples outside the image, and sample Rec.709 luminance as (0.2126R+0.7152G+0.0722B)/255.

For dark ink on light paper calculate darkness=clamp(1-luminance,0,1) and baseRadius=cell*0.52*sqrt(darkness). The square root is required because printed tone follows dot area rather than radius. Cache each dot's x/y, darkness, and base radius on startup or resize; pointer animation must never reread source pixels. Render the paper and cached circles into a device-pixel-ratio-aware canvas, capping DPR at 2 and drawing in CSS coordinates through setTransform.

The pointer defines a 72–106px pressure field. Compute proximity=max(0,1-distance/radius), square it, and multiply by eased pressure. Swell each dot by that influence times cell*0.46 plus a smaller highlight allowance proportional to 1-darkness, capped at cell*0.92. Tint only influenced ink toward an orange registration color while preserving the luminance-derived base radius outside the field. Ease position by 0.17 and pressure by 0.14, cap redraw near 30fps, and stop once settled.

Pointerenter raises pressure to 1, pointerleave returns it to a subtle 0.28 ambient state unless pinned, and pointermove stays passive. Add a semantic aria-pressed pin button, polite status updates, visible focus, a reticle, and pressure readout. Arrow keys move by 0.055, Shift+Arrow by 0.12, Home centers, Space pins, and Escape releases, without intercepting button keys. Under prefers-reduced-motion, snap position and pressure directly while retaining exact radius math, pointer and keyboard control, pinning, DPR handling, responsive source rebuilding, and the static locally swollen result.`
});
