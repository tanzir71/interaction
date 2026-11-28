/* Pricing Toggle: an original INTRX section. Three plans, a monthly/yearly toggle and prices that roll digit by digit. */
INTRX.register({
  id: 'section-pricing',
  title: 'Pricing Toggle',
  cat: 'Pricing',
  rootClass: 'd-sec-price',
  tags: ['pricing', 'section', 'toggle', 'number roll', 'landing page', 'plans'],
  libs: [],
  desc: 'A three-plan pricing section with a monthly and yearly toggle. Prices roll digit by digit to the new amount, the billing note follows, and the featured plan carries an accent edge.',
  seen: 'Seen on: SaaS pricing pages from Linear, Vercel and Raycast, and most developer-tool launches',
  hint: 'Press · switch Monthly and Yearly; each price rolls digit by digit to its new amount',
  html: String.raw`<section class="d-sec-price" aria-labelledby="d-sec-price-title">
  <header class="d-sec-price-head">
    <div class="d-sec-price-intro">
      <p class="d-sec-price-eyebrow">Pricing</p>
      <h2 class="d-sec-price-title" id="d-sec-price-title">Plans that grow with your team</h2>
    </div>
    <div class="d-sec-price-toggle" role="group" aria-label="Billing period">
      <span class="d-sec-price-thumb" aria-hidden="true"></span>
      <button type="button" class="d-sec-price-period" data-period="monthly" aria-pressed="true">Monthly</button>
      <button type="button" class="d-sec-price-period" data-period="yearly" aria-pressed="false">Yearly <span class="d-sec-price-save">−20%</span></button>
    </div>
  </header>
  <div class="d-sec-price-plans">
    <article class="d-sec-price-plan" data-plan="hobby">
      <h3 class="d-sec-price-name">Hobby</h3>
      <p class="d-sec-price-for">For side projects and learning</p>
      <p class="d-sec-price-amount"><span class="d-sec-price-sr"></span><span class="d-sec-price-cur" aria-hidden="true">$</span><span class="d-sec-price-digits" aria-hidden="true"></span><span class="d-sec-price-per" aria-hidden="true">/mo</span></p>
      <p class="d-sec-price-note">Free forever</p>
      <a class="d-sec-price-cta" href="#start">Start free</a>
      <ul class="d-sec-price-list"><li>3 projects</li><li>All free components</li><li>Prompt export</li></ul>
    </article>
    <article class="d-sec-price-plan d-sec-price-plan--pro" data-plan="pro">
      <span class="d-sec-price-badge">Most popular</span>
      <h3 class="d-sec-price-name">Pro</h3>
      <p class="d-sec-price-for">For designers and engineers who ship</p>
      <p class="d-sec-price-amount"><span class="d-sec-price-sr"></span><span class="d-sec-price-cur" aria-hidden="true">$</span><span class="d-sec-price-digits" aria-hidden="true"></span><span class="d-sec-price-per" aria-hidden="true">/mo</span></p>
      <p class="d-sec-price-note">Billed monthly</p>
      <a class="d-sec-price-cta d-sec-price-cta--accent" href="#upgrade">Upgrade to Pro</a>
      <ul class="d-sec-price-list"><li>Unlimited projects</li><li>Full source and React ports</li><li>MCP server access</li><li>Priority updates</li></ul>
    </article>
    <article class="d-sec-price-plan" data-plan="team">
      <h3 class="d-sec-price-name">Team</h3>
      <p class="d-sec-price-for">For studios of up to ten seats</p>
      <p class="d-sec-price-amount"><span class="d-sec-price-sr"></span><span class="d-sec-price-cur" aria-hidden="true">$</span><span class="d-sec-price-digits" aria-hidden="true"></span><span class="d-sec-price-per" aria-hidden="true">/mo</span></p>
      <p class="d-sec-price-note">Billed monthly</p>
      <a class="d-sec-price-cta" href="#sales">Contact sales</a>
      <ul class="d-sec-price-list"><li>Everything in Pro</li><li>Shared collections</li><li>Seat management</li><li>Invoice billing</li></ul>
    </article>
  </div>
  <p class="d-sec-price-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-price{--fs:var(--fit-scale,1);--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.16);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--accent:#fa7319;position:relative;width:100%;height:100%;display:flex;flex-direction:column;gap:22px;padding:4px;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-price *{box-sizing:border-box}
.d-sec-price-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.d-sec-price-eyebrow{margin:0 0 6px;font-size:12px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
.d-sec-price-title{margin:0;font-size:28px;line-height:32px;font-weight:600;letter-spacing:-.025em}
.d-sec-price-toggle{position:relative;display:flex;padding:3px;border-radius:999px;background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px var(--edge)}
.d-sec-price-thumb{position:absolute;top:3px;bottom:3px;left:0;width:0;border-radius:999px;background:#2b2b2b;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 1px 2px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.08);transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),width var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-price-period{position:relative;z-index:1;display:flex;align-items:center;gap:6px;height:30px;padding:0 14px;border:0;border-radius:999px;background:none;color:var(--ink-2);font:500 13px/1 Geist,system-ui,sans-serif;cursor:pointer;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-price-period[aria-pressed="true"]{color:var(--ink)}
.d-sec-price-period:focus-visible,.d-sec-price-cta:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-sec-price-save{font-size:11px;line-height:16px;padding:0 6px;border-radius:999px;background:rgba(250,115,25,.14);color:#ffa466}
.d-sec-price-plans{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;min-height:0}
.d-sec-price-plan{position:relative;display:flex;flex-direction:column;padding:20px;border-radius:16px;background:linear-gradient(#1b1b1b,#161616);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.4);transition:transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-price-plan:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 0 rgba(255,255,255,.07),0 12px 28px -12px rgba(0,0,0,.7)}}
.d-sec-price-plan--pro{background:radial-gradient(120% 70% at 50% -10%,rgba(250,115,25,.16),transparent 60%),linear-gradient(#1e1e1e,#171717);box-shadow:inset 0 0 0 1px rgba(250,115,25,.38),inset 0 1px 0 rgba(255,190,140,.14),0 18px 40px -18px rgba(250,115,25,.35)}
@media (hover:hover){.d-sec-price-plan--pro:hover{box-shadow:inset 0 0 0 1px rgba(250,115,25,.55),inset 0 1px 0 rgba(255,190,140,.18),0 22px 44px -18px rgba(250,115,25,.45)}}
.d-sec-price-badge{position:absolute;top:18px;right:18px;font-size:11px;line-height:20px;padding:0 8px;border-radius:999px;color:#ffb27a;background:rgba(250,115,25,.12);box-shadow:inset 0 0 0 1px rgba(250,115,25,.3)}
.d-sec-price-name{margin:0;font-size:15px;line-height:20px;font-weight:600}
.d-sec-price-for{margin:4px 0 0;font-size:12px;line-height:17px;color:var(--ink-3)}
.d-sec-price-amount{display:flex;align-items:flex-start;margin:16px 0 0;height:44px;font-weight:600;letter-spacing:-.03em}
.d-sec-price-cur{font-size:20px;line-height:28px;margin-right:2px;color:var(--ink-2);transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-price-digits{display:flex;height:44px;overflow:hidden;font-size:40px;line-height:44px}
.d-sec-price-digit{display:block;width:.6em;height:44px;overflow:hidden;text-align:center}
.d-sec-price-strip{display:flex;flex-direction:column;transform:translateY(calc(var(--d,0) * -44px));transition:transform var(--dur-slow,400ms) var(--ease-step,cubic-bezier(.35,-.02,.43,1));transition-delay:var(--delay,0ms)}
.d-sec-price-strip span{display:block;height:44px}
.d-sec-price-per{align-self:flex-end;margin:0 0 6px 4px;font-size:13px;line-height:16px;font-weight:400;letter-spacing:0;color:var(--ink-3)}
.d-sec-price-note{margin:4px 0 0;min-height:17px;font-size:12px;line-height:17px;color:var(--ink-3);transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-price-note.is-swap,.d-sec-price-cur.is-swap{opacity:0}
.d-sec-price-cta{display:flex;align-items:center;justify-content:center;height:34px;margin-top:16px;border-radius:10px;font-size:13px;font-weight:500;line-height:1;text-decoration:none;color:var(--ink);background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px var(--edge-hi);transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-price-cta:hover{background:rgba(255,255,255,.1)}}
.d-sec-price-cta--accent{color:#1a0d03;background:var(--accent);box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 1px 2px rgba(0,0,0,.4)}
@media (hover:hover){.d-sec-price-cta--accent:hover{background:#ff8636}}
.d-sec-price-list{display:flex;flex-direction:column;gap:9px;margin:18px 0 0;padding:16px 0 0;list-style:none;border-top:1px solid var(--edge);font-size:12px;line-height:16px;color:#c4c4c4}
.d-sec-price-list li{display:flex;align-items:center;gap:8px}
.d-sec-price-list li::before{content:'';flex:none;width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,.06) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M4.2 7.2l1.8 1.8 3.8-4' fill='none' stroke='%23d4d4d4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/14px no-repeat}
.d-sec-price-plan--pro .d-sec-price-list li::before{background-color:rgba(250,115,25,.16);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M4.2 7.2l1.8 1.8 3.8-4' fill='none' stroke='%23ffa466' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
.d-sec-price-sr,.d-sec-price-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: the toggle above the Pro card. */
.d-sec-price[data-mode="thumb"]{gap:12px;padding:0}
.d-sec-price[data-mode="thumb"] .d-sec-price-intro,.d-sec-price[data-mode="thumb"] .d-sec-price-for,.d-sec-price[data-mode="thumb"] [data-plan="hobby"],.d-sec-price[data-mode="thumb"] [data-plan="team"],.d-sec-price[data-mode="thumb"] .d-sec-price-list,.d-sec-price[data-mode="thumb"] .d-sec-price-cta{display:none}
.d-sec-price[data-mode="thumb"] .d-sec-price-head{justify-content:center}
.d-sec-price[data-mode="thumb"] .d-sec-price-plans{grid-template-columns:1fr}
.d-sec-price[data-mode="thumb"] .d-sec-price-plan{padding:16px 18px}
.d-sec-price[data-mode="thumb"] .d-sec-price-badge{top:14px;right:14px}
.d-sec-price[data-mode="thumb"] :is(.d-sec-price-note,.d-sec-price-badge,.d-sec-price-save){font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-price[data-mode="thumb"] .d-sec-price-period{font-size:max(12px,calc(11px / var(--fs)))}
[data-stage-theme="light"] .d-sec-price{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--edge:rgba(0,0,0,.09);--edge-hi:rgba(0,0,0,.16)}
[data-stage-theme="light"] .d-sec-price-plan{background:linear-gradient(#fff,#fafafa)}
[data-stage-theme="light"] .d-sec-price-plan--pro{background:radial-gradient(120% 70% at 50% -10%,rgba(250,115,25,.12),transparent 60%),#fff}
[data-stage-theme="light"] .d-sec-price-thumb{background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.12),0 0 0 1px rgba(0,0,0,.08)}
[data-stage-theme="light"] .d-sec-price-list{color:#404040}
[data-stage-theme="light"] .d-sec-price-cta--accent{color:#1a0d03}
@media (prefers-reduced-motion:reduce){.d-sec-price *{transition-duration:var(--dur-quick,150ms)!important;transition-property:opacity,color,background-color!important;transition-delay:0ms!important}}`,
  js: String.raw`const C='d-sec-price',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
root.dataset.mode=ctx.mode;
const PRICES={usd:{sign:'$',hobby:[0,0],pro:[24,19],team:[64,51]},eur:{sign:'€',hobby:[0,0],pro:[22,18],team:[59,47]}};
const NAMES={hobby:'Hobby',pro:'Pro',team:'Team'};
let yearly=false,currency='usd',touched=false,idle=0,dead=false;
const toggle=$('.'+C+'-toggle'),thumb=$('.'+C+'-thumb'),periods=$$('.'+C+'-period'),live=$('.'+C+'-live');
function strip(){const s=document.createElement('span');s.className=C+'-digit';const inner=document.createElement('span');inner.className=C+'-strip';for(let i=0;i<10;i++){const n=document.createElement('span');n.textContent=i;inner.appendChild(n);}s.appendChild(inner);return s;}
function setDigits(box,value,stagger){const text=String(value);while(box.children.length<text.length)box.insertBefore(strip(),box.firstChild);while(box.children.length>text.length)box.firstChild.remove();
 [...box.children].forEach((slot,i)=>{const s=slot.firstChild;s.style.setProperty('--delay',stagger&&!reduced?(i*40)+'ms':'0ms');s.style.setProperty('--d',text[i]);});}
function note(plan){if(plan==='hobby')return 'Free forever';const amount=PRICES[currency][plan][1]*12;return yearly?'Billed yearly, '+PRICES[currency].sign+amount.toLocaleString('en-US'):'Billed monthly';}
function swapText(node,text,animate){if(node.textContent===text)return;if(!animate||reduced){node.textContent=text;return;}node.classList.add('is-swap');setTimeout(()=>{if(dead)return;node.textContent=text;node.classList.remove('is-swap');},150);}
function render(animate){
 for(const card of $$('[data-plan]')){const plan=card.dataset.plan,value=PRICES[currency][plan][yearly?1:0];
  setDigits(card.querySelector('.'+C+'-digits'),value,animate);
  swapText(card.querySelector('.'+C+'-cur'),PRICES[currency].sign,animate);
  swapText(card.querySelector('.'+C+'-note'),note(plan),animate);
  card.querySelector('.'+C+'-sr').textContent=NAMES[plan]+': '+PRICES[currency].sign+value+' per month, '+note(plan).toLowerCase()+'.';}
 periods.forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.period==='yearly')===yearly)));placeThumb();
}
function placeThumb(){const on=periods.find(b=>b.getAttribute('aria-pressed')==='true');if(!on)return;thumb.style.width=on.offsetWidth+'px';thumb.style.transform='translateX('+on.offsetLeft+'px)';}
function announce(){live.textContent=(yearly?'Yearly':'Monthly')+' billing. Pro is '+PRICES[currency].sign+PRICES[currency].pro[yearly?1:0]+' a month.';}
function setYearly(next,{user=true}={}){if(user){touched=true;clearInterval(idle);idle=0;}if(next===yearly)return;yearly=next;render(true);if(user)announce();}
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
periods.forEach(b=>on(b,'click',()=>setYearly(b.dataset.period==='yearly')));
on(toggle,'keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();setYearly(e.key==='ArrowRight');periods[yearly?1:0].focus();}});
$$('.'+C+'-cta').forEach(a=>on(a,'click',e=>e.preventDefault()));
ctx.onAction('billing',()=>setYearly(!yearly));
ctx.onAction('currency',()=>{currency=currency==='usd'?'eur':'usd';render(true);announce();});
const fit=()=>{root.style.setProperty('--fit-scale',String(ctx.scale||1));placeThumb();};
const ro=new ResizeObserver(fit);ro.observe(stage);ro.observe(root);
render(false);fit();
if(document.fonts)document.fonts.ready.then(()=>{if(!dead)placeThumb();});
// Thumbnails switch billing on their own until someone presses a control.
if(ctx.mode==='thumb'&&!reduced)idle=setInterval(()=>{if(!touched)setYearly(!yearly,{user:false});},2600);
return()=>{dead=true;clearInterval(idle);abort.abort();ro.disconnect();};`,
  prompt: `Build a pricing section in plain HTML, CSS and JavaScript with no libraries. Lay out a header row with an orange 12px uppercase eyebrow ("Pricing"), a 28px/600 title ("Plans that grow with your team") and, on the right, a pill-shaped segmented toggle with two buttons, Monthly and Yearly (the Yearly button carries a small "−20%" chip). A raised thumb slides under the pressed button by animating transform and width over 250ms with cubic-bezier(0.22, 1, 0.36, 1); the buttons use aria-pressed, sit in role="group" aria-label="Billing period", and ArrowLeft/ArrowRight switch them. Below, three equal plan cards in a grid with 14px gaps and 16px radii, each built from layered inset hairlines rather than one solid border: Hobby (For side projects and learning, $0, Free forever, Start free), Pro (For designers and engineers who ship, $24 monthly or $19 yearly, Upgrade to Pro, a "Most popular" badge) and Team (For studios of up to ten seats, $64 or $51, Contact sales). Each card lists features with small check discs above a hairline: 3 projects, All free components, Prompt export; Unlimited projects, Full source and React ports, MCP server access, Priority updates; Everything in Pro, Shared collections, Seat management, Invoice billing. The Pro card gets an accent edge (inset 1px rgba(250,115,25,.38)), a soft orange radial glow from the top, an orange CTA and orange check discs. Prices are 40px/600 tabular figures where every digit is a vertical strip of 0–9 inside a 44px-tall window; switching period sets each strip's translateY to the new digit over 400ms with cubic-bezier(0.35, -0.02, 0.43, 1), staggering digits by 40ms, so 24 rolls to 19. The billing note under each price cross-fades (Billed monthly / Billed yearly, $228), and a visually hidden line per card plus a polite live region carry the full price for screen readers. Cards lift 2px on hover only inside @media (hover: hover). A second control switches the currency between $ and € (22/18 and 59/47). Thumbnail mode shows only the toggle above the Pro card and flips billing every 2.6s until a control is pressed. Under prefers-reduced-motion the digits and thumb change with a 150ms fade instead of rolling or sliding.`
});
