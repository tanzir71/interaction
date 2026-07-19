/* INTRX registry — published ASCII raster demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'ascii-render',
  title: 'ASCII Luminance Terminal',
  cat: 'Raster & Glitch',
  rootClass: 'd-ascii',
  tags: ['canvas', 'ascii-art', 'luminance'],
  libs: [],
  desc: 'A colorful source poster is averaged into fixed cells and rebuilt from a monotonic glyph-density ramp. A cursor lens restores source color independently, while three resolution levels expose the sampling structure.',
  seen: 'Seen on: developer portfolios, digital archives, experimental music and culture sites',
  hint: 'scan for color, change density, or use bracket keys',
  html: `
<div class="d-ascii" tabindex="0" aria-label="Interactive ASCII image renderer. Arrow keys move the color lens, Home centers it, Space toggles color, and bracket keys change glyph density.">
  <span class="d-ascii-kicker">LUMA → GLYPH / REC.709</span>
  <div class="d-ascii-stage">
    <canvas class="d-ascii-canvas" role="img" aria-label="A sampled image represented by monospace glyphs selected from their average luminance"></canvas>
    <div class="d-ascii-lens" aria-hidden="true"><i></i><b>RGB</b></div>
    <span class="d-ascii-caret" aria-hidden="true">_</span>
  </div>
  <div class="d-ascii-meter" aria-hidden="true"><span>GRID</span><strong>056×022</strong></div>
  <div class="d-ascii-ramp" aria-hidden="true"><span> </span><span>.</span><span>:</span><span>i</span><span>X</span><span>3</span><span>M</span><span>#</span><span>&amp;</span><span>@</span></div>
  <div class="d-ascii-actions">
    <button class="d-ascii-color" type="button" aria-pressed="false">Color glyphs</button>
    <button class="d-ascii-density" type="button">Density 08</button>
  </div>
  <p class="d-ascii-status" aria-live="polite">Local RGB lens active</p>
</div>`,
  css: `
.d-ascii { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #071411; color: #8effd6; touch-action: none; }
.d-ascii:focus-visible { box-shadow: inset 0 0 0 2px #8effd6; }
.d-ascii::before { content: ''; position: absolute; inset: 0; opacity: .16; pointer-events: none;
  background-image: linear-gradient(rgba(142,255,214,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(142,255,214,.18) 1px, transparent 1px); background-size: 20px 20px; }
.d-ascii-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(142,255,214,.42); background: #030b09; box-shadow: 9px 9px 0 rgba(142,255,214,.09); }
.d-ascii-canvas { display: block; width: 100%; height: 100%; }
.d-ascii-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .13;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(142,255,214,.16) 3px 4px); mix-blend-mode: screen; }
.d-ascii-lens { position: absolute; left: 0; top: 0; width: 112px; height: 112px; margin: -56px 0 0 -56px;
  border: 1px solid rgba(255,255,255,.76); border-radius: 50%; color: #fff; pointer-events: none; mix-blend-mode: difference; opacity: .38; will-change: transform, opacity; }
.d-ascii-lens::before, .d-ascii-lens::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-ascii-lens::before { width: 15px; height: 1px; }.d-ascii-lens::after { width: 1px; height: 15px; }
.d-ascii-lens i { position: absolute; inset: 11px; border: 1px dashed rgba(255,255,255,.5); border-radius: 50%; }
.d-ascii-lens b { position: absolute; right: 10px; bottom: 9px; font: 7px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-ascii.d-ascii-active .d-ascii-lens { opacity: 1; }.d-ascii.d-ascii-global .d-ascii-lens { border-style: dashed; }
.d-ascii-caret { position: absolute; right: 7px; bottom: 4px; color: rgba(142,255,214,.74); font: 22px "JetBrains Mono", monospace; }
.d-ascii-kicker { position: absolute; left: 17px; top: 18px; color: rgba(142,255,214,.56); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-ascii-meter { position: absolute; right: 18px; top: 17px; display: flex; align-items: baseline; gap: 5px;
  color: rgba(142,255,214,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-ascii-meter strong { color: #8effd6; font-size: 15px; font-weight: 500; letter-spacing: 0; }
.d-ascii-ramp { position: absolute; left: 17px; top: 42px; display: flex; gap: 3px; color: rgba(142,255,214,.62); font: 8px "JetBrains Mono", monospace; }
.d-ascii-ramp span { display: grid; width: 10px; height: 13px; place-items: center; border: 1px solid rgba(142,255,214,.13); }
.d-ascii-actions { position: absolute; left: 17px; bottom: 17px; display: flex; gap: 7px; }
.d-ascii-actions button { padding: 8px 12px; border: 1px solid rgba(142,255,214,.38); border-radius: 999px; background: rgba(7,20,17,.84);
  color: #8effd6; font: 9px "JetBrains Mono", monospace; cursor: pointer; transition: background .18s, color .18s, transform .18s; }
.d-ascii-actions button:hover, .d-ascii-color[aria-pressed="true"] { background: #8effd6; color: #071411; transform: translateY(-2px); }
.d-ascii-actions button:focus-visible { outline: 2px solid #8effd6; outline-offset: 3px; }
.d-ascii-status { position: absolute; right: 18px; bottom: 20px; max-width: 37%; margin: 0; text-align: right;
  color: rgba(142,255,214,.5); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-ascii-stage { width: 75%; height: 190px; }.d-ascii-ramp { display: none; }.d-ascii-actions button { padding: 8px 9px; font-size: 8px; } }
@media (prefers-reduced-motion: reduce) { .d-ascii-lens { will-change: auto; }.d-ascii-actions button { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-ascii-canvas');
const stageEl = root.querySelector('.d-ascii-stage');
const lens = root.querySelector('.d-ascii-lens');
const meter = root.querySelector('.d-ascii-meter strong');
const colorButton = root.querySelector('.d-ascii-color');
const densityButton = root.querySelector('.d-ascii-density');
const status = root.querySelector('.d-ascii-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const RAMP = ' .,:;irsXA253hMHGS#9B&@', DENSITIES = [10, 8, 6], MONO = [142, 255, 214];
let width = 1, height = 1, dpr = 1, sourcePixels = new Uint8ClampedArray(4), cells = [], densityIndex = 1;
let target = { x: .62, y: .42 }, current = { x: target.x, y: target.y };
let targetLens = .22, lensAmount = targetLens, hovering = false, colorAll = false, dirty = true, lastDraw = 0;

function drawSource() {
  const gradient = source.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#12284b'); gradient.addColorStop(.48, '#e84777'); gradient.addColorStop(1, '#ffd45c');
  source.fillStyle = gradient; source.fillRect(0, 0, width, height);
  source.fillStyle = '#7effcf'; source.beginPath(); source.arc(width * .72, height * .34, height * .25, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#10151f'; source.beginPath(); source.arc(width * .72, height * .34, height * .11, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(8,12,18,.72)'; source.beginPath(); source.moveTo(0, height * .72); source.lineTo(width * .47, height * .38);
  source.lineTo(width * .64, height); source.lineTo(0, height); source.closePath(); source.fill();
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(height * .31) + 'px Roboto Mono, sans-serif'; source.textBaseline = 'bottom'; source.fillText('ASCII', width * .04, height * .95);
  sourcePixels = source.getImageData(0, 0, width, height).data;
}
function buildCells() {
  const cellWidth = DENSITIES[densityIndex], cellHeight = Math.round(cellWidth * 1.25); cells = [];
  for (let y = 0; y < height; y += cellHeight) {
    for (let x = 0; x < width; x += cellWidth) {
      let red = 0, green = 0, blue = 0, samples = 0;
      const endX = Math.min(width, x + cellWidth), endY = Math.min(height, y + cellHeight);
      for (let py = y; py < endY; py++) for (let px = x; px < endX; px++) {
        const p = (py * width + px) * 4; red += sourcePixels[p]; green += sourcePixels[p + 1]; blue += sourcePixels[p + 2]; samples++;
      }
      red = Math.round(red / samples); green = Math.round(green / samples); blue = Math.round(blue / samples);
      const luminance = (red * .2126 + green * .7152 + blue * .0722) / 255;
      const glyphIndex = Math.max(0, Math.min(RAMP.length - 1, Math.round(luminance * (RAMP.length - 1))));
      cells.push({ x: x + cellWidth * .5, y: y + cellHeight * .82, r: red, g: green, b: blue, luminance: luminance, glyphIndex: glyphIndex, glyph: RAMP[glyphIndex] });
    }
  }
  context.font = '700 ' + Math.round(cellHeight * 1.02) + 'px "JetBrains Mono", monospace'; context.textAlign = 'center'; context.textBaseline = 'alphabetic';
  meter.textContent = String(Math.ceil(width / cellWidth)).padStart(3, '0') + '×' + String(Math.ceil(height / cellHeight)).padStart(3, '0');
  densityButton.textContent = 'Density ' + String(cellWidth).padStart(2, '0'); dirty = true;
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = width; sourceCanvas.height = height; context.setTransform(dpr, 0, 0, dpr, 0, 0); drawSource(); buildCells();
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setTarget(x, y, message) {
  target.x = Math.max(0, Math.min(1, x)); target.y = Math.max(0, Math.min(1, y)); dirty = true;
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  hovering = true; targetLens = 1; root.classList.add('d-ascii-active');
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local source color');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local source color');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () {
  hovering = false; targetLens = .22; root.classList.remove('d-ascii-active'); status.textContent = colorAll ? 'Full source color' : 'Local RGB lens active'; dirty = true;
});
function setColorAll(next) {
  colorAll = next; root.classList.toggle('d-ascii-global', colorAll); colorButton.setAttribute('aria-pressed', String(colorAll));
  colorButton.textContent = colorAll ? 'Mono glyphs' : 'Color glyphs'; status.textContent = colorAll ? 'Full source color' : 'Local RGB lens active'; dirty = true;
}
function setDensity(index) {
  densityIndex = Math.max(0, Math.min(DENSITIES.length - 1, index)); buildCells();
  status.textContent = 'Glyph grid rebuilt at ' + DENSITIES[densityIndex] + ' pixels';
}
colorButton.addEventListener('click', function () { setColorAll(!colorAll); root.focus(); });
densityButton.addEventListener('click', function () { setDensity((densityIndex + 1) % DENSITIES.length); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === colorButton || event.target === densityButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', '[', ']'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { setColorAll(!colorAll); return; }
  if (event.key === '[') { setDensity(densityIndex - 1); return; }
  if (event.key === ']') { setDensity(densityIndex + 1); return; }
  if (event.key === 'Home') setTarget(.5, .5, 'Color lens centered');
  else {
    const step = event.shiftKey ? .12 : .055;
    setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard color lens');
  }
  hovering = true; targetLens = 1; root.classList.add('d-ascii-active');
});

function render() {
  context.fillStyle = '#030b09'; context.fillRect(0, 0, width, height);
  const px = current.x * width, py = current.y * height, radius = Math.min(112, Math.max(76, width * .24));
  for (const cell of cells) {
    const proximity = Math.max(0, 1 - Math.hypot(cell.x - px, cell.y - py) / radius);
    const mix = colorAll ? 1 : proximity * proximity * lensAmount;
    const red = Math.round(MONO[0] + (cell.r - MONO[0]) * mix);
    const green = Math.round(MONO[1] + (cell.g - MONO[1]) * mix);
    const blue = Math.round(MONO[2] + (cell.b - MONO[2]) * mix);
    context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'; context.fillText(cell.glyph, cell.x, cell.y);
  }
  lens.style.transform = 'translate(' + (current.x * width).toFixed(2) + 'px,' + (current.y * height).toFixed(2) + 'px) scale(' + (.86 + lensAmount * .14).toFixed(3) + ')';
  lens.style.opacity = (.28 + lensAmount * .72).toFixed(3); dirty = false;
}
function frameLoop(time) {
  if (reduced) { current.x = target.x; current.y = target.y; lensAmount = targetLens; }
  else {
    const delta = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(targetLens - lensAmount);
    current.x += (target.x - current.x) * .17; current.y += (target.y - current.y) * .17; lensAmount += (targetLens - lensAmount) * .14;
    if (delta > .0005) dirty = true;
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained ASCII image renderer on canvas. Draw a deliberate full-color source poster into an offscreen canvas at the measured CSS size and cache its pixels. Support cell widths 10, 8, and 6 pixels with cell height rounded to 1.25 times width. For every cell, average every covered source pixel's R/G/B channels rather than sampling a single point. Compute Rec.709 luminance=(0.2126R+0.7152G+0.0722B)/255 and map it monotonically to a density-ordered ramp such as " .,:;irsXA253hMHGS#9B&@" using round(luminance*(length-1)). Cache cell center, baseline, average RGB, luminance, glyph index, and glyph.

Render on a dark terminal field using a monospace font sized from cell height. The glyph choice must depend only on cached luminance. A circular pointer lens may interpolate the glyph's ink color from a fixed mint monochrome RGB toward the cell's cached source RGB using squared proximity, but it must never change the glyph index. A semantic aria-pressed control toggles full-frame source color independently. A second semantic control cycles density and rebuilds cells from already cached source pixels without redrawing the source.

Use a 76–112px lens radius, ease normalized lens position by 0.17 and lens amount by 0.14, redraw near 30fps only while dirty, and stop once settled. Pointerenter raises the lens to 1, pointermove stays passive, and pointerleave returns to a subtle 0.22 ambient amount. Include a reticle, visible grid dimensions, glyph-ramp legend, focus styling, and polite status.

Arrow keys move the virtual lens by 0.055, Shift+Arrow by 0.12, Home centers, Space toggles global color, left bracket selects a coarser density, and right bracket selects a finer density. Ignore keyboard events from either button. On resize, rebuild source pixels and cells and use a DPR transform capped at 2. Under prefers-reduced-motion, snap lens coordinates and amount directly while retaining luminance mapping, local/global color, density switching, keyboard/pointer behavior, responsive rebuilding, and the static ASCII result.`
});
