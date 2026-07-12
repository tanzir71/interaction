/* INTRX registry — published RASTER & GLITCH demos only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   4x4 Bayer ordered dither
------------------------------------------------------------ */
INTRX.register({
  id: 'dither-bayer',
  title: 'Bayer Dither Field',
  cat: 'Raster & Glitch',
  rootClass: 'd-bayer',
  tags: ['canvas', 'ordered-dither', 'bayer-matrix'],
  libs: [],
  desc: 'A true 4×4 Bayer matrix converts a designed grayscale poster into one-bit pixels. The pointer lowers local thresholds in a soft circular field, revealing light without abandoning the ordered pattern.',
  seen: 'Seen on: generative identity systems, editorial microsites, retro-computing portfolios',
  hint: 'move the threshold lens, use arrow keys, or invert the field',
  html: `
<div class="d-bayer" tabindex="0" aria-label="Interactive ordered-dither poster. Arrow keys move the threshold lens, Home resets it, and Space inverts the palette.">
  <div class="d-bayer-stage">
    <canvas class="d-bayer-canvas" role="img" aria-label="One-bit landscape processed with a four by four Bayer threshold matrix"></canvas>
    <div class="d-bayer-probe" aria-hidden="true"><i></i></div>
    <span class="d-bayer-index" aria-hidden="true">04</span>
  </div>
  <div class="d-bayer-matrix" aria-hidden="true">
    <span>00</span><span>08</span><span>02</span><span>10</span>
    <span>12</span><span>04</span><span>14</span><span>06</span>
    <span>03</span><span>11</span><span>01</span><span>09</span>
    <span>15</span><span>07</span><span>13</span><span>05</span>
  </div>
  <div class="d-bayer-readout" aria-hidden="true"><span>LOCAL Δ</span><strong>26</strong><b>%</b></div>
  <button class="d-bayer-mode" type="button" aria-pressed="false">Invert field</button>
  <p class="d-bayer-status" aria-live="polite">Threshold lens active</p>
</div>`,
  css: `
.d-bayer { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #111114; color: #edff66; touch-action: none; }
.d-bayer:focus-visible { box-shadow: inset 0 0 0 2px #edff66; }
.d-bayer::before { content: ''; position: absolute; inset: 0; opacity: .16; pointer-events: none;
  background-image: linear-gradient(rgba(237,255,102,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(237,255,102,.2) 1px, transparent 1px);
  background-size: 20px 20px; }
.d-bayer-stage { position: absolute; left: 50%; top: 50%; width: min(66%, 440px); height: 220px;
  transform: translate(-50%, -50%); overflow: hidden; border: 1px solid rgba(237,255,102,.38);
  background: #111114; box-shadow: 10px 10px 0 rgba(237,255,102,.1); }
.d-bayer-canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; image-rendering: crisp-edges; }
.d-bayer-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, rgba(255,255,255,.025) 50%, transparent 50%); background-size: 6px 100%; mix-blend-mode: screen; }
.d-bayer-probe { position: absolute; left: 0; top: 0; width: 104px; height: 104px; margin: -52px 0 0 -52px;
  border: 1px solid rgba(255,89,64,.8); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-bayer-probe::before, .d-bayer-probe::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: #ff5940; transform: translate(-50%, -50%); }
.d-bayer-probe::before { width: 14px; height: 1px; }.d-bayer-probe::after { width: 1px; height: 14px; }
.d-bayer-probe i { position: absolute; inset: 11px; border: 1px dashed rgba(255,89,64,.32); border-radius: 50%; }
.d-bayer-index { position: absolute; right: 8px; bottom: -12px; color: rgba(255,89,64,.82);
  font: 800 76px/.9 "Inter", sans-serif; letter-spacing: -.08em; pointer-events: none; mix-blend-mode: difference; }
.d-bayer-matrix { position: absolute; left: 17px; top: 17px; display: grid; grid-template-columns: repeat(4, 17px);
  border: 1px solid rgba(237,255,102,.3); font: 7px/17px "JetBrains Mono", monospace; text-align: center; }
.d-bayer-matrix span { width: 17px; height: 17px; border-right: 1px solid rgba(237,255,102,.18);
  border-bottom: 1px solid rgba(237,255,102,.18); color: rgba(237,255,102,.72); }
.d-bayer-matrix span:nth-child(4n) { border-right: 0; }.d-bayer-matrix span:nth-last-child(-n+4) { border-bottom: 0; }
.d-bayer-readout { position: absolute; right: 18px; top: 17px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(237,255,102,.55); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-bayer-readout strong { min-width: 25px; color: #edff66; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-bayer-readout b { font-weight: 400; }
.d-bayer-mode { position: absolute; left: 18px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(237,255,102,.42);
  border-radius: 999px; background: #111114; color: #edff66; font: 10px "JetBrains Mono", monospace;
  cursor: pointer; transition: background .18s, color .18s, transform .18s; }
.d-bayer-mode:hover { background: #edff66; color: #111114; transform: translateY(-2px); }
.d-bayer-mode:focus-visible { outline: 2px solid #ff5940; outline-offset: 3px; }
.d-bayer-status { position: absolute; right: 18px; bottom: 20px; margin: 0; color: rgba(237,255,102,.55);
  font: 8px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
.d-bayer.d-bayer-invert { background: #edff66; color: #111114; }
.d-bayer.d-bayer-invert::before { background-image: linear-gradient(rgba(17,17,20,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,20,.2) 1px, transparent 1px); }
.d-bayer.d-bayer-invert .d-bayer-matrix { border-color: rgba(17,17,20,.35); }
.d-bayer.d-bayer-invert .d-bayer-matrix span, .d-bayer.d-bayer-invert .d-bayer-readout,
.d-bayer.d-bayer-invert .d-bayer-status { color: rgba(17,17,20,.65); border-color: rgba(17,17,20,.2); }
.d-bayer.d-bayer-invert .d-bayer-readout strong { color: #111114; }
@media (max-width: 620px) { .d-bayer-stage { width: 72%; height: 190px; }.d-bayer-matrix { grid-template-columns: repeat(4, 14px); }.d-bayer-matrix span { width: 14px; height: 14px; line-height: 14px; } }
@media (prefers-reduced-motion: reduce) { .d-bayer-probe { will-change: auto; }.d-bayer-mode { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-bayer-canvas');
const stageEl = root.querySelector('.d-bayer-stage');
const probe = root.querySelector('.d-bayer-probe');
const readout = root.querySelector('.d-bayer-readout strong');
const modeButton = root.querySelector('.d-bayer-mode');
const status = root.querySelector('.d-bayer-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const BAYER_4 = [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
let columns = 1, rows = 1, sourceLuma = new Uint8Array(1), output = null;
let target = { x: .68, y: .36 }, current = { x: target.x, y: target.y };
let inverted = false, dirty = true, lastDraw = 0;

function drawSource() {
  const sky = source.createLinearGradient(0, 0, 0, rows);
  sky.addColorStop(0, '#f4f4f4'); sky.addColorStop(.58, '#777'); sky.addColorStop(1, '#171717');
  source.fillStyle = sky; source.fillRect(0, 0, columns, rows);
  source.fillStyle = '#fff'; source.beginPath(); source.arc(columns * .73, rows * .28, rows * .18, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#292929'; source.beginPath(); source.moveTo(0, rows * .72);
  for (let x = 0; x <= columns; x += 2) source.lineTo(x, rows * (.58 + Math.sin(x * .075) * .055 + Math.sin(x * .021) * .07));
  source.lineTo(columns, rows); source.lineTo(0, rows); source.closePath(); source.fill();
  source.fillStyle = '#b8b8b8'; source.beginPath(); source.moveTo(0, rows * .83);
  for (let x = 0; x <= columns; x += 2) source.lineTo(x, rows * (.72 + Math.sin(x * .047 + 1.8) * .045));
  source.lineTo(columns, rows); source.lineTo(0, rows); source.closePath(); source.fill();
  source.fillStyle = '#101010'; source.font = '800 ' + Math.round(rows * .34) + 'px Inter, sans-serif';
  source.textBaseline = 'bottom'; source.fillText('04', columns * .05, rows * .98);
  const pixels = source.getImageData(0, 0, columns, rows).data;
  sourceLuma = new Uint8Array(columns * rows);
  for (let i = 0; i < sourceLuma.length; i++) {
    const p = i * 4; sourceLuma[i] = Math.round(pixels[p] * .2126 + pixels[p + 1] * .7152 + pixels[p + 2] * .0722);
  }
}

function measure() {
  const box = stageEl.getBoundingClientRect();
  columns = Math.max(72, Math.round(box.width / 3)); rows = Math.max(48, Math.round(box.height / 3));
  canvas.width = sourceCanvas.width = columns; canvas.height = sourceCanvas.height = rows;
  context.imageSmoothingEnabled = false; drawSource(); output = context.createImageData(columns, rows); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setTarget(x, y, message) {
  target.x = Math.max(0, Math.min(1, x)); target.y = Math.max(0, Math.min(1, y)); dirty = true;
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect();
  setTarget((event.clientX - box.left) / Math.max(1, box.width), (event.clientY - box.top) / Math.max(1, box.height), 'Threshold lens tracking');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () { setTarget(.68, .36, 'Threshold lens returned'); });

function setInverted(next) {
  inverted = next; root.classList.toggle('d-bayer-invert', inverted);
  modeButton.setAttribute('aria-pressed', String(inverted)); modeButton.textContent = inverted ? 'Restore field' : 'Invert field';
  status.textContent = inverted ? 'Palette inverted' : 'Palette restored'; dirty = true;
}
modeButton.addEventListener('click', function () { setInverted(!inverted); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === modeButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' '];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === ' ') { setInverted(!inverted); return; }
  if (event.key === 'Home') { setTarget(.5, .5, 'Threshold lens centered'); return; }
  const step = event.shiftKey ? .12 : .055;
  setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
    target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard threshold lens');
});

function render(time) {
  const data = output.data;
  const pulse = reduced ? 0 : Math.sin(time * .0018) * .035;
  const strength = .26 + pulse;
  const paper = inverted ? [17,17,20] : [237,255,102];
  const ink = inverted ? [237,255,102] : [17,17,20];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const nx = x / Math.max(1, columns - 1), ny = y / Math.max(1, rows - 1);
      const distance = Math.hypot(nx - current.x, (ny - current.y) * (rows / columns));
      const proximity = Math.max(0, 1 - distance / .29);
      const threshold = Math.max(.025, Math.min(.975, (BAYER_4[y & 3][x & 3] + .5) / 16 - proximity * proximity * strength));
      const color = sourceLuma[y * columns + x] / 255 >= threshold ? paper : ink;
      const p = (y * columns + x) * 4; data[p] = color[0]; data[p + 1] = color[1]; data[p + 2] = color[2]; data[p + 3] = 255;
    }
  }
  context.putImageData(output, 0, 0);
  const box = stageEl.getBoundingClientRect();
  probe.style.transform = 'translate(' + (current.x * box.width).toFixed(2) + 'px,' + (current.y * box.height).toFixed(2) + 'px)';
  readout.textContent = String(Math.round(strength * 100)).padStart(2, '0'); dirty = false;
}

function frameLoop(time) {
  if (reduced) { current.x = target.x; current.y = target.y; }
  else {
    const oldX = current.x, oldY = current.y;
    current.x += (target.x - current.x) * .16; current.y += (target.y - current.y) * .16;
    if (Math.abs(current.x - oldX) + Math.abs(current.y - oldY) > .0001) dirty = true;
  }
  if (!reduced) dirty = true;
  if (dirty && (reduced || time - lastDraw >= 32)) { render(time); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained one-bit ordered-dither poster using a real 4×4 Bayer threshold matrix on canvas. Render a designed grayscale source at a deliberately low logical resolution: a vertical tonal gradient, bright sun disc, two layered sinusoidal ridges, and oversized dark index typography. Read its pixels once after startup or resize and cache Rec.709 luminance as 0.2126R+0.7152G+0.0722B. Display the output canvas at full CSS size with image-rendering:pixelated.

Use the canonical matrix rows [0,8,2,10], [12,4,14,6], [3,11,1,9], and [15,7,13,5]. For every logical pixel compare normalized luminance against (matrix[y mod 4][x mod 4]+0.5)/16. Turn the result into exactly two palette colors. Add a circular pointer field in normalized coordinates: proximity=max(0,1-distance/0.29), then subtract proximity squared times a roughly 0.26 threshold strength. This must reveal light near the pointer while retaining the ordered four-pixel lattice, not paint a translucent spotlight over a pre-rendered image.

Ease the normalized probe toward pointer targets by 0.16 per frame and give threshold strength a restrained ±0.035 pulse. Cap rendering near 30fps, cache source luminance between resizes, reuse one ImageData buffer, and update the pixels, probe transform, and strength readout together. Rebuild the low-resolution source from the measured stage size using about one logical pixel per three CSS pixels.

Provide a semantic aria-pressed palette inversion button, visible keyboard focus, and polite status text. Arrow keys move a virtual lens by 0.055, Shift+Arrow by 0.12, Home centers it, and Space inverts; do not intercept keys originating on the button. Pointer and resize listeners stay passive. Under prefers-reduced-motion, remove easing and threshold pulsing, render only when dirty, but preserve the exact Bayer comparison, pointer and keyboard placement, resize behavior, inversion, static 26% local threshold change, and pixelated output.`
});

/* ------------------------------------------------------------
   Floyd–Steinberg color resolve
------------------------------------------------------------ */
INTRX.register({
  id: 'dither-floyd-steinberg',
  title: 'Floyd–Steinberg Resolve',
  cat: 'Raster & Glitch',
  rootClass: 'd-fs',
  tags: ['canvas', 'error-diffusion', 'color-reveal'],
  libs: [],
  desc: 'Canonical Floyd–Steinberg diffusion turns a vivid source poster into a one-bit raster. Hover opens a moving window back to the cached RGB source while a lock control resolves the entire frame.',
  seen: 'Seen on: digital-art archives, image-led portfolios, experimental editorial covers',
  hint: 'hover to resolve color, use arrow keys, or lock the full frame',
  html: `
<div class="d-fs" tabindex="0" aria-label="Floyd-Steinberg dither with color reveal. Arrow keys move the reveal, Home centers it, Space locks color, and Escape collapses it.">
  <span class="d-fs-kicker">ERROR DIFFUSION / RGB</span>
  <div class="d-fs-weights" aria-hidden="true"><span>→ 7/16</span><span>↙ 3/16</span><span>↓ 5/16</span><span>↘ 1/16</span></div>
  <div class="d-fs-stage">
    <canvas class="d-fs-canvas" role="img" aria-label="A one-bit Floyd-Steinberg poster resolving into full color near the pointer"></canvas>
    <div class="d-fs-lens" aria-hidden="true"><i></i><b>RGB</b></div>
    <span class="d-fs-corner" aria-hidden="true">FS<br>01</span>
  </div>
  <div class="d-fs-meter" aria-hidden="true"><span>RESOLVE</span><strong>00</strong><b>%</b></div>
  <button class="d-fs-lock" type="button" aria-pressed="false">Lock full color</button>
  <p class="d-fs-status" aria-live="polite">One-bit diffusion active</p>
</div>`,
  css: `
.d-fs { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #d7d5cd; color: #111114; touch-action: none; }
.d-fs:focus-visible { box-shadow: inset 0 0 0 2px #6549ff; }
.d-fs::before { content: ''; position: absolute; inset: 0; opacity: .24; pointer-events: none;
  background-image: radial-gradient(rgba(17,17,20,.35) .65px, transparent .65px); background-size: 5px 5px; }
.d-fs-stage { position: absolute; left: 50%; top: 50%; width: min(67%, 448px); height: 220px;
  transform: translate(-50%, -50%); overflow: hidden; background: #111114; border: 1px solid rgba(17,17,20,.46);
  box-shadow: 9px 9px 0 rgba(17,17,20,.15); }
.d-fs-canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; image-rendering: crisp-edges; }
.d-fs-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .16;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.12) 3px 4px); mix-blend-mode: overlay; }
.d-fs-lens { position: absolute; left: 0; top: 0; width: 126px; height: 126px; margin: -63px 0 0 -63px;
  border: 1px solid rgba(255,255,255,.82); border-radius: 50%; color: #fff; pointer-events: none;
  mix-blend-mode: difference; opacity: 0; transform: translate(-200px,-200px) scale(.72); will-change: transform, opacity; }
.d-fs-lens::before, .d-fs-lens::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: currentColor; transform: translate(-50%, -50%); }
.d-fs-lens::before { width: 17px; height: 1px; }.d-fs-lens::after { width: 1px; height: 17px; }
.d-fs-lens i { position: absolute; inset: 10px; border: 1px dashed rgba(255,255,255,.42); border-radius: 50%; }
.d-fs-lens b { position: absolute; right: 12px; bottom: 10px; font: 8px "JetBrains Mono", monospace; letter-spacing: .12em; }
.d-fs.d-fs-active .d-fs-lens { opacity: 1; }
.d-fs.d-fs-locked .d-fs-lens { border-style: dashed; }
.d-fs-corner { position: absolute; right: 9px; bottom: 7px; color: rgba(255,255,255,.78);
  font: 700 25px/.77 "Inter", sans-serif; letter-spacing: -.06em; text-align: right; mix-blend-mode: difference; }
.d-fs-kicker { position: absolute; left: 17px; top: 18px; color: rgba(17,17,20,.6);
  font: 8px "JetBrains Mono", monospace; letter-spacing: .14em; }
.d-fs-weights { position: absolute; left: 17px; top: 42px; display: grid; grid-template-columns: auto auto; gap: 3px 10px;
  color: rgba(17,17,20,.48); font: 7px "JetBrains Mono", monospace; letter-spacing: .05em; }
.d-fs-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(17,17,20,.52); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-fs-meter strong { min-width: 27px; color: #111114; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-fs-meter b { font-weight: 400; }
.d-fs-lock { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(17,17,20,.42);
  border-radius: 999px; background: rgba(215,213,205,.78); color: #111114; font: 10px "JetBrains Mono", monospace;
  cursor: pointer; transition: color .18s, background .18s, transform .18s; }
.d-fs-lock:hover, .d-fs-lock[aria-pressed="true"] { color: #fff; background: #6549ff; transform: translateY(-2px); }
.d-fs-lock:focus-visible { outline: 2px solid #6549ff; outline-offset: 3px; }
.d-fs-status { position: absolute; right: 18px; bottom: 20px; margin: 0; max-width: 45%; text-align: right;
  color: rgba(17,17,20,.54); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-fs-stage { width: 73%; height: 190px; }.d-fs-weights { display: none; }.d-fs-lens { width: 106px; height: 106px; margin: -53px 0 0 -53px; } }
@media (prefers-reduced-motion: reduce) { .d-fs-lens { will-change: auto; }.d-fs-lock { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-fs-canvas');
const stageEl = root.querySelector('.d-fs-stage');
const lens = root.querySelector('.d-fs-lens');
const meter = root.querySelector('.d-fs-meter strong');
const lockButton = root.querySelector('.d-fs-lock');
const status = root.querySelector('.d-fs-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAPER = [238, 237, 227], INK = [15, 15, 18];
let columns = 1, rows = 1, sourcePixels = new Uint8ClampedArray(4), ditherBits = new Uint8Array(1), output = null;
let target = { x: .58, y: .44 }, current = { x: target.x, y: target.y };
let targetAmount = 0, amount = 0, hovering = false, locked = false, dirty = true, lastDraw = 0;

function drawSource() {
  const backdrop = source.createLinearGradient(0, 0, columns, rows);
  backdrop.addColorStop(0, '#ff5e4d'); backdrop.addColorStop(.46, '#7747ff'); backdrop.addColorStop(1, '#48e3c2');
  source.fillStyle = backdrop; source.fillRect(0, 0, columns, rows);
  source.fillStyle = 'rgba(255,240,91,.96)'; source.beginPath(); source.arc(columns * .73, rows * .31, rows * .24, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(15,15,18,.88)'; source.fillRect(columns * .08, rows * .12, columns * .24, rows * .76);
  source.strokeStyle = 'rgba(255,255,255,.72)'; source.lineWidth = Math.max(1, rows * .015);
  for (let i = -2; i < 7; i++) { source.beginPath(); source.moveTo(columns * (i * .16), rows); source.lineTo(columns * (i * .16 + .38), 0); source.stroke(); }
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(rows * .31) + 'px Inter, sans-serif'; source.textBaseline = 'middle';
  source.save(); source.translate(columns * .13, rows * .82); source.rotate(-Math.PI / 2); source.fillText('ERROR', 0, 0); source.restore();
  source.fillStyle = '#101012'; source.font = '700 ' + Math.round(rows * .14) + 'px JetBrains Mono, monospace'; source.fillText('7/16', columns * .55, rows * .76);
  sourcePixels = source.getImageData(0, 0, columns, rows).data;
}

function diffuse() {
  const work = new Float32Array(columns * rows);
  ditherBits = new Uint8Array(columns * rows);
  for (let i = 0; i < work.length; i++) {
    const p = i * 4; work[i] = sourcePixels[p] * .2126 + sourcePixels[p + 1] * .7152 + sourcePixels[p + 2] * .0722;
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const index = y * columns + x;
      const quantized = work[index] < 128 ? 0 : 255;
      ditherBits[index] = quantized; const error = work[index] - quantized;
      if (x + 1 < columns) work[index + 1] += error * 7 / 16;
      if (y + 1 < rows) {
        if (x > 0) work[index + columns - 1] += error * 3 / 16;
        work[index + columns] += error * 5 / 16;
        if (x + 1 < columns) work[index + columns + 1] += error * 1 / 16;
      }
    }
  }
}

function measure() {
  const box = stageEl.getBoundingClientRect();
  columns = Math.max(96, Math.round(box.width / 2)); rows = Math.max(54, Math.round(box.height / 2));
  canvas.width = sourceCanvas.width = columns; canvas.height = sourceCanvas.height = rows;
  context.imageSmoothingEnabled = false; drawSource(); diffuse(); output = context.createImageData(columns, rows); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setTarget(x, y, message) {
  target.x = Math.max(0, Math.min(1, x)); target.y = Math.max(0, Math.min(1, y)); dirty = true;
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  hovering = true; if (!locked) targetAmount = 1; root.classList.add('d-fs-active');
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local color resolving');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local color resolving');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () {
  hovering = false; if (!locked) { targetAmount = 0; root.classList.remove('d-fs-active'); status.textContent = 'One-bit diffusion active'; }
});

function setLocked(next) {
  locked = next; targetAmount = locked || hovering ? 1 : 0;
  root.classList.toggle('d-fs-locked', locked); root.classList.toggle('d-fs-active', locked || hovering);
  lockButton.setAttribute('aria-pressed', String(locked)); lockButton.textContent = locked ? 'Return to dither' : 'Lock full color';
  status.textContent = locked ? 'Full color locked' : hovering ? 'Local color resolving' : 'One-bit diffusion active'; dirty = true;
}
lockButton.addEventListener('click', function () { setLocked(!locked); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === lockButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Escape'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === ' ') { setLocked(!locked); return; }
  if (event.key === 'Escape') { setLocked(false); hovering = false; targetAmount = 0; root.classList.remove('d-fs-active'); status.textContent = 'Color reveal collapsed'; return; }
  if (event.key === 'Home') setTarget(.5, .5, 'Color probe centered');
  else {
    const step = event.shiftKey ? .12 : .055;
    setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard color probe');
  }
  hovering = true; if (!locked) targetAmount = 1; root.classList.add('d-fs-active');
});

function smoothstep(edge0, edge1, value) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
function render() {
  const data = output.data;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const index = y * columns + x, p = index * 4;
      const dx = x / Math.max(1, columns - 1) - current.x;
      const dy = (y / Math.max(1, rows - 1) - current.y) * (rows / columns);
      const local = smoothstep(.31, .22, Math.hypot(dx, dy));
      const mix = locked ? amount : amount * local;
      const mono = ditherBits[index] ? PAPER : INK;
      data[p] = Math.round(mono[0] + (sourcePixels[p] - mono[0]) * mix);
      data[p + 1] = Math.round(mono[1] + (sourcePixels[p + 1] - mono[1]) * mix);
      data[p + 2] = Math.round(mono[2] + (sourcePixels[p + 2] - mono[2]) * mix); data[p + 3] = 255;
    }
  }
  context.putImageData(output, 0, 0);
  const box = stageEl.getBoundingClientRect();
  lens.style.transform = 'translate(' + (current.x * box.width).toFixed(2) + 'px,' + (current.y * box.height).toFixed(2) + 'px) scale(' + (.72 + amount * .28).toFixed(3) + ')';
  lens.style.opacity = amount.toFixed(3); meter.textContent = String(Math.round(amount * 100)).padStart(2, '0'); dirty = false;
}

function frameLoop(time) {
  if (reduced) { current.x = target.x; current.y = target.y; amount = targetAmount; }
  else {
    const previous = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(targetAmount - amount);
    current.x += (target.x - current.x) * .16; current.y += (target.y - current.y) * .16; amount += (targetAmount - amount) * .13;
    if (previous > .0005) dirty = true;
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained Floyd–Steinberg image treatment that begins as a genuine one-bit error-diffused raster and locally resolves to its original RGB source on hover. Draw a colorful procedural editorial poster into an offscreen canvas at roughly one logical pixel per two CSS pixels, then cache its RGBA pixels. Compute Rec.709 luminance with 0.2126R+0.7152G+0.0722B into a Float32Array so propagated error retains fractional precision.

Scan every row from left to right. Quantize each working luminance to 0 below 128 or 255 otherwise, save that bit, and diffuse error=old-quantized only to unprocessed neighbors: right gets 7/16, next-row left gets 3/16, next-row center gets 5/16, and next-row right gets 1/16. Guard every edge explicitly. Recompute the source and diffusion only on initial measurement or resize; do not rerun diffusion during pointer movement.

For interaction, reuse one ImageData buffer and mix each cached monochrome pixel toward its original RGB pixel. A normalized pointer probe defines a circular local mask using smoothstep from radius 0.31 to 0.22, corrected by rows/columns so it appears circular in CSS space. Ease probe coordinates by 0.16 and reveal amount by 0.13. Hover expands the local full-color resolve; pointerleave returns to one-bit. A semantic aria-pressed control can lock the entire frame to full color, bypassing only the spatial mask while retaining the eased amount.

Arrow keys move the virtual probe by 0.055, Shift+Arrow by 0.12, Home centers, Space toggles the full-color lock, and Escape collapses the reveal. Ignore keys from the button, preserve focus indication, use passive pointermove and resize listeners, and announce states politely. Cap pixel reconstruction near 30fps and stop redrawing once settled. Under prefers-reduced-motion, assign coordinates and reveal amount directly, keep the same diffusion result and color mixing, and redraw only when interaction or resize marks the frame dirty.`
});

