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
  css: `.d-psort{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-psort::before,.d-psort::after{display:none}.d-psort>span,.d-psort>[class$="-meter"],.d-psort>[class$="-channels"],.d-psort>[class$="-vector"],.d-psort>[class$="-order"],.d-psort>[class$="-phosphor"],.d-psort>[class$="-fields"],.d-psort>[class$="-matrix"],.d-psort>[class$="-sample"]{display:none}.d-psort [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-psort [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-psort canvas{display:block;width:100%;height:100%;object-fit:cover}.d-psort [class$="-stage"]>span,.d-psort [class$="-stage"]>[class$="-origin"],.d-psort [class$="-labels"],.d-psort [class$="-scan"]{display:none}.d-psort button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-psort button:hover{background:#dde5d3}.d-psort button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-psort button:focus-visible,.d-psort input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-psort [class$="-actions"]{display:flex;gap:8px}.d-psort:focus-visible{outline:2px solid #829969;outline-offset:-2px}`,
  js: `const photograph=new Image();

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
  const picture=photograph; source.fillStyle='#d9ddd4'; source.fillRect(0,0,columns,rows);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(columns/picture.naturalWidth,rows/picture.naturalHeight),pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;source.drawImage(picture,(columns-pw)/2,(rows-ph)/2,pw,ph)}
  sourcePixels = source.getImageData(0,0,columns,rows).data;
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
  const box = stageEl.getBoundingClientRect(); columns = Math.max(96, Math.round(box.width)); rows = Math.max(54, Math.round(box.height));
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
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:atlantic-shore}}';`,
  prompt: `Create the Column Pixel Sort interaction with a native300×320px composition. Use actual supplied atlantic-shore photography as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
