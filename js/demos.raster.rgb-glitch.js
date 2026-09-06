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
  css: `.d-rgb{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-rgb::before,.d-rgb::after{display:none}.d-rgb>span,.d-rgb>[class$="-meter"],.d-rgb>[class$="-channels"],.d-rgb>[class$="-vector"],.d-rgb>[class$="-order"],.d-rgb>[class$="-phosphor"],.d-rgb>[class$="-fields"],.d-rgb>[class$="-matrix"],.d-rgb>[class$="-sample"]{display:none}.d-rgb [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-rgb [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-rgb canvas{display:block;width:100%;height:100%;object-fit:cover}.d-rgb [class$="-stage"]>span,.d-rgb [class$="-stage"]>[class$="-origin"],.d-rgb [class$="-labels"],.d-rgb [class$="-scan"]{display:none}.d-rgb button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-rgb button:hover{background:#dde5d3}.d-rgb button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-rgb button:focus-visible,.d-rgb input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-rgb [class$="-actions"]{display:flex;gap:8px}.d-rgb:focus-visible{outline:2px solid #829969;outline-offset:-2px}`,
  js: `const photograph=new Image();

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
  const picture=photograph; source.fillStyle='#d9ddd4'; source.fillRect(0,0,width,height);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(width/picture.naturalWidth,height/picture.naturalHeight),pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;source.drawImage(picture,(width-pw)/2,(height-ph)/2,pw,ph)}

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
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:limestone-pavilion}}';`,
  prompt: `Create the RGB Slice Transmission interaction with a native300×320px composition. Use actual supplied limestone-pavilion photography as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
