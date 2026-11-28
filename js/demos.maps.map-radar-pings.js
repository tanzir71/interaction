/* European edge-site monitor with heartbeat pings: an original INTRX map component. */
INTRX.register({
  id: "map-radar-pings",
  title: "Site Pings",
  cat: "Maps & Geo",
  rootClass: "d-maps-map-radar-pings",
  tags: ["map","monitoring","heartbeat"],
  libs: [],
  desc: "A monitoring view of nine European edge sites on a real coastline map. Each site sends a heartbeat ring on its own schedule, the log lists every ping with a UTC timestamp, and one site in Milan is losing packets. Hover a site for RTT, loss and uptime.",
  seen: "Seen on: status pages, uptime monitors and edge network dashboards",
  hint: "Hover · Sites send heartbeats; hover one for RTT, loss and uptime",
  html: `<div class="d-maps-map-radar-pings" role="region" aria-label="European edge site monitor">
  <div class="d-maps-map-radar-pings-map" tabindex="0" role="application" aria-roledescription="map" aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Enter Space Escape" aria-label="Map of nine European edge sites. Arrow keys move between sites, Enter pings the selected site, Escape clears the selection.">
    <svg class="d-maps-map-radar-pings-svg" aria-hidden="true">
      <g class="d-maps-map-radar-pings-grid"></g>
      <g class="d-maps-map-radar-pings-land"></g>
      <g class="d-maps-map-radar-pings-seas"></g>
      <g class="d-maps-map-radar-pings-rings"></g>
      <g class="d-maps-map-radar-pings-sites"></g>
    </svg>
    <div class="d-maps-map-radar-pings-tip" aria-hidden="true">
      <p class="d-maps-map-radar-pings-tip-head"><b class="d-maps-map-radar-pings-tip-code"></b><span class="d-maps-map-radar-pings-tip-name"></span></p>
      <p class="d-maps-map-radar-pings-tip-state"><i></i><span></span></p>
      <dl class="d-maps-map-radar-pings-tip-rows">
        <div><dt>RTT</dt><dd class="d-maps-map-radar-pings-tip-rtt"></dd></div>
        <div><dt>Loss</dt><dd class="d-maps-map-radar-pings-tip-loss"></dd></div>
        <div><dt>Last ping</dt><dd class="d-maps-map-radar-pings-tip-last"></dd></div>
        <div><dt>Uptime 30d</dt><dd class="d-maps-map-radar-pings-tip-up"></dd></div>
      </dl>
    </div>
    <div class="d-maps-map-radar-pings-chip" aria-hidden="true">
      <p class="d-maps-map-radar-pings-chip-head"><i></i><b>MXP</b><span>Milan</span></p>
      <p class="d-maps-map-radar-pings-chip-meta">Packet loss <b>4.2%</b> · RTT <b>61 ms</b></p>
    </div>
    <p class="d-maps-map-radar-pings-scale" aria-hidden="true"><i></i><span>250 km</span></p>
  </div>
  <aside class="d-maps-map-radar-pings-panel" aria-label="Heartbeat log">
    <header class="d-maps-map-radar-pings-head">
      <p class="d-maps-map-radar-pings-eyebrow"><i class="d-maps-map-radar-pings-live" aria-hidden="true"></i>Heartbeats</p>
      <p class="d-maps-map-radar-pings-clock">14:02:00 UTC</p>
    </header>
    <div class="d-maps-map-radar-pings-summary">
      <p><b class="d-maps-map-radar-pings-ok-count">8</b><span>Operational</span></p>
      <p class="d-maps-map-radar-pings-summary-bad"><b>1</b><span>Packet loss</span></p>
      <p><b class="d-maps-map-radar-pings-p50">14 ms</b><span>Median RTT</span></p>
    </div>
    <ol class="d-maps-map-radar-pings-log" aria-label="Most recent heartbeats"></ol>
    <p class="d-maps-map-radar-pings-legend"><span><i class="d-maps-map-radar-pings-key-ok"></i>Operational</span><span><i class="d-maps-map-radar-pings-key-bad"></i>Packet loss</span><span><i class="d-maps-map-radar-pings-key-ring"></i>Heartbeat</span></p>
  </aside>
  <span class="d-maps-map-radar-pings-status" role="status" aria-live="polite"></span>
</div>`,
  css: `.d-maps-map-radar-pings{--fs:var(--fit-scale,1);--ink:#ededed;--ink-2:#a1a1a1;--ink-3:#8a8a8a;--edge:rgba(255,255,255,.09);--accent:#fa7319;position:relative;color:var(--ink);font:400 12px/16px Geist,system-ui,sans-serif;font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased;isolation:isolate}
.d-maps-map-radar-pings *{box-sizing:border-box}
.d-maps-map-radar-pings p,.d-maps-map-radar-pings dl,.d-maps-map-radar-pings dd{margin:0}
.d-maps-map-radar-pings ol{margin:0;padding:0}
.d-maps-map-radar-pings-map{position:absolute;left:0;top:0;outline:none;touch-action:pan-y}
.d-maps-map-radar-pings-map:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px;border-radius:12px}
.d-maps-map-radar-pings-svg{position:absolute;inset:0;display:block;overflow:hidden}
.d-maps-map-radar-pings-grid path{fill:none;stroke:rgba(255,255,255,.04);stroke-width:1}
.d-maps-map-radar-pings-land path{fill:#232323;stroke:rgba(255,255,255,.2);stroke-width:.8;stroke-linejoin:round}
.d-maps-map-radar-pings-seas text{fill:#5f5f5f;font:italic 400 11px/1 Geist,system-ui,sans-serif;letter-spacing:.05em;text-anchor:middle}
.d-maps-map-radar-pings-ring{fill:none;stroke:var(--accent);stroke-width:1.1}
.d-maps-map-radar-pings-site{cursor:pointer}
.d-maps-map-radar-pings-site-hit{fill:transparent}
.d-maps-map-radar-pings-site-halo{fill:rgba(255,255,255,.1);transition:fill var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-radar-pings-site-dot{fill:#f2f2f2;stroke:#151515;stroke-width:1.5}
.d-maps-map-radar-pings-site-label{fill:#b8b8b8;font:500 11px/1 'Geist Mono',ui-monospace,monospace;paint-order:stroke;stroke:#141414;stroke-width:3px;stroke-linejoin:round;transition:fill var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-radar-pings-site[data-bad="true"] .d-maps-map-radar-pings-site-dot{fill:var(--accent)}
.d-maps-map-radar-pings-site[data-bad="true"] .d-maps-map-radar-pings-site-halo{fill:rgba(250,115,25,.22)}
.d-maps-map-radar-pings-site[data-bad="true"] .d-maps-map-radar-pings-site-label{fill:#ffb27a}
.d-maps-map-radar-pings-site[data-selected="true"] .d-maps-map-radar-pings-site-halo{fill:rgba(250,115,25,.3)}
.d-maps-map-radar-pings-site[data-selected="true"] .d-maps-map-radar-pings-site-label{fill:#fff}
.d-maps-map-radar-pings-site-sel{fill:none;stroke:#f2f2f2;stroke-width:1;opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.7);transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-radar-pings-site[data-selected="true"] .d-maps-map-radar-pings-site-sel{opacity:.9;transform:none}
.d-maps-map-radar-pings-tip{position:absolute;left:0;top:0;z-index:3;width:176px;padding:9px 11px 10px;border-radius:12px;background:linear-gradient(#212121,#1a1a1a);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.5),0 12px 28px -10px rgba(0,0,0,.75);pointer-events:none;opacity:0;transform:translate(var(--tx,0px),var(--ty,0px)) scale(.98);transform-origin:var(--ox,0%) 100%;transition:opacity var(--dur-micro,80ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-radar-pings[data-tip="true"] .d-maps-map-radar-pings-tip{opacity:1;transform:translate(var(--tx,0px),var(--ty,0px));transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--dur-micro,80ms),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-radar-pings-tip-head{display:flex;align-items:baseline;gap:7px;white-space:nowrap}
.d-maps-map-radar-pings-tip-code{font:600 12px/16px 'Geist Mono',ui-monospace,monospace}
.d-maps-map-radar-pings-tip-name{font-size:12px;line-height:16px;color:var(--ink-2)}
.d-maps-map-radar-pings-tip-state{display:inline-flex;align-items:center;gap:6px;margin-top:6px !important;padding:1px 8px 1px 7px;border-radius:999px;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);font-size:11px;line-height:18px;color:var(--ink)}
.d-maps-map-radar-pings-tip-state i{width:6px;height:6px;border-radius:50%;background:#e8e8e8}
.d-maps-map-radar-pings[data-tip-bad="true"] .d-maps-map-radar-pings-tip-state{background:rgba(250,115,25,.12);box-shadow:inset 0 0 0 1px rgba(250,115,25,.32);color:#ffb27a}
.d-maps-map-radar-pings[data-tip-bad="true"] .d-maps-map-radar-pings-tip-state i{background:var(--accent)}
.d-maps-map-radar-pings-tip-rows{display:grid;gap:3px;margin-top:8px !important;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)}
.d-maps-map-radar-pings-tip-rows div{display:flex;justify-content:space-between;gap:10px;font-size:11px;line-height:15px;color:var(--ink-3)}
.d-maps-map-radar-pings-tip-rows dd{font:500 11px/15px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-radar-pings[data-tip-bad="true"] .d-maps-map-radar-pings-tip-loss{color:#ffb27a}
.d-maps-map-radar-pings-chip{display:none}
.d-maps-map-radar-pings-scale{position:absolute;left:14px;bottom:12px;display:flex;flex-direction:column;gap:4px;font:400 11px/14px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3);pointer-events:none}
.d-maps-map-radar-pings-scale i{display:block;height:5px;border:1px solid rgba(255,255,255,.35);border-top:0}
.d-maps-map-radar-pings-panel{position:absolute;top:10px;right:0;bottom:8px;width:236px;display:flex;flex-direction:column}
.d-maps-map-radar-pings-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.d-maps-map-radar-pings-eyebrow{display:flex;align-items:center;gap:7px;font-size:11px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);white-space:nowrap}
.d-maps-map-radar-pings-live{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px rgba(250,115,25,.18)}
.d-maps-map-radar-pings-clock{font:500 11px/16px 'Geist Mono',ui-monospace,monospace;color:var(--ink-2);white-space:nowrap}
.d-maps-map-radar-pings-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:10px;border-radius:10px;overflow:hidden;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px var(--edge)}
.d-maps-map-radar-pings-summary p{display:flex;flex-direction:column;gap:2px;padding:8px 9px;background:#171717}
.d-maps-map-radar-pings-summary b{font:500 14px/18px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-radar-pings-summary span{font-size:11px;line-height:14px;color:var(--ink-3);white-space:nowrap}
.d-maps-map-radar-pings-summary-bad b{color:#ffb27a}
.d-maps-map-radar-pings-log{position:relative;list-style:none;margin-top:12px !important;height:208px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 78%,transparent);mask-image:linear-gradient(#000 78%,transparent)}
.d-maps-map-radar-pings-row{position:absolute;left:0;right:0;top:0;display:grid;grid-template-columns:58px 34px 1fr auto;align-items:center;gap:8px;height:24px;padding:0 6px;border-radius:6px;font:400 11px/16px 'Geist Mono',ui-monospace,monospace;color:var(--ink-2);transform:translateY(calc(var(--i,0) * 24px));transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-radar-pings-row.is-entering{opacity:0;transform:translateY(-8px)}
.d-maps-map-radar-pings-row-time{color:var(--ink-3)}
.d-maps-map-radar-pings-row-code{font-weight:600;color:var(--ink)}
.d-maps-map-radar-pings-row-msg{font-family:Geist,system-ui,sans-serif;font-size:11px;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-maps-map-radar-pings-row-val{text-align:right;color:var(--ink)}
.d-maps-map-radar-pings-row[data-bad="true"]{background:rgba(250,115,25,.07)}
.d-maps-map-radar-pings-row[data-bad="true"] .d-maps-map-radar-pings-row-val,.d-maps-map-radar-pings-row[data-bad="true"] .d-maps-map-radar-pings-row-code{color:#ffb27a}
.d-maps-map-radar-pings-row[data-sel="true"]{background:rgba(255,255,255,.05)}
.d-maps-map-radar-pings-legend{display:flex;gap:12px;margin-top:auto !important;padding-top:8px;font-size:11px;line-height:14px;color:var(--ink-3)}
.d-maps-map-radar-pings-legend span{display:flex;align-items:center;gap:6px;white-space:nowrap}
.d-maps-map-radar-pings-key-ok,.d-maps-map-radar-pings-key-bad{width:7px;height:7px;border-radius:50%;background:#f2f2f2}
.d-maps-map-radar-pings-key-bad{background:var(--accent)}
.d-maps-map-radar-pings-key-ring{width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 1px var(--accent)}
.d-maps-map-radar-pings-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.d-maps-map-radar-pings[data-mode="thumb"] .d-maps-map-radar-pings-site-label,.d-maps-map-radar-pings[data-mode="thumb"] .d-maps-map-radar-pings-seas text{font-size:max(11px,calc(11px / var(--fs)))}
.d-maps-map-radar-pings[data-mode="thumb"] .d-maps-map-radar-pings-panel,.d-maps-map-radar-pings[data-mode="thumb"] .d-maps-map-radar-pings-scale{display:none}
.d-maps-map-radar-pings[data-mode="thumb"] .d-maps-map-radar-pings-chip{position:absolute;left:10px;bottom:10px;z-index:2;display:block;padding:7px 10px 8px;border-radius:10px;background:rgba(24,24,24,.88);box-shadow:inset 0 0 0 1px rgba(250,115,25,.28),inset 0 1px 0 rgba(255,255,255,.06),0 8px 20px -8px rgba(0,0,0,.8);pointer-events:none}
.d-maps-map-radar-pings-chip-head{display:flex;align-items:center;gap:6px;font-size:max(12px,calc(11px / var(--fs)));line-height:16px;color:var(--ink-2)}
.d-maps-map-radar-pings-chip-head i{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px rgba(250,115,25,.2)}
.d-maps-map-radar-pings-chip-head b{font-family:'Geist Mono',ui-monospace,monospace;font-weight:600;color:var(--ink)}
.d-maps-map-radar-pings-chip-meta{margin-top:2px !important;font-size:max(11px,calc(11px / var(--fs)));line-height:15px;color:var(--ink-3)}
.d-maps-map-radar-pings-chip-meta b{font-family:'Geist Mono',ui-monospace,monospace;font-weight:500;color:#ffb27a}
@media (prefers-reduced-motion:reduce){.d-maps-map-radar-pings-row,.d-maps-map-radar-pings-tip,.d-maps-map-radar-pings-site-sel{transition-property:opacity !important;transition-duration:var(--dur-quick,150ms) !important}.d-maps-map-radar-pings-row.is-entering{transform:translateY(calc(var(--i,0) * 24px))}}`,
  js: `const C='d-maps-map-radar-pings',q=n=>root.querySelector('.'+C+'-'+n),thumb=ctx.mode==='thumb',reduced=!!ctx.reducedMotion,NS='http://www.w3.org/2000/svg';
root.dataset.mode=ctx.mode;
function syncScale(){root.style.setProperty('--fit-scale',String(ctx.scale||1));}
const fitObserver=new ResizeObserver(syncScale);fitObserver.observe(stage);syncScale();
const abort=new AbortController(),on=(node,type,fn,opts)=>node.addEventListener(type,fn,Object.assign({signal:abort.signal},opts||{}));
const mapBox=q('map'),svg=q('svg'),tip=q('tip'),status=q('status'),logList=q('log'),clockEl=q('clock'),p50El=q('p50');
// Plate carrée with a 48°N standard parallel: an honest regional projection for Western Europe.
const VIEW=thumb?{w:300,h:216,lon0:-6,lon1:16,lat0:53.6}:{w:336,h:340,lon0:-11.2,lon1:24.6,lat0:60.9};
const KX=VIEW.w/(VIEW.lon1-VIEW.lon0),KY=KX/Math.cos(48*Math.PI/180);
const px=lon=>(lon-VIEW.lon0)*KX,py=lat=>(VIEW.lat0-lat)*KY;
mapBox.style.width=VIEW.w+'px';mapBox.style.height=VIEW.h+'px';svg.setAttribute('viewBox','0 0 '+VIEW.w+' '+VIEW.h);svg.setAttribute('width',VIEW.w);svg.setAttribute('height',VIEW.h);
// Coastlines, simplified by hand from public-domain outlines (longitude latitude pairs).
const COAST=['-5.6 36 -6 36.3 -6.3 36.6 -6.9 37.2 -7.4 37.2 -8 37 -8.9 37 -8.8 37.9 -8.9 38.5 -9.5 38.7 -9.4 39.4 -8.9 40.1 -8.7 41.2 -8.9 42.1 -9.3 43 -8.4 43.4 -7.7 43.7 -5.8 43.6 -3.8 43.5 -2.9 43.4 -1.8 43.4 -1.3 44.5 -1.2 45.6 -1.2 46.2 -2 46.8 -2.2 47.3 -3.4 47.7 -4.4 47.8 -4.7 48.1 -4.8 48.4 -4.3 48.7 -3 48.8 -2 48.6 -1.6 48.8 -1.9 49.7 -1.3 49.7 -1.1 49.4 0.1 49.4 1.1 49.9 1.6 50.2 1.6 50.9 2.4 51 3.2 51.3 3.6 51.4 4 51.9 4.5 52.4 4.7 52.9 5.3 53.2 6.2 53.4 7 53.5 8 53.6 8.6 53.9 8.9 54.3 8.6 54.9 8.6 55.5 8.1 56 8.2 56.8 8.6 57.1 9.9 57.6 10.6 57.7 10.5 57.2 10.3 56.6 10.9 56.4 10.2 55.9 9.8 55.3 9.9 54.8 10.2 54.4 11.1 54 12.1 54.2 13.4 54.6 14.2 53.9 15.6 54.2 16.9 54.6 18.4 54.8 18.6 54.4 19.6 54.4 20 54.9 21.1 55.7 21.1 56.1 21 56.5 21.6 57.4 22.6 57.7 23.5 57.1 24.1 57 24.4 57.9 24 58.3 23.5 58.7 23.5 59.2 24.7 59.5 26 59.6 28 59.5 30.2 59.9 29 60.2 27.5 60.5 26 60.4 25 60.2 22.9 59.8 22.2 60.4 21.4 60.9 21.5 61.6 21.3 62.4 21.5 63.1 22.6 63.8 24 64.6 25.4 65 24.6 65.7 23.2 65.8 22.1 65.6 21.2 64.8 20.3 63.8 19 63.3 17.9 62.6 17.3 62 17.1 61.2 17.2 60.7 18.4 60.2 18.9 59.8 18.3 59.3 17.6 58.8 16.8 58.5 16.6 57.9 16.5 57 16.4 56.6 16 56.2 14.9 56.1 14.2 55.4 13 55.4 12.9 55.6 12.7 56 12.6 56.6 12 57.4 11.8 57.7 11.4 58.3 11.1 59 10.7 59.4 10.6 59.9 10.3 59.4 10 59 9.5 58.8 8.3 58.2 7 58 5.9 58.5 5.6 59 5.3 59.4 5.1 60.4 4.9 61 5 61.8 5.3 62.3 6.2 62.5 7.7 63.1 8.7 63.4 10.4 63.6 10.5 64.4 11.6 65 12.3 65.8 13.3 66.6 14.4 67.3 15.5 68.2 16.4 68.9 19 69.6 20.5 70 23 70.6 25.8 71.1 28.5 70.9 31 70.3 40 69 40 45 29.7 45.2 28.7 44.3 28 43.2 27.9 42.5 28 41.6 29 41.2 28 41 27 40.9 26.2 40.6 25.9 40.85 24.4 40.9 23.8 40.7 23 40.6 22.6 40.3 22.9 39.4 23.3 39 24 38.4 23.7 37.9 23.1 37.9 23.2 37.5 23.2 36.4 22.5 36.4 21.9 36.8 21.7 36.8 21.6 37.6 21.1 37.8 21.7 38.25 21.1 38.4 20.7 38.9 20.2 39.5 20 39.7 19.4 40.4 19.45 41.3 19.5 41.9 18.9 42.3 18.1 42.6 17.4 43 16.4 43.5 15.9 43.7 15.2 44.1 14.8 44.8 14.4 45.3 13.9 44.8 13.5 45.4 13.7 45.7 12.9 45.6 12.3 45.4 12.3 44.8 12.6 44.06 13.5 43.6 14.2 42.4 14.7 42.1 16.2 41.9 15.9 41.5 16.9 41.1 18 40.6 18.5 40.1 18.4 39.8 17.2 40.4 16.6 39.9 17.1 39.1 16.5 38.4 15.7 37.95 15.6 38.3 16 38.7 15.8 39.6 15.6 40 14.9 40.3 14.3 40.6 14.2 40.8 13.6 41.2 12.6 41.4 12.2 41.8 11.8 42.1 11.1 42.4 10.5 42.9 10.3 43.5 9.8 44.1 8.9 44.4 8.2 43.9 7.5 43.8 7 43.5 5.9 43.1 5.4 43.3 4.2 43.5 3 43.2 3.2 42.4 2.8 41.7 2.2 41.4 1 41.1 0.9 40.7 -0.3 39.5 0.2 38.7 -0.5 38.3 -0.7 37.6 -1.9 36.9 -2.5 36.8 -4.4 36.7 -5.2 36.4',
'-5.7 50.05 -5.2 49.96 -4.2 50.35 -3.6 50.22 -3.4 50.6 -2.4 50.6 -1.9 50.7 -1.1 50.8 0.2 50.75 1 50.95 1.4 51.15 1.4 51.4 0.9 51.5 1.15 51.8 1.3 51.95 1.75 52.5 1.7 52.75 1.3 52.93 0.3 52.85 0.34 53.14 0.1 53.6 -0.2 54.1 -0.6 54.5 -1.2 54.65 -1.4 55 -1.6 55.6 -2 55.8 -2.5 56 -2.6 56.3 -2.45 56.7 -2.1 57.15 -1.8 57.5 -2.6 57.7 -3.6 57.7 -4 57.6 -3.6 58 -3.1 58.5 -3 58.65 -3.4 58.62 -5 58.62 -5.2 58.2 -5.6 57.6 -5.7 57.28 -5.7 56.8 -6.2 56.7 -5.5 56.4 -5.6 55.3 -5.4 55.3 -4.6 55.45 -4.9 55 -4.86 54.63 -4.4 54.8 -3.6 54.95 -3.6 54.5 -3 54 -3.05 53.82 -3.1 53.4 -3.6 53.3 -4.5 53.4 -4.7 52.8 -4.08 52.41 -4.6 52.1 -5.3 51.85 -5 51.6 -4.2 51.55 -3.2 51.45 -2.7 51.55 -3 51.2 -4.2 51.05 -4.6 51 -5 50.55 -5.5 50.2',
'-7.3 55.4 -6.15 55.22 -5.7 54.8 -5.5 54.4 -6.25 54 -6.1 53.35 -6 52.95 -6.35 52.2 -7.1 52.15 -8.3 51.8 -9 51.55 -9.8 51.45 -10.3 51.8 -10.5 52.1 -9.6 52.6 -9.9 53 -9.05 53.27 -10.2 53.5 -9.9 53.8 -10.1 54.2 -9.1 54.3 -8.5 54.25 -8.7 54.7 -8.5 55.1 -7.7 55.2',
'-5.9 35.8 -5.3 35.9 -4.3 35.2 -2.9 35.3 -1.9 35.1 -0.6 35.8 0.6 36 1.8 36.5 3.1 36.8 4.8 36.9 6.5 37.1 8.6 36.95 9.9 37.3 10.3 36.8 11.1 37 10.6 36.4 11.1 35.3 10.5 34.5 14 34 14 30 -12 30 -12 35 -9 32 -6.8 34 -6.3 35.4',
'26.2 40 26.6 38.4 27.2 37.9 27.3 37 28.2 36.7 30 36.2 36 36.5 40 37 40 41.2 29 41.2 27.3 40.4',
'9.4 43 9.5 42.6 9.6 42 9.3 41.5 9.1 41.4 8.6 41.7 8.7 42.1 8.6 42.4 9 42.65','9.2 41.25 9.6 40.9 9.8 40.5 9.6 39.9 9.6 39.2 9 39.05 8.4 38.95 8.4 39.6 8.5 40.3 8.2 40.85 8.8 40.95',
'12.4 38.1 13.4 38.2 14.5 38.05 15.6 38.25 15.2 37.4 15.1 36.7 14.4 36.8 13.1 37.5 12.4 37.8','2.35 39.55 3.1 39.9 3.5 39.7 3.2 39.3 2.7 39.5',
'10.9 55.7 12 56.1 12.6 56 12.6 55.4 12 55 11.1 55.2','9.7 55.5 10.5 55.55 10.8 55.3 10.6 55.05 9.9 55.1','18.1 57.9 18.8 57.8 18.9 57.4 18.3 56.95 18.1 57.4',
'23.5 35.6 24.2 35.55 25 35.4 26.3 35.3 26.2 35 24.7 34.9 23.6 35.25','14.7 55.25 15.15 55.1 14.7 55'];
function pathFor(s){const n=s.split(' ').map(Number);let d='';for(let i=0;i<n.length;i+=2)d+=(i?'L':'M')+px(n[i]).toFixed(1)+' '+py(n[i+1]).toFixed(1);return d+'Z';}
function el(tag,attrs,parent){const node=document.createElementNS(NS,tag);for(const k in attrs)node.setAttribute(k,attrs[k]);if(parent)parent.appendChild(node);return node;}
const land=q('land'),grid=q('grid'),seas=q('seas'),ringLayer=q('rings'),siteLayer=q('sites');
for(const s of COAST)el('path',{d:pathFor(s)},land);
let gd='';for(let lon=-10;lon<=25;lon+=5)gd+='M'+px(lon).toFixed(1)+' 0V'+VIEW.h;for(let lat=35;lat<=60;lat+=5)gd+='M0 '+py(lat).toFixed(1)+'H'+VIEW.w;el('path',{d:gd},grid);
const SEAS=thumb?[['Adriatic',13.8,44],['North Sea',2.2,53.1],['English Channel',-2.6,50.05]]:[['North Sea',3.2,56.2],['Atlantic',-8.6,47.2],['Mediterranean',4.6,38.9],['Baltic',19.6,56.2],['Bay of Biscay',-6.1,45]];
for(const [name,lon,lat]of SEAS){const t=el('text',{x:px(lon).toFixed(1),y:py(lat).toFixed(1)},seas);t.textContent=name;}
// Sites: real airport-adjacent coordinates; one site is losing packets and pings faster.
const SITES=[['DUB','Dublin',53.35,-6.26,14,'99.994'],['LHR','London',51.47,-0.45,9,'99.998'],['AMS','Amsterdam',52.31,4.76,11,'99.997'],['CDG','Paris',49.01,2.55,10,'99.996'],['FRA','Frankfurt',50.04,8.56,7,'99.999'],['MAD','Madrid',40.47,-3.56,24,'99.991'],['MXP','Milan',45.63,8.72,61,'99.712'],['ARN','Stockholm',59.65,17.92,19,'99.995'],['WAW','Warsaw',52.17,20.97,22,'99.993']].map(([code,name,lat,lon,rtt,up],i)=>({i,code,name,lat,lon,rtt,up,bad:code==='MXP',x:px(lon),y:py(lat)}));
const inView=s=>s.x>4&&s.x<VIEW.w-4&&s.y>4&&s.y<VIEW.h-4;
const LABEL_LEFT=new Set(thumb?['CDG']:['LHR','CDG','DUB']);
for(const s of SITES){if(!inView(s))continue;const g=el('g',{class:C+'-site','data-code':s.code,'data-bad':String(s.bad),transform:'translate('+s.x.toFixed(1)+' '+s.y.toFixed(1)+')'},siteLayer);
 el('circle',{class:C+'-site-hit',r:14},g);el('circle',{class:C+'-site-halo',r:7},g);el('circle',{class:C+'-site-sel',r:10.5},g);el('circle',{class:C+'-site-dot',r:3.4},g);
 const left=LABEL_LEFT.has(s.code),t=el('text',{class:C+'-site-label',x:left?-9:9,y:4,'text-anchor':left?'end':'start'},g);t.textContent=s.code;s.node=g;}
const shown=SITES.filter(s=>s.node);
// Scale bar: 250 km at 48°N.
if(!thumb){const kmPerDegLon=111.32*Math.cos(48*Math.PI/180),barPx=250/kmPerDegLon*KX;q('scale').querySelector('i').style.width=barPx.toFixed(1)+'px';}
// Heartbeat schedule (deterministic): normal sites every 4.0–6.8 s, the lossy site every 2 s.
let seed=42;const rand=()=>{seed=(seed+0x6D2B79F5)|0;let t=Math.imul(seed^(seed>>>15),1|seed);t=t+Math.imul(t^(t>>>7),61|t)^t;return((t^(t>>>14))>>>0)/4294967296;};
const BASE=14*3600+2*60;let clock=0,last=null,raf=0,dead=false,rings=[],selected=null,pinned=false,events=[],nextAt=[],hovering=false;
function schedule(){seed=42;nextAt=SITES.map((s,i)=>s.bad?900:600+i*480+Math.round(rand()*900));}
function interval(s){return s.bad?2000:4000+Math.round(rand()*2800);}
const pad=n=>String(n).padStart(2,'0'),stamp=ms=>{const t=BASE+Math.floor(ms/1000);return pad(Math.floor(t/3600)%24)+':'+pad(Math.floor(t/60)%60)+':'+pad(t%60);};
function sample(s){if(s.bad){const loss=(3.6+rand()*1.4).toFixed(1);return{rtt:s.rtt+Math.round(rand()*9-4),loss:loss+'%',msg:'Packet loss',val:loss+'%'};}const r=s.rtt+Math.round(rand()*3-1);return{rtt:r,loss:'0.0%',msg:'Heartbeat',val:r+' ms'};}
function ping(s,user){if(dead)return;const m=sample(s);s.lastRtt=m.rtt;s.lastLoss=m.loss;s.last=clock;
 if(s.node&&!reduced){rings.push({s,start:clock,strong:s.bad||user});while(rings.length>16)rings.shift().node?.remove();}
 logEvent({s,time:clock,msg:m.msg,val:m.val});updateSummary();if(selected===s)fillTip(s);
 if(user)status.textContent=s.name+' pinged, '+m.msg.toLowerCase()+' '+m.val;}
const MAX_ROWS=8;
function updateSummary(){const r=SITES.map(s=>s.lastRtt||s.rtt).sort((a,b)=>a-b);if(p50El)p50El.textContent=r[4]+' ms';}
function logEvent(e){if(thumb)return;const li=document.createElement('li');li.className=C+'-row'+(reduced?'':' is-entering');li.dataset.bad=String(e.s.bad);li.dataset.code=e.s.code;
 li.innerHTML='<span class="'+C+'-row-time">'+stamp(e.time)+'</span><span class="'+C+'-row-code">'+e.s.code+'</span><span class="'+C+'-row-msg">'+e.msg+'</span><span class="'+C+'-row-val">'+e.val+'</span>';
 li.dataset.sel=String(selected===e.s);events.unshift(li);logList.prepend(li);while(events.length>MAX_ROWS+1)events.pop().remove();events.forEach((row,i)=>row.style.setProperty('--i',String(i)));
 if(!reduced)requestAnimationFrame(()=>li.classList.remove('is-entering'));}
function drawRings(){for(let k=rings.length-1;k>=0;k--){const r=rings[k],age=(clock-r.start)/1200;if(age>=1){r.node?.remove();rings.splice(k,1);continue;}if(!r.node)r.node=el('circle',{class:C+'-ring',cx:r.s.x.toFixed(1),cy:r.s.y.toFixed(1)},ringLayer);const e=1-Math.pow(1-age,3);r.node.setAttribute('r',(4+(r.strong?30:22)*e).toFixed(2));r.node.setAttribute('opacity',((1-age)*(r.strong?.95:.55)).toFixed(3));}}
function staticRings(){ringLayer.replaceChildren();for(const s of shown){el('circle',{class:C+'-ring',cx:s.x.toFixed(1),cy:s.y.toFixed(1),r:s.bad?13:10,opacity:s.bad?.7:.28},ringLayer);if(s.bad)el('circle',{class:C+'-ring',cx:s.x.toFixed(1),cy:s.y.toFixed(1),r:22,opacity:.32},ringLayer);}}
function frame(now){raf=0;if(dead)return;const dt=last==null?16:Math.min(50,now-last);last=now;clock+=dt;
 for(const s of SITES){if(clock>=nextAt[s.i]){ping(s,false);nextAt[s.i]=clock+interval(s);}}
 drawRings();if(clockEl)clockEl.textContent=stamp(clock)+' UTC';raf=requestAnimationFrame(frame);}
function fillTip(s){q('tip-code').textContent=s.code;q('tip-name').textContent=s.name;tip.querySelector('.'+C+'-tip-state span').textContent=s.bad?'Packet loss':'Operational';q('tip-rtt').textContent=(s.lastRtt||s.rtt)+' ms';q('tip-loss').textContent=s.lastLoss||(s.bad?'4.2%':'0.0%');q('tip-last').textContent=s.last!=null?stamp(s.last):'—';q('tip-up').textContent=s.up+'%';root.dataset.tipBad=String(s.bad);}
function placeTip(s){const w=176,h=tip.offsetHeight||120;let x=s.x+14,y=s.y-h/2;if(x+w>VIEW.w-4){x=s.x-w-14;tip.style.setProperty('--ox','100%');}else tip.style.setProperty('--ox','0%');y=Math.max(6,Math.min(VIEW.h-h-6,y));tip.style.setProperty('--tx',x.toFixed(1)+'px');tip.style.setProperty('--ty',y.toFixed(1)+'px');}
function select(s,source){if(selected&&selected.node)selected.node.dataset.selected='false';selected=s||null;for(const row of events)row.dataset.sel=String(!!s&&row.dataset.code===s.code);
 if(!s){root.dataset.tip='false';return;}if(s.node)s.node.dataset.selected='true';fillTip(s);placeTip(s);root.dataset.tip='true';if(source==='keyboard')status.textContent=s.name+', '+(s.bad?'packet loss':'operational')+', round trip '+(s.lastRtt||s.rtt)+' milliseconds';}
function pickAt(ev){const box=svg.getBoundingClientRect(),x=(ev.clientX-box.left)/box.width*VIEW.w,y=(ev.clientY-box.top)/box.height*VIEW.h;let best=null,bd=16*16;for(const s of shown){const d=(s.x-x)*(s.x-x)+(s.y-y)*(s.y-y);if(d<bd){bd=d;best=s;}}return best;}
on(mapBox,'pointermove',e=>{if(thumb||e.pointerType==='touch'||pinned)return;const s=pickAt(e);if(s!==selected)select(s,'pointer');},{passive:true});
on(mapBox,'pointerleave',()=>{if(!thumb&&!pinned)select(null);},{passive:true});
on(mapBox,'pointerdown',e=>{if(thumb)return;const s=pickAt(e);if(s){pinned=true;select(s,'pointer');ping(s,true);}else{pinned=false;select(null);}},{passive:true});
function neighbour(dir){const from=selected||SITES.find(s=>s.code==='FRA');let best=null,bd=1e9;for(const s of shown){if(s===from)continue;const dx=s.x-from.x,dy=s.y-from.y,along=dir==='ArrowRight'?dx:dir==='ArrowLeft'?-dx:dir==='ArrowDown'?dy:-dy,across=dir==='ArrowRight'||dir==='ArrowLeft'?Math.abs(dy):Math.abs(dx);if(along<=0)continue;const score=along+across*2;if(score<bd){bd=score;best=s;}}return best||from;}
on(mapBox,'keydown',e=>{if(e.key.startsWith('Arrow')){e.preventDefault();pinned=true;select(neighbour(e.key),'keyboard');}else if(e.key==='Enter'||e.key===' '){e.preventDefault();const s=selected||SITES.find(x=>x.code==='FRA');pinned=true;select(s,'keyboard');ping(s,true);if(reduced)staticRings();}else if(e.key==='Escape'){pinned=false;select(null);}});
on(mapBox,'blur',()=>{pinned=false;select(null);});
on(document,'visibilitychange',()=>{last=null;});
function prefill(){// A believable minute of history so the log never starts empty.
 const order=['FRA','MXP','LHR','AMS','MXP','CDG','ARN','DUB','MXP','WAW','MAD'];let t=-700-order.length*1300;for(const code of order){const s=SITES.find(x=>x.code===code),m=sample(s);s.lastRtt=m.rtt;s.lastLoss=m.loss;s.last=t;logEvent({s,time:t,msg:m.msg,val:m.val});t+=1300;}for(const row of events)row.classList.remove('is-entering');updateSummary();}
function reset(){cancelAnimationFrame(raf);raf=0;rings.forEach(r=>r.node?.remove());rings=[];events.splice(0).forEach(r=>r.remove());clock=0;last=null;pinned=false;select(null);schedule();prefill();
 if(clockEl)clockEl.textContent=stamp(0)+' UTC';if(reduced){staticRings();return;}raf=requestAnimationFrame(frame);}
ctx.onAction('ping',()=>{const s=selected||SITES.find(x=>x.code==='FRA');pinned=true;select(s,'action');ping(s,true);if(reduced)staticRings();});
ctx.onAction('anomaly',()=>{const s=SITES.find(x=>x.code==='MXP');pinned=true;select(s,'action');ping(s,true);if(reduced)staticRings();});
ctx.onAction('reset',reset);
reset();
root.__mapRadarPingsInspect=()=>({sites:shown.map(s=>s.code),rings:rings.length,events:events.length,clock,selected:selected&&selected.code});
return()=>{dead=true;cancelAnimationFrame(raf);abort.abort();fitObserver.disconnect();};`,
  prompt: `Build an edge-site monitoring map for a dark product UI as inline SVG. Draw Western Europe from simplified real coastlines (mainland, Great Britain, Ireland, North Africa, Anatolia, Corsica, Sardinia, Sicily, Crete, the Danish islands) in a plate carrée projection scaled at 48°N, with a faint 5° graticule, italic sea names and a 250 km scale bar. Place nine sites at real airport coordinates with IATA labels (DUB, LHR, AMS, CDG, FRA, MAD, MXP, ARN, WAW). Each site sends a heartbeat on a seeded schedule every 4–6.8 s: an accent #fa7319 ring grows from 4 to 26 px over 1.2 s with an ease-out cubic and fades out; at most sixteen rings are live. MXP has packet loss: its dot and label use the accent, it pings every 2 s and its rings are stronger. A side panel shows the eyebrow and a live UTC clock, a three-cell summary (8 operational, 1 packet loss, median RTT), and a heartbeat log in Geist Mono tabular figures where new rows enter from the top with an 8px, 250ms reveal and older rows slide down. Hovering a site shows a tooltip card with code, city, a status pill, RTT, loss, last ping and 30-day uptime; arrow keys move between sites, Enter pings, Escape clears. Dock actions Ping, Anomaly and Reset. The tile is a tighter crop of France, the Alps and the Benelux with an MXP status chip. Reduced motion draws one still frame with static rings and a prefilled log. Clean up listeners and frames on unmount.`
});
