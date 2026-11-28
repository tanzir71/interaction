/* Phone Frame: an original INTRX device frame. A CSS-drawn phone holding a finance app; it tilts toward the pointer on a spring and notifications drop from the camera island. */
INTRX.register({
  id: 'section-phone-frame',
  title: 'Phone Frame',
  cat: 'Device frames',
  rootClass: 'd-sec-phone',
  tags: ['phone', 'device frame', 'mockup', 'tilt', '3d', 'notification', 'app showcase', 'section'],
  libs: [],
  desc: 'A phone mockup drawn entirely in CSS, holding a real finance app screen. It tilts toward the pointer on a soft spring with a glare that slides across the glass, and notifications drop out of the camera island every few seconds.',
  seen: 'Seen on: mobile app launch pages, fintech and fitness landing pages, and App Store style feature sections',
  hint: 'Hover · move the pointer and the phone tilts toward it; Notify drops a banner from the island',
  html: String.raw`<section class="d-sec-phone" aria-labelledby="d-sec-phone-title">
  <div class="d-sec-phone-copy">
    <p class="d-sec-phone-eyebrow">Kestrel mobile</p>
    <h2 class="d-sec-phone-title" id="d-sec-phone-title">Your money, live in your pocket</h2>
    <p class="d-sec-phone-lede">Balances, budgets and bills from every account, updated the moment money moves.</p>
    <ul class="d-sec-phone-feats">
      <li class="d-sec-phone-feat"><span class="d-sec-phone-ficon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 9.5h2.8l1.8-5 3.4 8 1.8-4.5h3.2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><b class="d-sec-phone-ftitle">Live balances</b><span class="d-sec-phone-fdesc">Synced with 14,000 banks every 60 seconds</span></span></li>
      <li class="d-sec-phone-feat"><span class="d-sec-phone-ficon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 11.5V7a4 4 0 0 1 8 0v4.5l1 1.2H3l1-1.2ZM6.6 14.2h2.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span><b class="d-sec-phone-ftitle">Instant alerts</b><span class="d-sec-phone-fdesc">Know the second pay lands or a budget runs hot</span></span></li>
      <li class="d-sec-phone-feat"><span class="d-sec-phone-ficon" aria-hidden="true"><svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="7" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span><span><b class="d-sec-phone-ftitle">Private by design</b><span class="d-sec-phone-fdesc">Face ID lock and on-device encryption</span></span></li>
    </ul>
  </div>
  <div class="d-sec-phone-scene">
    <span class="d-sec-phone-glow" aria-hidden="true"></span>
    <span class="d-sec-phone-shadow" aria-hidden="true"></span>
    <div class="d-sec-phone-device" role="group" aria-label="Kestrel app on a phone">
      <span class="d-sec-phone-key d-sec-phone-key--action" aria-hidden="true"></span><span class="d-sec-phone-key d-sec-phone-key--up" aria-hidden="true"></span><span class="d-sec-phone-key d-sec-phone-key--down" aria-hidden="true"></span><span class="d-sec-phone-key d-sec-phone-key--power" aria-hidden="true"></span>
      <div class="d-sec-phone-bezel">
        <div class="d-sec-phone-glass" data-theme="dark">
          <div class="d-sec-phone-status" aria-hidden="true"><span class="d-sec-phone-time">9:41</span><span class="d-sec-phone-sys"><svg viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx=".8" fill="currentColor"/><rect x="4.6" y="5" width="3" height="6" rx=".8" fill="currentColor"/><rect x="9.2" y="2.6" width="3" height="8.4" rx=".8" fill="currentColor"/><rect x="13.8" y="0" width="3" height="11" rx=".8" fill="currentColor"/></svg><svg viewBox="0 0 15 11"><path d="M7.5 10.6 9.6 8.4a3 3 0 0 0-4.2 0Z" fill="currentColor"/><path d="M3.6 6.6a5.5 5.5 0 0 1 7.8 0M1.4 4.4a8.6 8.6 0 0 1 12.2 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><svg viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor"/><path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="currentColor" opacity=".45"/></svg></span></div>
          <span class="d-sec-phone-island" aria-hidden="true"><span class="d-sec-phone-lens"></span></span>
          <div class="d-sec-phone-app">
            <div class="d-sec-phone-top"><span class="d-sec-phone-avatar" aria-hidden="true">MO</span><span class="d-sec-phone-greet"><span>Good morning</span><b>Maya Ortiz</b></span><span class="d-sec-phone-bell" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 11.5V7a4 4 0 0 1 8 0v4.5l1 1.2H3l1-1.2ZM6.6 14.2h2.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
            <p class="d-sec-phone-label">Total balance</p>
            <p class="d-sec-phone-amount">$24,816<span>.40</span></p>
            <p class="d-sec-phone-delta"><span class="d-sec-phone-chip">▲ 5.1%</span>+$1,204.18 in Nov</p>
            <svg class="d-sec-phone-chart" viewBox="0 0 164 58" preserveAspectRatio="none" role="img" aria-label="Balance through November, ending at $24,816.40"><defs><linearGradient id="d-sec-phone-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fa7319" stop-opacity=".32"/><stop offset="1" stop-color="#fa7319" stop-opacity="0"/></linearGradient></defs><path class="d-sec-phone-area" fill="url(#d-sec-phone-fill)" d="M0.0 14.4C1.9 20.6 3.8 30.8 5.7 32.9C7.5 35.1 9.4 34.8 11.3 35.1C13.2 35.4 15.1 35.7 17.0 36.1C18.9 36.5 20.7 37.3 22.6 37.6C24.5 37.9 26.4 37.7 28.3 38.2C30.2 38.8 32.0 40.7 33.9 41.4C35.8 42.1 37.7 42.3 39.6 42.6C41.5 43.0 43.4 42.8 45.2 43.2C47.1 43.7 49.0 44.7 50.9 45.1C52.8 45.6 54.7 45.7 56.6 46.1C58.4 46.5 60.3 46.8 62.2 47.5C64.1 48.2 66.0 49.6 67.9 50.2C69.7 50.8 71.6 51.0 73.5 51.0C75.4 51.0 77.3 18.1 79.2 18.1C81.1 18.1 82.9 18.8 84.8 19.3C86.7 19.9 88.6 20.9 90.5 21.4C92.4 21.8 94.3 21.7 96.1 22.1C98.0 22.5 99.9 22.7 101.8 23.7C103.7 24.6 105.6 27.0 107.4 27.9C109.3 28.7 111.2 28.4 113.1 28.8C115.0 29.1 116.9 29.7 118.8 30.1C120.6 30.5 122.5 30.7 124.4 31.1C126.3 31.6 128.2 32.5 130.1 32.9C132.0 33.3 133.8 33.0 135.7 33.5C137.6 34.0 139.5 35.4 141.4 36.0C143.3 36.6 145.1 36.7 147.0 37.0C148.9 37.4 150.8 37.9 152.7 37.9C154.6 37.9 156.5 5.0 158.3 5.0C160.2 5.0 162.1 5.0 164.0 5.0L164 58L0 58Z"/><path class="d-sec-phone-line" fill="none" d="M0.0 14.4C1.9 20.6 3.8 30.8 5.7 32.9C7.5 35.1 9.4 34.8 11.3 35.1C13.2 35.4 15.1 35.7 17.0 36.1C18.9 36.5 20.7 37.3 22.6 37.6C24.5 37.9 26.4 37.7 28.3 38.2C30.2 38.8 32.0 40.7 33.9 41.4C35.8 42.1 37.7 42.3 39.6 42.6C41.5 43.0 43.4 42.8 45.2 43.2C47.1 43.7 49.0 44.7 50.9 45.1C52.8 45.6 54.7 45.7 56.6 46.1C58.4 46.5 60.3 46.8 62.2 47.5C64.1 48.2 66.0 49.6 67.9 50.2C69.7 50.8 71.6 51.0 73.5 51.0C75.4 51.0 77.3 18.1 79.2 18.1C81.1 18.1 82.9 18.8 84.8 19.3C86.7 19.9 88.6 20.9 90.5 21.4C92.4 21.8 94.3 21.7 96.1 22.1C98.0 22.5 99.9 22.7 101.8 23.7C103.7 24.6 105.6 27.0 107.4 27.9C109.3 28.7 111.2 28.4 113.1 28.8C115.0 29.1 116.9 29.7 118.8 30.1C120.6 30.5 122.5 30.7 124.4 31.1C126.3 31.6 128.2 32.5 130.1 32.9C132.0 33.3 133.8 33.0 135.7 33.5C137.6 34.0 139.5 35.4 141.4 36.0C143.3 36.6 145.1 36.7 147.0 37.0C148.9 37.4 150.8 37.9 152.7 37.9C154.6 37.9 156.5 5.0 158.3 5.0C160.2 5.0 162.1 5.0 164.0 5.0"/></svg>
            <div class="d-sec-phone-range" aria-hidden="true"><span>1W</span><span class="d-sec-phone-on">1M</span><span>3M</span><span>1Y</span><span>All</span></div>
            <div class="d-sec-phone-recent"><b>Recent</b><span>See all</span></div>
            <ul class="d-sec-phone-rows">
              <li class="d-sec-phone-row"><span class="d-sec-phone-ico" aria-hidden="true">BC</span><span class="d-sec-phone-who"><b>Bluebird Café</b><span>Today, 8:12</span></span><span class="d-sec-phone-amt">−$6.40</span></li>
              <li class="d-sec-phone-row"><span class="d-sec-phone-ico d-sec-phone-ico--in" aria-hidden="true">AL</span><span class="d-sec-phone-who"><b>Arden Labs</b><span>Payroll · Nov 28</span></span><span class="d-sec-phone-amt d-sec-phone-amt--in">+$4,250</span></li>
              <li class="d-sec-phone-row"><span class="d-sec-phone-ico" aria-hidden="true">PM</span><span class="d-sec-phone-who"><b>Parkline Market</b><span>Groceries · Nov 27</span></span><span class="d-sec-phone-amt">−$109.27</span></li>
            </ul>
          </div>
          <div class="d-sec-phone-tabbar" aria-hidden="true">
            <span class="d-sec-phone-tab d-sec-phone-on"><svg viewBox="0 0 18 18"><path d="M3 8.2 9 3.5l6 4.7V15a.8.8 0 0 1-.8.8h-3.4v-4.3H7.2v4.3H3.8A.8.8 0 0 1 3 15Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>Home</span>
            <span class="d-sec-phone-tab"><svg viewBox="0 0 18 18"><rect x="2.5" y="4.5" width="13" height="9.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 7.8h13M5.5 11h2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Cards</span>
            <span class="d-sec-phone-tab"><svg viewBox="0 0 18 18"><path d="M9 2.8a6.2 6.2 0 1 0 6.2 6.2H9Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M11.4 2.9a6.2 6.2 0 0 1 3.7 3.7h-3.7Z" fill="currentColor"/></svg>Budgets</span>
            <span class="d-sec-phone-tab"><svg viewBox="0 0 18 18"><circle cx="9" cy="6.5" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 15.2c.8-2.7 2.9-4.2 5.5-4.2s4.7 1.5 5.5 4.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Profile</span>
          </div>
          <span class="d-sec-phone-home" aria-hidden="true"></span>
          <div class="d-sec-phone-note" aria-hidden="true"><span class="d-sec-phone-nicon"><svg viewBox="0 0 16 16"><path d="M3 12.5c1.6-4.9 4.9-8.2 10-9-1 4.6-4.4 7.9-10 9Z" fill="#1a0d03"/><circle cx="10.4" cy="6" r=".9" fill="#fa7319"/></svg></span><span class="d-sec-phone-ntext"><span class="d-sec-phone-nhead"><b>Kestrel</b><span>now</span></span><b class="d-sec-phone-ntitle">Payment received</b><span class="d-sec-phone-nbody">Arden Labs sent you $4,250.00</span></span></div>
          <span class="d-sec-phone-glare" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  </div>
  <p class="d-sec-phone-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-phone{--fs:var(--fit-scale,1);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8c8c8c;--edge:rgba(255,255,255,.09);--accent:#fa7319;--ease:var(--ease-out,cubic-bezier(.22,1,.36,1));position:relative;width:100%;height:100%;display:grid;grid-template-columns:minmax(0,1fr) 400px;align-items:center;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-phone *{box-sizing:border-box}
.d-sec-phone-copy{padding:0 24px 0 44px}
.d-sec-phone-eyebrow{margin:0 0 10px;font-size:12px;line-height:16px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
.d-sec-phone-title{margin:0;max-width:360px;font-size:32px;line-height:36px;font-weight:600;letter-spacing:-.03em;text-wrap:balance}
.d-sec-phone-lede{margin:14px 0 0;max-width:340px;font-size:14px;line-height:22px;color:var(--ink-2)}
.d-sec-phone-feats{display:flex;flex-direction:column;gap:16px;margin:28px 0 0;padding:0;list-style:none}
.d-sec-phone-feat{display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;align-items:center}
.d-sec-phone-ficon{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;color:#e5e5e5;background:linear-gradient(#202022,#18181a);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.07),0 1px 2px rgba(0,0,0,.4)}
.d-sec-phone-ficon svg{width:16px;height:16px}
.d-sec-phone-feat:first-child .d-sec-phone-ficon{color:#ffa466;background:linear-gradient(rgba(250,115,25,.16),rgba(250,115,25,.08));box-shadow:inset 0 0 0 1px rgba(250,115,25,.3),inset 0 1px 0 rgba(255,190,140,.12)}
.d-sec-phone-ftitle{display:block;font-size:13px;line-height:18px;font-weight:600}
.d-sec-phone-fdesc{display:block;font-size:12px;line-height:18px;color:var(--ink-3)}
.d-sec-phone-scene{position:relative;height:100%;display:grid;place-items:center;perspective:1200px}
.d-sec-phone-glow{position:absolute;left:50%;top:50%;width:360px;height:360px;margin:-180px 0 0 -180px;border-radius:50%;background:radial-gradient(closest-side,rgba(250,115,25,.15),rgba(250,115,25,.05) 55%,rgba(250,115,25,0));pointer-events:none}
.d-sec-phone-shadow{position:absolute;left:50%;top:50%;width:184px;height:380px;margin:-176px 0 0 -92px;border-radius:44px;background:rgba(0,0,0,.75);filter:blur(28px);transform:translate3d(0,14px,0);pointer-events:none}
.d-sec-phone-device{position:relative;width:210px;height:432px;padding:3px;border-radius:48px;background:linear-gradient(140deg,#6d6e72 0%,#303134 13%,#1d1e20 36%,#3b3c3f 60%,#1b1c1e 84%,#5a5b5f 100%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16),inset 0 1px 1px rgba(255,255,255,.34),inset 0 -1px 1px rgba(0,0,0,.5),0 0 0 1px rgba(0,0,0,.55);will-change:transform}
.d-sec-phone-device::before{content:'';position:absolute;inset:0;z-index:1;padding:1.25px;border-radius:inherit;background:linear-gradient(155deg,rgba(255,255,255,.55),rgba(255,255,255,.08) 26%,rgba(255,255,255,0) 50%,rgba(255,255,255,.1) 74%,rgba(255,255,255,.34));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.d-sec-phone-key{position:absolute;z-index:-1;width:5px;border-radius:2px;background:linear-gradient(90deg,#1c1d1f,#606165 45%,#2a2b2d);box-shadow:0 0 0 .5px rgba(0,0,0,.6)}
.d-sec-phone-key--action{left:-2px;top:92px;height:22px}
.d-sec-phone-key--up{left:-2px;top:128px;height:42px}
.d-sec-phone-key--down{left:-2px;top:178px;height:42px}
.d-sec-phone-key--power{right:-2px;top:140px;height:66px}
.d-sec-phone-bezel{position:relative;height:100%;padding:6px;border-radius:45px;background:#040405;box-shadow:inset 0 0 0 1px rgba(255,255,255,.07),inset 0 0 2px 1px rgba(0,0,0,.9)}
.d-sec-phone-glass{--app-bg:#0b0b0d;--app-ink:#f4f4f5;--app-ink-2:#a1a1aa;--app-card:#18181b;--app-edge:rgba(255,255,255,.08);--app-chip:rgba(250,115,25,.16);--app-chip-ink:#ffa466;--app-bar:rgba(16,16,19,.78);position:relative;height:100%;overflow:hidden;isolation:isolate;border-radius:39px;color:var(--app-ink);background:var(--app-bg);transition:background-color var(--dur-fast,250ms) var(--ease-in-out,ease-in-out),color var(--dur-fast,250ms) var(--ease-in-out,ease-in-out)}
.d-sec-phone-glass[data-theme="light"]{--app-bg:#f5f5f7;--app-ink:#111113;--app-ink-2:#5f5f67;--app-card:#ffffff;--app-edge:rgba(0,0,0,.07);--app-chip:rgba(250,115,25,.14);--app-chip-ink:#b2470a;--app-bar:rgba(250,250,252,.82)}
.d-sec-phone-glass :is(.d-sec-phone-greet,.d-sec-phone-greet span,.d-sec-phone-bell,.d-sec-phone-label,.d-sec-phone-amount span,.d-sec-phone-delta,.d-sec-phone-chip,.d-sec-phone-range span,.d-sec-phone-recent span,.d-sec-phone-ico,.d-sec-phone-who span,.d-sec-phone-tab,.d-sec-phone-tabbar,.d-sec-phone-home){transition:color var(--dur-fast,250ms) var(--ease-in-out,ease-in-out),background-color var(--dur-fast,250ms) var(--ease-in-out,ease-in-out)}
.d-sec-phone-status{position:absolute;inset:0 0 auto;z-index:3;display:flex;align-items:center;justify-content:space-between;height:40px;padding:2px 20px 0 30px}
.d-sec-phone-time{font-size:13px;line-height:16px;font-weight:600;letter-spacing:-.01em}
.d-sec-phone-sys{display:flex;align-items:center;gap:5px}
.d-sec-phone-sys svg{height:11px;width:auto}
.d-sec-phone-sys svg:last-child{height:12px}
.d-sec-phone-island{position:absolute;z-index:5;top:10px;left:50%;width:62px;height:20px;margin-left:-31px;border-radius:999px;background:#000;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.06);transition:transform var(--dur-medium,350ms) var(--ease-settle,cubic-bezier(.34,1.25,.64,1))}
.d-sec-phone-lens{position:absolute;right:6px;top:50%;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#3a4b66 0,#141b28 45%,#05070b 75%)}
.d-sec-phone-glass.is-ping .d-sec-phone-island{transform:scale(1.1,1.06)}
.d-sec-phone-app{position:absolute;inset:44px 0 0;padding:0 13px}
.d-sec-phone-top{display:flex;align-items:center;gap:8px;height:28px}
.d-sec-phone-avatar{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;font-size:11px;font-weight:600;color:#1a0d03;background:linear-gradient(#ffb27a,#fa7319);box-shadow:inset 0 1px 0 rgba(255,255,255,.35)}
.d-sec-phone-greet{display:flex;flex-direction:column;min-width:0;line-height:14px}
.d-sec-phone-greet span{font-size:11px;color:var(--app-ink-2)}
.d-sec-phone-greet b{font-size:12px;font-weight:600}
.d-sec-phone-bell{display:grid;place-items:center;width:28px;height:28px;margin-left:auto;border-radius:50%;background:var(--app-card);box-shadow:inset 0 0 0 1px var(--app-edge);position:relative}
.d-sec-phone-bell svg{width:14px;height:14px}
.d-sec-phone-bell::after{content:'';position:absolute;top:6px;right:7px;width:5px;height:5px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 1.5px var(--app-card)}
.d-sec-phone-label{margin:12px 0 0;font-size:11px;line-height:14px;color:var(--app-ink-2)}
.d-sec-phone-amount{margin:2px 0 0;font-size:28px;line-height:32px;font-weight:600;letter-spacing:-.035em}
.d-sec-phone-amount span{font-size:18px;color:var(--app-ink-2);letter-spacing:-.02em}
.d-sec-phone-delta{display:flex;align-items:center;gap:6px;margin:4px 0 0;font-size:11px;line-height:18px;color:var(--app-ink-2);white-space:nowrap}
.d-sec-phone-chip{padding:0 6px;border-radius:999px;font-weight:600;color:var(--app-chip-ink);background:var(--app-chip)}
.d-sec-phone-chart{display:block;width:100%;height:50px;margin-top:10px;overflow:visible}
.d-sec-phone-line{stroke:#fa7319;stroke-width:1.75;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}
.d-sec-phone-range{display:flex;justify-content:space-between;margin-top:8px;padding:2px;border-radius:9px;background:var(--app-card);box-shadow:inset 0 0 0 1px var(--app-edge)}
.d-sec-phone-range span{flex:1;height:20px;display:grid;place-items:center;border-radius:7px;font-size:11px;font-weight:500;color:var(--app-ink-2)}
.d-sec-phone-range .d-sec-phone-on{color:var(--app-ink);background:var(--app-edge)}
.d-sec-phone-recent{display:flex;align-items:baseline;justify-content:space-between;margin-top:13px;font-size:12px;line-height:16px}
.d-sec-phone-recent b{font-weight:600}
.d-sec-phone-recent span{font-size:11px;color:var(--app-ink-2)}
.d-sec-phone-rows{margin:4px 0 0;padding:0;list-style:none}
.d-sec-phone-row{display:flex;align-items:center;gap:8px;height:36px}
.d-sec-phone-row+.d-sec-phone-row{box-shadow:inset 0 1px 0 var(--app-edge)}
.d-sec-phone-ico{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:8px;font-size:11px;font-weight:600;color:var(--app-ink-2);background:var(--app-card);box-shadow:inset 0 0 0 1px var(--app-edge)}
.d-sec-phone-ico--in{color:var(--app-chip-ink);background:var(--app-chip);box-shadow:none}
.d-sec-phone-who{display:flex;flex-direction:column;min-width:0;line-height:14px}
.d-sec-phone-who b{font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d-sec-phone-who span{font-size:11px;color:var(--app-ink-2);white-space:nowrap}
.d-sec-phone-amt{margin-left:auto;padding-left:4px;font-size:12px;font-weight:500;white-space:nowrap}
.d-sec-phone-amt--in{color:var(--app-chip-ink)}
.d-sec-phone-tabbar{position:absolute;inset:auto 0 0;z-index:2;display:flex;border-radius:0 0 39px 39px;justify-content:space-around;height:58px;padding:7px 10px 0;background:var(--app-bar);-webkit-backdrop-filter:blur(14px) saturate(150%);backdrop-filter:blur(14px) saturate(150%);box-shadow:inset 0 1px 0 var(--app-edge)}
.d-sec-phone-tab{display:flex;flex-direction:column;align-items:center;gap:2px;width:44px;font-size:11px;line-height:13px;color:var(--app-ink-2)}
.d-sec-phone-tab svg{width:18px;height:18px}
.d-sec-phone-tab.d-sec-phone-on{color:var(--accent)}
.d-sec-phone-home{position:absolute;z-index:3;left:50%;bottom:6px;width:68px;height:4px;margin-left:-34px;border-radius:2px;background:var(--app-ink);opacity:.7}
.d-sec-phone-note{position:absolute;z-index:4;top:36px;left:7px;right:7px;display:flex;align-items:flex-start;gap:9px;padding:9px 11px 10px 9px;border-radius:20px;color:#f4f4f5;background:rgba(40,40,44,.8);-webkit-backdrop-filter:blur(18px) saturate(160%);backdrop-filter:blur(18px) saturate(160%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),inset 0 1px 0 rgba(255,255,255,.08),0 12px 24px -10px rgba(0,0,0,.65);transform-origin:50% 0;opacity:0;transform:translateY(-26px) scale(.34,.28);filter:blur(var(--blur-small,2px));pointer-events:none;transition:opacity var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-fast,250ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),filter var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-phone-note.is-on{opacity:1;transform:none;filter:blur(0);transition:opacity var(--dur-fast,250ms) var(--ease),transform var(--dur-xslow,500ms) var(--ease-settle,cubic-bezier(.34,1.25,.64,1)),filter var(--dur-fast,250ms) var(--ease)}
.d-sec-phone-glass[data-theme="light"] .d-sec-phone-note{color:#111113;background:rgba(255,255,255,.84);box-shadow:inset 0 0 0 1px rgba(0,0,0,.06),0 12px 24px -10px rgba(0,0,0,.3)}
.d-sec-phone-nicon{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:7px;background:linear-gradient(#ffb27a,#fa7319);box-shadow:inset 0 1px 0 rgba(255,255,255,.35)}
.d-sec-phone-nicon svg{width:16px;height:16px}
.d-sec-phone-ntext{display:flex;flex-direction:column;min-width:0;flex:1;line-height:14px}
.d-sec-phone-nhead{display:flex;justify-content:space-between;font-size:11px;opacity:.62}
.d-sec-phone-nhead b{font-weight:500;text-transform:uppercase;letter-spacing:.04em}
.d-sec-phone-ntitle{margin-top:2px;font-size:12px;font-weight:600}
.d-sec-phone-nbody{font-size:11px;line-height:14px;opacity:.86}
.d-sec-phone-glare{position:absolute;inset:0;z-index:6;overflow:hidden;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}
.d-sec-phone-glare::before{content:'';position:absolute;inset:-30% -70%;background:linear-gradient(112deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.1) 47%,rgba(255,255,255,.035) 52%,rgba(255,255,255,0) 58%);transform:translate3d(var(--gx,0px),var(--gy,0px),0)}
.d-sec-phone-glare::after{content:'';position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,0) 32%)}
.d-sec-phone-sr,.d-sec-phone-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: the phone alone, cropped below the chart and fading out, on a slow idle tilt. */
.d-sec-phone[data-mode="thumb"]{display:block;overflow:hidden}
.d-sec-phone[data-mode="thumb"] .d-sec-phone-copy{display:none}
.d-sec-phone[data-mode="thumb"] .d-sec-phone-scene{position:absolute;inset:0;display:block;-webkit-mask-image:linear-gradient(#000 62%,transparent 98%);mask-image:linear-gradient(#000 62%,transparent 98%)}
.d-sec-phone[data-mode="thumb"] .d-sec-phone-device{position:absolute;left:50%;top:16px;margin-left:-105px}
.d-sec-phone[data-mode="thumb"] .d-sec-phone-shadow{top:16px;margin-top:22px}
.d-sec-phone[data-mode="thumb"] .d-sec-phone-glow{top:110px;width:220px;height:220px;margin:-110px 0 0 -110px}
.d-sec-phone[data-mode="thumb"] :is(.d-sec-phone-label,.d-sec-phone-delta,.d-sec-phone-greet span,.d-sec-phone-nbody,.d-sec-phone-nhead){font-size:max(11px,calc(11px / var(--fs)))}
[data-stage-theme="light"] .d-sec-phone{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--edge:rgba(0,0,0,.09)}
[data-stage-theme="light"] .d-sec-phone-ficon{color:#404040;background:linear-gradient(#fff,#f6f6f6);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06)}
[data-stage-theme="light"] .d-sec-phone-feat:first-child .d-sec-phone-ficon{color:#b2470a}
[data-stage-theme="light"] .d-sec-phone-shadow{background:rgba(0,0,0,.35)}
[data-stage-theme="light"] .d-sec-phone-glow{background:radial-gradient(closest-side,rgba(250,115,25,.14),rgba(250,115,25,0))}
.d-sec-phone.is-reduced .d-sec-phone-note,.d-sec-phone.is-reduced .d-sec-phone-note.is-on{transform:none;filter:none;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-phone.is-reduced .d-sec-phone-island{transition:none}
@media (prefers-reduced-motion:reduce){.d-sec-phone-note,.d-sec-phone-note.is-on{transform:none!important;filter:none!important;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)!important}.d-sec-phone-device{transform:none!important}.d-sec-phone-island{transition:none!important}}`,
  js: String.raw`const C='d-sec-phone',$=s=>root.querySelector(s);
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
root.dataset.mode=ctx.mode;
root.classList.toggle('is-reduced',reduced);
const device=$('.'+C+'-device'),glass=$('.'+C+'-glass'),glare=$('.'+C+'-glare'),shade=$('.'+C+'-shadow'),note=$('.'+C+'-note'),live=$('.'+C+'-live');
// Each mounted copy gets its own gradient id so library tiles and the detail view never share one.
const grad=root.querySelector('linearGradient'),uid=C+'-fill-'+Math.random().toString(36).slice(2,8);
if(grad){grad.id=uid;$('.'+C+'-area').setAttribute('fill','url(#'+uid+')');}
const NOTES=[{title:'Payment received',body:'Arden Labs sent you $4,250.00'},{title:'Budget alert',body:'Dining is at 80% of your November budget'},{title:'Card used',body:'$6.40 at Bluebird Café, Mission St'}];
let rx=0,ry=0,vx=0,vy=0,tx=0,ty=0,raf=0,last=0,pointer=false,dead=false,ni=0,showing=false,noteT=0,loopT=0,pingT=0;
const idleTilt=ctx.mode==='thumb'&&!reduced;
function apply(){
 device.style.transform='rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg)';
 glare.style.setProperty('--gx',(-ry*7).toFixed(1)+'px');glare.style.setProperty('--gy',(rx*5).toFixed(1)+'px');
 shade.style.transform='translate3d('+(-ry*2.4).toFixed(1)+'px,'+(14+rx*1.8).toFixed(1)+'px,0)';
}
// A soft spring (stiffness 170, damping 26) follows the target tilt, so moves retarget without snapping.
function frame(t){
 raf=0;const dt=last?Math.min(.034,Math.max(.001,(t-last)/1000)):.016;last=t;
 const drifting=idleTilt&&!pointer;
 if(drifting){const s=t/1000;tx=Math.sin(s*.55)*3.2;ty=Math.sin(s*.38)*8;}
 vx+=(170*(tx-rx)-26*vx)*dt;vy+=(170*(ty-ry)-26*vy)*dt;rx+=vx*dt;ry+=vy*dt;
 if(!drifting&&Math.abs(tx-rx)<.01&&Math.abs(ty-ry)<.01&&Math.abs(vx)<.02&&Math.abs(vy)<.02){rx=tx;ry=ty;vx=vy=0;apply();last=0;return;}
 apply();raf=requestAnimationFrame(frame);
}
const kick=()=>{if(!raf&&!reduced)raf=requestAnimationFrame(frame);};
const abort=new AbortController(),on=(n,e,f,o)=>n.addEventListener(e,f,Object.assign({signal:abort.signal},o));
if(!reduced&&finePointer){
 on(root,'pointermove',e=>{if(e.pointerType!=='mouse')return;const d=device.getBoundingClientRect(),r=root.getBoundingClientRect();if(!r.width||!r.height)return;
  const nx=Math.max(-1,Math.min(1,(e.clientX-(d.left+d.width/2))/(r.width/2))),ny=Math.max(-1,Math.min(1,(e.clientY-(d.top+d.height/2))/(r.height/2)));
  // The face turns toward the pointer: at most 9 degrees around Y and 8 around X.
  ty=nx*9;tx=-ny*8;pointer=true;kick();},{passive:true});
 on(root,'pointerleave',()=>{pointer=false;tx=0;ty=0;kick();});
}
function drop(user){
 clearTimeout(noteT);clearTimeout(loopT);
 if(showing){note.classList.remove('is-on');showing=false;noteT=setTimeout(()=>drop(user),260);return;}
 const n=NOTES[ni++%NOTES.length];
 note.querySelector('.'+C+'-ntitle').textContent=n.title;note.querySelector('.'+C+'-nbody').textContent=n.body;
 void note.offsetWidth;note.classList.add('is-on');showing=true;
 if(!reduced){glass.classList.add('is-ping');clearTimeout(pingT);pingT=setTimeout(()=>glass.classList.remove('is-ping'),350);}
 if(user)live.textContent='Notification from Kestrel: '+n.title+'. '+n.body;
 noteT=setTimeout(dismiss,3400);
}
function dismiss(){note.classList.remove('is-on');showing=false;if(!reduced)loopT=setTimeout(()=>drop(false),2800);}
ctx.onAction('notify',()=>drop(true));
ctx.onAction('theme',()=>{const light=glass.dataset.theme!=='light';glass.dataset.theme=light?'light':'dark';live.textContent='App theme: '+(light?'light':'dark');});
const fit=()=>root.style.setProperty('--fit-scale',String(ctx.scale||1));
const ro=new ResizeObserver(fit);ro.observe(stage);fit();
apply();if(idleTilt)kick();
// Notifications drop every few seconds; under reduced motion only the Notify control shows one.
if(!reduced)loopT=setTimeout(()=>drop(false),1300);
return()=>{dead=true;cancelAnimationFrame(raf);clearTimeout(noteT);clearTimeout(loopT);clearTimeout(pingT);abort.abort();ro.disconnect();};`,
  prompt: `Build a phone mockup section in plain HTML, CSS and JavaScript with no libraries and no images. Use an 880×440 two-column grid: on the left a copy block (orange 12px uppercase eyebrow "Kestrel mobile", a 32px/600 heading "Your money, live in your pocket" with -0.03em tracking, a 14px lede, and three features with 32px icon tiles built from inset hairlines: Live balances, Instant alerts, Private by design); on the right a 400px scene with perspective: 1200px, a faint orange radial glow and a blurred shadow slab. Draw the phone in CSS: a 210×432 body with a 48px radius and a 3px titanium band (a 140° gradient of greys from #6d6e72 to #1b1c1e and back, an inset white hairline and a 1px top highlight), a black 6px bezel, a screen with a 39px radius, and four 5px side keys (action, volume up and down, power) peeking out behind the body. On the screen: a status bar with 9:41 and drawn signal, Wi‑Fi and battery glyphs; a 62×20 black camera island with a lens; and a fictional finance app: avatar initials and "Good morning, Maya Ortiz", a bell with an orange dot, Total balance $24,816.40 (28px tabular figures, cents dimmed), an orange "▲ 5.1%" chip with "+$1,204.18 in November", an SVG area chart of the month (rent on the 1st, payroll on the 14th and 28th) with an orange line and fading fill, a 1W/1M/3M/1Y/All range control, three recent transactions (Bluebird Café −$6.40, Arden Labs +$4,250, Parkline Market −$109.27) and a blurred tab bar (Home, Cards, Budgets, Profile) over a home indicator. Tilt: on (hover: hover) and (pointer: fine), the phone's face turns toward the pointer, at most 9° around Y and 8° around X, driven by a soft spring (stiffness 170, damping 26) on rotateX/rotateY; a diagonal glare band slides across the glass with the tilt and the shadow shifts the other way. Every few seconds a notification banner drops from the island: it starts as the island's shape (translateY(-26px), scale(.34, .28), blur 2px, origin top centre) and settles in 500ms with cubic-bezier(0.34, 1.25, 0.64, 1) while the island swells slightly; it leaves after 3.4s in 250ms with cubic-bezier(0.4, 0, 0.2, 1). Controls: Notify drops the next banner (announced in a polite live region) and Theme cross-fades the app between dark and light in 250ms. Thumbnails show only the top of the phone, fading out, on a slow sine idle tilt. Under prefers-reduced-motion there is no tilt and banners only fade in 150ms.`
});
