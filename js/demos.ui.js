/* INTRX registry — LAYOUT & UI */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

/* ------------------------------------------------------------
   Mac-style minimize / maximize
------------------------------------------------------------ */
/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"mac-window",
 title:"Genie Minimize",
 cat:"Layout & UI",
 rootClass:"d-mac",
 tags:["FLIP","window","dock"],
 libs:[],
 desc:"A small window resolves into its dock target with measured local translation and scale. Reverse the transition at any point through the native dock or window controls.",
 seen:"Pattern family: desktop window-to-dock transitions",
 hint:"Press · The window pours itself into the dock",
 html:`<div class="d-mac"><div class="d-mac-window" role="group" aria-label="Demo window"><img class="d-mac-silhouette" src="{{asset:layout2-mac-silhouette}}" alt=""><div class="d-mac-header"></div><span class="d-mac-dot" aria-hidden="true" style="left:4px"><img src="{{asset:layout2-mac-dot}}" alt=""></span><button class="d-mac-dot" type="button" aria-label="Minimize window" style="left:14px"><img src="{{asset:layout2-mac-dot}}" alt=""></button><span class="d-mac-dot" aria-hidden="true" style="left:24px"><img src="{{asset:layout2-mac-dot}}" alt=""></span></div><button class="d-mac-target" type="button" aria-label="Restore window from dock"><i aria-hidden="true"></i></button><span class="d-mac-status" role="status"></span></div>`,
 css:`.d-mac{position:relative;top:4px;font-family:Inter,system-ui,sans-serif}.d-mac-window{position:absolute;left:24px;top:22px;width:152px;height:126px;transform-origin:50% 100%;transition:transform var(--dur-medium) var(--ease-settle),opacity var(--dur-fast) var(--ease-out)}.d-mac-silhouette{position:absolute;left:-.5px;top:-.5px;display:block}.d-mac-header{position:absolute;left:0;top:0;width:152px;height:20px;border-radius:6px;background:#ffffff0a}.d-mac-dot{position:absolute;top:2px;width:14px;height:16px;border:0;padding:0;border-radius:4px;background:none;cursor:pointer}.d-mac-dot img{position:absolute;left:4px;top:5px;display:block}.d-mac-target{position:absolute;left:40px;top:150px;width:120px;height:30px;padding:0;border:1px solid #ffffff1c;border-radius:10px;background:#1c1c1c;cursor:pointer}.d-mac-target i{position:absolute;left:47px;top:4px;width:20px;height:20px;border-radius:6px;background:#3a3a3a;transition:background var(--dur-quick) var(--ease-out)}.d-mac[data-minimized="true"] .d-mac-window{opacity:0;pointer-events:none;transition:transform var(--dur-fast) var(--ease-out),opacity var(--dur-quick) var(--ease-out)}.d-mac[data-minimized="true"] .d-mac-target i{background:#f1f1f1}.d-mac-dot:focus-visible,.d-mac-target:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}.d-mac-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-mac-window{transition:opacity var(--dur-quick) var(--ease-out)!important;transform:none!important}}.d-mac[data-mode="thumb"] .d-mac-window{top:-18px}.d-mac[data-mode="thumb"] .d-mac-target{top:110px}.d-mac[data-mode="thumb"][data-compact="true"] .d-mac-target{top:100px}`,
 js:`const win=root.querySelector('.d-mac-window'),target=root.querySelector('.d-mac-target'),dots=[...root.querySelectorAll('.d-mac-dot')],status=root.querySelector('[role="status"]');let minimized=false;
function set(next){minimized=next;const tile=target.querySelector('i').getBoundingClientRect(),bounds=root.getBoundingClientRect(),width=tile.width/ctx.scale,height=tile.height/ctx.scale,dx=(tile.left-bounds.left+tile.width/2)/ctx.scale-win.offsetLeft-win.offsetWidth/2,dy=(tile.bottom-bounds.top)/ctx.scale-win.offsetTop-win.offsetHeight;win.style.transform=next?'translate('+dx+'px,'+dy+'px) scale('+(width/win.offsetWidth)+','+(height/win.offsetHeight)+')':'none';root.dataset.minimized=String(next);win.inert=next;target.setAttribute('aria-label',next?'Restore window from dock':'Window is open');if(next&&win.contains(document.activeElement))target.focus();status.textContent=next?'Window minimized to dock':'Window restored';ctx.emit('window',{minimized:next});}
dots[1].addEventListener('click',()=>set(true));target.addEventListener('click',()=>{if(minimized){set(false);if(ctx.mode==='full')dots[1].focus();}});ctx.onAction('toggle',()=>set(!minimized));root.dataset.minimized='false';root.dataset.mode=ctx.mode;const observer=new ResizeObserver(()=>root.dataset.compact=String(ctx.size.h<230));observer.observe(stage);root.dataset.compact=String(ctx.size.h<230);return()=>observer.disconnect();`,
 prompt:`Recreate original Genie Minimize tile184:1806 in a200x180 plane. Place the unmodified153x127 silhouette at23.5,21.5 with the native152x20 header24,22 and three original6px dots at32/42/52,29. Only the center dot is a native Minimize button; the flanking dots are decorative. All own their artwork without resizing. The120x30 dock is40,150 with20px placeholder47,4. No outer frame or idle demo controls. Minimize measures the untransformed window and dock local boxes, resolves translation plus scale into the20px target with250ms ease-out and150ms opacity; restore reverses from the current CSS interpolated state with350ms ease-settle and250ms opacity. Rapid toggles retarget without timers or stale completion. Make window inert while folded, return native focus to dock then restore control, expose Toggle/Reset actions, status and events. Reduced motion uses150ms opacity and no transform. Keep the exact v4 held silhouette as the initial composition.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"dock-magnify",
 title:"Dock Magnify",
 cat:"Layout & UI",
 rootClass:"d-dock",
 tags:["proximity","smoothstep","cursor"],
 libs:[],
 desc:"Seven neutral marks respond to distance from a pointer or keyboard selection. Influence uses fixed local centers, smoothstep falloff and time-based easing that stops at rest.",
 seen:"Pattern family: desktop dock magnification",
 hint:"Hover · Icons swell around the pointer like a lens",
 html:`<div class="d-dock" role="group" aria-label="Magnifying dock"><div class="d-dock-bar"></div><button class="d-dock-icon" type="button" aria-label="Application 1" aria-pressed="false" style="left:23px;top:88px;width:28px;height:28px;border-radius:7.28px"></button><button class="d-dock-icon" type="button" aria-label="Application 2" aria-pressed="false" style="left:57px;top:84px;width:32px;height:32px;border-radius:8.32px"></button><button class="d-dock-icon" type="button" aria-label="Application 3" aria-pressed="false" style="left:95px;top:78px;width:38px;height:38px;border-radius:9.88px"></button><button class="d-dock-icon" type="button" aria-label="Application 4" aria-pressed="true" style="left:139px;top:70px;width:46px;height:46px;border-radius:11.96px"></button><button class="d-dock-icon" type="button" aria-label="Application 5" aria-pressed="false" style="left:191px;top:78px;width:38px;height:38px;border-radius:9.88px"></button><button class="d-dock-icon" type="button" aria-label="Application 6" aria-pressed="false" style="left:235px;top:84px;width:32px;height:32px;border-radius:8.32px"></button><button class="d-dock-icon" type="button" aria-label="Application 7" aria-pressed="false" style="left:273px;top:88px;width:28px;height:28px;border-radius:7.28px"></button><img class="d-dock-indicator" src="{{asset:layout2-dock-indicator}}" alt=""><span class="d-dock-status" role="status"></span></div>`,
 css:`.d-dock{position:relative;top:4px;font-family:Inter,system-ui,sans-serif}.d-dock-bar{position:absolute;left:11px;top:64px;width:302px;height:60px;border:1px solid #ffffff1c;border-radius:18px;background:#1c1c1c;box-shadow:0 1px 2px #0000001f,0 8px 20px #0000002e}.d-dock-icon{position:absolute;display:block;padding:0;border:1px solid #ffffff1c;background:#2a2a2a;transform-origin:50% 100%;cursor:pointer}.d-dock-icon:nth-of-type(4){background:#3a3a3a;box-shadow:0 1px 2px #0000001f,0 8px 20px #0000002e}.d-dock-icon:focus-visible{outline:2px solid var(--focus-ring);outline-offset:3px}.d-dock-indicator{position:absolute;left:160px;top:128px;display:block;transition:transform var(--dur-fast) var(--ease-out)}.d-dock-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-dock-icon{transform:none!important}.d-dock-indicator{transition:none}}`,
 js:`const icons=[...root.querySelectorAll('button')],indicator=root.querySelector('img'),status=root.querySelector('[role="status"]'),abort=new AbortController(),options={signal:abort.signal},initial=[28,32,38,46,38,32,28],centers=icons.map(i=>i.offsetLeft+i.offsetWidth/2);let target=null,sizes=initial.slice(),frame=0,last=0,selected=3;
function paint(){icons.forEach((icon,i)=>icon.style.transform='scale('+(sizes[i]/initial[i])+')');root.dataset.sizes=sizes.map(v=>v.toFixed(2)).join(',');root.dataset.following=String(!!frame);}
function tick(t){frame=0;const dt=Math.min(40,last?t-last:1000/60),blend=1-Math.pow(.82,dt/(1000/60));last=t;let moving=false;sizes=sizes.map((size,i)=>{const fall=target===null?0:Math.max(0,1-Math.abs(target-centers[i])/110),wanted=24*(1+.9*fall*fall*(3-2*fall)),next=size+(wanted-size)*blend;if(Math.abs(next-wanted)>.015)moving=true;return Math.abs(next-wanted)<.015?wanted:next;});if(moving)frame=requestAnimationFrame(tick);else last=0;paint();}
function aim(x){target=x;if(ctx.reducedMotion)return;if(!frame){last=0;frame=requestAnimationFrame(tick);}}
root.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const b=root.getBoundingClientRect();aim((e.clientX-b.left)/ctx.scale);},options);root.addEventListener('pointerleave',()=>aim(null),options);
function select(index){selected=(index+7)%7;icons.forEach((icon,i)=>icon.setAttribute('aria-pressed',String(i===selected)));indicator.style.transform='translateX('+(centers[selected]-162)+'px)';root.dataset.selected=String(selected);status.textContent='Application '+(selected+1)+' selected';aim(centers[selected]);ctx.emit('dock',{index:selected});}
icons.forEach((icon,i)=>{icon.addEventListener('click',()=>select(i),options);icon.addEventListener('focus',()=>aim(centers[i]),options);icon.addEventListener('blur',()=>{if(!root.contains(document.activeElement))aim(null);},options);icon.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();const next=e.key==='Home'?0:e.key==='End'?6:(i+(e.key==='ArrowRight'?1:6))%7;icons[next].focus();select(next);},options);});ctx.onAction('next',()=>select(selected+1));root.dataset.selected='3';paint();return()=>{abort.abort();cancelAnimationFrame(frame);};`,
 prompt:`Implement original v4 Dock Magnify186:1779 in324x136. The302x60 rounded18 rail is11,64; seven neutral native app buttons keep reference sizes28/32/38/46/38/32/28 and positions23/57/95/139/191/235/273, bottom116. Exact4px indicator160,128. Initial composition is the held center peak. Subsequent native hover follows stable untransformed centers with110px influence, smoothstep t²(3−2t), base24px and maxextra.9, easing via time-normalized .18 per-frame lerp. Animate transforms only, stop when settled, clear influence on leave, never measure transformed boxes for feedback. Pointer math divides stage scale. Click/touch chooses an app, moves native indicator250ms and updates pressed state/status; arrow/Home/End keys select and focus. Expose Next app and Reset through shell controls. Reduced motion keeps original icon sizes with instant indicator feedback and no follow loop. Runtime suspension freezes easing, disposal aborts listeners/frames. Keep one original4px SVG and no decorative hue.`
});

INTRX.register({
  id: "flip-expand",
  title: "FLIP Card Expand",
  cat: "Layout & UI",
  tags: ["flip","shared element"],
  rootClass: "d-flip",
  libs: [],
  desc: "Click a thumbnail and it grows seamlessly into a detail view using the FLIP technique — layout change first, then an inverted transform plays back. The web version of a shared-element transition.",
  seen: "Seen on: App Store cards, linear.app, Framer showcase sites",
  hint: "click a card / click again to close",
  html: `
<div class="d-flip">
  <div class="d-flip-grid">
    <div class="d-flip-card" style="--c1:#3c5a18;--c2:#0f1a08"><span>Alpha</span></div>
    <div class="d-flip-card" style="--c1:#1f3a52;--c2:#0b141f"><span>Beta</span></div>
    <div class="d-flip-card" style="--c1:#52301f;--c2:#1f0b0b"><span>Gamma</span></div>
  </div>
</div>`,
  css: `
.d-flip {
  position: relative; width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; justify-content: center;
}
.d-flip-grid { display: flex; gap: 16px; }
.d-flip-card {
  width: 130px; height: 180px; cursor: pointer;
  background: linear-gradient(160deg, var(--c1), var(--c2));
  border: 1px solid #2e2e34;
  display: flex; align-items: flex-end; padding: 14px;
  color: #fff; font-weight: 600;
  transform-origin: top left;
}
.d-flip-card.d-flip-expanded {
  position: absolute; inset: 16px; width: auto; height: auto; z-index: 5;
  font-size: 28px;
}
.d-flip-card.d-flip-animating { transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1); }
.d-flip{padding:20px;box-sizing:border-box}.d-flip-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;width:100%}.d-flip-card{position:relative;width:auto;height:165px;background:#171719;font-size:11px;padding:14px;box-sizing:border-box}.d-flip-card:nth-child(2){background:#202022}.d-flip-card:nth-child(3){background:#28282a}.d-flip-card:before{content:'01';position:absolute;left:14px;top:18px;font:32px/1 Roboto Mono,monospace;color:#48484c}.d-flip-card:nth-child(2):before{content:'02'}.d-flip-card:nth-child(3):before{content:'03'}.d-flip-card:hover{border-color:#fa7319}.d-flip-card.d-flip-expanded{background:#19191b;font-size:28px}
/* Primary reading type; mono is reserved for values and annotations. */
.d-flip{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}
.d-flip p{font-family:var(--font-ui, 'Manrope', system-ui, sans-serif)}.d-flip>footer button{font-family:Roboto Mono,ui-monospace,monospace}
.d-flip-card:before{font-family:Roboto Mono,ui-monospace,monospace}
.d-flip-card{background:linear-gradient(160deg,#1f1f23,#18181b);box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}.d-flip-card:nth-child(2){background:linear-gradient(160deg,#26262a,#1e1e22)}.d-flip-card:nth-child(3){background:linear-gradient(160deg,#2b2b2f,#222226)}.d-flip-card.d-flip-expanded{background:linear-gradient(160deg,#252529,#17171a)}

/* Current control composition. */
.d-flip{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-flip *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-flip button,.d-flip input,.d-flip textarea{font-weight:400}.d-flip>header{display:none}.d-flip>[class$="-head"][aria-hidden="true"],.d-flip>[class$="-foot"][aria-hidden="true"]{display:none}.d-flip>[class$="-stage"],.d-flip>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-flip>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-flip>footer>span{display:none}.d-flip>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-flip-card{border-radius:10px;box-shadow:inset 0 1px #fff09,0 5px 13px #0002}.d-flip-card:before{font-size:32px!important;font-weight:400!important;letter-spacing:0!important;color:#9ba8bb}.d-flip-card>span{font-size:14px;font-weight:450}.d-flip-overlay{border-radius:12px}.d-flip-overlay h3{font-size:28px;font-weight:400}
/* Current control composition. */
.d-flip *{text-transform:none!important;letter-spacing:0!important}.d-flip button{font-size:12px!important;font-weight:400!important}.d-flip>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-flip>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-flip>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-flip>footer button{font-size:11px!important;padding:6px 8px!important}.d-flip>footer{gap:6px!important}
/* Current control composition. */
.d-flip-card:before{font-family:Inter,system-ui,sans-serif!important;font-variant-numeric:tabular-nums;font-size:32px!important;font-weight:400!important}`,
  js: `
root.querySelectorAll('.d-flip-card').forEach(function (card) {
  card.addEventListener('click', function () {
    const expanding = !card.classList.contains('d-flip-expanded');

    // FIRST: measure where it is now
    const first = card.getBoundingClientRect();

    // LAST: change layout instantly
    card.classList.toggle('d-flip-expanded', expanding);
    const last = card.getBoundingClientRect();

    // INVERT: transform it back to where it was
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';

    // PLAY: release to identity on the next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.classList.add('d-flip-animating');
        card.style.transform = 'none';
      });
    });

    card.addEventListener('transitionend', function h() {
      card.classList.remove('d-flip-animating');
      card.removeEventListener('transitionend', h);
    });
  });
});`,
  prompt: ` Compose three numbered gray cards, each occupying one equal flexible grid column within 20px side margins. Use flat gray surfaces, a thin border, and orange only on hover; the composition must fit at 320px height without clipping at narrow widths.
Implement a FLIP expand/collapse transition, vanilla JS.

Requirements:
- FIRST: getBoundingClientRect() of the element before the layout change.
- LAST: toggle the expanded class (element becomes absolutely positioned filling its container) and measure again.
- INVERT: set transform = translate(dx, dy) scale(sx, sy) computed from the two rects so it appears unmoved (transform-origin: top left).
- PLAY: on the next frame (double rAF), enable the transition class and set transform: none; the browser animates from inverted to identity — animating layout at compositor cost only.
- Use cubic-bezier(0.32, 0.72, 0, 1), ~0.5s. Clean up the transition class on transitionend.
- Same code path handles both expand and collapse since FLIP is direction-agnostic.
- Mention document.startViewTransition as the emerging native alternative. Final composition: Normalized the card indices and names and softened card geometry while preserving FLIP expansion. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"smooth-accordion",
 title:"Smooth Accordion",
 cat:"Layout & UI",
 rootClass:"d-acc",
 tags:["accordion","grid 0fr","native controls"],
 libs:[],
 desc:"Three headers share a single open section. Grid tracks follow content height while opacity and the original chevrons resolve independently, including interrupted reversals.",
 seen:"Pattern family: single-open disclosure groups",
 hint:"Press · Panels open with eased height and a turning chevron",
 html:`<div class="d-acc"><div class="d-acc-card"><section class="d-acc-item" data-open="false"><h3 class="d-acc-heading"><button class="d-acc-head" type="button" aria-expanded="false"><span class="d-acc-label">What changes?</span><i class="d-acc-bar" style="width:70px" aria-hidden="true"></i><img class="d-acc-right" src="{{asset:layout2-accordion-chevron-right}}" alt=""><img class="d-acc-down" src="{{asset:layout2-accordion-chevron-down}}" alt=""></button></h3><div class="d-acc-body"><div class="d-acc-clip"><p class="d-acc-copy">One section opens at a time. Press it again to close it.</p><div class="d-acc-lines" aria-hidden="true"><i></i><i></i></div></div></div></section><section class="d-acc-item" data-open="true"><h3 class="d-acc-heading"><button class="d-acc-head" type="button" aria-expanded="true"><span class="d-acc-label">How does it move?</span><i class="d-acc-bar" style="width:84px" aria-hidden="true"></i><img class="d-acc-right" src="{{asset:layout2-accordion-chevron-right}}" alt=""><img class="d-acc-down" src="{{asset:layout2-accordion-chevron-down}}" alt=""></button></h3><div class="d-acc-body"><div class="d-acc-clip"><p class="d-acc-copy">Height follows its content with a soft, reversible transition.</p><div class="d-acc-lines" aria-hidden="true"><i></i><i></i></div></div></div></section><section class="d-acc-item" data-open="false"><h3 class="d-acc-heading"><button class="d-acc-head" type="button" aria-expanded="false"><span class="d-acc-label">Can I use a keyboard?</span><i class="d-acc-bar" style="width:60px" aria-hidden="true"></i><img class="d-acc-right" src="{{asset:layout2-accordion-chevron-right}}" alt=""><img class="d-acc-down" src="{{asset:layout2-accordion-chevron-down}}" alt=""></button></h3><div class="d-acc-body"><div class="d-acc-clip"><p class="d-acc-copy">Use Tab, Enter or Space. Arrow keys move between headers.</p><div class="d-acc-lines" aria-hidden="true"><i></i><i></i></div></div></div></section></div><span class="d-acc-status" role="status"></span></div>`,
 css:`.d-acc{position:relative;top:4px;font-family:Inter,system-ui,sans-serif;color:#f1f1f1}.d-acc-card{position:absolute;left:10px;top:0;width:200px;border:1px solid #ffffff0f;border-radius:14px;background:#1c1c1c;overflow:clip;box-shadow:0 1px 2px #0000001f,0 8px 20px -8px #0000002e}.d-acc-heading{margin:0;font-size:13px}.d-acc-head{position:relative;display:block;width:100%;height:40px;padding:0 34px 0 13px;border:0;border-bottom:1px solid #ffffff0d;background:none;color:#9c9c9c;text-align:left;font:500 12px/16px Inter,system-ui,sans-serif;cursor:pointer}.d-acc-item[data-open="true"] .d-acc-head{color:#f1f1f1}.d-acc-head img{position:absolute;right:14px;top:10px;display:block;transition:opacity var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)}.d-acc-down{opacity:0;transform:rotate(-90deg)}.d-acc-item[data-open="true"] .d-acc-right{opacity:0;transform:rotate(90deg)}.d-acc-item[data-open="true"] .d-acc-down{opacity:1;transform:none}.d-acc-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--dur-fast) var(--ease-out)}.d-acc-item[data-open="true"] .d-acc-body{grid-template-rows:1fr}.d-acc-clip{min-height:0;overflow:hidden;opacity:0;transition:opacity 200ms var(--ease-out)}.d-acc-item[data-open="true"] .d-acc-clip{opacity:1}.d-acc-copy{margin:0;padding:10px 13px;font:400 12px/18px Inter,system-ui,sans-serif;color:#9c9c9c}.d-acc-bar,.d-acc-lines{display:none}.d-acc-head:focus-visible{outline:2px solid var(--focus-ring);outline-offset:-3px}.d-acc[data-mode="thumb"] .d-acc-card{width:180px;height:140px}.d-acc[data-mode="thumb"] .d-acc-label,.d-acc[data-mode="thumb"] .d-acc-copy{display:none}.d-acc[data-mode="thumb"] .d-acc-bar{display:block;position:absolute;left:12px;top:14px;height:8px;border-radius:4px;background:#ffffff24}.d-acc[data-mode="thumb"] .d-acc-item[data-open="true"] .d-acc-bar{background:#ffffff3d}.d-acc[data-mode="thumb"] .d-acc-lines{position:relative;display:block;height:28px}.d-acc-lines i{position:absolute;left:12px;top:0;width:140px;height:6px;border-radius:3px;background:#ffffff12}.d-acc-lines i+i{top:12px;width:110px}.d-acc-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-acc-body{transition:none}.d-acc-head img{transform:none!important;transition:opacity var(--dur-quick) var(--ease-out)}.d-acc-clip{transition:opacity var(--dur-quick) var(--ease-out)}}`,
 js:`const items=[...root.querySelectorAll('section')],heads=items.map(item=>item.querySelector('button')),status=root.querySelector('[role="status"]'),uid='accordion-'+Math.random().toString(36).slice(2);let selected=1;root.dataset.mode=ctx.mode;
function paint(){items.forEach((item,i)=>{const open=i===selected;item.dataset.open=String(open);heads[i].setAttribute('aria-expanded',String(open));item.querySelector('.d-acc-body').inert=!open;});root.dataset.open=String(selected);}
function select(i){selected=selected===i?-1:i;paint();status.textContent=selected<0?'All sections closed':heads[selected].textContent.trim()+' expanded';ctx.emit('accordion',{index:selected});}
heads.forEach((head,i)=>{const body=items[i].querySelector('.d-acc-body');head.id=uid+'-head-'+i;body.id=uid+'-body-'+i;body.setAttribute('role','region');body.setAttribute('aria-labelledby',head.id);head.setAttribute('aria-controls',body.id);head.addEventListener('click',()=>select(i));head.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();heads[e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowDown'?1:2))%3].focus();});});ctx.onAction('next',()=>{selected=(selected+1)%3;paint();status.textContent='Section '+(selected+1)+' expanded';});paint();`,
 prompt:`Match v4 Smooth Accordion184:1703 with180x140 clipped hero at10,0 in200x148 plane, radius14, #1c1c1c. Native40px headers use70/84/60px bars at13,15; initially middle body28px is open with140/110px bars at13,1/13. Preserve original14px right/down assets at151,11 in the hero. Full220x220 retains all three readable question headers and real content at12/18, natural content height,200px card; no thumbnail text squeezing. Single-open activation closes others, reactivating closes all. Grid0fr→1fr250ms ease-out, opacity200ms, chevron rotation/crossfade250ms; CSS reversals are interruptible. Add unique labelled regions, aria-expanded/controls, inert collapsed content, arrow/Home/End header focus. Expose Next section and Reset in shared dock. Reduced motion jumps height and crossfades150ms with no rotations. Preserve v4 bar geometry and all original asset slots.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"spring-modal",
 title:"Spring Modal",
 cat:"Layout & UI",
 rootClass:"d-modal",
 tags:["modal","focus","origin aware"],
 libs:[],
 desc:"A local confirmation dialog resolves from its native opener, keeps keyboard focus inside while active and reverses immediately on Confirm, Cancel, Escape or scrim press.",
 seen:"Pattern family: local confirmation dialogs",
 hint:"Press · The dialog springs up with a gentle overshoot",
 html:`<div class="d-modal"><button class="d-modal-open" type="button" aria-haspopup="dialog">Open dialog</button><div class="d-modal-backdrop"></div><div class="d-modal-dialog" role="dialog" aria-modal="false"><div class="d-modal-icon"><img src="{{asset:layout2-modal-bell}}" alt=""></div><h3 class="d-modal-title">Enable notifications?</h3><p class="d-modal-copy">Receive updates for this project.</p><i class="d-modal-title-bar" aria-hidden="true"></i><i class="d-modal-copy-bar" aria-hidden="true"></i><button class="d-modal-confirm" type="button">Confirm</button><button class="d-modal-cancel" type="button">Cancel</button></div><span class="d-modal-status" role="status"></span></div>`,
 css:`.d-modal{position:relative;top:4px;font-family:Inter,system-ui,sans-serif;color:#f1f1f1;--d-modal-x:0px;--d-modal-y:0px;--d-modal-sx:.96;--d-modal-sy:.96}.d-modal-open{position:absolute;left:45px;top:78px;width:130px;height:32px;padding:0;border:1px solid #ffffff1c;border-radius:10px;background:#272727;color:#f1f1f1;font:500 12px Inter,system-ui,sans-serif;cursor:pointer}.d-modal-backdrop{position:absolute;inset:0;border-radius:16px;background:#00000059;opacity:0;pointer-events:none;transition:opacity var(--dur-quick) var(--ease-out)}.d-modal-dialog{position:absolute;left:10px;top:8px;width:200px;height:174px;overflow:clip;border:1px solid #ffffff0f;border-radius:14px;background:#1c1c1c;box-shadow:0 1px 2px #0000001f,0 8px 20px -8px #0000002e;opacity:0;pointer-events:none;transform:translate(var(--d-modal-x),var(--d-modal-y)) scale(var(--d-modal-sx),var(--d-modal-sy));transition:transform var(--dur-quick) var(--ease-out),opacity var(--dur-quick) var(--ease-out)}.d-modal[data-open="true"] .d-modal-backdrop{opacity:1;pointer-events:auto;transition-duration:var(--dur-fast)}.d-modal[data-open="true"] .d-modal-dialog{opacity:1;pointer-events:auto;transform:none;transition:transform var(--dur-fast) var(--ease-out),opacity var(--dur-fast) var(--ease-out)}.d-modal-icon{position:absolute;left:12px;top:12px;width:28px;height:28px;border:1px solid #ffffff0f;border-radius:8px;background:#272727}.d-modal-icon img{position:absolute;left:5px;top:5px;display:block}.d-modal-title{position:absolute;left:13px;top:53px;margin:0;font:600 13px/18px Inter,system-ui,sans-serif}.d-modal-copy{position:absolute;left:13px;top:79px;max-width:174px;margin:0;color:#9c9c9c;font:400 12px/18px Inter,system-ui,sans-serif}.d-modal-confirm,.d-modal-cancel{position:absolute;left:13px;top:134px;width:82px;height:26px;padding:0;border:0;border-radius:10px;background:#f1f1f1;color:#111;font:500 11.5px/normal Inter,system-ui,sans-serif;letter-spacing:.0528px;cursor:pointer}.d-modal-cancel{left:103px;border:1px solid #ffffff0f;background:#272727;color:#f1f1f1;box-shadow:inset 0 1px #ffffff0d}.d-modal button:focus-visible{outline:2px solid var(--focus-ring);outline-offset:3px}.d-modal-title-bar,.d-modal-copy-bar{display:none}.d-modal[data-mode="thumb"] .d-modal-backdrop{left:0;right:0;top:-34px;bottom:auto;height:170px}.d-modal[data-mode="thumb"][data-compact="true"] .d-modal-backdrop{top:0;height:136px}.d-modal[data-mode="thumb"] .d-modal-dialog{left:35px;top:-12px;width:150px;height:118px}.d-modal[data-mode="thumb"] .d-modal-title,.d-modal[data-mode="thumb"] .d-modal-copy{display:none}.d-modal[data-mode="thumb"] .d-modal-title-bar{display:block;position:absolute;left:12px;top:52px;width:90px;height:8px;border-radius:4px;background:#ffffff38}.d-modal[data-mode="thumb"] .d-modal-copy-bar{display:block;position:absolute;left:12px;top:68px;width:120px;height:6px;border-radius:3px;background:#ffffff12}.d-modal[data-mode="thumb"] .d-modal-confirm,.d-modal[data-mode="thumb"] .d-modal-cancel{left:12px;top:82px;width:58px;height:24px;font-size:11px}.d-modal[data-mode="thumb"] .d-modal-cancel{left:76px}.d-modal[data-mode="thumb"][data-open="true"] .d-modal-open{visibility:hidden}.d-modal-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-modal-dialog{transform:none!important;transition:opacity var(--dur-quick) var(--ease-out)!important}}`,
 js:`const dialog=root.querySelector('[role="dialog"]'),opener=root.querySelector('.d-modal-open'),scrim=root.querySelector('.d-modal-backdrop'),confirm=root.querySelector('.d-modal-confirm'),cancel=root.querySelector('.d-modal-cancel'),title=root.querySelector('h3'),copy=root.querySelector('p'),status=root.querySelector('[role="status"]'),abort=new AbortController(),options={signal:abort.signal},uid='modal-'+Math.random().toString(36).slice(2);let opened=ctx.mode==='thumb',result='none';
root.dataset.mode=ctx.mode;dialog.id=uid;title.id=uid+'-title';copy.id=uid+'-copy';dialog.setAttribute('aria-labelledby',title.id);dialog.setAttribute('aria-describedby',copy.id);dialog.setAttribute('aria-label','Enable notifications?');opener.setAttribute('aria-controls',uid);
function sync(){root.dataset.open=String(opened);root.dataset.result=result;dialog.inert=!opened;dialog.setAttribute('aria-hidden',String(!opened));opener.setAttribute('aria-expanded',String(opened));}
function origin(){if(ctx.mode==='thumb')return;const sx=opener.offsetWidth/dialog.offsetWidth,sy=opener.offsetHeight/dialog.offsetHeight;root.style.setProperty('--d-modal-x',(opener.offsetLeft+opener.offsetWidth/2-dialog.offsetLeft-dialog.offsetWidth/2)+'px');root.style.setProperty('--d-modal-y',(opener.offsetTop+opener.offsetHeight/2-dialog.offsetTop-dialog.offsetHeight/2)+'px');root.style.setProperty('--d-modal-sx',sx);root.style.setProperty('--d-modal-sy',sy);}
function open(){if(opened)return;origin();opened=true;sync();if(ctx.mode==='full')confirm.focus();status.textContent='Confirmation dialog opened';ctx.emit('modal',{open:true});}
function close(reason){if(!opened)return;opened=false;result=reason;sync();if(dialog.contains(document.activeElement)&&ctx.mode==='full')opener.focus();status.textContent=reason==='confirmed'?'Notifications enabled':reason==='cancelled'?'Notification request cancelled':'Dialog dismissed';ctx.emit('modal',{open:false,result:reason});}
opener.addEventListener('click',open,options);confirm.addEventListener('click',()=>close('confirmed'),options);cancel.addEventListener('click',()=>close('cancelled'),options);scrim.addEventListener('click',()=>close('dismissed'),options);
root.addEventListener('keydown',e=>{if(!opened)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close('dismissed');}else if(e.key==='Tab'&&dialog.contains(e.target)){if(e.shiftKey&&e.target===confirm){e.preventDefault();cancel.focus();}else if(!e.shiftKey&&e.target===cancel){e.preventDefault();confirm.focus();}}},options);
ctx.onAction('open',open);const observer=new ResizeObserver(()=>root.dataset.compact=String(ctx.size.h<230));observer.observe(stage);root.dataset.compact=String(ctx.size.h<230);sync();return()=>{abort.abort();observer.disconnect();};`,
 prompt:`Build v4 Spring Modal184:1734. Hero220x100 keeps a220x170 local scrim at0,-34 and150x118 dialog35,-12, radius14, exact28px icon box with original14px bell,90x8 and120x6 bars,58x24 Confirm/Cancel at13/77,83 with11px labels. Keep label size1:1 at compact widths; shorten/reposition only the compact scrim so it stays inside stage. Full220x190 uses a200x174 confirmation surface, real13px heading and12px body, native opener, meaningful Confirm/Cancel state. Start full closed, hero open without stealing focus. Opening from native button measures local center delta and scales from its rect; CSS transitions are reversible250ms ease-out, close150ms; scrim250/150. Local dialog uses unique associations, inert hidden state, scoped Tab containment, Escape stops propagation, outside scrim closes, focus returns to opener. Never use a delayed close timer. Expose Open and Reset through dock. Reduced motion uses150ms opacity only, keyboard/status/events remain. Preserve bell bytes and dimensions.`
});

INTRX.register({
  id: "drag-carousel",
  title: "Inertia Drag Carousel",
  cat: "Layout & UI",
  rootClass: "d-drag",
  tags: ["pointer events","momentum"],
  libs: [],
  desc: "Grab-and-throw horizontal gallery: pointer drag maps 1:1, release keeps velocity and decays with friction, edges resist with rubber-banding.",
  seen: "Seen on: siena.film, awwwards galleries, mobile-first portfolios",
  hint: "drag / throw the row",
  html: `
<div class="d-drag">
  <div class="d-drag-track">
    <div class="d-drag-cell"><b>Field guide 01</b><span>Find your focus</span></div><div class="d-drag-cell"><b>Field guide 02</b><span>Make some space</span></div>
    <div class="d-drag-cell"><b>Field guide 03</b><span>Follow the light</span></div><div class="d-drag-cell"><b>Field guide 04</b><span>Keep good notes</span></div>
    <div class="d-drag-cell"><b>Field guide 05</b><span>Build with care</span></div><div class="d-drag-cell"><b>Field guide 06</b><span>Share the process</span></div>
    <div class="d-drag-cell"><b>Field guide 07</b><span>Look a little closer</span></div><div class="d-drag-cell"><b>Field guide 08</b><span>Start something</span></div>
  </div>
</div>`,
  css: `
.d-drag {
  width: 100%; height: 320px; background: #0a0a0b;
  display: flex; align-items: center; overflow: hidden; cursor: grab;
}
.d-drag:active { cursor: grabbing; }
.d-drag-track { display: flex; gap: 14px; padding: 0 24px; will-change: transform; }
.d-drag-cell {
  flex: 0 0 190px; height: 220px;
  border: 1px solid #2e2e34; background: linear-gradient(160deg, #161619, #101012);
  color: #5c5c66; font-size: 40px; font-weight: 700;
  display: flex; align-items: flex-end; padding: 14px;
  user-select: none;
}
/* Current control composition. */
.d-drag{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:0;display:flex;flex-direction:column;height:320px;min-height:0;padding:20px;gap:12px;box-sizing:border-box;background:#0b0e12;color:#e3e7ed}.d-drag *{font-family:"Inter",system-ui,sans-serif!important;font-variant-numeric:tabular-nums;letter-spacing:normal;text-transform:none}.d-drag button,.d-drag input,.d-drag textarea{font-weight:400}.d-drag>header{display:none}.d-drag>[class$="-head"][aria-hidden="true"],.d-drag>[class$="-foot"][aria-hidden="true"]{display:none}.d-drag>[class$="-stage"],.d-drag>[class$="-shell"]{flex:1;min-height:0;max-width:100%;margin:0}.d-drag>footer{flex-shrink:0;gap:8px;justify-content:center;margin:0;min-height:29px;flex-wrap:wrap}.d-drag>footer>span{display:none}.d-drag>footer button{font-size:10px;line-height:1.2;font-weight:400;letter-spacing:0;min-height:27px;padding:6px 8px;border:1px solid #303845;border-radius:6px;background:#151b23;color:#aab7c9}.d-drag-cell{font-size:26px;font-weight:400;letter-spacing:0;border-radius:12px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:18px;gap:8px;background:linear-gradient(155deg,#2d3947,#202830);box-shadow:inset 0 1px #fff09}.d-drag-cell>b{font-size:11px;font-weight:400;color:#98a7bc}.d-drag-cell>span{font-size:21px;font-weight:400;line-height:1.12;color:#dce2ea}
/* Current control composition. */
.d-drag *{text-transform:none!important;letter-spacing:0!important}.d-drag button{font-size:12px!important;font-weight:400!important}.d-drag>footer{width:100%;flex-wrap:nowrap!important;gap:5px!important;min-height:27px;height:27px}.d-drag>footer button{font-size:9px!important;padding:6px 5px!important;min-width:0;white-space:nowrap}.d-drag>[class$="-stage"]{max-height:241px;min-height:0;flex-shrink:1;height:241px}
/* Current control composition. */
.d-drag>footer button{font-size:11px!important;padding:6px 8px!important}.d-drag>footer{gap:6px!important}
/* Current control composition. */
.d-drag{display:flex!important;flex-direction:row!important;padding:0!important;align-items:center;justify-content:flex-start}.d-drag-track{padding:0 24px}.d-drag-cell{box-sizing:border-box;flex:0 0 222px;width:222px;height:230px;padding:22px}`,
  js: `
const track = root.querySelector('.d-drag-track');
let x = 0, vel = 0, dragging = false, lastX = 0;

function maxScroll() { return Math.max(0, track.scrollWidth - root.clientWidth + 48); }

root.addEventListener('pointerdown', function (e) {
  dragging = true; lastX = e.clientX; vel = 0;
  root.setPointerCapture(e.pointerId);
});
root.addEventListener('pointermove', function (e) {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  lastX = e.clientX;
  x -= dx;
  vel = -dx;                       // velocity from the last move
});
root.addEventListener('pointerup', function () { dragging = false; });
root.addEventListener('pointercancel', function () { dragging = false; });

(function tick() {
  if (!dragging) {
    x += vel;
    vel *= 0.94;                   // friction
  }
  // rubber-band the edges
  if (x < 0)            x += (0 - x) * 0.12;
  if (x > maxScroll())  x += (maxScroll() - x) * 0.12;
  track.style.transform = 'translateX(' + (-x) + 'px)';
  requestAnimationFrame(tick);
})();`,
  prompt: `
Build a drag carousel with inertia, vanilla JS (Pointer Events).

Requirements:
- pointerdown starts a drag (setPointerCapture); pointermove applies the delta 1:1 to a position value and records velocity from the last delta; pointerup releases.
- A permanent rAF loop: when not dragging, position += velocity and velocity *= 0.94 (friction) so throws glide to a stop.
- Rubber-band edges: when position is out of bounds, ease it back with pos += (bound - pos) * 0.12 — during drag this creates natural resistance.
- Apply as translateX on the track (transform only, will-change).
- cursor: grab / grabbing; user-select: none on cells; prevent native image drag.
- Ignore click events that follow a real drag (movement > a few px) so cells stay clickable. Final composition: Replaced blank giant-number cards with readable field-guide topics, preserving the draggable momentum track. Use locally bundled Inter for the UI and every numeric value, with tabular numerals, weight 400–500 and normal tracking. Keep this composition readable inside a 300×320 preview. The displayed content is a practical interface; hide development telemetry, timing formulas and duplicate coordinate displays. Preserve all existing keyboard, pointer and reduced-motion behavior.`
});
/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"hover-fill-button",
 title:"Directional Fill",
 cat:"Layout & UI",
 rootClass:"d-fill",
 tags:["directional fill","entry edge","press"],
 libs:[],
 desc:"The light layer floods from the closest entry edge and retreats toward the exit. Both text layers stay aligned through reversals, with native focus, press and activation feedback.",
 seen:"Pattern family: directional button fills",
 hint:"Hover · The fill floods in from the side you entered",
 html:`<div class="d-fill"><button class="d-fill-btn" type="button"><span class="d-fill-label">Get started</span><span class="d-fill-light" aria-hidden="true"><span class="d-fill-duplicate">Get started</span></span></button><span class="d-fill-status" role="status"></span></div>`,
 css:`.d-fill{position:relative;top:4px;font-family:Inter,system-ui,sans-serif}.d-fill-btn{position:absolute;left:20px;top:14px;width:140px;height:40px;overflow:clip;padding:0;border:1px solid #ffffff1c;border-radius:20px;background:#1c1c1c;color:#9c9c9c;cursor:pointer;transition:transform var(--dur-fast) var(--ease-pop)}.d-fill-label,.d-fill-duplicate{position:absolute;left:32.5px;top:10px;white-space:nowrap;font:500 13.5px/normal Inter,system-ui,sans-serif;letter-spacing:-.0648px}.d-fill-light{position:absolute;left:-1px;top:-1px;width:140px;height:40px;overflow:clip;background:#f1f1f1;color:#111;clip-path:inset(0 100% 0 0);transition:clip-path var(--dur-fast) var(--ease-out)}.d-fill-duplicate{left:33.5px;top:11px}.d-fill[data-mode="thumb"][data-used="false"] .d-fill-light{clip-path:inset(0 40% 0 0)}.d-fill-btn:active{transform:scale(.97);transition-duration:var(--dur-micro);transition-timing-function:var(--ease-out)}.d-fill-btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:4px}.d-fill-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-fill-btn{transform:none!important}.d-fill-light{transition:opacity var(--dur-quick) var(--ease-out);clip-path:none!important;opacity:var(--d-fill-opacity,0)}.d-fill[data-mode="thumb"][data-used="false"] .d-fill-light{opacity:1;clip-path:inset(0 40% 0 0)!important}}`,
 js:`const button=root.querySelector('button'),light=root.querySelector('.d-fill-light'),status=root.querySelector('[role="status"]');let active=false,hovered=false,count=0,edge='left';root.dataset.mode=ctx.mode;root.dataset.used='false';
const clips={left:'inset(0 100% 0 0)',right:'inset(0 0 0 100%)',top:'inset(0 0 100% 0)',bottom:'inset(100% 0 0 0)'};
function nearest(e){const b=button.getBoundingClientRect(),dist=[['left',Math.abs(e.clientX-b.left)],['right',Math.abs(b.right-e.clientX)],['top',Math.abs(e.clientY-b.top)],['bottom',Math.abs(b.bottom-e.clientY)]];return dist.sort((a,b)=>a[1]-b[1])[0][0];}
function fill(next,e){root.dataset.used='true';if(e)edge=nearest(e);active=next;root.dataset.edge=edge;root.dataset.filled=String(next);light.style.clipPath=next?'inset(0 0 0 0)':clips[edge];light.style.setProperty('--d-fill-opacity',next?'1':'0');}
button.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse')return;hovered=true;fill(true,e);});button.addEventListener('pointerleave',e=>{hovered=false;fill(button.matches(':focus-visible'),e);});button.addEventListener('focus',()=>{if(button.matches(':focus-visible'))fill(true);});button.addEventListener('blur',()=>fill(hovered));button.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')fill(true,e);});button.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')fill(false,e);});button.addEventListener('pointercancel',e=>fill(false,e));button.addEventListener('click',()=>{count++;root.dataset.activations=String(count);status.textContent='Get started activated '+count+(count===1?' time':' times');ctx.emit('start',{count});});ctx.onAction('fill',()=>fill(!active));root.dataset.activations='0';root.dataset.filled='false';root.dataset.edge=edge;`,
 prompt:`Match Directional Fill184:1761 exactly:140x40 button at20,14 in180x80,20px pill, #1c1c1c andwhite11% border;13.5px Inter medium Get started at32.5,10,tracking-.0648. Original light overlay140x40 at-1,-1 clips to84px for the60% initial hero pose, duplicate dark text33.5,11 stays aligned. On real mouse enter/leave measure the closest edge from the current bounding box, reveal from that side and retreat toward exit via reversible250ms ease-out inset interpolation. Focus-visible and touch press get fill feedback; native press .97/80ms then250ms ease-pop. Activation emits a counted start event and live status. No custom fake CTA besides the native button, no owned Replay. Expose Fill/clear and Reset in dock. Under reduced motion keep the same hero pose, then use150ms opacity only and no press transform. Preserve exact140x40 sparse geometry and document owner-approved low-fill exception.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"page-transition",
 title:"Page Transition",
 cat:"Layout & UI",
 rootClass:"d-curtain",
 tags:["page slide","curtain","navigation"],
 libs:[],
 desc:"A four-page local navigator uses mirrored 350ms page slides and a narrow curtain. Rapid navigation retargets from the displayed screen while the persistent frame stays in place.",
 seen:"Pattern family: directional route transitions",
 hint:"Press · A curtain wipes from one route to the next",
 html:`<div class="d-curtain"><div class="d-curtain-card"><div class="d-curtain-screen"><h3 class="d-curtain-title">HOME</h3><p class="d-curtain-copy">A place to begin.</p><div class="d-curtain-content"></div></div><div class="d-curtain-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="d-curtain-wipe" aria-hidden="true"><i></i></div><nav class="d-curtain-nav" aria-label="Demo pages"><button class="d-curtain-back" type="button">Back</button><button class="d-curtain-next" type="button">Next: Work</button></nav></div><span class="d-curtain-status" role="status"></span></div>`,
 css:`.d-curtain{position:relative;top:4px;font-family:Inter,system-ui,sans-serif;color:#f1f1f1}.d-curtain-card{position:absolute;left:10px;top:0;width:220px;height:198px;overflow:clip;border:1px solid #ffffff0f;border-radius:14px;background:#1c1c1c;box-shadow:0 1px 2px #0000001f,0 8px 20px -8px #0000002e}.d-curtain-screen{position:absolute;inset:0;pointer-events:none}.d-curtain-title{position:absolute;left:15px;top:17px;margin:0;font:600 15px/20px Inter,system-ui,sans-serif}.d-curtain-copy{position:absolute;left:15px;top:45px;margin:0;color:#9c9c9c;font:400 12px/18px Inter,system-ui,sans-serif}.d-curtain-content{position:absolute;left:15px;top:75px;width:188px;height:60px;border-radius:8px;background:#ffffff0a}.d-curtain-nav{position:absolute;left:14px;right:14px;bottom:14px;display:flex;justify-content:space-between;gap:10px;z-index:3}.d-curtain-nav button{height:26px;padding:0 10px;border:1px solid #ffffff0f;border-radius:8px;background:#272727;color:#f1f1f1;font:500 11.5px Inter,system-ui,sans-serif;cursor:pointer}.d-curtain-nav button:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}.d-curtain-wipe{position:absolute;left:110px;top:-1px;width:88px;height:100%;background:linear-gradient(90deg,#282828,#252525);transform:translateX(120px);pointer-events:none;z-index:2}.d-curtain-wipe i{position:absolute;left:-2px;top:0;width:2px;height:100%;background:#ffffff59}.d-curtain-bars{display:none}.d-curtain[data-mode="thumb"] .d-curtain-card{width:200px;height:150px}.d-curtain[data-mode="thumb"] .d-curtain-screen,.d-curtain[data-mode="thumb"] .d-curtain-nav{display:none}.d-curtain[data-mode="thumb"] .d-curtain-bars{display:block}.d-curtain-bars i{position:absolute;left:14px;top:16px;width:80px;height:8px;border-radius:4px;background:#ffffff33}.d-curtain-bars i+i{top:32px;width:140px;height:6px;border-radius:3px;background:#ffffff12}.d-curtain-bars i+i+i{top:44px;width:120px}.d-curtain-bars i+i+i+i{top:62px;width:168px;height:60px;border-radius:8px;background:#ffffff0a}.d-curtain[data-mode="thumb"][data-used="false"] .d-curtain-wipe{transform:none}.d-curtain-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@media(prefers-reduced-motion:reduce){.d-curtain-screen{transform:none!important;filter:none!important}.d-curtain-wipe{will-change:auto}}`,
 js:`const pages=['HOME','WORK','ABOUT','CONTACT'],descriptions=['A place to begin.','Selected projects and ideas.','A little about the studio.','Start a conversation.'],card=root.querySelector('.d-curtain-card'),screen=root.querySelector('.d-curtain-screen'),title=root.querySelector('h3'),copy=root.querySelector('p'),next=root.querySelector('.d-curtain-next'),back=root.querySelector('.d-curtain-back'),wipe=root.querySelector('.d-curtain-wipe'),status=root.querySelector('[role="status"]');let index=0,animations=[],ghost=null,token=0;
root.dataset.mode=ctx.mode;root.dataset.used='false';root.dataset.phase='idle';root.dataset.page=pages[0];function clear(){animations.forEach(a=>a.cancel());animations=[];if(ghost)ghost.remove();ghost=null;}
function go(direction){const visual=getComputedStyle(screen),from={transform:visual.transform,opacity:visual.opacity,filter:visual.filter},wipeVisual=getComputedStyle(wipe).transform,moving=root.dataset.phase==='moving',first=root.dataset.used==='false',own=++token;clear();ghost=screen.cloneNode(true);ghost.className='d-curtain-screen d-curtain-ghost';ghost.setAttribute('aria-hidden','true');ghost.inert=true;card.insertBefore(ghost,screen);index=(index+direction+4)%4;title.textContent=pages[index];copy.textContent=descriptions[index];next.textContent='Next: '+pages[(index+1)%4].toLowerCase().replace(/^./,c=>c.toUpperCase());root.dataset.used='true';root.dataset.page=pages[index];root.dataset.direction=direction>0?'forward':'back';root.dataset.phase='moving';status.textContent=pages[index]+' page';const ease='cubic-bezier(.22,1,.36,1)',duration=ctx.reducedMotion?150:350;
animations.push(ghost.animate([ctx.reducedMotion?{opacity:from.opacity}:from,ctx.reducedMotion?{opacity:0}:{transform:'translateX('+(-direction*30)+'px)',opacity:0,filter:'blur(2px)'}],{duration,easing:ease}));const incoming=screen.animate([ctx.reducedMotion?{opacity:0}:{transform:'translateX('+(direction*30)+'px)',opacity:0,filter:'blur(2px)'},{transform:'none',opacity:1,filter:'none'}],{duration,easing:ease});animations.push(incoming);if(!ctx.reducedMotion){const end=direction>0?-210:120;animations.push(wipe.animate([{transform:moving||first?wipeVisual:'translateX('+(direction>0?120:-210)+'px)'},{transform:'translateX('+end+'px)'}],{duration:350,easing:ease}));}incoming.finished.then(()=>{if(own!==token)return;clear();root.dataset.phase='idle';}).catch(()=>{});ctx.emit('navigate',{page:pages[index],direction});}
next.addEventListener('click',()=>go(1));back.addEventListener('click',()=>go(-1));root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();go(e.key==='ArrowRight'?1:-1);}});ctx.onAction('next',()=>go(1));ctx.onAction('back',()=>go(-1));return()=>{token++;clear();};`,
 prompt:`Build original v4 Page Transition184:1829. Hero220x156 places a200x150 radius14 card10,0 with bars80x8 at15,17,140/120x6 at15,33/45,168x60 gray block15,63; hold the88px curtain at111,-1 and its2px leading edge109,-1. Full240x212 keeps a220x198 frame and readable HOME/WORK/ABOUT/CONTACT screens, real Back/Next navigation and page status. Native forward/back and shared dock navigate the four pages cyclically without changing browser routes. Apply Page slide350ms ease-out: outgoing -30px/opacity0/blur2, incoming +30px to rest; mirror on Back. Keep persistent frame/nav shared, sweep one88px curtain through the frame. Rapid navigation reads the displayed screen before cancelling old WAAPI, retains at most one inert aria-hidden outgoing clone, guards stale finishes, and releases animations on disposal. No busy lock or timer race. Reduced motion uses150ms opacity only; thumbnail retains the exact initial curtain pose. All classes stay prefixed d-curtain, no owned reset or toolbar.`
});

/* v4 native layout control; shared stage owns framing and actions. */
INTRX.register({
 id:"logo-marquee",
 title:"Logo Marquee",
 cat:"Layout & UI",
 rootClass:"d-logos",
 tags:["marquee","opposing rows","ambient"],
 libs:[],
 desc:"Two rows of original neutral marks travel in opposite directions behind soft edge masks. The complete original artwork is repeated and clipped by row without extracting any paths.",
 seen:"Pattern family: opposing logo marquees",
 hint:"Ambient · Two rows of marks drift in opposite directions",
 html:`<div class="d-logos" role="img" aria-label="Two rows of abstract marks moving in opposite directions"><div class="d-logos-row d-logos-top"><div class="d-logos-track"><img src="{{asset:layout2-marquee-rows}}" alt=""><img src="{{asset:layout2-marquee-rows}}" alt=""></div></div><div class="d-logos-row d-logos-bottom"><div class="d-logos-track"><img src="{{asset:layout2-marquee-rows}}" alt=""><img src="{{asset:layout2-marquee-rows}}" alt=""></div></div><span class="d-logos-status" role="status"></span></div>`,
 css:`.d-logos{position:relative;overflow:clip;font-family:Inter,system-ui,sans-serif}.d-logos-row{position:absolute;left:0;top:58px;width:100%;height:45px;overflow:clip;mask-image:linear-gradient(90deg,transparent,#000 40px,#000 calc(100% - 40px),transparent)}.d-logos-bottom{top:103px}.d-logos-track{position:absolute;left:0;top:0;display:flex;width:744px;height:90px;animation:d-logos-left 24s linear infinite}.d-logos-track img{display:block;flex:none;max-width:none}.d-logos-bottom .d-logos-track{top:-45px;animation-name:d-logos-right;animation-duration:28s}.d-logos[data-paused="true"] .d-logos-track{animation-play-state:paused}.d-logos-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px}@keyframes d-logos-left{from{transform:translateX(0)}to{transform:translateX(-372px)}}@keyframes d-logos-right{from{transform:translateX(-372px)}to{transform:translateX(0)}}@media(prefers-reduced-motion:reduce){.d-logos-track{animation:none!important;transform:none!important}}`,
 js:`let paused=ctx.reducedMotion;const status=root.querySelector('[role="status"]');root.dataset.paused=String(paused);ctx.onAction('pause',()=>{paused=!paused;root.dataset.paused=String(paused);status.textContent=ctx.reducedMotion?'Reduced motion keeps both rows still':paused?'Marquee paused':'Marquee resumed';ctx.emit('marquee',{paused});});`,
 prompt:`Implement v4 Logo Marquee185:2046 with the complete unmodified372x90 original SVG at0,58 of a bleed stage. Keep every original asset intrinsic dimension. Clip two45px row windows over repeated whole images instead of extracting/recreating logo paths; top uses image y0, bottom y-45. Repeat each complete image at372px intervals; scroll top0→-372 in24s and bottom-372→0 in28s, linear loops,40px edge masks and intentional clipped horizontal overflow. Native first frame matches the supplied composition; stage runtime pauses loops offscreen or hidden and applies speed. Expose Pause/resume and Reset in shared dock, live status and local events. Keep pause authored through animation-play-state so it survives runtime suspend/resume/speed. Reduced motion renders one still frame. No custom outer panel, no decorative colors, no text logos copied from brands.`
});
