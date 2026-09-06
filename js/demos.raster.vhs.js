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
  css: `.d-vhs{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-vhs::before,.d-vhs::after{display:none}.d-vhs>span,.d-vhs>[class$="-meter"],.d-vhs>[class$="-channels"],.d-vhs>[class$="-vector"],.d-vhs>[class$="-order"],.d-vhs>[class$="-phosphor"],.d-vhs>[class$="-fields"],.d-vhs>[class$="-matrix"],.d-vhs>[class$="-sample"]{display:none}.d-vhs [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-vhs [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-vhs canvas{display:block;width:100%;height:100%;object-fit:cover}.d-vhs [class$="-stage"]>span,.d-vhs [class$="-stage"]>[class$="-origin"],.d-vhs [class$="-labels"],.d-vhs [class$="-scan"]{display:none}.d-vhs button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-vhs button:hover{background:#dde5d3}.d-vhs button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-vhs button:focus-visible,.d-vhs input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-vhs [class$="-actions"]{display:flex;gap:8px}.d-vhs:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-vhs .d-vhs-timecode{display:block;position:absolute;left:15px;top:14px;color:#fff8;font:400 10px "Inter",system-ui,sans-serif}.d-vhs-chroma{display:none}`,
  js: `const photograph=new Image();

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
  const picture=photograph; source.fillStyle='#d9ddd4'; source.fillRect(0,0,width,height);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(width/picture.naturalWidth,height/picture.naturalHeight),pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;source.drawImage(picture,(width-pw)/2,(height-ph)/2,pw,ph)}

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
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:coastal-stack}}';`,
  prompt: `Create the VHS Tracking Deck interaction with a native300×320px composition. Use actual supplied coastal-stack photography as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
