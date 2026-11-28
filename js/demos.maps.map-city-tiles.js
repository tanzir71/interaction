/* Amsterdam canal ring blocks: an original INTRX map component drawn from a deterministic block model. */
INTRX.register({
  id: "map-city-tiles",
  title: "City Blocks",
  cat: "Maps & Geo",
  rootClass: "d-maps-map-city-tiles",
  tags: ["map","choropleth","city"],
  libs: [],
  desc: "A choropleth of Amsterdam's canal ring: blocks between the Singel, Herengracht, Keizersgracht and Prinsengracht are shaded by year built, Saturday footfall or asking price. Blocks rise in from the Dam outward, and hovering one shows its address range and all three figures.",
  seen: "Seen on: Mapbox Studio choropleths, city open-data portals and real-estate analytics",
  hint: "Hover · Blocks rise from the Dam; hover one for its figures",
  html: `<div class="d-maps-map-city-tiles" role="region" aria-label="Amsterdam canal ring block map">
  <div class="d-maps-map-city-tiles-map" tabindex="0" role="application" aria-roledescription="map" aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Enter Escape" aria-label="Choropleth of city blocks in central Amsterdam. Arrow keys move between blocks, Enter shows the next data layer, Escape clears the selection.">
    <svg class="d-maps-map-city-tiles-svg" aria-hidden="true">
      <rect class="d-maps-map-city-tiles-ground"></rect>
      <g class="d-maps-map-city-tiles-water"></g>
      <g class="d-maps-map-city-tiles-blocks"></g>
      <path class="d-maps-map-city-tiles-hot"></path>
      <g class="d-maps-map-city-tiles-top"></g>
      <g class="d-maps-map-city-tiles-labels"></g>
    </svg>
    <div class="d-maps-map-city-tiles-tip" aria-hidden="true">
      <p class="d-maps-map-city-tiles-tip-head"><b class="d-maps-map-city-tiles-tip-name"></b><span class="d-maps-map-city-tiles-tip-id"></span></p>
      <p class="d-maps-map-city-tiles-tip-area"></p>
      <dl class="d-maps-map-city-tiles-tip-rows">
        <div data-layer="0"><dt>Year built</dt><dd class="d-maps-map-city-tiles-tip-v0"></dd></div>
        <div data-layer="1"><dt>Footfall</dt><dd class="d-maps-map-city-tiles-tip-v1"></dd></div>
        <div data-layer="2"><dt>Asking price</dt><dd class="d-maps-map-city-tiles-tip-v2"></dd></div>
      </dl>
    </div>
    <div class="d-maps-map-city-tiles-chip" aria-hidden="true">
      <p class="d-maps-map-city-tiles-chip-title">Median year built</p>
      <p class="d-maps-map-city-tiles-chip-ramp"><span class="d-maps-map-city-tiles-chip-lo">1600</span><i></i><span class="d-maps-map-city-tiles-chip-hi">1930</span></p>
    </div>
    <p class="d-maps-map-city-tiles-scale" aria-hidden="true"><i></i><span>250 m</span></p>
  </div>
  <aside class="d-maps-map-city-tiles-panel" aria-label="Data layer">
    <p class="d-maps-map-city-tiles-eyebrow">Amsterdam · Centrum</p>
    <div class="d-maps-map-city-tiles-tabs" role="group" aria-label="Data layer">
      <button type="button" class="d-maps-map-city-tiles-tab" data-layer="0" aria-pressed="true">Year built</button>
      <button type="button" class="d-maps-map-city-tiles-tab" data-layer="1" aria-pressed="false">Footfall</button>
      <button type="button" class="d-maps-map-city-tiles-tab" data-layer="2" aria-pressed="false">Price</button>
    </div>
    <p class="d-maps-map-city-tiles-title">Median year built</p>
    <p class="d-maps-map-city-tiles-sub">Per block · canal ring and surroundings</p>
    <div class="d-maps-map-city-tiles-legend" aria-hidden="true"><p class="d-maps-map-city-tiles-ramp"></p><p class="d-maps-map-city-tiles-ticks"><span></span><span></span><span></span></p></div>
    <p class="d-maps-map-city-tiles-list-head"><span class="d-maps-map-city-tiles-list-label">Oldest blocks</span><span class="d-maps-map-city-tiles-list-unit">Year</span></p>
    <ol class="d-maps-map-city-tiles-list"></ol>
  </aside>
  <span class="d-maps-map-city-tiles-status" role="status" aria-live="polite"></span>
</div>`,
  css: `.d-maps-map-city-tiles{--fs:var(--fit-scale,1);--ink:#ededed;--ink-2:#a1a1a1;--ink-3:#8a8a8a;--edge:rgba(255,255,255,.09);--accent:#fa7319;position:relative;color:var(--ink);font:400 12px/16px Geist,system-ui,sans-serif;font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased;isolation:isolate}
.d-maps-map-city-tiles *{box-sizing:border-box}
.d-maps-map-city-tiles p,.d-maps-map-city-tiles dl,.d-maps-map-city-tiles dd{margin:0}
.d-maps-map-city-tiles ol{margin:0;padding:0}
.d-maps-map-city-tiles-map{position:absolute;left:0;top:0;overflow:hidden;border-radius:12px;outline:none;touch-action:pan-y}
.d-maps-map-city-tiles-map:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-maps-map-city-tiles-svg{position:absolute;inset:0;display:block}
.d-maps-map-city-tiles-ground{fill:#1b1b1b}
.d-maps-map-city-tiles-water path{fill:none;stroke:#0e0f10;stroke-linecap:butt;stroke-linejoin:round}
.d-maps-map-city-tiles-water .is-area,.d-maps-map-city-tiles-top .is-area{fill:#0e0f10;stroke:none}
.d-maps-map-city-tiles-top .is-shore{fill:none;stroke:rgba(255,255,255,.08);stroke-width:1}
.d-maps-map-city-tiles-top .is-station{fill:#2a2a2a;stroke:rgba(255,255,255,.14);stroke-width:.8}
.d-maps-map-city-tiles-block{fill:var(--c,#272727);stroke:rgba(0,0,0,.25);stroke-width:.5;transform-box:fill-box;transform-origin:center;cursor:pointer;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--d,0ms),transform var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--d,0ms),fill var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--f,0ms)}
.d-maps-map-city-tiles-svg.is-pre .d-maps-map-city-tiles-block{opacity:0;transform:scale(.86);transition:none}
.d-maps-map-city-tiles-hot{fill:none;stroke:#fff;stroke-width:1.4;stroke-linejoin:round;pointer-events:none;opacity:0;transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-city-tiles[data-tip="true"] .d-maps-map-city-tiles-hot{opacity:1}
.d-maps-map-city-tiles-top,.d-maps-map-city-tiles-labels{pointer-events:none}
.d-maps-map-city-tiles-labels text{font:italic 400 11px/1 Geist,system-ui,sans-serif;fill:#7d8288;letter-spacing:.03em;paint-order:stroke;stroke:#0e0f10;stroke-width:3px;stroke-linejoin:round}
.d-maps-map-city-tiles-labels .is-place{font:600 11px/1 Geist,system-ui,sans-serif;fill:#d6d6d6;letter-spacing:.02em;stroke:#161616;stroke-width:3.5px;text-anchor:middle}
.d-maps-map-city-tiles-labels .is-hood{font:500 11px/1 Geist,system-ui,sans-serif;fill:#9a9a9a;letter-spacing:.12em;text-transform:uppercase;stroke:#161616;stroke-width:3.5px;text-anchor:middle}
.d-maps-map-city-tiles-labels .is-start{text-anchor:start}
.d-maps-map-city-tiles[data-mode="thumb"] .d-maps-map-city-tiles-labels text{font-size:max(11px,calc(11px / var(--fs)))}
.d-maps-map-city-tiles-labels .is-dot{fill:#f2f2f2;stroke:#161616;stroke-width:1.5}
.d-maps-map-city-tiles-tip{position:absolute;left:0;top:0;z-index:3;width:196px;padding:9px 11px 10px;border-radius:12px;background:linear-gradient(#212121,#1a1a1a);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.5),0 12px 28px -10px rgba(0,0,0,.75);pointer-events:none;opacity:0;transform:translate(var(--tx,0px),var(--ty,0px)) scale(.98);transition:opacity var(--dur-micro,80ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-city-tiles[data-tip="true"] .d-maps-map-city-tiles-tip{opacity:1;transform:translate(var(--tx,0px),var(--ty,0px));transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--dur-micro,80ms),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-city-tiles-tip-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;white-space:nowrap}
.d-maps-map-city-tiles-tip-name{overflow:hidden;text-overflow:ellipsis;font-size:12px;line-height:16px;font-weight:600}
.d-maps-map-city-tiles-tip-id{font:400 11px/16px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-maps-map-city-tiles-tip-area{margin-top:1px !important;font-size:11px;line-height:15px;color:var(--ink-3)}
.d-maps-map-city-tiles-tip-rows{display:grid;gap:3px;margin-top:8px !important;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)}
.d-maps-map-city-tiles-tip-rows div{display:flex;justify-content:space-between;gap:10px;font-size:11px;line-height:15px;color:var(--ink-3)}
.d-maps-map-city-tiles-tip-rows dd{font:500 11px/15px 'Geist Mono',ui-monospace,monospace;color:var(--ink-2)}
.d-maps-map-city-tiles-tip-rows div[data-on="true"] dt{color:var(--ink)}
.d-maps-map-city-tiles-tip-rows div[data-on="true"] dd{color:#ffb27a}
.d-maps-map-city-tiles-chip{display:none}
.d-maps-map-city-tiles-scale{position:absolute;left:12px;bottom:10px;display:flex;flex-direction:column;gap:4px;font:400 11px/14px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3);pointer-events:none;text-shadow:0 0 4px #111}
.d-maps-map-city-tiles-scale i{display:block;height:5px;border:1px solid rgba(255,255,255,.4);border-top:0}
.d-maps-map-city-tiles-panel{position:absolute;top:12px;right:0;bottom:8px;width:206px;display:flex;flex-direction:column}
.d-maps-map-city-tiles-eyebrow{font-size:11px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);white-space:nowrap}
.d-maps-map-city-tiles-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:10px;padding:2px;border-radius:9px;background:#191919;box-shadow:inset 0 0 0 1px var(--edge)}
.d-maps-map-city-tiles-tab{height:24px;padding:0 4px;border:0;border-radius:7px;background:transparent;color:var(--ink-3);font:500 11px/24px Geist,system-ui,sans-serif;cursor:pointer;white-space:nowrap;transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-maps-map-city-tiles-tab:hover{color:var(--ink)}}
.d-maps-map-city-tiles-tab[aria-pressed="true"]{background:#2b2b2b;color:var(--ink);box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}
.d-maps-map-city-tiles-tab:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:1px}
.d-maps-map-city-tiles-title{margin-top:14px !important;font-size:16px;line-height:21px;font-weight:600;letter-spacing:-.01em}
.d-maps-map-city-tiles-sub{margin-top:2px !important;font-size:11px;line-height:15px;color:var(--ink-3)}
.d-maps-map-city-tiles-legend{margin-top:12px}
.d-maps-map-city-tiles-ramp{display:grid;grid-template-columns:repeat(6,1fr);gap:2px;height:8px}
.d-maps-map-city-tiles-ramp i{border-radius:2px;background:var(--c)}
.d-maps-map-city-tiles-ticks{display:flex;justify-content:space-between;margin-top:5px !important;font:400 11px/14px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-maps-map-city-tiles-list-head{display:flex;justify-content:space-between;margin-top:16px !important;padding:0 2px 6px;border-bottom:1px solid rgba(255,255,255,.07);font-size:11px;line-height:14px;color:var(--ink-3)}
.d-maps-map-city-tiles-list{list-style:none}
.d-maps-map-city-tiles-row{display:grid;grid-template-columns:14px 1fr auto;align-items:center;gap:6px;height:26px;padding:0 2px;border-bottom:1px solid rgba(255,255,255,.045);font-size:11px;line-height:15px;color:var(--ink-2);transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-city-tiles-row i{width:8px;height:8px;border-radius:2px;background:var(--c)}
.d-maps-map-city-tiles-row span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--ink)}
.d-maps-map-city-tiles-row b{font:500 11px/15px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-city-tiles-row[data-on="true"]{background:rgba(255,255,255,.05)}
.d-maps-map-city-tiles-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.d-maps-map-city-tiles[data-mode="thumb"] .d-maps-map-city-tiles-panel,.d-maps-map-city-tiles[data-mode="thumb"] .d-maps-map-city-tiles-scale{display:none}
.d-maps-map-city-tiles[data-mode="thumb"] .d-maps-map-city-tiles-chip{position:absolute;left:10px;bottom:10px;z-index:2;display:block;padding:7px 10px 8px;border-radius:10px;background:rgba(22,22,22,.9);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 8px 20px -8px rgba(0,0,0,.8);pointer-events:none}
.d-maps-map-city-tiles-chip-title{font-size:max(12px,calc(11px / var(--fs)));line-height:16px;font-weight:600;white-space:nowrap}
.d-maps-map-city-tiles-chip-ramp{display:flex;align-items:center;gap:6px;margin-top:4px !important;font:400 max(11px,calc(11px / var(--fs))) / 14px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-maps-map-city-tiles-chip-ramp i{width:64px;height:6px;border-radius:3px;background:linear-gradient(90deg,#fa7319,#9a4a1b 20%,#3d2d23 60%,#252525)}
@media (prefers-reduced-motion:reduce){.d-maps-map-city-tiles-block{transform:none !important;transition:fill var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) !important}.d-maps-map-city-tiles-tip{transform:translate(var(--tx,0px),var(--ty,0px)) !important;transition-property:opacity !important}}`,
  js: `const C='d-maps-map-city-tiles',q=n=>root.querySelector('.'+C+'-'+n),thumb=ctx.mode==='thumb',reduced=!!ctx.reducedMotion,NS='http://www.w3.org/2000/svg';
root.dataset.mode=ctx.mode;
function syncScale(){root.style.setProperty('--fit-scale',String(ctx.scale||1));}
const fitObserver=new ResizeObserver(syncScale);fitObserver.observe(stage);syncScale();
const abort=new AbortController(),on=(node,type,fn,opts)=>node.addEventListener(type,fn,Object.assign({signal:abort.signal},opts||{}));
const mapBox=q('map'),svg=q('svg'),tip=q('tip'),status=q('status'),hot=q('hot');
// One model unit is about 8 m. The canal ring is a horseshoe around the Dam that opens onto the IJ.
const VIEW=thumb?{w:300,h:216,cx:150,cy:60,s:.62}:{w:372,h:340,cx:190,cy:86,s:1};
mapBox.style.width=VIEW.w+'px';mapBox.style.height=VIEW.h+'px';svg.setAttribute('viewBox','0 0 '+VIEW.w+' '+VIEW.h);svg.setAttribute('width',VIEW.w);svg.setAttribute('height',VIEW.h);
const ground=q('ground');ground.setAttribute('width',VIEW.w);ground.setAttribute('height',VIEW.h);
// Canals are straight runs between kinks, like the 17th-century plan, so the rings are polygons, not circles.
const RAD=Math.PI/180,KINK=[-62,-34,-8,16,40,62,86,108,131,154,178,204,242];
const E=(r,deg)=>[VIEW.cx+VIEW.s*r*1.06*Math.cos(deg*RAD),VIEW.cy+VIEW.s*r*.94*Math.sin(deg*RAD)];
function P(r,deg){if(r<40||deg<=KINK[0]||deg>=KINK[KINK.length-1])return E(r,deg);let k=0;while(deg>KINK[k+1])k++;const a=E(r,KINK[k]),b=E(r,KINK[k+1]),t=(deg-KINK[k])/(KINK[k+1]-KINK[k]);return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];}
const f1=n=>n.toFixed(1),pts=a=>a.map(p=>f1(p[0])+' '+f1(p[1])).join('L');
function el(tag,attrs,parent){const node=document.createElementNS(NS,tag);for(const k in attrs)node.setAttribute(k,attrs[k]);if(parent)parent.appendChild(node);return node;}
function arc(r,a,b){const out=[],n=Math.max(2,Math.ceil(Math.abs(b-a)/3));for(let i=0;i<=n;i++)out.push(P(r,a+(b-a)*i/n));return out;}
let seed=7;const rand=()=>{seed=(seed+0x6D2B79F5)|0;let t=Math.imul(seed^(seed>>>15),1|seed);t=t+Math.imul(t^(t>>>7),61|t)^t;return((t^(t>>>14))>>>0)/4294967296;};
// Ring radii: Dam plaza, Singel, Herengracht, Keizersgracht, Prinsengracht, Singelgracht, then two 19th-century streets.
const R=[22,58,92,126,160,200,250,300,360],WATER=[3,7,7,7,7,11,3,3,3],CANAL=[0,1,1,1,1,1,0,0,0];
const AMSTEL=40,LEIDSE=118,REGULIERS=64,SHORE=-56;
// Forced cuts: [angle, width, first band, last band, water].
const CUTS=[[AMSTEL,14,0,7,1],[LEIDSE,6,2,4,1],[REGULIERS,6,2,4,1]];
const SPAN=b=>b===0?[-80,262]:[-62,242];
const shoreY=x=>VIEW.cy+VIEW.s*(SHORE+6*Math.sin((x-VIEW.cx)/(70*VIEW.s))+((x-VIEW.cx)/VIEW.s)*.05);
const blocks=[];
for(let b=0;b<R.length-1;b++){
 const inner=R[b]+WATER[b]/2+(CANAL[b]?1.4:.4),outer=R[b+1]-WATER[b+1]/2-(CANAL[b+1]?1.4:.4),mid=(inner+outer)/2,L=[19,38,42,46,40,44,48,52][b];
 const [s0,s1]=SPAN(b),cuts=[[s0,0],[s1,0]];
 for(const c of CUTS)if(b>=c[2]&&b<=c[3])cuts.push([c[0],c[1]]);
 cuts.sort((x,y)=>x[0]-y[0]);
 const bounds=[];
 for(let k=0;k<cuts.length-1;k++){const a=cuts[k][0],z=cuts[k+1][0],len=(z-a)*RAD*mid,n=Math.max(1,Math.round(len/L));bounds.push([a,cuts[k][1]||3]);for(let i=1;i<n;i++){const j=(rand()-.5)*.36;bounds.push([a+(z-a)*(i+j)/n,b>=5?3.2:2.6]);}}
 bounds.push([s1,0]);
 for(let k=0;k<bounds.length-1;k++){const [a,wa]=bounds[k],[z,wz]=bounds[k+1];
  const aIn=a+(wa/2)/inner/RAD,aOut=a+(wa/2)/outer/RAD,zIn=z-(wz/2)/inner/RAD,zOut=z-(wz/2)/outer/RAD;if(zIn-aIn<1.2)continue;
  const ring=arc(inner,aIn,zIn).concat(arc(outer,zOut,aOut));let cx=0,cy=0;for(const p of ring){cx+=p[0];cy+=p[1];}cx/=ring.length;cy/=ring.length;
  if(cx<-12||cx>VIEW.w+12||cy<-12||cy>VIEW.h+12)continue;if(ring.every(p=>p[1]<shoreY(p[0])+2))continue;
  blocks.push({b,a,z,th:(a+z)/2,r:mid,ring,cx,cy,n:rand(),n2:rand()});}
}
// Names: real canal and street names; house numbers grow from the IJ (west) towards the Amstel (east).
const CANAL_NAMES=['Singel','Herengracht','Keizersgracht','Prinsengracht'],MAXNO=[460,620,824,1150];
const STREETS={core:[[-80,'Warmoesstraat'],[-20,'Oudezijds Voorburgwal'],[40,'Kalverstraat'],[100,'Spuistraat'],[170,'Nieuwendijk']],jordaan:['Elandsgracht','Rozengracht','Bloemgracht','Westerstraat','Lindengracht','Egelantiersgracht'],west:['Kinkerstraat','Bilderdijkstraat','Jan Pieter Heijestraat','Ten Katestraat'],vondel:['Overtoom','Vondelstraat','Eerste Constantijn Huygensstraat'],pijp:['Ferdinand Bolstraat','Albert Cuypstraat','Govert Flinckstraat','Van Woustraat','Daniël Stalpertstraat'],east:['Sarphatistraat','Weesperzijde','Plantage Middenlaan','Wibautstraat']};
const even=n=>Math.max(2,Math.round(n/2)*2);
function name(bk,i){const t=bk.th,b=bk.b,lo=Math.round(bk.n*40)*2+2;
 if(b===0){let s=STREETS.core[0][1];for(const [a,n] of STREETS.core)if(t>=a)s=n;return[s+' '+lo+'–'+(lo+26+Math.round(bk.n2*12)*2),'Burgwallen'];}
 if(b<=4&&!(b===4&&t>140)){
  if(t>203)return['Brouwersgracht '+(lo*2+1)+'–'+(lo*2+41),'Haarlemmerbuurt'];
  if(t<AMSTEL){if(t<-24)return['Plantage Kerklaan '+lo+'–'+(lo+24),'Plantage'];const nm=b===1?'Zwanenburgwal':'Nieuwe '+CANAL_NAMES[b-1];const n0=even((AMSTEL-bk.z)/(AMSTEL+24)*140);return[nm+' '+n0+'–'+(n0+even((bk.z-bk.a)/(AMSTEL+24)*140)),'Weesperbuurt'];}
  const nm=CANAL_NAMES[b-1],m=MAXNO[b-1],n0=even((203-bk.z)/(203-AMSTEL)*m),n1=even((203-bk.a)/(203-AMSTEL)*m);return[nm+' '+n0+'–'+Math.max(n0+8,n1),t>120?'Grachtengordel-West':'Grachtengordel-Zuid'];}
 if(b===4)return[STREETS.jordaan[i%6]+' '+lo+'–'+(lo+30),'Jordaan'];
 const list=t>150?STREETS.west:t>100?STREETS.vondel:t>AMSTEL?STREETS.pijp:STREETS.east,hood=t>150?'Oud-West':t>100?'Vondelbuurt':t>AMSTEL?'De Pijp':'Weesperzijde';
 return[list[i%list.length]+' '+lo+'–'+(lo+36),hood];}
// Deterministic data layers, shaped by real landmarks: Dam, Nine Streets, Leidseplein, Rembrandtplein, Albert Cuyp market, Golden Bend.
const g=(x,m,s)=>Math.exp(-((x-m)/s)*((x-m)/s));
function year(bk){const {b,th:t,n,n2}=bk;if(b===0)return 1590+n*110;if(b<=3){if(t>203)return 1620+n*80;if(t>120)return 1614+n*66+(b-1)*9;if(t>AMSTEL)return 1642+n*80+(b-1)*6;return 1664+n*96;}
 if(b===4)return t>140?1650+n*210:1662+n*150;if(n2<.14)return 1956+n*38;return 1868+n*46+(b-5)*6;}
function foot(bk){const {b,th:t,r,n}=bk;return 210+n*280+2900*g(r,22,48)+1500*g(t,160,14)*(b>=1&&b<=3?1:0)+2300*g(t,112,8)*g(r,205,30)+1900*g(t,54,10)*g(r,78,24)+1500*g(t,74,8)*g(r,272,26)+800*g(t,AMSTEL+4,8)*(b===0?1:0);}
function price(bk){const {b,th:t,n}=bk;if(b===0)return 9300+n*1900;if(b<=3)return 10700+n*1900+3300*g(t,92,11)*(b<=2?1:0)-(t<AMSTEL?900:0);if(b===4)return t>140?9500+n*1900:10200+n*1700;return(t>AMSTEL&&t<100?8500:7700)+n*1900;}
const LAYERS=[
 {title:'Median year built',tab:'Year built',sub:'Per block · canal ring and surroundings',list:'Oldest blocks',unit:'Year',get:year,t:v=>(1930-v)/330,lo:1600,hi:1930,fmt:v=>String(Math.round(v)),ticks:['1600','1765','1930'],desc:true},
 {title:'Saturday footfall',tab:'Footfall',sub:'Pedestrians per hour · 15:00–16:00',list:'Busiest blocks',unit:'Per hour',get:foot,t:v=>Math.sqrt(Math.max(0,(v-200)/3000)),fmt:v=>(Math.round(v/10)*10).toLocaleString('en-US'),ticks:['200','1,000','3,200']},
 {title:'Asking price',tab:'Price',sub:'Median euro per m² · listed homes',list:'Highest asking',unit:'€ / m²',get:price,t:v=>(v-7600)/8200,fmt:v=>'€'+(Math.round(v/100)*100).toLocaleString('en-US'),ticks:['€7,600','€11,700','€15,800']}];
// Quantile classes weighted towards the head, so the accent marks the top few blocks and the rest stays grey.
const RAMP=['#252525','#2e2a27','#3d2d23','#5b341f','#9a4a1b','#fa7319'],QUANT=[.26,.46,.64,.8,.92];let breaks=[0,0,0,0,0];
const cls=t=>{let k=0;while(k<5&&t>=breaks[k])k++;return RAMP[k];};
// Draw water: ring canals, radial canals, the Amstel and the IJ.
const water=q('water'),top=q('top'),labels=q('labels'),blockLayer=q('blocks');
for(let i=1;i<=5;i++)el('path',{d:'M'+pts(arc(R[i],i===5?-62:-26,i===5?242:206)),'stroke-width':f1(WATER[i]*VIEW.s)},water);
el('path',{d:'M'+pts([P(R[2],LEIDSE),P(R[5],LEIDSE)]),'stroke-width':f1(6*VIEW.s)},water);el('path',{d:'M'+pts([P(R[2],REGULIERS),P(R[5],REGULIERS)]),'stroke-width':f1(6*VIEW.s)},water);
el('path',{d:'M'+pts([P(30,AMSTEL),P(520,AMSTEL)]),'stroke-width':f1(14*VIEW.s)},water);el('path',{d:'M'+pts([P(26,AMSTEL),P(40,AMSTEL)]),'stroke-width':f1(8*VIEW.s)},water);
let shore='M-4 -4H'+(VIEW.w+4)+'V';const sp=[];for(let x=VIEW.w+4;x>=-4;x-=6)sp.push([x,shoreY(x)]);shore+=f1(sp[0][1])+'L'+pts(sp)+'Z';el('path',{d:shore,class:'is-area'},top);el('path',{d:'M'+pts(sp),class:'is-shore'},top);
const st=[VIEW.cx-34*VIEW.s,VIEW.cy+VIEW.s*(SHORE-17)];el('rect',{x:f1(st[0]),y:f1(st[1]),width:f1(68*VIEW.s),height:f1(9*VIEW.s),rx:1.5,class:'is-station'},top);
// Blocks.
blocks.forEach((bk,i)=>{const [nm,hood]=name(bk,i);bk.i=i;bk.name=nm;bk.hood=hood;bk.id='B-'+String(100+i);bk.values=LAYERS.map(l=>l.get(bk));
 bk.node=el('path',{class:C+'-block',d:'M'+pts(bk.ring)+'Z','data-i':i},blockLayer);
 bk.node.style.setProperty('--d',Math.round(Math.max(0,bk.r-22)/340*640+((bk.th+80)/342)*110)+'ms');bk.node.style.setProperty('--f',Math.round(bk.r/360*280)+'ms');});
// Labels: canal names follow the water; places and neighbourhoods sit on top with a halo.
const defs=el('defs',{},svg);let uid=0;const pid=C+'-p'+Math.random().toString(36).slice(2,7);
function along(text,r,a,z){const id=pid+'-'+(uid++);el('path',{id,d:'M'+pts(arc(r,a,z)),fill:'none'},defs);const t=el('text',{dy:'3.6'},labels);const tp=el('textPath',{href:'#'+id,startOffset:'50%','text-anchor':'middle'},t);tp.textContent=text;}
function label(text,x,y,cls){const t=el('text',{x:f1(x),y:f1(y),class:cls},labels);t.textContent=text;return t;}
if(thumb){along('Prinsengracht',R[4],124,60);label('IJ',VIEW.w-30,shoreY(VIEW.w-30)-6,'');const d=P(0,0);el('circle',{cx:f1(d[0]),cy:f1(d[1]),r:2.6,class:'is-dot'},labels);label('Dam',d[0],d[1]+15,'is-place');}
else{along('Singel',R[1],176,122);along('Herengracht',R[2],100,58);along('Keizersgracht',R[3],130,92);along('Prinsengracht',R[4],84,48);
 const am=el('text',{dy:'3.6'},labels),amId=pid+'-am';el('path',{id:amId,d:'M'+pts([P(214,AMSTEL),P(330,AMSTEL)]),fill:'none'},defs);const tp=el('textPath',{href:'#'+amId,startOffset:'50%','text-anchor':'middle'},am);tp.textContent='Amstel';
 label('IJ',VIEW.w-46,shoreY(VIEW.w-46)-8,'');label('Centraal',st[0]+34*VIEW.s,st[1]-3,'is-place');
 const d=P(0,0);el('circle',{cx:f1(d[0]),cy:f1(d[1]),r:2.8,class:'is-dot'},labels);label('Dam',d[0],d[1]+15,'is-place');
 const lp=P(205,112);el('circle',{cx:f1(lp[0]),cy:f1(lp[1]),r:2.6,class:'is-dot'},labels);label('Leidseplein',lp[0]+2,lp[1]+16,'is-place');
 label('Jordaan',10,P(182,166)[1]+4,'is-hood is-start');const pj=P(276,70);label('De Pijp',pj[0],pj[1],'is-hood');
 const kmPx=250/8*VIEW.s;q('scale').querySelector('i').style.width=f1(kmPx)+'px';}
// Layer rendering, legend, ranked list.
function visible(bk){return bk.cx>6&&bk.cx<VIEW.w-6&&bk.cy>shoreY(bk.cx)+6&&bk.cy<VIEW.h-6;}
const tabs=[...root.querySelectorAll('.'+C+'-tab')],list=q('list');let layer=0,selected=null,pinned=false;
function paint(stagger){const L=LAYERS[layer];for(const bk of blocks)bk.t=L.t(bk.values[layer]);const ts=blocks.filter(visible).map(bk=>bk.t).sort((x,y)=>x-y);breaks=QUANT.map(p=>ts[Math.min(ts.length-1,Math.floor(p*ts.length))]);
 const vs=blocks.filter(visible).map(bk=>bk.values[layer]).sort((x,y)=>x-y),mid=vs[Math.floor((L.desc?.24:.76)*vs.length)];L.ticks=[L.fmt(vs[0]),L.fmt(mid),L.fmt(vs[vs.length-1])];
 for(const bk of blocks){bk.node.style.setProperty('--c',cls(bk.t));if(!stagger)bk.node.style.setProperty('--f','0ms');else bk.node.style.setProperty('--f',Math.round(bk.r/360*280)+'ms');}
 tabs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===layer)));q('title').textContent=L.title;q('sub').textContent=L.sub;q('list-label').textContent=L.list;q('list-unit').textContent=L.unit;
 const ramp=q('ramp');ramp.replaceChildren();const order=L.desc?RAMP.slice().reverse():RAMP;for(const c of order){const i=document.createElement('i');i.style.setProperty('--c',c);ramp.appendChild(i);}
 q('ticks').querySelectorAll('span').forEach((s,i)=>{s.textContent=L.ticks[i];});
 q('chip-title').textContent=L.title;q('chip-lo').textContent=L.ticks[0];q('chip-hi').textContent=L.ticks[2];q('chip-ramp').querySelector('i').style.background='linear-gradient(90deg,'+(L.desc?'#fa7319,#9a4a1b 20%,#3d2d23 60%,#252525':'#252525,#3d2d23 40%,#9a4a1b 80%,#fa7319')+')';
 const ranked=blocks.filter(bk=>bk.cy>shoreY(bk.cx)+6&&bk.cx>0&&bk.cx<VIEW.w&&bk.cy<VIEW.h).sort((x,y)=>y.t-x.t).slice(0,5);list.replaceChildren();
 for(const bk of ranked){const li=document.createElement('li');li.className=C+'-row';li.dataset.i=bk.i;li.dataset.on=String(selected===bk);li.innerHTML='<i></i><span></span><b></b>';li.querySelector('i').style.setProperty('--c',cls(bk.t));li.querySelector('span').textContent=bk.name;li.querySelector('b').textContent=L.fmt(bk.values[layer]);list.appendChild(li);}
 if(selected)fillTip(selected);}
function setLayer(n,source){layer=(n+LAYERS.length)%LAYERS.length;paint(!reduced);if(source)status.textContent='Layer: '+LAYERS[layer].title;}
function fillTip(bk){q('tip-name').textContent=bk.name;q('tip-id').textContent=bk.id;q('tip-area').textContent=bk.hood;LAYERS.forEach((L,i)=>{q('tip-v'+i).textContent=L.fmt(bk.values[i])+(i===1?' /h':i===2?' /m²':'');});tip.querySelectorAll('.'+C+'-tip-rows div').forEach(d=>{d.dataset.on=String(+d.dataset.layer===layer);});}
function placeTip(bk){const w=196,h=tip.offsetHeight||104;let x=bk.cx+16,y=bk.cy-h-10;if(x+w>VIEW.w-6)x=bk.cx-w-16;if(x<6)x=6;if(y<6)y=bk.cy+14;if(y+h>VIEW.h-6)y=VIEW.h-h-6;tip.style.setProperty('--tx',f1(x)+'px');tip.style.setProperty('--ty',f1(y)+'px');}
function select(bk,source){selected=bk||null;list.querySelectorAll('li').forEach(li=>{li.dataset.on=String(!!bk&&+li.dataset.i===bk.i);});
 if(!bk){root.dataset.tip='false';return;}hot.setAttribute('d','M'+pts(bk.ring)+'Z');fillTip(bk);placeTip(bk);root.dataset.tip='true';
 if(source==='keyboard'){const L=LAYERS[layer];status.textContent=bk.name+', '+bk.hood+', '+L.tab.toLowerCase()+' '+L.fmt(bk.values[layer]);}}
on(blockLayer,'pointerover',e=>{if(thumb||pinned||e.pointerType==='touch')return;const i=e.target.dataset&&e.target.dataset.i;if(i!=null)select(blocks[+i],'pointer');},{passive:true});
on(mapBox,'pointerleave',()=>{if(!pinned)select(null);},{passive:true});
on(blockLayer,'pointerdown',e=>{if(thumb)return;const i=e.target.dataset&&e.target.dataset.i;if(i!=null){pinned=true;select(blocks[+i],'pointer');}},{passive:true});
on(mapBox,'pointerdown',e=>{if(!e.target.dataset||e.target.dataset.i==null){pinned=false;select(null);}},{passive:true});
tabs.forEach((b,i)=>on(b,'click',()=>setLayer(i,'tab')));
function neighbour(dir){const from=selected||blocks.reduce((m,bk)=>visible(bk)&&bk.r<m.r?bk:m,blocks[0]);let best=null,bd=1e9;for(const bk of blocks){if(bk===from||!visible(bk))continue;const dx=bk.cx-from.cx,dy=bk.cy-from.cy,along=dir==='ArrowRight'?dx:dir==='ArrowLeft'?-dx:dir==='ArrowDown'?dy:-dy,across=dir==='ArrowRight'||dir==='ArrowLeft'?Math.abs(dy):Math.abs(dx);if(along<=1)continue;const sc=along+across*2.2;if(sc<bd){bd=sc;best=bk;}}return best||from;}
on(mapBox,'keydown',e=>{if(e.key.startsWith('Arrow')){e.preventDefault();pinned=true;select(neighbour(e.key),'keyboard');}else if(e.key==='Enter'){e.preventDefault();setLayer(layer+1,'keyboard');}else if(e.key==='Escape'){pinned=false;select(null);}});
on(mapBox,'blur',()=>{if(pinned){pinned=false;select(null);}});
function reveal(){if(reduced)return;svg.classList.add('is-pre');svg.getBoundingClientRect();requestAnimationFrame(()=>requestAnimationFrame(()=>svg.classList.remove('is-pre')));}
ctx.onAction('replay',()=>{pinned=false;select(null);reveal();});
ctx.onAction('seed',()=>setLayer(layer+1,'action'));
ctx.onAction('reset',()=>{pinned=false;select(null);layer=0;paint(false);svg.classList.remove('is-pre');});
paint(false);reveal();
root.__mapCityTilesInspect=()=>({blocks:blocks.length,layer,selected:selected&&selected.name});
return()=>{abort.abort();fitObserver.disconnect();};`,
  prompt: `Build a city-block choropleth for a dark product UI as inline SVG. Model Amsterdam's canal ring as a horseshoe of slightly elliptical rings around the Dam that opens onto the IJ: Singel, Herengracht, Keizersgracht, Prinsengracht and the wider Singelgracht as water strokes, plus the Leidsegracht and Reguliersgracht as radial canals and the Amstel as a wide river at 40°. Cut each band between canals into blocks with seeded radial streets (about 30 units apart, jittered ±18%), inset from the quays, and drop blocks that fall under the IJ. Name blocks with real canal names and house-number ranges that grow from west to east, Jordaan and De Pijp street names beyond the ring. Three deterministic data layers are shaped by real landmarks (Dam, Nine Streets, Leidseplein, Rembrandtplein, Albert Cuyp market, Golden Bend): median year built, Saturday footfall per hour and asking price per m². Shade with a six-step ramp from neutral #272727 to the accent #fa7319. On load blocks rise from the Dam outward (opacity and a .86 scale, 400ms ease-out, delays by radius); switching layers recolours with a 280ms radial wave. A side panel has a three-way layer switch, title, legend ramp with ticks and the top five blocks; hovering a block outlines it and shows a card with address, neighbourhood and all three figures in Geist Mono tabular numbers. Canal names follow the water on textPaths; place names have a halo; add a 250 m scale bar. Arrow keys move between blocks, Enter switches layer, Escape clears. Dock actions Replay, Next layer and Reset. The tile is a tighter crop of the horseshoe with a layer chip. Reduced motion skips the rise and recolours with a short fade. Clean up listeners on unmount.`
});
