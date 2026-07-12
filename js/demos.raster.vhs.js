/* INTRX registry — published VHS tracking demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'vhs-tracking',
  title: 'VHS Tracking Deck',
  cat: 'Raster & Glitch',
  rootClass: 'd-vhs',
  tags: ['canvas', 'vhs', 'chroma-bleed'],
  libs: [],
  desc: 'Four seeded tracking bands bend two-pixel tape rows through wrapped sine displacement. Disturbed rows receive oppositely shifted red and cyan channel copies plus deterministic head-switching noise.',
  seen: 'Seen on: analog-film archives, music labels, fashion films and lo-fi campaign sites',
  hint: 'hover to lose tracking, move the head, or inject an error',
  html: `
<div class="d-vhs" tabindex="0" aria-label="Interactive VHS tracking error. Hover or press Space to disturb tracking, arrows move the tracking head, Home centers it, and Escape restores the tape.">
  <span class="d-vhs-kicker">SP / TRACKING / AUTO</span>
  <div class="d-vhs-stage">
    <canvas class="d-vhs-canvas" role="img" aria-label="A tape image with sine-displaced tracking bands, wrapped rows, chroma bleed, and head-switching noise"></canvas>
    <div class="d-vhs-head" aria-hidden="true"><i></i></div>
    <span class="d-vhs-osd" aria-hidden="true">PLAY ▶ 00:12:48</span>
  </div>
  <div class="d-vhs-meter" aria-hidden="true"><span>BANDS</span><strong>00</strong></div>
  <div class="d-vhs-chroma" aria-hidden="true"><i></i><span>Y / C</span><i></i></div>
  <button class="d-vhs-error" type="button" aria-pressed="false">Lose tracking</button>
  <p class="d-vhs-status" aria-live="polite">Tracking locked</p>
</div>`,
  css: `
.d-vhs { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #16121b; color: #d9d1e1; touch-action: none; }
.d-vhs:focus-visible { box-shadow: inset 0 0 0 2px #ff9e55; }
.d-vhs::before { content: ''; position: absolute; inset: 0; opacity: .2; pointer-events: none;
  background-image: linear-gradient(rgba(217,209,225,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(217,209,225,.13) 1px, transparent 1px); background-size: 25px 25px; }
.d-vhs-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(217,209,225,.38); background: #050407; box-shadow: 9px 9px 0 rgba(255,158,85,.09); }
.d-vhs-canvas { display: block; width: 100%; height: 100%; }
.d-vhs-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .16;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.13) 3px 4px); mix-blend-mode: screen; }
.d-vhs-head { position: absolute; left: 0; right: 0; top: 50%; height: 1px; color: #ff9e55; background: currentColor; opacity: .35; pointer-events: none; will-change: transform, opacity; }
.d-vhs-head::before, .d-vhs-head::after { content: ''; position: absolute; top: -3px; width: 7px; height: 7px; border: 1px solid currentColor; transform: rotate(45deg); }
.d-vhs-head::before { left: 4px; }.d-vhs-head::after { right: 4px; }
.d-vhs-head i { position: absolute; left: 50%; top: -5px; width: 10px; height: 10px; border: 1px dashed currentColor; transform: translateX(-50%) rotate(45deg); }
.d-vhs.d-vhs-active .d-vhs-head { opacity: 1; }
.d-vhs-osd { position: absolute; left: 8px; top: 7px; color: rgba(255,255,255,.74); text-shadow: 1px 0 #ff3d63, -1px 0 #39e9ff;
  font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-vhs-kicker { position: absolute; left: 17px; top: 18px; color: rgba(217,209,225,.53); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-vhs-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 5px;
  color: rgba(217,209,225,.46); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-vhs-meter strong { min-width: 24px; color: #d9d1e1; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-vhs-chroma { position: absolute; left: 17px; top: 43px; display: flex; align-items: center; gap: 5px; color: rgba(217,209,225,.48); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-vhs-chroma i { display: block; width: 20px; height: 3px; }.d-vhs-chroma i:first-child { background: #ff3d63; }.d-vhs-chroma i:last-child { background: #39e9ff; }
.d-vhs-error { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(217,209,225,.36);
  border-radius: 999px; background: rgba(22,18,27,.84); color: #d9d1e1; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-vhs-error:hover, .d-vhs-error[aria-pressed="true"] { background: #d9d1e1; color: #16121b; transform: translateY(-2px); }
.d-vhs-error:focus-visible { outline: 2px solid #ff9e55; outline-offset: 3px; }
.d-vhs-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(217,209,225,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-vhs-stage { width: 75%; height: 190px; }.d-vhs-chroma { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-vhs-head { will-change: auto; }.d-vhs-error { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-vhs-canvas');
const stageEl = root.querySelector('.d-vhs-stage');
const head = root.querySelector('.d-vhs-head');
const meter = root.querySelector('.d-vhs-meter strong');
const errorButton = root.querySelector('.d-vhs-error');
const status = root.querySelector('.d-vhs-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas'), redCanvas = document.createElement('canvas'), cyanCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const redContext = redCanvas.getContext('2d'), cyanContext = cyanCanvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ROW = 2;
let width = 1, height = 1, dpr = 1, focus = { x: .5, y: .5 }, intensity = 1;
let bands = [], trackingActive = false, staticPinned = false, batchId = 0, trackingStart = 0, trackingDuration = 1180;
let clock = 0, nextTracking = 3600, dirty = true, lastDraw = 0;

function drawSource() {
  const gradient = source.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#162c59'); gradient.addColorStop(.5, '#8d315d'); gradient.addColorStop(1, '#f0a354');
  source.fillStyle = gradient; source.fillRect(0, 0, width, height);
  source.fillStyle = '#d9fae8'; source.beginPath(); source.arc(width * .72, height * .33, height * .23, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#11131b'; source.beginPath(); source.arc(width * .72, height * .33, height * .1, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(6,7,12,.68)'; source.fillRect(0, height * .68, width, height * .32);
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(height * .31) + 'px Inter, sans-serif'; source.textBaseline = 'bottom'; source.fillText('TAPE', width * .05, height * .95);
  source.strokeStyle = 'rgba(255,255,255,.32)'; source.lineWidth = 1;
  for (let x = 0; x < width; x += 23) { source.beginPath(); source.moveTo(x, 0); source.lineTo(x + 34, height); source.stroke(); }
}
function buildChroma() {
  const pixels = source.getImageData(0, 0, width, height).data;
  const red = redContext.createImageData(width, height), cyan = cyanContext.createImageData(width, height);
  for (let p = 0; p < pixels.length; p += 4) {
    red.data[p] = pixels[p]; red.data[p + 3] = 255;
    cyan.data[p + 1] = pixels[p + 1]; cyan.data[p + 2] = pixels[p + 2]; cyan.data[p + 3] = 255;
  }
  redContext.putImageData(red, 0, 0); cyanContext.putImageData(cyan, 0, 0);
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = redCanvas.width = cyanCanvas.width = width; sourceCanvas.height = redCanvas.height = cyanCanvas.height = height;
  context.setTransform(dpr, 0, 0, dpr, 0, 0); drawSource(); buildChroma(); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function randomFactory(seed) {
  let value = seed >>> 0;
  return function () { value ^= value << 13; value ^= value >>> 17; value ^= value << 5; return (value >>> 0) / 4294967296; };
}
function generateBands() {
  const random = randomFactory(0x27d4eb2d ^ batchId * 2654435761), result = [];
  for (let i = 0; i < 4; i++) {
    const centered = i < 2;
    const y = centered ? Math.max(0, Math.min(height - 10, focus.y * height + (random() - .5) * height * .55)) : random() * (height - 10);
    result.push({ y: y, height: 16 + random() * 45, amplitude: (7 + random() * 16) * intensity,
      frequency: .045 + random() * .085, speed: .006 + random() * .008, phase: random() * Math.PI * 2 });
  }
  bands = result.sort(function (a, b) { return a.y - b.y; }); meter.textContent = String(bands.length).padStart(2, '0');
}
function startTracking(message) {
  batchId++; generateBands(); trackingStart = clock; trackingActive = true; root.classList.add('d-vhs-active');
  errorButton.setAttribute('aria-pressed', 'true'); status.textContent = message || (reduced ? 'Static tracking error' : 'Tracking servo unstable'); dirty = true;
}
function stopTracking(message) {
  trackingActive = false; root.classList.remove('d-vhs-active'); errorButton.setAttribute('aria-pressed', 'false'); meter.textContent = '00';
  status.textContent = message || 'Tracking locked'; dirty = true;
}
function updateFocus(x, y, message) {
  focus.x = Math.max(0, Math.min(1, x)); focus.y = Math.max(0, Math.min(1, y)); intensity = .68 + focus.x * .72;
  const box = stageEl.getBoundingClientRect(); head.style.transform = 'translateY(' + ((focus.y - .5) * box.height).toFixed(2) + 'px)';
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  const box = stageEl.getBoundingClientRect(); updateFocus((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height); startTracking('Hover tracking loss');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); updateFocus((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Tracking head moving');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () { if (reduced && !staticPinned) stopTracking(); });
errorButton.addEventListener('click', function () {
  if (reduced) { staticPinned = !staticPinned; staticPinned ? startTracking('Static tracking error pinned') : stopTracking('Static tracking restored'); }
  else startTracking('Manual tracking loss'); root.focus();
});
root.addEventListener('keydown', function (event) {
  if (event.target === errorButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Enter', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === 'Escape') { staticPinned = false; stopTracking('Tracking restored'); return; }
  if (event.key === ' ' || event.key === 'Enter') {
    if (reduced && trackingActive) { staticPinned = false; stopTracking('Static tracking restored'); }
    else { if (reduced) staticPinned = true; startTracking('Keyboard tracking loss'); } return;
  }
  if (event.key === 'Home') updateFocus(.5, .5, 'Tracking head centered');
  else {
    const step = event.shiftKey ? .12 : .06;
    updateFocus(focus.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      focus.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard tracking head');
  }
  startTracking('Keyboard tracking loss');
});
updateFocus(.5, .5);

function rowDisturbance(y, envelope) {
  let shift = 0, strength = 0;
  for (const band of bands) {
    if (y < band.y || y > band.y + band.height) continue;
    const local = (y - band.y) / band.height, feather = Math.sin(local * Math.PI);
    shift += Math.sin(y * band.frequency + clock * band.speed + band.phase) * band.amplitude * feather * envelope;
    strength = Math.max(strength, feather * envelope);
  }
  return { shift: shift, strength: strength };
}
function drawWrapped(image, y, shift, operation, alpha) {
  context.globalCompositeOperation = operation; context.globalAlpha = alpha;
  context.drawImage(image, 0, y, width, Math.min(ROW, height - y), shift, y, width, Math.min(ROW, height - y));
  if (shift > 0) context.drawImage(image, 0, y, width, Math.min(ROW, height - y), shift - width, y, width, Math.min(ROW, height - y));
  else if (shift < 0) context.drawImage(image, 0, y, width, Math.min(ROW, height - y), shift + width, y, width, Math.min(ROW, height - y));
}
function render(envelope) {
  context.fillStyle = '#050407'; context.globalAlpha = 1; context.globalCompositeOperation = 'source-over'; context.fillRect(0, 0, width, height);
  if (!trackingActive) context.drawImage(sourceCanvas, 0, 0, width, height);
  else {
    for (let y = 0; y < height; y += ROW) {
      const disturbance = rowDisturbance(y, envelope), shift = disturbance.shift;
      drawWrapped(sourceCanvas, y, shift, 'source-over', 1);
      if (disturbance.strength > .015) {
        const bleed = 2 + disturbance.strength * 6, alpha = .16 + disturbance.strength * .2;
        drawWrapped(redCanvas, y, shift + bleed, 'screen', alpha);
        drawWrapped(cyanCanvas, y, shift - bleed, 'screen', alpha);
      }
    }
    const random = randomFactory(0x165667b1 ^ batchId * 374761393 ^ Math.floor(clock / 80));
    context.globalCompositeOperation = 'screen'; context.globalAlpha = .24; context.fillStyle = '#fff';
    for (let i = 0; i < 18; i++) context.fillRect(random() * width, height * .82 + random() * height * .17, 3 + random() * 28, 1);
  }
  context.globalAlpha = .17; context.globalCompositeOperation = 'source-over'; context.fillStyle = '#000';
  for (let y = 0; y < height; y += 4) context.fillRect(0, y, width, 1);
  context.globalAlpha = 1; context.globalCompositeOperation = 'source-over'; dirty = false;
}
function frameLoop(time) {
  clock = time;
  if (!reduced && !trackingActive && time >= nextTracking) { startTracking('Automatic tracking loss'); nextTracking = time + 3900 + (batchId % 3) * 420; }
  let envelope = 0;
  if (trackingActive) {
    if (reduced) envelope = .76;
    else {
      const progress = Math.max(0, Math.min(1, (time - trackingStart) / trackingDuration)); envelope = Math.pow(Math.sin(progress * Math.PI), .65);
      if (progress >= 1) { stopTracking('Tracking locked'); envelope = 0; } else dirty = true;
    }
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(envelope); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained VHS tracking-error canvas treatment with one full-color source and cached red-only and cyan-only channel canvases. The red buffer keeps R with G/B zero; cyan keeps G/B with R zero; both are opaque black elsewhere. Rebuild them only on resize.

Use exactly four deterministic tracking bands from a seeded xorshift generator: two centered near a normalized tracking-head Y and two global. Each stores y, 16–61px height, 7–23px amplitude scaled by pointer-X intensity, frequency 0.045–0.13, speed 0.006–0.014, and phase. For every 2px row inside a band, multiply sin(y*frequency+time*speed+phase) by amplitude, sin(local*pi) feather, and a burst envelope. Sum overlapping shifts and retain maximum strength.

Draw each source row at its signed shift and draw a second wrapped copy at shift-width or shift+width so frame edges never open. Only on disturbed rows, screen-composite red at shift+bleed and cyan at shift-bleed, where bleed=2+strength*6 and alpha=0.16+strength*0.2. Add eighteen seeded one-pixel head-switching noise dashes near the bottom and a subtle 4px scanline overlay. Never use Math.random.

Normal tracking windows last roughly 1180ms with sin(progress*pi)^0.65 envelope and trigger on hover, a semantic button, Space/Enter, keyboard focus movement, and occasional frame-clock intervals. Pointermove stays passive. Arrows move focus by 0.06, Shift by 0.12, Home centers, and Escape restores. Cap DPR at 2. Under prefers-reduced-motion, render one stable 0.76-envelope frame with no interval or redraw loop; pointerleave clears unless pinned and another activation restores the intact source.`
});
