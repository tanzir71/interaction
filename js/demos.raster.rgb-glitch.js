/* INTRX registry — published RGB slice glitch only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'glitch-rgb-slices',
  title: 'RGB Slice Transmission',
  cat: 'Raster & Glitch',
  rootClass: 'd-rgb',
  tags: ['canvas', 'rgb-split', 'slice-displacement'],
  libs: [],
  desc: 'A cached poster is decomposed into real red, green, and blue channel buffers. Deterministic horizontal bands displace and reconstruct those channels during hover bursts, producing chromatic tears rather than duplicated CSS text.',
  seen: 'Seen on: broadcast identities, electronic music releases, speculative-tech portfolios',
  hint: 'hover to corrupt the transmission or inject a burst',
  html: `
<div class="d-rgb" tabindex="0" aria-label="Interactive RGB slice transmission. Hover or press Space to trigger a burst, Up and Down move the scan focus, Home centers it, and Escape clears it.">
  <span class="d-rgb-kicker">CHANNEL BUFFER / R·G·B</span>
  <div class="d-rgb-stage">
    <canvas class="d-rgb-canvas" role="img" aria-label="A poster reconstructed from horizontally displaced red, green, and blue channel slices"></canvas>
    <div class="d-rgb-scan" aria-hidden="true"><i></i></div>
    <span class="d-rgb-timecode" aria-hidden="true">00:00:00:00</span>
  </div>
  <div class="d-rgb-meter" aria-hidden="true"><span>SLICES</span><strong>00</strong></div>
  <div class="d-rgb-channels" aria-hidden="true"><i>R</i><i>G</i><i>B</i></div>
  <button class="d-rgb-inject" type="button" aria-pressed="false">Inject burst</button>
  <p class="d-rgb-status" aria-live="polite">Transmission stable</p>
</div>`,
  css: `
.d-rgb { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #080a0f; color: #d8dde9; touch-action: none; }
.d-rgb:focus-visible { box-shadow: inset 0 0 0 2px #f24d66; }
.d-rgb::before { content: ''; position: absolute; inset: 0; opacity: .2; pointer-events: none;
  background-image: linear-gradient(rgba(216,221,233,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(216,221,233,.13) 1px, transparent 1px); background-size: 26px 26px; }
.d-rgb-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(216,221,233,.38); background: #040509; box-shadow: 9px 9px 0 rgba(242,77,102,.1); }
.d-rgb-canvas { display: block; width: 100%; height: 100%; }
.d-rgb-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .18;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.15) 3px 4px); mix-blend-mode: screen; }
.d-rgb-scan { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: rgba(255,255,255,.55); pointer-events: none; opacity: .35; will-change: transform, opacity; }
.d-rgb-scan::before, .d-rgb-scan::after { content: ''; position: absolute; top: -2px; width: 28px; height: 5px; }
.d-rgb-scan::before { left: 0; background: #ff3159; }.d-rgb-scan::after { right: 0; background: #35dfff; }
.d-rgb-scan i { position: absolute; left: 50%; top: -5px; width: 10px; height: 10px; border: 1px solid #fff; transform: translateX(-50%) rotate(45deg); }
.d-rgb.d-rgb-active .d-rgb-scan { opacity: 1; }
.d-rgb-timecode { position: absolute; right: 8px; bottom: 6px; color: rgba(255,255,255,.74); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; mix-blend-mode: difference; }
.d-rgb-kicker { position: absolute; left: 17px; top: 18px; color: rgba(216,221,233,.55); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-rgb-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 5px;
  color: rgba(216,221,233,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-rgb-meter strong { min-width: 24px; color: #fff; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-rgb-channels { position: absolute; left: 17px; top: 43px; display: flex; gap: 4px; }
.d-rgb-channels i { display: grid; width: 17px; height: 17px; place-items: center; border: 1px solid currentColor; font: 7px "JetBrains Mono", monospace; font-style: normal; }
.d-rgb-channels i:nth-child(1) { color: #ff3159; }.d-rgb-channels i:nth-child(2) { color: #5dff79; }.d-rgb-channels i:nth-child(3) { color: #35dfff; }
.d-rgb-inject { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(216,221,233,.38);
  border-radius: 999px; background: rgba(8,10,15,.84); color: #d8dde9; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-rgb-inject:hover, .d-rgb-inject[aria-pressed="true"] { background: #fff; color: #080a0f; transform: translateY(-2px); }
.d-rgb-inject:focus-visible { outline: 2px solid #f24d66; outline-offset: 3px; }
.d-rgb-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(216,221,233,.5); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-rgb-stage { width: 75%; height: 190px; }.d-rgb-channels { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-rgb-scan { will-change: auto; }.d-rgb-inject { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-rgb-canvas');
const stageEl = root.querySelector('.d-rgb-stage');
const scan = root.querySelector('.d-rgb-scan');
const meter = root.querySelector('.d-rgb-meter strong');
const injectButton = root.querySelector('.d-rgb-inject');
const status = root.querySelector('.d-rgb-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas'), redCanvas = document.createElement('canvas');
const greenCanvas = document.createElement('canvas'), blueCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const redContext = redCanvas.getContext('2d'), greenContext = greenCanvas.getContext('2d'), blueContext = blueCanvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = 1, height = 1, dpr = 1, focusY = .5, bands = [], burstId = 0;
let burstActive = false, burstStart = 0, burstDuration = 860, staticPinned = false, clock = 0, nextAuto = 3200, dirty = true, lastDraw = 0;

function drawSource() {
  const gradient = source.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#172454'); gradient.addColorStop(.5, '#7d235f'); gradient.addColorStop(1, '#f0a23d');
  source.fillStyle = gradient; source.fillRect(0, 0, width, height);
  source.fillStyle = '#e8f7ff'; source.beginPath(); source.arc(width * .73, height * .34, height * .24, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#10131c'; source.beginPath(); source.arc(width * .73, height * .34, height * .11, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(5,7,12,.7)'; source.fillRect(0, height * .68, width, height * .32);
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(height * .32) + 'px Roboto Mono, sans-serif'; source.textBaseline = 'bottom'; source.fillText('SIGNAL', width * .04, height * .95);
  source.strokeStyle = 'rgba(255,255,255,.4)'; source.lineWidth = 1;
  for (let x = 0; x < width; x += 22) { source.beginPath(); source.moveTo(x, 0); source.lineTo(x + 42, height); source.stroke(); }
}
function buildChannels() {
  const pixels = source.getImageData(0, 0, width, height).data;
  const red = redContext.createImageData(width, height), green = greenContext.createImageData(width, height), blue = blueContext.createImageData(width, height);
  for (let p = 0; p < pixels.length; p += 4) {
    red.data[p] = pixels[p]; red.data[p + 3] = 255;
    green.data[p + 1] = pixels[p + 1]; green.data[p + 3] = 255;
    blue.data[p + 2] = pixels[p + 2]; blue.data[p + 3] = 255;
  }
  redContext.putImageData(red, 0, 0); greenContext.putImageData(green, 0, 0); blueContext.putImageData(blue, 0, 0);
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = redCanvas.width = greenCanvas.width = blueCanvas.width = width;
  sourceCanvas.height = redCanvas.height = greenCanvas.height = blueCanvas.height = height;
  context.setTransform(dpr, 0, 0, dpr, 0, 0); drawSource(); buildChannels(); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function randomFactory(seed) {
  let value = seed >>> 0;
  return function () { value ^= value << 13; value ^= value >>> 17; value ^= value << 5; return (value >>> 0) / 4294967296; };
}
function generateBands() {
  const random = randomFactory(0x9e3779b9 ^ burstId * 2654435761), result = [];
  for (let i = 0; i < 10; i++) {
    const concentrated = i < 6;
    const y = concentrated ? Math.max(0, Math.min(height - 3, focusY * height + (random() - .5) * height * .58)) : random() * (height - 3);
    result.push({ y: y, h: 3 + random() * 17, shift: (random() * 2 - 1) * 22, split: 3 + random() * 8, phase: random() * Math.PI * 2 });
  }
  bands = result.sort(function (a, b) { return a.y - b.y; }); meter.textContent = String(bands.length).padStart(2, '0');
}
function startBurst(message) {
  burstId++; generateBands(); burstStart = clock; burstActive = true; dirty = true; root.classList.add('d-rgb-active');
  injectButton.setAttribute('aria-pressed', 'true'); status.textContent = message || (reduced ? 'Static RGB split frame' : 'RGB transmission burst');
}
function stopBurst(message) {
  burstActive = false; dirty = true; root.classList.remove('d-rgb-active'); injectButton.setAttribute('aria-pressed', 'false');
  meter.textContent = '00'; status.textContent = message || 'Transmission stable';
}
function setFocus(event) {
  const box = stageEl.getBoundingClientRect(); focusY = Math.max(0, Math.min(1, (event.clientY - box.top) / Math.max(1, box.height)));
  scan.style.transform = 'translateY(' + ((focusY - .5) * box.height).toFixed(2) + 'px)';
}
stageEl.addEventListener('pointerenter', function (event) { setFocus(event); startBurst('Hover RGB transmission burst'); });
stageEl.addEventListener('pointermove', function (event) { setFocus(event); }, { passive: true });
stageEl.addEventListener('pointerleave', function () { if (reduced && !staticPinned) stopBurst(); });
injectButton.addEventListener('click', function () {
  if (reduced) { staticPinned = !staticPinned; staticPinned ? startBurst('Static RGB split pinned') : stopBurst('Static split cleared'); }
  else startBurst('Manual RGB transmission burst'); root.focus();
});
root.addEventListener('keydown', function (event) {
  if (event.target === injectButton) return;
  const keys = ['ArrowUp', 'ArrowDown', 'Home', ' ', 'Enter', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === 'Escape') { staticPinned = false; stopBurst('RGB burst cleared'); return; }
  if (event.key === ' ' || event.key === 'Enter') {
    if (reduced && burstActive) { staticPinned = false; stopBurst('Static split cleared'); }
    else { if (reduced) staticPinned = true; startBurst('Keyboard RGB transmission burst'); } return;
  }
  if (event.key === 'Home') focusY = .5;
  else focusY = Math.max(0, Math.min(1, focusY + (event.key === 'ArrowDown' ? .08 : -.08)));
  const box = stageEl.getBoundingClientRect(); scan.style.transform = 'translateY(' + ((focusY - .5) * box.height).toFixed(2) + 'px)';
  startBurst('Keyboard scan focus');
});

function drawBand(band, shift, split) {
  const y = Math.max(0, Math.floor(band.y)), h = Math.min(height - y, Math.ceil(band.h)); if (h <= 0) return;
  context.save(); context.beginPath(); context.rect(0, y, width, h); context.clip();
  context.clearRect(0, y, width, h); context.fillStyle = '#040509'; context.fillRect(0, y, width, h);
  context.globalCompositeOperation = 'source-over'; context.drawImage(redCanvas, 0, y, width, h, shift + split, y, width, h);
  context.globalCompositeOperation = 'screen'; context.drawImage(greenCanvas, 0, y, width, h, shift, y, width, h);
  context.drawImage(blueCanvas, 0, y, width, h, shift - split, y, width, h); context.restore();
}
function render(envelope) {
  context.globalCompositeOperation = 'source-over'; context.clearRect(0, 0, width, height); context.drawImage(sourceCanvas, 0, 0, width, height);
  if (burstActive) {
    for (const band of bands) {
      const jitter = Math.sin(clock * .045 + band.phase) * 4;
      drawBand(band, (band.shift + jitter) * envelope, band.split * envelope);
    }
  }
  dirty = false;
}
function frameLoop(time) {
  clock = time;
  if (!reduced && !burstActive && time >= nextAuto) { startBurst('Automatic RGB transmission burst'); nextAuto = time + 3200 + (burstId % 3) * 470; }
  let envelope = 0;
  if (burstActive) {
    if (reduced) envelope = .78;
    else {
      const progress = Math.max(0, Math.min(1, (time - burstStart) / burstDuration)); envelope = Math.sin(progress * Math.PI); dirty = true;
      if (progress >= 1) { stopBurst('Transmission stable'); envelope = 0; }
    }
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(envelope); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained horizontal RGB slice glitch using canvas channel reconstruction, not duplicated DOM text. Draw a full-color poster into one offscreen canvas at CSS resolution. Read its pixels once and create three equally sized opaque-black ImageData buffers: the red buffer retains only R, green only G, and blue only B. Cache those canvases until resize.

For each burst, use a seeded xorshift generator—never Math.random—to create exactly ten horizontal bands. Concentrate six around a normalized hover/keyboard scan Y and distribute four across the frame. Give each band a 3–20px height, signed displacement up to 22px, channel split 3–11px, and phase. Sort by Y. Each frame draws the intact source first. For every band, clip and clear its rectangle, then draw the red crop at displacement+split with source-over, green at displacement with screen compositing, and blue at displacement-split with screen. This reconstructs actual color channels while shifting the whole horizontal slice.

Animate a normal burst for about 860ms with envelope=sin(progress*pi) and a small phase-based displacement jitter. Trigger on hover, through a semantic button, Space/Enter, and occasional requestAnimationFrame-clock auto bursts. Pointermove updates scan Y passively; Up/Down move it by 0.08, Home centers, and Escape clears. Expose slice count, scan line, focus styles, aria-pressed burst state, and polite status.

On resize, rebuild source and all three channel buffers and draw through a DPR transform capped at 2. Under prefers-reduced-motion, never animate the envelope or auto-trigger: hover shows a stable 0.78 split frame, pointerleave clears it unless the button or keyboard pins it, and a second activation clears the static frame. Preserve exact channel separation, scan positioning, resize, keyboard control, and the fully inspectable displaced result.`
});
