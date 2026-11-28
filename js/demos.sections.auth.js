/* Sign-in Flow: an original INTRX section. Email, one-time code and success in one card that morphs between steps. */
INTRX.register({
  id: 'section-auth',
  title: 'Sign-in Flow',
  cat: 'Auth & Onboarding',
  rootClass: 'd-sec-auth',
  tags: ['sign in', 'auth', 'otp', 'one-time code', 'form validation', 'section', 'onboarding'],
  libs: [],
  desc: 'A passwordless sign-in card that morphs from email to a six-digit code to a signed-in state. The code boxes auto-advance, accept paste and keep a resend countdown; a bad email shakes once and explains itself.',
  seen: 'Seen on: passwordless sign-in screens of developer tools such as Linear, Vercel and Raycast',
  hint: 'Type · enter an email, press Send code, then type or paste the six-digit code',
  html: String.raw`<section class="d-sec-auth" aria-label="Sign in to Northwind">
  <div class="d-sec-auth-bg" aria-hidden="true"></div>
  <div class="d-sec-auth-card">
    <div class="d-sec-auth-body">
      <div class="d-sec-auth-pane is-active" data-pane="1">
        <span class="d-sec-auth-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3.2 5.2 20l6.8-3.7z" fill="#fa7319"/><path d="M12 3.2 18.8 20 12 16.3z" fill="#ffc499"/></svg></span>
        <h2 class="d-sec-auth-title" tabindex="-1">Sign in to Northwind</h2>
        <p class="d-sec-auth-sub">Welcome back. We’ll email you a one-time code.</p>
        <button type="button" class="d-sec-auth-btn d-sec-auth-btn--ghost d-sec-auth-gh"><span class="d-sec-auth-spin" aria-hidden="true"></span><svg class="d-sec-auth-ico" viewBox="0 0 20 20" aria-hidden="true"><circle cx="6" cy="4.6" r="2.1"/><circle cx="6" cy="15.4" r="2.1"/><circle cx="14.2" cy="7.2" r="2.1"/><path d="M6 6.7v6.6M14.2 9.3c0 3.1-3.9 3.1-6.6 4.6"/></svg><span class="d-sec-auth-btn-label">Continue with GitHub</span></button>
        <div class="d-sec-auth-or"><span>or</span></div>
        <form class="d-sec-auth-form" novalidate>
          <label class="d-sec-auth-label">Work email</label>
          <div class="d-sec-auth-field">
            <svg class="d-sec-auth-ico" viewBox="0 0 20 20" aria-hidden="true"><rect x="2.6" y="4.4" width="14.8" height="11.2" rx="2.4"/><path d="m3.4 5.6 6.6 5 6.6-5"/></svg>
            <input class="d-sec-auth-input" type="email" name="email" inputmode="email" autocomplete="email" spellcheck="false" placeholder="you@company.com">
          </div>
          <div class="d-sec-auth-errwrap"><div class="d-sec-auth-errclip"><p class="d-sec-auth-err"><svg class="d-sec-auth-ico" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.2"/><path d="M10 6.4v4.4M10 13.6v.1"/></svg><span class="d-sec-auth-err-text"></span></p></div></div>
          <button type="submit" class="d-sec-auth-btn d-sec-auth-btn--primary d-sec-auth-send"><span class="d-sec-auth-spin" aria-hidden="true"></span><span class="d-sec-auth-btn-label">Send code</span></button>
        </form>
        <p class="d-sec-auth-legal">New to Northwind? <a class="d-sec-auth-a" href="#signup">Create an account</a></p>
      </div>
      <div class="d-sec-auth-pane" data-pane="2">
        <span class="d-sec-auth-mark d-sec-auth-mark--mail" aria-hidden="true"><svg class="d-sec-auth-ico" viewBox="0 0 20 20"><rect x="2.6" y="4.4" width="14.8" height="11.2" rx="2.4"/><path d="m3.4 5.6 6.6 5 6.6-5"/></svg><i class="d-sec-auth-ping"></i></span>
        <h2 class="d-sec-auth-title" tabindex="-1">Check your email</h2>
        <p class="d-sec-auth-sub"><span class="d-sec-auth-lead">Enter the 6-digit code we sent to</span><span class="d-sec-auth-short">Code sent to</span> <strong class="d-sec-auth-addr d-sec-auth-addr--line">mara@hollow.studio</strong></p>
        <div class="d-sec-auth-otp" role="group" aria-label="6-digit sign-in code">
          <input class="d-sec-auth-box" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" aria-label="Digit 1 of 6">
          <input class="d-sec-auth-box" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Digit 2 of 6">
          <input class="d-sec-auth-box" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Digit 3 of 6">
          <span class="d-sec-auth-sep" aria-hidden="true"></span>
          <input class="d-sec-auth-box" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Digit 4 of 6">
          <input class="d-sec-auth-box" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Digit 5 of 6">
          <input class="d-sec-auth-box" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Digit 6 of 6">
        </div>
        <button type="button" class="d-sec-auth-btn d-sec-auth-btn--primary d-sec-auth-verify" disabled><span class="d-sec-auth-spin" aria-hidden="true"></span><span class="d-sec-auth-btn-label">Verify code</span></button>
        <div class="d-sec-auth-meta">
          <button type="button" class="d-sec-auth-link d-sec-auth-back">Use a different email</button>
          <span class="d-sec-auth-count">Resend in 0:30</span>
          <button type="button" class="d-sec-auth-link d-sec-auth-resend" hidden>Resend code</button>
        </div>
      </div>
      <div class="d-sec-auth-pane" data-pane="3">
        <span class="d-sec-auth-done" aria-hidden="true"><svg viewBox="0 0 52 52"><circle class="d-sec-auth-done-ring" cx="26" cy="26" r="24"/><path class="d-sec-auth-done-check" d="M17 26.6l6 6 12-13"/></svg></span>
        <h2 class="d-sec-auth-title" tabindex="-1">You’re signed in</h2>
        <p class="d-sec-auth-sub">Signed in as <strong class="d-sec-auth-addr">mara@hollow.studio</strong></p>
        <a class="d-sec-auth-ws" href="#workspace"><span class="d-sec-auth-avatar">HS</span><span class="d-sec-auth-ws-text"><b class="d-sec-auth-ws-name">Hollow Studio</b><small class="d-sec-auth-ws-meta">14 members · Pro plan</small></span><svg class="d-sec-auth-ico" viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5.5 4.5 4.5L8 14.5"/></svg></a>
        <p class="d-sec-auth-legal">Not you? <button type="button" class="d-sec-auth-link d-sec-auth-out">Sign out</button></p>
      </div>
    </div>
  </div>
  <p class="d-sec-auth-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-auth{--fs:var(--fit-scale,1);--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.15);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--accent:#fa7319;--ok:#3ecf8e;--bad:#f26d6d;--card-a:#1b1b1b;--card-b:#151515;--well:rgba(255,255,255,.03);--grid:rgba(255,255,255,.06);position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-auth *{box-sizing:border-box}
.d-sec-auth [hidden]{display:none!important}
.d-sec-auth-bg{position:absolute;inset:-24px;pointer-events:none;background:radial-gradient(closest-side,rgba(250,115,25,.2),rgba(250,115,25,0)) 50% 20%/600px 280px no-repeat,linear-gradient(var(--grid) 1px,transparent 1px) 50% 50%/40px 40px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 50% 50%/40px 40px;-webkit-mask:radial-gradient(56% 66% at 50% 46%,#000 40%,transparent 100%);mask:radial-gradient(56% 66% at 50% 46%,#000 40%,transparent 100%)}
.d-sec-auth-card{position:relative;width:368px;padding:24px 24px 20px;border-radius:16px;background:linear-gradient(var(--card-a),var(--card-b));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.4),0 30px 60px -28px rgba(0,0,0,.9)}
.d-sec-auth-card::before{content:'';position:absolute;top:0;left:22%;right:22%;height:1px;background:linear-gradient(90deg,rgba(250,115,25,0),rgba(250,115,25,.55),rgba(250,115,25,0))}
.d-sec-auth-body{position:relative;margin:-6px;padding:6px;overflow:hidden;transition:height var(--dur-medium,350ms) var(--ease-settle,cubic-bezier(.34,1.25,.64,1))}
.d-sec-auth-body.is-shrink{transition:height var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-auth-pane{display:flex;flex-direction:column;align-items:center;text-align:center;transition:opacity 200ms var(--ease-out,cubic-bezier(.22,1,.36,1)) 50ms,transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) 50ms,filter var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) 50ms}
.d-sec-auth-pane:not(.is-active){position:absolute;top:6px;left:6px;right:6px;opacity:0;visibility:hidden;transform:translateY(-6px);filter:blur(2px);pointer-events:none;transition:opacity var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),transform var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),filter var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1)),visibility 0s 150ms}
.d-sec-auth-pane.is-pre{opacity:0;transform:translateY(8px);filter:blur(2px);transition:none}
.d-sec-auth-instant *{transition:none!important;animation:none!important}
.d-sec-auth-mark{position:relative;display:grid;place-items:center;width:40px;height:40px;border-radius:11px;background:linear-gradient(#2b2b2b,#1d1d1d);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.14),0 0 0 5px rgba(255,255,255,.025),0 8px 18px -8px rgba(0,0,0,.9)}
.d-sec-auth-mark svg{width:20px;height:20px}
.d-sec-auth-mark--mail .d-sec-auth-ico{width:20px;height:20px;color:var(--ink)}
.d-sec-auth-ping{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 2px #232323}
.d-sec-auth-title{margin:16px 0 0;font-size:20px;line-height:26px;font-weight:600;letter-spacing:-.02em;outline:none}
.d-sec-auth-sub{margin:6px 0 0;max-width:300px;font-size:13px;line-height:20px;color:var(--ink-2);text-wrap:balance}
.d-sec-auth-addr{font-weight:500;color:var(--ink);overflow-wrap:anywhere}
.d-sec-auth-addr--line{display:block}
.d-sec-auth-short{display:none}
.d-sec-auth-ico{flex:none;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.d-sec-auth-btn{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;height:38px;margin:0;padding:0 14px;border:0;border-radius:10px;font:500 13px/1 Geist,system-ui,sans-serif;cursor:pointer;transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-pop,cubic-bezier(.34,1.36,.64,1))}
.d-sec-auth-btn:active:not(:disabled){transform:scale(.97);transition-duration:var(--dur-micro,80ms)}
.d-sec-auth-btn--ghost{margin-top:20px;color:var(--ink);background:rgba(255,255,255,.045);box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.3)}
.d-sec-auth-btn--ghost .d-sec-auth-ico{color:var(--ink-2)}
@media (hover:hover){.d-sec-auth-btn--ghost:hover{background:rgba(255,255,255,.08)}}
.d-sec-auth-btn--primary{color:#1a0d03;background:var(--accent);box-shadow:inset 0 1px 0 rgba(255,255,255,.28),inset 0 -1px 0 rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.4),0 10px 24px -12px rgba(250,115,25,.7)}
@media (hover:hover){.d-sec-auth-btn--primary:hover:not(:disabled){background:#ff8636}}
.d-sec-auth-btn--primary:disabled{cursor:default;color:#7a7a7a;background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px var(--edge)}
.d-sec-auth-btn:focus-visible,.d-sec-auth-link:focus-visible,.d-sec-auth-a:focus-visible,.d-sec-auth-ws:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-sec-auth-spin{display:none;width:14px;height:14px;border-radius:50%;border:2px solid currentColor;border-right-color:transparent;opacity:.75}
.d-sec-auth-btn.is-busy{cursor:progress}
.d-sec-auth-btn.is-busy .d-sec-auth-spin{display:block;animation:d-sec-auth-turn 600ms linear infinite}
.d-sec-auth-btn.is-busy .d-sec-auth-ico{display:none}
@keyframes d-sec-auth-turn{to{transform:rotate(1turn)}}
.d-sec-auth-or{display:flex;align-items:center;gap:12px;width:100%;margin:14px 0;font-size:11px;line-height:16px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#7a7a7a}
.d-sec-auth-or::before,.d-sec-auth-or::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--edge-hi))}
.d-sec-auth-or::after{background:linear-gradient(90deg,var(--edge-hi),transparent)}
.d-sec-auth-form{display:flex;flex-direction:column;width:100%;text-align:left}
.d-sec-auth-label{margin:0 0 6px;font-size:12px;line-height:16px;font-weight:500;color:var(--ink-2)}
.d-sec-auth-field{position:relative;display:flex;align-items:center;height:40px;border-radius:10px;background:var(--well);box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 2px rgba(0,0,0,.25);transition:box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-auth-field:focus-within,.d-sec-auth-field.is-typing{box-shadow:inset 0 0 0 1px rgba(250,115,25,.75),0 0 0 3px rgba(250,115,25,.16)}
.d-sec-auth-form.is-bad .d-sec-auth-field{box-shadow:inset 0 0 0 1px rgba(242,109,109,.8),0 0 0 3px rgba(242,109,109,.14)}
.d-sec-auth-field.is-shake{animation:d-sec-auth-shake 280ms var(--ease-out,cubic-bezier(.22,1,.36,1))}
@keyframes d-sec-auth-shake{0%{transform:translateX(0)}28.6%{transform:translateX(6px)}57.1%{transform:translateX(-6px)}78.6%{transform:translateX(4px)}100%{transform:translateX(0)}}
.d-sec-auth-field>.d-sec-auth-ico{position:absolute;left:12px;color:var(--ink-3);pointer-events:none;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-auth-field:focus-within>.d-sec-auth-ico{color:var(--ink-2)}
.d-sec-auth-form.is-bad .d-sec-auth-field>.d-sec-auth-ico{color:var(--bad)}
.d-sec-auth-input{width:100%;height:100%;margin:0;padding:0 12px 0 36px;border:0;border-radius:10px;background:none;outline:none;color:var(--ink);font:400 14px/20px Geist,system-ui,sans-serif;caret-color:var(--accent)}
.d-sec-auth-input::placeholder{color:#737373}
.d-sec-auth-input:focus-visible,.d-sec-auth-box:focus-visible,.d-sec-auth-title:focus-visible{outline:none}
.d-sec-auth-box::selection{background:transparent}
.d-sec-auth-errwrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--dur-quick,150ms) var(--ease-close,cubic-bezier(.4,0,.2,1))}
.d-sec-auth-form.is-bad .d-sec-auth-errwrap{grid-template-rows:1fr;transition:grid-template-rows var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-auth-errclip{min-height:0;overflow:hidden}
.d-sec-auth-err{display:flex;align-items:center;gap:6px;margin:0;padding-top:8px;font-size:12px;line-height:16px;color:var(--bad)}
.d-sec-auth-err .d-sec-auth-ico{width:14px;height:14px}
.d-sec-auth-send{margin-top:12px}
.d-sec-auth-legal{margin:16px 0 0;font-size:12px;line-height:16px;color:var(--ink-3)}
.d-sec-auth-a,.d-sec-auth-link{margin:0;padding:0;border:0;border-radius:4px;background:none;color:var(--ink);font:inherit;font-weight:500;text-decoration:none;cursor:pointer;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-auth-a{box-shadow:inset 0 -1px 0 rgba(255,255,255,.22)}
@media (hover:hover){.d-sec-auth-a:hover,.d-sec-auth-link:hover{color:#ffa466}}
.d-sec-auth-otp{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:20px}
.d-sec-auth-box{width:42px;height:50px;margin:0;padding:0;border:0;border-radius:10px;background:var(--well);box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 2px rgba(0,0,0,.25);color:var(--ink);font:600 22px/1 Geist,system-ui,sans-serif;font-variant-numeric:tabular-nums;text-align:center;caret-color:var(--accent);outline:none;transition:box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-auth-box.is-filled{background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22),inset 0 1px 0 rgba(255,255,255,.05)}
.d-sec-auth-box:focus,.d-sec-auth-box.is-active{box-shadow:inset 0 0 0 1px rgba(250,115,25,.8),0 0 0 3px rgba(250,115,25,.18)}
.d-sec-auth-otp.is-ok .d-sec-auth-box{box-shadow:inset 0 0 0 1px rgba(62,207,142,.65),0 0 0 3px rgba(62,207,142,.12)}
.d-sec-auth-box.is-pop{animation:d-sec-auth-pop var(--dur-fast,250ms) var(--ease-pop,cubic-bezier(.34,1.36,.64,1))}
@keyframes d-sec-auth-pop{0%{transform:scale(.92)}100%{transform:scale(1)}}
.d-sec-auth-sep{flex:none;width:8px;height:2px;border-radius:1px;background:#4a4a4a}
.d-sec-auth-verify{margin-top:20px}
.d-sec-auth-meta{display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:16px;font-size:12px;line-height:16px;color:var(--ink-3)}
.d-sec-auth-count{font-variant-numeric:tabular-nums}
.d-sec-auth-done{display:grid;place-items:center;width:52px;height:52px}
.d-sec-auth-done svg{width:52px;height:52px;overflow:visible}
.d-sec-auth-done-ring{fill:rgba(62,207,142,.1);stroke:rgba(62,207,142,.4);stroke-width:1}
.d-sec-auth-done-check{fill:none;stroke:var(--ok);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:27;stroke-dashoffset:27}
.d-sec-auth-pane.is-active .d-sec-auth-done{animation:d-sec-auth-in var(--dur-xslow,500ms) var(--ease-pop,cubic-bezier(.34,1.36,.64,1))}
.d-sec-auth-pane.is-active .d-sec-auth-done-check{stroke-dashoffset:0;transition:stroke-dashoffset var(--dur-medium,350ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) 180ms}
@keyframes d-sec-auth-in{0%{transform:scale(.7);opacity:0}100%{transform:scale(1);opacity:1}}
.d-sec-auth-ws{display:flex;align-items:center;gap:12px;width:100%;margin-top:20px;padding:10px 12px 10px 10px;border-radius:12px;text-align:left;color:var(--ink);text-decoration:none;background:rgba(255,255,255,.035);box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.04);transition:background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
@media (hover:hover){.d-sec-auth-ws:hover{background:rgba(255,255,255,.06)}.d-sec-auth-ws:hover>.d-sec-auth-ico{transform:translateX(2px)}}
.d-sec-auth-avatar{display:grid;place-items:center;flex:none;width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#fa7319,#a8430b);color:#fff;font-size:12px;font-weight:600;letter-spacing:.02em;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),inset 0 0 0 1px rgba(255,255,255,.08)}
.d-sec-auth-ws-text{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}
.d-sec-auth-ws-name{font-size:13px;line-height:18px;font-weight:500}
.d-sec-auth-ws-meta{font-size:12px;line-height:16px;color:var(--ink-3)}
.d-sec-auth-ws>.d-sec-auth-ico{color:var(--ink-3);transition:transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-sec-auth-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: the code step on its own, digits typing in. */
.d-sec-auth[data-mode="thumb"] .d-sec-auth-card{width:292px;padding:16px 16px 14px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-bg{inset:-24px;background-size:420px 200px,28px 28px,28px 28px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-mark{width:28px;height:28px;border-radius:8px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),inset 0 1px 0 rgba(255,255,255,.14),0 0 0 4px rgba(255,255,255,.025)}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-lead{display:none}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-short{display:inline}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-addr--line{display:inline}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-mark .d-sec-auth-ico,.d-sec-auth[data-mode="thumb"] .d-sec-auth-mark svg{width:16px;height:16px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-ping{top:5px;right:5px;width:6px;height:6px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-title{margin-top:10px;font-size:16px;line-height:20px}
.d-sec-auth[data-mode="thumb"] :is(.d-sec-auth-sub,.d-sec-auth-meta,.d-sec-auth-legal,.d-sec-auth-ws-meta){font-size:max(11px,calc(11px / var(--fs)));line-height:1.4}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-sub{margin-top:4px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-otp{gap:6px;margin-top:12px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-box{width:36px;height:42px;font-size:19px;border-radius:9px}
.d-sec-auth[data-mode="thumb"] :is(.d-sec-auth-verify,.d-sec-auth-back,[data-pane="1"] .d-sec-auth-sub,.d-sec-auth-gh,.d-sec-auth-or,.d-sec-auth-label,[data-pane="1"] .d-sec-auth-legal){display:none}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-meta{justify-content:center;margin-top:10px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-form{margin-top:12px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-ws{margin-top:12px;padding:8px 10px 8px 8px}
.d-sec-auth[data-mode="thumb"] .d-sec-auth-done,.d-sec-auth[data-mode="thumb"] .d-sec-auth-done svg{width:40px;height:40px}
.d-sec-auth[data-mode="thumb"] [data-pane="3"] .d-sec-auth-legal{display:none}
[data-stage-theme="light"] .d-sec-auth{--ink:#171717;--ink-2:#525252;--ink-3:#646464;--edge:rgba(0,0,0,.08);--edge-hi:rgba(0,0,0,.14);--card-a:#fff;--card-b:#fcfcfc;--well:#fff;--grid:rgba(0,0,0,.05)}
[data-stage-theme="light"] .d-sec-auth-card{box-shadow:inset 0 0 0 1px var(--edge),0 1px 2px rgba(0,0,0,.06),0 28px 56px -28px rgba(0,0,0,.22)}
[data-stage-theme="light"] .d-sec-auth-mark{background:linear-gradient(#fff,#f2f2f2);box-shadow:inset 0 0 0 1px rgba(0,0,0,.1),0 0 0 5px rgba(0,0,0,.03),0 6px 14px -8px rgba(0,0,0,.25)}
[data-stage-theme="light"] .d-sec-auth-ping{box-shadow:0 0 0 2px #fff}
[data-stage-theme="light"] .d-sec-auth-btn--ghost{background:#fff;box-shadow:inset 0 0 0 1px var(--edge-hi),0 1px 2px rgba(0,0,0,.06)}
@media (hover:hover){[data-stage-theme="light"] .d-sec-auth-btn--ghost:hover{background:#f6f6f6}}
[data-stage-theme="light"] .d-sec-auth-btn--primary:disabled{color:#8f8f8f;background:#f1f1f1}
[data-stage-theme="light"] :is(.d-sec-auth-field,.d-sec-auth-box){box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 2px rgba(0,0,0,.04)}
[data-stage-theme="light"] .d-sec-auth-box.is-filled{background:#fafafa;box-shadow:inset 0 0 0 1px rgba(0,0,0,.24)}
[data-stage-theme="light"] .d-sec-auth-input::placeholder{color:#8f8f8f}
[data-stage-theme="light"] .d-sec-auth-or{color:#8a8a8a}
[data-stage-theme="light"] .d-sec-auth-sep{background:#c4c4c4}
[data-stage-theme="light"] .d-sec-auth-a{box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}
[data-stage-theme="light"] .d-sec-auth-ws{background:#fafafa}
@media (hover:hover){[data-stage-theme="light"] :is(.d-sec-auth-a,.d-sec-auth-link):hover{color:#c2530a}}
@media (prefers-reduced-motion:reduce){
.d-sec-auth *{animation:none!important}
.d-sec-auth-body,.d-sec-auth-errwrap,.d-sec-auth-form.is-bad .d-sec-auth-errwrap,.d-sec-auth-done-check,.d-sec-auth-pane.is-active .d-sec-auth-done-check{transition:none!important}
.d-sec-auth-pane,.d-sec-auth-pane:not(.is-active),.d-sec-auth-pane.is-pre{transform:none;filter:none}
.d-sec-auth-pane{transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-auth-pane:not(.is-active){transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out),visibility 0s 150ms}
.d-sec-auth-btn:active:not(:disabled){transform:none}
}`,
  js: String.raw`const C='d-sec-auth',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches,thumb=ctx.mode==='thumb';
root.dataset.mode=ctx.mode;
const EXAMPLE='mara@hollow.studio',CODE='481205',uid=C+'-'+Math.random().toString(36).slice(2,8);
const body=$('.'+C+'-body'),panes=$$('.'+C+'-pane'),form=$('.'+C+'-form'),field=$('.'+C+'-field'),email=$('.'+C+'-input'),label=$('.'+C+'-label'),errText=$('.'+C+'-err-text'),send=$('.'+C+'-send'),gh=$('.'+C+'-gh'),otp=$('.'+C+'-otp'),boxes=$$('.'+C+'-box'),verify=$('.'+C+'-verify'),count=$('.'+C+'-count'),resend=$('.'+C+'-resend'),live=$('.'+C+'-live');
email.id=uid+'-email';label.htmlFor=email.id;errText.id=uid+'-err';email.setAttribute('aria-describedby',errText.id);
let step=1,addr=EXAMPLE,code=['','','','','',''],dead=false,busy=false,tick=0,left=30,fillRun=0,loopOn=false,settle=0;
const timers=new Set();
function later(fn,ms){const id=setTimeout(()=>{timers.delete(id);if(!dead)fn();},ms);timers.add(id);return id;}
const abort=new AbortController(),on=(n,e,f,o)=>n.addEventListener(e,f,Object.assign({signal:abort.signal},o||{}));
const valid=v=>/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(v)&&/\.[a-z]{2,}$/i.test(v);
const say=t=>{live.textContent=t;};
function workspace(a){const parts=(a.split('@')[1]||'').split('.'),words=[parts[0]||'team'],tld=parts[parts.length-1]||'';if(parts.length>1&&tld.length>3)words.push(tld);
 return{name:words.map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' '),initials:words.map(w=>w.charAt(0).toUpperCase()).join('').slice(0,2)};}
function setAddr(){$$('.'+C+'-addr').forEach(n=>{n.textContent=addr;});const w=workspace(addr);$('.'+C+'-ws-name').textContent=w.name;$('.'+C+'-avatar').textContent=w.initials;}
function busyBtn(btn,state,text){btn.classList.toggle('is-busy',state);btn.setAttribute('aria-busy',String(state));btn.querySelector('.'+C+'-btn-label').textContent=text;}
// One-time code boxes.
function renderCode(){boxes.forEach((b,i)=>{if(b.value!==code[i])b.value=code[i];b.classList.toggle('is-filled',!!code[i]);});verify.disabled=!code.every(Boolean);}
function pop(i){if(reduced)return;const b=boxes[i];b.classList.remove('is-pop');void b.offsetWidth;b.classList.add('is-pop');}
function clearActive(){boxes.forEach(b=>b.classList.remove('is-active'));}
function focusBox(i){const b=boxes[Math.max(0,Math.min(5,i))];b.focus({preventScroll:true});b.select();}
function fillFrom(i,digits){for(let k=0;k<digits.length&&i+k<6;k++){code[i+k]=digits[k];pop(i+k);}renderCode();const gap=code.findIndex(d=>!d);focusBox(gap<0?5:gap);check(true);}
function check(user){if(step===2&&!busy&&code.every(Boolean))verifyCode(user);}
boxes.forEach((b,i)=>{
 on(b,'focus',()=>{clearActive();b.select();});
 on(b,'input',e=>{if(busy){renderCode();return;}const digits=b.value.replace(/\D/g,'');
  if(!digits){code[i]='';renderCode();return;}
  if(digits.length>1&&e.inputType!=='insertText'){fillFrom(i,digits);return;}
  code[i]=digits.slice(-1);renderCode();pop(i);if(i<5)focusBox(i+1);check(true);});
 on(b,'keydown',e=>{
  if(e.key==='Backspace'&&!code[i]&&i>0){e.preventDefault();code[i-1]='';renderCode();focusBox(i-1);}
  else if(e.key==='Delete'){e.preventDefault();code[i]='';renderCode();}
  else if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();focusBox(i+(e.key==='ArrowLeft'?-1:1));}
  else if(e.key==='Home'||e.key==='End'){e.preventDefault();focusBox(e.key==='Home'?0:5);}
  else if(e.key==='Enter'){e.preventDefault();check(true);}
  else if(e.key.length===1&&!/\d/.test(e.key)&&!e.ctrlKey&&!e.metaKey&&!e.altKey)e.preventDefault();});
 on(b,'paste',e=>{e.preventDefault();const text=(e.clipboardData&&e.clipboardData.getData('text'))||'',digits=text.replace(/\D/g,'').slice(0,6);if(digits&&!busy)fillFrom(0,digits);});
});
function verifyCode(user){busy=true;clearActive();busyBtn(verify,true,'Verifying');
 later(()=>otp.classList.add('is-ok'),reduced?0:350);
 later(()=>{busy=false;busyBtn(verify,false,'Verify code');go(3,{focus:user||root.contains(document.activeElement)});},reduced?300:800);}
on(verify,'click',()=>check(true));
// Resend countdown.
function paint(){count.textContent='Resend in 0:'+(left<10?'0':'')+left;count.hidden=!left;resend.hidden=!!left;}
function startCountdown(){clearInterval(tick);left=thumb?24:30;paint();if(thumb)return;tick=setInterval(()=>{left=Math.max(0,left-1);paint();if(!left)clearInterval(tick);},1000);}
on(resend,'click',()=>{startCountdown();say('A new code is on its way to '+addr+'.');const gap=code.findIndex(d=>!d);focusBox(gap<0?0:gap);});
// Email step.
function fail(msg){errText.textContent=msg;form.classList.add('is-bad');email.setAttribute('aria-invalid','true');say(msg);
 if(!reduced){field.classList.remove('is-shake');void field.offsetWidth;field.classList.add('is-shake');}}
on(field,'animationend',()=>field.classList.remove('is-shake'));
on(email,'input',()=>{if(form.classList.contains('is-bad')){form.classList.remove('is-bad');email.removeAttribute('aria-invalid');}});
function submitEmail(user){if(busy)return false;const v=email.value.trim();
 if(!valid(v)){fail(v?'Check the address. It should look like '+EXAMPLE+'.':'Enter your work email to get a code.');if(user)email.focus({preventScroll:true});return false;}
 addr=v;busy=true;busyBtn(send,true,'Sending code');
 later(()=>{busy=false;busyBtn(send,false,'Send code');go(2,{focus:user||root.contains(document.activeElement)});},reduced?300:650);return true;}
on(form,'submit',e=>{e.preventDefault();submitEmail(true);});
on(gh,'click',()=>{if(busy)return;busy=true;busyBtn(gh,true,'Connecting to GitHub');const v=email.value.trim();addr=valid(v)?v:EXAMPLE;
 later(()=>{busy=false;busyBtn(gh,false,'Continue with GitHub');go(3,{focus:true});},reduced?300:700);});
on($('.'+C+'-back'),'click',()=>go(1,{focus:true}));
on($('.'+C+'-out'),'click',()=>{email.value='';go(1,{focus:true});});
$$('a[href^="#"]').forEach(a=>on(a,'click',e=>e.preventDefault()));
// The card morphs: freeze the old height, swap panes, then animate to the new pane's height.
function go(n,o){o=o||{};if(n===step)return;const from=panes[step-1],to=panes[n-1],animate=!o.instant&&!reduced;
 clearTimeout(settle);const h0=body.offsetHeight;if(animate)body.style.height=h0+'px';
 step=n;root.dataset.step=String(n);
 if(n===2){code=['','','','','',''];otp.classList.remove('is-ok');renderCode();setAddr();startCountdown();}else clearInterval(tick);
 if(n===3)setAddr();
 if(n===1){form.classList.remove('is-bad');email.removeAttribute('aria-invalid');}
 panes.forEach(p=>{const active=p===to;p.inert=!active;p.setAttribute('aria-hidden',String(!active));});
 if(o.instant){root.classList.add(C+'-instant');requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove(C+'-instant')));}
 if(animate)to.classList.add('is-pre');
 from.classList.remove('is-active');to.classList.add('is-active');
 if(animate){void to.offsetHeight;to.classList.remove('is-pre');const h1=to.offsetHeight+12;body.classList.toggle('is-shrink',h1<h0);body.style.height=h1+'px';settle=later(()=>{body.style.height='';},420);}
 else body.style.height='';
 if(o.focus){if(n===1)email.focus({preventScroll:true});else if(n===2)focusBox(0);else to.querySelector('.'+C+'-title').focus({preventScroll:true});}
 if(!thumb)say(n===1?'Enter your work email to get a sign-in code.':n===2?'Code sent to '+addr+'. Enter the 6-digit code.':'Signed in as '+addr+'.');}
panes.forEach((p,i)=>{p.inert=i>0;p.setAttribute('aria-hidden',String(i>0));});
// Dock: Fill example types the current step and carries on; Next step jumps one step.
function stopLoop(){loopOn=false;clearActive();otp.classList.remove('is-ok');}
on(root,'pointerdown',()=>{fillRun++;stopLoop();});on(root,'keydown',()=>{fillRun++;stopLoop();});
function typeCode(run){code=['','','','','',''];renderCode();let k=0;
 const next=()=>{if(run!==fillRun||step!==2)return clearActive();code[k]=CODE[k];renderCode();pop(k);clearActive();k++;if(k<6){boxes[k].classList.add('is-active');later(next,reduced?60:170);}else verifyCode(false);};
 boxes[0].classList.add('is-active');later(next,reduced?60:260);}
function typeEmail(run){email.value='';form.classList.remove('is-bad');field.classList.add('is-typing');let k=0;
 const next=()=>{if(run!==fillRun||step!==1){field.classList.remove('is-typing');return;}k=reduced?EXAMPLE.length:k+1;email.value=EXAMPLE.slice(0,k);
  if(k<EXAMPLE.length)later(next,45);else later(()=>{field.classList.remove('is-typing');if(run===fillRun&&submitEmail(false))later(()=>{if(run===fillRun)typeCode(run);},reduced?450:1050);},300);};
 later(next,150);}
ctx.onAction('fill',()=>{stopLoop();if(busy)return;const run=++fillRun;
 if(step===3){email.value='';go(1);later(()=>{if(run===fillRun)typeEmail(run);},reduced?150:450);}
 else if(step===1)typeEmail(run);else typeCode(run);});
ctx.onAction('next',()=>{stopLoop();fillRun++;if(busy)return;const f=root.contains(document.activeElement);
 if(step===1){if(!valid(email.value.trim()))email.value=EXAMPLE;addr=email.value.trim();go(2,{focus:f});}
 else if(step===2){code=CODE.split('');renderCode();go(3,{focus:f});}
 else{email.value='';go(1,{focus:f});}});
const fit=()=>root.style.setProperty('--fit-scale',String(ctx.scale||1));
const ro=new ResizeObserver(fit);ro.observe(stage);fit();
// Thumbnails rest on the code step and type a code on a loop until a control is pressed.
if(thumb){addr=EXAMPLE;go(2,{instant:true});
 if(reduced){'4812'.split('').forEach((d,i)=>{code[i]=d;});renderCode();boxes[4].classList.add('is-active');}
 else{loopOn=true;let k=0;boxes[0].classList.add('is-active');
  const run=()=>{if(!loopOn||step!==2)return;
   if(k<6){code[k]=CODE[k];renderCode();pop(k);clearActive();k++;if(k<6)boxes[k].classList.add('is-active');later(run,k<6?300:450);}
   else if(k===6){otp.classList.add('is-ok');k++;later(run,1500);}
   else{otp.classList.remove('is-ok');code=['','','','','',''];renderCode();boxes[0].classList.add('is-active');k=0;later(run,800);}};
  later(run,700);}}
return()=>{dead=true;loopOn=false;timers.forEach(clearTimeout);timers.clear();clearInterval(tick);abort.abort();ro.disconnect();};`,
  prompt: `Build a passwordless sign-in section in plain HTML, CSS and JavaScript with no libraries. Centre one 368px card (16px radius, 24px padding) on a dark page; behind it, a faint 40px grid of 1px lines and a soft orange radial glow, both masked by a radial gradient so they fade out. Build the card surface from layered inset hairlines (inset 0 0 0 1px rgba(255,255,255,.09) plus a 1px top highlight) and add a short orange hairline across the top edge. Step 1: a 40px product mark (a two-tone north arrow), "Sign in to Northwind" (20px/600, -0.02em), "Welcome back. We'll email you a one-time code.", a full-width secondary button "Continue with GitHub" with a small branch icon, an "or" divider with fading hairlines, a top label "Work email" over a 40px field with a mail icon, and an orange "Send code" button; under it "New to Northwind? Create an account". Submitting an invalid email shakes the field once (translateX 0, 6px, -6px, 4px, 0 over 280ms), turns its ring red and expands an error row via grid-template-rows 0fr to 1fr. A valid email shows a spinner for about 650ms, then the card morphs: freeze its current height, swap panes, and animate the height to the new pane over 350ms cubic-bezier(0.34, 1.25, 0.64, 1) (250ms ease-out when shrinking) while the old pane leaves in 150ms (opacity, -6px, 2px blur) and the new one arrives from +8px after 50ms. Step 2: a mail mark with an orange dot, "Check your email" and the address on its own line, six 42x50px code inputs in two groups of three (inputmode numeric, autocomplete one-time-code on the first) that accept digits only, auto-advance on type, step back on Backspace, move with the arrow keys, Home and End, and fill all six on paste; each digit pops from scale 0.92. A full code turns the boxes green and verifies on its own; "Resend in 0:30" counts down to a "Resend code" button, and "Use a different email" goes back. Step 3: a green check whose path draws by stroke-dashoffset in 350ms, "You're signed in", "Signed in as" the address, a workspace row with initials, and "Not you? Sign out". Announce each step in a polite live region and move focus to the new step's first control. Dock controls: Fill example types the email and code step by step; Next step jumps ahead. The thumbnail shows a compact code step ("Code sent to" the address, 36x42px boxes, a frozen "Resend in 0:24") typing 481205 on a loop, turning green, then clearing. Under prefers-reduced-motion nothing shakes or slides: the height jumps, panes cross-fade in 150ms and the error is colour only.`
});
