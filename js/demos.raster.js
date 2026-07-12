/* INTRX registry — RASTER & GLITCH */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Glitch RGB slices
------------------------------------------------------------ */
INTRX.register({
  id: 'glitch-rgb-slices',
  title: 'Glitch RGB Slices',
  cat: 'Raster & Glitch',
  rootClass: 'd-glitch',
  tags: ['clip-path', 'rgb-split'],
  libs: [],
  desc: 'Three stacked copies of the same text. During a burst, random horizontal slices of the red and cyan layers shear sideways while the base stays put — the classic datamosh title treatment.',
  seen: 'Seen on: Adult Swim promos, glitch-art portfolios, cyberpunk landing pages',
  hint: 'hover to force a burst',
  html: `
<div class="d-glitch">
  <div class="d-glitch-stage" aria-hidden="true">
    <span class="d-glitch-layer d-glitch-r">INTRX</span>
    <span class="d-glitch-layer d-glitch-c">INTRX</span>
    <span class="d-glitch-layer d-glitch-base">INTRX</span>
  </div>
  <span class="d-glitch-label">SIGNAL // UNSTABLE</span>
</div>`,
  css: `
.d-glitch { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden;
  display: flex; align-items: center; justify-content: center; }
.d-glitch-stage { position: relative; font-family: "Inter", sans-serif; font-weight: 700;
  font-size: clamp(56px, 12vw, 110px); letter-spacing: -0.03em; line-height: 1; }
.d-glitch-layer { display: block; }
.d-glitch-base { position: relative; color: #ececef; }
.d-glitch-r, .d-glitch-c { position: absolute; inset: 0; opacity: 0; }
.d-glitch-r { color: #ff2e5f; }
.d-glitch-c { color: #2ee6ff; }
.d-glitch.glitching .d-glitch-r, .d-glitch.glitching .d-glitch-c { opacity: .9; }
.d-glitch-label { position: absolute; bottom: 18px; left: 20px; font-family: "JetBrains Mono", monospace;
  font-size: 10px; letter-spacing: .14em; color: #5c5c66; }
@media (prefers-reduced-motion: reduce) { .d-glitch .d-glitch-r, .d-glitch .d-glitch-c { opacity: 0 !important; } }`,
  js: `
const r = root.querySelector('.d-glitch-r');
const c = root.querySelector('.d-glitch-c');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let timer = null;

function slice(el, maxShift) {
  const y1 = Math.random() * 80;                 /* random horizontal band, in % */
  const y2 = y1 + 4 + Math.random() * 18;
  el.style.clipPath = 'inset(' + y1 + '% 0 ' + (100 - y2) + '% 0)';
  el.style.transform = 'translateX(' + ((Math.random() * 2 - 1) * maxShift) + 'px)';
}

function burst(duration) {
  if (reduced) return;
  root.classList.add('glitching');
  const end = performance.now() + duration;
  clearInterval(timer);
  timer = setInterval(() => {
    if (performance.now() > end) {
      clearInterval(timer);
      root.classList.remove('glitching');
      return;
    }
    slice(r, 14);
    slice(c, 14);
  }, 55);                                        /* re-slice every ~3 frames */
}

root.addEventListener('mouseenter', () => burst(600));
const idle = setInterval(() => { if (document.contains(root)) burst(420); else clearInterval(idle); }, 2600);
burst(420);`,
  prompt: `
Build a "glitch RGB slices" text effect, vanilla JS.

Requirements:
- Three stacked copies of the same headline: a red layer, a cyan layer, and the base layer on top. The colored layers are absolutely positioned behind the base and hidden by default.
- A "burst" lasts 400–600ms. Every ~55ms during a burst, give each colored layer a new random horizontal band via clip-path: inset(y1% 0 y2% 0) (band height 4–22%) and a random translateX of ±14px.
- Trigger a burst on hover and automatically every ~2.6s.
- Text remains selectable/readable: only the decorative layers move; mark them aria-hidden.
- Under prefers-reduced-motion, never show the colored layers.
- No libraries, no canvas — clip-path + transform only.`,
});

/* ------------------------------------------------------------
   Scanline CRT
------------------------------------------------------------ */
INTRX.register({
  id: 'scanline-crt',
  title: 'Scanline CRT',
  cat: 'Raster & Glitch',
  rootClass: 'd-crt',
  tags: ['canvas', 'noise'],
  libs: [],
  desc: 'A canvas television: animated static, scanlines, a rolling brightness band, and occasional horizontal tearing. Click to change the channel.',
  seen: 'Seen on: retro-tech portfolios, music sites, VHS-aesthetic campaigns',
  hint: 'click to change channel',
  html: `
<div class="d-crt" role="img" aria-label="Animated CRT television static">
  <canvas class="d-crt-canvas"></canvas>
  <span class="d-crt-ch">CH 01</span>
</div>`,
  css: `
.d-crt { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; cursor: pointer; }
.d-crt-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.d-crt-ch { position: absolute; top: 16px; right: 20px; font-family: "JetBrains Mono", monospace;
  font-size: 14px; color: #c8ff2e; letter-spacing: .14em; text-shadow: 0 0 8px rgba(200,255,46,.7); }`,
  js: `
const canvas = root.querySelector('.d-crt-canvas');
const ctx = canvas.getContext('2d');
const chEl = root.querySelector('.d-crt-ch');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let ch = 1, hue = 0, raf, band = 0;

function resize() {
  const dpr = Math.min(devicePixelRatio, 2);
  canvas.width = root.clientWidth * dpr;
  canvas.height = root.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
addEventListener('resize', resize, { passive: true });

function frame() {
  const w = root.clientWidth, h = root.clientHeight;
  /* coarse static: random gray cells */
  const cell = 4;
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const v = Math.random() * 60 | 0;
      ctx.fillStyle = hue ? 'hsl(' + hue + ' 40% ' + (v / 3.2) + '%)' : 'rgb(' + v + ' ' + v + ' ' + v + ')';
      ctx.fillRect(x, y, cell, cell);
    }
  }
  /* occasional horizontal tear */
  if (Math.random() < 0.06) {
    const ty = Math.random() * h | 0, th = 6 + Math.random() * 14;
    const shift = (Math.random() * 2 - 1) * 24;
    ctx.drawImage(canvas, 0, ty * (canvas.height / h), canvas.width, th, shift, ty, w, th);
  }
  /* rolling brightness band */
  band = (band + 1.4) % (h + 120);
  const grad = ctx.createLinearGradient(0, band - 120, 0, band);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(.5, 'rgba(255,255,255,.06)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, band - 120, w, 120);
  /* scanlines */
  ctx.fillStyle = 'rgba(0,0,0,.35)';
  for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
  if (!reduced) raf = requestAnimationFrame(frame);
}
frame();                                    /* reduced-motion still gets one static frame */

root.addEventListener('click', () => {
  ch = ch % 9 + 1;
  hue = [0, 84, 0, 190, 0, 320, 0, 24, 0][ch - 1];   /* some channels are tinted */
  chEl.textContent = 'CH 0' + ch;
});`,
  prompt: `
Build a CRT static effect on a 2D canvas, vanilla JS.

Requirements:
- Fill the canvas each frame with a coarse grid (4px cells) of random dark grays for static.
- Overlay scanlines: 1px black lines at 35% opacity every 3px.
- A 120px "brightness band" (transparent→6% white→transparent vertical gradient) rolls down ~1.4px per frame and wraps.
- ~6% of frames, copy a random horizontal strip of the canvas back onto itself shifted ±24px for a tearing artifact.
- Click cycles a channel counter (CH 01–09); some channels tint the static using hsl().
- Cap devicePixelRatio at 2. Under prefers-reduced-motion render exactly one static frame, no loop.`,
});

/* ------------------------------------------------------------
   Halftone dots
------------------------------------------------------------ */
INTRX.register({
  id: 'halftone-dots',
  title: 'Halftone Dots',
  cat: 'Raster & Glitch',
  rootClass: 'd-halftone',
  tags: ['canvas', 'pointer'],
  libs: [],
  desc: 'A print-style halftone grid where dot size is driven by a drifting light — and by your cursor. The image is nothing but dots of one color at different radii.',
  seen: 'Seen on: editorial design sites, print-inspired portfolios, Spotify campaign pages',
  hint: 'move your pointer across the grid',
  html: `
<div class="d-halftone" role="img" aria-label="Interactive halftone dot grid">
  <canvas class="d-halftone-canvas"></canvas>
</div>`,
  css: `
.d-halftone { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; }
.d-halftone-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }`,
  js: `
const canvas = root.querySelector('.d-halftone-canvas');
const ctx = canvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const GAP = 16, MAXR = 6.5;
let mx = -9999, my = -9999, t = 0;

function resize() {
  const dpr = Math.min(devicePixelRatio, 2);
  canvas.width = root.clientWidth * dpr;
  canvas.height = root.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
addEventListener('resize', resize, { passive: true });

root.addEventListener('pointermove', e => {
  const b = root.getBoundingClientRect();
  mx = e.clientX - b.left; my = e.clientY - b.top;
}, { passive: true });
root.addEventListener('pointerleave', () => { mx = my = -9999; }, { passive: true });

function frame() {
  const w = root.clientWidth, h = root.clientHeight;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#c8ff2e';
  t += reduced ? 0 : 0.012;
  /* a light source orbits the panel; the cursor is a second, stronger light */
  const lx = w / 2 + Math.cos(t) * w * 0.3;
  const ly = h / 2 + Math.sin(t * 1.3) * h * 0.3;
  for (let y = GAP / 2; y < h; y += GAP) {
    for (let x = GAP / 2; x < w; x += GAP) {
      const d1 = Math.hypot(x - lx, y - ly);
      const d2 = Math.hypot(x - mx, y - my);
      const v = Math.max(0, 1 - d1 / 260) * 0.7 + Math.max(0, 1 - d2 / 160);
      const r = Math.min(MAXR, v * MAXR);
      if (r > 0.3) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();`,
  prompt: `
Build an interactive halftone dot grid on a 2D canvas, vanilla JS.

Requirements:
- Dots on a 16px grid, single color, radius 0–6.5px.
- Two "lights" set dot radius by proximity: an automatic light orbiting the panel center (cos/sin of a slowly increasing t, radius 30% of panel), and the pointer (stronger: falloff radius 160px vs 260px). Radius = clamped sum of both falloffs, max(0, 1 - d/falloff).
- Skip dots below 0.3px radius. Clear and redraw every frame in one rAF loop.
- Pointer tracked via pointermove with getBoundingClientRect; park it far away on pointerleave.
- Cap devicePixelRatio at 2; handle resize. Under prefers-reduced-motion freeze the orbiting light (t stops) but keep pointer response.`,
});
