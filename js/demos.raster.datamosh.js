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
  css: `.d-mosh{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-mosh::before,.d-mosh::after{display:none}.d-mosh>span,.d-mosh>[class$="-meter"],.d-mosh>[class$="-channels"],.d-mosh>[class$="-vector"],.d-mosh>[class$="-order"],.d-mosh>[class$="-phosphor"],.d-mosh>[class$="-fields"],.d-mosh>[class$="-matrix"],.d-mosh>[class$="-sample"]{display:none}.d-mosh [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-mosh [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-mosh canvas{display:block;width:100%;height:100%;object-fit:cover}.d-mosh [class$="-stage"]>span,.d-mosh [class$="-stage"]>[class$="-origin"],.d-mosh [class$="-labels"],.d-mosh [class$="-scan"]{display:none}.d-mosh button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-mosh button:hover{background:#dde5d3}.d-mosh button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-mosh button:focus-visible,.d-mosh input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-mosh [class$="-actions"]{display:flex;gap:8px}.d-mosh:focus-visible{outline:2px solid #829969;outline-offset:-2px}`,
  js: `const photograph=new Image();

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
  const picture=photograph; source.fillStyle='#d9ddd4'; source.fillRect(0,0,width,height);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(width/picture.naturalWidth,height/picture.naturalHeight)*1.07,pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;source.drawImage(picture,(width-pw)/2+Math.sin(time*.0007)*4,(height-ph)/2,pw,ph)}

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
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:atlantic-shore}}';`,
  prompt: `Create the Macroblock Motion Smear interaction with a native300×320px composition. Use actual supplied atlantic-shore photography as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
