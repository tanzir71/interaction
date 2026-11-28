/* FAQ Section: an original INTRX section. An intro column with a contact card beside a one-open-at-a-time accordion. */
INTRX.register({
  id: 'section-faq',
  title: 'FAQ Section',
  cat: 'FAQ, CTA & Footer',
  rootClass: 'd-sec-faq',
  tags: ['faq', 'accordion', 'section', 'disclosure', 'landing page', 'support'],
  libs: [],
  desc: 'A two-column FAQ: a heading and a talk-to-an-engineer card on the left, an accordion of six real questions on the right. One answer is open at a time; panels grow through grid rows and the plus turns into a minus.',
  seen: 'Seen on: the FAQ blocks near the end of pricing and landing pages for Linear, Vercel and Raycast',
  hint: 'Press · open a question; Up, Down, Home and End move between questions',
  html: String.raw`<section class="d-sec-faq" aria-label="Frequently asked questions">
  <div class="d-sec-faq-intro">
    <p class="d-sec-faq-eyebrow">FAQ</p>
    <h2 class="d-sec-faq-title">Questions, answered</h2>
    <p class="d-sec-faq-lede">Licences, frameworks, updates and agents: what teams ask before they adopt Northwind UI.</p>
    <aside class="d-sec-faq-contact" aria-label="Contact an engineer">
      <div class="d-sec-faq-who">
        <span class="d-sec-faq-faces" aria-hidden="true"><span class="d-sec-faq-face">PA</span><span class="d-sec-faq-face">JL</span><span class="d-sec-faq-face">WT</span></span>
        <span class="d-sec-faq-online"><span class="d-sec-faq-dot" aria-hidden="true"></span>3 engineers online</span>
      </div>
      <p class="d-sec-faq-contact-title">Still stuck? Talk to an engineer</p>
      <p class="d-sec-faq-contact-copy">Replies come from the people who build the components, usually within three hours.</p>
      <a class="d-sec-faq-contact-btn" href="#support">Start a conversation<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg></a>
    </aside>
  </div>
  <div class="d-sec-faq-list">
    <div class="d-sec-faq-item is-open">
      <h3 class="d-sec-faq-h"><button type="button" class="d-sec-faq-q" aria-expanded="true"><span class="d-sec-faq-qtext">Can I use the components in client work?</span><span class="d-sec-faq-icon" aria-hidden="true"></span></button></h3>
      <div class="d-sec-faq-panel" role="region"><div class="d-sec-faq-clip"><p class="d-sec-faq-a">Yes. One licence covers unlimited personal and commercial projects, including work you bill to clients. The one thing you can’t do is resell the components themselves as a kit or template.</p></div></div>
    </div>
    <div class="d-sec-faq-item">
      <h3 class="d-sec-faq-h"><button type="button" class="d-sec-faq-q" aria-expanded="false"><span class="d-sec-faq-qtext">Which frameworks do you support?</span><span class="d-sec-faq-icon" aria-hidden="true"></span></button></h3>
      <div class="d-sec-faq-panel" role="region"><div class="d-sec-faq-clip"><p class="d-sec-faq-a">Every component ships as plain HTML, CSS and JavaScript with no build step, plus React 19 and Vue 3 ports with typed props. Svelte 5 ports cover 38 of the 140 components so far.</p></div></div>
    </div>
    <div class="d-sec-faq-item">
      <h3 class="d-sec-faq-h"><button type="button" class="d-sec-faq-q" aria-expanded="false"><span class="d-sec-faq-qtext">How often do updates ship?</span><span class="d-sec-faq-icon" aria-hidden="true"></span></button></h3>
      <div class="d-sec-faq-panel" role="region"><div class="d-sec-faq-clip"><p class="d-sec-faq-a">A release goes out every other Tuesday with a changelog and a one-line upgrade. Your licence includes 12 months of updates, and anything you’ve already copied keeps working forever.</p></div></div>
    </div>
    <div class="d-sec-faq-item">
      <h3 class="d-sec-faq-h"><button type="button" class="d-sec-faq-q" aria-expanded="false"><span class="d-sec-faq-qtext">Can AI coding agents use the library?</span><span class="d-sec-faq-icon" aria-hidden="true"></span></button></h3>
      <div class="d-sec-faq-panel" role="region"><div class="d-sec-faq-clip"><p class="d-sec-faq-a">Yes. Run <code class="d-sec-faq-code">npx northwind mcp</code> and any MCP-compatible agent can search the catalog, read each component’s rebuild prompt and pull its source and motion tokens into your repo.</p></div></div>
    </div>
    <div class="d-sec-faq-item">
      <h3 class="d-sec-faq-h"><button type="button" class="d-sec-faq-q" aria-expanded="false"><span class="d-sec-faq-qtext">Are the components accessible?</span><span class="d-sec-faq-icon" aria-hidden="true"></span></button></h3>
      <div class="d-sec-faq-panel" role="region"><div class="d-sec-faq-clip"><p class="d-sec-faq-a">Each one works from the keyboard, uses native buttons and ARIA state, respects reduced-motion settings and meets WCAG 2.2 AA contrast. Every release is tested with three screen readers.</p></div></div>
    </div>
    <div class="d-sec-faq-item">
      <h3 class="d-sec-faq-h"><button type="button" class="d-sec-faq-q" aria-expanded="false"><span class="d-sec-faq-qtext">What if it isn’t right for my team?</span><span class="d-sec-faq-icon" aria-hidden="true"></span></button></h3>
      <div class="d-sec-faq-panel" role="region"><div class="d-sec-faq-clip"><p class="d-sec-faq-a">Email us within 30 days of purchase and we refund the full amount: no form, no call, no questions. Most refunds reach your card within five business days.</p></div></div>
    </div>
    <p class="d-sec-faq-more"><span>Can’t find your question?</span><a class="d-sec-faq-more-link" href="#docs">Browse 64 more in the docs<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8h9M8.5 4l4 4-4 4"/></svg></a></p>
  </div>
  <p class="d-sec-faq-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-faq{--fs:var(--fit-scale,1);--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.15);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--q:#cfcfcf;--accent:#fa7319;--ok:#3ecf8e;--card-a:#1b1b1b;--card-b:#161616;--ring:#191919;position:relative;width:100%;height:100%;display:grid;grid-template-columns:280px minmax(0,1fr);gap:48px;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-faq *{box-sizing:border-box}
.d-sec-faq-intro{display:flex;flex-direction:column;min-height:0;padding-top:6px}
.d-sec-faq-eyebrow{margin:0 0 8px;font-size:12px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
.d-sec-faq-title{margin:0;font-size:30px;line-height:34px;font-weight:600;letter-spacing:-.03em}
.d-sec-faq-lede{margin:12px 0 0;font-size:14px;line-height:21px;color:var(--ink-2);text-wrap:pretty}
.d-sec-faq-contact{margin-top:auto;padding:18px;border-radius:14px;background:radial-gradient(90% 60% at 0% 0%,rgba(250,115,25,.08),transparent 70%),linear-gradient(var(--card-a),var(--card-b));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.4)}
.d-sec-faq-who{display:flex;align-items:center;justify-content:space-between;gap:12px}
.d-sec-faq-faces{display:flex;padding-left:6px}
.d-sec-faq-face{display:grid;place-items:center;width:28px;height:28px;margin-left:-6px;border-radius:50%;font-size:11px;font-weight:600;letter-spacing:.02em;color:#e9e9e9;background:linear-gradient(135deg,#3a3a3a,#262626);box-shadow:0 0 0 2px var(--ring),inset 0 1px 0 rgba(255,255,255,.12)}
.d-sec-faq-face:nth-child(2){background:linear-gradient(135deg,#fa7319,#a8430b);color:#fff}
.d-sec-faq-face:nth-child(3){background:linear-gradient(135deg,#4b4b4b,#2e2e2e)}
.d-sec-faq-online{display:flex;align-items:center;gap:6px;font-size:11px;line-height:16px;color:var(--ink-3)}
.d-sec-faq-dot{width:6px;height:6px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 3px rgba(62,207,142,.14)}
.d-sec-faq-contact-title{margin:14px 0 0;font-size:14px;line-height:20px;font-weight:600;letter-spacing:-.01em}
.d-sec-faq-contact-copy{margin:4px 0 0;font-size:12px;line-height:18px;color:var(--ink-3)}
.d-sec-faq-contact-btn{display:inline-flex;align-items:center;gap:6px;height:32px;margin-top:14px;padding:0 12px;border-radius:9px;font-size:13px;font-weight:500;color:var(--ink);text-decoration:none;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.3);transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-contact-btn svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;transition:transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-faq-contact-btn:hover{background:rgba(255,255,255,.1)}.d-sec-faq-contact-btn:hover svg{transform:translateX(2px)}}
.d-sec-faq-list{display:flex;flex-direction:column;min-height:0;overflow:hidden;border-radius:16px;background:linear-gradient(var(--card-a),var(--card-b));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.4),0 24px 48px -32px rgba(0,0,0,.8)}
.d-sec-faq-item{position:relative;transition:background-color var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-item+.d-sec-faq-item::after{content:'';position:absolute;top:0;left:20px;right:20px;height:1px;background:var(--edge)}
.d-sec-faq-item.is-open{background:rgba(255,255,255,.025)}
.d-sec-faq-item::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:2px;border-radius:0 2px 2px 0;background:var(--accent);opacity:0;transform:scaleY(.4);transition:opacity var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-faq-item.is-open::before{opacity:1;transform:none;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-h{margin:0;font:inherit}
.d-sec-faq-q{display:flex;align-items:center;gap:16px;width:100%;min-height:52px;margin:0;padding:0 18px 0 20px;border:0;border-radius:0;background:none;color:var(--q);font:500 14px/20px Geist,system-ui,sans-serif;letter-spacing:-.005em;text-align:left;cursor:pointer;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-item.is-open .d-sec-faq-q{color:var(--ink)}
@media (hover:hover){.d-sec-faq-q:hover{color:var(--ink)}.d-sec-faq-q:hover .d-sec-faq-icon{box-shadow:inset 0 0 0 1px rgba(255,255,255,.24)}}
.d-sec-faq-q:focus-visible,.d-sec-faq-contact-btn:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:-2px}
.d-sec-faq-contact-btn:focus-visible{outline-offset:2px}
.d-sec-faq-qtext{flex:1;min-width:0}
.d-sec-faq-icon{position:relative;flex:none;width:22px;height:22px;border-radius:7px;color:var(--ink-2);background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px var(--edge-hi);transition:transform var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-icon::before,.d-sec-faq-icon::after{content:'';position:absolute;left:6px;top:10.25px;width:10px;height:1.5px;border-radius:1px;background:currentColor;transition:transform var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),opacity var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-faq-icon::after{transform:rotate(90deg)}
.d-sec-faq-item.is-open .d-sec-faq-icon{transform:rotate(180deg);color:var(--accent);background:rgba(250,115,25,.12);box-shadow:inset 0 0 0 1px rgba(250,115,25,.38);transition-duration:var(--dur-fast,250ms);transition-timing-function:var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-item.is-open .d-sec-faq-icon::after{transform:rotate(180deg);transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-faq-item.is-open .d-sec-faq-panel{grid-template-rows:1fr;transition:grid-template-rows var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-clip{min-height:0;overflow:hidden}
.d-sec-faq-a{margin:0;padding:0 64px 18px 20px;font-size:13px;line-height:20px;color:var(--ink-2);text-wrap:pretty;opacity:0;transform:translateY(-4px);transition:opacity var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-faq-item.is-open .d-sec-faq-a{opacity:1;transform:none;transition:opacity 200ms var(--ease-out,cubic-bezier(.22,1,.36,1)) 50ms,transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-code{padding:1px 6px;border-radius:6px;font:500 12px/18px 'Geist Mono',ui-monospace,monospace;color:var(--ink);background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px var(--edge);white-space:nowrap}
.d-sec-faq-more{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;margin:auto 0 0;padding:0 18px 0 20px;font-size:13px;line-height:18px;color:var(--ink-3);background:rgba(0,0,0,.18);box-shadow:inset 0 1px 0 var(--edge)}
.d-sec-faq-more-link{display:inline-flex;align-items:center;gap:6px;border-radius:4px;font-weight:500;color:var(--ink);text-decoration:none;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-faq-more-link svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;transition:transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-faq-more-link:hover{color:#ffa466}.d-sec-faq-more-link:hover svg{transform:translateX(2px)}}
.d-sec-faq-more-link:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-sec-faq-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: the accordion alone, cycling its open answer. */
.d-sec-faq[data-mode="thumb"]{display:block}
.d-sec-faq[data-mode="thumb"] :is(.d-sec-faq-intro,.d-sec-faq-item:nth-child(n+5),.d-sec-faq-more){display:none}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-list{border-radius:14px}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-item+.d-sec-faq-item::after{left:14px;right:14px}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-item::before{top:11px;bottom:11px}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-q{gap:10px;min-height:36px;padding:0 12px 0 14px;font-size:max(12px,calc(11px / var(--fs)));line-height:1.3}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-qtext{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-icon{width:18px;height:18px;border-radius:6px}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-icon::before,.d-sec-faq[data-mode="thumb"] .d-sec-faq-icon::after{left:5px;top:8.25px;width:8px}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-a{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;margin-bottom:10px;padding:0 14px;font-size:max(11px,calc(11px / var(--fs)));line-height:1.45}
.d-sec-faq[data-mode="thumb"] .d-sec-faq-code{font-size:max(11px,calc(10px / var(--fs)));line-height:1.3}
[data-stage-theme="light"] .d-sec-faq{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--q:#333;--edge:rgba(0,0,0,.08);--edge-hi:rgba(0,0,0,.14);--card-a:#fff;--card-b:#fcfcfc;--ring:#fff}
[data-stage-theme="light"] .d-sec-faq-list,[data-stage-theme="light"] .d-sec-faq-contact{box-shadow:inset 0 0 0 1px var(--edge),0 1px 2px rgba(0,0,0,.05),0 20px 40px -30px rgba(0,0,0,.25)}
[data-stage-theme="light"] .d-sec-faq-item.is-open{background:rgba(0,0,0,.02)}
[data-stage-theme="light"] .d-sec-faq-icon{background:#fff}
[data-stage-theme="light"] .d-sec-faq-item.is-open .d-sec-faq-icon{color:#c2530a;background:rgba(250,115,25,.1)}
[data-stage-theme="light"] .d-sec-faq-face:not(:nth-child(2)){color:#fff;background:linear-gradient(135deg,#6b6b6b,#404040)}
[data-stage-theme="light"] .d-sec-faq-more{background:rgba(0,0,0,.025)}
[data-stage-theme="light"] .d-sec-faq-contact-btn{background:#fff;box-shadow:inset 0 0 0 1px var(--edge-hi),0 1px 2px rgba(0,0,0,.06)}
[data-stage-theme="light"] .d-sec-faq-code{background:rgba(0,0,0,.04)}
@media (hover:hover){[data-stage-theme="light"] .d-sec-faq-contact-btn:hover{background:#f6f6f6}}
@media (prefers-reduced-motion:reduce){
.d-sec-faq-panel,.d-sec-faq-item.is-open .d-sec-faq-panel{transition:none}
.d-sec-faq-item.is-open .d-sec-faq-icon,.d-sec-faq-item::before{transform:none}
.d-sec-faq-item.is-open .d-sec-faq-icon::after{transform:rotate(90deg);opacity:0}
.d-sec-faq-icon,.d-sec-faq-item.is-open .d-sec-faq-icon,.d-sec-faq-icon::after,.d-sec-faq-item.is-open .d-sec-faq-icon::after{transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out),color var(--dur-quick,150ms) var(--ease-in-out,ease-in-out),background-color var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-faq-a,.d-sec-faq-item.is-open .d-sec-faq-a{transform:none;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
}`,
  js: String.raw`const C='d-sec-faq',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches,thumb=ctx.mode==='thumb';
root.dataset.mode=ctx.mode;
const uid=C+'-'+Math.random().toString(36).slice(2,8),items=$$('.'+C+'-item'),qs=items.map(n=>n.querySelector('.'+C+'-q')),panels=items.map(n=>n.querySelector('.'+C+'-panel')),live=$('.'+C+'-live');
qs.forEach((q,i)=>{q.id=uid+'-q'+i;panels[i].id=uid+'-a'+i;q.setAttribute('aria-controls',panels[i].id);panels[i].setAttribute('aria-labelledby',q.id);});
let open=0,idle=0,dead=false;
// One answer is open at a time; a closed panel is inert so its text leaves the reading order.
function set(next,announce){open=next;items.forEach((item,i)=>{const on=i===next;item.classList.toggle('is-open',on);qs[i].setAttribute('aria-expanded',String(on));panels[i].inert=!on;});
 if(announce)live.textContent=next<0?'All answers closed.':'Question '+(next+1)+' of '+items.length+' open: '+qs[next].textContent.trim();}
function stopIdle(){clearInterval(idle);idle=0;}
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
qs.forEach((q,i)=>{
 on(q,'click',()=>{stopIdle();set(open===i?-1:i,false);});
 on(q,'keydown',e=>{const last=qs.length-1;let to=-1;
  if(e.key==='ArrowDown')to=i===last?0:i+1;else if(e.key==='ArrowUp')to=i===0?last:i-1;else if(e.key==='Home')to=0;else if(e.key==='End')to=last;else return;
  e.preventDefault();qs[to].focus();});
});
root.querySelectorAll('a[href^="#"]').forEach(a=>on(a,'click',e=>e.preventDefault()));
const visible=()=>thumb?4:items.length;
ctx.onAction('next',()=>{stopIdle();set((open+1)%visible(),true);});
const fit=()=>root.style.setProperty('--fit-scale',String(ctx.scale||1));
const ro=new ResizeObserver(fit);ro.observe(stage);fit();
set(0,false);
// Thumbnails cycle the open answer until a control is pressed.
if(thumb&&!reduced)idle=setInterval(()=>{if(!dead)set((open+1)%visible(),false);},2600);
return()=>{dead=true;stopIdle();abort.abort();ro.disconnect();};`,
  prompt: `Build an FAQ section in plain HTML, CSS and JavaScript with no libraries. Use a two-column grid: a 280px intro column and the accordion, 48px apart. The intro has an orange 12px uppercase eyebrow ("FAQ"), a 30px/600 heading with -0.03em tracking ("Questions, answered"), a 14px lede in grey, and, pinned to the bottom with margin-top:auto, a contact card: three overlapping 28px initials avatars (PA, JL, WT, the middle one orange) beside a green dot and "3 engineers online", the title "Still stuck? Talk to an engineer", "Replies come from the people who build the components, usually within three hours." and a small secondary button "Start a conversation" whose arrow nudges 2px on hover. The accordion is one 16px-radius surface built from inset hairlines that stretches to the full section height so its bottom edge lines up with the contact card; it ends with a darker 48px row ("Can't find your question?" and a "Browse 64 more in the docs" link pushed down with margin-top:auto). Above it sit six 52px rows separated by inset 1px lines: Can I use the components in client work? / Which frameworks do you support? / How often do updates ship? / Can AI coding agents use the library? (the answer shows npx northwind mcp as inline mono code) / Are the components accessible? / What if it isn't right for my team? Each answer is specific (unlimited client projects but no resale; plain HTML plus React 19 and Vue 3, Svelte 5 for 38 of 140; a release every other Tuesday with 12 months of updates; MCP search and rebuild prompts; WCAG 2.2 AA and three screen readers; a full refund within 30 days). Each header is a real button inside an h3 with aria-expanded and aria-controls pointing at a role=region panel; ids are generated at runtime. Only one answer is open; opening animates the panel's grid-template-rows from 0fr to 1fr in 250ms cubic-bezier(0.22, 1, 0.36, 1) and closing takes 150ms cubic-bezier(0.4, 0, 0.2, 1). The answer fades in over 200ms after 50ms while rising 4px. The 22px plus icon is two 1.5px bars; opening rotates the icon 180deg and turns the vertical bar flat so it becomes an orange minus on an orange-tinted chip, and a 2px orange bar appears at the row's left edge. Closed panels are inert. ArrowUp and ArrowDown move focus between headers (wrapping), Home and End jump to the ends. A Dock control, Next question, opens the following item and announces it in a polite live region. The thumbnail shows only the first four rows with ellipsised questions and a two-line answer, cycling the open item every 2.6s. Under prefers-reduced-motion the panels open instantly, the icon swaps without rotating and the answer cross-fades in 150ms.`
});
