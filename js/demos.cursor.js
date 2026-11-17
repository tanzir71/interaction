/* INTRX remaining Cursor interactions. */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'cursor-snap-targets',
  title: 'Cursor Snap Targets',
  cat: 'Cursor',
  rootClass: 'd-snap',
  tags: ['sticky-cursor', 'rect-morph', 'spring'],
  libs: [],
  desc: 'A compact circular cursor becomes a spring-loaded outline around the active control. Each target contributes its actual bounds and corner radius while a small inner point continues tracking the pointer.',
  seen: 'Seen on: Fantasy Interactive-inspired navigation, premium product sites, minimalist agency indexes',
  hint: 'move between targets or Tab through them',
  html: `
<div class="d-snap" aria-label="Controls with a cursor that snaps to their outlines">
  <div class="d-snap-layout">
    <button class="d-snap-target d-snap-pill" type="button" data-radius="28"><span>Archive</span><i>24 projects</i></button>
    <button class="d-snap-target d-snap-disc" type="button" data-radius="64"><span>Play</span><i>Film 01:42</i></button>
    <button class="d-snap-target d-snap-card" type="button" data-radius="5"><span>About the studio</span><i>Since 2014 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></i></button>
  </div>
  <div class="d-snap-frame" aria-hidden="true"><i></i><b></b></div>
  <i class="d-snap-dot" aria-hidden="true"></i>
  <p class="d-snap-status" aria-live="polite">Move into the stage</p>
</div>`,
  css: `
.d-snap { position: relative; width: 100%; height: 320px; overflow: hidden; background: #0a0a0b;
  color: #ececef; cursor: none; }
.d-snap-layout { position: absolute; inset: 46px 8% 44px; display: grid;
  grid-template-columns: 1.25fr .72fr 1fr; align-items: center; gap: clamp(14px, 4vw, 42px); }
.d-snap-target { position: relative; border: 1px solid #2e2e34; background: transparent;
  color: #ececef; font-family: inherit; cursor: none; transition: background .22s, color .22s; }
.d-snap-target span, .d-snap-target i { display: block; pointer-events: none; }
.d-snap-target span { font-size: 15px; font-weight:500; letter-spacing:-0.025em; }
.d-snap-target i { margin-top: 7px; color: #7a7a7f; font: 8px "Inter",system-ui,sans-serif;
  letter-spacing:0.06em; text-transform: uppercase; font-style: normal; }
.d-snap-target:hover, .d-snap-target:focus-visible { background: #161619; color: #fa7319; outline: none; }
.d-snap-target:hover i, .d-snap-target:focus-visible i { color: #9b9ba3; }
.d-snap-pill { height: 58px; border-radius: 28px; text-align: left; padding: 0 22px; }
.d-snap-disc { width: 112px; height: 112px; justify-self: center; border-radius: 50%; }
.d-snap-card { height: 126px; border-radius: 5px; text-align: left; padding: 18px; align-self: end; }
.d-snap-frame { position: absolute; left: 0; top: 0; z-index: 4; width: 24px; height: 24px;
  box-sizing: border-box; border: 1px solid #ececef; border-radius: 50%; opacity: 0;
  pointer-events: none; will-change: transform, width, height; }
.d-snap-frame::before, .d-snap-frame::after { content: ''; position: absolute; width: 7px; height: 7px; }
.d-snap-frame::before { left: -1px; top: -1px; border-left: 2px solid #fa7319; border-top: 2px solid #fa7319; }
.d-snap-frame::after { right: -1px; bottom: -1px; border-right: 2px solid #fa7319; border-bottom: 2px solid #fa7319; }
.d-snap-frame i, .d-snap-frame b { position: absolute; display: block; width: 4px; height: 4px;
  border-radius: 50%; background: #ececef; opacity: 0; }
.d-snap-frame i { left: -2px; top: 50%; }.d-snap-frame b { right: -2px; top: 50%; }
.d-snap.d-snap-locked .d-snap-frame i, .d-snap.d-snap-locked .d-snap-frame b { opacity: 1; }
.d-snap-dot { position: absolute; left: 0; top: 0; z-index: 5; width: 5px; height: 5px;
  margin: -2.5px 0 0 -2.5px; border-radius: 50%; background: #fa7319; opacity: 0;
  pointer-events: none; will-change: transform, opacity; box-shadow: 0 0 0 1px rgba(236,236,239,.26); }
.d-snap-status { position: absolute; right: 20px; bottom: 16px; margin: 0; color: #7a7a7f;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
@media (max-width: 620px) {
  .d-snap-layout { inset-inline: 4%; gap: 10px; grid-template-columns: 1.1fr .7fr 1fr; }
  .d-snap-disc { width: 86px; height: 86px; }.d-snap-card { padding: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .d-snap-frame, .d-snap-dot { will-change: auto; }
  .d-snap-target { transition: none; }
}
/* Composition at the native preview size. */
.d-snap-layout{inset:64px 22px 56px;grid-template-columns:minmax(0,1fr) 82px;grid-template-rows:80px 80px;gap:15px}.d-snap-pill{height:54px;padding:0 12px}.d-snap-disc{width:78px;height:78px}.d-snap-card{grid-column:1/-1;align-self:center;height:68px;padding:12px;border-radius:0;display:flex;justify-content:space-between;align-items:center}.d-snap-target span{font-size:13px}.d-snap-target i{font-size:8px}.d-snap-status{font-size:9px;letter-spacing:0}
/* Composition at the native preview size. */
.d-snap button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-snap-target{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-snap{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-snap :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-snap button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-snap [class$="-status"],.d-snap [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-snap [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-snap [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-snap>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-snap-target{border-color:#ffffff20;font:450 14px "Inter",system-ui,sans-serif}.d-snap-target small{font:400 10px "Inter",system-ui,sans-serif;letter-spacing:0;color:#8f9b92}
.d-snap-card>i{display:inline-flex;align-items:center;gap:5px;margin-top:0}.d-snap-card>i svg{display:block;flex:none}`,
  js: `
const targets = Array.from(root.querySelectorAll('.d-snap-target'));
const frame = root.querySelector('.d-snap-frame');
const dot = root.querySelector('.d-snap-dot');
const status = root.querySelector('.d-snap-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let pointer = { x: width * 0.5, y: height * 0.5 }, dotX = pointer.x, dotY = pointer.y;
let state = { x: pointer.x - 12, y: pointer.y - 12, w: 24, h: 24, r: 12 };
let velocity = { x: 0, y: 0, w: 0, h: 0, r: 0 };
let goal = { x: state.x, y: state.y, w: 24, h: 24, r: 12 };
let hovered = null, focused = null, locked = null, inside = false;

function rootBounds() { return root.getBoundingClientRect(); }

function freeGoal() {
  if (locked) return;
  goal.x = pointer.x - 12; goal.y = pointer.y - 12; goal.w = 24; goal.h = 24; goal.r = 12;
  root.classList.remove('d-snap-locked'); dot.style.opacity = '0';
}

function snapTo(target, source) {
  const outer = rootBounds(), box = target.getBoundingClientRect(), pad = 6;
  locked = target;
  goal.x = box.left - outer.left - pad; goal.y = box.top - outer.top - pad;
  goal.w = box.width + pad * 2; goal.h = box.height + pad * 2;
  goal.r = Number(target.dataset.radius || 0) + pad;
  root.classList.add('d-snap-locked'); dot.style.opacity = '1';
  status.textContent = source + ' ' + target.querySelector('span').textContent;
}

function release(message) {
  locked = focused || hovered;
  if (locked) { snapTo(locked, focused ? 'Focused' : 'Snapped to'); return; }
  freeGoal(); if (message) status.textContent = message;
}

function resize() {
  const box = rootBounds(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  pointer.x = Math.max(0, Math.min(width, pointer.x)); pointer.y = Math.max(0, Math.min(height, pointer.y));
  if (locked) snapTo(locked, focused ? 'Focused' : 'Snapped to'); else freeGoal();
}
window.addEventListener('resize', resize, { passive: true });

root.addEventListener('pointerenter', function (event) {
  const box = rootBounds(); inside = true; pointer.x = event.clientX - box.left; pointer.y = event.clientY - box.top;
  frame.style.opacity = '1'; if (!locked) { freeGoal(); status.textContent = 'Cursor free'; }
});
root.addEventListener('pointermove', function (event) {
  const box = rootBounds(); pointer.x = event.clientX - box.left; pointer.y = event.clientY - box.top;
  if (!locked) freeGoal();
}, { passive: true });
root.addEventListener('pointerleave', function () {
  inside = false; hovered = null;
  if (!focused) { locked = null; frame.style.opacity = '0'; dot.style.opacity = '0'; root.classList.remove('d-snap-locked'); status.textContent = 'Cursor outside'; }
});

targets.forEach(function (target) {
  target.addEventListener('pointerenter', function () { hovered = target; snapTo(target, 'Snapped to'); });
  target.addEventListener('pointerleave', function () { hovered = null; if (focused !== target) release('Cursor free'); });
  target.addEventListener('focus', function () {
    focused = target; frame.style.opacity = '1';
    const outer = rootBounds(), box = target.getBoundingClientRect();
    pointer.x = box.left - outer.left + box.width * 0.5; pointer.y = box.top - outer.top + box.height * 0.5;
    dotX = pointer.x; dotY = pointer.y; snapTo(target, 'Focused');
  });
  target.addEventListener('blur', function () { focused = null; release(inside ? 'Cursor free' : 'Focus released'); if (!inside && !locked) frame.style.opacity = '0'; });
  target.addEventListener('click', function () { status.textContent = 'Selected ' + target.querySelector('span').textContent; });
});

function spring(key, stiffness, damping) {
  if (reduced) { state[key] = goal[key]; velocity[key] = 0; return; }
  velocity[key] = (velocity[key] + (goal[key] - state[key]) * stiffness) * damping;
  state[key] += velocity[key];
}

function frameLoop() {
  if (!root.isConnected) return;
  spring('x', 0.14, 0.68); spring('y', 0.14, 0.68);
  spring('w', 0.16, 0.7); spring('h', 0.16, 0.7); spring('r', 0.16, 0.7);
  if (reduced) { dotX = pointer.x; dotY = pointer.y; }
  else { dotX += (pointer.x - dotX) * 0.38; dotY += (pointer.y - dotY) * 0.38; }
  frame.style.transform = 'translate(' + state.x.toFixed(2) + 'px,' + state.y.toFixed(2) + 'px)';
  frame.style.width = Math.max(1, state.w).toFixed(2) + 'px'; frame.style.height = Math.max(1, state.h).toFixed(2) + 'px';
  frame.style.borderRadius = Math.max(0, state.r).toFixed(2) + 'px';
  dot.style.transform = 'translate(' + dotX.toFixed(2) + 'px,' + dotY.toFixed(2) + 'px)';
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained sticky cursor that morphs between a free 24px circle and the measured outline of hovered or keyboard-focused controls inside a bare near-black 320px root. Use grayscale controls and #fa7319 only for active cursor details. Use three real buttons with clearly different dimensions and radii, one absolute outline frame, and one separate 5px pointer dot. Hide the native cursor only inside the demo.

Track pointer coordinates relative to the root. In free mode set goal x/y to pointer minus 12, width/height to 24, and radius to 12. On target pointerenter or focus, read its bounding box once, convert it to root coordinates, and set goals to its rectangle expanded by 6px on every side; use target radius + 6px. Keep the inner dot tracking the actual pointer while the shell is locked. On pointerleave/blur, prefer any still-focused/hovered target, otherwise release to free mode. If the stage is exited without keyboard focus, hide both cursor elements; focused targets remain outlined.

Animate x/y as spring velocity=(velocity+(goal-current)*0.14)*0.68; animate width/height/radius with stiffness 0.16 and damping 0.7. The dot lerps by 0.38. Write one translate plus width, height, and border-radius per frame. Recompute a locked target on resize, keep pointermove/resize passive, cache nodes, and never measure inside the rAF loop.

Keyboard focus must invoke the identical snapped geometry, center the dot in the control, show visible target styling, and announce focus/selection through a polite live region. Under prefers-reduced-motion, assign all shell properties and dot coordinates directly to their goals while preserving pointer hover, focus, stage-exit, and resize behavior.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Cursor flashlight noise
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-flashlight-noise',
  title: 'Cursor Flashlight Noise',
  cat: 'Cursor',
  rootClass: 'd-flash',
  tags: ['mask-image', 'procedural-noise', 'spotlight'],
  libs: [],
  desc: 'A soft beam cuts through near-blackness to reveal an editorial scene. Procedural grain exists only inside the light, while tiny layered oscillations make its edge breathe like an imperfect physical lamp.',
  seen: 'Seen on: cinematic studio portfolios, fashion campaign microsites, suspense-led editorial experiences',
  hint: 'search the scene, click to flare, or widen the beam',
  html: `
<div class="d-flash" tabindex="0" aria-label="Interactive flashlight revealing a hidden scene. Arrow keys move it and Space changes beam width.">
  <div class="d-flash-scene">
    <span class="d-flash-kicker">ARCHIVE / NIGHT STUDY</span>
    <strong class="d-flash-title">WHAT<br>THE DARK<br>KEEPS</strong>
    <div class="d-flash-panel d-flash-panel-one"><i></i><span>01 — FORM</span></div>
    <div class="d-flash-panel d-flash-panel-two"><i></i><span>02 — TRACE</span></div>
    <div class="d-flash-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
  </div>
  <div class="d-flash-dark" aria-hidden="true"></div>
  <canvas class="d-flash-grain" aria-hidden="true"></canvas>
  <div class="d-flash-ring" aria-hidden="true"><i></i></div>
  <div class="d-flash-meter" aria-hidden="true"><span>BEAM</span><strong>106</strong></div>
  <button class="d-flash-toggle" type="button" aria-pressed="false">Widen beam</button>
  <p class="d-flash-status" aria-live="polite">Lamp idling</p>
</div>`,
  css: `
.d-flash { --d-flash-x: 50%; --d-flash-y: 50%; --d-flash-radius: 106px; position: relative;
  width: 100%; height: 320px; overflow: hidden; outline: none; background: #0a0a0b; touch-action: none; }
.d-flash:focus-visible { box-shadow: inset 0 0 0 2px #fa7319; }
.d-flash-scene { position: absolute; inset: 0; overflow: hidden; background: #d8cfc0; color: #0a0a0b; }
.d-flash-scene::before { content: ''; position: absolute; inset: 0; opacity: .42;
  background-image: linear-gradient(rgba(10,10,11,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,11,.2) 1px, transparent 1px);
  background-size: 28px 28px; }
.d-flash-kicker { position: absolute; left: 20px; top: 18px; font: 8px "Inter",system-ui,sans-serif;
  letter-spacing:0.06em; }
.d-flash-title { position: absolute; left: 8%; top: 51%; transform: translateY(-50%);
  font:500 clamp(36px, 6vw, 60px)/.8 "Roboto Mono", sans-serif; letter-spacing:-0.025em; }
.d-flash-panel { position: absolute; width: 118px; height: 132px; border: 1px solid #0a0a0b; padding: 10px;
  font: 7px "Inter",system-ui,sans-serif; box-sizing: border-box; }
.d-flash-panel i { display: block; height: 88px; margin-bottom: 10px; background: #0a0a0b; }
.d-flash-panel-one { right: 22%; top: 44px; transform: rotate(5deg); }
.d-flash-panel-one i { background: linear-gradient(135deg, #ff5d3b 0 48%, #0a0a0b 49%); }
.d-flash-panel-two { right: 6%; bottom: 35px; transform: rotate(-7deg); }
.d-flash-panel-two i { background: radial-gradient(circle at 65% 38%, #fa7319 0 28%, #0a0a0b 29%); }
.d-flash-orbit { position: absolute; left: 52%; bottom: 22px; width: 90px; height: 90px;
  border: 1px solid rgba(10,10,11,.5); border-radius: 50%; }
.d-flash-orbit i { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: #0a0a0b; }
.d-flash-orbit i:nth-child(1) { left: 4px; top: 38px; }.d-flash-orbit i:nth-child(2) { right: 14px; top: 9px; }
.d-flash-orbit i:nth-child(3) { right: 3px; bottom: 22px; background: #ff5d3b; }
.d-flash-dark { position: absolute; inset: 0; pointer-events: none; background: rgba(0,0,0,.965);
  -webkit-mask-image: radial-gradient(circle var(--d-flash-radius) at var(--d-flash-x) var(--d-flash-y), transparent 0 34%, rgba(0,0,0,.16) 52%, rgba(0,0,0,.76) 79%, #000 100%);
  mask-image: radial-gradient(circle var(--d-flash-radius) at var(--d-flash-x) var(--d-flash-y), transparent 0 34%, rgba(0,0,0,.16) 52%, rgba(0,0,0,.76) 79%, #000 100%); }
.d-flash-grain { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .2; pointer-events: none;
  image-rendering: pixelated; mix-blend-mode: overlay;
  -webkit-mask-image: radial-gradient(circle var(--d-flash-radius) at var(--d-flash-x) var(--d-flash-y), #000 0 32%, rgba(0,0,0,.72) 58%, transparent 100%);
  mask-image: radial-gradient(circle var(--d-flash-radius) at var(--d-flash-x) var(--d-flash-y), #000 0 32%, rgba(0,0,0,.72) 58%, transparent 100%); }
.d-flash-ring { position: absolute; left: 0; top: 0; width: 300px; height: 300px; margin: -150px 0 0 -150px;
  border: 1px solid rgba(236,236,239,.14); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-flash-ring i { position: absolute; inset: 25%; border: 1px dashed rgba(236,236,239,.09); border-radius: 50%; }
.d-flash-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; }
.d-flash-meter strong { color: #ececef; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-flash-toggle { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "Inter",system-ui,sans-serif; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-flash-toggle:hover { color: #fa7319; border-color: #fa7319; transform: translateY(-2px); }
.d-flash-toggle:focus-visible { outline: 2px solid #fa7319; outline-offset: 3px; }
.d-flash-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #9b9ba3;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-flash-ring { will-change: auto; }.d-flash-toggle { transition: none; }
}
/* Composition at the native preview size. */
.d-flash>button{border-radius:0}
/* Composition at the native preview size. */
.d-flash-panel-one i{background:url("{{asset:coastal-stack}}") center/cover}.d-flash-panel-two i{background:url("{{asset:limestone-pavilion}}") center/cover}
/* Refined type, spacing and quiet interaction controls. */
.d-flash{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-flash :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-flash button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-flash [class$="-status"],.d-flash [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-flash [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-flash [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-flash>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-flash-title{font:500 48px/.98 "Inter",system-ui,sans-serif;letter-spacing:-.025em}.d-flash-panel{border-color:#ffffff14;border-radius:4px}.d-flash-panel span{font:400 10px "Inter",system-ui,sans-serif;letter-spacing:0}`,
  js: `
const grain = root.querySelector('.d-flash-grain');
const grainCtx = grain.getContext('2d');
const ring = root.querySelector('.d-flash-ring');
const meter = root.querySelector('.d-flash-meter strong');
const toggle = root.querySelector('.d-flash-toggle');
const status = root.querySelector('.d-flash-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let x = width * 0.5, y = height * 0.5, tx = x, ty = y;
let radius = 106, active = false, wide = false, flare = 0;
let noiseSeed = 23817, lastNoise = 0;
grain.width = 128; grain.height = 64;

function drawNoise() {
  const image = grainCtx.createImageData(128, 64);
  for (let i = 0; i < image.data.length; i += 4) {
    noiseSeed = (noiseSeed * 1664525 + 1013904223) >>> 0;
    const value = 65 + (noiseSeed >>> 24) * 0.72;
    image.data[i] = value; image.data[i + 1] = value; image.data[i + 2] = value; image.data[i + 3] = 135;
  }
  grainCtx.putImageData(image, 0, 0);
}
drawNoise();
lastNoise = performance.now();

function resize() {
  const oldWidth = width, oldHeight = height;
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  x = tx = x / Math.max(1, oldWidth) * width; y = ty = y / Math.max(1, oldHeight) * height;
}
window.addEventListener('resize', resize, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function setTarget(nextX, nextY, message) {
  tx = Math.max(12, Math.min(width - 12, nextX)); ty = Math.max(12, Math.min(height - 12, nextY));
  active = true; if (message) status.textContent = message;
}

function toggleBeam(message) {
  wide = !wide; toggle.setAttribute('aria-pressed', String(wide));
  toggle.textContent = wide ? 'Focus beam' : 'Widen beam';
  if (message) status.textContent = message;
}

root.addEventListener('pointermove', function (event) {
  const point = localPoint(event); setTarget(point.x, point.y, 'Searching scene');
}, { passive: true });
root.addEventListener('pointerleave', function () {
  tx = width * 0.5; ty = height * 0.5; active = false; status.textContent = 'Lamp idling';
});
root.addEventListener('pointerdown', function (event) {
  if (event.target === toggle) return;
  const point = localPoint(event); setTarget(point.x, point.y, 'Light flared'); if (!reduced) flare = 15;
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 44 : 26;
  if (event.key === 'ArrowLeft') tx -= step;
  if (event.key === 'ArrowRight') tx += step;
  if (event.key === 'ArrowUp') ty -= step;
  if (event.key === 'ArrowDown') ty += step;
  if (event.key === 'Home') { tx = width * 0.5; ty = height * 0.5; active = false; }
  tx = Math.max(12, Math.min(width - 12, tx)); ty = Math.max(12, Math.min(height - 12, ty));
  if (event.key === ' ') toggleBeam('Keyboard beam changed');
  else status.textContent = event.key === 'Home' ? 'Lamp centered' : 'Keyboard search';
  if (event.key !== 'Home') active = true;
});

toggle.addEventListener('click', function () { toggleBeam('Button beam changed'); root.focus(); });

function frame(now) {
  if (reduced) { x = tx; y = ty; }
  else { x += (tx - x) * 0.13; y += (ty - y) * 0.13; flare *= 0.82; }
  const baseRadius = wide ? 205 : 148;
  const flicker = reduced ? 0 : Math.sin(now * 0.019) * 2.1 + Math.sin(now * 0.0067) * 1.4;
  const desiredRadius = baseRadius * (active ? 1 : 0.72) + flicker + flare;
  radius = reduced ? desiredRadius : radius + (desiredRadius - radius) * 0.14;
  root.style.setProperty('--d-flash-x', x.toFixed(2) + 'px');
  root.style.setProperty('--d-flash-y', y.toFixed(2) + 'px');
  root.style.setProperty('--d-flash-radius', Math.max(50, radius).toFixed(2) + 'px');
  ring.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) scale(' + (radius / 150).toFixed(3) + ')';
  meter.textContent = String(Math.round(Math.max(50, radius))).padStart(3, '0');
  if (!reduced && now - lastNoise >= 90) { drawNoise(); lastNoise = now; }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained cursor flashlight over a procedural editorial scene inside a 320px position-relative root. Place a nearly opaque black layer above the scene and mask it with a radial gradient centered on CSS variables x/y: transparent through 34%, 16% alpha at 52%, 76% at 79%, and fully opaque at 100%. The result must reveal the scene softly rather than cut a hard circle. Include both standard mask-image and -webkit-mask-image.

Add a 128x64 canvas scaled over the stage as pixelated grain. Generate grayscale ImageData with a deterministic LCG (seed = seed*1664525+1013904223) and alpha around 135, refreshing at most every 90ms. Mask this grain in the opposite direction—opaque near the flashlight center and transparent outside—so texture exists only in the revealed light. Keep it at low opacity with overlay blending.

Ease rendered light coordinates toward a clamped pointer target by 0.13 per frame. Focused radius is 148px and wide radius 205px; idle radius is 72% of either. Add subtle flicker sin(now*0.019)*2.1 + sin(now*0.0067)*1.4 and a click flare of 15px decaying by 0.82. Ease radius by 0.14, then update the three CSS variables and a 300px guide ring scaled by radius/150. Use one rAF, cache nodes, keep pointer/resize passive, and never regenerate noise faster than its cadence.

Arrow keys move 26px, Shift+Arrow 44px, Home centers, and Space or a semantic aria-pressed button toggles wide/focused mode. Ignore button pointerdown in the stage flare handler, preserve focus treatment, and announce state changes. Under prefers-reduced-motion, snap position/radius directly, remove flicker and flare, and draw grain only once while preserving pointer and keyboard search.
The revealed artwork uses locally embedded editorial photographs with authentic texture. Preserve the grain flashlight masks and their continuous falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Cursor emoji rain
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-emoji-rain',
  title: 'Cursor Glyph Rain',
  cat: 'Cursor',
  rootClass: 'd-rain',
  tags: ['particle-physics', 'glyphs', 'collisions'],
  libs: [],
  desc: 'Clicks launch a compact storm of symbols from the exact pointer position. Every glyph carries independent velocity, spin, gravity, wall collisions, floor bounces, motion streaks, and a finite settling life.',
  seen: 'Seen on: celebratory product moments, playful studio sites, interactive event and festival identities',
  hint: 'click anywhere, press Space, or launch from center',
  html: `
<div class="d-rain" tabindex="0" aria-label="Glyph confetti launcher. Arrow keys position it and Space launches a burst.">
  <canvas class="d-rain-canvas" aria-hidden="true"></canvas>
  <div class="d-rain-reticle" aria-hidden="true"><i></i></div>
  <span class="d-rain-label">GLYPH WEATHER / LIVE</span>
  <div class="d-rain-meter" aria-hidden="true"><span>ACTIVE</span><strong>000</strong></div>
  <button class="d-rain-launch" type="button">Launch glyphs</button>
  <p class="d-rain-status" aria-live="polite">Launcher ready</p>
</div>`,
  css: `
.d-rain { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-rain::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .38;
  background-image: linear-gradient(90deg, transparent 0 24%, #19191d 25%, transparent 25% 49%, #19191d 50%, transparent 50% 74%, #19191d 75%, transparent 75%); }
.d-rain:focus-visible { box-shadow: inset 0 0 0 2px #fa7319; }
.d-rain-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-rain-reticle { position: absolute; left: 0; top: 0; width: 34px; height: 34px; margin: -17px 0 0 -17px;
  border: 1px solid rgba(250,115,25,.35); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-rain-reticle::before, .d-rain-reticle::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(250,115,25,.62); transform: translate(-50%, -50%); }
.d-rain-reticle::before { width: 9px; height: 1px; }.d-rain-reticle::after { width: 1px; height: 9px; }
.d-rain-reticle i { position: absolute; inset: 6px; border: 1px dashed rgba(250,115,25,.2); border-radius: 50%; }
.d-rain-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; }
.d-rain-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; }
.d-rain-meter strong { color: #fa7319; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-rain-launch { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "Inter",system-ui,sans-serif; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-rain-launch:hover { color: #fa7319; border-color: #fa7319; transform: translateY(-2px); }
.d-rain-launch:focus-visible { outline: 2px solid #fa7319; outline-offset: 3px; }
.d-rain-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-rain-reticle { will-change: auto; }.d-rain-launch { transition: none; }
}
/* Composition at the native preview size. */
.d-rain>button{border-radius:0}
/* Refined type, spacing and quiet interaction controls. */
.d-rain{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-rain :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-rain button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-rain [class$="-status"],.d-rain [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-rain [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-rain [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-rain>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-rain-label{display:none}.d-rain-guide{opacity:.1}`,
  js: `
const canvas = root.querySelector('.d-rain-canvas');
const ctx = canvas.getContext('2d');
const reticle = root.querySelector('.d-rain-reticle');
const meter = root.querySelector('.d-rain-meter strong');
const launchButton = root.querySelector('.d-rain-launch');
const status = root.querySelector('.d-rain-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const glyphs = ['A', 'K', '0', '7', '+', '/', '*', '>', '<', '='];
const colors = ['#fa7319', '#ececef', '#b8b8b8', '#7a7a7f', '#5c5c66'];
let width = 1, height = 1, dpr = 1, particles = [], rings = [];
let launcher = { x: 0, y: 0 }, lastFrame = performance.now();

function resize(first) {
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (first) { launcher.x = width * 0.5; launcher.y = height * 0.46; }
  launcher.x = Math.max(12, Math.min(width - 12, launcher.x)); launcher.y = Math.max(12, Math.min(height - 12, launcher.y));
  particles.forEach(function (particle) {
    particle.x = Math.max(8, Math.min(width - 8, particle.x)); particle.y = Math.max(8, Math.min(height - 8, particle.y));
  });
}
resize(true);
window.addEventListener('resize', function () { resize(false); }, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function burst(x, y, message) {
  launcher.x = Math.max(12, Math.min(width - 12, x)); launcher.y = Math.max(12, Math.min(height - 12, y));
  const count = reduced ? 12 : 28;
  if (reduced) { particles = []; rings = []; }
  for (let i = 0; i < count; i++) {
    const angle = reduced ? i / count * Math.PI * 2 : Math.random() * Math.PI * 2;
    const speed = reduced ? 0 : 85 + Math.random() * 190;
    const radius = reduced ? 30 + (i % 3) * 13 : 0;
    particles.push({
      x: launcher.x + Math.cos(angle) * radius,
      y: launcher.y + Math.sin(angle) * radius,
      oldX: launcher.x, oldY: launcher.y,
      vx: reduced ? 0 : Math.cos(angle) * speed,
      vy: reduced ? 0 : Math.sin(angle) * speed * 0.55 - 175 - Math.random() * 75,
      rotation: Math.random() * Math.PI * 2,
      spin: reduced ? 0 : (Math.random() - 0.5) * 8,
      size: 15 + Math.random() * 15,
      glyph: glyphs[i % glyphs.length], color: colors[i % colors.length],
      life: reduced ? 1 : 1.65 + Math.random() * 0.85,
      maxLife: reduced ? 1 : 2.5, bounces: 0, settled: reduced
    });
  }
  if (particles.length > 160) particles.splice(0, particles.length - 160);
  rings.push({ x: launcher.x, y: launcher.y, radius: reduced ? 52 : 4, life: 1 });
  status.textContent = message || count + ' glyphs launched';
}

root.addEventListener('pointermove', function (event) {
  const point = localPoint(event); launcher.x = point.x; launcher.y = point.y;
}, { passive: true });
root.addEventListener('pointerdown', function (event) {
  if (event.target === launchButton) return;
  const point = localPoint(event); burst(point.x, point.y, 'Pointer glyph burst');
}, { passive: true });
root.addEventListener('pointerleave', function () { status.textContent = particles.length ? 'Glyphs falling' : 'Launcher ready'; });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 44 : 26;
  if (event.key === 'ArrowLeft') launcher.x -= step;
  if (event.key === 'ArrowRight') launcher.x += step;
  if (event.key === 'ArrowUp') launcher.y -= step;
  if (event.key === 'ArrowDown') launcher.y += step;
  if (event.key === 'Home') { launcher.x = width * 0.5; launcher.y = height * 0.46; }
  launcher.x = Math.max(12, Math.min(width - 12, launcher.x)); launcher.y = Math.max(12, Math.min(height - 12, launcher.y));
  if (event.key === ' ') burst(launcher.x, launcher.y, 'Keyboard glyph burst');
  else status.textContent = event.key === 'Home' ? 'Launcher centered' : 'Keyboard launcher positioned';
});

launchButton.addEventListener('click', function () {
  burst(width * 0.5, height * 0.46, 'Center glyph burst'); root.focus();
});

function frame(now) {
  if (!root.isConnected) return;
  const dt = Math.min(0.032, (now - lastFrame) / 1000); lastFrame = now;
  ctx.clearRect(0, 0, width, height);
  for (let i = rings.length - 1; i >= 0; i--) {
    const ring = rings[i];
    if (!reduced) { ring.radius += 210 * dt; ring.life -= 1.9 * dt; }
    if (ring.life <= 0) { rings.splice(i, 1); continue; }
    ctx.globalAlpha = ring.life * 0.55; ctx.strokeStyle = '#fa7319'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2); ctx.stroke();
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i]; particle.oldX = particle.x; particle.oldY = particle.y;
    if (!reduced) {
      if (!particle.settled) {
        particle.vx *= Math.pow(0.996, dt * 60); particle.vy += 620 * dt;
        particle.x += particle.vx * dt; particle.y += particle.vy * dt;
        particle.rotation += particle.spin * dt;
        if (particle.x < 8 || particle.x > width - 8) {
          particle.x = Math.max(8, Math.min(width - 8, particle.x)); particle.vx *= -0.58;
        }
        if (particle.y > height - 12) {
          particle.y = height - 12; particle.vy *= -0.46; particle.vx *= 0.78; particle.spin *= 0.72;
          particle.bounces++;
          if (particle.bounces >= 3 && Math.abs(particle.vy) < 80) { particle.settled = true; particle.vy = 0; }
        }
      }
      particle.life -= dt;
    }
    if (particle.life <= 0) { particles.splice(i, 1); continue; }
    const alpha = reduced ? 0.92 : Math.min(1, particle.life / 0.55);
    ctx.globalAlpha = alpha * 0.2; ctx.strokeStyle = particle.color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(particle.oldX, particle.oldY); ctx.lineTo(particle.x - particle.vx * 0.018, particle.y - particle.vy * 0.018); ctx.stroke();
    ctx.globalAlpha = alpha; ctx.fillStyle = particle.color;
    ctx.save(); ctx.translate(particle.x, particle.y); ctx.rotate(particle.rotation);
    ctx.font = '700 ' + particle.size.toFixed(1) + 'px "Inter", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(particle.glyph, 0, 0); ctx.restore();
  }
  ctx.globalAlpha = 1;
  reticle.style.transform = 'translate(' + launcher.x.toFixed(2) + 'px,' + launcher.y.toFixed(2) + 'px)';
  meter.textContent = String(particles.length).padStart(3, '0');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained click-origin typographic glyph-rain system in a bare near-black 320px canvas stage. Use a visible launcher reticle, semantic center-launch button, active count, and a palette of ten letterform and punctuation glyphs in grayscale plus #fa7319. Resize the canvas to the root, cap devicePixelRatio at 2, keep coordinates in CSS pixels, and clamp live particles on resize.

Each normal burst creates 28 particles at the exact pointer/launcher position. Choose a random full-circle angle, speed 85–275px/s, vx=cos(angle)*speed, and vy=sin(angle)*speed*0.55 - 175 - random(0,75). Give each particle independent rotation, spin in -4–4rad/s, size 15–30px, and life 1.65–2.5s. Cap the pool at 160. Add one expanding ring at the origin.

In one requestAnimationFrame loop with dt capped at 32ms, apply vx drag pow(0.996,dt*60), gravity 620px/s², position and rotation integration. Bounce from side walls with restitution 0.58. At the floor use vertical restitution 0.46, horizontal friction 0.78, and angular damping 0.72; after at least three low-energy bounces mark settled. Decrease life each frame and fade over the last 0.55s. Draw a low-alpha velocity streak before each rotated glyph. Expand rings at 210px/s and fade them at 1.9 life units/s.

Pointerdown bursts unless it targets the control. Arrow keys position the launcher by 26px, Shift+Arrow by 44px, Home centers, and Space launches. Prevent default only for handled keys, keep pointer/resize passive, expose focus styling and polite state messages. Under prefers-reduced-motion, replace previous content with 12 static glyphs distributed on 30/43/56px radial bands, one fixed 52px origin ring, no velocity/spin/gravity/lifetime decay, while preserving pointer and keyboard placement.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Cursor magnetic grid lines
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-magnetic-grid-lines',
  title: 'Cursor Magnetic Grid Lines',
  cat: 'Cursor',
  rootClass: 'd-gridline',
  tags: ['svg-path', 'radial-field', 'quadratic-curves'],
  libs: [],
  desc: 'A precise SVG grid behaves like flexible wire inside a magnetic field. Nearby samples move toward the pointer with a squared falloff, producing continuous bows that brighten according to field energy.',
  seen: 'Seen on: generative agency backgrounds, experimental mapping interfaces, technical product launch systems',
  hint: 'bend the grid, click or press Space to reverse polarity',
  html: `
<div class="d-gridline" tabindex="0" aria-label="Magnetic grid. Arrow keys position the field and Space reverses polarity.">
  <svg class="d-gridline-svg" aria-hidden="true" preserveAspectRatio="none">
    <g class="d-gridline-vertical">
      <path class="d-gridline-v" data-p="0"></path><path class="d-gridline-v" data-p=".1"></path><path class="d-gridline-v" data-p=".2"></path><path class="d-gridline-v" data-p=".3"></path><path class="d-gridline-v" data-p=".4"></path><path class="d-gridline-v" data-p=".5"></path><path class="d-gridline-v" data-p=".6"></path><path class="d-gridline-v" data-p=".7"></path><path class="d-gridline-v" data-p=".8"></path><path class="d-gridline-v" data-p=".9"></path><path class="d-gridline-v" data-p="1"></path>
    </g>
    <g class="d-gridline-horizontal">
      <path class="d-gridline-h" data-p="0"></path><path class="d-gridline-h" data-p=".1667"></path><path class="d-gridline-h" data-p=".3333"></path><path class="d-gridline-h" data-p=".5"></path><path class="d-gridline-h" data-p=".6667"></path><path class="d-gridline-h" data-p=".8333"></path><path class="d-gridline-h" data-p="1"></path>
    </g>
  </svg>
  <div class="d-gridline-field" aria-hidden="true"><i></i></div>
  <span class="d-gridline-label">FIELD / FLEX GRID</span>
  <div class="d-gridline-meter" aria-hidden="true"><span>FORCE</span><strong>00</strong></div>
  <button class="d-gridline-reverse" type="button" aria-pressed="false">Reverse field</button>
  <p class="d-gridline-status" aria-live="polite">Field dormant</p>
</div>`,
  css: `
.d-gridline { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-gridline:focus-visible { box-shadow: inset 0 0 0 2px #fa7319; }
.d-gridline-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-gridline-v, .d-gridline-h { fill: none; stroke: #2e2e34; stroke-width: 1;
  vector-effect: non-scaling-stroke; opacity: .45; }
.d-gridline-vertical .d-gridline-v:nth-child(6), .d-gridline-horizontal .d-gridline-h:nth-child(4) {
  stroke: #5c5c66; stroke-dasharray: 3 5; }
.d-gridline-field { position: absolute; left: 0; top: 0; width: 290px; height: 290px; margin: -145px 0 0 -145px;
  border: 1px solid rgba(250,115,25,.13); border-radius: 50%; pointer-events: none; opacity: 0;
  will-change: transform, opacity; }
.d-gridline-field::before, .d-gridline-field::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(250,115,25,.48); transform: translate(-50%, -50%); }
.d-gridline-field::before { width: 13px; height: 1px; }.d-gridline-field::after { width: 1px; height: 13px; }
.d-gridline-field i { position: absolute; inset: 35px; border: 1px dashed rgba(250,115,25,.11); border-radius: 50%; }
.d-gridline.d-gridline-active .d-gridline-field { opacity: 1; }
.d-gridline-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; }
.d-gridline-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; }
.d-gridline-meter strong { color: #fa7319; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-gridline-reverse { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "Inter",system-ui,sans-serif; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-gridline-reverse:hover { color: #fa7319; border-color: #fa7319; transform: translateY(-2px); }
.d-gridline-reverse:focus-visible { outline: 2px solid #fa7319; outline-offset: 3px; }
.d-gridline-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-gridline-field { will-change: auto; }.d-gridline-reverse { transition: none; }
}
/* Composition at the native preview size. */
.d-gridline>button{border-radius:0}
/* Refined type, spacing and quiet interaction controls. */
.d-gridline{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-gridline :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-gridline button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-gridline [class$="-status"],.d-gridline [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-gridline [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-gridline [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-gridline>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-gridline-label{display:none}.d-gridline-field:before{opacity:.2}`,
  js: `
const svg = root.querySelector('.d-gridline-svg');
const vertical = Array.from(root.querySelectorAll('.d-gridline-v'));
const horizontal = Array.from(root.querySelectorAll('.d-gridline-h'));
const field = root.querySelector('.d-gridline-field');
const meter = root.querySelector('.d-gridline-meter strong');
const reverseButton = root.querySelector('.d-gridline-reverse');
const status = root.querySelector('.d-gridline-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let x = width * 0.5, y = height * 0.5, tx = x, ty = y;
let strength = 0, active = false, polarity = 1;

function resize() {
  const oldWidth = width, oldHeight = height;
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  x = tx = x / Math.max(1, oldWidth) * width; y = ty = y / Math.max(1, oldHeight) * height;
  svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
}
resize();
window.addEventListener('resize', resize, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function setTarget(nextX, nextY, message) {
  tx = Math.max(0, Math.min(width, nextX)); ty = Math.max(0, Math.min(height, nextY));
  active = true; root.classList.add('d-gridline-active'); if (message) status.textContent = message;
}

function reverse(message) {
  polarity *= -1; reverseButton.setAttribute('aria-pressed', String(polarity < 0));
  reverseButton.textContent = polarity < 0 ? 'Attract field' : 'Reverse field';
  if (message) status.textContent = message;
}

root.addEventListener('pointermove', function (event) {
  const point = localPoint(event); setTarget(point.x, point.y, 'Grid attracting');
}, { passive: true });
root.addEventListener('pointerleave', function () {
  active = false; root.classList.remove('d-gridline-active'); status.textContent = 'Field decaying';
});
root.addEventListener('pointerdown', function (event) {
  if (event.target === reverseButton) return;
  const point = localPoint(event); setTarget(point.x, point.y, 'Field reversed'); reverse('Field reversed');
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 46 : 28;
  if (event.key === 'ArrowLeft') tx -= step;
  if (event.key === 'ArrowRight') tx += step;
  if (event.key === 'ArrowUp') ty -= step;
  if (event.key === 'ArrowDown') ty += step;
  if (event.key === 'Home') { tx = width * 0.5; ty = height * 0.5; active = false; root.classList.remove('d-gridline-active'); }
  tx = Math.max(0, Math.min(width, tx)); ty = Math.max(0, Math.min(height, ty));
  if (event.key === ' ') { active = true; root.classList.add('d-gridline-active'); reverse('Keyboard polarity changed'); }
  else status.textContent = event.key === 'Home' ? 'Field centered' : 'Keyboard field positioned';
  if (event.key !== 'Home') { active = true; root.classList.add('d-gridline-active'); }
});

reverseButton.addEventListener('click', function () { active = true; root.classList.add('d-gridline-active'); reverse('Button polarity changed'); root.focus(); });

function smoothPath(points) {
  let d = 'M ' + points[0].x.toFixed(2) + ' ' + points[0].y.toFixed(2);
  for (let i = 1; i < points.length - 2; i++) {
    const midX = (points[i].x + points[i + 1].x) * 0.5, midY = (points[i].y + points[i + 1].y) * 0.5;
    d += ' Q ' + points[i].x.toFixed(2) + ' ' + points[i].y.toFixed(2) + ' ' + midX.toFixed(2) + ' ' + midY.toFixed(2);
  }
  const penultimate = points[points.length - 2], last = points[points.length - 1];
  d += ' Q ' + penultimate.x.toFixed(2) + ' ' + penultimate.y.toFixed(2) + ' ' + last.x.toFixed(2) + ' ' + last.y.toFixed(2);
  return d;
}

function warpLine(path, isVertical) {
  const ratio = Number(path.dataset.p), samples = isVertical ? 13 : 19;
  const base = ratio * (isVertical ? width : height), points = [];
  const radius = Math.min(190, Math.max(110, width * 0.24));
  let peak = 0;
  for (let i = 0; i < samples; i++) {
    const along = i / (samples - 1) * (isVertical ? height : width);
    const baseX = isVertical ? base : along, baseY = isVertical ? along : base;
    const dx = x - baseX, dy = y - baseY, distance = Math.hypot(dx, dy);
    const influence = Math.pow(Math.max(0, 1 - distance / radius), 2) * strength;
    peak = Math.max(peak, influence);
    points.push({
      x: baseX + dx * influence * (isVertical ? 0.48 : 0.06) * polarity,
      y: baseY + dy * influence * (isVertical ? 0.06 : 0.48) * polarity
    });
  }
  path.setAttribute('d', smoothPath(points));
  path.style.stroke = peak > 0.025 ? '#fa7319' : '#2e2e34';
  path.style.opacity = (0.42 + Math.min(1, peak) * 0.58).toFixed(3);
  path.style.strokeWidth = (1 + Math.min(1, peak) * 1.15).toFixed(2);
  return peak;
}

function frameLoop() {
  if (reduced) { x = tx; y = ty; strength = active ? 1 : 0; }
  else {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    strength += ((active ? 1 : 0) - strength) * (active ? 0.16 : 0.1);
  }
  let peak = 0;
  vertical.forEach(function (path) { peak = Math.max(peak, warpLine(path, true)); });
  horizontal.forEach(function (path) { peak = Math.max(peak, warpLine(path, false)); });
  field.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) scale(' + (0.8 + strength * 0.2).toFixed(3) + ')';
  meter.textContent = String(Math.round(peak * 99)).padStart(2, '0');
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained SVG grid whose lines bow toward a cursor-controlled magnetic field inside a 320px root. Use 11 vertical and 7 horizontal path elements with normalized base-position data attributes. Set the SVG viewBox to the root’s current pixel dimensions on resize so the path math remains isotropic at every aspect ratio.

For each vertical path sample 13 points; for each horizontal path sample 19. For a point at its straight-grid base position, calculate dx/dy to the rendered field, radius=clamp(width*0.24,110,190), and influence=max(0,1-distance/radius)²*fieldStrength. Vertical lines displace x by dx*influence*0.48 and y by dy*influence*0.06; horizontal lines swap those weights. Multiply displacement by polarity 1 or -1. Convert samples into a smooth SVG path using quadratic curves through adjacent midpoints and track peak influence per line. Brighten affected lines to #fa7319, raise opacity from 0.42 toward 1, and width from 1 toward 2.15.

Ease field position by 0.18 and strength toward active by 0.16 or toward zero by 0.1. Pointerleave must decay the warp back to perfectly straight. Click, Space, or an aria-pressed semantic button reverses polarity; arrows move the field 28px, Shift+Arrow 46px, and Home centers/deactivates. Prevent default only for handled keys, ignore button pointerdown in the stage handler, use passive pointer/resize listeners, cache nodes, expose force and polite state feedback, and use one rAF.

Under prefers-reduced-motion, snap field position and strength directly to their targets. Keep the static bowed grid, polarity changes, keyboard controls, focus treatment, and responsive viewBox behavior without interpolation.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Cursor heat shimmer
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-heat-shimmer',
  title: 'Cursor Heat Shimmer',
  cat: 'Cursor',
  rootClass: 'd-heat',
  tags: ['additive-blend', 'thermal-map', 'canvas'],
  libs: [],
  desc: 'Pointer velocity deposits luminous heat that rises, spreads, and cools through an off-white, orange, and charcoal thermal ramp. Additive radial fields overlap before fading completely.',
  seen: 'Seen on: experimental music visuals, technical fashion campaigns, generative energy and climate interfaces',
  hint: 'draw heat, click to flare, or ignite the center',
  html: `
<div class="d-heat" tabindex="0" aria-label="Interactive thermal trail. Arrow keys position it and Space creates a heat burst.">
  <div class="d-heat-scene" aria-hidden="true">
    <strong>THERMAL<br>TRACE</strong><span>ENERGY LEAVES EVIDENCE</span>
    <i></i><i></i><i></i>
  </div>
  <canvas class="d-heat-canvas" aria-hidden="true"></canvas>
  <div class="d-heat-reticle" aria-hidden="true"><i></i></div>
  <div class="d-heat-scale" aria-hidden="true"><span>COOL</span><i></i><span>HOT</span></div>
  <div class="d-heat-meter" aria-hidden="true"><span>TEMP</span><strong>000</strong></div>
  <button class="d-heat-ignite" type="button">Ignite center</button>
  <p class="d-heat-status" aria-live="polite">Thermal field cooling</p>
</div>`,
  css: `
.d-heat { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-heat:focus-visible { box-shadow: inset 0 0 0 2px #fa7319; }
.d-heat-scene { position: absolute; inset: 0; overflow: hidden; color: #24242b;
  background-image: linear-gradient(#151519 1px, transparent 1px), linear-gradient(90deg, #151519 1px, transparent 1px);
  background-size: 28px 28px; }
.d-heat-scene strong { position: absolute; left: 50%; top: 48%; transform: translate(-50%, -50%);
  font:500 clamp(48px, 9vw, 82px)/.78 "Roboto", sans-serif; letter-spacing:-0.025em; white-space: nowrap; }
.d-heat-scene span { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 8px "Inter",system-ui,sans-serif; letter-spacing:0.06em; }
.d-heat-scene i { position: absolute; display: block; width: 8px; height: 8px; border: 1px solid #2e2e34; border-radius: 50%; }
.d-heat-scene i:nth-of-type(1) { left: 18%; top: 34%; }.d-heat-scene i:nth-of-type(2) { right: 19%; top: 27%; }
.d-heat-scene i:nth-of-type(3) { right: 31%; bottom: 23%; }
.d-heat-canvas { position: absolute; inset: 0; width: 100%; height: 100%; mix-blend-mode: screen; }
.d-heat-reticle { position: absolute; left: 0; top: 0; width: 32px; height: 32px; margin: -16px 0 0 -16px;
  border: 1px solid rgba(250,115,25,.52); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-heat-reticle::before, .d-heat-reticle::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(236,236,239,.72); transform: translate(-50%, -50%); }
.d-heat-reticle::before { width: 8px; height: 1px; }.d-heat-reticle::after { width: 1px; height: 8px; }
.d-heat-reticle i { position: absolute; inset: 5px; border: 1px dashed rgba(250,115,25,.25); border-radius: 50%; }
.d-heat-scale { position: absolute; left: 20px; bottom: 64px; display: flex; align-items: center; gap: 7px;
  color: #5c5c66; font: 7px "Inter",system-ui,sans-serif; letter-spacing:0.06em; }
.d-heat-scale i { display: block; width: 76px; height: 3px;
  background: linear-gradient(90deg, #2e2e34, #7a7a7f, #fa7319, #ececef); }
.d-heat-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; }
.d-heat-meter strong { color: #fa7319; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-heat-ignite { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "Inter",system-ui,sans-serif; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-heat-ignite:hover { color: #fa7319; border-color: #fa7319; transform: translateY(-2px); }
.d-heat-ignite:focus-visible { outline: 2px solid #fa7319; outline-offset: 3px; }
.d-heat-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-heat-reticle { will-change: auto; }.d-heat-ignite { transition: none; }
}
/* Composition at the native preview size. */
.d-heat>button{border-radius:0}
/* Composition at the native preview size. */
.d-heat{container-type:inline-size}.d-heat-scene strong{font:500 clamp(31px,12.7cqw,54px)/.95 "Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Composition at the native preview size. */
.d-heat button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-heat-scene strong{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-heat{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-heat :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-heat button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-heat [class$="-status"],.d-heat [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-heat [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-heat [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-heat>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-heat h2{font:450 34px/1.05 "Inter",system-ui,sans-serif;letter-spacing:-.02em}.d-heat:before{opacity:.12}`,
  js: `
const canvas = root.querySelector('.d-heat-canvas');
const ctx = canvas.getContext('2d');
const reticle = root.querySelector('.d-heat-reticle');
const meter = root.querySelector('.d-heat-meter strong');
const igniteButton = root.querySelector('.d-heat-ignite');
const status = root.querySelector('.d-heat-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = 1, height = 1, dpr = 1, heat = [];
let launcher = { x: 0, y: 0 }, previous = null, lastFrame = performance.now();

function resize(first) {
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (first) { launcher.x = width * 0.5; launcher.y = height * 0.48; }
  launcher.x = Math.max(10, Math.min(width - 10, launcher.x)); launcher.y = Math.max(10, Math.min(height - 10, launcher.y));
  heat.forEach(function (point) { point.x = Math.max(0, Math.min(width, point.x)); point.y = Math.max(0, Math.min(height, point.y)); });
}
resize(true);
window.addEventListener('resize', function () { resize(false); }, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
}

function addHeat(x, y, temperature, vx, vy, radius, phase) {
  heat.push({ x: x, y: y, temperature: temperature, vx: vx || 0, vy: vy || 0,
    radius: radius || 24, phase: phase || Math.random() * Math.PI * 2 });
  if (heat.length > 140) heat.splice(0, heat.length - 140);
}

function ignite(x, y, amount, message) {
  launcher.x = Math.max(10, Math.min(width - 10, x)); launcher.y = Math.max(10, Math.min(height - 10, y));
  if (reduced) heat = [];
  const count = reduced ? 14 : amount;
  for (let i = 0; i < count; i++) {
    const angle = i / count * Math.PI * 2 + (reduced ? 0 : Math.random() * 0.3);
    const distance = reduced ? 24 + (i % 3) * 16 : Math.random() * 35;
    addHeat(launcher.x + Math.cos(angle) * distance, launcher.y + Math.sin(angle) * distance,
      reduced ? 0.92 - (i % 3) * 0.12 : 0.72 + Math.random() * 0.28,
      reduced ? 0 : Math.cos(angle) * (5 + Math.random() * 18),
      reduced ? 0 : -8 - Math.random() * 24,
      22 + Math.random() * 18, angle);
  }
  if (message) status.textContent = message;
}

ignite(launcher.x, launcher.y, 12, 'Thermal field cooling');

root.addEventListener('pointermove', function (event) {
  const next = localPoint(event); launcher.x = next.x; launcher.y = next.y;
  if (reduced) { ignite(next.x, next.y, 14, 'Static thermal trace'); previous = next; return; }
  if (!previous) { addHeat(next.x, next.y, 0.72, 0, -10, 25); previous = next; return; }
  const dx = next.x - previous.x, dy = next.y - previous.y, distance = Math.hypot(dx, dy);
  const elapsed = Math.max(8, next.time - previous.time), velocity = Math.min(1200, distance / elapsed * 1000);
  const steps = Math.min(14, Math.max(1, Math.floor(distance / 8)));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    addHeat(previous.x + dx * t, previous.y + dy * t, Math.min(1, 0.52 + velocity / 1450),
      -dx / Math.max(1, distance) * 8 + (Math.random() - 0.5) * 9, -7 - Math.random() * 12,
      20 + Math.random() * 10, Math.random() * Math.PI * 2);
  }
  previous = next; status.textContent = 'Drawing thermal trace';
}, { passive: true });
root.addEventListener('pointerleave', function () { previous = null; status.textContent = heat.length ? 'Thermal field cooling' : 'Field cold'; });
root.addEventListener('pointerdown', function (event) {
  if (event.target === igniteButton) return;
  const point = localPoint(event); ignite(point.x, point.y, 22, 'Pointer heat flare');
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 44 : 26;
  if (event.key === 'ArrowLeft') launcher.x -= step;
  if (event.key === 'ArrowRight') launcher.x += step;
  if (event.key === 'ArrowUp') launcher.y -= step;
  if (event.key === 'ArrowDown') launcher.y += step;
  if (event.key === 'Home') { launcher.x = width * 0.5; launcher.y = height * 0.48; }
  launcher.x = Math.max(10, Math.min(width - 10, launcher.x)); launcher.y = Math.max(10, Math.min(height - 10, launcher.y));
  if (event.key === ' ') ignite(launcher.x, launcher.y, 22, 'Keyboard heat flare');
  else status.textContent = event.key === 'Home' ? 'Thermal cursor centered' : 'Keyboard thermal cursor';
});

igniteButton.addEventListener('click', function () {
  ignite(width * 0.5, height * 0.48, 26, 'Center ignition'); root.focus();
});

function drawPoint(point, now) {
  const shimmer = reduced ? 0 : Math.sin(now * 0.006 + point.phase) * (1 - point.temperature) * 5;
  const alpha = reduced ? 0.72 : Math.min(0.78, point.temperature * 0.88);
  const radius = point.radius * (1.25 - point.temperature * 0.25);
  const gradient = ctx.createRadialGradient(point.x + shimmer, point.y, 0, point.x + shimmer, point.y, radius);
  gradient.addColorStop(0, 'rgba(236,236,239,' + (alpha * 0.82) + ')');
  gradient.addColorStop(0.2, 'rgba(250,115,25,' + alpha + ')');
  gradient.addColorStop(0.58, 'rgba(122,122,127,' + (alpha * 0.54) + ')');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(point.x + shimmer, point.y, radius, 0, Math.PI * 2); ctx.fill();
}

function frame(now) {
  if (!root.isConnected) return;
  const dt = Math.min(0.032, (now - lastFrame) / 1000); lastFrame = now;
  ctx.clearRect(0, 0, width, height); ctx.globalCompositeOperation = 'lighter';
  let peak = 0;
  for (let i = heat.length - 1; i >= 0; i--) {
    const point = heat[i];
    if (!reduced) {
      point.x += point.vx * dt; point.y += point.vy * dt;
      point.vx *= Math.pow(0.985, dt * 60); point.vy *= Math.pow(0.992, dt * 60);
      point.radius += 17 * dt; point.temperature -= 0.4 * dt;
    }
    if (point.temperature <= 0) { heat.splice(i, 1); continue; }
    peak = Math.max(peak, point.temperature); drawPoint(point, now);
  }
  ctx.globalCompositeOperation = 'source-over';
  reticle.style.transform = 'translate(' + launcher.x.toFixed(2) + 'px,' + launcher.y.toFixed(2) + 'px)';
  meter.textContent = String(Math.round(peak * 999)).padStart(3, '0');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained additive thermal cursor trail in a bare near-black 320px canvas stage. Keep every visible heat field within grayscale and #fa7319. Put the canvas over a dark technical grid/title scene and use screen blending. Each heat point stores x/y, velocity, radius, phase, and normalized temperature. Resize the backing canvas to the root, cap devicePixelRatio at 2, keep coordinates in CSS pixels, and clamp points on resize.

Emit trail points every ~8px along interpolated pointer segments, capped at 14 per event so fast movement has no gaps. Derive pointer velocity from distance/max(8ms,elapsed) and temperature=min(1,0.52+velocity/1450). Give points small lateral jitter, upward velocity -7 to -19px/s, and radius 20–30px. Click, Space, or a semantic center button creates 22–26 radial heat points. Cap the pool at 140 and seed an initial 12-point field so the demo is alive on first view.

In one requestAnimationFrame loop with dt capped at 32ms, use globalCompositeOperation='lighter'. Move points, damp vx by pow(0.985,dt*60), vy by pow(0.992,dt*60), grow radius 17px/s, and cool temperature by 0.4/s. Draw each as a radial gradient that runs from an off-white core through a #fa7319 mid-band into neutral gray and a transparent edge, with alpha based on temperature. Add horizontal shimmer sin(now*0.006+phase)*(1-temperature)*5 so cooler air wavers more. Remove points at zero temperature and restore source-over blending afterward.

Arrow keys move the launcher 26px, Shift+Arrow 44px, Home centers, and Space flares. Ignore control pointerdown in the stage handler, keep pointer/resize passive, expose temperature and polite state feedback, and retain focus styling. Under prefers-reduced-motion, replace the prior field with 14 static points on three radial bands, disable drift/cooling/shimmer, and preserve pointer, keyboard, and button placement.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Cursor crosshair HUD
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-crosshair-hud',
  title: 'Cursor Crosshair HUD',
  cat: 'Cursor',
  rootClass: 'd-hud',
  tags: ['crosshair', 'telemetry', 'spring-lag'],
  libs: [],
  desc: 'A full-stage targeting HUD separates the live pointer from two spring-lagged axes. Their delayed intersection is tethered to the lead point and reports coordinates, speed, bearing, and lock state in real time.',
  seen: 'Seen on: technical fashion lookbooks, architecture portfolios, aerospace-inspired product launches',
  hint: 'move to acquire, press Space or Freeze HUD to lock',
  html: `
<div class="d-hud" tabindex="0" aria-label="Crosshair coordinate HUD. Arrow keys position it and Space freezes tracking.">
  <div class="d-hud-scene" aria-hidden="true">
    <span>SECTOR 07</span><strong>ACQUIRE<br>SIGNAL</strong><i></i><i></i><i></i><i></i>
  </div>
  <svg class="d-hud-tether" aria-hidden="true" preserveAspectRatio="none"><path></path></svg>
  <div class="d-hud-vline" aria-hidden="true"><i></i></div>
  <div class="d-hud-hline" aria-hidden="true"><i></i></div>
  <div class="d-hud-cross" aria-hidden="true"><i></i><b></b></div>
  <i class="d-hud-lead" aria-hidden="true"></i>
  <div class="d-hud-readout" aria-hidden="true">
    <span>X <b class="d-hud-x">000</b></span><span>Y <b class="d-hud-y">000</b></span>
    <span>VEL <b class="d-hud-speed">000</b></span><span>BRG <b class="d-hud-bearing">000°</b></span>
  </div>
  <button class="d-hud-freeze" type="button" aria-pressed="false">Freeze HUD</button>
  <p class="d-hud-status" aria-live="polite">System centered</p>
</div>`,
  css: `
.d-hud { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; color: #fa7319; touch-action: none; cursor: crosshair; }
.d-hud:focus-visible { box-shadow: inset 0 0 0 2px #fa7319; }
.d-hud-scene { position: absolute; inset: 0; overflow: hidden; color: #202026;
  background-image: linear-gradient(#16161a 1px, transparent 1px), linear-gradient(90deg, #16161a 1px, transparent 1px);
  background-size: 32px 32px; }
.d-hud-scene span { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 8px "Inter",system-ui,sans-serif; letter-spacing:0.06em; }
.d-hud-scene strong { position: absolute; left: 50%; top: 49%; transform: translate(-50%, -50%);
  font:500 clamp(50px, 10vw, 92px)/.78 "Roboto", sans-serif; letter-spacing:-0.025em; white-space: nowrap; }
.d-hud-scene i { position: absolute; width: 38px; height: 38px; border: 1px solid #2a2a30; }
.d-hud-scene i:nth-of-type(1) { left: 9%; top: 25%; border-right: 0; border-bottom: 0; }
.d-hud-scene i:nth-of-type(2) { right: 9%; top: 25%; border-left: 0; border-bottom: 0; }
.d-hud-scene i:nth-of-type(3) { left: 9%; bottom: 20%; border-right: 0; border-top: 0; }
.d-hud-scene i:nth-of-type(4) { right: 9%; bottom: 20%; border-left: 0; border-top: 0; }
.d-hud-tether { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.d-hud-tether path { fill: none; stroke: rgba(250,115,25,.42); stroke-width: 1;
  stroke-dasharray: 3 5; vector-effect: non-scaling-stroke; }
.d-hud-vline, .d-hud-hline { position: absolute; left: 0; top: 0; pointer-events: none; will-change: transform; }
.d-hud-vline { width: 1px; height: 100%; background: rgba(250,115,25,.48); }
.d-hud-hline { width: 100%; height: 1px; background: rgba(250,115,25,.48); }
.d-hud-vline::before, .d-hud-hline::before { content: ''; position: absolute; opacity: .36; }
.d-hud-vline::before { left: -4px; width: 9px; height: 100%;
  background: repeating-linear-gradient(to bottom, transparent 0 15px, #fa7319 16px 17px); }
.d-hud-hline::before { top: -4px; height: 9px; width: 100%;
  background: repeating-linear-gradient(to right, transparent 0 15px, #fa7319 16px 17px); }
.d-hud-vline i, .d-hud-hline i { position: absolute; display: block; background: #ececef; }
.d-hud-vline i { left: -2px; top: 18px; width: 5px; height: 1px; }.d-hud-hline i { top: -2px; right: 18px; width: 1px; height: 5px; }
.d-hud-cross { position: absolute; left: 0; top: 0; width: 44px; height: 44px; margin: -22px 0 0 -22px;
  border: 1px solid rgba(250,115,25,.7); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-hud-cross::before, .d-hud-cross::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: #fa7319; transform: translate(-50%, -50%); }
.d-hud-cross::before { width: 58px; height: 1px; }.d-hud-cross::after { width: 1px; height: 58px; }
.d-hud-cross i { position: absolute; inset: 8px; border: 1px dashed rgba(236,236,239,.28); border-radius: 50%; }
.d-hud-cross b { position: absolute; left: 50%; top: 50%; width: 5px; height: 5px;
  transform: translate(-50%, -50%); border-radius: 50%; background: #ececef; }
.d-hud-lead { position: absolute; left: 0; top: 0; width: 6px; height: 6px; margin: -3px 0 0 -3px;
  border-radius: 50%; background: #ececef; box-shadow: 0 0 0 5px rgba(236,236,239,.12);
  pointer-events: none; will-change: transform; }
.d-hud-readout { position: absolute; left: 0; top: 0; width: 126px; display: grid; grid-template-columns: 1fr 1fr;
  gap: 3px 10px; padding: 8px 9px; border: 1px solid rgba(250,115,25,.32); background: rgba(10,10,11,.82);
  color: #5c5c66; font: 8px "Inter",system-ui,sans-serif; pointer-events: none; will-change: transform; }
.d-hud-readout b { color: #ececef; font-weight: 500; }
.d-hud-freeze { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "Inter",system-ui,sans-serif; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-hud-freeze:hover { color: #fa7319; border-color: #fa7319; transform: translateY(-2px); }
.d-hud-freeze:focus-visible { outline: 2px solid #fa7319; outline-offset: 3px; }
.d-hud-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-hud-vline, .d-hud-hline, .d-hud-cross, .d-hud-lead, .d-hud-readout { will-change: auto; }
  .d-hud-freeze { transition: none; }
}
/* Composition at the native preview size. */
.d-hud{container-type:inline-size}.d-hud-scene strong{color:#89898e;font-family:"Inter",system-ui,sans-serif;font-size:clamp(35px,13cqw,61px);line-height:.9;letter-spacing:-0.025em}.d-hud-freeze{border-radius:0}
/* Composition at the native preview size. */
.d-hud button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-hud-scene strong{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-hud{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-hud :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-hud button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-hud [class$="-status"],.d-hud [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-hud [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-hud [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-hud>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-hud-readout{border-color:#ffffff18;background:#141817cc;border-radius:5px;font:400 10px "Inter",system-ui,sans-serif;letter-spacing:0}.d-hud-readout b{font:400 12px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-hud-scene h2{font:450 35px/1.05 "Inter",system-ui,sans-serif;letter-spacing:-.02em}`,
  js: `
const svg = root.querySelector('.d-hud-tether');
const tether = svg.querySelector('path');
const vline = root.querySelector('.d-hud-vline');
const hline = root.querySelector('.d-hud-hline');
const cross = root.querySelector('.d-hud-cross');
const lead = root.querySelector('.d-hud-lead');
const readout = root.querySelector('.d-hud-readout');
const xValue = root.querySelector('.d-hud-x');
const yValue = root.querySelector('.d-hud-y');
const speedValue = root.querySelector('.d-hud-speed');
const bearingValue = root.querySelector('.d-hud-bearing');
const freezeButton = root.querySelector('.d-hud-freeze');
const status = root.querySelector('.d-hud-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let raw = { x: width * 0.5, y: height * 0.5 }, target = { x: raw.x, y: raw.y };
let x = target.x, y = target.y, vx = 0, vy = 0, frozen = false;
let previousRaw = { x: raw.x, y: raw.y, time: performance.now() }, rawSpeed = 0, rawBearing = 0;

function resize() {
  const oldWidth = width, oldHeight = height;
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  raw.x = raw.x / Math.max(1, oldWidth) * width; raw.y = raw.y / Math.max(1, oldHeight) * height;
  target.x = target.x / Math.max(1, oldWidth) * width; target.y = target.y / Math.max(1, oldHeight) * height;
  x = x / Math.max(1, oldWidth) * width; y = y / Math.max(1, oldHeight) * height;
  svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
}
resize();
window.addEventListener('resize', resize, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
}

function updateRaw(point) {
  const dt = Math.max(8, point.time - previousRaw.time), dx = point.x - previousRaw.x, dy = point.y - previousRaw.y;
  rawSpeed = Math.min(999, Math.hypot(dx, dy) / dt * 1000);
  if (Math.abs(dx) + Math.abs(dy) > 0.01) rawBearing = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
  raw.x = Math.max(0, Math.min(width, point.x)); raw.y = Math.max(0, Math.min(height, point.y));
  previousRaw = { x: raw.x, y: raw.y, time: point.time };
  if (!frozen) { target.x = raw.x; target.y = raw.y; }
}

function toggleFreeze(message) {
  frozen = !frozen; freezeButton.setAttribute('aria-pressed', String(frozen));
  freezeButton.textContent = frozen ? 'Resume HUD' : 'Freeze HUD';
  if (!frozen) { target.x = raw.x; target.y = raw.y; }
  status.textContent = message || (frozen ? 'HUD target locked' : 'HUD tracking resumed');
}

root.addEventListener('pointerenter', function (event) { updateRaw(localPoint(event)); status.textContent = frozen ? 'HUD target locked' : 'Target acquired'; });
root.addEventListener('pointermove', function (event) { updateRaw(localPoint(event)); if (!frozen) status.textContent = 'Tracking target'; }, { passive: true });
root.addEventListener('pointerleave', function () {
  rawSpeed = 0;
  if (!frozen) { target.x = width * 0.5; target.y = height * 0.5; raw.x = target.x; raw.y = target.y; status.textContent = 'System centering'; }
  else status.textContent = 'HUD target locked';
});

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 46 : 28;
  if (event.key === 'ArrowLeft') raw.x -= step;
  if (event.key === 'ArrowRight') raw.x += step;
  if (event.key === 'ArrowUp') raw.y -= step;
  if (event.key === 'ArrowDown') raw.y += step;
  if (event.key === 'Home') { raw.x = width * 0.5; raw.y = height * 0.5; frozen = false; freezeButton.setAttribute('aria-pressed', 'false'); freezeButton.textContent = 'Freeze HUD'; }
  raw.x = Math.max(0, Math.min(width, raw.x)); raw.y = Math.max(0, Math.min(height, raw.y));
  if (event.key === ' ') toggleFreeze('Keyboard lock changed');
  else {
    if (!frozen) { target.x = raw.x; target.y = raw.y; }
    status.textContent = event.key === 'Home' ? 'System centered' : 'Keyboard target moved';
  }
});

freezeButton.addEventListener('click', function () { toggleFreeze('Button lock changed'); root.focus(); });

function frameLoop() {
  if (!root.isConnected) return;
  if (reduced) { x = target.x; y = target.y; vx = 0; vy = 0; }
  else {
    vx = (vx + (target.x - x) * 0.105) * 0.72;
    vy = (vy + (target.y - y) * 0.14) * 0.68;
    x += vx; y += vy;
  }
  vline.style.transform = 'translateX(' + x.toFixed(2) + 'px)';
  hline.style.transform = 'translateY(' + y.toFixed(2) + 'px)';
  cross.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px)';
  lead.style.transform = 'translate(' + raw.x.toFixed(2) + 'px,' + raw.y.toFixed(2) + 'px)';
  const distance = Math.hypot(raw.x - x, raw.y - y);
  tether.setAttribute('d', 'M ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' L ' + raw.x.toFixed(2) + ' ' + raw.y.toFixed(2));
  tether.style.opacity = Math.min(1, distance / 34).toFixed(3);
  const readoutX = x + 18 + 126 > width - 8 ? x - 144 : x + 18;
  const readoutY = y + 58 > height - 8 ? y - 64 : y + 18;
  readout.style.transform = 'translate(' + Math.max(8, readoutX).toFixed(2) + 'px,' + Math.max(8, readoutY).toFixed(2) + 'px)';
  xValue.textContent = String(Math.round(raw.x)).padStart(3, '0');
  yValue.textContent = String(Math.round(raw.y)).padStart(3, '0');
  speedValue.textContent = String(Math.round(rawSpeed)).padStart(3, '0');
  bearingValue.textContent = String(Math.round(rawBearing)).padStart(3, '0') + '°';
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained full-stage crosshair HUD inside a bare near-black 320px position-relative root. Use grayscale telemetry and #fa7319 targeting marks only. Use separate absolute vertical and horizontal axis lines with repeating tick marks, a circular tracked intersection, a distinct 6px live-pointer lead, an SVG tether between them, and a compact coordinate/velocity/bearing readout that flips to the opposite side near stage edges.

Track raw pointer coordinates exactly. Derive raw speed in px/s from distance/max(8ms,elapsed), capped at 999, and bearing=(atan2(dy,dx)*180/pi+360)%360. Unless frozen, copy raw into the tracked target. Animate the X axis with vx=(vx+(targetX-x)*0.105)*0.72 and the Y axis with vy=(vy+(targetY-y)*0.14)*0.68, then position+=velocity. This asymmetric spring makes the axes lag independently. Update axis transforms, intersection, exact lead, and tether path once per frame; tether opacity=min(1,distance/34).

Place the 126px readout at intersection+18px, flip left if it would cross width-8, flip above if it would cross height-8, and clamp to 8px. Report raw X/Y, speed, and padded bearing. A semantic aria-pressed Freeze HUD button and Space toggle whether raw motion updates the tracked target; the lead and tether must keep showing live pointer motion while frozen. Pointerleave recenters only when unlocked. Arrow keys move raw target 28px, Shift+Arrow 46px, and Home centers/unlocks. Prevent default only for handled keys, keep pointer/resize passive, preserve focus and polite lock-state feedback, and update the SVG viewBox on resize.

Under prefers-reduced-motion, snap both axes directly to the target with no spring velocity while preserving lead/tether separation during freeze, telemetry, keyboard controls, and edge-aware readout placement.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Cursor pull distort
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-pull-distort',
  title: 'Cursor Pull Distort',
  cat: 'Cursor',
  rootClass: 'd-pull',
  tags: ['clip-path', 'polygon', 'spring'],
  libs: [],
  desc: 'An eight-point poster skin bows toward the pointer as though made from flexible film. Corners pull harder than edge midpoints, while a live wireframe exposes the spring geometry and its return to shape.',
  seen: 'Seen on: experimental campaign cards, fashion lookbooks, tactile agency case-study grids',
  hint: 'pull near an edge, click to tug, or use arrow keys',
  html: `
<div class="d-pull" tabindex="0" aria-label="Flexible poster distortion. Arrow keys move the pull point and Space tugs the surface.">
  <div class="d-pull-stage">
    <div class="d-pull-card">
      <div class="d-pull-art">
        <span>ELASTIC<br>MATTER</span><strong>FORM<br>FOLLOWS<br>FORCE</strong><i></i><b></b>
      </div>
    </div>
    <svg class="d-pull-wire" aria-hidden="true" preserveAspectRatio="none">
      <polygon></polygon>
      <circle r="3"></circle><circle r="3"></circle><circle r="3"></circle><circle r="3"></circle>
      <circle r="3"></circle><circle r="3"></circle><circle r="3"></circle><circle r="3"></circle>
    </svg>
    <div class="d-pull-reticle" aria-hidden="true"><i></i></div>
  </div>
  <span class="d-pull-label">SURFACE / 8 POINT</span>
  <div class="d-pull-meter" aria-hidden="true"><span>FORCE</span><strong>00</strong></div>
  <button class="d-pull-tug" type="button">Pull center</button>
  <p class="d-pull-status" aria-live="polite">Surface resting</p>
</div>`,
  css: `
.d-pull { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-pull:focus-visible { box-shadow: inset 0 0 0 2px #fa7319; }
.d-pull-stage { position: absolute; left: 50%; top: 49%; width: min(62%, 430px); height: 194px;
  transform: translate(-50%, -50%); }
.d-pull-card { position: absolute; inset: 0; overflow: hidden; background: #161619; will-change: clip-path; }
.d-pull-art { position: absolute; inset: -8px; overflow: hidden; background: #161619; color: #ececef;
  will-change: transform; }
.d-pull-art::before { content: ''; position: absolute; inset: 0; opacity: .42;
  background-image: linear-gradient(rgba(236,236,239,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(236,236,239,.12) 1px, transparent 1px);
  background-size: 24px 24px; }
.d-pull-art span { position: absolute; left: 16px; top: 14px; font: 8px/1.2 "Inter",system-ui,sans-serif;
  letter-spacing:0.06em; }
.d-pull-art strong { position: absolute; left: 50%; top: 52%; transform: translate(-50%, -50%);
  font:500 clamp(34px, 5vw, 55px)/.75 "Roboto", sans-serif; letter-spacing:-0.025em; white-space: nowrap; }
.d-pull-art i { position: absolute; right: 26px; top: 20px; width: 82px; height: 82px;
  border: 16px solid #fa7319; border-radius: 50%; mix-blend-mode: normal; }
.d-pull-art b { position: absolute; right: 18px; bottom: 16px; width: 48px; height: 48px;
  background: #5c5c66; transform: rotate(18deg); mix-blend-mode: normal; }
.d-pull-wire { position: absolute; inset: -1px; width: calc(100% + 2px); height: calc(100% + 2px);
  overflow: visible; pointer-events: none; opacity: .22; transition: opacity .2s; }
.d-pull-wire polygon { fill: none; stroke: #fa7319; stroke-width: 1; stroke-dasharray: 4 5;
  vector-effect: non-scaling-stroke; }
.d-pull-wire circle { fill: #0a0a0b; stroke: #fa7319; stroke-width: 1; vector-effect: non-scaling-stroke; }
.d-pull.d-pull-active .d-pull-wire { opacity: .92; }
.d-pull-reticle { position: absolute; left: 0; top: 0; width: 30px; height: 30px; margin: -15px 0 0 -15px;
  border: 1px solid rgba(250,115,25,.5); border-radius: 50%; opacity: 0; pointer-events: none; will-change: transform, opacity; }
.d-pull-reticle::before, .d-pull-reticle::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: #fa7319; transform: translate(-50%, -50%); }
.d-pull-reticle::before { width: 8px; height: 1px; }.d-pull-reticle::after { width: 1px; height: 8px; }
.d-pull-reticle i { position: absolute; inset: 5px; border: 1px dashed rgba(250,115,25,.24); border-radius: 50%; }
.d-pull.d-pull-active .d-pull-reticle { opacity: 1; }
.d-pull-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; }
.d-pull-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; }
.d-pull-meter strong { color: #fa7319; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-pull-tug { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "Inter",system-ui,sans-serif; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-pull-tug:hover { color: #fa7319; border-color: #fa7319; transform: translateY(-2px); }
.d-pull-tug:focus-visible { outline: 2px solid #fa7319; outline-offset: 3px; }
.d-pull-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
@media (max-width: 620px) { .d-pull-stage { width: 76%; height: 176px; } }
@media (prefers-reduced-motion: reduce) {
  .d-pull-card, .d-pull-art, .d-pull-reticle { will-change: auto; }.d-pull-tug { transition: none; }
}
/* Composition at the native preview size. */
.d-pull-tug{border-radius:0}.d-pull-status{font-size:8px;letter-spacing:0}
/* Composition at the native preview size. */
.d-pull-art{container-type:inline-size}.d-pull-art strong{font:500 clamp(26px,16cqw,40px)/.93 "Inter",system-ui,sans-serif;letter-spacing:-0.025em}.d-pull-art i{width:52px;height:52px;top:16px;right:14px;border-width:10px}.d-pull-art span{font-size:7px}.d-pull-art b{width:30px;height:30px;right:12px;bottom:12px}
/* Composition at the native preview size. */
.d-pull button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-pull-art strong{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-pull{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-pull :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-pull button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-pull [class$="-status"],.d-pull [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-pull [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-pull [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-pull>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-pull-label{display:none}.d-pull-card{border-color:#ffffff1a}.d-pull-card h2{font:450 32px/1.02 "Inter",system-ui,sans-serif;letter-spacing:-.02em}`,
  js: `
const card = root.querySelector('.d-pull-card');
const art = root.querySelector('.d-pull-art');
const wire = root.querySelector('.d-pull-wire');
const polygon = wire.querySelector('polygon');
const handles = Array.from(wire.querySelectorAll('circle'));
const reticle = root.querySelector('.d-pull-reticle');
const meter = root.querySelector('.d-pull-meter strong');
const tugButton = root.querySelector('.d-pull-tug');
const status = root.querySelector('.d-pull-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const bases = [[0,0],[.5,0],[1,0],[1,.5],[1,1],[.5,1],[0,1],[0,.5]];
const nodes = bases.map(function () { return { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 }; });
let width = 1, height = 1, pointer = { x: 0, y: 0 }, active = false, boost = 1;

function measure() {
  const box = card.getBoundingClientRect();
  const oldWidth = width, oldHeight = height;
  width = Math.max(1, box.width); height = Math.max(1, box.height);
  if (!pointer.x && !pointer.y) { pointer.x = width * 0.5; pointer.y = height * 0.5; }
  else { pointer.x = pointer.x / Math.max(1, oldWidth) * width; pointer.y = pointer.y / Math.max(1, oldHeight) * height; }
  wire.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
}
measure();
window.addEventListener('resize', measure, { passive: true });

function localPoint(event) {
  const box = card.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function activate(x, y, message, force) {
  pointer.x = Math.max(0, Math.min(width, x)); pointer.y = Math.max(0, Math.min(height, y));
  active = true; boost = force || Math.max(1, boost); root.classList.add('d-pull-active');
  if (message) status.textContent = message;
}

function release() {
  active = false; boost = 1; root.classList.remove('d-pull-active'); status.textContent = 'Surface returning';
}

card.addEventListener('pointermove', function (event) {
  const point = localPoint(event); activate(point.x, point.y, 'Surface under tension', 1);
}, { passive: true });
card.addEventListener('pointerleave', release);
card.addEventListener('pointerdown', function (event) {
  const point = localPoint(event); activate(point.x, point.y, 'Pointer tug', reduced ? 1 : 1.6);
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home', 'Escape'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === 'Escape') { release(); return; }
  const step = event.shiftKey ? 42 : 24;
  if (!active) { pointer.x = width * 0.5; pointer.y = height * 0.5; }
  if (event.key === 'ArrowLeft') pointer.x -= step;
  if (event.key === 'ArrowRight') pointer.x += step;
  if (event.key === 'ArrowUp') pointer.y -= step;
  if (event.key === 'ArrowDown') pointer.y += step;
  if (event.key === 'Home') { pointer.x = width * 0.5; pointer.y = height * 0.5; }
  pointer.x = Math.max(0, Math.min(width, pointer.x)); pointer.y = Math.max(0, Math.min(height, pointer.y));
  if (event.key === ' ') activate(pointer.x, pointer.y, 'Keyboard tug', reduced ? 1 : 1.6);
  else activate(pointer.x, pointer.y, event.key === 'Home' ? 'Pull point centered' : 'Keyboard pull point', 1);
});

tugButton.addEventListener('click', function () {
  activate(width * 0.5, height * 0.5, 'Center pull', reduced ? 1 : 1.7); root.focus();
});

function frameLoop() {
  if (!root.isConnected) return;
  if (!reduced) boost += (1 - boost) * 0.075;
  const radius = Math.hypot(width, height) * 0.92;
  let peak = 0;
  nodes.forEach(function (node, index) {
    const baseX = bases[index][0] * width, baseY = bases[index][1] * height;
    const dx = pointer.x - baseX, dy = pointer.y - baseY, distance = Math.hypot(dx, dy);
    const influence = active ? Math.pow(Math.max(0, 1 - distance / radius), 2) : 0;
    const weight = index % 2 === 0 ? 0.18 : 0.11;
    const magnitude = Math.min(24, Math.hypot(dx * influence * weight * boost, dy * influence * weight * boost));
    const direction = Math.max(0.001, distance);
    node.tx = dx / direction * magnitude; node.ty = dy / direction * magnitude;
    peak = Math.max(peak, influence * boost);
    if (reduced) { node.x = node.tx; node.y = node.ty; node.vx = 0; node.vy = 0; }
    else {
      node.vx = (node.vx + (node.tx - node.x) * 0.13) * 0.7;
      node.vy = (node.vy + (node.ty - node.y) * 0.13) * 0.7;
      node.x += node.vx; node.y += node.vy;
    }
  });
  const points = nodes.map(function (node, index) {
    return { x: bases[index][0] * width + node.x, y: bases[index][1] * height + node.y };
  });
  const clip = 'polygon(' + points.map(function (point) { return point.x.toFixed(2) + 'px ' + point.y.toFixed(2) + 'px'; }).join(',') + ')';
  card.style.clipPath = clip;
  polygon.setAttribute('points', points.map(function (point) { return point.x.toFixed(2) + ',' + point.y.toFixed(2); }).join(' '));
  handles.forEach(function (handle, index) { handle.setAttribute('cx', points[index].x.toFixed(2)); handle.setAttribute('cy', points[index].y.toFixed(2)); });
  const nx = active ? pointer.x / width - 0.5 : 0, ny = active ? pointer.y / height - 0.5 : 0;
  art.style.transform = reduced ? 'none' : 'translate(' + (nx * 12).toFixed(2) + 'px,' + (ny * 9).toFixed(2) + 'px) scale(1.045)';
  reticle.style.transform = 'translate(' + pointer.x.toFixed(2) + 'px,' + pointer.y.toFixed(2) + 'px)';
  meter.textContent = String(Math.min(99, Math.round(peak * 99))).padStart(2, '0');
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `Build a self-contained flexible poster whose silhouette bows toward the pointer through an eight-point CSS clip-path polygon. Keep the bare stage near-black and the poster grayscale with one #fa7319 artifact. Use alternating nodes at four corners and four edge midpoints. Mirror the exact geometry in an SVG polygon with eight handle circles so the deformation is inspectable. Keep the card layout rectangle fixed; only its visible polygon changes.

Measure the card once and on resize. For each node calculate its pixel base, vector to the local pointer, radius=hypot(width,height)*0.92, and influence=max(0,1-distance/radius)². Corners use weight 0.18 and edge midpoints 0.11. Compute the weighted displacement toward the pointer, multiply by a temporary tug boost, and cap its magnitude at 24px. Animate x/y offsets with velocity=(velocity+(target-current)*0.13)*0.7, then current+=velocity. Rebuild clip-path polygon in pixels, SVG points, and handle cx/cy once per frame.

Pointermove activates tension, pointerleave sets targets back to zero so the shape springs home, and pointerdown briefly raises boost to 1.6, easing to 1 by 0.075 per frame. Add subtle inner-art parallax translate((normalizedX-.5)*12px,(normalizedY-.5)*9px) scale(1.045). Arrow keys move a virtual pull point 24px, Shift+Arrow 42px, Home centers, Escape releases, and Space or a semantic button creates a 1.6–1.7 tug. Prevent default only for handled keys, keep pointer/resize passive, expose force and polite state feedback, and preserve focus styles.

Under prefers-reduced-motion, assign node offsets directly, disable tug amplification and inner parallax, while preserving pointer/keyboard geometry, wireframe handles, responsive measurement, and the static distorted result.

Use compact regular Inter poster lettering that fits the measured card, a small structural orange artifact, and a square-cornered outlined Tug control.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Cursor shadow parallax
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-shadow-parallax',
  title: 'Cursor Shadow Parallax',
  cat: 'Cursor',
  rootClass: 'd-shadow',
  tags: ['light-source', 'drop-shadow', 'parallax'],
  libs: [],
  desc: 'A movable light source casts a measured shadow in the physically opposite direction. Distance controls offset, softness, opacity, contact compression, specular position, and a restrained object tilt.',
  seen: 'Seen on: tactile product cards, material studies, dimensional portfolio covers',
  hint: 'move the light, press Space for hard light, or use arrow keys',
  html: `
<div class="d-shadow" tabindex="0" aria-label="Interactive cast-shadow study. Arrow keys move the light, Home resets it, and Space changes its softness.">
  <span class="d-shadow-kicker">LIGHT STUDY / 01</span>
  <div class="d-shadow-stage">
    <div class="d-shadow-cast" aria-hidden="true"></div>
    <div class="d-shadow-contact" aria-hidden="true"></div>
    <div class="d-shadow-object" aria-hidden="true">
      <div class="d-shadow-art"><span>FORM</span><strong>07</strong><i></i></div>
    </div>
  </div>
  <div class="d-shadow-light" aria-hidden="true"><i></i></div>
  <div class="d-shadow-meter" aria-hidden="true"><span>OFFSET</span><strong>00</strong><b>PX</b></div>
  <button class="d-shadow-mode" type="button" aria-pressed="false">Soft light</button>
  <p class="d-shadow-status" aria-live="polite">Soft light · northwest</p>
</div>`,
  css: `
.d-shadow { --d-shadow-hx: 24%; --d-shadow-hy: 20%; position: relative; width: 100%; height: 320px;
  overflow: hidden; outline: none; background: #0a0a0b; color: #ececef; touch-action: none; }
.d-shadow:focus-visible { box-shadow: inset 0 0 0 2px #fa7319; }
.d-shadow::before { content: ''; position: absolute; inset: 0; opacity: .28; pointer-events: none;
  background-image: linear-gradient(rgba(236,236,239,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(236,236,239,.13) 1px, transparent 1px);
  background-size: 32px 32px; }
.d-shadow-stage { position: absolute; left: 50%; top: 50%; width: 220px; height: 148px;
  transform: translate(-50%, -48%); perspective: 700px; }
.d-shadow-cast { position: absolute; inset: 9px 8px 4px; border-radius: 17px; background: #050506;
  transform-origin: 50% 70%; will-change: transform, filter, opacity; pointer-events: none; }
.d-shadow-contact { position: absolute; left: 13%; right: 13%; bottom: -15px; height: 24px; border-radius: 50%;
  background: #000000; filter: blur(8px); transform-origin: 50% 50%; will-change: transform, filter, opacity; }
.d-shadow-object { position: absolute; inset: 0; border-radius: 15px; background: #161619; border: 1px solid rgba(236,236,239,.16);
  overflow: hidden; box-shadow: inset 0 1px rgba(255,255,255,.85); transform-style: preserve-3d; will-change: transform; }
.d-shadow-art { position: absolute; inset: 0; overflow: hidden; background:
  radial-gradient(circle at var(--d-shadow-hx) var(--d-shadow-hy), rgba(255,255,255,.92) 0, rgba(255,255,255,.28) 18%, transparent 43%),
  linear-gradient(135deg, #fa7319 0 48%, #2e2e34 48% 100%); }
.d-shadow-art::before { content: ''; position: absolute; inset: 0; opacity: .32;
  background: repeating-linear-gradient(90deg, transparent 0 13px, rgba(236,236,239,.16) 13px 14px); }
.d-shadow-art span { position: absolute; left: 15px; top: 14px; font: 9px "Inter",system-ui,sans-serif;
  letter-spacing:0.06em; }
.d-shadow-art strong { position: absolute; right: 10px; bottom: -13px; font:500 78px/.9 "Roboto", sans-serif;
  letter-spacing:-0.025em; color: #ececef; }
.d-shadow-art i { position: absolute; left: 28px; bottom: 22px; width: 44px; height: 44px;
  border: 11px solid #ececef; border-radius: 50%; mix-blend-mode: normal; }
.d-shadow-light { position: absolute; left: 0; top: 0; width: 42px; height: 42px; margin: -21px 0 0 -21px;
  border: 1px solid rgba(236,236,239,.5); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-shadow-light::before, .d-shadow-light::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(236,236,239,.42); transform: translate(-50%, -50%); }
.d-shadow-light::before { width: 58px; height: 1px; }.d-shadow-light::after { width: 1px; height: 58px; }
.d-shadow-light i { position: absolute; inset: 8px; border-radius: 50%; background: #fa7319;
  border: 1px solid rgba(236,236,239,.34); box-shadow: 0 0 0 5px rgba(250,115,25,.22), 0 0 25px rgba(250,115,25,.3); }
.d-shadow-kicker { position: absolute; left: 18px; top: 17px; font: 9px "Inter",system-ui,sans-serif;
  letter-spacing:0.06em; color: rgba(236,236,239,.58); }
.d-shadow-meter { position: absolute; right: 18px; top: 15px; display: flex; align-items: baseline; gap: 4px;
  font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; color: rgba(236,236,239,.55); }
.d-shadow-meter strong { min-width: 26px; font-size: 19px; font-weight: 500; color: #ececef; letter-spacing: 0; text-align: right; }
.d-shadow-meter b { font-weight: 400; letter-spacing:0.06em; }
.d-shadow-mode { position: absolute; left: 18px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(236,236,239,.36);
  border-radius: 999px; background: rgba(16,16,18,.82); color: #ececef; font: 10px "Inter",system-ui,sans-serif;
  cursor: pointer; transition: background .18s, color .18s, transform .18s; }
.d-shadow-mode:hover { background: #161619; color: #fa7319; border-color: #fa7319; transform: translateY(-2px); }
.d-shadow-mode:focus-visible { outline: 2px solid #fa7319; outline-offset: 3px; }
.d-shadow-status { position: absolute; right: 18px; bottom: 19px; max-width: 48%; margin: 0; text-align: right;
  color: rgba(236,236,239,.58); font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; text-transform: uppercase; }
.d-shadow.d-shadow-hard .d-shadow-light i { background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,.38), 0 0 13px rgba(250,115,25,.34); }
@media (max-width: 620px) { .d-shadow-stage { width: 190px; height: 128px; }.d-shadow-status { max-width: 42%; } }
@media (prefers-reduced-motion: reduce) {
  .d-shadow-cast, .d-shadow-contact, .d-shadow-object, .d-shadow-light { will-change: auto; }
  .d-shadow-mode { transition: none; }
}
/* Composition at the native preview size. */
.d-shadow-object,.d-shadow-art{border-radius:0}.d-shadow-mode{border-radius:0}.d-shadow-status{font-size:8px;letter-spacing:0}
/* Composition at the native preview size. */
.d-shadow button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-shadow-art strong{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Composition at the native preview size. */
.d-shadow-object{border-color:#ffffff18;box-shadow:inset 0 1px #ffffff1a;border-radius:10px}.d-shadow-art{background:radial-gradient(ellipse at var(--d-shadow-hx) var(--d-shadow-hy),#ffffff1a 0,#ffffff09 36%,transparent 74%),linear-gradient(145deg,#3a3d42 0,#303338 48%,#25282c)}.d-shadow-art strong{color:#e6e7e8;font-weight:500}.d-shadow-art>span{color:#b8bec4}.d-shadow-art i{border-color:#ffffff28;opacity:.5}
/* Composition at the native preview size. */
.d-shadow-art strong{font-size:66px;line-height:1;bottom:10px;right:18px;top:auto}
/* Refined type, spacing and quiet interaction controls. */
.d-shadow{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-shadow :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-shadow button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-shadow [class$="-status"],.d-shadow [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-shadow [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-shadow [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-shadow>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-shadow-object{border-radius:9px;background:linear-gradient(145deg,#373e3a,#2e3430);border-color:#ffffff09}.d-shadow-number{font:400 50px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:-.02em}`,
  js: `
const stageEl = root.querySelector('.d-shadow-stage');
const cast = root.querySelector('.d-shadow-cast');
const contact = root.querySelector('.d-shadow-contact');
const object = root.querySelector('.d-shadow-object');
const art = root.querySelector('.d-shadow-art');
const light = root.querySelector('.d-shadow-light');
const meter = root.querySelector('.d-shadow-meter strong');
const modeButton = root.querySelector('.d-shadow-mode');
const status = root.querySelector('.d-shadow-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let center = { x: width * 0.5, y: height * 0.5 };
let target = { x: width * 0.24, y: height * 0.20 };
let current = { x: target.x, y: target.y };
let hard = false;

function defaultLight() { return { x: width * 0.24, y: height * 0.20 }; }
function clampLight(point) {
  return { x: Math.max(24, Math.min(width - 24, point.x)), y: Math.max(24, Math.min(height - 46, point.y)) };
}
function measure() {
  const oldWidth = width, oldHeight = height;
  width = Math.max(1, root.clientWidth); height = Math.max(1, root.clientHeight);
  const box = stageEl.getBoundingClientRect();
  center.x = box.left - root.getBoundingClientRect().left + box.width * 0.5;
  center.y = box.top - root.getBoundingClientRect().top + box.height * 0.5;
  target = clampLight({ x: target.x / Math.max(1, oldWidth) * width, y: target.y / Math.max(1, oldHeight) * height });
  current = clampLight({ x: current.x / Math.max(1, oldWidth) * width, y: current.y / Math.max(1, oldHeight) * height });
}
measure();
window.addEventListener('resize', measure, { passive: true });

function setTarget(x, y, message) {
  target = clampLight({ x: x, y: y });
  if (message) status.textContent = message;
}
root.addEventListener('pointermove', function (event) {
  const box = root.getBoundingClientRect();
  setTarget(event.clientX - box.left, event.clientY - box.top, hard ? 'Hard light · tracking' : 'Soft light · tracking');
}, { passive: true });
root.addEventListener('pointerleave', function () {
  const home = defaultLight(); setTarget(home.x, home.y, hard ? 'Hard light · northwest' : 'Soft light · northwest');
});

function setMode(nextHard) {
  hard = nextHard; root.classList.toggle('d-shadow-hard', hard);
  modeButton.setAttribute('aria-pressed', String(hard));
  modeButton.textContent = hard ? 'Hard light' : 'Soft light';
  status.textContent = hard ? 'Hard light · crisp shadow' : 'Soft light · diffuse shadow';
}
modeButton.addEventListener('click', function () { setMode(!hard); root.focus(); });
root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' '];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === ' ') { setMode(!hard); return; }
  if (event.key === 'Home') {
    const home = defaultLight(); setTarget(home.x, home.y, 'Light reset northwest'); return;
  }
  const step = event.shiftKey ? 34 : 18;
  setTarget(target.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
    target.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard light position');
});

function frameLoop() {
  if (!root.isConnected) return;
  if (reduced) { current.x = target.x; current.y = target.y; }
  else { current.x += (target.x - current.x) * 0.14; current.y += (target.y - current.y) * 0.14; }
  const fromLightX = center.x - current.x, fromLightY = center.y - current.y;
  const distance = Math.max(1, Math.hypot(fromLightX, fromLightY));
  const reach = Math.min(55, (hard ? 16 : 13) + distance * (hard ? 0.11 : 0.085));
  const shadowX = fromLightX / distance * reach;
  const shadowY = fromLightY / distance * reach + (hard ? 6 : 8);
  const blur = hard ? Math.max(3, 9 - distance * 0.012) : Math.min(24, 13 + distance * 0.032);
  const opacity = hard ? Math.min(.55, .34 + distance * .0007) : Math.min(.34, .19 + distance * .00045);
  const stretch = 1 + Math.min(.18, distance / 1500);
  cast.style.transform = 'translate(' + shadowX.toFixed(2) + 'px,' + shadowY.toFixed(2) + 'px) scale(' + stretch.toFixed(3) + ',' + (1 / stretch).toFixed(3) + ')';
  cast.style.filter = 'blur(' + blur.toFixed(2) + 'px)'; cast.style.opacity = opacity.toFixed(3);
  contact.style.transform = 'translate(' + (shadowX * .16).toFixed(2) + 'px,' + Math.min(7, shadowY * .12).toFixed(2) + 'px) scale(' + (hard ? .78 : .94).toFixed(2) + ',' + (hard ? .48 : .62).toFixed(2) + ')';
  contact.style.filter = 'blur(' + (hard ? 4 : 8) + 'px)'; contact.style.opacity = hard ? '.44' : '.27';
  const lightNX = Math.max(0, Math.min(100, (current.x - center.x + 110) / 220 * 100));
  const lightNY = Math.max(0, Math.min(100, (current.y - center.y + 74) / 148 * 100));
  art.style.setProperty('--d-shadow-hx', lightNX.toFixed(1) + '%'); art.style.setProperty('--d-shadow-hy', lightNY.toFixed(1) + '%');
  object.style.transform = reduced ? 'none' : 'rotateX(' + ((current.y - center.y) / height * -3.6).toFixed(2) + 'deg) rotateY(' + ((current.x - center.x) / width * 4.8).toFixed(2) + 'deg)';
  light.style.transform = 'translate(' + current.x.toFixed(2) + 'px,' + current.y.toFixed(2) + 'px)';
  meter.textContent = String(Math.round(Math.hypot(shadowX, shadowY))).padStart(2, '0');
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained cast-shadow study around a fixed 220 by 148 pixel object and an independently moving light marker. Place it on a bare near-black root, using grayscale material and one #fa7319 graphic plane. Measure the root and the untransformed stage on startup and resize. Convert pointer coordinates into the root's local space and clamp the light 24px from horizontal edges and above the bottom controls. Pointerleave returns it to a northwest home position; Arrow keys move it 18px, Shift+Arrow 34px, Home resets it, and Space or a semantic aria-pressed button toggles soft and hard light.

Derive the shadow from the vector pointing away from the light: fromLight=center-light, distance=hypot(dx,dy), reach=min(55,base+distance*rate), shadowX=dx/distance*reach, and shadowY=dy/distance*reach plus a small downward bias. Soft mode uses base 13, rate .085, 13-24px distance-dependent blur and lower opacity. Hard mode uses base 16, rate .11, 3-9px blur and stronger opacity. Apply the cast shadow as translate plus restrained inverse-axis scale, and render a separate ground contact shadow with smaller translation, compressed Y scale, dedicated blur, and opacity.

Move a radial specular highlight across the object's inner artwork using clamped CSS custom-property percentages derived from light position. In full motion, ease the light toward its target by 0.14 per frame and tilt the object no more than about five degrees toward the source. Update transform, blur, opacity, highlight variables, marker, and numeric offset meter in one animation frame. Keep all pointer and resize listeners passive, handle only documented keyboard keys, preserve visible focus, and announce mode or input changes through a polite status region.

Under prefers-reduced-motion, snap the light directly to its target and remove object tilt while preserving the physically opposite shadow vector, hard/soft modes, pointer and keyboard control, responsive measurement, contact shadow, specular position, and offset readout.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.
Use a neutral graphite physical plate with a broad directional highlight at about 10% white opacity, a gentle charcoal ramp and a low-contrast edge. Avoid a white hot spot and orange diagonal fill.
Keep the complete edition number visible inside the plate, with a measured lower inset.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`
});

/* ------------------------------------------------------------
   Custom trailing cursor
------------------------------------------------------------ */
INTRX.register({
  id: 'custom-cursor',
  title: 'Custom Trailing Cursor',
  cat: 'Cursor',
  rootClass: 'd-cursor',
  tags: ['lerp', 'mix-blend-mode'],
  libs: [],
  desc: 'A dot that sticks to the pointer and a ring that lazily chases it with lerp. The ring grows over interactive elements. Blend-mode difference keeps it visible on any background.',
  seen: 'Seen on: dennissnellenberg.com, most Awwwards SOTD portfolios',
  hint: 'move your mouse in the panel',
  html: `
<div class="d-cursor">
  <div class="d-cursor-dot"></div>
  <div class="d-cursor-ring"></div>
  <div class="d-cursor-content">
    <a class="d-cursor-link" href="#" onclick="return false">Selected work</a>
    <a class="d-cursor-link" href="#" onclick="return false">About</a>
  </div>
</div>`,
  css: `
.d-cursor { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; cursor: none; }
.d-cursor-dot, .d-cursor-ring {
  position: absolute; top: 0; left: 0; pointer-events: none;
  border-radius: 50%; z-index: 10; opacity: 0;
}
.d-cursor-dot  { width: 6px; height: 6px; background: #fa7319; }
.d-cursor-ring {
  width: 36px; height: 36px; border: 1px solid #fa7319;
  transition: width 0.25s, height 0.25s;
  mix-blend-mode: difference;
}
.d-cursor-ring.d-cursor-big { width: 72px; height: 72px; }
.d-cursor-content { height: 100%; display: flex; align-items: center; justify-content: center; gap: 40px; }
.d-cursor-link {
  color: #ececef; text-decoration: none; font-size: 26px; font-weight:500; cursor: none;
  border-bottom: 1px solid #2e2e34;
}
/* Composition at the native preview size. */
.d-cursor-content{gap:26px}.d-cursor-link{font:500 16px/1.5 "Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Composition at the native preview size. */
.d-cursor button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-cursor a{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-cursor{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-cursor :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-cursor button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-cursor [class$="-status"],.d-cursor [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-cursor [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-cursor [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-cursor>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-cursor a{font:450 17px "Inter",system-ui,sans-serif;letter-spacing:-.015em;border-color:#ffffff22}`,
  js: `
const dot = root.querySelector('.d-cursor-dot');
const ring = root.querySelector('.d-cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0, inside = false;

root.addEventListener('mousemove', function (e) {
  const b = root.getBoundingClientRect();
  mx = e.clientX - b.left;
  my = e.clientY - b.top;
  inside = true;
});
root.addEventListener('mouseleave', function () { inside = false; });

root.querySelectorAll('.d-cursor-link').forEach(function (el) {
  el.addEventListener('mouseenter', function () { ring.classList.add('d-cursor-big'); });
  el.addEventListener('mouseleave', function () { ring.classList.remove('d-cursor-big'); });
});

(function tick() {
  rx += (mx - rx) * 0.12;                 // ring lags behind
  ry += (my - ry) * 0.12;
  dot.style.opacity = ring.style.opacity = inside ? 1 : 0;
  dot.style.transform  = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
  ring.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
  requestAnimationFrame(tick);
})();`,
  prompt: `
Build a custom cursor in vanilla JS.

Requirements:
- Hide the native cursor (cursor: none) only inside the component preview.
- Render two locally positioned elements: a 6px dot that follows the pointer exactly, and a 36px ring that follows with lerp (factor ~0.12) in a requestAnimationFrame loop.
- The ring uses mix-blend-mode: difference so it stays visible over any color.
- When hovering links/buttons (or any [data-cursor="grow"]), the ring scales up ~2x via a CSS transition.
- Both elements are pointer-events: none.
- Disable the whole thing on touch devices (matchMedia '(pointer: coarse)') and under prefers-reduced-motion.

Use two restrained 16px regular Inter links, “Selected work” and “About,” with generous spacing on a near-black stage.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
});

/* ------------------------------------------------------------
   Magnetic button
------------------------------------------------------------ */
INTRX.register({
  id: 'magnetic-button',
  title: 'Magnetic Button',
  cat: 'Cursor',
  rootClass: 'd-magnet',
  tags: ['attraction', 'elastic'],
  libs: ['gsap'],
  desc: 'The button is pulled toward the cursor while hovered, and snaps back with an elastic overshoot on leave. The label moves at a higher ratio for a layered feel.',
  seen: 'Seen on: studiofreight.com, dennissnellenberg.com, nearly every SOTD nav',
  hint: 'hover the buttons',
  html: `
<div class="d-magnet">
  <button class="d-magnet-btn"><span>Get in touch</span></button>
  <button class="d-magnet-btn"><span>See work</span></button>
</div>`,
  css: `
.d-magnet {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; gap: 48px;
}
.d-magnet-btn {
  position: relative; width: 150px; height: 150px; border-radius: 50%;
  background: transparent; border: 1px solid #2e2e34; color: #ececef;
  font-size: 15px; font-weight: 500; font-family: inherit; cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
}
.d-magnet-btn:hover { border-color: #fa7319; background: rgba(250,115,25,0.06); }
.d-magnet-btn span { display: inline-block; pointer-events: none; }
/* Composition at the native preview size. */
.d-magnet{gap:22px;padding:24px;box-sizing:border-box}.d-magnet-btn{width:120px;height:120px;flex-shrink:1;font-size:12px}.d-magnet-btn:hover{background:#161619}
/* Composition at the native preview size. */
.d-magnet button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-magnet-btn{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-magnet{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-magnet :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-magnet button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-magnet [class$="-status"],.d-magnet [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-magnet [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-magnet [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-magnet>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-magnet button{font:450 13px "Inter",system-ui,sans-serif;letter-spacing:0;border-color:#ffffff22}.d-magnet button{border-radius:50%;font:450 13px "Inter",system-ui,sans-serif;border-color:#ffffff22}`,
  js: `
root.querySelectorAll('.d-magnet-btn').forEach(function (btn) {
  const label = btn.querySelector('span');

  btn.addEventListener('mousemove', function (e) {
    const b = btn.getBoundingClientRect();
    const x = e.clientX - b.left - b.width / 2;
    const y = e.clientY - b.top - b.height / 2;
    gsap.to(btn,   { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power3.out' });
    gsap.to(label, { x: x * 0.7, y: y * 0.7, duration: 0.4, ease: 'power3.out' });
  });

  btn.addEventListener('mouseleave', function () {
    gsap.to([btn, label], { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' });
  });
});`,
  prompt: `Build magnetic buttons with GSAP.

Requirements:
- On mousemove over the button, compute the cursor offset from the button center.
- Translate the button toward the cursor at ~0.4 of the offset, and the inner label at ~0.7 (parallax between shell and label).
- Use gsap.to with power3.out, duration ~0.4s, so movement is smoothed.
- On mouseleave, both animate back to 0,0 with elastic.out(1, 0.35) over ~0.9s for a springy snap-back.
- The label must be pointer-events: none so it never steals hover.
- Disable on touch devices.
- If GSAP is unavailable, describe a vanilla fallback using lerp in requestAnimationFrame.

Render two compact 120px circular graphite controls with 12px mono labels and orange focus/interaction details. Keep 24px padding and a 22px gap so both remain visible in a narrow preview.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
});

/* ------------------------------------------------------------
   Cursor image trail
------------------------------------------------------------ */
INTRX.register({
  id: 'image-trail',
  title: 'Cursor Image Trail',
  cat: 'Cursor',
  rootClass: 'd-trail',
  tags: ['spawn', 'threshold'],
  libs: [],
  desc: 'Moving the cursor spawns images along its path once it travels a minimum distance; each pops in, drifts, and fades out. A hero-section staple for photography and fashion.',
  seen: 'Seen on: Jesper Landberg demos, ross.gallery, fashion lookbooks',
  hint: 'sweep your cursor across',
  html: `
<div class="d-trail">
  <p class="d-trail-word">Collected<br><em>moments.</em></p><span class="d-trail-caption">A STUDY IN PASSING</span>
</div>`,
  css: `
.d-trail {
  position: relative; width: 100%; height: 320px;
  background: #0a0a0b; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.d-trail-word { font-size: 90px; font-weight:500; color: #161619; letter-spacing: 0.02em; pointer-events: none; }
.d-trail-img {
  position: absolute; width: 110px; height: 140px;
  pointer-events: none; will-change: transform, opacity;
  border: 1px solid #2e2e34;
}
@keyframes d-trail-pop {
  0%   { transform: translate(-50%, -50%) scale(0.4) rotate(var(--r)); opacity: 0; }
  20%  { transform: translate(-50%, -50%) scale(1) rotate(var(--r));   opacity: 1; }
  100% { transform: translate(-50%, -62%) scale(0.9) rotate(var(--r)); opacity: 0; }
}
.d-trail-img { animation: d-trail-pop 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
/* Composition at the native preview size. */
.d-trail-word{font:500 65px/1 "Inter",system-ui,sans-serif;color:#444;letter-spacing:-0.025em}.d-trail-img{background:#161619;border:1px solid #777;display:grid;place-items:center}.d-trail-img::before{content:"";width:64px;height:64px;border:1px solid #ddd;border-radius:50%;box-shadow:0 0 0 7px #161619,0 0 0 8px #777}.d-trail-img:nth-of-type(2n)::before{border-radius:0;transform:rotate(45deg);border-color:#fa7319}
/* Composition at the native preview size. */
.d-trail{container-type:inline-size}.d-trail-word{position:relative;font:400 clamp(40px,14cqw,65px)/.94 "Newsreader",Georgia,serif;letter-spacing:-0.025em;color:#d7d4ce;text-align:center;margin:0}.d-trail-word em{font-weight:400;color:#979b9b}.d-trail-caption{position:absolute;bottom:24px;font:8px/1 "Inter",system-ui,sans-serif;letter-spacing:0.06em;color:#767b80}.d-trail-img{width:112px;height:142px;background-size:cover;background-position:center;border:1px solid #ffffff18;box-shadow:0 12px 34px #0005;display:block}.d-trail-img::before{display:none}
/* Refined type, spacing and quiet interaction controls. */
.d-trail{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-trail :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-trail button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-trail [class$="-status"],.d-trail [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-trail [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-trail [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-trail>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-trail-word{font:450 37px/1.12 "Inter",system-ui,sans-serif;letter-spacing:-.025em;text-align:left;max-width:230px}.d-trail-word em{font-style:normal;color:#9baba0}.d-trail-caption{display:none}`,
  js: `
// Geometric print studies; replace the cards with supplied images in production.
const photos = ['{{asset:coastal-stack}}','{{asset:limestone-pavilion}}','{{asset:atlantic-shore}}'];
let last = { x: 0, y: 0 }, count = 0;

function spawn(x, y) {
  const el = document.createElement('div');
  el.className = 'd-trail-img';
  const photo = photos[count % photos.length];
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.setProperty('--r', ((Math.random() * 14) - 7) + 'deg');
  el.style.backgroundImage = 'url("' + photo + '")';
  el.style.zIndex = ++count;
  root.appendChild(el);
  setTimeout(function () { el.remove(); }, 1000);
}

root.addEventListener('mousemove', function (e) {
  const b = root.getBoundingClientRect();
  const x = e.clientX - b.left, y = e.clientY - b.top;
  // only spawn after the cursor travels 90px
  if (Math.hypot(x - last.x, y - last.y) > 90) {
    last = { x: x, y: y };
    spawn(x, y);
  }
});`,
  prompt: `
Build a cursor image-trail effect in vanilla JS.

Requirements:
- Use three locally embedded photographic assets (coast, architectural pavilion, breaking waves), cropped naturally into compact portrait cards with a subtle edge and soft contact shadow.
- Track mousemove inside a hero section; when the pointer has moved more than ~90px from the last spawn point, spawn the next image centered at the cursor.
- Each image plays a one-shot CSS keyframe animation: scale 0.4 -> 1 with fade-in over the first 20%, then drifts upward, scales to 0.9 and fades out by 100% (total ~1s, cubic-bezier(0.22,1,0.36,1)).
- Give each image a random rotation between -7deg and 7deg via a CSS custom property.
- Increment z-index per spawn so newer images stack on top; remove each node when its animation ends.
- Images are pointer-events: none. Disable on touch devices.

Use a Newsreader serif two-line headline “Collected moments.” with an italic second line and quiet editorial spacing. The photographic cards carry the visual detail.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
});

/* ------------------------------------------------------------
   Spotlight / mask reveal hover
------------------------------------------------------------ */
INTRX.register({
  id: 'spotlight-mask',
  title: 'Spotlight Mask Hover',
  cat: 'Cursor',
  rootClass: 'd-spot',
  tags: ['mask', 'radial-gradient'],
  libs: [],
  desc: 'A hidden layer is revealed only through a circular mask that follows the cursor — flashlight over a dark page. Works for text swaps, hidden imagery, easter eggs.',
  seen: 'Seen on: bruno-simon.com intro, agency 404 pages, portfolio heroes',
  hint: 'move your mouse in the panel',
  html: `
<div class="d-spot">
  <div class="d-spot-base"><h2>LOOK<br>CLOSER.</h2></div>
  <div class="d-spot-hidden"><h2>KEEP<br>LOOKING.</h2></div>
</div>`,
  css: `
.d-spot { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; }
.d-spot-base, .d-spot-hidden {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.d-spot-base h2 { font-size: 56px; font-weight:500; color: #232327; letter-spacing: -0.02em; }
.d-spot-hidden {
  background: #fa7319;
  -webkit-mask-image: radial-gradient(circle 110px at var(--x, -200px) var(--y, -200px), #000 98%, transparent 100%);
          mask-image: radial-gradient(circle 110px at var(--x, -200px) var(--y, -200px), #000 98%, transparent 100%);
}
.d-spot-hidden h2 { font-size: 56px; font-weight:500; color: #0a0a0b; letter-spacing: -0.02em; }
/* Composition at the native preview size. */
.d-spot{container-type:inline-size}.d-spot-base,.d-spot-hidden{padding:24px;box-sizing:border-box;justify-content:flex-start}.d-spot-base h2,.d-spot-hidden h2{font:500 clamp(31px,11cqw,54px)/1 "Inter",system-ui,sans-serif;letter-spacing:-0.025em}.d-spot-base h2{color:#49494e}
/* Composition at the native preview size. */
.d-spot button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-spot-base h2,.d-spot-hidden h2{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-spot{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-spot :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-spot button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-spot [class$="-status"],.d-spot [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-spot [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-spot [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-spot>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}`,
  js: `
let mx = -200, my = -200, x = -200, y = -200;
const hidden = root.querySelector('.d-spot-hidden');

root.addEventListener('mousemove', function (e) {
  const b = root.getBoundingClientRect();
  mx = e.clientX - b.left;
  my = e.clientY - b.top;
});
root.addEventListener('mouseleave', function () { mx = -200; my = -200; });

(function tick() {
  x += (mx - x) * 0.15;   // slight lag feels physical
  y += (my - y) * 0.15;
  hidden.style.setProperty('--x', x + 'px');
  hidden.style.setProperty('--y', y + 'px');
  requestAnimationFrame(tick);
})();`,
  prompt: `
Build a cursor spotlight mask reveal in vanilla JS + CSS.

Requirements:
- Two stacked full-size layers: a base layer and a hidden layer with different grayscale regular Inter content and a restrained orange accent.
- The hidden layer uses CSS mask-image: radial-gradient(circle 110px at var(--x) var(--y), black 98%, transparent 100%) so it is only visible in a circle around the cursor.
- Update --x/--y CSS custom properties from mousemove, but lerp toward the pointer (factor ~0.15) in a rAF loop so the spotlight trails slightly.
- On mouseleave, park the mask far off-canvas so the hidden layer disappears.
- Include the -webkit-mask-image prefix. Disable on touch devices.

Use the short two-line phrases “LOOK / CLOSER.” and “KEEP / LOOKING.”, native 24px padding, and container-relative role-appropriate type that fits the preview.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
});

/* ------------------------------------------------------------
   3D tilt card
------------------------------------------------------------ */
INTRX.register({
  id: 'tilt-card',
  title: '3D Tilt Card + Glare',
  cat: 'Cursor',
  rootClass: 'd-tilt',
  tags: ['perspective', 'rotate3d'],
  libs: [],
  desc: 'The card rotates in 3D toward the cursor with a moving glare highlight, and inner content lifts on the Z axis. Perspective on the parent is what sells it.',
  seen: 'Seen on: Stripe press cards, vercel.com, NFT-era product cards',
  hint: 'hover the card',
  html: `
<div class="d-tilt">
  <div class="d-tilt-card">
    <div class="d-tilt-glare"></div>
    <div class="d-tilt-content">
      <span class="d-tilt-tag">FIELD NOTES / 005</span>
      <h3>Quiet<br>by design.</h3>
      <p>Architecture, light & perspective.</p>
    </div>
  </div>
</div>`,
  css: `
.d-tilt {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
  perspective: 900px;
}
.d-tilt-card {
  position: relative; width: 300px; height: 220px;
  background: linear-gradient(160deg, #161619, #101012);
  border: 1px solid #2e2e34;
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
  overflow: hidden;
}
.d-tilt-glare {
  position: absolute; inset: -60%;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(250,115,25,0.16) 0%, transparent 45%);
  pointer-events: none;
}
.d-tilt-content { position: relative; padding: 24px; transform: translateZ(40px); }
.d-tilt-tag { font-family: "Inter",system-ui,sans-serif; font-size: 10px; color: #fa7319; letter-spacing: 0.2em; }
.d-tilt-content h3 { color: #ececef; font-size: 24px; line-height: 1.15; margin: 10px 0 8px; }
.d-tilt-content p { color: #5c5c66; font-family: "Inter",system-ui,sans-serif; font-size: 11px; }
.d-tilt.d-tilt-idle .d-tilt-card { animation: d-tilt-idle 4.8s ease-in-out infinite; }
@keyframes d-tilt-idle { 0%, 100% { transform: rotateX(-1.5deg) rotateY(-2.5deg); } 50% { transform: rotateX(2deg) rotateY(3deg); } }
@media (prefers-reduced-motion: reduce) { .d-tilt.d-tilt-idle .d-tilt-card { animation: none; } }
/* Composition at the native preview size. */
.d-tilt-card{width:min(280px,calc(100% - 64px));height:210px;background:#19191c;overflow:visible}.d-tilt-glare{inset:0;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),#ffffff1c,transparent 65%);overflow:hidden}.d-tilt-content{padding:24px}.d-tilt-content h3{font:500 25px/1.1 "Inter",system-ui,sans-serif;letter-spacing:-0.025em}.d-tilt-content p{color:#999;font-size:10px}.d-tilt-tag{color:#fa7319}.d-tilt-card::after{content:"";position:absolute;width:42px;height:42px;right:24px;bottom:22px;border:1px solid #777;transform:translateZ(28px) rotate(45deg);pointer-events:none}
/* Composition at the native preview size. */
.d-tilt-card{width:min(300px,calc(100% - 48px));height:244px;background-image:linear-gradient(180deg,rgba(7,11,13,.02) 20%,rgba(7,11,13,.2) 54%,rgba(7,11,13,.7)),url("{{asset:limestone-pavilion}}");background-size:cover;background-position:center;border:1px solid #ffffff18;box-shadow:0 18px 42px #0004;border-radius:3px}.d-tilt-card::after{display:none}.d-tilt-content{position:absolute;inset:0;padding:20px;display:flex;flex-direction:column;justify-content:flex-end;transform:translateZ(24px)}.d-tilt-tag{position:absolute;top:18px;left:20px;color:#343b3d;font-size:7px;letter-spacing:0.06em}.d-tilt-content h3{font:400 38px/.96 "Newsreader",Georgia,serif;letter-spacing:-0.025em;margin:0 0 9px;color:#f9f7f2}.d-tilt-content p{font:400 10px/1.5 "Inter",system-ui,sans-serif;margin:0;color:#e6e7e7}.d-tilt-glare{background:radial-gradient(ellipse at var(--gx,50%) var(--gy,50%),#ffffff14 0,#ffffff05 35%,transparent 75%);border-radius:3px}
/* Refined type, spacing and quiet interaction controls. */
.d-tilt{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-tilt :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-tilt button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-tilt [class$="-status"],.d-tilt [class$="-meter"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.d-tilt [class$="-readout"]{font:400 11px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-tilt [class$="-readout"] b{font:400 19px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#9aaea0}.d-tilt>button{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:#ffffff17;border-radius:5px;background:#ffffff04;color:#c5cec8}.d-tilt-content h3{font:450 31px/1.1 "Inter",system-ui,sans-serif;letter-spacing:-.02em;margin-bottom:12px}.d-tilt-content p{font:400 11px/1.5 "Inter",system-ui,sans-serif;max-width:170px}.d-tilt-tag{font:450 9px/1.4 "Inter",system-ui,sans-serif;letter-spacing:.01em}.d-tilt-card{border-radius:7px;border-color:#ffffff0d}.d-tilt-content{padding:22px}`,
  js: `
const card = root.querySelector('.d-tilt-card');
const MAX = 10; // degrees
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches;
let idle = !reduced;

function stopIdle() {
  if (!idle) return;
  idle = false;
  root.classList.remove('d-tilt-idle');
}

if (!reduced) {
  root.classList.add('d-tilt-idle');
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

card.addEventListener('pointermove', function (e) {
  stopIdle();
  const b = card.getBoundingClientRect();
  const px = (e.clientX - b.left) / b.width;    // 0 .. 1
  const py = (e.clientY - b.top) / b.height;
  const rx = (0.5 - py) * MAX * 2;
  const ry = (px - 0.5) * MAX * 2;
  card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
  card.style.setProperty('--gx', (px * 100) + '%');
  card.style.setProperty('--gy', (py * 100) + '%');
});

card.addEventListener('mouseleave', function () {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});`,
  prompt: `Build a 3D tilt card with glare, vanilla JS.

Requirements:
- Parent container has perspective: 900px; the card has transform-style: preserve-3d.
- On mousemove, normalize the cursor position over the card (0..1) and map to rotateX/rotateY, max ±10deg, so the card tilts toward the cursor.
- A glare layer (radial-gradient, pointer-events: none) follows the cursor via --gx/--gy custom properties.
- Inner content sits at translateZ(40px) so it visually floats above the card surface.
- Before the first interaction, run a slow autonomous tilt sway; stop it permanently on pointer movement, pointerdown, or keydown.
- transition: transform 0.15s ease-out on the card smooths the motion; on mouseleave everything resets to 0.
- Disable the idle sway on touch devices and under prefers-reduced-motion.

Use a 244px-high architectural photographic card with a soft natural-light image, a continuous dark lower scrim, restrained edge contrast and broad subtle glare. Set “Quiet by design.” in Newsreader at 38px, supporting copy in Inter, and a tiny regular Inter edition label. Keep content at translateZ(24px), with a 900px parent perspective and the existing ±10 degree tilt. Embed the photographic asset so the exported component is standalone.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
});
