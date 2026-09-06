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
  css: `.d-poster{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-poster::before,.d-poster::after{display:none}.d-poster>span,.d-poster>[class$="-meter"],.d-poster>[class$="-channels"],.d-poster>[class$="-vector"],.d-poster>[class$="-order"],.d-poster>[class$="-phosphor"],.d-poster>[class$="-fields"],.d-poster>[class$="-matrix"],.d-poster>[class$="-sample"]{display:none}.d-poster [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-poster [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-poster canvas{display:block;width:100%;height:100%;object-fit:cover}.d-poster [class$="-stage"]>span,.d-poster [class$="-stage"]>[class$="-origin"],.d-poster [class$="-labels"],.d-poster [class$="-scan"]{display:none}.d-poster button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-poster button:hover{background:#dde5d3}.d-poster button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-poster button:focus-visible,.d-poster input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-poster [class$="-actions"]{display:flex;gap:8px}.d-poster:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-poster-palette{display:none}`,
  js: `const photograph=new Image();

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
  const picture=photograph; source.fillStyle='#d9ddd4'; source.fillRect(0,0,columns,rows);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(columns/picture.naturalWidth,rows/picture.naturalHeight),pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;source.drawImage(picture,(columns-pw)/2,(rows-ph)/2,pw,ph)}
  sourcePixels = source.getImageData(0,0,columns,rows).data;
}
function measure() {
  const box = stageEl.getBoundingClientRect(); columns = Math.max(96, Math.round(box.width)); rows = Math.max(54, Math.round(box.height));
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
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:coastal-stack}}';`,
  prompt: `Create the Local Posterize Lens interaction with a native300×320px composition. Use actual supplied coastal-stack photography as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
