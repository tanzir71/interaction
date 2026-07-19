/* INTRX registry — published paper stack physics demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'paper-stack-cards',
  title: 'Paper Stack Toss',
  cat: 'Skeuomorph',
  rootClass: 'd-paper-stack',
  tags: ['drag', 'physics', 'paper'],
  libs: [],
  desc: 'Three textured sheets form a recyclable desk stack: a captured drag peels the top page, then measured release velocity either springs it home or tosses it with inertia, angular momentum, drag, and gravity.',
  seen: 'Seen on: editorial portfolios, case-study indexes, moodboards, and tactile archive interfaces',
  hint: 'drag a sheet beyond the threshold and release — short pulls spring back',
  html: `
<div class="d-paper-stack" role="group" aria-label="Draggable three-sheet paper stack">
  <div class="d-paper-stack-head">
    <span>FIELD NOTES / INBOX</span><span><i></i> 03 SHEETS</span>
  </div>
  <div class="d-paper-stack-desk">
    <div class="d-paper-stack-counter" aria-hidden="true"><span>TOSSED</span><strong>000</strong></div>
    <div class="d-paper-stack-deck">
      <article class="d-paper-card d-paper-card-a" role="button" tabindex="0" aria-label="Top sheet 1 of 3. Drag to toss, or use arrow keys.">
        <header><span>STUDIO LOG / 01</span><b>12.06</b></header>
        <h3>Ideas need<br>room to move.</h3>
        <p>Pull the page. Keep the thought.</p>
        <footer><i></i><span>PHYSICS STUDY</span></footer>
      </article>
      <article class="d-paper-card d-paper-card-b" role="button" tabindex="-1" aria-label="Sheet 2 of 3">
        <header><span>MATERIAL LOG / 02</span><b>14.06</b></header>
        <h3>Texture holds<br>the memory.</h3>
        <p>Edges, fibers, pressure, time.</p>
        <footer><i></i><span>PAPER ARCHIVE</span></footer>
      </article>
      <article class="d-paper-card d-paper-card-c" role="button" tabindex="-1" aria-label="Sheet 3 of 3">
        <header><span>MOTION LOG / 03</span><b>18.06</b></header>
        <h3>Release gives<br>form to force.</h3>
        <p>Distance or speed decides.</p>
        <footer><i></i><span>GESTURE NOTES</span></footer>
      </article>
    </div>
    <div class="d-paper-stack-threshold" aria-hidden="true"><i></i><span>120 PX / 0.75 PX·MS⁻¹</span></div>
  </div>
  <div class="d-paper-stack-foot">
    <p class="d-paper-stack-status" aria-live="polite">Sheet 1 ready — drag to peel</p>
    <div>
      <button class="d-paper-stack-left" type="button">Toss left</button>
      <button class="d-paper-stack-right" type="button">Toss right</button>
      <button class="d-paper-stack-reset" type="button">Reset</button>
    </div>
  </div>
</div>`,
  css: `
.d-paper-stack {
  width: 100%; min-height: 500px; position: relative; overflow: hidden; box-sizing: border-box;
  padding: 21px clamp(14px,4vw,38px) 18px; color: #ececef; background: #0a0a0b;
  font-family:'Roboto Mono','JetBrains Mono',ui-monospace,monospace;
}
.d-paper-stack::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .55; background: repeating-linear-gradient(6deg,rgba(255,255,255,.018) 0 1px,rgba(0,0,0,.10) 1px 2px,transparent 2px 7px); }
.d-paper-stack-head { position: relative; z-index: 5; display: flex; justify-content: space-between; gap: 14px; color: #9b9ba3; font: 700 9px/1.2 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .14em; }.d-paper-stack-head span:last-child { display: inline-flex; align-items: center; gap: 7px; }.d-paper-stack-head i { width: 6px; height: 6px; border-radius: 50%; background: #fa7319; box-shadow: 0 0 7px rgba(250,115,25,.35); }
.d-paper-stack-desk { position: relative; z-index: 2; width: min(700px,100%); height: 385px; margin: 17px auto 0; overflow: hidden; border: 1px solid #232327; border-radius: 4px; background: repeating-linear-gradient(90deg,rgba(255,255,255,.018) 0 1px,transparent 1px 5px),#101012; box-shadow: inset 0 2px 8px rgba(0,0,0,.55),0 14px 28px rgba(0,0,0,.30); }
.d-paper-stack-counter { position: absolute; left: 16px; top: 15px; z-index: 8; display: grid; gap: 4px; color: #5c5c66; font: 650 7px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .13em; }.d-paper-stack-counter strong { color: #ececef; font-size: 14px; letter-spacing: .08em; }
.d-paper-stack-deck { position: absolute; inset: 0; perspective: 900px; }
.d-paper-card {
  --peel: 0; position: absolute; left: 50%; top: 50%; width: min(330px,72vw); height: 244px; box-sizing: border-box;
  margin-left: max(-165px,-36vw); margin-top: -122px; padding: 22px 24px 19px; overflow: hidden;
  border: 1px solid rgba(0,0,0,.22); border-radius: 1px; color: #1b1b1e; background: #d7d2c4; outline: none;
  box-shadow: 0 2px 3px rgba(0,0,0,.22),0 10px 20px rgba(0,0,0,.28); user-select: none; touch-action: none; cursor: grab;
  transform-origin: 50% 72%; will-change: transform;
}
.d-paper-card::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .62; background: repeating-linear-gradient(2deg,rgba(0,0,0,.025) 0 1px,transparent 1px 5px),linear-gradient(rgba(255,255,255,.10),rgba(255,255,255,0) 42%); }
.d-paper-card::after { content: ''; position: absolute; right: 0; bottom: 0; width: calc(12px + var(--peel) * 40px); height: calc(12px + var(--peel) * 40px); pointer-events: none; background: linear-gradient(135deg,rgba(0,0,0,.18) 0 48%,#d7d2c4 50% 68%,rgba(0,0,0,.20) 70%); clip-path: polygon(100% 0,0 100%,100% 100%); filter: drop-shadow(-2px -2px 2px rgba(0,0,0,.18)); }
.d-paper-card > * { position: relative; z-index: 2; }.d-paper-card header,.d-paper-card footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; font: 700 8px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .12em; }.d-paper-card header { padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,.2); color: #5c5c66; }.d-paper-card header b { color: #fa7319; font-weight: 700; }.d-paper-card h3 { margin: 22px 0 8px; font: 700 clamp(24px,4.8vw,38px)/.94 Georgia,'Times New Roman',serif; letter-spacing: -.035em; }.d-paper-card p { margin: 0; color: #5c5c66; font: 500 10px/1.4 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; }.d-paper-card footer { position: absolute; left: 24px; right: 24px; bottom: 18px; justify-content: flex-start; color: #5c5c66; }.d-paper-card footer i { width: 20px; height: 2px; background: #fa7319; }
.d-paper-card.is-top { z-index: 4; transform: translate3d(0,0,0) rotate(0deg); }.d-paper-card.is-mid { z-index: 3; transform: translate3d(10px,10px,0) rotate(2.1deg); background: #d7d2c4; opacity:.96; }.d-paper-card.is-back { z-index: 2; transform: translate3d(-8px,19px,0) rotate(-2.6deg); background: #d7d2c4; opacity:.90; }
.d-paper-card.is-top:focus-visible { box-shadow:0 0 0 2px #d7d2c4,0 0 0 4px #fa7319,0 14px 25px rgba(0,0,0,.32); }.d-paper-card.is-dragging { cursor: grabbing; z-index: 7; box-shadow:0 5px 6px rgba(0,0,0,.22),0 25px 42px rgba(0,0,0,.42); }.d-paper-card.is-tossing { z-index: 9; pointer-events: none; }
.d-paper-card-b,.d-paper-card-c { color:#1b1b1e; background:#d7d2c4; }.d-paper-card-b header b,.d-paper-card-b footer i,.d-paper-card-c header b,.d-paper-card-c footer i { color:#fa7319; background:#fa7319; }
.d-paper-stack-threshold { position: absolute; right: 16px; bottom: 14px; z-index: 8; display: flex; align-items: center; gap: 7px; color: #9b9ba3; font: 650 7px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .09em; }.d-paper-stack-threshold i { width: 18px; border-top: 1px dashed #5c5c66; }
.d-paper-stack-foot { position: relative; z-index: 5; width: min(700px,100%); margin: 13px auto 0; display: flex; align-items: center; justify-content: space-between; gap: 13px; }.d-paper-stack-status { margin: 0; color: #9b9ba3; font: 650 9px/1.3 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .055em; }.d-paper-stack-foot > div { display: flex; gap: 6px; }.d-paper-stack button { min-height: 31px; padding: 7px 10px; border: 1px solid #3f3f46; border-radius: 2px; color: #9b9ba3; background: #161619; font: 700 8px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; }.d-paper-stack button:hover,.d-paper-stack button:focus-visible { color: #ececef; border-color: #fa7319; outline: none; }
@media (max-width: 520px) { .d-paper-stack { min-height: 550px; padding-inline: 9px; }.d-paper-stack-desk { height: 405px; }.d-paper-card { height: 255px; margin-top: -127px; padding-inline: 18px; }.d-paper-card footer { left: 18px; right: 18px; }.d-paper-stack-foot { align-items: flex-start; }.d-paper-stack-status { max-width: 135px; }.d-paper-stack-foot > div { display: grid; grid-template-columns: 1fr 1fr; }.d-paper-stack-reset { grid-column: 1 / 3; } }
@media (prefers-reduced-motion: reduce) { .d-paper-card { will-change: auto; } }`,
  js: `
const desk = root.querySelector('.d-paper-stack-desk');
const deck = root.querySelector('.d-paper-stack-deck');
const cards = Array.from(root.querySelectorAll('.d-paper-card'));
const counter = root.querySelector('.d-paper-stack-counter strong');
const status = root.querySelector('.d-paper-stack-status');
const leftButton = root.querySelector('.d-paper-stack-left');
const rightButton = root.querySelector('.d-paper-stack-right');
const resetButton = root.querySelector('.d-paper-stack-reset');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const THROW_DISTANCE = 120, THROW_SPEED = .75, GRAVITY = .0014, DRAG = .992;
const SPRING = .00009, SPRING_DAMPING = .78;
let active = 0, tossed = 0, dragging = false, pointerId = null, motion = 'idle', motionCard = null, lastFrame = 0;
let startX = 0, startY = 0, lastX = 0, lastY = 0, lastTime = 0;
const position = { x: 0, y: 0, rotation: 0 };
const velocity = { x: 0, y: 0, rotation: 0 };

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function topCard() { return cards[active]; }
function render(card) {
  const distance = Math.hypot(position.x, position.y);
  card.style.transform = 'translate3d(' + position.x.toFixed(2) + 'px,' + position.y.toFixed(2) + 'px,0) rotate(' + position.rotation.toFixed(2) + 'deg)';
  card.style.setProperty('--peel', clamp(distance / 160, 0, 1).toFixed(3));
}
function resetVisual(card) {
  card.style.transform = ''; card.style.setProperty('--peel', '0'); card.classList.remove('is-dragging','is-tossing');
}
function updateStack(focusTop) {
  cards.forEach(function (card) { card.classList.remove('is-top','is-mid','is-back'); card.tabIndex = -1; resetVisual(card); });
  const top = cards[active], mid = cards[(active + 1) % cards.length], back = cards[(active + 2) % cards.length];
  top.classList.add('is-top'); mid.classList.add('is-mid'); back.classList.add('is-back'); top.tabIndex = 0;
  top.setAttribute('aria-label', 'Top sheet ' + (active + 1) + ' of 3. Drag to toss, or use arrow keys.');
  counter.textContent = String(tossed).padStart(3, '0');
  if (focusTop) top.focus();
}
function zeroMotion() { position.x = position.y = position.rotation = 0; velocity.x = velocity.y = velocity.rotation = 0; }
function advanceStack() {
  resetVisual(motionCard); active = (active + 1) % cards.length; tossed = Math.min(999, tossed + 1);
  motion = 'idle'; motionCard = null; lastFrame = 0; zeroMotion(); updateStack(true);
  status.textContent = 'Sheet tossed — sheet ' + (active + 1) + ' ready';
}
function startReturn() {
  if (reduced) { resetVisual(motionCard); motion = 'idle'; motionCard = null; zeroMotion(); status.textContent = 'Sheet returned to stack'; return; }
  motion = 'return'; lastFrame = 0; requestAnimationFrame(stepMotion);
}
function startToss() {
  if (reduced) { advanceStack(); return; }
  motion = 'toss'; motionCard.classList.add('is-tossing');
  if (Math.abs(velocity.x) < .35) velocity.x = (position.x < 0 ? -1 : 1) * .9;
  velocity.rotation = velocity.x * .028; lastFrame = 0; requestAnimationFrame(stepMotion);
}
function stepMotion(time) {
  if (motion === 'idle' || !motionCard) return;
  const delta = lastFrame ? clamp(time - lastFrame, 8, 32) : 16.667; lastFrame = time;
  if (motion === 'toss') {
    const drag = Math.pow(DRAG, delta / 16.667);
    velocity.x *= drag; velocity.y = velocity.y * drag + GRAVITY * delta; velocity.rotation *= drag;
    position.x += velocity.x * delta; position.y += velocity.y * delta; position.rotation += velocity.rotation * delta;
    render(motionCard);
    const bounds = desk.getBoundingClientRect();
    if (Math.abs(position.x) > bounds.width * .65 + 220 || position.y > bounds.height + 260 || position.y < -bounds.height - 260) { advanceStack(); return; }
  } else {
    velocity.x += -position.x * SPRING * delta; velocity.y += -position.y * SPRING * delta; velocity.rotation += -position.rotation * SPRING * 1.3 * delta;
    const damping = Math.pow(SPRING_DAMPING, delta / 16.667);
    velocity.x *= damping; velocity.y *= damping; velocity.rotation *= damping;
    position.x += velocity.x * delta; position.y += velocity.y * delta; position.rotation += velocity.rotation * delta;
    render(motionCard);
    if (Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.rotation) < .18 && Math.abs(velocity.x) + Math.abs(velocity.y) < .015) {
      resetVisual(motionCard); motion = 'idle'; motionCard = null; lastFrame = 0; zeroMotion(); status.textContent = 'Sheet returned to stack'; return;
    }
  }
  requestAnimationFrame(stepMotion);
}
function beginDrag(card, event) {
  if (motion !== 'idle' || card !== topCard()) return;
  event.preventDefault(); dragging = true; pointerId = event.pointerId; motionCard = card; zeroMotion();
  startX = lastX = event.clientX; startY = lastY = event.clientY; lastTime = event.timeStamp;
  card.classList.add('is-dragging'); card.focus();
  if (deck.setPointerCapture) deck.setPointerCapture(pointerId);
  status.textContent = 'Peeling sheet ' + (active + 1);
}
function moveDrag(event) {
  if (!dragging || event.pointerId !== pointerId) return;
  const elapsed = clamp(event.timeStamp - lastTime, 4, 64);
  const sampleX = (event.clientX - lastX) / elapsed, sampleY = (event.clientY - lastY) / elapsed;
  velocity.x = velocity.x * .35 + sampleX * .65; velocity.y = velocity.y * .35 + sampleY * .65;
  position.x = event.clientX - startX; position.y = event.clientY - startY; position.rotation = clamp(position.x * .055, -12, 12);
  lastX = event.clientX; lastY = event.clientY; lastTime = event.timeStamp; render(motionCard);
}
function endDrag(event, cancelled) {
  if (!dragging || (event.pointerId !== undefined && event.pointerId !== pointerId)) return;
  dragging = false; motionCard.classList.remove('is-dragging');
  if (deck.hasPointerCapture && deck.hasPointerCapture(pointerId)) deck.releasePointerCapture(pointerId);
  pointerId = null;
  const distance = Math.hypot(position.x, position.y), speed = Math.hypot(velocity.x, velocity.y);
  if (!cancelled && (distance >= THROW_DISTANCE || speed >= THROW_SPEED)) { status.textContent = 'Release accepted — sheet in flight'; startToss(); }
  else { status.textContent = cancelled ? 'Gesture cancelled — returning sheet' : 'Below toss threshold — returning sheet'; startReturn(); }
}
function tossSheet(direction) {
  if (motion !== 'idle' || dragging) return;
  motionCard = topCard(); zeroMotion(); position.x = direction * 22; position.rotation = direction * 4;
  velocity.x = direction * 1.1; velocity.y = -.25; status.textContent = direction < 0 ? 'Keyboard toss left' : 'Keyboard toss right'; startToss();
}
function resetStack() {
  dragging = false; pointerId = null; motion = 'idle'; motionCard = null; lastFrame = 0; active = 0; tossed = 0; zeroMotion(); updateStack(true); status.textContent = 'Stack reset — sheet 1 ready';
}
cards.forEach(function (card) {
  card.addEventListener('pointerdown', function (event) { beginDrag(card,event); });
  card.addEventListener('keydown', function (event) {
    if (card !== topCard()) return;
    const accepted = ['Enter',' ','ArrowLeft','ArrowRight','Escape']; if (accepted.indexOf(event.key) === -1) return;
    event.preventDefault();
    if (event.key === 'Escape') resetStack(); else tossSheet(event.key === 'ArrowLeft' ? -1 : 1);
  });
});
deck.addEventListener('pointermove', moveDrag);
deck.addEventListener('pointerup', function (event) { endDrag(event,false); });
deck.addEventListener('pointercancel', function (event) { endDrag(event,true); });
deck.addEventListener('lostpointercapture', function (event) { endDrag(event,true); });
leftButton.addEventListener('click', function () { tossSheet(-1); });
rightButton.addEventListener('click', function () { tossSheet(1); });
resetButton.addEventListener('click', resetStack);
updateStack(false);`,
  prompt: `
Build a self-contained three-sheet paper stack whose top sheet can be peeled, sprung back, or physically tossed. Capture pointerId on top-sheet pointerdown, sample matching pointermove velocity in px/ms with elapsed time clamped to 4–64ms, and filter each axis as previous*0.35+sample*0.65. Position follows displacement from drag origin, rotation clamps displacementX*0.055 to ±12 degrees, and a corner-peel variable is clamp(hypot(x,y)/160,0,1).

On release, toss when displacement is at least 120px or speed is at least 0.75px/ms. Otherwise return using a real damped spring: force coefficient 0.00009, per-frame damping 0.78, and delta clamped to 8–32ms. A toss integrates px/ms velocity with 0.992 frame-relative drag, 0.0014px/ms² gravity, and angular velocity derived as vx*0.028. Keep animating until the sheet crosses measured stage bounds, then recycle it behind the other two cards, promote the next sheet, increment a counter capped at 999, reset transforms, and transfer focus.

Pointercancel and lostpointercapture must never toss; they use the spring return. Ignore mismatched pointer IDs and new drags during motion. Provide semantic Toss Left, Toss Right, and Reset buttons. The focusable top sheet acts as a button: Left/Right toss directionally, Enter/Space toss right, and Escape resets. Only the top sheet is tabbable and its label identifies its current stack position.

Render distinct textured paper sheets with staggered edges, fibers, printed editorial content, layered shadows, and a curl that grows with peel distance. Keep the root and desk dark on #0a0a0b, use one muted paper stock no lighter than #d7d2c4 for all three sheets, keep micro-labels uppercase in Roboto Mono with JetBrains Mono fallback, and use grayscale plus #fa7319 only for the current sheet, focus, and printed index marks. Under prefers-reduced-motion, preserve drag tracking and the same toss threshold decision, but advance a tossed sheet or restore a short drag immediately instead of animating physics. Preserve pointer capture, velocity filtering, cancellation, spring/toss distinction, recycling, keyboard and button alternatives, focus order, live status, and exact counter state.`
});
