/* v4 · Native layout interaction, framed by the shared stage. */
INTRX.register({
 id:"zoom-ui-inception",
 title:"Zoom Into UI",
 cat:"Layout & UI",
 rootClass:"d-inception-demo",
 tags:["zoom","container transform","nested UI","breadcrumb","WAAPI"],
 libs:[],
 desc:"A Halden workspace you can dive into: a project card grows into its sprint board, a board card grows into the task, and the breadcrumb keeps the trail. Each level is a real, working screen, with subtasks you can tick that update the board behind it.",
 seen:"Pattern family: nested interfaces with shared-element navigation",
 hint:"Press · Open a card to zoom into it; the breadcrumb, Back or Escape zooms out",
 html:`<div class="d-inception-demo" data-depth="0">
<div class="d-inception-demo-app" role="region" aria-label="Halden workspace, Projects">
<header class="d-inception-demo-top">
<button class="d-inception-demo-back" type="button" aria-label="Zoom out" disabled><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.8 3.6 5.4 8l4.4 4.4"/></svg></button>
<nav class="d-inception-demo-crumbs" aria-label="Location"><ol>
<li class="d-inception-demo-crumb-item" data-level="0"><button class="d-inception-demo-crumb" type="button" data-to="0" aria-current="page"><svg class="d-inception-demo-logo" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="14" height="14" rx="4"/><path d="M5.4 4.6v6.8M10.6 4.6v6.8M5.4 8h5.2"/></svg><span class="d-inception-demo-crumb-0">Halden</span></button></li>
<li class="d-inception-demo-crumb-item" data-level="1" hidden><svg class="d-inception-demo-sep" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 4l4 4-4 4"/></svg><button class="d-inception-demo-crumb" type="button" data-to="1">Storefront</button></li>
<li class="d-inception-demo-crumb-item" data-level="2" hidden><svg class="d-inception-demo-sep" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 4l4 4-4 4"/></svg><button class="d-inception-demo-crumb" type="button" data-to="2">Checkout redesign</button></li>
</ol></nav>
<span class="d-inception-demo-depth" aria-hidden="true"><svg viewBox="0 0 20 20"><rect x="1.5" y="1.5" width="17" height="17" rx="4.5" class="is-on"/><rect x="5" y="5" width="10" height="10" rx="3"/><rect x="8" y="8" width="4" height="4" rx="1.2"/></svg><span class="d-inception-demo-depth-n">1 / 3</span></span>
</header>
<div class="d-inception-demo-viewport">
<section class="d-inception-demo-screen" data-screen="0" data-layer="over" aria-label="Projects">
<div class="d-inception-demo-head"><div><h2 class="d-inception-demo-h" tabindex="-1">Projects</h2><p class="d-inception-demo-sub">Halden · 4 projects · production</p></div><span class="d-inception-demo-chip"><i class="d-inception-demo-dot d-inception-demo-dot--build"></i>1 building</span></div>
<div class="d-inception-demo-grid"><button class="d-inception-demo-proj d-inception-demo-door" type="button" data-door="0" aria-label="Open the Storefront board"><span class="d-inception-demo-proj-top"><span class="d-inception-demo-proj-icon d-inception-demo-proj-icon--acc" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M2.6 6.2 3.7 3h8.6l1.1 3.2M2.6 6.2h10.8v.4a2 2 0 0 1-3.6 1.1 2 2 0 0 1-3.6 0 2 2 0 0 1-3.6-1.1zM3.6 8.4V13h8.8V8.4M6.6 13v-2.7h2.8V13"/></svg></span><span class="d-inception-demo-proj-name">Storefront<span class="d-inception-demo-proj-url">storefront.halden.app</span></span><span class="d-inception-demo-state d-inception-demo-state--ready">Ready</span></span><svg class="d-inception-demo-spark d-inception-demo-spark--acc" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true"><path class="d-inception-demo-spark-area" d="M0.0 24.0L20.0 18.6L40.0 22.2L60.0 15.0L80.0 16.8L100.0 9.6L120.0 6.0L120 28L0 28Z"/><path class="d-inception-demo-spark-line" d="M0.0 24.0L20.0 18.6L40.0 22.2L60.0 15.0L80.0 16.8L100.0 9.6L120.0 6.0"/></svg><span class="d-inception-demo-proj-foot"><span><b>18.2k</b> visits · 7d</span><span class="d-inception-demo-proj-when">4m ago<svg class="d-inception-demo-go" viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 10.5l5-5M6.2 5.5h4.3v4.3"/></svg></span></span></button><article class="d-inception-demo-proj" aria-label="Payments API"><span class="d-inception-demo-proj-top"><span class="d-inception-demo-proj-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M5.5 4 2.5 8l3 4M10.5 4l3 4-3 4M9 3 7 13"/></svg></span><span class="d-inception-demo-proj-name">Payments API<span class="d-inception-demo-proj-url">api.halden.app</span></span><span class="d-inception-demo-state d-inception-demo-state--build">Building</span></span><svg class="d-inception-demo-spark" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true"><path class="d-inception-demo-spark-area" d="M0.0 24.0L20.0 18.9L40.0 21.4L60.0 13.7L80.0 16.3L100.0 11.1L120.0 6.0L120 28L0 28Z"/><path class="d-inception-demo-spark-line" d="M0.0 24.0L20.0 18.9L40.0 21.4L60.0 13.7L80.0 16.3L100.0 11.1L120.0 6.0"/></svg><span class="d-inception-demo-proj-foot"><span><b>2.14M</b> requests · 7d</span><span class="d-inception-demo-proj-when">1m ago</span></span></article><article class="d-inception-demo-proj" aria-label="Docs"><span class="d-inception-demo-proj-top"><span class="d-inception-demo-proj-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3.5 2.8h6l3 3v7.4h-9zM9.3 2.8V6h3.2M5.6 8.6h4.8M5.6 10.8h3.2"/></svg></span><span class="d-inception-demo-proj-name">Docs<span class="d-inception-demo-proj-url">docs.halden.app</span></span><span class="d-inception-demo-state d-inception-demo-state--ready">Ready</span></span><svg class="d-inception-demo-spark" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true"><path class="d-inception-demo-spark-area" d="M0.0 24.0L20.0 15.0L40.0 15.0L60.0 6.0L80.0 24.0L100.0 15.0L120.0 6.0L120 28L0 28Z"/><path class="d-inception-demo-spark-line" d="M0.0 24.0L20.0 15.0L40.0 15.0L60.0 6.0L80.0 24.0L100.0 15.0L120.0 6.0"/></svg><span class="d-inception-demo-proj-foot"><span><b>6.4k</b> visits · 7d</span><span class="d-inception-demo-proj-when">2h ago</span></span></article><article class="d-inception-demo-proj" aria-label="Mobile app"><span class="d-inception-demo-proj-top"><span class="d-inception-demo-proj-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><rect x="4.6" y="2" width="6.8" height="12" rx="1.8"/><path d="M7.2 11.8h1.6"/></svg></span><span class="d-inception-demo-proj-name">Mobile app<span class="d-inception-demo-proj-url">halden-ios</span></span><span class="d-inception-demo-state d-inception-demo-state--ready">TestFlight</span></span><svg class="d-inception-demo-spark" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true"><path class="d-inception-demo-spark-area" d="M0.0 24.0L20.0 19.5L40.0 19.5L60.0 15.0L80.0 10.5L100.0 15.0L120.0 6.0L120 28L0 28Z"/><path class="d-inception-demo-spark-line" d="M0.0 24.0L20.0 19.5L40.0 19.5L60.0 15.0L80.0 10.5L100.0 15.0L120.0 6.0"/></svg><span class="d-inception-demo-proj-foot"><span><b>1.8.2</b> build 311</span><span class="d-inception-demo-proj-when">1d ago</span></span></article></div>
</section>
<section class="d-inception-demo-screen" data-screen="1" aria-label="Storefront board" hidden>
<div class="d-inception-demo-head"><div><h2 class="d-inception-demo-h" tabindex="-1">Storefront</h2><p class="d-inception-demo-sub">Sprint 14 · Nov 25 – Dec 6</p></div><span class="d-inception-demo-avs"><span class="d-inception-demo-av d-inception-demo-av--ml" aria-hidden="true">ML</span><span class="d-inception-demo-av d-inception-demo-av--oh" aria-hidden="true">OH</span><span class="d-inception-demo-av d-inception-demo-av--jk" aria-hidden="true">JK</span></span></div>
<div class="d-inception-demo-board"><div class="d-inception-demo-col d-inception-demo-col--todo" role="group" aria-label="To do, 2 tasks"><p class="d-inception-demo-col-head"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.2" stroke-dasharray="2.2 2"/></svg>To do<span>2</span></p><article class="d-inception-demo-card" aria-label="Gift card balance check, STO-152"><span class="d-inception-demo-card-top"><span class="d-inception-demo-id">STO-152</span><span class="d-inception-demo-av d-inception-demo-av--oh" aria-hidden="true">OH</span></span><span class="d-inception-demo-card-title">Gift card balance check</span><span class="d-inception-demo-card-foot"><span class="d-inception-demo-tag">Payments</span></span></article><article class="d-inception-demo-card" aria-label="Saved addresses for guests, STO-155"><span class="d-inception-demo-card-top"><span class="d-inception-demo-id">STO-155</span><span class="d-inception-demo-av d-inception-demo-av--jk" aria-hidden="true">JK</span></span><span class="d-inception-demo-card-title">Saved addresses for guests</span><span class="d-inception-demo-card-foot"><span class="d-inception-demo-tag">Accounts</span></span></article></div><div class="d-inception-demo-col d-inception-demo-col--doing" role="group" aria-label="In progress, 2 tasks"><p class="d-inception-demo-col-head"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.2"/><path class="d-inception-demo-fill" d="M8 2.8a5.2 5.2 0 0 1 0 10.4z"/></svg>In progress<span>2</span></p><button class="d-inception-demo-card d-inception-demo-door" type="button" data-door="1" aria-label="Open Checkout redesign, STO-148, 3 of 5 subtasks done"><span class="d-inception-demo-card-top"><span class="d-inception-demo-id">STO-148</span><span class="d-inception-demo-av d-inception-demo-av--ml" aria-hidden="true">ML</span></span><span class="d-inception-demo-card-title">Checkout redesign</span><span class="d-inception-demo-card-foot"><span class="d-inception-demo-tag d-inception-demo-tag--acc">Design</span><span class="d-inception-demo-prog"><span class="d-inception-demo-prog-bar"><i></i></span><span class="d-inception-demo-prog-n">3/5</span></span></span></button><article class="d-inception-demo-card" aria-label="Shipping ETA on product page, STO-141"><span class="d-inception-demo-card-top"><span class="d-inception-demo-id">STO-141</span><span class="d-inception-demo-av d-inception-demo-av--oh" aria-hidden="true">OH</span></span><span class="d-inception-demo-card-title">Shipping ETA on product page</span><span class="d-inception-demo-card-foot"><span class="d-inception-demo-tag">Shipping</span><span class="d-inception-demo-prog d-inception-demo-prog--plain"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg><span>1/3</span></span></span></article></div><div class="d-inception-demo-col d-inception-demo-col--review" role="group" aria-label="In review, 2 tasks"><p class="d-inception-demo-col-head"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.2"/><circle class="d-inception-demo-fill" cx="8" cy="8" r="2.2"/></svg>In review<span>2</span></p><article class="d-inception-demo-card" aria-label="EU VAT presets for checkout, STO-139"><span class="d-inception-demo-card-top"><span class="d-inception-demo-id">STO-139</span><span class="d-inception-demo-av d-inception-demo-av--jk" aria-hidden="true">JK</span></span><span class="d-inception-demo-card-title">EU VAT presets for checkout</span><span class="d-inception-demo-card-foot"><span class="d-inception-demo-tag">Tax</span><span class="d-inception-demo-prog d-inception-demo-prog--plain"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg><span>4/4</span></span></span></article><article class="d-inception-demo-card" aria-label="Fix rounding in tax totals, STO-137"><span class="d-inception-demo-card-top"><span class="d-inception-demo-id">STO-137</span><span class="d-inception-demo-av d-inception-demo-av--ml" aria-hidden="true">ML</span></span><span class="d-inception-demo-card-title">Fix rounding in tax totals</span><span class="d-inception-demo-card-foot"><span class="d-inception-demo-tag">Tax</span><span class="d-inception-demo-prog d-inception-demo-prog--plain"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg><span>2/2</span></span></span></article></div></div>
</section>
<section class="d-inception-demo-screen" data-screen="2" aria-label="Checkout redesign task" hidden>
<div class="d-inception-demo-task"><div class="d-inception-demo-task-main">
<p class="d-inception-demo-kicker"><span class="d-inception-demo-id">STO-148</span><span class="d-inception-demo-pill"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.2"/><path class="d-inception-demo-fill" d="M8 2.8a5.2 5.2 0 0 1 0 10.4z"/></svg>In progress</span><span class="d-inception-demo-prio"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 12.5v-3M8 12.5v-6M12.5 12.5v-9"/></svg>High</span></p>
<h2 class="d-inception-demo-h d-inception-demo-task-title" tabindex="-1">Checkout redesign</h2>
<p class="d-inception-demo-task-desc">One page, wallets first, order summary pinned on mobile.</p>
<div class="d-inception-demo-subs" role="group" aria-label="Subtasks">
<p class="d-inception-demo-subs-head">Subtasks<span class="d-inception-demo-subs-count">3 of 5</span></p>
<span class="d-inception-demo-subs-bar" aria-hidden="true"><i></i></span>
<label class="d-inception-demo-subtask"><input type="checkbox" checked><span class="d-inception-demo-box" aria-hidden="true"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg></span><span class="d-inception-demo-subtask-text">Single-page address form</span></label>
<label class="d-inception-demo-subtask"><input type="checkbox" checked><span class="d-inception-demo-box" aria-hidden="true"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg></span><span class="d-inception-demo-subtask-text">Apple Pay and Link wallets</span></label>
<label class="d-inception-demo-subtask"><input type="checkbox" checked><span class="d-inception-demo-box" aria-hidden="true"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg></span><span class="d-inception-demo-subtask-text">VAT line from the EU presets</span></label>
<label class="d-inception-demo-subtask"><input type="checkbox"><span class="d-inception-demo-box" aria-hidden="true"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg></span><span class="d-inception-demo-subtask-text">Error states for declined cards</span></label>
<label class="d-inception-demo-subtask"><input type="checkbox"><span class="d-inception-demo-box" aria-hidden="true"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.8 8.3l2.7 2.6 5.7-5.8"/></svg></span><span class="d-inception-demo-subtask-text">A/B test against the current flow</span></label>
</div></div>
<dl class="d-inception-demo-side">
<div><dt>Assignee</dt><dd><span class="d-inception-demo-av d-inception-demo-av--ml" aria-hidden="true">ML</span>Maya Lindqvist</dd></div>
<div><dt>Due</dt><dd>Thu, Dec 4</dd></div>
<div><dt>Sprint</dt><dd>Sprint 14</dd></div>
<div><dt>Linked</dt><dd class="d-inception-demo-mono">PR #412</dd></div>
<div><dt>Design</dt><dd class="d-inception-demo-mono">checkout-v3.fig</dd></div>
</dl></div>
</section>
<div class="d-inception-demo-surface" aria-hidden="true" hidden><i class="d-inception-demo-surface-skin"></i></div>
</div>
</div>
<p class="d-inception-demo-live" role="status" aria-live="polite"></p>
</div>`,
 css:`.d-inception-demo{--zi-app:#141414;--zi-bar:#181818;--zi-screen:#161616;--zi-card:#1d1d1d;--zi-card-hi:#222;--zi-chip:rgba(255,255,255,.06);--zi-edge:rgba(255,255,255,.09);--zi-edge-hi:rgba(255,255,255,.16);--zi-line:rgba(255,255,255,.07);--zi-ink:#ededed;--zi-ink-2:#a3a3a3;--zi-ink-3:#808080;--zi-ok:#d4d4d4;--zi-acc:#fa7319;--zi-acc-ink:#ffb27a;--zi-acc-soft:rgba(250,115,25,.14);--zi-acc-line:rgba(250,115,25,.5);--zi-lift:0 1px 2px rgba(0,0,0,.35),0 8px 18px -10px rgba(0,0,0,.6);--fs:var(--fit-scale,1);position:relative;width:100%;height:100%;color:var(--zi-ink);font:400 12px/1.4 Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.d-inception-demo *{box-sizing:border-box}
.d-inception-demo svg{display:block;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.d-inception-demo :where(button){margin:0;border:0;padding:0;font:inherit;color:inherit;background:none;text-align:left;-webkit-tap-highlight-color:transparent}
.d-inception-demo :where(h2,p,dl,dd,ol){margin:0;padding:0}
.d-inception-demo-app{position:absolute;inset:0;border-radius:14px;overflow:hidden;background:var(--zi-app);box-shadow:inset 0 0 0 1px var(--zi-edge),inset 0 1px 0 rgba(255,255,255,.06),0 0 0 1px rgba(0,0,0,.5),0 2px 4px rgba(0,0,0,.3),0 24px 56px -20px rgba(0,0,0,.75)}
.d-inception-demo-top{position:absolute;left:0;right:0;top:0;height:44px;display:flex;align-items:center;gap:8px;padding:0 12px 0 10px;background:var(--zi-bar);box-shadow:inset 0 -1px 0 var(--zi-line);z-index:3}
.d-inception-demo-back{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;color:var(--zi-ink-2);cursor:pointer;transition:background-color var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),color var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),opacity var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-back svg{width:16px;height:16px;stroke-width:1.7}
.d-inception-demo-back:disabled{opacity:.35;cursor:default}
.d-inception-demo-crumbs{min-width:0;flex:1}
.d-inception-demo-crumbs ol{display:flex;align-items:center;list-style:none;min-width:0}
.d-inception-demo-crumb-item{display:flex;align-items:center;min-width:0}
.d-inception-demo-crumb-item[hidden]{display:none}
.d-inception-demo-sep{width:14px;height:14px;margin:0 2px;color:var(--zi-ink-3);flex:none}
.d-inception-demo-crumb{display:flex;align-items:center;gap:7px;height:28px;padding:0 7px;border-radius:7px;font-size:13px;font-weight:500;color:var(--zi-ink-2);white-space:nowrap;cursor:pointer;transition:background-color var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),color var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-crumb[aria-current="page"]{color:var(--zi-ink);cursor:default}
.d-inception-demo-logo{width:18px;height:18px;flex:none}
.d-inception-demo-logo rect{fill:var(--zi-acc);stroke:none}
.d-inception-demo-logo path{stroke:#fff;stroke-width:1.7}
.d-inception-demo-depth{display:flex;align-items:center;gap:7px;flex:none;color:var(--zi-ink-3)}
.d-inception-demo-depth svg{width:18px;height:18px;stroke-width:1.3}
.d-inception-demo-depth rect{transition:stroke var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-depth rect.is-on{stroke:var(--zi-acc)}
.d-inception-demo-depth-n{font:500 11px/1 "Geist Mono",ui-monospace,monospace;font-variant-numeric:tabular-nums;color:var(--zi-ink-3)}
.d-inception-demo-viewport{position:absolute;left:0;right:0;top:44px;bottom:0;overflow:hidden;background:var(--zi-screen)}
.d-inception-demo-screen{position:absolute;inset:0;padding:16px 18px 18px;transform-origin:0 0}
.d-inception-demo-screen[hidden]{display:none}
.d-inception-demo-screen[data-layer="under"]{z-index:0}
.d-inception-demo-screen[data-layer="over"]{z-index:2}
.d-inception-demo-surface{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;transform-origin:0 0;background:var(--zi-screen);box-shadow:inset 0 0 0 1px var(--zi-edge),0 20px 40px -16px rgba(0,0,0,.8);border-radius:12px;overflow:hidden;will-change:transform}
.d-inception-demo-surface[hidden]{display:none}
.d-inception-demo-surface-skin{position:absolute;inset:0;background:var(--zi-card)}
.d-inception-demo-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;height:44px}
.d-inception-demo-h{font-size:15px;font-weight:600;line-height:20px;letter-spacing:-.01em;outline:none}
.d-inception-demo-sub{margin-top:1px;font-size:12px;color:var(--zi-ink-3)}
.d-inception-demo-chip{display:inline-flex;align-items:center;gap:7px;height:24px;padding:0 9px;border-radius:999px;background:var(--zi-chip);font-size:11.5px;color:var(--zi-ink-2)}
.d-inception-demo-dot{width:7px;height:7px;border-radius:50%;background:var(--zi-ok)}
.d-inception-demo-dot--build{background:none;box-shadow:inset 0 0 0 1.5px var(--zi-acc);animation:d-inception-demo-pulse 1600ms var(--ease-in-out,cubic-bezier(.4,0,.2,1)) infinite}
@keyframes d-inception-demo-pulse{50%{box-shadow:inset 0 0 0 3.5px var(--zi-acc)}}
.d-inception-demo-grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;height:calc(100% - 44px)}
.d-inception-demo-proj{position:relative;display:flex;flex-direction:column;justify-content:space-between;min-width:0;padding:12px 12px 10px;border-radius:10px;background:var(--zi-card);box-shadow:inset 0 0 0 1px var(--zi-edge),inset 0 1px 0 rgba(255,255,255,.04),var(--zi-lift)}
button.d-inception-demo-proj,button.d-inception-demo-card{cursor:zoom-in;transition:box-shadow var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),background-color var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-proj-top{display:flex;align-items:center;gap:10px;min-width:0}
.d-inception-demo-proj-icon{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:8px;background:var(--zi-chip);box-shadow:inset 0 0 0 1px var(--zi-edge);color:var(--zi-ink-2)}
.d-inception-demo-proj-icon svg{width:16px;height:16px}
.d-inception-demo-proj-icon--acc{background:var(--zi-acc-soft);box-shadow:inset 0 0 0 1px rgba(250,115,25,.28);color:var(--zi-acc)}
.d-inception-demo-proj-name{display:flex;flex-direction:column;min-width:0;font-size:13px;font-weight:600;line-height:17px}
.d-inception-demo-proj-url{overflow:hidden;font:400 11px/15px "Geist Mono",ui-monospace,monospace;color:var(--zi-ink-3);white-space:nowrap;text-overflow:ellipsis}
.d-inception-demo-state{display:inline-flex;align-items:center;gap:6px;margin-left:auto;flex:none;font-size:11.5px;color:var(--zi-ink-2)}
.d-inception-demo-state::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--zi-ok)}
.d-inception-demo-state--build{color:var(--zi-acc-ink)}
.d-inception-demo-state--build::before{background:none;box-shadow:inset 0 0 0 1.5px var(--zi-acc)}
.d-inception-demo-spark{width:100%;height:30px;overflow:visible}
.d-inception-demo-spark-line{stroke:var(--zi-ink-3);stroke-width:1.5;vector-effect:non-scaling-stroke}
.d-inception-demo-spark-area{fill:rgba(255,255,255,.035);stroke:none}
.d-inception-demo-spark--acc .d-inception-demo-spark-line{stroke:var(--zi-acc)}
.d-inception-demo-spark--acc .d-inception-demo-spark-area{fill:rgba(250,115,25,.1)}
.d-inception-demo-proj-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11.5px;color:var(--zi-ink-3);font-variant-numeric:tabular-nums;white-space:nowrap}
.d-inception-demo-proj-foot b{font-weight:600;color:var(--zi-ink)}
.d-inception-demo-proj-when{display:flex;align-items:center;gap:6px}
.d-inception-demo-go{width:14px;height:14px;color:var(--zi-acc);transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-avs{display:flex;padding-top:2px}
.d-inception-demo-avs .d-inception-demo-av{margin-left:-3px;box-shadow:0 0 0 2px var(--zi-screen)}
.d-inception-demo-av{display:grid;place-items:center;flex:none;width:22px;height:22px;border-radius:50%;background:#333;color:#e5e5e5;font:600 11px/1 Geist,system-ui,sans-serif;letter-spacing:-.02em}
.d-inception-demo-av--ml{background:#7a3a10;color:#ffd9bd}
.d-inception-demo-av--oh{background:#3a3a3a}
.d-inception-demo-av--jk{background:#545454;color:#f5f5f5}
.d-inception-demo-board{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;height:calc(100% - 44px)}
.d-inception-demo-col{display:flex;flex-direction:column;gap:8px;min-width:0}
.d-inception-demo-col-head{display:flex;align-items:center;gap:7px;height:22px;font-size:12px;font-weight:500;color:var(--zi-ink-2)}
.d-inception-demo-col-head svg{width:15px;height:15px;color:var(--zi-ink-3)}
.d-inception-demo-col-head span{margin-left:2px;font:500 11px/1 "Geist Mono",ui-monospace,monospace;color:var(--zi-ink-3)}
.d-inception-demo-col--doing .d-inception-demo-col-head svg,.d-inception-demo-pill svg{color:var(--zi-acc)}
.d-inception-demo-fill{fill:currentColor;stroke:none}
.d-inception-demo-card{display:flex;flex-direction:column;gap:6px;min-width:0;padding:9px 10px 10px;border-radius:10px;background:var(--zi-card);box-shadow:inset 0 0 0 1px var(--zi-edge),inset 0 1px 0 rgba(255,255,255,.04),var(--zi-lift)}
.d-inception-demo-card-top{display:flex;align-items:center;justify-content:space-between}
.d-inception-demo-id{font:500 11px/1 "Geist Mono",ui-monospace,monospace;color:var(--zi-ink-3);letter-spacing:.01em}
.d-inception-demo-card-title{font-size:12.5px;font-weight:500;line-height:16px;color:var(--zi-ink)}
.d-inception-demo-card-foot{display:flex;align-items:center;gap:8px;margin-top:2px}
.d-inception-demo-tag{display:inline-flex;align-items:center;height:20px;padding:0 7px;border-radius:6px;background:var(--zi-chip);font-size:11px;font-weight:500;color:var(--zi-ink-2)}
.d-inception-demo-tag--acc{background:var(--zi-acc-soft);color:var(--zi-acc-ink)}
.d-inception-demo-prog{display:inline-flex;align-items:center;gap:6px;margin-left:auto;font:500 11px/1 "Geist Mono",ui-monospace,monospace;color:var(--zi-ink-3);font-variant-numeric:tabular-nums}
.d-inception-demo-prog svg{width:13px;height:13px;stroke-width:1.8}
.d-inception-demo-prog-bar{position:relative;width:34px;height:4px;border-radius:2px;background:var(--zi-chip);overflow:hidden}
.d-inception-demo-prog-bar i{position:absolute;inset:0;border-radius:2px;background:var(--zi-acc);transform-origin:0 50%;transform:scaleX(var(--zi-p,.6));transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-task{display:grid;grid-template-columns:1fr 168px;gap:22px;height:100%}
.d-inception-demo-task-main{min-width:0}
.d-inception-demo-kicker{display:flex;align-items:center;gap:8px;height:22px}
.d-inception-demo-pill,.d-inception-demo-prio{display:inline-flex;align-items:center;gap:5px;height:22px;padding:0 8px 0 6px;border-radius:999px;background:var(--zi-chip);font-size:11.5px;font-weight:500;color:var(--zi-ink-2)}
.d-inception-demo-pill svg,.d-inception-demo-prio svg{width:13px;height:13px}
.d-inception-demo-task-title{margin-top:8px;font-size:18px;line-height:24px}
.d-inception-demo-task-desc{margin-top:3px;font-size:12.5px;color:var(--zi-ink-2)}
.d-inception-demo-subs{margin-top:14px}
.d-inception-demo-subs-head{display:flex;justify-content:space-between;font-size:12px;font-weight:500;color:var(--zi-ink-2)}
.d-inception-demo-subs-count{font:500 11.5px/1 "Geist Mono",ui-monospace,monospace;color:var(--zi-ink-3);font-variant-numeric:tabular-nums}
.d-inception-demo-subs-bar{position:relative;display:block;height:4px;margin:8px 0 4px;border-radius:2px;background:var(--zi-chip);overflow:hidden}
.d-inception-demo-subs-bar i{position:absolute;inset:0;border-radius:2px;background:var(--zi-acc);transform-origin:0 50%;transform:scaleX(var(--zi-p,.6));transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-subtask{position:relative;display:flex;align-items:center;gap:10px;height:28px;padding:0 6px;margin:0 -6px;border-radius:7px;font-size:12.5px;cursor:pointer}
.d-inception-demo-subtask input{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none}
.d-inception-demo-box{display:grid;place-items:center;flex:none;width:16px;height:16px;border-radius:5px;box-shadow:inset 0 0 0 1.5px var(--zi-edge-hi);transition:background-color var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-fast,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-box svg{width:12px;height:12px;stroke:#fff;stroke-width:2;stroke-dasharray:14;stroke-dashoffset:14;transition:stroke-dashoffset var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-inception-demo-subtask input:checked+.d-inception-demo-box{background:var(--zi-acc);box-shadow:inset 0 0 0 1.5px var(--zi-acc)}
.d-inception-demo-subtask input:checked+.d-inception-demo-box svg{stroke-dashoffset:0}
.d-inception-demo-subtask input:checked~.d-inception-demo-subtask-text{color:var(--zi-ink-3);text-decoration:line-through;text-decoration-color:var(--zi-ink-3)}
.d-inception-demo-subtask input:focus-visible+.d-inception-demo-box{outline:2px solid var(--zi-acc);outline-offset:2px}
.d-inception-demo-side{display:flex;flex-direction:column;gap:12px;padding:2px 0 0 18px;box-shadow:inset 1px 0 0 var(--zi-line)}
.d-inception-demo-side dt{font-size:11px;font-weight:500;color:var(--zi-ink-3)}
.d-inception-demo-side dd{display:flex;align-items:center;gap:7px;margin-top:3px;font-size:12.5px;color:var(--zi-ink)}
.d-inception-demo-mono{font-family:"Geist Mono",ui-monospace,monospace;font-size:12px}
.d-inception-demo-live{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.d-inception-demo :is(button,.d-inception-demo-h):focus-visible{outline:2px solid var(--zi-acc);outline-offset:2px}
.d-inception-demo-h:focus-visible{outline-offset:4px;border-radius:4px}
@media (hover:hover){
.d-inception-demo-back:not(:disabled):hover,.d-inception-demo-crumb:not([aria-current]):hover{background:var(--zi-chip);color:var(--zi-ink)}
button.d-inception-demo-proj:hover,button.d-inception-demo-card:hover{background:var(--zi-card-hi);box-shadow:inset 0 0 0 1px var(--zi-acc-line),inset 0 1px 0 rgba(255,255,255,.05),var(--zi-lift)}
button.d-inception-demo-proj:hover .d-inception-demo-go{transform:translate(2px,-2px)}
.d-inception-demo-subtask:hover{background:var(--zi-chip)}
}
/* thumbnail: one focused crop per level */
.d-inception-demo[data-mode="thumb"] .d-inception-demo-app{border-radius:12px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-top{height:32px;gap:4px;padding:0 8px 0 6px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-viewport{top:32px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-back{width:22px;height:22px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-crumb{gap:5px;height:22px;padding:0 4px;font-size:max(11.5px,calc(11.5px / var(--fs)))}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-sep{width:12px;height:12px;margin:0}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-logo{width:15px;height:15px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-depth-n{display:none}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-depth svg{width:16px;height:16px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-screen{padding:10px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-head,.d-inception-demo[data-mode="thumb"] .d-inception-demo-proj:nth-child(n+3),.d-inception-demo[data-mode="thumb"] .d-inception-demo-col--review,.d-inception-demo[data-mode="thumb"] .d-inception-demo-side,.d-inception-demo[data-mode="thumb"] .d-inception-demo-task-desc,.d-inception-demo[data-mode="thumb"] .d-inception-demo-subs-head,.d-inception-demo[data-mode="thumb"] .d-inception-demo-subs-bar,.d-inception-demo[data-mode="thumb"] .d-inception-demo-subtask:nth-of-type(n+4),.d-inception-demo[data-mode="thumb"] .d-inception-demo-state,.d-inception-demo[data-mode="thumb"] .d-inception-demo-card-top,.d-inception-demo[data-mode="thumb"] .d-inception-demo-crumb-0,.d-inception-demo[data-mode="thumb"] .d-inception-demo-proj-when{display:none}
.d-inception-demo[data-mode="thumb"] :is(.d-inception-demo-grid,.d-inception-demo-board){grid-template-columns:1fr 1fr;grid-template-rows:1fr;gap:10px;height:100%;overflow:hidden}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-proj{padding:10px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-proj-top{gap:8px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-proj-icon{width:24px;height:24px;border-radius:7px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-proj-icon svg{width:14px;height:14px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-proj-name{font-size:max(12.5px,calc(12px / var(--fs)))}
.d-inception-demo[data-mode="thumb"] :is(.d-inception-demo-proj-url,.d-inception-demo-proj-foot,.d-inception-demo-id,.d-inception-demo-tag,.d-inception-demo-prog,.d-inception-demo-col-head,.d-inception-demo-pill,.d-inception-demo-prio,.d-inception-demo-av){font-size:max(11px,calc(11px / var(--fs)))}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-col{gap:6px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-col-head{height:18px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-card{gap:5px;padding:8px 9px 9px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-card-title{font-size:max(12px,calc(12px / var(--fs)))}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-task{display:block}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-kicker{height:20px;gap:6px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-task-title{margin-top:5px;font-size:max(15px,calc(14px / var(--fs)));line-height:20px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-subs{margin-top:5px}
.d-inception-demo[data-mode="thumb"] .d-inception-demo-subtask{height:24px;font-size:max(12px,calc(11px / var(--fs)))}
/* poster still: the task grows out of its board card */
.d-inception-demo[data-still] .d-inception-demo-screen[data-screen="1"]{transform:scale(1.06);opacity:.5;filter:blur(1px)}
.d-inception-demo[data-still] .d-inception-demo-screen[data-screen="2"]{right:auto;bottom:auto;overflow:hidden;border-radius:12px;background:var(--zi-screen);box-shadow:inset 0 0 0 1px var(--zi-edge-hi),inset 0 1px 0 rgba(255,255,255,.06),0 2px 6px rgba(0,0,0,.4),0 24px 40px -12px rgba(0,0,0,.85)}
[data-stage-theme="light"] .d-inception-demo{--zi-app:#fff;--zi-bar:#fafafa;--zi-screen:#f6f6f6;--zi-card:#fff;--zi-card-hi:#fff;--zi-chip:rgba(0,0,0,.05);--zi-edge:rgba(0,0,0,.09);--zi-edge-hi:rgba(0,0,0,.2);--zi-line:rgba(0,0,0,.08);--zi-ink:#171717;--zi-ink-2:#525252;--zi-ink-3:#737373;--zi-ok:#525252;--zi-acc-ink:#b84d06;--zi-acc-soft:rgba(250,115,25,.12);--zi-lift:0 1px 2px rgba(0,0,0,.06),0 6px 14px -8px rgba(0,0,0,.14)}
[data-stage-theme="light"] .d-inception-demo-app{box-shadow:inset 0 0 0 1px var(--zi-edge),0 0 0 1px rgba(0,0,0,.03),0 2px 4px rgba(0,0,0,.05),0 24px 56px -20px rgba(0,0,0,.22)}
[data-stage-theme="light"] .d-inception-demo-surface{box-shadow:inset 0 0 0 1px var(--zi-edge),0 20px 40px -16px rgba(0,0,0,.2)}
[data-stage-theme="light"] .d-inception-demo-spark-area{fill:rgba(0,0,0,.04)}
[data-stage-theme="light"] .d-inception-demo-av{background:#e5e5e5;color:#262626}
[data-stage-theme="light"] .d-inception-demo-av--ml{background:#fde1cc;color:#8a3a06}
[data-stage-theme="light"] .d-inception-demo-av--jk{background:#d4d4d4}
[data-stage-theme="light"] .d-inception-demo[data-still] .d-inception-demo-screen[data-screen="2"]{box-shadow:inset 0 0 0 1px var(--zi-edge),0 2px 6px rgba(0,0,0,.06),0 24px 40px -12px rgba(0,0,0,.25)}
@media (prefers-reduced-motion:reduce){
.d-inception-demo-dot--build{animation:none}
.d-inception-demo :is(.d-inception-demo-go,.d-inception-demo-box svg,.d-inception-demo-prog-bar i,.d-inception-demo-subs-bar i){transition:none}
}`,
 js:`const P='d-inception-demo',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
const thumb=ctx.mode==='thumb';
root.dataset.mode=ctx.mode;
root.style.setProperty('--fit-scale',String(ctx.scale||1));
const app=$('.'+P+'-app'),vp=$('.'+P+'-viewport'),surface=$('.'+P+'-surface'),skin=$('.'+P+'-surface-skin'),screens=$$('.'+P+'-screen'),doors=[$('[data-door="0"]'),$('[data-door="1"]')],items=$$('.'+P+'-crumb-item'),backBtn=$('.'+P+'-back'),rings=$$('.'+P+'-depth rect'),depthN=$('.'+P+'-depth-n'),live=$('.'+P+'-live');
const subs=$$('.'+P+'-subtask input'),subsCount=$('.'+P+'-subs-count');
const NAMES=['Projects','Storefront board','Checkout redesign'];
const EASE='cubic-bezier(.22,1,.36,1)',MOVE='cubic-bezier(.4,0,.2,1)';
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
let depth=0,anims=[],done=null,token=0,timer=0,dead=false;
// Rect of a door card inside the viewport, in design pixels (independent of the stage zoom).
function rectOf(el){const v=vp.getBoundingClientRect(),r=el.getBoundingClientRect(),k=v.width/vp.clientWidth||1;return{x:(r.left-v.left)/k,y:(r.top-v.top)/k,w:r.width/k,h:r.height/k,W:vp.clientWidth,H:vp.clientHeight};}
function chrome(){
 items.forEach((li,i)=>{const b=li.querySelector('button'),was=li.hidden;li.hidden=i>depth;if(i===depth)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');if(was&&!li.hidden&&!reduced)play(li,[{opacity:0,transform:'translateX(-6px)'},{opacity:1,transform:'none'}],{duration:250});});
 backBtn.disabled=depth===0;
 rings.forEach((r,i)=>r.classList.toggle('is-on',i===depth));
 depthN.textContent=(depth+1)+' / 3';
 app.setAttribute('aria-label','Halden workspace, '+NAMES[depth]);
 root.dataset.depth=String(depth);
}
function layers(under,over){screens.forEach((s,i)=>{s.hidden=i!==under&&i!==over;s.inert=i!==depth;s.dataset.layer=i===over?'over':i===under?'under':'';});}
function play(el,frames,opts){const a=el.animate(frames,Object.assign({easing:EASE,fill:'both'},opts));anims.push(a);return a;}
function settle(){if(done){const f=done;done=null;f();}}
function finishWith(main,fn){done=fn;const t=++token;main.finished.then(()=>{if(!dead&&t===token)settle();}).catch(()=>{});}
function cleanup(door,s){anims.forEach(a=>a.cancel());anims=[];surface.hidden=true;surface.style.borderRadius='';door.style.opacity='';s.style.transformOrigin='';layers(-1,depth);}
function geometry(r){const sx=r.w/r.W,sy=r.h/r.H;return{sx,sy,T:'translate('+r.x.toFixed(1)+'px,'+r.y.toFixed(1)+'px)',O:(r.x+r.w/2).toFixed(1)+'px '+(r.y+r.h/2).toFixed(1)+'px',R:(10/sx).toFixed(1)+'px / '+(10/sy).toFixed(1)+'px'};}
function focusIf(had,el){if(had&&el)el.focus({preventScroll:true});}
function say(text,to){live.textContent=text;ctx.emit('zoom',{depth:to,view:NAMES[to]});}
// Zoom in: the door card becomes a surface that grows to fill the viewport while the
// next screen rises out of it and the current screen pushes past the camera.
function zoomIn(){
 settle();
 if(depth>=2){zoomOut(0);return;}
 const from=depth,to=from+1,door=doors[from],a=screens[from],b=screens[to],had=root.contains(document.activeElement);
 const r=rectOf(door),g=geometry(r);
 depth=to;chrome();layers(from,to);say('Zoomed into '+NAMES[to],to);
 if(reduced){layers(-1,to);play(b,[{opacity:0},{opacity:1}],{duration:150});focusIf(had,b.querySelector('.'+P+'-h'));return;}
 door.style.opacity='0';surface.hidden=false;surface.style.borderRadius=g.R;a.style.transformOrigin=g.O;
 const main=play(surface,[{transform:g.T+' scale('+g.sx+','+g.sy+')'},{transform:'none'}],{duration:500,easing:MOVE});
 play(skin,[{opacity:1},{opacity:0}],{duration:250});
 play(b,[{transform:g.T+' scale('+g.sx+')',opacity:0},{opacity:0,offset:.16},{transform:'none',opacity:1}],{duration:500,easing:MOVE});
 play(a,[{transform:'none',opacity:1,filter:'blur(0px)'},{transform:'scale(1.45)',opacity:0,filter:'blur(3px)',offset:.6},{transform:'scale(1.6)',opacity:0,filter:'blur(3px)'}],{duration:500,easing:MOVE});
 finishWith(main,()=>cleanup(door,a));
 focusIf(had,b.querySelector('.'+P+'-h'));
}
// Zoom out: the current screen shrinks back into the card it came from.
function zoomOut(to){
 settle();
 if(to<0||to>=depth)return;
 const from=depth,a=screens[from],b=screens[to],door=doors[to],had=root.contains(document.activeElement);
 depth=to;chrome();layers(to,from);say('Zoomed out to '+NAMES[to],to);
 if(reduced){layers(-1,to);play(b,[{opacity:0},{opacity:1}],{duration:150});focusIf(had,door);return;}
 const r=rectOf(door),g=geometry(r);
 door.style.opacity='0';surface.hidden=false;surface.style.borderRadius=g.R;b.style.transformOrigin=g.O;
 const main=play(surface,[{transform:'none'},{transform:g.T+' scale('+g.sx+','+g.sy+')'}],{duration:400,easing:MOVE});
 play(skin,[{opacity:0},{opacity:0,offset:.55},{opacity:1}],{duration:400,easing:MOVE});
 play(a,[{transform:'none',opacity:1},{opacity:0,offset:.45},{transform:g.T+' scale('+g.sx+')',opacity:0}],{duration:400,easing:MOVE});
 play(b,[{transform:'scale(1.45)',opacity:0,filter:'blur(3px)'},{opacity:1,filter:'blur(0px)',offset:.7},{transform:'none',opacity:1,filter:'blur(0px)'}],{duration:400,easing:MOVE});
 finishWith(main,()=>cleanup(door,b));
 focusIf(had,door);
}
function back(){if(depth>0)zoomOut(depth-1);}
function progress(){
 const n=subs.filter(s=>s.checked).length,p=String(n/subs.length);
 root.style.setProperty('--zi-p',p);subsCount.textContent=n+' of '+subs.length;
 $('.'+P+'-prog-n').textContent=n+'/'+subs.length;
 doors[1].setAttribute('aria-label','Open Checkout redesign, STO-148, '+n+' of '+subs.length+' subtasks done');
}
doors.forEach(d=>on(d,'click',zoomIn));
on(backBtn,'click',back);
items.forEach(li=>on(li.querySelector('button'),'click',e=>{const to=+e.currentTarget.dataset.to;if(to<depth)zoomOut(to);}));
subs.forEach(s=>on(s,'change',()=>{progress();live.textContent=s.nextElementSibling.nextElementSibling.textContent+(s.checked?' done':' reopened');}));
on(root,'keydown',e=>{if(e.key==='Escape'&&depth>0){e.preventDefault();e.stopPropagation();back();}});
ctx.onAction('next',zoomIn);
ctx.onAction('back',back);
progress();chrome();layers(-1,0);
if(thumb&&reduced){
 // Poster still: the board recedes while the task grows out of its card, text kept at full size.
 depth=2;chrome();layers(1,2);
 const r=rectOf(doors[1]),k=.62,s=screens[2].style;
 s.left=(r.x*(1-k)).toFixed(1)+'px';s.top=(r.y*(1-k)).toFixed(1)+'px';s.width=(r.w+(r.W-r.w)*k).toFixed(1)+'px';s.height=(r.h+(r.H-r.h)*k).toFixed(1)+'px';
 screens[1].style.transformOrigin=(r.x+r.w/2).toFixed(1)+'px '+(r.y+r.h/2).toFixed(1)+'px';
 doors[1].style.opacity='0';root.dataset.still='true';
}else if(thumb){
 const loop=()=>{timer=setTimeout(()=>{if(dead)return;zoomIn();loop();},2400);};loop();
}
return()=>{dead=true;clearTimeout(timer);abort.abort();anims.forEach(a=>a.cancel());};
`,
 prompt:`Build "Zoom Into UI" as a three-level Halden workspace inside a 560 by 360 app frame (radius 14, inset hairline, two-layer shadow) with a 44px top bar: a back chevron, a breadcrumb (logo + Halden, then Storefront, then Checkout redesign) and a nested-squares depth glyph showing 1 / 3. Level 0 is a 2 by 2 grid of project cards (Storefront, Payments API, Docs, Mobile app) with a tinted icon, Geist Mono URL, status, an SVG sparkline and a tabular metric; only Storefront is a button. Level 1 is the Storefront sprint board with To do, In progress and In review columns of task cards (ID, initials avatar, title, tag, progress); only Checkout redesign STO-148 is a button. Level 2 is the task: status and priority pills, title, description, five real checkbox subtasks with drawn ticks and a progress bar that also drives the 3/5 bar on the board card, plus an assignee/due/sprint/linked/design side list. Zooming in is a container transform done with WAAPI on transform, opacity and filter only: measure the door card relative to the viewport (divide by the viewport's rendered/clientWidth ratio), hide it, grow a surface from translate(x,y) scale(w/W,h/H) to none in 500ms standard ease (.4,0,.2,1) with border-radius 10/sx by 10/sy, rise the next screen from the same translate with uniform scale(w/W) fading in after 16%, and push the current screen to scale 1.45 with blur and fade around the card centre. Zooming out mirrors it in 400ms back into the card. Interrupting settles the running transition first. The breadcrumb, Back, Escape and the Dock's Back zoom out; Zoom in at the deepest level returns to Projects. Move focus to the new heading (or back to the card) only when focus was already inside, announce each move politely, keep crumbs and depth glyph in sync. Thumbnail: a 300 by 168 crop (two cards or two columns, three subtasks) that loops every 2.4s; its reduced-motion poster is a still of the task panel growing out of its card over the dimmed board. Reduced motion swaps screens with a 150ms fade. Neutral greys plus #fa7319, light-stage tokens, every class prefixed d-inception-demo.`
});
