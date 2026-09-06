/* INTRX registry — published interlace demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'interlace-flicker',
  title: 'Alternating Field Monitor',
  cat: 'Raster & Glitch',
  rootClass: 'd-interlace',
  tags: ['canvas', 'interlace', 'broadcast'],
  libs: [],
  desc: 'Two adjacent-time broadcast buffers are woven one row at a time and swap parity on a measured field cadence. Hover raises restrained field flicker and subpixel line jitter while reduced motion keeps a static interlaced composite.',
  seen: 'Seen on: broadcast graphics, video archives, motion portfolios and analog-media projects',
  hint: 'hover to raise field intensity or lock the broadcast state',
  html: `
<div class="d-interlace" tabindex="0" aria-label="Interactive alternating-field monitor. Hover raises intensity, arrows adjust it, Home resets, Space locks it, and Escape releases.">
  <span class="d-interlace-kicker">FIELD SYNC / 50 HZ</span>
  <div class="d-interlace-stage">
    <canvas class="d-interlace-canvas" role="img" aria-label="A broadcast image woven from alternating one-pixel rows of two adjacent motion fields"></canvas>
    <span class="d-interlace-field" aria-hidden="true">FIELD A / EVEN</span>
    <span class="d-interlace-safe" aria-hidden="true"></span>
  </div>
  <div class="d-interlace-meter" aria-hidden="true"><span>INTENSITY</span><strong>018</strong><b>%</b></div>
  <div class="d-interlace-fields" aria-hidden="true"><i>A</i><i>B</i><span>1 / 2</span></div>
  <button class="d-interlace-lock" type="button" aria-pressed="false">Lock high field</button>
  <p class="d-interlace-status" aria-live="polite">Low-intensity field sync</p>
</div>`,
  css: `.d-interlace{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-interlace::before,.d-interlace::after{display:none}.d-interlace>span,.d-interlace>[class$="-meter"],.d-interlace>[class$="-channels"],.d-interlace>[class$="-vector"],.d-interlace>[class$="-order"],.d-interlace>[class$="-phosphor"],.d-interlace>[class$="-fields"],.d-interlace>[class$="-matrix"],.d-interlace>[class$="-sample"]{display:none}.d-interlace [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-interlace [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-interlace canvas{display:block;width:100%;height:100%;object-fit:cover}.d-interlace [class$="-stage"]>span,.d-interlace [class$="-stage"]>[class$="-origin"],.d-interlace [class$="-labels"],.d-interlace [class$="-scan"]{display:none}.d-interlace button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-interlace button:hover{background:#dde5d3}.d-interlace button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-interlace button:focus-visible,.d-interlace input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-interlace [class$="-actions"]{display:flex;gap:8px}.d-interlace:focus-visible{outline:2px solid #829969;outline-offset:-2px}`,
  js: `const photograph=new Image();

const canvas = root.querySelector('.d-interlace-canvas');
const stageEl = root.querySelector('.d-interlace-stage');
const fieldLabel = root.querySelector('.d-interlace-field');
const meter = root.querySelector('.d-interlace-meter strong');
const lockButton = root.querySelector('.d-interlace-lock');
const status = root.querySelector('.d-interlace-status');
const context = canvas.getContext('2d', { alpha: false });
const fieldACanvas = document.createElement('canvas'), fieldBCanvas = document.createElement('canvas');
const fieldA = fieldACanvas.getContext('2d'), fieldB = fieldBCanvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FIELD_INTERVAL = 20;
let width = 1, height = 1, dpr = 1, parity = 0, targetIntensity = .18, intensity = .18, hovering = false, locked = false;
let dirty = true, lastField = 0;

function renderField(field, time, phase) {
  const picture=photograph; field.fillStyle='#d9ddd4'; field.fillRect(0,0,width,height);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(width/picture.naturalWidth,height/picture.naturalHeight)*1.07,pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;field.drawImage(picture,(width-pw)/2+Math.sin(time*.0007+phase*.18)*4,(height-ph)/2,pw,ph)}

}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  fieldACanvas.width = fieldBCanvas.width = width; fieldACanvas.height = fieldBCanvas.height = height;
  context.setTransform(dpr, 0, 0, dpr, 0, 0); renderField(fieldA, 0, 0); renderField(fieldB, 0, 1); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function pointerIntensity(event) {
  const box = stageEl.getBoundingClientRect(); const normalized = Math.max(0, Math.min(1, (event.clientX - box.left) / Math.max(1, box.width)));
  if (!locked) targetIntensity = .55 + normalized * .45; status.textContent = 'Hover field intensity ' + Math.round(targetIntensity * 100) + ' percent'; dirty = true;
}
stageEl.addEventListener('pointerenter', function (event) { hovering = true; pointerIntensity(event); });
stageEl.addEventListener('pointermove', pointerIntensity, { passive: true });
stageEl.addEventListener('pointerleave', function () { hovering = false; if (!locked) targetIntensity = .18; status.textContent = locked ? 'High field locked' : 'Low-intensity field sync'; dirty = true; });
function setLocked(next) {
  locked = next; targetIntensity = locked ? 1 : hovering ? targetIntensity : .18;
  lockButton.setAttribute('aria-pressed', String(locked)); lockButton.textContent = locked ? 'Release high field' : 'Lock high field';
  status.textContent = locked ? 'High field locked' : hovering ? 'Hover field active' : 'Low-intensity field sync'; dirty = true;
}
lockButton.addEventListener('click', function () { setLocked(!locked); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === lockButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === ' ') { setLocked(!locked); return; }
  if (event.key === 'Escape') { locked = false; hovering = false; lockButton.setAttribute('aria-pressed', 'false'); targetIntensity = .18; status.textContent = 'Low-intensity field sync'; dirty = true; return; }
  if (event.key === 'Home') targetIntensity = .18;
  else {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : -1;
    targetIntensity = Math.max(.1, Math.min(1, targetIntensity + direction * (event.shiftKey ? .2 : .1)));
  }
  status.textContent = 'Keyboard field intensity ' + Math.round(targetIntensity * 100) + ' percent'; dirty = true;
});

function renderComposite(time) {
  context.fillStyle = '#040708'; context.globalAlpha = 1; context.fillRect(0, 0, width, height);
  for (let y = 0; y < height; y++) {
    const useA = (y & 1) === parity, field = useA ? fieldACanvas : fieldBCanvas;
    const jitter = reduced ? 0 : Math.sin(time * .021 + y * .19 + parity * Math.PI) * intensity * 1.1;
    context.drawImage(field, 0, y, width, 1, 0, y + jitter, width, 1);
  }
  context.globalAlpha = .07 + intensity * .1; context.fillStyle = '#000';
  for (let y = parity; y < height; y += 2) context.fillRect(0, y, width, 1);
  if (!reduced) { context.globalAlpha = .012 + intensity * .026; context.fillStyle = parity ? '#fff' : '#000'; context.fillRect(0, 0, width, height); }
  context.globalAlpha = 1; fieldLabel.textContent = 'FIELD ' + (parity ? 'B / ODD' : 'A / EVEN');
  meter.textContent = String(Math.round(intensity * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  if (reduced) intensity = targetIntensity;
  else intensity += (targetIntensity - intensity) * .14;
  if (reduced) {
    if (dirty) { renderField(fieldA, 0, 0); renderField(fieldB, 0, 1); renderComposite(0); }
  } else if (time - lastField >= FIELD_INTERVAL) {
    parity ^= 1; renderField(fieldA, time, 0); renderField(fieldB, time + FIELD_INTERVAL, 1); renderComposite(time); lastField = time;
  }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:limestone-pavilion}}';`,
  prompt: `Create the Alternating Field Monitor interaction with a native300×320px composition. Use actual supplied limestone-pavilion photography as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
