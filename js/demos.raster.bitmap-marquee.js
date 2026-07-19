/* INTRX registry — published bitmap marquee only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'bitmap-font-marquee',
  title: 'Bitmap Type Marquee',
  cat: 'Raster & Glitch',
  rootClass: 'd-bitmap',
  tags: ['canvas', 'bitmap-font', 'marquee'],
  libs: [],
  desc: 'A real font phrase is rasterized into an offscreen alpha mask, averaged through four-pixel samples, and rebuilt as five-pixel binary squares. The measured strip then scrolls and wraps without duplicating DOM text.',
  seen: 'Seen on: brutalist studios, event identities, fashion tickers and digital signage',
  hint: 'move left or right to steer speed, freeze, or step the strip',
  html: `
<div class="d-bitmap" tabindex="0" aria-label="Interactive bitmap marquee. Move left or right to steer, arrow keys set direction and speed, Home resets, Space pauses or steps, and R resets position.">
  <span class="d-bitmap-kicker">FONT MASK → 4×4 SAMPLE → 5PX</span>
  <div class="d-bitmap-stage">
    <canvas class="d-bitmap-canvas" role="img" aria-label="A scrolling text phrase re-rendered as chunky binary bitmap squares"></canvas>
    <span class="d-bitmap-gate" aria-hidden="true"></span>
    <span class="d-bitmap-label" aria-hidden="true">BINARY STRIP / LOOP</span>
  </div>
  <div class="d-bitmap-meter" aria-hidden="true"><span>SPEED</span><strong>+042</strong><b>PX/S</b></div>
  <div class="d-bitmap-sample" aria-hidden="true"><i></i><i></i><i></i><i></i><span>ACTIVE CELL</span></div>
  <button class="d-bitmap-pause" type="button" aria-pressed="false">Freeze strip</button>
  <p class="d-bitmap-status" aria-live="polite">Bitmap strip running</p>
</div>`,
  css: `
.d-bitmap { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #11120f; color: #eaff60; touch-action: none; }
.d-bitmap:focus-visible { box-shadow: inset 0 0 0 2px #eaff60; }
.d-bitmap::before { content: ''; position: absolute; inset: 0; opacity: .17; pointer-events: none;
  background-image: linear-gradient(rgba(234,255,96,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(234,255,96,.13) 1px, transparent 1px); background-size: 25px 25px; }
.d-bitmap-stage { position: absolute; left: 50%; top: 50%; width: min(71%, 472px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(234,255,96,.4); background: #050604; box-shadow: 9px 9px 0 rgba(234,255,96,.09); }
.d-bitmap-canvas { display: block; width: 100%; height: 100%; }
.d-bitmap-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .12;
  background: repeating-linear-gradient(0deg, transparent 0 4px, rgba(255,255,255,.13) 4px 5px); mix-blend-mode: screen; }
.d-bitmap-gate { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: rgba(255,104,78,.76); pointer-events: none; }
.d-bitmap-gate::before, .d-bitmap-gate::after { content: ''; position: absolute; left: -4px; width: 9px; height: 9px; border: 1px solid #ff684e; transform: rotate(45deg); }
.d-bitmap-gate::before { top: 8px; }.d-bitmap-gate::after { bottom: 8px; }
.d-bitmap-label { position: absolute; right: 8px; bottom: 7px; color: rgba(255,255,255,.7); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-bitmap-kicker { position: absolute; left: 17px; top: 18px; color: rgba(234,255,96,.53); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-bitmap-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(234,255,96,.47); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-bitmap-meter strong { min-width: 43px; color: #eaff60; font-size: 18px; font-weight: 500; letter-spacing: 0; text-align: right; }.d-bitmap-meter b { font-weight: 400; }
.d-bitmap-sample { position: absolute; left: 17px; top: 43px; display: grid; grid-template-columns: repeat(2, 7px) auto; gap: 2px; align-items: center; }
.d-bitmap-sample i { width: 7px; height: 7px; background: #eaff60; }.d-bitmap-sample i:nth-child(2), .d-bitmap-sample i:nth-child(3) { opacity: .24; }
.d-bitmap-sample span { grid-row: 1 / 3; grid-column: 3; margin-left: 5px; color: rgba(234,255,96,.47); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-bitmap-pause { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(234,255,96,.37);
  border-radius: 999px; background: rgba(17,18,15,.84); color: #eaff60; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-bitmap-pause:hover, .d-bitmap-pause[aria-pressed="true"] { background: #eaff60; color: #11120f; transform: translateY(-2px); }
.d-bitmap-pause:focus-visible { outline: 2px solid #ff684e; outline-offset: 3px; }
.d-bitmap-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(234,255,96,.49); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-bitmap-stage { width: 77%; height: 190px; }.d-bitmap-sample { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-bitmap-pause { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-bitmap-canvas');
const stageEl = root.querySelector('.d-bitmap-stage');
const meter = root.querySelector('.d-bitmap-meter strong');
const pauseButton = root.querySelector('.d-bitmap-pause');
const status = root.querySelector('.d-bitmap-status');
const context = canvas.getContext('2d', { alpha: false });
const textCanvas = document.createElement('canvas');
const textContext = textCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PHRASE = 'PIXEL TYPE  /  SIGNAL  /  REPEAT  /  ', SAMPLE = 4, PIXEL = 5, TEXT_HEIGHT = 56;
const PALETTE = ['#eaff60', '#7ce8ff', '#ff684e'];
let width = 1, height = 1, dpr = 1, bitmap = [], bitmapColumns = 1, bitmapRows = 1, stripWidth = 1, stripHeight = 1;
let offset = 0, targetSpeed = 42, speed = 42, paused = false, lastTime = null, dirty = true, lastDraw = 0;

function buildBitmap() {
  textContext.font = '800 42px Roboto Mono, sans-serif';
  const measured = Math.ceil(textContext.measureText(PHRASE).width);
  textCanvas.width = measured + 24; textCanvas.height = TEXT_HEIGHT;
  textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
  textContext.font = '800 42px Roboto Mono, sans-serif'; textContext.textBaseline = 'middle'; textContext.fillStyle = '#fff';
  textContext.fillText(PHRASE, 12, TEXT_HEIGHT * .52);
  const pixels = textContext.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
  bitmapColumns = Math.ceil(textCanvas.width / SAMPLE); bitmapRows = Math.ceil(textCanvas.height / SAMPLE); bitmap = [];
  for (let row = 0; row < bitmapRows; row++) {
    for (let column = 0; column < bitmapColumns; column++) {
      let alpha = 0, count = 0;
      for (let y = row * SAMPLE; y < Math.min(textCanvas.height, (row + 1) * SAMPLE); y++) {
        for (let x = column * SAMPLE; x < Math.min(textCanvas.width, (column + 1) * SAMPLE); x++) { alpha += pixels[(y * textCanvas.width + x) * 4 + 3]; count++; }
      }
      if (alpha / Math.max(1, count * 255) >= .18) bitmap.push({ column: column, row: row });
    }
  }
  stripWidth = bitmapColumns * PIXEL + PIXEL * 8; stripHeight = bitmapRows * PIXEL;
  offset = ((offset % stripWidth) + stripWidth) % stripWidth; dirty = true;
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0); buildBitmap();
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function pointerSpeed(event) {
  const box = stageEl.getBoundingClientRect(); const normalized = Math.max(0, Math.min(1, (event.clientX - box.left) / Math.max(1, box.width)));
  targetSpeed = (normalized - .5) * 140; status.textContent = Math.abs(targetSpeed) < 4 ? 'Pointer holding strip' : targetSpeed > 0 ? 'Strip moving left' : 'Strip moving right';
}
stageEl.addEventListener('pointerenter', pointerSpeed);
stageEl.addEventListener('pointermove', pointerSpeed, { passive: true });
stageEl.addEventListener('pointerleave', function () { targetSpeed = 42; status.textContent = paused ? 'Bitmap strip frozen' : 'Bitmap strip running'; });

function activateButton() {
  if (reduced) {
    offset = (offset + PIXEL * 6) % stripWidth; dirty = true; status.textContent = 'Bitmap strip stepped 30 pixels'; return;
  }
  paused = !paused; pauseButton.setAttribute('aria-pressed', String(paused)); pauseButton.textContent = paused ? 'Resume strip' : 'Freeze strip';
  status.textContent = paused ? 'Bitmap strip frozen' : 'Bitmap strip running'; dirty = true;
}
if (reduced) { pauseButton.textContent = 'Step 30px'; status.textContent = 'Reduced motion · static strip'; }
pauseButton.addEventListener('click', function () { activateButton(); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === pauseButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'r', 'R'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { activateButton(); return; }
  if (event.key === 'r' || event.key === 'R') { offset = 0; dirty = true; status.textContent = 'Bitmap strip reset'; return; }
  if (reduced) {
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    offset = ((offset + direction * PIXEL * (event.shiftKey ? 6 : 2)) % stripWidth + stripWidth) % stripWidth; dirty = true; status.textContent = 'Keyboard pixel step'; return;
  }
  if (event.key === 'Home') targetSpeed = 42;
  else if (event.key === 'ArrowLeft') targetSpeed = -Math.max(28, Math.abs(targetSpeed));
  else if (event.key === 'ArrowRight') targetSpeed = Math.max(28, Math.abs(targetSpeed));
  else {
    const sign = targetSpeed < 0 ? -1 : 1, amount = event.shiftKey ? 24 : 12;
    targetSpeed = sign * Math.max(0, Math.min(96, Math.abs(targetSpeed) + (event.key === 'ArrowUp' ? amount : -amount)));
  }
  status.textContent = 'Keyboard marquee speed';
});

function render() {
  context.fillStyle = '#050604'; context.fillRect(0, 0, width, height);
  const top = (height - stripHeight) * .5;
  let base = -offset; while (base > 0) base -= stripWidth;
  for (; base < width; base += stripWidth) {
    for (const pixel of bitmap) {
      const x = base + pixel.column * PIXEL, y = top + pixel.row * PIXEL;
      if (x <= -PIXEL || x >= width) continue;
      context.fillStyle = PALETTE[(pixel.column + pixel.row) % PALETTE.length]; context.fillRect(x, y, PIXEL - 1, PIXEL - 1);
    }
  }
  const rounded = Math.round(paused || reduced ? 0 : speed); meter.textContent = (rounded >= 0 ? '+' : '') + String(rounded).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (lastTime === null) lastTime = time;
  const delta = Math.min(.05, Math.max(0, (time - lastTime) / 1000)); lastTime = time;
  if (!reduced && !paused) {
    speed += (targetSpeed - speed) * .12; offset = ((offset + speed * delta) % stripWidth + stripWidth) % stripWidth; dirty = true;
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained chunky bitmap marquee with a real two-stage canvas raster pipeline. First render the phrase "PIXEL TYPE / SIGNAL / REPEAT /" in a bold 42px font into a transparent offscreen canvas measured from text width plus 24px padding and 56px height. Read alpha pixels and divide the mask into 4×4 source samples. Mark a binary cell active only when average alpha coverage is at least 0.18. Cache active row/column coordinates.

Re-render the binary mask into the visible canvas as squares exactly 5px apart and 4px filled, coloring active cells from a small palette. Calculate stripWidth=bitmapColumns*5+40 and stripHeight=bitmapRows*5. Maintain a wrapped offset in [0,stripWidth). Begin the first copy at -offset, walk backward if needed, and repeat copies by stripWidth until past the viewport. This must produce a seamless measured loop rather than duplicated DOM text.

Advance offset from capped frame delta and an eased pixels-per-second speed. Pointer X maps linearly from -70 to +70 and pointerleave returns to +42. A semantic pause button freezes without losing position. Arrow Left/Right choose direction, Up/Down adjust magnitude by 12 or 24 with Shift, Home restores +42, Space pauses, and R resets. Ignore button-originated keys. Draw near 30fps, cap DPR at 2, and rebuild the mask on resize.

Under prefers-reduced-motion, never advance offset automatically. Rename the button to Step 30px; button/Space adds exactly six bitmap pixels, arrow keys step two pixels or six with Shift in either direction, and R resets. Preserve the actual font-mask sampling, binary threshold, wrap math, palette, keyboard access, visible focus, status, and static bitmap strip.`
});
