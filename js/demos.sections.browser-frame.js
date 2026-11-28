/* Browser Frame: an original INTRX device frame. A neutral browser window whose address types in, holding a real changelog page that scrolls on hover. */
INTRX.register({
  id: 'section-browser-frame',
  title: 'Browser Frame',
  cat: 'Device frames',
  rootClass: 'd-sec-browser',
  tags: ['browser', 'device frame', 'mockup', 'scroll on hover', 'changelog', 'section', 'tabs'],
  libs: [],
  desc: 'A neutral browser window for showing a product in context. The address types in on load, the page inside scrolls slowly to the bottom while you hover and glides back when you leave, and a second tab cross-fades to the docs.',
  seen: 'Seen on: product and template marketplaces, launch pages and portfolio sites that show a whole page inside a window',
  hint: 'Hover · rest on the page and it scrolls to the bottom like a long screenshot; leave and it glides back',
  html: String.raw`<section class="d-sec-browser" aria-label="Browser window preview">
  <div class="d-sec-browser-window">
    <div class="d-sec-browser-bar">
      <span class="d-sec-browser-dots" aria-hidden="true"><span class="d-sec-browser-dot"></span><span class="d-sec-browser-dot"></span><span class="d-sec-browser-dot"></span></span>
      <div class="d-sec-browser-tabs" role="tablist" aria-label="Open tabs">
        <button type="button" class="d-sec-browser-tab" role="tab" id="d-sec-browser-tab-0" aria-selected="true" aria-controls="d-sec-browser-view-0" data-tab="0"><svg class="d-sec-browser-fav" viewBox="0 0 16 16" aria-hidden="true"><rect width="16" height="16" rx="4" fill="#26262a"/><path d="M3.5 6h6.2a1.6 1.6 0 1 0-1.6-1.6M3.5 8.5h8.4a1.6 1.6 0 1 1-1.6 1.6M3.5 11h3.8" fill="none" stroke="#f2f2f2" stroke-width="1.2" stroke-linecap="round"/></svg><span class="d-sec-browser-tab-title">Changelog · Northwind</span><svg class="d-sec-browser-x" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 3.5l5 5m0-5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button>
        <button type="button" class="d-sec-browser-tab" role="tab" id="d-sec-browser-tab-1" aria-selected="false" aria-controls="d-sec-browser-view-1" data-tab="1" tabindex="-1"><svg class="d-sec-browser-fav" viewBox="0 0 16 16" aria-hidden="true"><rect width="16" height="16" rx="4" fill="#fa7319"/><path d="M3.5 6h6.2a1.6 1.6 0 1 0-1.6-1.6M3.5 8.5h8.4a1.6 1.6 0 1 1-1.6 1.6M3.5 11h3.8" fill="none" stroke="#1a0d03" stroke-width="1.2" stroke-linecap="round"/></svg><span class="d-sec-browser-tab-title">Quickstart · Northwind Docs</span><svg class="d-sec-browser-x" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 3.5l5 5m0-5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button>
      </div>
      <svg class="d-sec-browser-plus" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
    </div>
    <div class="d-sec-browser-toolbar">
      <span class="d-sec-browser-navs" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M10 3.5 5.5 8l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="d-sec-browser-off" viewBox="0 0 16 16"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="d-sec-browser-reload" viewBox="0 0 16 16"><path d="M12.6 8a4.6 4.6 0 1 1-1.4-3.3M12.8 2.8v2.6h-2.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div class="d-sec-browser-url" role="img" aria-label="Address: northwind.dev/changelog">
        <svg class="d-sec-browser-lock" viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.2" width="7" height="5.3" rx="1.3" fill="currentColor"/><path d="M4.2 5.2V3.9a1.8 1.8 0 0 1 3.6 0v1.3" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
        <span class="d-sec-browser-addr" aria-hidden="true"><span class="d-sec-browser-host">northwind.dev</span><span class="d-sec-browser-path">/changelog</span></span><span class="d-sec-browser-caret" aria-hidden="true"></span>
      </div>
      <span class="d-sec-browser-tools" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M8 2.5v7.5M5.2 5.2 8 2.5l2.8 2.7M4.5 7.5H4a1 1 0 0 0-1 1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5a1 1 0 0 0-1-1h-.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="d-sec-browser-avatar">JR</span></span>
      <span class="d-sec-browser-load" aria-hidden="true"></span>
    </div>
    <div class="d-sec-browser-viewport">
      <div class="d-sec-browser-view is-active" id="d-sec-browser-view-0" role="tabpanel" tabindex="0" aria-labelledby="d-sec-browser-tab-0">
        <div class="d-sec-browser-page">
          <div class="d-sec-browser-pnav"><span class="d-sec-browser-logo"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5h7.6a1.9 1.9 0 1 0-1.9-1.9M2 8.5h10a1.9 1.9 0 1 1-1.9 1.9M2 11.5h4.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Northwind</span><span class="d-sec-browser-plinks"><span>Product</span><span>Docs</span><span class="d-sec-browser-on">Changelog</span><span>Pricing</span></span><span class="d-sec-browser-pbtn">Sign up</span></div>
          <div class="d-sec-browser-wrap">
            <div class="d-sec-browser-phero"><p class="d-sec-browser-eyebrow">Changelog</p><h3 class="d-sec-browser-h1">What’s new in Northwind</h3><p class="d-sec-browser-lede">Features, fixes and improvements to the platform, shipped every Wednesday.</p></div>
            <ol class="d-sec-browser-rels">
              <li class="d-sec-browser-rel"><div class="d-sec-browser-when"><time datetime="2026-11-26">Nov 26, 2026</time><span class="d-sec-browser-ver">v3.14</span></div><div class="d-sec-browser-what"><h4 class="d-sec-browser-relh">Edge functions in 41 regions</h4><p class="d-sec-browser-tags"><span class="d-sec-browser-tag d-sec-browser-tag--new">New</span><span class="d-sec-browser-tag">Edge</span></p><p class="d-sec-browser-txt">Deploy a function to every region with one flag. Cold starts fell to 9 ms at p50, and logs now stream per region.</p><img class="d-sec-browser-shot" src="{{asset:photo-cityNight}}" alt="Streaks of orange light across a dark frame"></div></li>
              <li class="d-sec-browser-rel"><div class="d-sec-browser-when"><time datetime="2026-11-19">Nov 19, 2026</time><span class="d-sec-browser-ver">v3.13</span></div><div class="d-sec-browser-what"><h4 class="d-sec-browser-relh">Comments on preview deployments</h4><p class="d-sec-browser-tags"><span class="d-sec-browser-tag d-sec-browser-tag--new">New</span><span class="d-sec-browser-tag">Collaboration</span></p><p class="d-sec-browser-txt">Pin a comment to any element on a preview. Threads sync to the pull request and resolve when the branch merges.</p></div></li>
              <li class="d-sec-browser-rel"><div class="d-sec-browser-when"><time datetime="2026-11-12">Nov 12, 2026</time><span class="d-sec-browser-ver">v3.12.2</span></div><div class="d-sec-browser-what"><h4 class="d-sec-browser-relh">Faster cold builds for monorepos</h4><p class="d-sec-browser-tags"><span class="d-sec-browser-tag">Improved</span><span class="d-sec-browser-tag">Builds</span></p><p class="d-sec-browser-txt">The build cache now restores in parallel and skips unchanged workspaces.</p><p class="d-sec-browser-stats"><span class="d-sec-browser-stat"><b>38%</b> faster cold builds</span><span class="d-sec-browser-stat"><b>2.1×</b> cache hit rate</span></p></div></li>
              <li class="d-sec-browser-rel"><div class="d-sec-browser-when"><time datetime="2026-11-05">Nov 5, 2026</time><span class="d-sec-browser-ver">v3.12.1</span></div><div class="d-sec-browser-what"><h4 class="d-sec-browser-relh">Fixes</h4><p class="d-sec-browser-tags"><span class="d-sec-browser-tag">Fixed</span></p><ul class="d-sec-browser-fixes"><li>Environment variables containing = now load correctly</li><li>Log drains no longer drop lines over 64 KB</li><li>Domain verification retries after DNS timeouts</li></ul></div></li>
              <li class="d-sec-browser-rel"><div class="d-sec-browser-when"><time datetime="2026-10-29">Oct 29, 2026</time><span class="d-sec-browser-ver">v3.12</span></div><div class="d-sec-browser-what"><h4 class="d-sec-browser-relh">Northwind CLI 3.0</h4><p class="d-sec-browser-tags"><span class="d-sec-browser-tag d-sec-browser-tag--new">New</span><span class="d-sec-browser-tag">CLI</span></p><p class="d-sec-browser-txt">Interactive init, a typed config file and nw dev with instant reload on the edge runtime.</p><code class="d-sec-browser-cmd"><span>$</span> npm install -g northwind@3</code></div></li>
            </ol>
            <p class="d-sec-browser-foot">You’re all caught up · Subscribe by email or RSS</p>
          </div>
        </div>
      </div>
      <div class="d-sec-browser-view" id="d-sec-browser-view-1" role="tabpanel" tabindex="0" aria-labelledby="d-sec-browser-tab-1" inert>
        <div class="d-sec-browser-page">
          <div class="d-sec-browser-pnav"><span class="d-sec-browser-logo"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5h7.6a1.9 1.9 0 1 0-1.9-1.9M2 8.5h10a1.9 1.9 0 1 1-1.9 1.9M2 11.5h4.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Northwind <span class="d-sec-browser-docsmark">Docs</span></span><span class="d-sec-browser-search">Search docs<kbd class="d-sec-browser-kbd">⌘K</kbd></span><span class="d-sec-browser-pbtn">Dashboard</span></div>
          <div class="d-sec-browser-docs">
            <div class="d-sec-browser-side"><p class="d-sec-browser-sideh">Getting started</p><span>Introduction</span><span class="d-sec-browser-on">Quickstart</span><span>Project config</span><span>CLI reference</span><p class="d-sec-browser-sideh">Deploy</p><span>Edge functions</span><span>Environment variables</span><span>Custom domains</span><span>Rollbacks</span><p class="d-sec-browser-sideh">Observe</p><span>Logs</span><span>Log drains</span><span>Alerts</span></div>
            <div class="d-sec-browser-doc">
              <p class="d-sec-browser-crumb">Docs <span>/</span> Getting started</p>
              <h3 class="d-sec-browser-h1">Quickstart</h3>
              <p class="d-sec-browser-lede">Deploy your first project to Northwind in about five minutes. You need Node 20 or later and a Git repository.</p>
              <ol class="d-sec-browser-steps">
                <li class="d-sec-browser-step"><h4 class="d-sec-browser-relh">Install the CLI</h4><code class="d-sec-browser-cmd"><span>$</span> npm install -g northwind</code></li>
                <li class="d-sec-browser-step"><h4 class="d-sec-browser-relh">Link your project</h4><p class="d-sec-browser-txt">Run this in the repository root. The CLI detects your framework and writes northwind.toml.</p><code class="d-sec-browser-cmd"><span>$</span> nw link</code></li>
                <li class="d-sec-browser-step"><h4 class="d-sec-browser-relh">Deploy to production</h4><pre class="d-sec-browser-term"><span>$</span> nw deploy --prod
<i>✓</i> Built in 4.2 s
<i>✓</i> Uploaded 214 files (3.1 MB)
<i>✓</i> Live in 41 regions
  acme-web.northwind.app</pre></li>
              </ol>
              <p class="d-sec-browser-tip"><b>Tip</b> Run nw dev for a local server with instant reload on the same edge runtime.</p>
              <p class="d-sec-browser-nextcard"><span>Next</span>Project config<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6h7M6.5 3 9.5 6l-3 3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></p>
              <p class="d-sec-browser-foot">Last updated Nov 24, 2026 · Edit this page</p>
            </div>
          </div>
        </div>
      </div>
      <span class="d-sec-browser-rail" aria-hidden="true"><span class="d-sec-browser-knob"></span></span>
    </div>
  </div>
  <p class="d-sec-browser-live" role="status" aria-live="polite"></p>
</section>`,
  css: String.raw`.d-sec-browser{--fs:var(--fit-scale,1);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8c8c8c;--edge:rgba(255,255,255,.09);--chrome:#1a1a1c;--chrome-2:#121214;--field:#0d0d0f;--page:#0a0a0b;--page-ink:#ededed;--page-ink-2:#9d9d9d;--page-edge:rgba(255,255,255,.07);--accent:#fa7319;--ease:var(--ease-out,cubic-bezier(.22,1,.36,1));position:relative;width:100%;height:100%;display:flex;color:var(--ink);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'tnum' 1}
.d-sec-browser *{box-sizing:border-box}
.d-sec-browser-window{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;border-radius:14px;overflow:hidden;background:var(--chrome-2);box-shadow:0 0 0 1px rgba(0,0,0,.55),0 2px 4px rgba(0,0,0,.25),0 32px 64px -28px rgba(0,0,0,.85)}
.d-sec-browser-window::after{content:'';position:absolute;inset:0;z-index:6;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.09),inset 0 1px 0 rgba(255,255,255,.06)}
.d-sec-browser-bar{flex:none;display:flex;align-items:flex-end;gap:16px;height:40px;padding:0 12px 0 16px}
.d-sec-browser-dots{align-self:center;display:flex;gap:7px}
.d-sec-browser-dot{width:11px;height:11px;border-radius:50%;background:#2e2e31;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.12),inset 0 1px 0 rgba(255,255,255,.06)}
.d-sec-browser-tabs{display:flex;gap:4px;min-width:0}
.d-sec-browser-tab{position:relative;display:flex;align-items:center;gap:8px;width:208px;min-width:0;height:32px;padding:0 9px 0 11px;border:0;border-radius:9px 9px 0 0;background:transparent;color:var(--ink-3);font:500 12px/1 Geist,system-ui,sans-serif;text-align:left;cursor:pointer;transition:background-color var(--dur-quick,150ms) var(--ease),color var(--dur-quick,150ms) var(--ease)}
.d-sec-browser-tab[aria-selected="true"]{background:var(--chrome);color:var(--ink);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 1px 0 0 rgba(255,255,255,.04),inset -1px 0 0 rgba(255,255,255,.04)}
.d-sec-browser-tab[aria-selected="true"]::before,.d-sec-browser-tab[aria-selected="true"]::after{content:'';position:absolute;bottom:0;width:9px;height:9px;pointer-events:none}
.d-sec-browser-tab[aria-selected="true"]::before{left:-9px;background:radial-gradient(circle at 0 0,transparent 8.5px,var(--chrome) 9px)}
.d-sec-browser-tab[aria-selected="true"]::after{right:-9px;background:radial-gradient(circle at 100% 0,transparent 8.5px,var(--chrome) 9px)}
@media (hover:hover){.d-sec-browser-tab[aria-selected="false"]:hover{background:rgba(255,255,255,.04);color:var(--ink-2)}}
.d-sec-browser-fav{width:16px;height:16px;flex:none}
.d-sec-browser-tab-title{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:16px}
.d-sec-browser-x{width:16px;height:16px;flex:none;padding:2px;border-radius:4px;opacity:0;transition:opacity var(--dur-quick,150ms) var(--ease)}
.d-sec-browser-tab[aria-selected="true"] .d-sec-browser-x{opacity:.7}
.d-sec-browser-plus{align-self:center;width:24px;height:24px;padding:4px;margin-left:-8px;color:var(--ink-3)}
.d-sec-browser-toolbar{position:relative;flex:none;display:flex;align-items:center;gap:12px;height:44px;padding:0 12px;background:var(--chrome);box-shadow:inset 0 -1px 0 rgba(255,255,255,.06)}
.d-sec-browser-navs{display:flex;gap:2px;color:var(--ink-2)}
.d-sec-browser-navs svg{width:28px;height:28px;padding:6px;border-radius:7px}
.d-sec-browser-off{opacity:.38}
.d-sec-browser-url{flex:1;min-width:0;max-width:520px;display:flex;align-items:center;gap:8px;height:30px;margin:0 auto;padding:0 12px;border-radius:9px;background:var(--field);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07),inset 0 1px 2px rgba(0,0,0,.35);font-size:13px;line-height:18px;white-space:nowrap}
.d-sec-browser-lock{width:12px;height:12px;flex:none;color:var(--ink-3)}
.d-sec-browser-addr{overflow:hidden;text-overflow:ellipsis;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)}
.d-sec-browser-url.is-swap .d-sec-browser-addr{opacity:0}
.d-sec-browser-host{color:var(--ink)}
.d-sec-browser-path{color:var(--ink-3)}
.d-sec-browser-caret{display:none;width:1.5px;height:15px;margin-left:-6px;border-radius:1px;background:var(--ink)}
.d-sec-browser-url.is-typing .d-sec-browser-caret{display:block;animation:d-sec-browser-blink 1s steps(1) infinite}
@keyframes d-sec-browser-blink{50%{opacity:0}}
.d-sec-browser-tools{display:flex;align-items:center;gap:8px;color:var(--ink-2)}
.d-sec-browser-tools svg{width:28px;height:28px;padding:6px}
.d-sec-browser-avatar{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;font-size:11px;font-weight:600;color:#ffcfa8;background:linear-gradient(#3b2414,#2a1a0f);box-shadow:inset 0 0 0 1px rgba(250,115,25,.3)}
.d-sec-browser-load{position:absolute;left:0;right:0;bottom:-1px;height:2px;z-index:2;background:linear-gradient(90deg,rgba(250,115,25,0),#fa7319 55%,#ffb27a);transform:scaleX(0);transform-origin:0 50%;opacity:0;pointer-events:none}
.d-sec-browser-viewport{position:relative;flex:1;min-height:0;background:var(--page)}
.d-sec-browser-view{position:absolute;inset:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;opacity:0;visibility:hidden;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out),visibility 0s var(--dur-quick,150ms)}
.d-sec-browser-view::-webkit-scrollbar{display:none}
.d-sec-browser-view.is-active{opacity:1;visibility:visible;transition:opacity var(--dur-fast,250ms) var(--ease-in-out,ease-in-out),visibility 0s}
.d-sec-browser-view:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:-2px}
.d-sec-browser-tab:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:-2px}
.d-sec-browser-page{min-height:100%;color:var(--page-ink);font-size:13px;line-height:20px;transition:opacity var(--dur-slow,400ms) var(--ease),transform var(--dur-slow,400ms) var(--ease),filter var(--dur-slow,400ms) var(--ease)}
.d-sec-browser.is-loading .d-sec-browser-page{opacity:0;transform:translateY(var(--move-base,8px));filter:blur(var(--blur-small,2px))}
.d-sec-browser-pnav{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:24px;height:48px;padding:0 28px;background:rgba(10,10,11,.84);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:inset 0 -1px 0 var(--page-edge)}
.d-sec-browser-logo{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;letter-spacing:-.01em;color:var(--page-ink)}
.d-sec-browser-logo svg{width:16px;height:16px}
.d-sec-browser-docsmark{font-weight:500;color:var(--page-ink-2)}
.d-sec-browser-plinks{display:flex;gap:18px;font-size:12px;color:var(--page-ink-2)}
.d-sec-browser-on{color:var(--page-ink)}
.d-sec-browser-pbtn{margin-left:auto;height:26px;padding:0 10px;border-radius:7px;display:flex;align-items:center;font-size:12px;font-weight:500;color:#0b0b0c;background:#ededed}
.d-sec-browser-search{display:flex;align-items:center;gap:24px;height:28px;margin-left:8px;padding:0 6px 0 10px;border-radius:7px;font-size:12px;color:var(--page-ink-2);background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px var(--page-edge)}
.d-sec-browser-kbd{font:500 11px/16px 'Geist Mono',ui-monospace,monospace;padding:0 4px;border-radius:4px;color:var(--page-ink-2);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.d-sec-browser-wrap{max-width:660px;margin:0 auto;padding:0 32px 8px}
.d-sec-browser-phero{padding:34px 0 26px}
.d-sec-browser-eyebrow{margin:0 0 8px;font-size:11px;line-height:16px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
.d-sec-browser-h1{margin:0;font-size:26px;line-height:32px;font-weight:600;letter-spacing:-.03em}
.d-sec-browser-lede{margin:8px 0 0;max-width:440px;font-size:13px;line-height:20px;color:var(--page-ink-2)}
.d-sec-browser-rels{margin:0;padding:0;list-style:none}
.d-sec-browser-rel{display:grid;grid-template-columns:128px minmax(0,1fr);gap:24px;padding:24px 0;box-shadow:inset 0 1px 0 var(--page-edge)}
.d-sec-browser-when{display:flex;flex-direction:column;align-items:flex-start;gap:7px;font-size:12px;line-height:18px;color:var(--page-ink-2)}
.d-sec-browser-ver{font:500 11px/18px 'Geist Mono',ui-monospace,monospace;padding:0 6px;border-radius:5px;color:#d0d0d0;background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px var(--page-edge)}
.d-sec-browser-relh{margin:0;font-size:15px;line-height:22px;font-weight:600;letter-spacing:-.01em;color:var(--page-ink)}
.d-sec-browser-tags{display:flex;gap:6px;margin:8px 0 10px}
.d-sec-browser-tag{font-size:11px;line-height:20px;padding:0 8px;border-radius:999px;color:#c9c9c9;background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.d-sec-browser-tag--new{color:#ffb27a;background:rgba(250,115,25,.12);box-shadow:inset 0 0 0 1px rgba(250,115,25,.28)}
.d-sec-browser-txt{margin:0;color:var(--page-ink-2)}
.d-sec-browser-shot{display:block;width:100%;height:150px;margin-top:14px;object-fit:cover;object-position:80% 72%;border-radius:10px;box-shadow:0 0 0 1px var(--page-edge)}
.d-sec-browser-stats{display:flex;gap:8px;margin:12px 0 0}
.d-sec-browser-stat{padding:8px 12px;border-radius:10px;font-size:12px;line-height:18px;color:var(--page-ink-2);background:rgba(255,255,255,.03);box-shadow:inset 0 0 0 1px var(--page-edge)}
.d-sec-browser-stat b{display:block;font-size:18px;line-height:24px;font-weight:600;letter-spacing:-.02em;color:var(--page-ink)}
.d-sec-browser-fixes{margin:0;padding:0;list-style:none;color:var(--page-ink-2)}
.d-sec-browser-fixes li{position:relative;padding-left:16px}
.d-sec-browser-fixes li+li{margin-top:4px}
.d-sec-browser-fixes li::before{content:'';position:absolute;left:2px;top:8px;width:5px;height:5px;border-radius:50%;background:#5a5a5a}
.d-sec-browser-cmd{display:block;margin-top:12px;padding:10px 12px;border-radius:9px;font:12px/18px 'Geist Mono',ui-monospace,monospace;color:#dcdcdc;background:#111113;box-shadow:inset 0 0 0 1px var(--page-edge)}
.d-sec-browser-cmd span,.d-sec-browser-term span{color:#7d7d7d}
.d-sec-browser-foot{margin:0;padding:22px 0 26px;font-size:12px;line-height:18px;color:var(--page-ink-2);box-shadow:inset 0 1px 0 var(--page-edge)}
.d-sec-browser-docs{display:grid;grid-template-columns:168px minmax(0,1fr);gap:36px;max-width:740px;margin:0 auto;padding:0 32px}
.d-sec-browser-side{position:sticky;top:48px;align-self:start;display:flex;flex-direction:column;padding:28px 0 20px;font-size:12px;line-height:18px;color:var(--page-ink-2)}
.d-sec-browser-side span{padding:4px 10px;margin-left:-10px;border-radius:6px}
.d-sec-browser-side .d-sec-browser-on{color:var(--page-ink);background:rgba(255,255,255,.05);box-shadow:inset 2px 0 0 var(--accent)}
.d-sec-browser-sideh{margin:14px 0 4px;font-size:11px;line-height:16px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#7f7f7f}
.d-sec-browser-sideh:first-child{margin-top:0}
.d-sec-browser-doc{padding:28px 0 0;min-width:0}
.d-sec-browser-crumb{margin:0 0 10px;font-size:12px;line-height:18px;color:var(--page-ink-2)}
.d-sec-browser-crumb span{margin:0 4px;opacity:.6}
.d-sec-browser-steps{margin:24px 0 0;padding:0;list-style:none;counter-reset:d-sec-browser-step}
.d-sec-browser-step{position:relative;padding:0 0 22px 36px;counter-increment:d-sec-browser-step}
.d-sec-browser-step::before{content:counter(d-sec-browser-step);position:absolute;left:0;top:0;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;font-size:11px;font-weight:600;color:var(--page-ink);background:#1b1b1d;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.d-sec-browser-step::after{content:'';position:absolute;left:11px;top:28px;bottom:6px;width:1px;background:var(--page-edge)}
.d-sec-browser-step:last-child::after{display:none}
.d-sec-browser-step .d-sec-browser-txt{margin-top:4px}
.d-sec-browser-term{margin:12px 0 0;padding:12px 14px;border-radius:9px;font:12px/20px 'Geist Mono',ui-monospace,monospace;color:#dcdcdc;background:#111113;box-shadow:inset 0 0 0 1px var(--page-edge);white-space:pre;overflow:hidden}
.d-sec-browser-term i{font-style:normal;color:#ffa466}
.d-sec-browser-tip{margin:4px 0 0;padding:12px 14px;border-radius:10px;font-size:12px;line-height:19px;color:var(--page-ink-2);background:rgba(250,115,25,.06);box-shadow:inset 0 0 0 1px rgba(250,115,25,.2)}
.d-sec-browser-tip b{margin-right:6px;color:#ffb27a;font-weight:600}
.d-sec-browser-nextcard{display:flex;align-items:center;gap:10px;margin:18px 0 26px;padding:14px 16px;border-radius:10px;font-size:14px;font-weight:500;color:var(--page-ink);box-shadow:inset 0 0 0 1px var(--page-edge)}
.d-sec-browser-nextcard span{font-size:12px;font-weight:400;color:var(--page-ink-2)}
.d-sec-browser-nextcard svg{width:12px;height:12px;margin-left:auto;color:var(--page-ink-2)}
.d-sec-browser-rail{position:absolute;top:6px;right:4px;bottom:6px;width:4px;border-radius:2px;background:rgba(255,255,255,.04);opacity:.55;pointer-events:none;transition:opacity var(--dur-fast,250ms) var(--ease)}
.d-sec-browser-knob{position:absolute;top:0;left:0;width:4px;height:40px;border-radius:2px;background:rgba(255,255,255,.34);will-change:transform}
.d-sec-browser-viewport.is-moving .d-sec-browser-rail{opacity:1}
.d-sec-browser-sr,.d-sec-browser-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
/* Thumbnail: the window's top-left, cropped and fading out, with the page scrolling on its own. */
.d-sec-browser[data-mode="thumb"] .d-sec-browser-window{position:absolute;inset:0 0 -34px;-webkit-mask-image:linear-gradient(#000 74%,transparent);mask-image:linear-gradient(#000 74%,transparent)}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-bar{height:34px;gap:12px;padding:0 0 0 12px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-dot{width:9px;height:9px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-dots{gap:5px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-tab{width:132px;height:27px;gap:6px;padding:0 8px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-tab[data-tab="1"]{width:100px}
.d-sec-browser[data-mode="thumb"] :is(.d-sec-browser-x,.d-sec-browser-plus,.d-sec-browser-tools,.d-sec-browser-reload,.d-sec-browser-plinks,.d-sec-browser-lede,.d-sec-browser-search,.d-sec-browser-side){display:none}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-fav{width:14px;height:14px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-toolbar{height:36px;gap:6px;padding:0 10px 0 6px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-navs svg{width:24px;height:24px;padding:5px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-url{height:25px;padding:0 9px;gap:6px;font-size:12px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-pnav{height:36px;padding:0 16px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-pbtn{height:22px;padding:0 8px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-browser[data-mode="thumb"] :is(.d-sec-browser-wrap,.d-sec-browser-docs){padding:0 16px;display:block}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-phero{padding:16px 0 12px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-doc{padding-top:14px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-h1{font-size:18px;line-height:24px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-rel{grid-template-columns:1fr;gap:4px;padding:12px 0}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-when{flex-direction:row;align-items:center;gap:8px;font-size:max(11px,calc(11px / var(--fs)))}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-relh{font-size:13px;line-height:18px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-tags{margin:5px 0 6px}
.d-sec-browser[data-mode="thumb"] :is(.d-sec-browser-txt,.d-sec-browser-fixes,.d-sec-browser-stat){font-size:12px;line-height:17px}
.d-sec-browser[data-mode="thumb"] .d-sec-browser-shot{height:74px;margin-top:8px;border-radius:8px}
[data-stage-theme="light"] .d-sec-browser{--ink:#171717;--ink-2:#525252;--ink-3:#6b6b6b;--chrome:#ffffff;--chrome-2:#ececee;--field:#f4f4f5;--page:#fbfbfb;--page-ink:#161616;--page-ink-2:#5d5d5d;--page-edge:rgba(0,0,0,.08)}
[data-stage-theme="light"] .d-sec-browser-window{box-shadow:0 0 0 1px rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.06),0 32px 64px -28px rgba(0,0,0,.3)}
[data-stage-theme="light"] .d-sec-browser-window::after{box-shadow:inset 0 1px 0 rgba(255,255,255,.8)}
[data-stage-theme="light"] .d-sec-browser-dot{background:#d4d4d8;box-shadow:none}
[data-stage-theme="light"] .d-sec-browser-url{box-shadow:inset 0 0 0 1px rgba(0,0,0,.07)}
[data-stage-theme="light"] .d-sec-browser-toolbar{box-shadow:inset 0 -1px 0 rgba(0,0,0,.07)}
[data-stage-theme="light"] .d-sec-browser-pnav{background:rgba(251,251,251,.86)}
[data-stage-theme="light"] .d-sec-browser-pbtn{color:#fff;background:#171717}
[data-stage-theme="light"] :is(.d-sec-browser-cmd,.d-sec-browser-term){color:#e8e8e8;background:#161618}
[data-stage-theme="light"] :is(.d-sec-browser-tag,.d-sec-browser-ver){color:#404040;background:rgba(0,0,0,.04);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
[data-stage-theme="light"] .d-sec-browser-step::before{color:#404040;background:#f0f0f1;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
[data-stage-theme="light"] .d-sec-browser-tag--new{color:#b2470a;background:rgba(250,115,25,.1);box-shadow:inset 0 0 0 1px rgba(250,115,25,.3)}
[data-stage-theme="light"] .d-sec-browser-tip b{color:#b2470a}
[data-stage-theme="light"] .d-sec-browser-knob{background:rgba(0,0,0,.3)}
[data-stage-theme="light"] .d-sec-browser-rail{background:rgba(0,0,0,.05)}
@media (prefers-reduced-motion:reduce){.d-sec-browser-page{transform:none!important;filter:none!important;transition:opacity var(--dur-quick,150ms) var(--ease-in-out,ease-in-out)!important}.d-sec-browser-url.is-typing .d-sec-browser-caret{animation:none}}`,
  js: String.raw`const C='d-sec-browser',$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches;
const full=ctx.mode==='full';
root.dataset.mode=ctx.mode;
const PAGES=[{host:'northwind.dev',path:'/changelog',label:'Changelog'},{host:'northwind.dev',path:'/docs/quickstart',label:'Docs quickstart'}];
const tabs=$$('.'+C+'-tab'),views=$$('.'+C+'-view'),url=$('.'+C+'-url'),addr=$('.'+C+'-addr'),load=$('.'+C+'-load'),port=$('.'+C+'-viewport'),rail=$('.'+C+'-rail'),knob=$('.'+C+'-knob'),live=$('.'+C+'-live');
let active=0,dead=false,hovering=false,manual=false,touched=false,glideRaf=0,glideDone=null,typeT=0,idleT=0,moveT=0,swapT=0;
const view=()=>views[active],maxOf=v=>Math.max(0,v.scrollHeight-v.clientHeight);
function setAddr(text){
 const host=PAGES[active].host;addr.textContent='';
 const h=document.createElement('span');h.className=C+'-host';h.textContent=text.slice(0,host.length);addr.appendChild(h);
 if(text.length>host.length){const p=document.createElement('span');p.className=C+'-path';p.textContent=text.slice(host.length);addr.appendChild(p);}
 url.setAttribute('aria-label','Address: '+PAGES[active].host+PAGES[active].path);
}
function sync(){
 const v=view(),track=rail.clientHeight,ratio=v.scrollHeight?v.clientHeight/v.scrollHeight:1,h=Math.max(28,Math.round(track*Math.min(1,ratio))),max=maxOf(v);
 knob.style.height=h+'px';knob.style.transform='translateY('+(max?(v.scrollTop/max)*(track-h):0).toFixed(1)+'px)';
 port.classList.add('is-moving');clearTimeout(moveT);moveT=setTimeout(()=>port.classList.remove('is-moving'),700);
}
function stopGlide(){cancelAnimationFrame(glideRaf);glideRaf=0;glideDone=null;}
// Glide the real scrollTop with an ease-in-out curve so keyboard, wheel and the rail share one position.
function glide(target,speed,done){
 stopGlide();const v=view(),to=Math.max(0,Math.min(maxOf(v),target)),from=v.scrollTop,dist=to-from;
 if(Math.abs(dist)<1||reduced){v.scrollTop=to;sync();if(done)done();return;}
 const span=Math.max(500,Math.abs(dist)/speed*1000),t0=ctx.now();glideDone=done||null;
 const frame=t=>{const p=Math.min(1,Math.max(0,(t-t0)/span)),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;v.scrollTop=from+dist*e;
  if(p<1)glideRaf=requestAnimationFrame(frame);else{glideRaf=0;const cb=glideDone;glideDone=null;if(cb)cb();}};
 glideRaf=requestAnimationFrame(frame);
}
function loadBar(){if(reduced||!load.animate)return;load.animate([{transform:'scaleX(0)',opacity:1},{transform:'scaleX(.72)',opacity:1,offset:.55},{transform:'scaleX(1)',opacity:0}],{duration:740,easing:'cubic-bezier(.22,1,.36,1)'});}
function stopIdle(){clearTimeout(idleT);idleT=0;}
function idle(){
 // Thumbnails scroll down and back on their own until someone hovers or presses a control.
 stopIdle();if(full||reduced||dead||touched)return;
 idleT=setTimeout(()=>{if(hovering||touched||dead)return;const v=view(),down=v.scrollTop<maxOf(v)/2;glide(down?maxOf(v):0,down?95:320,idle);},1400);
}
function select(i,user){
 if(i===active||dead)return;
 if(user){touched=true;stopIdle();}
 stopGlide();const prev=view();active=i;manual=false;
 tabs.forEach((t,k)=>{t.setAttribute('aria-selected',String(k===i));if(full)t.tabIndex=k===i?0:-1;});
 prev.classList.remove('is-active');prev.inert=true;
 const v=view();v.scrollTop=0;v.inert=false;v.classList.add('is-active');
 url.classList.add('is-swap');clearTimeout(swapT);
 swapT=setTimeout(()=>{setAddr(PAGES[i].host+PAGES[i].path);url.classList.remove('is-swap');},reduced?0:150);
 loadBar();sync();
 if(user)live.textContent='Switched to '+PAGES[i].label+', '+PAGES[i].host+PAGES[i].path;
 if(hovering&&!reduced)glide(maxOf(v),130);else idle();
}
const abort=new AbortController(),on=(n,e,f,o)=>n.addEventListener(e,f,Object.assign({signal:abort.signal},o));
tabs.forEach((t,k)=>on(t,'click',()=>select(k,true)));
on($('.'+C+'-tabs'),'keydown',e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;e.preventDefault();const k=(active+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;select(k,true);tabs[k].focus();});
views.forEach(v=>{
 on(v,'scroll',()=>{if(v===view())sync();},{passive:true});
 // Wheel, touch and keys hand the scroll back to the user.
 const take=()=>{if(glideRaf){stopGlide();}manual=true;stopIdle();};
 on(v,'wheel',take,{passive:true});on(v,'touchstart',take,{passive:true});on(v,'keydown',take);
});
if(!reduced){
 on(port,'pointerenter',e=>{if(e.pointerType!=='mouse')return;hovering=true;manual=false;stopIdle();glide(maxOf(view()),130);});
 on(port,'pointerleave',e=>{if(e.pointerType!=='mouse')return;hovering=false;if(!manual)glide(0,380,()=>idle());else idle();});
}
ctx.onAction('tab',()=>select((active+1)%PAGES.length,true));
ctx.onAction('scroll',()=>{touched=true;stopIdle();const v=view(),down=v.scrollTop<maxOf(v)/2;glide(down?maxOf(v):0,down?260:420);live.textContent=down?'Scrolled to the end of the page':'Scrolled to the top of the page';});
const fit=()=>{root.style.setProperty('--fit-scale',String(ctx.scale||1));sync();};
const ro=new ResizeObserver(fit);ro.observe(stage);ro.observe(port);views.forEach(v=>ro.observe(v.firstElementChild));fit();
// Load: the address types in, the bar sweeps and the page resolves.
const address=PAGES[0].host+PAGES[0].path;
// Thumbnails open already loaded so the tile never shows an empty page.
if(reduced||ctx.mode==='thumb'){setAddr(address);if(!reduced)idle();}else{
 root.classList.add('is-loading');setAddr('');url.classList.add('is-typing');let n=0;
 const tick=()=>{if(dead)return;n++;setAddr(address.slice(0,n));
  if(n<address.length)typeT=setTimeout(tick,n===13?150:34+(n%3)*9);
  else typeT=setTimeout(()=>{url.classList.remove('is-typing');loadBar();root.classList.remove('is-loading');idle();},180);};
 typeT=setTimeout(tick,300);
}
return()=>{dead=true;stopGlide();stopIdle();clearTimeout(typeT);clearTimeout(moveT);clearTimeout(swapT);abort.abort();ro.disconnect();};`,
  prompt: `Build an original, neutral browser window in plain HTML, CSS and JavaScript with no libraries and no vendor branding. The window is 880×440, radius 14px, with an outer 1px black ring and a long soft drop shadow, plus an overlay pseudo-element carrying the inset hairline (rgba(255,255,255,.09)) and a 1px top highlight so child backgrounds never hide it. The 40px tab strip (#121214) has three neutral 11px window dots and two tabs: "Changelog · Northwind" and "Quickstart · Northwind Docs", each with a 16px favicon. The selected tab merges into the 44px toolbar (#1a1a1c) through two 9px concave corner flares drawn with radial gradients; tabs are role="tab" buttons in a role="tablist" with aria-selected, aria-controls and ArrowLeft/ArrowRight. The toolbar has back, a dimmed forward and reload glyphs, a centred 30px address field with a lock glyph (host in #f2f2f2, path in #8c8c8c) and a share glyph and initials avatar on the right. On load the address types in character by character (about 34–52ms per character, a pause after the host), a blinking caret follows it, a 2px orange load bar sweeps under the toolbar and the page resolves in from opacity 0, translateY(8px) and blur(2px) over 400ms cubic-bezier(0.22, 1, 0.36, 1). Each tab panel is its own focusable (tabindex 0) scroll container with the native scrollbar hidden and a slim 4px custom rail at the right whose knob is sized by clientHeight / scrollHeight and positioned from scrollTop. Page one is a real changelog: a sticky blurred mini nav, a 26px "What’s new in Northwind" header, then dated releases in a 128px date column and a content column (v3.14 Edge functions in 41 regions with a photo, v3.13 Comments on preview deployments, v3.12.2 Faster cold builds with two stat tiles, v3.12.1 Fixes as a list, v3.12 Northwind CLI 3.0 with an install command) and tags (orange-tinted New, neutral others). Page two is a docs quickstart with a sticky sidebar, three numbered steps and terminal output. Hovering the page glides the real scrollTop to the bottom at 130px/s on an ease-in-out curve; leaving glides back at 380px/s; wheel, touch or keys hand control back to the user. Controls: Switch tab cross-fades the panels (out 150ms, in 250ms) and the address; Scroll glides to the end or back to the top. Thumbnails show the window's top-left with a mask fade and scroll down and back on their own. Under prefers-reduced-motion the address is shown at once, nothing auto-scrolls and the panels only fade.`
});
