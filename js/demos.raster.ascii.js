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
  css: `.d-ascii{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0 0 10px;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end}.d-ascii>span,.d-ascii>[class$="-meter"],.d-ascii>[class$="-weights"],.d-ascii>[class$="-spectrum"],.d-ascii>[class$="-scale"],.d-ascii>[class$="-ramp"],.d-ascii>[class$="-weight"],.d-ascii>[class$="-waves"]{display:none}.d-ascii>[class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#d5dcca}.d-ascii canvas{width:100%;height:100%;display:block}.d-ascii>[class$="-stage"]>*:not(canvas){display:none}.d-ascii [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-ascii button{position:relative;min-height:28px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;cursor:pointer;z-index:5}.d-ascii button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-ascii button:focus-visible,.d-ascii:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-ascii [class$="-actions"]{display:flex;gap:8px}`,
  js: `const photograph=new Image();

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
const RAMP = ' .,:;irsXA253hMHGS#9B&@', DENSITIES = [10, 8, 6], MONO = [203, 211, 188];
let width = 1, height = 1, dpr = 1, sourcePixels = new Uint8ClampedArray(4), cells = [], densityIndex = 1;
let target = { x: .62, y: .42 }, current = { x: target.x, y: target.y };
let targetLens = .22, lensAmount = targetLens, hovering = false, colorAll = false, dirty = true, lastDraw = 0;

function drawSource(){const picture=photograph;source.fillStyle='#dfe3d8';source.fillRect(0,0,width,height);if(picture.naturalWidth){const s=Math.max(width/picture.naturalWidth,height/picture.naturalHeight);source.drawImage(picture,(width-picture.naturalWidth*s)/2,(height-picture.naturalHeight*s)/2,picture.naturalWidth*s,picture.naturalHeight*s)}sourcePixels=source.getImageData(0,0,width,height).data;}
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
requestAnimationFrame(frameLoop);
photograph.onload=measure;photograph.src='{{asset:coastal-stack}}';`,
  prompt: `Build ASCII Luminance Terminal as a native300×320px component. Use the supplied coastal-stack photograph. Draw it with cover cropping after image load and recompute the algorithm's source luminance, pixel caches or samples. Retain the actual ascii-render pixel/glyph algorithm, pointer and keyboard behavior. Put the full image above a slim quiet control row, with readable regular Inter11px controls, normal tracking, pale surfaces and fine borders. Avoid synthetic gradient posters and headline overlays.  Keep visible interface text in regular Inter400–500. Literal ASCII/bitmap glyph rendering and terminal code retain their intentional fixed-width character metrics. Preserve real interactive states, polite announcements, keyboard focus, cancellation, resize cleanup and reduced-motion alternatives. Hide technical headers and decorative readout/footer panels without removing nodes used by the behavior.`
});
