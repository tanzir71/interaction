/* INTRX registry — CURSOR */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

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
