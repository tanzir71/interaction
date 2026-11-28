/* Testimonial Wall: an original INTRX section. Three columns of quote cards drift as seamless loops at different speeds. */
INTRX.register({
  id: 'section-testimonial-wall',
  title: 'Testimonial Wall',
  cat: 'Social proof',
  rootClass: 'd-sec-wall',
  tags: ['testimonials', 'section', 'social proof', 'marquee', 'quotes', 'landing page', 'reviews'],
  libs: [],
  desc: 'A testimonial section where three columns of quote cards drift vertically at different speeds as seamless loops under soft fade masks. Hovering a column eases it to a stop and lifts the card under the pointer.',
  seen: 'Seen on: Raycast, Linear and Supabase customer walls, and most developer-tool launch pages',
  hint: 'Ambient · columns drift at their own speeds; hover a column to stop it and lift a card',
  html: String.raw`<section class="d-sec-wall" aria-labelledby="d-sec-wall-title">
  <header class="d-sec-wall-head">
    <p class="d-sec-wall-eyebrow">Testimonials</p>
    <h2 class="d-sec-wall-title" id="d-sec-wall-title">Loved by teams who ship</h2>
    <p class="d-sec-wall-sub">Notes from the 2,400 designers and engineers who build with it every day.</p>
  </header>
  <div class="d-sec-wall-cols">
    <div class="d-sec-wall-col" data-col="1" data-dir="up"><div class="d-sec-wall-track"><ul class="d-sec-wall-list" aria-label="Testimonials, column 1">
      <li><figure class="d-sec-wall-card" tabindex="0"><p class="d-sec-wall-metric"><span>−38 KB</span> bundle after the switch</p><blockquote class="d-sec-wall-quote">We replaced fourteen one-off hover effects with three components from the library. Our bundle shrank and nobody on design noticed anything except the polish.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="a" aria-hidden="true">MO</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Maya Okafor</span><span class="d-sec-wall-role">Design engineer, Quillstack</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">The reduced-motion branches alone saved us a week of accessibility review.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="b" aria-hidden="true">TL</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Theo Lindqvist</span><span class="d-sec-wall-role">Frontend lead, Tidewell</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><p class="d-sec-wall-stars" role="img" aria-label="Rated 5 out of 5"><svg viewBox="0 0 68 12" aria-hidden="true"><path id="d-sec-wall-star" d="M6 .6l1.6 3.6 3.9.4-2.9 2.6.8 3.9L6 9.1 2.6 11.1l.8-3.9L.5 4.6l3.9-.4z"/><use href="#d-sec-wall-star" x="14"/><use href="#d-sec-wall-star" x="28"/><use href="#d-sec-wall-star" x="42"/><use href="#d-sec-wall-star" x="56"/></svg></p><blockquote class="d-sec-wall-quote">I pasted the prompt into our coding agent, got a working pricing toggle on the first try and shipped it before lunch.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="c" aria-hidden="true">PR</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Priya Raman</span><span class="d-sec-wall-role">Founder, Lumenfold</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">Every timing sits on the same scale, so our app finally feels like one product instead of six teams’ side projects.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="d" aria-hidden="true">JW</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Jonah Weiss</span><span class="d-sec-wall-role">Staff engineer, Parcelwise</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">My handoff docs got shorter. I link the component and the motion spec is already in it.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="b" aria-hidden="true">AR</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Ana Sofía Reyes</span><span class="d-sec-wall-role">Product designer, Oarlock</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><p class="d-sec-wall-metric"><span>2 weeks → 1 day</span> to onboard a hire</p><blockquote class="d-sec-wall-quote">New frontend hires used to spend two weeks learning how we animate. Now it takes an afternoon with the library open next to the codebase.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="a" aria-hidden="true">KM</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Kenji Mori</span><span class="d-sec-wall-role">Engineering manager, Driftline</span></span></figcaption></figure></li>
    </ul></div></div>
    <div class="d-sec-wall-col" data-col="2" data-dir="down"><div class="d-sec-wall-track"><ul class="d-sec-wall-list" aria-label="Testimonials, column 2">
      <li><figure class="d-sec-wall-card" tabindex="0"><p class="d-sec-wall-stars" role="img" aria-label="Rated 5 out of 5"><svg viewBox="0 0 68 12" aria-hidden="true"><use href="#d-sec-wall-star"/><use href="#d-sec-wall-star" x="14"/><use href="#d-sec-wall-star" x="28"/><use href="#d-sec-wall-star" x="42"/><use href="#d-sec-wall-star" x="56"/></svg></p><blockquote class="d-sec-wall-quote">It’s rare that a library makes the defaults look this considered. We kept almost everything exactly as shipped.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="d" aria-hidden="true">HB</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Hana Brooks</span><span class="d-sec-wall-role">Head of design, Cinderbox</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">Zero build step. I dropped one file into a static site and the marquee just worked.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="a" aria-hidden="true">DA</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Diego Álvarez</span><span class="d-sec-wall-role">Indie developer, Sablefin Apps</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">The motion tokens map one to one onto ours. We wired forty components into Storybook in a single day.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="c" aria-hidden="true">LG</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Leah Goldberg</span><span class="d-sec-wall-role">Design systems, Northpine</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><p class="d-sec-wall-metric"><span>0</span> motion findings in our audit</p><blockquote class="d-sec-wall-quote">Keyboard support is real, not a checkbox. Our accessibility audit came back clean for the first time in three years.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="b" aria-hidden="true">SA</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Samuel Adeyemi</span><span class="d-sec-wall-role">CTO, Ferrolabs</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">The bento spotlight is on four of our landing pages now. Marketing just asks for “the glowy one”.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="d" aria-hidden="true">IN</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Iris Novak</span><span class="d-sec-wall-role">Frontend engineer, Halden</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">Readable source, sensible names, no magic. I learned more about easing from reading it than from any course I paid for.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="a" aria-hidden="true">MC</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Marcus Chen</span><span class="d-sec-wall-role">Design engineer, Kiteline</span></span></figcaption></figure></li>
    </ul></div></div>
    <div class="d-sec-wall-col" data-col="3" data-dir="up"><div class="d-sec-wall-track"><ul class="d-sec-wall-list" aria-label="Testimonials, column 3">
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">We needed calm motion for a clinical app. Every component has a quiet mode that still feels designed, not switched off.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="b" aria-hidden="true">OG</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Olivia Grant</span><span class="d-sec-wall-role">Product engineer, Brightwater Health</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">Shipped our whole launch page in a weekend.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="c" aria-hidden="true">RC</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Rafael Costa</span><span class="d-sec-wall-role">Founder, Mesa Run</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><p class="d-sec-wall-stars" role="img" aria-label="Rated 5 out of 5"><svg viewBox="0 0 68 12" aria-hidden="true"><use href="#d-sec-wall-star"/><use href="#d-sec-wall-star" x="14"/><use href="#d-sec-wall-star" x="28"/><use href="#d-sec-wall-star" x="42"/><use href="#d-sec-wall-star" x="56"/></svg></p><blockquote class="d-sec-wall-quote">The prompts are the underrated part. Our agents write code that matches the spec instead of guessing at curves.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="a" aria-hidden="true">NH</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Nadia Haddad</span><span class="d-sec-wall-role">UX engineer, Glassreed</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">Thumbnails animate, detail pages explain, exports run offline. It’s the first library I’ve shown to our whole team.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="d" aria-hidden="true">TW</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Tomasz Wójcik</span><span class="d-sec-wall-role">Senior engineer, Brindle</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><p class="d-sec-wall-metric"><span>12 → 0</span> stuck-toast bug reports</p><blockquote class="d-sec-wall-quote">We swapped our custom toast stack for theirs. The stuck-toast tickets stopped the same week.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="c" aria-hidden="true">GK</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Grace Kim</span><span class="d-sec-wall-role">Design lead, Pinegate</span></span></figcaption></figure></li>
      <li><figure class="d-sec-wall-card" tabindex="0"><blockquote class="d-sec-wall-quote">Stagger at 40 ms, exits faster than entrances. Small rules, and suddenly everything feels expensive.</blockquote><figcaption class="d-sec-wall-who"><span class="d-sec-wall-avatar" data-tone="b" aria-hidden="true">AB</span><span class="d-sec-wall-id"><span class="d-sec-wall-name">Ade Bello</span><span class="d-sec-wall-role">Engineer, Coldframe</span></span></figcaption></figure></li>
    </ul></div></div>
  </div>
  <p class="d-sec-wall-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-wall{--fs:var(--fit-scale,1);--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.17);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--quote:#d0d0d0;--card-a:#1b1b1b;--card-b:#161616;--accent:#fa7319;--gap:14px;--fade:56px;position:relative;width:100%;height:100%;display:flex;flex-direction:column;gap:22px;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-wall *{box-sizing:border-box}
.d-sec-wall-head{display:flex;flex-direction:column;align-items:center;text-align:center}
.d-sec-wall-eyebrow{margin:0 0 6px;font-size:12px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
.d-sec-wall-title{margin:0;font-size:28px;line-height:32px;font-weight:600;letter-spacing:-.025em}
.d-sec-wall-sub{margin:8px 0 0;max-width:560px;font-size:14px;line-height:20px;color:var(--ink-2);text-wrap:balance}
.d-sec-wall-cols{position:relative;flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap);-webkit-mask-image:linear-gradient(transparent,#000 var(--fade),#000 calc(100% - var(--fade)),transparent);mask-image:linear-gradient(transparent,#000 var(--fade),#000 calc(100% - var(--fade)),transparent)}
.d-sec-wall-col{position:relative;min-width:0;min-height:0;overflow:hidden;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-wall-col.is-step{opacity:0}
.d-sec-wall-track{will-change:transform}
.d-sec-wall-list{display:flex;flex-direction:column;gap:var(--gap);margin:0;padding:0 0 var(--gap);list-style:none}
.d-sec-wall-card{margin:0;padding:16px 16px 15px;border-radius:14px;background:linear-gradient(var(--card-a),var(--card-b));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.4);outline:none;transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-wall-card:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 0 rgba(255,255,255,.08),0 14px 28px -14px rgba(0,0,0,.85);transition-duration:var(--dur-quick,150ms)}}
.d-sec-wall-card:focus-visible{transform:translateY(-2px);box-shadow:inset 0 0 0 2px var(--focus-ring,#fa7319),0 14px 28px -14px rgba(0,0,0,.85)}
.d-sec-wall-quote{margin:0;font-size:13px;line-height:20px;color:var(--quote);text-wrap:pretty}
.d-sec-wall-who{display:flex;align-items:center;gap:10px;margin-top:14px}
.d-sec-wall-avatar{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;font-size:11px;line-height:1;font-weight:600;letter-spacing:.02em;color:#e8e8e8;background:linear-gradient(150deg,#3b3b3b,#252525);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.12)}
.d-sec-wall-avatar[data-tone="b"]{color:#cfcfcf;background:linear-gradient(150deg,#2c2c2c,#1d1d1d)}
.d-sec-wall-avatar[data-tone="c"]{color:#ffc296;background:linear-gradient(150deg,rgba(250,115,25,.32),rgba(250,115,25,.1));box-shadow:inset 0 0 0 1px rgba(250,115,25,.32),inset 0 1px 0 rgba(255,200,160,.18)}
.d-sec-wall-avatar[data-tone="d"]{color:#1a1a1a;background:linear-gradient(150deg,#e6e6e6,#b9b9b9);box-shadow:inset 0 1px 0 rgba(255,255,255,.6)}
.d-sec-wall-id{display:flex;flex-direction:column;min-width:0}
.d-sec-wall-name{font-size:13px;line-height:17px;font-weight:600;letter-spacing:-.005em}
.d-sec-wall-role{font-size:12px;line-height:16px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-sec-wall-stars{display:block;margin:0 0 10px;height:12px;line-height:0}
.d-sec-wall-stars svg{width:68px;height:12px;fill:var(--accent)}
.d-sec-wall-metric{display:flex;align-items:center;gap:7px;margin:0 0 11px;font-size:12px;line-height:16px;color:var(--ink-3)}
.d-sec-wall-metric span{padding:0 7px;border-radius:6px;font:500 11px/20px 'Geist Mono',ui-monospace,monospace;color:#ffb27a;background:rgba(250,115,25,.1);box-shadow:inset 0 0 0 1px rgba(250,115,25,.26)}
.d-sec-wall-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: two drifting columns, no heading. */
.d-sec-wall[data-mode="thumb"]{--gap:10px;--fade:34px;gap:0}
.d-sec-wall[data-mode="thumb"] :is(.d-sec-wall-head,[data-col="3"],.d-sec-wall-role,.d-sec-wall-metric){display:none}
.d-sec-wall[data-mode="thumb"] .d-sec-wall-cols{grid-template-columns:repeat(2,minmax(0,1fr))}
.d-sec-wall[data-mode="thumb"] .d-sec-wall-card{padding:11px 12px 12px;border-radius:12px}
.d-sec-wall[data-mode="thumb"] .d-sec-wall-quote{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;overflow:hidden;font-size:max(11px,calc(11px / var(--fs)));line-height:1.45}
.d-sec-wall[data-mode="thumb"] .d-sec-wall-who{gap:7px;margin-top:9px}
.d-sec-wall[data-mode="thumb"] .d-sec-wall-avatar{width:22px;height:22px;font-size:max(11px,calc(11px / var(--fs)));letter-spacing:0}
.d-sec-wall[data-mode="thumb"] .d-sec-wall-name{font-size:max(11px,calc(11px / var(--fs)));line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-sec-wall[data-mode="thumb"] .d-sec-wall-stars{margin-bottom:7px}
[data-stage-theme="light"] .d-sec-wall{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--quote:#333;--edge:rgba(0,0,0,.09);--edge-hi:rgba(0,0,0,.16);--card-a:#fff;--card-b:#fafafa}
[data-stage-theme="light"] .d-sec-wall-card{box-shadow:inset 0 0 0 1px var(--edge),0 1px 2px rgba(0,0,0,.05)}
@media (hover:hover){[data-stage-theme="light"] .d-sec-wall-card:hover{box-shadow:inset 0 0 0 1px var(--edge-hi),0 14px 28px -16px rgba(0,0,0,.25)}}
[data-stage-theme="light"] .d-sec-wall-avatar{color:#333;background:linear-gradient(150deg,#f2f2f2,#e2e2e2);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
[data-stage-theme="light"] .d-sec-wall-avatar[data-tone="b"]{color:#525252;background:#f4f4f4}
[data-stage-theme="light"] .d-sec-wall-avatar[data-tone="c"]{color:#b4500c;background:rgba(250,115,25,.12);box-shadow:inset 0 0 0 1px rgba(250,115,25,.3)}
[data-stage-theme="light"] .d-sec-wall-avatar[data-tone="d"]{color:#f2f2f2;background:linear-gradient(150deg,#3a3a3a,#171717)}
[data-stage-theme="light"] .d-sec-wall-metric span{color:#b4500c;background:rgba(250,115,25,.08)}
@media (prefers-reduced-motion:reduce){.d-sec-wall *{transition-duration:var(--dur-quick,150ms)!important;transition-property:opacity,color,background-color,box-shadow!important}.d-sec-wall-card:hover,.d-sec-wall-card:focus-visible{transform:none!important}}`,
  js: String.raw`const C='d-sec-wall',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
root.dataset.mode=ctx.mode;
const live=$('.'+C+'-live'),canHover=matchMedia('(hover:hover)').matches;
// Pixels per second at Normal speed; the middle column runs downward.
const BASE={1:15,2:11,3:18},PHASE={1:0,2:.42,3:.68};
const SPEEDS=[{m:1,name:'normal'},{m:2,name:'fast'},{m:.5,name:'slow'}];
let speedIx=0,mul=1,curMul=1,paused=false,dead=false,raf=0,last=ctx.now();
const cols=$$('.'+C+'-col').filter(el=>getComputedStyle(el).display!=='none').map(el=>{
 const track=el.querySelector('.'+C+'-track'),list=track.querySelector('.'+C+'-list'),copy=list.cloneNode(true);
 // The duplicate list closes the loop; it is hidden from assistive tech and focus.
 copy.setAttribute('aria-hidden','true');copy.removeAttribute('aria-label');copy.inert=true;
 copy.querySelectorAll('[tabindex]').forEach(n=>n.setAttribute('tabindex','-1'));
 copy.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
 list.after(copy);
 return{el,track,list,dir:el.dataset.dir==='down'?-1:1,base:BASE[el.dataset.col]||14,phase:PHASE[el.dataset.col]||0,off:0,f:1,hold:false,seek:null,P:0,H:0};
});
const wrap=(v,P)=>((v%P)+P)%P;
function place(c){if(!c.P)return;const m=wrap(c.off,c.P),y=c.dir>0?-m:-(c.P-m);c.track.style.transform='translate3d(0,'+y.toFixed(2)+'px,0)';}
function measure(){for(const c of cols){const first=!c.P;c.P=c.list.offsetHeight;c.H=c.el.clientHeight;if(first&&c.P)c.off=c.phase*c.P;place(c);}}
function say(text){live.textContent=text;}
// Keyboard focus stops the column and brings the focused card into the middle of it.
function reveal(c,card){if(!c.P)return;const top=card.parentElement.offsetTop,h=card.offsetHeight,m=wrap(c.off,c.P),y=c.dir>0?-m:-(c.P-m),pos=top+y;
 if(pos>=12&&pos+h<=c.H-12)return;
 const want=(c.H-h)/2-top,mNext=wrap(c.dir>0?-want:c.P+want,c.P);let d=mNext-m;if(d>c.P/2)d-=c.P;if(d<-c.P/2)d+=c.P;
 if(reduced){c.off+=d;place(c);}else c.seek=c.off+d;}
function frame(){if(dead)return;const t=ctx.now(),dt=Math.min(.05,Math.max(0,(t-last)/1000));last=t;
 curMul+=(mul-curMul)*Math.min(1,dt*4);
 for(const c of cols){
  if(c.seek!==null){const d=c.seek-c.off;c.off+=d*Math.min(1,dt*10);if(Math.abs(d)<.4){c.off=c.seek;c.seek=null;}}
  else{const target=paused||c.hold?0:1;c.f+=(target-c.f)*Math.min(1,dt*5);c.off+=c.base*curMul*c.f*dt;}
  place(c);}
 raf=requestAnimationFrame(frame);}
// Reduced motion: no drift. Next fades each column to its following card.
function step(){for(const c of cols){if(!c.P)continue;c.el.classList.add('is-step');}
 setTimeout(()=>{if(dead)return;for(const c of cols){if(!c.P)continue;const m=wrap(c.off,c.P),top=c.dir>0?m:wrap(c.P-m,c.P),next=[...c.list.children].find(li=>li.offsetTop>top+2),v=next?next.offsetTop:0;
  c.off=c.dir>0?v:wrap(c.P-v,c.P);place(c);c.el.classList.remove('is-step');}},150);
 say('Showing the next quotes.');}
const abort=new AbortController(),on=(n,e,f,o)=>n.addEventListener(e,f,Object.assign({signal:abort.signal},o||{}));
for(const c of cols){
 on(c.el,'pointerenter',e=>{if(canHover&&e.pointerType!=='touch')c.hold=true;});
 on(c.el,'pointerleave',()=>{if(!c.el.contains(document.activeElement))c.hold=false;});
 on(c.el,'focusin',e=>{c.hold=true;c.el.scrollTop=0;const card=e.target.closest('.'+C+'-card');if(card)reveal(c,card);});
 on(c.el,'focusout',e=>{if(!c.el.contains(e.relatedTarget)&&!c.el.matches(':hover'))c.hold=false;});
 // Focus can scroll a clipped column natively; the transform owns the position instead.
 on(c.el,'scroll',()=>{c.el.scrollTop=0;},{passive:true});
}
function dockButton(action){return stage.querySelector('[data-action="'+action+'"]');}
ctx.onAction('pause',()=>{
 if(reduced){step();return;}
 paused=!paused;const b=dockButton('pause');
 if(b){b.textContent=paused?'Resume':'Pause';b.setAttribute('aria-pressed',String(paused));}
 say(paused?'Testimonials paused.':'Testimonials moving again.');});
ctx.onAction('speed',()=>{if(reduced)return;speedIx=(speedIx+1)%SPEEDS.length;mul=SPEEDS[speedIx].m;say('Drift speed: '+SPEEDS[speedIx].name+(paused?', paused.':'.'));});
const fit=()=>{root.style.setProperty('--fit-scale',String(ctx.scale||1));measure();};
const ro=new ResizeObserver(fit);ro.observe(stage);ro.observe(root);
fit();
if(document.fonts)document.fonts.ready.then(()=>{if(!dead)measure();});
if(reduced){
 // The Dock mounts after this script: relabel Pause as a step control and hide Speed.
 setTimeout(()=>{const p=dockButton('pause'),s=dockButton('speed');if(p){p.textContent='Next';p.setAttribute('aria-label','Show the next quotes');}if(s){s.hidden=true;s.style.display='none';}},0);
}else raf=requestAnimationFrame(frame);
return()=>{dead=true;cancelAnimationFrame(raf);abort.abort();ro.disconnect();};`,
  prompt: `Build a testimonial section in plain HTML, CSS and JavaScript with no libraries. Centre a header: an orange 12px uppercase eyebrow ("Testimonials"), a 28px/600 title with -0.025em tracking ("Loved by teams who ship") and a 14px grey subline ("Notes from the 2,400 designers and engineers who build their interfaces with it every day."). Below, three equal columns with 14px gaps fill the remaining height inside a wrapper whose mask-image fades the top and bottom 56px to transparent. Each column clips (overflow hidden) a track holding a list of six quote cards; on load JavaScript clones the list once (aria-hidden, inert, tabindex -1) and places it directly after the original, and each list carries 14px of bottom padding so the loop period is exactly one list height. Cards are 14px-radius surfaces built from layered inset hairlines (inset 0 0 0 1px rgba(255,255,255,.09) plus a 1px top highlight) on a #1b1b1b to #161616 gradient, 16px padding: an optional row of five orange stars or a mono metric chip ("−38 KB bundle after the switch", "0 motion findings", "12 → 0 stuck-toast bug reports"), a 13px/20px quote in #d0d0d0 of one to three sentences about using an interaction library, then a footer with a 30px initials disc (four tones: dark grey, darker grey, orange tint, light grey), a 13px/600 name and a 12px role at a fictional company (Maya Okafor, Design engineer, Quillstack; Theo Lindqvist, Frontend lead, Tidewell; and so on). A requestAnimationFrame loop driven by elapsed time moves every track with translate3d: column one rises at 15px/s, column two falls at 11px/s, column three rises at 18px/s, each starting at a different phase, with the offset wrapped modulo the list height so the loop is seamless. Hovering a column (pointer devices only) eases its speed factor to zero with a time-based lerp (rate 5/s) and the card under the pointer lifts 2px with a deeper shadow in 150ms cubic-bezier(0.22, 1, 0.36, 1), settling back in 250ms. Cards are focusable: focus stops the column, shows an inset 2px orange ring and eases the track so the focused card sits in the middle; scroll events on the column reset scrollTop so native focus scrolling never fights the transform. Two Dock controls: Pause toggles all drift (the button reads Resume and carries aria-pressed while paused) and Speed cycles Normal, Fast (2×) and Slow (0.5×), easing between speeds; a polite live region announces both. Thumbnail mode hides the header and the third column and keeps two drifting columns with 4-line quotes. Under prefers-reduced-motion nothing drifts: the columns render still, Pause becomes Next, which fades each column out and back in 150ms advanced by one card, and Speed is hidden.`
});
