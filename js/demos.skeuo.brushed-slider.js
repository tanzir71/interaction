/* INTRX registry — published brushed-metal range demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'brushed-metal-slider',
  title: 'Brushed Metal Carriage',
  cat: 'Skeuomorph',
  rootClass: 'd-metal-slide',
  tags: ['range', 'metal', 'specular'],
  libs: [],
  desc: 'A native accessible range input is machined into a recessed steel track, with a chamfered carriage whose local specular hotspot shifts opposite its travel to preserve a fixed overhead light source.',
  seen: 'Seen on: precision product controls, audio hardware interfaces, industrial configurators, and instrument dashboards',
  hint: 'drag the carriage — its highlight moves against the fixed light',
  html: `
<div class="d-metal-slide" role="group" aria-label="Brushed metal linear carriage control">
  <div class="d-metal-slide-head">
    <span>LINEAR STAGE / LS-72</span><span><i></i> FIXED LIGHT 3200K</span>
  </div>
  <div class="d-metal-slide-plate">
    <i class="d-metal-slide-screw d-metal-slide-screw-a" aria-hidden="true"></i>
    <i class="d-metal-slide-screw d-metal-slide-screw-b" aria-hidden="true"></i>
    <div class="d-metal-slide-display" aria-hidden="true">
      <span>TRAVEL</span><strong>025.9</strong><b>MM</b>
      <i>036%</i>
    </div>
    <div class="d-metal-slide-scale" aria-hidden="true">
      <span>0</span><span>18</span><span>36</span><span>54</span><span>72</span>
    </div>
    <div class="d-metal-slide-rail">
      <div class="d-metal-slide-fill" aria-hidden="true"></div>
      <input class="d-metal-slide-input" id="d-metal-slide-input" type="range" min="0" max="100" step="1" value="36" aria-label="Carriage travel" aria-valuetext="36 percent, 25.9 millimeters">
    </div>
    <div class="d-metal-slide-tolerances" aria-hidden="true"><span>0.01 MM REPEATABILITY</span><span>HARDENED GUIDE</span></div>
  </div>
  <div class="d-metal-slide-foot">
    <p class="d-metal-slide-status" aria-live="polite">Carriage locked at 25.9 millimeters</p>
    <div>
      <button class="d-metal-slide-step" type="button" aria-pressed="false">Step: fine</button>
      <button class="d-metal-slide-reset" type="button">Center</button>
    </div>
  </div>
</div>`,
  css: `
.d-metal-slide {
  --value: .36; --spec-x: 58.96%; --steel: #c7c9c8; --ink: #25292a; --accent: #e46542;
  width: 100%; min-height: 430px; position: relative; overflow: hidden; box-sizing: border-box;
  padding: 22px clamp(16px,5vw,44px) 18px; color: var(--ink); background: #aeb1b1;
  font-family: Inter,system-ui,sans-serif;
}
.d-metal-slide::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .5;
  background: repeating-linear-gradient(93deg,rgba(255,255,255,.11) 0 1px,rgba(51,56,57,.055) 1px 2px,transparent 2px 5px),radial-gradient(circle at 30% -10%,#e5e6e5,transparent 46%);
}
.d-metal-slide-head { position: relative; z-index: 2; display: flex; justify-content: space-between; gap: 14px; color: #626768; font: 700 9px/1.2 ui-monospace,SFMono-Regular,Consolas,monospace; letter-spacing: .14em; }
.d-metal-slide-head span:last-child { display: inline-flex; align-items: center; gap: 7px; }.d-metal-slide-head i { width: 7px; height: 7px; border-radius: 50%; background: #fff8d8; box-shadow: 0 0 8px rgba(255,248,216,.8),1px 1px 2px rgba(61,64,64,.4); }
.d-metal-slide-plate {
  position: relative; z-index: 2; width: min(680px,100%); min-height: 300px; margin: 21px auto 0; padding: 31px clamp(20px,5vw,42px); box-sizing: border-box;
  border: 1px solid #d4d6d5; border-radius: 5px; background: repeating-linear-gradient(91deg,rgba(255,255,255,.075) 0 1px,rgba(70,74,74,.035) 1px 2px,transparent 2px 4px),linear-gradient(145deg,#cfd1d0,#b4b7b7 56%,#cacccb);
  box-shadow: inset 1px 1px rgba(255,255,255,.75),inset -1px -1px rgba(75,79,79,.38),0 16px 32px rgba(56,60,60,.25);
}
.d-metal-slide-screw { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: radial-gradient(circle at 35% 30%,#f0f1f0,#717676 70%); box-shadow: 1px 1px 2px rgba(41,44,44,.48); }
.d-metal-slide-screw::after { content: ''; position: absolute; left: 2px; right: 2px; top: 5px; height: 1px; background: #555a5a; transform: rotate(-28deg); }.d-metal-slide-screw-a { left: 12px; top: 12px; }.d-metal-slide-screw-b { right: 12px; bottom: 12px; }
.d-metal-slide-display { width: 154px; height: 60px; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr; align-items: end; padding: 10px 13px; box-sizing: border-box; border-radius: 4px; color: #788179; background: #253029; box-shadow: inset 2px 3px 8px #101612,0 1px rgba(255,255,255,.55); font-family: ui-monospace,SFMono-Regular,Consolas,monospace; }
.d-metal-slide-display span { grid-column: 1 / 3; align-self: start; font-size: 7px; letter-spacing: .15em; }.d-metal-slide-display strong { color: #d4efda; font-size: 22px; line-height: 1; letter-spacing: .04em; text-shadow: 0 0 8px rgba(170,235,186,.22); }.d-metal-slide-display b { padding: 0 0 2px 5px; color: #778079; font-size: 8px; }.d-metal-slide-display i { position: absolute; right: clamp(20px,5vw,42px); top: 44px; color: #666c6c; font: 700 12px/1 ui-monospace,SFMono-Regular,Consolas,monospace; font-style: normal; letter-spacing: .08em; }
.d-metal-slide-scale { display: grid; grid-template-columns: repeat(5,1fr); margin: 31px 27px 4px; color: #707575; font: 700 7px/1 ui-monospace,SFMono-Regular,Consolas,monospace; }.d-metal-slide-scale span:nth-child(n+2):nth-child(-n+4) { text-align: center; }.d-metal-slide-scale span:last-child { text-align: right; }
.d-metal-slide-rail { position: relative; height: 72px; }
.d-metal-slide-rail::before { content: ''; position: absolute; left: 27px; right: 27px; top: 30px; height: 12px; border: 1px solid #6c7171; border-radius: 2px; background: linear-gradient(180deg,#686d6d,#aeb1b0 42%,#777c7b 58%,#bfc1c0); box-shadow: inset 0 3px 5px rgba(34,37,37,.55),inset 0 -2px 3px rgba(255,255,255,.35),0 1px rgba(255,255,255,.58); }
.d-metal-slide-fill { position: absolute; left: 28px; top: 34px; z-index: 1; width: calc((100% - 56px) * var(--value)); height: 4px; border-radius: 2px; background: var(--accent); box-shadow: 0 0 5px rgba(228,101,66,.38); pointer-events: none; }
.d-metal-slide-input { -webkit-appearance: none; appearance: none; position: absolute; inset: 4px 0; z-index: 2; width: 100%; height: 64px; margin: 0; padding: 0; border: 0; background: transparent; cursor: ew-resize; touch-action: none; }
.d-metal-slide-input:focus { outline: none; }.d-metal-slide-input:focus-visible { filter: drop-shadow(0 0 2px #303536); }
.d-metal-slide-input::-webkit-slider-runnable-track { height: 12px; background: transparent; border: 0; }
.d-metal-slide-input::-moz-range-track { height: 12px; background: transparent; border: 0; }
.d-metal-slide-input::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; width: 54px; height: 64px; margin-top: -26px; border: 1px solid #6c7070; border-radius: 0;
  clip-path: polygon(10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px),0 10px);
  background: radial-gradient(circle at var(--spec-x) 20%,rgba(255,255,255,.92) 0 3%,rgba(255,255,255,.25) 10%,transparent 25%),repeating-linear-gradient(92deg,rgba(255,255,255,.13) 0 1px,rgba(48,52,52,.07) 1px 2px,transparent 2px 4px),linear-gradient(145deg,#e0e1df,#929796 52%,#c5c7c6);
  box-shadow: inset 2px 2px 3px rgba(255,255,255,.68),inset -3px -3px 5px rgba(54,58,58,.38),3px 5px 8px rgba(43,46,46,.45); cursor: grab;
}
.d-metal-slide-input::-moz-range-thumb {
  width: 54px; height: 64px; border: 1px solid #6c7070; border-radius: 0;
  clip-path: polygon(10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px),0 10px);
  background: radial-gradient(circle at var(--spec-x) 20%,rgba(255,255,255,.92) 0 3%,rgba(255,255,255,.25) 10%,transparent 25%),repeating-linear-gradient(92deg,rgba(255,255,255,.13) 0 1px,rgba(48,52,52,.07) 1px 2px,transparent 2px 4px),linear-gradient(145deg,#e0e1df,#929796 52%,#c5c7c6);
  box-shadow: inset 2px 2px 3px rgba(255,255,255,.68),inset -3px -3px 5px rgba(54,58,58,.38),3px 5px 8px rgba(43,46,46,.45); cursor: grab;
}
.d-metal-slide.is-adjusting .d-metal-slide-input::-webkit-slider-thumb { cursor: grabbing; filter: brightness(1.04); }.d-metal-slide.is-adjusting .d-metal-slide-input::-moz-range-thumb { cursor: grabbing; filter: brightness(1.04); }
.d-metal-slide-tolerances { display: flex; justify-content: space-between; gap: 14px; margin-top: 13px; color: #767b7b; font: 650 7px/1 ui-monospace,SFMono-Regular,Consolas,monospace; letter-spacing: .12em; }
.d-metal-slide-foot { position: relative; z-index: 2; width: min(680px,100%); margin: 14px auto 0; display: flex; align-items: center; justify-content: space-between; gap: 14px; }.d-metal-slide-status { margin: 0; color: #656a6a; font: 650 9px/1.3 ui-monospace,SFMono-Regular,Consolas,monospace; letter-spacing: .06em; }.d-metal-slide-foot > div { display: flex; gap: 7px; }
.d-metal-slide button { min-height: 31px; padding: 7px 11px; border: 1px solid #898e8d; border-radius: 3px; color: #555a5a; background: #b9bcbb; box-shadow: inset 1px 1px rgba(255,255,255,.5); font: 700 9px/1 ui-monospace,SFMono-Regular,Consolas,monospace; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; }.d-metal-slide button:hover,.d-metal-slide button:focus-visible { color: #222626; border-color: #555a59; outline: none; }.d-metal-slide-step[aria-pressed="true"] { color: var(--accent); border-color: #aa725f; }
@media (max-width: 520px) { .d-metal-slide { min-height: 445px; padding-inline: 11px; }.d-metal-slide-plate { padding-inline: 13px; }.d-metal-slide-display i { right: 15px; }.d-metal-slide-status { max-width: 150px; }.d-metal-slide-foot { align-items: flex-start; }.d-metal-slide-foot > div { flex-direction: column; } }
@media (prefers-reduced-motion: reduce) { .d-metal-slide-input::-webkit-slider-thumb,.d-metal-slide-input::-moz-range-thumb { transition: none; } }`,
  js: `
const slider = root.querySelector('.d-metal-slide-input');
const distanceReadout = root.querySelector('.d-metal-slide-display strong');
const percentReadout = root.querySelector('.d-metal-slide-display i');
const status = root.querySelector('.d-metal-slide-status');
const stepButton = root.querySelector('.d-metal-slide-step');
const resetButton = root.querySelector('.d-metal-slide-reset');
let coarse = false;

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function applyValue(message) {
  const value = clamp(Number(slider.value), 0, 100);
  const millimeters = value * .72;
  const specular = 82 - value * .64;
  root.style.setProperty('--value', String(value / 100));
  root.style.setProperty('--spec-x', specular.toFixed(2) + '%');
  distanceReadout.textContent = millimeters.toFixed(1).padStart(5, '0');
  percentReadout.textContent = String(Math.round(value)).padStart(3, '0') + '%';
  slider.setAttribute('aria-valuetext', Math.round(value) + ' percent, ' + millimeters.toFixed(1) + ' millimeters');
  status.textContent = message || ('Carriage moving — ' + millimeters.toFixed(1) + ' millimeters');
}
function finishAdjustment() { root.classList.remove('is-adjusting'); const value = Number(slider.value); status.textContent = 'Carriage locked at ' + (value * .72).toFixed(1) + ' millimeters'; }
function setCoarse(next) {
  coarse = next; slider.step = coarse ? '5' : '1'; stepButton.setAttribute('aria-pressed', String(coarse));
  stepButton.textContent = coarse ? 'Step: coarse' : 'Step: fine';
  if (coarse) slider.value = String(Math.round(Number(slider.value) / 5) * 5);
  applyValue(coarse ? 'Five-percent step engaged' : 'One-percent step engaged');
}
slider.addEventListener('input', function () { applyValue(); });
slider.addEventListener('change', finishAdjustment);
slider.addEventListener('pointerdown', function () { root.classList.add('is-adjusting'); });
slider.addEventListener('pointerup', finishAdjustment);
slider.addEventListener('pointercancel', finishAdjustment);
slider.addEventListener('dblclick', function () { slider.value = '50'; applyValue('Carriage centered'); });
stepButton.addEventListener('click', function () { setCoarse(!coarse); slider.focus(); });
resetButton.addEventListener('click', function () { slider.value = '50'; applyValue('Carriage centered'); slider.focus(); });
applyValue('Carriage locked at 25.9 millimeters');`,
  prompt: `
Build a self-contained brushed-metal linear carriage around a real input type=range with min 0, max 100, step 1, and a descriptive label. Keep the native input as the interaction authority so mouse, touch, pen, arrows, PageUp/PageDown, Home/End, and assistive technology work without custom drag math. Map its percent value to 0–72.0 millimeters and show both a zero-padded one-decimal millimeter readout and three-digit percentage.

Style a recessed machined guide beneath the input and a 54×64px thumb with clipped 10px chamfered corners. Layer fine directional brushed lines, bevel gradients, inset edge reflections, and an exterior carriage shadow. Model a fixed overhead light by moving the thumb's radial specular hotspot opposite travel: specularX=82-value*0.64 percent, yielding exactly 82% at zero, 50% at midpoint, and 18% at full travel. Drive track fill from value/100 and update both CSS variables on every input event.

Set aria-valuetext to “N percent, M.M millimeters.” Mark pointerdown as adjusting and clear it on pointerup, pointercancel, or change, announcing the locked physical position. Double-click and a Center button choose 50. Add a Fine/Coarse semantic toggle with aria-pressed; Fine uses step 1, Coarse uses step 5 and immediately snaps to the nearest multiple of five. Return focus to the range after either utility button.

Include a fixed-light legend, 0/18/36/54/72 scale, machining tolerances, visible range focus, responsive controls, WebKit and Firefox thumb styling, and reduced-motion-safe presentation. Preserve native range behavior, exact value-to-millimeter mapping, specular travel, chamfer geometry, input/change semantics, cancellation, fine/coarse snapping, reset, and accessible value text.`
});
