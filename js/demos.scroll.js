/* INTRX registry — remaining SCROLL compositions. */
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
  <span class="d-parallax-idle" aria-hidden="true">SCROLL DOWN</span>
  <div class="d-parallax-track">
    <div class="d-parallax-scene">
      <div class="d-parallax-layer" data-speed="0.2"><span class="d-parallax-bg">BACK</span></div>
      <div class="d-parallax-layer" data-speed="0.5"><span class="d-parallax-mid">MID</span></div>
      <div class="d-parallax-layer" data-speed="1.0"><span class="d-parallax-fg">FRONT</span></div>
    </div>
  </div>
</div>`,
  css: `
.d-parallax { position: relative; height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-parallax-track { height: 900px; position: relative; }
.d-parallax-scene { position: sticky; top: 0; height: 320px; overflow: hidden; }
.d-parallax-layer { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; will-change: transform; }
.d-parallax-bg  { font-size: 120px; font-weight:500; color: #161619; letter-spacing: 0.05em; }
.d-parallax-mid { font-size: 64px;  font-weight:500; color: #2e2e34; margin-left: 180px; }
.d-parallax-fg  { font-size: 32px;  font-weight:500; color: #fa7319; margin-left: -200px; margin-top: 60px; }
.d-parallax-idle { position: absolute; left: 50%; top: 286px; z-index: 2; color: #7a7a7f; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; animation: d-parallax-idle 1.8s ease-in-out infinite; }
.d-parallax.d-parallax-idle-stop .d-parallax-idle { opacity: 0; animation: none; }
@keyframes d-parallax-idle { 50% { transform: translate(-50%, -5px); opacity: .45; } 0%, 100% { transform: translate(-50%, 0); opacity: .8; } }
@media (prefers-reduced-motion: reduce) { .d-parallax-idle { animation: none; opacity: 0; } }
/* Composition at the native preview size. */
.d-parallax button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-parallax-layer{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-parallax{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-parallax :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-parallax button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-parallax-layer{font-family:"Inter",system-ui,sans-serif;font-weight:500;letter-spacing:-.025em}.d-parallax-hint{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0}.d-parallax-front{color:#abbcae}`,
  js: `
const layers = root.querySelectorAll('.d-parallax-layer');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function stopIdle() { root.classList.add('d-parallax-idle-stop'); }
if (reduced) stopIdle();
else {
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

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
- Before interaction, show a subtle animated scroll cue; stop it permanently on first pointer or keyboard interaction.
- Respect prefers-reduced-motion by disabling the effect.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  <span class="d-hscroll-idle" aria-hidden="true">SCROLL DOWN</span>
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
.d-hscroll { position: relative; height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
.d-hscroll-track { height: 1200px; position: relative; }
.d-hscroll-pin { position: sticky; top: 0; height: 320px; overflow: hidden; display: flex; align-items: center; }
.d-hscroll-row { display: flex; gap: 20px; padding: 0 40px; will-change: transform; }
.d-hscroll-panel {
  flex: 0 0 340px; height: 240px;
  border: 1px solid #2e2e34; background: #101012;
  color: #ececef; font-size: 44px; font-weight:500;
  padding: 20px 24px; display: flex; flex-direction: column; justify-content: space-between;
}
.d-hscroll-panel em { font-style: normal; font-size: 14px; color: #fa7319; font-weight: 500; }
.d-hscroll-idle { position: absolute; left: 50%; top: 286px; z-index: 2; color: #7a7a7f; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; animation: d-hscroll-idle 1.8s ease-in-out infinite; }
.d-hscroll.d-hscroll-idle-stop .d-hscroll-idle { opacity: 0; animation: none; }
@keyframes d-hscroll-idle { 50% { transform: translate(-50%, -5px); opacity: .45; } 0%, 100% { transform: translate(-50%, 0); opacity: .8; } }
@media (prefers-reduced-motion: reduce) { .d-hscroll-idle { animation: none; opacity: 0; } }
/* Composition at the native preview size. */
.d-hscroll button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-hscroll-panel{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-hscroll{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-hscroll :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-hscroll button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-hscroll-panel{border-color:#ffffff10;border-radius:8px;background:#171b18}.d-hscroll-panel b{font:400 49px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:-.02em}.d-hscroll-panel span{font:450 16px "Inter",system-ui,sans-serif;color:#b4c2b8}.d-hscroll-hint{font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0}`,
  js: `
const row = root.querySelector('.d-hscroll-row');
const track = root.querySelector('.d-hscroll-track');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function stopIdle() { root.classList.add('d-hscroll-idle-stop'); }
if (reduced) stopIdle();
else {
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

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
- Before interaction, show a subtle animated scroll cue; stop it permanently on first pointer or keyboard interaction.
- Optionally note how the same effect is done with GSAP ScrollTrigger (pin: true, scrub: 1, x: -shift) as an alternative.
- Fall back to a native horizontally-scrollable row when prefers-reduced-motion is set.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  <span class="d-stack-idle" aria-hidden="true">SCROLL DOWN</span>
  <div class="d-stack-list">
    <div class="d-stack-card" style="--i:0"><h3>Strategy</h3><p>Cards pin at the same offset.</p></div>
    <div class="d-stack-card" style="--i:1"><h3>Design</h3><p>Each one covers the last.</p></div>
    <div class="d-stack-card" style="--i:2"><h3>Engineering</h3><p>The covered card scales back.</p></div>
    <div class="d-stack-card" style="--i:3"><h3>Launch</h3><p>position: sticky does the heavy lifting.</p></div>
  </div>
</div>`,
  css: `
.d-stack { position: relative; height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
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
.d-stack-card p { color: #9b9ba3; font-size: 14px; }
.d-stack-idle { position: absolute; left: 50%; top: 286px; z-index: 2; color: #7a7a7f; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; animation: d-stack-idle 1.8s ease-in-out infinite; }
.d-stack.d-stack-idle-stop .d-stack-idle { opacity: 0; animation: none; }
@keyframes d-stack-idle { 50% { transform: translate(-50%, -5px); opacity: .45; } 0%, 100% { transform: translate(-50%, 0); opacity: .8; } }
@media (prefers-reduced-motion: reduce) { .d-stack-idle { animation: none; opacity: 0; } }
/* Composition at the native preview size. */
.d-stack button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-stack-card h3,.d-stack-card p{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-stack{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-stack :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-stack button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-stack-card{border-color:#ffffff13;border-radius:9px;box-shadow:0 10px 24px #00000012}.d-stack-card h3{font:450 26px/1.15 "Inter",system-ui,sans-serif;letter-spacing:-.025em}.d-stack-card p{font:400 14px/1.65 "Inter",system-ui,sans-serif;color:#a2aaa5}`,
  js: `
const cards = [].slice.call(root.querySelectorAll('.d-stack-card'));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function stopIdle() { root.classList.add('d-stack-idle-stop'); }
if (reduced) stopIdle();
else {
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

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
- Before interaction, show a subtle animated scroll cue; stop it permanently on first pointer or keyboard interaction.
- The last card never scales.
- Respect prefers-reduced-motion (skip the scaling, keep the sticky stacking).

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  <span class="d-progress-idle" aria-hidden="true">SCROLL DOWN</span>
  <div class="d-progress-bar"><span></span></div>
  <div class="d-progress-pct">0%</div>
  <div class="d-progress-body">
    <p>A little progress, with every page.</p>
    <p>A quiet cue helps you find your place in a long story.</p>
    <p>Keep reading. The indicator moves with you.</p>
    <p>Small details make the journey feel considered.</p>
    <p>You have reached the end.</p>
  </div>
</div>`,
  css: `
.d-progress { height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; position: relative; }
.d-progress-bar {
  position: sticky; top: 0; z-index: 2;
  height: 2px; background: #232327;
}
.d-progress-bar span {
  display: block; height: 100%; background: #fa7319;
  transform: scaleX(0); transform-origin: left center;
}
.d-progress-pct {
  position: sticky; top: 12px; z-index: 2;
  margin-left: auto; margin-right: 16px; width: max-content;
  font-family: "Inter",system-ui,sans-serif; font-size: 11px; color: #fa7319;
}
.d-progress-body { padding: 24px 48px 40px; }
.d-progress-body p {
  margin: 0 0 120px; color: #9b9ba3; font-size: 15px; max-width: 420px;
}
.d-progress-idle { position: absolute; left: 50%; top: 286px; z-index: 3; color: #7a7a7f; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; animation: d-progress-idle 1.8s ease-in-out infinite; }
.d-progress.d-progress-idle-stop .d-progress-idle { opacity: 0; animation: none; }
@keyframes d-progress-idle { 50% { transform: translate(-50%, -5px); opacity: .45; } 0%, 100% { transform: translate(-50%, 0); opacity: .8; } }
@media (prefers-reduced-motion: reduce) { .d-progress-idle { animation: none; opacity: 0; } }
/* Refined type, spacing and quiet interaction controls. */
.d-progress{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-progress :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-progress button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-progress-content p{font:400 18px/1.7 "Inter",system-ui,sans-serif;letter-spacing:0;max-width:28ch}.d-progress-value{font:400 12px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-progress-bar{background:#9faf9f}.d-progress .d-progress-body p{font:400 21px/1.5 "Inter",system-ui,sans-serif;letter-spacing:-.015em;max-width:24ch}.d-progress .d-progress-pct{font:400 12px "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}`,
  js: `
const fill = root.querySelector('.d-progress-bar span');
const pct = root.querySelector('.d-progress-pct');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function stopIdle() { root.classList.add('d-progress-idle-stop'); }
if (reduced) stopIdle();
else {
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

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
- Before interaction, show a subtle animated scroll cue; stop it permanently on first pointer or keyboard interaction.
- Passive scroll listener, and update once on load.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  font-size: 64px; font-weight:500; letter-spacing: -0.03em;
  color: #ececef; line-height: 1.05; margin: 0;
}
.d-skew-inner h2:nth-child(odd) { color: #2e2e34; -webkit-text-stroke: 1px #5c5c66; }
/* Composition at the native preview size. */
.d-skew{container-type:inline-size;overflow-x:hidden}.d-skew-inner{padding:36px 22px}.d-skew-inner h2{font:500 clamp(30px,12.5cqw,55px)/1.14 "Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Composition at the native preview size. */
.d-skew button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-skew-inner h2{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-skew{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-skew :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-skew button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-skew-content{font-weight:450;letter-spacing:-.025em}.d-skew span{font-family:"Inter",system-ui,sans-serif;font-weight:450}`,
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
  prompt: `Build a scroll-velocity skew effect in vanilla JS.

Requirements:
- Track scroll delta per event to estimate velocity.
- Map velocity to a skewY target, clamped to about ±12deg.
- In a requestAnimationFrame loop, lerp the current skew toward the target (factor ~0.1) and decay the target by ~0.9 per frame so it returns to 0 when scrolling stops.
- Apply as transform: skewY on the content wrapper, will-change: transform.
- Skip entirely under prefers-reduced-motion.

Set the scrolling headings in medium-weight Inter, sized with container units to fit a 300–320px-wide preview. Keep 22px horizontal padding and contain horizontal overflow while the content skews.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter small numeric readouts, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  <span class="d-zoom-idle" aria-hidden="true">SCROLL DOWN</span>
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
.d-zoom { position: relative; height: 320px; width: 100%; overflow-y: auto; background: #0a0a0b; }
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
    radial-gradient(circle at 30% 40%, rgba(250,115,25,.13) 0%, transparent 45%),
    radial-gradient(circle at 70% 60%, #8bd0ff18 0%, transparent 45%),
    linear-gradient(160deg, #161619, #0f1a08);
  border: 1px solid #2e2e34;
}
.d-zoom-label {
  position: relative; font-family: "Inter",system-ui,sans-serif;
  font-size: 12px; letter-spacing: 0.3em; color: #fa7319;
}
.d-zoom-idle { position: absolute; left: 50%; top: 286px; z-index: 3; color: #7a7a7f; font: 9px "Inter",system-ui,sans-serif; letter-spacing:0.06em; pointer-events: none; animation: d-zoom-idle 1.8s ease-in-out infinite; }
.d-zoom.d-zoom-idle-stop .d-zoom-idle { opacity: 0; animation: none; }
@keyframes d-zoom-idle { 50% { transform: translate(-50%, -5px); opacity: .45; } 0%, 100% { transform: translate(-50%, 0); opacity: .8; } }
@media (prefers-reduced-motion: reduce) { .d-zoom-idle { animation: none; opacity: 0; } }
/* Composition at the native preview size. */
.d-zoom-media{background:#161619;border:1px solid #555;display:grid;place-content:center;overflow:hidden}.d-zoom-media::before{content:"";position:absolute;width:60%;aspect-ratio:1;border:1px solid #aaa;transform:rotate(45deg);box-shadow:inset 0 0 0 12px #161619,inset 0 0 0 13px #555}.d-zoom-label{position:relative;z-index:1;font-size:12px;letter-spacing:0.04em;color:#eee;background:#161619;padding:8px}
/* Composition at the native preview size. */
.d-zoom-art{background:repeating-linear-gradient(90deg,#161619 0 20px,#3a3a3e 20px 21px);filter:none}.d-zoom-media::before{z-index:2;left:20%;top:20%}.d-zoom-label{font-family:"Inter",system-ui,sans-serif;font-size:12px;letter-spacing:0;z-index:3;background:#161619;color:#eee}
/* Composition at the native preview size. */
.d-zoom button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-zoom-label{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-zoom{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-zoom :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-zoom button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-zoom-label{font:450 13px "Inter",system-ui,sans-serif;letter-spacing:0}.d-zoom-box{border-color:#ffffff13}`,
  js: `
const media = root.querySelector('.d-zoom-media');
const track = root.querySelector('.d-zoom-track');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function stopIdle() { root.classList.add('d-zoom-idle-stop'); }
if (reduced) stopIdle();
else {
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

function update() {
  const max = track.offsetHeight - root.clientHeight;
  const p = Math.min(1, Math.max(0, root.scrollTop / max));
  // ease the progress for a softer arrival
  const eased = 1 - Math.pow(1 - p, 3);
  media.style.transform = 'scale(' + (0.35 + eased * 0.65) + ')';
}

root.addEventListener('scroll', update, { passive: true });
update();`,
  prompt: `Build a scroll-driven zoom section, vanilla JS.

Requirements:
- A tall section (~250vh) with a position:sticky full-viewport child.
- Inside, a media element that starts at transform: scale(0.35) and reaches scale(1) as the user scrolls through the section.
- Apply a cubic ease-out to the scroll progress (1 - (1-p)^3) so the zoom decelerates.
- Before interaction, show a subtle animated scroll cue; stop it permanently on first pointer or keyboard interaction.
- Transform only; passive scroll listener; will-change: transform.
- Mention the GSAP ScrollTrigger equivalent (pin + scrub) as an alternative implementation.

For the self-contained preview, use a graphite media plate with fine vertical gray lines, an outlined geometric diamond, and one readable Inter caption. Fit the scene inside its native 320px local scroll viewport.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter small numeric readouts, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
});
