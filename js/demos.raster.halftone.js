/* INTRX registry — published halftone demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'halftone-dots',
  title: 'Luminance Halftone Field',
  cat: 'Raster & Glitch',
  rootClass: 'd-half',
  tags: ['canvas', 'halftone', 'luminance'],
  libs: [],
  desc: 'A classic 15-degree print screen samples a designed grayscale source into area-correct ink dots. The pointer acts like local pressure, swelling nearby dots while the original luminance structure remains legible.',
  seen: 'Seen on: editorial identities, print-inspired portfolios, culture and music campaigns',
  hint: 'move through the print screen, pin the pressure, or use arrow keys',
  html: `
<div class="d-half" tabindex="0" aria-label="Interactive luminance halftone. Arrow keys move the pressure field, Home centers it, Space pins it, and Escape releases it.">
  <span class="d-half-kicker">AM SCREEN / 15°</span>
  <div class="d-half-stage">
    <canvas class="d-half-canvas" role="img" aria-label="A grayscale poster represented by rotated halftone dots whose radius follows luminance"></canvas>
    <div class="d-half-probe" aria-hidden="true"><i></i><b>PRESS</b></div>
    <span class="d-half-registration" aria-hidden="true">+</span>
  </div>
  <div class="d-half-meter" aria-hidden="true"><span>PRESSURE</span><strong>028</strong><b>%</b></div>
  <div class="d-half-scale" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <button class="d-half-pin" type="button" aria-pressed="false">Pin pressure</button>
  <p class="d-half-status" aria-live="polite">Ambient screen pressure</p>
</div>`,
  css: `.d-half{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0 0 10px;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end}.d-half>span,.d-half>[class$="-meter"],.d-half>[class$="-weights"],.d-half>[class$="-spectrum"],.d-half>[class$="-scale"],.d-half>[class$="-ramp"],.d-half>[class$="-weight"],.d-half>[class$="-waves"]{display:none}.d-half>[class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#d5dcca}.d-half canvas{width:100%;height:100%;display:block}.d-half>[class$="-stage"]>*:not(canvas){display:none}.d-half [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-half button{position:relative;min-height:28px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;cursor:pointer;z-index:5}.d-half button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-half button:focus-visible,.d-half:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-half [class$="-actions"]{display:flex;gap:8px}`,
  js: `const photograph=new Image();

const canvas = root.querySelector('.d-half-canvas');
const stageEl = root.querySelector('.d-half-stage');
const probe = root.querySelector('.d-half-probe');
const meter = root.querySelector('.d-half-meter strong');
const pinButton = root.querySelector('.d-half-pin');
const status = root.querySelector('.d-half-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d', { willReadFrequently: true });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ANGLE = 15 * Math.PI / 180, CELL = 9;
let width = 1, height = 1, dpr = 1, dots = [];
let target = { x: .64, y: .42 }, current = { x: target.x, y: target.y };
let targetPressure = .28, pressure = targetPressure, hovering = false, pinned = false, dirty = true, lastDraw = 0;

function drawSource(){const picture=photograph;source.fillStyle='#dfe3d8';source.fillRect(0,0,width,height);if(picture.naturalWidth){const s=Math.max(width/picture.naturalWidth,height/picture.naturalHeight);source.drawImage(picture,(width-picture.naturalWidth*s)/2,(height-picture.naturalHeight*s)/2,picture.naturalWidth*s,picture.naturalHeight*s)}}
function buildDots() {
  drawSource(); const pixels = source.getImageData(0, 0, width, height).data;
  const cos = Math.cos(ANGLE), sin = Math.sin(ANGLE), cx = width * .5, cy = height * .5;
  const reach = Math.hypot(width, height) * .7 + CELL * 2; dots = [];
  for (let v = -reach; v <= reach; v += CELL) {
    for (let u = -reach; u <= reach; u += CELL) {
      const x = cx + u * cos - v * sin, y = cy + u * sin + v * cos;
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      const index = (Math.floor(y) * width + Math.floor(x)) * 4;
      const luminance = (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
      const darkness = Math.max(0, Math.min(1, 1 - luminance));
      dots.push({ x: x, y: y, darkness: darkness, radius: CELL * .52 * Math.sqrt(darkness) });
    }
  }
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = width; sourceCanvas.height = height; context.setTransform(dpr, 0, 0, dpr, 0, 0); buildDots(); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function setTarget(x, y, message) {
  target.x = Math.max(0, Math.min(1, x)); target.y = Math.max(0, Math.min(1, y)); dirty = true;
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  hovering = true; targetPressure = 1; root.classList.add('d-half-active');
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local dots swelling');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); setTarget((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Local dots swelling');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () {
  hovering = false; if (!pinned) { targetPressure = .28; root.classList.remove('d-half-active'); status.textContent = 'Ambient screen pressure'; dirty = true; }
});
function setPinned(next) {
  pinned = next; targetPressure = pinned || hovering ? 1 : .28;
  root.classList.toggle('d-half-active', pinned || hovering); pinButton.setAttribute('aria-pressed', String(pinned));
  pinButton.textContent = pinned ? 'Release pressure' : 'Pin pressure'; status.textContent = pinned ? 'Pressure field pinned' : hovering ? 'Local dots swelling' : 'Ambient screen pressure'; dirty = true;
}
pinButton.addEventListener('click', function () { setPinned(!pinned); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === pinButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { setPinned(!pinned); return; }
  if (event.key === 'Escape') { setPinned(false); hovering = false; targetPressure = .28; root.classList.remove('d-half-active'); status.textContent = 'Pressure released'; return; }
  if (event.key === 'Home') setTarget(.5, .5, 'Pressure field centered');
  else {
    const step = event.shiftKey ? .12 : .055;
    setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard pressure field');
  }
  hovering = true; targetPressure = 1; root.classList.add('d-half-active');
});

function render() {
  context.fillStyle = '#0a0a0b'; context.fillRect(0, 0, width, height);
  const px = current.x * width, py = current.y * height, fieldRadius = Math.min(106, Math.max(72, width * .23));
  for (const dot of dots) {
    const proximity = Math.max(0, 1 - Math.hypot(dot.x - px, dot.y - py) / fieldRadius);
    const influence = proximity * proximity * pressure;
    const radius = Math.min(CELL * .92, dot.radius + influence * (CELL * .46 + (1 - dot.darkness) * CELL * .16));
    const red = Math.round(184 + influence * 66), green = Math.round(184 - influence * 69), blue = Math.round(184 - influence * 159);
    context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'; context.beginPath(); context.arc(dot.x, dot.y, Math.max(.18, radius), 0, Math.PI * 2); context.fill();
  }
  probe.style.transform = 'translate(' + (current.x * width).toFixed(2) + 'px,' + (current.y * height).toFixed(2) + 'px) scale(' + (.86 + pressure * .14).toFixed(3) + ')';
  probe.style.opacity = (.32 + pressure * .68).toFixed(3); meter.textContent = String(Math.round(pressure * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (reduced) { current.x = target.x; current.y = target.y; pressure = targetPressure; }
  else {
    const delta = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(targetPressure - pressure);
    current.x += (target.x - current.x) * .17; current.y += (target.y - current.y) * .17; pressure += (targetPressure - pressure) * .14;
    if (delta > .0005) dirty = true;
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { render(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);
photograph.onload=measure;photograph.src='{{asset:coastal-stack}}';`,
  prompt: `Build Luminance Halftone Field as a native300×320px component. Use the supplied coastal-stack photograph. Draw it with cover cropping after image load and recompute the algorithm's source luminance, pixel caches or samples. Retain the actual halftone-dots pixel/glyph algorithm, pointer and keyboard behavior. Put the full image above a slim quiet control row, with readable regular Inter11px controls, normal tracking, pale surfaces and fine borders. Avoid synthetic gradient posters and headline overlays.  Keep visible interface text in regular Inter400–500. Literal ASCII/bitmap glyph rendering and terminal code retain their intentional fixed-width character metrics. Preserve real interactive states, polite announcements, keyboard focus, cancellation, resize cleanup and reduced-motion alternatives. Hide technical headers and decorative readout/footer panels without removing nodes used by the behavior.`
});
