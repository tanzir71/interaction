/* INTRX registry — published atan2 rotary control demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'rotary-knob',
  title: 'Detented Rotary Knob',
  cat: 'Skeuomorph',
  rootClass: 'd-rotary',
  tags: ['drag', 'atan2', 'slider'],
  libs: [],
  desc: 'A machined rotary control maps captured pointer angle through a 270-degree sweep, snaps it to 21 physical detents, and keeps its tick ring, digital readout, and accessible slider value on the same state.',
  seen: 'Seen on: synthesizer interfaces, audio plugins, product configurators, and instrument-inspired portfolios',
  hint: 'drag around the dial — keyboard arrows and page keys hit exact detents',
  html: `
<div class="d-rotary" role="group" aria-label="Detented rotary level control">
  <div class="d-rotary-head">
    <span>PRECISION ATTENUATOR</span><span>R-21 / 270°</span>
  </div>
  <div class="d-rotary-console">
    <i class="d-rotary-screw d-rotary-screw-a" aria-hidden="true"></i>
    <i class="d-rotary-screw d-rotary-screw-b" aria-hidden="true"></i>
    <div class="d-rotary-readout" aria-hidden="true"><span>LEVEL</span><strong>050</strong><b>%</b></div>
    <div class="d-rotary-dial">
      <div class="d-rotary-ticks" aria-hidden="true"></div>
      <span class="d-rotary-limit d-rotary-min" aria-hidden="true">0</span>
      <span class="d-rotary-limit d-rotary-max" aria-hidden="true">100</span>
      <div class="d-rotary-knob" role="slider" tabindex="0" aria-label="Output level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="50 percent">
        <div class="d-rotary-grip" aria-hidden="true">
          <i class="d-rotary-pointer"></i>
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
      <div class="d-rotary-axis" aria-hidden="true"><i></i></div>
    </div>
    <div class="d-rotary-meta" aria-hidden="true"><span>21 DETENTS</span><span>13.5° / STEP</span></div>
  </div>
  <div class="d-rotary-foot">
    <p class="d-rotary-status" aria-live="polite">Detent 10 — 50 percent</p>
    <button class="d-rotary-reset" type="button">Center</button>
  </div>
</div>`,
  css: `
.d-rotary {
  --angle: 0deg; --level: .5; --metal: #202024; --accent: #fa7319;
  width: 100%; min-height: 450px; position: relative; overflow: hidden; box-sizing: border-box;
  padding: 22px clamp(16px,5vw,44px) 18px; color: #ececef; background: #0a0a0b;
  font-family:'Roboto Mono','JetBrains Mono',ui-monospace,monospace;
}
.d-rotary::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .34;
  background: repeating-linear-gradient(92deg,rgba(255,255,255,.025) 0 1px,rgba(0,0,0,.16) 1px 2px,transparent 2px 6px);
}
.d-rotary-head { position: relative; z-index: 2; display: flex; justify-content: space-between; gap: 14px; color: #9b9ba3; font: 700 9px/1.2 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .14em; }
.d-rotary-console {
  position: relative; z-index: 2; width: min(650px,100%); min-height: 330px; margin: 20px auto 0; box-sizing: border-box;
  border: 1px solid #2e2e34; border-radius: 10px; background: repeating-linear-gradient(92deg,rgba(255,255,255,.02) 0 1px,rgba(0,0,0,.10) 1px 2px,transparent 2px 5px),#161619;
  box-shadow: inset 1px 1px rgba(255,255,255,.05),inset -1px -1px rgba(0,0,0,.55),0 16px 31px rgba(0,0,0,.34);
}
.d-rotary-screw { position: absolute; width: 11px; height: 11px; border-radius: 50%; background: linear-gradient(145deg,#5c5c66,#232327); box-shadow: 1px 1px 2px rgba(0,0,0,.55); }
.d-rotary-screw::after { content: ''; position: absolute; left: 2px; right: 2px; top: 5px; height: 1px; background: #0a0a0b; transform: rotate(31deg); }
.d-rotary-screw-a { left: 13px; top: 13px; }.d-rotary-screw-b { right: 13px; bottom: 13px; }
.d-rotary-readout {
  position: absolute; left: 28px; top: 27px; width: 91px; height: 55px; display: grid; grid-template-columns: 1fr auto; align-items: end;
  padding: 9px 12px; box-sizing: border-box; border:1px solid #232327; border-radius: 5px; color: #9b9ba3; background: #0a0a0b;
  box-shadow: inset 2px 3px 7px rgba(0,0,0,.72),0 1px rgba(255,255,255,.05); font-family:'Roboto Mono','JetBrains Mono',ui-monospace,monospace;
}
.d-rotary-readout span { grid-column: 1 / 3; align-self: start; font-size: 7px; letter-spacing: .15em; }
.d-rotary-readout strong { color: #ececef; font-size: 22px; line-height: 1; letter-spacing: .05em; text-shadow: none; }
.d-rotary-readout b { padding-bottom: 2px; color: #5c5c66; font-size: 8px; }
.d-rotary-dial { position: relative; width: 252px; height: 252px; margin: 36px auto 0; }
.d-rotary-ticks { position: absolute; inset: 0; pointer-events: none; }
.d-rotary-ticks i {
  position: absolute; left: calc(50% - 1px); top: 19px; width: 2px; height: 12px; border-radius: 2px;
  background: #5c5c66; transform-origin: 1px 107px; transform: rotate(var(--tick-angle)); transition: background .1s ease, height .1s ease;
}
.d-rotary-ticks i:nth-child(5n + 1) { width: 3px; height: 16px; }
.d-rotary-ticks i.is-active { background: var(--accent); box-shadow: 0 0 4px rgba(250,115,25,.25); }
.d-rotary-limit { position: absolute; bottom: 28px; color: #9b9ba3; font: 700 8px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; }
.d-rotary-min { left: 21px; }.d-rotary-max { right: 13px; }
.d-rotary-knob {
  position: absolute; left: 38px; top: 38px; width: 176px; height: 176px; z-index: 3; border-radius: 50%; cursor: grab; touch-action: none; outline: none;
}
.d-rotary-knob:active { cursor: grabbing; }.d-rotary-knob:focus-visible { box-shadow:0 0 0 2px #0a0a0b,0 0 0 4px #fa7319; }
.d-rotary-grip {
  position: absolute; inset: 0; border: 1px solid #3f3f46; border-radius: 50%; transform: rotate(var(--angle));
  background: radial-gradient(circle at 38% 32%,#4a4a50 0 8%,#303035 34%,#1b1b1e 69%,#0f0f11 70%,#29292d 74%,#161619 100%);
  box-shadow: inset 4px 4px 8px rgba(255,255,255,.10),inset -6px -7px 12px rgba(0,0,0,.55),4px 7px 12px rgba(0,0,0,.48);
  transition: transform 70ms linear; will-change: transform;
}
.d-rotary-grip > span { position: absolute; left: 85px; top: 13px; width: 5px; height: 25px; border-radius: 3px; background: rgba(0,0,0,.34); transform-origin: 3px 75px; }
.d-rotary-grip > span:nth-of-type(1) { transform: rotate(-48deg); }.d-rotary-grip > span:nth-of-type(2) { transform: rotate(-24deg); }.d-rotary-grip > span:nth-of-type(3) { transform: rotate(24deg); }.d-rotary-grip > span:nth-of-type(4) { transform: rotate(48deg); }.d-rotary-grip > span:nth-of-type(5) { transform: rotate(180deg); }
.d-rotary-pointer { position: absolute; left: 84px; top: 13px; width: 8px; height: 36px; border-radius: 4px; background: var(--accent); box-shadow: inset 1px 0 rgba(255,255,255,.24),0 1px 3px rgba(250,115,25,.28); }
.d-rotary-axis { position: absolute; left: 119px; top: 119px; width: 14px; height: 14px; z-index: 5; border-radius: 50%; pointer-events: none; background: #303035; box-shadow: inset 1px 1px #5c5c66,1px 1px 3px rgba(0,0,0,.55); }
.d-rotary-axis i { position: absolute; left: 6px; top: 2px; width: 2px; height: 10px; background: #0a0a0b; transform: rotate(var(--angle)); }
.d-rotary-meta { position: absolute; right: 25px; top: 31px; display: grid; justify-items: end; gap: 5px; color: #9b9ba3; font: 650 8px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .11em; }
.d-rotary.is-dragging .d-rotary-console { box-shadow:inset 1px 1px rgba(255,255,255,.05),inset -1px -1px rgba(0,0,0,.55),0 16px 31px rgba(0,0,0,.34),0 0 0 1px rgba(250,115,25,.34); }
.d-rotary-foot { position: relative; z-index: 2; width: min(650px,100%); margin: 14px auto 0; display: flex; justify-content: space-between; align-items: center; gap: 14px; }
.d-rotary-status { margin: 0; color: #9b9ba3; font: 650 9px/1.3 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .06em; }
.d-rotary-reset { min-height: 31px; padding: 7px 12px; border: 1px solid #3f3f46; border-radius: 4px; color: #9b9ba3; background: #161619; box-shadow: inset 1px 1px rgba(255,255,255,.04); font: 700 9px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
.d-rotary-reset:hover,.d-rotary-reset:focus-visible { color: #ececef; border-color: #fa7319; outline: none; }
@media (max-width: 500px) {
  .d-rotary { min-height: 470px; padding-inline: 11px; }.d-rotary-console { min-height: 350px; }
  .d-rotary-readout { left: 19px; top: 18px; }.d-rotary-meta { right: 18px; top: 23px; }
  .d-rotary-dial { margin-top: 72px; }
}
@media (prefers-reduced-motion: reduce) {
  .d-rotary-grip,.d-rotary-ticks i { transition: none; }
}`,
  js: `
const knob = root.querySelector('.d-rotary-knob');
const ticks = root.querySelector('.d-rotary-ticks');
const readout = root.querySelector('.d-rotary-readout strong');
const status = root.querySelector('.d-rotary-status');
const resetButton = root.querySelector('.d-rotary-reset');
const MIN_ANGLE = -135, MAX_ANGLE = 135, DETENTS = 21;
const ANGLE_STEP = (MAX_ANGLE - MIN_ANGLE) / (DETENTS - 1);
let index = 10, angle = 0, dragging = false, pointerId = null;

ticks.innerHTML = Array.from({ length: DETENTS }, function (_, tickIndex) {
  const tickAngle = MIN_ANGLE + tickIndex * ANGLE_STEP;
  return '<i style="--tick-angle:' + tickAngle + 'deg"></i>';
}).join('');
const tickNodes = Array.from(ticks.children);

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function applyIndex(next, message) {
  index = clamp(Math.round(next), 0, DETENTS - 1);
  angle = MIN_ANGLE + index * ANGLE_STEP;
  const value = index * 5;
  root.style.setProperty('--angle', angle + 'deg'); root.style.setProperty('--level', String(value / 100));
  readout.textContent = String(value).padStart(3, '0');
  knob.setAttribute('aria-valuenow', String(value)); knob.setAttribute('aria-valuetext', value + ' percent');
  tickNodes.forEach(function (tick, tickIndex) { tick.classList.toggle('is-active', tickIndex <= index); });
  status.textContent = message || ('Detent ' + String(index).padStart(2, '0') + ' — ' + value + ' percent');
}
function angleFromPointer(event) {
  const box = knob.getBoundingClientRect();
  const dx = event.clientX - (box.left + box.width / 2), dy = event.clientY - (box.top + box.height / 2);
  if (Math.hypot(dx, dy) < 12) return angle;
  let pointerAngle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
  if (pointerAngle > 180) pointerAngle -= 360;
  return clamp(pointerAngle, MIN_ANGLE, MAX_ANGLE);
}
function updateFromPointer(event) {
  const nextAngle = angleFromPointer(event);
  applyIndex((nextAngle - MIN_ANGLE) / ANGLE_STEP, 'Dragging — detent ' + String(Math.round((nextAngle - MIN_ANGLE) / ANGLE_STEP)).padStart(2, '0'));
}
function finishDrag(event) {
  if (!dragging) return;
  dragging = false; root.classList.remove('is-dragging');
  status.textContent = 'Detent ' + String(index).padStart(2, '0') + ' locked';
  if (event && event.pointerId !== undefined && knob.hasPointerCapture && knob.hasPointerCapture(event.pointerId)) knob.releasePointerCapture(event.pointerId);
  pointerId = null;
}
knob.addEventListener('pointerdown', function (event) {
  event.preventDefault(); dragging = true; pointerId = event.pointerId; root.classList.add('is-dragging');
  if (knob.setPointerCapture) knob.setPointerCapture(pointerId);
  updateFromPointer(event);
});
knob.addEventListener('pointermove', function (event) { if (dragging && event.pointerId === pointerId) updateFromPointer(event); });
knob.addEventListener('pointerup', finishDrag);
knob.addEventListener('pointercancel', finishDrag);
knob.addEventListener('lostpointercapture', finishDrag);
knob.addEventListener('dblclick', function () { applyIndex(10, 'Centered at detent 10'); });
knob.addEventListener('keydown', function (event) {
  const accepted = ['ArrowLeft','ArrowDown','ArrowRight','ArrowUp','PageDown','PageUp','Home','End'];
  if (accepted.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === 'Home') applyIndex(0);
  else if (event.key === 'End') applyIndex(DETENTS - 1);
  else if (event.key === 'PageDown') applyIndex(index - 4);
  else if (event.key === 'PageUp') applyIndex(index + 4);
  else applyIndex(index + (event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : -1));
});
resetButton.addEventListener('click', function () { applyIndex(10, 'Centered at detent 10'); knob.focus(); });
applyIndex(10);`,
  prompt: `
Build a self-contained rotary level control driven by actual center-relative pointer angle. Use a semantic focusable slider with aria-valuemin 0, aria-valuemax 100, and synchronized aria-valuenow/aria-valuetext. Define a 270-degree sweep from -135 to +135 degrees and exactly 21 detents, making the angle step 13.5 degrees and the value step 5 percent. Generate 21 visible tick marks at those exact angles.

On pointerdown prevent default, capture pointerId, mark dragging, and immediately update. For every matching captured pointermove, compute dx/dy from the knob center and pointerAngle=atan2(dy,dx)*180/PI+90. Normalize values above 180 by subtracting 360, clamp to -135..135 to create a bottom dead zone, convert to the nearest integer detent, then update the angle, three-digit readout, active ticks, CSS level, live status, and ARIA values from that one index. Ignore center samples within 12px so angle is never undefined or jumpy.

Release dragging on pointerup, pointercancel, or lostpointercapture, release capture when still held, and announce the locked detent. Double-click and a semantic Center button return to detent 10. ArrowRight/ArrowUp increment one detent; ArrowLeft/ArrowDown decrement one; PageUp/PageDown move four; Home and End choose exact limits. Clamp every input and prevent default only for handled slider keys.

Render a machined face, fixed tick ring, rotating grip and pointer, recessed 000–100 display, limit labels, detent specifications, visible focus, and at least a practical 176px drag target. Render the root as #0a0a0b and the console and grip as one dark matte-steel material, keep every micro-label uppercase in Roboto Mono with JetBrains Mono fallback, and use grayscale plus #fa7319 only for active ticks, pointer, drag, and focus state. Under prefers-reduced-motion remove transform/tick transitions while preserving atan2 geometry, pointer capture and cancellation, exact snapping, tick activation, readout and ARIA synchronization, mouse/touch/pen dragging, keyboard control, and reset.`
});
