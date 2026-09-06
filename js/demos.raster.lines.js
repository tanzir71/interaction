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
  css: `.d-lines{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0 0 10px;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end}.d-lines>span,.d-lines>[class$="-meter"],.d-lines>[class$="-weights"],.d-lines>[class$="-spectrum"],.d-lines>[class$="-scale"],.d-lines>[class$="-ramp"],.d-lines>[class$="-weight"],.d-lines>[class$="-waves"]{display:none}.d-lines>[class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#d5dcca}.d-lines canvas{width:100%;height:100%;display:block}.d-lines>[class$="-stage"]>*:not(canvas){display:none}.d-lines [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-lines button{position:relative;min-height:28px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;cursor:pointer;z-index:5}.d-lines button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-lines button:focus-visible,.d-lines:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-lines [class$="-actions"]{display:flex;gap:8px}`,
  js: `const photograph=new Image();

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

function drawSource(){const picture=photograph;source.fillStyle='#dfe3d8';source.fillRect(0,0,width,height);if(picture.naturalWidth){const s=Math.max(width/picture.naturalWidth,height/picture.naturalHeight);source.drawImage(picture,(width-picture.naturalWidth*s)/2,(height-picture.naturalHeight*s)/2,picture.naturalWidth*s,picture.naturalHeight*s)}const pixels=source.getImageData(0,0,width,height).data;sourceLuma=new Uint8Array(width*height);for(let i=0;i<sourceLuma.length;i++){const p=i*4;sourceLuma[i]=Math.round(pixels[p]*.2126+pixels[p+1]*.7152+pixels[p+2]*.0722)}}
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
  context.fillStyle = '#0a0a0b'; context.fillRect(0, 0, width, height); context.fillStyle = '#b8b8b8';
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
requestAnimationFrame(frameLoop);
photograph.onload=measure;photograph.src='{{asset:coastal-stack}}';`,
  prompt: `Build Engraving Line Screen as a native300×320px component. Use the supplied coastal-stack photograph. Draw it with cover cropping after image load and recompute the algorithm's source luminance, pixel caches or samples. Retain the actual halftone-lines pixel/glyph algorithm, pointer and keyboard behavior. Put the full image above a slim quiet control row, with readable regular Inter11px controls, normal tracking, pale surfaces and fine borders. Avoid synthetic gradient posters and headline overlays.  Keep visible interface text in regular Inter400–500. Literal ASCII/bitmap glyph rendering and terminal code retain their intentional fixed-width character metrics. Preserve real interactive states, polite announcements, keyboard focus, cancellation, resize cleanup and reduced-motion alternatives. Hide technical headers and decorative readout/footer panels without removing nodes used by the behavior.`
});
