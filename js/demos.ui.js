/* INTRX registry — LAYOUT & UI */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Mac-style minimize / maximize
------------------------------------------------------------ */
INTRX.register({
  id: 'mac-window',
  title: 'Mac Minimize / Maximize',
  cat: 'Layout & UI',
  rootClass: 'd-mac',
  tags: ['flip', 'window'],
  libs: [],
  desc: 'A window shrinks into its dock item with scale + translate + fade (macOS "scale effect"), and springs back on click. Computed FLIP-style from real element positions, so it works at any layout.',
  seen: 'Seen on: macOS itself; web recreations on portfolio OS-themed sites',
  hint: 'click the yellow dot, then the dock item',
  html: `
<div class="d-mac">
  <div class="d-mac-window">
    <div class="d-mac-titlebar">
      <span class="d-mac-dot d-mac-red"></span>
      <span class="d-mac-dot d-mac-yellow"></span>
      <span class="d-mac-dot d-mac-green"></span>
      <em>interactions.app</em>
    </div>
    <div class="d-mac-body">
      <p>Click <b>●</b> yellow to minimize.</p>
    </div>
  </div>
  <div class="d-mac-dock">
    <div class="d-mac-dockitem" data-app="finder"></div>
    <div class="d-mac-dockitem d-mac-target"></div>
    <div class="d-mac-dockitem" data-app="term"></div>
  </div>
</div>`,
  css: `
.d-mac {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.d-mac-window {
  width: 320px; height: 190px;
  background: #161619; border: 1px solid #2e2e34; border-radius: 8px;
  overflow: hidden;
  transform-origin: center center;
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}
.d-mac-window.d-mac-animating { transition: transform 0.55s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.45s ease; }
.d-mac-window.d-mac-min { pointer-events: none; }
.d-mac-titlebar {
  height: 30px; display: flex; align-items: center; gap: 6px; padding: 0 10px;
  background: #101012; border-bottom: 1px solid #232327;
}
.d-mac-titlebar em { font-style: normal; font-family: "Roboto Mono", "JetBrains Mono", monospace; font-size: 10px; color: #5c5c66; margin-left: 8px; }
.d-mac-dot { width: 11px; height: 11px; border-radius: 50%; cursor: pointer; }
.d-mac-dot.d-mac-red { background: #ff5f57; }
.d-mac-dot.d-mac-yellow { background: #febc2e; }
.d-mac-dot.d-mac-green { background: #28c840; }
.d-mac-body { padding: 20px; color: #9b9ba3; font-size: 14px; }
.d-mac-body b { color: #febc2e; }
.d-mac-dock {
  position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 10px; padding: 8px 12px;
  background: rgba(255,255,255,0.06); border: 1px solid #2e2e34; border-radius: 12px;
  backdrop-filter: blur(8px);
}
.d-mac-dockitem {
  width: 36px; height: 36px; border-radius: 8px;
  background: linear-gradient(160deg, #2e2e34, #161619);
  border: 1px solid #3a3a42;
}
.d-mac-target { position: relative; cursor: pointer; }
.d-mac-target::after {
  content: ""; position: absolute; inset: 8px;
  border: 2px solid #fa7319; border-radius: 4px;
  opacity: 0.35; transition: opacity 0.2s;
}
.d-mac-target.d-mac-occupied::after { opacity: 1; }
.d-mac-target.d-mac-occupied { box-shadow: 0 0 18px rgba(250,115,25,0.25); }
.d-mac.d-mac-idle .d-mac-dot { animation: d-mac-idle 3.6s ease-in-out infinite; }
.d-mac.d-mac-idle .d-mac-yellow { animation-delay: .18s; }
.d-mac.d-mac-idle .d-mac-green { animation-delay: .36s; }
@keyframes d-mac-idle { 0%, 18%, 100% { transform: scale(1); opacity: .72; } 9% { transform: scale(1.22); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .d-mac.d-mac-idle .d-mac-dot { animation: none; } }`,
  js: `
const win = root.querySelector('.d-mac-window');
const target = root.querySelector('.d-mac-target');
const yellow = root.querySelector('.d-mac-dot.d-mac-yellow');
let minimized = false;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let idle = !reduced;

function stopIdle() {
  if (!idle) return;
  idle = false;
  root.classList.remove('d-mac-idle');
}
if (!reduced) {
  root.classList.add('d-mac-idle');
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

// FLIP: measure both boxes, transform the window into the dock item
function toDock() {
  stopIdle();
  const w = win.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  const dx = (t.left + t.width / 2) - (w.left + w.width / 2);
  const dy = (t.top + t.height / 2) - (w.top + w.height / 2);
  const s = t.width / w.width;
  win.classList.add('d-mac-animating', 'd-mac-min');
  win.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
  win.style.opacity = '0';
  target.classList.add('d-mac-occupied');
  minimized = true;
}

function fromDock() {
  stopIdle();
  win.classList.add('d-mac-animating');
  win.classList.remove('d-mac-min');
  win.style.transform = 'translate(0, 0) scale(1)';
  win.style.opacity = '1';
  target.classList.remove('d-mac-occupied');
  minimized = false;
}

yellow.addEventListener('click', function () { if (!minimized) toDock(); });
target.addEventListener('click', function () { if (minimized) fromDock(); });

// clean up the transition class when done
win.addEventListener('transitionend', function () { win.classList.remove('d-mac-animating'); });`,
  prompt: `
Recreate the macOS minimize/maximize ("scale effect") window animation on the web, vanilla JS.

Requirements:
- A window element and a dock item element anywhere in the layout.
- Minimize (FLIP technique): measure both getBoundingClientRect()s; compute dx/dy between centers and scale = dockWidth / windowWidth; apply transform: translate(dx, dy) scale(s) plus opacity: 0, with transition cubic-bezier(0.32, 0.72, 0, 1) over ~0.55s — that bezier is the Apple-feel curve (fast start, long soft landing).
- Maximize: reset transform to translate(0,0) scale(1) and opacity 1 with the same curve.
- transform-origin: center; the window keeps pointer-events: none while minimized; the dock item shows an "occupied" indicator.
- Because positions are measured at click time, it must work responsively at any layout.
- Before interaction, let the semantic traffic lights breathe subtly; stop that teaser permanently on first pointer or keyboard interaction and disable it for reduced motion.
- Keep the window chrome grayscale, retaining red/amber/green only for the semantic traffic lights and the site accent for the active dock target.
- Bonus: for a genie-style bend, note that it requires rendering the window to a canvas/WebGL mesh and warping vertices — offer scale as the practical default.`,
});

/* ------------------------------------------------------------
   Mac dock magnification
------------------------------------------------------------ */
INTRX.register({
  id: 'dock-magnify',
  title: 'Dock Magnification',
  cat: 'Layout & UI',
  rootClass: 'd-dock',
  tags: ['proximity', 'gaussian'],
  libs: [],
  desc: 'Icons swell as the cursor nears, with neighbors partially magnified by a smooth distance falloff — the macOS dock, in ~20 lines.',
  seen: 'Seen on: macOS; web versions on developer portfolios and OS-style sites',
  hint: 'glide along the dock',
  html: `
<div class="d-dock">
  <div class="d-dock-bar">
    <div class="d-dock-icon" style="--h:78"></div>
    <div class="d-dock-icon" style="--h:200"></div>
    <div class="d-dock-icon" style="--h:320"></div>
    <div class="d-dock-icon" style="--h:28"></div>
    <div class="d-dock-icon" style="--h:120"></div>
    <div class="d-dock-icon" style="--h:265"></div>
    <div class="d-dock-icon" style="--h:0"></div>
  </div>
</div>`,
  css: `
.d-dock {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: flex-end; justify-content: center; padding-bottom: 36px;
}
.d-dock-bar {
  display: flex; align-items: flex-end; gap: 10px; padding: 10px 14px;
  border: 1px solid #2e2e34; border-radius: 16px;
  background: rgba(255,255,255,0.05); backdrop-filter: blur(8px);
  height: 74px;
}
.d-dock-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: linear-gradient(160deg, hsl(var(--h) 75% 55%), hsl(var(--h) 75% 25%));
  border: 1px solid rgba(255,255,255,0.15);
  transform-origin: bottom center;
  will-change: transform;
}`,
  js: `
const icons = [].slice.call(root.querySelectorAll('.d-dock-icon'));
const bar = root.querySelector('.d-dock-bar');
const RANGE = 110;   // px of influence
const MAX = 0.9;     // extra scale at the cursor

let mx = null;
bar.addEventListener('mousemove', function (e) { mx = e.clientX; });
bar.addEventListener('mouseleave', function () { mx = null; });

(function tick() {
  icons.forEach(function (icon) {
    let scale = 1;
    if (mx !== null) {
      const b = icon.getBoundingClientRect();
      const d = Math.abs(mx - (b.left + b.width / 2));
      const t = Math.max(0, 1 - d / RANGE);
      scale = 1 + MAX * (t * t * (3 - 2 * t));   // smoothstep falloff
    }
    // lerp for a fluid feel
    const cur = parseFloat(icon.dataset.s || 1);
    const next = cur + (scale - cur) * 0.25;
    icon.dataset.s = next;
    icon.style.transform = 'scale(' + next.toFixed(4) + ')';
  });
  requestAnimationFrame(tick);
})();`,
  prompt: `
Recreate macOS dock magnification in vanilla JS.

Requirements:
- A horizontal row of icons with transform-origin: bottom center.
- Track the cursor x over the dock. Per icon, distance d from the icon center maps to influence t = max(0, 1 - d / 110), shaped with smoothstep (t*t*(3-2t)).
- Target scale = 1 + 0.9 * influence. In a rAF loop, lerp each icon's current scale toward its target (factor ~0.25) so motion is fluid rather than snappy.
- On mouseleave, targets return to 1 and everything settles back.
- Icons should not shift layout — scale only (gaps absorb the growth), will-change: transform.
- Disable on touch devices.`,
});

/* ------------------------------------------------------------
   FLIP card expand
------------------------------------------------------------ */
INTRX.register({
  id: 'flip-expand',
  title: 'FLIP Card Expand',
  cat: 'Layout & UI',
  tags: ['flip', 'shared element'],
  rootClass: 'd-flip',
  libs: [],
  desc: 'Click a thumbnail and it grows seamlessly into a detail view using the FLIP technique — layout change first, then an inverted transform plays back. The web version of a shared-element transition.',
  seen: 'Seen on: App Store cards, linear.app, Framer showcase sites',
  hint: 'click a card / click again to close',
  html: `
<div class="d-flip">
  <div class="d-flip-grid">
    <div class="d-flip-card" style="--c1:#3c5a18;--c2:#0f1a08"><span>Alpha</span></div>
    <div class="d-flip-card" style="--c1:#1f3a52;--c2:#0b141f"><span>Beta</span></div>
    <div class="d-flip-card" style="--c1:#52301f;--c2:#1f0b0b"><span>Gamma</span></div>
  </div>
</div>`,
  css: `
.d-flip {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-flip-grid { display: flex; gap: 16px; }
.d-flip-card {
  width: 130px; height: 180px; cursor: pointer;
  background: linear-gradient(160deg, var(--c1), var(--c2));
  border: 1px solid #2e2e34;
  display: flex; align-items: flex-end; padding: 14px;
  color: #fff; font-weight: 600;
  transform-origin: top left;
}
.d-flip-card.d-flip-expanded {
  position: absolute; inset: 16px; width: auto; height: auto; z-index: 5;
  font-size: 28px;
}
.d-flip-card.d-flip-animating { transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1); }`,
  js: `
root.querySelectorAll('.d-flip-card').forEach(function (card) {
  card.addEventListener('click', function () {
    const expanding = !card.classList.contains('d-flip-expanded');

    // FIRST: measure where it is now
    const first = card.getBoundingClientRect();

    // LAST: change layout instantly
    card.classList.toggle('d-flip-expanded', expanding);
    const last = card.getBoundingClientRect();

    // INVERT: transform it back to where it was
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';

    // PLAY: release to identity on the next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.classList.add('d-flip-animating');
        card.style.transform = 'none';
      });
    });

    card.addEventListener('transitionend', function h() {
      card.classList.remove('d-flip-animating');
      card.removeEventListener('transitionend', h);
    });
  });
});`,
  prompt: `
Implement a FLIP expand/collapse transition, vanilla JS.

Requirements:
- FIRST: getBoundingClientRect() of the element before the layout change.
- LAST: toggle the expanded class (element becomes absolutely positioned filling its container) and measure again.
- INVERT: set transform = translate(dx, dy) scale(sx, sy) computed from the two rects so it appears unmoved (transform-origin: top left).
- PLAY: on the next frame (double rAF), enable the transition class and set transform: none; the browser animates from inverted to identity — animating layout at compositor cost only.
- Use cubic-bezier(0.32, 0.72, 0, 1), ~0.5s. Clean up the transition class on transitionend.
- Same code path handles both expand and collapse since FLIP is direction-agnostic.
- Mention document.startViewTransition as the emerging native alternative.`,
});

/* ------------------------------------------------------------
   Smooth accordion
------------------------------------------------------------ */
INTRX.register({
  id: 'smooth-accordion',
  title: 'Smooth Accordion',
  cat: 'Layout & UI',
  rootClass: 'd-acc',
  tags: ['grid 0fr', 'height auto'],
  libs: [],
  desc: 'Animating to height:auto — the classic impossible — solved with the grid-template-rows 0fr→1fr trick. No JS measurement, no max-height hacks.',
  seen: 'Seen on: FAQ sections everywhere; the 0fr trick via Kevin Powell',
  hint: 'click the rows',
  html: `
<div class="d-acc">
  <div class="d-acc-list">
    <div class="d-acc-item d-acc-open">
      <button class="d-acc-head">Why not max-height?<i>+</i></button>
      <div class="d-acc-body"><div class="d-acc-inner">Because you must guess a value — too small clips, too large ruins the timing. 0fr→1fr animates to the true content height.</div></div>
    </div>
    <div class="d-acc-item">
      <button class="d-acc-head">How does 0fr work?<i>+</i></button>
      <div class="d-acc-body"><div class="d-acc-inner">The body is a 1-row CSS grid. Rows sized in fr units are animatable, and the inner element just needs min-height: 0 + overflow hidden.</div></div>
    </div>
    <div class="d-acc-item">
      <button class="d-acc-head">Browser support?<i>+</i></button>
      <div class="d-acc-body"><div class="d-acc-inner">All modern browsers since 2023. For older targets, fall back to measuring scrollHeight in JS.</div></div>
    </div>
  </div>
</div>`,
  css: `
.d-acc {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-acc-list { width: min(480px, 90%); border: 1px solid #232327; }
.d-acc-item { border-bottom: 1px solid #232327; }
.d-acc-item:last-child { border-bottom: none; }
.d-acc-head {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  background: #101012; border: none; color: #ececef; cursor: pointer;
  font-size: 14px; font-weight: 600; font-family: inherit; padding: 14px 16px;
}
.d-acc-head i {
  font-style: normal; color: #c8ff2e; font-size: 16px;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.d-acc-item.d-acc-open .d-acc-head i { transform: rotate(45deg); }
.d-acc-body {
  display: grid; grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.d-acc-item.d-acc-open .d-acc-body { grid-template-rows: 1fr; }
.d-acc-inner { min-height: 0; overflow: hidden; padding: 0 16px; color: #9b9ba3; font-size: 13px; line-height: 1.6; }
.d-acc-item.d-acc-open .d-acc-inner { padding-bottom: 14px; }`,
  js: `
root.querySelectorAll('.d-acc-head').forEach(function (head) {
  head.addEventListener('click', function () {
    const item = head.parentElement;
    const wasOpen = item.classList.contains('d-acc-open');
    // close others (single-open behavior)
    root.querySelectorAll('.d-acc-item').forEach(function (i) { i.classList.remove('d-acc-open'); });
    if (!wasOpen) item.classList.add('d-acc-open');
  });
});`,
  prompt: `
Build a smooth accordion that animates to auto height, using the CSS grid 0fr trick.

Requirements:
- Each panel body: display: grid; grid-template-rows: 0fr; transition on grid-template-rows (~0.45s, cubic-bezier(0.22,1,0.36,1)). Open state sets 1fr.
- The direct child needs min-height: 0 and overflow: hidden — this is mandatory for the collapse to work.
- A rotating +/× indicator on the header (transform: rotate(45deg)).
- JS only toggles classes; single-open behavior (opening one closes the rest).
- Use button elements with aria-expanded, and hook up prefers-reduced-motion to disable the transition.`,
});

/* ------------------------------------------------------------
   Springy modal
------------------------------------------------------------ */
INTRX.register({
  id: 'spring-modal',
  title: 'Spring Modal',
  cat: 'Layout & UI',
  rootClass: 'd-modal',
  tags: ['overshoot', 'backdrop'],
  libs: [],
  desc: 'A dialog that enters with scale overshoot (0.9 → 1.02 → 1) and a fading backdrop blur, and exits quickly downward. Snappy in, forgettable out — the correct asymmetry.',
  seen: 'Seen on: linear.app, raycast.com, every polished SaaS product',
  hint: 'open the modal',
  html: `
<div class="d-modal">
  <button class="d-modal-open">Open modal</button>
  <div class="d-modal-backdrop">
    <div class="d-modal-box">
      <h3>Ship it?</h3>
      <p>Enter springs with overshoot. Exit is fast and subtle — users never wait for a closing animation.</p>
      <div class="d-modal-actions">
        <button class="d-modal-cancel">Cancel</button>
        <button class="d-modal-confirm">Confirm</button>
      </div>
    </div>
  </div>
</div>`,
  css: `
.d-modal {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.d-modal-open {
  background: #c8ff2e; color: #000; border: none; font-family: inherit;
  font-size: 14px; font-weight: 600; padding: 12px 24px; cursor: pointer;
}
.d-modal-backdrop {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(0px);
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s, backdrop-filter 0.25s;
}
.d-modal-backdrop.d-modal-show { opacity: 1; pointer-events: auto; backdrop-filter: blur(4px); }
.d-modal-box {
  width: min(340px, 85%); background: #161619; border: 1px solid #2e2e34;
  padding: 24px; transform: scale(0.9) translateY(12px); opacity: 0;
}
.d-modal-backdrop.d-modal-show .d-modal-box { animation: d-modal-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.d-modal-backdrop.d-modal-hide .d-modal-box { animation: d-modal-out 0.18s ease-in forwards; }
@keyframes d-modal-in {
  from { transform: scale(0.9) translateY(12px); opacity: 0; }
  to   { transform: scale(1) translateY(0);      opacity: 1; }
}
@keyframes d-modal-out {
  from { transform: scale(1) translateY(0);      opacity: 1; }
  to   { transform: scale(0.96) translateY(8px); opacity: 0; }
}
.d-modal-box h3 { color: #ececef; margin-bottom: 8px; }
.d-modal-box p { color: #9b9ba3; font-size: 13px; margin-bottom: 18px; }
.d-modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
.d-modal-actions button { font-family: inherit; font-size: 13px; padding: 8px 16px; cursor: pointer; }
.d-modal-cancel  { background: none; border: 1px solid #2e2e34; color: #9b9ba3; }
.d-modal-confirm { background: #c8ff2e; border: none; color: #000; font-weight: 600; }`,
  js: `
const backdrop = root.querySelector('.d-modal-backdrop');

function open() { backdrop.classList.remove('d-modal-hide'); backdrop.classList.add('d-modal-show'); }
function close() {
  backdrop.classList.add('d-modal-hide');
  setTimeout(function () { backdrop.classList.remove('d-modal-show', 'd-modal-hide'); }, 180);
}

root.querySelector('.d-modal-open').addEventListener('click', open);
root.querySelector('.d-modal-cancel').addEventListener('click', close);
root.querySelector('.d-modal-confirm').addEventListener('click', close);
backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });`,
  prompt: `
Build a spring-animated modal, vanilla JS + CSS.

Requirements:
- Backdrop: rgba black + backdrop-filter blur(4px), fading in over 0.25s; clicking it closes the modal.
- Enter animation: scale 0.9 / translateY(12px) / opacity 0 to identity, 0.45s with cubic-bezier(0.34, 1.56, 0.64, 1) — the >1 y-value produces the overshoot "spring".
- Exit animation: intentionally different — 0.18s ease-in, scale to 0.96, translateY(8px), fade out. Fast exits, springy entries.
- Manage with .show/.hide classes and a timeout matching the exit duration.
- Accessibility: role=dialog, aria-modal, focus trap, Escape to close, return focus to the trigger on close.
- Prefer the native <dialog> element where possible; the animation classes work the same.`,
});

/* ------------------------------------------------------------
   Drag carousel with inertia
------------------------------------------------------------ */
INTRX.register({
  id: 'drag-carousel',
  title: 'Inertia Drag Carousel',
  cat: 'Layout & UI',
  rootClass: 'd-drag',
  tags: ['pointer events', 'momentum'],
  libs: [],
  desc: 'Grab-and-throw horizontal gallery: pointer drag maps 1:1, release keeps velocity and decays with friction, edges resist with rubber-banding.',
  seen: 'Seen on: siena.film, awwwards galleries, mobile-first portfolios',
  hint: 'drag / throw the row',
  html: `
<div class="d-drag">
  <div class="d-drag-track">
    <div class="d-drag-cell">01</div><div class="d-drag-cell">02</div>
    <div class="d-drag-cell">03</div><div class="d-drag-cell">04</div>
    <div class="d-drag-cell">05</div><div class="d-drag-cell">06</div>
    <div class="d-drag-cell">07</div><div class="d-drag-cell">08</div>
  </div>
</div>`,
  css: `
.d-drag {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; overflow: hidden; cursor: grab;
}
.d-drag:active { cursor: grabbing; }
.d-drag-track { display: flex; gap: 14px; padding: 0 24px; will-change: transform; }
.d-drag-cell {
  flex: 0 0 190px; height: 220px;
  border: 1px solid #2e2e34; background: linear-gradient(160deg, #161619, #101012);
  color: #5c5c66; font-size: 40px; font-weight: 700;
  display: flex; align-items: flex-end; padding: 14px;
  user-select: none;
}`,
  js: `
const track = root.querySelector('.d-drag-track');
let x = 0, vel = 0, dragging = false, lastX = 0;

function maxScroll() { return Math.max(0, track.scrollWidth - root.clientWidth + 48); }

root.addEventListener('pointerdown', function (e) {
  dragging = true; lastX = e.clientX; vel = 0;
  root.setPointerCapture(e.pointerId);
});
root.addEventListener('pointermove', function (e) {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  lastX = e.clientX;
  x -= dx;
  vel = -dx;                       // velocity from the last move
});
root.addEventListener('pointerup', function () { dragging = false; });
root.addEventListener('pointercancel', function () { dragging = false; });

(function tick() {
  if (!dragging) {
    x += vel;
    vel *= 0.94;                   // friction
  }
  // rubber-band the edges
  if (x < 0)            x += (0 - x) * 0.12;
  if (x > maxScroll())  x += (maxScroll() - x) * 0.12;
  track.style.transform = 'translateX(' + (-x) + 'px)';
  requestAnimationFrame(tick);
})();`,
  prompt: `
Build a drag carousel with inertia, vanilla JS (Pointer Events).

Requirements:
- pointerdown starts a drag (setPointerCapture); pointermove applies the delta 1:1 to a position value and records velocity from the last delta; pointerup releases.
- A permanent rAF loop: when not dragging, position += velocity and velocity *= 0.94 (friction) so throws glide to a stop.
- Rubber-band edges: when position is out of bounds, ease it back with pos += (bound - pos) * 0.12 — during drag this creates natural resistance.
- Apply as translateX on the track (transform only, will-change).
- cursor: grab / grabbing; user-select: none on cells; prevent native image drag.
- Ignore click events that follow a real drag (movement > a few px) so cells stay clickable.`,
});

/* ------------------------------------------------------------
   Hover fill button
------------------------------------------------------------ */
INTRX.register({
  id: 'hover-fill-button',
  title: 'Directional Hover Fill',
  cat: 'Layout & UI',
  rootClass: 'd-fill',
  tags: ['circle grow', 'entry point'],
  libs: [],
  desc: 'A circle expands from the exact point where the cursor entered the button and retreats toward the exit point. Entry/exit-aware fills read as far more "alive" than a flat swap.',
  seen: 'Seen on: camillemormal.com, studio CTAs across awwwards',
  hint: 'enter the buttons from different sides',
  html: `
<div class="d-fill">
  <button class="d-fill-btn"><span class="d-fill-circle"></span><em>Discover</em></button>
  <button class="d-fill-btn"><span class="d-fill-circle"></span><em>Contact</em></button>
</div>`,
  css: `
.d-fill {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; gap: 32px;
}
.d-fill-btn {
  position: relative; overflow: hidden;
  background: none; border: 1px solid #2e2e34; color: #ececef;
  font-family: inherit; font-size: 15px; font-weight: 500;
  padding: 16px 40px; cursor: pointer;
  transition: color 0.3s;
}
.d-fill-btn em { position: relative; font-style: normal; z-index: 1; }
.d-fill-btn:hover { color: #000; }
.d-fill-circle {
  position: absolute; left: 0; top: 0; width: 20px; height: 20px;
  background: #c8ff2e; border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.d-fill-btn:hover .d-fill-circle { transform: translate(-50%, -50%) scale(14); }`,
  js: `
root.querySelectorAll('.d-fill-btn').forEach(function (btn) {
  const circle = btn.querySelector('.d-fill-circle');
  function place(e) {
    const b = btn.getBoundingClientRect();
    circle.style.left = (e.clientX - b.left) + 'px';
    circle.style.top = (e.clientY - b.top) + 'px';
  }
  // position the circle at entry AND exit so it grows/shrinks from the right spot
  btn.addEventListener('mouseenter', place);
  btn.addEventListener('mouseleave', place);
});`,
  prompt: `
Build a directional hover-fill button, vanilla JS + CSS.

Requirements:
- Inside an overflow-hidden button, an absolutely-positioned circle (border-radius 50%, ~20px) starts at transform: translate(-50%,-50%) scale(0).
- On mouseenter, set the circle's left/top to the cursor position relative to the button, then the :hover CSS scales it to ~scale(14) with cubic-bezier(0.22,1,0.36,1) over 0.45s so it floods the button from the entry point.
- On mouseleave, re-place the circle at the exit point before the reverse transition, so it shrinks toward where the cursor left.
- The label sits above the circle (z-index) and its color transitions to the inverse on hover.
- Scale must be large enough to cover the button diagonal from any corner (compute or overshoot).`,
});

/* ------------------------------------------------------------
   Page transition curtain
------------------------------------------------------------ */
INTRX.register({
  id: 'page-transition',
  title: 'Page Transition Curtain',
  cat: 'Layout & UI',
  tags: ['columns', 'navigation'],
  rootClass: 'd-curtain',
  libs: [],
  desc: 'Navigation triggers vertical panels that sweep in with a stagger, swap the content while covered, then sweep away. The full-screen wipe between pages on award sites.',
  seen: 'Seen on: obys.agency, holographik.com, most SOTD navigations',
  hint: 'click "navigate"',
  html: `
<div class="d-curtain">
  <div class="d-curtain-page">
    <h2 class="d-curtain-title">HOME</h2>
    <button class="d-curtain-go">navigate →</button>
  </div>
  <div class="d-curtain-panels">
    <div class="d-curtain-panel" style="--d:0s"></div>
    <div class="d-curtain-panel" style="--d:0.07s"></div>
    <div class="d-curtain-panel" style="--d:0.14s"></div>
    <div class="d-curtain-panel" style="--d:0.21s"></div>
  </div>
</div>`,
  css: `
.d-curtain { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; }
.d-curtain-page {
  height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px;
}
.d-curtain-title { font-size: 56px; font-weight: 700; color: #ececef; letter-spacing: -0.02em; }
.d-curtain-go {
  background: none; border: 1px solid #2e2e34; color: #9b9ba3;
  font-family: "JetBrains Mono", monospace; font-size: 12px; padding: 10px 20px; cursor: pointer;
}
.d-curtain-go:hover { color: #c8ff2e; border-color: #c8ff2e; }
.d-curtain-panels { position: absolute; inset: 0; display: flex; pointer-events: none; }
.d-curtain-panel {
  flex: 1; background: #c8ff2e;
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transition-delay: var(--d);
}
.d-curtain.d-curtain-covering .d-curtain-panel { transform: scaleY(1); }
.d-curtain.d-curtain-revealing .d-curtain-panel { transform: scaleY(0); transform-origin: bottom; }`,
  js: `
const PAGES = ['HOME', 'WORK', 'ABOUT', 'CONTACT'];
let page = 0, busy = false;
const title = root.querySelector('.d-curtain-title');

root.querySelector('.d-curtain-go').addEventListener('click', function () {
  if (busy) return;
  busy = true;
  root.classList.remove('d-curtain-revealing');
  root.classList.add('d-curtain-covering');

  // wait for cover (0.5s + last panel delay 0.21s)
  setTimeout(function () {
    page = (page + 1) % PAGES.length;
    title.textContent = PAGES[page];          // swap content while hidden
    root.classList.remove('d-curtain-covering');
    root.classList.add('d-curtain-revealing');
    setTimeout(function () { busy = false; }, 750);
  }, 750);
});`,
  prompt: `
Build a curtain page-transition, vanilla JS + CSS.

Requirements:
- A fixed full-screen overlay of 4 vertical panels (flex: 1 each), each transform: scaleY(0), transform-origin: top.
- Cover phase: panels scale to 1 with cubic-bezier(0.76, 0, 0.24, 1) over 0.5s, staggered 70ms left-to-right via --d transition delays.
- While fully covered, swap the page content (or let the router navigate).
- Reveal phase: switch transform-origin to bottom and scale back to 0 with the same stagger, so the curtain exits downward instead of retracting.
- Guard with a busy flag; total cover time = duration + last stagger.
- For real multi-page sites, mention the View Transitions API and intercepting link clicks.`,
});

/* ------------------------------------------------------------
   Infinite logo marquee
------------------------------------------------------------ */
INTRX.register({
  id: 'logo-marquee',
  title: 'Infinite Logo Marquee',
  cat: 'Layout & UI',
  rootClass: 'd-logos',
  tags: ['css animation', 'mask fade'],
  libs: [],
  desc: 'The pure-CSS infinite logo strip: content duplicated once, animated -50%, edges faded with a mask, paused on hover. Zero JS, perfectly seamless.',
  seen: 'Seen on: every SaaS landing page "trusted by" section',
  hint: 'hover to pause',
  html: `
<div class="d-logos">
  <div class="d-logos-strip">
    <div class="d-logos-row">
      <span>ACME</span><span>VERTEX</span><span>NORTH</span><span>OKTA∆</span><span>LUMEN</span><span>ARRAY</span>
      <span>ACME</span><span>VERTEX</span><span>NORTH</span><span>OKTA∆</span><span>LUMEN</span><span>ARRAY</span>
    </div>
  </div>
</div>`,
  css: `
.d-logos {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-logos-strip {
  width: min(560px, 92%); overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
}
.d-logos-row {
  display: flex; gap: 48px; width: max-content;
  animation: d-logos-scroll 18s linear infinite;
}
.d-logos-strip:hover .d-logos-row { animation-play-state: paused; }
.d-logos-row span {
  font-family: "JetBrains Mono", monospace; font-size: 20px; font-weight: 700;
  color: #5c5c66; letter-spacing: 0.08em; white-space: nowrap;
  transition: color 0.3s;
}
.d-logos-row span:hover { color: #c8ff2e; }
@keyframes d-logos-scroll {
  to { transform: translateX(calc(-50% - 24px)); }   /* -50% minus half the gap */
}`,
  js: `
// Pure CSS. For dynamic logo lists, duplicate the content once in JS:
// const row = root.querySelector('.d-logos-row');
// row.innerHTML += row.innerHTML;`,
  prompt: `
Build an infinite logo marquee in pure CSS.

Requirements:
- A single row of logos duplicated exactly once (list rendered twice back-to-back), width: max-content, display: flex with a fixed gap.
- Keyframe animation translateX from 0 to calc(-50% - gap/2) looping linearly (~18s); because the content repeats exactly at that offset, the loop is invisible.
- Fade the strip's edges with mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent) — include the -webkit prefix.
- Pause on hover with animation-play-state: paused.
- Logos are dimmed by default and brighten individually on hover.
- Respect prefers-reduced-motion by pausing the animation.`,
});
