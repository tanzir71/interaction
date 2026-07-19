/* INTRX registry — published CRT demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'scanline-crt',
  title: 'Scanline CRT Receiver',
  cat: 'Raster & Glitch',
  rootClass: 'd-crtube',
  tags: ['canvas', 'crt', 'scanlines'],
  libs: [],
  desc: 'A staged tube-rendering pipeline bends an animated broadcast into two-pixel barrel strips, wraps it through occasional vertical rolls, then applies phosphor scanlines, an RGB shadow mask, roll bloom, and radial vignette.',
  seen: 'Seen on: broadcast archives, retro-future portfolios, games and audiovisual campaign sites',
  hint: 'hover to roll, tune the wobble, or change channel',
  html: `
<div class="d-crtube" tabindex="0" aria-label="Interactive CRT receiver. Hover or press Space to roll, arrows tune wobble, Home resets, C changes channel, and Escape clears the roll.">
  <span class="d-crtube-kicker">TUBE RECEIVER / 525</span>
  <div class="d-crtube-case">
    <div class="d-crtube-stage">
      <canvas class="d-crtube-canvas" role="img" aria-label="An animated broadcast with barrel distortion, scanlines, shadow mask, vignette, and vertical roll"></canvas>
      <span class="d-crtube-channel" aria-hidden="true">CH 01</span>
      <span class="d-crtube-safe" aria-hidden="true"></span>
    </div>
  </div>
  <div class="d-crtube-meter" aria-hidden="true"><span>ROLL</span><strong>000</strong><b>%</b></div>
  <div class="d-crtube-phosphor" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="d-crtube-actions">
    <button class="d-crtube-roll" type="button" aria-pressed="false">Roll signal</button>
    <button class="d-crtube-switch" type="button">Channel 02</button>
  </div>
  <p class="d-crtube-status" aria-live="polite">Channel one locked</p>
</div>`,
  css: `
.d-crtube { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #171714; color: #e5dfc8; touch-action: none; }
.d-crtube:focus-visible { box-shadow: inset 0 0 0 2px #f1c552; }
.d-crtube::before { content: ''; position: absolute; inset: 0; opacity: .2; pointer-events: none;
  background-image: radial-gradient(rgba(229,223,200,.25) .65px, transparent .65px); background-size: 7px 7px; }
.d-crtube-case { position: absolute; left: 50%; top: 50%; width: min(71%, 472px); height: 234px; transform: translate(-50%, -50%);
  padding: 7px; border-radius: 20px; background: linear-gradient(145deg, #37352e, #171713); border: 1px solid #555247;
  box-shadow: inset 0 1px rgba(255,255,255,.13), 10px 11px 0 rgba(0,0,0,.24); }
.d-crtube-stage { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 14px / 20px; background: #020304;
  box-shadow: inset 0 0 20px #000, inset 0 0 0 1px rgba(255,255,255,.12); }
.d-crtube-canvas { display: block; width: 100%; height: 100%; border-radius: inherit; }
.d-crtube-stage::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow: inset 0 0 18px rgba(0,0,0,.76), inset 0 0 2px rgba(255,255,255,.25); }
.d-crtube-channel { position: absolute; right: 9px; top: 8px; color: rgba(235,255,231,.75); text-shadow: 0 0 5px currentColor;
  font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-crtube-safe { position: absolute; inset: 9%; border: 1px dashed rgba(255,255,255,.16); border-radius: 8px; pointer-events: none; }
.d-crtube-kicker { position: absolute; left: 17px; top: 18px; color: rgba(229,223,200,.53); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-crtube-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(229,223,200,.46); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-crtube-meter strong { min-width: 34px; color: #e5dfc8; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }
.d-crtube-meter b { font-weight: 400; }
.d-crtube-phosphor { position: absolute; left: 17px; top: 43px; display: flex; gap: 3px; }
.d-crtube-phosphor i { display: block; width: 6px; height: 17px; }.d-crtube-phosphor i:nth-child(1) { background: #ee5c59; }
.d-crtube-phosphor i:nth-child(2) { background: #63e66d; }.d-crtube-phosphor i:nth-child(3) { background: #5f82ef; }
.d-crtube-actions { position: absolute; left: 17px; bottom: 17px; display: flex; gap: 7px; }
.d-crtube-actions button { padding: 8px 12px; border: 1px solid rgba(229,223,200,.34); border-radius: 999px; background: rgba(23,23,20,.84);
  color: #e5dfc8; font: 9px "JetBrains Mono", monospace; cursor: pointer; transition: background .18s, color .18s, transform .18s; }
.d-crtube-actions button:hover, .d-crtube-roll[aria-pressed="true"] { background: #e5dfc8; color: #171714; transform: translateY(-2px); }
.d-crtube-actions button:focus-visible { outline: 2px solid #f1c552; outline-offset: 3px; }
.d-crtube-status { position: absolute; right: 18px; bottom: 20px; max-width: 39%; margin: 0; text-align: right;
  color: rgba(229,223,200,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-crtube-case { width: 77%; height: 205px; }.d-crtube-phosphor { display: none; }.d-crtube-actions button { padding: 8px 9px; font-size: 8px; } }
@media (prefers-reduced-motion: reduce) { .d-crtube-actions button { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-crtube-canvas');
const stageEl = root.querySelector('.d-crtube-stage');
const channelLabel = root.querySelector('.d-crtube-channel');
const meter = root.querySelector('.d-crtube-meter strong');
const rollButton = root.querySelector('.d-crtube-roll');
const channelButton = root.querySelector('.d-crtube-switch');
const status = root.querySelector('.d-crtube-status');
const context = canvas.getContext('2d', { alpha: false });
const sourceCanvas = document.createElement('canvas'), warpedCanvas = document.createElement('canvas');
const source = sourceCanvas.getContext('2d'), warped = warpedCanvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const STRIP = 2, SCANLINE = 3, CURVATURE = .055;
let width = 1, height = 1, dpr = 1, channel = 1, pointerX = .5;
let targetWobble = 1, wobble = 1, rollActive = false, staticPinned = false, rollStart = 0, rollDuration = 920;
let clock = 0, nextRoll = 4400, dirty = true, lastDraw = 0;

function renderSource(time) {
  const first = channel === 1 ? '#113c54' : '#4a173e', middle = channel === 1 ? '#1d8a7b' : '#c04752', last = channel === 1 ? '#dcf071' : '#f0b64f';
  const gradient = source.createLinearGradient(0, 0, width, height); gradient.addColorStop(0, first); gradient.addColorStop(.55, middle); gradient.addColorStop(1, last);
  source.fillStyle = gradient; source.fillRect(0, 0, width, height);
  const drift = reduced ? 0 : Math.sin(time * .0015) * width * .045;
  source.fillStyle = channel === 1 ? '#eafce1' : '#95e7ff'; source.beginPath(); source.arc(width * .7 + drift, height * .34, height * .23, 0, Math.PI * 2); source.fill();
  source.fillStyle = '#071011'; source.beginPath(); source.arc(width * .7 + drift, height * .34, height * .1, 0, Math.PI * 2); source.fill();
  source.fillStyle = 'rgba(3,5,7,.66)'; source.fillRect(0, height * .68, width, height * .32);
  source.fillStyle = '#fff'; source.font = '800 ' + Math.round(height * .31) + 'px Roboto Mono, sans-serif'; source.textBaseline = 'bottom';
  source.fillText(channel === 1 ? 'TUBE' : 'LATE', width * .05 - drift * .3, height * .94);
  source.strokeStyle = 'rgba(255,255,255,.35)'; source.lineWidth = 1;
  for (let x = 0; x < width; x += 24) { source.beginPath(); source.moveTo(x, 0); source.lineTo(x + drift * .12, height); source.stroke(); }
}
function renderWarped(time) {
  warped.clearRect(0, 0, width, height);
  for (let y = 0; y < height; y += STRIP) {
    const normalizedY = y / Math.max(1, height - 1) * 2 - 1;
    const scale = 1 + CURVATURE * normalizedY * normalizedY;
    const destinationWidth = width * scale;
    const horizontalWobble = Math.sin(y * .075 + time * .0042) * wobble * 1.4 + Math.sin(time * .0021) * wobble * .7;
    const destinationX = (width - destinationWidth) * .5 + horizontalWobble;
    warped.drawImage(sourceCanvas, 0, y, width, Math.min(STRIP, height - y), destinationX, y, destinationWidth, Math.min(STRIP, height - y));
  }
}
function measure() {
  const box = stageEl.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
  dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  sourceCanvas.width = warpedCanvas.width = width; sourceCanvas.height = warpedCanvas.height = height;
  context.setTransform(dpr, 0, 0, dpr, 0, 0); renderSource(clock); renderWarped(clock); dirty = true;
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

function startRoll(message) {
  rollActive = true; rollStart = clock; rollButton.setAttribute('aria-pressed', 'true'); status.textContent = message || (reduced ? 'Static roll inspection' : 'Vertical sync rolling'); dirty = true;
}
function stopRoll(message) {
  rollActive = false; rollButton.setAttribute('aria-pressed', 'false'); meter.textContent = '000'; status.textContent = message || ('Channel ' + (channel === 1 ? 'one' : 'two') + ' locked'); dirty = true;
}
function setChannel(next) {
  channel = next; channelLabel.textContent = 'CH 0' + channel; channelButton.textContent = 'Channel 0' + (channel === 1 ? 2 : 1);
  status.textContent = 'Channel ' + (channel === 1 ? 'one' : 'two') + ' acquired'; renderSource(clock); renderWarped(clock); dirty = true;
}
stageEl.addEventListener('pointerenter', function (event) {
  const box = stageEl.getBoundingClientRect(); pointerX = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)); targetWobble = .35 + pointerX * 1.65; startRoll('Hover vertical sync roll');
});
stageEl.addEventListener('pointermove', function (event) {
  const box = stageEl.getBoundingClientRect(); pointerX = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)); targetWobble = .35 + pointerX * 1.65;
}, { passive: true });
stageEl.addEventListener('pointerleave', function () { targetWobble = 1; if (reduced && !staticPinned) stopRoll(); });
rollButton.addEventListener('click', function () {
  if (reduced) { staticPinned = !staticPinned; staticPinned ? startRoll('Static roll pinned') : stopRoll('Static roll cleared'); }
  else startRoll('Manual vertical sync roll'); root.focus();
});
channelButton.addEventListener('click', function () { setChannel(channel === 1 ? 2 : 1); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === rollButton || event.target === channelButton) return;
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', ' ', 'Enter', 'Escape', 'c', 'C'];
  if (keys.indexOf(event.key) === -1) return; event.preventDefault();
  if (event.key === 'c' || event.key === 'C') { setChannel(channel === 1 ? 2 : 1); return; }
  if (event.key === 'Escape') { staticPinned = false; stopRoll('Vertical sync restored'); return; }
  if (event.key === ' ' || event.key === 'Enter') {
    if (reduced && rollActive) { staticPinned = false; stopRoll('Static roll cleared'); }
    else { if (reduced) staticPinned = true; startRoll('Keyboard vertical sync roll'); } return;
  }
  if (event.key === 'Home') targetWobble = 1;
  else {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : -1;
    targetWobble = Math.max(.2, Math.min(2.2, targetWobble + direction * (event.shiftKey ? .35 : .15)));
  }
  status.textContent = 'Horizontal hold ' + targetWobble.toFixed(2); dirty = true;
});

function drawTube(rollOffset, rollProgress) {
  context.fillStyle = '#020304'; context.fillRect(0, 0, width, height);
  if (rollOffset > 0) {
    const topHeight = height - rollOffset;
    context.drawImage(warpedCanvas, 0, 0, width, topHeight, 0, rollOffset, width, topHeight);
    context.drawImage(warpedCanvas, 0, topHeight, width, rollOffset, 0, 0, width, rollOffset);
  } else context.drawImage(warpedCanvas, 0, 0, width, height);
  context.globalAlpha = .24; context.fillStyle = '#000';
  for (let y = 0; y < height; y += SCANLINE) context.fillRect(0, y, width, 1);
  context.globalAlpha = .035;
  for (let x = 0; x < width; x += 3) {
    context.fillStyle = '#ff3e3e'; context.fillRect(x, 0, 1, height); context.fillStyle = '#47ff67'; context.fillRect(x + 1, 0, 1, height); context.fillStyle = '#5578ff'; context.fillRect(x + 2, 0, 1, height);
  }
  context.globalAlpha = 1;
  if (rollOffset > 0) {
    const band = context.createLinearGradient(0, rollOffset - 22, 0, rollOffset + 22);
    band.addColorStop(0, 'rgba(255,255,255,0)'); band.addColorStop(.5, 'rgba(210,255,225,.2)'); band.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = band; context.fillRect(0, Math.max(0, rollOffset - 22), width, 44);
  }
  const vignette = context.createRadialGradient(width * .5, height * .48, Math.min(width, height) * .24, width * .5, height * .5, Math.hypot(width, height) * .57);
  vignette.addColorStop(0, 'rgba(0,0,0,0)'); vignette.addColorStop(.72, 'rgba(0,0,0,.12)'); vignette.addColorStop(1, 'rgba(0,0,0,.82)');
  context.fillStyle = vignette; context.fillRect(0, 0, width, height); context.globalAlpha = 1;
  meter.textContent = String(Math.round(rollProgress * 100)).padStart(3, '0'); dirty = false;
}
function frameLoop(time) {
  clock = time;
  if (reduced) wobble = targetWobble;
  else { wobble += (targetWobble - wobble) * .12; renderSource(time); renderWarped(time); dirty = true; }
  if (!reduced && !rollActive && time >= nextRoll) { startRoll('Automatic vertical sync roll'); nextRoll = time + 4700 + (channel * 310); }
  let progress = 0, offset = 0;
  if (rollActive) {
    progress = reduced ? .48 : Math.max(0, Math.min(1, (time - rollStart) / rollDuration)); offset = Math.max(1, Math.min(height - 1, Math.round(progress * height)));
    if (!reduced) {
      if (progress >= 1) { stopRoll(); progress = 0; offset = 0; }
      else dirty = true;
    }
  }
  if (dirty && (reduced || time - lastDraw >= 32)) { if (reduced) { renderSource(time); renderWarped(time); } drawTube(offset, progress); lastDraw = time; }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a self-contained CRT receiver as a staged canvas pipeline. Render an animated broadcast source into one CSS-resolution offscreen canvas, then create a warped buffer by copying horizontal strips exactly 2px high. For strip y calculate normalizedY=y/(height-1)*2-1, scale=1+0.055*normalizedY², destinationWidth=width*scale, and destinationX=(width-destinationWidth)/2 plus two small time/Y sine wobble terms multiplied by an eased horizontal-hold value. This must change strip geometry rather than transform the finished canvas.

For vertical roll, draw the warped buffer into the visible canvas as two wrapped source/destination crops split at an integer roll offset. Animate normal offset from top to bottom for about 920ms and trigger on hover, a semantic button, Space/Enter, and occasional requestAnimationFrame-clock intervals. Add a translucent 44px brightness gradient centered on the roll seam.

After the image pass, draw one black scanline every 3px at 0.24 alpha, repeating red/green/blue 1px shadow-mask columns at 0.035 alpha, and a radial vignette with transparent center, mild 0.72 stop, and roughly 0.82 black edge. Provide two procedural channels, a semantic channel button, channel label, roll percentage, safe-area overlay, polite status, and visible focus. Pointer X tunes wobble from 0.35–2.0 passively; arrow keys adjust 0.15 or 0.35 with Shift, Home restores 1, C changes channel, and Escape clears roll.

Resize source, warped, and output buffers and draw through a DPR transform capped at 2. Under prefers-reduced-motion, disable source drift and all automatic/timed roll progress. Hover or activation shows a stable wrapped frame at 48% offset with the same barrel strips, scanlines, RGB mask, seam bloom, and vignette; pointerleave clears unless pinned, and another activation restores the unrolled frame.`
});
