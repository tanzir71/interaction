/* Fuji-san elevation grid: an original INTRX map component drawn from a deterministic terrain model. */
INTRX.register({
  id: "map-topo-extrude",
  title: "Topo Extrude",
  cat: "Maps & Geo",
  rootClass: "d-maps-map-topo-extrude",
  tags: ["terrain","elevation","3d"],
  libs: [],
  desc: "Mount Fuji and the Fuji Five Lakes as a shaded elevation model: the contour map extrudes into 2.4x relief, the summit is called out at 3,776 m, and a probe reads elevation, slope and distance to the summit while the panel draws the west–east profile under it.",
  seen: "Seen on: Mapbox terrain, hiking apps and GIS elevation profiles",
  hint: "Hover · The contour map rises into relief; hover to read elevation",
  html: `<div class="d-maps-map-topo-extrude" role="region" aria-label="Fuji-san terrain model">
  <div class="d-maps-map-topo-extrude-view" tabindex="0" role="application" aria-roledescription="terrain map" aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Enter Escape" aria-label="Three-dimensional elevation model of Mount Fuji and the Fuji Five Lakes. Arrow keys move the elevation probe, Enter flattens or raises the terrain, Escape clears the probe.">
    <canvas class="d-maps-map-topo-extrude-mesh" aria-hidden="true"></canvas>
    <canvas class="d-maps-map-topo-extrude-over" aria-hidden="true"></canvas>
    <div class="d-maps-map-topo-extrude-tip" aria-hidden="true">
      <p class="d-maps-map-topo-extrude-tip-elev"></p>
      <p class="d-maps-map-topo-extrude-tip-coord"></p>
      <p class="d-maps-map-topo-extrude-tip-row"><span>Slope</span><b class="d-maps-map-topo-extrude-tip-slope"></b></p>
      <p class="d-maps-map-topo-extrude-tip-row"><span>To summit</span><b class="d-maps-map-topo-extrude-tip-dist"></b></p>
    </div>
    <div class="d-maps-map-topo-extrude-chip" aria-hidden="true">
      <p class="d-maps-map-topo-extrude-chip-name">Fuji-san</p>
      <p class="d-maps-map-topo-extrude-chip-meta"><b>3,776 m</b> · Honshu</p>
    </div>
  </div>
  <aside class="d-maps-map-topo-extrude-panel" aria-label="Terrain details">
    <p class="d-maps-map-topo-extrude-eyebrow">Fuji-san · Honshu</p>
    <p class="d-maps-map-topo-extrude-title">3,776 m</p>
    <p class="d-maps-map-topo-extrude-sub">Kengamine, the highest point in Japan</p>
    <div class="d-maps-map-topo-extrude-profile">
      <p class="d-maps-map-topo-extrude-profile-head"><span class="d-maps-map-topo-extrude-profile-label">Profile W–E · 35.361° N</span><b class="d-maps-map-topo-extrude-profile-value">3,776 m</b></p>
      <svg class="d-maps-map-topo-extrude-chart" viewBox="0 0 196 72" aria-hidden="true">
        <path class="d-maps-map-topo-extrude-chart-grid" d="M0 52.5H196M0 34.5H196M0 16.5H196"></path>
        <path class="d-maps-map-topo-extrude-chart-area"></path>
        <path class="d-maps-map-topo-extrude-chart-line"></path>
        <line class="d-maps-map-topo-extrude-chart-cursor" y1="0" y2="70"></line>
        <circle class="d-maps-map-topo-extrude-chart-dot" r="3"></circle>
      </svg>
      <p class="d-maps-map-topo-extrude-axis"><span>10 km W</span><span>Summit</span><span>10 km E</span></p>
    </div>
    <dl class="d-maps-map-topo-extrude-stats">
      <div><dt>Erupted</dt><dd>1707</dd></div>
      <div><dt>Relief</dt><dd class="d-maps-map-topo-extrude-relief">×2.4</dd></div>
      <div><dt>Grid</dt><dd>500 m</dd></div>
    </dl>
    <div class="d-maps-map-topo-extrude-legend" aria-hidden="true"><i></i><p><span>0</span><span>2,000</span><span>3,776 m</span></p></div>
  </aside>
  <span class="d-maps-map-topo-extrude-status" role="status" aria-live="polite"></span>
</div>`,
  css: `.d-maps-map-topo-extrude{--fs:var(--fit-scale,1);--ink:#ededed;--ink-2:#a1a1a1;--ink-3:#8a8a8a;--edge:rgba(255,255,255,.09);--accent:#fa7319;position:relative;color:var(--ink);font:400 12px/16px Geist,system-ui,sans-serif;font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased;isolation:isolate}
.d-maps-map-topo-extrude *{box-sizing:border-box}
.d-maps-map-topo-extrude p,.d-maps-map-topo-extrude dl,.d-maps-map-topo-extrude dd{margin:0}
.d-maps-map-topo-extrude-view{position:absolute;left:0;top:0;outline:none;touch-action:pan-y;cursor:crosshair}
.d-maps-map-topo-extrude-view:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px;border-radius:12px}
.d-maps-map-topo-extrude-mesh,.d-maps-map-topo-extrude-over{position:absolute;left:0;top:0;display:block}
.d-maps-map-topo-extrude-over{pointer-events:none}
.d-maps-map-topo-extrude-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.d-maps-map-topo-extrude-tip{position:absolute;left:0;top:0;z-index:3;min-width:150px;padding:8px 10px 9px;border-radius:10px;background:linear-gradient(#212121,#1a1a1a);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.5),0 12px 28px -10px rgba(0,0,0,.75);pointer-events:none;opacity:0;transform:translate(var(--tx,0px),var(--ty,0px)) scale(.98);transition:opacity var(--dur-micro,80ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-topo-extrude[data-tip="true"] .d-maps-map-topo-extrude-tip{opacity:1;transform:translate(var(--tx,0px),var(--ty,0px));transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--dur-micro,80ms),transform var(--dur-micro,80ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-maps-map-topo-extrude-tip-elev{font:600 15px/20px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-topo-extrude-tip-coord{margin-top:1px !important;font:400 11px/15px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-maps-map-topo-extrude-tip-row{display:flex;justify-content:space-between;gap:12px;margin-top:4px !important;font-size:11px;line-height:15px;color:var(--ink-3)}
.d-maps-map-topo-extrude-tip-row+.d-maps-map-topo-extrude-tip-row{margin-top:2px !important}
.d-maps-map-topo-extrude-tip-row:first-of-type{margin-top:7px !important;padding-top:7px;border-top:1px solid rgba(255,255,255,.07)}
.d-maps-map-topo-extrude-tip-row b{font:500 11px/15px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-topo-extrude-chip{display:none}
.d-maps-map-topo-extrude-panel{position:absolute;top:12px;right:0;bottom:8px;width:196px;display:flex;flex-direction:column}
.d-maps-map-topo-extrude-eyebrow{font-size:11px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);white-space:nowrap}
.d-maps-map-topo-extrude-title{margin-top:6px !important;font:600 24px/28px 'Geist Mono',ui-monospace,monospace;letter-spacing:-.02em}
.d-maps-map-topo-extrude-sub{margin-top:2px !important;font-size:11px;line-height:15px;color:var(--ink-3)}
.d-maps-map-topo-extrude-profile{margin-top:16px}
.d-maps-map-topo-extrude-profile-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:11px;line-height:15px;color:var(--ink-3);white-space:nowrap}
.d-maps-map-topo-extrude-profile-value{font:500 11px/15px 'Geist Mono',ui-monospace,monospace;color:#ffb27a}
.d-maps-map-topo-extrude-chart{display:block;width:196px;height:72px;margin-top:6px;overflow:visible}
.d-maps-map-topo-extrude-chart-grid{fill:none;stroke:rgba(255,255,255,.06);stroke-width:1}
.d-maps-map-topo-extrude-chart-area{fill:rgba(250,115,25,.12)}
.d-maps-map-topo-extrude-chart-line{fill:none;stroke:#fa7319;stroke-width:1.4;stroke-linejoin:round}
.d-maps-map-topo-extrude-chart-cursor{stroke:rgba(255,255,255,.35);stroke-width:1;stroke-dasharray:2 2}
.d-maps-map-topo-extrude-chart-dot{fill:#fff;stroke:#151515;stroke-width:1.5}
.d-maps-map-topo-extrude-axis{display:flex;justify-content:space-between;margin-top:4px !important;font:400 11px/14px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-maps-map-topo-extrude-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:14px !important;border-radius:10px;overflow:hidden;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px var(--edge)}
.d-maps-map-topo-extrude-stats div{padding:7px 9px;background:#171717}
.d-maps-map-topo-extrude-stats dt{font-size:11px;line-height:14px;color:var(--ink-3);white-space:nowrap}
.d-maps-map-topo-extrude-stats dd{margin-top:2px;font:500 12px/16px 'Geist Mono',ui-monospace,monospace;color:var(--ink)}
.d-maps-map-topo-extrude-legend{margin-top:auto;padding-top:10px}
.d-maps-map-topo-extrude-legend i{display:block;height:6px;border-radius:3px;background:linear-gradient(90deg,#1d1d1d,#3a3a3a 45%,#6b4a33 72%,#fa7319)}
.d-maps-map-topo-extrude-legend p{display:flex;justify-content:space-between;margin-top:4px !important;font:400 11px/14px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-maps-map-topo-extrude[data-mode="thumb"] .d-maps-map-topo-extrude-panel{display:none}
.d-maps-map-topo-extrude[data-mode="thumb"] .d-maps-map-topo-extrude-chip{position:absolute;right:10px;top:10px;z-index:2;display:block;padding:7px 10px 8px;border-radius:10px;background:rgba(22,22,22,.88);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 8px 20px -8px rgba(0,0,0,.8);pointer-events:none}
.d-maps-map-topo-extrude-chip-name{font-size:max(12px,calc(11px / var(--fs)));line-height:16px;font-weight:600;white-space:nowrap}
.d-maps-map-topo-extrude-chip-meta{margin-top:2px !important;font:400 max(11px,calc(11px / var(--fs))) / 15px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3);white-space:nowrap}
.d-maps-map-topo-extrude-chip-meta b{font-weight:500;color:#ffb27a}
@media (prefers-reduced-motion:reduce){.d-maps-map-topo-extrude-tip{transform:translate(var(--tx,0px),var(--ty,0px)) !important;transition-property:opacity !important}}`,
  js: `const C='d-maps-map-topo-extrude',q=n=>root.querySelector('.'+C+'-'+n),thumb=ctx.mode==='thumb',reduced=!!ctx.reducedMotion;
root.dataset.mode=ctx.mode;
function syncScale(){root.style.setProperty('--fit-scale',String(ctx.scale||1));}
const fitObserver=new ResizeObserver(syncScale);fitObserver.observe(stage);syncScale();
const abort=new AbortController(),on=(node,type,fn,opts)=>node.addEventListener(type,fn,Object.assign({signal:abort.signal},opts||{}));
const view=q('view'),mesh=q('mesh'),over=q('over'),tip=q('tip'),status=q('status');
// Window in km east/north of the summit, an oblique view from the south and 2.4x vertical relief.
const V=thumb?{w:300,h:216,e0:-7.5,e1:10.5,n0:-6,n1:9,pitch:26,pad:10}:{w:396,h:340,e0:-10,e1:10,n0:-9,n1:18,pitch:34,pad:14};
const RAD=Math.PI/180,CX=.25,CN=.5,COLS=Math.round((V.e1-V.e0)/CX),ROWS=Math.round((V.n1-V.n0)/CN),VEX=2.4;
const K=(V.w-2*V.pad)/(V.e1-V.e0),SIN=Math.sin(V.pitch*RAD),COS=Math.cos(V.pitch*RAD),OX=V.pad,OY=V.h-(thumb?8:12);
view.style.width=V.w+'px';view.style.height=V.h+'px';
const dpr=Math.min(3,devicePixelRatio||1);
for(const cv of [mesh,over]){cv.width=Math.round(V.w*dpr);cv.height=Math.round(V.h*dpr);cv.style.width=V.w+'px';cv.style.height=V.h+'px';}
const g=mesh.getContext('2d'),o=over.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);o.setTransform(dpr,0,0,dpr,0,0);
// Deterministic value noise for the foothills.
let seed=3776;const rand=()=>{seed=(seed+0x6D2B79F5)|0;let t=Math.imul(seed^(seed>>>15),1|seed);t=t+Math.imul(t^(t>>>7),61|t)^t;return((t^(t>>>14))>>>0)/4294967296;};
const LAT=[];for(let i=0;i<64*64;i++)LAT.push(rand()*2-1);
function vnoise(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,h=(a,b)=>LAT[((a&63)*64+(b&63))],s=t=>t*t*(3-2*t),u=s(xf),v=s(yf);return(h(xi,yi)*(1-u)+h(xi+1,yi)*u)*(1-v)+(h(xi,yi+1)*(1-u)+h(xi+1,yi+1)*u)*v;}
const gs=(x,y,s)=>Math.exp(-(x*x+y*y)/(s*s));
// Fuji Five Lakes (km from the summit) at their real surface levels.
const LAKES=[['Kawaguchiko',2.1,17.4,3.3,.75,-12,830],['Saiko',-3.9,15.2,1.9,.55,-16,900],['Shojiko',-11.5,13.9,.9,.4,-20,900],['Motosuko',-13.2,11.7,1.3,1.05,0,900],['Yamanakako',13.4,6.2,2.5,1.05,32,980]];
function lakeAt(e,n){for(const L of LAKES){const c=Math.cos(L[5]*RAD),s=Math.sin(L[5]*RAD),dx=e-L[1],dy=n-L[2],u=(dx*c+dy*s)/L[3],v=(-dx*s+dy*c)/L[4],d=Math.sqrt(u*u+v*v);if(d<2.4)return{L,d};}return null;}
function baseAt(e,n){let b=600+24*n-9*Math.max(0,e)*Math.max(0,Math.min(1,(2-n)/6))+380*gs(e-11,n-4,4.5)+700*Math.exp(-((n-21.5)/3)*((n-21.5)/3))+70*vnoise(e/2.6+40,n/2.6+40);
 const lk=lakeAt(e,n);if(lk&&lk.d>=1){const t=Math.min(1,(lk.d-1)/1.4),sm=t*t*(3-2*t);b=lk.L[6]+(b-lk.L[6])*sm;}return Math.max(30,b);}
function heightAt(e,n){const lk=lakeAt(e,n);if(lk&&lk.d<1)return lk.L[6];const b=baseAt(e,n),d=Math.hypot(e,n),th=Math.atan2(n,e);
 let h=b+(3776-b)*Math.exp(-Math.pow(d/4.8,1.05));
 h-=(h-b)*.04*(1+Math.sin(th*29+2.4*vnoise(e*.7,n*.7)))*Math.max(0,Math.min(1,(d-1.2)/4));
 h-=250*gs(e-.3,n-.32,.36);h-=420*gs(e-2.6,n+2.2,.75);h+=170*gs(e-3.3,n+2.75,.42);return h;}
const H=new Float32Array((COLS+1)*(ROWS+1)),WET=new Uint8Array(COLS*(ROWS+1)),idx=(c,r)=>r*(COLS+1)+c;
for(let r=0;r<=ROWS;r++)for(let c=0;c<=COLS;c++)H[idx(c,r)]=heightAt(V.e0+c*CX,V.n0+r*CN);
// Stretch the cone so the highest vertex reads 3,776 m exactly; lakes keep their levels.
let hmax=0;for(const h of H)hmax=Math.max(hmax,h);for(let i=0;i<H.length;i++)if(H[i]>1500)H[i]=1500+(H[i]-1500)*(3776-1500)/(hmax-1500);
for(let r=0;r<=ROWS;r++)for(let c=0;c<COLS;c++){const lk=lakeAt(V.e0+(c+.5)*CX,V.n0+r*CN);WET[r*COLS+c]=lk&&lk.d<1?1:0;}
function hAt(e,n){const x=(e-V.e0)/CX,y=(n-V.n0)/CN,c=Math.max(0,Math.min(COLS-1,Math.floor(x))),r=Math.max(0,Math.min(ROWS-1,Math.floor(y))),u=x-c,v=y-r;return(H[idx(c,r)]*(1-u)+H[idx(c+1,r)]*u)*(1-v)+(H[idx(c,r+1)]*(1-u)+H[idx(c+1,r+1)]*u)*v;}
const X=e=>OX+(e-V.e0)*K,Y=(n,h,vx)=>OY-(n-V.n0)*K*SIN-h/1000*vx*K*COS,CW_=CX*K;
// Ridge rows: one line per 500 m of latitude, drawn back to front; each row fills below itself so nearer rows hide farther ones.
// Line colour follows elevation: neutral greys below 1,600 m, then a ramp of light into the accent towards the summit.
const TONES=['rgba(255,255,255,.15)','rgba(255,255,255,.18)','rgba(255,255,255,.22)','rgba(255,255,255,.26)','rgba(214,172,144,.42)','rgba(232,150,96,.56)','rgba(242,134,60,.72)','rgba(248,122,38,.88)','#fa7319','#ffa060'],WATER='rgba(150,162,176,.6)',BODY='#151515';
let vex=0,from=0,to=VEX,t0=0,dur=0,del=0,raf=0,dead=false,probe=null,pinned=false;const YS=new Float32Array(H.length);
function rowY(r){const n=V.n0+r*CN;for(let c=0;c<=COLS;c++)YS[idx(c,r)]=Y(n,H[idx(c,r)],vex);}
function draw(){for(let r=0;r<=ROWS;r++)rowY(r);g.clearRect(0,0,V.w,V.h);
 for(let r=ROWS;r>=0;r--){g.beginPath();g.moveTo(OX,YS[idx(0,r)]);for(let c=1;c<=COLS;c++)g.lineTo(OX+c*CW_,YS[idx(c,r)]);g.lineTo(OX+COLS*CW_,OY);g.lineTo(OX,OY);g.closePath();g.fillStyle=BODY;g.fill();
  const paths=new Map();let last=-1,p=null;
  for(let c=0;c<COLS;c++){const k=WET[r*COLS+c]?10:Math.min(9,Math.floor((H[idx(c,r)]+H[idx(c+1,r)])/800));if(k!==last){p=paths.get(k);if(!p){p=new Path2D();paths.set(k,p);}p.moveTo(OX+c*CW_,YS[idx(c,r)]);last=k;}p.lineTo(OX+(c+1)*CW_,YS[idx(c+1,r)]);}
  const major=r%4===0;for(const [k,path] of paths){g.strokeStyle=k===10?WATER:TONES[k];g.lineWidth=k===10?1.6:major?1.15:.8;g.stroke(path);}}
 const grd=g.createLinearGradient(0,OY-40,0,OY);grd.addColorStop(0,'rgba(255,255,255,.035)');grd.addColorStop(1,'rgba(255,255,255,0)');g.beginPath();g.moveTo(OX,YS[idx(0,0)]);for(let c=1;c<=COLS;c++)g.lineTo(OX+c*CW_,YS[idx(c,0)]);g.lineTo(OX+COLS*CW_,OY);g.lineTo(OX,OY);g.closePath();g.fillStyle=grd;g.fill();
 g.beginPath();g.moveTo(OX,OY+.5);g.lineTo(OX+COLS*CW_,OY+.5);g.strokeStyle='rgba(255,255,255,.12)';g.lineWidth=1;g.stroke();
 g.beginPath();g.moveTo(OX+.5,OY);g.lineTo(OX+.5,YS[idx(0,0)]);g.moveTo(OX+COLS*CW_-.5,OY);g.lineTo(OX+COLS*CW_-.5,YS[idx(COLS,0)]);g.strokeStyle='rgba(255,255,255,.08)';g.stroke();
 drawOver();}
const FS=Math.max(11,11/(ctx.scale||1)),MONO="'Geist Mono',ui-monospace,monospace",SANS='Geist,system-ui,sans-serif';
function halo(text,x,y,font,fill,align){o.font=font;o.textAlign=align||'left';o.lineJoin='round';o.lineWidth=3.5;o.strokeStyle='rgba(16,16,16,.92)';o.strokeText(text,x,y);o.fillStyle=fill;o.fillText(text,x,y);}
const P=(e,n)=>[X(e),Y(n,hAt(e,n),vex)];
const TRAIL=[[.42,-2.72],[.12,-2.35],[.5,-2.0],[.08,-1.62],[.42,-1.28],[.05,-.95],[.3,-.62],[.04,-.32]];
function drawOver(){o.clearRect(0,0,V.w,V.h);const rise=vex/VEX;
 if(!thumb){o.save();o.globalAlpha=Math.max(0,Math.min(1,rise*1.4));o.setLineDash([2.5,2.5]);o.strokeStyle='#ffb27a';o.lineWidth=1.3;o.beginPath();TRAIL.forEach((p,i)=>{const s=P(p[0],p[1]);i?o.lineTo(s[0],s[1]):o.moveTo(s[0],s[1]);});o.stroke();o.setLineDash([]);
  const st=P(TRAIL[0][0],TRAIL[0][1]);o.fillStyle='#ffb27a';o.beginPath();o.arc(st[0],st[1],2.4,0,7);o.fill();halo('Fujinomiya 5th Stn',st[0]+7,st[1]+4,'500 '+FS+'px '+SANS,'#d0d0d0');o.restore();
  for(const L of LAKES){if(L[1]<V.e0+1.5||L[1]>V.e1-1)continue;const s=P(L[1],L[2]);halo(L[0],s[0],s[1]-7,'italic 400 '+FS+'px '+SANS,'#8a9098','center');}
  const fy=P(7.3,14);o.fillStyle='#e8e8e8';o.beginPath();o.arc(fy[0],fy[1],2.2,0,7);o.fill();halo('Fujiyoshida',fy[0]-6,fy[1]+4,'500 '+FS+'px '+SANS,'#c4c4c4','right');}
 const hz=P(2.6,-2.2);o.fillStyle='rgba(232,232,232,.9)';o.beginPath();o.arc(hz[0],hz[1],2,0,7);o.fill();halo('Hōei crater',hz[0]+6,hz[1]+4,'500 '+FS+'px '+SANS,'#c4c4c4');
 // Summit callout.
 const sm=P(0,0),ly=sm[1]-22;if(!thumb){o.strokeStyle='rgba(255,255,255,.55)';o.lineWidth=1;o.beginPath();o.moveTo(sm[0]+.5,sm[1]-3);o.lineTo(sm[0]+.5,ly);o.stroke();}o.fillStyle='#fff';o.beginPath();o.arc(sm[0],sm[1],2.6,0,7);o.fill();o.strokeStyle='#fa7319';o.lineWidth=1.2;o.beginPath();o.arc(sm[0],sm[1],5.2,0,7);o.stroke();
 if(!thumb){halo('Kengamine',sm[0]-4,ly-2,'600 '+FS+'px '+SANS,'#f2f2f2','right');halo('3,776 m',sm[0]+4,ly-2,'500 '+FS+'px '+MONO,'#ffb27a','left');}
 if(probe){const r=Math.max(0,Math.min(ROWS,Math.round((probe.n-V.n0)/CN)));o.beginPath();let pen=false;for(let c=0;c<=COLS;c++){let front=1e9;for(let k=0;k<r;k++)front=Math.min(front,YS[idx(c,k)]);const y=YS[idx(c,r)],x=OX+c*CW_;if(y<=front+.6){pen?o.lineTo(x,y):o.moveTo(x,y);pen=true;}else pen=false;}o.strokeStyle='rgba(255,255,255,.75)';o.lineWidth=1.3;o.stroke();
  const s=P(probe.e,probe.n),b=[s[0],Y(probe.n,0,vex)];o.strokeStyle='rgba(255,255,255,.4)';o.setLineDash([2,3]);o.beginPath();o.moveTo(s[0]+.5,s[1]+4);o.lineTo(s[0]+.5,Math.min(OY,b[1]));o.stroke();o.setLineDash([]);
  o.fillStyle='#fff';o.beginPath();o.arc(s[0],s[1],3,0,7);o.fill();o.strokeStyle='rgba(16,16,16,.9)';o.lineWidth=1.5;o.stroke();o.strokeStyle='rgba(250,115,25,.9)';o.lineWidth=1.2;o.beginPath();o.arc(s[0],s[1],7,0,7);o.stroke();placeTip(s);}}
// Probe, tooltip and the W–E profile in the panel.
const fmt=n=>Math.round(n).toLocaleString('en-US'),lat=n=>(35.3606+n/111.0),lon=e=>(138.7274+e/90.8);
function slopeAt(e,n){const d=.25,dx=(hAt(e+d,n)-hAt(e-d,n))/(2*d*1000),dy=(hAt(e,n+d)-hAt(e,n-d))/(2*d*1000);return Math.atan(Math.hypot(dx,dy))/RAD;}
function fillTip(){const h=probe.lake?probe.lake[6]:hAt(probe.e,probe.n);q('tip-elev').textContent=fmt(h)+' m';q('tip-coord').textContent=lat(probe.n).toFixed(3)+'° N  '+lon(probe.e).toFixed(3)+'° E';q('tip-slope').textContent=probe.lake?probe.lake[0]:Math.round(slopeAt(probe.e,probe.n))+'°';
 tip.querySelector('.'+C+'-tip-row span').textContent=probe.lake?'Lake':'Slope';q('tip-dist').textContent=Math.hypot(probe.e,probe.n).toFixed(1)+' km';}
function placeTip(s){const w=tip.offsetWidth||150,h=tip.offsetHeight||86;let x=s[0]+14,y=s[1]-h-12;if(x+w>V.w-4)x=s[0]-w-14;if(y<4)y=s[1]+14;tip.style.setProperty('--tx',x.toFixed(1)+'px');tip.style.setProperty('--ty',y.toFixed(1)+'px');}
const chart={area:q('chart-area'),line:q('chart-line'),cur:q('chart-cursor'),dot:q('chart-dot')},CW=196,CH=70;
function profile(n,e){if(thumb)return;const pts=[];for(let c=0;c<=COLS;c++){const ee=V.e0+c*CX;pts.push([c/COLS*CW,CH-hAt(ee,n)/3776*62]);}const d='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L');chart.line.setAttribute('d',d);chart.area.setAttribute('d',d+'L'+CW+' '+CH+'L0 '+CH+'Z');
 const x=(e-V.e0)/(V.e1-V.e0)*CW,y=CH-hAt(e,n)/3776*62;chart.cur.setAttribute('x1',x.toFixed(1));chart.cur.setAttribute('x2',x.toFixed(1));chart.dot.setAttribute('cx',x.toFixed(1));chart.dot.setAttribute('cy',y.toFixed(1));
 q('profile-label').textContent='Profile W–E · '+lat(n).toFixed(3)+'° N';q('profile-value').textContent=fmt(probe&&probe.lake?probe.lake[6]:hAt(e,n))+' m';}
function setProbe(p,source){probe=p;if(!p){root.dataset.tip='false';profile(0,0);drawOver();return;}fillTip();root.dataset.tip='true';profile(p.n,p.e);drawOver();
 if(source==='keyboard')status.textContent=q('tip-elev').textContent+' at '+q('tip-coord').textContent+', '+q('tip-dist').textContent+' from the summit';}
function pick(ev){const box=mesh.getBoundingClientRect(),px=(ev.clientX-box.left)/box.width*V.w,py=(ev.clientY-box.top)/box.height*V.h,x=(px-OX)/CW_,c=Math.floor(x);if(c<0||c>=COLS)return null;const u=x-c,yr=r=>YS[idx(c,r)]*(1-u)+YS[idx(c+1,r)]*u;
 for(let r=0;r<=ROWS;r++){const y=yr(r);if(y<=py){const v=r>0?Math.max(0,Math.min(1,(py-y)/Math.max(.01,yr(r-1)-y))):0,e=V.e0+(c+u)*CX,n=V.n0+(r-v)*CN,lk=lakeAt(e,n);return{e,n,lake:lk&&lk.d<1?lk.L:null};}}return null;}
on(view,'pointermove',e=>{if(thumb||pinned||e.pointerType==='touch')return;setProbe(pick(e),'pointer');},{passive:true});
on(view,'pointerleave',()=>{if(!pinned)setProbe(null);},{passive:true});
on(view,'pointerdown',e=>{if(thumb)return;const p=pick(e);pinned=!!p;setProbe(p,'pointer');},{passive:true});
on(view,'keydown',e=>{const step={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];
 if(step){e.preventDefault();pinned=true;const p=probe||{e:0,n:-1};const ne=Math.max(V.e0+.5,Math.min(V.e1-.5,p.e+step[0])),nn=Math.max(V.n0+.5,Math.min(V.n1-.5,p.n+step[1])),lk=lakeAt(ne,nn);setProbe({e:ne,n:nn,lake:lk&&lk.d<1?lk.L:null},'keyboard');}
 else if(e.key==='Enter'){e.preventDefault();toggle();}else if(e.key==='Escape'){pinned=false;setProbe(null);}});
on(view,'blur',()=>{if(pinned){pinned=false;setProbe(null);}});
// Relief animation: rise from a flat contour map to 2.4x relief.
const ease=t=>1-Math.pow(1-t,3);
function frame(now){raf=0;if(dead)return;if(!t0)t0=now;const t=Math.min(1,Math.max(0,(now-t0-del)/dur));vex=from+(to-from)*ease(t);draw();if(t<1)raf=requestAnimationFrame(frame);}
function animate(target,ms,delay){cancelAnimationFrame(raf);raf=0;from=vex;to=target;if(reduced||ms<=0){vex=target;draw();return;}dur=ms;del=delay||0;t0=0;raf=requestAnimationFrame(frame);}
function toggle(){const flat=to>0;animate(flat?0:VEX,600);q('relief').textContent=flat?'Flat':'×2.4';status.textContent=flat?'Terrain flattened to a contour map':'Terrain raised to 2.4 times relief';}
ctx.onAction('raise',toggle);
ctx.onAction('reset',()=>{pinned=false;probe=null;root.dataset.tip='false';q('relief').textContent='×2.4';animate(VEX,0);profile(0,0);});
ctx.onAction('replay',()=>{vex=0;draw();animate(VEX,1200,150);});
profile(0,0);
if(reduced){vex=VEX;draw();}else{vex=0;draw();animate(VEX,1200,200);}
root.__mapTopoExtrudeInspect=()=>({cols:COLS,rows:ROWS,vex,probe,max:hmax});
return()=>{dead=true;cancelAnimationFrame(raf);abort.abort();fitObserver.disconnect();};`,
  prompt: `Build a terrain extrusion component for a dark product UI on a 2D canvas. Model Mount Fuji on a 0.5 km grid in km east/north of the summit: a base plane that rises to the north with seeded value-noise foothills, a cone h = base + (3776 − base)·exp(−(d/4.8 km)^1.05), faint radial gullies, a summit crater and the Hōei crater with its parasitic cone on the south-east flank, and the Fuji Five Lakes as flat water at their real levels (Kawaguchiko 830 m, Yamanakako 980 m). View it obliquely from the south at a 40° pitch and draw rows back to front so no depth sort is needed: each quad is hillshaded from the north-west, batched by colour into one path per tone, and tinted from neutral grey towards the accent #fa7319 above 1,700 m as a ramp of light. Marching-squares contours every 250 m sit on the surface (index contours every 1,000 m, accent above 3,000 m), and a front skirt shows the cut face. On load the flat contour map rises to 2.4x relief over 1.2 s with an ease-out cubic. A separate overlay canvas carries labels with halos, the Kengamine summit callout, the dashed Fujinomiya Trail and a probe: hovering reads elevation, coordinates, slope and distance to the summit in a tooltip card, with a dashed drop line, while a side panel draws the west–east profile at the probe's latitude. Arrow keys move the probe by 1 km, Enter flattens or raises; Dock actions Flatten / raise and Reset. The tile is a tighter crop of the cone with a name chip. Reduced motion draws the raised model as one still frame. Clean up listeners and frames on unmount.`
});
