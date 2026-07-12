/* INTRX registry — published chromatic velocity type demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'chromatic-type',
  title: 'Chromatic Velocity Type',
  cat: 'Raster & Glitch',
  rootClass: 'd-chroma-type',
  tags: ['typography', 'rgb-split', 'pointer-velocity'],
  libs: [],
  desc: 'A three-layer display headline tears into cyan and red fringes only when the pointer accelerates. Direction, distance, and a small rotational shear come from measured velocity, then ease back into crisp registration.',
  seen: 'Seen on: experimental type foundries, music campaigns, digital studios, and motion-led portfolio headers',
  hint: 'flick across the headline — speed, not position, creates the split',
  html: `
<div class="d-chroma-type" tabindex="0" aria-label="Chromatic velocity headline. Flick the pointer across the panel, use arrow keys to inject velocity, Space to burst, P to reverse polarity, and Escape to settle.">
  <div class="d-chroma-type-grid" aria-hidden="true"></div>
  <div class="d-chroma-type-readout" aria-hidden="true">
    <span>RGB / VELOCITY</span><strong><i></i> 0.00 PX/MS</strong>
  </div>
  <div class="d-chroma-type-word" aria-label="Make noise">
    <span class="d-chroma-type-layer d-chroma-type-red" aria-hidden="true">MAKE<br>NOISE</span>
    <span class="d-chroma-type-layer d-chroma-type-cyan" aria-hidden="true">MAKE<br>NOISE</span>
    <span class="d-chroma-type-layer d-chroma-type-key">MAKE<br>NOISE</span>
  </div>
  <div class="d-chroma-type-vector" aria-hidden="true"><i></i><b></b></div>
  <div class="d-chroma-type-footer">
    <p class="d-chroma-type-status" aria-live="polite">Layers registered — flick to split</p>
    <div>
      <button class="d-chroma-type-polarity" type="button" aria-pressed="false">Polarity: normal</button>
      <button class="d-chroma-type-burst" type="button">Inject burst</button>
    </div>
  </div>
</div>`,
  css: `
.d-chroma-type {
  --split-x: 0px; --split-y: 0px; --split-r: 0deg; --energy: 0;
  width: 100%; min-height: 420px; position: relative; overflow: hidden; isolation: isolate;
  display: grid; place-items: center; padding: 54px 24px 72px; box-sizing: border-box;
  color: #f5f1e8; background: #08090b; cursor: crosshair; outline: none;
}
.d-chroma-type::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: calc(.08 + var(--energy) * .16);
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.13) 3px 4px);
  mix-blend-mode: screen;
}
.d-chroma-type:focus-visible { box-shadow: inset 0 0 0 2px #f5f1e8, inset 0 0 0 5px #08090b; }
.d-chroma-type-grid {
  position: absolute; inset: 0; opacity: .42; pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(circle at center, #000, transparent 76%);
}
.d-chroma-type-readout {
  position: absolute; top: 18px; left: 20px; right: 20px; z-index: 5;
  display: flex; justify-content: space-between; gap: 16px; color: #777b83;
  font: 600 10px/1.2 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .15em;
}
.d-chroma-type-readout strong { color: #c8cbd0; font-weight: 600; letter-spacing: .07em; }
.d-chroma-type-readout i { display: inline-block; width: 5px; height: 5px; margin: 0 4px 1px 0; border-radius: 50%; background: #ff3158; box-shadow: 8px 0 #26e7ff; }
.d-chroma-type-word {
  position: relative; z-index: 2; width: min(680px, 92%); aspect-ratio: 2.05 / 1;
  display: grid; place-items: center; user-select: none; pointer-events: none;
}
.d-chroma-type-layer {
  grid-area: 1 / 1; display: block; margin: 0; color: #f3efe7; text-align: center;
  font: 950 clamp(58px, 15vw, 132px)/.72 Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  letter-spacing: -.065em; transform-origin: center; will-change: transform, filter;
}
.d-chroma-type-red {
  color: #ff174d; opacity: calc(.08 + var(--energy) * .92); mix-blend-mode: screen;
  transform: translate(calc(var(--split-x) * -1), calc(var(--split-y) * -1)) rotate(calc(var(--split-r) * -1));
  filter: blur(calc(var(--energy) * .45px));
}
.d-chroma-type-cyan {
  color: #00e9ff; opacity: calc(.08 + var(--energy) * .92); mix-blend-mode: screen;
  transform: translate(var(--split-x), var(--split-y)) rotate(var(--split-r));
  filter: blur(calc(var(--energy) * .45px));
}
.d-chroma-type-key { position: relative; z-index: 2; color: #f4f0e8; text-shadow: 0 0 calc(var(--energy) * 10px) rgba(255,255,255,.24); }
.d-chroma-type-vector {
  position: absolute; right: 22px; top: 50%; width: 54px; height: 54px; transform: translateY(-50%); z-index: 4;
  border: 1px solid #272a30; border-radius: 50%; opacity: calc(.35 + var(--energy) * .65);
}
.d-chroma-type-vector::before, .d-chroma-type-vector::after { content: ''; position: absolute; background: #343840; }
.d-chroma-type-vector::before { left: 7px; right: 7px; height: 1px; top: 26px; }
.d-chroma-type-vector::after { top: 7px; bottom: 7px; width: 1px; left: 26px; }
.d-chroma-type-vector i { position: absolute; left: 26px; top: 26px; width: calc(18px * var(--energy)); height: 2px; background: #f5f1e8; transform-origin: left; transform: rotate(var(--split-r)); }
.d-chroma-type-vector b { position: absolute; left: 23px; top: 23px; width: 7px; height: 7px; border-radius: 50%; background: #ff3158; box-shadow: 0 0 0 2px #08090b, 0 0 0 3px #26e7ff; }
.d-chroma-type-footer {
  position: absolute; left: 20px; right: 20px; bottom: 16px; z-index: 6;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.d-chroma-type-status { margin: 0; color: #878b93; font: 500 10px/1.35 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .06em; }
.d-chroma-type-footer > div { display: flex; gap: 7px; }
.d-chroma-type button {
  min-height: 32px; padding: 7px 10px; border: 1px solid #343840; border-radius: 2px;
  color: #bec2c9; background: rgba(8,9,11,.84); font: 600 9px/1 ui-monospace, SFMono-Regular, Consolas, monospace;
  letter-spacing: .07em; text-transform: uppercase; cursor: pointer;
}
.d-chroma-type button:hover, .d-chroma-type button:focus-visible { color: #fff; border-color: #7a808b; outline: none; }
.d-chroma-type-polarity[aria-pressed="true"] { color: #26e7ff; border-color: #26e7ff; }
@media (max-width: 560px) {
  .d-chroma-type { min-height: 390px; padding-inline: 12px; }
  .d-chroma-type-vector { display: none; }
  .d-chroma-type-footer { align-items: flex-start; }
  .d-chroma-type-status { max-width: 130px; }
  .d-chroma-type-footer > div { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .d-chroma-type-layer { will-change: auto; }
}`,
  js: `
const readout = root.querySelector('.d-chroma-type-readout strong');
const status = root.querySelector('.d-chroma-type-status');
const polarityButton = root.querySelector('.d-chroma-type-polarity');
const burstButton = root.querySelector('.d-chroma-type-burst');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MAX_SPLIT = 22, VELOCITY_GAIN = 13, RESPONSE = .22, DECAY = .84;
let polarity = 1, seeded = false, lastX = 0, lastY = 0, lastTime = 0;
let targetX = 0, targetY = 0, splitX = 0, splitY = 0, lastFrame = 0;

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function setImpulse(vx, vy, message) {
  targetX = clamp(vx * VELOCITY_GAIN * polarity, -MAX_SPLIT, MAX_SPLIT);
  targetY = clamp(vy * VELOCITY_GAIN * polarity, -MAX_SPLIT, MAX_SPLIT);
  if (message) status.textContent = message;
}
function seedPointer(event) {
  seeded = true; lastX = event.clientX; lastY = event.clientY; lastTime = event.timeStamp;
}
root.addEventListener('pointerenter', function (event) { seedPointer(event); status.textContent = 'Velocity sampler armed'; });
root.addEventListener('pointermove', function (event) {
  if (!seeded) { seedPointer(event); return; }
  const elapsed = clamp(event.timeStamp - lastTime, 8, 80);
  const vx = (event.clientX - lastX) / elapsed;
  const vy = (event.clientY - lastY) / elapsed;
  setImpulse(vx, vy, 'Chromatic fringe split by ' + Math.hypot(vx, vy).toFixed(2) + ' px/ms');
  lastX = event.clientX; lastY = event.clientY; lastTime = event.timeStamp;
}, { passive: true });
root.addEventListener('pointerleave', function () { seeded = false; targetX = 0; targetY = 0; status.textContent = 'Layers returning to registration'; });

function injectBurst() {
  setImpulse(1.42, -.72, 'Injected chromatic velocity burst');
}
function setPolarity(next) {
  polarity = next;
  polarityButton.setAttribute('aria-pressed', String(polarity === -1));
  polarityButton.textContent = polarity === 1 ? 'Polarity: normal' : 'Polarity: reverse';
  targetX *= -1; targetY *= -1; splitX *= -1; splitY *= -1;
  status.textContent = polarity === 1 ? 'Normal RGB polarity' : 'RGB polarity reversed';
}
burstButton.addEventListener('click', function () { injectBurst(); root.focus(); });
polarityButton.addEventListener('click', function () { setPolarity(polarity * -1); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === burstButton || event.target === polarityButton) return;
  const accepted = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Escape', 'p', 'P'];
  if (accepted.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === ' ') { injectBurst(); return; }
  if (event.key === 'p' || event.key === 'P') { setPolarity(polarity * -1); return; }
  if (event.key === 'Escape') { targetX = targetY = splitX = splitY = 0; status.textContent = 'Layers registered'; return; }
  const speed = event.shiftKey ? 1.65 : 1.05;
  setImpulse(event.key === 'ArrowRight' ? speed : event.key === 'ArrowLeft' ? -speed : 0,
    event.key === 'ArrowDown' ? speed : event.key === 'ArrowUp' ? -speed : 0, 'Keyboard velocity impulse');
});

function render() {
  const energy = clamp(Math.hypot(splitX, splitY) / MAX_SPLIT, 0, 1);
  const angle = Math.atan2(splitY, splitX) * 180 / Math.PI;
  root.style.setProperty('--split-x', splitX.toFixed(3) + 'px');
  root.style.setProperty('--split-y', splitY.toFixed(3) + 'px');
  root.style.setProperty('--split-r', (angle * energy * .035).toFixed(3) + 'deg');
  root.style.setProperty('--energy', energy.toFixed(4));
  readout.innerHTML = '<i></i> ' + (Math.hypot(splitX, splitY) / VELOCITY_GAIN).toFixed(2) + ' PX/MS';
}
function frameLoop(time) {
  const delta = lastFrame ? clamp((time - lastFrame) / 16.667, .25, 4) : 1;
  lastFrame = time;
  if (reduced) { splitX = targetX; splitY = targetY; }
  else {
    const response = 1 - Math.pow(1 - RESPONSE, delta);
    splitX += (targetX - splitX) * response; splitY += (targetY - splitY) * response;
  }
  const decay = Math.pow(reduced ? .48 : DECAY, delta);
  targetX *= decay; targetY *= decay;
  if (Math.abs(targetX) < .002) targetX = 0;
  if (Math.abs(targetY) < .002) targetY = 0;
  if (!reduced && !targetX && Math.abs(splitX) < .002) splitX = 0;
  if (!reduced && !targetY && Math.abs(splitY) < .002) splitY = 0;
  render();
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained chromatic velocity headline with three identical, accessible text layers: a sharp neutral key layer and aria-hidden red/cyan layers using screen blending. Do not map color separation to pointer position. Measure pointer velocity from consecutive pointermove samples as delta pixels divided by elapsed milliseconds, clamping sample time to 8–80ms. Multiply each velocity axis by a gain of 13 and cap each split axis at ±22px. Translate cyan by the resulting vector and red by its exact inverse.

Keep target velocity separate from the rendered split. On animation frames, use delta-corrected response 1-(1-.22)^delta to approach the target, then decay the target by .84^delta so a fast flick tears the colors apart and they settle back into precise registration. Derive a normalized energy from hypot(splitX,splitY)/22 for fringe opacity, scanline strength, blur, vector telemetry, and a restrained rotational shear. Report the equivalent px/ms magnitude in a monospaced live display.

Pointerenter seeds position and timestamp so entry never causes a false spike. Pointermove is passive and updates the impulse; pointerleave clears the sample and targets zero. Add semantic buttons for a deterministic diagonal burst and reversible RGB polarity with aria-pressed. Arrow keys inject directional velocity, Shift increases it, Space bursts, P toggles polarity, and Escape immediately registers every layer. Do not intercept these keys from either button.

Provide a dark technical grid, responsive display type, visible focus, concise live status, and a labeled root. Under prefers-reduced-motion, snap rendered separation to each impulse and use stronger per-frame decay rather than disabling feedback. Preserve pointer velocity measurement, exact opposite red/cyan transforms, capped separation, polarity, controls, keyboard access, telemetry, and return to zero in both motion modes.`
});
