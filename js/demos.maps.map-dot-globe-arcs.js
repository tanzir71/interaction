/* Dotted globe with great-circle replication arcs: an original INTRX map component. */
INTRX.register({
  id: "map-dot-globe-arcs",
  title: "Globe Arcs",
  cat: "Maps & Geo",
  rootClass: "d-maps-map-dot-globe-arcs",
  tags: ["canvas","globe","routes"],
  libs: [],
  desc: "A dotted globe drawn from real coastlines rotates slowly while great-circle arcs replicate data between ten named edge regions. Each route shows its true distance and an estimated round trip; hover a region for its coordinates and load.",
  seen: "Seen on: GitHub's globe, Vercel's edge network map and global network telemetry dashboards",
  hint: "Hover · Arcs fly between named regions; hover a city to inspect it",
  html: `<div class="d-maps-map-dot-globe-arcs" role="region" aria-label="Edge replication globe">
  <div class="d-maps-map-dot-globe-arcs-view" tabindex="0" role="group" aria-roledescription="globe" aria-keyshortcuts="ArrowLeft ArrowRight Enter Space" aria-label="Dotted globe with replication routes between ten edge regions. Left and right arrows turn the globe, Enter launches the next route.">
    <canvas class="d-maps-map-dot-globe-arcs-canvas" aria-hidden="true"></canvas>
    <div class="d-maps-map-dot-globe-arcs-tip" aria-hidden="true">
      <p class="d-maps-map-dot-globe-arcs-tip-head"><b class="d-maps-map-dot-globe-arcs-tip-code"></b><span class="d-maps-map-dot-globe-arcs-tip-name"></span></p>
      <p class="d-maps-map-dot-globe-arcs-tip-coord"></p>
      <p class="d-maps-map-dot-globe-arcs-tip-row"><span>Load</span><b class="d-maps-map-dot-globe-arcs-tip-load"></b></p>
      <p class="d-maps-map-dot-globe-arcs-tip-row"><span>Routes</span><b class="d-maps-map-dot-globe-arcs-tip-routes"></b></p>
    </div>
  </div>
  <div class="d-maps-map-dot-globe-arcs-chip" aria-hidden="true">
    <p class="d-maps-map-dot-globe-arcs-chip-pair"><span class="d-maps-map-dot-globe-arcs-chip-from">LHR</span><svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 4h9M7 1l3 3-3 3"/></svg><span class="d-maps-map-dot-globe-arcs-chip-to">IAD</span></p>
    <p class="d-maps-map-dot-globe-arcs-chip-meta"><span class="d-maps-map-dot-globe-arcs-chip-km">5,906 km</span><i></i><span class="d-maps-map-dot-globe-arcs-chip-ms">74 ms</span></p>
  </div>
  <aside class="d-maps-map-dot-globe-arcs-panel" aria-label="Replication routes">
    <p class="d-maps-map-dot-globe-arcs-eyebrow"><i class="d-maps-map-dot-globe-arcs-live" aria-hidden="true"></i>Edge replication</p>
    <h3 class="d-maps-map-dot-globe-arcs-title">10 regions, 12 routes</h3>
    <dl class="d-maps-map-dot-globe-arcs-stats">
      <div><dt>Median RTT</dt><dd class="d-maps-map-dot-globe-arcs-stat-rtt">96 ms</dd></div>
      <div><dt>In flight</dt><dd class="d-maps-map-dot-globe-arcs-stat-live">0</dd></div>
      <div><dt>Synced today</dt><dd class="d-maps-map-dot-globe-arcs-stat-sync">4.82 TB</dd></div>
    </dl>
    <p class="d-maps-map-dot-globe-arcs-list-head"><span>Route</span><span>Distance</span><span>RTT</span></p>
    <ol class="d-maps-map-dot-globe-arcs-routes" aria-label="Most recent routes"></ol>
    <p class="d-maps-map-dot-globe-arcs-legend"><span><i class="d-maps-map-dot-globe-arcs-key-city"></i>Region</span><span><i class="d-maps-map-dot-globe-arcs-key-arc"></i>Great-circle route</span></p>
  </aside>
  <span class="d-maps-map-dot-globe-arcs-status" role="status" aria-live="polite"></span>
</div>`,
  css: `.d-maps-map-dot-globe-arcs{--fs:var(--fit-scale,1);--ink:#ededed;--ink-2:#a1a1a1;--ink-3:#8a8a8a;--edge:rgba(255,255,255,.09);--accent:#fa7319;position:relative;color:var(--ink);font:400 12px/16px Geist,system-ui,sans-serif;font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased;isolation:isolate}
.d-maps-map-dot-globe-arcs *{box-sizing:border-box}
.d-maps-map-dot-globe-arcs p,.d-maps-map-dot-globe-arcs h3,.d-maps-map-dot-globe-arcs dl,.d-maps-map-dot-globe-arcs dd{margin:0}
.d-maps-map-dot-globe-arcs ol{margin:0;padding:0}
.d-maps-map-dot-globe-arcs-view{position:absolute;inset:0;outline:none;touch-action:pan-y;cursor:grab}
.d-maps-map-dot-globe-arcs-view:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:-2px;border-radius:12px}
.d-maps-map-dot-globe-arcs-canvas{position:absolute;left:0;top:0;display:block}
.d-maps-map-dot-globe-arcs-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.d-maps-map-dot-globe-arcs-tip{position:absolute;left:0;top:0;z-index:3;min-width:148px;padding:8px 10px 9px;border-radius:10px;background:linear-gradient(#202020,#1a1a1a);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.5),0 10px 24px -8px rgba(0,0,0,.7);pointer-events:none;opacity:0;transform:translate(var(--tx,0px),var(--ty,0px)) scale(.98);transform-origin:0 100%;transition:opacity var(--dur-micro,80ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-dot-globe-arcs[data-tip="true"] .d-maps-map-dot-globe-arcs-tip{opacity:1;transform:translate(var(--tx,0px),var(--ty,0px));transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--dur-micro,80ms),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-dot-globe-arcs-tip-head{display:flex;align-items:baseline;gap:6px;font-size:12px;line-height:16px;white-space:nowrap}
.d-maps-map-dot-globe-arcs-tip-code{font:600 12px/16px 'Geist Mono',ui-monospace,monospace;color:#ffb27a}
.d-maps-map-dot-globe-arcs-tip-name{font-weight:500}
.d-maps-map-dot-globe-arcs-tip-coord{margin-top:2px !important;font:400 11px/15px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-maps-map-dot-globe-arcs-tip-row{display:flex;justify-content:space-between;gap:12px;margin-top:4px !important;font-size:11px;line-height:15px;color:var(--ink-2)}
.d-maps-map-dot-globe-arcs-tip-row b{font:500 11px/15px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-dot-globe-arcs-chip{display:none}
.d-maps-map-dot-globe-arcs-panel{position:absolute;top:18px;right:4px;bottom:14px;width:232px;display:flex;flex-direction:column}
.d-maps-map-dot-globe-arcs-eyebrow{display:flex;align-items:center;gap:7px;font-size:11px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2)}
.d-maps-map-dot-globe-arcs-live{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px rgba(250,115,25,.18)}
.d-maps-map-dot-globe-arcs-title{margin-top:6px !important;font-size:17px;line-height:22px;font-weight:600;letter-spacing:-.015em}
.d-maps-map-dot-globe-arcs-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:14px !important;border-radius:10px;overflow:hidden;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px var(--edge)}
.d-maps-map-dot-globe-arcs-stats div{padding:8px 9px;background:#171717}
.d-maps-map-dot-globe-arcs-stats dt{font-size:11px;line-height:14px;color:var(--ink-3);white-space:nowrap}
.d-maps-map-dot-globe-arcs-stats dd{margin-top:3px;font:500 13px/16px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-dot-globe-arcs-list-head,.d-maps-map-dot-globe-arcs-route{display:grid;grid-template-columns:1fr 66px 44px;align-items:center;gap:8px}
.d-maps-map-dot-globe-arcs-list-head{margin-top:16px !important;padding:0 2px 6px;border-bottom:1px solid rgba(255,255,255,.07);font-size:11px;line-height:14px;color:var(--ink-3)}
.d-maps-map-dot-globe-arcs-list-head span:not(:first-child),.d-maps-map-dot-globe-arcs-route span:not(:first-child){text-align:right}
.d-maps-map-dot-globe-arcs-routes{position:relative;list-style:none;height:130px;overflow:hidden}
.d-maps-map-dot-globe-arcs-route{position:relative;height:26px;padding:0 2px;border-bottom:1px solid rgba(255,255,255,.045);font:400 12px/16px 'Geist Mono',ui-monospace,monospace;color:var(--ink-2);transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-dot-globe-arcs-route.is-entering{opacity:0;transform:translateY(-6px)}
.d-maps-map-dot-globe-arcs-route-pair{display:flex;align-items:center;gap:6px;color:var(--ink)}
.d-maps-map-dot-globe-arcs-route-pair svg,.d-maps-map-dot-globe-arcs-chip-pair svg{width:12px;height:8px;fill:none;stroke:currentColor;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;opacity:.55}
.d-maps-map-dot-globe-arcs-route-dot{width:6px;height:6px;border-radius:50%;background:#3a3a3a;transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-dot-globe-arcs-route[data-live="true"]{color:var(--ink)}
.d-maps-map-dot-globe-arcs-route[data-live="true"] .d-maps-map-dot-globe-arcs-route-dot{background:var(--accent);box-shadow:0 0 0 3px rgba(250,115,25,.16)}
.d-maps-map-dot-globe-arcs-route[data-live="true"] .d-maps-map-dot-globe-arcs-route-rtt{color:#ffb27a}
.d-maps-map-dot-globe-arcs-legend{display:flex;gap:14px;padding-top:10px;margin-top:auto !important;font-size:11px;line-height:14px;color:var(--ink-3)}
.d-maps-map-dot-globe-arcs-legend span{display:flex;align-items:center;gap:6px}
.d-maps-map-dot-globe-arcs-key-city{width:7px;height:7px;border-radius:50%;background:#f2f2f2;box-shadow:0 0 0 2px rgba(255,255,255,.14)}
.d-maps-map-dot-globe-arcs-key-arc{width:16px;height:2px;border-radius:2px;background:linear-gradient(90deg,rgba(250,115,25,.15),#fa7319)}
.d-maps-map-dot-globe-arcs[data-mode="thumb"] .d-maps-map-dot-globe-arcs-panel{display:none}
.d-maps-map-dot-globe-arcs[data-mode="thumb"] .d-maps-map-dot-globe-arcs-chip{position:absolute;left:10px;top:8px;z-index:2;display:block;padding:7px 10px 8px;border-radius:10px;background:rgba(24,24,24,.86);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 8px 20px -8px rgba(0,0,0,.8);pointer-events:none}
.d-maps-map-dot-globe-arcs-chip-pair{display:flex;align-items:center;gap:6px;font:600 max(12px,calc(11px / var(--fs))) / 16px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-dot-globe-arcs-chip-meta{display:flex;align-items:center;gap:6px;margin-top:2px !important;font:400 max(11px,calc(11px / var(--fs))) / 15px 'Geist Mono',ui-monospace,monospace;color:var(--ink-2)}
.d-maps-map-dot-globe-arcs-chip-meta i{width:3px;height:3px;border-radius:50%;background:#555}
.d-maps-map-dot-globe-arcs-chip-ms{color:#ffb27a}
.d-maps-map-dot-globe-arcs-chip-pair,.d-maps-map-dot-globe-arcs-chip-meta{transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-dot-globe-arcs-chip[data-swap="true"] p{opacity:0;transition-duration:var(--dur-micro,80ms)}
@media (prefers-reduced-motion:reduce){.d-maps-map-dot-globe-arcs-route,.d-maps-map-dot-globe-arcs-tip{transform:none !important;transition-property:opacity !important;transition-duration:var(--dur-quick,150ms) !important}.d-maps-map-dot-globe-arcs-route.is-entering{transform:none}}`,
  js: `const C='d-maps-map-dot-globe-arcs',q=n=>root.querySelector('.'+C+'-'+n),thumb=ctx.mode==='thumb',reduced=!!ctx.reducedMotion;
root.dataset.mode=ctx.mode;
function syncScale(){root.style.setProperty('--fit-scale',String(ctx.scale||1));}
const fitObserver=new ResizeObserver(syncScale);fitObserver.observe(stage);syncScale();
const abort=new AbortController(),on=(node,type,fn,opts)=>node.addEventListener(type,fn,Object.assign({signal:abort.signal},opts||{}));
const view=q('view'),canvas=q('canvas'),g=canvas.getContext('2d'),tip=q('tip'),status=q('status'),routeList=q('routes');
// Layout: the detail view pairs a 300px globe with a route panel; the tile is one large crop of the northern hemisphere.
const W=thumb?300:600,H=thumb?216:340,CX=thumb?150:178,CY=thumb?182:172,R=thumb?156:150,TILT=thumb?.36:.3;
const dpr=Math.min(3,devicePixelRatio||1);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);canvas.style.width=W+'px';canvas.style.height=H+'px';
// Coastlines: simplified outlines in longitude/latitude pairs (holes listed separately).
const LAND=['-166 68.5 -163 70 -156.5 71.3 -150 70.5 -141 69.7 -133 69.5 -128 70.2 -120 69 -114 68.3 -108 68.5 -100 67.8 -94 69 -88 68.5 -82 69.5 -80 64 -72 62 -64.5 60.3 -61 56 -56 52 -59.5 47.8 -64.5 49 -60 46.5 -63.5 44.5 -66 44 -70 43.5 -70 41.7 -74 40.5 -75.5 38 -76 35.2 -78 33.8 -81 31.5 -80 27 -80.4 25.2 -81.7 25.8 -82.8 28 -84 30 -86 30.4 -89 30.2 -90.5 29 -94 29.6 -97.3 27.7 -97.5 24 -97.7 21.5 -96 19 -94.5 18.2 -91 18.7 -90.4 21 -87 21.5 -87.6 19 -88.2 16 -86 15.9 -83.2 15 -83.5 11.5 -81.5 9 -79.5 9.5 -77.4 8.6 -79.8 7.3 -81.5 7.6 -83.6 8.4 -85.7 10 -87.5 13 -91.5 14 -94.5 16 -97 15.8 -101 17.3 -105.5 20 -105.3 22.5 -106.5 23.5 -109 25.5 -112.5 29.5 -114.8 31.6 -113 29 -111.5 26 -110 24 -109.5 23 -111.5 24.5 -112.2 26 -114.3 28 -115.7 30.3 -117.1 32.5 -118.5 34 -120.6 34.6 -121.9 36.6 -122.5 37.8 -123.8 39.8 -124.3 42 -124 46.2 -124.7 48.4 -125 50 -127.5 51 -130 54.5 -132.5 56.5 -135.5 58.5 -139.5 59.7 -146 60.5 -151 59.2 -154 57.5 -158 56 -162 55 -164.8 54.4 -160 57.5 -157 58.8 -162 59.8 -164.5 60.8 -165.5 62.5 -164 63.5 -161 64.5 -166 65.5 -168 65.6 -163 66.5',
'-77.4 8.6 -75.5 10.5 -72 11.8 -71.5 10.5 -68 10.5 -64 10.6 -61.5 10.5 -60 8.5 -57.5 6 -53.5 5.5 -51.5 4.2 -50 1.8 -49 -0.5 -44.5 -2.5 -41 -3 -38.5 -3.8 -35.2 -5.5 -34.8 -7.5 -35.3 -9.5 -37.5 -12 -39 -14.5 -39 -17.5 -40.5 -20.5 -42 -23 -44.5 -23.3 -48 -26 -48.6 -28.5 -51 -31 -53.5 -34 -56.5 -35 -57.5 -36 -57.5 -38.5 -62 -39 -62.3 -41 -65 -41 -64 -42.5 -65.5 -45 -67.5 -46.5 -65.8 -47.8 -68.3 -50.5 -69 -52 -68.4 -54.5 -66.5 -55 -70 -55.2 -72.5 -53.5 -74.5 -52 -75.5 -48 -74 -46.5 -73.5 -43 -73.7 -40 -73.3 -37.5 -71.7 -33 -71.5 -30 -71.3 -26 -70.4 -23.5 -70.2 -18.5 -71.5 -17.3 -75 -15.3 -76.2 -13.5 -77.8 -11 -79.5 -7.5 -81.2 -5.5 -80.5 -3.4 -80 -2.2 -80.9 -1 -80 0.8 -78.9 1.5 -77.5 3.8 -77.3 6 -77.9 7.3',
'-5.6 36 -8.9 37 -9.5 38.8 -8.8 41.5 -9.3 43 -8 43.7 -4.5 43.4 -1.8 43.4 -1.2 46 -2.5 47.3 -4.6 48.4 -1.6 48.7 -1.9 49.7 0.2 49.5 1.6 50.9 3.5 51.4 4.8 53 7 53.5 8.6 53.9 8.1 56.7 10.5 57.7 10.9 56.4 10 55 11 54 14.3 53.9 18 54.8 19.6 54.4 21.1 55.7 21 56.8 23.5 57 24 58.3 23.5 59.2 28 59.5 30.2 59.9 25 60.2 22.5 60 21.5 61.5 21.5 63.5 25.4 65 24 65.8 22 65.5 21 64.5 19 63.5 17.5 62.5 17.2 61 18.8 59.8 18 59.3 16.5 57.5 16 56.2 14.2 55.4 12.9 55.6 12.5 56.5 11.8 58 11.1 59 10.5 59.6 10 59 8 58.1 6 58.3 5.3 59.5 5 61 5.2 62.5 8 63.5 10.5 64.6 12.5 66 14.5 67.8 16 69 19 70 23.5 70.8 28 71 31 70.2 33 69.4 36 69 41 67.7 43.5 68.4 46 68 53 68.6 59 68.8 60.5 69.8 68 68.5 68 71.5 72.5 72.8 80 72.5 82 73.5 87 75 100 76.5 104 77.7 112 76.5 113 73.8 120 73 128 72.5 130 71 140 72.5 150 71.6 160 69.6 170 70 180 69 180 65 177 62.5 172 60.5 163 59.8 163 58 162.5 56 160 53 156.7 51 156 53.5 155.5 57 156.8 57.8 160 61.3 156 61.6 151 59.2 143 59.3 138 56 137.5 54 141 52 141.3 48 138 45.5 135.5 43.5 132 43.2 130 42.5 129.5 41 129.4 37 129.2 35.2 126.5 34.4 126.3 36.5 126.7 37.7 125.2 37.7 124.7 39.6 121.5 39 121.2 38.8 122 40.5 121 41 119.5 39.8 118 39.2 117.7 38.3 118.9 37.4 120.7 37.8 122.5 37.3 120.5 36 119.2 35 120.8 32.5 121.9 31 122 29.5 121.4 28.2 119.6 25.5 118 24.5 116.5 23 114 22.3 110.5 21 109.8 21.5 108 21.6 106.6 20.2 106 18.5 108.8 15.2 109.2 12.5 108.9 11.3 107 10.4 105 8.6 104.8 10.5 103 10.5 101 12.7 100 13.5 99.2 10.5 100.3 8 103.4 5 104.2 1.4 103.4 1.4 101.3 2.9 100.3 5.5 98.3 8 98.5 10.5 97.7 16.5 94.3 16 94.5 19 92.3 21.4 91.8 22.4 90.5 22 88.5 21.7 87 21.5 86.5 20 85 19.2 82.3 16.6 80.2 15.5 80.3 13 79.8 10.3 78.2 8.9 77.5 8.1 76.3 9.6 75 12.5 74 15 73 17.5 72.8 19.2 72.6 21.5 70 21 68.8 22.5 67 24.8 64 25.3 61.5 25.1 58 25.7 57 27 54.5 26.5 52 27.8 50.8 29 50 30.2 48 30 48 29.4 49.6 27 50.2 26 51.5 25.9 51.6 24.3 54.5 24.2 56 25.8 56.4 24.8 58.6 23.6 59.8 22.5 58.5 20.5 57.7 19 55.3 17.3 52.3 16.3 49 14.6 45 12.8 43.5 12.7 43.3 13.5 42.7 15.5 41 19 39.2 21.5 38 24 36.6 25.8 35.2 28 34.9 29.5 34.2 27.8 32.6 29.9 32.3 31.3 34.2 31.3 35 32.8 35.6 34.5 35.9 35.9 36.2 36.6 34.5 36.8 32.5 36.1 30.6 36.7 28 36.7 27.2 37.8 26.6 38.4 26.2 39.5 26.4 40.2 26 40.8 24 40.8 23.8 40.2 22.6 40.5 23 39.3 24 38.2 23.2 38 22.9 36.5 21.7 36.8 21.1 37.8 21.7 38.3 20.7 39 20 39.7 19.4 40.4 19.5 41.8 18.7 42.3 17.5 43 15.9 43.6 15.1 44.3 14.4 45.2 13.6 45.6 12.3 45.4 12.4 44.5 13.5 43.6 14.5 42.2 16 41.9 16.2 41.3 17.3 40.8 18.5 40.1 18.3 39.8 17.1 40.5 16.6 39.9 16.6 38.9 15.7 37.9 15.9 38.7 15.6 40.1 14.5 40.6 14.2 40.8 13 41.3 12.2 41.8 11.2 42.4 10.5 43 10.3 43.9 9.2 44.3 8.5 44.3 7.5 43.8 6.6 43.2 5.2 43.3 4.2 43.5 3.2 43 3.2 42.1 2.2 41.3 0.9 40.7 -0.3 39.5 0.2 38.7 -0.7 37.6 -2.1 36.7 -4.4 36.7',
'-17.2 14.7 -16.8 13 -15 11 -13.3 9 -11.5 6.9 -9 5 -7.5 4.4 -4 5.2 -2 4.8 1 5.9 3 6.3 4.5 6.2 6 4.3 8.5 4.5 9.8 2.5 9 -0.7 11.8 -4 12.3 -6 13.2 -8.8 12.5 -13.5 11.8 -17 14.5 -22.8 15.3 -27 16.5 -28.6 18.3 -31.5 18.4 -34.2 20 -34.8 22.5 -34 25.6 -34 27.5 -33.2 30 -31.3 32.4 -28.5 32.6 -26 35.4 -24 35.3 -22 34.8 -20 36.9 -17.8 40.5 -15 40.5 -10.5 39.5 -7 39.3 -4.6 41 -2 43.5 0.5 45.5 2 47.5 4.5 49.5 8 51.2 11.8 48 11.3 45 10.5 43.3 11.7 42.7 13 41 15 39.2 15.8 38.5 18 37.2 21 36.9 22.5 35.6 24 34 27 33.6 28 32.6 29.9 32.3 31.3 29.5 31 25.2 31.6 20.1 32.2 19.5 30.3 15.6 31.5 13 32.9 11.1 33.3 10.2 35 11 37 9.5 37.3 3 36.8 -1.2 35.4 -2 35.1 -5.9 35.8 -6.8 34 -9.6 30.4 -9.9 29.5 -13 27.6 -14.5 26 -16.1 24 -17.05 21 -16.2 19.5 -16.5 16.5',
'-5.7 50.1 -3.5 50.3 -1.3 50.8 1.4 51.2 1.7 52.6 0.2 53.5 -1.3 54.6 -1.6 55.6 -2.6 56 -1.8 57.6 -3.1 58.6 -5 58.6 -5.8 57.5 -5.6 56.3 -5.2 55.3 -4.8 54.8 -3.2 54.9 -3.1 53.4 -4.6 53.3 -4.2 52.4 -5.1 51.8 -3.2 51.4 -4.2 51.2 -5 50.5',
'-7.3 55.4 -5.5 54.5 -6.1 53.3 -6.4 52.2 -8.2 51.6 -10 51.6 -10.3 52.2 -9.5 53.2 -10 54.2 -8.5 55.2',
'-22.5 64 -21.5 65.4 -24 65.5 -22.5 66.4 -16 66.5 -14 65.3 -15 64.3 -18.5 63.4 -21 63.8',
'-73 78 -66 80.5 -55 82 -40 83.3 -25 83 -12 81.5 -19 79 -19 76 -21 72.5 -22 70.5 -26 68.5 -32 68 -38 65.5 -42 61 -44 60 -46.5 61 -49.5 63.5 -52 66 -53 69 -55 71 -58 75.5 -66 76.5 -71 77.5',
'-62 66.5 -64 65 -66 63 -68 63.5 -71 64 -74 64.8 -77 68 -82 70 -85 73.5 -80 73.7 -75 72.5 -70 70.5 -68 69.8 -64 67.8',
'-118 70.5 -110 73 -102 72.8 -101 70 -106 68.8 -115 68.8','-92 76 -80 76.5 -75 78.5 -68 81 -62 82.3 -75 83 -90 81.5 -95 78.5','-125 71.8 -120 74.5 -115 73.3 -118 71',
'130.9 34.3 132.5 35.5 135.5 35.6 136.5 37.2 138.5 37.7 139.9 40.2 140.1 41.4 141.4 41.4 141.9 39.5 141 38.3 140.9 36.9 140.8 35.7 139.8 35 139 34.7 137 34.6 136.8 34.2 135.8 33.5 135.1 34.6 133 34.3 131.5 34',
'129.8 33.2 130.9 33.9 131.9 33 131.4 31.4 130.6 31.1 130.2 32.6','132.5 33.2 134.6 34.2 134.7 33.8 133.7 33.4 132.9 32.8','140 42.5 141.4 41.9 143.2 42 145.5 43.3 144.3 44 141.9 45.5 141.3 43.4 139.9 42.3',
'142 46 143.5 46.5 143.2 49.3 144.6 49 142.8 54.3 142.2 51.5 141.9 48.5','120.1 23 121 25.2 122 25 121.5 23.5 120.8 21.9','108.6 19.2 110.5 20.1 111 19.6 109.5 18.2','79.8 8 80.2 9.8 81.5 8 81.8 7 81 6 80 6.1',
'120 16.2 120.6 18.5 122.2 18.5 122 16.5 124 13 121.5 13.8 120.6 14.4','122 7 123.6 8.6 125.4 9.7 126.6 7.3 125.6 5.6 124 6.6 122.6 7.5',
'109 1.6 110.5 1.8 111.6 2.8 113.5 4.5 115.5 5.3 117.3 6.8 119.2 5.3 118.1 4.3 117.7 1 118.9 0.9 117.5 -0.8 116.6 -1.8 116.2 -4 114.6 -3.7 111.7 -3 110.2 -2.9 109.6 -1',
'95.3 5.6 97.5 5.2 100.5 2.2 103.8 -0.9 106 -3.2 105.9 -5.8 104.5 -5.9 102.3 -4 100.3 -1 98.7 1.7 96.5 3.7','105.2 -6.8 106.1 -6 108.3 -6.2 111 -6.4 112.6 -6.9 114.4 -7.8 114.4 -8.7 111 -8.2 108 -7.8 106.4 -7.4',
'119.4 -5.5 120.4 -5.6 120.9 -2.6 121.6 -4.6 123 -4.4 122.2 -3 121.3 -1.9 123.3 -0.9 122.5 0.5 124.7 1.4 120.9 1.3 119.8 0.2 118.8 -2.9',
'131 -1.3 134 -0.9 135.3 -3.4 137.8 -1.5 141 -2.6 144.5 -3.8 146 -5.5 147.8 -6.3 148.2 -8.5 150.6 -10.6 147.4 -10 146 -8.1 144.2 -7.7 142.6 -9.3 141 -9.1 139 -8.1 138 -5.5 135 -4.4 133.8 -3.8 132 -2.8',
'113.5 -22 114 -26 115 -30 115.7 -33.5 115 -34.3 117.9 -35.1 121 -33.8 123.6 -33.9 126 -32.3 129 -31.6 131.2 -31.5 134.2 -32.7 135.6 -34.9 137.8 -33 138.5 -34.8 138.2 -35.6 139.6 -36.5 140.9 -38 143.5 -38.8 146.3 -39.1 147.9 -37.9 150 -37.5 150.9 -34.5 151.3 -33.8 152.5 -32 153.6 -28.5 153.1 -25.5 150.8 -22.7 149 -20.5 146.3 -18.9 145.4 -15 143.6 -14 142.5 -10.7 141.6 -12.6 141.6 -15.5 140.6 -17.6 139.3 -17.3 136.8 -15.9 135.9 -15 136.9 -12.2 135 -12.1 132.6 -11.5 131 -12.2 129.5 -14.8 127.8 -14.1 125.8 -14.5 124.4 -16.4 122.2 -17.5 121.6 -19 119 -20 116.7 -20.6 114.8 -21.6',
'144.6 -40.7 148.3 -40.9 148.3 -42.2 147 -43.6 145.3 -42.2','172.7 -34.4 174.3 -35.5 175.9 -37.1 178.5 -37.7 177 -39.6 176.8 -40.2 175.2 -41.6 174.7 -41.3 174.6 -39.6 173.8 -39.2 174.6 -38.2 174.5 -36.8',
'172.6 -40.5 174.3 -41.7 173.2 -43 172.8 -43.7 171.2 -44.5 170.7 -45.8 169.2 -46.6 166.5 -46 166.7 -45.3 168.3 -44 170.6 -42.7 172 -41.4',
'-84.9 21.9 -83 23 -80.3 23.1 -77.2 21.7 -74.2 20.2 -77.7 19.9 -80.5 21.6 -82.9 22','-74.4 19.8 -72.8 19.9 -70 19.7 -68.4 18.6 -71.6 17.6 -74.4 18.4',
'49.3 -12 50.4 -15.5 49.8 -17 48.6 -20.5 47.2 -24.9 45.2 -25.6 43.8 -23.5 43.4 -21.5 44.4 -19.5 44 -17 46.3 -15.8 47.8 -14.2',
'8.4 40.9 9.6 41.1 9.8 39.2 9 39 8.4 39.4','8.6 42.4 9.4 43 9.6 42 9.2 41.4 8.6 41.9','12.4 38.1 15.6 38.3 15.2 37 14.3 37 12.5 37.6',
'52 71.5 55 70.6 57.5 70.7 56 73 60 75.5 69 77 65 77 55 74.5 53 72.5','11 78.5 16 80 27 80.2 22 78 16 76.6'];
const WATER=['27.5 42.5 28 43.5 29.6 45.2 30.7 46.5 32 46.5 33.5 45.9 32.5 45.3 33.5 44.4 35.5 45.1 36.6 45.2 38 44.5 39.7 43.5 41.6 41.6 40 41 37 41.1 35 42 33 42 31 41.1 29 41.2 28 41.6',
'47 44.5 49.2 46.4 51.2 47 53 46.8 53.2 45.3 51.3 44.5 51 43 52.7 42 52.9 41 53.9 40.8 54 39 53.9 37.3 51 36.7 49 37.5 48.9 38.4 49.5 40.2 48 42 47.4 43',
'-94.5 59 -92.5 57.3 -88 56.5 -85 55.2 -82.2 52.5 -79 51.5 -79.5 54.5 -77 57.5 -78 60.5 -77.5 62.4 -82 64.5 -87 64.2 -90 63.5 -93 61.5'];
function rings(list){return list.map(s=>{const n=s.split(' ').map(Number),pts=[];let x0=999,x1=-999,y0=999,y1=-999;for(let i=0;i<n.length;i+=2){pts.push(n[i],n[i+1]);x0=Math.min(x0,n[i]);x1=Math.max(x1,n[i]);y0=Math.min(y0,n[i+1]);y1=Math.max(y1,n[i+1]);}return{pts,x0,x1,y0,y1};});}
const landRings=rings(LAND),waterRings=rings(WATER);
function inside(ring,x,y){if(x<ring.x0||x>ring.x1||y<ring.y0||y>ring.y1)return false;const p=ring.pts;let hit=false;for(let i=0,j=p.length-2;i<p.length;j=i,i+=2){const yi=p[i+1],yj=p[j+1];if((yi>y)!==(yj>y)&&x<(p[j]-p[i])*(y-yi)/(yj-yi)+p[i])hit=!hit;}return hit;}
function isLand(lon,lat){if(lat<-70)return true;for(const r of waterRings)if(inside(r,lon,lat))return false;for(const r of landRings)if(inside(r,lon,lat))return true;return false;}
const D2R=Math.PI/180,STEP=2,dots=[];
for(let lat=-88;lat<=88;lat+=STEP){const n=Math.max(1,Math.round(360/STEP*Math.cos(lat*D2R)));for(let i=0;i<n;i++){const lon=-180+(i+.5)*360/n;if(isLand(lon,lat)){const c=Math.cos(lat*D2R);dots.push(c*Math.sin(lon*D2R),Math.sin(lat*D2R),c*Math.cos(lon*D2R));}}}
const DOTS=new Float32Array(dots);
const unit=(lat,lon)=>{const c=Math.cos(lat*D2R);return[c*Math.sin(lon*D2R),Math.sin(lat*D2R),c*Math.cos(lon*D2R)];};
const CITIES=[['IAD','Washington, D.C.',38.95,-77.45,1910],['SFO','San Francisco',37.62,-122.38,1640],['GRU','São Paulo',-23.43,-46.47,980],['LHR','London',51.47,-0.45,2184],['FRA','Frankfurt',50.04,8.56,2420],['BOM','Mumbai',19.09,72.87,1130],['SIN','Singapore',1.36,103.99,1765],['HND','Tokyo',35.55,139.78,1520],['SYD','Sydney',-33.95,151.18,860],['JNB','Johannesburg',-26.14,28.24,540]].map(([code,name,lat,lon,load])=>({code,name,lat,lon,load,v:unit(lat,lon),routes:0}));
const byCode=Object.fromEntries(CITIES.map(c=>[c.code,c]));
const ROUTES=[['LHR','IAD'],['FRA','SIN'],['IAD','GRU'],['FRA','BOM'],['SFO','HND'],['JNB','LHR'],['SIN','SYD'],['GRU','LHR'],['BOM','SIN'],['HND','SFO'],['LHR','FRA'],['IAD','SFO']].map(([a,b])=>{const A=byCode[a],B=byCode[b];A.routes++;B.routes++;const d=Math.acos(Math.max(-1,Math.min(1,A.v[0]*B.v[0]+A.v[1]*B.v[1]+A.v[2]*B.v[2]))),km=Math.round(d*6371);return{a:A,b:B,omega:d,km,rtt:Math.round(km/200*2*1.25)};});
const fmt=n=>String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g,',');
const easeIO=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,easeOut=t=>1-Math.pow(1-t,3);
const DRAW=900,HOLD=600,FADE=400,LIFE=DRAW+HOLD+FADE,LAUNCH_EVERY=2500,MAX_LIVE=3,SPIN=Math.PI*2/(thumb?90000:60000);
let yaw=thumb?28*D2R:22*D2R,yawTarget=null,speed=1,speedTarget=1,slowHeld=false,hovering=false,clock=0,last=null,raf=0,nextLaunch=600,cursor=0,live=[],hoverCity=null,dead=false,pinnedTip=false;
const sinT=Math.sin(TILT),cosT=Math.cos(TILT);
function project(x,y,z,out){const sy=Math.sin(yaw),cy=Math.cos(yaw),x1=x*cy+z*sy,z1=z*cy-x*sy,y2=y*cosT-z1*sinT,z2=y*sinT+z1*cosT;out[0]=CX+R*x1;out[1]=CY-R*y2;out[2]=z2;return out;}
const P=[0,0,0];
function arcPoint(route,t,out){const A=route.a.v,B=route.b.v,o=route.omega,s=Math.sin(o)||1,ka=Math.sin((1-t)*o)/s,kb=Math.sin(t*o)/s,lift=1+(.06+.22*o/Math.PI)*Math.sin(Math.PI*t);return project((A[0]*ka+B[0]*kb)*lift,(A[1]*ka+B[1]*kb)*lift,(A[2]*ka+B[2]*kb)*lift,out);}
function visible(p){return p[2]>0||(p[0]-CX)*(p[0]-CX)+(p[1]-CY)*(p[1]-CY)>R*R;}
const BUCKETS=6,bucketX=Array.from({length:BUCKETS},()=>[]),bucketY=Array.from({length:BUCKETS},()=>[]);
function drawSphere(){const grad=g.createRadialGradient(CX-R*.35,CY-R*.45,R*.1,CX,CY,R);grad.addColorStop(0,'#1f1f1f');grad.addColorStop(1,'#131313');g.beginPath();g.arc(CX,CY,R,0,Math.PI*2);g.fillStyle=grad;g.fill();g.lineWidth=1;g.strokeStyle='rgba(255,255,255,.08)';g.stroke();
 // A faint graticule anchors the rotation without competing with the land dots.
 g.lineWidth=.6;g.strokeStyle='rgba(255,255,255,.045)';for(let lat=-60;lat<=60;lat+=30){g.beginPath();let pen=false;for(let lon=-180;lon<=180;lon+=6){const v=unit(lat,lon);project(v[0],v[1],v[2],P);if(P[2]>0){if(pen)g.lineTo(P[0],P[1]);else g.moveTo(P[0],P[1]);pen=true;}else pen=false;}g.stroke();}
 for(let lon=-180;lon<180;lon+=30){g.beginPath();let pen=false;for(let lat=-84;lat<=84;lat+=6){const v=unit(lat,lon);project(v[0],v[1],v[2],P);if(P[2]>0){if(pen)g.lineTo(P[0],P[1]);else g.moveTo(P[0],P[1]);pen=true;}else pen=false;}g.stroke();}}
function drawDots(){for(let b=0;b<BUCKETS;b++){bucketX[b].length=0;bucketY[b].length=0;}const sy=Math.sin(yaw),cy=Math.cos(yaw);for(let i=0;i<DOTS.length;i+=3){const x=DOTS[i],y=DOTS[i+1],z=DOTS[i+2],x1=x*cy+z*sy,z1=z*cy-x*sy,z2=y*sinT+z1*cosT;if(z2<=0.02)continue;const b=Math.min(BUCKETS-1,Math.floor(Math.pow(z2,.8)*BUCKETS));bucketX[b].push(CX+R*x1);bucketY[b].push(CY-R*(y*cosT-z1*sinT));}
 const size=thumb?1.9:1.7,h=size/2;g.fillStyle='#d6d6d6';for(let b=0;b<BUCKETS;b++){g.globalAlpha=.16+.7*(b+.5)/BUCKETS;g.beginPath();const xs=bucketX[b],ys=bucketY[b];for(let i=0;i<xs.length;i++)g.rect(xs[i]-h,ys[i]-h,size,size);g.fill();}g.globalAlpha=1;}
function routeAlpha(r){const age=clock-r.start;return age<DRAW+HOLD?1:Math.max(0,1-(age-DRAW-HOLD)/FADE);}
function drawRoute(r){const age=clock-r.start,head=reduced?1:easeIO(Math.min(1,age/DRAW)),alpha=reduced?1:routeAlpha(r),N=56,steps=Math.max(1,Math.round(N*head));let prev=null;g.lineCap='round';
 for(let k=0;k<=steps;k++){const tt=k/steps*head;const p=arcPoint(r,tt,[0,0,0]);if(prev&&visible(p)&&visible(prev)){const f=tt/Math.max(.0001,head);g.strokeStyle='rgba(250,115,25,'+((.18+.82*f)*alpha).toFixed(3)+')';g.lineWidth=thumb?1.8:1.6;g.beginPath();g.moveTo(prev[0],prev[1]);g.lineTo(p[0],p[1]);g.stroke();}prev=p;}
 if(!reduced&&age<DRAW&&prev&&visible(prev)){const glow=g.createRadialGradient(prev[0],prev[1],0,prev[0],prev[1],8);glow.addColorStop(0,'rgba(255,190,140,.9)');glow.addColorStop(.35,'rgba(250,115,25,.45)');glow.addColorStop(1,'rgba(250,115,25,0)');g.fillStyle=glow;g.beginPath();g.arc(prev[0],prev[1],8,0,Math.PI*2);g.fill();g.fillStyle='#ffd2b0';g.beginPath();g.arc(prev[0],prev[1],2,0,Math.PI*2);g.fill();}
 const since=age-DRAW;if(!reduced&&since>=0&&since<HOLD){const v=r.b.v;project(v[0],v[1],v[2],P);if(P[2]>0){const k=easeOut(since/HOLD);g.strokeStyle='rgba(250,115,25,'+(1-k).toFixed(3)+')';g.lineWidth=1.2;g.beginPath();g.arc(P[0],P[1],3+13*k,0,Math.PI*2);g.stroke();}}}
function drawCities(){const active=new Set();for(const r of live){active.add(r.a);active.add(r.b);}g.font='500 '+(thumb?Math.max(11,11/(ctx.scale||1)).toFixed(1):'11')+'px "Geist Mono", ui-monospace, monospace';g.textBaseline='middle';
 for(const c of CITIES){project(c.v[0],c.v[1],c.v[2],P);if(P[2]<=.06)continue;const on=active.has(c)||c===hoverCity,fade=Math.min(1,(P[2]-.06)/.25);c.sx=P[0];c.sy=P[1];c.front=true;g.globalAlpha=fade;
  g.fillStyle=on?'rgba(250,115,25,.22)':'rgba(255,255,255,.12)';g.beginPath();g.arc(P[0],P[1],on?6:4.5,0,Math.PI*2);g.fill();g.fillStyle=on?'#ffb27a':'#f2f2f2';g.beginPath();g.arc(P[0],P[1],2.2,0,Math.PI*2);g.fill();
  if(!thumb||on){const label=c.code,tw=g.measureText(label).width,lx=P[0]+((c.code==='LHR'||P[0]>CX+R*.55)?-tw-9:8),ly=P[1]-(c.code==='LHR'?2:8);g.lineWidth=3;g.strokeStyle='rgba(16,16,16,.85)';g.strokeText(label,lx,ly);g.fillStyle=on?'#ffd2b0':'#bdbdbd';g.fillText(label,lx,ly);}}
 g.globalAlpha=1;for(const c of CITIES){project(c.v[0],c.v[1],c.v[2],P);if(P[2]<=.06)c.front=false;}}
function render(){g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);drawSphere();drawDots();for(const r of live)drawRoute(r);drawCities();if(hoverCity)placeTip();}
const PREFER=thumb?[['LHR','IAD'],['SFO','FRA'],['FRA','IAD'],['SFO','LHR']].map(([a,b])=>{const A=byCode[a],B=byCode[b],d=Math.acos(A.v[0]*B.v[0]+A.v[1]*B.v[1]+A.v[2]*B.v[2]),km=Math.round(d*6371);return{a:A,b:B,omega:d,km,rtt:Math.round(km/200*2*1.25)};}):[];let preferCursor=0;
function nextRoute(){for(let n=0;n<PREFER.length;n++){const r=PREFER[(preferCursor+n)%PREFER.length];project(r.a.v[0],r.a.v[1],r.a.v[2],P);const za=P[2];project(r.b.v[0],r.b.v[1],r.b.v[2],P);if(za>.12&&P[2]>.12){preferCursor=(preferCursor+n+1)%PREFER.length;return r;}}for(let n=0;n<ROUTES.length;n++){const r=ROUTES[(cursor+n)%ROUTES.length];project(r.a.v[0],r.a.v[1],r.a.v[2],P);const za=P[2];project(r.b.v[0],r.b.v[1],r.b.v[2],P);if(za>.12&&P[2]>.12){cursor=(cursor+n+1)%ROUTES.length;return r;}}const r=ROUTES[cursor];cursor=(cursor+1)%ROUTES.length;return r;}
const chip={from:q('chip-from'),to:q('chip-to'),km:q('chip-km'),ms:q('chip-ms'),box:q('chip')};
function showChip(r){chip.from.textContent=r.a.code;chip.to.textContent=r.b.code;chip.km.textContent=fmt(r.km)+' km';chip.ms.textContent=r.rtt+' ms';}
function launch(r,user){r=r||nextRoute();while(live.length>=MAX_LIVE)live.shift();const item={a:r.a,b:r.b,omega:r.omega,km:r.km,rtt:r.rtt,start:clock};live.push(item);
 if(thumb){if(reduced)showChip(r);else{chip.box.dataset.swap='true';setTimeout(()=>{if(dead)return;showChip(r);chip.box.dataset.swap='false';},60);}}else pushRow(item);
 if(user)status.textContent='Route '+r.a.name+' to '+r.b.name+', '+fmt(r.km)+' kilometres, '+r.rtt+' milliseconds round trip';}
const rows=[];
function pushRow(item){if(!routeList)return;const li=document.createElement('li');li.className=C+'-route'+(reduced?'':' is-entering');li.dataset.live='true';
 li.innerHTML='<span class="'+C+'-route-pair"><i class="'+C+'-route-dot"></i>'+item.a.code+'<svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 4h9M7 1l3 3-3 3"/></svg>'+item.b.code+'</span><span class="'+C+'-route-dist">'+fmt(item.km)+' km</span><span class="'+C+'-route-rtt">'+item.rtt+' ms</span>';
 li.setAttribute('aria-label',item.a.name+' to '+item.b.name+', '+fmt(item.km)+' kilometres, '+item.rtt+' milliseconds');item.row=li;routeList.prepend(li);rows.unshift(li);while(rows.length>5)rows.pop().remove();
 if(!reduced)requestAnimationFrame(()=>li.classList.remove('is-entering'));syncStats();}
function seedHistory(){if(thumb)return;for(const r of [ROUTES[7],ROUTES[4],ROUTES[1],ROUTES[3]]){pushRow({a:r.a,b:r.b,omega:r.omega,km:r.km,rtt:r.rtt,start:-LIFE});}for(const li of rows){li.classList.remove('is-entering');li.dataset.live='false';}}
function syncStats(){if(thumb)return;const shown=live.filter(r=>clock-r.start<LIFE).length;q('stat-live').textContent=String(shown);const rtts=ROUTES.map(r=>r.rtt).sort((a,b)=>a-b);q('stat-rtt').textContent=Math.round((rtts[5]+rtts[6])/2)+' ms';}
function placeTip(){const c=hoverCity;if(!c||!c.front){root.dataset.tip='false';return;}const tw=tip.offsetWidth||150,th=tip.offsetHeight||80;let x=c.sx+12,y=c.sy-th-10;if(x+tw>W-4)x=c.sx-tw-12;if(y<4)y=c.sy+12;tip.style.setProperty('--tx',x.toFixed(1)+'px');tip.style.setProperty('--ty',y.toFixed(1)+'px');}
function setHover(c){if(c===hoverCity)return;hoverCity=c;if(!c){root.dataset.tip='false';return;}q('tip-code').textContent=c.code;q('tip-name').textContent=c.name;q('tip-coord').textContent=Math.abs(c.lat).toFixed(2)+'° '+(c.lat>=0?'N':'S')+'  '+Math.abs(c.lon).toFixed(2)+'° '+(c.lon>=0?'E':'W');q('tip-load').textContent=fmt(c.load)+' req/s';q('tip-routes').textContent=String(c.routes);root.dataset.tip='true';placeTip();if(reduced)render();}
function pick(ev){const box=canvas.getBoundingClientRect(),x=(ev.clientX-box.left)/box.width*W,y=(ev.clientY-box.top)/box.height*H;let best=null,bd=14*14;for(const c of CITIES){if(!c.front)continue;const d=(c.sx-x)*(c.sx-x)+(c.sy-y)*(c.sy-y);if(d<bd){bd=d;best=c;}}return best;}
function frame(now){raf=0;if(dead)return;const dt=last==null?16:Math.min(50,now-last);last=now;clock+=dt;
 speedTarget=slowHeld||hovering?.4:1;speed+=(speedTarget-speed)*(1-Math.pow(.95,dt/16.67));
 if(yawTarget!=null){const d=yawTarget-yaw;yaw+=d*(1-Math.pow(.88,dt/16.67));if(Math.abs(d)<.001)yawTarget=null;}else yaw+=SPIN*dt*speed;
 if(clock>=nextLaunch){launch(null,false);nextLaunch=clock+LAUNCH_EVERY;}
 const before=live.length;live=live.filter(r=>clock-r.start<LIFE);if(!thumb){for(const li of rows){const item=liveItem(li);li.dataset.live=String(!!item);}if(before!==live.length)syncStats();}
 render();raf=requestAnimationFrame(frame);}
function liveItem(li){for(const r of live)if(r.row===li)return r;return null;}
function start(){if(!raf&&!reduced&&!dead)raf=requestAnimationFrame(frame);}
function reset(){live=[];cursor=0;clock=0;last=null;nextLaunch=600;yaw=thumb?28*D2R:22*D2R;yawTarget=null;slowHeld=false;speed=1;rows.splice(0).forEach(li=>li.remove());setHover(null);
 if(reduced){staticScene();return;}seedHistory();syncStats();render();start();}
function staticScene(){// One composed still: three finished routes on a fixed hemisphere.
 live=[];const picks=thumb?[ROUTES[0],ROUTES[10]]:[ROUTES[0],ROUTES[10],ROUTES[2],ROUTES[5]];for(const r of picks){live.push({a:r.a,b:r.b,omega:r.omega,km:r.km,rtt:r.rtt,start:-DRAW});}
 if(thumb)showChip(ROUTES[0]);else{rows.splice(0).forEach(li=>li.remove());seedHistory();for(const item of live.slice().reverse())pushRow(item);q('stat-live').textContent=String(live.length);}
 render();}
on(view,'pointermove',e=>{if(e.pointerType==='touch')return;hovering=true;const c=pick(e);setHover(c);},{passive:true});
on(view,'pointerleave',()=>{hovering=false;if(!pinnedTip)setHover(null);},{passive:true});
on(view,'pointerdown',e=>{const c=pick(e);if(c){pinnedTip=true;setHover(c);}else{pinnedTip=false;setHover(null);}},{passive:true});
on(view,'keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const step=(e.key==='ArrowLeft'?-1:1)*15*D2R;if(reduced){yaw+=step;render();}else yawTarget=(yawTarget==null?yaw:yawTarget)+step;}else if(e.key==='Enter'||e.key===' '){e.preventDefault();if(reduced){const r=nextRoute();live=[{a:r.a,b:r.b,omega:r.omega,km:r.km,rtt:r.rtt,start:-DRAW}];if(thumb)showChip(r);render();status.textContent='Route '+r.a.name+' to '+r.b.name;}else launch(null,true);}else if(e.key==='Escape'){pinnedTip=false;setHover(null);}});
on(view,'focus',()=>{hovering=true;});on(view,'blur',()=>{hovering=false;pinnedTip=false;setHover(null);});
on(document,'visibilitychange',()=>{last=null;});
ctx.onAction('replay',reset);
ctx.onAction('slow',()=>{slowHeld=!slowHeld;status.textContent=slowHeld?'Orbit slowed for inspection':'Orbit resumed';});
ctx.onAction('route',()=>{if(reduced){const r=nextRoute();live=[{a:r.a,b:r.b,omega:r.omega,km:r.km,rtt:r.rtt,start:-DRAW}];if(thumb)showChip(r);else pushRow(live[0]);render();}else launch(null,true);});
if(reduced)staticScene();else{seedHistory();syncStats();render();start();}
root.__mapDotGlobeArcsInspect=()=>({dots:DOTS.length/3,yaw,live:live.map(r=>r.a.code+'-'+r.b.code),clock,reduced});
return()=>{dead=true;cancelAnimationFrame(raf);abort.abort();fitObserver.disconnect();};`,
  prompt: `Build a dotted globe component for a dark product UI. Render the land as about three thousand dots on a 2° latitude/longitude lattice, classified by point-in-polygon tests against simplified real coastlines (continents, major islands, Hudson Bay, Black Sea and Caspian as holes). Project orthographically on a 2D canvas with an 18° tilt and a calm 60-second rotation; dot alpha follows the facing angle in six batched buckets and a faint 30° graticule sits under the dots. Ten regions are named with IATA codes and real coordinates (IAD, SFO, GRU, LHR, FRA, BOM, SIN, HND, SYD, JNB). Every 2.5 seconds launch the next route whose endpoints both face the viewer: a slerped great-circle arc lifted in proportion to its angular length, drawn head-first over 900ms in the accent #fa7319 with a brighter head, held 600ms with an arrival ring, then faded over 400ms; at most three are live. Distances are haversine kilometres and RTT is distance / 200 km per ms × 2 × 1.25. The detail view adds a panel: eyebrow, title, a three-cell stat strip and a list of recent routes in Geist Mono tabular figures that enter with a 6px, 250ms reveal; the tile is one large crop of the northern hemisphere with a route chip. Hovering slows the orbit to 40% with a 0.05 lerp and shows a tooltip card (code, name, coordinates, load, routes). Arrow keys turn the globe, Enter launches a route; Dock actions Replay, Slow / resume and Next route. Reduced motion draws one still frame with finished routes. Clean up listeners and frames on unmount.`
});
