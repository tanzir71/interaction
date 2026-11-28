/* Feature Bento: an original INTRX section. Five feature cells for a fictional deploy platform, each with a small live visual. */
INTRX.register({
  id: 'section-feature-bento',
  title: 'Feature Bento',
  cat: 'Features & Bento',
  rootClass: 'd-sec-bento',
  tags: ['bento', 'features', 'section', 'command menu', 'uptime', 'border glow', 'landing page'],
  libs: [],
  desc: 'A five-cell bento for a fictional developer platform: a command menu that types and runs a deploy, uptime bars, a streaming build log, an edge map and preview switches. Each visual idles quietly and plays in full on hover while a border glow follows the pointer across cells.',
  seen: 'Seen on: Vercel, Linear and Raycast feature sections',
  hint: 'Hover · each cell plays its visual; the border glow follows the pointer across cells',
  html: String.raw`<section class="d-sec-bento" aria-labelledby="d-sec-bento-title">
  <header class="d-sec-bento-head">
    <div class="d-sec-bento-intro">
      <p class="d-sec-bento-eyebrow">Platform</p>
      <h2 class="d-sec-bento-title" id="d-sec-bento-title">From git push to production</h2>
    </div>
    <p class="d-sec-bento-sub">Tarn previews every branch, ships to 16 regions and rolls back in a single keystroke.</p>
  </header>
  <div class="d-sec-bento-grid">
    <article class="d-sec-bento-cell d-sec-bento-cell--wide" data-viz="palette">
      <div class="d-sec-bento-copy">
        <span class="d-sec-bento-keycap" aria-hidden="true">⌘K</span>
        <h3 class="d-sec-bento-name"><a class="d-sec-bento-link" href="#command-menu">Command menu</a></h3>
        <p class="d-sec-bento-desc">Deploy, promote and roll back without leaving the keyboard.</p>
      </div>
      <div class="d-sec-bento-viz" aria-hidden="true">
        <div class="d-sec-bento-pal">
          <div class="d-sec-bento-pal-input"><svg class="d-sec-bento-ico" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg><span class="d-sec-bento-pal-q">deploy prod</span><span class="d-sec-bento-caret"></span><span class="d-sec-bento-pal-ph" hidden>Search commands…</span><span class="d-sec-bento-kbd">esc</span></div>
          <p class="d-sec-bento-pal-group">Deployments</p>
          <div class="d-sec-bento-pal-list">
            <span class="d-sec-bento-pal-hl"></span>
            <div class="d-sec-bento-pal-row" data-label="Open deployment logs"><svg class="d-sec-bento-ico" viewBox="0 0 16 16"><path d="M3 4h10M3 8h10M3 12h6"/></svg><span class="d-sec-bento-pal-label">Open deployment logs</span><span class="d-sec-bento-pal-hint">⌘ L</span></div>
            <div class="d-sec-bento-pal-row" data-label="Deploy to production" data-run="true"><svg class="d-sec-bento-ico" viewBox="0 0 16 16"><path d="M8 11.5V3M4.5 6.5L8 3l3.5 3.5M3 13.5h10"/></svg><span class="d-sec-bento-pal-label">Deploy to production</span><span class="d-sec-bento-pal-hint">a1f9c2e</span></div>
            <div class="d-sec-bento-pal-row" data-label="Roll back production"><svg class="d-sec-bento-ico" viewBox="0 0 16 16"><path d="M3.5 6.5h6a3.25 3.25 0 0 1 0 6.5H6.5M3.5 6.5L6 4M3.5 6.5L6 9"/></svg><span class="d-sec-bento-pal-label">Roll back production</span><span class="d-sec-bento-pal-hint">to #2839</span></div>
            <div class="d-sec-bento-pal-row" data-label="Promote preview"><svg class="d-sec-bento-ico" viewBox="0 0 16 16"><path d="M5 11l6-6M6 5h5v5"/></svg><span class="d-sec-bento-pal-label">Promote preview</span><span class="d-sec-bento-pal-hint">billing-v2</span></div>
          </div>
        </div>
      </div>
    </article>
    <article class="d-sec-bento-cell" data-viz="uptime">
      <div class="d-sec-bento-viz">
        <div class="d-sec-bento-up-top"><span class="d-sec-bento-up-num">99.99%</span><span class="d-sec-bento-pill"><i class="d-sec-bento-dot"></i>Operational</span></div>
        <div class="d-sec-bento-bars is-grown" aria-hidden="true"><span class="d-sec-bento-tip">Nov 17 · 4 min degraded · fra1</span></div>
        <div class="d-sec-bento-axis" aria-hidden="true"><span>30 days ago</span><span>Today</span></div>
      </div>
      <div class="d-sec-bento-copy"><h3 class="d-sec-bento-name"><a class="d-sec-bento-link" href="#status">Status you can trust</a></h3><p class="d-sec-bento-desc">Every region probed every 30 seconds.</p></div>
    </article>
    <article class="d-sec-bento-cell" data-viz="log">
      <div class="d-sec-bento-viz">
        <ol class="d-sec-bento-log" aria-label="Build log">
          <li class="d-sec-bento-line"><span class="d-sec-bento-ts">14:02:11</span>Cloning a1f9c2e</li>
          <li class="d-sec-bento-line"><span class="d-sec-bento-ts">14:02:13</span>Restored cache · 412 MB</li>
          <li class="d-sec-bento-line"><span class="d-sec-bento-ts">14:02:24</span>Built 38 routes · 11.2s</li>
          <li class="d-sec-bento-line"><span class="d-sec-bento-ts">14:02:29</span>Uploaded to 16 regions</li>
          <li class="d-sec-bento-line d-sec-bento-line--done"><span class="d-sec-bento-ts">14:02:30</span><svg class="d-sec-bento-ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg><b>Ready</b> in 19s</li>
        </ol>
        <div class="d-sec-bento-progress" aria-hidden="true"><i></i></div>
      </div>
      <div class="d-sec-bento-copy"><h3 class="d-sec-bento-name"><a class="d-sec-bento-link" href="#builds">Builds you can watch</a></h3><p class="d-sec-bento-desc">Live logs with timings for every step.</p></div>
    </article>
    <article class="d-sec-bento-cell" data-viz="map">
      <div class="d-sec-bento-viz" aria-hidden="true"><svg class="d-sec-bento-map" viewBox="0 0 240 105"></svg></div>
      <div class="d-sec-bento-copy"><span class="d-sec-bento-chip">p50 · 31 ms</span><h3 class="d-sec-bento-name"><a class="d-sec-bento-link" href="#edge">Edge in 16 regions</a></h3><p class="d-sec-bento-desc">Most requests land within 40 ms.</p></div>
    </article>
    <article class="d-sec-bento-cell" data-viz="previews">
      <div class="d-sec-bento-viz">
        <ul class="d-sec-bento-envs" aria-label="Preview environments">
          <li class="d-sec-bento-env" data-state="ready"><i class="d-sec-bento-dot"></i><span class="d-sec-bento-env-name">feat/billing-v2</span><span class="d-sec-bento-env-state">Ready</span><button type="button" class="d-sec-bento-switch" role="switch" aria-checked="true" aria-label="Preview for feat/billing-v2"><span class="d-sec-bento-knob"></span></button></li>
          <li class="d-sec-bento-env" data-state="building"><i class="d-sec-bento-dot"></i><span class="d-sec-bento-env-name">fix/focus-trap</span><span class="d-sec-bento-env-state">Building</span><button type="button" class="d-sec-bento-switch" role="switch" aria-checked="true" aria-label="Preview for fix/focus-trap"><span class="d-sec-bento-knob"></span></button></li>
          <li class="d-sec-bento-env" data-state="off"><i class="d-sec-bento-dot"></i><span class="d-sec-bento-env-name">chore/deps-nov</span><span class="d-sec-bento-env-state">Off</span><button type="button" class="d-sec-bento-switch" role="switch" aria-checked="false" aria-label="Preview for chore/deps-nov"><span class="d-sec-bento-knob"></span></button></li>
        </ul>
      </div>
      <div class="d-sec-bento-copy"><h3 class="d-sec-bento-name"><a class="d-sec-bento-link" href="#previews">A preview for every branch</a></h3><p class="d-sec-bento-desc">Every pull request gets its own URL.</p></div>
    </article>
  </div>
  <p class="d-sec-bento-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-bento{--fs:var(--fit-scale,1);--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.16);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--cell-a:#1a1a1a;--cell-b:#141414;--well:rgba(255,255,255,.035);--bar:#d6d6d6;--land:rgba(255,255,255,.27);--accent:#fa7319;--accent-ink:#ffb27a;--mono:'Geist Mono',ui-monospace,monospace;position:relative;width:100%;height:100%;display:flex;flex-direction:column;gap:20px;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-bento *{box-sizing:border-box}
.d-sec-bento-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
.d-sec-bento-eyebrow{margin:0 0 6px;font-size:12px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
.d-sec-bento-title{margin:0;font-size:28px;line-height:32px;font-weight:600;letter-spacing:-.025em}
.d-sec-bento-sub{margin:0;max-width:300px;font-size:13px;line-height:19px;color:var(--ink-2);text-wrap:pretty}
.d-sec-bento-grid{flex:1;min-height:0;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:12px}
.d-sec-bento-cell{--mx:-999px;--my:-999px;position:relative;isolation:isolate;grid-column:span 2;display:flex;flex-direction:column;min-width:0;min-height:0;padding:16px;overflow:hidden;border-radius:16px;background:linear-gradient(var(--cell-a),var(--cell-b));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.4)}
.d-sec-bento-cell::before{content:'';position:absolute;inset:0;z-index:3;padding:1px;border-radius:inherit;background:radial-gradient(240px circle at var(--mx) var(--my),rgba(250,115,25,.8),rgba(250,115,25,.2) 40%,transparent 70%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);opacity:0;pointer-events:none;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-cell::after{content:'';position:absolute;inset:0;z-index:0;border-radius:inherit;background:radial-gradient(300px circle at var(--mx) var(--my),rgba(255,255,255,.045),transparent 65%);opacity:0;pointer-events:none;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-grid.is-glow .d-sec-bento-cell::before,.d-sec-bento-cell.is-focus::before{opacity:1;transition-duration:var(--dur-quick,150ms)}
.d-sec-bento-cell.is-hot::after{opacity:1;transition-duration:var(--dur-quick,150ms)}
.d-sec-bento-cell--wide{grid-column:span 4;flex-direction:row;gap:20px}
.d-sec-bento-viz{position:relative;z-index:1;flex:1;min-width:0;min-height:0}
.d-sec-bento-copy{position:relative;z-index:1;flex:none;margin-top:12px}
.d-sec-bento-cell--wide .d-sec-bento-copy{display:flex;flex-direction:column;width:188px;margin:0}
.d-sec-bento-keycap{align-self:flex-start;display:grid;place-items:center;min-width:34px;height:30px;padding:0 8px;margin-bottom:auto;border-radius:8px;font-size:13px;font-weight:500;color:var(--ink);background:linear-gradient(#2a2a2a,#1f1f1f);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.1),0 2px 0 #0c0c0c,0 3px 6px rgba(0,0,0,.4)}
.d-sec-bento-name{margin:0;font-size:14px;line-height:18px;font-weight:600;letter-spacing:-.01em}
.d-sec-bento-link{color:inherit;text-decoration:none;border-radius:4px;outline:none}
.d-sec-bento-link:focus-visible{box-shadow:0 0 0 2px var(--focus-ring,#fa7319)}
.d-sec-bento-desc{margin:3px 0 0;font-size:12.5px;line-height:17px;color:var(--ink-3)}
.d-sec-bento-ico{flex:none;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
/* Command menu */
.d-sec-bento-cell--wide .d-sec-bento-viz{margin:0 -16px -16px 0}
.d-sec-bento-pal{position:absolute;top:0;left:0;right:16px;bottom:-24px;display:flex;flex-direction:column;border-radius:12px;background:linear-gradient(#222,#1b1b1b);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.07),0 24px 48px -16px rgba(0,0,0,.8);-webkit-mask-image:linear-gradient(#000 calc(100% - 78px),transparent calc(100% - 26px));mask-image:linear-gradient(#000 calc(100% - 78px),transparent calc(100% - 26px))}
.d-sec-bento-pal-input{display:flex;align-items:center;gap:9px;height:40px;flex:none;padding:0 12px 0 14px;border-bottom:1px solid var(--edge);font-size:13.5px;color:var(--ink)}
.d-sec-bento-pal-input>.d-sec-bento-ico{color:var(--ink-3)}
.d-sec-bento-pal-q{white-space:pre}
.d-sec-bento-pal-ph{color:var(--ink-3);margin-left:-9px}
.d-sec-bento-caret{width:1.5px;height:16px;margin-left:-8px;border-radius:1px;background:var(--accent);animation:d-sec-bento-blink 1.06s steps(1) infinite}
@keyframes d-sec-bento-blink{50%{opacity:0}}
.d-sec-bento-kbd{margin-left:auto;padding:0 6px;border-radius:5px;font:500 11px/18px var(--mono);color:var(--ink-3);box-shadow:inset 0 0 0 1px var(--edge-hi)}
.d-sec-bento-pal-group{margin:0;padding:8px 14px 3px;font-size:11px;line-height:16px;font-weight:500;color:var(--ink-3)}
.d-sec-bento-pal-list{position:relative;padding:0 6px}
.d-sec-bento-pal-hl{position:absolute;top:0;left:6px;right:6px;height:30px;border-radius:8px;background:rgba(255,255,255,.065);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);transition:transform 160ms var(--ease-out,cubic-bezier(.22,1,.36,1)),background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-pal-hl.is-press{background:rgba(250,115,25,.14);box-shadow:inset 0 0 0 1px rgba(250,115,25,.4)}
.d-sec-bento-pal-row{position:relative;display:flex;align-items:center;gap:10px;height:30px;padding:0 10px;font-size:13px;color:var(--ink-2);transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-pal-row.is-active{color:var(--ink)}
.d-sec-bento-pal-row.is-miss{opacity:.38}
.d-sec-bento-pal-row .d-sec-bento-ico{color:var(--ink-3)}
.d-sec-bento-pal-row.is-active .d-sec-bento-ico{color:var(--ink)}
.d-sec-bento-pal-label b{font-weight:600;color:var(--ink)}
.d-sec-bento-pal-hint{margin-left:auto;font:400 11px/16px var(--mono);color:var(--ink-3);transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out),color var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-bento-pal-hint.is-swap{opacity:0}
.d-sec-bento-pal-row[data-state="busy"] .d-sec-bento-pal-hint{color:var(--accent-ink)}
.d-sec-bento-pal-row[data-state="live"] .d-sec-bento-pal-hint{color:var(--ink)}
/* Uptime */
.d-sec-bento-up-top{display:flex;align-items:center;justify-content:space-between}
.d-sec-bento-up-num{font-size:24px;line-height:28px;font-weight:600;letter-spacing:-.03em}
.d-sec-bento-pill{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px 0 8px;border-radius:999px;font-size:11px;line-height:1;color:var(--ink-2);background:var(--well);box-shadow:inset 0 0 0 1px var(--edge)}
.d-sec-bento-dot{flex:none;width:6px;height:6px;border-radius:50%;background:#e6e6e6;box-shadow:0 0 0 3px rgba(255,255,255,.08)}
.d-sec-bento-bars{position:relative;display:flex;gap:3px;height:38px;margin-top:12px}
.d-sec-bento-bar{flex:1;border-radius:2px;background:var(--bar);opacity:.35;transform:scaleY(.22);transform-origin:50% 100%}
.d-sec-bento-bar.is-amber{background:var(--accent)}
.d-sec-bento-bar:last-of-type{animation:d-sec-bento-breathe 2.4s var(--ease-in-out,ease-in-out) infinite}
@keyframes d-sec-bento-breathe{50%{filter:brightness(.6)}}
.d-sec-bento-bars.is-grown .d-sec-bento-bar{opacity:.82;transform:none;transition:transform var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) calc(var(--i) * 10ms),opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) calc(var(--i) * 10ms)}
.d-sec-bento-bars.is-grown .d-sec-bento-bar.is-amber{opacity:1}
.d-sec-bento-bars.is-reset .d-sec-bento-bar{transition:none}
.d-sec-bento-tip{position:absolute;z-index:2;bottom:calc(100% + 7px);left:var(--at,58%);padding:0 8px;border-radius:7px;white-space:nowrap;font:500 11px/22px Geist,system-ui,sans-serif;color:var(--ink);background:#262626;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),0 8px 20px -6px rgba(0,0,0,.7);opacity:0;transform:translateX(-50%) scale(.98);transform-origin:50% 100%;pointer-events:none;transition:opacity 50ms var(--ease-out,cubic-bezier(.22,1,.36,1)),transform 50ms var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-tip.is-on{opacity:1;transform:translateX(-50%);transition-duration:var(--dur-quick,150ms)}
.d-sec-bento-tip::after{content:'';position:absolute;top:100%;left:50%;width:7px;height:7px;margin:-4px 0 0 -3.5px;background:#262626;box-shadow:1px 1px 0 rgba(255,255,255,.12);transform:rotate(45deg)}
.d-sec-bento-axis{display:flex;justify-content:space-between;margin-top:7px;font-size:11px;line-height:14px;color:var(--ink-3)}
/* Build log */
.d-sec-bento-log{margin:0;padding:0;list-style:none;font:400 11px/17px var(--mono);color:var(--ink-2)}
.d-sec-bento-line{display:flex;align-items:center;gap:5px;white-space:nowrap;transition:opacity var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),filter var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-ts{margin-right:5px;color:var(--ink-3);opacity:.75}
.d-sec-bento-line--done{color:var(--ink)}
.d-sec-bento-line--done .d-sec-bento-ico{width:12px;height:12px;color:var(--accent);stroke-width:2}
.d-sec-bento-line b{font-weight:600}
.d-sec-bento-log.is-playing .d-sec-bento-line:not(.is-in){opacity:0;transform:translateY(4px);filter:blur(2px);transition:none}
.d-sec-bento-progress{height:2px;margin-top:10px;border-radius:2px;background:var(--well);overflow:hidden}
.d-sec-bento-progress i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,rgba(250,115,25,.5),var(--accent));transform:scaleX(var(--p,1));transform-origin:0 50%;transition:transform var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
/* Edge map */
.d-sec-bento-cell[data-viz="map"] .d-sec-bento-viz{display:flex;justify-content:center;margin:-4px -6px 0}
.d-sec-bento-map{display:block;height:100%;max-width:100%;overflow:visible}
.d-sec-bento-land{fill:var(--land)}
.d-sec-bento-core{fill:var(--accent)}
.d-sec-bento-ring{fill:var(--accent);opacity:0;transform-box:fill-box;transform-origin:center}
.d-sec-bento-node.is-idle .d-sec-bento-ring{animation:d-sec-bento-ping 2.4s var(--ease-out,cubic-bezier(.22,1,.36,1)) infinite;animation-delay:calc(var(--k) * 40ms)}
.d-sec-bento-cell.is-live .d-sec-bento-ring{animation:d-sec-bento-ping 1.6s var(--ease-out,cubic-bezier(.22,1,.36,1)) infinite;animation-delay:calc(var(--x) * 9ms)}
@keyframes d-sec-bento-ping{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(4.4)}}
.d-sec-bento-chip{position:absolute;right:0;top:-1px;padding:0 7px;border-radius:6px;font:500 11px/20px var(--mono);color:var(--ink-2);background:var(--well);box-shadow:inset 0 0 0 1px var(--edge);transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-cell.is-live .d-sec-bento-chip{color:var(--accent-ink);box-shadow:inset 0 0 0 1px rgba(250,115,25,.35)}
/* Preview switches */
.d-sec-bento-envs{display:flex;flex-direction:column;gap:5px;margin:0;padding:0;list-style:none}
.d-sec-bento-env{display:flex;align-items:center;gap:9px;height:30px;padding:0 6px 0 11px;border-radius:9px;background:var(--well);box-shadow:inset 0 0 0 1px var(--edge)}
.d-sec-bento-env-name{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:400 11.5px/1 var(--mono);color:var(--ink)}
.d-sec-bento-env-state{font-size:11px;line-height:1;color:var(--ink-3);transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-env .d-sec-bento-dot{transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-env[data-state="building"] .d-sec-bento-dot{background:var(--accent);box-shadow:0 0 0 3px rgba(250,115,25,.18);animation:d-sec-bento-pulse 1.2s var(--ease-in-out,ease-in-out) infinite}
.d-sec-bento-env[data-state="building"] .d-sec-bento-env-state{color:var(--accent-ink)}
.d-sec-bento-env[data-state="off"] .d-sec-bento-dot{background:transparent;box-shadow:inset 0 0 0 1.5px var(--ink-3)}
.d-sec-bento-env[data-state="off"] .d-sec-bento-env-name{color:var(--ink-3)}
@keyframes d-sec-bento-pulse{50%{opacity:.45}}
.d-sec-bento-switch{position:relative;flex:none;width:28px;height:16px;padding:0;border:0;border-radius:999px;background:rgba(255,255,255,.14);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);cursor:pointer;transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-bento-switch[aria-checked="true"]{background:var(--accent)}
.d-sec-bento-switch:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-sec-bento-knob{position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.4);transition:transform var(--dur-medium,350ms) var(--ease-bounce,cubic-bezier(.34,1.35,.64,1))}
.d-sec-bento-switch[aria-checked="true"] .d-sec-bento-knob{transform:translateX(12px)}
.d-sec-bento-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: the command menu above the uptime cell. */
.d-sec-bento[data-mode="thumb"]{gap:0}
.d-sec-bento[data-mode="thumb"] :is(.d-sec-bento-head,.d-sec-bento-copy,.d-sec-bento-axis,.d-sec-bento-pill,[data-viz="log"],[data-viz="map"],[data-viz="previews"]){display:none}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-grid{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;gap:8px}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-cell{grid-column:auto;padding:12px;border-radius:14px}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-cell--wide .d-sec-bento-viz{margin:0 -12px -12px 0}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-pal{right:12px;bottom:-20px;border-radius:10px;-webkit-mask-image:linear-gradient(#000 calc(100% - 64px),transparent calc(100% - 20px));mask-image:linear-gradient(#000 calc(100% - 64px),transparent calc(100% - 20px))}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-pal-input{height:34px;font-size:max(12px,calc(11px / var(--fs)))}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-pal-group{display:none}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-pal-list{padding-top:5px}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-pal-hl{height:27px}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-pal-row{height:27px;font-size:max(11.5px,calc(11px / var(--fs)))}
.d-sec-bento[data-mode="thumb"] :is(.d-sec-bento-pal-hint,.d-sec-bento-kbd,.d-sec-bento-tip){font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-up-num{font-size:18px;line-height:22px}
.d-sec-bento[data-mode="thumb"] .d-sec-bento-bars{height:20px;margin-top:8px;gap:2px}
[data-stage-theme="light"] .d-sec-bento{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--edge:rgba(0,0,0,.09);--edge-hi:rgba(0,0,0,.16);--cell-a:#fff;--cell-b:#fafafa;--well:rgba(0,0,0,.03);--bar:#3a3a3a;--land:rgba(0,0,0,.2);--accent-ink:#b4500c}
[data-stage-theme="light"] .d-sec-bento-cell{box-shadow:inset 0 0 0 1px var(--edge),0 1px 2px rgba(0,0,0,.05)}
[data-stage-theme="light"] .d-sec-bento-cell::after{background:radial-gradient(300px circle at var(--mx) var(--my),rgba(0,0,0,.03),transparent 65%)}
[data-stage-theme="light"] .d-sec-bento-pal{background:#fff;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1),0 24px 48px -20px rgba(0,0,0,.25)}
[data-stage-theme="light"] .d-sec-bento-pal-hl{background:rgba(0,0,0,.05);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}
[data-stage-theme="light"] .d-sec-bento-keycap{color:#171717;background:linear-gradient(#fff,#f2f2f2);box-shadow:inset 0 0 0 1px rgba(0,0,0,.1),0 2px 0 #d9d9d9}
[data-stage-theme="light"] .d-sec-bento-tip,[data-stage-theme="light"] .d-sec-bento-tip::after{background:#171717;color:#fafafa}

[data-stage-theme="light"] .d-sec-bento-dot{background:#3a3a3a;box-shadow:0 0 0 3px rgba(0,0,0,.06)}
[data-stage-theme="light"] .d-sec-bento-switch:not([aria-checked="true"]){background:rgba(0,0,0,.14)}
@media (prefers-reduced-motion:reduce){.d-sec-bento *{transition-duration:var(--dur-quick,150ms)!important;transition-delay:0ms!important;transition-property:opacity,color,background-color,box-shadow!important;animation:none!important}.d-sec-bento-log.is-playing .d-sec-bento-line:not(.is-in){transform:none;filter:none}.d-sec-bento-tip.is-on,.d-sec-bento-tip{transform:translateX(-50%)}.d-sec-bento-cell.is-live .d-sec-bento-ring{opacity:.35;transform:scale(2.2)}}`,
  js: String.raw`const C='d-sec-bento',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
root.dataset.mode=ctx.mode;
const thumb=ctx.mode==='thumb',canHover=matchMedia('(hover:hover)').matches;
const grid=$('.'+C+'-grid'),live=$('.'+C+'-live');
let dead=false,touched=false,idle=0,graf=0,gx=0,gy=0;
const say=t=>{live.textContent=t;};
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
const cells=$$('.'+C+'-cell').filter(c=>getComputedStyle(c).display!=='none').map(el=>({el,kind:el.dataset.viz,timers:[],busy:false,hot:false}));
const cellOf=k=>cells.find(c=>c.kind===k);
const T=(cell,ms,fn)=>{cell.timers.push(setTimeout(()=>{if(!dead)fn();},ms));};
// Uptime: thirty daily bars ending today; one amber day.
const AMBER=17,bars=$('.'+C+'-bars'),tip=$('.'+C+'-tip');
for(let i=0;i<30;i++){const b=document.createElement('i');b.className=C+'-bar'+(i===AMBER?' is-amber':'');b.style.setProperty('--i',i);bars.appendChild(b);}
tip.style.setProperty('--at',((AMBER+.5)/30*100).toFixed(2)+'%');
// Edge map: a coarse equirectangular world, 7.5° columns and 6° rows from 72°N, as runs of land.
const LAND=[[[4,5],[9,14],[16,20],[33,45]],[[2,14],[16,18],[20,21],[25,47]],[[3,10],[13,15],[18,18],[24,45]],[[7,11],[13,15],[22,23],[25,42],[45,45]],[[7,16],[23,41],[43,43]],[[7,14],[22,23],[25,40],[42,42]],[[8,13],[23,25],[27,40],[41,42]],[[8,12],[22,40]],[[9,10],[13,13],[21,31],[33,39],[40,40]],[[10,12],[14,14],[21,28],[30,31],[33,35],[37,38],[40,40]],[[12,12],[21,30],[34,34],[37,38],[40,40]],[[13,16],[22,30],[34,34],[37,37],[39,40]],[[13,17],[25,29],[37,40]],[[13,19],[25,29],[38,39],[42,43]],[[13,18],[25,28],[30,30],[41,42]],[[14,18],[25,28],[30,30],[40,43]],[[14,17],[26,28],[30,30],[39,44]],[[14,16],[26,27],[39,44]],[[14,15],[42,43],[47,47]],[[14,15],[43,43],[46,46]],[[14,15]]];
const NODES=[['sea',7,4],['sfo',8,6],['iad',13,5],['mex',10,9],['gru',17,16],['scl',14,18],['lhr',23,3],['fra',25,4],['arn',26,2],['jnb',27,16],['dxb',31,8],['bom',33,9],['sin',37,12],['hkg',39,8],['hnd',42,6],['syd',44,17]];
const IDLE=['iad','fra','sin'],map=$('.'+C+'-map');
if(map){let land='',nodes='';const p=v=>(v*5+2.5).toFixed(1);
 LAND.forEach((runs,r)=>runs.forEach(run=>{for(let c=run[0];c<=run[1];c++)land+='<circle cx="'+p(c)+'" cy="'+p(r)+'" r="1.2"/>';}));
 NODES.forEach((n,i)=>{nodes+='<g class="'+C+'-node'+(IDLE.includes(n[0])?' is-idle':'')+'" style="--x:'+n[1]+';--k:'+(IDLE.indexOf(n[0])*12)+'"><circle class="'+C+'-ring" cx="'+p(n[1])+'" cy="'+p(n[2])+'" r="2"/><circle class="'+C+'-core" cx="'+p(n[1])+'" cy="'+p(n[2])+'" r="1.75"/></g>';});
 map.innerHTML='<g class="'+C+'-land">'+land+'</g>'+nodes;}
// Command menu: fuzzy subsequence match, matched letters in bold, the highlight on the first match.
const pal={q:$('.'+C+'-pal-q'),ph:$('.'+C+'-pal-ph'),hl:$('.'+C+'-pal-hl'),rows:$$('.'+C+'-pal-row')};
const runRow=pal.rows.find(r=>r.dataset.run),runHint=runRow.querySelector('.'+C+'-pal-hint');
function fuzzy(label,q){const L=label.toLowerCase(),idx=[];let j=0;for(let i=0;i<L.length&&j<q.length;i++)if(L[i]===q[j]){idx.push(i);j++;}return j===q.length?idx:null;}
function paint(row,idx){const label=row.querySelector('.'+C+'-pal-label'),text=row.dataset.label,frag=document.createDocumentFragment();let buf='';
 const flush=()=>{if(buf){frag.appendChild(document.createTextNode(buf));buf='';}};
 for(let i=0;i<text.length;i++){if(idx.includes(i)){flush();const b=document.createElement('b');b.textContent=text[i];frag.appendChild(b);}else buf+=text[i];}
 flush();label.replaceChildren(frag);}
function moveHl(i){pal.rows.forEach((r,k)=>r.classList.toggle('is-active',k===i));pal.hl.style.transform='translateY('+pal.rows[i].offsetTop+'px)';}
function setQuery(q){pal.q.textContent=q;pal.ph.hidden=!!q;let first=-1;
 pal.rows.forEach((row,i)=>{const m=q?fuzzy(row.dataset.label,q):[];row.classList.toggle('is-miss',!m);paint(row,m||[]);if(m&&first<0)first=i;});moveHl(first<0?0:first);}
function hint(text,state,cell){runRow.dataset.state=state;if(runHint.textContent===text)return;runHint.classList.add('is-swap');T(cell,150,()=>{runHint.textContent=text;runHint.classList.remove('is-swap');});}
const QUERY='deploy prod';
function palPlay(cell,done){pal.hl.classList.remove('is-press');runHint.textContent='a1f9c2e';runRow.dataset.state='';setQuery('');
 if(reduced){T(cell,150,()=>{setQuery(QUERY);hint('Live · 19s','live',cell);T(cell,150,done);});return;}
 let i=0;const type=()=>{i++;setQuery(QUERY.slice(0,i));if(i<QUERY.length)T(cell,50+(i*37%3)*28,type);else T(cell,420,enter);};
 const enter=()=>{pal.hl.classList.add('is-press');hint('Deploying…','busy',cell);T(cell,250,()=>pal.hl.classList.remove('is-press'));T(cell,1100,()=>{hint('Live · 19s','live',cell);T(cell,1400,done);});};
 T(cell,300,type);}
// Uptime: bars rise left to right, then the amber day explains itself.
function upPlay(cell,done){bars.classList.add('is-reset');bars.classList.remove('is-grown');void bars.offsetWidth;bars.classList.remove('is-reset');bars.classList.add('is-grown');
 T(cell,720,()=>{tip.classList.add('is-on');T(cell,2000,()=>{tip.classList.remove('is-on');T(cell,200,done);});});}
// Build log: lines stream in with a progress rule.
const log=$('.'+C+'-log'),lines=[...log.children],progress=$('.'+C+'-progress i');
function logPlay(cell,done){log.classList.add('is-playing');lines.forEach(li=>li.classList.remove('is-in'));progress.style.setProperty('--p','0');
 // Reduced motion: the whole log fades in at once.
 const at=i=>reduced?40:200+i*340;
 lines.forEach((li,i)=>T(cell,at(i),()=>{li.classList.add('is-in');progress.style.setProperty('--p',String((i+1)/lines.length));}));
 T(cell,at(lines.length)+1000,()=>{log.classList.remove('is-playing');done();});}
// Edge map: every region pulses in a wave from west to east.
function mapPlay(cell,done){cell.el.classList.add('is-live');T(cell,3200,()=>{cell.el.classList.remove('is-live');done();});}
// Preview switches: real controls; turning one on builds it, then it reports Ready.
const envs=$$('.'+C+'-env'),INIT=envs.map(r=>r.dataset.state),WORD={ready:'Ready',building:'Building',off:'Off'};
function setEnv(row,state){clearTimeout(row._t);row.dataset.state=state;row.querySelector('[role="switch"]').setAttribute('aria-checked',String(state!=='off'));row.querySelector('.'+C+'-env-state').textContent=WORD[state];}
function build(row,delay,announce){setEnv(row,'building');row._t=setTimeout(()=>{if(dead)return;setEnv(row,'ready');if(announce)say('Preview for '+row.querySelector('.'+C+'-env-name').textContent+' is ready.');},delay);}
envs.forEach(row=>{const sw=row.querySelector('[role="switch"]'),name=row.querySelector('.'+C+'-env-name').textContent;
 on(sw,'click',()=>{if(row.dataset.state==='off'){build(row,reduced?600:1400,true);say('Preview for '+name+' is building.');}else{setEnv(row,'off');say('Preview for '+name+' is off.');}});
 if(row.dataset.state==='building')build(row,2600,false);});
function envPlay(cell,done){if(envs.every(r=>r.dataset.state==='ready'))envs.forEach((r,i)=>setEnv(r,INIT[i]==='building'?'off':INIT[i]));
 let k=0;envs.forEach(r=>{if(r.dataset.state==='off'){const d=k++*180;T(cell,d,()=>build(r,1200,false));}else if(r.dataset.state==='building')build(r,900,false);});
 T(cell,1900+k*180,done);}
const PLAY={palette:palPlay,uptime:upPlay,log:logPlay,map:mapPlay,previews:envPlay};
function run(cell){if(cell.busy||dead||!PLAY[cell.kind])return;cell.busy=true;
 PLAY[cell.kind](cell,()=>{cell.busy=false;cell.timers=[];if(cell.hot)T(cell,1400,()=>{if(cell.hot)run(cell);});});}
function heat(cell,hot){cell.hot=hot;cell.el.classList.toggle('is-hot',hot);if(hot){touched=true;clearInterval(idle);run(cell);}}
for(const cell of cells){
 on(cell.el,'pointerenter',e=>{if(e.pointerType!=='touch')heat(cell,true);});
 on(cell.el,'pointerleave',()=>{if(!cell.el.contains(document.activeElement))heat(cell,false);});
 on(cell.el,'focusin',()=>{cell.el.classList.add('is-focus');cell.el.style.setProperty('--mx',(cell.el.offsetWidth/2)+'px');cell.el.style.setProperty('--my','0px');heat(cell,true);});
 on(cell.el,'focusout',e=>{if(cell.el.contains(e.relatedTarget))return;cell.el.classList.remove('is-focus');if(!cell.el.matches(':hover'))heat(cell,false);});
 on(cell.el,'pointerdown',e=>{if(e.pointerType==='touch')run(cell);});}
// One pointer drives the border glow on every cell, so it crosses the gaps between them.
function glow(){graf=0;for(const c of cells){const r=c.el.getBoundingClientRect(),k=r.width/(c.el.offsetWidth||1)||1;c.el.style.setProperty('--mx',((gx-r.left)/k).toFixed(1)+'px');c.el.style.setProperty('--my',((gy-r.top)/k).toFixed(1)+'px');}}
on(grid,'pointermove',e=>{if(!canHover||e.pointerType==='touch')return;gx=e.clientX;gy=e.clientY;grid.classList.add('is-glow');if(!graf)graf=requestAnimationFrame(glow);});
on(grid,'pointerleave',()=>grid.classList.remove('is-glow'));
$$('.'+C+'-link').forEach(a=>on(a,'click',e=>e.preventDefault()));
const fit=()=>{root.style.setProperty('--fit-scale',String(ctx.scale||1));const a=pal.rows.find(r=>r.classList.contains('is-active'));if(a)moveHl(pal.rows.indexOf(a));};
const ro=new ResizeObserver(fit);ro.observe(stage);ro.observe(root);
setQuery(QUERY);runHint.textContent='Live · 19s';runRow.dataset.state='live';fit();
if(document.fonts)document.fonts.ready.then(()=>{if(!dead)fit();});
// Thumbnails play the command menu and uptime on their own until the pointer arrives.
if(thumb&&!reduced){let n=0;const loop=()=>{if(touched)return;const p=cellOf('palette'),u=cellOf('uptime');if(p)run(p);if(u&&n++%2===0)setTimeout(()=>{if(!touched)run(u);},900);};setTimeout(loop,500);idle=setInterval(loop,5200);}
return()=>{dead=true;clearInterval(idle);cancelAnimationFrame(graf);cells.forEach(c=>c.timers.forEach(clearTimeout));envs.forEach(r=>clearTimeout(r._t));abort.abort();ro.disconnect();};`,
  prompt: `Build a feature bento section for a fictional deploy platform in plain HTML, CSS and JavaScript with no libraries. A header row holds an orange 12px uppercase eyebrow ("Platform") and a 28px/600 title ("Everything between git push and production") on the left and a 13px grey subline on the right ("Tarn previews every branch, ships to 16 regions and rolls back in a single keystroke."). Below, a 6-column, 2-row grid with 12px gaps holds five 16px-radius cells built from layered inset hairlines on a #1a1a1a to #141414 gradient: a 4-column command menu cell, then 2-column cells for uptime, build log, edge map and preview switches. Every cell has a 14px/600 title link and a one-line 12.5px description. Command menu: a ⌘K keycap above the copy on the left and, on the right, a palette window bleeding off the bottom-right edge (mask fade): a search row with an orange blinking caret and an esc key, a Deployments group and four rows (Open deployment logs, Deploy to production, Roll back production, Promote preview) with icons and mono hints. On hover it clears, types "deploy prod" letter by letter (50–100ms per key), dims rows that fail a fuzzy subsequence match, bolds matched letters and slides a highlight to the first match in 160ms cubic-bezier(0.22, 1, 0.36, 1); then the highlight flashes orange as if Enter was pressed and the hint cross-fades from a1f9c2e to Deploying… to Live · 19s. Uptime: 99.99% in 24px tabular figures, an Operational pill, 30 bars with 3px gaps, one orange; on hover the bars rise from scaleY(0.22) left to right (10ms stagger, 400ms ease-out) and a tooltip appears over the orange day ("Nov 17 · 4 min degraded · fra1"). Build log: five Geist Mono 11px lines with timestamps (Cloning a1f9c2e … Ready in 19s) that stream in on hover every 340ms (opacity, 4px rise, 2px blur, 400ms) above an orange progress rule. Edge map: an SVG dot map of the world built from runs of land dots on a 48 by 21 grid, sixteen orange region nodes; three pulse at rest and on hover all of them ping in a west-to-east wave, with a p50 · 31 ms chip. Preview switches: three branch rows (feat/billing-v2 Ready, fix/focus-trap Building, chore/deps-nov Off) with real role="switch" buttons; turning one on shows Building with a pulsing orange dot and then Ready, announced in a polite live region. A single pointermove on the grid writes each cell's local --mx/--my so a 240px orange radial lights a 1px mask-composite border ring that crosses the gaps between cells, plus a soft fill inside the hovered cell (hover devices only; keyboard focus lights the focused cell). Visuals replay every 1.4s while their cell stays hovered or focused. Thumbnail mode shows the command menu above the uptime bars and plays them on a loop until the pointer arrives. Under prefers-reduced-motion every visual jumps to its final state with 150ms fades and the pulses stop.`
});
