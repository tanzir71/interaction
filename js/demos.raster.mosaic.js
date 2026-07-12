/* INTRX registry — published threshold mosaic only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'threshold-mosaic-transition',
  title: 'Threshold Mosaic Switch',
  cat: 'Raster & Glitch',
  rootClass: 'd-mosaic',
  tags: ['canvas', 'ordered-dither', 'image-transition'],
  libs: [],
  desc: 'Two independently sampled images exchange whole six-pixel tiles through a generated 8×8 Bayer threshold field. Click position leads the ordered front while near-threshold cells briefly contract into a crisp mosaic lattice.',
  seen: 'Seen on: image-led studios, fashion portfolios, campaign transitions and art-direction showcases',
  hint: 'click the frame to switch images or move the threshold origin',
  html: `
<div class="d-mosaic" tabindex="0" aria-label="Interactive threshold mosaic image transition. Click or press Space to switch, arrows move the threshold origin, Home centers it, and Escape returns to image A.">
  <span class="d-mosaic-kicker">ORDERED SWITCH / BAYER 8</span>
  <div class="d-mosaic-stage">
    <canvas class="d-mosaic-canvas" role="img" aria-label="Two graphic images exchanging whole mosaic tiles through an ordered threshold matrix"></canvas>
    <div class="d-mosaic-origin" aria-hidden="true"><i></i></div>
    <div class="d-mosaic-labels" aria-hidden="true"><span>A / STILL</span><span>B / SIGNAL</span></div>
  </div>
  <div class="d-mosaic-meter" aria-hidden="true"><span>SWITCH</span><strong>000</strong><b>%</b></div>
  <div class="d-mosaic-matrix" aria-hidden="true"><i></i><i></i><i></i><i></i><span>8×8</span></div>
  <button class="d-mosaic-toggle" type="button" aria-pressed="false">Switch to B</button>
  <p class="d-mosaic-status" aria-live="polite">Image A · threshold idle</p>
</div>`,
  css: `
.d-mosaic { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #0d1016; color: #e2e7ef; touch-action: none; }
.d-mosaic:focus-visible { box-shadow: inset 0 0 0 2px #71d9ff; }
.d-mosaic::before { content: ''; position: absolute; inset: 0; opacity: .18; pointer-events: none;
  background-image: linear-gradient(rgba(226,231,239,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(226,231,239,.13) 1px, transparent 1px); background-size: 24px 24px; }
.d-mosaic-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(226,231,239,.4); background: #05070a; box-shadow: 9px 9px 0 rgba(113,217,255,.09); cursor: crosshair; }
.d-mosaic-canvas { display: block; width: 100%; height: 100%; }
.d-mosaic-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .1;
  background: repeating-linear-gradient(0deg, transparent 0 5px, rgba(255,255,255,.12) 5px 6px); mix-blend-mode: screen; }
.d-mosaic-origin { position: absolute; left: 0; top: 0; width: 56px; height: 56px; margin: -28px 0 0 -28px;
  border: 1px solid rgba(255,255,255,.75); border-radius: 50%; color: #fff; mix-blend-mode: difference; pointer-events: none; will-change: transform; }
.d-mosaic-origin::before, .d-mosaic-origin::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-mosaic-origin::before { width: 72px; height: 1px; }.d-mosaic-origin::after { width: 1px; height: 72px; }
.d-mosaic-origin i { position: absolute; inset: 8px; border: 1px dashed currentColor; border-radius: 50%; opacity: .55; }
.d-mosaic-labels { position: absolute; left: 8px; right: 8px; bottom: 6px; display: flex; justify-content: space-between;
  color: rgba(255,255,255,.75); font: 7px "JetBrains Mono", monospace; letter-spacing: .09em; mix-blend-mode: difference; }
.d-mosaic-kicker { position: absolute; left: 17px; top: 18px; color: rgba(226,231,239,.54); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-mosaic-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(226,231,239,.47); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-mosaic-meter strong { min-width: 34px; color: #e2e7ef; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }.d-mosaic-meter b { font-weight: 400; }
.d-mosaic-matrix { position: absolute; left: 17px; top: 42px; display: grid; grid-template-columns: repeat(2, 9px) auto; gap: 2px; align-items: center; }
.d-mosaic-matrix i { width: 9px; height: 9px; background: #71d9ff; }.d-mosaic-matrix i:nth-child(2), .d-mosaic-matrix i:nth-child(3) { opacity: .28; }
.d-mosaic-matrix span { grid-row: 1 / 3; grid-column: 3; margin-left: 4px; color: rgba(226,231,239,.47); font: 7px "JetBrains Mono", monospace; }
.d-mosaic-toggle { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(226,231,239,.37);
  border-radius: 999px; background: rgba(13,16,22,.84); color: #e2e7ef; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-mosaic-toggle:hover, .d-mosaic-toggle[aria-pressed="true"] { background: #e2e7ef; color: #0d1016; transform: translateY(-2px); }
.d-mosaic-toggle:focus-visible { outline: 2px solid #71d9ff; outline-offset: 3px; }
.d-mosaic-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(226,231,239,.49); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-mosaic-stage { width: 75%; height: 190px; }.d-mosaic-matrix { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-mosaic-origin { will-change: auto; }.d-mosaic-toggle { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-mosaic-canvas');
const stageEl = root.querySelector('.d-mosaic-stage');
const originMark = root.querySelector('.d-mosaic-origin');
const meter = root.querySelector('.d-mosaic-meter strong');
const toggleButton = root.querySelector('.d-mosaic-toggle');
const status = root.querySelector('.d-mosaic-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceACanvas = document.createElement('canvas'), sourceBCanvas = document.createElement('canvas');
const sourceAContext = sourceACanvas.getContext('2d', { willReadFrequently: true }), sourceBContext = sourceBCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const CELL = 6;
let width = 1, height = 1, dpr = 1, bayer = [], tiles = [];
let origin = { x: .5, y: .5 }, target = 0, progress = 0, dirty = true, lastDraw = 0;

function buildBayer8() {
  let matrix = [0], size = 1;
  while (size < 8) {
    const nextSize = size * 2, next = new Array(nextSize * nextSize);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const value = matrix[y * size + x], xx = x * 2, yy = y * 2;
      next[yy * nextSize + xx] = value * 4;
      next[yy * nextSize + xx + 1] = value * 4 + 2;
      next[(yy + 1) * nextSize + xx] = value * 4 + 3;
      next[(yy + 1) * nextSize + xx + 1] = value * 4 + 1;
    }
    matrix = next; size = nextSize;
  }
  return matrix;
}
bayer = buildBayer8();

function drawSource(ctx, variant) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  if (variant === 'A') { gradient.addColorStop(0, '#152d5e'); gradient.addColorStop(.5, '#2c8d8d'); gradient.addColorStop(1, '#d3ed70'); }
  else { gradient.addColorStop(0, '#6e214b'); gradient.addColorStop(.5, '#e45e4f'); gradient.addColorStop(1, '#ffc85d'); }
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = variant === 'A' ? '#e9ffdd' : '#86eaff'; ctx.beginPath(); ctx.arc(width * (variant === 'A' ? .72 : .3), height * .33, height * .23, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0b1018'; ctx.beginPath(); ctx.arc(width * (variant === 'A' ? .72 : .3), height * .33, height * .1, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(5,7,12,.68)'; ctx.fillRect(0, height * .68, width, height * .32);
  ctx.fillStyle = '#fff'; ctx.font = '800 ' + Math.round(height * .31) + 'px Inter, sans-serif'; ctx.textBaseline = 'bottom';
  ctx.fillText(variant === 'A' ? 'STILL' : 'SIGNAL', width * .04, height * .95);
}
function averageTile(pixels, x, y, tileWidth, tileHeight) {
  let red = 0, green = 0, blue = 0, count = 0;
  for (let py = y; py < y + tileHeight; py++) for (let px = x; px < x + tileWidth; px++) {
    const p = (py * width + px) * 4; red += pixels[p]; green += pixels[p + 1]; blue += pixels[p + 2]; count++;
  }
  return [Math.round(red / count), Math.round(green / count), Math.round(blue / count)];
}
function buildTiles() {
  drawSource(sourceAContext, 'A'); drawSource(sourceBContext, 'B');
  const pixelsA = sourceAContext.getImageData(0, 0, width, height).data, pixelsB = sourceBContext.getImageData(0, 0, width, height).data; tiles = [];
  let row = 0;
  for (let y = 0; y < height; y += CELL, row++) {
    let column = 0;
    for (let x = 0; x < width; x += CELL, column++) {
      const tileWidth = Math.min(CELL, width - x), tileHeight = Math.min(CELL, height - y);
      tiles.push({ x: x, y: y, width: tileWidth, height: tileHeight, row: row, column: column,
        threshold: (bayer[(row & 7) * 8 + (column & 7)] + .5) / 64,
        a: averageTile(pixelsA, x, y, tileWidth, tileHeight), b: averageTile(pixelsB, x, y, tileWidth, tileHeight) });
    }
  }
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(CELL, Math.round(box.width)); height = Math.max(CELL, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceACanvas.width = sourceBCanvas.width = width; sourceACanvas.height = sourceBCanvas.height = height;
  context.setTransform(dpr, 0, 0, dpr, 0, 0); buildTiles(); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setOrigin(x, y) {
  origin.x = Math.max(0, Math.min(1, x)); origin.y = Math.max(0, Math.min(1, y));
  const box = stageEl.getBoundingClientRect(); originMark.style.transform = 'translate(' + (origin.x * box.width).toFixed(2) + 'px,' + (origin.y * box.height).toFixed(2) + 'px)'; dirty = true;
}
function toggle(next, message) {
  target = typeof next === 'number' ? next : target > .5 ? 0 : 1;
  toggleButton.setAttribute('aria-pressed', String(target === 1)); toggleButton.textContent = target === 1 ? 'Return to A' : 'Switch to B';
  status.textContent = message || (target === 1 ? 'Threshold switching to B' : 'Threshold returning to A'); dirty = true;
}
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setOrigin((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height);
}, { passive: true });
stageEl.addEventListener('pointerdown', function (event) {
  const box = stageEl.getBoundingClientRect(); setOrigin((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height); toggle(); root.focus();
});
toggleButton.addEventListener('click', function () { setOrigin(.5, .5); toggle(); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === toggleButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Enter', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ' || event.key === 'Enter') { toggle(); return; }
  if (event.key === 'Escape') { toggle(0, 'Image A restored'); return; }
  if (event.key === 'Home') { setOrigin(.5, .5); status.textContent = 'Threshold origin centered'; return; }
  const step = event.shiftKey ? .12 : .06;
  setOrigin(origin.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
    origin.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0)); status.textContent = 'Keyboard threshold origin';
});
setOrigin(.5, .5);

function render() {
  context.fillStyle = '#05070a'; context.fillRect(0, 0, width, height);
  const direction = target >= progress ? 1 : -1, endpoint = progress <= 0 || progress >= 1;
  for (const tile of tiles) {
    const nx = (tile.x + tile.width * .5) / width, ny = (tile.y + tile.height * .5) / height;
    const distance = Math.hypot(nx - origin.x, (ny - origin.y) * (height / width));
    const wave = Math.max(0, 1 - distance / .72) * .15 * direction;
    const local = progress <= 0 ? 0 : progress >= 1 ? 1 : Math.max(0, Math.min(1, progress + wave));
    const color = local >= tile.threshold ? tile.b : tile.a;
    const activity = endpoint ? 0 : Math.max(0, 1 - Math.abs(local - tile.threshold) * 10), scale = 1 - activity * .28;
    const drawWidth = tile.width * scale, drawHeight = tile.height * scale;
    context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    context.fillRect(tile.x + (tile.width - drawWidth) * .5, tile.y + (tile.height - drawHeight) * .5, drawWidth, drawHeight);
  }
  meter.textContent = String(Math.round(progress * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (reduced) progress = target;
  else if (Math.abs(target - progress) > .0005) { progress += (target - progress) * .085; dirty = true; }
  else if (progress !== target) { progress = target; dirty = true; status.textContent = target === 1 ? 'Image B · threshold complete' : 'Image A · threshold idle'; }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained image-to-image mosaic transition using a true generated 8×8 Bayer threshold matrix. Start with [0]. Repeatedly double the matrix using quadrants 4v+0, 4v+2, 4v+3, 4v+1 until size 8, yielding each integer 0–63 exactly once. Never use random noise.

Render two distinct full-color procedural images into separate CSS-resolution offscreen canvases. Divide them into 6px mosaic cells, including clipped edge cells, and average every covered R/G/B pixel independently for source A and B. Cache each tile's geometry, row/column, both complete colors, and threshold=(bayer[(row mod 8)*8+(column mod 8)]+0.5)/64. Rebuild only on resize.

During transition, each tile must choose all RGB channels from A or B according to localProgress>=threshold—never interpolate colors. Add a click-origin lead wave max(0,1-distance/0.72)*0.15 in transition direction with normalized aspect correction. Explicitly force local progress 0 and 1 at global endpoints so final images are exact. Near a threshold, shrink the tile by at most 28% using activity=max(0,1-abs(local-threshold)*10); endpoints always use full tile size.

Clicking the canvas or a semantic aria-pressed button toggles direction. Pointermove updates the prospective origin passively. Arrows move it by 0.06, Shift by 0.12, Home centers, Space/Enter toggles, and Escape restores A, without intercepting button keys. Ease progress by 0.085, draw near 30fps only while dirty, cap DPR at 2, and rebuild responsively. Under prefers-reduced-motion, snap directly between exact A/B mosaics while retaining threshold generation, controls, origin, and endpoint integrity.`
});
