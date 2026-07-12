/* INTRX registry — SKEUOMORPH */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Flip clock
------------------------------------------------------------ */
INTRX.register({
  id: 'flip-clock',
  title: 'Flip Clock',
  cat: 'Skeuomorph',
  rootClass: 'd-flipclock',
  tags: ['css-3d', 'time'],
  libs: [],
  desc: 'A split-flap counter: each card is a top and bottom half, and on every tick the old top flap rotates down while the new bottom flap rotates in — exactly like an airport departures board.',
  seen: 'Seen on: Teenage Engineering, countdown landing pages, retro dashboards',
  hint: 'watch the seconds flip',
  html: `
<div class="d-flipclock">
  <div class="d-flipclock-unit" data-unit="min" aria-hidden="true"></div>
  <span class="d-flipclock-colon" aria-hidden="true">:</span>
  <div class="d-flipclock-unit" data-unit="sec" aria-hidden="true"></div>
  <span class="d-flipclock-sr" role="timer" aria-live="off"></span>
</div>`,
  css: `
.d-flipclock { position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; gap: 14px; perspective: 800px; }
.d-flipclock-colon { color: #5c5c66; font: 700 48px "JetBrains Mono", monospace; transform: translateY(-4px); }
.d-flipclock-unit { position: relative; width: 120px; height: 96px; font: 700 64px/96px "JetBrains Mono", monospace;
  color: #ececef; text-align: center; }
.d-flipclock-unit .half { position: absolute; left: 0; width: 100%; height: 50%; overflow: hidden;
  background: #161619; border: 1px solid #2e2e34; }
.d-flipclock-unit .top { top: 0; border-radius: 6px 6px 0 0; }
.d-flipclock-unit .bottom { bottom: 0; border-radius: 0 0 6px 6px; border-top: 1px solid #0a0a0b; }
.d-flipclock-unit .top span { display: block; transform: translateY(0); }
.d-flipclock-unit .bottom span { display: block; transform: translateY(-48px); }
.d-flipclock-unit .flap { z-index: 2; transform-origin: center bottom; backface-visibility: hidden; }
.d-flipclock-unit .flap.bottom { transform-origin: center top; }
.d-flipclock-unit .flipping-top { animation: d-flipclock-down .28s cubic-bezier(.4,0,1,1) forwards; }
.d-flipclock-unit .flipping-bottom { animation: d-flipclock-up .28s .28s cubic-bezier(0,0,.2,1) forwards; }
@keyframes d-flipclock-down { from { transform: rotateX(0); } to { transform: rotateX(-90deg); } }
@keyframes d-flipclock-up { from { transform: rotateX(90deg); } to { transform: rotateX(0); } }
.d-flipclock-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
@media (prefers-reduced-motion: reduce) {
  .d-flipclock-unit .flipping-top, .d-flipclock-unit .flipping-bottom { animation-duration: 0.01s; animation-delay: 0s; } }`,
  js: `
const units = { min: root.querySelector('[data-unit="min"]'), sec: root.querySelector('[data-unit="sec"]') };
const sr = root.querySelector('.d-flipclock-sr');
const state = { min: '--', sec: '--' };

function halves(value) {
  return '<div class="half top"><span>' + value + '</span></div>' +
         '<div class="half bottom"><span>' + value + '</span></div>';
}

function setUnit(el, next) {
  const curr = el.dataset.value;
  if (curr === next) return;
  if (curr === undefined) {                        /* first paint, no animation */
    el.innerHTML = halves(next);
  } else {
    /* static new top + static old bottom underneath, animated flaps on top */
    el.innerHTML =
      '<div class="half top"><span>' + next + '</span></div>' +
      '<div class="half bottom"><span>' + curr + '</span></div>' +
      '<div class="half top flap flipping-top"><span>' + curr + '</span></div>' +
      '<div class="half bottom flap flipping-bottom"><span>' + next + '</span></div>';
  }
  el.dataset.value = next;
}

function tick() {
  const now = new Date();
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  setUnit(units.min, m);
  setUnit(units.sec, s);
  sr.textContent = m + ':' + s;
}
tick();
const t = setInterval(() => { if (document.contains(root)) tick(); else clearInterval(t); }, 1000);`,
  prompt: `
Build a split-flap "flip clock" showing MM:SS, vanilla JS + CSS 3D.

Requirements:
- Each unit is a 120×96px card in a perspective:800px container, made of a top half and bottom half; each half is height:50%, overflow:hidden, and shows the full-height digit via an inner span translated so top halves show the digit's upper half and bottom halves the lower half (translateY(-48px)).
- On change, render 4 layers: static top = NEW value, static bottom = OLD value, plus two animated flaps above them: an old-value top flap rotating rotateX(0 → -90deg) with transform-origin bottom over 0.28s (ease-in), then a new-value bottom flap rotating rotateX(90 → 0) with transform-origin top, delayed 0.28s (ease-out). backface-visibility: hidden on flaps.
- Tick from the real clock every second; first paint renders without animation.
- Decorative units are aria-hidden; mirror the time into a visually-hidden role="timer" element.
- Under prefers-reduced-motion collapse the animations to ~0s.`,
});

/* ------------------------------------------------------------
   Rotary knob
------------------------------------------------------------ */
INTRX.register({
  id: 'rotary-knob',
  title: 'Rotary Knob',
  cat: 'Skeuomorph',
  rootClass: 'd-knob',
  tags: ['pointer-capture', 'input'],
  libs: [],
  desc: 'A hi-fi volume knob you actually grab and turn. Pointer capture tracks the drag as an angle around the center; the LED readout and arc respond live.',
  seen: 'Seen on: Teenage Engineering, Ableton, synth plugin UIs',
  hint: 'drag the knob in a circle — arrow keys work too',
  html: `
<div class="d-knob">
  <div class="d-knob-dial" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="35">
    <div class="d-knob-face"><div class="d-knob-tick"></div></div>
  </div>
  <div class="d-knob-readout"><span class="d-knob-val">35</span><span class="d-knob-cap">VOL</span></div>
  <svg class="d-knob-arc" viewBox="0 0 100 100" aria-hidden="true">
    <path class="d-knob-track" d="M 21.7 78.3 A 40 40 0 1 1 78.3 78.3" fill="none"/>
    <path class="d-knob-fill"  d="M 21.7 78.3 A 40 40 0 1 1 78.3 78.3" fill="none"/>
  </svg>
</div>`,
  css: `
.d-knob { position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; }
.d-knob-dial { position: relative; width: 128px; height: 128px; border-radius: 50%; cursor: grab; touch-action: none;
  background: radial-gradient(circle at 35% 30%, #232327, #101012 70%);
  border: 1px solid #2e2e34; box-shadow: 0 12px 28px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.06); }
.d-knob-dial:active { cursor: grabbing; }
.d-knob-dial:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 4px; }
.d-knob-face { position: absolute; inset: 0; border-radius: 50%; }
.d-knob-tick { position: absolute; top: 10px; left: 50%; width: 4px; height: 22px; margin-left: -2px;
  border-radius: 2px; background: #c8ff2e; box-shadow: 0 0 10px rgba(200,255,46,.8); }
.d-knob-arc { position: absolute; width: 210px; height: 210px; pointer-events: none; }
.d-knob-track { stroke: #232327; stroke-width: 3; stroke-linecap: round; }
.d-knob-fill { stroke: #c8ff2e; stroke-width: 3; stroke-linecap: round; }
.d-knob-readout { position: absolute; bottom: 26px; text-align: center; display: grid; gap: 2px; }
.d-knob-val { font: 700 22px "JetBrains Mono", monospace; color: #c8ff2e; }
.d-knob-cap { font: 500 9px "JetBrains Mono", monospace; letter-spacing: .2em; color: #5c5c66; }`,
  js: `
const dial = root.querySelector('.d-knob-dial');
const face = root.querySelector('.d-knob-face');
const valEl = root.querySelector('.d-knob-val');
const fill = root.querySelector('.d-knob-fill');
const len = fill.getTotalLength();
fill.style.strokeDasharray = len;
const SWEEP = 270;                                  /* -135° … +135° */
let value = 35, dragging = false, startAngle = 0, startValue = 0;

function angleAt(e) {
  const b = dial.getBoundingClientRect();
  return Math.atan2(e.clientY - (b.top + b.height / 2), e.clientX - (b.left + b.width / 2)) * 180 / Math.PI;
}
function render() {
  const deg = -135 + (value / 100) * SWEEP;
  face.style.transform = 'rotate(' + deg + 'deg)';
  fill.style.strokeDashoffset = len * (1 - value / 100);
  valEl.textContent = Math.round(value);
  dial.setAttribute('aria-valuenow', Math.round(value));
}
dial.addEventListener('pointerdown', e => {
  dragging = true; startAngle = angleAt(e); startValue = value;
  dial.setPointerCapture(e.pointerId);
});
dial.addEventListener('pointermove', e => {
  if (!dragging) return;
  let delta = angleAt(e) - startAngle;
  if (delta > 180) delta -= 360; if (delta < -180) delta += 360;   /* shortest direction */
  value = Math.max(0, Math.min(100, startValue + (delta / SWEEP) * 100));
  render();
});
['pointerup', 'pointercancel'].forEach(t => dial.addEventListener(t, () => dragging = false));
dial.addEventListener('keydown', e => {
  const step = { ArrowUp: 2, ArrowRight: 2, ArrowDown: -2, ArrowLeft: -2 }[e.key];
  if (step === undefined) return;
  e.preventDefault();
  value = Math.max(0, Math.min(100, value + step));
  render();
});
render();`,
  prompt: `
Build a draggable rotary knob (0–100) with an LED arc, vanilla JS.

Requirements:
- A circular dial with a glowing tick; value maps to rotation over a 270° sweep (-135° to +135°).
- Drag anywhere on the dial: on pointerdown record the pointer's angle to the dial center (atan2) and the current value; on pointermove add the angle delta (normalized to ±180 for shortest direction) scaled by 100/270. Use setPointerCapture and touch-action:none.
- An SVG arc behind the dial: track path plus an accent fill path animated with strokeDasharray = getTotalLength() and strokeDashoffset = len × (1 - value/100).
- Accessible: role="slider" with aria-valuemin/max/now, focusable, arrow keys ±2, visible focus ring.
- Skeuomorphic finish: radial-gradient face, inner top highlight, deep drop shadow, grab/grabbing cursors.`,
});

/* ------------------------------------------------------------
   Mechanical switch
------------------------------------------------------------ */
INTRX.register({
  id: 'mechanical-switch',
  title: 'Mechanical Switch',
  cat: 'Skeuomorph',
  rootClass: 'd-mswitch',
  tags: ['spring', 'aria-pressed'],
  libs: [],
  desc: 'A heavy industrial power switch. The lever snaps between positions with a spring overshoot, the panel LED responds, and the whole plate nudges from the impact.',
  seen: 'Seen on: Poolsuite, hardware product pages, dashboard easter eggs',
  hint: 'flip the switch',
  html: `
<div class="d-mswitch">
  <div class="d-mswitch-plate">
    <span class="d-mswitch-led" aria-hidden="true"></span>
    <button class="d-mswitch-btn" type="button" aria-pressed="false" aria-label="Power">
      <span class="d-mswitch-slot" aria-hidden="true"><span class="d-mswitch-lever"></span></span>
    </button>
    <span class="d-mswitch-cap">MAIN&nbsp;PWR</span>
  </div>
  <span class="d-mswitch-status mono-note">SYSTEM OFFLINE</span>
</div>`,
  css: `
.d-mswitch { position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; }
.d-mswitch-plate { position: relative; display: grid; place-items: center; gap: 14px; padding: 26px 34px;
  background: linear-gradient(180deg, #1a1a1e, #121215); border: 1px solid #2e2e34; border-radius: 10px;
  box-shadow: 0 16px 40px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.05);
  transition: transform .12s cubic-bezier(.34,1.56,.64,1); }
.d-mswitch-plate.thunk { transform: translateY(2px); }
.d-mswitch-led { width: 10px; height: 10px; border-radius: 50%; background: #3a3a40;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.8); transition: background .18s, box-shadow .18s; }
.d-mswitch.on .d-mswitch-led { background: #c8ff2e; box-shadow: 0 0 14px rgba(200,255,46,.9); }
.d-mswitch-btn { background: none; border: none; padding: 0; cursor: pointer; }
.d-mswitch-btn:focus-visible { outline: 2px solid #c8ff2e; outline-offset: 6px; border-radius: 8px; }
.d-mswitch-slot { display: block; width: 56px; height: 110px; border-radius: 8px; position: relative;
  background: linear-gradient(180deg, #0c0c0e, #17171a); border: 1px solid #2e2e34;
  box-shadow: inset 0 4px 12px rgba(0,0,0,.8); }
.d-mswitch-lever { position: absolute; left: 6px; right: 6px; top: 8px; height: 44px; border-radius: 6px;
  background: linear-gradient(180deg, #34343a, #232327 60%, #1b1b1f);
  border: 1px solid #3c3c44; box-shadow: 0 6px 10px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,255,255,.08);
  transition: transform .22s cubic-bezier(.34,1.8,.44,1); }
.d-mswitch.on .d-mswitch-lever { transform: translateY(50px); }
.d-mswitch-cap { font: 500 9px "JetBrains Mono", monospace; letter-spacing: .22em; color: #5c5c66; }
.d-mswitch-status { font: 500 11px "JetBrains Mono", monospace; letter-spacing: .16em; color: #5c5c66;
  transition: color .18s; }
.d-mswitch.on .d-mswitch-status { color: #c8ff2e; }
@media (prefers-reduced-motion: reduce) {
  .d-mswitch-lever, .d-mswitch-plate { transition-duration: 0.01s; } }`,
  js: `
const btn = root.querySelector('.d-mswitch-btn');
const plate = root.querySelector('.d-mswitch-plate');
const status = root.querySelector('.d-mswitch-status');

btn.addEventListener('click', () => {
  const on = !root.classList.contains('on');
  root.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', String(on));
  status.textContent = on ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE';
  /* the plate takes the impact */
  plate.classList.remove('thunk');
  void plate.offsetWidth;                     /* restart the transition */
  plate.classList.add('thunk');
  setTimeout(() => plate.classList.remove('thunk'), 130);
});`,
  prompt: `
Build a skeuomorphic mechanical power switch, vanilla JS + CSS.

Requirements:
- A metal plate (gradient, inner highlight, deep shadow) holding a vertical slot with a chunky lever. The lever is a <button> with aria-pressed and a visible focus ring.
- Toggling translates the lever 50px with a spring overshoot: transition transform .22s cubic-bezier(.34,1.8,.44,1).
- Impact feedback: the plate briefly translates down 2px (restart the transition by removing the class, reading offsetWidth, re-adding).
- A panel LED goes from dead gray (inset shadow) to glowing accent (outer glow) when on; a mono status line switches SYSTEM OFFLINE / ONLINE.
- All state via one .on class on the root. Under prefers-reduced-motion, transitions collapse to ~0s.`,
});
