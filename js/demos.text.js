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
  <h2 class="d-split-line">A thought.</h2>
  <h2 class="d-split-line d-split-accent">Made visible.</h2>
  <button class="d-split-replay"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 10a8 8 0 1 1 1.5 7M4 4v6h6"/></svg><span>Replay</span></button>
</div>`,
  css: `
.d-split {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  position: relative;
}
.d-split-line { font-size: clamp(28px, 5vw, 52px); font-weight:500; color: #ececef; letter-spacing: -0.02em; margin: 0; }
.d-split-line.d-split-accent { color: #c8ff2e; }
.d-split-line .d-split-ch-mask { display: inline-block; overflow: hidden; vertical-align: bottom; }
.d-split-line .d-split-ch { display: inline-block; will-change: transform; }
.d-split-replay {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  background: none; border: 1px solid #2e2e34; color: #9b9ba3;
  font-family: "Inter",system-ui,sans-serif; font-size: 11px; padding: 6px 14px; cursor: pointer;
}
.d-split-replay:hover { color: #c8ff2e; border-color: #c8ff2e; }
/* Composition at the native preview size. */
.d-split{padding:24px;box-sizing:border-box;container-type:inline-size;align-items:flex-start}.d-split-line{font:500 clamp(26px,10cqw,43px)/1.15 "Inter",system-ui,sans-serif;letter-spacing:-0.025em;white-space:nowrap}.d-split-line.d-split-accent,.d-split-replay:hover{color:#fa7319}
/* Composition at the native preview size. */
.d-split button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-split-line{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-split{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-split :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-split button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-split h2{font-family:"Inter",system-ui,sans-serif;font-weight:450;letter-spacing:-.02em;line-height:1.18}.d-split button{font:400 11px "Inter",system-ui,sans-serif;border-radius:5px;padding:8px 12px}.d-split{padding:25px}
.d-split-replay{display:inline-flex;align-items:center;justify-content:center;gap:6px;line-height:1.25}.d-split-replay svg{display:block;flex:none}`,
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
  prompt: `Build a split-text character reveal with GSAP (or vanilla).

Requirements:
- Split each headline into individual characters. Wrap every character in an outer span with overflow: hidden (the mask) and an inner span that animates. Preserve spaces as &nbsp;.
- Animate the inner spans from yPercent: 110 and rotate: 6deg to 0 with power4.out, duration ~0.9s, stagger 0.025s per character.
- Trigger on page load and again when the element scrolls into view (IntersectionObserver or ScrollTrigger).
- Keep accessibility: set aria-label with the original text on the heading and aria-hidden on the spans.
- Under prefers-reduced-motion, skip splitting entirely.

Set the two lines “A thought.” and “Made visible.” in compact medium-weight role-appropriate type, with the second line orange. Use 24px padding and container-relative sizes so both lines fit a 300–320px-wide preview.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  <p class="d-scramble-label">A studio in motion</p>
  <h2 class="d-scramble-text">Ideas into form</h2>
</div>`,
  css: `
.d-scramble {
  width: 100%; height: 320px; background: #0a0a0b; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
}
.d-scramble-label { font-family: "Inter",system-ui,sans-serif; font-size: 11px; color: #5c5c66; letter-spacing: 0.2em; }
.d-scramble-text {
  font-family: "Inter",system-ui,sans-serif; font-size: clamp(24px, 4.5vw, 44px);
  font-weight:500; color: #c8ff2e; letter-spacing: 0.06em; margin: 0;
  min-height: 1.2em;
}
.d-scramble-text .d-scramble-junk { color: #3c3c44; }
/* Composition at the native preview size. */
.d-scramble{padding:24px;box-sizing:border-box;container-type:inline-size;align-items:flex-start}.d-scramble-label{color:#999;font-size:10px;letter-spacing:0.06em}.d-scramble-text{font:500 clamp(19px,6.5cqw,33px)/1.25 "Inter",system-ui,sans-serif;color:#eee;letter-spacing:-0.025em}.d-scramble-junk{color:#fa7319}
/* Refined type, spacing and quiet interaction controls. */
.d-scramble{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-scramble :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-scramble button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-scramble-text{font:450 clamp(27px,10cqw,37px)/1.2 "Inter",system-ui,sans-serif;letter-spacing:-.02em;min-height:2.4em;max-width:240px}.d-scramble-label{font:400 11px "Inter",system-ui,sans-serif;color:#89958c;letter-spacing:0}.d-scramble-junk{color:#859c8d}.d-scramble{padding:27px}`,
  js: `
const el = root.querySelector('.d-scramble-text');
const GLYPHS = '!<>-_\\\\/[]{}—=+*^?#________';
const PHRASES = ['Ideas into form', 'Make it matter', 'Move with purpose', 'Keep exploring'];
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
  prompt: `Build a text scramble / decode effect in vanilla JS (the classic "hacker text").

Requirements:
- A setText(next) function that transitions the current string to the next one.
- For each character position, pick a random start frame (0-30) and end frame (start + 0-30). Before start, show the old character; between start and end, show a random glyph from a set like !<>-_\\/[]{}—=+*^?#, re-randomized with ~28% probability per frame so it flickers; after end, lock in the new character.
- Run on requestAnimationFrame until all characters resolve.
- Render in-progress glyphs in #fa7319 (wrap in a span).
- Use a monospace font so the line does not jitter horizontally.
- Cycle through an array of phrases on click or on an interval, and expose setText for reuse.

Use a restrained mono heading in light gray on graphite, with decoding glyphs in #fa7319. Keep native 24px padding and container-relative type so the complete phrases fit narrow previews.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  font-size: 44px; font-weight:500; letter-spacing: -0.02em;
  color: #ececef; padding-right: 24px;
}
.d-marquee-track span i { font-style: normal; color: #c8ff2e; }
.d-marquee-band.d-marquee-alt .d-marquee-track span { color: transparent; -webkit-text-stroke: 1px #5c5c66; }
/* Composition at the native preview size. */
.d-marquee-track span{font-family:"Inter",system-ui,sans-serif;font-weight:500}.d-marquee-track span i{color:#fa7319}
/* Composition at the native preview size. */
.d-marquee button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-marquee-track span{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-marquee{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-marquee :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-marquee button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-marquee-track{font-weight:450;letter-spacing:-.025em}.d-marquee{background:#0c0e0d}`,
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
  prompt: `Build an infinite kinetic marquee in vanilla JS.

Requirements:
- A nowrap track whose content chunk is repeated ~6x so it always overflows.
- A rAF loop advances an x position by a base speed (~0.6px/frame); wrap with modulo of one chunk width so the loop is seamless: translateX(-(((x % w) + w) % w)).
- Listen to wheel/scroll and add the delta to a velocity value that boosts the marquee speed, with friction (*= 0.94 per frame) so it settles back to base speed.
- Two bands moving in opposite directions, the second with outlined (text-stroke) type.
- transform only, will-change: transform.
- Under prefers-reduced-motion, keep it static.

Use medium-weight Inter, with #fa7319 punctuation accents and a gray outline second row.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter small numeric readouts, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
    <span>Every small detail.</span>
    <span>A little more weight.</span>
    <span>A little less friction.</span>
    <span class="d-lines-accent">A better feeling.</span>
  </div>
  <button class="d-lines-replay"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 10a8 8 0 1 1 1.5 7M4 4v6h6"/></svg><span>Replay</span></button>
</div>`,
  css: `
.d-lines {
  width: 100%; height: 320px; background: #0a0a0b; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.d-lines-copy { display: flex; flex-direction: column; gap: 2px; }
.d-lines-copy span {
  display: block; overflow: hidden;
  font-size: clamp(18px, 3vw, 28px); font-weight:500; color: #ececef; line-height: 1.35;
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
  font-family: "Inter",system-ui,sans-serif; font-size: 11px; padding: 6px 14px; cursor: pointer;
}
.d-lines-replay:hover { color: #c8ff2e; border-color: #c8ff2e; }
/* Composition at the native preview size. */
.d-lines{padding:24px;box-sizing:border-box;container-type:inline-size;justify-content:flex-start}.d-lines-copy span{font:500 clamp(18px,7cqw,30px)/1.45 "Inter",system-ui,sans-serif;white-space:nowrap;letter-spacing:-0.025em}.d-lines-copy span.d-lines-accent{color:#fa7319}
/* Composition at the native preview size. */
.d-lines button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-lines-copy span{font-family:"Newsreader",Georgia,serif;letter-spacing:-0.025em}
/* Composition at the native preview size. */
.d-lines-copy span{font-size:clamp(23px,8.5cqw,37px);font-weight:400;line-height:1.3;letter-spacing:-0.02em}
/* Refined type, spacing and quiet interaction controls. */
.d-lines{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-lines :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-lines button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-lines-copy{font-family:"Newsreader",Georgia,serif;font-weight:400;letter-spacing:-.01em;line-height:1.4}.d-lines button{font:400 11px "Inter",system-ui,sans-serif;border-radius:5px;padding:8px 12px}
.d-lines-replay{display:inline-flex;align-items:center;justify-content:center;gap:6px;line-height:1.25}.d-lines-replay svg{display:block;flex:none}`,
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
  prompt: `Build a line-by-line mask text reveal, vanilla JS + CSS.

Requirements:
- Each visual line of text is a block element with overflow: hidden; inside it an inner element starts at transform: translateY(110%).
- On trigger, add a class that transitions the inner elements to translateY(0) with cubic-bezier(0.19,1,0.22,1) over ~0.9s.
- Stagger lines by ~120ms each using a --d custom property on transition-delay.
- To replay, remove the class, force a reflow (void el.offsetWidth), and re-add it.
- Trigger on scroll into view with IntersectionObserver.
- Note: for real multi-line paragraphs, split lines at runtime (e.g. SplitType or GSAP SplitText 'lines' mode) instead of hand-authored spans.
- Under prefers-reduced-motion, show text immediately.

Use the four short lines “Every small detail.”, “A little more weight.”, “A little less friction.”, and “A better feeling.” in compact role-appropriate type with 24px padding and one orange accent line. Size each complete line to fit narrow previews.

Final typography: Use Newsreader at normal weight for the main editorial text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
.d-roll a { text-decoration: none; font-size: 42px; font-weight:500; color: #ececef; letter-spacing: -0.02em; }
.d-roll .d-roll-mask { display: inline-block; overflow: hidden; vertical-align: bottom; height: 1.15em; }
.d-roll .d-roll-stack {
  display: inline-flex; flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transition-delay: var(--d);
}
.d-roll a:hover .d-roll-stack, .d-roll.d-roll-auto .d-roll-stack { transform: translateY(-50%); }
.d-roll .d-roll-stack b { font-weight: inherit; line-height: 1.15; }
.d-roll .d-roll-stack b:last-child { color: #fa7319; }
@media (prefers-reduced-motion: reduce) { .d-roll .d-roll-stack { transition: none; } }
/* Composition at the native preview size. */
.d-roll a{font:500 34px/1.15 "Inter",system-ui,sans-serif;letter-spacing:-0.025em}.d-roll a:focus-visible .d-roll-stack{transform:translateY(-50%)}
/* Composition at the native preview size. */
.d-roll button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-roll a{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-roll{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-roll :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-roll button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-roll-link{font:450 34px/1.2 "Inter",system-ui,sans-serif;letter-spacing:-.025em}.d-roll{gap:12px}.d-roll-char{height:1.2em}.d-roll-char>span{line-height:1.2em}`,
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
});

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let idle = !reduced, idleTimer = 0;
function stopIdle() {
  if (!idle) return;
  idle = false;
  clearTimeout(idleTimer);
  root.classList.remove('d-roll-auto');
}
if (!reduced) {
  root.addEventListener('pointerover', stopIdle, { once: true });
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
  requestAnimationFrame(function () {
    if (!root.isConnected || !idle) return;
    root.classList.add('d-roll-auto');
    idleTimer = setTimeout(function () {
      if (!root.isConnected) return;
      idle = false;
      root.classList.remove('d-roll-auto');
    }, 900);
  });
}`,
  prompt: `Build the "letter roll" nav-link hover, vanilla JS + CSS.

Requirements:
- For each link, split the label into characters. Each character becomes an overflow-hidden mask (height: 1.15em) containing a vertical stack of two copies of the same character.
- On link hover, every stack transitions transform: translateY(-50%) so the bottom copy rolls into view; ease cubic-bezier(0.76,0,0.24,1), duration ~0.5s.
- Stagger characters left-to-right by ~25ms each via a --d custom property on transition-delay.
- The incoming (second) copy can be a different color for an accent flash.
- On mouse leave it rolls back automatically (same transition).
- Auto-roll once on boot as a teaser, then return to hover-only behavior; cancel the teaser permanently on first pointer or keyboard interaction.
- Respect prefers-reduced-motion by skipping the boot teaser and transitions.
- Preserve accessibility: keep the original label as aria-label.

Set the links in medium-weight 34px role-appropriate type. Apply the same rolling stack transform on keyboard focus-visible as on hover.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
.d-prox-word { font-size: clamp(40px, 9vw, 96px); font-weight:500; color: #ececef; letter-spacing: 0.01em; margin: 0; }
.d-prox-word span { display: inline-block; will-change: transform; }
/* Composition at the native preview size. */
.d-prox{padding:24px;box-sizing:border-box;container-type:inline-size}.d-prox-word{font:500 clamp(28px,12cqw,60px)/1 "Inter",system-ui,sans-serif;white-space:nowrap;letter-spacing:-0.025em}
/* Composition at the native preview size. */
.d-prox button{font-family:"Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;border-color:rgba(255,255,255,.15)}
.d-prox-word{font-family:"Inter",system-ui,sans-serif;letter-spacing:-0.025em}
/* Refined type, spacing and quiet interaction controls. */
.d-prox{font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums}.d-prox :is(button,input,select){font-family:"Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0}.d-prox button:focus-visible{outline:2px solid #9ead9e;outline-offset:3px}.d-prox-word{font-family:"Inter",system-ui,sans-serif;font-weight:450;letter-spacing:-.015em}`,
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
    el.style.color = ease > 0.35 ? '#fa7319' : '';
  });
  requestAnimationFrame(tick);
})();`,
  prompt: `Build a proximity-reactive headline (mac-dock effect for letters), vanilla JS.

Requirements:
- Split the headline into per-character spans (display: inline-block).
- Track the cursor globally; in a rAF loop compute each letter's distance from the cursor via getBoundingClientRect centers.
- Influence t = max(0, 1 - dist / 140) passed through smoothstep (t*t*(3-2t)).
- Apply transform: translateY(-22px * ease) scale(1 + 0.35 * ease), and tint letters above ~0.35 influence with an accent color.
- Park the cursor at -9999 on mouseleave so letters settle back.
- Optional upgrade: with a variable font, also map ease to font-variation-settings wght.
- Disable on touch devices and under prefers-reduced-motion.

Use a medium-weight sans-serif headline, native 24px padding, and container-relative sizing. Tint influenced letters #fa7319 while the remaining letters stay light gray.

Final typography: Use Inter for the main display or interface text. Use Inter for actions and readable interface copy; retain regular Inter counters, coordinates and technical annotations. Keep material borders subdued and gradients broad with continuous, gentle falloff.

Use the final composition: regular Inter for interface text and all numerical values with tabular-nums; keep labels in sentence case, normal tracking, and weights 400–500. Remove decorative engineering headers, preserve functional controls and accessible status. Keep the native 320px stage and a restrained palette with subtle borders. Any deliberate Newsreader editorial text in the source remains editorial, not UI.`,
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
  html: `<div class="d-count"><div class="d-count-heading">Studio at a glance</div><div class="d-count-grid"><div class="d-count-stat"><b data-target="128" data-suffix="">0</b><span>Projects delivered</span></div><div class="d-count-stat"><b data-target="14" data-suffix="">0</b><span>Design awards</span></div><div class="d-count-stat"><b data-target="99" data-suffix="%">0</b><span>Client satisfaction</span></div></div><button class="d-count-replay" type="button">Replay numbers <span aria-hidden="true">↻</span></button><p class="d-count-status" aria-live="polite"></p></div>`,
  css: `.d-count{width:100%;height:320px;box-sizing:border-box;padding:24px;background:#0a0a0b;color:#f3f3f3;font-family:"Inter",system-ui,sans-serif;position:relative}.d-count-heading{color:#a4a7ac;font-size:13px;line-height:20px;font-weight:400}.d-count-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:18px;row-gap:20px;margin-top:18px}.d-count-stat{min-width:0;display:flex;flex-direction:column;gap:6px}.d-count-stat:first-child{grid-column:1/-1;padding-bottom:20px;border-bottom:1px solid #26282c}.d-count-stat b{font:450 32px/1.05 "Inter",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:0;color:#eee}.d-count-stat:first-child b{font-size:50px;font-weight:400}.d-count-stat span{font:400 11px/1.4 "Inter",system-ui,sans-serif;color:#9da1a7;letter-spacing:0}.d-count-stat:first-child span{font-size:13px;color:#b7bac0}.d-count-replay{display:flex;align-items:center;justify-content:space-between;margin-top:21px;width:100%;height:34px;border:1px solid #303237;border-radius:7px;background:#17181a;color:#d0d2d5;font:400 11px "Inter",system-ui,sans-serif;padding:0 12px;cursor:pointer}.d-count-replay:hover{background:#222428}.d-count-replay:focus-visible{outline:2px solid #fa7319;outline-offset:3px}.d-count-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}`,
  js: `const stats=[...root.querySelectorAll(".d-count-stat b")],status=root.querySelector(".d-count-status");let raf=0;const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;function play(){cancelAnimationFrame(raf);const start=performance.now();root.dataset.phase="counting";function frame(now){const p=reduce?1:Math.min(1,(now-start)/1300),e=1-Math.pow(1-p,4);stats.forEach(el=>{const decimals=Number(el.dataset.decimals||0),target=Number(el.dataset.target);el.textContent=(target*e).toLocaleString("en-US",{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+(el.dataset.suffix||"")});if(p<1)raf=requestAnimationFrame(frame);else{root.dataset.phase="complete";status.textContent="128 projects delivered, 14 design awards, 99 percent client satisfaction"}}raf=requestAnimationFrame(frame)}root.querySelector(".d-count-replay").addEventListener("click",play);const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){play();observer.disconnect()}},{threshold:.3});observer.observe(root);return function(){cancelAnimationFrame(raf);observer.disconnect()};`,
  prompt: `Build a native 300 by 320px studio statistics card. Use a muted Studio at a glance label, one featured 128 Projects delivered metric, a fine divider, and two smaller statistics: 14 Design awards and 99% Client satisfaction. Set every number in locally bundled Inter at weight400–450, tabular numerals, zero letter spacing and normal character proportions. The featured number is50px; the two supporting values are32px. Give labels11–13px readable Inter and a clear Replay numbers button. Animate all three values from zero in one requestAnimationFrame loop with quartic ease-out over1.3seconds. Format decimals through data-decimals and preserve each data-target/data-suffix. Trigger once when visible; Replay restarts fromzero. Reduced motion shows final values immediately. Announce completion only and cancel the animation/observer on cleanup. Keep subdued charcoal surfaces and visible keyboard focus; no telemetry header or decorative rulers.`,
});
