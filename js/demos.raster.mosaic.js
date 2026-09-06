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
  css: `.d-mosaic{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-mosaic::before,.d-mosaic::after{display:none}.d-mosaic>span,.d-mosaic>[class$="-meter"],.d-mosaic>[class$="-channels"],.d-mosaic>[class$="-vector"],.d-mosaic>[class$="-order"],.d-mosaic>[class$="-phosphor"],.d-mosaic>[class$="-fields"],.d-mosaic>[class$="-matrix"],.d-mosaic>[class$="-sample"]{display:none}.d-mosaic [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-mosaic [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-mosaic canvas{display:block;width:100%;height:100%;object-fit:cover}.d-mosaic [class$="-stage"]>span,.d-mosaic [class$="-stage"]>[class$="-origin"],.d-mosaic [class$="-labels"],.d-mosaic [class$="-scan"]{display:none}.d-mosaic button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-mosaic button:hover{background:#dde5d3}.d-mosaic button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-mosaic button:focus-visible,.d-mosaic input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-mosaic [class$="-actions"]{display:flex;gap:8px}.d-mosaic:focus-visible{outline:2px solid #829969;outline-offset:-2px}`,
  js: `const photograph=new Image();const photographB=new Image();

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
  const picture=variant==='A'?photograph:photographB; ctx.fillStyle='#d9ddd4'; ctx.fillRect(0,0,width,height);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(width/picture.naturalWidth,height/picture.naturalHeight),pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;ctx.drawImage(picture,(width-pw)/2,(height-ph)/2,pw,ph)}

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
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:limestone-pavilion}}';photographB.onload=()=>measure();photographB.src='{{asset:atlantic-shore}}';`,
  prompt: `Create the Threshold Mosaic Switch interaction with a native300×320px composition. Use actual supplied limestone-pavilion photography and atlantic-shore for the alternate state as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
