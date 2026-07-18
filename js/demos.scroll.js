/* INTRX registry — SCROLL */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   001 Lenis smooth scroll
------------------------------------------------------------ */
INTRX.register({
  id: 'lenis-smooth-scroll',
  title: 'Lenis Smooth Scroll',
  cat: 'Scroll',
  rootClass: 'd-lenis',
  tags: ['inertia', 'lerp'],
  libs: ['lenis'],
  desc: 'Buttery, inertia-based scrolling that decouples the scroll position from raw wheel input. The baseline of nearly every awwwards site.',
  seen: 'Seen on: lenis.darkroom.engineering, most Studio Freight / Darkroom projects',
  hint: 'scroll inside the panel',
  html: `
<div class="d-lenis">
  <div class="d-lenis-content">
    <section><h2>01 — Native scroll is instant.</h2></section>
    <section><h2>02 — Lenis interpolates it.</h2></section>
    <section><h2>03 — Every frame eases toward the target.</h2></section>
    <section><h2>04 — That is the entire trick.</h2></section>
  </div>
</div>`,
  css: `
.d-lenis { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-lenis::-webkit-scrollbar { width: 3px; }
.d-lenis::-webkit-scrollbar-thumb { background: #c8ff2e; }
.d-lenis-content section {
  height: 260px; display: flex; align-items: center; padding: 0 48px;
  border-bottom: 1px solid #232327;
}
.d-lenis-content h2 {
  font-size: clamp(18px, 3vw, 30px); font-weight: 600; letter-spacing: -0.02em; color: #ececef;
}`,
  js: `
// For a full page: new Lenis({ lerp: 0.1 }) with no wrapper option.
const lenis = new Lenis({
  wrapper: root,               // the scroll container
  content: root.firstElementChild,
  lerp: 0.09,                  // lower = smoother / floatier
  wheelMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);`,
  prompt: `
Implement Lenis smooth scrolling on my website.

Requirements:
- Use the "lenis" npm package (or CDN: https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js).
- Initialize with lerp around 0.09-0.1 for a smooth but responsive feel.
- Drive it with a requestAnimationFrame loop (lenis.raf(time)).
- If GSAP ScrollTrigger is present, sync them: lenis.on('scroll', ScrollTrigger.update) and drive Lenis from gsap.ticker instead of a raw rAF loop.
- Respect prefers-reduced-motion: skip Lenis entirely when the user has it enabled.
- Anchors (#links) should still work: intercept clicks and call lenis.scrollTo(target).`,
});

/* ------------------------------------------------------------
   002 Scroll-triggered stagger reveal
------------------------------------------------------------ */
INTRX.register({
  id: 'scroll-reveal-stagger',
  title: 'Staggered Scroll Reveal',
  cat: 'Scroll',
  rootClass: 'd-reveal',
  tags: ['intersection observer', 'stagger'],
  libs: [],
  desc: 'Elements translate up and fade in as they enter the viewport, each one slightly delayed after the previous. The workhorse entrance of modern editorial sites.',
  seen: 'Seen on: virtually every agency portfolio — Locomotive, Obys, Studio Freight',
  hint: 'scroll inside the panel',
  html: `
<div class="d-reveal">
  <div class="d-reveal-spacer d-reveal-spacer-top">scroll ↓</div>
  <div class="d-reveal-grid">
    <div class="d-reveal-item">Design</div>
    <div class="d-reveal-item">Motion</div>
    <div class="d-reveal-item">Code</div>
    <div class="d-reveal-item">Type</div>
    <div class="d-reveal-item">Color</div>
    <div class="d-reveal-item">Grid</div>
  </div>
  <div class="d-reveal-spacer">↑ scroll back &amp; forth</div>
</div>`,
  css: `
.d-reveal { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-reveal-spacer {
  height: 300px; display: flex; align-items: center; justify-content: center;
  color: #5c5c66; font-family: "JetBrains Mono", monospace; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.1em;
}
.d-reveal-spacer-top { height: 170px; animation: d-reveal-bob 2.2s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
@keyframes d-reveal-bob { 50% { transform: translateY(5px); } }
.d-reveal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 24px 48px; }
.d-reveal-item {
  border: 1px solid #232327; background: #101012; color: #ececef;
  padding: 28px 20px; font-weight: 600;
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              border-color 0.15s;
  transition-delay: var(--d, 0s);
}
.d-reveal-item:hover { border-color: #3d3d46; }
.d-reveal-grid.d-reveal-in .d-reveal-item { opacity: 1; transform: none; }`,
  js: `
const grid = root.querySelector('.d-reveal-grid');
const items = grid.querySelectorAll('.d-reveal-item');

// each item waits 80ms longer than the previous
items.forEach(function (el, i) {
  el.style.setProperty('--d', (i * 0.08) + 's');
});

const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    grid.classList.toggle('d-reveal-in', en.isIntersecting);
  });
}, { root: root, threshold: 0.25 });

io.observe(grid);`,
  prompt: `
Build a staggered scroll-reveal system in vanilla JS (no libraries).

Requirements:
- Elements marked with a data-reveal attribute start at opacity 0 and translateY(40px).
- When they enter the viewport (IntersectionObserver, threshold ~0.25), they animate to opacity 1 / translateY(0) using a cubic-bezier(0.22,1,0.36,1) ease over ~0.7s.
- Siblings inside the same container stagger by ~80ms each, via a CSS custom property for transition-delay.
- The animation should reverse when scrolled out, so it replays on re-entry.
- Use only CSS transitions driven by a class toggle — no per-frame JS.
- Respect prefers-reduced-motion by showing elements immediately.`,
});

/* ------------------------------------------------------------
   003 Parallax depth layers
------------------------------------------------------------ */
INTRX.register({
  id: 'parallax-layers',
  title: 'Parallax Depth Layers',
  cat: 'Scroll',
  rootClass: 'd-parallax',
  tags: ['depth', 'transform'],
  libs: [],
  desc: 'Layers move at different speeds relative to scroll, faking depth. Background drifts slowly, foreground overtakes — a two-line transform with outsized effect.',
  seen: 'Seen on: Apple product pages, Active Theory, countless hero sections',
  hint: 'scroll inside the panel',
  html: `
<div class="d-parallax">
  <div class="d-parallax-track">
    <div class="d-parallax-scene">
      <div class="d-parallax-layer" data-speed="0.2"><span class="d-parallax-bg">BACK</span></div>
      <div class="d-parallax-layer" data-speed="0.5"><span class="d-parallax-mid">MID</span></div>
      <div class="d-parallax-layer" data-speed="1.0"><span class="d-parallax-fg">FRONT</span></div>
    </div>
  </div>
</div>`,
  css: `
.d-parallax { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-parallax-track { height: 900px; position: relative; }
.d-parallax-scene { position: sticky; top: 0; height: 320px; overflow: hidden; }
.d-parallax-layer { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; will-change: transform; }
.d-parallax-bg  { font-size: 120px; font-weight: 700; color: #161619; letter-spacing: 0.05em; }
.d-parallax-mid { font-size: 64px;  font-weight: 700; color: #2e2e34; margin-left: 180px; }
.d-parallax-fg  { font-size: 32px;  font-weight: 700; color: #c8ff2e; margin-left: -200px; margin-top: 60px; }`,
  js: `
const layers = root.querySelectorAll('.d-parallax-layer');

function update() {
  const y = root.scrollTop;               // window.scrollY for full page
  layers.forEach(function (layer) {
    const speed = parseFloat(layer.dataset.speed);
    // slower layers translate less -> appear further away
    layer.style.transform = 'translateY(' + (y * (1 - speed) * 0.5) + 'px)';
  });
}

root.addEventListener('scroll', update, { passive: true });
update();`,
  prompt: `
Build a vanilla-JS parallax section.

Requirements:
- A tall scroll region with a position:sticky scene inside it.
- Multiple absolutely-positioned layers, each with a data-speed attribute (0.2 = far background, 1.0 = foreground).
- On scroll, translateY each layer by scrollY * (1 - speed) * 0.5 so layers separate with depth.
- Use a passive scroll listener and transform only (no top/margin changes) so it stays on the compositor.
- Add will-change: transform to the layers.
- Respect prefers-reduced-motion by disabling the effect.`,
});

/* ------------------------------------------------------------
   004 Horizontal scroll section
------------------------------------------------------------ */
INTRX.register({
  id: 'horizontal-scroll',
  title: 'Horizontal Scroll Section',
  cat: 'Scroll',
  rootClass: 'd-hscroll',
  tags: ['pinned', 'translate'],
  libs: [],
  desc: 'Vertical scrolling pins the section and drives a horizontal track — the signature gallery pattern of portfolio and case-study sites.',
  seen: 'Seen on: Obys Agency, Zajno, countless case-study pages (usually via GSAP ScrollTrigger)',
  hint: 'scroll vertically',
  html: `
<div class="d-hscroll">
  <div class="d-hscroll-track">
    <div class="d-hscroll-pin">
      <div class="d-hscroll-row">
        <div class="d-hscroll-panel">01<em>Concept</em></div>
        <div class="d-hscroll-panel">02<em>Design</em></div>
        <div class="d-hscroll-panel">03<em>Build</em></div>
        <div class="d-hscroll-panel">04<em>Ship</em></div>
      </div>
    </div>
  </div>
</div>`,
  css: `
.d-hscroll { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-hscroll-track { height: 1200px; position: relative; }
.d-hscroll-pin { position: sticky; top: 0; height: 320px; overflow: hidden; display: flex; align-items: center; }
.d-hscroll-row { display: flex; gap: 20px; padding: 0 40px; will-change: transform; }
.d-hscroll-panel {
  flex: 0 0 340px; height: 240px;
  border: 1px solid #2e2e34; background: #101012;
  color: #ececef; font-size: 44px; font-weight: 700;
  padding: 20px 24px; display: flex; flex-direction: column; justify-content: space-between;
}
.d-hscroll-panel em { font-style: normal; font-size: 14px; color: #c8ff2e; font-weight: 500; }`,
  js: `
const row = root.querySelector('.d-hscroll-row');
const track = root.querySelector('.d-hscroll-track');

function update() {
  const max = track.offsetHeight - root.clientHeight;     // scrollable distance
  const progress = Math.min(1, Math.max(0, root.scrollTop / max));
  const shift = row.scrollWidth - root.clientWidth;        // horizontal distance
  row.style.transform = 'translateX(' + (-progress * shift) + 'px)';
}

root.addEventListener('scroll', update, { passive: true });
update();`,
  prompt: `
Build a horizontal-scroll section driven by vertical scrolling, vanilla JS.

Requirements:
- A section whose height equals the horizontal distance to travel (e.g. 300vh).
- Inside it, a position:sticky full-viewport wrapper containing a horizontal flex row of panels.
- Map vertical scroll progress through the section (0 to 1) to translateX from 0 to -(rowWidth - viewportWidth).
- Use transform only, passive scroll listener, will-change: transform.
- Optionally note how the same effect is done with GSAP ScrollTrigger (pin: true, scrub: 1, x: -shift) as an alternative.
- Fall back to a native horizontally-scrollable row when prefers-reduced-motion is set.`,
});

/* ------------------------------------------------------------
   005 Sticky stacking cards
------------------------------------------------------------ */
INTRX.register({
  id: 'sticky-stack',
  title: 'Sticky Stacking Cards',
  cat: 'Scroll',
  rootClass: 'd-stack',
  tags: ['position sticky', 'scale'],
  libs: [],
  desc: 'Cards pin on top of each other while scrolling; each incoming card slightly scales down the one beneath it. Pure CSS sticky with a pinch of JS.',
  seen: 'Seen on: linear.app releases page, countless SaaS feature walkthroughs',
  hint: 'scroll inside the panel',
  html: `
<div class="d-stack">
  <div class="d-stack-list">
    <div class="d-stack-card" style="--i:0"><h3>Strategy</h3><p>Cards pin at the same offset.</p></div>
    <div class="d-stack-card" style="--i:1"><h3>Design</h3><p>Each one covers the last.</p></div>
    <div class="d-stack-card" style="--i:2"><h3>Engineering</h3><p>The covered card scales back.</p></div>
    <div class="d-stack-card" style="--i:3"><h3>Launch</h3><p>position: sticky does the heavy lifting.</p></div>
  </div>
</div>`,
  css: `
.d-stack { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-stack-list { padding: 16px 48px 200px; }
.d-stack-card {
  position: sticky; top: 16px;
  height: 240px; margin-bottom: 40px;
  background: #101012; border: 1px solid #2e2e34;
  padding: 28px; color: #ececef;
  transform-origin: center top;
  transition: transform 0.2s linear, filter 0.2s linear;
}
.d-stack-card h3 { font-size: 24px; margin-bottom: 8px; }
.d-stack-card p { color: #9b9ba3; font-size: 14px; }`,
  js: `
const cards = [].slice.call(root.querySelectorAll('.d-stack-card'));

function update() {
  cards.forEach(function (card, i) {
    const next = cards[i + 1];
    if (!next) return;
    // how far the next card has travelled over this one (0 -> 1)
    const r1 = card.getBoundingClientRect();
    const r2 = next.getBoundingClientRect();
    const overlap = Math.min(1, Math.max(0, 1 - (r2.top - r1.top) / r1.height));
    card.style.transform = 'scale(' + (1 - overlap * 0.06) + ')';
    card.style.filter = 'brightness(' + (1 - overlap * 0.35) + ')';
  });
}

root.addEventListener('scroll', update, { passive: true });
update();`,
  prompt: `
Build a sticky stacking-cards scroll section, vanilla JS + CSS.

Requirements:
- A list of full-width cards, each position: sticky with the same top offset, so each new card pins over the previous.
- As the next card slides over the current one, scale the covered card down to ~0.94 and darken it slightly (brightness), proportional to overlap progress computed from getBoundingClientRect.
- transform-origin: center top so cards shrink "into" the stack.
- Passive scroll listener; transforms only.
- The last card never scales.
- Respect prefers-reduced-motion (skip the scaling, keep the sticky stacking).`,
});

/* ------------------------------------------------------------
   006 Scroll progress indicator
------------------------------------------------------------ */
INTRX.register({
  id: 'scroll-progress',
  title: 'Scroll Progress Indicator',
  cat: 'Scroll',
  rootClass: 'd-progress',
  tags: ['reading', 'scaleX'],
  libs: [],
  desc: 'A hairline bar that fills as you scroll, plus a live percentage readout. Small detail, strong "crafted" signal.',
  seen: 'Seen on: editorial sites, The Pudding, long-form case studies',
  hint: 'scroll inside the panel',
  html: `
<div class="d-progress">
  <div class="d-progress-bar"><span></span></div>
  <div class="d-progress-pct">0%</div>
  <div class="d-progress-body">
    <p>The bar above is a transform: scaleX — never width.</p>
    <p>Width triggers layout on every frame.</p>
    <p>scaleX stays on the compositor thread.</p>
    <p>That is the difference between smooth and janky.</p>
    <p>— end —</p>
  </div>
</div>`,
  css: `
.d-progress { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; position: relative; }
.d-progress-bar {
  position: sticky; top: 0; z-index: 2;
  height: 2px; background: #232327;
}
.d-progress-bar span {
  display: block; height: 100%; background: #c8ff2e;
  transform: scaleX(0); transform-origin: left center;
}
.d-progress-pct {
  position: sticky; top: 12px; z-index: 2;
  margin-left: auto; margin-right: 16px; width: max-content;
  font-family: "JetBrains Mono", monospace; font-size: 11px; color: #c8ff2e;
}
.d-progress-body { padding: 24px 48px 40px; }
.d-progress-body p {
  margin: 0 0 120px; color: #9b9ba3; font-size: 15px; max-width: 420px;
}`,
  js: `
const fill = root.querySelector('.d-progress-bar span');
const pct = root.querySelector('.d-progress-pct');

function update() {
  const max = root.scrollHeight - root.clientHeight;
  const p = max > 0 ? root.scrollTop / max : 0;
  fill.style.transform = 'scaleX(' + p + ')';
  pct.textContent = Math.round(p * 100) + '%';
}

root.addEventListener('scroll', update, { passive: true });
update();`,
  prompt: `
Add a scroll progress indicator to a page, vanilla JS.

Requirements:
- A 2px bar fixed to the top of the viewport that fills left-to-right as the user scrolls the page.
- Fill using transform: scaleX(progress) with transform-origin: left — never animate width.
- Also render a small monospace percentage readout.
- progress = scrollY / (document height - viewport height), clamped 0..1.
- Passive scroll listener, and update once on load.`,
});

/* ------------------------------------------------------------
   007 Scroll velocity skew
------------------------------------------------------------ */
INTRX.register({
  id: 'velocity-skew',
  title: 'Scroll Velocity Skew',
  cat: 'Scroll',
  rootClass: 'd-skew',
  tags: ['velocity', 'lerp'],
  libs: [],
  desc: 'Content skews proportionally to scroll speed and eases back when you stop — the page feels like it has physical drag. A Locomotive Scroll signature.',
  seen: 'Seen on: locomotive.ca, Davide Baratta, fashion e-commerce editorials',
  hint: 'scroll fast, then stop',
  html: `
<div class="d-skew">
  <div class="d-skew-inner">
    <h2>VELOCITY</h2><h2>IS A</h2><h2>MATERIAL</h2><h2>SCROLL</h2><h2>HARDER</h2><h2>VELOCITY</h2><h2>IS A</h2><h2>MATERIAL</h2>
  </div>
</div>`,
  css: `
.d-skew { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-skew-inner { padding: 40px 48px; will-change: transform; }
.d-skew-inner h2 {
  font-size: 64px; font-weight: 700; letter-spacing: -0.03em;
  color: #ececef; line-height: 1.05; margin: 0;
}
.d-skew-inner h2:nth-child(odd) { color: #2e2e34; -webkit-text-stroke: 1px #5c5c66; }`,
  js: `
const inner = root.querySelector('.d-skew-inner');
let current = 0, target = 0, lastScroll = root.scrollTop;

root.addEventListener('scroll', function () {
  const delta = root.scrollTop - lastScroll;
  lastScroll = root.scrollTop;
  target = Math.max(-12, Math.min(12, delta * 0.45));   // clamp skew
}, { passive: true });

(function tick() {
  current += (target - current) * 0.1;   // ease toward target
  target *= 0.9;                          // decay when scrolling stops
  inner.style.transform = 'skewY(' + current.toFixed(3) + 'deg)';
  requestAnimationFrame(tick);
})();`,
  prompt: `
Build a scroll-velocity skew effect in vanilla JS.

Requirements:
- Track scroll delta per event to estimate velocity.
- Map velocity to a skewY target, clamped to about ±12deg.
- In a requestAnimationFrame loop, lerp the current skew toward the target (factor ~0.1) and decay the target by ~0.9 per frame so it returns to 0 when scrolling stops.
- Apply as transform: skewY on the content wrapper, will-change: transform.
- Skip entirely under prefers-reduced-motion.`,
});

/* ------------------------------------------------------------
   008 Scroll-driven scale (image zoom)
------------------------------------------------------------ */
INTRX.register({
  id: 'scroll-zoom',
  title: 'Scroll-Driven Zoom',
  cat: 'Scroll',
  rootClass: 'd-zoom',
  tags: ['pinned', 'scale', 'clip'],
  libs: [],
  desc: 'A pinned media block scales from an inset thumbnail to full-bleed as you scroll through the section — the cinematic "expand into the story" transition.',
  seen: 'Seen on: Apple AirPods pages, award-winning campaign sites',
  hint: 'scroll inside the panel',
  html: `
<div class="d-zoom">
  <div class="d-zoom-track">
    <div class="d-zoom-pin">
      <div class="d-zoom-media">
        <div class="d-zoom-art"></div>
        <span class="d-zoom-label">KEEP SCROLLING</span>
      </div>
    </div>
  </div>
</div>`,
  css: `
.d-zoom { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-zoom-track { height: 1000px; }
.d-zoom-pin {
  position: sticky; top: 0; height: 320px;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.d-zoom-media {
  position: relative; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  will-change: transform; transform: scale(0.35);
}
.d-zoom-art {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 30% 40%, #c8ff2e22 0%, transparent 45%),
    radial-gradient(circle at 70% 60%, #8bd0ff18 0%, transparent 45%),
    linear-gradient(160deg, #161619, #0f1a08);
  border: 1px solid #2e2e34;
}
.d-zoom-label {
  position: relative; font-family: "JetBrains Mono", monospace;
  font-size: 12px; letter-spacing: 0.3em; color: #c8ff2e;
}`,
  js: `
const media = root.querySelector('.d-zoom-media');
const track = root.querySelector('.d-zoom-track');

function update() {
  const max = track.offsetHeight - root.clientHeight;
  const p = Math.min(1, Math.max(0, root.scrollTop / max));
  // ease the progress for a softer arrival
  const eased = 1 - Math.pow(1 - p, 3);
  media.style.transform = 'scale(' + (0.35 + eased * 0.65) + ')';
}

root.addEventListener('scroll', update, { passive: true });
update();`,
  prompt: `
Build a scroll-driven zoom section, vanilla JS.

Requirements:
- A tall section (~250vh) with a position:sticky full-viewport child.
- Inside, a media element that starts at transform: scale(0.35) and reaches scale(1) as the user scrolls through the section.
- Apply a cubic ease-out to the scroll progress (1 - (1-p)^3) so the zoom decelerates.
- Transform only; passive scroll listener; will-change: transform.
- Mention the GSAP ScrollTrigger equivalent (pin + scrub) as an alternative implementation.`,
});
