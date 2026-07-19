/* INTRX registry - shared anchor morph popover */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'popover-anchor-morph',
  title:'Popover Anchor Morph',
  cat:'Layout & UI',
  rootClass:'d-layout-popover-anchor-morph',
  tags:['popover','FLIP','anchor'],
  libs:[],
  desc:'One shared popover moves and resizes between three anchors while its caret tracks the trigger and differently sized content crosses over directionally.',
  seen:"Seen on: XchylerDrenth's popovers and Family-style morphing UI",
  hint:'open a trigger, then hover or focus the others to morph the same popover; click outside or press Escape to close',
  html:`<div class="d-layout-popover-anchor-morph" role="region" aria-label="Morphing shared popover demo">
  <div class="d-layout-popover-anchor-morph-head" aria-hidden="true"><span>POPOVER / ANCHORS</span><span class="d-layout-popover-anchor-morph-mode"><i></i> CLOSED</span></div>
  <div class="d-layout-popover-anchor-morph-stage">
    <div class="d-layout-popover-anchor-morph-triggers" aria-label="Popover triggers">
      <button type="button" data-panel="profile" aria-expanded="false" aria-controls="d-layout-popover-anchor-morph-popover">Profile</button>
      <button type="button" data-panel="alerts" aria-expanded="false" aria-controls="d-layout-popover-anchor-morph-popover">Alerts <b aria-hidden="true">3</b></button>
      <button type="button" data-panel="share" aria-expanded="false" aria-controls="d-layout-popover-anchor-morph-popover">Share</button>
    </div>
    <div class="d-layout-popover-anchor-morph-popover" id="d-layout-popover-anchor-morph-popover" role="dialog" aria-label="Context popover" aria-hidden="true">
      <i class="d-layout-popover-anchor-morph-caret" aria-hidden="true"></i>
      <div class="d-layout-popover-anchor-morph-viewport">
        <section class="d-layout-popover-anchor-morph-panel d-layout-popover-anchor-morph-profile" data-content="profile" aria-label="Profile details">
          <span class="d-layout-popover-anchor-morph-avatar" aria-hidden="true">AK</span><div><strong>Aria Kim</strong><small>Product systems</small><span>aria@intrx.dev</span></div>
        </section>
        <section class="d-layout-popover-anchor-morph-panel d-layout-popover-anchor-morph-alerts" data-content="alerts" aria-label="Three alerts">
          <div><i></i><span><strong>Build complete</strong><small>Preview is ready</small></span><b>NOW</b></div>
          <div><i></i><span><strong>New comment</strong><small>On motion tokens</small></span><b>4M</b></div>
          <div><i></i><span><strong>Usage notice</strong><small>72% of monthly plan</small></span><b>1H</b></div>
        </section>
        <section class="d-layout-popover-anchor-morph-panel d-layout-popover-anchor-morph-share" data-content="share" aria-label="Share project link">
          <label for="d-layout-popover-anchor-morph-link">Share project</label><div><input id="d-layout-popover-anchor-morph-link" value="intrx.dev/p/field-07" readonly aria-label="Project link"><button class="d-layout-popover-anchor-morph-copy" type="button">COPY</button></div><small>Anyone with the link can view</small>
        </section>
      </div>
    </div>
  </div>
  <div class="d-layout-popover-anchor-morph-foot" aria-hidden="true"><span>1 SURFACE / 3 ANCHORS</span><span>FLIP 280MS</span></div>
  <span class="d-layout-popover-anchor-morph-status" aria-live="polite" aria-atomic="true">Choose a popover trigger</span>
</div>`,
  css:`
.d-layout-popover-anchor-morph{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate;touch-action:pan-y}
.d-layout-popover-anchor-morph *{box-sizing:border-box}
.d-layout-popover-anchor-morph-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-layout-popover-anchor-morph-mode{display:flex;align-items:center;gap:5px;color:#9b9ba3}
.d-layout-popover-anchor-morph-mode i{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.45)}
.d-layout-popover-anchor-morph-stage{position:absolute;top:38px;right:12px;bottom:25px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(circle at 50% 25%,rgba(167,139,250,.07),transparent 48%),#0d0d0f}
.d-layout-popover-anchor-morph-triggers{position:absolute;z-index:3;top:20px;right:14px;left:14px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
.d-layout-popover-anchor-morph-triggers button{position:relative;height:34px;border:1px solid #33333a;border-radius:7px;outline:none;color:#9b9ba3;background:#101012;font-family:inherit;font-size:9px;font-weight:700;line-height:1;cursor:pointer;transition:border-color 150ms ease,color 150ms ease,background-color 150ms ease}
.d-layout-popover-anchor-morph-triggers button:hover,.d-layout-popover-anchor-morph-triggers button:focus-visible,.d-layout-popover-anchor-morph-triggers button[aria-expanded="true"]{border-color:#a78bfa;color:#ececef;background:#161619}
.d-layout-popover-anchor-morph-triggers button b{position:absolute;top:5px;right:7px;min-width:13px;height:13px;padding:0 3px;display:grid;place-items:center;border-radius:7px;color:#101012;background:#a78bfa;font-size:6px;line-height:1}
.d-layout-popover-anchor-morph-popover{--d-layout-popover-anchor-morph-entry:0px;position:absolute;z-index:5;top:68px;left:8px;width:190px;height:96px;border:1px solid #33333a;border-radius:10px;background:#101012;box-shadow:0 18px 38px rgba(0,0,0,.42);opacity:0;pointer-events:none;transform:translateX(var(--d-layout-popover-anchor-morph-entry)) scale(.95);transform-origin:var(--d-layout-popover-anchor-morph-origin,50%) top;transition:opacity 150ms ease,transform 150ms ease;will-change:left,width,height,transform}
.d-layout-popover-anchor-morph.d-layout-popover-anchor-morph-open .d-layout-popover-anchor-morph-popover{opacity:1;pointer-events:auto;transform:translateX(0) scale(1);transition:left 280ms ease-in-out,top 280ms ease-in-out,width 280ms ease-in-out,height 280ms ease-in-out,opacity 200ms cubic-bezier(.2,.8,.2,1),transform 200ms cubic-bezier(.2,.8,.2,1)}
.d-layout-popover-anchor-morph.d-layout-popover-anchor-morph-closing .d-layout-popover-anchor-morph-popover{opacity:0;pointer-events:none;transform:translateX(var(--d-layout-popover-anchor-morph-entry)) scale(.97);transition:opacity 150ms ease,transform 150ms ease}
.d-layout-popover-anchor-morph-caret{position:absolute;z-index:2;top:-5px;left:20px;width:8px;height:8px;border-top:1px solid #33333a;border-left:1px solid #33333a;background:#101012;transform:rotate(45deg);transition:left 280ms ease-in-out;pointer-events:none}
.d-layout-popover-anchor-morph-viewport{position:absolute;inset:0;overflow:hidden;border-radius:9px}
.d-layout-popover-anchor-morph-panel{position:absolute;inset:0;padding:13px;opacity:0;pointer-events:none;transform:translateX(var(--d-layout-popover-anchor-morph-panel-shift,0));transition:opacity 180ms ease,transform 180ms ease}
.d-layout-popover-anchor-morph-panel.d-layout-popover-anchor-morph-panel-active{opacity:1;pointer-events:auto;transform:translateX(0)}
.d-layout-popover-anchor-morph-panel.d-layout-popover-anchor-morph-panel-departing{opacity:0;pointer-events:none;transform:translateX(var(--d-layout-popover-anchor-morph-departure,0))}
.d-layout-popover-anchor-morph-panel.d-layout-popover-anchor-morph-panel-arriving{opacity:0;pointer-events:none;transform:translateX(var(--d-layout-popover-anchor-morph-arrival,0))}
.d-layout-popover-anchor-morph-profile{display:grid;grid-template-columns:38px 1fr;gap:10px;align-items:center}
.d-layout-popover-anchor-morph-avatar{width:34px;height:34px;display:grid;place-items:center;border-radius:50%;color:#101012;background:linear-gradient(145deg,#c3a6ff,#a78bfa);font-size:9px;font-weight:800}
.d-layout-popover-anchor-morph-profile>div{min-width:0;display:flex;flex-direction:column}
.d-layout-popover-anchor-morph-profile strong{font-size:10px;line-height:1.1}
.d-layout-popover-anchor-morph-profile small,.d-layout-popover-anchor-morph-profile div span{margin-top:5px;overflow:hidden;color:#777781;font-size:7px;line-height:1;text-overflow:ellipsis;white-space:nowrap}
.d-layout-popover-anchor-morph-profile div span{margin-top:7px;color:#9b9ba3}
.d-layout-popover-anchor-morph-alerts{padding:8px 11px}
.d-layout-popover-anchor-morph-alerts>div{height:38px;display:grid;grid-template-columns:7px 1fr auto;gap:7px;align-items:center;border-bottom:1px solid #232327}
.d-layout-popover-anchor-morph-alerts>div:last-child{border-bottom:0}
.d-layout-popover-anchor-morph-alerts>div>i{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 6px rgba(167,139,250,.32)}
.d-layout-popover-anchor-morph-alerts>div:nth-child(2)>i{background:#67e8f9}
.d-layout-popover-anchor-morph-alerts>div:nth-child(3)>i{background:#fbbf24}
.d-layout-popover-anchor-morph-alerts span{min-width:0;display:flex;flex-direction:column;gap:4px}
.d-layout-popover-anchor-morph-alerts strong{overflow:hidden;font-size:8px;line-height:1;text-overflow:ellipsis;white-space:nowrap}
.d-layout-popover-anchor-morph-alerts small{overflow:hidden;color:#777781;font-size:6px;line-height:1;text-overflow:ellipsis;white-space:nowrap}
.d-layout-popover-anchor-morph-alerts b{color:#5c5c66;font-size:6px;line-height:1}
.d-layout-popover-anchor-morph-share{padding:14px}
.d-layout-popover-anchor-morph-share label{display:block;color:#ececef;font-size:9px;font-weight:700;line-height:1}
.d-layout-popover-anchor-morph-share>div{height:31px;margin-top:9px;display:flex;border:1px solid #33333a;border-radius:6px;background:#0a0a0b}
.d-layout-popover-anchor-morph-share input{min-width:0;flex:1;padding:0 8px;border:0;outline:none;color:#9b9ba3;background:transparent;font-family:inherit;font-size:7px}
.d-layout-popover-anchor-morph-copy{width:46px;margin:3px;border:0;border-radius:4px;color:#101012;background:#a78bfa;font-family:inherit;font-size:7px;font-weight:800;cursor:pointer}
.d-layout-popover-anchor-morph-copy:focus-visible{outline:1px solid #ececef}
.d-layout-popover-anchor-morph-share>small{display:block;margin-top:8px;color:#5c5c66;font-size:6px;line-height:1}
.d-layout-popover-anchor-morph-foot{position:absolute;right:16px;bottom:9px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-layout-popover-anchor-morph-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-layout-popover-anchor-morph-stage{right:10px;left:10px}.d-layout-popover-anchor-morph-head,.d-layout-popover-anchor-morph-foot{right:13px;left:13px}.d-layout-popover-anchor-morph-triggers{right:9px;left:9px;gap:5px}.d-layout-popover-anchor-morph-triggers button{font-size:8px}.d-layout-popover-anchor-morph-triggers button b{right:4px}}
@media(prefers-reduced-motion:reduce){.d-layout-popover-anchor-morph *,.d-layout-popover-anchor-morph *::before,.d-layout-popover-anchor-morph *::after{animation:none!important;transition:none!important}}
`,
  js:`
const field=root.querySelector('.d-layout-popover-anchor-morph-stage'),triggers=Array.from(root.querySelectorAll('.d-layout-popover-anchor-morph-triggers button')),popover=root.querySelector('.d-layout-popover-anchor-morph-popover'),caret=root.querySelector('.d-layout-popover-anchor-morph-caret'),panels=Array.from(root.querySelectorAll('.d-layout-popover-anchor-morph-panel')),copyButton=root.querySelector('.d-layout-popover-anchor-morph-copy'),mode=root.querySelector('.d-layout-popover-anchor-morph-mode'),status=root.querySelector('.d-layout-popover-anchor-morph-status'),controller=new AbortController(),listener={signal:controller.signal},openClass='d-layout-popover-anchor-morph-open',closingClass='d-layout-popover-anchor-morph-closing',activeClass='d-layout-popover-anchor-morph-panel-active',departingClass='d-layout-popover-anchor-morph-panel-departing',arrivingClass='d-layout-popover-anchor-morph-panel-arriving';
const specs=[{width:190,height:96},{width:218,height:132},{width:230,height:104}];
let opened=false,activeIndex=-1,cleaned=false,resizeObserver=null,connectionObserver=null;
function panelAt(index){return panels.find(function(panel){return panel.dataset.content===triggers[index].dataset.panel})}
function geometry(index,instant){const fieldBounds=field.getBoundingClientRect(),triggerBounds=triggers[index].getBoundingClientRect(),spec=specs[index],width=Math.min(spec.width,field.clientWidth-16),height=Math.min(spec.height,field.clientHeight-80),center=triggerBounds.left-fieldBounds.left+triggerBounds.width/2,left=Math.max(8,Math.min(field.clientWidth-width-8,center-width/2)),top=triggerBounds.bottom-fieldBounds.top+13,caretLeft=Math.max(10,Math.min(width-18,center-left-4));if(instant)popover.style.transition='none';popover.style.left=left.toFixed(1)+'px';popover.style.top=top.toFixed(1)+'px';popover.style.width=width.toFixed(1)+'px';popover.style.height=height.toFixed(1)+'px';popover.style.setProperty('--d-layout-popover-anchor-morph-origin',caretLeft+4+'px');caret.style.left=caretLeft.toFixed(1)+'px';if(instant){popover.offsetWidth;popover.style.transition=''}}
function syncTriggers(){triggers.forEach(function(trigger,index){trigger.setAttribute('aria-expanded',String(opened&&index===activeIndex))});popover.setAttribute('aria-hidden',String(!opened));mode.lastChild.textContent=opened?' '+triggers[activeIndex].textContent.trim().toUpperCase():' CLOSED'}
function openPopover(index){activeIndex=index;opened=true;root.classList.remove(closingClass);const panel=panelAt(index);for(const item of panels){item.classList.remove(activeClass,departingClass,arrivingClass);item.style.removeProperty('--d-layout-popover-anchor-morph-departure');item.style.removeProperty('--d-layout-popover-anchor-morph-arrival')}panel.classList.add(activeClass);popover.style.setProperty('--d-layout-popover-anchor-morph-entry',(index-1)*7+'px');geometry(index,true);popover.offsetWidth;root.classList.add(openClass);syncTriggers();status.textContent=triggers[index].dataset.panel+' popover opened'}
function switchPopover(index){if(index===activeIndex)return;const previousIndex=activeIndex,direction=index>previousIndex?1:-1,oldPanel=panelAt(previousIndex),newPanel=panelAt(index);oldPanel.style.setProperty('--d-layout-popover-anchor-morph-departure',(-direction*10)+'px');oldPanel.classList.add(departingClass);oldPanel.classList.remove(activeClass);newPanel.classList.remove(activeClass,departingClass);newPanel.style.setProperty('--d-layout-popover-anchor-morph-arrival',(direction*10)+'px');newPanel.classList.add(arrivingClass);newPanel.offsetWidth;newPanel.classList.add(activeClass);newPanel.classList.remove(arrivingClass);activeIndex=index;popover.style.setProperty('--d-layout-popover-anchor-morph-entry',(index-1)*7+'px');geometry(index,false);syncTriggers();status.textContent='Popover morphed to '+triggers[index].dataset.panel}
function closePopover(message,returnFocus){if(!opened)return;const trigger=triggers[activeIndex];opened=false;root.classList.remove(openClass);root.classList.add(closingClass);syncTriggers();status.textContent=message||'Popover closed';if(returnFocus)trigger.focus()}
triggers.forEach(function(trigger,index){trigger.addEventListener('click',function(){if(opened&&activeIndex===index)closePopover('Popover closed',false);else if(opened)switchPopover(index);else openPopover(index)},listener);trigger.addEventListener('pointerenter',function(){if(opened)switchPopover(index)},listener);trigger.addEventListener('focus',function(){if(opened)switchPopover(index)},listener)});
document.addEventListener('pointerdown',function(event){const onTrigger=triggers.some(function(trigger){return trigger.contains(event.target)});if(opened&&!popover.contains(event.target)&&!onTrigger)closePopover('Popover closed by outside click',false)},listener);root.addEventListener('keydown',function(event){if(event.key==='Escape'&&opened){event.preventDefault();closePopover('Popover closed with Escape',true)}},listener);
copyButton.addEventListener('click',function(){copyButton.textContent='COPIED';status.textContent='Project link copied'},listener);
function cleanup(){if(cleaned)return;cleaned=true;controller.abort();if(resizeObserver)resizeObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(function(){if(opened)geometry(activeIndex,true)});resizeObserver.observe(field)}else window.addEventListener('resize',function(){if(opened)geometry(activeIndex,true)},listener);
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
syncTriggers();
`,
  prompt:`Build one self-contained responsive 320px Layout and UI card with three trigger buttons named Profile, Alerts, and Share, plus exactly one persistent shared popover. Style it with background-one, a ten-pixel radius, one-pixel line-one border, and one eight-pixel caret element. Clicking a trigger opens from scale 0.95 and opacity zero toward that trigger over 200 milliseconds with a soft ease-out. While open, hovering, focusing, or clicking another trigger must morph the same frame's position, width, and height to the new anchor over 280 milliseconds ease-in-out. Slide the existing caret along the upper edge until it re-centers on the destination trigger; never recreate it. Crossfade content for 180 milliseconds with overlap: the outgoing panel travels ten pixels opposite the navigation direction while the incoming panel arrives from that direction. Use visibly different natural dimensions and realistic content: Profile has an avatar and two detail rows, Alerts has three list items, and Share has a readonly link plus copy chip. Close on outside pointer-down by scaling to 0.97 and fading toward the current anchor over 150 milliseconds. Add synchronized aria-expanded and aria-hidden states, Escape with focus return, compact clamped geometry, ResizeObserver correction, detached-instance cleanup, and immediate transitions for reduced motion.`
});
