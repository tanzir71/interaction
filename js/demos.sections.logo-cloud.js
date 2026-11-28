/* Logo Cloud: an original INTRX section. A hairline grid of fictional wordmarks that swap in place, with a pointer spotlight on the lines. */
INTRX.register({
  id: 'section-logo-cloud',
  title: 'Logo Cloud',
  cat: 'Social proof',
  rootClass: 'd-sec-logos',
  tags: ['logos', 'section', 'social proof', 'customers', 'wordmarks', 'spotlight', 'landing page'],
  libs: [],
  desc: 'A customer logo section on a hairline grid. Every couple of seconds one or two wordmarks blur and slide out for another, and a soft spotlight follows the pointer along the grid lines.',
  seen: 'Seen on: Vercel, Linear and Resend home pages, directly under the hero',
  hint: 'Ambient · wordmarks swap in place every few seconds; move the pointer to light the hairlines',
  html: String.raw`<section class="d-sec-logos" aria-labelledby="d-sec-logos-lede">
  <p class="d-sec-logos-lede" id="d-sec-logos-lede">Trusted by product teams at</p>
  <div class="d-sec-logos-field">
    <div class="d-sec-logos-lines" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><i class="d-sec-logos-cross"></i><i class="d-sec-logos-cross"></i><i class="d-sec-logos-cross"></i></div>
    <div class="d-sec-logos-spot" aria-hidden="true"></div>
    <div class="d-sec-logos-glow" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <ul class="d-sec-logos-grid">
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Quillstack customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="quillstack" data-name="Quillstack"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><rect x="1.5" y="2.5" width="12" height="3.6" rx="1.8"/><rect x="6.5" y="8.2" width="12" height="3.6" rx="1.8"/><rect x="1.5" y="13.9" width="8.5" height="3.6" rx="1.8"/></svg>Quillstack</span></span></a></li>
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Lumenfold customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="lumenfold" data-name="Lumenfold">Lumenfold</span></span></a></li>
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Oarlock customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="oarlock" data-name="Oarlock"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 1.5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zM8.6 5.5v9h2.8v-9z"/></svg>oarlock</span></span></a></li>
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Sablefin customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="sablefin" data-name="Sablefin">Sablefin</span></span></a></li>
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Driftline customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="driftline" data-name="Driftline"><span class="d-sec-logos-dim">~/</span>driftline</span></span></a></li>
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Cinderbox customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="cinderbox" data-name="Cinderbox"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.2" y="2.2" width="15.6" height="15.6" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="7" y="7" width="6" height="6" rx="1.4"/></svg>Cinderbox</span></span></a></li>
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Tidewell customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="tidewell" data-name="Tidewell"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 7.5c2.7-3 5.3-3 8 0s5.3 3 8 0M2 13.5c2.7-3 5.3-3 8 0s5.3 3 8 0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>Tidewell</span></span></a></li>
      <li class="d-sec-logos-cell"><a class="d-sec-logos-link" href="#customers" aria-label="Halden and Co customer story"><span class="d-sec-logos-slot"><span class="d-sec-logos-mark" data-wm="halden" data-name="Halden and Co">Halden<span class="d-sec-logos-amp">&amp; Co</span></span></span></a></li>
    </ul>
  </div>
  <a class="d-sec-logos-more" href="#customers">Read 38 customer stories<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  <template class="d-sec-logos-pool">
    <span class="d-sec-logos-mark" data-wm="parcelwise" data-name="Parcelwise">parcel<b class="d-sec-logos-b">wise</b></span>
    <span class="d-sec-logos-mark" data-wm="northpine" data-name="Northpine"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 2l8.5 15h-17zM10 10.2l3.9 6.8H6.1z"/></svg>northpine</span>
    <span class="d-sec-logos-mark" data-wm="ferrolabs" data-name="Ferrolabs">Ferro<i class="d-sec-logos-tag">labs</i></span>
    <span class="d-sec-logos-mark" data-wm="kiteline" data-name="Kiteline"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.8l6.4 8.2-6.4 8.2-6.4-8.2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M3.6 10h12.8M10 1.8v16.4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>Kiteline</span>
    <span class="d-sec-logos-mark" data-wm="brindle" data-name="Brindle">Brindle<span class="d-sec-logos-dot">.</span></span>
    <span class="d-sec-logos-mark" data-wm="mesarun" data-name="Mesa Run">Mesa<span class="d-sec-logos-dim">/</span>Run</span>
    <span class="d-sec-logos-mark" data-wm="coldframe" data-name="Coldframe"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.2" y="2.2" width="15.6" height="15.6" rx="4.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="13" cy="7" r="2"/></svg>Coldframe</span>
    <span class="d-sec-logos-mark" data-wm="glassreed" data-name="Glassreed"><svg class="d-sec-logos-glyph" viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="2" width="4.4" height="16" rx="2.2"/><rect x="11.6" y="6" width="4.4" height="12" rx="2.2" opacity=".55"/></svg>Glassreed</span>
  </template>
  <p class="d-sec-logos-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-logos{--fs:var(--fit-scale,1);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--logo:#a6a6a6;--logo-hi:#fafafa;--line:rgba(255,255,255,.1);--line-hi:rgba(255,255,255,.5);--plus:rgba(255,255,255,.34);--spot:rgba(255,255,255,.05);--accent:#fa7319;--wm:18px;--cell-h:132px;--cols:4;position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.d-sec-logos *{box-sizing:border-box}
.d-sec-logos-lede{margin:0;font-size:14px;line-height:20px;color:var(--ink-2)}
.d-sec-logos-field{--mx:50%;--my:50%;position:relative;width:100%}
.d-sec-logos-grid,.d-sec-logos-lines,.d-sec-logos-glow{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));grid-auto-rows:var(--cell-h)}
.d-sec-logos-grid{position:relative;z-index:3;margin:0;padding:0;list-style:none}
.d-sec-logos-lines,.d-sec-logos-glow,.d-sec-logos-spot{position:absolute;inset:0;pointer-events:none}
.d-sec-logos-lines{z-index:0;color:var(--line);-webkit-mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent),linear-gradient(transparent,#000 24%,#000 76%,transparent);-webkit-mask-composite:source-in;mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent),linear-gradient(transparent,#000 24%,#000 76%,transparent);mask-composite:intersect}
.d-sec-logos-glow{z-index:2;color:var(--line-hi);opacity:0;-webkit-mask-image:radial-gradient(150px circle at var(--mx) var(--my),#000,transparent 75%);mask-image:radial-gradient(150px circle at var(--mx) var(--my),#000,transparent 75%);transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-logos-spot{z-index:1;opacity:0;background:radial-gradient(190px circle at var(--mx) var(--my),var(--spot),transparent 70%);transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-logos-field.is-lit :is(.d-sec-logos-glow,.d-sec-logos-spot){opacity:1;transition-duration:var(--dur-quick,150ms)}
:is(.d-sec-logos-lines,.d-sec-logos-glow) span{border-right:1px solid;border-bottom:1px solid}
:is(.d-sec-logos-lines,.d-sec-logos-glow) span:nth-child(4n){border-right-color:transparent}
:is(.d-sec-logos-lines,.d-sec-logos-glow) span:nth-child(n+5){border-bottom-color:transparent}
.d-sec-logos-cross{position:absolute;top:calc(var(--cell-h) - 5px);width:9px;height:9px;margin-left:-5px;background:linear-gradient(var(--plus),var(--plus)) center/9px 1px no-repeat,linear-gradient(var(--plus),var(--plus)) center/1px 9px no-repeat}
.d-sec-logos-cross:nth-of-type(1){left:25%}
.d-sec-logos-cross:nth-of-type(2){left:50%}
.d-sec-logos-cross:nth-of-type(3){left:75%}
.d-sec-logos-cell{display:flex;min-width:0}
.d-sec-logos-link{flex:1;display:grid;place-items:center;min-width:0;color:var(--logo);text-decoration:none;outline:none;transition:color var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-logos-link:hover{color:var(--logo-hi);transition-duration:var(--dur-quick,150ms)}}
.d-sec-logos-link:focus-visible{color:var(--logo-hi);box-shadow:inset 0 0 0 2px var(--focus-ring,#fa7319);border-radius:6px}
.d-sec-logos-slot{display:grid;place-items:center;font-size:var(--wm)}
.d-sec-logos-mark{grid-area:1/1;display:inline-flex;align-items:center;gap:.42em;white-space:nowrap;line-height:1;transition:opacity var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--dur-micro,80ms),transform var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--dur-micro,80ms),filter var(--dur-slow,400ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--dur-micro,80ms)}
.d-sec-logos-mark.is-enter{opacity:0;transform:translateY(6px);filter:blur(4px);transition:none}
.d-sec-logos-mark.is-exit{opacity:0;transform:translateY(-6px);filter:blur(4px);transition-duration:var(--dur-fast,250ms);transition-delay:0ms;transition-timing-function:var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-logos-glyph{flex:none;width:1.12em;height:1.12em;fill:currentColor}
.d-sec-logos-dim{opacity:.5}
.d-sec-logos-mark[data-wm="quillstack"]{font-weight:600;letter-spacing:-.035em}
.d-sec-logos-mark[data-wm="lumenfold"]{font-size:.8em;font-weight:500;letter-spacing:.24em;text-transform:uppercase}
.d-sec-logos-mark[data-wm="oarlock"]{gap:.3em;font-family:Manrope,Geist,system-ui,sans-serif;font-size:1.1em;font-weight:800;letter-spacing:-.05em}
.d-sec-logos-mark[data-wm="sablefin"]{font-family:Newsreader,Georgia,serif;font-size:1.34em;font-style:italic;font-weight:500;letter-spacing:-.01em}
.d-sec-logos-mark[data-wm="driftline"]{font-family:'Geist Mono',ui-monospace,monospace;font-size:.94em;font-weight:500;letter-spacing:-.02em;gap:.1em}
.d-sec-logos-mark[data-wm="cinderbox"]{font-weight:700;letter-spacing:-.03em}
.d-sec-logos-mark[data-wm="tidewell"]{font-weight:500;letter-spacing:-.015em}
.d-sec-logos-mark[data-wm="halden"]{gap:.28em;font-family:Newsreader,Georgia,serif;font-size:1.3em;font-weight:600;font-variant-caps:all-small-caps;letter-spacing:.1em}
.d-sec-logos-amp{font-weight:400;opacity:.7;letter-spacing:.04em}
.d-sec-logos-mark[data-wm="parcelwise"]{gap:0;font-size:1.08em;font-weight:300;letter-spacing:-.035em}
.d-sec-logos-b{font-weight:700}
.d-sec-logos-mark[data-wm="northpine"]{gap:.32em;font-family:Manrope,Geist,system-ui,sans-serif;font-size:1.04em;font-weight:700;letter-spacing:-.035em}
.d-sec-logos-mark[data-wm="ferrolabs"]{gap:.32em;font-size:.98em;font-weight:800;letter-spacing:.04em;text-transform:uppercase}
.d-sec-logos-tag{padding:.18em .38em;border-radius:.32em;font:400 .82em/1 'Geist Mono',ui-monospace,monospace;letter-spacing:0;text-transform:none;box-shadow:inset 0 0 0 1px currentColor}
.d-sec-logos-mark[data-wm="kiteline"]{font-weight:600;letter-spacing:-.02em}
.d-sec-logos-mark[data-wm="brindle"]{gap:0;font-family:Newsreader,Georgia,serif;font-size:1.36em;font-weight:500;letter-spacing:-.025em}
.d-sec-logos-dot{color:var(--accent)}
.d-sec-logos-mark[data-wm="mesarun"]{gap:.05em;font-family:'Geist Mono',ui-monospace,monospace;font-size:.9em;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.d-sec-logos-mark[data-wm="coldframe"]{font-weight:500;letter-spacing:-.02em}
.d-sec-logos-mark[data-wm="glassreed"]{gap:.32em;font-family:Manrope,Geist,system-ui,sans-serif;font-weight:600;letter-spacing:-.025em}
.d-sec-logos-more{display:inline-flex;align-items:center;gap:6px;padding:2px 4px;border-radius:6px;font-size:13px;line-height:20px;color:var(--ink-2);text-decoration:none;outline:none;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-logos-more svg{width:14px;height:14px;transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-logos-more:hover{color:var(--ink)}.d-sec-logos-more:hover svg{transform:translateX(2px)}}
.d-sec-logos-more:focus-visible{color:var(--ink);box-shadow:0 0 0 2px var(--focus-ring,#fa7319)}
.d-sec-logos-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: a three by two crop of the grid. */
.d-sec-logos[data-mode="thumb"]{--cols:3;--cell-h:100px;--wm:max(13px,calc(12px / var(--fs)));gap:0}
.d-sec-logos[data-mode="thumb"] :is(.d-sec-logos-lede,.d-sec-logos-more,.d-sec-logos-cross:nth-of-type(3)){display:none}
.d-sec-logos[data-mode="thumb"] .d-sec-logos-cell:nth-child(4n),.d-sec-logos[data-mode="thumb"] :is(.d-sec-logos-lines,.d-sec-logos-glow) span:nth-child(n+7){display:none}
.d-sec-logos[data-mode="thumb"] :is(.d-sec-logos-lines,.d-sec-logos-glow) span:nth-child(4n){border-right-color:currentColor}
.d-sec-logos[data-mode="thumb"] :is(.d-sec-logos-lines,.d-sec-logos-glow) span:nth-child(3n){border-right-color:transparent}
.d-sec-logos[data-mode="thumb"] :is(.d-sec-logos-lines,.d-sec-logos-glow) span:nth-child(n+4){border-bottom-color:transparent}
.d-sec-logos[data-mode="thumb"] .d-sec-logos-cross:nth-of-type(1){left:33.333%}
.d-sec-logos[data-mode="thumb"] .d-sec-logos-cross:nth-of-type(2){left:66.667%}
.d-sec-logos[data-mode="thumb"] .d-sec-logos-mark[data-wm="lumenfold"]{font-size:max(11px,calc(11px / var(--fs)));letter-spacing:.16em}
.d-sec-logos[data-mode="thumb"] .d-sec-logos-lines{-webkit-mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent),linear-gradient(transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent),linear-gradient(transparent,#000 18%,#000 82%,transparent)}
[data-stage-theme="light"] .d-sec-logos{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--logo:#5c5c5c;--logo-hi:#0a0a0a;--line:rgba(0,0,0,.1);--line-hi:rgba(0,0,0,.42);--plus:rgba(0,0,0,.3);--spot:rgba(0,0,0,.035)}
@media (prefers-reduced-motion:reduce){.d-sec-logos .d-sec-logos-mark.is-enter,.d-sec-logos .d-sec-logos-mark.is-exit{transform:none;filter:none}.d-sec-logos *{transition-duration:var(--dur-quick,150ms)!important;transition-delay:0ms!important;transition-property:opacity,color!important}}`,
  js: String.raw`const C='d-sec-logos',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
root.dataset.mode=ctx.mode;
const field=$('.'+C+'-field'),live=$('.'+C+'-live'),tpl=$('.'+C+'-pool'),canHover=matchMedia('(hover:hover)').matches;
let dead=false,timer=0,sraf=0,lit=false,tx=0,ty=0,px=0,py=0,lastF=0;
// The pool is every wordmark: the eight in the grid plus the eight in the template.
const pool=[...$$('.'+C+'-cell .'+C+'-mark'),...(tpl?[...tpl.content.children]:[])].map(n=>n.cloneNode(true));
const cells=$$('.'+C+'-cell').filter(c=>getComputedStyle(c).display!=='none');
cells.forEach(c=>{c.dataset.wm=c.querySelector('.'+C+'-mark').dataset.wm;});
// A seeded generator keeps the sequence identical on every load.
let seed=20261129;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
const recent=[];
function freshMarks(n){const used=new Set(cells.map(c=>c.dataset.wm)),free=pool.filter(m=>!used.has(m.dataset.wm));
 for(let i=free.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));const t=free[i];free[i]=free[j];free[j]=t;}return free.slice(0,n);}
function render(cell,mark){if(dead)return;const slot=cell.querySelector('.'+C+'-slot'),link=cell.querySelector('.'+C+'-link');
 slot.querySelectorAll('.'+C+'-mark:not(.is-exit)').forEach(old=>{old.classList.add('is-exit');setTimeout(()=>old.remove(),reduced?150:250);});
 const el=mark.cloneNode(true);el.classList.add('is-enter');slot.appendChild(el);void el.offsetWidth;el.classList.remove('is-enter');
 link.setAttribute('aria-label',el.dataset.name+' customer story');}
function queue(cell,mark,delay){cell.dataset.wm=mark.dataset.wm;if(delay)setTimeout(()=>render(cell,mark),delay);else render(cell,mark);}
const busy=c=>c.matches(':hover')||c.contains(document.activeElement);
// One or two cells at a time, never the one under the pointer or focus, never a cell that just changed.
function tick(){const options=cells.filter(c=>!busy(c)&&!recent.includes(c)),n=rnd()<.4?2:1,picks=[];
 while(picks.length<n&&options.length)picks.push(options.splice(Math.floor(rnd()*options.length),1)[0]);
 const marks=freshMarks(picks.length);
 picks.forEach((c,i)=>{if(!marks[i])return;queue(c,marks[i],i*260);recent.push(c);if(recent.length>3)recent.shift();});}
function start(){clearInterval(timer);timer=setInterval(tick,2400);}
// Spotlight: the lit hairlines and a soft fill ease toward the pointer.
function local(x,y){const r=field.getBoundingClientRect(),k=r.width/(field.offsetWidth||1)||1;return[(x-r.left)/k,(y-r.top)/k];}
function kick(){if(!sraf){lastF=ctx.now();sraf=requestAnimationFrame(follow);}}
function follow(){sraf=0;if(dead)return;const t=ctx.now(),dt=Math.min(.05,Math.max(.001,(t-lastF)/1000));lastF=t;
 const k=reduced?1:1-Math.pow(1-.18,dt*60);px+=(tx-px)*k;py+=(ty-py)*k;
 field.style.setProperty('--mx',px.toFixed(1)+'px');field.style.setProperty('--my',py.toFixed(1)+'px');
 if(Math.abs(tx-px)+Math.abs(ty-py)>.3){sraf=requestAnimationFrame(follow);}}
function light(x,y,snap){tx=x;ty=y;if(!lit||snap){px=x;py=y;}lit=true;field.classList.add('is-lit');kick();}
function dim(){lit=false;field.classList.remove('is-lit');}
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
on(field,'pointermove',e=>{if(!canHover||e.pointerType==='touch')return;const p=local(e.clientX,e.clientY);light(p[0],p[1],false);});
on(field,'pointerleave',()=>{if(!field.contains(document.activeElement))dim();});
on(field,'focusin',e=>{const cell=e.target.closest('.'+C+'-cell');if(cell)light(cell.offsetLeft+cell.offsetWidth/2,cell.offsetTop+cell.offsetHeight/2,!lit);});
on(field,'focusout',e=>{if(!field.contains(e.relatedTarget)&&!field.matches(':hover'))dim();});
$$('a').forEach(a=>on(a,'click',e=>e.preventDefault()));
ctx.onAction('shuffle',()=>{const marks=freshMarks(cells.length);
 cells.forEach((c,i)=>{if(marks[i])queue(c,marks[i],reduced?0:i*40);});recent.length=0;
 live.textContent='Now showing '+marks.map(m=>m.dataset.name).join(', ')+'.';start();});
const fit=()=>root.style.setProperty('--fit-scale',String(ctx.scale||1));
const ro=new ResizeObserver(fit);ro.observe(stage);ro.observe(root);fit();
start();
return()=>{dead=true;clearInterval(timer);cancelAnimationFrame(sraf);abort.abort();ro.disconnect();};`,
  prompt: `Build a customer logo section in plain HTML, CSS and JavaScript with no libraries. Centre a 14px grey line ("Trusted by product teams at") above a full-width grid of 4 columns by 2 rows of 118px cells, and below it a 13px link ("Read 38 customer stories" with a small arrow that shifts 2px on hover). The grid draws only its inner hairlines (1px, rgba(255,255,255,.1)) on a separate layer whose two intersected mask gradients fade each line toward its ends, plus small 9px plus marks where the lines cross. Each cell is a link to a customer story holding one fictional, monochrome typographic wordmark in #a6a6a6 (brightening to near-white on hover): Quillstack with a three-bar glyph in Geist 600; LUMENFOLD in tracked uppercase; oarlock in heavy Manrope with a slotted disc; Sablefin in italic Newsreader; ~/driftline in Geist Mono; Cinderbox with a nested square glyph; Tidewell with a two-wave glyph; Halden & Co in small caps; and eight more in a template pool (parcelwise, northpine, FERRO with a mono labs tag, Kiteline, Brindle with an orange full stop, MESA/RUN, Coldframe, Glassreed). Glyphs are inline SVG shapes using currentColor. Every 2.4s one or two cells (40% chance of two, the second 260ms after the first) swap to a wordmark that is not on screen: both marks share one grid cell; the old one leaves upward (translateY(-6px), blur(4px), opacity 0) in 250ms cubic-bezier(0.4, 0, 0.2, 1) and the new one rises from translateY(6px) with blur(4px) to rest in 400ms cubic-bezier(0.22, 1, 0.36, 1) after an 80ms delay. Never swap the cell under the pointer or focus, or one changed in the last three swaps, and use a seeded random generator so the sequence repeats. A pointer spotlight (hover devices only) eases toward the pointer with a 0.18 per-frame lerp: a brighter copy of the hairlines (rgba(255,255,255,.5)) masked by a 150px radial gradient at the pointer, plus a 190px soft white fill, fading in over 150ms and out over 250ms; keyboard focus on a cell moves the spotlight to that cell's centre. A Shuffle Dock control swaps every cell with a 40ms stagger in reading order and announces the new names in a polite live region. Thumbnail mode shows a 3 by 2 crop with 100px cells. Under prefers-reduced-motion swaps are plain 150ms cross-fades with no blur or slide.`
});
