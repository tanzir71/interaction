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
  css: `.d-bitmap{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-bitmap::before,.d-bitmap::after{display:none}.d-bitmap>span,.d-bitmap>[class$="-meter"],.d-bitmap>[class$="-channels"],.d-bitmap>[class$="-vector"],.d-bitmap>[class$="-order"],.d-bitmap>[class$="-phosphor"],.d-bitmap>[class$="-fields"],.d-bitmap>[class$="-matrix"],.d-bitmap>[class$="-sample"]{display:none}.d-bitmap [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-bitmap [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-bitmap canvas{display:block;width:100%;height:100%;object-fit:cover}.d-bitmap [class$="-stage"]>span,.d-bitmap [class$="-stage"]>[class$="-origin"],.d-bitmap [class$="-labels"],.d-bitmap [class$="-scan"]{display:none}.d-bitmap button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-bitmap button:hover{background:#dde5d3}.d-bitmap button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-bitmap button:focus-visible,.d-bitmap input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-bitmap [class$="-actions"]{display:flex;gap:8px}.d-bitmap:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-bitmap{background:#ebece7}.d-bitmap .d-bitmap-stage{background:#343b30}.d-bitmap canvas{image-rendering:pixelated}`,
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
const PALETTE = ['#e4eadc', '#c4cebb', '#e4eadc'];
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
  context.fillStyle = '#30382b'; context.fillRect(0, 0, width, height);
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
  prompt: `Create the Bitmap Type Marquee interaction with a native300×320px composition. Make the literal bitmap glyphs the visual focus on an uncluttered dark green display with a small pause button below. The pixel alphabet is intentionally rasterized, while all interface text uses regular Inter. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
