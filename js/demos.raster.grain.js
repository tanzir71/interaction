/* INTRX registry — published reusable grain overlay only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'noise-grain-overlay',
  title: 'Reusable Film Grain',
  cat: 'Raster & Glitch',
  rootClass: 'd-grain',
  tags: ['canvas', 'film-grain', 'overlay'],
  libs: [],
  desc: 'A reusable half-resolution canvas overlay generates seeded, bell-shaped monochrome grain at a measured eight frames per second. Intensity, pause, resize, and explicit frame controls stay independent of the artwork beneath it.',
  seen: 'Seen on: cinematic portfolios, fashion editorials, photography archives and title sequences',
  hint: 'adjust grain intensity, freeze a frame, or press R to reseed',
  html: `
<div class="d-grain" tabindex="0" aria-label="Reusable film grain overlay. Adjust the intensity slider, press Space to freeze or resume, and R to generate a new grain frame.">
  <span class="d-grain-kicker">FILM STOCK / 8 FPS</span>
  <div class="d-grain-stage">
    <div class="d-grain-art" aria-hidden="true"><span>FIELD<br>NOTES</span><strong>35</strong><i></i><b>STUDY / LIGHT</b></div>
    <canvas class="d-grain-canvas" aria-hidden="true"></canvas>
    <span class="d-grain-frame" aria-hidden="true">FRAME 0001</span>
  </div>
  <div class="d-grain-meter" aria-hidden="true"><span>CADENCE</span><strong>08</strong><b>FPS</b></div>
  <label class="d-grain-control"><span>INTENSITY</span><input class="d-grain-range" type="range" min="0" max="100" value="48" aria-label="Film grain intensity"><b>048</b></label>
  <button class="d-grain-pause" type="button" aria-pressed="false">Freeze grain</button>
  <p class="d-grain-status" aria-live="polite">Grain overlay running</p>
</div>`,
  css: `
.d-grain { position: relative; width: 100%; height: 320px; overflow: hidden; outline: none; background: #ded8c8; color: #1a1a1c; }
.d-grain:focus-visible { box-shadow: inset 0 0 0 2px #ef5b45; }
.d-grain::before { content: ''; position: absolute; inset: 0; opacity: .18; pointer-events: none;
  background-image: linear-gradient(rgba(26,26,28,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,28,.15) 1px, transparent 1px); background-size: 28px 28px; }
.d-grain-stage { position: absolute; left: 50%; top: 50%; width: min(69%, 456px); height: 220px; transform: translate(-50%, -50%);
  overflow: hidden; border: 1px solid rgba(26,26,28,.4); background: #9faca3; box-shadow: 9px 9px 0 rgba(26,26,28,.12); }
.d-grain-art { position: absolute; inset: 0; overflow: hidden; color: #111216; background: linear-gradient(135deg, #cad9cb 0 48%, #ef715a 48% 72%, #eedf75 72%); }
.d-grain-art::before { content: ''; position: absolute; inset: 0; opacity: .32;
  background: repeating-linear-gradient(90deg, transparent 0 17px, rgba(17,18,22,.18) 17px 18px); }
.d-grain-art span { position: absolute; left: 15px; top: 14px; font: 8px/1.25 "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-grain-art strong { position: absolute; right: 9px; bottom: -15px; font: 800 82px/.9 "Inter", sans-serif; letter-spacing: -.09em; }
.d-grain-art i { position: absolute; left: 28%; top: 25%; width: 88px; height: 88px; border: 17px solid #111216; border-radius: 50%; mix-blend-mode: multiply; }
.d-grain-art b { position: absolute; left: 15px; bottom: 12px; font: 7px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-grain-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; mix-blend-mode: soft-light; image-rendering: auto; }
.d-grain-stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; box-shadow: inset 0 0 28px rgba(19,15,12,.3); }
.d-grain-frame { position: absolute; right: 8px; top: 7px; color: rgba(255,255,255,.76); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; mix-blend-mode: difference; }
.d-grain-kicker { position: absolute; left: 17px; top: 18px; color: rgba(26,26,28,.56); font: 8px "JetBrains Mono", monospace; letter-spacing: .13em; }
.d-grain-meter { position: absolute; right: 18px; top: 16px; display: flex; align-items: baseline; gap: 4px;
  color: rgba(26,26,28,.48); font: 8px "JetBrains Mono", monospace; letter-spacing: .1em; }
.d-grain-meter strong { min-width: 24px; color: #1a1a1c; font-size: 20px; font-weight: 500; letter-spacing: 0; text-align: right; }.d-grain-meter b { font-weight: 400; }
.d-grain-control { position: absolute; left: 17px; top: 43px; display: grid; grid-template-columns: auto 76px 24px; align-items: center; gap: 7px;
  color: rgba(26,26,28,.54); font: 7px "JetBrains Mono", monospace; letter-spacing: .08em; }
.d-grain-range { width: 76px; height: 2px; margin: 0; accent-color: #ef5b45; cursor: pointer; }.d-grain-range:focus-visible { outline: 2px solid #ef5b45; outline-offset: 4px; }
.d-grain-control b { color: #1a1a1c; font-weight: 500; letter-spacing: 0; }
.d-grain-pause { position: absolute; left: 17px; bottom: 17px; padding: 8px 13px; border: 1px solid rgba(26,26,28,.38);
  border-radius: 999px; background: rgba(222,216,200,.84); color: #1a1a1c; font: 10px "JetBrains Mono", monospace; cursor: pointer;
  transition: background .18s, color .18s, transform .18s; }
.d-grain-pause:hover, .d-grain-pause[aria-pressed="true"] { background: #1a1a1c; color: #f1ead9; transform: translateY(-2px); }
.d-grain-pause:focus-visible { outline: 2px solid #ef5b45; outline-offset: 3px; }
.d-grain-status { position: absolute; right: 18px; bottom: 20px; max-width: 46%; margin: 0; text-align: right;
  color: rgba(26,26,28,.52); font: 8px "JetBrains Mono", monospace; letter-spacing: .07em; text-transform: uppercase; }
@media (max-width: 620px) { .d-grain-stage { width: 75%; height: 190px; }.d-grain-control { grid-template-columns: auto 54px 24px; }.d-grain-range { width: 54px; } }
@media (prefers-reduced-motion: reduce) { .d-grain-pause { transition: none; } }
`,
  js: `
const canvas = root.querySelector('.d-grain-canvas');
const stageEl = root.querySelector('.d-grain-stage');
const frameLabel = root.querySelector('.d-grain-frame');
const intensityRange = root.querySelector('.d-grain-range');
const intensityLabel = root.querySelector('.d-grain-control b');
const pauseButton = root.querySelector('.d-grain-pause');
const status = root.querySelector('.d-grain-status');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function createFilmGrain(target, options) {
  const settings = options || {}, context = target.getContext('2d');
  const fps = settings.fps || 8, interval = 1000 / fps, seed = settings.seed || 0x6d2b79f5;
  let intensity = settings.intensity === undefined ? .48 : settings.intensity;
  let frame = 0, paused = false, image = null;
  function randomFactory(value) {
    let state = value >>> 0;
    return function () { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return (state >>> 0) / 4294967296; };
  }
  function resize(cssWidth, cssHeight) {
    target.width = Math.max(64, Math.round(cssWidth * .5)); target.height = Math.max(40, Math.round(cssHeight * .5));
    image = context.createImageData(target.width, target.height); return { width: target.width, height: target.height };
  }
  function renderFrame() {
    if (!image) return frame;
    const random = randomFactory(seed ^ frame * 2246822519), data = image.data;
    const alpha = Math.round(Math.max(0, Math.min(1, intensity)) * 150);
    for (let p = 0; p < data.length; p += 4) {
      const bell = (random() + random() + random() + random()) * .25 - .5;
      let gray = Math.max(0, Math.min(255, Math.round(128 + bell * 210)));
      const speck = random(); if (speck < .006) gray = 0; else if (speck > .994) gray = 255;
      data[p] = data[p + 1] = data[p + 2] = gray; data[p + 3] = alpha;
    }
    context.putImageData(image, 0, 0);
    const dust = randomFactory(seed ^ frame * 3266489917); context.globalAlpha = intensity * .32; context.fillStyle = '#fff';
    for (let i = 0; i < 5; i++) context.fillRect(dust() * target.width, dust() * target.height, 1 + dust() * 2, 1);
    if (frame % 9 === 0) { context.fillStyle = '#111'; context.fillRect(dust() * target.width, 0, 1, target.height); }
    context.globalAlpha = 1; frame++; return frame;
  }
  return {
    fps: fps, interval: interval, resize: resize, renderFrame: renderFrame,
    setIntensity: function (value) { intensity = Math.max(0, Math.min(1, value)); },
    getIntensity: function () { return intensity; },
    setPaused: function (value) { paused = Boolean(value); }, isPaused: function () { return paused; },
    getFrame: function () { return frame; }, getImage: function () { return image; }
  };
}

const grain = createFilmGrain(canvas, { fps: 8, intensity: .48, seed: 0x4f1bbcdc });
let lastNoise = 0;
function measure() {
  const box = stageEl.getBoundingClientRect(); grain.resize(box.width, box.height); grain.renderFrame();
  frameLabel.textContent = 'FRAME ' + String(grain.getFrame()).padStart(4, '0');
}
measure();
window.addEventListener('resize', measure, { passive: true });
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(stageEl);

if (reduced) { grain.setPaused(true); pauseButton.textContent = 'New grain frame'; status.textContent = 'Reduced motion · static grain'; }
function updateIntensity() {
  const value = Math.max(0, Math.min(100, Number(intensityRange.value) || 0)); grain.setIntensity(value / 100);
  intensityLabel.textContent = String(Math.round(value)).padStart(3, '0');
  if (grain.isPaused() || reduced) { grain.renderFrame(); frameLabel.textContent = 'FRAME ' + String(grain.getFrame()).padStart(4, '0'); }
  status.textContent = 'Grain intensity ' + Math.round(value) + ' percent';
}
intensityRange.addEventListener('input', updateIntensity);
function activateButton() {
  if (reduced) {
    grain.renderFrame(); frameLabel.textContent = 'FRAME ' + String(grain.getFrame()).padStart(4, '0'); status.textContent = 'New static grain frame'; return;
  }
  grain.setPaused(!grain.isPaused()); pauseButton.setAttribute('aria-pressed', String(grain.isPaused()));
  pauseButton.textContent = grain.isPaused() ? 'Resume grain' : 'Freeze grain'; status.textContent = grain.isPaused() ? 'Grain frame frozen' : 'Grain overlay running';
}
pauseButton.addEventListener('click', function () { activateButton(); root.focus(); });
root.addEventListener('keydown', function (event) {
  if (event.target === pauseButton || event.target === intensityRange) return;
  if (event.key !== ' ' && event.key !== 'r' && event.key !== 'R') return; event.preventDefault();
  if (event.key === ' ') activateButton();
  else { grain.renderFrame(); frameLabel.textContent = 'FRAME ' + String(grain.getFrame()).padStart(4, '0'); status.textContent = 'Grain frame reseeded'; }
});

function frameLoop(time) {
  if (!reduced && !grain.isPaused() && time - lastNoise >= grain.interval) {
    grain.renderFrame(); lastNoise = time; frameLabel.textContent = 'FRAME ' + String(grain.getFrame()).padStart(4, '0');
  }
  requestAnimationFrame(frameLoop);
}
requestAnimationFrame(frameLoop);`,
  prompt: `
Build a reusable film-grain overlay function createFilmGrain(canvas, options) that is independent of the artwork under it. Return fps, interval, resize(cssWidth,cssHeight), renderFrame(), set/getIntensity, set/isPaused, getFrame, and getImage. Default to 8fps, so interval is exactly 125ms. Resize the canvas to half CSS resolution with minimum 64×40 and reuse one ImageData until the next resize.

Generate every frame with a seeded xorshift stream keyed by frame number—never Math.random. For each pixel average four uniform samples and subtract 0.5 to create a bell-shaped value, then calculate clamp(round(128+value*210),0,255). Add rare black/white specks around 0.6% each. Set R=G=B exactly and alpha=round(clamp(intensity,0,1)*150). Put the full buffer once, then add five tiny deterministic dust dashes and an occasional one-pixel vertical scratch with intensity-scaled alpha. Use the overlay with pointer-events:none and soft-light blending.

Drive the generator from requestAnimationFrame but call renderFrame only when time-lastNoise is at least interval. Include a labeled 0–100 range input that updates intensity and redraws immediately when frozen, plus a semantic aria-pressed freeze/resume button, frame counter, cadence readout, visible focus, and polite status. Space toggles pause and R renders a new frame, without intercepting slider or button keys.

On resize, allocate a new half-resolution buffer and draw one immediate frame. Under prefers-reduced-motion, begin paused, never update from the frame loop, rename the button to New grain frame, and render exactly one explicit frame per button, R key, slider input, or resize. Preserve the same seeded distribution, reusable API, intensity, dust, scratch, and static overlay appearance.`
});
