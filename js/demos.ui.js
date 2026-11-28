/* INTRX registry — LAYOUT & UI */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Mac-style minimize / maximize
------------------------------------------------------------ */
/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"mac-window",
 title:"Genie Minimize",
 cat:"Layout & UI",
 rootClass:"d-mac",
 tags:["window","genie","dock","drag","WAAPI"],
 libs:[],
 desc:"A code editor window with real traffic lights, a file tree and highlighted TypeScript pours itself into its Dock icon with a perspective genie, then rises back out. Drag it by the title bar, click the desktop to see its inactive state.",
 seen:"Pattern family: desktop window-to-dock transitions",
 hint:"Press · Minimize pours the window into its Dock icon; the icon brings it back",
 html:`<div class="d-mac" data-active="true" data-minimized="false">
  <div class="d-mac-pos">
    <section class="d-mac-window" role="group" aria-label="Editor window: checkout.ts in storefront">
      <header class="d-mac-bar">
        <div class="d-mac-lights">
          <span class="d-mac-light d-mac-light--close" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M3.8 3.8l4.4 4.4M8.2 3.8L3.8 8.2"/></svg></span>
          <button class="d-mac-light d-mac-light--min" type="button" aria-label="Minimize window"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.3 6h5.4"/></svg></button>
          <span class="d-mac-light d-mac-light--zoom" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M4 8V4.9L7.1 8zM8 4v3.1L4.9 4z"/></svg></span>
        </div>
        <div class="d-mac-title" tabindex="0" role="button" aria-roledescription="window title bar" aria-label="checkout.ts, storefront. Arrow keys move the window, double-click minimizes.">
          <svg class="d-mac-title-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.8h5.2L12.5 5v9.2H4z"/><path d="M9 1.8V5.3h3.4"/></svg>
          <span class="d-mac-title-file">checkout.ts</span><span class="d-mac-title-repo">storefront</span>
        </div>
        <div class="d-mac-tools" aria-hidden="true">
          <span class="d-mac-branch"><svg viewBox="0 0 16 16"><circle cx="4.5" cy="3.8" r="1.6"/><circle cx="4.5" cy="12.2" r="1.6"/><circle cx="11.5" cy="5.6" r="1.6"/><path d="M4.5 5.4v5.2M11.5 7.2c0 2.4-2.2 2.6-7 3.6"/></svg>main</span>
          <svg class="d-mac-tool" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.3"/><path d="M10.2 10.2L13.5 13.5"/></svg>
          <svg class="d-mac-tool" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M6.5 3v10"/></svg>
        </div>
      </header>
      <div class="d-mac-body">
        <nav class="d-mac-side" aria-label="Project files">
          <p class="d-mac-side-head">Storefront</p>
          <ul class="d-mac-tree">
            <li class="d-mac-node d-mac-node--dir"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 6.5l3 3 3-3"/></svg>src</li>
            <li class="d-mac-node d-mac-node--dir d-mac-in1"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 6.5l3 3 3-3"/></svg>checkout</li>
            <li class="d-mac-node d-mac-in2">cart.ts</li>
            <li class="d-mac-node d-mac-in2 d-mac-node--on" aria-current="page">checkout.ts</li>
            <li class="d-mac-node d-mac-in2">shipping.ts</li>
            <li class="d-mac-node d-mac-in1">money.ts</li>
            <li class="d-mac-node d-mac-in1">types.ts</li>
            <li class="d-mac-node d-mac-node--dir d-mac-node--shut"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 5l3 3-3 3"/></svg>tests</li>
            <li class="d-mac-node">package.json</li>
            <li class="d-mac-node">README.md</li>
          </ul>
        </nav>
        <div class="d-mac-editor">
          <div class="d-mac-tabs" aria-hidden="true"><span class="d-mac-tab d-mac-tab--on">checkout.ts<svg viewBox="0 0 12 12"><path d="M3.8 3.8l4.4 4.4M8.2 3.8L3.8 8.2"/></svg></span><span class="d-mac-tab">money.ts</span></div>
          <pre class="d-mac-code" aria-label="checkout.ts source"><code><span class="d-mac-ln"><i>1</i><b class="d-mac-k">import</b> { formatMoney } <b class="d-mac-k">from</b> <b class="d-mac-s">'./money'</b></span><span class="d-mac-ln"><i>2</i><b class="d-mac-k">import type</b> { <b class="d-mac-t">Cart</b>, <b class="d-mac-t">Region</b> } <b class="d-mac-k">from</b> <b class="d-mac-s">'./types'</b></span><span class="d-mac-ln"><i>3</i></span><span class="d-mac-ln"><i>4</i><b class="d-mac-c">// Totals stay in minor units (cents)</b></span><span class="d-mac-ln"><i>5</i><b class="d-mac-k">export function</b> <b class="d-mac-f">total</b>(cart: <b class="d-mac-t">Cart</b>, r: <b class="d-mac-t">Region</b>) {</span><span class="d-mac-ln"><i>6</i>  <b class="d-mac-k">const</b> sub = <b class="d-mac-f">sumLines</b>(cart.items)</span><span class="d-mac-ln d-mac-ln--on"><i>7</i>  <b class="d-mac-k">const</b> tax = Math.<b class="d-mac-f">round</b>(sub * r.vatRate)<span class="d-mac-caret" aria-hidden="true"></span></span><span class="d-mac-ln"><i>8</i>  <b class="d-mac-k">const</b> ship = sub &gt;= <b class="d-mac-n">5000</b> ? <b class="d-mac-n">0</b> : r.shipping</span><span class="d-mac-ln"><i>9</i>  <b class="d-mac-k">return</b> <b class="d-mac-f">formatMoney</b>(sub + tax + ship)</span><span class="d-mac-ln"><i>10</i>}</span></code></pre>
        </div>
      </div>
      <footer class="d-mac-status" aria-hidden="true"><span><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7"/></svg>No problems</span><span>Ln 7, Col 41</span><span>TypeScript</span></footer>
    </section>
  </div>
  <div class="d-mac-dock" aria-label="Dock">
    <span class="d-mac-app d-mac-app--files" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.5 7.5a2 2 0 0 1 2-2h3.8l2 2h7.2a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/><path d="M3.5 10.2h17"/></svg><i></i></span>
    <button class="d-mac-app d-mac-app--editor" type="button" aria-label="Editor, window open"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 7.6L4.2 12l4.4 4.4M15.4 7.6l4.4 4.4-4.4 4.4M13.4 5.8l-2.8 12.4"/></svg><i></i></button>
    <span class="d-mac-app d-mac-app--term" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5L10 12l-3.5 3.5M12.5 16h5"/></svg><i></i></span>
    <span class="d-mac-app d-mac-app--mail" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.8" y="6.2" width="16.4" height="11.6" rx="2"/><path d="M4.6 7.4l7.4 5.6 7.4-5.6"/></svg></span>
    <span class="d-mac-app d-mac-app--cal" aria-hidden="true"><em>Nov</em><strong>29</strong></span>
    <span class="d-mac-sep" aria-hidden="true"></span>
    <span class="d-mac-app d-mac-app--bin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5.5 7.5h13M10 7.5V5.8h4v1.7M7.2 7.5l.9 11h7.8l.9-11M10.6 10.8v4.6M13.4 10.8v4.6"/></svg></span>
  </div>
  <p class="d-mac-live" role="status" aria-live="polite"></p>
</div>`,
 css:`.d-mac{--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.16);--accent:#fa7319;--win:#161616;--bar:#1d1d1d;--side:#191919;--code:#c4c4c4;--k:#ff9a55;--s:#d9d9d9;--t:#ffc8a0;--n:#ffb27a;--c:#7a7a7a;--f:#f5f5f5;--fs:var(--fit-scale,1);position:relative;width:100%;height:100%;color:var(--ink);font:400 12px/1.4 Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;user-select:none}
.d-mac *{box-sizing:border-box}
.d-mac-pos{position:absolute;left:40px;top:12px;width:520px;height:304px;z-index:2}
.d-mac-window{position:relative;display:grid;grid-template-rows:38px 1fr 24px;width:100%;height:100%;border-radius:12px;overflow:hidden;background:var(--win);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.07),0 0 0 1px rgba(0,0,0,.55),0 2px 4px rgba(0,0,0,.3),0 28px 56px -18px rgba(0,0,0,.75);transform-origin:50% 100%;transition:box-shadow var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-mac[data-active="false"] .d-mac-window{box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.05),0 0 0 1px rgba(0,0,0,.45),0 14px 32px -16px rgba(0,0,0,.6)}
.d-mac-bar{position:relative;display:flex;align-items:center;gap:12px;padding:0 12px 0 14px;background:linear-gradient(#222,#1c1c1c);box-shadow:inset 0 -1px 0 rgba(0,0,0,.5),inset 0 -2px 0 rgba(255,255,255,.03);cursor:grab;touch-action:none}
.d-mac.is-dragging .d-mac-bar{cursor:grabbing}
.d-mac-lights{display:flex;gap:8px;z-index:1}
.d-mac-light{display:grid;place-items:center;width:12px;height:12px;padding:0;border:0;border-radius:50%;background:var(--lc);box-shadow:inset 0 0 0 .5px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.18);cursor:default;transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-mac-light svg{width:12px;height:12px;fill:none;stroke:rgba(0,0,0,.62);stroke-width:1.25;stroke-linecap:round;opacity:0;transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-mac-light--zoom svg{fill:rgba(0,0,0,.6);stroke:none}
.d-mac-light--close{--lc:#ff5f57}.d-mac-light--min{--lc:#febc2e;cursor:pointer}.d-mac-light--zoom{--lc:#28c840}
.d-mac[data-active="false"] .d-mac-light{--lc:#3a3a3a}
.d-mac-lights:focus-within .d-mac-light svg{opacity:1}
@media (hover:hover){.d-mac-lights:hover .d-mac-light svg{opacity:1}.d-mac[data-active="false"] .d-mac-lights:hover .d-mac-light--close{--lc:#ff5f57}.d-mac[data-active="false"] .d-mac-lights:hover .d-mac-light--min{--lc:#febc2e}.d-mac[data-active="false"] .d-mac-lights:hover .d-mac-light--zoom{--lc:#28c840}}
.d-mac-title{position:absolute;left:50%;top:50%;display:flex;align-items:center;gap:6px;padding:3px 8px;border-radius:6px;transform:translate(-50%,-50%);white-space:nowrap;font-size:12.5px;font-weight:500;color:var(--ink);transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-mac-title-icon{width:14px;height:14px;fill:none;stroke:var(--ink-2);stroke-width:1.2;stroke-linejoin:round}
.d-mac-title-repo{color:var(--ink-3);font-weight:400}.d-mac-title-repo::before{content:'\\2014';margin:0 6px 0 2px}
.d-mac[data-active="false"] .d-mac-title{color:var(--ink-3)}
.d-mac-tools{display:flex;align-items:center;gap:10px;margin-left:auto}
.d-mac-branch{display:flex;align-items:center;gap:5px;height:22px;padding:0 8px;border-radius:6px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:var(--ink-2);background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px var(--edge)}
.d-mac-branch svg,.d-mac-tool{width:14px;height:14px;fill:none;stroke:var(--ink-3);stroke-width:1.3;stroke-linecap:round}
.d-mac-body{display:grid;grid-template-columns:150px 1fr;min-height:0}
.d-mac-side{padding:10px 8px;background:var(--side);box-shadow:inset -1px 0 0 rgba(0,0,0,.45),inset -2px 0 0 rgba(255,255,255,.025);overflow:hidden}
.d-mac-side-head{margin:0 0 6px 6px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
.d-mac-tree{margin:0;padding:0;list-style:none}
.d-mac-node{display:flex;align-items:center;gap:4px;height:22px;padding:0 6px 0 22px;border-radius:5px;font-size:12px;color:var(--ink-2);white-space:nowrap}
.d-mac-node--dir{padding-left:6px;color:var(--ink)}
.d-mac-node svg{width:12px;height:12px;flex:none;fill:none;stroke:var(--ink-3);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
.d-mac-in1{padding-left:22px}.d-mac-node--dir.d-mac-in1{padding-left:14px}.d-mac-in2{padding-left:38px}
.d-mac-node--on{color:var(--ink);background:rgba(255,255,255,.07);box-shadow:inset 2px 0 0 var(--accent)}
.d-mac[data-active="false"] .d-mac-node--on{box-shadow:inset 2px 0 0 #5a5a5a}
.d-mac-editor{display:grid;grid-template-rows:30px 1fr;min-width:0}
.d-mac-tabs{display:flex;background:#141414;box-shadow:inset 0 -1px 0 rgba(255,255,255,.05)}
.d-mac-tab{display:flex;align-items:center;gap:6px;padding:0 12px;font-size:12px;color:var(--ink-3);box-shadow:inset -1px 0 0 rgba(255,255,255,.05)}
.d-mac-tab--on{color:var(--ink);background:var(--win);box-shadow:inset -1px 0 0 rgba(255,255,255,.05),inset 0 1px 0 var(--accent)}
.d-mac[data-active="false"] .d-mac-tab--on{box-shadow:inset -1px 0 0 rgba(255,255,255,.05),inset 0 1px 0 #5a5a5a}
.d-mac-tab svg{width:12px;height:12px;fill:none;stroke:var(--ink-3);stroke-width:1.2;stroke-linecap:round}
.d-mac-code{margin:0;padding:10px 0;overflow:hidden;font:400 12px/19px 'Geist Mono',ui-monospace,monospace;color:var(--code);font-variant-ligatures:none}
.d-mac-code code{font:inherit}
.d-mac-ln{position:relative;display:block;min-height:19px;padding-left:44px;white-space:pre}
.d-mac-ln i{position:absolute;left:0;width:30px;text-align:right;font-style:normal;font-size:11px;color:#545454}
.d-mac-ln--on{background:rgba(255,255,255,.035)}.d-mac-ln--on i{color:var(--ink-2)}
.d-mac-code b{font-weight:400}.d-mac-k{color:var(--k)}.d-mac-s{color:var(--s)}.d-mac-t{color:var(--t)}.d-mac-n{color:var(--n)}.d-mac-c{color:var(--c);font-style:italic}.d-mac-f{color:var(--f)}
.d-mac-caret{display:inline-block;width:2px;height:15px;margin:0 0 -3px 1px;background:var(--accent);animation:d-mac-blink 1.1s steps(1) infinite}
.d-mac[data-active="false"] .d-mac-caret{opacity:0;animation:none}
@keyframes d-mac-blink{50%{opacity:0}}
.d-mac-status{display:flex;align-items:center;gap:16px;padding:0 12px;font-size:11px;color:var(--ink-3);background:#141414;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
.d-mac-status span{display:flex;align-items:center;gap:5px}.d-mac-status span:first-child{margin-right:auto}
.d-mac-status svg{width:12px;height:12px;fill:none;stroke:var(--ink-2);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.d-mac-dock{position:absolute;left:50%;bottom:6px;display:flex;align-items:flex-start;gap:7px;padding:7px 9px 9px;border-radius:18px;transform:translateX(-50%);background:linear-gradient(rgba(44,44,44,.82),rgba(30,30,30,.86));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.08),0 1px 2px rgba(0,0,0,.4),0 16px 32px -12px rgba(0,0,0,.7);z-index:1}
.d-mac-app{position:relative;display:grid;place-items:center;width:42px;height:42px;padding:0;border:0;border-radius:11px;background:linear-gradient(#323232,#1f1f1f);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.14),0 1px 2px rgba(0,0,0,.5);color:#ededed}
.d-mac-app svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.d-mac-app i{position:absolute;left:50%;bottom:-7px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:#d4d4d4}
.d-mac-app--editor{background:linear-gradient(#ff8f45,#e4570b);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18),inset 0 1px 0 rgba(255,255,255,.35),0 1px 2px rgba(0,0,0,.5),0 6px 14px -6px rgba(250,115,25,.55);color:#fff;cursor:pointer;transition:transform var(--dur-fast,250ms) var(--ease-pop,cubic-bezier(.34,1.36,.64,1))}
.d-mac-app--editor:active{transform:scale(.94);transition-duration:var(--dur-micro,80ms)}
.d-mac-app--editor:focus-visible,.d-mac-light--min:focus-visible,.d-mac-title:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-mac-app--term{background:linear-gradient(#1a1a1a,#0b0b0b);color:#d9d9d9}
.d-mac-app--mail{background:linear-gradient(#f5f5f5,#d6d6d6);color:#3a3a3a}
.d-mac-app--cal{display:flex;flex-direction:column;justify-content:center;gap:0;background:linear-gradient(#fafafa,#e3e3e3);color:#262626}
.d-mac-app--cal em{font:600 11px/11px Geist,system-ui,sans-serif;font-style:normal;letter-spacing:.04em;text-transform:uppercase;color:#e4570b}
.d-mac-app--cal strong{font:600 19px/20px Geist,system-ui,sans-serif;letter-spacing:-.03em}
.d-mac-app--bin{background:linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.04));color:#cfcfcf}
.d-mac-sep{align-self:stretch;width:1px;margin:2px 2px 0;background:rgba(255,255,255,.12)}
.d-mac[data-minimized="true"] .d-mac-pos{pointer-events:none}
.d-mac-live{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
/* Thumbnail: the window above its Dock icon, sized for a library tile. */
.d-mac[data-mode="thumb"] .d-mac-pos{left:8px;top:2px;width:284px;height:120px}
.d-mac[data-mode="thumb"] .d-mac-window{grid-template-rows:28px 1fr;border-radius:10px}
.d-mac[data-mode="thumb"] .d-mac-bar{padding:0 10px}.d-mac[data-mode="thumb"] .d-mac-lights{gap:7px}
.d-mac[data-mode="thumb"] .d-mac-light{width:11px;height:11px}
.d-mac[data-mode="thumb"] :is(.d-mac-side,.d-mac-tabs,.d-mac-status,.d-mac-tools,.d-mac-title-repo,.d-mac-app--cal,.d-mac-app--mail){display:none}
.d-mac[data-mode="thumb"] .d-mac-body,.d-mac[data-mode="thumb"] .d-mac-editor{grid-template-columns:1fr;grid-template-rows:1fr}
.d-mac[data-mode="thumb"] .d-mac-code{padding:6px 0;font-size:max(11px,calc(11px / var(--fs)));line-height:17px}
.d-mac[data-mode="thumb"] .d-mac-ln:nth-child(-n+3){display:none}
.d-mac[data-mode="thumb"] .d-mac-code{-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent);mask-image:linear-gradient(90deg,#000 82%,transparent)}
.d-mac[data-mode="thumb"] .d-mac-ln{min-height:17px;padding-left:30px}.d-mac[data-mode="thumb"] .d-mac-ln i{width:20px;font-size:max(11px,calc(11px / var(--fs)))}
.d-mac[data-mode="thumb"] .d-mac-title{font-size:max(12px,calc(11px / var(--fs)))}
.d-mac[data-mode="thumb"] .d-mac-dock{bottom:0;gap:6px;padding:5px 7px 7px;border-radius:14px}
.d-mac[data-mode="thumb"] .d-mac-app{width:32px;height:32px;border-radius:9px}
.d-mac[data-mode="thumb"] .d-mac-app svg{width:19px;height:19px}
.d-mac[data-mode="thumb"] .d-mac-app i{bottom:-6px;width:3px;height:3px;margin-left:-1.5px}
[data-stage-theme="light"] .d-mac{--ink:#171717;--ink-2:#525252;--ink-3:#6b6b6b;--edge:rgba(0,0,0,.1);--edge-hi:rgba(0,0,0,.16);--win:#fff;--side:#f6f6f6;--code:#3a3a3a;--k:#c2500a;--s:#404040;--t:#9a4a12;--n:#c2500a;--c:#8a8a8a;--f:#111}
[data-stage-theme="light"] .d-mac-window{box-shadow:inset 0 0 0 1px var(--edge),0 0 0 1px rgba(0,0,0,.04),0 2px 4px rgba(0,0,0,.06),0 28px 56px -18px rgba(0,0,0,.28)}
[data-stage-theme="light"] .d-mac-bar{background:linear-gradient(#f7f7f7,#efefef);box-shadow:inset 0 -1px 0 rgba(0,0,0,.08)}
[data-stage-theme="light"] :is(.d-mac-tabs,.d-mac-status){background:#f4f4f4;box-shadow:inset 0 -1px 0 rgba(0,0,0,.06)}
[data-stage-theme="light"] .d-mac-side{box-shadow:inset -1px 0 0 rgba(0,0,0,.07)}
[data-stage-theme="light"] .d-mac-node--on{background:rgba(0,0,0,.06)}
[data-stage-theme="light"] .d-mac-ln i{color:#a3a3a3}[data-stage-theme="light"] .d-mac-ln--on{background:rgba(0,0,0,.035)}
[data-stage-theme="light"] .d-mac-dock{background:linear-gradient(rgba(255,255,255,.8),rgba(240,240,240,.86));box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),0 16px 32px -12px rgba(0,0,0,.25)}
[data-stage-theme="light"] .d-mac[data-active="false"] .d-mac-light{--lc:#d4d4d4}
[data-stage-theme="light"] .d-mac-app--bin{background:linear-gradient(#e9e9e9,#d9d9d9);color:#404040}
@media (prefers-reduced-motion:reduce){.d-mac *{transition-duration:var(--dur-quick,150ms)!important}.d-mac-caret{animation:none}}`,
 js:`const C='d-mac',$=s=>root.querySelector(s);
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
root.dataset.mode=ctx.mode;
const pos=$('.'+C+'-pos'),win=$('.'+C+'-window'),bar=$('.'+C+'-bar'),title=$('.'+C+'-title'),minBtn=$('.'+C+'-light--min'),app=$('.'+C+'-app--editor'),dock=$('.'+C+'-dock'),live=$('.'+C+'-live');
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
let minimized=false,anim=null,drag=null,off={x:0,y:0},touched=false,timer=0,dead=false;
const EASE_OUT='cubic-bezier(.22,1,.36,1)',EASE_CLOSE='cubic-bezier(.4,0,.2,1)';
function place(){pos.style.transform='translate('+off.x+'px,'+off.y+'px)';}
// The genie: the window tilts toward the viewer around its bottom edge, narrows into a funnel and drains into the Dock icon.
function genie(){
 const W=win.offsetWidth,H=win.offsetHeight;
 const fromX=pos.offsetLeft+off.x+W/2,fromY=pos.offsetTop+off.y+H;
 const toX=dock.offsetLeft-dock.offsetWidth/2+app.offsetLeft+app.offsetWidth/2,toY=dock.offsetTop+app.offsetTop+app.offsetHeight*.8;
 const dx=toX-fromX,dy=toY-fromY,s=app.offsetWidth*.7/W;
 // Bottom edge stays at z=0 while the tilted top is magnified by the perspective, so the window reads as a funnel.
 const f=(x,y,rx,sx,sy,o,offset)=>({transform:'translate('+x.toFixed(2)+'px,'+y.toFixed(2)+'px) perspective(800px) rotateX('+rx+'deg) scale('+sx.toFixed(4)+','+sy.toFixed(4)+')',opacity:o,offset});
 return[f(0,0,0,1,1,1,0),f(dx*.12,dy*.28,-45,.72,1.02,1,.2),f(dx*.3,dy*.6,-70,.42,1.45,1,.42),f(dx*.86,dy,-78,.15,1.1,1,.76),f(dx,dy,-80,s,.6,0,1)];
}
function say(text){live.textContent=text;}
function set(next,user){
 if(user){touched=true;clearTimeout(timer);}
 if(next===minimized)return;
 minimized=next;root.dataset.minimized=String(next);win.inert=next;
 app.setAttribute('aria-label',next?'Editor, restore checkout.ts window':'Editor, window open');
 if(next&&win.contains(document.activeElement))app.focus({preventScroll:true});
 if(reduced){if(anim)anim.cancel();anim=win.animate([{opacity:next?1:0},{opacity:next?0:1}],{duration:150,easing:'ease-in-out',fill:'forwards'});}
 else if(anim&&anim.playState==='running'){anim.reverse();}
 else{
  if(anim)anim.cancel();
  const frames=genie();
  anim=win.animate(next?frames:frames.slice().reverse().map(k=>Object.assign({},k,{offset:1-k.offset})),{duration:next?400:500,easing:next?EASE_CLOSE:EASE_OUT,fill:'forwards'});
 }
 const current=anim;anim.finished.then(()=>{if(dead||anim!==current)return;if(!minimized){current.cancel();anim=null;}}).catch(()=>{});
 if(!next){root.dataset.active='true';}
 say(next?'Window minimized to the Dock':'Window restored');
 ctx.emit('window',{minimized:next});
}
on(minBtn,'click',e=>{e.stopPropagation();set(true,true);});
on(app,'click',()=>{if(minimized){set(false,true);if(ctx.mode==='full')title.focus({preventScroll:true});}else{root.dataset.active='true';}});
on(bar,'dblclick',e=>{if(!e.target.closest('.'+C+'-lights'))set(true,true);});
// Focus: the desktop deactivates the window, anything inside it reactivates.
on(root,'pointerdown',e=>{root.dataset.active=String(!!e.target.closest('.'+C+'-pos,.'+C+'-dock'));});
on(win,'focusin',()=>{root.dataset.active='true';});
function clamp(){const W=win.offsetWidth,H=win.offsetHeight,minX=-pos.offsetLeft,maxX=root.offsetWidth-pos.offsetLeft-W,minY=-pos.offsetTop,maxY=root.offsetHeight-pos.offsetTop-H*.4;off.x=Math.min(maxX,Math.max(minX,off.x));off.y=Math.min(maxY,Math.max(minY,off.y));}
on(bar,'pointerdown',e=>{
 if(e.button!==0||minimized||e.target.closest('button'))return;
 touched=true;clearTimeout(timer);
 drag={id:e.pointerId,x:e.clientX,y:e.clientY,ox:off.x,oy:off.y};bar.setPointerCapture(e.pointerId);root.classList.add('is-dragging');
});
on(bar,'pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const k=ctx.scale||1;off.x=drag.ox+(e.clientX-drag.x)/k;off.y=drag.oy+(e.clientY-drag.y)/k;clamp();place();});
const end=e=>{if(!drag||e.pointerId!==drag.id)return;drag=null;root.classList.remove('is-dragging');ctx.emit('window',{x:off.x,y:off.y});};
on(bar,'pointerup',end);on(bar,'pointercancel',end);
on(title,'keydown',e=>{
 const step=e.shiftKey?40:10,moves={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]};
 if(moves[e.key]){e.preventDefault();e.stopPropagation();off.x+=moves[e.key][0];off.y+=moves[e.key][1];clamp();place();}
 else if(e.key==='Enter'||e.key===' '){e.preventDefault();set(true,true);}
});
ctx.onAction('toggle',()=>set(!minimized,true));
const fit=()=>root.style.setProperty('--fit-scale',String(ctx.scale||1));
const ro=new ResizeObserver(fit);ro.observe(stage);fit();
// Library tiles play the minimize and restore on their own until someone takes over.
function loop(){timer=setTimeout(()=>{if(touched||dead)return;set(!minimized,false);loop();},minimized?1300:2600);}
if(ctx.mode==='thumb'&&!reduced)loop();
return()=>{dead=true;clearTimeout(timer);abort.abort();ro.disconnect();if(anim)anim.cancel();};`,
 prompt:`Build a macOS-style window minimize in plain HTML, CSS and JavaScript with no libraries. Compose a 600×400 scene: a 520×304 code-editor window (radius 12px, surface built from an inset 1px rgba(255,255,255,.09) hairline, a 1px top highlight, a dark outer ring and a long soft drop shadow) above a translucent Dock. The window has a 38px title bar with three 12px traffic lights (#ff5f57, #febc2e, #28c840; only the yellow one is a real Minimize button, the others are decorative), a centred title "checkout.ts — storefront" with a file glyph, and a right-hand toolbar with a "main" branch chip and two stroke icons. Below it a 150px file tree (Storefront: src › checkout › cart.ts, checkout.ts (current, 2px orange inset edge), shipping.ts; money.ts, types.ts, tests, package.json, README.md), a tab strip and eleven lines of TypeScript in Geist Mono 12/19 with line numbers: keywords in orange #ff9a55, types and numbers in lighter tints of the same orange, comments in italic grey, functions near-white, a highlighted current line with a blinking 2px orange caret. A 24px status bar reads No problems · Ln 7, Col 41 · TypeScript. The Dock holds 42px squircle app icons drawn as inline SVG strokes: Files (graphite), the Editor (orange gradient, the only interactive icon), Terminal, Mail (light), a Calendar showing NOV 29, a hairline divider and a Bin; running apps carry 4px dots. Minimize plays a genie with the Web Animations API: transform-origin at the window's bottom centre, keyframes translate toward the Editor icon while perspective(760px) rotateX tilts the top toward the viewer (0 → -24deg → -46deg → -52deg) and scale narrows it into a funnel (1 → .9/.82 → ~.18/.12 → icon size) with opacity reaching 0 at the end; 400ms cubic-bezier(.4,0,.2,1) out and 500ms cubic-bezier(.22,1,.36,1) back in from the reversed keyframes. Toggling mid-flight calls reverse() so the window retraces its path. The window is inert while minimized, focus moves to the Editor icon, and a polite status announces the change. Drag the window by its title bar with pointer capture (divide pointer deltas by the stage scale, clamp to the scene); arrow keys on the focused title move it 10px (Shift 40px), Enter or a double-click minimizes. Pressing the empty desktop makes the window inactive: grey traffic lights, dimmer title, grey caret edge, smaller shadow; hovering the lights reveals their ×, − and expand glyphs. Thumbnail mode shows a 280×158 window with code only above a smaller Dock and loops minimize and restore until touched. Reduced motion swaps the genie for a 150ms opacity fade and stops the caret blinking. Include a light stage theme.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"dock-magnify",
 title:"Dock Magnify",
 cat:"Layout & UI",
 rootClass:"d-dock",
 tags:["dock","magnify","proximity","cosine","cursor"],
 libs:[],
 desc:"A desktop Dock of six crafted app icons and a Bin. Icons swell around the pointer on a cosine falloff and push their neighbours aside, the rail widens with them, a label names the app under the pointer and a launch bounce lights its running dot.",
 seen:"Pattern family: desktop dock magnification",
 hint:"Hover · Icons swell around the pointer; click one to launch it",
 html:`<div class="d-dock" role="toolbar" aria-label="Dock" aria-orientation="horizontal">
  <div class="d-dock-bar" aria-hidden="true"></div>
  <div class="d-dock-dots" aria-hidden="true"></div>
  <div class="d-dock-row">
    <button class="d-dock-app" type="button" data-name="Files" data-running="true" aria-label="Files, open" tabindex="0"><span class="d-dock-tile d-dock-tile--files"><svg viewBox="0 0 24 24"><path d="M3.5 7.5a2 2 0 0 1 2-2h3.8l2 2h7.2a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/><path d="M3.5 10.2h17"/></svg></span></button>
    <button class="d-dock-app" type="button" data-name="Mail" data-running="true" aria-label="Mail, open" tabindex="-1"><span class="d-dock-tile d-dock-tile--mail"><svg viewBox="0 0 24 24"><rect x="3.6" y="6" width="16.8" height="12" rx="2.2"/><path d="M4.4 7.3l7.6 5.7 7.6-5.7"/></svg></span></button>
    <button class="d-dock-app" type="button" data-name="Calendar" data-running="false" aria-label="Calendar" tabindex="-1"><span class="d-dock-tile d-dock-tile--cal"><svg viewBox="0 0 24 24"><path class="d-dock-cal-head" d="M4 8.6V7.2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.4z"/><rect x="4" y="5.2" width="16" height="14.6" rx="2"/><path d="M8.2 3.6v3.2M15.8 3.6v3.2"/><circle class="d-dock-cal-day" cx="8.4" cy="12.4" r=".95"/><circle class="d-dock-cal-day" cx="12" cy="12.4" r=".95"/><circle class="d-dock-cal-day" cx="15.6" cy="12.4" r=".95"/><circle class="d-dock-cal-day" cx="8.4" cy="16" r=".95"/><circle class="d-dock-cal-today" cx="12" cy="16" r="1.5"/></svg></span></button>
    <button class="d-dock-app" type="button" data-name="Notes" data-running="false" aria-label="Notes" tabindex="-1"><span class="d-dock-tile d-dock-tile--notes"><svg viewBox="0 0 24 24"><path d="M6.5 4.5h11v15h-11z"/><path d="M9 9h6M9 12h6M9 15h3.6"/></svg></span></button>
    <button class="d-dock-app" type="button" data-name="Music" data-running="true" aria-label="Music, open" tabindex="-1"><span class="d-dock-tile d-dock-tile--music"><svg viewBox="0 0 24 24"><path d="M9.5 17V6.6l9-1.8V15"/><circle cx="7.4" cy="17" r="2.2"/><circle cx="16.4" cy="15" r="2.2"/></svg></span></button>
    <button class="d-dock-app" type="button" data-name="Terminal" data-running="true" aria-label="Terminal, open" tabindex="-1"><span class="d-dock-tile d-dock-tile--term"><svg viewBox="0 0 24 24"><path d="M6.5 8.5L10 12l-3.5 3.5M12.5 16h5"/></svg></span></button>
    <span class="d-dock-sep" aria-hidden="true"></span>
    <button class="d-dock-app" type="button" data-name="Bin" data-running="false" data-fixed="true" aria-label="Bin" tabindex="-1"><span class="d-dock-tile d-dock-tile--bin"><svg viewBox="0 0 24 24"><path d="M5.5 7.5h13M10 7.5V5.8h4v1.7M7.2 7.5l.9 11h7.8l.9-11M10.6 10.8v4.6M13.4 10.8v4.6"/></svg></span></button>
  </div>
  <div class="d-dock-tip" aria-hidden="true"><span class="d-dock-tip-label"></span></div>
  <p class="d-dock-live" role="status" aria-live="polite"></p>
</div>`,
 css:`.d-dock{--ink:#f2f2f2;--edge:rgba(255,255,255,.09);--accent:#fa7319;--fs:var(--fit-scale,1);position:relative;width:100%;height:100%;font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;user-select:none}
.d-dock *{box-sizing:border-box}
.d-dock-bar{position:absolute;bottom:10px;height:54px;border-radius:18px;background:linear-gradient(rgba(46,46,46,.88),rgba(30,30,30,.92));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.09),0 1px 2px rgba(0,0,0,.45),0 18px 36px -14px rgba(0,0,0,.75);transform-origin:50% 50%}
.d-dock-row{position:absolute;left:0;right:0;bottom:19px;display:flex;justify-content:center;align-items:flex-end;gap:6px;height:36px}
.d-dock-app{position:relative;flex:none;width:36px;height:36px;padding:0;border:0;border-radius:10px;background:none;cursor:pointer;transform-origin:50% 100%;-webkit-tap-highlight-color:transparent}
.d-dock-app:focus-visible{outline:none}
.d-dock-app:focus-visible .d-dock-tile{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-dock-tile{display:grid;place-items:center;width:100%;height:100%;border-radius:10px;background:linear-gradient(#343434,#1e1e1e);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.15),0 1px 2px rgba(0,0,0,.5),0 4px 10px -4px rgba(0,0,0,.6);color:#ededed}
.d-dock-tile svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.d-dock-tile--mail{background:linear-gradient(#ff9248,#e3560b);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16),inset 0 1px 0 rgba(255,255,255,.35),0 1px 2px rgba(0,0,0,.5),0 6px 14px -6px rgba(250,115,25,.6);color:#fff}
.d-dock-tile--cal{background:linear-gradient(#fbfbfb,#e2e2e2);color:#2a2a2a}
.d-dock-cal-head{fill:#fa7319;stroke:none}.d-dock-cal-day{fill:#3a3a3a;stroke:none}.d-dock-cal-today{fill:#fa7319;stroke:none}
.d-dock-tile--notes{background:linear-gradient(#fff3e6,#ffd9b8);color:#9a4410}
.d-dock-tile--music{background:linear-gradient(#262626,#121212);color:#ff9248}
.d-dock-tile--term{background:linear-gradient(#171717,#050505);color:#d9d9d9}
.d-dock-tile--bin{background:linear-gradient(rgba(255,255,255,.13),rgba(255,255,255,.05));color:#d4d4d4}
.d-dock-sep{flex:none;align-self:center;width:1px;height:34px;margin:0 3px;background:rgba(255,255,255,.13)}
.d-dock-dots{position:absolute;left:0;right:0;bottom:13px;height:4px}
.d-dock-dot{position:absolute;top:0;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:#d9d9d9;opacity:0;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-dock-dot[data-on="true"]{opacity:1}
.d-dock-tip{position:absolute;left:0;top:0;pointer-events:none;z-index:2}
.d-dock-tip-label{display:block;padding:5px 10px;border-radius:8px;white-space:nowrap;font-size:12px;line-height:16px;font-weight:500;color:var(--ink);background:rgba(28,28,28,.94);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.06),0 8px 18px -8px rgba(0,0,0,.7);opacity:0;transform:translateY(2px) scale(.98);transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-dock-tip[data-on="true"] .d-dock-tip-label{opacity:1;transform:none}
.d-dock-live{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.d-dock[data-mode="thumb"] .d-dock-tip-label{font-size:max(12px,calc(11px / var(--fs)));line-height:1.35;padding:.32em .75em}
[data-stage-theme="light"] .d-dock{--ink:#171717;--edge:rgba(0,0,0,.08)}
[data-stage-theme="light"] .d-dock-bar{background:linear-gradient(rgba(255,255,255,.82),rgba(242,242,242,.9));box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),inset 0 1px 0 #fff,0 18px 36px -14px rgba(0,0,0,.25)}
[data-stage-theme="light"] .d-dock-sep{background:rgba(0,0,0,.12)}
[data-stage-theme="light"] .d-dock-dot{background:#404040}
[data-stage-theme="light"] .d-dock-tip-label{background:rgba(255,255,255,.96);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),0 8px 18px -8px rgba(0,0,0,.25)}
[data-stage-theme="light"] .d-dock-tile--bin{background:linear-gradient(#ececec,#d6d6d6);color:#404040}
@media (prefers-reduced-motion:reduce){.d-dock-tip-label{transform:none!important}}`,
 js:`const C='d-dock',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
root.dataset.mode=ctx.mode;
const row=$('.'+C+'-row'),bar=$('.'+C+'-bar'),tip=$('.'+C+'-tip'),label=$('.'+C+'-tip-label'),live=$('.'+C+'-live'),dotLayer=$('.'+C+'-dots');
const items=[...row.children],apps=$$('.'+C+'-app');
const PEAK=.8,RADIUS=112,BASE=36;
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
let centers=[],widths=[],barLeft=0,barWidth=0,sizes=items.map(()=>1),target=null,frame=0,last=0,active=-1,selected=0,touched=false,sweep=0,tipX=null,dead=false;
const dots=apps.map(app=>{const d=document.createElement('span');d.className=C+'-dot';d.dataset.on=app.dataset.running;dotLayer.appendChild(d);return d;});
function measure(){
 widths=items.map(n=>n.offsetWidth);centers=items.map(n=>n.offsetLeft+n.offsetWidth/2);
 const first=items[0],lastItem=items[items.length-1];
 barLeft=first.offsetLeft-9;barWidth=lastItem.offsetLeft+lastItem.offsetWidth+9-barLeft;
 bar.style.left=barLeft+'px';bar.style.width=barWidth+'px';
}
// Cosine falloff: full size under the pointer, back to rest at RADIUS.
function wanted(x){return items.map((n,i)=>{if(x==null||!n.classList.contains(C+'-app'))return 1;const d=Math.abs(x-centers[i]);return d>=RADIUS?1:1+PEAK*(Math.cos(Math.PI*d/RADIUS)+1)/2;});}
const shifts=[];
function paint(){
 const grow=sizes.map((s,i)=>(s-1)*widths[i]),extra=grow.reduce((a,b)=>a+b,0);let acc=0;
 items.forEach((n,i)=>{shifts[i]=acc+grow[i]/2-extra/2;acc+=grow[i];n.style.transform='translateX('+shifts[i].toFixed(2)+'px) scale('+sizes[i].toFixed(4)+')';});
 apps.forEach((app,k)=>{const i=items.indexOf(app);dots[k].style.left=(centers[i]+shifts[i]).toFixed(2)+'px';});
 bar.style.transform='scaleX('+((barWidth+extra)/barWidth).toFixed(4)+')';
 placeTip();
 root.dataset.sizes=sizes.filter((s,i)=>items[i].classList.contains(C+'-app')).map(s=>s.toFixed(2)).join(',');
}
function placeTip(){
 if(active<0)return;const i=items.indexOf(apps[active]),x=centers[i]+shifts[i],top=row.offsetTop+row.offsetHeight-BASE*sizes[i];
 tip.style.transform='translate('+(x-tip.offsetWidth/2).toFixed(2)+'px,'+(top-tip.offsetHeight-10).toFixed(2)+'px)';
}
function setActive(k){
 if(k===active)return;active=k;tip.dataset.on=String(k>=0);
 if(k>=0){label.textContent=apps[k].dataset.name;placeTip();}
}
function tick(t){
 frame=0;const dt=Math.min(48,last?t-last:16.7);last=t;
 const k=1-Math.pow(.82,dt/16.7),want=wanted(target);let moving=false;
 sizes=sizes.map((s,i)=>{const n=s+(want[i]-s)*k;if(Math.abs(n-want[i])>.002){moving=true;return n;}return want[i];});
 paint();
 if(moving)frame=requestAnimationFrame(tick);else last=0;
}
function aim(x){target=x;if(reduced)return;if(!frame){last=0;frame=requestAnimationFrame(tick);}}
function nearest(x){let best=-1,dist=1e9;apps.forEach((app,k)=>{const d=Math.abs(x-centers[items.indexOf(app)]);if(d<dist){dist=d;best=k;}});return best;}
function point(e){const b=root.getBoundingClientRect(),k=ctx.scale||1;return{x:(e.clientX-b.left)/k,y:(e.clientY-b.top)/k};}
function take(){if(!touched){touched=true;cancelAnimationFrame(sweep);}}
on(root,'pointermove',e=>{
 if(e.pointerType!=='mouse')return;take();
 const p=point(e),top=row.offsetTop-BASE*PEAK-8,inside=p.y>=top&&p.y<=root.offsetHeight&&p.x>=barLeft-12&&p.x<=barLeft+barWidth+12;
 if(inside){aim(p.x);setActive(nearest(p.x));}else if(!root.contains(document.activeElement)||document.activeElement===root){aim(null);setActive(-1);}
});
on(root,'pointerleave',()=>{if(!apps.includes(document.activeElement)){aim(null);setActive(-1);}});
function launch(k){
 const app=apps[k],tile=app.firstElementChild,name=app.dataset.name;
 if(app.dataset.fixed==='true'){live.textContent='Bin is empty';return;}
 const wasRunning=app.dataset.running==='true';
 if(!reduced)tile.animate([{transform:'translateY(0)'},{transform:'translateY(-18px)',offset:.28},{transform:'translateY(0)',offset:.56},{transform:'translateY(-7px)',offset:.78},{transform:'translateY(0)'}],{duration:740,easing:'cubic-bezier(.22,1,.36,1)'});
 app.dataset.running='true';dots[k].dataset.on='true';app.setAttribute('aria-label',name+', open');
 live.textContent=wasRunning?name+' is active':name+' opened';
 ctx.emit('dock',{app:name,index:k});
}
function select(k,focus){
 selected=(k+apps.length)%apps.length;
 apps.forEach((app,i)=>app.tabIndex=i===selected?0:-1);
 if(focus)apps[selected].focus({preventScroll:true});
 aim(centers[items.indexOf(apps[selected])]);setActive(selected);
 root.dataset.selected=String(selected);
}
apps.forEach((app,k)=>{
 on(app,'click',()=>{take();select(k,false);launch(k);});
 on(app,'focus',()=>{take();select(k,false);});
 on(app,'blur',()=>{requestAnimationFrame(()=>{if(!apps.includes(document.activeElement)){aim(null);setActive(-1);}});});
 on(app,'keydown',e=>{
  const keys={ArrowRight:k+1,ArrowLeft:k-1,Home:0,End:apps.length-1};
  if(e.key in keys){e.preventDefault();e.stopPropagation();select(keys[e.key],true);}
 });
});
ctx.onAction('next',()=>{take();select(selected+1,false);live.textContent=apps[selected].dataset.name;});
const fit=()=>{root.style.setProperty('--fit-scale',String(ctx.scale||1));};
const ro=new ResizeObserver(fit);ro.observe(stage);fit();
measure();paint();
// Tiles sweep a virtual pointer across the Dock; reduced motion holds one magnified still frame.
if(ctx.mode==='thumb'){
 const span=barWidth*.42,mid=barLeft+barWidth/2;
 if(reduced){sizes=wanted(centers[2]);paint();setActive(2);}
 else{const run=t=>{if(touched||dead)return;const x=mid+span*Math.sin(t/5200*Math.PI*2-.9);aim(x);setActive(nearest(x));sweep=requestAnimationFrame(run);};sweep=requestAnimationFrame(run);}
}else if(!reduced){sizes=wanted(centers[items.indexOf(apps[2])]);target=centers[items.indexOf(apps[2])];selected=2;paint();setActive(2);}
if(document.fonts)document.fonts.ready.then(()=>{if(!dead)placeTip();});
return()=>{dead=true;abort.abort();ro.disconnect();cancelAnimationFrame(frame);cancelAnimationFrame(sweep);};`,
 prompt:`Build a macOS-style magnifying Dock in plain HTML, CSS and JavaScript with no libraries, in a 400×170 scene. A flex row of seven 36px squircle buttons (radius 10px, 6px gaps) sits on a 54px rail with an 18px radius, a translucent graphite gradient, an inset 1px rgba(255,255,255,.09) hairline, a 1px top highlight and a two-layer drop shadow. Draw every icon as a 21px inline SVG stroke glyph (1.7 stroke, round caps) on a tinted squircle from one palette of neutrals plus the orange accent #fa7319: Files (graphite, folder), Mail (orange gradient, envelope), Calendar (light tile, orange header bar, grid of day dots with today in orange), Notes (pale orange, ruled sheet), Music (black, orange note), Terminal (black, prompt) and, after a 1px divider, a glassy Bin. Running apps (Files, Mail, Music, Terminal) show 4px dots under the rail. Magnification: measure each item's untransformed centre once; for a pointer x in stage units (divide client deltas by the stage scale) every app wants scale 1 + 0.8 × (cos(π·d/112) + 1) / 2 inside a 112px radius and 1 outside. Ease current scales toward those targets with a time-normalised lerp (1 − 0.82^(dt/16.7)) in a requestAnimationFrame loop that stops when settled. Apply transform: translateX(shift) scale(s) with transform-origin at the bottom centre, where each shift is the running sum of the growth of the items to its left plus half its own growth minus half the total growth, so neighbours are pushed apart symmetrically; the rail follows with scaleX((width + growth) / width) and the dots follow the shifts. Only magnify while the pointer is over the rail or the area the icons rise into. A floating label above the nearest icon names it (12px Geist on a dark pill, fades and lifts in 150ms with cubic-bezier(.22,1,.36,1)); it is positioned by transform every frame and only its inner pill transitions. Clicking an app plays a two-hop launch bounce on the tile with the Web Animations API (−18px, 0, −7px, 0 over 740ms) and lights its running dot; the Bin reports that it is empty. The Dock is a role="toolbar" with a roving tabindex: arrows, Home and End move focus and magnify around the focused app, Enter launches, a polite status line announces launches. A Next app control steps the selection. Thumbnail mode sweeps a virtual pointer across the rail on a 5.2s sine until touched, with the label following. Reduced motion keeps icons at rest size with labels only, and the thumbnail holds one magnified still frame around Calendar. Include a light stage theme.`
});

INTRX.register({
  id: "flip-expand",
  title: "Shared Expand",
  cat: "Layout & UI",
  rootClass: "d-flip",
  tags: ["FLIP", "shared card", "modal"],
  libs: [],
  desc: "The selected photograph grows from its measured thumbnail into a local detail view. Three full cards retain native activation, focus return and reversible expansion from the displayed geometry.",
  seen: "Pattern family: shared-element card expansion",
  hint: "Press · The thumbnail grows into the detail view",
  html: `<div class="d-flip"><button class="d-flip-scrim" type="button" tabindex="-1" aria-label="Close expanded card"></button><div class="d-flip-layer" data-index="0"><button class="d-flip-card" type="button" aria-expanded="false" aria-label="Expand Afterglow"><span class="d-flip-photo"><template><img class="d-flip-image" src="{{asset:photo-cityNight}}" alt="" draggable="false"></template></span><strong class="d-flip-title">Afterglow</strong><em class="d-flip-meta" aria-hidden="true">Photo by Liana S</em><span class="d-flip-description">Orange light lines after dark.<span class="d-flip-hint"> Press again or Escape to return.</span></span></button></div><div class="d-flip-layer" data-index="1"><button class="d-flip-card" type="button" aria-expanded="false" aria-label="Expand Dune"><span class="d-flip-photo"><template><img class="d-flip-image" src="{{asset:photo-forestDark}}" alt="" draggable="false"></template></span><strong class="d-flip-title">Dune</strong><em class="d-flip-meta" aria-hidden="true">Photo by Adrien Olichon</em><span class="d-flip-description">Wind-cut ripples in black sand.<span class="d-flip-hint"> Press again or Escape to return.</span></span></button></div><div class="d-flip-layer" data-index="2"><button class="d-flip-card" type="button" aria-expanded="false" aria-label="Expand Atrium"><span class="d-flip-photo"><template><img class="d-flip-image" src="{{asset:photo-archGrid}}" alt="" draggable="false"></template></span><strong class="d-flip-title">Atrium</strong><em class="d-flip-meta" aria-hidden="true">Photo by Victoria Wang</em><span class="d-flip-description">Architecture in light and shadow.<span class="d-flip-hint"> Press again or Escape to return.</span></span></button></div><span class="d-flip-status" role="status"></span></div>`,
  css: `.d-flip{position:relative;top:4px;font-family:Geist,system-ui,sans-serif;color:#f1f1f1}.d-flip-scrim{position:absolute;inset:0;border:0;border-radius:16px;background:#00000059;opacity:0;pointer-events:none;transition:opacity var(--dur-quick) var(--ease-out)}.d-flip[data-expanded="true"] .d-flip-scrim{opacity:1;pointer-events:auto;transition-duration:var(--dur-fast)}.d-flip-layer{position:absolute;left:12px;top:57px;width:80px;height:124px;transform-origin:0 0;transition:opacity var(--dur-quick) var(--ease-out)}.d-flip-layer:nth-of-type(2){left:100px}.d-flip-layer:nth-of-type(3){left:188px}.d-flip-card{position:absolute;inset:0;width:100%;height:100%;overflow:clip;padding:0;border:1px solid #ffffff0f;border-radius:14px;background:#1c1c1c;color:#f1f1f1;text-align:left;cursor:pointer;box-shadow:0 1px 2px #0000001f,0 8px 20px -8px #0000002e}.d-flip-photo{position:absolute;left:-1px;top:-1px;width:calc(100% + 2px);height:68px;overflow:clip;background:#0b0b0b}.d-flip-image{position:absolute;left:0;top:0;display:block;width:100%;height:100%;max-width:none;object-fit:cover}.d-flip-title{position:absolute;left:9px;top:83px;font:500 12.5px/18px Geist,system-ui,sans-serif}.d-flip-description{position:absolute;left:13px;right:13px;top:168px;opacity:0;visibility:hidden;color:#9c9c9c;font:400 12.5px/17px Geist,system-ui,sans-serif;transition:opacity var(--dur-quick) var(--ease-out)}.d-flip-layer[data-expanded="true"]{left:10px;top:10px;width:260px;height:218px;z-index:3}.d-flip-layer[data-expanded="true"] .d-flip-photo{height:130px}.d-flip-layer[data-expanded="true"] .d-flip-title{left:13px;top:142px;font-size:15px;font-weight:600}.d-flip-layer[data-expanded="true"] .d-flip-description{opacity:1;visibility:visible;transition:opacity 200ms var(--ease-out) 50ms}.d-flip[data-expanded="true"] .d-flip-layer[data-expanded="false"]{opacity:0;pointer-events:none}.d-flip-card:focus-visible{outline:2px solid var(--focus-ring);outline-offset:-4px}.d-flip-meta{display:none}.d-flip[data-mode="thumb"] .d-flip-layer{left:20px;top:0;width:160px;height:140px}.d-flip[data-mode="thumb"] .d-flip-layer:nth-of-type(n+2){display:none}.d-flip[data-mode="thumb"] .d-flip-photo{height:80px}.d-flip[data-mode="thumb"] .d-flip-image{width:160px;height:110px;top:-10px}.d-flip[data-mode="thumb"] .d-flip-title{left:12px;top:89px;font-size:13px}.d-flip[data-mode="thumb"] .d-flip-meta{display:block;position:absolute;left:12px;top:110px;color:#9c9c9c;font:400 11px/15px Geist,system-ui,sans-serif;white-space:nowrap;transition:opacity var(--dur-quick) var(--ease-out)}.d-flip[data-mode="thumb"] .d-flip-description{left:12px;right:12px;top:118px;font-size:11px;line-height:15px}.d-flip[data-mode="thumb"] .d-flip-hint{display:none}.d-flip[data-mode="thumb"] .d-flip-layer[data-expanded="true"]{left:0;top:-4px;width:200px;height:148px}.d-flip[data-mode="thumb"] .d-flip-layer[data-expanded="true"] .d-flip-photo{height:88px}.d-flip[data-mode="thumb"] .d-flip-layer[data-expanded="true"] .d-flip-image{width:200px;height:118px}.d-flip[data-mode="thumb"] .d-flip-layer[data-expanded="true"] .d-flip-title{left:12px;top:96px;font-size:15px}.d-flip[data-mode="thumb"] .d-flip-layer[data-expanded="true"] .d-flip-meta{opacity:0}.d-flip-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-flip-layer{transform:none!important}.d-flip-description{transition:opacity var(--dur-quick) var(--ease-out)!important;transition-delay:0ms!important}}`,
  js: `const layers=[...root.querySelectorAll('.d-flip-layer')],buttons=layers.map(l=>l.querySelector('.d-flip-card')),scrim=root.querySelector('.d-flip-scrim'),status=root.querySelector('[role="status"]'),abort=new AbortController(),options={signal:abort.signal},uid='shared-expand-'+Math.random().toString(36).slice(2);let active=-1,lastIndex=0,token=0,owned=[];root.dataset.mode=ctx.mode;
layers.forEach((layer,i)=>{if(ctx.mode==='full'||i===0)layer.querySelector('.d-flip-photo').appendChild(layer.querySelector('template').content.cloneNode(true));layer.id=uid+'-'+i;buttons[i].setAttribute('aria-controls',layer.id);const description=layer.querySelector('.d-flip-description');description.id=uid+'-description-'+i;layer.dataset.expanded='false';});
function change(next){const own=++token,first=new Map(layers.map(l=>[l,l.getBoundingClientRect()]));owned.forEach(a=>a.cancel());owned=[];const previous=active;active=next;if(next>=0)lastIndex=next;root.dataset.expanded=String(active>=0);root.dataset.active=String(active);scrim.inert=active<0;layers.forEach((layer,i)=>{const open=i===active,hidden=active>=0&&!open;layer.dataset.expanded=String(open);layer.inert=hidden;layer.setAttribute('aria-hidden',String(hidden));buttons[i].setAttribute('aria-expanded',String(open));buttons[i].setAttribute('aria-label',(open?'Close ':'Expand ')+layer.querySelector('strong').textContent+(open?' details':''));if(open){layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','false');layer.setAttribute('aria-label',layer.querySelector('strong').textContent+' details');buttons[i].setAttribute('aria-describedby',uid+'-description-'+i);}else{layer.removeAttribute('role');layer.removeAttribute('aria-modal');layer.removeAttribute('aria-label');buttons[i].removeAttribute('aria-describedby');}});
root.dataset.phase='moving';layers.forEach((layer,i)=>{if(ctx.mode==='thumb'&&i>0)return;const last=layer.getBoundingClientRect(),before=first.get(layer),ease='cubic-bezier(.22,1,.36,1)';if(ctx.reducedMotion){if(i===active||(active<0&&i===previous))owned.push(layer.animate([{opacity:0},{opacity:1}],{duration:150,easing:ease}));return;}if(!last.width||!last.height)return;const dx=(before.left-last.left)/ctx.scale,dy=(before.top-last.top)/ctx.scale,sx=before.width/last.width,sy=before.height/last.height;if(Math.abs(dx)+Math.abs(dy)+Math.abs(sx-1)+Math.abs(sy-1)>.01)owned.push(layer.animate([{transform:'translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')'},{transform:'none'}],{duration:350,easing:ease}));});
Promise.allSettled(owned.map(a=>a.finished)).then(()=>{if(own===token)root.dataset.phase='idle';});if(ctx.mode==='full'&&next<0&&previous>=0)buttons[previous].focus({preventScroll:true});if(ctx.mode==='full'&&next>=0)buttons[next].focus({preventScroll:true});status.textContent=next<0?'Card detail closed':layers[next].querySelector('strong').textContent+' detail expanded. Press again or Escape to close.';ctx.emit('expand',{index:next,expanded:next>=0});}
buttons.forEach((button,i)=>button.addEventListener('click',()=>change(active===i?-1:i),options));scrim.addEventListener('click',()=>change(-1),options);root.addEventListener('keydown',e=>{if(active<0)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();change(-1);}else if(e.key==='Tab'&&ctx.mode==='full'){e.preventDefault();buttons[active].focus({preventScroll:true});}},options);ctx.onAction('expand',()=>change(active>=0?-1:lastIndex));root.dataset.expanded='false';root.dataset.active='-1';root.dataset.phase='idle';scrim.inert=true;return()=>{token++;abort.abort();owned.forEach(a=>a.cancel());};`,
  prompt: `Implement v4 Shared Expand190:1283. Hero200x156 contains one160x140 #1c1c1c card20,0 with14px corners, exact cityNight photo160x110 at0,-10 clipped by the160x80 top frame; standard image bounds106,20 while the card starts106,30. Below the photo the hero card shows real copy: the 13px title Afterglow at12,89 and an 11px #9c9c9c photo credit (Photo by Liana S) at12,110. Compensate the shell optical raise. Full280x238 retains all three cards, Afterglow/Dune/Atrium, on approved cityNight/forestDark/archGrid photographs, native buttons and readable12.5px labels. A selected card grows from80x124 into260x218 at10,10, local250/150ms scrim, full title15px and detail content200ms after50ms. Measure the current displayed rectangles before cancelling old animations, apply the new layout, invert x/y/scale at transform-origin0 0, and FLIP350ms ease-out to identity for both open and close. Fresh toggles retarget mid-flight without stale double-rAF or transitionend handlers. Other cards become inert while the local dialog is open; use unique controls, scoped Tab focus, Escape/scrim/native close and focus return. Thumbnail expansion remains bounded: the title grows to15px at12,96, the credit fades out and the first description sentence (Orange light lines after dark.) fades in at12,118 instead of shrinking the full text. Expose Expand/close and Reset in shared dock. Reduced motion crossfades150ms without travel. Native previews use local1600px photos; portable exports only800px with licence credits. Clean up animations/listeners.`
});
/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"smooth-accordion",
 title:"Smooth Accordion",
 cat:"Layout & UI",
 rootClass:"d-acc",
 tags:["accordion","grid 0fr","native controls"],
 libs:[],
 desc:"Three headers share a single open section. Grid tracks follow content height while opacity and the original chevrons resolve independently, including interrupted reversals.",
 seen:"Pattern family: single-open disclosure groups",
 hint:"Press · Panels open with eased height and a turning chevron",
 html:`<div class="d-acc"><div class="d-acc-card"><section class="d-acc-item" data-open="false"><h3 class="d-acc-heading"><button class="d-acc-head" type="button" aria-expanded="false"><span class="d-acc-label">What changes?</span><img class="d-acc-right" src="{{asset:layout2-accordion-chevron-right}}" alt=""><img class="d-acc-down" src="{{asset:layout2-accordion-chevron-down}}" alt=""></button></h3><div class="d-acc-body"><div class="d-acc-clip"><p class="d-acc-copy">One section opens at a time. Press it again to close it.</p></div></div></section><section class="d-acc-item" data-open="true"><h3 class="d-acc-heading"><button class="d-acc-head" type="button" aria-expanded="true"><span class="d-acc-label">How does it move?</span><img class="d-acc-right" src="{{asset:layout2-accordion-chevron-right}}" alt=""><img class="d-acc-down" src="{{asset:layout2-accordion-chevron-down}}" alt=""></button></h3><div class="d-acc-body"><div class="d-acc-clip"><p class="d-acc-copy">Height follows its content with a soft, reversible transition.</p></div></div></section><section class="d-acc-item" data-open="false"><h3 class="d-acc-heading"><button class="d-acc-head" type="button" aria-expanded="false"><span class="d-acc-label">Can I use a keyboard?</span><img class="d-acc-right" src="{{asset:layout2-accordion-chevron-right}}" alt=""><img class="d-acc-down" src="{{asset:layout2-accordion-chevron-down}}" alt=""></button></h3><div class="d-acc-body"><div class="d-acc-clip"><p class="d-acc-copy">Use Tab, Enter or Space. Arrow keys move between headers.</p></div></div></section></div><span class="d-acc-status" role="status"></span></div>`,
 css:`.d-acc{position:relative;top:4px;font-family:Geist,system-ui,sans-serif;color:#f1f1f1}.d-acc-card{position:absolute;left:10px;top:0;width:200px;border:1px solid #ffffff0f;border-radius:14px;background:#1c1c1c;overflow:clip;box-shadow:0 1px 2px #0000001f,0 8px 20px -8px #0000002e}.d-acc-heading{margin:0;font-size:13px}.d-acc-head{position:relative;display:block;width:100%;height:40px;padding:0 34px 0 13px;border:0;border-bottom:1px solid #ffffff0d;background:none;color:#9c9c9c;text-align:left;font:500 12px/16px Geist,system-ui,sans-serif;cursor:pointer}.d-acc-item[data-open="true"] .d-acc-head{color:#f1f1f1}.d-acc-head img{position:absolute;right:14px;top:10px;display:block;transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)}.d-acc-down{opacity:0;transform:rotate(-90deg)}.d-acc-item[data-open="true"] .d-acc-right{opacity:0;transform:rotate(90deg)}.d-acc-item[data-open="true"] .d-acc-down{opacity:1;transform:none}.d-acc-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--dur-fast) var(--ease-out)}.d-acc-item[data-open="true"] .d-acc-body{grid-template-rows:1fr}.d-acc-clip{min-height:0;overflow:hidden;opacity:0;transition:opacity 200ms var(--ease-out)}.d-acc-item[data-open="true"] .d-acc-clip{opacity:1}.d-acc-copy{margin:0;padding:10px 13px;font:400 12px/18px Geist,system-ui,sans-serif;color:#9c9c9c}.d-acc-head:focus-visible{outline:2px solid var(--focus-ring);outline-offset:-3px}.d-acc[data-mode="thumb"] .d-acc-card{left:0;top:-4px;width:200px;height:148px}.d-acc[data-mode="thumb"] .d-acc-head{height:36px}.d-acc[data-mode="thumb"] .d-acc-copy{padding:5px 13px 3px;line-height:16px}.d-acc-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-acc-body{transition:none}.d-acc-head img{transform:none!important;transition:opacity var(--dur-quick) var(--ease-out)}.d-acc-clip{transition:opacity var(--dur-quick) var(--ease-out)}}`,
 js:`const items=[...root.querySelectorAll('section')],heads=items.map(item=>item.querySelector('button')),status=root.querySelector('[role="status"]'),uid='accordion-'+Math.random().toString(36).slice(2);let selected=1;root.dataset.mode=ctx.mode;
function paint(){items.forEach((item,i)=>{const open=i===selected;item.dataset.open=String(open);heads[i].setAttribute('aria-expanded',String(open));item.querySelector('.d-acc-body').inert=!open;});root.dataset.open=String(selected);}
function select(i){selected=selected===i?-1:i;paint();status.textContent=selected<0?'All sections closed':heads[selected].textContent.trim()+' expanded';ctx.emit('accordion',{index:selected});}
heads.forEach((head,i)=>{const body=items[i].querySelector('.d-acc-body');head.setAttribute('aria-label',head.querySelector('.d-acc-label').textContent);head.id=uid+'-head-'+i;body.id=uid+'-body-'+i;body.setAttribute('role','region');body.setAttribute('aria-labelledby',head.id);head.setAttribute('aria-controls',body.id);head.addEventListener('click',()=>select(i));head.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();heads[e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowDown'?1:2))%3].focus();});});ctx.onAction('next',()=>{selected=(selected+1)%3;paint();status.textContent='Section '+(selected+1)+' expanded';});paint();`,
 prompt:`Match v4 Smooth Accordion184:1703 with a 200x148 clipped hero card filling its200x148 plane, radius14, #1c1c1c. Hero headers are36px and show the real 12px questions; initially the middle answer is open at12px/16px in two lines (5px/3px padding). Preserve original14px right/down assets at right14, top10. Full220x220 retains all three readable question headers and real content at12/18, natural content height,200px card; no thumbnail text squeezing. Single-open activation closes others, reactivating closes all. Grid0fr→1fr250ms ease-out, opacity200ms, chevron rotation/crossfade250ms; CSS reversals are interruptible. Add unique labelled regions, aria-expanded/controls, inert collapsed content, arrow/Home/End header focus. Expose Next section and Reset in shared dock. Reduced motion jumps height and crossfades150ms with no rotations. Preserve all original asset slots. Keep all three original accordion questions as accessible button names in both full and native views. Preserve the complete original model, copy, assets and geometry.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"spring-modal",
 title:"Spring Modal",
 cat:"Layout & UI",
 rootClass:"d-modal",
 tags:["modal","focus","origin aware"],
 libs:[],
 desc:"A local confirmation dialog resolves from its native opener, keeps keyboard focus inside while active and reverses immediately on Confirm, Cancel, Escape or scrim press.",
 seen:"Pattern family: local confirmation dialogs",
 hint:"Press · The dialog springs up with a gentle overshoot",
 html:`<div class="d-modal"><button class="d-modal-open" type="button" aria-haspopup="dialog">Open dialog</button><div class="d-modal-backdrop"></div><div class="d-modal-dialog" role="dialog" aria-modal="false"><div class="d-modal-icon"><img src="{{asset:layout2-modal-bell}}" alt=""></div><h3 class="d-modal-title">Enable notifications?</h3><p class="d-modal-copy">Updates for this project.</p><button class="d-modal-confirm" type="button">Confirm</button><button class="d-modal-cancel" type="button">Cancel</button></div><span class="d-modal-status" role="status"></span></div>`,
 css:`.d-modal{position:relative;top:4px;font-family:Geist,system-ui,sans-serif;color:#f1f1f1;--d-modal-x:0px;--d-modal-y:0px;--d-modal-sx:.96;--d-modal-sy:.96}.d-modal-open{position:absolute;left:45px;top:78px;width:130px;height:32px;padding:0;border:1px solid #ffffff1c;border-radius:10px;background:#272727;color:#f1f1f1;font:500 12px Geist,system-ui,sans-serif;cursor:pointer}.d-modal-backdrop{position:absolute;inset:0;border-radius:16px;background:#00000059;opacity:0;pointer-events:none;transition:opacity var(--dur-quick) var(--ease-out)}.d-modal-dialog{position:absolute;left:10px;top:8px;width:200px;height:174px;overflow:clip;border:1px solid #ffffff0f;border-radius:14px;background:#1c1c1c;box-shadow:0 1px 2px #0000001f,0 8px 20px -8px #0000002e;opacity:0;pointer-events:none;transform:translate(var(--d-modal-x),var(--d-modal-y)) scale(var(--d-modal-sx),var(--d-modal-sy));transition:transform var(--dur-quick) var(--ease-out),opacity var(--dur-quick) var(--ease-out)}.d-modal[data-open="true"] .d-modal-backdrop{opacity:1;pointer-events:auto;transition-duration:var(--dur-fast)}.d-modal[data-open="true"] .d-modal-dialog{opacity:1;pointer-events:auto;transform:none;transition:transform var(--dur-fast) var(--ease-out),opacity var(--dur-fast) var(--ease-out)}.d-modal-icon{position:absolute;left:12px;top:12px;width:28px;height:28px;border:1px solid #ffffff0f;border-radius:8px;background:#272727}.d-modal-icon img{position:absolute;left:5px;top:5px;display:block}.d-modal-title{position:absolute;left:13px;top:53px;margin:0;font:600 13px/18px Geist,system-ui,sans-serif}.d-modal-copy{position:absolute;left:13px;top:79px;max-width:174px;margin:0;color:#9c9c9c;font:400 12px/18px Geist,system-ui,sans-serif}.d-modal-confirm,.d-modal-cancel{position:absolute;left:13px;top:134px;width:82px;height:26px;padding:0;border:0;border-radius:10px;background:#f1f1f1;color:#111;font:500 11.5px/normal Geist,system-ui,sans-serif;letter-spacing:.0528px;cursor:pointer}.d-modal-cancel{left:103px;border:1px solid #ffffff0f;background:#272727;color:#f1f1f1;box-shadow:inset 0 1px #ffffff0d}.d-modal button:focus-visible{outline:2px solid var(--focus-ring);outline-offset:3px}.d-modal[data-mode="thumb"] .d-modal-backdrop{left:0;right:0;top:-34px;bottom:auto;height:170px}.d-modal[data-mode="thumb"][data-compact="true"] .d-modal-backdrop{top:0;height:136px}.d-modal[data-mode="thumb"] .d-modal-dialog{left:35px;top:-12px;width:150px;height:118px}.d-modal[data-mode="thumb"] .d-modal-title{left:12px;top:46px;font-size:12px;line-height:16px;white-space:nowrap}.d-modal[data-mode="thumb"] .d-modal-copy{left:12px;top:63px;font-size:11px;line-height:14px;white-space:nowrap}.d-modal[data-mode="thumb"] .d-modal-confirm,.d-modal[data-mode="thumb"] .d-modal-cancel{left:12px;top:82px;width:58px;height:24px;font-size:11px}.d-modal[data-mode="thumb"] .d-modal-cancel{left:76px}.d-modal[data-mode="thumb"][data-open="true"] .d-modal-open{visibility:hidden}.d-modal-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-modal-dialog{transform:none!important;transition:opacity var(--dur-quick) var(--ease-out)!important}}.d-modal[data-mode="thumb"][data-initial="true"] .d-modal-dialog,.d-modal[data-mode="thumb"][data-initial="true"] .d-modal-backdrop{transition:none!important}`,
 js:`const dialog=root.querySelector('[role="dialog"]'),opener=root.querySelector('.d-modal-open'),scrim=root.querySelector('.d-modal-backdrop'),confirm=root.querySelector('.d-modal-confirm'),cancel=root.querySelector('.d-modal-cancel'),title=root.querySelector('h3'),copy=root.querySelector('p'),status=root.querySelector('[role="status"]'),abort=new AbortController(),options={signal:abort.signal},uid='modal-'+Math.random().toString(36).slice(2);let opened=ctx.mode==='thumb',result='none',initialFrame=0;
root.dataset.mode=ctx.mode;if(ctx.mode==='thumb')root.dataset.initial='true';dialog.id=uid;title.id=uid+'-title';copy.id=uid+'-copy';dialog.setAttribute('aria-labelledby',title.id);dialog.setAttribute('aria-describedby',copy.id);dialog.setAttribute('aria-label','Enable notifications?');opener.setAttribute('aria-controls',uid);
function sync(){root.dataset.open=String(opened);root.dataset.result=result;dialog.inert=!opened;dialog.setAttribute('aria-hidden',String(!opened));opener.setAttribute('aria-expanded',String(opened));}
function origin(){if(ctx.mode==='thumb')return;const sx=opener.offsetWidth/dialog.offsetWidth,sy=opener.offsetHeight/dialog.offsetHeight;root.style.setProperty('--d-modal-x',(opener.offsetLeft+opener.offsetWidth/2-dialog.offsetLeft-dialog.offsetWidth/2)+'px');root.style.setProperty('--d-modal-y',(opener.offsetTop+opener.offsetHeight/2-dialog.offsetTop-dialog.offsetHeight/2)+'px');root.style.setProperty('--d-modal-sx',sx);root.style.setProperty('--d-modal-sy',sy);}
function open(){if(opened)return;origin();opened=true;sync();if(ctx.mode==='full')confirm.focus();status.textContent='Confirmation dialog opened';ctx.emit('modal',{open:true});}
function close(reason){if(!opened)return;opened=false;result=reason;sync();if(dialog.contains(document.activeElement)&&ctx.mode==='full')opener.focus();status.textContent=reason==='confirmed'?'Notifications enabled':reason==='cancelled'?'Notification request cancelled':'Dialog dismissed';ctx.emit('modal',{open:false,result:reason});}
opener.addEventListener('click',open,options);confirm.addEventListener('click',()=>close('confirmed'),options);cancel.addEventListener('click',()=>close('cancelled'),options);scrim.addEventListener('click',()=>close('dismissed'),options);
root.addEventListener('keydown',e=>{if(!opened)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close('dismissed');}else if(e.key==='Tab'&&dialog.contains(e.target)){if(e.shiftKey&&e.target===confirm){e.preventDefault();cancel.focus();}else if(!e.shiftKey&&e.target===cancel){e.preventDefault();confirm.focus();}}},options);
ctx.onAction('open',open);const observer=new ResizeObserver(()=>root.dataset.compact=String(ctx.size.h<230));observer.observe(stage);root.dataset.compact=String(ctx.size.h<230);sync();if(ctx.mode==='thumb')initialFrame=requestAnimationFrame(()=>{initialFrame=0;delete root.dataset.initial;});return()=>{cancelAnimationFrame(initialFrame);abort.abort();observer.disconnect();};`,
 prompt:`Build v4 Spring Modal184:1734. Hero220x100 keeps a220x170 local scrim at0,-34 and150x118 dialog35,-12, radius14, exact28px icon box with original14px bell, the real 12px title (Enable notifications?) at12,46 and 11px #9c9c9c body (Updates for this project.) at12,63,58x24 Confirm/Cancel at13/77,83 with11px labels. Keep label size1:1 at compact widths; shorten/reposition only the compact scrim so it stays inside stage. Full220x190 uses a200x174 confirmation surface, real13px heading and12px body, native opener, meaningful Confirm/Cancel state. Start full closed, hero open without stealing focus. Opening from native button measures local center delta and scales from its rect; CSS transitions are reversible250ms ease-out, close150ms; scrim250/150. Local dialog uses unique associations, inert hidden state, scoped Tab containment, Escape stops propagation, outside scrim closes, focus returns to opener. Never use a delayed close timer. Expose Open and Reset through dock. Reduced motion uses150ms opacity only, keyboard/status/events remain. Preserve bell bytes and dimensions.`
});

INTRX.register({
  id: "drag-carousel",
  title: "Inertia Carousel",
  cat: "Layout & UI",
  rootClass: "d-drag",
  tags: ["drag", "carousel", "inertia", "photography"],
  libs: [],
  desc: "A captured horizontal drag carries a five-photo row into friction-based inertia, with spring returns at either edge.",
  seen: "Inertial editorial photo strips",
  hint: "Drag · Throw the row; it decays with friction",
  html: `<div class="d-drag" role="region" aria-label="Editorial photo carousel" tabindex="0"><div class="d-drag-viewport"><div class="d-drag-track"><figure class="d-drag-card"><img class="d-drag-photo" src="{{asset:photo-forestDark}}" alt="Sand study" draggable="false"><figcaption class="d-drag-caption">Sand study</figcaption></figure><figure class="d-drag-card"><img class="d-drag-photo" src="{{asset:photo-cityTeal}}" alt="Teal curves" draggable="false"><figcaption class="d-drag-caption">Teal curves</figcaption></figure><figure class="d-drag-card"><img class="d-drag-photo" src="{{asset:photo-ocean}}" alt="Water over black sand" draggable="false"><figcaption class="d-drag-caption">Water over black sand</figcaption></figure><figure class="d-drag-card"><img class="d-drag-photo" src="{{asset:photo-forestBlue}}" alt="Dark metal curves" draggable="false"><figcaption class="d-drag-caption">Dark metal curves</figcaption></figure><figure class="d-drag-card"><img class="d-drag-photo" src="{{asset:photo-cityNight}}" alt="Orange light lines after dark" draggable="false"><figcaption class="d-drag-caption">Orange light lines after dark</figcaption></figure></div></div><img class="d-drag-pointer" src="{{asset:layout2-carousel-pointer}}" alt="" draggable="false"><span class="d-drag-status" role="status"></span></div>`,
  css: `.d-drag{position:relative;font-family:Geist,system-ui,sans-serif;color:#f1f1f1;touch-action:pan-y;cursor:grab;user-select:none;--d-drag-height:220px;--d-drag-width:220px;--d-drag-top:32px;--d-drag-gap:12px}.d-drag[data-dragging="true"]{cursor:grabbing}.d-drag-viewport{position:absolute;left:0;top:var(--d-drag-top);width:100%;height:var(--d-drag-height);overflow:clip}.d-drag-viewport::before,.d-drag-viewport::after{content:"";position:absolute;z-index:2;top:0;bottom:0;width:60px;pointer-events:none;background:linear-gradient(90deg,var(--bg-stage,#151515),transparent)}.d-drag-viewport::before{left:0}.d-drag-viewport::after{right:0;transform:rotate(180deg)}.d-drag-track{position:absolute;left:36px;top:0;display:flex;gap:var(--d-drag-gap);width:max-content;height:100%;will-change:transform}.d-drag-card{position:relative;flex:none;width:var(--d-drag-width);height:100%;margin:0;overflow:clip;border-radius:12px;background:#0b0b0b}.d-drag-card::after{content:"";position:absolute;inset:0;border:1px solid #ffffff14;border-radius:inherit;pointer-events:none}.d-drag-photo{display:block;width:100%;height:100%;max-width:none;object-fit:cover;pointer-events:none}.d-drag-caption{position:absolute;left:0;right:0;bottom:0;padding:24px 12px 12px;background:linear-gradient(transparent,#000000b3);font:500 13px/18px Geist,system-ui,sans-serif}.d-drag-pointer{display:none;position:absolute;left:calc(50% + 3.125px);top:calc(var(--d-drag-top) + var(--d-drag-height)*.646875);width:28.5px;height:29.25px;max-width:none;pointer-events:none}.d-drag[data-mode="thumb"]{--d-drag-height:120px;--d-drag-width:88px;--d-drag-top:40px;--d-drag-gap:8px}.d-drag[data-mode="thumb"] .d-drag-caption{display:none}.d-drag[data-mode="thumb"] .d-drag-pointer{display:block}.d-drag:focus-visible{outline:2px solid var(--focus-ring);outline-offset:-4px}.d-drag-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-drag-track{will-change:auto}}`,
  js: `const viewport=root.querySelector('.d-drag-viewport'),track=root.querySelector('.d-drag-track'),cards=[...root.querySelectorAll('figure')],status=root.querySelector('[role="status"]'),abort=new AbortController(),options={signal:abort.signal};let x=0,v=0,min=0,frame=0,previousTime=0,drag=null,settling=false,mode='idle',step=100,selected=0,resizeKey='';
root.dataset.mode=ctx.mode;
const clamp=value=>Math.max(min,Math.min(0,value));
function paint(){track.style.transform='translateX('+x+'px)';selected=Math.max(0,Math.min(cards.length-1,Math.round(-clamp(x)/step)));Object.assign(root.dataset,{x:x.toFixed(2),velocity:v.toFixed(2),min:min.toFixed(2),selected:String(selected),settling:String(settling),dragging:String(!!drag),phase:mode});}
function stop(){cancelAnimationFrame(frame);frame=0;settling=false;previousTime=0;}
function tick(time){frame=0;const dt=Math.min(.032,previousTime?Math.max(.001,(time-previousTime)/1000):1/60);previousTime=time;
 if(mode==='spring'){const target=clamp(x);v+=(380*(target-x)-32*v)*dt;x+=v*dt;if(Math.abs(target-x)<.05&&Math.abs(v)<.5){x=target;v=0;mode='idle';settling=false;paint();return;}}
 else{v*=Math.pow(.94,dt*60);x+=v*dt;if(x<min||x>0)mode='spring';else if(Math.abs(v)<5){v=0;mode='idle';settling=false;paint();return;}}
 paint();frame=requestAnimationFrame(tick);
}
function release(){if(ctx.reducedMotion){x=clamp(x);v=0;mode='idle';settling=false;paint();return;}mode=x<min||x>0?'spring':'inertia';settling=true;previousTime=0;paint();frame=requestAnimationFrame(tick);}
function moveTo(value,message){stop();if(drag){const id=drag.id;drag=null;if(root.hasPointerCapture(id))root.releasePointerCapture(id);}x=clamp(value);v=0;mode='idle';paint();status.textContent=message||'Photograph '+(selected+1)+' of '+cards.length;ctx.emit('carousel',{index:selected,x});}
function measure(){const key=ctx.size.w+','+ctx.size.h;if(key===resizeKey)return;resizeKey=key;const progress=min?clamp(x)/min:0;stop();if(drag){const id=drag.id;drag=null;if(root.hasPointerCapture(id))root.releasePointerCapture(id);}const thumb=ctx.mode==='thumb',height=thumb?Math.min(120,Math.max(72,ctx.size.h-112)):Math.max(90,Math.min(240,ctx.size.h-144));root.style.setProperty('--d-drag-height',height+'px');root.style.setProperty('--d-drag-top',thumb?'40px':Math.max(16,(ctx.size.h-48-height)/2)+'px');const width=thumb?88:Math.min(220,Math.max(140,ctx.size.w-100));root.style.setProperty('--d-drag-width',width+'px');step=width+(thumb?8:12);min=Math.min(0,ctx.size.w-72-(cards.length*width+(cards.length-1)*(thumb?8:12)));x=min*progress;v=0;mode='idle';paint();}
root.addEventListener('pointerdown',e=>{if(e.button!==0||drag)return;stop();drag={id:e.pointerId,start:e.clientX,origin:x,last:e.clientX,time:e.timeStamp};v=0;mode='drag';root.setPointerCapture(e.pointerId);root.focus({preventScroll:true});paint();},options);
root.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const now=e.timeStamp,dt=Math.max(1,now-drag.time),delta=(e.clientX-drag.last)/ctx.scale,speed=delta/dt*1000;v=v*.3+speed*.7;drag.last=e.clientX;drag.time=now;const raw=drag.origin+(e.clientX-drag.start)/ctx.scale;x=raw<min?min+(raw-min)*.55:raw>0?raw*.55:raw;paint();},options);
root.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;if(e.timeStamp-drag.time>80)v=0;const id=drag.id;drag=null;if(root.hasPointerCapture(id))root.releasePointerCapture(id);release();status.textContent='Photograph '+(selected+1)+' of '+cards.length;ctx.emit('carousel',{index:selected,x});},options);
function cancel(e){if(!drag||e.pointerId!==drag.id)return;const origin=drag.origin,id=drag.id;drag=null;if(root.hasPointerCapture(id))root.releasePointerCapture(id);moveTo(origin,'Drag cancelled');}
root.addEventListener('pointercancel',cancel,options);root.addEventListener('lostpointercapture',cancel,options);
root.addEventListener('keydown',e=>{let value;if(e.key==='ArrowRight'||e.key==='PageDown')value=x-step;else if(e.key==='ArrowLeft'||e.key==='PageUp')value=x+step;else if(e.key==='Home')value=0;else if(e.key==='End')value=min;else if(e.key==='Escape'){moveTo(drag?drag.origin:clamp(x),'Drag stopped');e.preventDefault();e.stopPropagation();return;}else return;e.preventDefault();e.stopPropagation();moveTo(value);},options);
ctx.onAction('next',()=>moveTo(x<=min+.5?0:x-step));ctx.onAction('reset',()=>moveTo(0,'Carousel reset'));measure();const observer=new ResizeObserver(measure);observer.observe(stage);return()=>{abort.abort();observer.disconnect();stop();if(drag&&root.hasPointerCapture(drag.id))root.releasePointerCapture(drag.id);};`,
  prompt: `Build an original zero-dependency inertia photo carousel in vanilla HTML, CSS and JavaScript. Use the five credited dark Unsplash photographs in order: forestDark, cityTeal, ocean, forestBlue and cityNight. The shell owns the stage and Next photo / Reset controls. Match the v4 thumbnail: 88×120px rounded photo frames at x36,132,228,324,420 and y40 in a 372×264px stage; retain the original 28.5×29.25px pointer SVG and 60px edge fades. Adapt the height above the dock on smaller stages. Full mode retains all five photographs with readable captions. Capture a horizontal pointer drag, preserve vertical touch scrolling, sample time-based velocity and apply .94 friction per nominal 60Hz frame. Rubber-band outside the bounds at .55 and return with a 380 stiffness / 32 damping spring. Cancel restores the pre-drag position, rapid drags interrupt current inertia, and keyboard arrows, Home, End, PageUp and PageDown operate the same bounded row. Reduced motion keeps direct drag feedback and removes release inertia. Stop animation frames at rest and clean up capture, listeners and observers.`
});
/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"hover-fill-button",
 title:"Directional Fill",
 cat:"Layout & UI",
 rootClass:"d-fill",
 tags:["directional fill","entry edge","press"],
 libs:[],
 desc:"The light layer floods from the closest entry edge and retreats toward the exit. Both text layers stay aligned through reversals, with native focus, press and activation feedback.",
 seen:"Pattern family: directional button fills",
 hint:"Hover · The fill floods in from the side you entered",
 html:`<div class="d-fill"><button class="d-fill-btn" type="button"><span class="d-fill-label">Get started</span><span class="d-fill-light" aria-hidden="true"><span class="d-fill-duplicate">Get started</span></span></button><span class="d-fill-status" role="status"></span></div>`,
 css:`.d-fill{position:relative;top:4px;font-family:Geist,system-ui,sans-serif}.d-fill-btn{position:absolute;left:20px;top:14px;width:140px;height:40px;overflow:clip;padding:0;border:1px solid #ffffff1c;border-radius:20px;background:#1c1c1c;color:#9c9c9c;cursor:pointer;transition:transform var(--dur-fast) var(--ease-pop)}.d-fill-label,.d-fill-duplicate{position:absolute;left:32.5px;top:10px;white-space:nowrap;font:500 13.5px/normal Geist,system-ui,sans-serif;letter-spacing:-.0648px}.d-fill-light{position:absolute;left:-1px;top:-1px;width:140px;height:40px;overflow:clip;background:#f1f1f1;color:#111;clip-path:inset(0 100% 0 0);transition:clip-path var(--dur-fast) var(--ease-out)}.d-fill-duplicate{left:33.5px;top:11px}.d-fill[data-mode="thumb"][data-used="false"] .d-fill-light{clip-path:inset(0 40% 0 0)}.d-fill-btn:active{transform:scale(.97);transition-duration:var(--dur-micro);transition-timing-function:var(--ease-out)}.d-fill-btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:4px}.d-fill-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-fill-btn{transform:none!important}.d-fill-light{transition:opacity var(--dur-quick) var(--ease-out);clip-path:none!important;opacity:var(--d-fill-opacity,0)}.d-fill[data-mode="thumb"][data-used="false"] .d-fill-light{opacity:1;clip-path:inset(0 40% 0 0)!important}}`,
 js:`const button=root.querySelector('button'),light=root.querySelector('.d-fill-light'),status=root.querySelector('[role="status"]');let active=false,hovered=false,count=0,edge='left';root.dataset.mode=ctx.mode;root.dataset.used='false';
const clips={left:'inset(0 100% 0 0)',right:'inset(0 0 0 100%)',top:'inset(0 0 100% 0)',bottom:'inset(100% 0 0 0)'};
function nearest(e){const b=button.getBoundingClientRect(),dist=[['left',Math.abs(e.clientX-b.left)],['right',Math.abs(b.right-e.clientX)],['top',Math.abs(e.clientY-b.top)],['bottom',Math.abs(b.bottom-e.clientY)]];return dist.sort((a,b)=>a[1]-b[1])[0][0];}
function fill(next,e){root.dataset.used='true';if(e)edge=nearest(e);active=next;root.dataset.edge=edge;root.dataset.filled=String(next);light.style.clipPath=next?'inset(0 0 0 0)':clips[edge];light.style.setProperty('--d-fill-opacity',next?'1':'0');}
button.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse')return;hovered=true;fill(true,e);});button.addEventListener('pointerleave',e=>{hovered=false;fill(button.matches(':focus-visible'),e);});button.addEventListener('focus',()=>{if(button.matches(':focus-visible'))fill(true);});button.addEventListener('blur',()=>fill(hovered));button.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')fill(true,e);});button.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')fill(false,e);});button.addEventListener('pointercancel',e=>fill(false,e));button.addEventListener('click',()=>{count++;root.dataset.activations=String(count);status.textContent='Get started activated '+count+(count===1?' time':' times');ctx.emit('start',{count});});ctx.onAction('fill',()=>fill(!active));root.dataset.activations='0';root.dataset.filled='false';root.dataset.edge=edge;`,
 prompt:`Match Directional Fill184:1761 exactly:140x40 button at20,14 in180x80,20px pill, #1c1c1c andwhite11% border;13.5px Geist medium Get started at32.5,10,tracking-.0648. Original light overlay140x40 at-1,-1 clips to84px for the60% initial hero pose, duplicate dark text33.5,11 stays aligned. On real mouse enter/leave measure the closest edge from the current bounding box, reveal from that side and retreat toward exit via reversible250ms ease-out inset interpolation. Focus-visible and touch press get fill feedback; native press .97/80ms then250ms ease-pop. Activation emits a counted start event and live status. No custom fake CTA besides the native button, no owned Replay. Expose Fill/clear and Reset in dock. Under reduced motion keep the same hero pose, then use150ms opacity only and no press transform. Preserve exact140x40 sparse geometry and document owner-approved low-fill exception.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"page-transition",
 title:"Page Transition",
 cat:"Layout & UI",
 rootClass:"d-curtain",
 tags:["page slide","curtain","navigation"],
 libs:[],
 desc:"A four-page local navigator uses mirrored 350ms page slides and a narrow curtain. Rapid navigation retargets from the displayed screen while the persistent frame stays in place.",
 seen:"Pattern family: directional route transitions",
 hint:"Press · A curtain wipes from one route to the next",
 html:`<div class="d-curtain"><div class="d-curtain-card"><div class="d-curtain-screen"><h3 class="d-curtain-title">HOME</h3><p class="d-curtain-copy">A place to begin.</p><ul class="d-curtain-content"><li><b>Latest project</b><span>Northwind</span></li><li><b>Journal</b><span>12 posts</span></li><li><b>Open roles</b><span>2</span></li></ul></div><div class="d-curtain-wipe" aria-hidden="true"><i></i><span class="d-curtain-peek"><b>WORK</b><em>Selected projects and ideas.</em></span></div><nav class="d-curtain-nav" aria-label="Demo pages"><button class="d-curtain-back" type="button">Back</button><button class="d-curtain-next" type="button">Next: Work</button></nav></div><span class="d-curtain-status" role="status"></span></div>`,
 css:`.d-curtain{position:relative;top:4px;font-family:Geist,system-ui,sans-serif;color:#f1f1f1}.d-curtain-card{position:absolute;left:10px;top:0;width:220px;height:198px;overflow:clip;border:1px solid #ffffff0f;border-radius:14px;background:#1c1c1c;box-shadow:0 1px 2px #0000001f,0 8px 20px -8px #0000002e}.d-curtain-screen{position:absolute;inset:0;pointer-events:none}.d-curtain-title{position:absolute;left:15px;top:17px;margin:0;font:600 15px/20px Geist,system-ui,sans-serif}.d-curtain-copy{position:absolute;left:15px;top:45px;margin:0;color:#9c9c9c;font:400 12px/18px Geist,system-ui,sans-serif}.d-curtain-content{position:absolute;left:15px;top:73px;width:188px;margin:0;padding:0;list-style:none}.d-curtain-content li{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:8px;height:22px;border-top:1px solid #ffffff0f;color:#f1f1f1;font:400 12px/1 Geist,system-ui,sans-serif;white-space:nowrap}.d-curtain-content b{font-weight:400}.d-curtain-content span{color:#9c9c9c}.d-curtain-nav{position:absolute;left:14px;right:14px;bottom:14px;display:flex;justify-content:space-between;gap:10px;z-index:3}.d-curtain-nav button{height:26px;padding:0 10px;border:1px solid #ffffff0f;border-radius:8px;background:#272727;color:#f1f1f1;font:500 11.5px Geist,system-ui,sans-serif;cursor:pointer}.d-curtain-nav button:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}.d-curtain-wipe{position:absolute;left:110px;top:-1px;width:88px;height:100%;background:linear-gradient(90deg,#282828,#252525);transform:translateX(120px);pointer-events:none;z-index:2}.d-curtain-wipe i{position:absolute;left:-2px;top:0;width:2px;height:100%;background:#ffffff59}.d-curtain-peek{display:none}.d-curtain[data-mode="thumb"] .d-curtain-card{width:200px;height:150px}.d-curtain[data-mode="thumb"] .d-curtain-nav{display:none}.d-curtain[data-mode="thumb"] .d-curtain-title{left:14px;top:15px;font-size:13px;line-height:18px}.d-curtain[data-mode="thumb"] .d-curtain-copy{left:14px;top:36px;font-size:11px;line-height:16px}.d-curtain[data-mode="thumb"] .d-curtain-content{left:14px;top:62px;width:172px}.d-curtain[data-mode="thumb"] .d-curtain-content li{height:20px;font-size:11px}.d-curtain[data-mode="thumb"] .d-curtain-peek{display:block;position:absolute;left:12px;right:8px;top:16px}.d-curtain-peek b{display:block;color:#f1f1f1;font:600 13px/18px Geist,system-ui,sans-serif}.d-curtain-peek em{display:block;margin-top:3px;color:#9c9c9c;font:400 11px/16px Geist,system-ui,sans-serif}.d-curtain[data-mode="thumb"][data-used="false"] .d-curtain-wipe{transform:none}.d-curtain-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-curtain-screen{transform:none!important;filter:none!important}.d-curtain-wipe{will-change:auto}}`,
 js:`const pages=['HOME','WORK','ABOUT','CONTACT'],descriptions=['A place to begin.','Selected projects and ideas.','A little about the studio.','Start a conversation.'],rows=[[['Latest project','Northwind'],['Journal','12 posts'],['Open roles','2']],[['Northwind rebrand','2026'],['Atlas maps','2025'],['Harbor typeface','2024']],[['Founded','2019, Lisbon'],['Team','8 people'],['Focus','Interface motion']],[['New projects','From March'],['Reply time','Within 2 days'],['Studio','Lisbon']]],peek=root.querySelector('.d-curtain-peek'),card=root.querySelector('.d-curtain-card'),screen=root.querySelector('.d-curtain-screen'),title=root.querySelector('h3'),copy=root.querySelector('p'),next=root.querySelector('.d-curtain-next'),back=root.querySelector('.d-curtain-back'),wipe=root.querySelector('.d-curtain-wipe'),status=root.querySelector('[role="status"]');let index=0,animations=[],ghost=null,token=0;
root.dataset.mode=ctx.mode;root.dataset.used='false';root.dataset.phase='idle';root.dataset.page=pages[0];function clear(){animations.forEach(a=>a.cancel());animations=[];if(ghost)ghost.remove();ghost=null;}
function go(direction){const visual=getComputedStyle(screen),from={transform:visual.transform,opacity:visual.opacity,filter:visual.filter},wipeVisual=getComputedStyle(wipe).transform,moving=root.dataset.phase==='moving',first=root.dataset.used==='false',own=++token;clear();ghost=screen.cloneNode(true);ghost.className='d-curtain-screen d-curtain-ghost';ghost.setAttribute('aria-hidden','true');ghost.inert=true;card.insertBefore(ghost,screen);index=(index+direction+4)%4;title.textContent=pages[index];copy.textContent=descriptions[index];screen.querySelectorAll('li').forEach((row,i)=>{row.firstChild.textContent=rows[index][i][0];row.lastChild.textContent=rows[index][i][1];});peek.firstChild.textContent=pages[index];peek.lastChild.textContent=descriptions[index];next.textContent='Next: '+pages[(index+1)%4].toLowerCase().replace(/^./,c=>c.toUpperCase());root.dataset.used='true';root.dataset.page=pages[index];root.dataset.direction=direction>0?'forward':'back';root.dataset.phase='moving';status.textContent=pages[index]+' page';const ease='cubic-bezier(.22,1,.36,1)',duration=ctx.reducedMotion?150:350;
animations.push(ghost.animate([ctx.reducedMotion?{opacity:from.opacity}:from,ctx.reducedMotion?{opacity:0}:{transform:'translateX('+(-direction*30)+'px)',opacity:0,filter:'blur(2px)'}],{duration,easing:ease}));const incoming=screen.animate([ctx.reducedMotion?{opacity:0}:{transform:'translateX('+(direction*30)+'px)',opacity:0,filter:'blur(2px)'},{transform:'none',opacity:1,filter:'none'}],{duration,easing:ease});animations.push(incoming);if(!ctx.reducedMotion){const end=direction>0?-210:120;animations.push(wipe.animate([{transform:moving||first?wipeVisual:'translateX('+(direction>0?120:-210)+'px)'},{transform:'translateX('+end+'px)'}],{duration:350,easing:ease}));}incoming.finished.then(()=>{if(own!==token)return;clear();root.dataset.phase='idle';}).catch(()=>{});ctx.emit('navigate',{page:pages[index],direction});}
next.addEventListener('click',()=>go(1));back.addEventListener('click',()=>go(-1));root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();go(e.key==='ArrowRight'?1:-1);}});ctx.onAction('next',()=>go(1));ctx.onAction('back',()=>go(-1));return()=>{token++;clear();};`,
 prompt:`Build original v4 Page Transition184:1829. Hero220x156 places a200x150 radius14 card10,0 showing the live page screen at thumbnail size: 13px title at14,15, 11px description at14,36 and the page's three 11px label/value rows (20px, hairline dividers, 172px wide) from14,62; hold the88px curtain at111,-1 and its2px leading edge109,-1, carrying the incoming page's 13px title and 11px description (WORK / Selected projects and ideas.) at12,16 inside it. Full240x212 keeps a220x198 frame and readable HOME/WORK/ABOUT/CONTACT screens, each with three 12px label/value rows in place of a grey block (HOME: Latest project Northwind, Journal 12 posts, Open roles 2; WORK: Northwind rebrand 2026, Atlas maps 2025, Harbor typeface 2024; ABOUT: Founded 2019, Lisbon, Team 8 people, Focus Interface motion; CONTACT: New projects From March, Reply time Within 2 days, Studio Lisbon), real Back/Next navigation and page status. Native forward/back and shared dock navigate the four pages cyclically without changing browser routes. Apply Page slide350ms ease-out: outgoing -30px/opacity0/blur2, incoming +30px to rest; mirror on Back. Keep persistent frame/nav shared, sweep one88px curtain through the frame. Rapid navigation reads the displayed screen before cancelling old WAAPI, retains at most one inert aria-hidden outgoing clone, guards stale finishes, and releases animations on disposal. No busy lock or timer race. Reduced motion uses150ms opacity only; thumbnail retains the exact initial curtain pose. All classes stay prefixed d-curtain, no owned reset or toolbar.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"logo-marquee",
 title:"Logo Marquee",
 cat:"Layout & UI",
 rootClass:"d-logos",
 tags:["marquee","logos","social proof","mask fade","ambient"],
 libs:[],
 desc:"Two rows of customer wordmarks drift in opposite directions behind soft edge fades. Twelve fictional companies each get their own type treatment and SVG mark; hovering a row pauses it and lights the logo under the pointer.",
 seen:"Pattern family: opposing logo marquees",
 hint:"Ambient · Two rows of wordmarks drift in opposite directions; hover a row to pause it",
 html:`<div class="d-logos" role="img" aria-label="Trusted by teams at Northwind, Halcyon, Lumen, Orbit, Quanta, Ferro and Co., Kestrel, Atlas Freight, Parallel, Mosaic, Tidewater and Vela Studio" data-paused="false">
  <p class="d-logos-eyebrow" aria-hidden="true">Trusted by product teams at <b>2,400+</b> companies</p>
  <div class="d-logos-row d-logos-row--a" aria-hidden="true"><div class="d-logos-track"><div class="d-logos-set">
    <span class="d-logos-logo d-logos-northwind"><svg viewBox="0 0 24 24"><path d="M12 2.5l4.3 9.5L12 21.5 7.7 12z" opacity=".38"/><path d="M12 2.5l4.3 9.5H7.7z"/></svg>Northwind</span>
    <span class="d-logos-logo d-logos-halcyon"><svg viewBox="0 0 24 24"><path d="M6.2 16a5.8 5.8 0 0 1 11.6 0z"/><path class="d-logos-stroke" d="M3 18.6h18M12 4.4v2.6M5.2 7.6l1.8 1.8M18.8 7.6L17 9.4"/></svg>Halcyon</span>
    <span class="d-logos-logo d-logos-lumen"><svg viewBox="0 0 24 24"><path d="M12 2.5c.9 5.2 4.3 8.6 9.5 9.5-5.2.9-8.6 4.3-9.5 9.5-.9-5.2-4.3-8.6-9.5-9.5 5.2-.9 8.6-4.3 9.5-9.5z"/></svg>Lumen</span>
    <span class="d-logos-logo d-logos-orbit"><svg viewBox="0 0 24 24"><circle class="d-logos-stroke" cx="11" cy="13" r="7.2"/><circle cx="18.6" cy="5.6" r="2.7"/></svg>orbit</span>
    <span class="d-logos-logo d-logos-quanta"><i>[</i>quanta<i>]</i></span>
    <span class="d-logos-logo d-logos-ferro">Ferro <em>&amp;</em> Co.</span>
  </div></div></div>
  <div class="d-logos-row d-logos-row--b" aria-hidden="true"><div class="d-logos-track"><div class="d-logos-set">
    <span class="d-logos-logo d-logos-kestrel"><svg viewBox="0 0 24 24"><path class="d-logos-stroke" d="M2.5 8.2L12 15l9.5-6.8"/><path class="d-logos-stroke" d="M7 6l5 3.6L17 6" opacity=".55"/></svg>Kestrel</span>
    <span class="d-logos-logo d-logos-atlas"><svg viewBox="0 0 24 24"><circle class="d-logos-stroke" cx="12" cy="12" r="8.6"/><path class="d-logos-stroke" d="M3.6 12h16.8M12 3.4c2.4 2.4 3.6 5.3 3.6 8.6s-1.2 6.2-3.6 8.6c-2.4-2.4-3.6-5.3-3.6-8.6s1.2-6.2 3.6-8.6z"/></svg>Atlas Freight</span>
    <span class="d-logos-logo d-logos-parallel"><svg viewBox="0 0 24 24"><path d="M8.4 3.5h4.2L8 20.5H3.8zM16.4 3.5h4.2L16 20.5h-4.2z"/></svg>Parallel</span>
    <span class="d-logos-logo d-logos-mosaic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1.6"/><rect x="13" y="3" width="8" height="8" rx="4" opacity=".5"/><rect x="3" y="13" width="8" height="8" rx="4" opacity=".5"/><rect x="13" y="13" width="8" height="8" rx="1.6"/></svg>Mosaic</span>
    <span class="d-logos-logo d-logos-tide"><svg viewBox="0 0 24 24"><path class="d-logos-stroke" d="M2.5 9.5c2.4-2 4.8-2 7.2 0s4.8 2 7.2 0c1.6-1.3 3.2-1.6 4.6-1M2.5 15.5c2.4-2 4.8-2 7.2 0s4.8 2 7.2 0c1.6-1.3 3.2-1.6 4.6-1"/></svg>Tidewater</span>
    <span class="d-logos-logo d-logos-vela"><svg viewBox="0 0 24 24"><path class="d-logos-stroke" d="M12.5 3v15.5M12.5 3.2c4 3.2 6.4 7.6 6.8 12.8h-6.8M10.4 6.4C8 9 6.6 12.2 6.2 16h4.2M4 19.5c2.6 1.3 5.4 1.6 8.5 1.6s5.9-.3 8.5-1.6"/></svg>Vela<small>studio</small></span>
  </div></div></div>
  <p class="d-logos-live" role="status" aria-live="polite"></p>
</div>`,
 css:`.d-logos{--ink:#f2f2f2;--logo-ink:#a6a6a6;--logo-hi:#fafafa;--ink-3:#8a8a8a;--accent:#fa7319;--logo:23px;--gap:56px;position:relative;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:22px;width:100%;height:100%;padding:0 0 56px;overflow:clip;font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.d-logos *{box-sizing:border-box}
.d-logos-eyebrow{margin:0 0 6px;text-align:center;font-size:13px;line-height:18px;font-weight:500;color:var(--ink-3)}
.d-logos-eyebrow b{font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums}
.d-logos-row{position:relative;overflow:clip;padding:6px 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent)}
.d-logos-track{display:flex;width:max-content;animation:d-logos-left var(--d-logos-dur,48s) linear infinite;will-change:transform}
.d-logos-row--b .d-logos-track{animation-name:d-logos-right}
.d-logos[data-paused="true"] .d-logos-track,.d-logos-row:focus-within .d-logos-track{animation-play-state:paused}
@media (hover:hover){.d-logos-row:hover .d-logos-track{animation-play-state:paused}}
.d-logos-set{display:flex;align-items:center;flex:none}
.d-logos-logo{display:flex;align-items:center;gap:.36em;flex:none;height:44px;margin-right:var(--gap);font-size:var(--logo);line-height:1;white-space:nowrap;color:var(--logo-ink);transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-logos-logo:hover{color:var(--logo-hi)}}
.d-logos-logo svg{width:1.08em;height:1.08em;flex:none;fill:currentColor}
.d-logos-stroke{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.d-logos-northwind{font-weight:650;letter-spacing:-.035em}
.d-logos-halcyon{font-family:Newsreader,Georgia,serif;font-style:italic;font-weight:500;font-size:calc(var(--logo) * 1.12);letter-spacing:-.01em}
.d-logos-lumen{font-family:Manrope,Geist,sans-serif;font-weight:800;font-size:calc(var(--logo) * .74);letter-spacing:.26em;text-transform:uppercase}
.d-logos-lumen svg{width:1.3em;height:1.3em;margin-right:.1em}
.d-logos-orbit{font-family:Manrope,Geist,sans-serif;font-weight:700;font-size:calc(var(--logo) * 1.04);letter-spacing:-.045em}
.d-logos-quanta{font-family:'Geist Mono',ui-monospace,monospace;font-weight:500;font-size:calc(var(--logo) * .86);letter-spacing:-.02em;gap:.12em}
.d-logos-quanta i{font-style:normal;font-weight:300;opacity:.55}
.d-logos-ferro{font-family:Newsreader,Georgia,serif;font-weight:600;font-size:calc(var(--logo) * 1.06);letter-spacing:-.015em;gap:.22em}
.d-logos-ferro em{font-weight:400;font-style:italic;opacity:.7}
.d-logos-kestrel{font-family:Inter,Geist,sans-serif;font-weight:800;letter-spacing:-.05em;font-style:italic}
.d-logos-atlas{font-weight:500;font-size:calc(var(--logo) * .64);letter-spacing:.24em;text-transform:uppercase;gap:.7em}
.d-logos-atlas svg{width:1.7em;height:1.7em}
.d-logos-parallel{font-weight:600;letter-spacing:-.02em}
.d-logos-mosaic{font-family:Manrope,Geist,sans-serif;font-weight:600;letter-spacing:-.01em}
.d-logos-mosaic svg{width:.96em;height:.96em}
.d-logos-tide{font-family:Newsreader,Georgia,serif;font-weight:400;font-size:calc(var(--logo) * 1.08);letter-spacing:.01em}
.d-logos-vela{font-family:Allura,Newsreader,serif;font-size:calc(var(--logo) * 1.5);gap:.16em}
.d-logos-vela svg{width:.76em;height:.76em}
.d-logos-vela small{align-self:flex-end;margin:0 0 .5em .2em;font-family:Geist,system-ui,sans-serif;font-size:max(11px,calc(var(--logo) * .48));letter-spacing:.2em;text-transform:uppercase;opacity:.7}
@keyframes d-logos-left{to{transform:translateX(-50%)}}
@keyframes d-logos-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}
.d-logos-live{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.d-logos[data-mode="thumb"]{--logo:19px;--gap:36px;gap:10px;padding:0 0 30px}
.d-logos[data-mode="thumb"] .d-logos-eyebrow{margin:0 0 4px;font-size:12px}
.d-logos[data-mode="thumb"] .d-logos-logo{height:36px}
.d-logos[data-mode="thumb"] .d-logos-row{-webkit-mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
[data-stage-theme="light"] .d-logos{--ink:#171717;--logo-ink:#5c5c5c;--logo-hi:#0a0a0a;--ink-3:#6b6b6b}
@media (prefers-reduced-motion:reduce){.d-logos-track{animation:none!important;transform:translateX(var(--d-logos-still,0px))}.d-logos-logo{transition-duration:var(--dur-quick,150ms)}}`,
 js:`const C='d-logos',$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
root.dataset.mode=ctx.mode;
const live=root.querySelector('.'+C+'-live'),SPEED=ctx.mode==='thumb'?30:38;
let paused=false,dead=false;
// Two copies of each set make the loop seamless: the track travels exactly one set width.
const tracks=$$('.'+C+'-track');
tracks.forEach(track=>{const copy=track.firstElementChild.cloneNode(true);track.appendChild(copy);});
function size(){tracks.forEach((track,i)=>{const set=track.firstElementChild.offsetWidth;track.style.setProperty('--d-logos-dur',(set/SPEED).toFixed(2)+'s');
 // Reduced motion: a still frame with the row centred on its second logo.
 if(reduced)track.style.setProperty('--d-logos-still',(-(i?set*.42:set*.08)).toFixed(1)+'px');});}
size();
if(document.fonts)document.fonts.ready.then(()=>{if(!dead)size();});
const ro=new ResizeObserver(size);ro.observe(root);
ctx.onAction('pause',()=>{
 paused=!paused;root.dataset.paused=String(paused);
 live.textContent=reduced?'Reduced motion keeps both rows still':paused?'Logo marquee paused':'Logo marquee playing';
 ctx.emit('marquee',{paused});
});
return()=>{dead=true;ro.disconnect();};`,
 prompt:`Build a customer-logo marquee section in plain HTML, CSS and JavaScript with no libraries, filling its container edge to edge. Centre a 13px eyebrow, "Trusted by product teams at 2,400+ companies" (the count in near-white tabular figures), above two rows of wordmarks for twelve fictional companies, each with its own type treatment and a small inline SVG mark drawn in currentColor: Northwind (Geist 650, tight tracking, half-filled compass diamond), Halcyon (Newsreader italic, rising half-sun), LUMEN (Manrope 800 uppercase, 0.26em tracking, four-point star), orbit (Manrope 700 lowercase, ring with a satellite dot), [quanta] (Geist Mono with faint brackets), Ferro & Co. (Newsreader 600 with an italic ampersand), Kestrel (Inter 800 italic, double chevron wings), ATLAS FREIGHT (small spaced caps beside an outlined globe), Parallel (two slanted bars), Mosaic (2×2 tiles mixing squares and circles), Tidewater (Newsreader with two wave strokes) and Vela STUDIO (Allura script with a sail mark). All marks sit in one neutral grey (#a6a6a6) and brighten to near-white on hover. Each row clips a flex track that holds the set twice; JavaScript clones the set, measures one set width and sets the animation duration to width ÷ speed (38px/s, 30px/s in thumbnails) so both rows move at the same pace. The first row animates translateX(0 → −50%) and the second translateX(−50% → 0), both linear and infinite. Rows fade at their edges with mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent). Hovering a row (inside @media (hover: hover)) or focusing inside it sets animation-play-state: paused; a Pause / resume control toggles a data attribute that pauses both rows and announces the state in a polite live region. The whole block is one role="img" with an aria-label listing every company; the moving rows are aria-hidden. Reduced motion removes the animation and holds a still frame offset so each row starts mid-logo. Thumbnail mode uses 19px wordmarks and tighter gaps. Include a light stage theme.`
});
