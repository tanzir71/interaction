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
  css: `
.d-blue { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #0a1020; color: #b6f3ff; touch-action: none; }
.d-blue:focus-visible { box-shadow: inset 0 0 0 2px #34e1ff; }
.d-blue::before { content: ''; position: absolute; inset: 0; opacity: .2; pointer-events: none;
  background-image: linear-gradient(rgba(52,225,255,.17) 1px, transparent 1px), linear-gradient(90deg, rgba(52,225,255,.17) 1px, transparent 1px); background-size: 24px 24px; }
.d-blue-stage { position: absolute; left: 50%; top: 50%; width: min(68%, 452px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(182,243,255,.44); background: #07101e; box-shadow: 9px 9px 0 rgba(52,225,255,.11); cursor: crosshair; }
.d-blue-canvas { display: block; width: 100%; height: 100%; image-rendering: pixelated; image-rendering: crisp-edges; }
.d-blue-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .15;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.14) 3px 4px); mix-blend-mode: overlay; }
.d-blue-origin { position: absolute; left: 0; top: 0; width: 42px; height: 42px; margin: -21px 0 0 -21px;
  border: 1px solid rgba(255,255,255,.78); border-radius: 50%; color: #fff; mix-blend-mode: difference; pointer-events: none; will-change: transform; }
.d-blue-origin::before, .d-blue-origin::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-blue-origin::before { width: 58px; height: 1px; }.d-blue-origin::after { width: 1px; height: 58px; }
.d-blue-origin i { position: absolute; inset: 7px; border: 1px dashed currentColor; border-radius: 50%; opacity: .6; }
.d-blue-labels { position: absolute; left: 9px; right: 9px; bottom: 7px; display: flex; justify-content: space-between;
  color: rgba(255,255,255,.78); font: 7px "JetBrains Mono", monospace; letter-spacing: .1em; mix-blend-mode: difference; }
.d-blue-kicker { position: absolute; left: 17px; top: 18px; color: rgba(182,243,255,.58); font: 8px "JetBrains Mono", monospace; letter-spacing: .14em; }
.d-blue-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(182,243,255,.5); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-blue-meter strong { min-width: 34px; color: #b6f3ff; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-blue-meter b { font-weight: 400; }
.d-blue-spectrum { position: absolute; left: 17px; top: 42px; display: flex; gap: 3px; align-items: flex-end; height: 18px; }
.d-blue-spectrum i { display: block; width: 3px; background: #34e1ff; opacity: .42; }
.d-blue-spectrum i:nth-child(1), .d-blue-spectrum i:nth-child(8) { height: 2px; }
.d-blue-spectrum i:nth-child(2), .d-blue-spectrum i:nth-child(7) { height: 5px; }
.d-blue-spectrum i:nth-child(3), .d-blue-spectrum i:nth-child(6) { height: 10px; }
.d-blue-spectrum i:nth-child(4), .d-blue-spectrum i:nth-child(5) { height: 17px; opacity: .85; }
.d-blue-toggle { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(182,243,255,.4);
  border-radius: 999px; background: rgba(10,16,32,.82); color: #b6f3ff; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-blue-toggle:hover, .d-blue-toggle[aria-pressed="true"] { background: #34e1ff; color: #07101e; transform: translateY(-2px); }
.d-blue-toggle:focus-visible { outline: 2px solid #34e1ff; outline-offset: 3px; }
.d-blue-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(182,243,255,.52); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
.d-blue.d-blue-to-b { background: #251025; color: #ffd6b6; }.d-blue.d-blue-to-b .d-blue-meter strong { color: #ffd6b6; }
@media (max-width: 620px) { .d-blue-stage { width: 74%; height: 190px; }.d-blue-spectrum { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-blue-origin { will-change: auto; }.d-blue-toggle { transition: none; } }
`,
  js: `
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

function drawSource(ctx, variant) {
  const gradient = ctx.createLinearGradient(0, 0, columns, rows);
  if (variant === 'A') { gradient.addColorStop(0, '#071a38'); gradient.addColorStop(.52, '#136a82'); gradient.addColorStop(1, '#62ecdc'); }
  else { gradient.addColorStop(0, '#ff445f'); gradient.addColorStop(.5, '#ff8c35'); gradient.addColorStop(1, '#ffe968'); }
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, columns, rows);
  ctx.strokeStyle = variant === 'A' ? 'rgba(190,255,255,.82)' : 'rgba(67,15,52,.72)'; ctx.lineWidth = Math.max(1, rows * .018);
  for (let ring = 1; ring <= 5; ring++) { ctx.beginPath(); ctx.arc(columns * (variant === 'A' ? .68 : .31), rows * .44, rows * ring * .105, 0, Math.PI * 2); ctx.stroke(); }
  ctx.fillStyle = variant === 'A' ? '#d8ffff' : '#3a102d'; ctx.font = '800 ' + Math.round(rows * .31) + 'px Roboto Mono, sans-serif'; ctx.textBaseline = 'middle';
  ctx.fillText(variant === 'A' ? 'NIGHT' : 'SIGNAL', columns * .06, rows * .73);
  ctx.fillStyle = variant === 'A' ? 'rgba(7,15,32,.72)' : 'rgba(255,247,190,.66)';
  for (let i = 0; i < 8; i++) ctx.fillRect(columns * (i / 8), 0, Math.max(1, columns * .018), rows);
}
function measure() {
  const box = stageEl.getBoundingClientRect();
  columns = Math.max(112, Math.round(box.width / 2)); rows = Math.max(56, Math.round(box.height / 2));
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
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained image dissolve driven by a deterministic ranked blue-noise threshold mask, not independent Math.random samples and not an opacity cross-fade. Create a 32×32 toroidal rank map once. Begin from one selected cell; after every selection, update each unused cell's squared distance to its nearest selected cell using wrapped X/Y distances. Choose the unused cell with the greatest nearest distance for the next rank, using only a tiny deterministic integer-hash value to break equal-distance ties. The result must contain every rank 0–1023 exactly once.

Render two distinct full-color procedural source images into separate offscreen canvases at approximately one logical pixel per two CSS pixels and cache both RGBA arrays. During the transition, tile the mask over the output. For pixel x/y compute threshold=(rank[(y mod 32)*32+(x mod 32)]+0.5)/1024 and copy all RGB channels from source B only when localProgress is at least that threshold; otherwise copy source A. Never interpolate source colors, so every output pixel always belongs completely to one image.

Clicking the image toggles the target endpoint and stores the normalized click position as a transition origin. Bias local progress by max(0,1-distance/0.55)*0.18 in the current transition direction, with aspect correction in normalized Y. Endpoint progress 0 and 1 must explicitly bypass this bias so final frames are exact source A or source B. Ease progress toward the target by 0.075, rebuild pixels near 30fps, and stop once settled.

Add a semantic aria-pressed toggle, polite state announcements, a visible origin reticle and percentage readout. Pointermove updates the origin passively; pointerdown toggles. Arrow keys move the origin by 0.055, Shift+Arrow by 0.12, Home centers it, and Space or Enter toggles, without intercepting button keys. Resize rebuilds only the sources and output; the rank mask stays stable. Under prefers-reduced-motion, snap progress directly to the target and render an exact endpoint while preserving click, keyboard, resize, source selection, mask generation, and status behavior.`
});
