/* Footer Reveal: an original INTRX section. The last block of a mini page lifts away to reveal a sticky footer underneath. */
INTRX.register({
  id: 'section-footer-reveal',
  title: 'Footer Reveal',
  cat: 'FAQ, CTA & Footer',
  rootClass: 'd-sec-foot',
  tags: ['footer', 'sticky footer', 'reveal', 'scroll', 'cta', 'section', 'landing page'],
  libs: [],
  desc: 'The closing call to action of a page lifts away as you scroll, uncovering a sticky footer underneath: link columns, a live status pill and a huge wordmark clipped at the bottom edge.',
  seen: 'Seen on: the curtain-style footers at the end of developer-tool and studio landing pages',
  hint: 'Scroll · scroll the mini page (or use Page Down, Space and the arrow keys) to uncover the footer',
  html: String.raw`<section class="d-sec-foot" aria-label="Footer reveal">
  <div class="d-sec-foot-scroller" tabindex="0" role="region" aria-label="Page preview. Scroll to reveal the footer.">
    <div class="d-sec-foot-main">
      <div class="d-sec-foot-proof">
        <p class="d-sec-foot-proof-label">Northwind UI in numbers</p>
        <dl class="d-sec-foot-stats">
          <div class="d-sec-foot-stat"><dt>Components</dt><dd>140</dd></div>
          <div class="d-sec-foot-stat"><dt>Between releases</dt><dd>14<small>days</small></dd></div>
          <div class="d-sec-foot-stat"><dt>From 2,300 reviews</dt><dd>4.9<small>/ 5</small></dd></div>
          <div class="d-sec-foot-stat"><dt>Runtime dependencies</dt><dd>0</dd></div>
        </dl>
      </div>
      <div class="d-sec-foot-cta">
        <img class="d-sec-foot-photo" src="{{asset:photo-silk}}" alt="" draggable="false">
        <div class="d-sec-foot-cta-copy">
          <p class="d-sec-foot-kicker"><span class="d-sec-foot-new">New</span>Northwind UI 4.2 adds 18 sections</p>
          <h2 class="d-sec-foot-cta-title">Ship your next interface this week</h2>
          <p class="d-sec-foot-cta-text">140 components in plain HTML, React and Vue. Start free and upgrade when your team grows.</p>
          <div class="d-sec-foot-actions"><a class="d-sec-foot-btn d-sec-foot-btn--accent" href="#start">Start building</a><a class="d-sec-foot-btn" href="#demo">Book a demo</a></div>
        </div>
      </div>
    </div>
    <footer class="d-sec-foot-footer">
      <div class="d-sec-foot-inner">
        <div class="d-sec-foot-top">
          <div class="d-sec-foot-brand">
            <a class="d-sec-foot-logo" href="#home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2 5.2 20l6.8-3.7z" fill="#fa7319"/><path d="M12 3.2 18.8 20 12 16.3z" fill="#ffc499"/></svg>Northwind</a>
            <p class="d-sec-foot-tag">Interface components for teams who ship on Fridays.</p>
            <a class="d-sec-foot-status" href="#status"><span class="d-sec-foot-dot" aria-hidden="true"></span>All systems normal</a>
          </div>
          <nav class="d-sec-foot-cols" aria-label="Footer">
            <div class="d-sec-foot-col"><p class="d-sec-foot-h">Product</p><ul><li><a href="#components">Components</a></li><li><a href="#sections">Sections</a></li><li><a href="#templates">Templates</a></li><li><a href="#changelog">Changelog</a></li></ul></div>
            <div class="d-sec-foot-col"><p class="d-sec-foot-h">Developers</p><ul><li><a href="#docs">Docs</a></li><li><a href="#cli">CLI</a></li><li><a href="#mcp">MCP server</a></li><li><a href="#api">Status API</a></li></ul></div>
            <div class="d-sec-foot-col"><p class="d-sec-foot-h">Company</p><ul><li><a href="#about">About</a></li><li><a href="#customers">Customers</a></li><li><a href="#careers">Careers <span class="d-sec-foot-badge">4 open</span></a></li><li><a href="#brand">Brand</a></li></ul></div>
            <div class="d-sec-foot-col"><p class="d-sec-foot-h">Legal</p><ul><li><a href="#privacy">Privacy</a></li><li><a href="#terms">Terms</a></li><li><a href="#licence">Licence</a></li><li><a href="#security">Security</a></li></ul></div>
          </nav>
        </div>
        <div class="d-sec-foot-legal"><span>© 2026 Northwind Labs, Inc.</span><span>Made in Lisbon and Toronto</span><button type="button" class="d-sec-foot-up">Back to top<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 12.5v-9M4 7.5l4-4 4 4"/></svg></button></div>
      </div>
      <p class="d-sec-foot-word" aria-hidden="true">northwind</p>
    </footer>
  </div>
  <p class="d-sec-foot-hint" aria-hidden="true"><span class="d-sec-foot-wheel"></span>Scroll to reveal</p>
  <p class="d-sec-foot-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-foot{--fs:var(--fit-scale,1);--lift:0;--reveal:0;--p:0;--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.15);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--accent:#fa7319;--ok:#3ecf8e;--page:#161616;--under:#0b0b0b;--foot-h:396px;position:relative;width:100%;height:100%;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-foot *{box-sizing:border-box}
.d-sec-foot-scroller{position:absolute;inset:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;border-radius:16px;background:var(--under);outline:none}
.d-sec-foot-scroller::-webkit-scrollbar{display:none}
.d-sec-foot::after{content:'';position:absolute;inset:0;z-index:2;border-radius:16px;box-shadow:inset 0 0 0 1px var(--edge);pointer-events:none}
.d-sec-foot-scroller:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
/* The page sheet sits above the footer and shrinks back from its top edge as the footer is revealed. */
.d-sec-foot-main{position:relative;z-index:1;overflow:hidden;transform-origin:50% 0;transform:scale(calc(1 - var(--lift) * .05));border-radius:16px 16px calc(var(--lift) * 28px) calc(var(--lift) * 28px);box-shadow:0 calc(var(--lift) * 26px) 50px -18px rgba(0,0,0,calc(var(--lift) * .9))}
.d-sec-foot-proof{display:flex;flex-direction:column;gap:14px;padding:24px 40px 22px;background:var(--page)}
.d-sec-foot-proof-label{margin:0;font-size:12px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
.d-sec-foot-stats{display:grid;grid-template-columns:repeat(4,1fr);margin:0}
.d-sec-foot-stat{display:flex;flex-direction:column-reverse;gap:2px;padding-left:20px;box-shadow:inset 1px 0 0 var(--edge)}
.d-sec-foot-stat:first-child{padding-left:0;box-shadow:none}
.d-sec-foot-stat dt{font-size:12px;line-height:16px;color:var(--ink-3)}
.d-sec-foot-stat dd{display:flex;align-items:baseline;gap:4px;margin:0;font-size:28px;line-height:34px;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.d-sec-foot-stat small{font-size:13px;font-weight:500;letter-spacing:0;color:var(--ink-3)}
.d-sec-foot-cta{position:relative;height:320px;overflow:hidden;background:#0e0e0e}
.d-sec-foot-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%;opacity:.7;user-select:none;pointer-events:none}
.d-sec-foot-cta::before{content:'';position:absolute;inset:0;z-index:1;background:radial-gradient(70% 90% at 92% 110%,rgba(250,115,25,.32),rgba(250,115,25,0) 70%),linear-gradient(90deg,rgba(11,11,11,.96) 0%,rgba(11,11,11,.82) 45%,rgba(11,11,11,.3) 100%)}
.d-sec-foot-cta::after{content:'';position:absolute;left:0;right:0;top:0;z-index:1;height:1px;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.14),rgba(255,255,255,0))}
.d-sec-foot-cta-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;padding:44px 40px 0}
.d-sec-foot-kicker{display:flex;align-items:center;gap:8px;margin:0;padding:3px 10px 3px 3px;border-radius:999px;font-size:12px;line-height:18px;color:var(--ink-2);background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px var(--edge-hi);backdrop-filter:blur(6px)}
.d-sec-foot-new{padding:0 7px;border-radius:999px;font-size:11px;font-weight:600;line-height:18px;color:#1a0d03;background:var(--accent)}
.d-sec-foot-cta-title{max-width:520px;margin:18px 0 0;font-size:40px;line-height:44px;font-weight:600;letter-spacing:-.035em;text-wrap:balance}
.d-sec-foot-cta-text{max-width:420px;margin:12px 0 0;font-size:14px;line-height:21px;color:#b8b8b8}
.d-sec-foot-actions{display:flex;gap:10px;margin-top:24px}
.d-sec-foot-btn{display:inline-flex;align-items:center;height:38px;padding:0 16px;border-radius:10px;font-size:13px;font-weight:500;color:var(--ink);text-decoration:none;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 0 rgba(255,255,255,.06);backdrop-filter:blur(6px);transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-pop,cubic-bezier(.34,1.36,.64,1))}
.d-sec-foot-btn:active{transform:scale(.97);transition-duration:var(--dur-micro,80ms)}
.d-sec-foot-btn--accent{color:#1a0d03;background:var(--accent);box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 1px 2px rgba(0,0,0,.4),0 10px 24px -12px rgba(250,115,25,.7)}
@media (hover:hover){.d-sec-foot-btn:hover{background:rgba(255,255,255,.12)}.d-sec-foot-btn--accent:hover{background:#ff8636}}
.d-sec-foot-btn:focus-visible,.d-sec-foot-logo:focus-visible,.d-sec-foot-status:focus-visible,.d-sec-foot-col a:focus-visible,.d-sec-foot-up:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
/* The footer is sticky to the bottom of the scroller, so it waits under the page until the page moves off it. */
.d-sec-foot-footer{position:sticky;bottom:0;z-index:0;height:var(--foot-h);overflow:hidden;background:radial-gradient(60% 50% at 50% 100%,rgba(250,115,25,calc(var(--reveal) * .1)),rgba(250,115,25,0)),var(--under)}
.d-sec-foot-inner{position:relative;z-index:1;padding:40px 40px 0;transform-origin:50% 100%;transform:translateY(calc((1 - var(--reveal)) * 28px)) scale(calc(.95 + var(--reveal) * .05));opacity:calc(.3 + var(--reveal) * .7)}
.d-sec-foot-top{display:grid;grid-template-columns:240px 1fr;gap:32px}
.d-sec-foot-logo{display:inline-flex;align-items:center;gap:8px;border-radius:6px;font-size:15px;line-height:20px;font-weight:600;letter-spacing:-.02em;color:var(--ink);text-decoration:none}
.d-sec-foot-logo svg{width:20px;height:20px}
.d-sec-foot-tag{max-width:220px;margin:10px 0 0;font-size:13px;line-height:19px;color:var(--ink-3)}
.d-sec-foot-status{display:inline-flex;align-items:center;gap:8px;height:26px;margin-top:16px;padding:0 10px 0 9px;border-radius:999px;font-size:12px;line-height:16px;color:#c9c9c9;text-decoration:none;background:rgba(62,207,142,.06);box-shadow:inset 0 0 0 1px rgba(62,207,142,.22);transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-foot-status:hover{background:rgba(62,207,142,.1)}}
.d-sec-foot-dot{position:relative;width:7px;height:7px;border-radius:50%;background:var(--ok)}
.d-sec-foot-dot::after{content:'';position:absolute;inset:0;border-radius:50%;background:var(--ok);animation:d-sec-foot-ping 2.4s var(--ease-out,cubic-bezier(.22,1,.36,1)) infinite}
@keyframes d-sec-foot-ping{0%{transform:scale(1);opacity:.6}70%,100%{transform:scale(2.8);opacity:0}}
.d-sec-foot-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.d-sec-foot-h{margin:0 0 12px;font-size:12px;line-height:16px;font-weight:500;color:var(--ink)}
.d-sec-foot-col ul{display:flex;flex-direction:column;gap:9px;margin:0;padding:0;list-style:none}
.d-sec-foot-col a{display:inline-flex;align-items:center;gap:6px;border-radius:4px;font-size:13px;line-height:18px;color:var(--ink-3);text-decoration:none;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-foot-col a:hover,.d-sec-foot-logo:hover{color:var(--ink)}}
.d-sec-foot-badge{padding:0 6px;border-radius:999px;font-size:11px;line-height:16px;color:#ffb27a;background:rgba(250,115,25,.12);box-shadow:inset 0 0 0 1px rgba(250,115,25,.28)}
.d-sec-foot-legal{display:flex;align-items:center;gap:24px;margin-top:30px;padding-top:16px;font-size:12px;line-height:16px;color:#7a7a7a;box-shadow:inset 0 1px 0 var(--edge)}
.d-sec-foot-up{display:inline-flex;align-items:center;gap:6px;margin:0 0 0 auto;padding:0;border:0;border-radius:4px;background:none;color:var(--ink-2);font:inherit;cursor:pointer;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-foot-up svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
@media (hover:hover){.d-sec-foot-up:hover{color:var(--ink)}}
.d-sec-foot-word{position:absolute;left:0;right:0;bottom:0;margin:0;font-size:188px;line-height:.78;font-weight:600;letter-spacing:-.06em;text-align:center;white-space:nowrap;color:transparent;background:linear-gradient(180deg,rgba(255,255,255,.2),rgba(255,255,255,.02) 78%);-webkit-background-clip:text;background-clip:text;transform:translateY(calc(22% + (1 - var(--reveal)) * 30%));user-select:none;pointer-events:none}
.d-sec-foot-hint{position:absolute;right:20px;bottom:20px;z-index:3;display:flex;align-items:center;gap:8px;margin:0;padding:6px 12px 6px 10px;border-radius:999px;font-size:12px;line-height:16px;color:#d4d4d4;background:rgba(20,20,20,.72);box-shadow:inset 0 0 0 1px var(--edge-hi),0 8px 20px -10px rgba(0,0,0,.8);backdrop-filter:blur(8px);opacity:calc(1 - var(--p) * 5);pointer-events:none}
.d-sec-foot-wheel{position:relative;width:12px;height:18px;border-radius:6px;box-shadow:inset 0 0 0 1.5px #a3a3a3}
.d-sec-foot-wheel::after{content:'';position:absolute;left:5px;top:4px;width:2px;height:4px;border-radius:1px;background:#e5e5e5;animation:d-sec-foot-wheel 1.6s var(--ease-out,cubic-bezier(.22,1,.36,1)) infinite}
@keyframes d-sec-foot-wheel{0%{transform:translateY(0);opacity:1}70%,100%{transform:translateY(6px);opacity:0}}
.d-sec-foot-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: a compact page whose CTA lifts off a smaller footer. */
.d-sec-foot[data-mode="thumb"]{--foot-h:144px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-scroller,.d-sec-foot[data-mode="thumb"]::after{border-radius:14px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-main{border-radius:14px 14px calc(var(--lift) * 20px) calc(var(--lift) * 20px)}
.d-sec-foot[data-mode="thumb"] :is(.d-sec-foot-proof,.d-sec-foot-cta-text,.d-sec-foot-btn:not(.d-sec-foot-btn--accent),.d-sec-foot-tag,.d-sec-foot-legal,.d-sec-foot-col:nth-child(n+4),.d-sec-foot-col li:nth-child(n+4),.d-sec-foot-badge,.d-sec-foot-hint){display:none}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-top{display:block}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-brand{display:flex;align-items:center;justify-content:space-between}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-cta{display:flex;flex-direction:column;justify-content:flex-end;height:200px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-cta-copy{padding:0 18px 14px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-kicker{gap:6px;padding:2px 8px 2px 2px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-new{font-size:max(11px,calc(10px / var(--fs)))}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-cta-title{max-width:240px;margin-top:12px;font-size:22px;line-height:25px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-actions{margin-top:14px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-btn{height:30px;padding:0 12px;font-size:max(12px,calc(11px / var(--fs)));border-radius:8px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-inner{padding:14px 18px 0}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-logo{font-size:13px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-logo svg{width:16px;height:16px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-status{height:22px;margin-top:0;padding:0 8px 0 7px;gap:6px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-dot{width:6px;height:6px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-cols{grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-h{margin-bottom:6px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-col ul{gap:3px}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-col a{font-size:max(11px,calc(11px / var(--fs)));line-height:1.3}
.d-sec-foot[data-mode="thumb"] .d-sec-foot-word{font-size:76px;transform:translateY(calc(36% + (1 - var(--reveal)) * 30%))}
[data-stage-theme="light"] .d-sec-foot{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--edge:rgba(0,0,0,.08);--edge-hi:rgba(0,0,0,.14);--page:#fff;--under:#efefef}
[data-stage-theme="light"] .d-sec-foot-cta{--ink:#f2f2f2;--ink-2:#b8b8b8;--edge-hi:rgba(255,255,255,.15);color:#f2f2f2}
[data-stage-theme="light"] .d-sec-foot-main{box-shadow:0 calc(var(--lift) * 26px) 50px -18px rgba(0,0,0,calc(var(--lift) * .35))}
[data-stage-theme="light"] .d-sec-foot-status{color:#3d3d3d;background:rgba(31,168,102,.08);box-shadow:inset 0 0 0 1px rgba(31,168,102,.28)}
[data-stage-theme="light"] .d-sec-foot-legal{color:#6b6b6b}
[data-stage-theme="light"] .d-sec-foot-badge{color:#b14b07}
[data-stage-theme="light"] .d-sec-foot-word{background:linear-gradient(180deg,rgba(0,0,0,.16),rgba(0,0,0,.01) 78%);-webkit-background-clip:text;background-clip:text}
[data-stage-theme="light"] .d-sec-foot-hint{color:#2b2b2b;background:rgba(255,255,255,.85)}
[data-stage-theme="light"] .d-sec-foot-wheel{box-shadow:inset 0 0 0 1.5px #6b6b6b}
[data-stage-theme="light"] .d-sec-foot-wheel::after{background:#2b2b2b}
@media (prefers-reduced-motion:reduce){
.d-sec-foot *,.d-sec-foot *::before,.d-sec-foot *::after{animation:none!important}
.d-sec-foot-btn:active{transform:none}
}`,
  js: String.raw`const C='d-sec-foot',$=s=>root.querySelector(s);
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches,thumb=ctx.mode==='thumb';
root.dataset.mode=ctx.mode;
const sc=$('.'+C+'-scroller'),main=$('.'+C+'-main'),foot=$('.'+C+'-footer'),live=$('.'+C+'-live');
let frame=0,tween=0,auto=0,dead=false,lastP=-1;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),range=()=>Math.max(0,sc.scrollHeight-sc.clientHeight);
const inOut=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
// Reveal progress: 0 while the page still covers the footer, 1 once the footer is fully uncovered.
function progress(){const start=main.offsetHeight-sc.clientHeight;return clamp((sc.scrollTop-start)/Math.max(1,foot.offsetHeight),0,1);}
function update(){frame=0;const p=progress();if(Math.abs(p-lastP)<.0005)return;lastP=p;
 root.style.setProperty('--p',p.toFixed(4));
 // Reduced motion keeps a plain scroll: no lift, no scaling, the footer at full strength.
 const still=reduced&&!thumb;
 root.style.setProperty('--lift',still?'0':p.toFixed(4));
 root.style.setProperty('--reveal',still?'1':(1-(1-p)*(1-p)).toFixed(4));
 root.dataset.revealed=String(p>.98);}
const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
function stopTween(){cancelAnimationFrame(tween);tween=0;}
function stopAuto(){cancelAnimationFrame(auto);auto=0;}
function scrollToY(y,done){stopTween();if(reduced){sc.scrollTop=y;update();if(done)done();return;}
 const from=sc.scrollTop,dist=y-from,dur=clamp(Math.abs(dist)*2.4,500,1100);let start=null;
 const step=t=>{if(dead)return;if(start===null)start=t;const k=Math.min(1,(t-start)/dur);sc.scrollTop=from+dist*inOut(k);update();if(k<1)tween=requestAnimationFrame(step);else{tween=0;if(done)done();}};
 tween=requestAnimationFrame(step);}
const abort=new AbortController(),on=(n,e,f,o)=>n.addEventListener(e,f,Object.assign({signal:abort.signal},o||{}));
on(sc,'scroll',request,{passive:true});
['wheel','pointerdown','touchstart','keydown'].forEach(name=>on(sc,name,()=>{stopTween();stopAuto();},{passive:true}));
root.querySelectorAll('a[href^="#"]').forEach(a=>on(a,'click',e=>e.preventDefault()));
on($('.'+C+'-up'),'click',()=>scrollToY(0,()=>{live.textContent='Back at the top of the page.';sc.focus({preventScroll:true});}));
ctx.onAction('scroll',()=>{stopAuto();const down=sc.scrollTop<range()-4;
 scrollToY(down?range():0,()=>{live.textContent=down?'Footer revealed.':'Back at the top of the page.';});});
const fit=()=>{root.style.setProperty('--fit-scale',String(ctx.scale||1));lastP=-1;update();};
const ro=new ResizeObserver(fit);ro.observe(stage);ro.observe(sc);fit();
// Thumbnails scroll slowly down to the footer and back; reduced motion holds one revealing frame.
if(thumb&&reduced){sc.scrollTop=range();update();}
else if(thumb){let t0=null;const CYCLE=7600;
 const story=t=>{const r=range();if(t<1000)return 0;if(t<3600)return r*inOut((t-1000)/2600);if(t<5200)return r;if(t<7000)return r*(1-inOut((t-5200)/1800));return 0;};
 const loop=now=>{if(dead)return;if(t0===null)t0=now;sc.scrollTop=story((now-t0)%CYCLE);update();auto=requestAnimationFrame(loop);};
 auto=requestAnimationFrame(loop);}
return()=>{dead=true;cancelAnimationFrame(frame);stopTween();stopAuto();abort.abort();ro.disconnect();};`,
  prompt: `Build a footer-reveal section in plain HTML, CSS and JavaScript with no libraries. Inside the section put a mini page: a scroll container (overflow-y auto, hidden scrollbar, 16px radius, tabindex="0", role="region", aria-label "Page preview. Scroll to reveal the footer.") holding two children. The first is the page sheet (position:relative; z-index:1): a stats strip ("Northwind UI in numbers": 140 components, 14 days between releases, 4.9 / 5 from 2,300 reviews, 0 runtime dependencies, 28px/600 tabular figures divided by 1px inset hairlines) and a 320px call-to-action band over a dark licensed photo darkened by a left-to-right gradient with a soft orange glow in the bottom-right corner: a pill "New · Northwind UI 4.2 adds 18 sections", the 40px/600 heading "Ship your next interface this week", one line of copy and two buttons, "Start building" (orange) and "Book a demo". The second child is the footer (position:sticky; bottom:0; z-index:0; 396px tall, near-black), so it waits under the page and is uncovered as the page scrolls off it. It holds the brand with a two-tone arrow mark, a tagline, a status pill with a pinging green dot ("All systems normal"), four link columns (Product, Developers, Company with a "4 open" badge on Careers, Legal), a legal row with "Back to top", and a 188px lowercase wordmark "northwind" filled with a white-to-transparent gradient and clipped by the footer's bottom edge. Compute progress p = clamp((scrollTop − (sheetHeight − viewportHeight)) / footerHeight, 0, 1) in a requestAnimationFrame-throttled scroll handler and write it to CSS variables, never with transitions: the sheet scales to 1 − 0.05p from its top edge, its bottom corners round to 28p px and its shadow deepens; the footer content rises 28px and scales from 0.95 to 1 while its opacity goes from 0.3 to 1 (eased with 1 − (1 − p)²); the wordmark rises from 52% to 22% below the edge. A "Scroll to reveal" pill with a wheel cue sits in the bottom-right corner and fades out in the first 20% of progress; a 1px inset outline drawn above the content keeps the 16px viewport edge visible. The Dock's Scroll control eases the container to the footer and, pressed again, back to the top over 500 to 1100ms with an ease-in-out cubic; wheel, touch or keys cancel it, and the footer's own "Back to top" does the same. Page Down, Space and the arrow keys scroll natively once the container has focus. The thumbnail is a compact version (200px CTA with its copy at the bottom, 144px footer with the brand row, three link columns and a 76px wordmark) that scrolls down to the footer and back on a 7.6s loop. Under prefers-reduced-motion the page scrolls plainly with no scaling or lifting and the footer is shown at full strength; the thumbnail holds the fully revealed frame.`
});
