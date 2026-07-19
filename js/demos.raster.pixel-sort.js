/* INTRX registry — published pixel-sort demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'pixel-sort',
  title: 'Column Pixel Sort',
  cat: 'Raster & Glitch',
  rootClass: 'd-psort',
  tags: ['canvas', 'pixel-sorting', 'luminance'],
  libs: [],
  desc: 'Every image column owns a stable Rec.709 brightness ordering. Hover bends the row-sampling map toward dark-to-bright vertical streams, while leave reverses to the byte-exact source without cross-fading colors.',
  seen: 'Seen on: generative-art portfolios, experimental fashion, music and digital-culture sites',
  hint: 'hover to sort, move the origin, or lock the ordered frame',
  html: `
<div class="d-psort" tabindex="0" aria-label="Interactive column pixel sort. Hover to sort by brightness downward, arrows choose sorted or source state, Home restores, End sorts, Space locks, and Escape releases.">
  <span class="d-psort-kicker">COLUMN ORDER / LUMA ASC</span>
  <div class="d-psort-stage">
    <canvas class="d-psort-canvas" role="img" aria-label="A color image whose columns reorganize from dark pixels at top to bright pixels at bottom"></canvas>
    <div class="d-psort-origin" aria-hidden="true"><i></i></div>
    <span class="d-psort-axis" aria-hidden="true">DARK ↑<br>BRIGHT ↓</span>
  </div>
  <div class="d-psort-meter" aria-hidden="true"><span>SORTED</span><strong>000</strong><b>%</b></div>
  <div class="d-psort-order" aria-hidden="true"><i></i><span>Y / LUMA</span></div>
  <button class="d-psort-lock" type="button" aria-pressed="false">Lock sorted</button>
  <p class="d-psort-status" aria-live="polite">Source columns intact</p>
</div>`,
  css: `
.d-psort { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #0e0f18; color: #d9dcff; touch-action: none; }
.d-psort:focus-visible { box-shadow: inset 0 0 0 2px #8a93ff; }
.d-psort::before { content: ''; position: absolute; inset: 0; opacity: .18; pointer-events: none;
  background-image: linear-gradient(rgba(217,220,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(217,220,255,.13) 1px, transparent 1px); background-size: 24px 24px; }
.d-psort-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(217,220,255,.4); background: #06070c; box-shadow: 9px 9px 0 rgba(138,147,255,.1); }
.d-psort-canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; image-rendering: crisp-edges; }
.d-psort-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .12;
  background: repeating-linear-gradient(90deg, transparent 0 3px, rgba(255,255,255,.14) 3px 4px); mix-blend-mode: screen; }
.d-psort-origin { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; color: #ff695d; background: currentColor; pointer-events: none; opacity: .38; will-change: transform, opacity; }
.d-psort-origin::before, .d-psort-origin::after { content: ''; position: absolute; left: 0; width: 11px; height: 11px; border: 1px solid currentColor; transform: translateX(-50%) rotate(45deg); }
.d-psort-origin::before { top: 7px; }.d-psort-origin::after { bottom: 7px; }
.d-psort-origin i { position: absolute; left: 0; top: 50%; width: 18px; height: 1px; background: currentColor; transform: translate(-50%, -50%); }
.d-psort.d-psort-active .d-psort-origin { opacity: 1; }
.d-psort-axis { position: absolute; right: 7px; top: 8px; color: rgba(255,255,255,.7); font: 7px/1.45 "JetBrains Mono", monospace; letter-spacing: .07em; text-align: right; mix-blend-mode: difference; }
.d-psort-kicker { position: absolute; left: 17px; top: 18px; color: rgba(217,220,255,.54); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-psort-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(217,220,255,.47); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-psort-meter strong { min-width: 34px; color: #d9dcff; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-psort-meter b { font-weight: 400; }
.d-psort-order { position: absolute; left: 17px; top: 44px; display: flex; align-items: center; gap: 8px; color: rgba(217,220,255,.47); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-psort-order i { width: 42px; height: 5px; background: linear-gradient(90deg, #05060b, #8a93ff, #fff); }
.d-psort-lock { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(217,220,255,.37);
  border-radius: 999px; background: rgba(14,15,24,.84); color: #d9dcff; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-psort-lock:hover, .d-psort-lock[aria-pressed="true"] { background: #d9dcff; color: #0e0f18; transform: translateY(-2px); }
.d-psort-lock:focus-visible { outline: 2px solid #ff695d; outline-offset: 3px; }
.d-psort-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(217,220,255,.49); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-psort-stage { width: 75%; height: 190px; }.d-psort-order { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-psort-origin { will-change: auto; }.d-psort-lock { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-psort-canvas');
const stageEl = root.querySelector('.d-psort-stage');
const originMark = root.querySelector('.d-psort-origin');
const meter = root.querySelector('.d-psort-meter strong');
const lockButton = root.querySelector('.d-psort-lock');
const status = root.querySelector('.d-psort-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let columns = 1, rows = 1, sourcePixels = new Uint8ClampedArray(4), sortedSourceY = new Uint16Array(1), output = null;
let focusX = .5, targetProgress = 0, progress = 0, hovering = false, locked = false, dirty = true, lastDraw = 0;

function drawSource() {
  const gradient = source.createLinearGradient(0, 0, columns, rows);
  gradient.addColorStop(0, '#18265b'); gradient.addColorStop(.48, '#a43672'); gradient.addColorStop(1, '#f5ad48');
  source.fillStyle = gradient; source.fillRect(0, 0, columns, rows);
  source.fillStyle = '#c7ff63'; source.beginPath(); source.arc(columns * .72, rows * .32, rows * .24, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#111522'; source.beginPath(); source.arc(columns * .72, rows * .32, rows * .1, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(7,8,14,.7)'; source.beginPath(); source.moveTo(0, rows * .74); source.lineTo(columns * .45, rows * .36);
  source.lineTo(columns * .62, rows); source.lineTo(0, rows); source.closePath(); source.fill();
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(rows * .31) + 'px Roboto Mono, sans-serif'; source.textBaseline = 'bottom'; source.fillText('SORT', columns * .04, rows * .95);
  sourcePixels = source.getImageData(0, 0, columns, rows).data;
}
function buildSortMap() {
  sortedSourceY = new Uint16Array(columns * rows);
  for (let x = 0; x < columns; x++) {
    const column = [];
    for (let y = 0; y < rows; y++) {
      const p = (y * columns + x) * 4;
      const luminance = sourcePixels[p] * .2126 + sourcePixels[p + 1] * .7152 + sourcePixels[p + 2] * .0722;
      column.push({ y: y, luminance: luminance });
    }
    column.sort(function (a, b) { return a.luminance - b.luminance || a.y - b.y; });
    for (let targetY = 0; targetY < rows; targetY++) sortedSourceY[targetY * columns + x] = column[targetY].y;
  }
}
function measure() {
  const box = stageEl.getBoundingClientRect(); columns = Math.max(96, Math.round(box.width / 2)); rows = Math.max(54, Math.round(box.height / 2));
  canvas.width = sourceCanvas.width = columns; canvas.height = sourceCanvas.height = rows;
  context.imageSmoothingEnabled = false; drawSource(); buildSortMap(); output = context.createImageData(columns, rows); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setFocus(event) {
  const box = stageEl.getBoundingClientRect(); focusX = Math.max(0, Math.min(1, (event.clientX - box.left) / Math.max(1, box.width)));
  originMark.style.transform = 'translateX(' + ((focusX - .5) * box.width).toFixed(2) + 'px)'; dirty = true;
}
stageEl.addEventListener('pointerenter', function (event) { hovering = true; setFocus(event); if (!locked) targetProgress = 1; root.classList.add('d-psort-active'); status.textContent = 'Columns ordering by luminance'; });
stageEl.addEventListener('pointermove', setFocus, { passive: true });
stageEl.addEventListener('pointerleave', function () { hovering = false; if (!locked) targetProgress = 0; root.classList.remove('d-psort-active'); status.textContent = locked ? 'Sorted columns locked' : 'Source columns restoring'; dirty = true; });
function setLocked(next) {
  locked = next; targetProgress = locked || hovering ? 1 : 0; lockButton.setAttribute('aria-pressed', String(locked));
  lockButton.textContent = locked ? 'Release sorted' : 'Lock sorted'; status.textContent = locked ? 'Sorted columns locked' : hovering ? 'Columns ordering by luminance' : 'Source columns restoring'; dirty = true;
}
lockButton.addEventListener('click', function () { setLocked(!locked); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === lockButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', ' ', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { setLocked(!locked); return; }
  if (event.key === 'Escape') { locked = false; hovering = false; lockButton.setAttribute('aria-pressed', 'false'); targetProgress = 0; status.textContent = 'Source columns restoring'; dirty = true; return; }
  if (event.key === 'Home' || event.key === 'ArrowLeft' || event.key === 'ArrowUp') { targetProgress = 0; status.textContent = 'Source column order'; }
  else { targetProgress = 1; status.textContent = 'Brightness order downward'; }
  dirty = true;
});

function smoothstep(value) { return value * value * (3 - 2 * value); }
function render() {
  const data = output.data;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const distance = Math.abs(x / Math.max(1, columns - 1) - focusX);
      const local = Math.max(0, Math.min(1, progress * 1.25 - distance * .25));
      const mixed = smoothstep(local), index = y * columns + x;
      const sourceY = Math.round(y + (sortedSourceY[index] - y) * mixed), sourceIndex = (sourceY * columns + x) * 4, p = index * 4;
      data[p] = sourcePixels[sourceIndex]; data[p + 1] = sourcePixels[sourceIndex + 1]; data[p + 2] = sourcePixels[sourceIndex + 2]; data[p + 3] = 255;
    }
  }
  context.putImageData(output, 0, 0); meter.textContent = String(Math.round(progress * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (reduced) progress = targetProgress;
  else if (Math.abs(targetProgress - progress) > .0005) { progress += (targetProgress - progress) * .11; dirty = true; }
  else if (progress !== targetProgress) { progress = targetProgress; dirty = true; status.textContent = progress === 1 ? 'Brightness order complete' : 'Source columns intact'; }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained reversible column pixel sort on a low-resolution canvas displayed with image-rendering:pixelated. Draw a colorful source poster offscreen at approximately one logical pixel per two CSS pixels and cache RGBA. For every column, create records containing source row and Rec.709 luminance=0.2126R+0.7152G+0.0722B. Stable-sort ascending by luminance, breaking ties by original row, and store a Uint16 map from each sorted output row to its original source row.

Do not cross-fade the source and sorted images. During rendering, for each output x/y interpolate the sampled source row: round(y+(sortedSourceY[y*columns+x]-y)*smoothstep(localProgress)), then copy that original pixel's complete RGB channels. Let localProgress form a restrained wave from pointer X using clamp(globalProgress*1.25-abs(normalizedX-focusX)*0.25,0,1). This guarantees progress 0 is byte-exact source and progress 1 is the exact monotonic sorted map for every column.

Pointerenter targets 1, pointermove updates focus passively, and pointerleave targets 0 unless a semantic aria-pressed lock is enabled. Ease progress by 0.11, render near 30fps only while dirty, and snap exact endpoints when within 0.0005. Show an origin line, percent readout, dark/bright direction, focus styling, and polite states.

Arrow Left/Up and Home request source order; Right/Down and End request sorted order; Space locks and Escape releases, without intercepting the button. Rebuild source and maps responsively. Under prefers-reduced-motion, assign progress directly so hover and leave switch between exact source and exact sorted frames without animation while preserving focus position, locking, keyboard control, and monotonic brightness-downward columns.`
});
