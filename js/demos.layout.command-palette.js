/* v5 · Command palette: grouped commands and issues with fuzzy highlighting and a sliding selection. */
INTRX.register({
 id:"command-palette",
 title:"Command Palette",
 cat:"Layout & UI",
 rootClass:"d-command-demo",
 tags:["command palette","fuzzy search","keyboard"],
 libs:[],
 desc:"A command menu for a fictional Nimbus issue tracker. Suggestions, issues, navigation and actions sit in labelled groups with stroke icons and shortcut keys. Typing ranks them with a subsequence matcher and lights the matched letters; arrows slide the selection, Enter runs the command and Escape clears, then closes.",
 seen:"Pattern family: fuzzy command launchers",
 hint:"Press · type to filter, arrows to move, Enter to run; Ctrl or Command K toggles the menu",
 html:`<div class="d-command-demo" data-open="true"><button type="button" class="d-command-demo-trigger" data-ui="trigger" aria-haspopup="dialog" aria-expanded="true"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m15.5 15.5 4 4"/></svg><span>Search Nimbus or run a command…</span><kbd aria-hidden="true">⌘K</kbd></button><p class="d-command-demo-toast" data-ui="toast" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5.5 12.5 4 4 9-9"/></svg><span data-ui="toast-text"></span></p><section class="d-command-demo-card" data-ui="card" role="dialog" aria-label="Command menu"><div class="d-command-demo-header"><svg class="d-command-demo-search" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m15.5 15.5 4 4"/></svg><input class="d-command-demo-input" data-ui="input" type="text" role="combobox" aria-label="Search commands and issues" aria-autocomplete="list" aria-expanded="true" placeholder="Type a command or search…" autocomplete="off" spellcheck="false"><span class="d-command-demo-typed" data-ui="typed" aria-hidden="true"><span class="d-command-demo-typed-text" data-ui="typed-text"></span><i class="d-command-demo-caret"></i><span class="d-command-demo-ph">Type a command or search…</span></span><button type="button" class="d-command-demo-clear" data-ui="clear" aria-label="Clear search"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8 8 8M16 8l-8 8"/></svg></button></div><div class="d-command-demo-scroll" data-ui="scroll"><div class="d-command-demo-list" data-ui="list" role="listbox" aria-label="Results"><i class="d-command-demo-hl" data-ui="hl" aria-hidden="true"></i></div><div class="d-command-demo-empty" data-ui="empty"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m15.5 15.5 4 4M9 11h4"/></svg><p data-ui="empty-text"></p><span>Try “theme”, “go to” or an issue number</span></div></div><footer class="d-command-demo-foot"><span class="d-command-demo-brand"><i aria-hidden="true">N</i>Nimbus<span class="d-command-demo-tally" data-ui="tally"></span></span><span class="d-command-demo-hints" aria-hidden="true"><span><kbd>↑</kbd><kbd>↓</kbd>Navigate</span><span><kbd>↵</kbd>Open</span><span class="d-command-demo-hint-esc"><kbd>esc</kbd>Close</span></span></footer></section><span class="d-command-demo-status" data-ui="status" role="status"></span></div>`,
 css:`.d-command-demo{--fs:var(--fit-scale,1);--ink:#f2f2f2;--ink-2:#a3a3a3;--ink-3:#8a8a8a;--edge:rgba(255,255,255,.09);--edge-hi:rgba(255,255,255,.16);--fill:rgba(255,255,255,.05);--fill-hi:rgba(255,255,255,.075);--card-top:#1d1d1d;--card-bottom:#171717;--accent:#fa7319;--accent-ink:#ffa466;--small:max(11px,calc(11px / var(--fs)));position:relative;width:100%;height:100%;color:var(--ink);font:400 14px/20px Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-variant-numeric:tabular-nums}
.d-command-demo *{box-sizing:border-box}
.d-command-demo svg{display:block;flex:none;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.d-command-demo button{margin:0;border:0;font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
.d-command-demo button:focus-visible{outline:2px solid var(--focus-ring,#fa7319);outline-offset:2px}
.d-command-demo kbd{display:inline-grid;place-items:center;min-width:20px;height:20px;padding:0 5px;border-radius:5px;background:var(--fill);box-shadow:inset 0 0 0 1px var(--edge),inset 0 -1px 0 var(--edge);font:500 var(--small)/1 'Geist Mono',ui-monospace,monospace;color:var(--ink-2)}
/* Closed state: the trigger sits where the search field opens. */
.d-command-demo-trigger{position:absolute;left:calc(50% - 180px);top:0;z-index:1;display:flex;align-items:center;gap:10px;width:360px;height:46px;padding:0 11px 0 15px;border-radius:12px;background:linear-gradient(var(--card-top),var(--card-bottom));box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.35),0 14px 30px -16px rgba(0,0,0,.75);font-size:14px;text-align:left;opacity:0;visibility:hidden;transform:scale(.98);transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s var(--dur-quick,150ms)}
.d-command-demo-trigger svg{color:var(--ink-3)}
.d-command-demo-trigger span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-3)}
.d-command-demo[data-open="false"] .d-command-demo-trigger{opacity:1;visibility:visible;transform:none;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s}
@media (hover:hover){.d-command-demo-trigger:hover{box-shadow:inset 0 0 0 1px var(--edge-hi),inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.35),0 16px 34px -16px rgba(0,0,0,.8)}}
.d-command-demo-toast{position:absolute;left:0;right:0;top:62px;display:flex;align-items:center;gap:8px;width:max-content;max-width:100%;height:34px;margin:0 auto;padding:0 14px 0 10px;border-radius:10px;background:linear-gradient(var(--card-top),var(--card-bottom));box-shadow:inset 0 0 0 1px var(--edge),0 10px 24px -14px rgba(0,0,0,.7);font-size:13px;line-height:18px;color:var(--ink);white-space:nowrap;opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s var(--dur-quick,150ms)}
.d-command-demo-toast svg{width:15px;height:15px;color:var(--accent);stroke-width:2}
.d-command-demo-toast[data-show="true"]{opacity:1;visibility:visible;transform:none;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s}
/* The menu: modal recipe, 250ms in and 150ms out, from the search field. */
.d-command-demo-card{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;overflow:hidden;border-radius:16px;background:linear-gradient(var(--card-top),var(--card-bottom));box-shadow:0 2px 4px rgba(0,0,0,.3),0 30px 64px -26px rgba(0,0,0,.85);transform-origin:50% 23px;opacity:0;visibility:hidden;transform:translateY(-4px) scale(.96);filter:blur(2px);transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),filter var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s var(--dur-quick,150ms)}
.d-command-demo-card::after{content:"";position:absolute;inset:0;z-index:3;border-radius:inherit;box-shadow:inset 0 0 0 1px var(--edge),inset 0 1px 0 rgba(255,255,255,.06);pointer-events:none}
.d-command-demo[data-open="true"] .d-command-demo-card{opacity:1;visibility:visible;transform:none;filter:none;transition:opacity var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),transform var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),filter var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s}
.d-command-demo-header{position:relative;display:flex;align-items:center;gap:12px;flex:none;height:56px;padding:0 12px 0 19px;box-shadow:inset 0 -1px 0 var(--edge);transition:box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-command-demo-header:has(.d-command-demo-input:focus-visible){box-shadow:inset 0 -1px 0 rgba(250,115,25,.6)}
.d-command-demo-search{width:18px!important;height:18px!important;color:var(--ink-3)}
.d-command-demo-header:has(.d-command-demo-input:focus-visible) .d-command-demo-search{color:var(--accent)}
.d-command-demo-input{flex:1;min-width:0;height:100%;margin:0;padding:0;border:0;outline:none;background:transparent;color:var(--ink);font:400 16px/22px Geist,system-ui,sans-serif;letter-spacing:-.011em;caret-color:var(--accent);appearance:none}
.d-command-demo .d-command-demo-input:focus-visible{outline:none}
.d-command-demo-input::placeholder{color:var(--ink-3);opacity:1}
.d-command-demo-typed{display:none}
.d-command-demo-clear{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:8px;background:transparent;color:var(--ink-3);opacity:0;visibility:hidden;transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s var(--dur-quick,150ms)}
.d-command-demo[data-query="true"] .d-command-demo-clear{opacity:1;visibility:visible;transition:opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),background-color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),visibility 0s}
@media (hover:hover){.d-command-demo-clear:hover{background:var(--fill);color:var(--ink)}}
.d-command-demo-scroll{position:relative;flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.14) transparent}
.d-command-demo-list{position:relative;padding:6px 8px 8px}
.d-command-demo-hl{position:absolute;left:8px;right:8px;top:0;height:38px;border-radius:9px;background:var(--fill-hi);box-shadow:inset 0 0 0 1px var(--edge);opacity:0;pointer-events:none;transition:transform 160ms var(--ease-out,cubic-bezier(.22,1,.36,1)),height 160ms var(--ease-out,cubic-bezier(.22,1,.36,1)),opacity var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-command-demo-hl[data-on="true"]{opacity:1}
.d-command-demo-hl[data-snap="true"]{transition:none}
.d-command-demo-glabel{padding:12px 10px 6px;font-size:max(11.5px,calc(11px / var(--fs)));line-height:14px;font-weight:500;color:var(--ink-3)}
.d-command-demo-group:first-of-type .d-command-demo-glabel{padding-top:6px}
.d-command-demo-option{position:relative;z-index:1;display:flex;align-items:center;gap:11px;height:38px;padding:0 10px;border-radius:9px;color:var(--ink-2);font-size:13.5px;line-height:18px;cursor:pointer;user-select:none;-webkit-user-select:none;transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-command-demo-option[aria-selected="true"]{color:var(--ink)}
.d-command-demo-option[data-enter="true"]{animation:d-command-demo-row var(--dur-fast,250ms) var(--ease-out,cubic-bezier(.22,1,.36,1)) var(--d,0ms) both}
@keyframes d-command-demo-row{from{opacity:0;transform:translateY(4px)}}
.d-command-demo-icon{display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:7px;background:var(--fill);box-shadow:inset 0 0 0 1px var(--edge);color:var(--ink-2);transition:color var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1)),box-shadow var(--dur-quick,150ms) var(--ease-out,cubic-bezier(.22,1,.36,1))}
.d-command-demo-icon svg{width:15px;height:15px}
.d-command-demo-option[aria-selected="true"] .d-command-demo-icon{color:var(--ink);box-shadow:inset 0 0 0 1px var(--edge-hi)}
.d-command-demo .d-command-demo-icon-spark,.d-command-demo .d-command-demo-icon-progress{color:var(--accent)}
.d-command-demo-icon-done{color:var(--ink-2)}
.d-command-demo-text{display:flex;align-items:baseline;gap:9px;flex:1;min-width:0;white-space:nowrap}
.d-command-demo-id{flex:none;font:400 12px/18px 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-command-demo-label{min-width:0;overflow:hidden;text-overflow:ellipsis}
.d-command-demo-option mark{background:none;color:var(--accent-ink)}
.d-command-demo-keys{display:flex;gap:3px;flex:none}
.d-command-demo-type{flex:none;font-size:12px;color:var(--ink-3)}
.d-command-demo-avatar{display:grid;place-items:center;flex:none;width:22px;height:22px;border-radius:50%;background:var(--av,#333);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);font:600 var(--small)/1 Geist,system-ui,sans-serif;color:#f4efe9}
.d-command-demo-empty{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:24px;text-align:center;font-size:12.5px;line-height:18px;color:var(--ink-3)}
.d-command-demo-empty svg{width:22px;height:22px;margin-bottom:6px}
.d-command-demo-empty p{margin:0;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;line-height:20px;font-weight:500;color:var(--ink)}
.d-command-demo[data-empty="true"] .d-command-demo-empty{display:flex}
.d-command-demo[data-empty="true"] .d-command-demo-list{display:none}
.d-command-demo-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex:none;height:42px;padding:0 12px 0 14px;background:rgba(255,255,255,.02);box-shadow:inset 0 1px 0 var(--edge);font-size:12px;line-height:16px;color:var(--ink-3)}
.d-command-demo-brand{display:flex;align-items:center;gap:8px;min-width:0;font-weight:500;color:var(--ink-2);white-space:nowrap}
.d-command-demo-brand i{display:grid;place-items:center;flex:none;width:18px;height:18px;border-radius:5px;background:linear-gradient(#ff8b3d,#e8620e);box-shadow:inset 0 1px 0 rgba(255,255,255,.3);font:700 11px/1 Geist,system-ui,sans-serif;font-style:normal;color:#2a1405}
.d-command-demo-tally{font:400 var(--small)/1 'Geist Mono',ui-monospace,monospace;color:var(--ink-3)}
.d-command-demo-tally:not(:empty)::before{content:"·";margin:0 7px 0 1px}
.d-command-demo-hints{display:flex;align-items:center;gap:14px;white-space:nowrap}
.d-command-demo-hints>span{display:flex;align-items:center;gap:4px}
.d-command-demo-hints kbd{min-width:18px;height:18px;padding:0 4px;margin-right:2px}
.d-command-demo-hints kbd+kbd{margin-left:-1px}
.d-command-demo-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
/* Thumbnail: the menu mid-search, fuzzy letters lit, one row selected. */
.d-command-demo[data-mode="thumb"] .d-command-demo-trigger,.d-command-demo[data-mode="thumb"] .d-command-demo-toast,.d-command-demo[data-mode="thumb"] .d-command-demo-input,.d-command-demo[data-mode="thumb"] .d-command-demo-clear,.d-command-demo[data-mode="thumb"] .d-command-demo-hint-esc,.d-command-demo[data-mode="thumb"] .d-command-demo-tally{display:none}
.d-command-demo[data-mode="thumb"] .d-command-demo-card{border-radius:13px}
.d-command-demo[data-mode="thumb"] .d-command-demo-header{height:39px;gap:9px;padding:0 12px 0 14px}
.d-command-demo[data-mode="thumb"] .d-command-demo-search{width:15px!important;height:15px!important}
.d-command-demo[data-mode="thumb"] .d-command-demo-typed{display:flex;align-items:center;flex:1;min-width:0;white-space:nowrap;font-size:max(13.5px,calc(13px / var(--fs)));line-height:20px;color:var(--ink)}
.d-command-demo-caret{flex:none;width:2px;height:16px;margin:0 1px;border-radius:1px;background:var(--accent);animation:d-command-demo-blink 1.06s steps(1) infinite}
@keyframes d-command-demo-blink{50%{opacity:0}}
.d-command-demo-ph{overflow:hidden;text-overflow:ellipsis;color:var(--ink-3)}
.d-command-demo-typed-text:not(:empty)~.d-command-demo-ph{display:none}
.d-command-demo[data-mode="thumb"] .d-command-demo-scroll{overflow:hidden}
.d-command-demo[data-mode="thumb"] .d-command-demo-list{padding:3px 6px}
.d-command-demo[data-mode="thumb"] .d-command-demo-hl{left:6px;right:6px;border-radius:8px}
.d-command-demo[data-mode="thumb"] .d-command-demo-glabel{padding:6px 8px 3px}
.d-command-demo[data-mode="thumb"] .d-command-demo-group:first-of-type .d-command-demo-glabel{padding-top:4px}
.d-command-demo[data-mode="thumb"] .d-command-demo-option{height:31px;gap:9px;padding:0 8px;font-size:max(12.5px,calc(12px / var(--fs)))}
.d-command-demo[data-mode="thumb"] .d-command-demo-icon{width:22px;height:22px;border-radius:6px}
.d-command-demo[data-mode="thumb"] .d-command-demo-icon svg{width:14px;height:14px}
.d-command-demo[data-mode="thumb"] .d-command-demo-id{font-size:var(--small)}
.d-command-demo[data-mode="thumb"] .d-command-demo-avatar{width:20px;height:20px}
.d-command-demo[data-mode="thumb"] .d-command-demo-foot{height:29px;padding:0 10px 0 12px;font-size:var(--small)}
.d-command-demo[data-mode="thumb"] .d-command-demo-brand i{width:16px;height:16px;border-radius:4px}
.d-command-demo[data-mode="thumb"] .d-command-demo-hints{gap:10px}
[data-stage-theme="light"] .d-command-demo{--ink:#171717;--ink-2:#525252;--ink-3:#6b6b6b;--edge:rgba(0,0,0,.09);--edge-hi:rgba(0,0,0,.16);--fill:rgba(0,0,0,.04);--fill-hi:rgba(0,0,0,.055);--card-top:#fff;--card-bottom:#fbfbfb;--accent-ink:#c2510a}
[data-stage-theme="light"] .d-command-demo-card{box-shadow:0 1px 2px rgba(0,0,0,.06),0 26px 56px -26px rgba(0,0,0,.28)}
[data-stage-theme="light"] .d-command-demo-trigger,[data-stage-theme="light"] .d-command-demo-toast{box-shadow:inset 0 0 0 1px var(--edge),0 1px 2px rgba(0,0,0,.06),0 14px 30px -18px rgba(0,0,0,.22)}
[data-stage-theme="light"] .d-command-demo-foot{background:rgba(0,0,0,.02)}
[data-stage-theme="light"] .d-command-demo-scroll{scrollbar-color:rgba(0,0,0,.18) transparent}
[data-stage-theme="light"] .d-command-demo-avatar{box-shadow:none}
@media (prefers-reduced-motion:reduce){.d-command-demo *{animation:none!important}.d-command-demo .d-command-demo-card,.d-command-demo .d-command-demo-trigger,.d-command-demo .d-command-demo-toast{transform:none!important;filter:none!important}.d-command-demo .d-command-demo-hl{transition:opacity var(--dur-quick,150ms) ease-in-out!important}.d-command-demo[data-open="true"] .d-command-demo-card,.d-command-demo[data-open="false"] .d-command-demo-trigger,.d-command-demo .d-command-demo-toast[data-show="true"]{transition:opacity var(--dur-quick,150ms) ease-in-out,visibility 0s!important}}`,
 js:`const C='d-command-demo',q=n=>root.querySelector('[data-ui="'+n+'"]');
const reduced=ctx.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches,thumb=ctx.mode==='thumb';
root.dataset.mode=ctx.mode;
const abort=new AbortController(),on=(n,e,f)=>n.addEventListener(e,f,{signal:abort.signal});
const trigger=q('trigger'),card=q('card'),input=q('input'),scroller=q('scroll'),list=q('list'),hl=q('hl'),status=q('status'),toast=q('toast'),clear=q('clear'),typed=q('typed-text');
const uid=C+'-'+Math.random().toString(36).slice(2,8);list.id=uid+'-list';card.id=uid+'-card';input.setAttribute('aria-controls',list.id);trigger.setAttribute('aria-controls',card.id);
const SVG=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const ICON={
 plus:SVG('<rect x="4.5" y="4.5" width="15" height="15" rx="4"/><path d="M12 8.5v7M8.5 12h7"/>'),
 spark:SVG('<path d="M12 3.5c.7 4.4 2.9 6.6 7.5 7.5-4.6.9-6.8 3.1-7.5 7.5-.7-4.4-2.9-6.6-7.5-7.5 4.6-.9 6.8-3.1 7.5-7.5z"/>'),
 search:SVG('<circle cx="11" cy="11" r="6"/><path d="m15.5 15.5 4 4"/>'),
 progress:SVG('<circle cx="12" cy="12" r="7"/><path d="M12 8.2a3.8 3.8 0 0 1 0 7.6z" fill="currentColor" stroke="none"/>'),
 todo:SVG('<circle cx="12" cy="12" r="7"/>'),
 done:SVG('<circle cx="12" cy="12" r="7"/><path d="m9 12.2 2.1 2.1 4-4.3"/>'),
 inbox:SVG('<path d="M4.5 13.5 6.8 6.1A1.6 1.6 0 0 1 8.3 5h7.4a1.6 1.6 0 0 1 1.5 1.1l2.3 7.4v4A1.5 1.5 0 0 1 18 19H6a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M4.5 13.5h4l1 2h5l1-2h4"/>'),
 user:SVG('<circle cx="12" cy="9" r="3.5"/><path d="M5.5 19c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5"/>'),
 cube:SVG('<path d="M12 3.8 19.5 8v8L12 20.2 4.5 16V8z"/><path d="M4.5 8 12 12.2 19.5 8M12 12.2v8"/>'),
 cycle:SVG('<path d="M19 12a7 7 0 1 1-2.05-4.95"/><path d="M19.5 4.5v4h-4"/>'),
 assign:SVG('<circle cx="10" cy="9" r="3.5"/><path d="M4 19c1-3 3.3-4.5 6-4.5 1.3 0 2.5.3 3.5 1M17.5 13v6M14.5 16h6"/>'),
 theme:SVG('<circle cx="12" cy="12" r="7.5"/><path d="M12 4.5a7.5 7.5 0 0 0 0 15z" fill="currentColor" stroke="none"/>'),
 export:SVG('<path d="M12 4.5v10M8 10.5l4 4 4-4"/><path d="M5 15.5v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>'),
 switch:SVG('<path d="M6.5 8.5h11l-3-3M17.5 15.5h-11l3 3"/>'),
 sliders:SVG('<path d="M5 7.5h8M17 7.5h2M5 16.5h2M11 16.5h8"/><circle cx="15" cy="7.5" r="2"/><circle cx="9" cy="16.5" r="2"/>'),
 keyboard:SVG('<rect x="3.5" y="6.5" width="17" height="11" rx="2.5"/><path d="M7.5 10h.01M10.5 10h.01M13.5 10h.01M16.5 10h.01M8.5 14h7"/>')
};
const GROUPS=[['suggest','Suggestions'],['issues','Issues'],['nav','Navigation'],['actions','Actions']];
const ITEMS=[
 {g:'suggest',icon:'plus',label:'Create new issue',keys:['C'],done:'New issue draft opened'},
 {g:'suggest',icon:'spark',label:'Ask Atlas about this view',keys:['⌘','J'],done:'Atlas is reading this view'},
 {g:'suggest',icon:'search',label:'Search issues',keys:['/'],done:'Searching 128 open issues'},
 {g:'issues',icon:'progress',id:'NIM-1284',label:'Export fails for null region',state:'In progress, Priya Shah',who:'PS',av:'#5a3b27',done:'Opened NIM-1284'},
 {g:'issues',icon:'todo',id:'NIM-1279',label:'Retry failed charges with backoff',state:'Todo, Marco Ruiz',who:'MR',av:'#2f3d4a',done:'Opened NIM-1279'},
 {g:'issues',icon:'done',id:'NIM-1266',label:'Cache tags for product pages',state:'Done, Sara Kim',who:'SK',av:'#34432f',done:'Opened NIM-1266'},
 {g:'nav',icon:'inbox',label:'Go to Inbox',keys:['G','I'],done:'Inbox · 4 unread'},
 {g:'nav',icon:'user',label:'Go to My issues',keys:['G','M'],done:'My issues · 7 open'},
 {g:'nav',icon:'cube',label:'Go to Projects',keys:['G','P'],done:'Projects · Halden launch'},
 {g:'nav',icon:'cycle',label:'Go to Cycles',keys:['G','C'],done:'Cycle 24 · 3 days left'},
 {g:'actions',icon:'assign',label:'Assign NIM-1284 to me',keys:['I'],done:'NIM-1284 assigned to you'},
 {g:'actions',icon:'theme',label:'Toggle dark theme',keys:['⌘','⇧','L'],done:'Theme switched'},
 {g:'actions',icon:'export',label:'Export issues as CSV',type:'Action',done:'Preparing 128 issues as CSV'},
 {g:'actions',icon:'switch',label:'Switch workspace',keys:['O','W'],done:'Workspace switcher opened'},
 {g:'actions',icon:'sliders',label:'Open settings',keys:['⌘',','],done:'Settings opened'},
 {g:'actions',icon:'keyboard',label:'Keyboard shortcuts',keys:['?'],done:'Shortcut sheet opened'}
];
let open=true,query='',results=[],active=0,engaged=false,returnFocus=null,focusFrame=0,snapFrame=0,token=0,typing=0,executions=0,last='none',dead=false,toastTimer=0,announceTimer=0;
const timers=new Set(),later=(f,ms)=>{const id=setTimeout(()=>{timers.delete(id);f();},ms);timers.add(id);return id;},wait=ms=>new Promise(r=>later(r,ms));
/* The original subsequence matcher: character gaps cost, a hit at the start earns a bonus. */
function match(label,q){if(!q)return {score:0,indexes:[]};let at=0,score=0,indexes=[];for(const ch of q.toLowerCase()){const found=label.toLowerCase().indexOf(ch,at);if(found<0)return null;score+=found-at+(found===0?-.5:0);indexes.push(found);at=found+1;}return {score,indexes};}
function marked(text,hits,offset){const frag=document.createDocumentFragment();let run='',lit=null;const flush=()=>{if(!run)return;if(lit){const m=document.createElement('mark');m.textContent=run;frag.append(m);}else frag.append(run);run='';};for(let i=0;i<text.length;i++){const h=hits.has(i+offset);if(h!==lit){flush();lit=h;}run+=text[i];}flush();return frag;}
const fullText=it=>it.id?it.id+' '+it.label:it.label;
function compute(){
 const hits=ITEMS.map((it,index)=>{const m=match(fullText(it),query);return m?{it,index,score:m.score,hits:new Set(m.indexes)}:null;}).filter(Boolean);
 const groups=GROUPS.map(([key,name],gi)=>{const rows=hits.filter(h=>h.it.g===key);if(query)rows.sort((a,b)=>a.score-b.score||a.index-b.index);return {key,name,gi,rows,best:rows.length?rows[0].score:Infinity};}).filter(g=>g.rows.length);
 if(query)groups.sort((a,b)=>a.best-b.best||a.gi-b.gi);
 return groups;
}
function makeRow(h,i,enter){
 const it=h.it,r=document.createElement('div');r.className=C+'-option';r.id=uid+'-opt-'+i;r.setAttribute('role','option');r.setAttribute('aria-selected','false');r.dataset.i=i;
 if(enter){r.dataset.enter='true';r.style.setProperty('--d',Math.min(i,6)*40+'ms');}
 const ic=document.createElement('span');ic.className=C+'-icon '+C+'-icon-'+it.icon;ic.innerHTML=ICON[it.icon];
 const text=document.createElement('span');text.className=C+'-text';
 if(it.id){const id=document.createElement('span');id.className=C+'-id';id.append(marked(it.id,h.hits,0));text.append(id);}
 const label=document.createElement('span');label.className=C+'-label';label.append(marked(it.label,h.hits,it.id?it.id.length+1:0));text.append(label);
 r.append(ic,text);
 if(it.keys){const k=document.createElement('span');k.className=C+'-keys';k.setAttribute('aria-hidden','true');it.keys.forEach(x=>{const b=document.createElement('kbd');b.textContent=x;k.append(b);});r.append(k);}
 if(it.type){const t=document.createElement('span');t.className=C+'-type';t.setAttribute('aria-hidden','true');t.textContent=it.type;r.append(t);}
 if(it.who){const a=document.createElement('span');a.className=C+'-avatar';a.setAttribute('aria-hidden','true');a.style.setProperty('--av',it.av);a.textContent=it.who;r.append(a);r.setAttribute('aria-label',it.id+' '+it.label+', '+it.state);}
 return r;
}
function render(source){
 const groups=compute(),enter=source==='open'&&!reduced;results=[];
 list.querySelectorAll('.'+C+'-group').forEach(n=>n.remove());
 groups.forEach(g=>{const box=document.createElement('div');box.className=C+'-group';box.setAttribute('role','group');const lab=document.createElement('div');lab.className=C+'-glabel';lab.id=uid+'-g-'+g.key;lab.setAttribute('aria-hidden','true');lab.textContent=g.name;box.setAttribute('aria-labelledby',lab.id);box.append(lab);
  g.rows.forEach(h=>{box.append(makeRow(h,results.length,enter));results.push(h);});list.append(box);});
 active=Math.min(Math.max(0,active),Math.max(0,results.length-1));
 root.dataset.empty=String(!results.length);root.dataset.query=String(!!query);root.dataset.results=String(results.length);
 if(!results.length)q('empty-text').textContent='No results for “'+query+'”';
 q('tally').textContent=results.length+(results.length===1?' result':' results');
 paint(true);
}
function paint(snap){
 const rows=list.querySelectorAll('[role="option"]'),r=rows[active];
 rows.forEach((n,i)=>n.setAttribute('aria-selected',String(i===active)));
 if(open&&r)input.setAttribute('aria-activedescendant',r.id);else input.removeAttribute('aria-activedescendant');
 root.dataset.active=String(active);
 if(!r){hl.dataset.on='false';return;}
 cancelAnimationFrame(snapFrame);
 if(snap)hl.dataset.snap='true';
 hl.style.transform='translateY('+r.offsetTop+'px)';hl.style.height=r.offsetHeight+'px';hl.dataset.on='true';
 if(snap)snapFrame=requestAnimationFrame(()=>{delete hl.dataset.snap;});
}
function scrollActive(){
 const r=list.querySelectorAll('[role="option"]')[active];if(!r)return;
 const g=r.parentElement,first=g.querySelector('[role="option"]')===r;
 const top=active===0?0:first?g.offsetTop:r.offsetTop-4,bottom=r.offsetTop+r.offsetHeight+8;
 if(top<scroller.scrollTop)scroller.scrollTop=top;else if(bottom>scroller.scrollTop+scroller.clientHeight)scroller.scrollTop=bottom-scroller.clientHeight;
}
function announce(){clearTimeout(announceTimer);announceTimer=later(()=>{status.textContent=results.length?results.length+(results.length===1?' result':' results'):'No results';},400);}
function setOpen(v){open=v;root.dataset.open=String(v);trigger.setAttribute('aria-expanded',String(v));input.setAttribute('aria-expanded',String(v));card.inert=!v;trigger.inert=v;}
function show(source,focus){
 cancelAnimationFrame(focusFrame);const own=++token;
 if(!open){returnFocus=document.activeElement;setOpen(true);query='';input.value='';active=0;scroller.scrollTop=0;render('open');}
 if(focus!==false){engaged=true;focusFrame=requestAnimationFrame(()=>{if(own===token&&open&&!dead)input.focus({preventScroll:true});});}
}
function close(source,restore){
 if(!open)return;cancelAnimationFrame(focusFrame);clearTimeout(announceTimer);token++;typing++;
 const had=root.contains(document.activeElement);setOpen(false);engaged=false;input.removeAttribute('aria-activedescendant');
 if(restore!==false&&had){const back=returnFocus&&returnFocus.isConnected&&returnFocus!==document.body&&!card.contains(returnFocus)?returnFocus:trigger;back.focus({preventScroll:true});}
 returnFocus=null;
}
function flashToast(text){q('toast-text').textContent=text;toast.dataset.show='true';clearTimeout(toastTimer);toastTimer=later(()=>{toast.dataset.show='false';},2600);}
function execute(){
 const h=results[active];if(!h)return;const it=h.it,name=fullText(it);last=name;executions++;root.dataset.executions=String(executions);root.dataset.last=last;
 close('execute');flashToast(it.done);status.textContent=name+'. '+it.done;ctx.emit('command',{name});
}
function setQuery(v){query=v;active=0;render('input');scroller.scrollTop=0;}
on(trigger,'click',()=>show('press'));
on(input,'focus',()=>{engaged=true;});
on(input,'input',()=>{typing++;setQuery(input.value.trim());announce();});
on(clear,'click',()=>{typing++;input.value='';setQuery('');input.focus({preventScroll:true});announce();});
on(list,'pointerdown',e=>{if(e.target.closest('[role="option"]'))e.preventDefault();});
on(list,'pointermove',e=>{if(e.pointerType!=='mouse')return;const r=e.target.closest('[role="option"]');if(!r)return;const i=Number(r.dataset.i);if(i!==active){active=i;paint(false);}});
on(list,'click',e=>{const r=e.target.closest('[role="option"]');if(!r||thumb)return;active=Number(r.dataset.i);paint(false);execute();});
on(root,'keydown',e=>{
 if((e.metaKey||e.ctrlKey)&&!e.altKey&&e.key.toLowerCase()==='k'){e.preventDefault();e.stopPropagation();if(open)close('shortcut');else show('shortcut');return;}
 if(!open||thumb||!card.contains(e.target))return;
 const n=results.length;
 if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();e.stopPropagation();if(!n)return;active=(active+(e.key==='ArrowDown'?1:-1)+n)%n;paint(false);scrollActive();return;}
 if(e.key==='Home'||e.key==='End'){e.preventDefault();e.stopPropagation();if(!n)return;active=e.key==='Home'?0:n-1;paint(false);scrollActive();return;}
 if(e.key==='Enter'){e.preventDefault();e.stopPropagation();execute();return;}
 if(e.key==='Escape'){e.preventDefault();e.stopPropagation();if(query){typing++;input.value='';setQuery('');status.textContent='Search cleared';return;}close('escape');status.textContent='Command menu closed';}
});
on(document,'pointerdown',e=>{if(open&&engaged&&!thumb&&!root.contains(e.target))close('outside',false);});
async function typeExample(){
 const own=++typing,word='thm';show('example');input.value='';setQuery('');
 if(reduced){input.value=word;setQuery(word);announce();return;}
 for(let i=1;i<=word.length;i++){await wait(i===1?260:130);if(dead||own!==typing||!open)return;input.value=word.slice(0,i);setQuery(input.value);}
 announce();
}
async function loop(){
 const set=(v,a)=>{typed.textContent=v;query=v;active=a;render('input');};
 if(reduced){set('gp',0);return;}
 while(!dead){set('',0);await wait(1000);if(dead)return;set('g',0);await wait(500);if(dead)return;set('gp',0);await wait(1300);if(dead)return;active=1;paint(false);await wait(1500);if(dead)return;active=0;paint(false);await wait(1600);}
}
ctx.onAction('open',()=>{if(open){engaged=true;input.focus({preventScroll:true});}else show('action');});
ctx.onAction('query',()=>{typeExample();});
ctx.onAction('replay',()=>{typing++;toast.dataset.show='false';if(!open)show('replay',false);input.value='';setQuery('');executions=0;last='none';status.textContent='Command menu reset';});
setOpen(true);
if(thumb)loop();else render('initial');
const fit=()=>{root.style.setProperty('--fit-scale',String(ctx.scale||1));if(results.length)paint(true);};
const ro=new ResizeObserver(fit);ro.observe(stage);fit();
return()=>{dead=true;token++;typing++;cancelAnimationFrame(focusFrame);cancelAnimationFrame(snapFrame);timers.forEach(clearTimeout);timers.clear();abort.abort();ro.disconnect();};`,
 prompt:`Build a command palette in plain HTML, CSS and JavaScript with no libraries, on a dark stage with no outer panel. A 600 by 392 card (16px radius, #1d1d1d to #171717, a 1px inset hairline and top highlight, a long soft shadow) has a 56px search header with an 18px stroke magnifier and a 16px native input whose caret is orange #fa7319, a clear button that appears once there is a query, a scrolling list and a 42px footer. The footer shows an orange N workspace mark, Nimbus and a Geist Mono result count on the left, and kbd hints (up and down Navigate, return Open, esc Close) on the right. Results sit in labelled groups: Suggestions (Create new issue C, Ask Atlas about this view with an orange spark and Command J, Search issues /), Issues (NIM-1284 Export fails for null region in progress with an orange half-filled status ring, NIM-1279 Retry failed charges with backoff todo, NIM-1266 Cache tags for product pages done, each with a mono id and an initials avatar), Navigation (Go to Inbox G I, My issues, Projects, Cycles) and Actions (Assign NIM-1284 to me, Toggle dark theme Command Shift L, Export issues as CSV, Switch workspace, Open settings, Keyboard shortcuts). Every row is 38px with a 24px rounded icon tile holding a 15px stroke icon, the label and trailing kbd chips. Filter with a subsequence matcher that scores character gaps with a start bonus, keep matched indexes, sort each group by score and order groups by their best match; wrap matched letters in mark elements coloured #ffa466. The input is a combobox controlling a listbox of role=group sections; aria-activedescendant points at the selected option, whose id is unique per mount. A single highlight slides to the selected row over 160ms cubic-bezier(.22,1,.36,1) and snaps without sliding after filtering. Arrows wrap, Home and End jump, Enter runs the command, closes the menu, shows a toast such as "NIM-1284 assigned to you" and announces it politely; Escape clears the query first and closes on the second press; Ctrl or Command K toggles the menu while focus is inside and stops propagation. Mouse movement selects rows without stealing focus from the input. When closed, a 360px trigger reading "Search Nimbus or run a command…" with a Command K chip sits where the search field opens. Opening uses opacity, a 4px drop, scale .96 to 1 and a 2px blur over 250ms (closing 150ms) with rows rising 4px in a 40ms stagger; filtering never replays the entrance. An empty query shows every group; no match shows a centred empty state with suggestions. The thumbnail types gp so Go to Projects and NIM-1266 light their G and P, then moves the selection. Under prefers-reduced-motion the menu fades over 150ms, rows and the highlight move without sliding and the thumbnail is a still. Support a light stage through the colour variables.`
});
