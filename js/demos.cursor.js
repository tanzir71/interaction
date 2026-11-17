/* INTRX remaining Cursor interactions. */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

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
