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
  css: `
.d-interlace { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #0d1518; color: #c8e9e9; touch-action: none; }
.d-interlace:focus-visible { box-shadow: inset 0 0 0 2px #63e1dd; }
.d-interlace::before { content: ''; position: absolute; inset: 0; opacity: .18; pointer-events: none;
  background-image: linear-gradient(rgba(200,233,233,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(200,233,233,.13) 1px, transparent 1px); background-size: 25px 25px; }
.d-interlace-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(200,233,233,.38); background: #040708; box-shadow: 9px 9px 0 rgba(99,225,221,.09); }
.d-interlace-canvas { display: block; width: 100%; height: 100%; }
.d-interlace-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .1;
  background: repeating-linear-gradient(0deg, transparent 0 1px, rgba(255,255,255,.12) 1px 2px); mix-blend-mode: screen; }
.d-interlace-field { position: absolute; right: 8px; top: 7px; color: rgba(255,255,255,.73); text-shadow: 1px 0 #ff4f69, -1px 0 #3fe8ed;
  font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-interlace-safe { position: absolute; inset: 9%; border: 1px dashed rgba(255,255,255,.15); pointer-events: none; }
.d-interlace-kicker { position: absolute; left: 17px; top: 18px; color: rgba(200,233,233,.53); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-interlace-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(200,233,233,.46); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-interlace-meter strong { min-width: 34px; color: #c8e9e9; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }.d-interlace-meter b { font-weight: 400; }
.d-interlace-fields { position: absolute; left: 17px; top: 43px; display: flex; gap: 4px; align-items: center; }
.d-interlace-fields i { display: grid; width: 19px; height: 17px; place-items: center; border: 1px solid currentColor; font: 7px "JetBrains Mono", monospace; font-style: normal; }
.d-interlace-fields i:first-child { color: #ff6680; }.d-interlace-fields i:nth-child(2) { color: #58e7e2; }
.d-interlace-fields span { margin-left: 5px; color: rgba(200,233,233,.47); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-interlace-lock { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(200,233,233,.36);
  border-radius: 999px; background: rgba(13,21,24,.84); color: #c8e9e9; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-interlace-lock:hover, .d-interlace-lock[aria-pressed="true"] { background: #c8e9e9; color: #0d1518; transform: translateY(-2px); }
.d-interlace-lock:focus-visible { outline: 2px solid #63e1dd; outline-offset: 3px; }
.d-interlace-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(200,233,233,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-interlace-stage { width: 75%; height: 190px; }.d-interlace-fields { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-interlace-lock { transition: none; } }
`,
  js: `
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
  const gradient = field.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, phase === 0 ? '#123e50' : '#17364d'); gradient.addColorStop(.5, phase === 0 ? '#2e8c83' : '#477f8f'); gradient.addColorStop(1, '#e3dc6f');
  field.fillStyle = gradient; field.fillRect(0, 0, width, height);
  const drift = reduced ? 0 : Math.sin(time * .0017 + phase * .7) * width * .052;
  field.fillStyle = phase === 0 ? '#dcfff5' : '#ffe5ec'; field.beginPath(); field.arc(width * .7 + drift, height * .33, height * .23, 0, Math.PI * 2); field.fill();
  field.fillStyle = '#071014'; field.beginPath(); field.arc(width * .7 + drift, height * .33, height * .1, 0, Math.PI * 2); field.fill();
  field.fillStyle = 'rgba(4,7,9,.68)'; field.fillRect(0, height * .68, width, height * .32);
  field.fillStyle = '#fff'; field.font = '800 ' + Math.round(height * .31) + 'px Inter, sans-serif'; field.textBaseline = 'bottom'; field.fillText('FIELD', width * .05 - drift * .25, height * .95);
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
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained interlaced broadcast monitor using two CSS-resolution offscreen source buffers representing adjacent motion phases. At each visible field, draw exactly one 1px source row per output row. Select field A when (row mod 2)==parity and field B otherwise. Swap parity on a measured 20ms cadence and rerender both source buffers with a small temporal phase difference.

For each output row, apply vertical jitter sin(time*0.021+row*0.19+parity*pi)*intensity*1.1, clamped inherently to ±1.1px at maximum intensity. Then darken rows matching current parity with alpha 0.07+intensity*0.1 and add a whole-frame alternating black/white field exposure of only 0.012+intensity*0.026, keeping flicker below 4%. Do not simulate fields with a single opacity-blinking element.

Pointerenter activates intensity, pointer X maps 0.55–1.0, pointermove is passive, and pointerleave returns to 0.18 unless a semantic aria-pressed high-field lock is enabled. Ease intensity by 0.14. Arrow Right/Up adds 0.1, Left/Down subtracts 0.1, Shift uses 0.2, Home restores 0.18, Space locks, and Escape releases. Include parity label, percent telemetry, safe area, focus, and polite status.

Rebuild both source buffers on resize and draw through a DPR transform capped at 2. Under prefers-reduced-motion, never advance source time, swap parity, apply row jitter, or add alternating full-frame exposure. Render one static parity-0 weave when intensity or layout changes, retaining real A/B row alternation, scanline emphasis, hover/keyboard intensity, locking, and the inspectable interlaced composite without temporal flicker.`
});
