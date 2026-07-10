/* INTRX registry — TEXT & TYPE */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Split-text character reveal
------------------------------------------------------------ */
INTRX.register({
  id: 'split-text-reveal',
  title: 'Split-Text Character Reveal',
  cat: 'Text & Type',
  rootClass: 'd-split',
  tags: ['splittext', 'stagger'],
  libs: ['gsap'],
  desc: 'The headline is split into characters that rise out of an overflow-hidden mask with a per-character stagger. The canonical award-site headline entrance.',
  seen: 'Seen on: every GSAP SplitText showcase, Obys, Locomotive',
  hint: 'click replay',
  html: `
<div class="d-split">
  <h2 class="d-split-line">Design is thinking</h2>
  <h2 class="d-split-line d-split-accent">made visible.</h2>
  <button class="d-split-replay">↻ replay</button>
</div>`,
  css: `
.d-split {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  position: relative;
}
.d-split-line { font-size: clamp(28px, 5vw, 52px); font-weight: 700; color: #ececef; letter-spacing: -0.02em; margin: 0; }
.d-split-line.d-split-accent { color: #c8ff2e; }
.d-split-line .d-split-ch-mask { display: inline-block; overflow: hidden; vertical-align: bottom; }
.d-split-line .d-split-ch { display: inline-block; will-change: transform; }
.d-split-replay {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  background: none; border: 1px solid #2e2e34; color: #9b9ba3;
  font-family: "JetBrains Mono", monospace; font-size: 11px; padding: 6px 14px; cursor: pointer;
}
.d-split-replay:hover { color: #c8ff2e; border-color: #c8ff2e; }`,
  js: `
// minimal SplitText: wrap each character in a masked span
function split(el) {
  const text = el.textContent;
  el.textContent = '';
  return text.split('').map(function (c) {
    const mask = document.createElement('span');
    mask.className = 'd-split-ch-mask';
    const ch = document.createElement('span');
    ch.className = 'd-split-ch';
    ch.innerHTML = c === ' ' ? '&nbsp;' : c;
    mask.appendChild(ch);
    el.appendChild(mask);
    return ch;
  });
}

const chars = [];
root.querySelectorAll('.d-split-line').forEach(function (line) {
  chars.push.apply(chars, split(line));
});

function play() {
  gsap.fromTo(chars,
    { yPercent: 110, rotate: 6 },
    { yPercent: 0, rotate: 0, duration: 0.9, ease: 'power4.out', stagger: 0.025 }
  );
}

root.querySelector('.d-split-replay').addEventListener('click', play);
play();`,
  prompt: `
Build a split-text character reveal with GSAP (or vanilla).

Requirements:
- Split each headline into individual characters. Wrap every character in an outer span with overflow: hidden (the mask) and an inner span that animates. Preserve spaces as &nbsp;.
- Animate the inner spans from yPercent: 110 and rotate: 6deg to 0 with power4.out, duration ~0.9s, stagger 0.025s per character.
- Trigger on page load and again when the element scrolls into view (IntersectionObserver or ScrollTrigger).
- Keep accessibility: set aria-label with the original text on the heading and aria-hidden on the spans.
- Under prefers-reduced-motion, skip splitting entirely.`,
});

/* ------------------------------------------------------------
   Text scramble / decode
------------------------------------------------------------ */
INTRX.register({
  id: 'text-scramble',
  title: 'Text Scramble / Decode',
  cat: 'Text & Type',
  rootClass: 'd-scramble',
  tags: ['glyphs', 'matrix'],
  libs: [],
  desc: 'Characters cycle through random glyphs before locking into place left-to-right — the "decrypting" effect. Strong with monospace fonts and technical brands.',
  seen: 'Seen on: cybersecurity brands, resend.com, terminal-aesthetic portfolios',
  hint: 'click the panel to cycle',
  html: `
<div class="d-scramble">
  <p class="d-scramble-label">// status</p>
  <h2 class="d-scramble-text">INITIALIZING</h2>
</div>`,
  css: `
.d-scramble {
  width: 100%; height: 320px; background: #0a0a0b; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
}
.d-scramble-label { font-family: "JetBrains Mono", monospace; font-size: 11px; color: #5c5c66; letter-spacing: 0.2em; }
.d-scramble-text {
  font-family: "JetBrains Mono", monospace; font-size: clamp(24px, 4.5vw, 44px);
  font-weight: 700; color: #c8ff2e; letter-spacing: 0.06em; margin: 0;
  min-height: 1.2em;
}
.d-scramble-text .d-scramble-junk { color: #3c3c44; }`,
  js: `
const el = root.querySelector('.d-scramble-text');
const GLYPHS = '!<>-_\\\\/[]{}—=+*^?#________';
const PHRASES = ['INITIALIZING', 'DECRYPTING DATA', 'ACCESS GRANTED', 'SYSTEM ONLINE'];
let idx = 0, frame = 0, queue = [], rafId = null;

function setText(next) {
  const old = el.textContent;
  const len = Math.max(old.length, next.length);
  queue = [];
  for (let i = 0; i < len; i++) {
    const start = Math.floor(Math.random() * 30);          // when this char starts resolving
    const end = start + Math.floor(Math.random() * 30);    // when it locks in
    queue.push({ from: old[i] || '', to: next[i] || '', start: start, end: end, char: '' });
  }
  cancelAnimationFrame(rafId);
  frame = 0;
  update();
}

function update() {
  let out = '', done = 0;
  queue.forEach(function (q) {
    if (frame >= q.end) { done++; out += q.to; }
    else if (frame >= q.start) {
      if (!q.char || Math.random() < 0.28) q.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      out += '<span class="d-scramble-junk">' + q.char + '</span>';
    } else out += q.from;
  });
  el.innerHTML = out;
  if (done < queue.length) { frame++; rafId = requestAnimationFrame(update); }
}

root.addEventListener('click', function () {
  idx = (idx + 1) % PHRASES.length;
  setText(PHRASES[idx]);
});
setText(PHRASES[0]);`,
  prompt: `
Build a text scramble / decode effect in vanilla JS (the classic "hacker text").

Requirements:
- A setText(next) function that transitions the current string to the next one.
- For each character position, pick a random start frame (0-30) and end frame (start + 0-30). Before start, show the old character; between start and end, show a random glyph from a set like !<>-_\\/[]{}—=+*^?#, re-randomized with ~28% probability per frame so it flickers; after end, lock in the new character.
- Run on requestAnimationFrame until all characters resolve.
- Render in-progress glyphs in a dimmer color (wrap in a span).
- Use a monospace font so the line does not jitter horizontally.
- Cycle through an array of phrases on click or on an interval, and expose setText for reuse.`,
});

/* ------------------------------------------------------------
   Infinite kinetic marquee
------------------------------------------------------------ */
INTRX.register({
  id: 'kinetic-marquee',
  title: 'Kinetic Marquee',
  cat: 'Text & Type',
  rootClass: 'd-marquee',
  tags: ['infinite', 'velocity'],
  libs: [],
  desc: 'An endlessly looping text band whose speed and direction respond to scroll velocity. Seamless because the content is duplicated and wrapped with modulo.',
  seen: 'Seen on: studio websites everywhere — Baillat, Phantom, holographik',
  hint: 'scroll the page to push it',
  html: `
<div class="d-marquee">
  <div class="d-marquee-band">
    <div class="d-marquee-track"></div>
  </div>
  <div class="d-marquee-band d-marquee-alt">
    <div class="d-marquee-track"></div>
  </div>
</div>`,
  css: `
.d-marquee {
  width: 100%; height: 320px; background: #0a0a0b; overflow: hidden;
  display: flex; flex-direction: column; justify-content: center; gap: 18px;
}
.d-marquee-band { white-space: nowrap; border-top: 1px solid #232327; border-bottom: 1px solid #232327; padding: 8px 0; }
.d-marquee-track { display: inline-block; will-change: transform; }
.d-marquee-track span {
  font-size: 44px; font-weight: 700; letter-spacing: -0.02em;
  color: #ececef; padding-right: 24px;
}
.d-marquee-track span i { font-style: normal; color: #c8ff2e; }
.d-marquee-band.d-marquee-alt .d-marquee-track span { color: transparent; -webkit-text-stroke: 1px #5c5c66; }`,
  js: `
const CHUNK = '<span>DESIGN <i>◆</i> MOTION <i>◆</i> CODE <i>◆</i> </span>';

root.querySelectorAll('.d-marquee-track').forEach(function (track, i) {
  track.innerHTML = CHUNK.repeat(6);
  const dir = i === 0 ? -1 : 1;
  let x = 0, vel = 0;
  const width = track.scrollWidth / 6;      // width of one chunk

  window.addEventListener('wheel', function (e) {
    vel += e.deltaY * 0.004;                 // scroll adds velocity
  }, { passive: true });

  (function tick() {
    vel *= 0.94;                             // friction
    x += dir * (0.6 + Math.abs(vel)) + vel * dir;
    // wrap seamlessly with modulo
    const m = ((x % width) + width) % width;
    track.style.transform = 'translateX(' + (-m) + 'px)';
    requestAnimationFrame(tick);
  })();
});`,
  prompt: `
Build an infinite kinetic marquee in vanilla JS.

Requirements:
- A nowrap track whose content chunk is repeated ~6x so it always overflows.
- A rAF loop advances an x position by a base speed (~0.6px/frame); wrap with modulo of one chunk width so the loop is seamless: translateX(-(((x % w) + w) % w)).
- Listen to wheel/scroll and add the delta to a velocity value that boosts the marquee speed, with friction (*= 0.94 per frame) so it settles back to base speed.
- Two bands moving in opposite directions, the second with outlined (text-stroke) type.
- transform only, will-change: transform.
- Under prefers-reduced-motion, keep it static.`,
});

/* ------------------------------------------------------------
   Line mask reveal
------------------------------------------------------------ */
INTRX.register({
  id: 'line-mask-reveal',
  title: 'Line Mask Reveal',
  cat: 'Text & Type',
  rootClass: 'd-lines',
  tags: ['clip-path', 'lines'],
  libs: [],
  desc: 'Paragraph lines slide up from behind invisible masks, one line after another. Calmer than per-character animation — the standard for body copy and manifestos.',
  seen: 'Seen on: lusion.co, editorial studios, brand manifestos',
  hint: 'click replay',
  html: `
<div class="d-lines">
  <div class="d-lines-copy">
    <span>We believe interfaces should feel</span>
    <span>like physical material — with weight,</span>
    <span>friction, and consequence.</span>
    <span class="d-lines-accent">Motion is not decoration.</span>
  </div>
  <button class="d-lines-replay">↻ replay</button>
</div>`,
  css: `
.d-lines {
  width: 100%; height: 320px; background: #0a0a0b; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.d-lines-copy { display: flex; flex-direction: column; gap: 2px; }
.d-lines-copy span {
  display: block; overflow: hidden;
  font-size: clamp(18px, 3vw, 28px); font-weight: 600; color: #ececef; line-height: 1.35;
}
.d-lines-copy span.d-lines-accent { color: #c8ff2e; }
.d-lines-copy span em {
  font-style: normal; display: block;
  transform: translateY(110%);
  transition: transform 0.9s cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: var(--d);
}
.d-lines-copy.d-lines-in span em { transform: translateY(0); }
.d-lines-replay {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  background: none; border: 1px solid #2e2e34; color: #9b9ba3;
  font-family: "JetBrains Mono", monospace; font-size: 11px; padding: 6px 14px; cursor: pointer;
}
.d-lines-replay:hover { color: #c8ff2e; border-color: #c8ff2e; }`,
  js: `
const copy = root.querySelector('.d-lines-copy');

// wrap each line's text in an <em> that does the actual sliding
copy.querySelectorAll('span').forEach(function (line, i) {
  line.innerHTML = '<em>' + line.innerHTML + '</em>';
  line.querySelector('em').style.setProperty('--d', (i * 0.12) + 's');
});

function play() {
  copy.classList.remove('d-lines-in');
  void copy.offsetWidth;          // force reflow to restart transition
  copy.classList.add('d-lines-in');
}

root.querySelector('.d-lines-replay').addEventListener('click', play);
requestAnimationFrame(play);`,
  prompt: `
Build a line-by-line mask text reveal, vanilla JS + CSS.

Requirements:
- Each visual line of text is a block element with overflow: hidden; inside it an inner element starts at transform: translateY(110%).
- On trigger, add a class that transitions the inner elements to translateY(0) with cubic-bezier(0.19,1,0.22,1) over ~0.9s.
- Stagger lines by ~120ms each using a --d custom property on transition-delay.
- To replay, remove the class, force a reflow (void el.offsetWidth), and re-add it.
- Trigger on scroll into view with IntersectionObserver.
- Note: for real multi-line paragraphs, split lines at runtime (e.g. SplitType or GSAP SplitText 'lines' mode) instead of hand-authored spans.
- Under prefers-reduced-motion, show text immediately.`,
});

/* ------------------------------------------------------------
   Hover letter roll (menu link)
------------------------------------------------------------ */
INTRX.register({
  id: 'letter-roll',
  title: 'Hover Letter Roll',
  cat: 'Text & Type',
  rootClass: 'd-roll',
  tags: ['nav', 'duplicate'],
  libs: [],
  desc: 'On hover, each character rolls upward and an identical copy rolls in from below, staggered across the word. The signature nav-link hover of high-end studios.',
  seen: 'Seen on: dennissnellenberg.com nav, Kirifuda, countless SOTD menus',
  hint: 'hover the links',
  html: `
<nav class="d-roll">
  <a href="#" onclick="return false" data-text="Work">Work</a>
  <a href="#" onclick="return false" data-text="Studio">Studio</a>
  <a href="#" onclick="return false" data-text="Contact">Contact</a>
</nav>`,
  css: `
.d-roll {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
}
.d-roll a { text-decoration: none; font-size: 42px; font-weight: 700; color: #ececef; letter-spacing: -0.02em; }
.d-roll .d-roll-mask { display: inline-block; overflow: hidden; vertical-align: bottom; height: 1.15em; }
.d-roll .d-roll-stack {
  display: inline-flex; flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transition-delay: var(--d);
}
.d-roll a:hover .d-roll-stack { transform: translateY(-50%); }
.d-roll .d-roll-stack b { font-weight: inherit; line-height: 1.15; }
.d-roll .d-roll-stack b:last-child { color: #c8ff2e; }`,
  js: `
root.querySelectorAll('a').forEach(function (link) {
  const text = link.dataset.text;
  link.innerHTML = '';
  text.split('').forEach(function (c, i) {
    const glyph = c === ' ' ? '&nbsp;' : c;
    const mask = document.createElement('span');
    mask.className = 'd-roll-mask';
    mask.innerHTML = '<span class="d-roll-stack" style="--d:' + (i * 0.025) + 's"><b>' + glyph + '</b><b>' + glyph + '</b></span>';
    link.appendChild(mask);
  });
});`,
  prompt: `
Build the "letter roll" nav-link hover, vanilla JS + CSS.

Requirements:
- For each link, split the label into characters. Each character becomes an overflow-hidden mask (height: 1.15em) containing a vertical stack of two copies of the same character.
- On link hover, every stack transitions transform: translateY(-50%) so the bottom copy rolls into view; ease cubic-bezier(0.76,0,0.24,1), duration ~0.5s.
- Stagger characters left-to-right by ~25ms each via a --d custom property on transition-delay.
- The incoming (second) copy can be a different color for an accent flash.
- On mouse leave it rolls back automatically (same transition).
- Preserve accessibility: keep the original label as aria-label.`,
});

/* ------------------------------------------------------------
   Proximity type (dock effect for letters)
------------------------------------------------------------ */
INTRX.register({
  id: 'proximity-type',
  title: 'Proximity Type',
  cat: 'Text & Type',
  rootClass: 'd-prox',
  tags: ['distance field', 'wave'],
  libs: [],
  desc: 'Each letter reacts to cursor distance — near letters swell and lift, far ones stay put, creating a wave that follows the pointer through the headline.',
  seen: 'Seen on: type foundries (Dinamo, Pangram Pangram playgrounds), experimental portfolios',
  hint: 'sweep across the word',
  html: `
<div class="d-prox">
  <h2 class="d-prox-word">ELASTIC</h2>
</div>`,
  css: `
.d-prox {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-prox-word { font-size: clamp(40px, 9vw, 96px); font-weight: 700; color: #ececef; letter-spacing: 0.01em; margin: 0; }
.d-prox-word span { display: inline-block; will-change: transform; }`,
  js: `
const word = root.querySelector('.d-prox-word');
word.innerHTML = word.textContent.split('').map(function (c) {
  return '<span>' + c + '</span>';
}).join('');
const letters = [].slice.call(word.querySelectorAll('span'));

const RADIUS = 140;   // influence radius in px
let mx = -9999, my = -9999;

root.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
root.addEventListener('mouseleave', function () { mx = -9999; my = -9999; });

(function tick() {
  letters.forEach(function (el) {
    const b = el.getBoundingClientRect();
    const dx = mx - (b.left + b.width / 2);
    const dy = my - (b.top + b.height / 2);
    const dist = Math.hypot(dx, dy);
    // smooth falloff: 1 at the cursor, 0 at RADIUS
    const t = Math.max(0, 1 - dist / RADIUS);
    const ease = t * t * (3 - 2 * t);        // smoothstep
    el.style.transform = 'translateY(' + (-ease * 22) + 'px) scale(' + (1 + ease * 0.35) + ')';
    el.style.color = ease > 0.35 ? '#c8ff2e' : '';
  });
  requestAnimationFrame(tick);
})();`,
  prompt: `
Build a proximity-reactive headline (mac-dock effect for letters), vanilla JS.

Requirements:
- Split the headline into per-character spans (display: inline-block).
- Track the cursor globally; in a rAF loop compute each letter's distance from the cursor via getBoundingClientRect centers.
- Influence t = max(0, 1 - dist / 140) passed through smoothstep (t*t*(3-2t)).
- Apply transform: translateY(-22px * ease) scale(1 + 0.35 * ease), and tint letters above ~0.35 influence with an accent color.
- Park the cursor at -9999 on mouseleave so letters settle back.
- Optional upgrade: with a variable font, also map ease to font-variation-settings wght.
- Disable on touch devices and under prefers-reduced-motion.`,
});

/* ------------------------------------------------------------
   Animated counter / stat ticker
------------------------------------------------------------ */
INTRX.register({
  id: 'stat-counter',
  title: 'Odometer Stat Counter',
  cat: 'Text & Type',
  rootClass: 'd-count',
  tags: ['numbers', 'ease-out'],
  libs: [],
  desc: 'Numbers count up with a hard ease-out when scrolled into view, odometer style. tabular-nums keeps digits from jittering the layout.',
  seen: 'Seen on: agency about-pages, annual reports, SaaS landing metrics',
  hint: 'click replay',
  html: `
<div class="d-count">
  <div class="d-count-grid">
    <div class="d-count-stat"><b data-target="128" data-suffix="">0</b><span>projects shipped</span></div>
    <div class="d-count-stat"><b data-target="14" data-suffix="">0</b><span>awwwards</span></div>
    <div class="d-count-stat"><b data-target="99" data-suffix="%">0</b><span>lighthouse</span></div>
  </div>
  <button class="d-count-replay">↻ replay</button>
</div>`,
  css: `
.d-count {
  width: 100%; height: 320px; background: #0a0a0b; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.d-count-grid { display: flex; gap: 56px; }
.d-count-stat { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.d-count-stat b {
  font-size: 56px; font-weight: 700; color: #c8ff2e;
  font-variant-numeric: tabular-nums; letter-spacing: -0.02em;
}
.d-count-stat span { font-family: "JetBrains Mono", monospace; font-size: 11px; color: #5c5c66; text-transform: uppercase; letter-spacing: 0.14em; }
.d-count-replay {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  background: none; border: 1px solid #2e2e34; color: #9b9ba3;
  font-family: "JetBrains Mono", monospace; font-size: 11px; padding: 6px 14px; cursor: pointer;
}
.d-count-replay:hover { color: #c8ff2e; border-color: #c8ff2e; }`,
  js: `
const stats = root.querySelectorAll('.d-count-stat b');

function count(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  const start = performance.now();
  function step(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 4);      // quart out
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function playAll() { stats.forEach(count); }

root.querySelector('.d-count-replay').addEventListener('click', playAll);
playAll();`,
  prompt: `
Build scroll-triggered animated stat counters, vanilla JS.

Requirements:
- Elements like <b data-target="128" data-suffix="%">0</b>.
- When scrolled into view (IntersectionObserver, once), count from 0 to target over ~1.6s using requestAnimationFrame and a quart ease-out (1 - (1-p)^4).
- Support an optional suffix (%, +, k).
- Use font-variant-numeric: tabular-nums so the layout doesn't shift while counting.
- Round to integers; for decimal targets support a data-decimals attribute.
- Under prefers-reduced-motion, set the final value immediately.`,
});
