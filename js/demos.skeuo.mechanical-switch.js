/* INTRX registry — published mechanical switch demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'mechanical-switch',
  title: 'Mechanical Travel Switch',
  cat: 'Skeuomorph',
  rootClass: 'd-mech',
  tags: ['switch', 'overshoot', 'webaudio'],
  libs: [],
  desc: 'A machined horizontal toggle with asymmetric overshoot travel, visible contact telemetry, and a gesture-gated Web Audio click built from a sharp contact snap layered over a short low-frequency thunk.',
  seen: 'Seen on: industrial product sites, audio interfaces, automotive configurators, and physical-control experiments',
  hint: 'throw the switch — turn sound on for the synthesized contact click',
  html: `
<div class="d-mech" tabindex="0" aria-label="Mechanical switch panel. Activate the switch, or press S to toggle, M to mute, and Escape to switch off.">
  <div class="d-mech-head">
    <span>CONTACTOR / M-92</span>
    <span><i></i> 24 VDC CONTROL</span>
  </div>
  <div class="d-mech-plate">
    <i class="d-mech-screw d-mech-screw-a" aria-hidden="true"></i>
    <i class="d-mech-screw d-mech-screw-b" aria-hidden="true"></i>
    <div class="d-mech-readout" aria-hidden="true">
      <span>STATE</span><strong>OPEN</strong>
      <span>CYCLES</span><b>000</b>
    </div>
    <div class="d-mech-assembly">
      <span class="d-mech-label d-mech-label-off" aria-hidden="true">OFF</span>
      <button class="d-mech-switch" type="button" role="switch" aria-checked="false" aria-label="Main mechanical switch, off">
        <span class="d-mech-track" aria-hidden="true">
          <i class="d-mech-contact d-mech-contact-a"></i>
          <i class="d-mech-contact d-mech-contact-b"></i>
          <b></b>
        </span>
        <span class="d-mech-thumb" aria-hidden="true"><i></i><i></i><i></i></span>
      </button>
      <span class="d-mech-label d-mech-label-on" aria-hidden="true">ON</span>
    </div>
    <div class="d-mech-circuit" aria-hidden="true">
      <span>CONTACT</span><i></i><b></b><i></i><strong>NO</strong>
    </div>
  </div>
  <div class="d-mech-foot">
    <p class="d-mech-status" aria-live="polite">Contacts open — switch ready</p>
    <button class="d-mech-mute" type="button" aria-pressed="false">Sound: on</button>
  </div>
</div>`,
  css: `
.d-mech {
  --steel: #23272a; --steel-hi: #353a3e; --ink: #e2e0d7; --muted: #858a89; --signal: #ef5b3f;
  width: 100%; min-height: 430px; position: relative; overflow: hidden; box-sizing: border-box;
  padding: 23px clamp(17px, 5vw, 46px) 20px; color: var(--ink); background: #151719; outline: none;
  font-family: Inter, system-ui, sans-serif;
}
.d-mech::before {
  content: ''; position: absolute; inset: 0; opacity: .32; pointer-events: none;
  background: repeating-linear-gradient(100deg, rgba(255,255,255,.025) 0 1px, transparent 1px 5px), radial-gradient(circle at 24% 0, #303438, transparent 48%);
}
.d-mech:focus-visible { box-shadow: inset 0 0 0 2px #8e9494, inset 0 0 0 5px #151719; }
.d-mech-head {
  position: relative; z-index: 2; display: flex; justify-content: space-between; gap: 14px; color: #747a7b;
  font: 650 9px/1.2 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .14em;
}
.d-mech-head span:last-child { display: inline-flex; align-items: center; gap: 7px; }
.d-mech-head i { width: 6px; height: 6px; border-radius: 50%; background: #ef5b3f; box-shadow: 0 0 8px rgba(239,91,63,.48); }
.d-mech-plate {
  position: relative; z-index: 2; width: min(650px, 100%); min-height: 300px; margin: 21px auto 0; box-sizing: border-box;
  padding: 28px clamp(20px, 5vw, 40px); border: 1px solid #41464a; border-radius: 7px; background: linear-gradient(145deg, #2b2f32, #1f2326 58%, #292d30);
  box-shadow: inset 1px 1px rgba(255,255,255,.08), inset -1px -1px rgba(0,0,0,.6), 0 18px 35px rgba(0,0,0,.28);
}
.d-mech-screw { position: absolute; width: 11px; height: 11px; border-radius: 50%; background: linear-gradient(145deg,#565c5e,#181b1d); box-shadow: 1px 1px 2px #0c0d0e; }
.d-mech-screw::after { content: ''; position: absolute; left: 2px; right: 2px; top: 5px; height: 1px; background: #101214; transform: rotate(-22deg); }
.d-mech-screw-a { left: 12px; top: 12px; }.d-mech-screw-b { right: 12px; bottom: 12px; }
.d-mech-readout { display: grid; grid-template-columns: 1fr auto; gap: 5px 16px; color: #757b7c; font: 600 8px/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .13em; }
.d-mech-readout strong, .d-mech-readout b { color: #c9cbc6; font-size: 11px; letter-spacing: .09em; }
.d-mech-readout strong { color: #aeb2af; }.d-mech-readout b { font-weight: 700; }
.d-mech-assembly { display: grid; grid-template-columns: 34px 184px 34px; align-items: center; justify-content: center; gap: 14px; margin-top: 31px; }
.d-mech-label { color: #777d7e; font: 700 9px/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .11em; transition: color .16s ease; }
.d-mech-label-off { text-align: right; color: #d4d5cf; }.d-mech-label-on { text-align: left; }
.d-mech:has(.d-mech-switch[aria-checked="true"]) .d-mech-label-off { color: #777d7e; }
.d-mech:has(.d-mech-switch[aria-checked="true"]) .d-mech-label-on { color: var(--signal); }
.d-mech-switch { width: 184px; height: 78px; position: relative; border: 0; padding: 0; border-radius: 39px; background: transparent; cursor: pointer; touch-action: manipulation; }
.d-mech-switch:focus-visible { outline: 2px solid #d9dbd6; outline-offset: 6px; }
.d-mech-track {
  position: absolute; inset: 0; overflow: hidden; border: 1px solid #111315; border-radius: inherit;
  background: linear-gradient(180deg, #111315, #25292c); box-shadow: inset 0 4px 9px #090a0b, inset 0 -2px 4px rgba(255,255,255,.06), 0 1px rgba(255,255,255,.09);
}
.d-mech-track > b { position: absolute; left: 18px; right: 18px; top: 36px; height: 5px; border-radius: 4px; background: #090a0b; box-shadow: 0 1px rgba(255,255,255,.06); }
.d-mech-contact { position: absolute; top: 34px; width: 9px; height: 9px; border-radius: 50%; z-index: 2; background: #b6a67d; box-shadow: inset 1px 1px #e9dab2, 0 0 0 2px #111315; }
.d-mech-contact-a { left: 28px; }.d-mech-contact-b { right: 28px; }
.d-mech-thumb {
  position: absolute; left: 5px; top: 5px; width: 68px; height: 68px; z-index: 3; border-radius: 50%; box-sizing: border-box;
  display: flex; align-items: center; justify-content: center; gap: 5px; transform: translateX(0);
  border: 1px solid #555b5e; background: radial-gradient(circle at 35% 28%, #555b5e, #2c3033 45%, #1c1f21 72%);
  box-shadow: inset 2px 2px 3px rgba(255,255,255,.14), inset -3px -3px 5px rgba(0,0,0,.45), 3px 5px 8px rgba(0,0,0,.55);
}
.d-mech-thumb i { width: 3px; height: 27px; border-radius: 3px; background: #1d2022; box-shadow: 1px 0 rgba(255,255,255,.1); }
.d-mech-switch[aria-checked="true"] .d-mech-thumb { transform: translateX(92px); }
.d-mech-switch.is-kick-on .d-mech-thumb { animation: d-mech-kick-on 420ms cubic-bezier(.2,.78,.22,1) both; }
.d-mech-switch.is-kick-off .d-mech-thumb { animation: d-mech-kick-off 420ms cubic-bezier(.2,.78,.22,1) both; }
@keyframes d-mech-kick-on {
  0% { transform: translateX(0); } 64% { transform: translateX(103px); }
  82% { transform: translateX(88px); } 100% { transform: translateX(92px); }
}
@keyframes d-mech-kick-off {
  0% { transform: translateX(92px); } 64% { transform: translateX(-11px); }
  82% { transform: translateX(5px); } 100% { transform: translateX(0); }
}
.d-mech-circuit { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 28px; color: #6e7475; font: 650 8px/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .12em; }
.d-mech-circuit i { width: 26px; height: 1px; background: #555b5c; }.d-mech-circuit b { width: 7px; height: 7px; border-radius: 50%; background: #656b6b; transition: background .16s ease, box-shadow .16s ease; }
.d-mech-circuit strong { color: #8b9191; font-weight: 700; }.d-mech-circuit.is-closed b { background: var(--signal); box-shadow: 0 0 9px rgba(239,91,63,.7); }.d-mech-circuit.is-closed strong { color: var(--signal); }
.d-mech-foot { position: relative; z-index: 2; width: min(650px,100%); margin: 15px auto 0; display: flex; justify-content: space-between; align-items: center; gap: 14px; }
.d-mech-status { margin: 0; color: #7b8181; font: 600 9px/1.3 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .06em; }
.d-mech-mute { min-height: 31px; padding: 7px 10px; border: 1px solid #3a3f42; border-radius: 3px; color: #9ca19f; background: #202326; font: 650 9px/1 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; }
.d-mech-mute:hover, .d-mech-mute:focus-visible { color: #e0e1dc; border-color: #696f71; outline: none; }.d-mech-mute[aria-pressed="true"] { color: var(--signal); }
@media (max-width: 510px) {
  .d-mech { min-height: 440px; padding-inline: 12px; }.d-mech-plate { padding-inline: 12px; }
  .d-mech-assembly { grid-template-columns: 28px 164px 28px; gap: 8px; }.d-mech-switch { width: 164px; }
  .d-mech-thumb { width: 62px; height: 62px; top: 8px; }.d-mech-switch[aria-checked="true"] .d-mech-thumb { transform: translateX(92px); }
}
@media (prefers-reduced-motion: reduce) {
  .d-mech-switch.is-kick-on .d-mech-thumb, .d-mech-switch.is-kick-off .d-mech-thumb { animation: none; }
  .d-mech-label, .d-mech-circuit b { transition: none; }
}`,
  js: `
const switchButton = root.querySelector('.d-mech-switch');
const muteButton = root.querySelector('.d-mech-mute');
const stateReadout = root.querySelector('.d-mech-readout strong');
const cycleReadout = root.querySelector('.d-mech-readout b');
const circuit = root.querySelector('.d-mech-circuit');
const status = root.querySelector('.d-mech-status');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let engaged = false, muted = false, cycles = 0, audio = null, animationTimer = 0;

function synthClick(next) {
  if (muted) return false;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) { status.textContent = 'Switch changed — Web Audio unavailable'; return false; }
  try {
    if (!audio) audio = new AudioCtor();
    if (audio.state === 'suspended') audio.resume();
    const now = audio.currentTime;
    const snap = audio.createOscillator(), snapGain = audio.createGain();
    snap.type = 'square'; snap.frequency.setValueAtTime(next ? 2200 : 1750, now);
    snap.frequency.exponentialRampToValueAtTime(520, now + .018);
    snapGain.gain.setValueAtTime(.0001, now); snapGain.gain.exponentialRampToValueAtTime(.075, now + .002);
    snapGain.gain.exponentialRampToValueAtTime(.0001, now + .032);
    snap.connect(snapGain); snapGain.connect(audio.destination); snap.start(now); snap.stop(now + .036);

    const thunk = audio.createOscillator(), thunkGain = audio.createGain();
    thunk.type = 'triangle'; thunk.frequency.setValueAtTime(next ? 125 : 105, now);
    thunk.frequency.exponentialRampToValueAtTime(68, now + .05);
    thunkGain.gain.setValueAtTime(.0001, now); thunkGain.gain.exponentialRampToValueAtTime(.048, now + .004);
    thunkGain.gain.exponentialRampToValueAtTime(.0001, now + .06);
    thunk.connect(thunkGain); thunkGain.connect(audio.destination); thunk.start(now); thunk.stop(now + .065);
    return true;
  } catch (error) {
    status.textContent = 'Switch changed — audio blocked'; return false;
  }
}
function clearKick() { switchButton.classList.remove('is-kick-on', 'is-kick-off'); }
function setSwitch(next) {
  if (engaged === next) return;
  engaged = next; cycles = Math.min(999, cycles + 1);
  switchButton.setAttribute('aria-checked', String(engaged));
  switchButton.setAttribute('aria-label', 'Main mechanical switch, ' + (engaged ? 'on' : 'off'));
  circuit.classList.toggle('is-closed', engaged); stateReadout.textContent = engaged ? 'CLOSED' : 'OPEN';
  cycleReadout.textContent = String(cycles).padStart(3, '0');
  clearTimeout(animationTimer); clearKick();
  if (!reduced) {
    void switchButton.offsetWidth;
    switchButton.classList.add(engaged ? 'is-kick-on' : 'is-kick-off');
    animationTimer = setTimeout(clearKick, 440);
  }
  status.textContent = engaged ? 'Contacts closed — load energized' : 'Contacts open — load isolated';
  synthClick(engaged);
}
function setMuted(next) {
  muted = next; muteButton.setAttribute('aria-pressed', String(muted));
  muteButton.textContent = muted ? 'Sound: muted' : 'Sound: on';
  status.textContent = muted ? 'Synthesized click muted' : 'Synthesized click enabled';
}
switchButton.addEventListener('click', function () { setSwitch(!engaged); });
muteButton.addEventListener('click', function () { setMuted(!muted); });
root.addEventListener('keydown', function (event) {
  if (event.target === switchButton || event.target === muteButton) return;
  const accepted = ['s', 'S', 'm', 'M', 'Escape'];
  if (accepted.indexOf(event.key) === -1) return;
  event.preventDefault();
  if (event.key === 's' || event.key === 'S') setSwitch(!engaged);
  else if (event.key === 'm' || event.key === 'M') setMuted(!muted);
  else setSwitch(false);
});`,
  prompt: `
Build a self-contained mechanical horizontal switch as a semantic button with role=switch and aria-checked. Its off position is translateX(0) and its on position is exactly translateX(92px). On engagement animate 0→103→88→92px at 0%,64%,82%,100%; on release animate 92→-11→5→0px at the same stops. Use a 420ms restrained overshoot curve, remove the direction class after 440ms so it can replay, and skip the kick classes under prefers-reduced-motion while still changing state instantly.

Synthesize the click lazily inside the user-triggered state change. Create AudioContext only on the first unmuted activation and resume it if suspended. Layer two short oscillators: a square contact snap beginning at 2200Hz on engagement or 1750Hz on release, ramping to 520Hz in 18ms with a 2ms attack and 32ms decay; and a triangle thunk beginning at 125Hz or 105Hz, ramping to 68Hz over 50ms with a 4ms attack and 60ms decay. Start gains at 0.0001, use exponential ramps, stop both sources after their envelopes, and catch unsupported or blocked audio without breaking switch state.

Show OPEN/CLOSED state, a zero-padded cycle counter capped at 999, an NO contact diagram that illuminates only when closed, and directional OFF/ON labels. Provide an independent semantic mute button with aria-pressed; muting must prevent sound generation and must not instantiate AudioContext. Update the switch aria-label with its state and announce changes politely.

The focusable panel supports S to toggle, M to mute, and Escape to switch off, without intercepting keys from either button. Preserve native switch activation, strong focus indicators, responsive touch dimensions, immediate reduced-motion state changes, audio muting, lazy gesture-gated audio, exact directional overshoot, cycle accounting, and accessible state semantics.`
});
