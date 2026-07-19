/* INTRX registry — published neumorphic control demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'neumorphic-buttons',
  title: 'Neumorphic Control Set',
  cat: 'Skeuomorph',
  rootClass: 'd-neumo',
  tags: ['soft-ui', 'buttons', 'toggle'],
  libs: [],
  desc: 'A tactile soft-UI control plate with physically consistent top-left lighting: raised controls carry paired exterior highlights and shadows, while momentary and latched states invert the same pair into the surface.',
  seen: 'Seen on: hardware-control concepts, audio tools, ambient dashboards, and physical-interface experiments',
  hint: 'press the actuator, latch focus, then reset the panel',
  html: `
<div class="d-neumo" tabindex="0" aria-label="Neumorphic control set. Use the controls, or press A to actuate, T to toggle focus, and Escape to reset.">
  <div class="d-neumo-head">
    <span>SOFT CONTROL / 01</span>
    <span class="d-neumo-light"><i></i> LIGHT NW 42°</span>
  </div>
  <div class="d-neumo-panel">
    <div class="d-neumo-display" aria-hidden="true">
      <span>ACTUATIONS</span>
      <strong>000</strong>
      <i>READY</i>
    </div>
    <div class="d-neumo-controls">
      <div class="d-neumo-unit">
        <button class="d-neumo-actuator" type="button" aria-describedby="d-neumo-actuator-label">
          <span aria-hidden="true"><i></i></span>
          <b>ACTUATE</b>
        </button>
        <small id="d-neumo-actuator-label">momentary</small>
      </div>
      <div class="d-neumo-unit">
        <button class="d-neumo-toggle" type="button" aria-pressed="false" aria-describedby="d-neumo-toggle-label">
          <span aria-hidden="true"><i></i></span>
          <b>FOCUS</b>
        </button>
        <small id="d-neumo-toggle-label">latching</small>
      </div>
      <div class="d-neumo-unit">
        <button class="d-neumo-reset" type="button" aria-describedby="d-neumo-reset-label">
          <span aria-hidden="true">↺</span>
          <b>RESET</b>
        </button>
        <small id="d-neumo-reset-label">utility</small>
      </div>
    </div>
  </div>
  <p class="d-neumo-status" aria-live="polite">Panel ready — surfaces raised</p>
</div>`,
  css: `
.d-neumo {
  --surface: #dce1e8; --ink: #4b5360; --muted: #858e9c; --accent: #df5d49;
  --light: rgba(255,255,255,.88); --shade: rgba(118,130,146,.46);
  width: 100%; min-height: 430px; box-sizing: border-box; position: relative; overflow: hidden;
  padding: 24px clamp(18px, 5vw, 48px) 20px; color: var(--ink); background: var(--surface);
  font-family:Roboto Mono,JetBrains Mono,monospace; outline: none;
}
.d-neumo::after {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .25;
  background: radial-gradient(circle at 18% 12%, rgba(255,255,255,.8), transparent 36%), linear-gradient(135deg, transparent, rgba(111,123,139,.08));
}
.d-neumo:focus-visible { box-shadow: inset 0 0 0 2px #687382, inset 0 0 0 5px var(--surface); }
.d-neumo-head {
  position: relative; z-index: 2; display: flex; justify-content: space-between; gap: 16px;
  color: var(--muted); font: 650 9px/1.2 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .15em;
}
.d-neumo-light { display: inline-flex; align-items: center; gap: 7px; }
.d-neumo-light i { width: 7px; height: 7px; border-radius: 50%; background: #fff; box-shadow: 1px 1px 3px rgba(93,104,120,.45); }
.d-neumo-panel {
  position: relative; z-index: 2; width: min(660px, 100%); min-height: 300px; margin: 22px auto 0; padding: 26px clamp(18px, 4vw, 34px);
  box-sizing: border-box; border: 1px solid rgba(255,255,255,.5); border-radius: 28px; background: var(--surface);
  box-shadow: -14px -14px 30px var(--light), 14px 14px 30px var(--shade);
}
.d-neumo-display {
  height: 66px; padding: 0 22px; border-radius: 15px; display: grid; grid-template-columns: 1fr auto; grid-template-rows: 1fr 1fr;
  align-items: center; color: #68717e; background: #d5dae1;
  box-shadow: inset 6px 6px 13px rgba(118,130,146,.42), inset -6px -6px 13px rgba(255,255,255,.78);
  font: 650 9px/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .12em;
}
.d-neumo-display span { align-self: end; color: #8b94a1; }
.d-neumo-display strong { grid-row: 1 / 3; grid-column: 2; color: #555e6b; font-size: 25px; letter-spacing: .06em; }
.d-neumo-display i { align-self: start; margin-top: 6px; color: var(--accent); font-style: normal; }
.d-neumo-controls { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(18px, 5vw, 46px); margin-top: 34px; }
.d-neumo-unit { display: grid; justify-items: center; gap: 13px; }
.d-neumo-unit small { color: #929aa6; font: 600 8px/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .13em; text-transform: uppercase; }
.d-neumo button {
  -webkit-tap-highlight-color: transparent; border: 0; color: var(--ink); background: var(--surface); cursor: pointer;
  transition: box-shadow .14s ease, transform .14s ease, color .14s ease; touch-action: manipulation;
}
.d-neumo button:focus-visible { outline: 2px solid #687382; outline-offset: 5px; }
.d-neumo-actuator, .d-neumo-toggle {
  width: 92px; height: 92px; border-radius: 50%; display: grid; place-items: center; align-content: center; gap: 8px;
  box-shadow: -9px -9px 18px var(--light), 9px 9px 18px var(--shade);
}
.d-neumo-actuator > span, .d-neumo-toggle > span { width: 25px; height: 25px; border-radius: 50%; display: grid; place-items: center; }
.d-neumo-actuator > span { border: 2px solid #77808d; }
.d-neumo-actuator > span i { width: 2px; height: 10px; background: #77808d; border-radius: 2px; transform: translateY(-5px); box-shadow: 0 5px 0 -0.2px var(--surface); }
.d-neumo-toggle > span { border: 2px solid #858e9b; }
.d-neumo-toggle > span i { width: 7px; height: 7px; border-radius: 50%; background: #929ba8; box-shadow: 0 0 0 3px rgba(133,142,155,.12); }
.d-neumo button b { font: 700 8px/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .08em; }
.d-neumo-actuator.is-pressed, .d-neumo-actuator:active, .d-neumo-toggle[aria-pressed="true"] {
  transform: translateY(1px); color: #515966;
  box-shadow: inset 6px 6px 12px rgba(118,130,146,.46), inset -6px -6px 12px rgba(255,255,255,.86);
}
.d-neumo-actuator.is-pulse > span { color: var(--accent); border-color: var(--accent); }
.d-neumo-toggle[aria-pressed="true"] > span { border-color: var(--accent); }
.d-neumo-toggle[aria-pressed="true"] > span i { background: var(--accent); box-shadow: 0 0 0 4px rgba(223,93,73,.15), 0 0 9px rgba(223,93,73,.38); }
.d-neumo-reset {
  width: 76px; height: 76px; margin-top: 8px; border-radius: 19px; display: grid; place-items: center; align-content: center; gap: 7px;
  box-shadow: -7px -7px 15px var(--light), 7px 7px 15px var(--shade);
}
.d-neumo-reset > span { font-size: 19px; color: #747d8a; }
.d-neumo-reset:active { transform: translateY(1px); box-shadow: inset 5px 5px 10px rgba(118,130,146,.44), inset -5px -5px 10px rgba(255,255,255,.84); }
.d-neumo-status {
  position: relative; z-index: 2; margin: 18px 0 0; color: var(--muted); text-align: center;
  font: 600 9px/1.3 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .07em;
}
@media (max-width: 520px) {
  .d-neumo { min-height: 465px; }
  .d-neumo-panel { padding-inline: 14px; }
  .d-neumo-controls { gap: 9px; }
  .d-neumo-actuator, .d-neumo-toggle { width: 78px; height: 78px; }
  .d-neumo-reset { width: 68px; height: 68px; margin-top: 5px; }
}
@media (prefers-reduced-motion: reduce) {
  .d-neumo button { transition: none; }
}`,
  js: `
const actuator = root.querySelector('.d-neumo-actuator');
const toggle = root.querySelector('.d-neumo-toggle');
const reset = root.querySelector('.d-neumo-reset');
const count = root.querySelector('.d-neumo-display strong');
const mode = root.querySelector('.d-neumo-display i');
const status = root.querySelector('.d-neumo-status');
let actuations = 0, latched = false, pulseTimer = 0;

function showCount() { count.textContent = String(actuations).padStart(3, '0'); }
function releaseActuator() { actuator.classList.remove('is-pressed'); }
function pressActuator(event) {
  actuator.classList.add('is-pressed');
  if (event && event.pointerId !== undefined && actuator.setPointerCapture) actuator.setPointerCapture(event.pointerId);
  status.textContent = 'Momentary actuator depressed';
}
function actuate() {
  actuations = Math.min(999, actuations + 1); showCount();
  actuator.classList.add('is-pulse'); clearTimeout(pulseTimer);
  pulseTimer = setTimeout(function () { actuator.classList.remove('is-pulse'); }, 180);
  mode.textContent = latched ? 'FOCUS / PULSE' : 'PULSE';
  status.textContent = 'Actuation ' + String(actuations).padStart(3, '0') + ' registered';
}
function setLatched(next) {
  latched = next; toggle.setAttribute('aria-pressed', String(latched));
  mode.textContent = latched ? 'FOCUS ON' : 'READY';
  status.textContent = latched ? 'Focus latched — surface inset' : 'Focus released — surface raised';
}
function resetPanel() {
  clearTimeout(pulseTimer); actuations = 0; releaseActuator(); actuator.classList.remove('is-pulse');
  setLatched(false); showCount(); mode.textContent = 'READY'; status.textContent = 'Panel reset — surfaces raised';
}

actuator.addEventListener('pointerdown', pressActuator);
actuator.addEventListener('pointerup', releaseActuator);
actuator.addEventListener('pointercancel', releaseActuator);
actuator.addEventListener('lostpointercapture', releaseActuator);
actuator.addEventListener('click', actuate);
toggle.addEventListener('click', function () { setLatched(!latched); });
reset.addEventListener('click', resetPanel);
root.addEventListener('keydown', function (event) {
  if (event.target === actuator || event.target === toggle || event.target === reset) return;
  const accepted = ['a', 'A', 't', 'T', 'Escape'];
  if (accepted.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === 'a' || event.key === 'A') { pressActuator(); actuate(); releaseActuator(); }
  else if (event.key === 't' || event.key === 'T') setLatched(!latched);
  else resetPanel();
});`,
  prompt: `
Build a self-contained neumorphic control plate using one cool-gray surface color and a physically consistent top-left light source. Every raised control must use exactly two exterior shadows: a negative-x/negative-y white highlight and a positive-x/positive-y blue-gray shadow. Every depressed state must replace those with the corresponding inset pair: positive-offset dark occlusion and negative-offset white reflection. Never combine exterior and inset elevation shadows on the same state.

Include three genuinely semantic button behaviors. The circular momentary actuator gains an is-pressed class on pointerdown, captures the pointer when supported, and releases on pointerup, pointercancel, or lostpointercapture. Its click increments a zero-padded counter capped at 999 and briefly colors its power glyph. The circular Focus control is a persistent toggle whose aria-pressed value is the state authority; when latched it uses the inset shadow pair and illuminates a small indicator. A smaller Reset utility restores count zero, releases the toggle, removes transient classes, and reports the reset.

Add a recessed status display using the same correct inset shadow direction, a visible NW light-source legend, concise labels for momentary/latching/utility behavior, a polite live status, and strong focus-visible outlines. The parent is keyboard focusable: A actuates, T toggles Focus, and Escape resets, but these shortcuts must not intercept events originating from any of the three buttons. Native button activation must continue to work.

Keep the panel responsive without shrinking touch controls below practical sizes. Use restrained 140ms shadow/transform transitions and disable those transitions under prefers-reduced-motion while preserving all state changes, aria semantics, pointer cancellation, counter behavior, keyboard access, and the exact raised-versus-inset dual-shadow model.`
});
