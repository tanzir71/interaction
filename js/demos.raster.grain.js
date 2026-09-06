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
  css: `.d-grain{height:320px;width:100%;min-height:0;box-sizing:border-box;position:relative;overflow:hidden;background:#eceee7;color:#68745d;font:400 11px "Inter",system-ui,sans-serif;padding:0;display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;align-content:flex-end;padding-bottom:10px}.d-grain::before,.d-grain::after{display:none}.d-grain>span,.d-grain>[class$="-meter"],.d-grain>[class$="-channels"],.d-grain>[class$="-vector"],.d-grain>[class$="-order"],.d-grain>[class$="-phosphor"],.d-grain>[class$="-fields"],.d-grain>[class$="-matrix"],.d-grain>[class$="-sample"]{display:none}.d-grain [class$="-status"]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.d-grain [class$="-stage"]{position:absolute;inset:0 0 48px;min-height:0;width:100%;height:auto;overflow:hidden;background:#ccd3c4;isolation:isolate}.d-grain canvas{display:block;width:100%;height:100%;object-fit:cover}.d-grain [class$="-stage"]>span,.d-grain [class$="-stage"]>[class$="-origin"],.d-grain [class$="-labels"],.d-grain [class$="-scan"]{display:none}.d-grain button{position:relative;min-height:28px;max-height:30px;border:1px solid #91a2773b;border-radius:16px;padding:5px 13px;background:transparent;color:#61754d;font:400 11px "Inter",system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;z-index:5}.d-grain button:hover{background:#dde5d3}.d-grain button[aria-pressed=true]{background:#d8e2cd;border-color:#98aa82}.d-grain button:focus-visible,.d-grain input:focus-visible{outline:2px solid #829969;outline-offset:3px}.d-grain [class$="-actions"]{display:flex;gap:8px}.d-grain:focus-visible{outline:2px solid #829969;outline-offset:-2px}.d-grain-art{position:absolute;inset:0;background:url('{{asset:limestone-pavilion}}') center/cover}.d-grain-art>*{display:none}.d-grain-canvas{position:absolute;inset:0;pointer-events:none}.d-grain-control{position:relative;display:flex;gap:7px;align-items:center;max-width:170px;font:400 10px "Inter",system-ui,sans-serif}.d-grain-control span{font-size:0}.d-grain-control span:after{content:'Grain';font-size:11px}.d-grain-control input{min-width:0;width:72px;height:3px;accent-color:#748760}.d-grain-control b{font-weight:400;font-variant-numeric:tabular-nums}.d-grain button{padding-inline:9px;font-size:10px}`,
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
  prompt: `Create the Reusable Film Grain interaction with a native300×320px composition. Use the supplied limestone-pavilion photograph behind the generated grain overlay. Keep a small Grain slider and Freeze control on a slim quiet row below; omit frames, frame counters and decorative legends. Preserve the existing effect algorithm, source buffers, effect-specific pointer/keyboard controls, ARIA values, cancellation and reduced-motion handling. Remove decorative instrument status/header panels; retain live announcements accessibly. Rebuild source pixels and caches when images load or dimensions change.`
});
