/* INTRX registry — published local posterize demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'posterize-hover',
  title: 'Local Posterize Lens',
  cat: 'Raster & Glitch',
  rootClass: 'd-poster',
  tags: ['canvas', 'posterize', 'color-depth'],
  libs: [],
  desc: 'A measured cursor lens collapses each RGB channel to an exact two- or three-level palette in its core. Full source bytes remain untouched outside, with only a narrow smooth annulus bridging the color-depth boundary.',
  seen: 'Seen on: image experiments, digital fashion, creative-development and photography portfolios',
  hint: 'hover to collapse color depth, switch levels, or pin the lens',
  html: `
<div class="d-poster" tabindex="0" aria-label="Interactive posterize lens. Move or use arrow keys to place it, L switches two or three levels, Space pins it, Home centers, and Escape releases.">
  <span class="d-poster-kicker">LOCAL QUANTIZE / RGB</span>
  <div class="d-poster-stage">
    <canvas class="d-poster-canvas" role="img" aria-label="A full-color image reduced to two or three channel levels only near the cursor"></canvas>
    <div class="d-poster-lens" aria-hidden="true"><i></i><b>3 LVL</b></div>
    <span class="d-poster-source" aria-hidden="true">8 BIT SOURCE</span>
  </div>
  <div class="d-poster-meter" aria-hidden="true"><span>LEVELS</span><strong>03</strong></div>
  <div class="d-poster-palette" aria-hidden="true"><i></i><i></i><i></i><span>0 / 128 / 255</span></div>
  <div class="d-poster-actions">
    <button class="d-poster-level" type="button">Use 2 levels</button>
    <button class="d-poster-pin" type="button" aria-pressed="false">Pin lens</button>
  </div>
  <p class="d-poster-status" aria-live="polite">Full-depth source active</p>
</div>`,
  css: `
.d-poster { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #11131b; color: #dde0ec; touch-action: none; }
.d-poster:focus-visible { box-shadow: inset 0 0 0 2px #ff795d; }
.d-poster::before { content: ''; position: absolute; inset: 0; opacity: .18; pointer-events: none;
  background-image: linear-gradient(rgba(221,224,236,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(221,224,236,.13) 1px, transparent 1px); background-size: 24px 24px; }
.d-poster-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(221,224,236,.39); background: #06070b; box-shadow: 9px 9px 0 rgba(255,121,93,.09); }
.d-poster-canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; image-rendering: crisp-edges; }
.d-poster-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .1;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.12) 3px 4px); mix-blend-mode: screen; }
.d-poster-lens { position: absolute; left: 0; top: 0; width: 124px; height: 124px; margin: -62px 0 0 -62px;
  border: 1px solid rgba(255,255,255,.78); border-radius: 50%; color: #fff; pointer-events: none; mix-blend-mode: difference; opacity: .28; will-change: transform, opacity; }
.d-poster-lens::before, .d-poster-lens::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-poster-lens::before { width: 15px; height: 1px; }.d-poster-lens::after { width: 1px; height: 15px; }
.d-poster-lens i { position: absolute; inset: 18%; border: 1px dashed currentColor; border-radius: 50%; opacity: .55; }
.d-poster-lens b { position: absolute; right: 10px; bottom: 9px; font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-poster.d-poster-active .d-poster-lens { opacity: 1; }
.d-poster-source { position: absolute; right: 8px; top: 7px; color: rgba(255,255,255,.72); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; mix-blend-mode: difference; }
.d-poster-kicker { position: absolute; left: 17px; top: 18px; color: rgba(221,224,236,.53); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-poster-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 5px;
  color: rgba(221,224,236,.46); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-poster-meter strong { min-width: 24px; color: #dde0ec; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-poster-palette { position: absolute; left: 17px; top: 43px; display: flex; align-items: center; gap: 4px; }
.d-poster-palette i { width: 13px; height: 13px; border: 1px solid rgba(221,224,236,.3); }.d-poster-palette i:nth-child(1) { background: #000; }
.d-poster-palette i:nth-child(2) { background: #808080; }.d-poster-palette i:nth-child(3) { background: #fff; }
.d-poster-palette span { margin-left: 5px; color: rgba(221,224,236,.47); font: 7px "JetBrains Mono", monospace; letter-spacing: .07em; }
.d-poster-actions { position: absolute; left: 17px; bottom: 17px; display: flex; gap: 7px; }
.d-poster-actions button { padding: 8px 11px; border: 1px solid rgba(221,224,236,.36); border-radius: 999px; background: rgba(17,19,27,.84);
  color: #dde0ec; font: 9px "JetBrains Mono", monospace; cursor: pointer; transition: background .18s, color .18s, transform .18s; }
.d-poster-actions button:hover, .d-poster-pin[aria-pressed="true"] { background: #dde0ec; color: #11131b; transform: translateY(-2px); }
.d-poster-actions button:focus-visible { outline: 2px solid #ff795d; outline-offset: 3px; }
.d-poster-status { position: absolute; right: 18px; bottom: 20px; max-width: 38%; margin: 0; text-align: right;
  color: rgba(221,224,236,.49); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-poster-stage { width: 75%; height: 190px; }.d-poster-palette { display: none; }.d-poster-actions button { padding: 8px 8px; font-size: 8px; } }
@media (prefers-reduced-motion: reduce) { .d-poster-lens { will-change: auto; }.d-poster-actions button { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-poster-canvas');
const stageEl = root.querySelector('.d-poster-stage');
const lens = root.querySelector('.d-poster-lens');
const lensLabel = root.querySelector('.d-poster-lens b');
const meter = root.querySelector('.d-poster-meter strong');
const levelButton = root.querySelector('.d-poster-level');
const pinButton = root.querySelector('.d-poster-pin');
const status = root.querySelector('.d-poster-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const INNER_RADIUS = .18, OUTER_RADIUS = .30;
let columns = 1, rows = 1, sourcePixels = new Uint8ClampedArray(4), output = null, levels = 3;
let target = { x: .6, y: .42 }, current = { x: target.x, y: target.y };
let targetAmount = 0, amount = 0, hovering = false, pinned = false, dirty = true, lastDraw = 0;

function drawSource() {
  const gradient = source.createLinearGradient(0, 0, columns, rows);
  gradient.addColorStop(0, '#173167'); gradient.addColorStop(.45, '#a53f83'); gradient.addColorStop(1, '#f0b34b');
  source.fillStyle = gradient; source.fillRect(0, 0, columns, rows);
  source.fillStyle = '#74f2c2'; source.beginPath(); source.arc(columns * .72, rows * .32, rows * .24, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#10131c'; source.beginPath(); source.arc(columns * .72, rows * .32, rows * .1, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(6,7,12,.68)'; source.fillRect(0, rows * .68, columns, rows * .32);
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(rows * .31) + 'px Inter, sans-serif'; source.textBaseline = 'bottom'; source.fillText('DEPTH', columns * .04, rows * .95);
  sourcePixels = source.getImageData(0, 0, columns, rows).data;
}
function measure() {
  const box = stageEl.getBoundingClientRect(); columns = Math.max(96, Math.round(box.width / 2)); rows = Math.max(54, Math.round(box.height / 2));
  canvas.width = sourceCanvas.width = columns; canvas.height = sourceCanvas.height = rows; context.imageSmoothingEnabled = false;
  drawSource(); output = context.createImageData(columns, rows); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function quantize(channel, count) {
  const step = 255 / Math.max(1, count - 1); return Math.max(0, Math.min(255, Math.round(channel / step) * step));
}
function setTarget(x, y, message) {
  target.x = Math.max(0, Math.min(1, x)); target.y = Math.max(0, Math.min(1, y)); dirty = true; if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  hovering = true; targetAmount = 1; root.classList.add('d-poster-active'); const box = stageEl.getBoundingClientRect();
  setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local color depth collapsed');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local color depth collapsed');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () {
  hovering = false; if (!pinned) { targetAmount = 0; root.classList.remove('d-poster-active'); status.textContent = 'Full-depth source restoring'; dirty = true; }
});
function setLevels(next) {
  levels = next; levelButton.textContent = levels === 3 ? 'Use 2 levels' : 'Use 3 levels'; meter.textContent = String(levels).padStart(2, '0');
  lensLabel.textContent = levels + ' LVL'; status.textContent = levels + '-level RGB quantizer'; dirty = true;
}
function setPinned(next) {
  pinned = next; targetAmount = pinned || hovering ? 1 : 0; pinButton.setAttribute('aria-pressed', String(pinned)); pinButton.textContent = pinned ? 'Release lens' : 'Pin lens';
  root.classList.toggle('d-poster-active', pinned || hovering); status.textContent = pinned ? 'Posterize lens pinned' : hovering ? 'Local color depth collapsed' : 'Full-depth source restoring'; dirty = true;
}
levelButton.addEventListener('click', function () { setLevels(levels === 3 ? 2 : 3); root.focus(); });
pinButton.addEventListener('click', function () { setPinned(!pinned); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === levelButton || event.target === pinButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Escape', 'l', 'L'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { setPinned(!pinned); return; }
  if (event.key === 'l' || event.key === 'L') { setLevels(levels === 3 ? 2 : 3); return; }
  if (event.key === 'Escape') { setPinned(false); hovering = false; targetAmount = 0; root.classList.remove('d-poster-active'); status.textContent = 'Full-depth source restoring'; return; }
  if (event.key === 'Home') setTarget(.5, .5, 'Posterize lens centered');
  else {
    const step = event.shiftKey ? .12 : .06;
    setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard posterize lens');
  }
  hovering = true; targetAmount = 1; root.classList.add('d-poster-active');
});

function smoothstep(value) { return value * value * (3 - 2 * value); }
function render() {
  const data = output.data;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const nx = x / Math.max(1, columns - 1), ny = y / Math.max(1, rows - 1);
      const distance = Math.hypot(nx - current.x, (ny - current.y) * (rows / columns));
      const radial = Math.max(0, Math.min(1, (OUTER_RADIUS - distance) / (OUTER_RADIUS - INNER_RADIUS)));
      const mix = smoothstep(radial) * amount, p = (y * columns + x) * 4;
      for (let channel = 0; channel < 3; channel++) {
        const original = sourcePixels[p + channel], posterized = quantize(original, levels);
        data[p + channel] = Math.round(original + (posterized - original) * mix);
      }
      data[p + 3] = 255;
    }
  }
  context.putImageData(output, 0, 0);
  const box = stageEl.getBoundingClientRect(); lens.style.transform = 'translate(' + (current.x * box.width).toFixed(2) + 'px,' + (current.y * box.height).toFixed(2) + 'px) scale(' + (.88 + amount * .12).toFixed(3) + ')';
  lens.style.opacity = (.24 + amount * .76).toFixed(3); dirty = false;
}
function frameLoop(time) {
  if (reduced) { current.x = target.x; current.y = target.y; amount = targetAmount; }
  else {
    const delta = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(targetAmount - amount);
    current.x += (target.x - current.x) * .17; current.y += (target.y - current.y) * .17; amount += (targetAmount - amount) * .14;
    if (delta > .0005) dirty = true;
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained local posterize lens on a low-resolution canvas displayed pixelated. Draw a colorful source offscreen at roughly one logical pixel per two CSS pixels and cache full RGB bytes. Define quantize(channel,levels) as step=255/(levels-1), then clamp(round(channel/step)*step,0,255). Support exactly two and three levels.

For each output pixel calculate normalized cursor distance with rows/columns aspect correction. Use an exact quantized core through radius 0.18, exact untouched source outside radius 0.30, and only feather between them: radial=clamp((0.30-distance)/(0.30-0.18),0,1), mix=smoothstep(radial)*lensAmount. Interpolate original toward quantized only by this mix. At lensAmount 1, center channels must belong exactly to {0,255} or {0,127.5,255} after rounding; beyond 0.30 every byte must equal source.

Pointerenter raises lens amount to 1, pointermove updates normalized position passively, and pointerleave returns to 0 unless pinned. Add independent semantic buttons for 2/3 levels and aria-pressed pinning, a visible core/feather reticle, level telemetry, focus, and polite status. Arrow keys move by 0.06, Shift by 0.12, Home centers, L switches levels, Space pins, and Escape releases without intercepting either button.

Ease position by 0.17 and amount by 0.14, redraw near 30fps only while dirty, and rebuild source/output on resize. Under prefers-reduced-motion, snap position and amount directly while preserving exact core palettes, untouched exterior, feather annulus, level switching, pinning, pointer/keyboard control, source restoration, and responsive output.`
});
