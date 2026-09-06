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
  <div class="d-chroma-type-word" aria-label="Signal">
    <span class="d-chroma-type-layer d-chroma-type-red" aria-hidden="true">Signal.</span>
    <span class="d-chroma-type-layer d-chroma-type-cyan" aria-hidden="true">Signal.</span>
    <span class="d-chroma-type-layer d-chroma-type-key">Signal.</span>
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
  css: `.d-chroma-type{--split-x:0px;--split-y:0px;--split-r:0deg;--energy:0;width:100%;height:320px;position:relative;box-sizing:border-box;display:grid;place-items:center;background:#151b19;color:#eef1e7;overflow:hidden;isolation:isolate;font-family:"Inter",system-ui,sans-serif}.d-chroma-type-word{display:grid;place-items:center;position:relative;width:100%;pointer-events:none}.d-chroma-type-layer{grid-area:1/1;font:400 58px/1.1 "Inter",system-ui,sans-serif;letter-spacing:-.02em;white-space:nowrap}.d-chroma-type-red{color:#e97569;opacity:calc(var(--energy)*.8);mix-blend-mode:screen;transform:translate(calc(var(--split-x)*-1),calc(var(--split-y)*-1)) rotate(calc(var(--split-r)*-1))}.d-chroma-type-cyan{color:#78bec7;opacity:calc(var(--energy)*.8);mix-blend-mode:screen;transform:translate(var(--split-x),var(--split-y)) rotate(var(--split-r))}.d-chroma-type-key{color:#e6ecdf;z-index:2}.d-chroma-type-grid,.d-chroma-type-vector,.d-chroma-type-readout{display:none}.d-chroma-type-footer{position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center}.d-chroma-type-footer>div{display:flex;gap:8px}.d-chroma-type button{font:400 10px "Inter",system-ui,sans-serif;padding:6px 10px;border:1px solid #ffffff20;border-radius:15px;color:#b5c1ad;background:none;cursor:pointer;text-transform:none;letter-spacing:0}.d-chroma-type button:focus-visible{outline:2px solid #a9b99c;outline-offset:4px}.d-chroma-type-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`,
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
  prompt: `Create the Chromatic Velocity Type interaction with a native300×320px composition. Use one carefully set regular Inter58px word “Signal.” on a deep desaturated background. Velocity separates muted red and cyan copies with the exact same font metrics. Keep the polarity and burst actions subtle beneath, and hide technical telemetry. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
