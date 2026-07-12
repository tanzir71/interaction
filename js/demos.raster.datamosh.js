/* INTRX registry — published macroblock datamosh only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'glitch-datamosh-blocks',
  title: 'Macroblock Motion Smear',
  cat: 'Raster & Glitch',
  rootClass: 'd-mosh',
  tags: ['canvas', 'feedback', 'macroblocks'],
  libs: [],
  desc: 'An animated source feeds a persistent frame buffer while deterministic 8px macroblocks are copied from a scratch snapshot along three fading motion trails. The resulting corruption behaves like broken inter-frame prediction.',
  seen: 'Seen on: music-video campaigns, motion studios, digital-fashion and experimental film sites',
  hint: 'hover to corrupt motion, move the focus, or inject a frame',
  html: `
<div class="d-mosh" tabindex="0" aria-label="Interactive macroblock datamosh. Hover or press Space to corrupt, arrow keys move the focus, Home centers it, and Escape restores the frame.">
  <span class="d-mosh-kicker">P-FRAME / MOTION VECTOR</span>
  <div class="d-mosh-stage">
    <canvas class="d-mosh-canvas" role="img" aria-label="An animated poster corrupted by copied and motion-smeared macroblocks"></canvas>
    <div class="d-mosh-focus" aria-hidden="true"><i></i></div>
    <span class="d-mosh-code" aria-hidden="true">MV 08×08</span>
  </div>
  <div class="d-mosh-meter" aria-hidden="true"><span>BLOCKS</span><strong>00</strong></div>
  <div class="d-mosh-vector" aria-hidden="true"><i></i><span>3 TRAILS</span></div>
  <button class="d-mosh-inject" type="button" aria-pressed="false">Corrupt frame</button>
  <p class="d-mosh-status" aria-live="polite">Reference frame stable</p>
</div>`,
  css: `
.d-mosh { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #101015; color: #d9ff63; touch-action: none; }
.d-mosh:focus-visible { box-shadow: inset 0 0 0 2px #d9ff63; }
.d-mosh::before { content: ''; position: absolute; inset: 0; opacity: .18; pointer-events: none;
  background-image: linear-gradient(rgba(217,255,99,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(217,255,99,.14) 1px, transparent 1px); background-size: 24px 24px; }
.d-mosh-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(217,255,99,.4); background: #07070a; box-shadow: 9px 9px 0 rgba(217,255,99,.09); }
.d-mosh-canvas { display: block; width: 100%; height: 100%; }
.d-mosh-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .13;
  background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.13) 3px 4px); mix-blend-mode: screen; }
.d-mosh-focus { position: absolute; left: 0; top: 0; width: 88px; height: 88px; margin: -44px 0 0 -44px;
  border: 1px solid rgba(255,91,92,.76); color: #ff5b5c; pointer-events: none; opacity: .32; will-change: transform, opacity; }
.d-mosh-focus::before, .d-mosh-focus::after { content: ''; position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.d-mosh-focus::before { width: 15px; height: 1px; }.d-mosh-focus::after { width: 1px; height: 15px; }
.d-mosh-focus i { position: absolute; inset: 8px; border: 1px dashed rgba(255,91,92,.48); }
.d-mosh.d-mosh-active .d-mosh-focus { opacity: 1; }
.d-mosh-code { position: absolute; right: 8px; bottom: 7px; color: rgba(255,255,255,.72); font: 7px "JetBrains Mono", monospace; letter-spacing: .09em; mix-blend-mode: difference; }
.d-mosh-kicker { position: absolute; left: 17px; top: 18px; color: rgba(217,255,99,.55); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-mosh-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 5px;
  color: rgba(217,255,99,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-mosh-meter strong { min-width: 25px; color: #d9ff63; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-mosh-vector { position: absolute; left: 17px; top: 43px; display: flex; align-items: center; gap: 8px; color: rgba(217,255,99,.48); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-mosh-vector i { position: relative; width: 36px; height: 1px; background: #d9ff63; }
.d-mosh-vector i::after { content: ''; position: absolute; right: 0; top: -3px; width: 6px; height: 6px; border-top: 1px solid #d9ff63; border-right: 1px solid #d9ff63; transform: rotate(45deg); }
.d-mosh-inject { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(217,255,99,.38);
  border-radius: 999px; background: rgba(16,16,21,.84); color: #d9ff63; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-mosh-inject:hover, .d-mosh-inject[aria-pressed="true"] { background: #d9ff63; color: #101015; transform: translateY(-2px); }
.d-mosh-inject:focus-visible { outline: 2px solid #ff5b5c; outline-offset: 3px; }
.d-mosh-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(217,255,99,.5); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-mosh-stage { width: 75%; height: 190px; }.d-mosh-vector { display: none; } }
@media (prefers-reduced-motion: reduce) { .d-mosh-focus { will-change: auto; }.d-mosh-inject { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-mosh-canvas');
const stageEl = root.querySelector('.d-mosh-stage');
const focusMark = root.querySelector('.d-mosh-focus');
const meter = root.querySelector('.d-mosh-meter strong');
const injectButton = root.querySelector('.d-mosh-inject');
const status = root.querySelector('.d-mosh-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas'), workingCanvas = document.createElement('canvas'), scratchCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d'), working = workingCanvas.getContext('2d'), scratch = scratchCanvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const BLOCK = 8;
let width = 1, height = 1, dpr = 1, focus = { x: .5, y: .5 };
let burstActive = false, staticPinned = false, burstId = 0, corruptionStep = 0, burstStart = 0, lastCorrupt = 0;
let clock = 0, nextAuto = 2900, dirty = true, lastDraw = 0;

function drawSource(time) {
  const gradient = source.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#182354'); gradient.addColorStop(.48, '#6d2c8f'); gradient.addColorStop(1, '#ee713f');
  source.fillStyle = gradient; source.fillRect(0, 0, width, height);
  const drift = reduced ? 0 : Math.sin(time * .0014) * width * .055;
  source.fillStyle = '#d9ff63'; source.beginPath(); source.arc(width * .72 + drift, height * .32, height * .23, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#101015'; source.beginPath(); source.arc(width * .72 + drift, height * .32, height * .1, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(7,7,10,.68)'; source.fillRect(0, height * .68, width, height * .32);
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(height * .31) + 'px Inter, sans-serif'; source.textBaseline = 'bottom';
  source.fillText('MOTION', width * .04 + drift * .35, height * .95);
  source.strokeStyle = 'rgba(255,255,255,.34)'; source.lineWidth = 1;
  for (let y = 14; y < height; y += 18) { source.beginPath(); source.moveTo(0, y); source.lineTo(width, y + drift * .08); source.stroke(); }
}
function seedWorking() {
  drawSource(clock); working.globalAlpha = 1; working.globalCompositeOperation = 'source-over'; working.clearRect(0, 0, width, height); working.drawImage(sourceCanvas, 0, 0, width, height);
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(BLOCK, Math.round(box.width)); height = Math.max(BLOCK, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = workingCanvas.width = scratchCanvas.width = width; sourceCanvas.height = workingCanvas.height = scratchCanvas.height = height;
  context.setTransform(dpr, 0, 0, dpr, 0, 0); seedWorking(); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function randomFactory(seed) {
  let value = seed >>> 0;
  return function () { value ^= value << 13; value ^= value >>> 17; value ^= value << 5; return (value >>> 0) / 4294967296; };
}
function generateBlocks() {
  const random = randomFactory(0x85ebca6b ^ burstId * 2246822519 ^ corruptionStep * 3266489917), blocks = [];
  const columns = Math.max(1, Math.floor(width / BLOCK)), rows = Math.max(1, Math.floor(height / BLOCK));
  for (let i = 0; i < 12; i++) {
    const nearFocus = i < 7;
    const rawX = nearFocus ? focus.x * width + (random() - .5) * width * .52 : random() * width;
    const rawY = nearFocus ? focus.y * height + (random() - .5) * height * .58 : random() * height;
    const sx = Math.max(0, Math.min(columns - 1, Math.floor(rawX / BLOCK))) * BLOCK;
    const sy = Math.max(0, Math.min(rows - 1, Math.floor(rawY / BLOCK))) * BLOCK;
    const maxWide = Math.max(1, Math.floor((width - sx) / BLOCK)), maxHigh = Math.max(1, Math.floor((height - sy) / BLOCK));
    const blockWidth = Math.min(maxWide, 1 + Math.floor(random() * 6)) * BLOCK;
    const blockHeight = Math.min(maxHigh, 1 + Math.floor(random() * 5)) * BLOCK;
    let dx = (Math.floor(random() * 9) - 4) * BLOCK, dy = (Math.floor(random() * 5) - 2) * BLOCK;
    if (dx === 0 && dy === 0) dx = BLOCK;
    blocks.push({ sx: sx, sy: sy, width: blockWidth, height: blockHeight, dx: dx, dy: dy });
  }
  return blocks;
}
function corruptFrame() {
  scratch.globalAlpha = 1; scratch.globalCompositeOperation = 'source-over'; scratch.clearRect(0, 0, width, height); scratch.drawImage(workingCanvas, 0, 0, width, height);
  const blocks = generateBlocks();
  for (const block of blocks) {
    for (let trail = 3; trail >= 1; trail--) {
      const factor = trail / 3; working.globalAlpha = .16 + (3 - trail) * .13;
      working.drawImage(scratchCanvas, block.sx, block.sy, block.width, block.height,
        block.sx + block.dx * factor, block.sy + block.dy * factor, block.width, block.height);
    }
  }
  working.globalAlpha = 1; meter.textContent = String(blocks.length).padStart(2, '0'); return blocks;
}
function startBurst(message) {
  burstId++; corruptionStep = 0; burstStart = clock; lastCorrupt = clock - 72; burstActive = true; seedWorking();
  root.classList.add('d-mosh-active'); injectButton.setAttribute('aria-pressed', 'true'); status.textContent = message || 'Motion vectors corrupted';
  if (reduced) { corruptionStep++; corruptFrame(); } dirty = true;
}
function stopBurst(message) {
  burstActive = false; root.classList.remove('d-mosh-active'); injectButton.setAttribute('aria-pressed', 'false'); meter.textContent = '00';
  status.textContent = message || 'Reference frame stable'; seedWorking(); dirty = true;
}
function updateFocus(x, y, message) {
  focus.x = Math.max(0, Math.min(1, x)); focus.y = Math.max(0, Math.min(1, y));
  const box = stageEl.getBoundingClientRect(); focusMark.style.transform = 'translate(' + (focus.x * box.width).toFixed(2) + 'px,' + (focus.y * box.height).toFixed(2) + 'px)';
  if (message) status.textContent = message;
}
stageEl.addEventListener('pointerenter', function (event) {
  const box = stageEl.getBoundingClientRect(); updateFocus((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height); startBurst('Hover motion corruption');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); updateFocus((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, 'Motion focus tracking');
}, { passive: true });
stageEl.addEventListener('pointerleave', function () { if (reduced && !staticPinned) stopBurst(); });
injectButton.addEventListener('click', function () {
  if (reduced) { staticPinned = !staticPinned; staticPinned ? startBurst('Static macroblocks pinned') : stopBurst('Static corruption cleared'); }
  else startBurst('Manual motion corruption'); root.focus();
});
root.addEventListener('keydown', function (event) {
  if (event.target === injectButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Enter', 'Escape'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === 'Escape') { staticPinned = false; stopBurst('Reference frame restored'); return; }
  if (event.key === ' ' || event.key === 'Enter') {
    if (reduced && burstActive) { staticPinned = false; stopBurst('Static corruption cleared'); }
    else { if (reduced) staticPinned = true; startBurst('Keyboard motion corruption'); } return;
  }
  if (event.key === 'Home') updateFocus(.5, .5, 'Motion focus centered');
  else {
    const step = event.shiftKey ? .12 : .06;
    updateFocus(focus.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
      focus.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0), 'Keyboard motion focus');
  }
  startBurst('Keyboard motion corruption');
});
updateFocus(.5, .5);

function renderOutput() {
  context.clearRect(0, 0, width, height); context.drawImage(burstActive ? workingCanvas : sourceCanvas, 0, 0, width, height); dirty = false;
}
function frameLoop(time) {
  clock = time;
  if (!reduced) {
    drawSource(time);
    if (!burstActive && time >= nextAuto) { startBurst('Automatic motion corruption'); nextAuto = time + 3000 + (burstId % 3) * 430; }
    if (burstActive) {
      working.globalAlpha = .16; working.drawImage(sourceCanvas, 0, 0, width, height); working.globalAlpha = 1;
      if (time - lastCorrupt >= 70) { corruptionStep++; corruptFrame(); lastCorrupt = time; }
      if (time - burstStart >= 1050) stopBurst('Reference frame restored');
    }
    dirty = true;
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { renderOutput(); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained macroblock datamosh simulation with three CSS-resolution offscreen canvases: a freshly rendered animated source, a persistent working frame, and a scratch snapshot. Use 8px macroblock alignment. During a burst, blend each new source frame into the working buffer at low 0.16 alpha to emulate inter-frame prediction, then corrupt on a 70ms interval.

For every corruption step, copy the whole working frame into scratch first. Use a seeded xorshift generator keyed by burst ID and step—never Math.random—to create exactly twelve blocks. Align source x/y, width, height, dx, and dy to 8px; sizes span 1–6 blocks wide and 1–5 high, clipped to valid block bounds. Concentrate seven blocks around a normalized pointer/keyboard focus and place five globally. Prevent a zero motion vector.

For each block, draw the same scratch crop back into working three times along its vector at factors 1, 2/3, and 1/3, ordered far-to-near, with global alpha 0.16, 0.29, and 0.42. This repeated snapshot copying is the motion smear; do not replace it with colored rectangles or CSS transforms. Reset alpha afterward. Normal bursts last about 1050ms, trigger on hover, a semantic button, Space/Enter, keyboard focus changes, and occasional frame-clock intervals.

Pointermove stays passive. Arrow keys move focus by 0.06, Shift by 0.12, Home centers, and Escape restores the reference frame. Include focus, block count, vector telemetry, aria-pressed state, visible focus, and polite status. Rebuild all buffers on resize and render through a DPR transform capped at 2. Under prefers-reduced-motion, render exactly one deterministic corruption step with no source animation, feedback interval, or auto bursts; pointerleave clears unless pinned, and another activation restores the source.`
});
