/* INTRX registry — LAYOUT & UI */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Mac-style minimize / maximize
------------------------------------------------------------ */
INTRX.register({
  id: "mac-window",
  title: "Mac Minimize / Maximize",
  cat: "Layout & UI",
  rootClass: "d-mac",
  tags: ["flip","window"],
  libs: [],
  desc: "A window shrinks into its dock item with scale + translate + fade (macOS \"scale effect\"), and springs back on click. Computed FLIP-style from real element positions, so it works at any layout.",
  seen: "Seen on: macOS itself; web recreations on portfolio OS-themed sites",
  hint: "click the yellow dot, then the dock item",
  html: `
<div class="d-mac">
  <div class="d-mac-window">
    <div class="d-mac-titlebar">
      <span class="d-mac-dot d-mac-red"></span>
      <span class="d-mac-dot d-mac-yellow"></span>
      <span class="d-mac-dot d-mac-green"></span>
      <em>interactions.app</em>
    </div>
    <div class="d-mac-body">
      <h3>Field notes</h3><p>A place for the ideas you want to keep close.</p>
    </div>
  </div>
  <div class="d-mac-dock">
    <div class="d-mac-dockitem" data-app="finder"></div>
    <div class="d-mac-dockitem d-mac-target"></div>
    <div class="d-mac-dockitem" data-app="term"></div>
  </div>
</div>`,
  css: `
.d-mac {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.d-mac-window {
  width: 320px; height: 190px;
  background: #161619; border: 1px solid #2e2e34; border-radius: 8px;
  overflow: hidden;
  transform-origin: center center;
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}
.d-mac-window.d-mac-animating { transition: transform 0.55s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.45s ease; }
.d-mac-window.d-mac-min { pointer-events: none; }
.d-mac-titlebar {
  height: 30px; display: flex; align-items: center; gap: 6px; padding: 0 10px;
  background: #101012; border-bottom: 1px solid #232327;
}
.d-mac-titlebar em { font-style: normal; font-family: "Roboto Mono", "JetBrains Mono", monospace; font-size: 10px; color: #5c5c66; margin-left: 8px; }
.d-mac-dot { width: 11px; height: 11px; border-radius: 50%; cursor: pointer; }
.d-mac-dot.d-mac-red { background: #ff5f57; }
.d-mac-dot.d-mac-yellow { background: #febc2e; }
.d-mac-dot.d-mac-green { background: #28c840; }
.d-mac-body { padding: 20px; color: #9b9ba3; font-size: 14px; }
.d-mac-body b { color: #febc2e; }
.d-mac-dock {
  position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 10px; padding: 8px 12px;
  background: rgba(255,255,255,0.06); border: 1px solid #2e2e34; border-radius: 12px;
  backdrop-filter: blur(8px);
}
.d-mac-dockitem {
  width: 36px; height: 36px; border-radius: 8px;
  background: linear-gradient(160deg, #2e2e34, #161619);
  border: 1px solid #3a3a42;
}
.d-mac-target { position: relative; cursor: pointer; }
.d-mac-target::after {
  content: ""; position: absolute; inset: 8px;
  border: 2px solid #fa7319; border-radius: 4px;
  opacity: 0.35; transition: opacity 0.2s;
}
.d-mac-target.d-mac-occupied::after { opacity: 1; }
.d-mac-target.d-mac-occupied { box-shadow: 0 0 18px rgba(250,115,25,0.25); }
.d-mac.d-mac-idle .d-mac-dot { animation: d-mac-idle 3.6s ease-in-out infinite; }
.d-mac.d-mac-idle .d-mac-yellow { animation-delay: .18s; }
.d-mac.d-mac-idle .d-mac-green { animation-delay: .36s; }
@keyframes d-mac-idle { 0%, 18%, 100% { transform: scale(1); opacity: .72; } 9% { transform: scale(1.22); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .d-mac.d-mac-idle .d-mac-dot { animation: none; } }
.d-mac-window{width:min(290px,86%);border-radius:4px;height:178px;box-shadow:0 12px 28px #0004}.d-mac-body{font-size:12px;line-height:1.6}.d-mac-dock{border-radius:4px;padding:6px 10px}.d-mac-dockitem{width:30px;height:30px;border-radius:3px;background:#232325}.d-mac-dot.d-mac-red{background:#b46c68}.d-mac-dot.d-mac-yellow{background:#b69b59}.d-mac-dot.d-mac-green{background:#6e9976}.d-mac-body b{color:#b69b59}
/* Primary reading type; mono is reserved for values and annotations. */
.d-mac{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-mac-titlebar em{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-mac p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-mac>footer button{font-family:Roboto Mono,ui-monospace,monospace}
.d-mac-window{background:linear-gradient(180deg,#19191c,#141417);box-shadow:0 16px 36px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.025);border-color:#38383d}

/* Current control composition. */
.d-mac{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-mac *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-mac button,.d-mac input,.d-mac textarea{font-weight:400}.d-mac>header{display:none}.d-mac>[class$="-head"][aria-hidden="true"],.d-mac>[class$="-foot"][aria-hidden="true"]{display:none}.d-mac>[class$="-stage"],.d-mac>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-mac>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-mac>footer>span{display:none}.d-mac>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-mac-titlebar em{font-size:11px}.d-mac-body{padding:23px}.d-mac-body h3{font-size:23px;font-weight:400;line-height:1.15;margin:0 0 13px}.d-mac-body p{font-size:12px;line-height:1.5;margin:0}.d-mac-window{border-radius:11px;box-shadow:0 14px 28px #0003}.d-mac-dockitem{border-radius:7px}
/* Current control composition. */
.d-mac *{text-transform:none!important;letter-spacing:0!important}.d-mac button{font-size:12px!important;font-weight:400!important}.d-mac>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-mac>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-mac>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-mac>footer button{font-size:11px!important;padding:6px 8px!important}.d-mac>footer{gap:6px!important}`,
  js: `
const win = root.querySelector('.d-mac-window');
const target = root.querySelector('.d-mac-target');
const yellow = root.querySelector('.d-mac-dot.d-mac-yellow');
let minimized = false;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let idle = !reduced;

function stopIdle() {
  if (!idle) return;
  idle = false;
  root.classList.remove('d-mac-idle');
}
if (!reduced) {
  root.classList.add('d-mac-idle');
  root.addEventListener('pointerdown', stopIdle, { once: true });
  root.addEventListener('keydown', stopIdle, { once: true });
}

// FLIP: measure both boxes, transform the window into the dock item
function toDock() {
  stopIdle();
  const w = win.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  const dx = (t.left + t.width / 2) - (w.left + w.width / 2);
  const dy = (t.top + t.height / 2) - (w.top + w.height / 2);
  const s = t.width / w.width;
  win.classList.add('d-mac-animating', 'd-mac-min');
  win.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
  win.style.opacity = '0';
  target.classList.add('d-mac-occupied');
  minimized = true;
}

function fromDock() {
  stopIdle();
  win.classList.add('d-mac-animating');
  win.classList.remove('d-mac-min');
  win.style.transform = 'translate(0, 0) scale(1)';
  win.style.opacity = '1';
  target.classList.remove('d-mac-occupied');
  minimized = false;
}

yellow.addEventListener('click', function () { if (!minimized) toDock(); });
target.addEventListener('click', function () { if (minimized) fromDock(); });

// clean up the transition class when done
win.addEventListener('transitionend', function () { win.classList.remove('d-mac-animating'); });`,
  prompt: ` Use a 320px dark stage, a restrained 290 by 178px charcoal window, compact neutral dock, and muted semantic red/amber/green traffic lights.
Recreate the macOS minimize/maximize ("scale effect") window animation on the web, vanilla JS.

Requirements:
- A window element and a dock item element anywhere in the layout.
- Minimize (FLIP technique): measure both getBoundingClientRect()s; compute dx/dy between centers and scale = dockWidth / windowWidth; apply transform: translate(dx, dy) scale(s) plus opacity: 0, with transition cubic-bezier(0.32, 0.72, 0, 1) over ~0.55s — that bezier is the Apple-feel curve (fast start, long soft landing).
- Maximize: reset transform to translate(0,0) scale(1) and opacity 1 with the same curve.
- transform-origin: center; the window keeps pointer-events: none while minimized; the dock item shows an "occupied" indicator.
- Because positions are measured at click time, it must work responsively at any layout.
- Before interaction, let the semantic traffic lights breathe subtly; stop that teaser permanently on first pointer or keyboard interaction and disable it for reduced motion.
- Keep the window chrome grayscale, retaining red/amber/green only for the semantic traffic lights and the site accent for the active dock target.
- Bonus: for a genie-style bend, note that it requires rendering the window to a canvas/WebGL mesh and warping vertices — offer scale as the practical default. Final composition: Replaced the one-line yellow-dot instruction with a plausible document window and calmer window materials. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "dock-magnify",
  title: "Dock Magnification",
  cat: "Layout & UI",
  rootClass: "d-dock",
  tags: ["proximity","gaussian"],
  libs: [],
  desc: "Icons swell as the cursor nears, with neighbors partially magnified by a smooth distance falloff — the macOS dock, in ~20 lines.",
  seen: "Seen on: macOS; web versions on developer portfolios and OS-style sites",
  hint: "glide along the dock",
  html: `
<div class="d-dock">
  <div class="d-dock-bar">
    <div class="d-dock-icon" style="--h:78"></div>
    <div class="d-dock-icon" style="--h:200"></div>
    <div class="d-dock-icon" style="--h:320"></div>
    <div class="d-dock-icon" style="--h:28"></div>
    <div class="d-dock-icon" style="--h:120"></div>
    <div class="d-dock-icon" style="--h:265"></div>
    <div class="d-dock-icon" style="--h:0"></div>
  </div>
</div>`,
  css: `
.d-dock {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: flex-end; justify-content: center; padding-bottom: 36px;
}
.d-dock-bar {
  display: flex; align-items: flex-end; gap: 10px; padding: 10px 14px;
  border: 1px solid #2e2e34; border-radius: 16px;
  background: rgba(255,255,255,0.05); backdrop-filter: blur(8px);
  height: 74px;
}
.d-dock-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: linear-gradient(160deg, hsl(var(--h) 75% 55%), hsl(var(--h) 75% 25%));
  border: 1px solid rgba(255,255,255,0.15);
  transform-origin: bottom center;
  will-change: transform;
}
.d-dock{align-items:center;padding:0 12px;box-sizing:border-box}.d-dock-bar{height:66px;gap:7px;padding:10px;border-radius:4px;background:#151517;max-width:100%;box-sizing:border-box}.d-dock-icon{position:relative;width:32px;height:36px;border-radius:3px;background:#27272a;border-color:#3c3c40;display:grid;place-items:center}.d-dock-icon:after{content:'◇';color:#aaa;font:20px/1 Roboto Mono,monospace}.d-dock-icon:nth-child(2):after{content:'≡'}.d-dock-icon:nth-child(3):after{content:'⌘'}.d-dock-icon:nth-child(4):after{content:'⊞';color:#fa7319}.d-dock-icon:nth-child(5):after{content:'↗'}.d-dock-icon:nth-child(6):after{content:'◎'}.d-dock-icon:nth-child(7):after{content:'⌁'}.d-dock-bar{background:linear-gradient(180deg,#1b1b1e,#141416);border-color:#35353a;box-shadow:0 10px 20px rgba(0,0,0,.16)}.d-dock-icon{background:linear-gradient(180deg,#2b2b2f,#242427);box-shadow:inset 0 1px 0 rgba(255,255,255,.035)}

/* Current control composition. */
.d-dock{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-dock *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-dock button,.d-dock input,.d-dock textarea{font-weight:400}.d-dock>header{display:none}.d-dock>[class$="-head"][aria-hidden="true"],.d-dock>[class$="-foot"][aria-hidden="true"]{display:none}.d-dock>[class$="-stage"],.d-dock>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-dock>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-dock>footer>span{display:none}.d-dock>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-dock-bar{border-radius:16px;padding:10px;gap:7px;background:linear-gradient(180deg,#252b33cc,#1b2027df);box-shadow:inset 0 1px #fff1,0 12px 26px #0003}.d-dock-icon{border-radius:10px;box-shadow:inset 0 1px #fff2,0 3px 8px #0003}
/* Current control composition. */
.d-dock *{text-transform:none!important;letter-spacing:0!important}.d-dock button{font-size:12px!important;font-weight:400!important}.d-dock>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-dock>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-dock>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-dock>footer button{font-size:11px!important;padding:6px 8px!important}.d-dock>footer{gap:6px!important}`,
  js: `
const icons = [].slice.call(root.querySelectorAll('.d-dock-icon'));
const bar = root.querySelector('.d-dock-bar');
const RANGE = 110;   // px of influence
const MAX = 0.9;     // extra scale at the cursor

let mx = null;
bar.addEventListener('mousemove', function (e) { mx = e.clientX; });
bar.addEventListener('mouseleave', function () { mx = null; });

(function tick() {
  icons.forEach(function (icon) {
    let scale = 1;
    if (mx !== null) {
      const b = icon.getBoundingClientRect();
      const d = Math.abs(mx - (b.left + b.width / 2));
      const t = Math.max(0, 1 - d / RANGE);
      scale = 1 + MAX * (t * t * (3 - 2 * t));   // smoothstep falloff
    }
    // lerp for a fluid feel
    const cur = parseFloat(icon.dataset.s || 1);
    const next = cur + (scale - cur) * 0.25;
    icon.dataset.s = next;
    icon.style.transform = 'scale(' + next.toFixed(4) + ')';
  });
  requestAnimationFrame(tick);
})();`,
  prompt: `Use low-contrast, multi-stop material shading with a broad soft falloff and restrained edge highlights; keep functional accent sweeps distinct. Compose seven 32 by 36px grayscale icon tiles, drawn with line glyphs, inside a centered charcoal dock in a native 320px field. Highlight just one glyph orange; do not assign per-icon hues.
Recreate macOS dock magnification in vanilla JS.

Requirements:
- A horizontal row of icons with transform-origin: bottom center.
- Track the cursor x over the dock. Per icon, distance d from the icon center maps to influence t = max(0, 1 - d / 110), shaped with smoothstep (t*t*(3-2t)).
- Target scale = 1 + 0.9 * influence. In a rAF loop, lerp each icon's current scale toward its target (factor ~0.25) so motion is fluid rather than snappy.
- On mouseleave, targets return to 1 and everything settles back.
- Icons should not shift layout — scale only (gaps absorb the growth), will-change: transform.
- Disable on touch devices. Final composition: Kept the magnifying dock behavior but replaced hard tile edges with a gentle translucent tray and restrained icon surfaces. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "flip-expand",
  title: "FLIP Card Expand",
  cat: "Layout & UI",
  tags: ["flip","shared element"],
  rootClass: "d-flip",
  libs: [],
  desc: "Click a thumbnail and it grows seamlessly into a detail view using the FLIP technique — layout change first, then an inverted transform plays back. The web version of a shared-element transition.",
  seen: "Seen on: App Store cards, linear.app, Framer showcase sites",
  hint: "click a card / click again to close",
  html: `
<div class="d-flip">
  <div class="d-flip-grid">
    <div class="d-flip-card" style="--c1:#3c5a18;--c2:#0f1a08"><span>Alpha</span></div>
    <div class="d-flip-card" style="--c1:#1f3a52;--c2:#0b141f"><span>Beta</span></div>
    <div class="d-flip-card" style="--c1:#52301f;--c2:#1f0b0b"><span>Gamma</span></div>
  </div>
</div>`,
  css: `
.d-flip {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-flip-grid { display: flex; gap: 16px; }
.d-flip-card {
  width: 130px; height: 180px; cursor: pointer;
  background: linear-gradient(160deg, var(--c1), var(--c2));
  border: 1px solid #2e2e34;
  display: flex; align-items: flex-end; padding: 14px;
  color: #fff; font-weight: 600;
  transform-origin: top left;
}
.d-flip-card.d-flip-expanded {
  position: absolute; inset: 16px; width: auto; height: auto; z-index: 5;
  font-size: 28px;
}
.d-flip-card.d-flip-animating { transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1); }
.d-flip{padding:20px;box-sizing:border-box}.d-flip-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;width:100%}.d-flip-card{position:relative;width:auto;height:165px;background:#171719;font-size:11px;padding:14px;box-sizing:border-box}.d-flip-card:nth-child(2){background:#202022}.d-flip-card:nth-child(3){background:#28282a}.d-flip-card:before{content:'01';position:absolute;left:14px;top:18px;font:32px/1 Roboto Mono,monospace;color:#48484c}.d-flip-card:nth-child(2):before{content:'02'}.d-flip-card:nth-child(3):before{content:'03'}.d-flip-card:hover{border-color:#fa7319}.d-flip-card.d-flip-expanded{background:#19191b;font-size:28px}
/* Primary reading type; mono is reserved for values and annotations. */
.d-flip{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-flip p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-flip>footer button{font-family:Roboto Mono,ui-monospace,monospace}
.d-flip-card:before{font-family:Roboto Mono,ui-monospace,monospace}
.d-flip-card{background:linear-gradient(160deg,#1f1f23,#18181b);box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}.d-flip-card:nth-child(2){background:linear-gradient(160deg,#26262a,#1e1e22)}.d-flip-card:nth-child(3){background:linear-gradient(160deg,#2b2b2f,#222226)}.d-flip-card.d-flip-expanded{background:linear-gradient(160deg,#252529,#17171a)}

/* Current control composition. */
.d-flip{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-flip *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-flip button,.d-flip input,.d-flip textarea{font-weight:400}.d-flip>header{display:none}.d-flip>[class$="-head"][aria-hidden="true"],.d-flip>[class$="-foot"][aria-hidden="true"]{display:none}.d-flip>[class$="-stage"],.d-flip>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-flip>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-flip>footer>span{display:none}.d-flip>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-flip-card{border-radius:10px;box-shadow:inset 0 1px #fff09,0 5px 13px #0002}.d-flip-card:before{font-size:32px!important;font-weight:400!important;letter-spacing:0!important;color:#9ba8bb}.d-flip-card>span{font-size:14px;font-weight:450}.d-flip-overlay{border-radius:12px}.d-flip-overlay h3{font-size:28px;font-weight:400}
/* Current control composition. */
.d-flip *{text-transform:none!important;letter-spacing:0!important}.d-flip button{font-size:12px!important;font-weight:400!important}.d-flip>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-flip>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-flip>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-flip>footer button{font-size:11px!important;padding:6px 8px!important}.d-flip>footer{gap:6px!important}
/* Current control composition. */
.d-flip-card:before{font-family:Inter,system-ui,sans-serif!important;font-variant-numeric:tabular-nums;font-size:32px!important;font-weight:400!important}`,
  js: `
root.querySelectorAll('.d-flip-card').forEach(function (card) {
  card.addEventListener('click', function () {
    const expanding = !card.classList.contains('d-flip-expanded');

    // FIRST: measure where it is now
    const first = card.getBoundingClientRect();

    // LAST: change layout instantly
    card.classList.toggle('d-flip-expanded', expanding);
    const last = card.getBoundingClientRect();

    // INVERT: transform it back to where it was
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';

    // PLAY: release to identity on the next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.classList.add('d-flip-animating');
        card.style.transform = 'none';
      });
    });

    card.addEventListener('transitionend', function h() {
      card.classList.remove('d-flip-animating');
      card.removeEventListener('transitionend', h);
    });
  });
});`,
  prompt: ` Compose three numbered gray cards, each occupying one equal flexible grid column within 20px side margins. Use flat gray surfaces, a thin border, and orange only on hover; the composition must fit at 320px height without clipping at narrow widths.
Implement a FLIP expand/collapse transition, vanilla JS.

Requirements:
- FIRST: getBoundingClientRect() of the element before the layout change.
- LAST: toggle the expanded class (element becomes absolutely positioned filling its container) and measure again.
- INVERT: set transform = translate(dx, dy) scale(sx, sy) computed from the two rects so it appears unmoved (transform-origin: top left).
- PLAY: on the next frame (double rAF), enable the transition class and set transform: none; the browser animates from inverted to identity — animating layout at compositor cost only.
- Use cubic-bezier(0.32, 0.72, 0, 1), ~0.5s. Clean up the transition class on transitionend.
- Same code path handles both expand and collapse since FLIP is direction-agnostic.
- Mention document.startViewTransition as the emerging native alternative. Final composition: Normalized the card indices and names and softened card geometry while preserving FLIP expansion. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "smooth-accordion",
  title: "Smooth Accordion",
  cat: "Layout & UI",
  rootClass: "d-acc",
  tags: ["grid 0fr","height auto"],
  libs: [],
  desc: "Animating to height:auto — the classic impossible — solved with the grid-template-rows 0fr→1fr trick. No JS measurement, no max-height hacks.",
  seen: "Seen on: FAQ sections everywhere; the 0fr trick via Kevin Powell",
  hint: "click the rows",
  html: `
<div class="d-acc">
  <div class="d-acc-list">
    <div class="d-acc-item d-acc-open">
      <button class="d-acc-head">What is included?<i>+</i></button>
      <div class="d-acc-body"><div class="d-acc-inner">A focused collection of reusable components, thoughtful motion, and the details that make an interface feel complete.</div></div>
    </div>
    <div class="d-acc-item">
      <button class="d-acc-head">Can I make it my own?<i>+</i></button>
      <div class="d-acc-body"><div class="d-acc-inner">Every component can be adjusted to your colors, content, and layout. Start with the essentials and make it yours.</div></div>
    </div>
    <div class="d-acc-item">
      <button class="d-acc-head">How do we get started?<i>+</i></button>
      <div class="d-acc-body"><div class="d-acc-inner">Choose a component, explore its interaction, then bring the code into your project.</div></div>
    </div>
  </div>
</div>`,
  css: `
.d-acc {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-acc-list { width: min(480px, 90%); border: 1px solid #232327; }
.d-acc-item { border-bottom: 1px solid #232327; }
.d-acc-item:last-child { border-bottom: none; }
.d-acc-head {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  background: #101012; border: none; color: #ececef; cursor: pointer;
  font-size: 14px; font-weight: 600; font-family: inherit; padding: 14px 16px;
}
.d-acc-head i {
  font-style: normal; color: #fa7319; font-size: 16px;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.d-acc-item.d-acc-open .d-acc-head i { transform: rotate(45deg); }
.d-acc-body {
  display: grid; grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.d-acc-item.d-acc-open .d-acc-body { grid-template-rows: 1fr; }
.d-acc-inner { min-height: 0; overflow: hidden; padding: 0 16px; color: #9b9ba3; font-size: 13px; line-height: 1.6; }
.d-acc-item.d-acc-open .d-acc-inner { padding-bottom: 14px; }
.d-acc-row button{color:#ddd}.d-acc-row button span{color:#fa7319}
/* Primary reading type; mono is reserved for values and annotations. */
.d-acc{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-acc p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-acc>footer button{font-family:Roboto Mono,ui-monospace,monospace}

/* Current control composition. */
.d-acc{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-acc *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-acc button,.d-acc input,.d-acc textarea{font-weight:400}.d-acc>header{display:none}.d-acc>[class$="-head"][aria-hidden="true"],.d-acc>[class$="-foot"][aria-hidden="true"]{display:none}.d-acc>[class$="-stage"],.d-acc>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-acc>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-acc>footer>span{display:none}.d-acc>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-acc{padding:24px 20px}.d-acc-head{font-size:14px!important;font-weight:450!important;line-height:1.4;padding:16px 0}.d-acc-inner{font-size:12px!important;line-height:1.65;padding-bottom:17px}.d-acc-item{border-color:#303742}.d-acc-head i{font-size:18px;font-weight:400}
/* Current control composition. */
.d-acc *{text-transform:none!important;letter-spacing:0!important}.d-acc button{font-size:12px!important;font-weight:400!important}.d-acc>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-acc>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-acc>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-acc>footer button{font-size:11px!important;padding:6px 8px!important}.d-acc>footer{gap:6px!important}
/* Current control composition. */
.d-acc-list{width:100%;max-height:272px;overflow:auto;scrollbar-width:thin}.d-acc-head{padding:14px 12px!important;font-size:13px!important}.d-acc-inner{padding:0 12px;font-size:12px!important;line-height:1.55!important}.d-acc-item.d-acc-open .d-acc-inner{padding-bottom:14px}`,
  js: `
root.querySelectorAll('.d-acc-head').forEach(function (head) {
  head.addEventListener('click', function () {
    const item = head.parentElement;
    const wasOpen = item.classList.contains('d-acc-open');
    // close others (single-open behavior)
    root.querySelectorAll('.d-acc-item').forEach(function (i) { i.classList.remove('d-acc-open'); });
    if (!wasOpen) item.classList.add('d-acc-open');
  });
});`,
  prompt: `

Requirements:
- Each panel body: display: grid; grid-template-rows: 0fr; transition on grid-template-rows (~0.45s, cubic-bezier(0.22,1,0.36,1)). Open state sets 1fr.
- The direct child needs min-height: 0 and overflow: hidden — this is mandatory for the collapse to work.
- A rotating +/× indicator on the header (transform: rotate(45deg)).
- JS only toggles classes; single-open behavior (opening one closes the rest).
- Use button elements with aria-expanded, and hook up prefers-reduced-motion to disable the transition. Final composition: Replaced implementation-specific questions with useful project FAQs and a readable question/answer hierarchy. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "spring-modal",
  title: "Spring Modal",
  cat: "Layout & UI",
  rootClass: "d-modal",
  tags: ["overshoot","backdrop"],
  libs: [],
  desc: "A dialog that enters with scale overshoot (0.9 → 1.02 → 1) and a fading backdrop blur, and exits quickly downward. Snappy in, forgettable out — the correct asymmetry.",
  seen: "Seen on: linear.app, raycast.com, every polished SaaS product",
  hint: "open the modal",
  html: `
<div class="d-modal">
  <button class="d-modal-open">Publish update</button>
  <div class="d-modal-backdrop">
    <div class="d-modal-box">
      <h3>Publish this update?</h3>
      <p>Your changes will become visible to everyone with access to this project.</p>
      <div class="d-modal-actions">
        <button class="d-modal-cancel">Cancel</button>
        <button class="d-modal-confirm">Publish</button>
      </div>
    </div>
  </div>
</div>`,
  css: `
.d-modal {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.d-modal-open {
  background: #fa7319; color: #000; border: none; font-family: inherit;
  font-size: 14px; font-weight: 600; padding: 12px 24px; cursor: pointer;
}
.d-modal-backdrop {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(0px);
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s, backdrop-filter 0.25s;
}
.d-modal-backdrop.d-modal-show { opacity: 1; pointer-events: auto; backdrop-filter: blur(4px); }
.d-modal-box {
  width: min(340px, 85%); background: #161619; border: 1px solid #2e2e34;
  padding: 24px; transform: scale(0.9) translateY(12px); opacity: 0;
}
.d-modal-backdrop.d-modal-show .d-modal-box { animation: d-modal-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.d-modal-backdrop.d-modal-hide .d-modal-box { animation: d-modal-out 0.18s ease-in forwards; }
@keyframes d-modal-in {
  from { transform: scale(0.9) translateY(12px); opacity: 0; }
  to   { transform: scale(1) translateY(0);      opacity: 1; }
}
@keyframes d-modal-out {
  from { transform: scale(1) translateY(0);      opacity: 1; }
  to   { transform: scale(0.96) translateY(8px); opacity: 0; }
}
.d-modal-box h3 { color: #ececef; margin-bottom: 8px; }
.d-modal-box p { color: #9b9ba3; font-size: 13px; margin-bottom: 18px; }
.d-modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
.d-modal-actions button { font-family: inherit; font-size: 13px; padding: 8px 16px; cursor: pointer; }
.d-modal-cancel  { background: none; border: 1px solid #2e2e34; color: #9b9ba3; }
.d-modal-confirm { background: #fa7319; border: none; color: #000; font-weight: 600; }
.d-modal-open{background:#242426;color:#eee;border:1px solid #454548;font-size:12px;padding:16px 26px}.d-modal-open:hover{border-color:#fa7319}.d-modal-confirm{background:#fa7319}.d-modal-box{max-width:90%;box-sizing:border-box}.d-modal-box h3{font-size:20px}.d-modal-box p{font-size:11px;line-height:1.6}
/* Primary reading type; mono is reserved for values and annotations. */
.d-modal{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-modal p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-modal>footer button{font-family:Roboto Mono,ui-monospace,monospace}
.d-modal-box{background:linear-gradient(160deg,#1d1d21,#151518);border-color:#37373c;box-shadow:0 18px 40px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.025)}

/* Current control composition. */
.d-modal{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-modal *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-modal button,.d-modal input,.d-modal textarea{font-weight:400}.d-modal>header{display:none}.d-modal>[class$="-head"][aria-hidden="true"],.d-modal>[class$="-foot"][aria-hidden="true"]{display:none}.d-modal>[class$="-stage"],.d-modal>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-modal>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-modal>footer>span{display:none}.d-modal>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-modal-open{font-size:13px;padding:13px 21px;border-radius:9px}.d-modal-box{padding:24px 20px;border-radius:14px;box-shadow:0 12px 35px #0005}.d-modal-box h3{font-size:23px;font-weight:400;line-height:1.15}.d-modal-box p{font-size:12px;line-height:1.6}.d-modal-actions button{font-size:12px;border-radius:8px}
/* Current control composition. */
.d-modal *{text-transform:none!important;letter-spacing:0!important}.d-modal button{font-size:12px!important;font-weight:400!important}.d-modal>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-modal>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-modal>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-modal>footer button{font-size:11px!important;padding:6px 8px!important}.d-modal>footer{gap:6px!important}`,
  js: `
const backdrop = root.querySelector('.d-modal-backdrop');

function open() { backdrop.classList.remove('d-modal-hide'); backdrop.classList.add('d-modal-show'); }
function close() {
  backdrop.classList.add('d-modal-hide');
  setTimeout(function () { backdrop.classList.remove('d-modal-show', 'd-modal-hide'); }, 180);
}

root.querySelector('.d-modal-open').addEventListener('click', open);
root.querySelector('.d-modal-cancel').addEventListener('click', close);
root.querySelector('.d-modal-confirm').addEventListener('click', close);
backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });`,
  prompt: ` Use a 320px near-black stage with a charcoal outlined trigger; use orange only for the confirmation action. The dialog must fit within 90% of the stage width.
Build a spring-animated modal, vanilla JS + CSS.

Requirements:
- Backdrop: rgba black + backdrop-filter blur(4px), fading in over 0.25s; clicking it closes the modal.
- Enter animation: scale 0.9 / translateY(12px) / opacity 0 to identity, 0.45s with cubic-bezier(0.34, 1.56, 0.64, 1) — the >1 y-value produces the overshoot "spring".
- Exit animation: intentionally different — 0.18s ease-in, scale to 0.96, translateY(8px), fade out. Fast exits, springy entries.
- Manage with .show/.hide classes and a timeout matching the exit duration.
- Accessibility: role=dialog, aria-modal, focus trap, Escape to close, return focus to the trigger on close.
- Prefer the native <dialog> element where possible; the animation classes work the same. Final composition: Turned the spring specimen into an understandable publish confirmation with clear action hierarchy and calmer shape. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "drag-carousel",
  title: "Inertia Drag Carousel",
  cat: "Layout & UI",
  rootClass: "d-drag",
  tags: ["pointer events","momentum"],
  libs: [],
  desc: "Grab-and-throw horizontal gallery: pointer drag maps 1:1, release keeps velocity and decays with friction, edges resist with rubber-banding.",
  seen: "Seen on: siena.film, awwwards galleries, mobile-first portfolios",
  hint: "drag / throw the row",
  html: `
<div class="d-drag">
  <div class="d-drag-track">
    <div class="d-drag-cell"><b>Field guide 01</b><span>Find your focus</span></div><div class="d-drag-cell"><b>Field guide 02</b><span>Make some space</span></div>
    <div class="d-drag-cell"><b>Field guide 03</b><span>Follow the light</span></div><div class="d-drag-cell"><b>Field guide 04</b><span>Keep good notes</span></div>
    <div class="d-drag-cell"><b>Field guide 05</b><span>Build with care</span></div><div class="d-drag-cell"><b>Field guide 06</b><span>Share the process</span></div>
    <div class="d-drag-cell"><b>Field guide 07</b><span>Look a little closer</span></div><div class="d-drag-cell"><b>Field guide 08</b><span>Start something</span></div>
  </div>
</div>`,
  css: `
.d-drag {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; overflow: hidden; cursor: grab;
}
.d-drag:active { cursor: grabbing; }
.d-drag-track { display: flex; gap: 14px; padding: 0 24px; will-change: transform; }
.d-drag-cell {
  flex: 0 0 190px; height: 220px;
  border: 1px solid #2e2e34; background: linear-gradient(160deg, #161619, #101012);
  color: #5c5c66; font-size: 40px; font-weight: 700;
  display: flex; align-items: flex-end; padding: 14px;
  user-select: none;
}
/* Current control composition. */
.d-drag{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-drag *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-drag button,.d-drag input,.d-drag textarea{font-weight:400}.d-drag>header{display:none}.d-drag>[class$="-head"][aria-hidden="true"],.d-drag>[class$="-foot"][aria-hidden="true"]{display:none}.d-drag>[class$="-stage"],.d-drag>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-drag>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-drag>footer>span{display:none}.d-drag>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-drag-cell{font-size:26px;font-weight:400;letter-spacing:0;border-radius:12px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:18px;gap:8px;background:linear-gradient(155deg,#2d3947,#202830);box-shadow:inset 0 1px #fff09}.d-drag-cell>b{font-size:11px;font-weight:400;color:#98a7bc}.d-drag-cell>span{font-size:21px;font-weight:400;line-height:1.12;color:#dce2ea}
/* Current control composition. */
.d-drag *{text-transform:none!important;letter-spacing:0!important}.d-drag button{font-size:12px!important;font-weight:400!important}.d-drag>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-drag>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-drag>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-drag>footer button{font-size:11px!important;padding:6px 8px!important}.d-drag>footer{gap:6px!important}
/* Current control composition. */
.d-drag{display:flex!important;flex-direction:row!important;padding:0!important;align-items:center;justify-content:flex-start}.d-drag-track{padding:0 24px}.d-drag-cell{box-sizing:border-box;flex:0 0 222px;width:222px;height:230px;padding:22px}`,
  js: `
const track = root.querySelector('.d-drag-track');
let x = 0, vel = 0, dragging = false, lastX = 0;

function maxScroll() { return Math.max(0, track.scrollWidth - root.clientWidth + 48); }

root.addEventListener('pointerdown', function (e) {
  dragging = true; lastX = e.clientX; vel = 0;
  root.setPointerCapture(e.pointerId);
});
root.addEventListener('pointermove', function (e) {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  lastX = e.clientX;
  x -= dx;
  vel = -dx;                       // velocity from the last move
});
root.addEventListener('pointerup', function () { dragging = false; });
root.addEventListener('pointercancel', function () { dragging = false; });

(function tick() {
  if (!dragging) {
    x += vel;
    vel *= 0.94;                   // friction
  }
  // rubber-band the edges
  if (x < 0)            x += (0 - x) * 0.12;
  if (x > maxScroll())  x += (maxScroll() - x) * 0.12;
  track.style.transform = 'translateX(' + (-x) + 'px)';
  requestAnimationFrame(tick);
})();`,
  prompt: `
Build a drag carousel with inertia, vanilla JS (Pointer Events).

Requirements:
- pointerdown starts a drag (setPointerCapture); pointermove applies the delta 1:1 to a position value and records velocity from the last delta; pointerup releases.
- A permanent rAF loop: when not dragging, position += velocity and velocity *= 0.94 (friction) so throws glide to a stop.
- Rubber-band edges: when position is out of bounds, ease it back with pos += (bound - pos) * 0.12 — during drag this creates natural resistance.
- Apply as translateX on the track (transform only, will-change).
- cursor: grab / grabbing; user-select: none on cells; prevent native image drag.
- Ignore click events that follow a real drag (movement > a few px) so cells stay clickable. Final composition: Replaced blank giant-number cards with readable field-guide topics, preserving the draggable momentum track. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "hover-fill-button",
  title: "Directional Hover Fill",
  cat: "Layout & UI",
  rootClass: "d-fill",
  tags: ["circle grow","entry point"],
  libs: [],
  desc: "A circle expands from the exact point where the cursor entered the button and retreats toward the exit point. Entry/exit-aware fills read as far more \"alive\" than a flat swap.",
  seen: "Seen on: camillemormal.com, studio CTAs across awwwards",
  hint: "enter the buttons from different sides",
  html: `
<div class="d-fill">
  <button class="d-fill-btn"><span class="d-fill-circle"></span><em>Discover</em></button>
  <button class="d-fill-btn"><span class="d-fill-circle"></span><em>Contact</em></button>
</div>`,
  css: `
.d-fill {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center; gap: 32px;
}
.d-fill-btn {
  position: relative; overflow: hidden;
  background: none; border: 1px solid #2e2e34; color: #ececef;
  font-family: inherit; font-size: 15px; font-weight: 500;
  padding: 16px 40px; cursor: pointer;
  transition: color 0.3s;
}
.d-fill-btn em { position: relative; font-style: normal; z-index: 1; }
.d-fill-btn:hover { color: #000; }
.d-fill-circle {
  position: absolute; left: 0; top: 0; width: 20px; height: 20px;
  background: #fa7319; border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.d-fill-btn:hover .d-fill-circle { transform: translate(-50%, -50%) scale(14); }
.d-fill{gap:12px;padding:20px;box-sizing:border-box}.d-fill-btn{font-size:12px;padding:16px 24px}.d-fill-circle{background:#fa7319}
/* Primary reading type; mono is reserved for values and annotations. */
.d-fill{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-fill p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-fill>footer button{font-family:Roboto Mono,ui-monospace,monospace}

/* Current control composition. */
.d-fill{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-fill *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-fill button,.d-fill input,.d-fill textarea{font-weight:400}.d-fill>header{display:none}.d-fill>[class$="-head"][aria-hidden="true"],.d-fill>[class$="-foot"][aria-hidden="true"]{display:none}.d-fill>[class$="-stage"],.d-fill>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-fill>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-fill>footer>span{display:none}.d-fill>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-fill-btn{border-radius:8px;padding:13px 22px}.d-fill-btn em{font-size:13px;font-weight:450}.d-fill-circle{background:#b9c7db}
/* Current control composition. */
.d-fill *{text-transform:none!important;letter-spacing:0!important}.d-fill button{font-size:12px!important;font-weight:400!important}.d-fill>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-fill>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-fill>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-fill>footer button{font-size:11px!important;padding:6px 8px!important}.d-fill>footer{gap:6px!important}`,
  js: `
root.querySelectorAll('.d-fill-btn').forEach(function (btn) {
  const circle = btn.querySelector('.d-fill-circle');
  function place(e) {
    const b = btn.getBoundingClientRect();
    circle.style.left = (e.clientX - b.left) + 'px';
    circle.style.top = (e.clientY - b.top) + 'px';
  }
  // position the circle at entry AND exit so it grows/shrinks from the right spot
  btn.addEventListener('mouseenter', place);
  btn.addEventListener('mouseleave', place);
});`,
  prompt: `
Build a directional hover-fill button, vanilla JS + CSS.

Requirements:
- Inside an overflow-hidden button, an absolutely-positioned circle (border-radius 50%, ~20px) starts at transform: translate(-50%,-50%) scale(0).
- On mouseenter, set the circle's left/top to the cursor position relative to the button, then the :hover CSS scales it to ~scale(14) with cubic-bezier(0.22,1,0.36,1) over 0.45s so it floods the button from the entry point.
- On mouseleave, re-place the circle at the exit point before the reverse transition, so it shrinks toward where the cursor left.
- The label sits above the circle (z-index) and its color transitions to the inverse on hover.
- Scale must be large enough to cover the button diagonal from any corner (compute or overshoot). Final composition: Refined corner geometry and label size while preserving the pointer-origin expanding fill. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "page-transition",
  title: "Page Transition Curtain",
  cat: "Layout & UI",
  tags: ["columns","navigation"],
  rootClass: "d-curtain",
  libs: [],
  desc: "Navigation triggers vertical panels that sweep in with a stagger, swap the content while covered, then sweep away. The full-screen wipe between pages on award sites.",
  seen: "Seen on: obys.agency, holographik.com, most SOTD navigations",
  hint: "click \"navigate\"",
  html: `
<div class="d-curtain">
  <div class="d-curtain-page">
    <h2 class="d-curtain-title">HOME</h2>
    <button class="d-curtain-go">Next page →</button>
  </div>
  <div class="d-curtain-panels">
    <div class="d-curtain-panel" style="--d:0s"></div>
    <div class="d-curtain-panel" style="--d:0.07s"></div>
    <div class="d-curtain-panel" style="--d:0.14s"></div>
    <div class="d-curtain-panel" style="--d:0.21s"></div>
  </div>
</div>`,
  css: `
.d-curtain { position: relative; width: 100%; height: 320px; background: #0a0a0b; overflow: hidden; }
.d-curtain-page {
  height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px;
}
.d-curtain-title { font-size: 56px; font-weight: 700; color: #ececef; letter-spacing: -0.02em; }
.d-curtain-go {
  background: none; border: 1px solid #2e2e34; color: #9b9ba3;
  font-family: "JetBrains Mono", monospace; font-size: 12px; padding: 10px 20px; cursor: pointer;
}
.d-curtain-go:hover { color: #fa7319; border-color: #fa7319; }
.d-curtain-panels { position: absolute; inset: 0; display: flex; pointer-events: none; }
.d-curtain-panel {
  flex: 1; background: #fa7319;
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  transition-delay: var(--d);
}
.d-curtain.d-curtain-covering .d-curtain-panel { transform: scaleY(1); }
.d-curtain.d-curtain-revealing .d-curtain-panel { transform: scaleY(0); transform-origin: bottom; }
.d-curtain-go:hover{color:#fa7319;border-color:#fa7319}.d-curtain-panel{background:#fa7319}
/* Primary reading type; mono is reserved for values and annotations. */
.d-curtain{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-curtain-go{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-curtain p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-curtain>footer button{font-family:Roboto Mono,ui-monospace,monospace}

/* Current control composition. */
.d-curtain{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-curtain *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-curtain button,.d-curtain input,.d-curtain textarea{font-weight:400}.d-curtain>header{display:none}.d-curtain>[class$="-head"][aria-hidden="true"],.d-curtain>[class$="-foot"][aria-hidden="true"]{display:none}.d-curtain>[class$="-stage"],.d-curtain>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-curtain>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-curtain>footer>span{display:none}.d-curtain>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-curtain-title{font:400 43px/1.1 "Inter",sans-serif!important;letter-spacing:-.025em}.d-curtain-go{font-size:12px;border-radius:8px;padding:12px 17px}.d-curtain-panel{background:#414d5d}
/* Current control composition. */
.d-curtain *{text-transform:none!important;letter-spacing:0!important}.d-curtain button{font-size:12px!important;font-weight:400!important}.d-curtain>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-curtain>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-curtain>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-curtain>footer button{font-size:11px!important;padding:6px 8px!important}.d-curtain>footer{gap:6px!important}`,
  js: `
const PAGES = ['HOME', 'WORK', 'ABOUT', 'CONTACT'];
let page = 0, busy = false;
const title = root.querySelector('.d-curtain-title');

root.querySelector('.d-curtain-go').addEventListener('click', function () {
  if (busy) return;
  busy = true;
  root.classList.remove('d-curtain-revealing');
  root.classList.add('d-curtain-covering');

  // wait for cover (0.5s + last panel delay 0.21s)
  setTimeout(function () {
    page = (page + 1) % PAGES.length;
    title.textContent = PAGES[page];          // swap content while hidden
    root.classList.remove('d-curtain-covering');
    root.classList.add('d-curtain-revealing');
    setTimeout(function () { busy = false; }, 750);
  }, 750);
});`,
  prompt: `
Build a curtain page-transition, vanilla JS + CSS.

Requirements:
- A fixed full-screen overlay of 4 vertical panels (flex: 1 each), each transform: scaleY(0), transform-origin: top.
- Cover phase: panels scale to 1 with cubic-bezier(0.76, 0, 0.24, 1) over 0.5s, staggered 70ms left-to-right via --d transition delays.
- While fully covered, swap the page content (or let the router navigate).
- Reveal phase: switch transform-origin to bottom and scale back to 0 with the same stagger, so the curtain exits downward instead of retracting.
- Guard with a busy flag; total cover time = duration + last stagger.
- For real multi-page sites, mention the View Transitions API and intercepting link clicks. Final composition: Reduced the heavy uppercase page display and calmed the curtain material while preserving transition sequencing. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
INTRX.register({
  id: "logo-marquee",
  title: "Infinite Logo Marquee",
  cat: "Layout & UI",
  rootClass: "d-logos",
  tags: ["css animation","mask fade"],
  libs: [],
  desc: "The pure-CSS infinite logo strip: content duplicated once, animated -50%, edges faded with a mask, paused on hover. Zero JS, perfectly seamless.",
  seen: "Seen on: every SaaS landing page \"trusted by\" section",
  hint: "hover to pause",
  html: `
<div class="d-logos">
  <div class="d-logos-strip">
    <div class="d-logos-row">
      <span>ACME</span><span>VERTEX</span><span>NORTH</span><span>OKTA∆</span><span>LUMEN</span><span>ARRAY</span>
      <span>ACME</span><span>VERTEX</span><span>NORTH</span><span>OKTA∆</span><span>LUMEN</span><span>ARRAY</span>
    </div>
  </div>
</div>`,
  css: `
.d-logos {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-logos-strip {
  width: min(560px, 92%); overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
}
.d-logos-row {
  display: flex; gap: 48px; width: max-content;
  animation: d-logos-scroll 18s linear infinite;
}
.d-logos-strip:hover .d-logos-row { animation-play-state: paused; }
.d-logos-row span {
  font-family: "JetBrains Mono", monospace; font-size: 20px; font-weight: 700;
  color: #5c5c66; letter-spacing: 0.08em; white-space: nowrap;
  transition: color 0.3s;
}
.d-logos-row span:hover { color: #fa7319; }
@keyframes d-logos-scroll {
  to { transform: translateX(calc(-50% - 24px)); }   /* -50% minus half the gap */
}
/* Primary reading type; mono is reserved for values and annotations. */
.d-logos{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-logos-row span{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-logos p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-logos>footer button{font-family:Roboto Mono,ui-monospace,monospace}

/* Current control composition. */
.d-logos{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-logos *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-logos button,.d-logos input,.d-logos textarea{font-weight:400}.d-logos>header{display:none}.d-logos>[class$="-head"][aria-hidden="true"],.d-logos>[class$="-foot"][aria-hidden="true"]{display:none}.d-logos>[class$="-stage"],.d-logos>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-logos>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-logos>footer>span{display:none}.d-logos>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-logos-row span{font:500 21px/1.2 "Inter",sans-serif!important;letter-spacing:-.035em;opacity:.78}.d-logos-strip{mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}.d-logos:before{content:"Trusted by independent teams";position:absolute;top:86px;font-size:12px;color:#9aa6b7}
/* Current control composition. */
.d-logos *{text-transform:none!important;letter-spacing:0!important}.d-logos button{font-size:12px!important;font-weight:400!important}.d-logos>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-logos>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-logos>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-logos>footer button{font-size:11px!important;padding:6px 8px!important}.d-logos>footer{gap:6px!important}
/* Current control composition. */
.d-logos-row span{color:#afb8c6!important;opacity:1!important}`,
  js: `
// Pure CSS. For dynamic logo lists, duplicate the content once in JS:
// const row = root.querySelector('.d-logos-row');
// row.innerHTML += row.innerHTML;`,
  prompt: `

Requirements:
- A single row of logos duplicated exactly once (list rendered twice back-to-back), width: max-content, display: flex with a fixed gap.
- Keyframe animation translateX from 0 to calc(-50% - gap/2) looping linearly (~18s); because the content repeats exactly at that offset, the loop is invisible.
- Fade the strip's edges with mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent) — include the -webkit prefix.
- Pause on hover with animation-play-state: paused.
- Logos are dimmed by default and brighten individually on hover.
- Respect prefers-reduced-motion by pausing the animation. Final composition: Raised the wordmark contrast and introduced useful context without adding decorative counters. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
