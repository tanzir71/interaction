/* INTRX registry — CURSOR */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Gooey cursor blob
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-gooey-blob',
  title: 'Cursor Gooey Blob',
  cat: 'Cursor',
  rootClass: 'd-gooey',
  tags: ['svg-filter', 'lerp', 'pointer'],
  libs: [],
  desc: 'A soft fluorescent blob trails the pointer through an SVG goo filter. Hovering a navigation target pulls the blob into the target until both shapes fuse, then releases it with a springy stretch.',
  seen: 'Seen on: Lusion experiments, Active Theory portfolios, immersive studio navigation',
  hint: 'move, then hover a destination',
  html: `
<div class="d-gooey" aria-label="Gooey cursor navigation demo">
  <svg class="d-gooey-defs" aria-hidden="true">
    <filter id="d-gooey-filter" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="d-gooey-blur" />
      <feColorMatrix in="d-gooey-blur" mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="d-gooey-mass" />
      <feComposite in="SourceGraphic" in2="d-gooey-mass" operator="atop" />
    </filter>
  </svg>
  <div class="d-gooey-field" aria-hidden="true">
    <i class="d-gooey-blob"></i>
    <i class="d-gooey-mass d-gooey-mass-one"></i>
    <i class="d-gooey-mass d-gooey-mass-two"></i>
    <i class="d-gooey-mass d-gooey-mass-three"></i>
  </div>
  <nav class="d-gooey-nav" aria-label="Demo destinations">
    <button class="d-gooey-link" type="button" data-index="0">Index</button>
    <button class="d-gooey-link" type="button" data-index="1">Studio</button>
    <button class="d-gooey-link" type="button" data-index="2">Contact</button>
  </nav>
  <p class="d-gooey-status" aria-live="polite">Pointer free</p>
</div>`,
  css: `
.d-gooey { position: relative; width: 100%; height: 320px; overflow: hidden; isolation: isolate;
  background: #0a0a0b; touch-action: none; }
.d-gooey-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
.d-gooey-field { position: absolute; inset: 0; filter: url(#d-gooey-filter); pointer-events: none; }
.d-gooey-blob, .d-gooey-mass { position: absolute; display: block; border-radius: 999px;
  background: #c8ff2e; will-change: transform; }
.d-gooey-blob { left: 0; top: 0; width: 54px; height: 54px;
  animation: d-gooey-breathe 2.8s ease-in-out infinite; }
.d-gooey-mass { top: 50%; width: 132px; height: 52px; margin: -26px 0 0 -66px; }
.d-gooey-mass-one { left: 23%; }
.d-gooey-mass-two { left: 50%; }
.d-gooey-mass-three { left: 77%; }
.d-gooey-nav { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(3, 132px);
  align-items: center; justify-content: space-around; padding: 0 4%; }
.d-gooey-link { position: relative; width: 132px; height: 52px; border: 0; border-radius: 999px;
  background: transparent; color: #0a0a0b; font: 600 14px "JetBrains Mono", monospace;
  letter-spacing: .02em; cursor: pointer; z-index: 2; }
.d-gooey-link:focus-visible { outline: 2px solid #ececef; outline-offset: 5px; }
.d-gooey-status { position: absolute; left: 20px; bottom: 16px; margin: 0; color: #5c5c66;
  font: 10px "JetBrains Mono", monospace; letter-spacing: .1em; text-transform: uppercase; }
@keyframes d-gooey-breathe { 50% { margin: -3px 0 0 -3px; } }
@media (max-width: 620px) {
  .d-gooey-nav { grid-template-columns: repeat(3, 88px); padding: 0 2%; }
  .d-gooey-link { width: 88px; font-size: 11px; }
  .d-gooey-mass { width: 88px; margin-left: -44px; }
}
@media (prefers-reduced-motion: reduce) { .d-gooey-blob { animation: none; } }`,
  js: `
const blob = root.querySelector('.d-gooey-blob');
const links = Array.from(root.querySelectorAll('.d-gooey-link'));
const status = root.querySelector('.d-gooey-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let x = root.clientWidth * 0.5;
let y = root.clientHeight * 0.27;
let tx = x, ty = y, vx = 0, vy = 0;
let scaleX = 1, scaleY = 1, targetScaleX = 1, targetScaleY = 1;
let captured = null, hasPointer = false;

function localCenter(el) {
  const outer = root.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  return { x: box.left - outer.left + box.width / 2, y: box.top - outer.top + box.height / 2 };
}

function capture(link) {
  captured = link;
  const point = localCenter(link);
  tx = point.x; ty = point.y;
  targetScaleX = 2.45; targetScaleY = 0.96;
  status.textContent = 'Absorbing ' + link.textContent;
}

function release() {
  captured = null;
  targetScaleX = 1; targetScaleY = 1;
  status.textContent = hasPointer ? 'Pointer free' : 'Keyboard ready';
}

root.addEventListener('pointermove', function (event) {
  hasPointer = true;
  if (captured) return;
  const box = root.getBoundingClientRect();
  tx = Math.max(27, Math.min(box.width - 27, event.clientX - box.left));
  ty = Math.max(27, Math.min(box.height - 27, event.clientY - box.top));
}, { passive: true });

links.forEach(function (link) {
  link.addEventListener('pointerenter', function () { capture(link); });
  link.addEventListener('pointerleave', release);
  link.addEventListener('focus', function () { capture(link); });
  link.addEventListener('blur', release);
  link.addEventListener('click', function () {
    status.textContent = link.textContent + ' selected';
    setTimeout(function () { if (captured === link) capture(link); }, 700);
  });
});

function frame() {
  const stiffness = captured ? 0.16 : 0.095;
  const damping = captured ? 0.68 : 0.76;
  if (reduced) {
    x = tx; y = ty; scaleX = targetScaleX; scaleY = targetScaleY;
  } else {
    vx = (vx + (tx - x) * stiffness) * damping;
    vy = (vy + (ty - y) * stiffness) * damping;
    x += vx; y += vy;
    const speed = Math.min(1, Math.hypot(vx, vy) / 22);
    const movingX = targetScaleX + speed * 0.42;
    const movingY = targetScaleY - speed * 0.18;
    scaleX += (movingX - scaleX) * 0.16;
    scaleY += (movingY - scaleY) * 0.16;
  }
  const angle = Math.atan2(vy, vx) * 180 / Math.PI;
  blob.style.transform = 'translate(' + (x - 27) + 'px,' + (y - 27) + 'px) rotate(' + angle + 'deg) scale(' + scaleX + ',' + scaleY + ')';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained gooey cursor navigation interaction in a 320px position-relative root. Put one 54px circular pointer blob and three 132x52px pill-shaped navigation masses inside a single layer using an SVG filter. The filter must blur SourceGraphic by 10px, then apply a color matrix whose alpha row is 0 0 0 22 -9, and composite the crisp source atop the thresholded mass. Render the real button labels in a separate unfiltered nav layer so text stays sharp.

Track pointer coordinates relative to the root and constrain the blob center by its 27px radius. Animate with one requestAnimationFrame loop using a damped spring: velocity = (velocity + (target - position) * stiffness) * damping, then position += velocity. Use stiffness 0.095 and damping 0.76 while free; on button hover or keyboard focus, retarget to that button's local center with stiffness 0.16 and damping 0.68. While captured, ease the blob toward scaleX 2.45 and scaleY 0.96. While moving freely, add up to 0.42 horizontal stretch and subtract up to 0.18 vertical scale based on min(1, speed / 22), and rotate to atan2(vy, vx). Ease scale components by 0.16 per frame.

Use only transform for frame-by-frame DOM writes, cache queried nodes, and keep pointermove passive. Buttons must remain semantic, keyboard-focusable, and show a high-contrast focus ring. Announce hover/focus/selection state in a polite live region. For prefers-reduced-motion, stop interpolation and render the target position and scale immediately; keep the goo filter and keyboard behavior functional. The idle blob may use a subtle 2.8-second breathing animation, disabled for reduced motion.`
});

/* ------------------------------------------------------------
   Cursor particle emitter
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-particle-emitter',
  title: 'Cursor Particle Emitter',
  cat: 'Cursor',
  rootClass: 'd-emitter',
  tags: ['canvas', 'particles', 'velocity'],
  libs: [],
  desc: 'Pointer distance and velocity become a stream of sparks: slow movement sheds soft dust, fast sweeps throw bright streaks against gravity, and a press produces a compact radial burst.',
  seen: 'Seen on: Resn experiments, Active Theory campaigns, playful creative-development portfolios',
  hint: 'sweep, tap, or launch a burst',
  html: `
<div class="d-emitter" aria-label="Pointer particle emitter demo">
  <canvas class="d-emitter-canvas" aria-hidden="true"></canvas>
  <div class="d-emitter-reticle" aria-hidden="true"><i></i><i></i></div>
  <div class="d-emitter-readout" aria-hidden="true">
    <span>VELOCITY</span><strong>000</strong>
  </div>
  <button class="d-emitter-burst" type="button">Launch burst</button>
  <p class="d-emitter-status" aria-live="polite">Emitter ready</p>
</div>`,
  css: `
.d-emitter { position: relative; width: 100%; height: 320px; overflow: hidden; isolation: isolate;
  background: radial-gradient(circle at 50% 48%, #161619 0, #0a0a0b 58%); touch-action: none; }
.d-emitter-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-emitter-reticle { position: absolute; left: 50%; top: 48%; width: 38px; height: 38px;
  transform: translate(-50%, -50%); border: 1px solid #2e2e34; border-radius: 50%; pointer-events: none;
  transition: opacity .25s; }
.d-emitter-reticle i { position: absolute; left: 50%; top: 50%; display: block; background: #5c5c66; }
.d-emitter-reticle i:first-child { width: 52px; height: 1px; transform: translate(-50%, -50%); }
.d-emitter-reticle i:last-child { width: 1px; height: 52px; transform: translate(-50%, -50%); }
.d-emitter.d-emitter-active .d-emitter-reticle { opacity: 0; }
.d-emitter-readout { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-emitter-readout strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-emitter-burst { position: absolute; left: 20px; bottom: 18px; z-index: 2; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: border-color .2s, color .2s, transform .2s; }
.d-emitter-burst:hover { border-color: #c8ff2e; color: #c8ff2e; transform: translateY(-2px); }
.d-emitter-burst:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-emitter-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .d-emitter-reticle, .d-emitter-burst { transition: none; }
}`,
  js: `
const canvas = root.querySelector('.d-emitter-canvas');
const ctx = canvas.getContext('2d');
const readout = root.querySelector('.d-emitter-readout strong');
const button = root.querySelector('.d-emitter-burst');
const status = root.querySelector('.d-emitter-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const particles = [];
let width = 1, height = 1, dpr = 1;
let previous = null, lastFrame = performance.now(), quietTimer = null;

function resize() {
  const box = root.getBoundingClientRect();
  width = Math.max(1, box.width); height = Math.max(1, box.height);
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener('resize', resize, { passive: true });

function addParticle(x, y, vx, vy, size, life, bright) {
  particles.push({ x: x, y: y, px: x, py: y, vx: vx, vy: vy, size: size,
    life: life, maxLife: life, bright: bright });
  if (particles.length > 220) particles.splice(0, particles.length - 220);
}

function burst(x, y, amount, energy) {
  if (reduced) particles.length = 0;
  const count = reduced ? Math.min(12, amount) : amount;
  for (let i = 0; i < count; i++) {
    const angle = i / count * Math.PI * 2 + Math.random() * 0.35;
    const speed = reduced ? 0 : energy * (0.45 + Math.random() * 0.65);
    addParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed,
      1.2 + Math.random() * 2.4, reduced ? 1 : 0.45 + Math.random() * 0.55, i % 3 === 0);
  }
  root.classList.add('d-emitter-active');
}

function point(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
}

root.addEventListener('pointermove', function (event) {
  const next = point(event);
  if (!previous) { previous = next; return; }
  const dx = next.x - previous.x, dy = next.y - previous.y;
  const distance = Math.hypot(dx, dy);
  const elapsed = Math.max(8, next.time - previous.time);
  const velocity = Math.min(1800, distance / elapsed * 1000);
  readout.textContent = String(Math.round(velocity)).padStart(3, '0');
  if (distance >= 3) {
    if (reduced) particles.length = 0;
    const steps = Math.min(12, Math.max(1, Math.floor(distance / 9)));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = previous.x + dx * t, y = previous.y + dy * t;
      const jitter = (Math.random() - 0.5) * 70;
      const impulse = reduced ? 0 : Math.min(260, 28 + velocity * 0.12);
      addParticle(x, y, -dx / distance * impulse + jitter, -dy / distance * impulse + jitter * 0.35,
        0.9 + Math.random() * (velocity > 500 ? 2.4 : 1.3), reduced ? 1 : 0.32 + Math.random() * 0.5,
        velocity > 620 && i % 2 === 0);
    }
    root.classList.add('d-emitter-active');
  }
  previous = next;
  clearTimeout(quietTimer);
  quietTimer = setTimeout(function () { readout.textContent = '000'; }, 140);
}, { passive: true });

root.addEventListener('pointerleave', function () { previous = null; });
root.addEventListener('pointerdown', function (event) {
  const p = point(event); burst(p.x, p.y, 34, 250); status.textContent = 'Burst launched';
}, { passive: true });

button.addEventListener('click', function () {
  burst(width * 0.5, height * 0.48, 48, 285);
  status.textContent = 'Keyboard burst launched';
});

function frame(now) {
  const dt = Math.min(0.032, (now - lastFrame) / 1000); lastFrame = now;
  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'round';
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]; p.px = p.x; p.py = p.y;
    if (!reduced) {
      p.vx *= Math.pow(0.985, dt * 60); p.vy = p.vy * Math.pow(0.992, dt * 60) + 520 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
    }
    if (p.life <= 0 || p.y > height + 18) { particles.splice(i, 1); continue; }
    const alpha = reduced ? 0.82 : Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = p.bright ? '#ececef' : '#c8ff2e';
    ctx.lineWidth = p.size;
    ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x - p.vx * 0.018, p.y - p.vy * 0.018); ctx.stroke();
    ctx.fillStyle = p.bright ? '#ececef' : '#c8ff2e';
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.62, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (!particles.length) root.classList.remove('d-emitter-active');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained cursor particle emitter inside a 320px position-relative root. Use one full-size decorative canvas, a velocity readout, and a real keyboard-focusable “Launch burst” button. Resize the backing canvas to the root bounds, cap devicePixelRatio at 2, and set the drawing transform to DPR so all simulation coordinates remain in CSS pixels.

On pointermove, calculate local coordinates, distance from the previous sample, elapsed milliseconds clamped to at least 8, and velocity = min(1800, distance / elapsed * 1000). Emit one particle for roughly every 9px traveled, capped at 12 per event, interpolating spawn positions along the segment so fast pointer events do not create gaps. Give particles an initial impulse opposite the pointer direction with magnitude min(260, 28 + velocity * 0.12), plus up to ±35px/s lateral jitter. Slow movement creates 0.9–2.2px dust; velocity above 620px/s creates occasional 3.3px white sparks. On pointerdown or button activation, emit 34–48 particles around a full circle with randomized 0.45–1.1 energy multipliers.

Run one requestAnimationFrame loop. Clamp delta time to 32ms, apply exponential horizontal drag pow(0.985, dt * 60), vertical drag pow(0.992, dt * 60), and gravity of 520px/s². Each particle stores its previous position; draw a round line from that point opposite 0.018 times velocity, then a small circular head. Lifetimes range from 0.32–1.0 seconds and alpha equals remainingLife / maxLife. Cap the pool at 220 particles, remove dead or offstage particles in reverse order, cache DOM references, and keep pointer listeners passive.

The canvas must be aria-hidden; announce button and pointer bursts through a polite live region, retain an obvious focus ring, and keep touch input working with touch-action none. Under prefers-reduced-motion, clear the prior field on each interaction, emit at most 12 particles with zero velocity, skip gravity and lifetime decay, and render a representative static constellation instead of moving trails.`
});

/* ------------------------------------------------------------
   Cursor elastic line
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-elastic-line',
  title: 'Cursor Elastic Line',
  cat: 'Cursor',
  rootClass: 'd-elastic',
  tags: ['svg', 'quadratic-bezier', 'spring'],
  libs: [],
  desc: 'A taut SVG cable bends toward the pointer from two fixed anchors. Its quadratic control point carries velocity, overshoots the cursor, and rings back to center when released.',
  seen: 'Seen on: Codrops navigation studies, Locomotive-style portfolio dividers, experimental studio menus',
  hint: 'pull the cable, click to pluck, or use arrow keys',
  html: `
<div class="d-elastic" tabindex="0" role="slider" aria-label="Elastic line tension" aria-valuemin="0" aria-valuemax="99" aria-valuenow="0" aria-valuetext="Tension 0 percent">
  <svg class="d-elastic-svg" viewBox="0 0 800 320" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="d-elastic-gradient" x1="0" x2="1">
        <stop offset="0" stop-color="#5c5c66" />
        <stop offset=".5" stop-color="#c8ff2e" />
        <stop offset="1" stop-color="#5c5c66" />
      </linearGradient>
    </defs>
    <path class="d-elastic-shadow" d="M 72 160 Q 400 160 728 160" />
    <path class="d-elastic-path" d="M 72 160 Q 400 160 728 160" />
    <circle class="d-elastic-anchor" cx="72" cy="160" r="7" />
    <circle class="d-elastic-anchor" cx="728" cy="160" r="7" />
    <circle class="d-elastic-node" cx="400" cy="160" r="5" />
  </svg>
  <div class="d-elastic-meter" aria-hidden="true"><span>TENSION</span><strong>00</strong></div>
  <button class="d-elastic-reset" type="button">Reset tension</button>
  <p class="d-elastic-status" aria-live="polite">Cable centered</p>
</div>`,
  css: `
.d-elastic { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-elastic::before { content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, transparent 49.9%, #161619 50%, transparent 50.1%); }
.d-elastic:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-elastic-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.d-elastic-shadow, .d-elastic-path { fill: none; vector-effect: non-scaling-stroke; }
.d-elastic-shadow { stroke: #c8ff2e; stroke-width: 13; opacity: .08; filter: blur(7px); }
.d-elastic-path { stroke: url(#d-elastic-gradient); stroke-width: 2; stroke-linecap: round;
  stroke-dasharray: 3 7; animation: d-elastic-flow 1.3s linear infinite; }
.d-elastic-anchor { fill: #0a0a0b; stroke: #9b9ba3; stroke-width: 2; vector-effect: non-scaling-stroke; }
.d-elastic-node { fill: #c8ff2e; opacity: .75; vector-effect: non-scaling-stroke; }
.d-elastic-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-elastic-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-elastic-reset { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-elastic-reset:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-elastic-reset:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-elastic-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; pointer-events: none; }
@keyframes d-elastic-flow { to { stroke-dashoffset: -10; } }
@media (prefers-reduced-motion: reduce) { .d-elastic-path { animation: none; } .d-elastic-reset { transition: none; } }`,
  js: `
const path = root.querySelector('.d-elastic-path');
const shadow = root.querySelector('.d-elastic-shadow');
const node = root.querySelector('.d-elastic-node');
const meter = root.querySelector('.d-elastic-meter strong');
const reset = root.querySelector('.d-elastic-reset');
const status = root.querySelector('.d-elastic-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const view = { width: 800, height: 320, left: 72, right: 728, baseY: 160 };
let x = 400, y = 160, tx = 400, ty = 160, vx = 0, vy = 0;
let engaged = false, lastAnnounced = -1;

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return {
    x: (event.clientX - box.left) / Math.max(1, box.width) * view.width,
    y: (event.clientY - box.top) / Math.max(1, box.height) * view.height
  };
}

function setTarget(nextX, nextY, source) {
  tx = Math.max(view.left + 38, Math.min(view.right - 38, nextX));
  ty = Math.max(42, Math.min(view.height - 42, nextY));
  engaged = true;
  if (source) status.textContent = source;
}

function center(message) {
  tx = 400; ty = view.baseY; engaged = false;
  status.textContent = message || 'Cable released';
}

root.addEventListener('pointermove', function (event) {
  const point = localPoint(event);
  setTarget(point.x, point.y, 'Pointer tension');
}, { passive: true });
root.addEventListener('pointerleave', function () { center('Cable released'); });
root.addEventListener('pointerdown', function (event) {
  const point = localPoint(event);
  setTarget(point.x, point.y, 'Cable plucked');
  if (!reduced) vy += point.y < view.baseY ? 68 : -68;
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === 'Home') { center('Cable reset'); return; }
  const step = event.shiftKey ? 34 : 16;
  if (!engaged) { tx = x; ty = y; }
  if (event.key === 'ArrowLeft') tx -= step;
  if (event.key === 'ArrowRight') tx += step;
  if (event.key === 'ArrowUp') ty -= step;
  if (event.key === 'ArrowDown') ty += step;
  setTarget(tx, ty, 'Keyboard tension');
});

reset.addEventListener('click', function () { center('Cable reset'); root.focus(); });

function frame() {
  if (reduced) { x = tx; y = ty; vx = 0; vy = 0; }
  else {
    vx = (vx + (tx - x) * 0.085) * 0.78;
    vy = (vy + (ty - y) * 0.085) * 0.78;
    x += vx; y += vy;
  }
  const d = 'M ' + view.left + ' ' + view.baseY + ' Q ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ' + view.right + ' ' + view.baseY;
  path.setAttribute('d', d); shadow.setAttribute('d', d);
  node.setAttribute('cx', x.toFixed(2)); node.setAttribute('cy', y.toFixed(2));
  const tension = Math.min(99, Math.round(Math.hypot(x - 400, y - view.baseY) / 2.45));
  meter.textContent = String(tension).padStart(2, '0');
  root.setAttribute('aria-valuenow', String(tension));
  if (Math.abs(tension - lastAnnounced) >= 20) {
    root.setAttribute('aria-valuetext', 'Tension ' + tension + ' percent'); lastAnnounced = tension;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained elastic SVG cable in a 320px position-relative root. Use an SVG with a stable 800x320 viewBox, two fixed anchor circles at (72,160) and (728,160), and a quadratic path shaped as M 72 160 Q controlX controlY 728 160. Draw a blurred low-opacity shadow path behind a crisp 2px gradient stroke, plus a small node at the live control point. The path may use a subtle moving 3 7 dash pattern while idle.

Convert pointer coordinates from the root bounding rectangle into viewBox coordinates. Clamp the target control point to x=110–690 and y=42–278. Simulate the rendered control point with a damped spring on each requestAnimationFrame: velocity = (velocity + (target - position) * 0.085) * 0.78, then position += velocity. On pointerleave, return the target to (400,160); retain velocity so the cable overshoots and rings down naturally. On pointerdown, add a 68px/s vertical impulse opposite the side of the baseline that was pressed to create a visible pluck.

Update both path d attributes and the node cx/cy once per frame. Calculate displayed tension as min(99, round(distance(control, baselineCenter) / 2.45)). Cache all elements and bounding-box reads outside the animation loop; use a single rAF and passive pointer listeners. Do not animate layout properties.

Make the root keyboard-focusable with a visible inset focus ring. Arrow keys move the target by 16 viewBox units, Shift+Arrow by 34, Home and a semantic reset button return it to center. Prevent default only for those handled keys, announce the interaction source in a polite live region, and update aria-valuetext only when tension changes by at least 20 points. Under prefers-reduced-motion, disable dash animation and spring interpolation, snapping the control point directly to the target while preserving pointer and keyboard control.`
});

/* ------------------------------------------------------------
   Cursor inverted lens
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-inverted-lens',
  title: 'Cursor Inverted Lens',
  cat: 'Cursor',
  rootClass: 'd-lens',
  tags: ['clip-path', 'duplicate-layer', 'magnification'],
  libs: [],
  desc: 'A circular optical lens follows the pointer over a graphic poster. Inside it, a duplicated scene stays registered to the original while magnifying, inverting, and splitting color like a physical loupe.',
  seen: 'Seen on: Active Theory experiences, Lusion product stories, experimental art-direction portfolios',
  hint: 'move the lens, click zoom, or use arrow keys',
  html: `
<div class="d-lens" tabindex="0" aria-label="Inverted magnifying lens. Use arrow keys to move and Space to change zoom.">
  <div class="d-lens-scene">
    <div class="d-lens-grid" aria-hidden="true"></div>
    <span class="d-lens-kicker">OPTICAL STUDY / 04</span>
    <strong class="d-lens-title">ALTER<br>THE VIEW</strong>
    <i class="d-lens-orb d-lens-orb-one" aria-hidden="true"></i>
    <i class="d-lens-orb d-lens-orb-two" aria-hidden="true"></i>
    <span class="d-lens-coordinate">X 00.50&nbsp;&nbsp;Y 00.50</span>
  </div>
  <div class="d-lens-window" aria-hidden="true"><div class="d-lens-copy"></div></div>
  <div class="d-lens-rim" aria-hidden="true"><i></i></div>
  <button class="d-lens-zoom" type="button" aria-pressed="false">Zoom 1.16×</button>
  <p class="d-lens-status" aria-live="polite">Lens centered</p>
</div>`,
  css: `
.d-lens { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #d8e0d2; color: #0a0a0b; cursor: crosshair; touch-action: none; }
.d-lens:focus-visible { box-shadow: inset 0 0 0 2px #0a0a0b; }
.d-lens-scene, .d-lens-copy { position: absolute; inset: 0; overflow: hidden; background: #d8e0d2; }
.d-lens-grid { position: absolute; inset: -1px; opacity: .42;
  background-image: linear-gradient(#6a716a 1px, transparent 1px), linear-gradient(90deg, #6a716a 1px, transparent 1px);
  background-size: 32px 32px; }
.d-lens-kicker { position: absolute; top: 18px; left: 20px; font: 10px "JetBrains Mono", monospace;
  letter-spacing: .13em; }
.d-lens-title { position: absolute; left: 50%; top: 49%; transform: translate(-50%, -50%);
  font: 700 clamp(48px, 8.5vw, 82px)/.78 "Inter", sans-serif; letter-spacing: -.075em; white-space: nowrap; }
.d-lens-orb { position: absolute; display: block; border-radius: 50%; mix-blend-mode: multiply; }
.d-lens-orb-one { width: 126px; height: 126px; left: 11%; top: 33%; background: #c8ff2e; }
.d-lens-orb-two { width: 92px; height: 92px; right: 10%; top: 23%; background: #ff5d3b; }
.d-lens-coordinate { position: absolute; right: 20px; top: 18px; font: 10px "JetBrains Mono", monospace; }
.d-lens-window { position: absolute; inset: 0; pointer-events: none; will-change: clip-path;
  clip-path: circle(72px at 50% 50%); filter: invert(1) hue-rotate(155deg) saturate(1.35); }
.d-lens-copy { transform-origin: 0 0; will-change: transform; }
.d-lens-rim { position: absolute; left: 0; top: 0; width: 144px; height: 144px; border-radius: 50%;
  border: 1px solid rgba(10,10,11,.62); box-shadow: inset 0 0 0 7px rgba(236,236,239,.14),
  0 12px 34px rgba(10,10,11,.22); pointer-events: none; will-change: transform; }
.d-lens-rim::before, .d-lens-rim::after { content: ''; position: absolute; border-radius: 50%; pointer-events: none; }
.d-lens-rim::before { inset: 9px; border: 1px solid rgba(236,236,239,.42); }
.d-lens-rim::after { width: 32px; height: 12px; left: 22px; top: 18px; background: rgba(255,255,255,.46);
  filter: blur(5px); transform: rotate(-34deg); }
.d-lens-rim i { position: absolute; right: -31px; bottom: -31px; width: 58px; height: 15px;
  border-radius: 999px; background: #0a0a0b; transform: rotate(45deg); transform-origin: left center; }
.d-lens-zoom { position: absolute; left: 20px; bottom: 18px; z-index: 3; border: 1px solid rgba(10,10,11,.38);
  border-radius: 999px; background: rgba(216,224,210,.82); color: #0a0a0b; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; backdrop-filter: blur(8px); }
.d-lens-zoom:hover { background: #0a0a0b; color: #c8ff2e; }
.d-lens-zoom:focus-visible { outline: 2px solid #0a0a0b; outline-offset: 3px; }
.d-lens-status { position: absolute; right: 20px; bottom: 20px; z-index: 3; margin: 0;
  color: #0a0a0b; font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) { .d-lens-window, .d-lens-copy, .d-lens-rim { will-change: auto; } }`,
  js: `
const scene = root.querySelector('.d-lens-scene');
const copy = root.querySelector('.d-lens-copy');
const windowEl = root.querySelector('.d-lens-window');
const rim = root.querySelector('.d-lens-rim');
const coordinate = root.querySelector('.d-lens-coordinate');
const zoomButton = root.querySelector('.d-lens-zoom');
const status = root.querySelector('.d-lens-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
copy.innerHTML = scene.innerHTML;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let x = width * 0.5, y = height * 0.5, tx = x, ty = y;
let zoom = 1.16, strongZoom = false;

function resize() {
  const box = root.getBoundingClientRect();
  const nx = x / Math.max(1, width), ny = y / Math.max(1, height);
  width = Math.max(1, box.width); height = Math.max(1, box.height);
  x = tx = nx * width; y = ty = ny * height;
}
window.addEventListener('resize', resize, { passive: true });

function targetFromEvent(event) {
  const box = root.getBoundingClientRect();
  tx = Math.max(72, Math.min(box.width - 72, event.clientX - box.left));
  ty = Math.max(72, Math.min(box.height - 72, event.clientY - box.top));
}

function toggleZoom(source) {
  strongZoom = !strongZoom; zoom = strongZoom ? 1.35 : 1.16;
  zoomButton.textContent = 'Zoom ' + zoom.toFixed(2) + '×';
  zoomButton.setAttribute('aria-pressed', String(strongZoom));
  status.textContent = source + ' ' + zoom.toFixed(2) + ' times';
}

root.addEventListener('pointerenter', function (event) { targetFromEvent(event); });
root.addEventListener('pointermove', function (event) { targetFromEvent(event); }, { passive: true });
root.addEventListener('pointerleave', function () {
  tx = width * 0.5; ty = height * 0.5; status.textContent = 'Lens centered';
});
root.addEventListener('pointerdown', function (event) {
  if (event.target === zoomButton) return;
  targetFromEvent(event); toggleZoom('Pointer zoom');
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 36 : 18;
  if (event.key === 'ArrowLeft') tx -= step;
  if (event.key === 'ArrowRight') tx += step;
  if (event.key === 'ArrowUp') ty -= step;
  if (event.key === 'ArrowDown') ty += step;
  tx = Math.max(72, Math.min(width - 72, tx)); ty = Math.max(72, Math.min(height - 72, ty));
  if (event.key === ' ') toggleZoom('Keyboard zoom');
  else if (event.key === 'Home') { tx = width * 0.5; ty = height * 0.5; status.textContent = 'Lens centered'; }
  else status.textContent = 'Lens X ' + Math.round(tx / width * 100) + ' Y ' + Math.round(ty / height * 100);
});
zoomButton.addEventListener('click', function () { toggleZoom('Button zoom'); root.focus(); });

function frame() {
  if (reduced) { x = tx; y = ty; }
  else { x += (tx - x) * 0.16; y += (ty - y) * 0.16; }
  const clip = 'circle(72px at ' + x.toFixed(2) + 'px ' + y.toFixed(2) + 'px)';
  windowEl.style.clipPath = clip;
  copy.style.transform = 'translate(' + (x * (1 - zoom)).toFixed(2) + 'px,' + (y * (1 - zoom)).toFixed(2) + 'px) scale(' + zoom + ')';
  rim.style.transform = 'translate(' + (x - 72).toFixed(2) + 'px,' + (y - 72).toFixed(2) + 'px)';
  coordinate.textContent = 'X ' + (x / width).toFixed(2) + '  Y ' + (y / height).toFixed(2);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained inverted magnifying lens over a graphic poster inside a 320px position-relative root. Create one base scene from DOM/CSS only—grid, typography, and colored shapes—then create a full-size lens window containing a cloned copy of that exact scene. Clip the lens window with clip-path circle(72px at x y) and apply invert(1), hue-rotate(155deg), and saturate(1.35). Add a separate 144px circular rim with inset highlights, shadow, and a short rotated handle so the optical boundary stays crisp and uninverted.

Track target pointer coordinates relative to the root, clamped by the 72px lens radius. In one requestAnimationFrame loop, ease rendered coordinates with current += (target - current) * 0.16. Keep the magnified duplicate registered beneath the cursor by transforming it from origin 0 0 with translate(x * (1 - zoom), y * (1 - zoom)) scale(zoom). This invariant ensures the source pixel at the lens center does not slide when zoom changes. Update the outer clip path, duplicate transform, rim translation, and a normalized coordinate label once per frame. Do not read layout in the animation loop.

Clicking the scene, pressing Space, or activating a semantic zoom button toggles between 1.16× and 1.35× magnification and updates aria-pressed. Do not let the button's pointer event also trigger the scene toggle. Arrow keys move the lens target by 18px, Shift+Arrow by 36px, and Home recenters it; prevent default only for handled keys. Return the target to center on pointerleave, retain a visible focus treatment, and announce keyboard position and zoom changes through a polite status region. Use passive pointermove and resize listeners. Under prefers-reduced-motion, snap rendered coordinates directly to target while preserving clipping, magnification, pointer, and keyboard behavior.`
});

/* ------------------------------------------------------------
   Cursor text repel
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-text-repel',
  title: 'Cursor Text Repel',
  cat: 'Cursor',
  rootClass: 'd-repel',
  tags: ['kinetic-type', 'radial-falloff', 'spring'],
  libs: [],
  desc: 'Each glyph is its own spring body. Characters inside the pointer radius accelerate away with a squared falloff, rotate from displacement, and settle precisely back into the word when the field leaves.',
  seen: 'Seen on: Porto Rocha-style type experiments, Studio Freight portfolios, interactive editorial headlines',
  hint: 'push through the word or launch a center pulse',
  html: `
<div class="d-repel" tabindex="0" aria-label="Repelling text field. Use arrow keys to move the force, Space to pulse, or Home to center.">
  <div class="d-repel-word" role="img" aria-label="Make Space">
    <span aria-hidden="true">M</span><span aria-hidden="true">A</span><span aria-hidden="true">K</span><span aria-hidden="true">E</span><i class="d-repel-gap" aria-hidden="true"></i><span aria-hidden="true">S</span><span aria-hidden="true">P</span><span aria-hidden="true">A</span><span aria-hidden="true">C</span><span aria-hidden="true">E</span>
  </div>
  <div class="d-repel-field" aria-hidden="true"><i></i></div>
  <div class="d-repel-meter" aria-hidden="true"><span>FIELD</span><strong>00</strong></div>
  <button class="d-repel-pulse" type="button">Repel center</button>
  <p class="d-repel-status" aria-live="polite">Field ready</p>
</div>`,
  css: `
.d-repel { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-repel:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-repel-word { position: absolute; left: 50%; top: 48%; display: flex; align-items: center;
  transform: translate(-50%, -50%); white-space: nowrap; }
.d-repel-word span { display: inline-block; color: #ececef; font: 700 clamp(42px, 8vw, 76px)/1 "Inter", sans-serif;
  letter-spacing: -.075em; will-change: transform; }
.d-repel-word span:nth-of-type(3n) { color: #c8ff2e; }
.d-repel-gap { display: block; flex: 0 0 clamp(18px, 3.8vw, 38px); }
.d-repel-field { position: absolute; left: 0; top: 0; width: 220px; height: 220px; border-radius: 50%;
  border: 1px solid rgba(200,255,46,.18); pointer-events: none; opacity: 0; will-change: transform, opacity; }
.d-repel-field::before, .d-repel-field::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(200,255,46,.42); transform: translate(-50%, -50%); }
.d-repel-field::before { width: 16px; height: 1px; }
.d-repel-field::after { width: 1px; height: 16px; }
.d-repel-field i { position: absolute; inset: 26px; border: 1px dashed rgba(200,255,46,.16); border-radius: 50%; }
.d-repel.d-repel-active .d-repel-field { opacity: 1; }
.d-repel-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-repel-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-repel-pulse { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-repel-pulse:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-repel-pulse:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-repel-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .d-repel-word span, .d-repel-field { will-change: auto; }
  .d-repel-pulse { transition: none; }
}`,
  js: `
const letters = Array.from(root.querySelectorAll('.d-repel-word span'));
const field = root.querySelector('.d-repel-field');
const meter = root.querySelector('.d-repel-meter strong');
const pulseButton = root.querySelector('.d-repel-pulse');
const status = root.querySelector('.d-repel-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const radius = 110;
let pointer = { x: root.clientWidth * 0.5, y: root.clientHeight * 0.48 };
let active = false, pulse = 1, lastFrame = performance.now();
const bodies = letters.map(function (element) {
  return { element: element, homeX: 0, homeY: 0, x: 0, y: 0, vx: 0, vy: 0, influence: 0 };
});

function measure() {
  const outer = root.getBoundingClientRect();
  bodies.forEach(function (body) {
    const box = body.element.getBoundingClientRect();
    body.homeX = box.left - outer.left + box.width * 0.5 - body.x;
    body.homeY = box.top - outer.top + box.height * 0.5 - body.y;
  });
}
measure();
window.addEventListener('resize', measure, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function engage(x, y, message) {
  pointer.x = Math.max(0, Math.min(root.clientWidth, x));
  pointer.y = Math.max(0, Math.min(root.clientHeight, y));
  active = true; pulse = 1;
  root.classList.add('d-repel-active');
  if (message) status.textContent = message;
}

function release() {
  active = false; pulse = 1; root.classList.remove('d-repel-active'); status.textContent = 'Field released';
}

root.addEventListener('pointermove', function (event) {
  const point = localPoint(event); engage(point.x, point.y, 'Pointer field active');
}, { passive: true });
root.addEventListener('pointerleave', release);
root.addEventListener('pointerdown', function (event) {
  if (event.target === pulseButton) return;
  const point = localPoint(event); engage(point.x, point.y, 'Pointer pulse'); pulse = 1.55;
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home', 'Escape'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === 'Escape') { release(); return; }
  if (event.key === 'Home') { engage(root.clientWidth * 0.5, root.clientHeight * 0.48, 'Field centered'); return; }
  const step = event.shiftKey ? 38 : 20;
  if (event.key === 'ArrowLeft') pointer.x -= step;
  if (event.key === 'ArrowRight') pointer.x += step;
  if (event.key === 'ArrowUp') pointer.y -= step;
  if (event.key === 'ArrowDown') pointer.y += step;
  engage(pointer.x, pointer.y, event.key === ' ' ? 'Keyboard pulse' : 'Keyboard field active');
  if (event.key === ' ') pulse = 1.55;
});

pulseButton.addEventListener('click', function () {
  engage(root.clientWidth * 0.5, root.clientHeight * 0.48, 'Center pulse'); pulse = 1.7; root.focus();
});

function frame(now) {
  const step = Math.min(2, (now - lastFrame) / 16.667); lastFrame = now;
  pulse += (1 - pulse) * (reduced ? 1 : 0.065 * step);
  let strongest = 0;
  bodies.forEach(function (body) {
    const dx = body.homeX + body.x - pointer.x;
    const dy = body.homeY + body.y - pointer.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    let influence = active ? Math.max(0, 1 - distance / (radius * pulse)) : 0;
    const force = influence * influence * 3.1;
    if (reduced) {
      const homeDx = body.homeX - pointer.x, homeDy = body.homeY - pointer.y;
      const homeDistance = Math.max(1, Math.hypot(homeDx, homeDy));
      const homeInfluence = active ? Math.max(0, 1 - homeDistance / (radius * pulse)) : 0;
      influence = homeInfluence;
      body.x = homeDx / homeDistance * homeInfluence * 46;
      body.y = homeDy / homeDistance * homeInfluence * 46;
      body.vx = 0; body.vy = 0;
    } else {
      body.vx = (body.vx + (dx / distance * force - body.x * 0.072) * step) * Math.pow(0.78, step);
      body.vy = (body.vy + (dy / distance * force - body.y * 0.072) * step) * Math.pow(0.78, step);
      body.x += body.vx * step; body.y += body.vy * step;
    }
    strongest = Math.max(strongest, influence);
    body.influence = influence;
    const rotation = Math.max(-13, Math.min(13, body.x * 0.14));
    body.element.style.transform = 'translate(' + body.x.toFixed(2) + 'px,' + body.y.toFixed(2) + 'px) rotate(' + rotation.toFixed(2) + 'deg) scale(' + (1 + influence * 0.12).toFixed(3) + ')';
  });
  field.style.transform = 'translate(' + (pointer.x - radius) + 'px,' + (pointer.y - radius) + 'px) scale(' + pulse.toFixed(3) + ')';
  meter.textContent = String(Math.round(strongest * 99)).padStart(2, '0');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained kinetic headline where each visible character is an independent spring body inside a 320px position-relative root. Render “MAKE SPACE” as inline-block letter spans with a separate flex gap between words and an accessible label on the word container. After layout, measure each letter center relative to the root once, remeasure on resize, and store per-letter displacement, velocity, and home coordinates. Never read layout inside the animation loop.

Track a local pointer or keyboard-controlled force point with a 110px radius. For each character, calculate the vector from the force point to its current center and influence = max(0, 1 - distance / (radius * pulseScale)). Apply squared radial force influence² * 3.1 in the normalized outward direction, plus a home spring of -displacement * 0.072. Per frame, using step = min(2, elapsedMs / 16.667), update velocity = (velocity + acceleration * step) * pow(0.78, step), then displacement += velocity * step. Rotate each glyph by clamp(displacementX * 0.14, -13, 13) degrees and scale it by 1 + influence * 0.12. Use only one transform write per glyph.

Pointermove activates the field; pointerleave removes force but lets springs settle naturally. Pointerdown, Space, or a semantic center-pulse button sets pulseScale to 1.55–1.7, then eases it back to 1 by 0.065 per normalized frame. Arrow keys move the virtual force by 20px, Shift+Arrow by 38px, Home centers it, and Escape releases it. Prevent default only for handled keys, show a focus ring, keep pointer listeners passive, and announce input mode through a polite live region.

Display the force radius as a 220px circular overlay and show the strongest current influence as 00–99. Under prefers-reduced-motion, skip velocity integration: place each affected glyph directly along the normalized outward vector by influence * 46px, keep unaffected glyphs home, and preserve pointer, keyboard, pulse, and accessibility behavior.`
});

/* ------------------------------------------------------------
   Cursor grid ripple
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-grid-ripple',
  title: 'Cursor Grid Ripple',
  cat: 'Cursor',
  rootClass: 'd-ripple',
  tags: ['canvas', 'wavefront', 'dot-grid'],
  libs: [],
  desc: 'Pointer movement drops expanding wavefronts into a precision dot grid. Each passing ring pushes dots radially, flashes them fluorescent, and leaves a soft displacement afterimage that decays behind the wave.',
  seen: 'Seen on: generative studio landing pages, Active Theory transitions, experimental data-visualization interfaces',
  hint: 'draw ripples, click for impact, or press Space',
  html: `
<div class="d-ripple" tabindex="0" aria-label="Interactive dot-grid ripple. Use arrow keys to position the emitter and Space to launch a wave.">
  <canvas class="d-ripple-canvas" aria-hidden="true"></canvas>
  <div class="d-ripple-cursor" aria-hidden="true"><i></i></div>
  <div class="d-ripple-meter" aria-hidden="true"><span>AMPLITUDE</span><strong>00</strong></div>
  <button class="d-ripple-launch" type="button">Launch center wave</button>
  <p class="d-ripple-status" aria-live="polite">Grid standing by</p>
</div>`,
  css: `
.d-ripple { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-ripple:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-ripple-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-ripple-cursor { position: absolute; left: 0; top: 0; width: 34px; height: 34px; border: 1px solid rgba(200,255,46,.32);
  border-radius: 50%; opacity: 0; pointer-events: none; will-change: transform, opacity; }
.d-ripple-cursor::before, .d-ripple-cursor::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(200,255,46,.55); transform: translate(-50%, -50%); }
.d-ripple-cursor::before { width: 8px; height: 1px; }
.d-ripple-cursor::after { width: 1px; height: 8px; }
.d-ripple-cursor i { position: absolute; inset: 5px; border: 1px dashed rgba(200,255,46,.2); border-radius: 50%; }
.d-ripple.d-ripple-active .d-ripple-cursor { opacity: 1; }
.d-ripple-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-ripple-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-ripple-launch { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-ripple-launch:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-ripple-launch:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-ripple-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .d-ripple-cursor { will-change: auto; }
  .d-ripple-launch { transition: none; }
}`,
  js: `
const canvas = root.querySelector('.d-ripple-canvas');
const ctx = canvas.getContext('2d');
const cursor = root.querySelector('.d-ripple-cursor');
const meter = root.querySelector('.d-ripple-meter strong');
const launchButton = root.querySelector('.d-ripple-launch');
const status = root.querySelector('.d-ripple-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = 1, height = 1, dpr = 1, dots = [], waves = [];
let pointer = { x: 0, y: 0 }, previous = null, active = false;
let lastEmit = 0, lastFrame = performance.now();

function buildGrid() {
  const spacing = width < 520 ? 28 : 32;
  const cols = Math.max(8, Math.floor((width - 32) / spacing));
  const rows = Math.max(6, Math.floor((height - 64) / spacing));
  const startX = (width - (cols - 1) * spacing) * 0.5;
  const startY = (height - (rows - 1) * spacing) * 0.5;
  dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push({ x: startX + col * spacing, y: startY + row * spacing,
        ox: 0, oy: 0, energy: 0, row: row, col: col });
    }
  }
}

function resize() {
  const box = root.getBoundingClientRect();
  width = Math.max(1, box.width); height = Math.max(1, box.height);
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); buildGrid();
  if (!pointer.x && !pointer.y) { pointer.x = width * 0.5; pointer.y = height * 0.5; }
}
resize();
window.addEventListener('resize', resize, { passive: true });

function point(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
}

function emit(x, y, power, message) {
  if (reduced) waves = [];
  waves.push({ x: x, y: y, radius: reduced ? 68 : 0, life: 1, power: power });
  if (waves.length > 7) waves.shift();
  active = true; pointer.x = x; pointer.y = y;
  root.classList.add('d-ripple-active');
  if (message) status.textContent = message;
}

root.addEventListener('pointermove', function (event) {
  const next = point(event); pointer.x = next.x; pointer.y = next.y; active = true;
  root.classList.add('d-ripple-active');
  if (previous) {
    const distance = Math.hypot(next.x - previous.x, next.y - previous.y);
    const elapsed = Math.max(8, next.time - previous.time);
    if (distance >= 34 || next.time - lastEmit >= 80) {
      const velocity = Math.min(1200, distance / elapsed * 1000);
      emit(next.x, next.y, Math.min(1.2, 0.55 + velocity / 1000), 'Pointer waves active');
      lastEmit = next.time;
    }
  }
  previous = next;
}, { passive: true });
root.addEventListener('pointerleave', function () {
  previous = null; active = false; root.classList.remove('d-ripple-active'); status.textContent = 'Waves decaying';
});
root.addEventListener('pointerdown', function (event) {
  if (event.target === launchButton) return;
  const p = point(event); emit(p.x, p.y, 1.55, 'Impact wave');
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault(); active = true; root.classList.add('d-ripple-active');
  const step = event.shiftKey ? 40 : 22;
  if (event.key === 'ArrowLeft') pointer.x -= step;
  if (event.key === 'ArrowRight') pointer.x += step;
  if (event.key === 'ArrowUp') pointer.y -= step;
  if (event.key === 'ArrowDown') pointer.y += step;
  if (event.key === 'Home') { pointer.x = width * 0.5; pointer.y = height * 0.5; }
  pointer.x = Math.max(0, Math.min(width, pointer.x)); pointer.y = Math.max(0, Math.min(height, pointer.y));
  if (event.key === ' ') emit(pointer.x, pointer.y, 1.4, 'Keyboard wave');
  else status.textContent = 'Keyboard emitter positioned';
});

launchButton.addEventListener('click', function () {
  emit(width * 0.5, height * 0.5, 1.65, 'Center wave launched'); root.focus();
});

function frame(now) {
  const dt = Math.min(0.032, (now - lastFrame) / 1000); lastFrame = now;
  if (!reduced) {
    waves.forEach(function (wave) {
      wave.radius += (210 + wave.power * 90) * dt; wave.life -= 0.55 * dt;
    });
    waves = waves.filter(function (wave) { return wave.life > 0 && wave.radius < Math.hypot(width, height) + 80; });
  }
  ctx.clearRect(0, 0, width, height);
  let peak = 0;
  dots.forEach(function (dot) {
    let targetX = 0, targetY = 0, targetEnergy = 0;
    waves.forEach(function (wave) {
      const dx = dot.x - wave.x, dy = dot.y - wave.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const thickness = 18 + wave.power * 10;
      const band = Math.exp(-Math.pow((distance - wave.radius) / thickness, 2)) * wave.life * wave.power;
      targetX += dx / distance * band * 17;
      targetY += dy / distance * band * 17;
      targetEnergy = Math.max(targetEnergy, band);
    });
    if (reduced) {
      dot.ox = targetX; dot.oy = targetY; dot.energy = Math.min(1, targetEnergy);
    } else {
      dot.ox += (targetX - dot.ox) * 0.24;
      dot.oy += (targetY - dot.oy) * 0.24;
      dot.energy = Math.max(targetEnergy, dot.energy * Math.pow(0.91, dt * 60));
    }
    peak = Math.max(peak, dot.energy);
    const px = dot.x + dot.ox, py = dot.y + dot.oy;
    ctx.fillStyle = dot.energy > 0.035 ? 'rgba(200,255,46,' + Math.min(1, 0.34 + dot.energy * 0.8) + ')' : '#2e2e34';
    ctx.beginPath(); ctx.arc(px, py, 1.25 + dot.energy * 3.1, 0, Math.PI * 2); ctx.fill();
  });
  cursor.style.transform = 'translate(' + (pointer.x - 17) + 'px,' + (pointer.y - 17) + 'px)';
  meter.textContent = String(Math.round(Math.min(1, peak) * 99)).padStart(2, '0');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained canvas dot-grid ripple inside a 320px position-relative root. Create an evenly centered grid with 32px spacing on desktop and 28px on narrow stages, leaving roughly 32px outer margins. Each dot stores rest position, x/y displacement, and residual energy. Resize the backing canvas to the root, cap devicePixelRatio at 2, keep simulation coordinates in CSS pixels, and rebuild the grid only on resize.

Represent each wave as {x, y, radius, life, power}. Pointer movement emits when travel exceeds 34px or 80ms has elapsed; derive velocity from distance / max(8ms, elapsed), then power = min(1.2, 0.55 + velocity / 1000). Pointerdown, Space, and a semantic center-launch button emit stronger 1.4–1.65 waves. Cap active waves at 7. Each frame clamp dt to 32ms, expand radius by (210 + power * 90)px/s, and reduce life by 0.55/s.

For every dot and wave, calculate distance and a Gaussian ring band: exp(-((distance - radius) / thickness)²) * life * power, where thickness = 18 + power * 10. Add normalized radial displacement * band * 17 and take the maximum band as target brightness. Ease offsets toward target by 0.24 per frame. Preserve a trailing afterimage with energy = max(targetEnergy, energy * pow(0.91, dt * 60)). Draw base dots at 1.25px in #2e2e34; affected dots grow by energy * 3.1px and brighten toward #c8ff2e. Use one rAF loop, cache state, remove dead/offstage waves, and keep pointer listeners passive.

Provide a visible emitter reticle, 00–99 amplitude readout, focus ring, arrow-key positioning (22px, or 40px with Shift), Home centering, Space launch, and polite status announcements. Prevent default only for handled keys and keep the launch button semantic. Under prefers-reduced-motion, keep one static wave at radius 68, do not expand or decay it, and assign displacement/energy directly without temporal easing; new interactions replace the previous static wave.`
});

/* ------------------------------------------------------------
   Cursor hover preview
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-hover-preview',
  title: 'Cursor Hover Preview',
  cat: 'Cursor',
  rootClass: 'd-preview',
  tags: ['hover-preview', 'lerp', 'velocity'],
  libs: [],
  desc: 'Hovering an editorial link summons its own procedural media card beside the pointer. The preview trails with inertia, flips sides near an edge, and banks in the direction of cursor velocity.',
  seen: 'Seen on: Locomotive agency indexes, Studio Freight project lists, contemporary architecture portfolios',
  hint: 'hover or focus a project, then move laterally',
  html: `
<div class="d-preview" aria-label="Project links with cursor-following media previews">
  <div class="d-preview-list">
    <a class="d-preview-link" href="#cursor-hover-preview" data-preview="0"><span>01</span><strong>Field Notes</strong><em>Identity</em></a>
    <a class="d-preview-link" href="#cursor-hover-preview" data-preview="1"><span>02</span><strong>Soft Objects</strong><em>Digital</em></a>
    <a class="d-preview-link" href="#cursor-hover-preview" data-preview="2"><span>03</span><strong>Night Signal</strong><em>Campaign</em></a>
    <a class="d-preview-link" href="#cursor-hover-preview" data-preview="3"><span>04</span><strong>Common Ground</strong><em>Editorial</em></a>
  </div>
  <div class="d-preview-card" aria-hidden="true">
    <div class="d-preview-art"><i></i><b></b></div>
    <div class="d-preview-caption"><span>01 / FIELD NOTES</span><em>VIEW PROJECT</em></div>
  </div>
  <p class="d-preview-status" aria-live="polite">Choose a project</p>
</div>`,
  css: `
.d-preview { position: relative; width: 100%; height: 320px; overflow: hidden; background: #0a0a0b; }
.d-preview-list { position: absolute; left: 7%; right: 7%; top: 38px; }
.d-preview-link { position: relative; z-index: 2; display: grid; grid-template-columns: 34px 1fr auto;
  align-items: center; min-height: 54px; border-bottom: 1px solid #232327; color: #ececef;
  text-decoration: none; transition: color .2s, padding-left .25s cubic-bezier(.22,1,.36,1); }
.d-preview-link:first-child { border-top: 1px solid #232327; }
.d-preview-link span, .d-preview-link em { color: #5c5c66; font: 9px "JetBrains Mono", monospace;
  letter-spacing: .1em; font-style: normal; text-transform: uppercase; }
.d-preview-link strong { font-size: clamp(17px, 3vw, 25px); font-weight: 500; letter-spacing: -.03em; }
.d-preview-link:hover, .d-preview-link:focus-visible { color: #c8ff2e; padding-left: 10px; outline: none; }
.d-preview-link:focus-visible::after { content: ''; position: absolute; inset: 5px -6px; border: 1px solid #c8ff2e; pointer-events: none; }
.d-preview-card { position: absolute; left: 0; top: 0; z-index: 4; width: 178px; height: 128px;
  overflow: hidden; border: 1px solid rgba(236,236,239,.32); border-radius: 3px; background: #161619;
  box-shadow: 0 18px 42px rgba(0,0,0,.42); opacity: 0; pointer-events: none;
  transform-origin: center; will-change: transform, opacity; }
.d-preview-art { position: relative; height: 99px; overflow: hidden;
  background: linear-gradient(135deg, var(--d-preview-a, #c8ff2e), var(--d-preview-b, #304bff)); }
.d-preview-art::before { content: ''; position: absolute; inset: 0; opacity: .34;
  background-image: linear-gradient(rgba(10,10,11,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,11,.45) 1px, transparent 1px);
  background-size: 14px 14px; transform: rotate(var(--d-preview-grid, 0deg)) scale(1.25); }
.d-preview-art::after { content: ''; position: absolute; width: 80px; height: 80px; left: var(--d-preview-x, 48%);
  top: var(--d-preview-y, 46%); border: 12px solid rgba(236,236,239,.74); border-radius: var(--d-preview-radius, 50%);
  transform: translate(-50%, -50%) rotate(var(--d-preview-turn, 0deg)); mix-blend-mode: overlay; }
.d-preview-art i { position: absolute; left: 14px; top: 12px; width: 34px; height: 58px;
  border: 1px solid rgba(10,10,11,.65); transform: rotate(-12deg); }
.d-preview-art b { position: absolute; right: 12px; bottom: 10px; width: 42px; height: 42px;
  background: rgba(10,10,11,.68); border-radius: 50%; mix-blend-mode: multiply; }
.d-preview-caption { height: 29px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 9px; background: #101012; color: #9b9ba3; font: 7px "JetBrains Mono", monospace;
  letter-spacing: .08em; }
.d-preview-caption em { color: #c8ff2e; font-style: normal; }
.d-preview-status { position: absolute; right: 20px; bottom: 16px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-preview-link { transition: none; }
  .d-preview-card { will-change: auto; }
}`,
  js: `
const links = Array.from(root.querySelectorAll('.d-preview-link'));
const card = root.querySelector('.d-preview-card');
const art = root.querySelector('.d-preview-art');
const caption = root.querySelector('.d-preview-caption span');
const status = root.querySelector('.d-preview-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const themes = [
  { a: '#c8ff2e', b: '#304bff', x: '64%', y: '42%', radius: '50%', turn: '0deg', grid: '-8deg' },
  { a: '#ff784f', b: '#6d35ff', x: '38%', y: '58%', radius: '8px', turn: '24deg', grid: '12deg' },
  { a: '#1a2040', b: '#ff315f', x: '70%', y: '60%', radius: '50%', turn: '-18deg', grid: '0deg' },
  { a: '#e8dfc8', b: '#3f8067', x: '44%', y: '38%', radius: '18px', turn: '42deg', grid: '-16deg' }
];
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let x = width * 0.5, y = height * 0.5, tx = x, ty = y;
let rotation = 0, targetRotation = 0, scale = 0.86, opacity = 0;
let visible = false, lastPointer = null;

function resize() {
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
}
window.addEventListener('resize', resize, { passive: true });

function place(rawX, rawY) {
  const cardWidth = 178, cardHeight = 128, gap = 24;
  tx = rawX + gap;
  if (tx + cardWidth > width - 10) tx = rawX - cardWidth - gap;
  tx = Math.max(10, Math.min(width - cardWidth - 10, tx));
  ty = Math.max(10, Math.min(height - cardHeight - 10, rawY - cardHeight * 0.5));
}

function select(link, keyboard, event) {
  const index = Number(link.dataset.preview);
  const theme = themes[index];
  art.style.setProperty('--d-preview-a', theme.a); art.style.setProperty('--d-preview-b', theme.b);
  art.style.setProperty('--d-preview-x', theme.x); art.style.setProperty('--d-preview-y', theme.y);
  art.style.setProperty('--d-preview-radius', theme.radius); art.style.setProperty('--d-preview-turn', theme.turn);
  art.style.setProperty('--d-preview-grid', theme.grid);
  caption.textContent = String(index + 1).padStart(2, '0') + ' / ' + link.querySelector('strong').textContent.toUpperCase();
  visible = true; status.textContent = 'Previewing ' + link.querySelector('strong').textContent;
  if (keyboard) {
    const outer = root.getBoundingClientRect(), box = link.getBoundingClientRect();
    place(box.right - outer.left, box.top - outer.top + box.height * 0.5); targetRotation = 0;
  } else if (event) {
    const outer = root.getBoundingClientRect();
    place(event.clientX - outer.left, event.clientY - outer.top);
  }
}

function hide() { visible = false; targetRotation = 0; status.textContent = 'Choose a project'; }

root.addEventListener('pointermove', function (event) {
  const box = root.getBoundingClientRect();
  const next = { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
  if (lastPointer) {
    const dt = Math.max(8, next.time - lastPointer.time);
    const frameVelocity = (next.x - lastPointer.x) / dt * 16.667;
    targetRotation = Math.max(-11, Math.min(11, frameVelocity * 0.42));
  }
  lastPointer = next; place(next.x, next.y);
}, { passive: true });
root.addEventListener('pointerleave', function () { lastPointer = null; hide(); });

links.forEach(function (link) {
  link.addEventListener('pointerenter', function (event) { select(link, false, event); });
  link.addEventListener('pointerleave', hide);
  link.addEventListener('focus', function () { select(link, true); });
  link.addEventListener('blur', hide);
  link.addEventListener('click', function (event) { event.preventDefault(); });
});

function frame() {
  if (reduced) {
    x = tx; y = ty; rotation = 0; scale = visible ? 1 : 0.92; opacity = visible ? 1 : 0;
  } else {
    x += (tx - x) * 0.14; y += (ty - y) * 0.14;
    rotation += (targetRotation - rotation) * 0.16; targetRotation *= 0.86;
    scale += ((visible ? 1 : 0.86) - scale) * 0.18;
    opacity += ((visible ? 1 : 0) - opacity) * 0.2;
  }
  card.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) rotate(' + rotation.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
  card.style.opacity = opacity.toFixed(3);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained project list whose links reveal a floating media preview inside a 320px position-relative root. Use real focusable links and one reusable 178x128px preview card. Each link selects a distinct procedural artwork theme made from CSS gradients, grids, geometric pseudo-elements, and caption text—no network images. Keep the preview pointer-events none and above the list.

Track pointer coordinates relative to the root. Place the preview 24px to the pointer's right and vertically centered; if it would cross the right edge, flip it to the left. Clamp the final top-left to 10px stage margins. Derive horizontal frame velocity from deltaX / max(8ms, elapsed) * 16.667 and map it to target rotation clamp(velocity * 0.42, -11, 11) degrees.

In one requestAnimationFrame loop, ease x/y toward targets by 0.14, rotation by 0.16 while decaying target rotation by 0.86, scale toward 1 or 0.86 by 0.18, and opacity toward 1 or 0 by 0.2. Write one combined transform and opacity per frame. Cache DOM references, read bounds only in pointer/focus/resize handlers, keep pointermove passive, and clear the preview on pointerleave.

On pointerenter, swap theme variables and caption, then reveal. On pointerleave, hide. On keyboard focus, reveal the same preview positioned beside the focused link using its bounding box; hide on blur. Preserve obvious focus styling, prevent demo links from navigating, and announce the active project through a polite live region. Under prefers-reduced-motion, snap position, scale, and opacity directly and force rotation to zero while preserving hover and focus previews.`
});

/* ------------------------------------------------------------
   Cursor drag ghost
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-drag-ghost',
  title: 'Cursor Drag Ghost',
  cat: 'Cursor',
  rootClass: 'd-ghost',
  tags: ['drag', 'motion-trail', 'inertia'],
  libs: [],
  desc: 'A draggable artifact stamps translucent copies along its path. Faster movement stretches and brightens the ghosts, while release velocity carries the original forward and leaves a final fading wake.',
  seen: 'Seen on: experimental product configurators, playful studio archives, motion-heavy portfolio object browsers',
  hint: 'drag and throw the artifact, or use arrow keys',
  html: `
<div class="d-ghost" aria-label="Draggable artifact with motion ghost trail">
  <canvas class="d-ghost-canvas" aria-hidden="true"></canvas>
  <button class="d-ghost-card" type="button" aria-label="Drag artifact. Arrow keys move it, Space throws it, and Home resets it.">
    <span class="d-ghost-index">OBJ / 08</span>
    <strong>MOVE<br>MATTER</strong>
    <i aria-hidden="true"></i>
  </button>
  <div class="d-ghost-meter" aria-hidden="true"><span>VELOCITY</span><strong>000</strong></div>
  <p class="d-ghost-status" aria-live="polite">Artifact ready</p>
</div>`,
  css: `
.d-ghost { position: relative; width: 100%; height: 320px; overflow: hidden; background: #0a0a0b; }
.d-ghost::before { content: ''; position: absolute; inset: 0; opacity: .32; pointer-events: none;
  background-image: linear-gradient(#232327 1px, transparent 1px), linear-gradient(90deg, #232327 1px, transparent 1px);
  background-size: 40px 40px; }
.d-ghost-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.d-ghost-card { position: absolute; left: 0; top: 0; width: 126px; height: 88px; overflow: hidden;
  border: 1px solid #c8ff2e; border-radius: 3px; background: #c8ff2e; color: #0a0a0b;
  text-align: left; cursor: grab; touch-action: none; user-select: none; will-change: transform;
  box-shadow: 0 14px 34px rgba(0,0,0,.28); }
.d-ghost-card:active { cursor: grabbing; }
.d-ghost-card:focus-visible { outline: 2px solid #ececef; outline-offset: 4px; }
.d-ghost-card::after { content: ''; position: absolute; right: -24px; top: -28px; width: 84px; height: 84px;
  border: 18px solid rgba(10,10,11,.18); border-radius: 50%; }
.d-ghost-index { position: absolute; left: 9px; top: 8px; font: 7px "JetBrains Mono", monospace;
  letter-spacing: .1em; }
.d-ghost-card strong { position: absolute; left: 9px; bottom: 8px; font: 700 19px/.84 "Inter", sans-serif;
  letter-spacing: -.06em; }
.d-ghost-card i { position: absolute; right: 9px; bottom: 9px; width: 17px; height: 17px;
  border: 1px solid #0a0a0b; border-radius: 50%; }
.d-ghost-card i::before { content: ''; position: absolute; left: 50%; top: 50%; width: 7px; height: 1px;
  background: #0a0a0b; transform: translate(-50%, -50%); }
.d-ghost-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-ghost-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-ghost-status { position: absolute; right: 20px; bottom: 18px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) { .d-ghost-card { will-change: auto; } }`,
  js: `
const canvas = root.querySelector('.d-ghost-canvas');
const ctx = canvas.getContext('2d');
const card = root.querySelector('.d-ghost-card');
const meter = root.querySelector('.d-ghost-meter strong');
const status = root.querySelector('.d-ghost-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = 1, height = 1, dpr = 1, cardWidth = 126, cardHeight = 88;
let x = 0, y = 0, vx = 0, vy = 0, angle = 0, dragging = false;
let grabX = 0, grabY = 0, previousPointer = null, lastGhost = null;
let ghosts = [], lastFrame = performance.now();

function clampPosition() {
  x = Math.max(8, Math.min(width - cardWidth - 8, x));
  y = Math.max(8, Math.min(height - cardHeight - 8, y));
}

function resize(first) {
  const box = root.getBoundingClientRect();
  width = Math.max(1, box.width); height = Math.max(1, box.height);
  cardWidth = card.offsetWidth || 126; cardHeight = card.offsetHeight || 88;
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (first) { x = (width - cardWidth) * 0.5; y = (height - cardHeight) * 0.5; }
  clampPosition();
}
resize(true);
window.addEventListener('resize', function () { resize(false); }, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
}

function addGhost(force) {
  if (reduced) return;
  const speed = Math.min(1, Math.hypot(vx, vy) / 900);
  ghosts.push({ x: x, y: y, angle: angle, life: 1, strength: Math.max(speed, force || 0) });
  if (ghosts.length > 20) ghosts.shift();
  lastGhost = { x: x, y: y };
}

function begin(event) {
  const point = localPoint(event); dragging = true;
  grabX = point.x - x; grabY = point.y - y; previousPointer = point;
  vx = 0; vy = 0; addGhost(0.35); status.textContent = 'Dragging artifact';
  if (card.setPointerCapture) card.setPointerCapture(event.pointerId);
}

function move(event) {
  if (!dragging) return;
  const point = localPoint(event), dt = Math.max(8, point.time - previousPointer.time);
  const nextX = Math.max(8, Math.min(width - cardWidth - 8, point.x - grabX));
  const nextY = Math.max(8, Math.min(height - cardHeight - 8, point.y - grabY));
  vx = (nextX - x) / dt * 1000; vy = (nextY - y) / dt * 1000;
  x = nextX; y = nextY; angle = reduced ? 0 : Math.max(-11, Math.min(11, vx * 0.018));
  if (!lastGhost || Math.hypot(x - lastGhost.x, y - lastGhost.y) >= 11) addGhost(0.25);
  previousPointer = point;
}

function end(event) {
  if (!dragging) return;
  dragging = false; previousPointer = null; addGhost(0.4); status.textContent = reduced ? 'Artifact placed' : 'Artifact released';
  if (card.releasePointerCapture && card.hasPointerCapture && card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
  if (reduced) { vx = 0; vy = 0; angle = 0; ghosts = []; }
}

card.addEventListener('pointerdown', begin);
card.addEventListener('pointermove', move, { passive: true });
card.addEventListener('pointerup', end);
card.addEventListener('pointercancel', end);

card.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 46 : 24;
  addGhost(0.35);
  if (event.key === 'ArrowLeft') x -= step;
  if (event.key === 'ArrowRight') x += step;
  if (event.key === 'ArrowUp') y -= step;
  if (event.key === 'ArrowDown') y += step;
  if (event.key === 'Home') { x = (width - cardWidth) * 0.5; y = (height - cardHeight) * 0.5; vx = 0; vy = 0; }
  if (event.key === ' ') { vx = reduced ? 0 : 360; vy = reduced ? 0 : -150; status.textContent = 'Keyboard throw'; }
  else status.textContent = event.key === 'Home' ? 'Artifact reset' : 'Keyboard move';
  clampPosition(); addGhost(0.5);
});

function drawGhost(ghost) {
  const alpha = ghost.life * (0.08 + ghost.strength * 0.2);
  ctx.save();
  ctx.translate(ghost.x + cardWidth * 0.5, ghost.y + cardHeight * 0.5);
  ctx.rotate(ghost.angle * Math.PI / 180);
  ctx.scale(1 + ghost.strength * 0.13, 1 - ghost.strength * 0.045);
  ctx.globalAlpha = alpha; ctx.fillStyle = '#c8ff2e';
  ctx.fillRect(-cardWidth * 0.5, -cardHeight * 0.5, cardWidth, cardHeight);
  ctx.globalAlpha = alpha * 1.4; ctx.fillStyle = '#0a0a0b';
  ctx.fillRect(-cardWidth * 0.5 + 9, cardHeight * 0.5 - 30, 48, 4);
  ctx.fillRect(-cardWidth * 0.5 + 9, cardHeight * 0.5 - 21, 62, 4);
  ctx.restore();
}

function frame(now) {
  const dt = Math.min(0.032, (now - lastFrame) / 1000); lastFrame = now;
  if (!dragging && !reduced) {
    const beforeX = x, beforeY = y;
    x += vx * dt; y += vy * dt;
    vx *= Math.pow(0.91, dt * 60); vy *= Math.pow(0.91, dt * 60);
    if (x < 8 || x > width - cardWidth - 8) { x = Math.max(8, Math.min(width - cardWidth - 8, x)); vx *= -0.34; }
    if (y < 8 || y > height - cardHeight - 8) { y = Math.max(8, Math.min(height - cardHeight - 8, y)); vy *= -0.34; }
    angle += (Math.max(-9, Math.min(9, vx * 0.015)) - angle) * 0.12;
    if (Math.hypot(vx, vy) > 55 && (!lastGhost || Math.hypot(x - lastGhost.x, y - lastGhost.y) >= 10)) addGhost(0.2);
    if (Math.abs(x - beforeX) + Math.abs(y - beforeY) < 0.01) { vx = 0; vy = 0; }
  }
  ctx.clearRect(0, 0, width, height);
  for (let i = ghosts.length - 1; i >= 0; i--) {
    ghosts[i].life -= dt * 1.7;
    if (ghosts[i].life <= 0) ghosts.splice(i, 1); else drawGhost(ghosts[i]);
  }
  card.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) rotate(' + angle.toFixed(2) + 'deg)';
  meter.textContent = String(Math.min(999, Math.round(Math.hypot(vx, vy)))).padStart(3, '0');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained draggable artifact with motion-blur ghost copies inside a 320px position-relative root. Use a real 126x88px button as the draggable object and a full-stage decorative canvas behind it for trails. Resize the canvas to the root, cap devicePixelRatio at 2, and keep coordinates in CSS pixels. The card should use pointer capture so dragging remains stable outside its bounds.

On pointerdown, store the grab offset and reset velocity. During pointermove, clamp the card to 8px stage margins, derive velocity in px/s from position delta / max(8ms, elapsed), move directly with the pointer, and rotate by clamp(vx * 0.018, -11, 11) degrees. Stamp a ghost whenever travel since the last stamp reaches 11px. Each snapshot stores x, y, angle, life=1, and strength=max(min(speed/900,1), minimumForce). Cap the trail at 20 snapshots.

After release, integrate velocity with dt capped at 32ms, damp each component by pow(0.91, dt*60), and bounce at boundaries with restitution 0.34. Keep stamping every 10px while speed exceeds 55px/s. Ease angle toward clamp(vx*0.015,-9,9) by 0.12. Fade ghosts by 1.7 life units/s. Draw each copy translated and rotated like the card, stretched horizontally by 1 + strength*0.13 and compressed vertically by strength*0.045, using low-alpha #c8ff2e plus a couple of dark graphic bars. Use one rAF and clear/redraw the trail each frame.

Arrow keys move by 24px, Shift+Arrow by 46px, Home centers, and Space applies a 360px/s horizontal and -150px/s vertical throw. Prevent default only for handled keys, retain a strong focus ring, expose a live velocity readout, and announce drag/release/keyboard states. Under prefers-reduced-motion, move directly without rotation, inertia, or ghost creation; pointer and keyboard placement must remain functional.`
});

/* ------------------------------------------------------------
   Cursor eyes follow
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-eyes-follow',
  title: 'Cursor Eyes Follow',
  cat: 'Cursor',
  rootClass: 'd-eyes',
  tags: ['atan2', 'character', 'micro-interaction'],
  libs: [],
  desc: 'A graphic character watches the pointer with two independently eased pupils constrained to elliptical sockets. The head leans subtly into the gaze, and clicks trigger a tactile synchronized blink.',
  seen: 'Seen on: playful agency about pages, character-led product onboarding, interactive children’s editorial sites',
  hint: 'move to be watched, click or press Space to blink',
  html: `
<div class="d-eyes" tabindex="0" aria-label="Character whose eyes follow the pointer. Arrow keys move its gaze and Space blinks.">
  <div class="d-eyes-head" aria-hidden="true">
    <i class="d-eyes-ear d-eyes-ear-left"></i><i class="d-eyes-ear d-eyes-ear-right"></i>
    <div class="d-eyes-brow d-eyes-brow-left"></div><div class="d-eyes-brow d-eyes-brow-right"></div>
    <div class="d-eyes-eye d-eyes-eye-left">
      <span class="d-eyes-pupil"><i></i></span><b class="d-eyes-lid"></b>
    </div>
    <div class="d-eyes-eye d-eyes-eye-right">
      <span class="d-eyes-pupil"><i></i></span><b class="d-eyes-lid"></b>
    </div>
    <div class="d-eyes-nose"></div><div class="d-eyes-mouth"></div>
  </div>
  <div class="d-eyes-readout" aria-hidden="true"><span>GAZE</span><strong>0°</strong></div>
  <button class="d-eyes-blink" type="button">Blink now</button>
  <p class="d-eyes-status" aria-live="polite">Gaze centered</p>
</div>`,
  css: `
.d-eyes { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #e4dac7; color: #0a0a0b; touch-action: none; }
.d-eyes::before { content: 'LOOK / 09'; position: absolute; left: 20px; top: 18px;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; }
.d-eyes:focus-visible { box-shadow: inset 0 0 0 2px #0a0a0b; }
.d-eyes-head { position: absolute; left: 50%; top: 47%; width: 250px; height: 178px;
  transform: translate(-50%, -50%); border: 2px solid #0a0a0b; border-radius: 48% 48% 43% 43%;
  background: #c8ff2e; box-shadow: 9px 10px 0 #0a0a0b; will-change: transform; }
.d-eyes-ear { position: absolute; top: 66px; width: 27px; height: 45px; border: 2px solid #0a0a0b;
  background: #ff784f; z-index: -1; }
.d-eyes-ear-left { left: -22px; border-radius: 20px 0 0 20px; }
.d-eyes-ear-right { right: -22px; border-radius: 0 20px 20px 0; }
.d-eyes-eye { position: absolute; top: 58px; width: 72px; height: 52px; overflow: hidden;
  border: 2px solid #0a0a0b; border-radius: 50%; background: #ececef; }
.d-eyes-eye-left { left: 41px; }
.d-eyes-eye-right { right: 41px; }
.d-eyes-pupil { position: absolute; left: 50%; top: 50%; width: 25px; height: 25px;
  margin: -12.5px 0 0 -12.5px; border-radius: 50%; background: #0a0a0b; will-change: transform; }
.d-eyes-pupil i { position: absolute; width: 7px; height: 7px; left: 5px; top: 4px; border-radius: 50%; background: #ececef; }
.d-eyes-lid { position: absolute; inset: -2px; display: block; background: #c8ff2e;
  border-bottom: 2px solid #0a0a0b; transform: translateY(-105%); }
.d-eyes.d-eyes-blinking .d-eyes-lid { animation: d-eyes-blink .28s cubic-bezier(.4,0,.2,1); }
.d-eyes-brow { position: absolute; top: 39px; width: 55px; height: 8px; border-top: 3px solid #0a0a0b; }
.d-eyes-brow-left { left: 49px; transform: rotate(-5deg); }
.d-eyes-brow-right { right: 49px; transform: rotate(5deg); }
.d-eyes-nose { position: absolute; left: 50%; top: 96px; width: 13px; height: 22px;
  border: 2px solid #0a0a0b; border-top: 0; transform: translateX(-50%) skewX(-8deg); }
.d-eyes-mouth { position: absolute; left: 50%; bottom: 22px; width: 54px; height: 18px;
  border-bottom: 3px solid #0a0a0b; border-radius: 0 0 50% 50%; transform: translateX(-50%); }
.d-eyes-readout { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; }
.d-eyes-readout strong { font-size: 20px; font-weight: 500; letter-spacing: 0; }
.d-eyes-blink { position: absolute; left: 20px; bottom: 18px; border: 1px solid rgba(10,10,11,.46);
  border-radius: 999px; background: rgba(228,218,199,.82); color: #0a0a0b; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; }
.d-eyes-blink:hover { background: #0a0a0b; color: #c8ff2e; }
.d-eyes-blink:focus-visible { outline: 2px solid #0a0a0b; outline-offset: 3px; }
.d-eyes-status { position: absolute; right: 20px; bottom: 20px; margin: 0;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@keyframes d-eyes-blink { 0%, 100% { transform: translateY(-105%); } 43%, 58% { transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .d-eyes-head, .d-eyes-pupil { will-change: auto; }
  .d-eyes.d-eyes-blinking .d-eyes-lid { animation-duration: .08s; }
}`,
  js: `
const head = root.querySelector('.d-eyes-head');
const eyes = Array.from(root.querySelectorAll('.d-eyes-eye'));
const pupils = Array.from(root.querySelectorAll('.d-eyes-pupil'));
const readout = root.querySelector('.d-eyes-readout strong');
const blinkButton = root.querySelector('.d-eyes-blink');
const status = root.querySelector('.d-eyes-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let target = { x: width * 0.5, y: height * 0.47 }, active = false;
let centers = [], blinkTimer = null, autoTimer = null;
const gaze = pupils.map(function () { return { x: 0, y: 0 }; });

function measure() {
  const outer = root.getBoundingClientRect();
  width = Math.max(1, outer.width); height = Math.max(1, outer.height);
  centers = eyes.map(function (eye) {
    const box = eye.getBoundingClientRect();
    return { x: box.left - outer.left + box.width * 0.5, y: box.top - outer.top + box.height * 0.5 };
  });
}
measure();
window.addEventListener('resize', measure, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function blink(message) {
  clearTimeout(blinkTimer); root.classList.remove('d-eyes-blinking');
  void root.offsetWidth;
  root.classList.add('d-eyes-blinking');
  blinkTimer = setTimeout(function () { root.classList.remove('d-eyes-blinking'); }, reduced ? 100 : 320);
  if (message) status.textContent = message;
}

function scheduleBlink() {
  if (reduced) return;
  clearTimeout(autoTimer);
  autoTimer = setTimeout(function () { blink(''); scheduleBlink(); }, 1900 + Math.random() * 2300);
}
scheduleBlink();

root.addEventListener('pointermove', function (event) {
  target = localPoint(event); active = true; status.textContent = 'Tracking pointer';
}, { passive: true });
root.addEventListener('pointerleave', function () {
  target.x = width * 0.5; target.y = height * 0.47; active = false; status.textContent = 'Gaze centered';
});
root.addEventListener('pointerdown', function (event) {
  if (event.target === blinkButton) return;
  target = localPoint(event); active = true; blink('Pointer blink');
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 42 : 24;
  if (event.key === 'ArrowLeft') target.x -= step;
  if (event.key === 'ArrowRight') target.x += step;
  if (event.key === 'ArrowUp') target.y -= step;
  if (event.key === 'ArrowDown') target.y += step;
  if (event.key === 'Home') { target.x = width * 0.5; target.y = height * 0.47; }
  target.x = Math.max(0, Math.min(width, target.x)); target.y = Math.max(0, Math.min(height, target.y));
  active = event.key !== 'Home';
  if (event.key === ' ') blink('Keyboard blink');
  else status.textContent = event.key === 'Home' ? 'Gaze centered' : 'Keyboard gaze';
});

blinkButton.addEventListener('click', function () { blink('Button blink'); root.focus(); });

function frame() {
  let displayedAngle = 0;
  centers.forEach(function (center, index) {
    const dx = target.x - center.x, dy = target.y - center.y;
    const angle = Math.atan2(dy, dx);
    const reach = Math.min(14, Math.hypot(dx, dy) * 0.085);
    const desiredX = active ? Math.cos(angle) * reach : 0;
    const desiredY = active ? Math.sin(angle) * reach * 0.68 : 0;
    const ease = index === 0 ? 0.18 : 0.145;
    if (reduced) { gaze[index].x = desiredX; gaze[index].y = desiredY; }
    else {
      gaze[index].x += (desiredX - gaze[index].x) * ease;
      gaze[index].y += (desiredY - gaze[index].y) * ease;
    }
    pupils[index].style.transform = 'translate(' + gaze[index].x.toFixed(2) + 'px,' + gaze[index].y.toFixed(2) + 'px)';
    displayedAngle += active ? angle : 0;
  });
  displayedAngle = displayedAngle / Math.max(1, centers.length) * 180 / Math.PI;
  const normalizedX = Math.max(-1, Math.min(1, (target.x / width - 0.5) * 2));
  const normalizedY = Math.max(-1, Math.min(1, (target.y / height - 0.5) * 2));
  const headX = active ? normalizedX * 5 : 0, headY = active ? normalizedY * 3 : 0;
  const headAngle = active && !reduced ? normalizedX * 2.2 : 0;
  head.style.transform = 'translate(calc(-50% + ' + headX.toFixed(2) + 'px), calc(-50% + ' + headY.toFixed(2) + 'px)) rotate(' + headAngle.toFixed(2) + 'deg)';
  readout.textContent = Math.round(displayedAngle) + '°';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained two-eye character inside a 320px position-relative root. Create a graphic head, two elliptical white eye sockets, and one circular pupil per eye. Add eyelid elements above the pupils and a semantic “Blink now” button. After layout, measure each eye center relative to the root once and remeasure on resize; do not read layout in the animation loop.

For each eye, compute dx/dy from its center to the target and angle = atan2(dy, dx). Set reach = min(14, hypot(dx,dy) * 0.085), desiredX = cos(angle) * reach, and desiredY = sin(angle) * reach * 0.68 so pupils remain inside elliptical sockets. Ease the left pupil by 0.18 and right pupil by 0.145 per frame for subtle organic asymmetry. Apply each result as a translate transform. Lean the head by up to 5px x, 3px y, and 2.2 degrees from normalized target position, and show the mean gaze angle.

Pointermove updates local target coordinates; pointerleave returns to the visual center. Pointerdown, Space, or the button retriggers a synchronized 280ms CSS eyelid animation that closes around 43–58% of its timeline. Include occasional idle blinks every random 1.9–4.2 seconds but do not announce automatic blinks. Arrow keys move the virtual gaze by 24px, Shift+Arrow by 42px, and Home centers it. Prevent default only for handled keys, keep pointermove passive, show focus styles, and announce user-triggered blink/gaze states through a polite live region.

Use one requestAnimationFrame loop and transform-only writes. Under prefers-reduced-motion, disable automatic blinks, snap pupils directly to desired offsets, remove head rotation, and shorten user-triggered eyelid closure to about 80ms while preserving pointer and keyboard control.`
});

/* ------------------------------------------------------------
   Cursor liquid metaball
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-liquid-metaball',
  title: 'Cursor Liquid Metaball',
  cat: 'Cursor',
  rootClass: 'd-metaball',
  tags: ['blur-contrast', 'metaballs', 'proximity'],
  libs: [],
  desc: 'Six fluorescent masses become one liquid silhouette through blur-and-contrast thresholding. A springy pointer mass pulls nearby orbiters out of formation until their soft edges bridge and fuse.',
  seen: 'Seen on: Lusion experiments, Resn campaign sites, generative product and music experiences',
  hint: 'move through the fluid, click or press Space to pulse',
  html: `
<div class="d-metaball" tabindex="0" aria-label="Interactive liquid metaballs. Arrow keys move the attractor and Space pulses the fluid.">
  <div class="d-metaball-field" aria-hidden="true">
    <i class="d-metaball-cursor"></i>
    <i class="d-metaball-orb"></i><i class="d-metaball-orb"></i><i class="d-metaball-orb"></i>
    <i class="d-metaball-orb"></i><i class="d-metaball-orb"></i><i class="d-metaball-orb"></i>
  </div>
  <div class="d-metaball-contours" aria-hidden="true"><i></i><i></i><i></i></div>
  <span class="d-metaball-label">LIQUID / THRESHOLD</span>
  <div class="d-metaball-meter" aria-hidden="true"><span>COHESION</span><strong>00</strong></div>
  <button class="d-metaball-pulse" type="button">Pulse fluid</button>
  <p class="d-metaball-status" aria-live="polite">Fluid orbiting</p>
</div>`,
  css: `
.d-metaball { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-metaball:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-metaball-field { position: absolute; inset: -16px; overflow: hidden; background: #0a0a0b;
  filter: blur(11px) contrast(20); }
.d-metaball-cursor, .d-metaball-orb { position: absolute; left: 0; top: 0; display: block;
  border-radius: 50%; background: #c8ff2e; will-change: transform; }
.d-metaball-cursor { z-index: 2; }
.d-metaball-contours { position: absolute; left: 50%; top: 48%; width: 230px; height: 230px;
  transform: translate(-50%, -50%); pointer-events: none; opacity: .22; }
.d-metaball-contours i { position: absolute; border: 1px solid #5c5c66; border-radius: 50%; }
.d-metaball-contours i:nth-child(1) { inset: 0; }
.d-metaball-contours i:nth-child(2) { inset: 31px; border-style: dashed; }
.d-metaball-contours i:nth-child(3) { inset: 67px; }
.d-metaball-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-metaball-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-metaball-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-metaball-pulse { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-metaball-pulse:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-metaball-pulse:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-metaball-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-metaball-cursor, .d-metaball-orb { will-change: auto; }
  .d-metaball-pulse { transition: none; }
}`,
  js: `
const cursorBlob = root.querySelector('.d-metaball-cursor');
const orbElements = Array.from(root.querySelectorAll('.d-metaball-orb'));
const meter = root.querySelector('.d-metaball-meter strong');
const pulseButton = root.querySelector('.d-metaball-pulse');
const status = root.querySelector('.d-metaball-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const specs = [
  { size: 72, phase: 0.1, speed: 0.72, rx: 118, ry: 62 },
  { size: 54, phase: 1.2, speed: -0.9, rx: 92, ry: 82 },
  { size: 64, phase: 2.3, speed: 0.58, rx: 138, ry: 45 },
  { size: 46, phase: 3.5, speed: -0.66, rx: 70, ry: 92 },
  { size: 58, phase: 4.45, speed: 0.83, rx: 128, ry: 70 },
  { size: 42, phase: 5.4, speed: -1.02, rx: 102, ry: 54 }
];
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let x = width * 0.5, y = height * 0.48, tx = x, ty = y, vx = 0, vy = 0;
let active = false, pulse = 1, start = performance.now();

orbElements.forEach(function (orb, index) {
  orb.style.width = specs[index].size + 'px'; orb.style.height = specs[index].size + 'px';
});
cursorBlob.style.width = '66px'; cursorBlob.style.height = '66px';

function resize() {
  const oldWidth = width, oldHeight = height;
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  x = tx = x / Math.max(1, oldWidth) * width; y = ty = y / Math.max(1, oldHeight) * height;
}
window.addEventListener('resize', resize, { passive: true });

function point(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function setTarget(nextX, nextY, message) {
  tx = Math.max(28, Math.min(width - 28, nextX)); ty = Math.max(28, Math.min(height - 28, nextY));
  active = true; if (message) status.textContent = message;
}

function pulseFluid(message, amount) {
  pulse = amount || 1.5; if (message) status.textContent = message;
}

root.addEventListener('pointermove', function (event) {
  const p = point(event); setTarget(p.x, p.y, 'Pointer attracting fluid');
}, { passive: true });
root.addEventListener('pointerleave', function () {
  tx = width * 0.5; ty = height * 0.48; active = false; if (reduced) pulse = 1; status.textContent = 'Fluid orbiting';
});
root.addEventListener('pointerdown', function (event) {
  if (event.target === pulseButton) return;
  const p = point(event); setTarget(p.x, p.y, 'Pointer pulse'); pulseFluid('', 1.55);
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 42 : 24;
  if (event.key === 'ArrowLeft') tx -= step;
  if (event.key === 'ArrowRight') tx += step;
  if (event.key === 'ArrowUp') ty -= step;
  if (event.key === 'ArrowDown') ty += step;
  if (event.key === 'Home') { tx = width * 0.5; ty = height * 0.48; active = false; pulse = 1; }
  tx = Math.max(28, Math.min(width - 28, tx)); ty = Math.max(28, Math.min(height - 28, ty));
  if (event.key === ' ') { active = true; pulseFluid('Keyboard fluid pulse', 1.55); }
  else status.textContent = event.key === 'Home' ? 'Fluid centered' : 'Keyboard attractor';
});

pulseButton.addEventListener('click', function () {
  setTarget(width * 0.5, height * 0.48, 'Center fluid pulse'); pulseFluid('', 1.68); root.focus();
});

function frame(now) {
  const time = reduced ? 0 : (now - start) / 1000;
  if (reduced) { x = tx; y = ty; vx = 0; vy = 0; }
  else {
    vx = (vx + (tx - x) * 0.075) * 0.8; vy = (vy + (ty - y) * 0.075) * 0.8;
    x += vx; y += vy; pulse += (1 - pulse) * 0.055;
  }
  let strongest = 0;
  orbElements.forEach(function (orb, index) {
    const spec = specs[index];
    const baseX = width * 0.5 + Math.cos(time * spec.speed + spec.phase) * Math.min(spec.rx, width * 0.29);
    const baseY = height * 0.48 + Math.sin(time * spec.speed * 1.17 + spec.phase) * spec.ry;
    const dx = x - baseX, dy = y - baseY, distance = Math.hypot(dx, dy);
    const attraction = active ? Math.max(0, 1 - distance / 190) : 0;
    const merge = attraction * attraction * 0.72;
    strongest = Math.max(strongest, attraction);
    const orbX = baseX + dx * merge, orbY = baseY + dy * merge;
    const scale = pulse * (1 + attraction * 0.16);
    orb.style.transform = 'translate(' + (orbX - spec.size * 0.5).toFixed(2) + 'px,' + (orbY - spec.size * 0.5).toFixed(2) + 'px) scale(' + scale.toFixed(3) + ')';
  });
  const cursorScale = (active ? 1 : 0.62) * pulse;
  cursorBlob.style.transform = 'translate(' + (x - 33).toFixed(2) + 'px,' + (y - 33).toFixed(2) + 'px) scale(' + cursorScale.toFixed(3) + ')';
  meter.textContent = String(Math.round(strongest * 99)).padStart(2, '0');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained liquid metaball field inside a 320px position-relative root. Put one pointer mass and six orbiting circular masses inside a full-stage layer with a dark background. Apply blur(11px) contrast(20) to that entire layer so nearby fluorescent shapes cross the alpha threshold and become one crisp liquid silhouette. Keep labels, controls, contour guides, and focus treatment outside the filtered layer.

Give the six orbiters distinct sizes from 42–72px, phase offsets, signed angular speeds around 0.58–1.02, and elliptical radii. Each frame, calculate baseX = centerX + cos(time*speed + phase)*rx and baseY = centerY + sin(time*speed*1.17 + phase)*ry. For the spring-following pointer mass, update velocity = (velocity + (target-position)*0.075)*0.8, then position += velocity. For each orb, attraction = active ? max(0,1-distanceToPointer/190) : 0, merge = attraction²*0.72, and final position = base + (pointer-base)*merge. Scale by pulse*(1 + attraction*0.16) and show maximum attraction as 00–99 cohesion.

Pointermove sets a clamped target, pointerleave returns it to center and disables attraction, and pointerdown pulses scale to 1.55. Ease pulse back to 1 by 0.055 per frame. Arrow keys move the target by 24px, Shift+Arrow by 42px, Home centers, Space pulses, and a semantic button launches a 1.68 center pulse. Prevent default only for handled keys, ignore button pointerdown in the stage handler, use passive pointer/resize listeners, maintain a strong focus ring, and announce input states.

Use a single requestAnimationFrame loop and transform-only writes. Under prefers-reduced-motion, freeze orbit time at zero, snap the pointer mass directly to its target, disable pulse interpolation, but preserve proximity merging, keyboard movement, and the blur/contrast liquid threshold.`
});

/* ------------------------------------------------------------
   Cursor rope trail
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-rope-trail',
  title: 'Cursor Rope Trail',
  cat: 'Cursor',
  rootClass: 'd-rope',
  tags: ['verlet', 'constraints', 'canvas'],
  libs: [],
  desc: 'A 22-point chain hangs from the pointer and solves its own slack through Verlet integration. Repeated distance constraints keep every link taut while gravity, retained velocity, and throws produce believable sway.',
  seen: 'Seen on: creative coding portfolios, physics-led product playgrounds, interactive exhibition identities',
  hint: 'drag the anchor, click to shake, or use arrow keys',
  html: `
<div class="d-rope" tabindex="0" aria-label="Pointer-controlled rope trail. Arrow keys move its anchor and Space shakes the rope.">
  <canvas class="d-rope-canvas" aria-hidden="true"></canvas>
  <span class="d-rope-label">VERLET / 22 LINKS</span>
  <div class="d-rope-meter" aria-hidden="true"><span>SWAY</span><strong>00</strong></div>
  <button class="d-rope-shake" type="button">Shake rope</button>
  <p class="d-rope-status" aria-live="polite">Rope drifting</p>
</div>`,
  css: `
.d-rope { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-rope::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .35;
  background: radial-gradient(circle at 50% 42%, #1d2018 0, #0a0a0b 58%); }
.d-rope:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-rope-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-rope-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-rope-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-rope-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-rope-shake { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-rope-shake:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-rope-shake:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-rope-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) { .d-rope-shake { transition: none; } }`,
  js: `
const canvas = root.querySelector('.d-rope-canvas');
const ctx = canvas.getContext('2d');
const meter = root.querySelector('.d-rope-meter strong');
const shakeButton = root.querySelector('.d-rope-shake');
const status = root.querySelector('.d-rope-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const count = 22, segmentLength = 11;
let width = 1, height = 1, dpr = 1, points = [];
let target = { x: 0, y: 0 }, active = false, reducedBend = 1;
let lastFrame = performance.now(), elapsed = 0;

function resetRope() {
  target.x = width * 0.5; target.y = Math.min(84, height * 0.28);
  points = [];
  for (let i = 0; i < count; i++) {
    const px = target.x + Math.sin(i * 0.32) * i * 0.55;
    const py = Math.min(height - 10, target.y + i * segmentLength);
    points.push({ x: px, y: py, oldX: px, oldY: py });
  }
}

function resize(first) {
  const box = root.getBoundingClientRect();
  width = Math.max(1, box.width); height = Math.max(1, box.height);
  dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (first || !points.length) resetRope();
  else {
    target.x = Math.max(8, Math.min(width - 8, target.x)); target.y = Math.max(8, Math.min(height - 8, target.y));
    points.forEach(function (point) { point.x = Math.max(4, Math.min(width - 4, point.x)); point.y = Math.max(4, Math.min(height - 4, point.y)); });
  }
}
resize(true);
window.addEventListener('resize', function () { resize(false); }, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function setTarget(x, y, message) {
  target.x = Math.max(8, Math.min(width - 8, x)); target.y = Math.max(8, Math.min(height - 8, y));
  active = true; if (message) status.textContent = message;
}

function shake(message) {
  if (reduced) { reducedBend *= -1; if (message) status.textContent = message; return; }
  points.forEach(function (point, index) {
    if (!index) return;
    point.oldX -= Math.sin(index * 1.73) * (6 + index * 0.22);
    point.oldY += Math.cos(index * 1.17) * 3.5;
  });
  if (message) status.textContent = message;
}

root.addEventListener('pointermove', function (event) {
  const p = localPoint(event); setTarget(p.x, p.y, 'Pointer towing rope');
}, { passive: true });
root.addEventListener('pointerleave', function () { active = false; status.textContent = 'Rope drifting'; });
root.addEventListener('pointerdown', function (event) {
  if (event.target === shakeButton) return;
  const p = localPoint(event); setTarget(p.x, p.y, 'Pointer shake'); shake('Pointer shake');
}, { passive: true });

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 42 : 24;
  if (event.key === 'ArrowLeft') target.x -= step;
  if (event.key === 'ArrowRight') target.x += step;
  if (event.key === 'ArrowUp') target.y -= step;
  if (event.key === 'ArrowDown') target.y += step;
  if (event.key === 'Home') { target.x = width * 0.5; target.y = Math.min(84, height * 0.28); active = false; }
  target.x = Math.max(8, Math.min(width - 8, target.x)); target.y = Math.max(8, Math.min(height - 8, target.y));
  if (event.key === ' ') shake('Keyboard rope shake');
  else status.textContent = event.key === 'Home' ? 'Rope centered' : 'Keyboard towing rope';
  if (event.key !== 'Home') active = true;
});

shakeButton.addEventListener('click', function () { shake('Button rope shake'); root.focus(); });

function solveVerlet(step) {
  points[0].x = target.x; points[0].y = target.y;
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    const velocityX = (point.x - point.oldX) * Math.pow(0.985, step);
    const velocityY = (point.y - point.oldY) * Math.pow(0.985, step);
    point.oldX = point.x; point.oldY = point.y;
    point.x += velocityX; point.y += velocityY + 0.34 * step;
  }
  for (let iteration = 0; iteration < 5; iteration++) {
    points[0].x = target.x; points[0].y = target.y;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y, distance = Math.max(0.001, Math.hypot(dx, dy));
      const correction = (distance - segmentLength) / distance;
      if (i === 0) { b.x -= dx * correction; b.y -= dy * correction; }
      else {
        const half = correction * 0.5;
        a.x += dx * half; a.y += dy * half; b.x -= dx * half; b.y -= dy * half;
      }
    }
  }
  points.forEach(function (point, index) {
    if (!index) return;
    point.x = Math.max(4, Math.min(width - 4, point.x)); point.y = Math.max(4, Math.min(height - 4, point.y));
  });
}

function solveReduced() {
  const available = Math.min(segmentLength * (count - 1), height - target.y - 10);
  points.forEach(function (point, index) {
    const t = index / (count - 1);
    point.x = Math.max(4, Math.min(width - 4, target.x + Math.sin(t * Math.PI) * 28 * reducedBend));
    point.y = Math.max(4, Math.min(height - 4, target.y + t * Math.max(30, available)));
    point.oldX = point.x; point.oldY = point.y;
  });
}

function drawRope() {
  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(200,255,46,.13)'; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) * 0.5, midY = (points[i].y + points[i + 1].y) * 0.5;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y); ctx.stroke();
  ctx.strokeStyle = '#c8ff2e'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) * 0.5, midY = (points[i].y + points[i + 1].y) * 0.5;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y); ctx.stroke();
  points.forEach(function (point, index) {
    if (index % 3 && index !== points.length - 1) return;
    ctx.fillStyle = index === 0 ? '#ececef' : '#0a0a0b';
    ctx.strokeStyle = '#c8ff2e'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(point.x, point.y, index === 0 ? 5 : 3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  });
}

function frame(now) {
  const step = Math.min(2, (now - lastFrame) / 16.667); lastFrame = now; elapsed += step / 60;
  if (!active && !reduced) {
    target.x = width * 0.5 + Math.sin(elapsed * 0.8) * Math.min(34, width * 0.08);
    target.y = Math.min(84, height * 0.28) + Math.cos(elapsed * 0.62) * 8;
  }
  if (reduced) solveReduced(); else solveVerlet(step);
  let speed = 0;
  for (let i = 1; i < points.length; i++) speed += Math.hypot(points[i].x - points[i].oldX, points[i].y - points[i].oldY);
  meter.textContent = String(Math.min(99, Math.round(speed / (points.length - 1) * 12))).padStart(2, '0');
  drawRope(); requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained 22-point Verlet rope trailing from a pointer-controlled anchor inside a 320px canvas stage. Store each point as current x/y plus oldX/oldY and use an 11px segment length. Resize the backing canvas to the root, cap devicePixelRatio at 2, and keep physics coordinates in CSS pixels.

Each frame normalize step = min(2, elapsedMs/16.667). Pin point 0 to the target. For points 1–21, infer velocity = (current-old)*pow(0.985,step), copy current into old, then add velocity plus 0.34*step gravity. Run five constraint iterations. For each adjacent pair, correction = (distance-11)/distance; move both points by half the correction except the point-0 pair, where only point 1 moves. Repin point 0 every iteration and clamp non-anchor points to 4px stage margins. When idle, drift the target around center with slow independent sine/cosine motion.

Render two smoothed paths through the points using quadraticCurveTo via adjacent midpoints: a 10px low-alpha glow and a crisp 2px #c8ff2e rope. Draw the anchor and every third link as small outlined nodes. Clicking, Space, or a semantic shake button injects sway by subtracting sin(index*1.73)*(6+index*0.22) from oldX and adding cos(index*1.17)*3.5 to oldY. Arrow keys move the target 24px, Shift+Arrow 42px, and Home centers it. Prevent default only for handled keys, use passive pointer/resize listeners, expose a sway readout, focus ring, and polite state messages.

Use one rAF loop. Under prefers-reduced-motion, skip Verlet integration and idle drift. Place points directly along a deterministic hanging curve: x = targetX + sin(t*pi)*28*bendDirection and y = targetY + t*availableLength. Space/button flips bendDirection, giving an interactive static alternate without continuous motion.`
});

/* ------------------------------------------------------------
   Cursor velocity stretch
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-velocity-stretch',
  title: 'Cursor Velocity Stretch',
  cat: 'Cursor',
  rootClass: 'd-stretch',
  tags: ['squash-stretch', 'velocity', 'motion-vector'],
  libs: [],
  desc: 'A fluorescent cursor body preserves visual mass while stretching along its motion vector and squashing across it. Three delayed echoes expose the velocity curve as the blob accelerates and settles.',
  seen: 'Seen on: kinetic agency cursors, playful product explorers, motion-led editorial navigation',
  hint: 'sweep quickly across the stage or launch a pass',
  html: `
<div class="d-stretch" tabindex="0" aria-label="Velocity-stretch cursor. Arrow keys move it and Space launches a sweep.">
  <div class="d-stretch-axis" aria-hidden="true"><i></i><i></i></div>
  <i class="d-stretch-echo" aria-hidden="true"></i><i class="d-stretch-echo" aria-hidden="true"></i><i class="d-stretch-echo" aria-hidden="true"></i>
  <div class="d-stretch-blob" aria-hidden="true"><i></i><b></b></div>
  <span class="d-stretch-label">MOTION / VECTOR</span>
  <div class="d-stretch-meter" aria-hidden="true"><span>SPEED PX/S</span><strong>000</strong></div>
  <button class="d-stretch-sweep" type="button">Launch sweep</button>
  <p class="d-stretch-status" aria-live="polite">Blob centered</p>
</div>`,
  css: `
.d-stretch { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-stretch:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-stretch-axis { position: absolute; left: 50%; top: 50%; width: 76%; height: 54%;
  transform: translate(-50%, -50%); border: 1px solid #1d1d21; border-radius: 50%; pointer-events: none; }
.d-stretch-axis::before, .d-stretch-axis::after { content: ''; position: absolute; background: #1d1d21; }
.d-stretch-axis::before { left: -12%; right: -12%; top: 50%; height: 1px; }
.d-stretch-axis::after { top: -26%; bottom: -26%; left: 50%; width: 1px; }
.d-stretch-axis i { position: absolute; width: 5px; height: 5px; border: 1px solid #5c5c66; border-radius: 50%; top: 50%; }
.d-stretch-axis i:first-child { left: 0; transform: translate(-50%, -50%); }
.d-stretch-axis i:last-child { right: 0; transform: translate(50%, -50%); }
.d-stretch-blob, .d-stretch-echo { position: absolute; left: 0; top: 0; width: 54px; height: 54px;
  margin: -27px 0 0 -27px; border-radius: 50%; pointer-events: none; transform-origin: center; }
.d-stretch-blob { z-index: 3; background: #c8ff2e; box-shadow: 0 0 28px rgba(200,255,46,.22);
  will-change: transform; }
.d-stretch-blob::before { content: ''; position: absolute; inset: 7px; border: 1px solid rgba(10,10,11,.36); border-radius: 50%; }
.d-stretch-blob i { position: absolute; left: 50%; top: 50%; width: 20px; height: 2px;
  background: #0a0a0b; transform: translate(-50%, -50%); }
.d-stretch-blob i::after { content: ''; position: absolute; right: -1px; top: -3px; width: 7px; height: 7px;
  border-top: 2px solid #0a0a0b; border-right: 2px solid #0a0a0b; transform: rotate(45deg); }
.d-stretch-blob b { position: absolute; left: 13px; top: 11px; width: 8px; height: 8px;
  border-radius: 50%; background: rgba(236,236,239,.7); }
.d-stretch-echo { border: 1px solid #c8ff2e; opacity: 0; will-change: transform, opacity; }
.d-stretch-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-stretch-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-stretch-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-stretch-sweep { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-stretch-sweep:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-stretch-sweep:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-stretch-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-stretch-blob, .d-stretch-echo { will-change: auto; }
  .d-stretch-sweep { transition: none; }
}`,
  js: `
const blob = root.querySelector('.d-stretch-blob');
const echoes = Array.from(root.querySelectorAll('.d-stretch-echo'));
const meter = root.querySelector('.d-stretch-meter strong');
const sweepButton = root.querySelector('.d-stretch-sweep');
const status = root.querySelector('.d-stretch-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let width = Math.max(1, root.clientWidth), height = Math.max(1, root.clientHeight);
let x = width * 0.5, y = height * 0.5, tx = x, ty = y, lastX = x, lastY = y;
let angle = 0, stretch = 1, squash = 1, sweepSide = 1;
let history = [], lastFrame = performance.now();

function resize() {
  const oldWidth = width, oldHeight = height;
  const box = root.getBoundingClientRect(); width = Math.max(1, box.width); height = Math.max(1, box.height);
  x = tx = x / Math.max(1, oldWidth) * width; y = ty = y / Math.max(1, oldHeight) * height;
  lastX = x; lastY = y; history = [];
}
window.addEventListener('resize', resize, { passive: true });

function localPoint(event) {
  const box = root.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
}

function setTarget(nextX, nextY, message) {
  tx = Math.max(28, Math.min(width - 28, nextX)); ty = Math.max(28, Math.min(height - 28, nextY));
  if (message) status.textContent = message;
}

function launch(message) {
  sweepSide *= -1;
  setTarget(width * (sweepSide > 0 ? 0.78 : 0.22), height * (sweepSide > 0 ? 0.42 : 0.58), message);
}

root.addEventListener('pointermove', function (event) {
  const p = localPoint(event); setTarget(p.x, p.y, 'Tracking velocity');
}, { passive: true });
root.addEventListener('pointerleave', function () {
  tx = width * 0.5; ty = height * 0.5; status.textContent = 'Blob settling';
});

root.addEventListener('keydown', function (event) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'];
  if (keys.indexOf(event.key) === -1) return;
  event.preventDefault();
  const step = event.shiftKey ? 54 : 30;
  if (event.key === 'ArrowLeft') tx -= step;
  if (event.key === 'ArrowRight') tx += step;
  if (event.key === 'ArrowUp') ty -= step;
  if (event.key === 'ArrowDown') ty += step;
  if (event.key === 'Home') { tx = width * 0.5; ty = height * 0.5; }
  tx = Math.max(28, Math.min(width - 28, tx)); ty = Math.max(28, Math.min(height - 28, ty));
  if (event.key === ' ') launch('Keyboard sweep');
  else status.textContent = event.key === 'Home' ? 'Blob centered' : 'Keyboard velocity move';
});

sweepButton.addEventListener('click', function () { launch('Button sweep'); root.focus(); });

function frame(now) {
  const step = Math.max(0.1, Math.min(2, (now - lastFrame) / 16.667)); lastFrame = now;
  if (reduced) { x = tx; y = ty; angle = 0; stretch = 1; squash = 1; }
  else {
    x += (tx - x) * (1 - Math.pow(0.66, step));
    y += (ty - y) * (1 - Math.pow(0.66, step));
    const dx = x - lastX, dy = y - lastY;
    const speed = Math.hypot(dx, dy) / step;
    if (speed > 0.08) {
      const desiredAngle = Math.atan2(dy, dx) * 180 / Math.PI;
      const delta = (desiredAngle - angle + 540) % 360 - 180;
      angle += delta * 0.22;
    }
    const intensity = Math.min(1, speed / 19);
    const desiredStretch = 1 + intensity * 1.35;
    const desiredSquash = Math.pow(desiredStretch, -0.55);
    stretch += (desiredStretch - stretch) * 0.24;
    squash += (desiredSquash - squash) * 0.24;
  }
  const frameDx = x - lastX, frameDy = y - lastY;
  const frameSpeed = reduced ? 0 : Math.hypot(frameDx, frameDy) / step;
  const intensity = Math.min(1, frameSpeed / 19);
  history.unshift({ x: x, y: y, angle: angle, intensity: intensity });
  if (history.length > 20) history.pop();
  const samples = [5, 10, 16];
  echoes.forEach(function (echo, index) {
    const sample = history[Math.min(samples[index], history.length - 1)];
    if (!sample || reduced) { echo.style.opacity = '0'; return; }
    const echoStretch = 1 + sample.intensity * (0.72 - index * 0.12);
    const echoSquash = Math.pow(echoStretch, -0.5);
    echo.style.transform = 'translate(' + sample.x.toFixed(2) + 'px,' + sample.y.toFixed(2) + 'px) rotate(' + sample.angle.toFixed(2) + 'deg) scale(' + echoStretch.toFixed(3) + ',' + echoSquash.toFixed(3) + ')';
    echo.style.opacity = (sample.intensity * (0.3 - index * 0.065)).toFixed(3);
  });
  blob.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) rotate(' + angle.toFixed(2) + 'deg) scale(' + stretch.toFixed(3) + ',' + squash.toFixed(3) + ')';
  meter.textContent = String(Math.min(999, Math.round(frameSpeed * 60))).padStart(3, '0');
  lastX = x; lastY = y;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained cursor blob that performs physically legible squash-and-stretch inside a 320px position-relative root. Use a 54px circular DOM blob with a direction mark plus three outlined echo elements. Track a clamped target at least 28px from stage edges and render a smoothed position in one requestAnimationFrame loop.

Normalize step = clamp(elapsedMs/16.667, 0.1, 2). Ease position using x += (targetX-x)*(1-pow(0.66,step)) and the same for y. Derive per-normalized-frame velocity from rendered delta/step, speed=hypot(dx,dy)/step, and direction=atan2(dy,dx). When speed exceeds 0.08, rotate toward direction using the shortest angular delta ((desired-current+540)%360)-180 and ease by 0.22. Map intensity=min(1,speed/19), desiredStretch=1+intensity*1.35, and desiredSquash=pow(desiredStretch,-0.55) to approximately preserve area. Ease both scales by 0.24 and write one translate/rotate/scale transform.

Keep 20 rendered history samples. Three echoes read samples 5, 10, and 16 frames behind, use reduced stretch multipliers, and set opacity from historical intensity up to 0.3. Hide echoes when still. Show speed as rounded frameSpeed*60 capped at 999. Pointermove sets the target, pointerleave returns to center, arrows move 30px, Shift+Arrow 54px, Home centers, and Space or a semantic button alternates a sweep between opposing stage quadrants. Prevent default only for handled keys, use passive pointer/resize listeners, preserve focus treatment, and announce input states.

Under prefers-reduced-motion, snap directly to target, force rotation and both scales to neutral, hide all echoes, and keep pointer plus keyboard positioning functional without deformation.`
});

/* ------------------------------------------------------------
   Cursor snap targets
------------------------------------------------------------ */
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
    <button class="d-snap-target d-snap-card" type="button" data-radius="5"><span>About the studio</span><i>Since 2014 ↗</i></button>
  </div>
  <div class="d-snap-frame" aria-hidden="true"><i></i><b></b></div>
  <i class="d-snap-dot" aria-hidden="true"></i>
  <p class="d-snap-status" aria-live="polite">Move into the stage</p>
</div>`,
  css: `
.d-snap { position: relative; width: 100%; height: 320px; overflow: hidden; background: #ded9cd;
  color: #0a0a0b; cursor: none; }
.d-snap-layout { position: absolute; inset: 46px 8% 44px; display: grid;
  grid-template-columns: 1.25fr .72fr 1fr; align-items: center; gap: clamp(14px, 4vw, 42px); }
.d-snap-target { position: relative; border: 1px solid rgba(10,10,11,.34); background: transparent;
  color: #0a0a0b; font-family: inherit; cursor: none; transition: background .22s, color .22s; }
.d-snap-target span, .d-snap-target i { display: block; pointer-events: none; }
.d-snap-target span { font-size: 15px; font-weight: 600; letter-spacing: -.03em; }
.d-snap-target i { margin-top: 7px; color: #68655f; font: 8px "JetBrains Mono", monospace;
  letter-spacing: .08em; text-transform: uppercase; font-style: normal; }
.d-snap-target:hover, .d-snap-target:focus-visible { background: #0a0a0b; color: #c8ff2e; outline: none; }
.d-snap-target:hover i, .d-snap-target:focus-visible i { color: #9b9ba3; }
.d-snap-pill { height: 58px; border-radius: 28px; text-align: left; padding: 0 22px; }
.d-snap-disc { width: 112px; height: 112px; justify-self: center; border-radius: 50%; }
.d-snap-card { height: 126px; border-radius: 5px; text-align: left; padding: 18px; align-self: end; }
.d-snap-frame { position: absolute; left: 0; top: 0; z-index: 4; width: 24px; height: 24px;
  box-sizing: border-box; border: 1px solid #0a0a0b; border-radius: 50%; opacity: 0;
  pointer-events: none; will-change: transform, width, height; }
.d-snap-frame::before, .d-snap-frame::after { content: ''; position: absolute; width: 7px; height: 7px; }
.d-snap-frame::before { left: -1px; top: -1px; border-left: 2px solid #c8ff2e; border-top: 2px solid #c8ff2e; }
.d-snap-frame::after { right: -1px; bottom: -1px; border-right: 2px solid #c8ff2e; border-bottom: 2px solid #c8ff2e; }
.d-snap-frame i, .d-snap-frame b { position: absolute; display: block; width: 4px; height: 4px;
  border-radius: 50%; background: #0a0a0b; opacity: 0; }
.d-snap-frame i { left: -2px; top: 50%; }.d-snap-frame b { right: -2px; top: 50%; }
.d-snap.d-snap-locked .d-snap-frame i, .d-snap.d-snap-locked .d-snap-frame b { opacity: 1; }
.d-snap-dot { position: absolute; left: 0; top: 0; z-index: 5; width: 5px; height: 5px;
  margin: -2.5px 0 0 -2.5px; border-radius: 50%; background: #c8ff2e; opacity: 0;
  pointer-events: none; will-change: transform, opacity; box-shadow: 0 0 0 1px rgba(10,10,11,.5); }
.d-snap-status { position: absolute; right: 20px; bottom: 16px; margin: 0;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (max-width: 620px) {
  .d-snap-layout { inset-inline: 4%; gap: 10px; grid-template-columns: 1.1fr .7fr 1fr; }
  .d-snap-disc { width: 86px; height: 86px; }.d-snap-card { padding: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .d-snap-frame, .d-snap-dot { will-change: auto; }
  .d-snap-target { transition: none; }
}`,
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
Build a self-contained sticky cursor that morphs between a free 24px circle and the measured outline of hovered or keyboard-focused controls inside a 320px root. Use three real buttons with clearly different dimensions and radii, one absolute outline frame, and one separate 5px pointer dot. Hide the native cursor only inside the demo.

Track pointer coordinates relative to the root. In free mode set goal x/y to pointer minus 12, width/height to 24, and radius to 12. On target pointerenter or focus, read its bounding box once, convert it to root coordinates, and set goals to its rectangle expanded by 6px on every side; use target radius + 6px. Keep the inner dot tracking the actual pointer while the shell is locked. On pointerleave/blur, prefer any still-focused/hovered target, otherwise release to free mode. If the stage is exited without keyboard focus, hide both cursor elements; focused targets remain outlined.

Animate x/y as spring velocity=(velocity+(goal-current)*0.14)*0.68; animate width/height/radius with stiffness 0.16 and damping 0.7. The dot lerps by 0.38. Write one translate plus width, height, and border-radius per frame. Recompute a locked target on resize, keep pointermove/resize passive, cache nodes, and never measure inside the rAF loop.

Keyboard focus must invoke the identical snapped geometry, center the dot in the control, show visible target styling, and announce focus/selection through a polite live region. Under prefers-reduced-motion, assign all shell properties and dot coordinates directly to their goals while preserving pointer hover, focus, stage-exit, and resize behavior.`
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
.d-flash:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-flash-scene { position: absolute; inset: 0; overflow: hidden; background: #d8cfc0; color: #0a0a0b; }
.d-flash-scene::before { content: ''; position: absolute; inset: 0; opacity: .42;
  background-image: linear-gradient(rgba(10,10,11,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,11,.2) 1px, transparent 1px);
  background-size: 28px 28px; }
.d-flash-kicker { position: absolute; left: 20px; top: 18px; font: 8px "JetBrains Mono", monospace;
  letter-spacing: .12em; }
.d-flash-title { position: absolute; left: 8%; top: 51%; transform: translateY(-50%);
  font: 700 clamp(36px, 6vw, 60px)/.8 "Inter", sans-serif; letter-spacing: -.07em; }
.d-flash-panel { position: absolute; width: 118px; height: 132px; border: 1px solid #0a0a0b; padding: 10px;
  font: 7px "JetBrains Mono", monospace; box-sizing: border-box; }
.d-flash-panel i { display: block; height: 88px; margin-bottom: 10px; background: #0a0a0b; }
.d-flash-panel-one { right: 22%; top: 44px; transform: rotate(5deg); }
.d-flash-panel-one i { background: linear-gradient(135deg, #ff5d3b 0 48%, #0a0a0b 49%); }
.d-flash-panel-two { right: 6%; bottom: 35px; transform: rotate(-7deg); }
.d-flash-panel-two i { background: radial-gradient(circle at 65% 38%, #c8ff2e 0 28%, #0a0a0b 29%); }
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
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-flash-meter strong { color: #ececef; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-flash-toggle { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-flash-toggle:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-flash-toggle:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-flash-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #9b9ba3;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-flash-ring { will-change: auto; }.d-flash-toggle { transition: none; }
}`,
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

Arrow keys move 26px, Shift+Arrow 44px, Home centers, and Space or a semantic aria-pressed button toggles wide/focused mode. Ignore button pointerdown in the stage flare handler, preserve focus treatment, and announce state changes. Under prefers-reduced-motion, snap position/radius directly, remove flicker and flare, and draw grain only once while preserving pointer and keyboard search.`
});

/* ------------------------------------------------------------
   Cursor emoji rain
------------------------------------------------------------ */
INTRX.register({
  id: 'cursor-emoji-rain',
  title: 'Cursor Emoji Rain',
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
  <button class="d-rain-launch" type="button">Celebrate center</button>
  <p class="d-rain-status" aria-live="polite">Launcher ready</p>
</div>`,
  css: `
.d-rain { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none;
  background: #0a0a0b; touch-action: none; }
.d-rain::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .38;
  background-image: linear-gradient(90deg, transparent 0 24%, #19191d 25%, transparent 25% 49%, #19191d 50%, transparent 50% 74%, #19191d 75%, transparent 75%); }
.d-rain:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-rain-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-rain-reticle { position: absolute; left: 0; top: 0; width: 34px; height: 34px; margin: -17px 0 0 -17px;
  border: 1px solid rgba(200,255,46,.35); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-rain-reticle::before, .d-rain-reticle::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(200,255,46,.62); transform: translate(-50%, -50%); }
.d-rain-reticle::before { width: 9px; height: 1px; }.d-rain-reticle::after { width: 1px; height: 9px; }
.d-rain-reticle i { position: absolute; inset: 6px; border: 1px dashed rgba(200,255,46,.2); border-radius: 50%; }
.d-rain-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-rain-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-rain-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-rain-launch { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-rain-launch:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-rain-launch:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-rain-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-rain-reticle { will-change: auto; }.d-rain-launch { transition: none; }
}`,
  js: `
const canvas = root.querySelector('.d-rain-canvas');
const ctx = canvas.getContext('2d');
const reticle = root.querySelector('.d-rain-reticle');
const meter = root.querySelector('.d-rain-meter strong');
const launchButton = root.querySelector('.d-rain-launch');
const status = root.querySelector('.d-rain-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const glyphs = ['✦', '●', '▲', '♥', '☺', '✷', '↗', '★', '◆', '+'];
const colors = ['#c8ff2e', '#ff5d3b', '#ececef', '#7b61ff', '#38d9ff'];
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
  const dt = Math.min(0.032, (now - lastFrame) / 1000); lastFrame = now;
  ctx.clearRect(0, 0, width, height);
  for (let i = rings.length - 1; i >= 0; i--) {
    const ring = rings[i];
    if (!reduced) { ring.radius += 210 * dt; ring.life -= 1.9 * dt; }
    if (ring.life <= 0) { rings.splice(i, 1); continue; }
    ctx.globalAlpha = ring.life * 0.55; ctx.strokeStyle = '#c8ff2e'; ctx.lineWidth = 1;
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
    ctx.font = '700 ' + particle.size.toFixed(1) + 'px Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(particle.glyph, 0, 0); ctx.restore();
  }
  ctx.globalAlpha = 1;
  reticle.style.transform = 'translate(' + launcher.x.toFixed(2) + 'px,' + launcher.y.toFixed(2) + 'px)';
  meter.textContent = String(particles.length).padStart(3, '0');
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
  prompt: `
Build a self-contained click-origin glyph confetti system in a 320px canvas stage. Use a visible launcher reticle, semantic center-launch button, active count, and a palette of ten glyphs plus five colors. Resize the canvas to the root, cap devicePixelRatio at 2, keep coordinates in CSS pixels, and clamp live particles on resize.

Each normal burst creates 28 particles at the exact pointer/launcher position. Choose a random full-circle angle, speed 85–275px/s, vx=cos(angle)*speed, and vy=sin(angle)*speed*0.55 - 175 - random(0,75). Give each particle independent rotation, spin in -4–4rad/s, size 15–30px, and life 1.65–2.5s. Cap the pool at 160. Add one expanding ring at the origin.

In one requestAnimationFrame loop with dt capped at 32ms, apply vx drag pow(0.996,dt*60), gravity 620px/s², position and rotation integration. Bounce from side walls with restitution 0.58. At the floor use vertical restitution 0.46, horizontal friction 0.78, and angular damping 0.72; after at least three low-energy bounces mark settled. Decrease life each frame and fade over the last 0.55s. Draw a low-alpha velocity streak before each rotated glyph. Expand rings at 210px/s and fade them at 1.9 life units/s.

Pointerdown bursts unless it targets the control. Arrow keys position the launcher by 26px, Shift+Arrow by 44px, Home centers, and Space launches. Prevent default only for handled keys, keep pointer/resize passive, expose focus styling and polite state messages. Under prefers-reduced-motion, replace previous content with 12 static glyphs distributed on 30/43/56px radial bands, one fixed 52px origin ring, no velocity/spin/gravity/lifetime decay, while preserving pointer and keyboard placement.`
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
.d-gridline:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-gridline-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-gridline-v, .d-gridline-h { fill: none; stroke: #2e2e34; stroke-width: 1;
  vector-effect: non-scaling-stroke; opacity: .45; }
.d-gridline-vertical .d-gridline-v:nth-child(6), .d-gridline-horizontal .d-gridline-h:nth-child(4) {
  stroke: #5c5c66; stroke-dasharray: 3 5; }
.d-gridline-field { position: absolute; left: 0; top: 0; width: 290px; height: 290px; margin: -145px 0 0 -145px;
  border: 1px solid rgba(200,255,46,.13); border-radius: 50%; pointer-events: none; opacity: 0;
  will-change: transform, opacity; }
.d-gridline-field::before, .d-gridline-field::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(200,255,46,.48); transform: translate(-50%, -50%); }
.d-gridline-field::before { width: 13px; height: 1px; }.d-gridline-field::after { width: 1px; height: 13px; }
.d-gridline-field i { position: absolute; inset: 35px; border: 1px dashed rgba(200,255,46,.11); border-radius: 50%; }
.d-gridline.d-gridline-active .d-gridline-field { opacity: 1; }
.d-gridline-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-gridline-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-gridline-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-gridline-reverse { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-gridline-reverse:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-gridline-reverse:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-gridline-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-gridline-field { will-change: auto; }.d-gridline-reverse { transition: none; }
}`,
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
  path.style.stroke = peak > 0.025 ? '#c8ff2e' : '#2e2e34';
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

For each vertical path sample 13 points; for each horizontal path sample 19. For a point at its straight-grid base position, calculate dx/dy to the rendered field, radius=clamp(width*0.24,110,190), and influence=max(0,1-distance/radius)²*fieldStrength. Vertical lines displace x by dx*influence*0.48 and y by dy*influence*0.06; horizontal lines swap those weights. Multiply displacement by polarity 1 or -1. Convert samples into a smooth SVG path using quadratic curves through adjacent midpoints and track peak influence per line. Brighten affected lines to #c8ff2e, raise opacity from 0.42 toward 1, and width from 1 toward 2.15.

Ease field position by 0.18 and strength toward active by 0.16 or toward zero by 0.1. Pointerleave must decay the warp back to perfectly straight. Click, Space, or an aria-pressed semantic button reverses polarity; arrows move the field 28px, Shift+Arrow 46px, and Home centers/deactivates. Prevent default only for handled keys, ignore button pointerdown in the stage handler, use passive pointer/resize listeners, cache nodes, expose force and polite state feedback, and use one rAF.

Under prefers-reduced-motion, snap field position and strength directly to their targets. Keep the static bowed grid, polarity changes, keyboard controls, focus treatment, and responsive viewBox behavior without interpolation.`
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
  desc: 'Pointer velocity deposits luminous heat that rises, spreads, and cools from white-yellow through orange into violet-blue. Additive radial fields overlap into a living thermal trace before fading completely.',
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
  background: #07070a; touch-action: none; }
.d-heat:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-heat-scene { position: absolute; inset: 0; overflow: hidden; color: #24242b;
  background-image: linear-gradient(#151519 1px, transparent 1px), linear-gradient(90deg, #151519 1px, transparent 1px);
  background-size: 28px 28px; }
.d-heat-scene strong { position: absolute; left: 50%; top: 48%; transform: translate(-50%, -50%);
  font: 700 clamp(48px, 9vw, 82px)/.78 "Inter", sans-serif; letter-spacing: -.08em; white-space: nowrap; }
.d-heat-scene span { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 8px "JetBrains Mono", monospace; letter-spacing: .12em; }
.d-heat-scene i { position: absolute; display: block; width: 8px; height: 8px; border: 1px solid #2e2e34; border-radius: 50%; }
.d-heat-scene i:nth-of-type(1) { left: 18%; top: 34%; }.d-heat-scene i:nth-of-type(2) { right: 19%; top: 27%; }
.d-heat-scene i:nth-of-type(3) { right: 31%; bottom: 23%; }
.d-heat-canvas { position: absolute; inset: 0; width: 100%; height: 100%; mix-blend-mode: screen; }
.d-heat-reticle { position: absolute; left: 0; top: 0; width: 32px; height: 32px; margin: -16px 0 0 -16px;
  border: 1px solid rgba(255,159,40,.52); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-heat-reticle::before, .d-heat-reticle::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(255,220,120,.72); transform: translate(-50%, -50%); }
.d-heat-reticle::before { width: 8px; height: 1px; }.d-heat-reticle::after { width: 1px; height: 8px; }
.d-heat-reticle i { position: absolute; inset: 5px; border: 1px dashed rgba(255,159,40,.25); border-radius: 50%; }
.d-heat-scale { position: absolute; left: 20px; bottom: 64px; display: flex; align-items: center; gap: 7px;
  color: #5c5c66; font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-heat-scale i { display: block; width: 76px; height: 3px;
  background: linear-gradient(90deg, #493bff, #d72eff, #ff542e, #ffd52e, #fff); }
.d-heat-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-heat-meter strong { color: #ffb52e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-heat-ignite { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-heat-ignite:hover { color: #ffb52e; border-color: #ffb52e; transform: translateY(-2px); }
.d-heat-ignite:focus-visible { outline: 2px solid #ffb52e; outline-offset: 3px; }
.d-heat-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-heat-reticle { will-change: auto; }.d-heat-ignite { transition: none; }
}`,
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
  const hue = 225 - point.temperature * 188;
  const alpha = reduced ? 0.72 : Math.min(0.78, point.temperature * 0.88);
  const radius = point.radius * (1.25 - point.temperature * 0.25);
  const gradient = ctx.createRadialGradient(point.x + shimmer, point.y, 0, point.x + shimmer, point.y, radius);
  gradient.addColorStop(0, 'rgba(255,255,255,' + (alpha * 0.82) + ')');
  gradient.addColorStop(0.2, 'hsla(' + hue.toFixed(1) + ',100%,62%,' + alpha + ')');
  gradient.addColorStop(0.58, 'hsla(' + (hue + 24).toFixed(1) + ',100%,45%,' + (alpha * 0.54) + ')');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(point.x + shimmer, point.y, radius, 0, Math.PI * 2); ctx.fill();
}

function frame(now) {
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
Build a self-contained additive thermal cursor trail in a 320px canvas stage. Put the canvas over a dark technical grid/title scene and use screen blending. Each heat point stores x/y, velocity, radius, phase, and normalized temperature. Resize the backing canvas to the root, cap devicePixelRatio at 2, keep coordinates in CSS pixels, and clamp points on resize.

Emit trail points every ~8px along interpolated pointer segments, capped at 14 per event so fast movement has no gaps. Derive pointer velocity from distance/max(8ms,elapsed) and temperature=min(1,0.52+velocity/1450). Give points small lateral jitter, upward velocity -7 to -19px/s, and radius 20–30px. Click, Space, or a semantic center button creates 22–26 radial heat points. Cap the pool at 140 and seed an initial 12-point field so the demo is alive on first view.

In one requestAnimationFrame loop with dt capped at 32ms, use globalCompositeOperation='lighter'. Move points, damp vx by pow(0.985,dt*60), vy by pow(0.992,dt*60), grow radius 17px/s, and cool temperature by 0.4/s. Draw each as a radial gradient whose hue runs from about 37° hot to 225° cool, with a white core, saturated mid-band, transparent edge, and alpha based on temperature. Add horizontal shimmer sin(now*0.006+phase)*(1-temperature)*5 so cooler air wavers more. Remove points at zero temperature and restore source-over blending afterward.

Arrow keys move the launcher 26px, Shift+Arrow 44px, Home centers, and Space flares. Ignore control pointerdown in the stage handler, keep pointer/resize passive, expose temperature and polite state feedback, and retain focus styling. Under prefers-reduced-motion, replace the prior field with 14 static points on three radial bands, disable drift/cooling/shimmer, and preserve pointer, keyboard, and button placement.`
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
  background: #0a0a0b; color: #c8ff2e; touch-action: none; cursor: crosshair; }
.d-hud:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-hud-scene { position: absolute; inset: 0; overflow: hidden; color: #202026;
  background-image: linear-gradient(#16161a 1px, transparent 1px), linear-gradient(90deg, #16161a 1px, transparent 1px);
  background-size: 32px 32px; }
.d-hud-scene span { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-hud-scene strong { position: absolute; left: 50%; top: 49%; transform: translate(-50%, -50%);
  font: 700 clamp(50px, 10vw, 92px)/.78 "Inter", sans-serif; letter-spacing: -.08em; white-space: nowrap; }
.d-hud-scene i { position: absolute; width: 38px; height: 38px; border: 1px solid #2a2a30; }
.d-hud-scene i:nth-of-type(1) { left: 9%; top: 25%; border-right: 0; border-bottom: 0; }
.d-hud-scene i:nth-of-type(2) { right: 9%; top: 25%; border-left: 0; border-bottom: 0; }
.d-hud-scene i:nth-of-type(3) { left: 9%; bottom: 20%; border-right: 0; border-top: 0; }
.d-hud-scene i:nth-of-type(4) { right: 9%; bottom: 20%; border-left: 0; border-top: 0; }
.d-hud-tether { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.d-hud-tether path { fill: none; stroke: rgba(200,255,46,.42); stroke-width: 1;
  stroke-dasharray: 3 5; vector-effect: non-scaling-stroke; }
.d-hud-vline, .d-hud-hline { position: absolute; left: 0; top: 0; pointer-events: none; will-change: transform; }
.d-hud-vline { width: 1px; height: 100%; background: rgba(200,255,46,.48); }
.d-hud-hline { width: 100%; height: 1px; background: rgba(200,255,46,.48); }
.d-hud-vline::before, .d-hud-hline::before { content: ''; position: absolute; opacity: .36; }
.d-hud-vline::before { left: -4px; width: 9px; height: 100%;
  background: repeating-linear-gradient(to bottom, transparent 0 15px, #c8ff2e 16px 17px); }
.d-hud-hline::before { top: -4px; height: 9px; width: 100%;
  background: repeating-linear-gradient(to right, transparent 0 15px, #c8ff2e 16px 17px); }
.d-hud-vline i, .d-hud-hline i { position: absolute; display: block; background: #ececef; }
.d-hud-vline i { left: -2px; top: 18px; width: 5px; height: 1px; }.d-hud-hline i { top: -2px; right: 18px; width: 1px; height: 5px; }
.d-hud-cross { position: absolute; left: 0; top: 0; width: 44px; height: 44px; margin: -22px 0 0 -22px;
  border: 1px solid rgba(200,255,46,.7); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-hud-cross::before, .d-hud-cross::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: #c8ff2e; transform: translate(-50%, -50%); }
.d-hud-cross::before { width: 58px; height: 1px; }.d-hud-cross::after { width: 1px; height: 58px; }
.d-hud-cross i { position: absolute; inset: 8px; border: 1px dashed rgba(236,236,239,.28); border-radius: 50%; }
.d-hud-cross b { position: absolute; left: 50%; top: 50%; width: 5px; height: 5px;
  transform: translate(-50%, -50%); border-radius: 50%; background: #ececef; }
.d-hud-lead { position: absolute; left: 0; top: 0; width: 6px; height: 6px; margin: -3px 0 0 -3px;
  border-radius: 50%; background: #ff5d3b; box-shadow: 0 0 0 5px rgba(255,93,59,.12);
  pointer-events: none; will-change: transform; }
.d-hud-readout { position: absolute; left: 0; top: 0; width: 126px; display: grid; grid-template-columns: 1fr 1fr;
  gap: 3px 10px; padding: 8px 9px; border: 1px solid rgba(200,255,46,.32); background: rgba(10,10,11,.82);
  color: #5c5c66; font: 8px "JetBrains Mono", monospace; pointer-events: none; will-change: transform; }
.d-hud-readout b { color: #ececef; font-weight: 500; }
.d-hud-freeze { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-hud-freeze:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-hud-freeze:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-hud-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (prefers-reduced-motion: reduce) {
  .d-hud-vline, .d-hud-hline, .d-hud-cross, .d-hud-lead, .d-hud-readout { will-change: auto; }
  .d-hud-freeze { transition: none; }
}`,
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
Build a self-contained full-stage crosshair HUD inside a 320px position-relative root. Use separate absolute vertical and horizontal axis lines with repeating tick marks, a circular tracked intersection, a distinct 6px live-pointer lead, an SVG tether between them, and a compact coordinate/velocity/bearing readout that flips to the opposite side near stage edges.

Track raw pointer coordinates exactly. Derive raw speed in px/s from distance/max(8ms,elapsed), capped at 999, and bearing=(atan2(dy,dx)*180/pi+360)%360. Unless frozen, copy raw into the tracked target. Animate the X axis with vx=(vx+(targetX-x)*0.105)*0.72 and the Y axis with vy=(vy+(targetY-y)*0.14)*0.68, then position+=velocity. This asymmetric spring makes the axes lag independently. Update axis transforms, intersection, exact lead, and tether path once per frame; tether opacity=min(1,distance/34).

Place the 126px readout at intersection+18px, flip left if it would cross width-8, flip above if it would cross height-8, and clamp to 8px. Report raw X/Y, speed, and padded bearing. A semantic aria-pressed Freeze HUD button and Space toggle whether raw motion updates the tracked target; the lead and tether must keep showing live pointer motion while frozen. Pointerleave recenters only when unlocked. Arrow keys move raw target 28px, Shift+Arrow 46px, and Home centers/unlocks. Prevent default only for handled keys, keep pointer/resize passive, preserve focus and polite lock-state feedback, and update the SVG viewBox on resize.

Under prefers-reduced-motion, snap both axes directly to the target with no spring velocity while preserving lead/tether separation during freeze, telemetry, keyboard controls, and edge-aware readout placement.`
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
.d-pull:focus-visible { box-shadow: inset 0 0 0 2px #c8ff2e; }
.d-pull-stage { position: absolute; left: 50%; top: 49%; width: min(62%, 430px); height: 194px;
  transform: translate(-50%, -50%); }
.d-pull-card { position: absolute; inset: 0; overflow: hidden; background: #dcd6c8; will-change: clip-path; }
.d-pull-art { position: absolute; inset: -8px; overflow: hidden; background: #dcd6c8; color: #0a0a0b;
  will-change: transform; }
.d-pull-art::before { content: ''; position: absolute; inset: 0; opacity: .42;
  background-image: linear-gradient(rgba(10,10,11,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,11,.22) 1px, transparent 1px);
  background-size: 24px 24px; }
.d-pull-art span { position: absolute; left: 16px; top: 14px; font: 8px/1.2 "JetBrains Mono", monospace;
  letter-spacing: .1em; }
.d-pull-art strong { position: absolute; left: 50%; top: 52%; transform: translate(-50%, -50%);
  font: 700 clamp(34px, 5vw, 55px)/.75 "Inter", sans-serif; letter-spacing: -.07em; white-space: nowrap; }
.d-pull-art i { position: absolute; right: 26px; top: 20px; width: 82px; height: 82px;
  border: 16px solid #ff5d3b; border-radius: 50%; mix-blend-mode: multiply; }
.d-pull-art b { position: absolute; right: 18px; bottom: 16px; width: 48px; height: 48px;
  background: #c8ff2e; transform: rotate(18deg); mix-blend-mode: multiply; }
.d-pull-wire { position: absolute; inset: -1px; width: calc(100% + 2px); height: calc(100% + 2px);
  overflow: visible; pointer-events: none; opacity: .22; transition: opacity .2s; }
.d-pull-wire polygon { fill: none; stroke: #c8ff2e; stroke-width: 1; stroke-dasharray: 4 5;
  vector-effect: non-scaling-stroke; }
.d-pull-wire circle { fill: #0a0a0b; stroke: #c8ff2e; stroke-width: 1; vector-effect: non-scaling-stroke; }
.d-pull.d-pull-active .d-pull-wire { opacity: .92; }
.d-pull-reticle { position: absolute; left: 0; top: 0; width: 30px; height: 30px; margin: -15px 0 0 -15px;
  border: 1px solid rgba(200,255,46,.5); border-radius: 50%; opacity: 0; pointer-events: none; will-change: transform, opacity; }
.d-pull-reticle::before, .d-pull-reticle::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: #c8ff2e; transform: translate(-50%, -50%); }
.d-pull-reticle::before { width: 8px; height: 1px; }.d-pull-reticle::after { width: 1px; height: 8px; }
.d-pull-reticle i { position: absolute; inset: 5px; border: 1px dashed rgba(200,255,46,.24); border-radius: 50%; }
.d-pull.d-pull-active .d-pull-reticle { opacity: 1; }
.d-pull-label { position: absolute; left: 20px; top: 18px; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-pull-meter { position: absolute; top: 18px; right: 20px; display: grid; justify-items: end;
  color: #5c5c66; font: 9px "JetBrains Mono", monospace; letter-spacing: .12em; pointer-events: none; }
.d-pull-meter strong { color: #c8ff2e; font-size: 21px; font-weight: 500; letter-spacing: 0; }
.d-pull-tug { position: absolute; left: 20px; bottom: 18px; border: 1px solid #2e2e34;
  border-radius: 999px; background: #101012; color: #ececef; padding: 9px 14px;
  font: 10px "JetBrains Mono", monospace; cursor: pointer; transition: color .2s, border-color .2s, transform .2s; }
.d-pull-tug:hover { color: #c8ff2e; border-color: #c8ff2e; transform: translateY(-2px); }
.d-pull-tug:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 3px; }
.d-pull-status { position: absolute; right: 20px; bottom: 20px; margin: 0; color: #5c5c66;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
@media (max-width: 620px) { .d-pull-stage { width: 76%; height: 176px; } }
@media (prefers-reduced-motion: reduce) {
  .d-pull-card, .d-pull-art, .d-pull-reticle { will-change: auto; }.d-pull-tug { transition: none; }
}`,
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
  prompt: `
Build a self-contained flexible poster whose silhouette bows toward the pointer through an eight-point CSS clip-path polygon. Use alternating nodes at four corners and four edge midpoints. Mirror the exact geometry in an SVG polygon with eight handle circles so the deformation is inspectable. Keep the card layout rectangle fixed; only its visible polygon changes.

Measure the card once and on resize. For each node calculate its pixel base, vector to the local pointer, radius=hypot(width,height)*0.92, and influence=max(0,1-distance/radius)². Corners use weight 0.18 and edge midpoints 0.11. Compute the weighted displacement toward the pointer, multiply by a temporary tug boost, and cap its magnitude at 24px. Animate x/y offsets with velocity=(velocity+(target-current)*0.13)*0.7, then current+=velocity. Rebuild clip-path polygon in pixels, SVG points, and handle cx/cy once per frame.

Pointermove activates tension, pointerleave sets targets back to zero so the shape springs home, and pointerdown briefly raises boost to 1.6, easing to 1 by 0.075 per frame. Add subtle inner-art parallax translate((normalizedX-.5)*12px,(normalizedY-.5)*9px) scale(1.045). Arrow keys move a virtual pull point 24px, Shift+Arrow 42px, Home centers, Escape releases, and Space or a semantic button creates a 1.6–1.7 tug. Prevent default only for handled keys, keep pointer/resize passive, expose force and polite state feedback, and preserve focus styles.

Under prefers-reduced-motion, assign node offsets directly, disable tug amplification and inner parallax, while preserving pointer/keyboard geometry, wireframe handles, responsive measurement, and the static distorted result.`
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
  overflow: hidden; outline: none; background: #e7e2d7; color: #171718; touch-action: none; }
.d-shadow:focus-visible { box-shadow: inset 0 0 0 2px #ff583d; }
.d-shadow::before { content: ''; position: absolute; inset: 0; opacity: .28; pointer-events: none;
  background-image: linear-gradient(rgba(23,23,24,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,24,.13) 1px, transparent 1px);
  background-size: 32px 32px; }
.d-shadow-stage { position: absolute; left: 50%; top: 50%; width: 220px; height: 148px;
  transform: translate(-50%, -48%); perspective: 700px; }
.d-shadow-cast { position: absolute; inset: 9px 8px 4px; border-radius: 17px; background: #221d21;
  transform-origin: 50% 70%; will-change: transform, filter, opacity; pointer-events: none; }
.d-shadow-contact { position: absolute; left: 13%; right: 13%; bottom: -15px; height: 24px; border-radius: 50%;
  background: #282126; filter: blur(8px); transform-origin: 50% 50%; will-change: transform, filter, opacity; }
.d-shadow-object { position: absolute; inset: 0; border-radius: 15px; background: #f9f7ef; border: 1px solid rgba(23,23,24,.16);
  overflow: hidden; box-shadow: inset 0 1px rgba(255,255,255,.85); transform-style: preserve-3d; will-change: transform; }
.d-shadow-art { position: absolute; inset: 0; overflow: hidden; background:
  radial-gradient(circle at var(--d-shadow-hx) var(--d-shadow-hy), rgba(255,255,255,.92) 0, rgba(255,255,255,.28) 18%, transparent 43%),
  linear-gradient(135deg, #fa765e 0 48%, #d7ff47 48% 100%); }
.d-shadow-art::before { content: ''; position: absolute; inset: 0; opacity: .32;
  background: repeating-linear-gradient(90deg, transparent 0 13px, rgba(23,23,24,.16) 13px 14px); }
.d-shadow-art span { position: absolute; left: 15px; top: 14px; font: 9px "JetBrains Mono", monospace;
  letter-spacing: .16em; }
.d-shadow-art strong { position: absolute; right: 10px; bottom: -13px; font: 800 78px/.9 "Inter", sans-serif;
  letter-spacing: -.09em; color: #171718; }
.d-shadow-art i { position: absolute; left: 28px; bottom: 22px; width: 44px; height: 44px;
  border: 11px solid #171718; border-radius: 50%; mix-blend-mode: multiply; }
.d-shadow-light { position: absolute; left: 0; top: 0; width: 42px; height: 42px; margin: -21px 0 0 -21px;
  border: 1px solid rgba(23,23,24,.5); border-radius: 50%; pointer-events: none; will-change: transform; }
.d-shadow-light::before, .d-shadow-light::after { content: ''; position: absolute; left: 50%; top: 50%;
  background: rgba(23,23,24,.42); transform: translate(-50%, -50%); }
.d-shadow-light::before { width: 58px; height: 1px; }.d-shadow-light::after { width: 1px; height: 58px; }
.d-shadow-light i { position: absolute; inset: 8px; border-radius: 50%; background: #fff8b5;
  border: 1px solid rgba(23,23,24,.34); box-shadow: 0 0 0 5px rgba(255,248,181,.28), 0 0 25px rgba(255,102,62,.42); }
.d-shadow-kicker { position: absolute; left: 18px; top: 17px; font: 9px "JetBrains Mono", monospace;
  letter-spacing: .14em; color: rgba(23,23,24,.58); }
.d-shadow-meter { position: absolute; right: 18px; top: 15px; display: flex; align-items: baseline; gap: 4px;
  font: 9px "JetBrains Mono", monospace; letter-spacing: .11em; color: rgba(23,23,24,.55); }
.d-shadow-meter strong { min-width: 26px; font-size: 19px; font-weight: 500; color: #171718; letter-spacing: 0; text-align: right; }
.d-shadow-meter b { font-weight: 400; letter-spacing: .06em; }
.d-shadow-mode { position: absolute; left: 18px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(23,23,24,.36);
  border-radius: 999px; background: rgba(249,247,239,.72); color: #171718; font: 10px "JetBrains Mono", monospace;
  cursor: pointer; transition: background .18s, color .18s, transform .18s; }
.d-shadow-mode:hover { background: #171718; color: #f9f7ef; transform: translateY(-2px); }
.d-shadow-mode:focus-visible { outline: 2px solid #ff583d; outline-offset: 3px; }
.d-shadow-status { position: absolute; right: 18px; bottom: 19px; max-width: 48%; margin: 0; text-align: right;
  color: rgba(23,23,24,.58); font: 9px "JetBrains Mono", monospace; letter-spacing: .06em; text-transform: uppercase; }
.d-shadow.d-shadow-hard .d-shadow-light i { background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,.38), 0 0 13px rgba(255,88,61,.42); }
@media (max-width: 620px) { .d-shadow-stage { width: 190px; height: 128px; }.d-shadow-status { max-width: 42%; } }
@media (prefers-reduced-motion: reduce) {
  .d-shadow-cast, .d-shadow-contact, .d-shadow-object, .d-shadow-light { will-change: auto; }
  .d-shadow-mode { transition: none; }
}`,
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
Build a self-contained cast-shadow study around a fixed 220 by 148 pixel object and an independently moving light marker. Measure the root and the untransformed stage on startup and resize. Convert pointer coordinates into the root's local space and clamp the light 24px from horizontal edges and above the bottom controls. Pointerleave returns it to a northwest home position; Arrow keys move it 18px, Shift+Arrow 34px, Home resets it, and Space or a semantic aria-pressed button toggles soft and hard light.

Derive the shadow from the vector pointing away from the light: fromLight=center-light, distance=hypot(dx,dy), reach=min(55,base+distance*rate), shadowX=dx/distance*reach, and shadowY=dy/distance*reach plus a small downward bias. Soft mode uses base 13, rate .085, 13-24px distance-dependent blur and lower opacity. Hard mode uses base 16, rate .11, 3-9px blur and stronger opacity. Apply the cast shadow as translate plus restrained inverse-axis scale, and render a separate ground contact shadow with smaller translation, compressed Y scale, dedicated blur, and opacity.

Move a radial specular highlight across the object's inner artwork using clamped CSS custom-property percentages derived from light position. In full motion, ease the light toward its target by 0.14 per frame and tilt the object no more than about five degrees toward the source. Update transform, blur, opacity, highlight variables, marker, and numeric offset meter in one animation frame. Keep all pointer and resize listeners passive, handle only documented keyboard keys, preserve visible focus, and announce mode or input changes through a polite status region.

Under prefers-reduced-motion, snap the light directly to its target and remove object tilt while preserving the physically opposite shadow vector, hard/soft modes, pointer and keyboard control, responsive measurement, contact shadow, specular position, and offset readout.`
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
    <a class="d-cursor-link" href="#" onclick="return false">Hover me</a>
    <a class="d-cursor-link" href="#" onclick="return false">And me</a>
  </div>
</div>`,
  css: `
.d-cursor { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; cursor: none; }
.d-cursor-dot, .d-cursor-ring {
  position: absolute; top: 0; left: 0; pointer-events: none;
  border-radius: 50%; z-index: 10; opacity: 0;
}
.d-cursor-dot  { width: 6px; height: 6px; background: #c8ff2e; }
.d-cursor-ring {
  width: 36px; height: 36px; border: 1px solid #c8ff2e;
  transition: width 0.25s, height 0.25s;
  mix-blend-mode: difference;
}
.d-cursor-ring.d-cursor-big { width: 72px; height: 72px; }
.d-cursor-content { height: 100%; display: flex; align-items: center; justify-content: center; gap: 40px; }
.d-cursor-link {
  color: #ececef; text-decoration: none; font-size: 26px; font-weight: 600; cursor: none;
  border-bottom: 1px solid #2e2e34;
}`,
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
- Hide the native cursor (cursor: none) on the page.
- Render two fixed-position elements: a 6px dot that follows the pointer exactly, and a 36px ring that follows with lerp (factor ~0.12) in a requestAnimationFrame loop.
- The ring uses mix-blend-mode: difference so it stays visible over any color.
- When hovering links/buttons (or any [data-cursor="grow"]), the ring scales up ~2x via a CSS transition.
- Both elements are pointer-events: none.
- Disable the whole thing on touch devices (matchMedia '(pointer: coarse)') and under prefers-reduced-motion.`,
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
.d-magnet-btn:hover { border-color: #c8ff2e; background: rgba(200,255,46,0.06); }
.d-magnet-btn span { display: inline-block; pointer-events: none; }`,
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
  prompt: `
Build magnetic buttons with GSAP.

Requirements:
- On mousemove over the button, compute the cursor offset from the button center.
- Translate the button toward the cursor at ~0.4 of the offset, and the inner label at ~0.7 (parallax between shell and label).
- Use gsap.to with power3.out, duration ~0.4s, so movement is smoothed.
- On mouseleave, both animate back to 0,0 with elastic.out(1, 0.35) over ~0.9s for a springy snap-back.
- The label must be pointer-events: none so it never steals hover.
- Disable on touch devices.
- If GSAP is unavailable, describe a vanilla fallback using lerp in requestAnimationFrame.`,
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
  <p class="d-trail-word">MOVE</p>
</div>`,
  css: `
.d-trail {
  position: relative; width: 100%; height: 320px;
  background: #0a0a0b; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.d-trail-word { font-size: 90px; font-weight: 700; color: #161619; letter-spacing: 0.02em; pointer-events: none; }
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
.d-trail-img { animation: d-trail-pop 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }`,
  js: `
// procedural "photos" so the demo needs no assets — swap for real <img> tags
const hues = [78, 200, 320, 30, 160];
let last = { x: 0, y: 0 }, count = 0;

function spawn(x, y) {
  const el = document.createElement('div');
  el.className = 'd-trail-img';
  const h = hues[count % hues.length];
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.setProperty('--r', ((Math.random() * 14) - 7) + 'deg');
  el.style.background = 'linear-gradient(160deg, hsl(' + h + ' 80% 60% / 0.9), hsl(' + h + ' 60% 20%))';
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
- An array of image URLs cycles as the source.
- Track mousemove inside a hero section; when the pointer has moved more than ~90px from the last spawn point, spawn the next image centered at the cursor.
- Each image plays a one-shot CSS keyframe animation: scale 0.4 -> 1 with fade-in over the first 20%, then drifts upward, scales to 0.9 and fades out by 100% (total ~1s, cubic-bezier(0.22,1,0.36,1)).
- Give each image a random rotation between -7deg and 7deg via a CSS custom property.
- Increment z-index per spawn so newer images stack on top; remove each node when its animation ends.
- Images are pointer-events: none. Disable on touch devices.`,
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
  <div class="d-spot-base"><h2>WHAT YOU SEE</h2></div>
  <div class="d-spot-hidden"><h2>WHAT YOU GET</h2></div>
</div>`,
  css: `
.d-spot { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; }
.d-spot-base, .d-spot-hidden {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.d-spot-base h2 { font-size: 56px; font-weight: 700; color: #232327; letter-spacing: -0.02em; }
.d-spot-hidden {
  background: #c8ff2e;
  -webkit-mask-image: radial-gradient(circle 110px at var(--x, -200px) var(--y, -200px), #000 98%, transparent 100%);
          mask-image: radial-gradient(circle 110px at var(--x, -200px) var(--y, -200px), #000 98%, transparent 100%);
}
.d-spot-hidden h2 { font-size: 56px; font-weight: 700; color: #0a0a0b; letter-spacing: -0.02em; }`,
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
- Two stacked full-size layers: a base layer and a hidden layer with completely different content/colors.
- The hidden layer uses CSS mask-image: radial-gradient(circle 110px at var(--x) var(--y), black 98%, transparent 100%) so it is only visible in a circle around the cursor.
- Update --x/--y CSS custom properties from mousemove, but lerp toward the pointer (factor ~0.15) in a rAF loop so the spotlight trails slightly.
- On mouseleave, park the mask far off-canvas so the hidden layer disappears.
- Include the -webkit-mask-image prefix. Disable on touch devices.`,
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
      <span class="d-tilt-tag">INTRX-05</span>
      <h3>Perspective<br>does the work.</h3>
      <p>rotateX / rotateY + translateZ</p>
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
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(200,255,46,0.16) 0%, transparent 45%);
  pointer-events: none;
}
.d-tilt-content { position: relative; padding: 24px; transform: translateZ(40px); }
.d-tilt-tag { font-family: "JetBrains Mono", monospace; font-size: 10px; color: #c8ff2e; letter-spacing: 0.2em; }
.d-tilt-content h3 { color: #ececef; font-size: 24px; line-height: 1.15; margin: 10px 0 8px; }
.d-tilt-content p { color: #5c5c66; font-family: "JetBrains Mono", monospace; font-size: 11px; }`,
  js: `
const card = root.querySelector('.d-tilt-card');
const MAX = 10; // degrees

card.addEventListener('mousemove', function (e) {
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
  prompt: `
Build a 3D tilt card with glare, vanilla JS.

Requirements:
- Parent container has perspective: 900px; the card has transform-style: preserve-3d.
- On mousemove, normalize the cursor position over the card (0..1) and map to rotateX/rotateY, max ±10deg, so the card tilts toward the cursor.
- A glare layer (radial-gradient, pointer-events: none) follows the cursor via --gx/--gy custom properties.
- Inner content sits at translateZ(40px) so it visually floats above the card surface.
- transition: transform 0.15s ease-out on the card smooths the motion; on mouseleave everything resets to 0.
- Disable on touch devices.`,
});
