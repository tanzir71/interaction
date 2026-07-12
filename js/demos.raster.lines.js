/* INTRX registry — published line-halftone demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'halftone-lines',
  title: 'Engraving Line Screen',
  cat: 'Raster & Glitch',
  rootClass: 'd-lines',
  tags: ['canvas', 'engraving', 'variable-width'],
  libs: [],
  desc: 'Parallel engraving ribbons reconstruct a grayscale poster through continuously sampled line weight. Moving across the image rotates and resamples the screen, exposing how angle changes the same tonal source.',
  seen: 'Seen on: newspaper-inspired identities, archival storytelling, luxury editorial campaigns',
  hint: 'hover to rotate the screen, lock an angle, or use arrow keys',
  html: `
<div class="d-lines" tabindex="0" aria-label="Interactive engraving line halftone. Move across the image or use arrow keys to rotate the screen; Home resets, Space locks, and Escape releases.">
  <span class="d-lines-kicker">LINE SCREEN / VARIABLE WIDTH</span>
  <div class="d-lines-stage">
    <canvas class="d-lines-canvas" role="img" aria-label="A grayscale poster reconstructed by angled engraving lines whose width follows luminance"></canvas>
    <div class="d-lines-axis" aria-hidden="true"><i></i><b>12°</b></div>
    <span class="d-lines-mark" aria-hidden="true">///</span>
  </div>
  <div class="d-lines-meter" aria-hidden="true"><span>ANGLE</span><strong>+12</strong><b>DEG</b></div>
  <div class="d-lines-weight" aria-hidden="true"><span>LIGHT</span><i></i><i></i><i></i><i></i><span>DARK</span></div>
  <button class="d-lines-lock" type="button" aria-pressed="false">Lock 32°</button>
  <p class="d-lines-status" aria-live="polite">Twelve-degree engraving screen</p>
</div>`,
  css: `
.d-lines { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #dbe7df; color: #152c27; touch-action: none; }
.d-lines:focus-visible { box-shadow: inset 0 0 0 2px #e9482f; }
.d-lines::before { content: ''; position: absolute; inset: 0; opacity: .2; pointer-events: none;
  background-image: linear-gradient(rgba(21,44,39,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(21,44,39,.18) 1px, transparent 1px); background-size: 28px 28px; }
.d-lines-stage { position: absolute; left: 50%; top: 50%; width: min(68%, 452px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(21,44,39,.44); background: #edf2e9; box-shadow: 9px 9px 0 rgba(21,44,39,.12); }
.d-lines-canvas { display: block; width: 100%; height: 100%; }
.d-lines-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .1;
  background: repeating-linear-gradient(0deg, transparent 0 4px, rgba(21,44,39,.14) 4px 5px); mix-blend-mode: multiply; }
.d-lines-axis { position: absolute; left: 12px; top: 12px; width: 54px; height: 54px; border: 1px solid rgba(233,72,47,.64);
  border-radius: 50%; color: #e9482f; pointer-events: none; }
.d-lines-axis::before, .d-lines-axis::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-lines-axis::before { width: 6px; height: 1px; }.d-lines-axis::after { width: 1px; height: 6px; }
.d-lines-axis i { position: absolute; left: 50%; top: 50%; width: 22px; height: 1px; background: currentColor; transform-origin: 0 50%; transform: rotate(12deg); will-change: transform; }
.d-lines-axis b { position: absolute; left: 8px; bottom: 5px; font: 7px "JetBrains Mono", monospace; letter-spacing: .04em; }
.d-lines-mark { position: absolute; right: 9px; bottom: 4px; color: rgba(233,72,47,.72); font: 700 25px "JetBrains Mono", monospace; letter-spacing: -.2em; }
.d-lines-kicker { position: absolute; left: 17px; top: 18px; color: rgba(21,44,39,.58); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-lines-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(21,44,39,.5); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-lines-meter strong { min-width: 34px; color: #152c27; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-lines-meter b { font-weight: 400; }
.d-lines-weight { position: absolute; left: 17px; top: 44px; display: flex; align-items: center; gap: 4px; color: rgba(21,44,39,.48); font: 6px "JetBrains Mono", monospace; letter-spacing: .07em; }
.d-lines-weight i { display: block; width: 13px; background: #152c27; }.d-lines-weight i:nth-of-type(1) { height: 1px; }
.d-lines-weight i:nth-of-type(2) { height: 2px; }.d-lines-weight i:nth-of-type(3) { height: 4px; }.d-lines-weight i:nth-of-type(4) { height: 6px; }
.d-lines-lock { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(21,44,39,.4);
  border-radius: 999px; background: rgba(219,231,223,.82); color: #152c27; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-lines-lock:hover, .d-lines-lock[aria-pressed="true"] { background: #152c27; color: #edf2e9; transform: translateY(-2px); }
.d-lines-lock:focus-visible { outline: 2px solid #e9482f; outline-offset: 3px; }
.d-lines-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(21,44,39,.54); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-lines-stage { width: 74%; height: 190px; }.d-lines-weight { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-lines-axis i { will-change: auto; }.d-lines-lock { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-lines-canvas');
const stageEl = root.querySelector('.d-lines-stage');
const needle = root.querySelector('.d-lines-axis i');
const axisLabel = root.querySelector('.d-lines-axis b');
const meter = root.querySelector('.d-lines-meter strong');
const lockButton = root.querySelector('.d-lines-lock');
const status = root.querySelector('.d-lines-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const SPACING = 8, SAMPLE_STEP = 4;
let width = 1, height = 1, dpr = 1, sourceLuma = new Uint8Array(1);
let pointerX = .62, targetAngle = 12, angle = 12, hovering = false, locked = false, dirty = true, lastDraw = 0;

function drawSource() {
  const gradient = source.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f8f8f8'); gradient.addColorStop(.52, '#999'); gradient.addColorStop(1, '#202020');
  source.fillStyle = gradient; source.fillRect(0, 0, width, height);
  source.fillStyle = '#181818'; source.beginPath(); source.arc(width * .7, height * .34, height * .27, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#ddd'; source.beginPath(); source.arc(width * .7, height * .34, height * .13, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#414141'; source.beginPath(); source.moveTo(0, height * .73); source.lineTo(width * .48, height * .34);
  source.lineTo(width * .67, height); source.lineTo(0, height); source.closePath(); source.fill();
  source.fillStyle = '#f5f5f5'; source.font = '800 ' + Math.round(height * .31) + 'px Inter, sans-serif'; source.textBaseline = 'bottom'; source.fillText('LINE', width * .04, height * .94);
  const pixels = source.getImageData(0, 0, width, height).data; sourceLuma = new Uint8Array(width * height);
  for (let i = 0; i < sourceLuma.length; i++) {
    const p = i * 4; sourceLuma[i] = Math.round(pixels[p] * .2126 + pixels[p + 1] * .7152 + pixels[p + 2] * .0722);
  }
}
function halfWidthAt(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return .3;
  const luminance = sourceLuma[Math.floor(y) * width + Math.floor(x)] / 255;
  return .3 + (1 - luminance) * SPACING * .43;
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = width; sourceCanvas.height = height; context.setTransform(dpr, 0, 0, dpr, 0, 0); drawSource(); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function pointerAngle(event) {
  const box = stageEl.getBoundingClientRect(); pointerX = Math.max(0, Math.min(1, (event.clientX - box.left) / Math.max(1, box.width)));
  return -24 + pointerX * 58;
}
stageEl.addEventListener('pointerenter', function (event) { hovering = true; if (!locked) targetAngle = pointerAngle(event); status.textContent = 'Screen angle sampling'; dirty = true; });
stageEl.addEventListener('pointermove', function (event) { if (!locked) targetAngle = pointerAngle(event); dirty = true; }, { passive: true });
stageEl.addEventListener('pointerleave', function () { hovering = false; if (!locked) { targetAngle = 12; status.textContent = 'Twelve-degree engraving screen'; dirty = true; } });

function setLocked(next) {
  locked = next; targetAngle = locked ? 32 : hovering ? -24 + pointerX * 58 : 12;
  lockButton.setAttribute('aria-pressed', String(locked)); lockButton.textContent = locked ? 'Release angle' : 'Lock 32°';
  status.textContent = locked ? 'Thirty-two-degree screen locked' : hovering ? 'Screen angle sampling' : 'Twelve-degree engraving screen'; dirty = true;
}
lockButton.addEventListener('click', function () { setLocked(!locked); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === lockButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { setLocked(!locked); return; }
  if (event.key === 'Escape') { setLocked(false); hovering = false; targetAngle = 12; status.textContent = 'Screen angle released'; return; }
  if (event.key === 'Home') targetAngle = 12;
  else {
    const step = event.shiftKey ? 8 : 3;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') targetAngle -= step;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') targetAngle += step;
    targetAngle = Math.max(-28, Math.min(38, targetAngle));
  }
  hovering = true; status.textContent = event.key === 'Home' ? 'Twelve-degree screen restored' : 'Keyboard screen angle'; dirty = true;
});

function drawRibbon(samples, nx, ny) {
  if (samples.length < 2) return;
  context.beginPath(); context.moveTo(samples[0].x + nx * samples[0].half, samples[0].y + ny * samples[0].half);
  for (let i = 1; i < samples.length; i++) context.lineTo(samples[i].x + nx * samples[i].half, samples[i].y + ny * samples[i].half);
  for (let i = samples.length - 1; i >= 0; i--) context.lineTo(samples[i].x - nx * samples[i].half, samples[i].y - ny * samples[i].half);
  context.closePath(); context.fill();
}
function render() {
  context.fillStyle = '#edf2e9'; context.fillRect(0, 0, width, height); context.fillStyle = '#152c27';
  const radians = angle * Math.PI / 180, tx = Math.cos(radians), ty = Math.sin(radians), nx = -ty, ny = tx;
  const cx = width * .5, cy = height * .5, reach = Math.hypot(width, height) * .72 + SPACING * 2;
  for (let v = -reach; v <= reach; v += SPACING) {
    let segment = [];
    for (let u = -reach; u <= reach; u += SAMPLE_STEP) {
      const wobble = Math.sin(u * .041 + v * .073) * .42;
      const x = cx + u * tx + (v + wobble) * nx, y = cy + u * ty + (v + wobble) * ny;
      if (x >= -2 && x <= width + 2 && y >= -2 && y <= height + 2) segment.push({ x: x, y: y, half: halfWidthAt(x, y) });
      else if (segment.length) { drawRibbon(segment, nx, ny); segment = []; }
    }
    if (segment.length) drawRibbon(segment, nx, ny);
  }
  const rounded = Math.round(angle); meter.textContent = (rounded >= 0 ? '+' : '') + String(rounded).padStart(2, '0');
  axisLabel.textContent = rounded + '°'; needle.style.transform = 'rotate(' + angle.toFixed(2) + 'deg)'; dirty = false;
}
function frameLoop(time) {
  if (reduced) angle = targetAngle;
  else if (Math.abs(targetAngle - angle) > .001) { angle += (targetAngle - angle) * .13; dirty = true; }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained engraving-style line halftone on canvas. Render a deliberate grayscale source poster into an offscreen canvas at the measured CSS size and cache Rec.709 luminance per pixel. Use parallel screen lines spaced 8px apart and sample each line every 4px. For any in-bounds sample calculate halfWidth=0.3+(1-luminance/255)*spacing*0.43, so line weight—not opacity—carries the source tone.

Do not draw constant-width strokes. At the current screen angle derive tangent=(cos,sin) and normal=(-sin,cos). Cover the full diagonal reach with parallel lines. For each line, transform along-line u and normal offset v around the image center, adding at most 0.42px sinusoidal normal wobble for engraved character. Gather contiguous in-bounds samples, then create a closed ribbon polygon: traverse samples forward at point+normal*halfWidth and backward at point-normal*halfWidth. Fill the ribbon with solid ink. This geometry must be rebuilt from cached luminance whenever the angle changes, rather than rotating a finished bitmap.

Map horizontal pointer position to a screen angle from -24 to +34 degrees. Pointerenter begins live sampling, pointermove updates passively, and pointerleave returns to 12 degrees unless a semantic aria-pressed control locks 32 degrees. Ease angle by 0.13, limit redraw near 30fps, and stop once settled. Show an angle gauge, numeric degree readout, accessible focus, and polite status.

Arrow Left/Down subtract 3 degrees and Right/Up add 3; Shift uses 8 degrees. Clamp keyboard angles to -28 through +38, Home restores 12, Space toggles the 32-degree lock, and Escape releases. Ignore button-originated keys. Rebuild cached source luminance on resize, draw through a DPR transform capped at 2, and never reread source pixels during angle animation. Under prefers-reduced-motion, snap directly to target angles while preserving true resampling, pointer and keyboard control, locking, resize, DPR, variable-width ribbons, and the static rotated result.`
});
