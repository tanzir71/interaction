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
  css: `.d-bayer{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0 0 10px;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end}.d-bayer>span,.d-bayer>[class$="-meter"],.d-bayer>[class$="-weights"],.d-bayer>[class$="-spectrum"],.d-bayer>[class$="-scale"],.d-bayer>[class$="-ramp"],.d-bayer>[class$="-weight"],.d-bayer>[class$="-waves"]{display:none}.d-bayer>[class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#d5dcca}.d-bayer canvas{width:100%;height:100%;display:block}.d-bayer>[class$="-stage"]>*:not(canvas){display:none}.d-bayer [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-bayer button{position:relative;min-height:28px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;cursor:pointer;z-index:5}.d-bayer button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-bayer button:focus-visible,.d-bayer:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-bayer [class$="-actions"]{display:flex;gap:8px}.d-bayer>[aria-hidden=true]{display:none}`,
  js: `const photograph=new Image();

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

function drawSource(){const picture=photograph;source.fillStyle='#dfe3d8';source.fillRect(0,0,columns,rows);if(picture.naturalWidth){const s=Math.max(columns/picture.naturalWidth,rows/picture.naturalHeight);source.drawImage(picture,(columns-picture.naturalWidth*s)/2,(rows-picture.naturalHeight*s)/2,picture.naturalWidth*s,picture.naturalHeight*s)}const pixels=source.getImageData(0,0,columns,rows).data;sourceLuma=new Uint8Array(columns*rows);for(let i=0;i<sourceLuma.length;i++){const p=i*4;sourceLuma[i]=Math.round(pixels[p]*.2126+pixels[p+1]*.7152+pixels[p+2]*.0722)}}

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
  const paper = inverted ? [55,64,45] : [221,229,204];
  const ink = inverted ? [221,229,204] : [55,64,45];
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
requestAnimationFrame(frameLoop);
photograph.onload=measure;photograph.src='{{asset:coastal-stack}}';`,
  prompt: `Build Bayer Dither Field as a native300×320px component. Use the supplied coastal-stack photograph. Draw it with cover cropping after image load and recompute the algorithm's source luminance, pixel caches or samples. Retain the actual dither-bayer pixel/glyph algorithm, pointer and keyboard behavior. Put the full image above a slim quiet control row, with readable regular Inter11px controls, normal tracking, pale surfaces and fine borders. Avoid synthetic gradient posters and headline overlays.  Keep visible interface text in regular Inter400–500. Literal ASCII/bitmap glyph rendering and terminal code retain their intentional fixed-width character metrics. Preserve real interactive states, polite announcements, keyboard focus, cancellation, resize cleanup and reduced-motion alternatives. Hide technical headers and decorative readout/footer panels without removing nodes used by the behavior.`
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
  css: `.d-fs{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0 0 10px;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end}.d-fs>span,.d-fs>[class$="-meter"],.d-fs>[class$="-weights"],.d-fs>[class$="-spectrum"],.d-fs>[class$="-scale"],.d-fs>[class$="-ramp"],.d-fs>[class$="-weight"],.d-fs>[class$="-waves"]{display:none}.d-fs>[class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#d5dcca}.d-fs canvas{width:100%;height:100%;display:block}.d-fs>[class$="-stage"]>*:not(canvas){display:none}.d-fs [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-fs button{position:relative;min-height:28px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;cursor:pointer;z-index:5}.d-fs button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-fs button:focus-visible,.d-fs:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-fs [class$="-actions"]{display:flex;gap:8px}`,
  js: `const photograph=new Image();

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
const PAPER = [205, 205, 211], INK = [15, 15, 18];
let columns = 1, rows = 1, sourcePixels = new Uint8ClampedArray(4), ditherBits = new Uint8Array(1), output = null;
let target = { x: .58, y: .44 }, current = { x: target.x, y: target.y };
let targetAmount = 0, amount = 0, hovering = false, locked = false, dirty = true, lastDraw = 0;

function drawSource(){const picture=photograph;source.fillStyle='#dfe3d8';source.fillRect(0,0,columns,rows);if(picture.naturalWidth){const s=Math.max(columns/picture.naturalWidth,rows/picture.naturalHeight);source.drawImage(picture,(columns-picture.naturalWidth*s)/2,(rows-picture.naturalHeight*s)/2,picture.naturalWidth*s,picture.naturalHeight*s)}sourcePixels=source.getImageData(0,0,columns,rows).data;}

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
  columns = Math.max(96, Math.round(box.width)); rows = Math.max(54, Math.round(box.height));
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
requestAnimationFrame(frameLoop);
photograph.onload=measure;photograph.src='{{asset:coastal-stack}}';`,
  prompt: `Build Floyd–Steinberg Resolve as a native300×320px component. Use the supplied coastal-stack photograph. Draw it with cover cropping after image load and recompute the algorithm's source luminance, pixel caches or samples. Retain the actual dither-floyd-steinberg pixel/glyph algorithm, pointer and keyboard behavior. Put the full image above a slim quiet control row, with readable regular Inter11px controls, normal tracking, pale surfaces and fine borders. Avoid synthetic gradient posters and headline overlays.  Keep visible interface text in regular Inter400–500. Literal ASCII/bitmap glyph rendering and terminal code retain their intentional fixed-width character metrics. Preserve real interactive states, polite announcements, keyboard focus, cancellation, resize cleanup and reduced-motion alternatives. Hide technical headers and decorative readout/footer panels without removing nodes used by the behavior.`
});

