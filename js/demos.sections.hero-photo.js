/* Photo Hero: an original INTRX section. A full-bleed hero over a licensed dark photograph; the headline resolves word by word and the photo drifts against the pointer. */
INTRX.register({
  id: 'section-hero-photo',
  title: 'Photo Hero',
  cat: 'Heroes',
  rootClass: 'd-sec-hero',
  tags: ['hero', 'section', 'landing page', 'parallax', 'photo', 'headline reveal', 'blur in'],
  libs: [],
  desc: 'A full-bleed landing hero over a dark photograph. The headline resolves word by word from a 2px blur, the subcopy and calls to action follow, and the photo drifts a few pixels against the pointer.',
  seen: 'Seen on: launch pages from Linear, Vercel and Raycast, and most developer-tool homepages with a photographic hero',
  hint: 'Hover · move the pointer and the photo drifts the other way; Next headline resolves a new line word by word',
  html: String.raw`<section class="d-sec-hero" aria-labelledby="d-sec-hero-title">
  <div class="d-sec-hero-media" aria-hidden="true">
    <img class="d-sec-hero-photo" src="{{asset:photo-dusk}}" alt="" decoding="async">
    <span class="d-sec-hero-scrim"></span>
  </div>
  <nav class="d-sec-hero-nav" aria-label="Plinth">
    <a class="d-sec-hero-brand" href="#home"><svg class="d-sec-hero-mark" viewBox="0 0 18 18" aria-hidden="true"><rect x="5" y="1.5" width="8" height="4" rx="1.2" fill="#fa7319"/><rect x="3" y="7" width="12" height="4" rx="1.2" fill="currentColor" opacity=".92"/><rect x="1" y="12.5" width="16" height="4" rx="1.2" fill="currentColor" opacity=".55"/></svg><span>Plinth</span></a>
    <ul class="d-sec-hero-links">
      <li><a class="d-sec-hero-link" href="#components">Components</a></li>
      <li><a class="d-sec-hero-link" href="#templates">Templates</a></li>
      <li><a class="d-sec-hero-link" href="#docs">Docs</a></li>
    </ul>
    <a class="d-sec-hero-signin" href="#signin">Sign in</a>
  </nav>
  <div class="d-sec-hero-body">
    <a class="d-sec-hero-pill" href="#agents"><span class="d-sec-hero-new">New</span><span class="d-sec-hero-pill-text">Agents can install components</span><svg class="d-sec-hero-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6h7M6.5 3 9.5 6l-3 3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    <h2 class="d-sec-hero-title" id="d-sec-hero-title"><span class="d-sec-hero-sr">Ship interfaces that feel considered, not assembled</span><span class="d-sec-hero-lines" aria-hidden="true"><span class="d-sec-hero-line">Ship interfaces that feel</span><span class="d-sec-hero-line d-sec-hero-line--2">considered, not assembled</span></span></h2>
    <p class="d-sec-hero-sub">Plinth is 240 accessible, motion-tuned components for React and plain HTML. Copy the source, or let your coding agent install them in one command.</p>
    <div class="d-sec-hero-ctas">
      <a class="d-sec-hero-cta d-sec-hero-cta--primary" href="#start">Start building<svg class="d-sec-hero-cta-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6h7M6.5 3 9.5 6l-3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      <button type="button" class="d-sec-hero-cta d-sec-hero-cta--code" aria-label="Copy install command: npx plinth init"><span class="d-sec-hero-dollar" aria-hidden="true">$</span><span>npx plinth init</span><span class="d-sec-hero-icons" aria-hidden="true"><svg class="d-sec-hero-copy" viewBox="0 0 14 14"><rect x="4.5" y="4.5" width="7.5" height="7.5" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M9.5 4.5V3.3c0-.9-.7-1.6-1.6-1.6H3.3c-.9 0-1.6.7-1.6 1.6v4.6c0 .9.7 1.6 1.6 1.6h1.2" fill="none" stroke="currentColor" stroke-width="1.3"/></svg><svg class="d-sec-hero-check" viewBox="0 0 14 14"><path d="M3 7.4 5.7 10 11 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
    </div>
  </div>
  <p class="d-sec-hero-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-hero{--fs:var(--fit-scale,1);--ink:#fafafa;--ink-2:rgba(255,255,255,.74);--ink-3:rgba(255,255,255,.56);--edge:rgba(255,255,255,.12);--accent:#fa7319;--ease:var(--ease-out,cubic-bezier(.22,1,.36,1));position:relative;width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden;isolation:isolate;container-type:size;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-hero *{box-sizing:border-box}
.d-sec-hero-media{position:absolute;inset:0;z-index:-1;overflow:hidden;background-color:#0c0d10}
.d-sec-hero-photo{position:absolute;top:-12px;left:-12px;width:calc(100% + 24px);height:calc(100% + 24px);max-width:none;object-fit:cover;object-position:50% 64%;will-change:transform}
.d-sec-hero-scrim{position:absolute;inset:0;background:radial-gradient(56% 46% at 50% 48%,rgba(7,8,10,.42),rgba(7,8,10,0) 74%),linear-gradient(180deg,rgba(7,8,10,.72) 0%,rgba(7,8,10,.2) 22%,rgba(7,8,10,.14) 62%,rgba(7,8,10,.74) 100%)}
.d-sec-hero-nav{position:relative;flex:none;display:flex;align-items:center;height:60px;padding:0 24px;box-shadow:inset 0 -1px 0 rgba(255,255,255,.07)}
.d-sec-hero-brand{display:flex;align-items:center;gap:8px;height:32px;padding:0 6px;margin-left:-6px;border-radius:8px;color:var(--ink);text-decoration:none;font-size:15px;line-height:20px;font-weight:600;letter-spacing:-.02em}
.d-sec-hero-mark{width:18px;height:18px;flex:none}
.d-sec-hero-links{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;gap:2px;margin:0;padding:0;list-style:none}
.d-sec-hero-link{display:block;padding:6px 12px;border-radius:8px;font-size:13px;line-height:18px;color:var(--ink-2);text-decoration:none;transition:color var(--dur-quick,150ms) var(--ease),background-color var(--dur-quick,150ms) var(--ease)}
.d-sec-hero-signin{display:flex;align-items:center;height:30px;margin-left:auto;padding:0 12px;border-radius:8px;font-size:13px;font-weight:500;color:var(--ink);text-decoration:none;background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22),inset 0 1px 0 rgba(255,255,255,.06);transition:background-color var(--dur-quick,150ms) var(--ease),box-shadow var(--dur-quick,150ms) var(--ease)}
@media (hover:hover){.d-sec-hero-link:hover{color:var(--ink);background:rgba(255,255,255,.07)}.d-sec-hero-signin:hover{background:rgba(255,255,255,.1);box-shadow:inset 0 0 0 1px rgba(255,255,255,.32),inset 0 1px 0 rgba(255,255,255,.08)}}
.d-sec-hero-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 32px 64px;text-align:center}
.d-sec-hero-pill{display:inline-flex;align-items:center;gap:9px;height:30px;padding:0 12px 0 4px;margin-bottom:22px;border-radius:999px;font-size:13px;line-height:18px;color:rgba(255,255,255,.88);text-decoration:none;background:rgba(16,17,20,.46);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),inset 0 1px 0 rgba(255,255,255,.08),0 10px 28px -14px rgba(0,0,0,.7);-webkit-backdrop-filter:blur(14px) saturate(140%);backdrop-filter:blur(14px) saturate(140%)}
.d-sec-hero-new{display:flex;align-items:center;height:22px;padding:0 8px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.01em;color:#1a0d03;background:var(--accent);box-shadow:inset 0 1px 0 rgba(255,255,255,.3)}
.d-sec-hero-arrow{width:12px;height:12px;flex:none;color:var(--ink-3);transition:transform var(--dur-quick,150ms) var(--ease),color var(--dur-quick,150ms) var(--ease)}
@media (hover:hover){.d-sec-hero-pill:hover .d-sec-hero-arrow{transform:translateX(2px);color:var(--ink)}}
.d-sec-hero-title{margin:0;font-size:clamp(30px,5.5cqw,64px);line-height:1.04;font-weight:600;letter-spacing:-.04em;text-shadow:0 2px 24px rgba(0,0,0,.25)}
.d-sec-hero-line{display:block;white-space:nowrap}
.d-sec-hero-line--2{color:rgba(255,255,255,.64)}
.d-sec-hero-w{display:inline-block;opacity:0;transform:translateY(var(--move-base,8px));filter:blur(var(--blur-small,2px));transition:opacity var(--dur-slow,400ms) var(--ease),transform var(--dur-slow,400ms) var(--ease),filter var(--dur-slow,400ms) var(--ease);transition-delay:calc(var(--i,0) * var(--stagger,40ms))}
.d-sec-hero-lines.is-in .d-sec-hero-w{opacity:1;transform:none;filter:blur(0)}
.d-sec-hero-lines.is-out .d-sec-hero-w{opacity:0;transform:translateY(-6px);filter:blur(var(--blur-small,2px));transition-duration:var(--dur-quick,150ms);transition-timing-function:var(--ease-close,cubic-bezier(.4,0,.2,1));transition-delay:0ms}
.d-sec-hero-sub{max-width:520px;margin:20px 0 0;font-size:15px;line-height:24px;color:var(--ink-2);text-wrap:balance}
.d-sec-hero-ctas{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:28px}
.d-sec-hero-pill,.d-sec-hero-sub,.d-sec-hero-ctas{opacity:0;transform:translateY(var(--move-base,8px));transition:opacity var(--dur-slow,400ms) var(--ease),transform var(--dur-slow,400ms) var(--ease)}
.d-sec-hero-sub{transition-delay:300ms}
.d-sec-hero-ctas{transition-delay:350ms}
.d-sec-hero.is-in :is(.d-sec-hero-pill,.d-sec-hero-sub,.d-sec-hero-ctas){opacity:1;transform:none}
.d-sec-hero-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:40px;padding:0 16px;border:0;border-radius:10px;font:500 14px/1 Geist,system-ui,sans-serif;text-decoration:none;cursor:pointer;transition:transform var(--dur-fast,250ms) var(--ease-pop,cubic-bezier(.34,1.36,.64,1)),background-color var(--dur-quick,150ms) var(--ease),box-shadow var(--dur-quick,150ms) var(--ease)}
.d-sec-hero-cta:active{transform:scale(.97);transition-duration:var(--dur-micro,80ms);transition-timing-function:var(--ease)}
.d-sec-hero-cta--primary{color:#0b0b0c;background:#f4f4f5;box-shadow:inset 0 1px 0 #fff,0 1px 2px rgba(0,0,0,.45),0 10px 30px -10px rgba(250,115,25,.45)}
.d-sec-hero-cta-arrow{width:13px;height:13px;transition:transform var(--dur-quick,150ms) var(--ease)}
.d-sec-hero-cta--code{gap:9px;color:var(--ink);font-family:'Geist Mono',ui-monospace,monospace;font-size:13px;font-weight:400;background:rgba(14,15,18,.5);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14),inset 0 1px 0 rgba(255,255,255,.07);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.d-sec-hero-dollar{color:var(--ink-3)}
.d-sec-hero-icons{display:grid;width:14px;height:14px;margin-left:3px;color:var(--ink-3)}
.d-sec-hero-icons svg{grid-area:1/1;width:14px;height:14px}
.d-sec-hero-copy{transition:opacity var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),filter var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-hero-check{color:#ffa466;opacity:0;transform:scale(.25) rotate(-80deg);filter:blur(4px);transition:opacity var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),filter var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-hero-cta--code.is-copied .d-sec-hero-copy{opacity:0;transform:scale(.25);filter:blur(4px)}
.d-sec-hero-cta--code.is-copied .d-sec-hero-check{opacity:1;transform:none;filter:blur(0);transition:opacity var(--dur-slow,400ms) var(--ease),transform var(--dur-xslow,500ms) var(--ease),filter var(--dur-xslow,500ms) var(--ease)}
@media (hover:hover){.d-sec-hero-cta--primary:hover{background:#fff}.d-sec-hero-cta--primary:hover .d-sec-hero-cta-arrow{transform:translateX(2px)}.d-sec-hero-cta--code:hover{background:rgba(255,255,255,.09);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2),inset 0 1px 0 rgba(255,255,255,.08)}}
.d-sec-hero :is(a,button):focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-sec-hero-sr,.d-sec-hero-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Narrow and short stages (the mobile detail view is about 360×360). */
@container (max-width:640px){.d-sec-hero-links{display:none}.d-sec-hero-nav{padding:0 16px}.d-sec-hero-body{padding:0 20px 60px}.d-sec-hero-title{font-size:clamp(22px,6.4cqw,40px)}.d-sec-hero-sub{font-size:14px;line-height:22px}}
@container (max-height:460px){.d-sec-hero-nav{height:48px}.d-sec-hero-sub{display:none}.d-sec-hero-pill{margin-bottom:14px}.d-sec-hero-ctas{margin-top:18px;flex-wrap:nowrap;gap:8px}.d-sec-hero-cta{height:34px;padding:0 13px;font-size:13px}.d-sec-hero-body{padding-bottom:56px}}
@container (max-width:400px){.d-sec-hero-pill{font-size:12px}.d-sec-hero-cta{padding:0 11px;font-size:12px}.d-sec-hero-icons{display:none}}
/* Thumbnail: the headline and both calls to action over the photograph. */
.d-sec-hero[data-mode="thumb"] :is(.d-sec-hero-nav,.d-sec-hero-sub){display:none}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-body{padding:0 18px 6px}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-pill{height:24px;gap:6px;padding:0 9px 0 3px;margin-bottom:12px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-new{height:18px;padding:0 6px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-arrow{width:10px;height:10px}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-title{font-size:23px;letter-spacing:-.035em}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-line{white-space:nowrap}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-ctas{gap:8px;margin-top:16px;flex-wrap:nowrap}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-cta{height:30px;padding:0 11px;border-radius:8px;font-size:12px;gap:6px}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-icons{display:none}
.d-sec-hero[data-mode="thumb"] .d-sec-hero-scrim{background:radial-gradient(80% 64% at 50% 50%,rgba(7,8,10,.5),rgba(7,8,10,0) 76%),linear-gradient(180deg,rgba(7,8,10,.55) 0%,rgba(7,8,10,.3) 40%,rgba(7,8,10,.7) 100%)}
/* Reduced motion: no blur, no rise, no parallax. Everything fades in 150ms. */
.d-sec-hero.is-reduced :is(.d-sec-hero-w,.d-sec-hero-pill,.d-sec-hero-sub,.d-sec-hero-ctas,.d-sec-hero-icons svg){transform:none!important;filter:none!important;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)!important}
@media (prefers-reduced-motion:reduce){.d-sec-hero :is(.d-sec-hero-w,.d-sec-hero-pill,.d-sec-hero-sub,.d-sec-hero-ctas,.d-sec-hero-icons svg){transform:none!important;filter:none!important;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)!important}.d-sec-hero-photo{transform:none!important}.d-sec-hero-cta{transition-property:background-color,box-shadow}}`,
  js: String.raw`const C='d-sec-hero',$=s=>root.querySelector(s);
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
root.dataset.mode=ctx.mode;
root.classList.toggle('is-reduced',reduced);
const HEADS=[['Ship interfaces that feel','considered, not assembled'],['Components your agents','can install in one line'],['Every interaction tuned,','every state accessible']];
const lines=$('.'+C+'-lines'),sr=$('.'+C+'-sr'),live=$('.'+C+'-live'),photo=$('.'+C+'-photo'),copyBtn=$('.'+C+'-cta--code');
let index=0,dead=false,swap=0,idle=0,copied=0,raf=0,touched=false,tx=0,ty=0,cx=0,cy=0;
function build(i){
 lines.textContent='';let n=0;
 HEADS[i].forEach((text,li)=>{const row=document.createElement('span');row.className=C+'-line'+(li?' '+C+'-line--2':'');
  text.split(' ').forEach((word,wi,all)=>{const w=document.createElement('span');w.className=C+'-w';w.textContent=word;
   // 40ms per word, the cascade capped near 300ms so long lines arrive together.
   w.style.setProperty('--i',String(Math.min(++n,7)));row.appendChild(w);if(wi<all.length-1)row.appendChild(document.createTextNode(' '));});
  lines.appendChild(row);});
 sr.textContent=HEADS[i].join(' ');
}
function show(){lines.classList.remove('is-out');void lines.offsetWidth;lines.classList.add('is-in');}
function next(user){
 if(user){touched=true;clearInterval(idle);idle=0;}
 index=(index+1)%HEADS.length;clearTimeout(swap);
 lines.classList.add('is-out');
 // The exit runs 150ms, faster than the 400ms entrance.
 swap=setTimeout(()=>{if(dead)return;lines.classList.remove('is-in');build(index);show();},160);
 if(user)live.textContent='Headline '+(index+1)+' of '+HEADS.length+': '+HEADS[index].join(' ');
}
// Parallax: the photo drifts up to 8px against the pointer (fine pointers only).
function step(){raf=0;cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;
 if(Math.abs(tx-cx)<.02&&Math.abs(ty-cy)<.02){cx=tx;cy=ty;}
 photo.style.transform='translate3d('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px,0)';
 if(cx!==tx||cy!==ty)raf=requestAnimationFrame(step);}
const kick=()=>{if(!raf)raf=requestAnimationFrame(step);};
const abort=new AbortController(),on=(n,e,f,o)=>n.addEventListener(e,f,Object.assign({signal:abort.signal},o));
if(!reduced&&finePointer){
 on(root,'pointermove',e=>{if(e.pointerType!=='mouse')return;const r=root.getBoundingClientRect();if(!r.width||!r.height)return;
  tx=-((e.clientX-r.left)/r.width-.5)*16;ty=-((e.clientY-r.top)/r.height-.5)*16;kick();},{passive:true});
 on(root,'pointerleave',()=>{tx=0;ty=0;kick();});
}
root.querySelectorAll('a').forEach(a=>on(a,'click',e=>e.preventDefault()));
on(copyBtn,'click',()=>{
 try{if(navigator.clipboard)navigator.clipboard.writeText('npx plinth init').catch(()=>{});}catch(error){}
 copyBtn.classList.add('is-copied');live.textContent='Copied npx plinth init';
 clearTimeout(copied);copied=setTimeout(()=>copyBtn.classList.remove('is-copied'),1600);
});
ctx.onAction('next',()=>next(true));
const fit=()=>root.style.setProperty('--fit-scale',String(ctx.scale||1));
const ro=new ResizeObserver(fit);ro.observe(stage);fit();
build(0);
requestAnimationFrame(()=>requestAnimationFrame(()=>{if(dead)return;root.classList.add('is-in');show();}));
// Thumbnails cycle the headlines on their own until a control is pressed.
if(ctx.mode==='thumb'&&!reduced)idle=setInterval(()=>{if(!touched)next(false);},3400);
return()=>{dead=true;clearInterval(idle);clearTimeout(swap);clearTimeout(copied);cancelAnimationFrame(raf);abort.abort();ro.disconnect();};`,
  prompt: `Build a full-bleed landing hero in plain HTML, CSS and JavaScript with no libraries. The section fills its container (container-type: size) and sits on a dark abstract photograph (an <img> with object-fit: cover, oversized by 12px on every side). Darken it for contrast with a scrim: a radial rgba(7,8,10,.5) pool behind the copy plus a vertical gradient from .78 at the top through .3 in the middle to .82 at the bottom, so white type stays above 7:1. A 60px top nav with a hairline underneath holds the wordmark of a fictional product, Plinth (an 18px mark of three stacked slabs, the top one orange #fa7319), three centred links (Components, Templates, Docs; 13px, rgba(255,255,255,.74), hover background rgba(255,255,255,.07)) and a small outline "Sign in" button (30px tall, inset 1px rgba(255,255,255,.22)). Centred below: a glass announcement pill (backdrop blur 14px, inset hairline) with an orange "New" chip, "Agents can install components" and an arrow that nudges 2px on hover; a two-line headline at clamp(30px, 5.5cqw, 64px), weight 600, tracking -0.04em, second line at 64% white; one line of subcopy (15px/24px, max 520px); and two calls to action: a light "Start building" button with an orange under-glow and a mono "$ npx plinth init" glass button that copies the command and swaps its copy icon for a check (out 150ms to scale .25 and blur 4px, in 500ms from scale .25 and blur 10px). On load, each headline word is an inline-block that resolves from opacity 0, translateY(8px) and blur(2px) to rest over 400ms cubic-bezier(0.22, 1, 0.36, 1), staggered 40ms and capped at 280ms; the subcopy follows at 300ms and the buttons at 350ms. A "Next headline" control cycles three lines (Ship interfaces that feel / considered, not assembled; Components your agents / can install in one line; Every interaction tuned, / every state accessible): old words leave in 150ms (up 6px, blur 2px, cubic-bezier(0.4, 0, 0.2, 1)), new ones resolve in, and a polite live region announces the new headline while a visually hidden span keeps the full sentence for screen readers. Parallax: on (hover: hover) and (pointer: fine) only, the photo eases toward an offset opposite the pointer, at most 8px on each axis, with a 0.08 per-frame lerp, and returns to centre when the pointer leaves. Thumbnail mode hides the nav and subcopy and cycles headlines every 3.4s. Under prefers-reduced-motion there is no blur, rise or parallax: everything fades in over 150ms.`
});
