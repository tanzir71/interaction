/* INTRX registry — published blue-noise demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'dither-blue-noise',
  title: 'Blue-Noise Image Dissolve',
  cat: 'Raster & Glitch',
  rootClass: 'd-blue',
  tags: ['canvas', 'blue-noise', 'image-transition'],
  libs: [],
  desc: 'A deterministic farthest-point rank mask swaps two complete source images pixel by pixel. Click position leads the transition while spatially separated thresholds avoid the clumps of ordinary random noise.',
  seen: 'Seen on: art-direction portfolios, album campaigns, generative image transitions',
  hint: 'click the image to dissolve, move the origin, or press Space',
  html: `
<div class="d-blue" tabindex="0" aria-label="Blue-noise image dissolve. Click or press Space to swap images; arrow keys move the transition origin and Home centers it.">
  <span class="d-blue-kicker">RANKED MASK / 32²</span>
  <div class="d-blue-stage">
    <canvas class="d-blue-canvas" role="img" aria-label="Two graphic images transitioning through a ranked blue-noise threshold mask"></canvas>
    <div class="d-blue-origin" aria-hidden="true"><i></i></div>
    <div class="d-blue-labels" aria-hidden="true"><span>A / NIGHT</span><span>B / SIGNAL</span></div>
  </div>
  <div class="d-blue-meter" aria-hidden="true"><span>DISSOLVE</span><strong>000</strong><b>%</b></div>
  <div class="d-blue-spectrum" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <button class="d-blue-toggle" type="button" aria-pressed="false">Dissolve to B</button>
  <p class="d-blue-status" aria-live="polite">Image A · mask idle</p>
</div>`,
  css: `.d-blue{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0 0 10px;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end}.d-blue>span,.d-blue>[class$="-meter"],.d-blue>[class$="-weights"],.d-blue>[class$="-spectrum"],.d-blue>[class$="-scale"],.d-blue>[class$="-ramp"],.d-blue>[class$="-weight"],.d-blue>[class$="-waves"]{display:none}.d-blue>[class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#d5dcca}.d-blue canvas{width:100%;height:100%;display:block}.d-blue>[class$="-stage"]>*:not(canvas){display:none}.d-blue [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-blue button{position:relative;min-height:28px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;cursor:pointer;z-index:5}.d-blue button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-blue button:focus-visible,.d-blue:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-blue [class$="-actions"]{display:flex;gap:8px}`,
  js: `const photograph=new Image();const photographB=new Image();

const canvas = root.querySelector('.d-blue-canvas');
const stageEl = root.querySelector('.d-blue-stage');
const originMark = root.querySelector('.d-blue-origin');
const meter = root.querySelector('.d-blue-meter strong');
const toggleButton = root.querySelector('.d-blue-toggle');
const status = root.querySelector('.d-blue-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceACanvas = document.createElement('canvas');
const sourceBCanvas = document.createElement('canvas');
const sourceAContext = sourceACanvas.getContext('2d', { willReadFrequently: true });
const sourceBContext = sourceBCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MASK_SIZE = 32, MASK_AREA = MASK_SIZE * MASK_SIZE;
let maskRanks = null, columns = 1, rows = 1, pixelsA = new Uint8ClampedArray(4), pixelsB = new Uint8ClampedArray(4), output = null;
let origin = { x: .5, y: .5 }, target = 0, progress = 0, dirty = true, lastDraw = 0;

function buildBlueNoiseRanks() {
  const ranks = new Uint16Array(MASK_AREA), used = new Uint8Array(MASK_AREA);
  const nearest = new Float32Array(MASK_AREA); nearest.fill(Infinity);
  let selected = 527;
  for (let rank = 0; rank < MASK_AREA; rank++) {
    ranks[selected] = rank; used[selected] = 1;
    const sx = selected % MASK_SIZE, sy = Math.floor(selected / MASK_SIZE);
    for (let i = 0; i < MASK_AREA; i++) {
      if (used[i]) continue;
      const x = i % MASK_SIZE, y = Math.floor(i / MASK_SIZE);
      const dx = Math.min(Math.abs(x - sx), MASK_SIZE - Math.abs(x - sx));
      const dy = Math.min(Math.abs(y - sy), MASK_SIZE - Math.abs(y - sy));
      nearest[i] = Math.min(nearest[i], dx * dx + dy * dy);
    }
    if (rank + 1 < MASK_AREA) {
      let best = -1, bestScore = -1;
      for (let i = 0; i < MASK_AREA; i++) {
        if (used[i]) continue;
        const tieBreak = ((i * 2654435761 + rank * 1013904223) >>> 0) * 1e-12;
        const score = nearest[i] + tieBreak;
        if (score > bestScore) { bestScore = score; best = i; }
      }
      selected = best;
    }
  }
  return ranks;
}
maskRanks = buildBlueNoiseRanks();

function drawSource(ctx,variant){const picture=variant==='A'?photograph:photographB;ctx.fillStyle='#dfe3d8';ctx.fillRect(0,0,columns,rows);if(picture.naturalWidth){const s=Math.max(columns/picture.naturalWidth,rows/picture.naturalHeight);ctx.drawImage(picture,(columns-picture.naturalWidth*s)/2,(rows-picture.naturalHeight*s)/2,picture.naturalWidth*s,picture.naturalHeight*s)}}
function measure() {
  const box = stageEl.getBoundingClientRect();
  columns = Math.max(112, Math.round(box.width)); rows = Math.max(56, Math.round(box.height));
  canvas.width = sourceACanvas.width = sourceBCanvas.width = columns; canvas.height = sourceACanvas.height = sourceBCanvas.height = rows;
  context.imageSmoothingEnabled = false; drawSource(sourceAContext, 'A'); drawSource(sourceBContext, 'B');
  pixelsA = sourceAContext.getImageData(0, 0, columns, rows).data; pixelsB = sourceBContext.getImageData(0, 0, columns, rows).data;
  output = context.createImageData(columns, rows); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setOrigin(x, y) {
  origin.x = Math.max(0, Math.min(1, x)); origin.y = Math.max(0, Math.min(1, y)); dirty = true;
  const box = stageEl.getBoundingClientRect(); originMark.style.transform = 'translate(' + (origin.x * box.width).toFixed(2) + 'px,' + (origin.y * box.height).toFixed(2) + 'px)';
}
function toggle(next, message) {
  target = typeof next === 'number' ? next : target > .5 ? 0 : 1;
  root.classList.toggle('d-blue-to-b', target === 1); toggleButton.setAttribute('aria-pressed', String(target === 1));
  toggleButton.textContent = target === 1 ? 'Return to A' : 'Dissolve to B';
  status.textContent = message || (target === 1 ? 'Dissolving toward image B' : 'Reassembling image A'); dirty = true;
}
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setOrigin((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height);
}, { passive: true });
stageEl.addEventListener('pointerdown', function (event) {
  const box = stageEl.getBoundingClientRect(); setOrigin((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height);
  toggle(undefined, target > .5 ? 'Click dissolve toward image A' : 'Click dissolve toward image B'); root.focus();
});
toggleButton.addEventListener('click', function () { setOrigin(.5, .5); toggle(); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === toggleButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Enter'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ' || event.key === 'Enter') { toggle(); return; }
  if (event.key === 'Home') { setOrigin(.5, .5); status.textContent = 'Dissolve origin centered'; return; }
  const step = event.shiftKey ? .12 : .055;
  setOrigin(origin.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
    origin.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0)); status.textContent = 'Keyboard dissolve origin';
});
setOrigin(.5, .5);

function render() {
  const data = output.data, direction = target >= progress ? 1 : -1;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const index = y * columns + x, p = index * 4;
      const dx = x / Math.max(1, columns - 1) - origin.x;
      const dy = (y / Math.max(1, rows - 1) - origin.y) * (rows / columns);
      const wave = Math.max(0, 1 - Math.hypot(dx, dy) / .55) * .18 * direction;
      const localProgress = progress <= 0 ? 0 : progress >= 1 ? 1 : Math.max(0, Math.min(1, progress + wave));
      const threshold = (maskRanks[(y & 31) * MASK_SIZE + (x & 31)] + .5) / MASK_AREA;
      const sourcePixels = localProgress >= threshold ? pixelsB : pixelsA;
      data[p] = sourcePixels[p]; data[p + 1] = sourcePixels[p + 1]; data[p + 2] = sourcePixels[p + 2]; data[p + 3] = 255;
    }
  }
  context.putImageData(output, 0, 0);
  const box = stageEl.getBoundingClientRect();
  originMark.style.transform = 'translate(' + (origin.x * box.width).toFixed(2) + 'px,' + (origin.y * box.height).toFixed(2) + 'px) scale(' + (1 + Math.sin(progress * Math.PI) * .22).toFixed(3) + ')';
  meter.textContent = String(Math.round(progress * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (reduced) progress = target;
  else if (Math.abs(target - progress) > .0005) { progress += (target - progress) * .075; dirty = true; }
  else if (progress !== target) { progress = target; dirty = true; status.textContent = target === 1 ? 'Image B · dissolve complete' : 'Image A · mask idle'; }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);
photograph.onload=measure;photograph.src='{{asset:limestone-pavilion}}';photographB.onload=measure;photographB.src='{{asset:atlantic-shore}}';`,
  prompt: `Build Blue-Noise Image Dissolve as a native300×320px component. Use the supplied limestone-pavilion photograph and atlantic-shore as the alternate source. Draw it with cover cropping after image load and recompute the algorithm's source luminance, pixel caches or samples. Retain the actual dither-blue-noise pixel/glyph algorithm, pointer and keyboard behavior. Put the full image above a slim quiet control row, with readable regular Inter11px controls, normal tracking, pale surfaces and fine borders. Avoid synthetic gradient posters and headline overlays.  Keep visible interface text in regular Inter400–500. Literal ASCII/bitmap glyph rendering and terminal code retain their intentional fixed-width character metrics. Preserve real interactive states, polite announcements, keyboard focus, cancellation, resize cleanup and reduced-motion alternatives. Hide technical headers and decorative readout/footer panels without removing nodes used by the behavior.`
});
