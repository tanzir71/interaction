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
  css: `.d-crtube{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-crtube::before,.d-crtube::after{display:none}.d-crtube>span,.d-crtube>[class$="-meter"],.d-crtube>[class$="-channels"],.d-crtube>[class$="-vector"],.d-crtube>[class$="-order"],.d-crtube>[class$="-phosphor"],.d-crtube>[class$="-fields"],.d-crtube>[class$="-matrix"],.d-crtube>[class$="-sample"]{display:none}.d-crtube [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-crtube [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-crtube canvas{display:block;width:100%;height:100%;object-fit:cover}.d-crtube [class$="-stage"]>span,.d-crtube [class$="-stage"]>[class$="-origin"],.d-crtube [class$="-labels"],.d-crtube [class$="-scan"]{display:none}.d-crtube button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-crtube button:hover{background:#dde5d3}.d-crtube button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-crtube button:focus-visible,.d-crtube input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-crtube [class$="-actions"]{display:flex;gap:8px}.d-crtube:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-crtube{background:#e2e4dc}.d-crtube-case{position:absolute;inset:18px 14px 54px;border-radius:24px;background:linear-gradient(145deg,#cdd3c3,#afbba0);box-shadow:inset 0 1px #f4f8eb,0 3px 6px #64774a29;padding:11px}.d-crtube .d-crtube-stage{inset:11px;width:auto;overflow:hidden;border-radius:20px;background:#1e2a17;box-shadow:0 1px #e9f0df,inset 0 0 15px #000}.d-crtube-stage:after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,#ffffff13,transparent 35%,transparent 70%,#0f1c1122);pointer-events:none}.d-crtube .d-crtube-channel{display:block;position:absolute;right:12px;top:12px;color:#eef4e4;font:400 9px "Inter",system-ui,sans-serif;text-shadow:0 1px 2px #102210}`,
  js: `const photograph=new Image();const photographB=new Image();

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
  const picture=channel===1?photograph:photographB; source.fillStyle='#d9ddd4'; source.fillRect(0,0,width,height);
  if(picture.complete&&picture.naturalWidth){const scale=Math.max(width/picture.naturalWidth,height/picture.naturalHeight),pw=picture.naturalWidth*scale,ph=picture.naturalHeight*scale;source.drawImage(picture,(width-pw)/2,(height-ph)/2,pw,ph)}

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
requestAnimationFrame(frameLoop);
photograph.onload=()=>measure();photograph.src='{{asset:atlantic-shore}}';photographB.onload=()=>measure();photographB.src='{{asset:limestone-pavilion}}';`,
  prompt: `Create the Scanline CRT Receiver interaction with a native300×320px composition. Use actual supplied atlantic-shore photography and limestone-pavilion for the alternate state as the source image, drawing with cover cropping after image.onload. Do not use synthetic gradient posters, ring graphics or huge title overlays. Keep the image as the visual focus above a narrow quiet control row, with regular Inter11px controls, normal tracking and subtle sage borders. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
