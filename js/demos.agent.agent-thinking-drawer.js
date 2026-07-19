/* INTRX registry - agent reasoning disclosure drawer */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'agent-thinking-drawer',
  title:'Agent Thinking Drawer',
  cat:'Agent & AI UI',
  rootClass:'d-agent-agent-thinking-drawer',
  tags:['agent','reasoning','disclosure'],
  libs:[],
  desc:'A compact live-reasoning chip expands into an accessible streaming trace, then settles into a concise completed disclosure.',
  seen:'Seen on: Claude and ChatGPT thinking disclosures, and AI-agent overview elements by disarto_max',
  hint:'click the reasoning chip to inspect the trace',
  html:`<div class="d-agent-agent-thinking-drawer" role="region" aria-label="Agent reasoning disclosure">
  <div class="d-agent-agent-thinking-drawer-head" aria-hidden="true"><span>AGENT / REASONING</span><span>LIVE TRACE</span></div>
  <div class="d-agent-agent-thinking-drawer-stage">
    <div class="d-agent-agent-thinking-drawer-shell">
      <button class="d-agent-agent-thinking-drawer-trigger" type="button" aria-expanded="false">
        <span class="d-agent-agent-thinking-drawer-indicator" aria-hidden="true">
          <span class="d-agent-agent-thinking-drawer-orbit"><i></i><i></i><i></i></span>
          <span class="d-agent-agent-thinking-drawer-check"></span>
        </span>
        <span class="d-agent-agent-thinking-drawer-label-wrap">
          <span class="d-agent-agent-thinking-drawer-label d-agent-agent-thinking-drawer-label-active">reasoning…</span>
          <span class="d-agent-agent-thinking-drawer-label">searching files…</span>
          <span class="d-agent-agent-thinking-drawer-label">synthesizing…</span>
          <span class="d-agent-agent-thinking-drawer-complete-label">Thought for 6s</span>
        </span>
        <span class="d-agent-agent-thinking-drawer-meta" aria-hidden="true">8 STEPS</span>
        <span class="d-agent-agent-thinking-drawer-chevron" aria-hidden="true"></span>
      </button>
      <div class="d-agent-agent-thinking-drawer-panel" role="region" aria-label="Reasoning details" aria-hidden="true">
        <div class="d-agent-agent-thinking-drawer-clip">
          <div class="d-agent-agent-thinking-drawer-body">
            <ol class="d-agent-agent-thinking-drawer-lines">
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Review the request and constraints</li>
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Search files for matching patterns</li>
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Map disclosure states and timing</li>
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Check keyboard and screen-reader flow</li>
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Build the drawer transition sequence</li>
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Verify narrow and reduced-motion views</li>
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Reconcile the final interaction states</li>
              <li class="d-agent-agent-thinking-drawer-line" aria-hidden="true">Prepare the finished response</li>
            </ol>
            <div class="d-agent-agent-thinking-drawer-foot" aria-hidden="true"><span>REASONING TRACE</span><span class="d-agent-agent-thinking-drawer-progress">0 / 8</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-agent-agent-thinking-drawer-hint" aria-hidden="true">CLICK TO INSPECT</div>
  <span class="d-agent-agent-thinking-drawer-status" aria-live="polite" aria-atomic="true">Agent reasoning in progress</span>
</div>`,
  css:`
.d-agent-agent-thinking-drawer{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'Roboto Mono','JetBrains Mono',ui-monospace,monospace;isolation:isolate}
.d-agent-agent-thinking-drawer *{box-sizing:border-box}
.d-agent-agent-thinking-drawer-head{position:absolute;top:16px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-agent-agent-thinking-drawer-stage{position:absolute;top:42px;right:12px;bottom:25px;left:12px;border:1px solid #1f1f23;border-radius:10px;overflow:hidden;background:radial-gradient(circle at 50% 12%,rgba(250,115,25,.07),transparent 46%),#101012}
.d-agent-agent-thinking-drawer-stage::before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px);background-size:100% 24px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.55),transparent 90%)}
.d-agent-agent-thinking-drawer-shell{position:absolute;z-index:1;top:20px;left:50%;width:190px;overflow:hidden;border:1px solid #2e2e34;border-radius:999px;background:#161619;box-shadow:0 10px 28px rgba(0,0,0,.22);transform:translateX(-50%);transition:width .3s ease-in-out,border-radius .3s ease-in-out,border-color .2s ease}
.d-agent-agent-thinking-drawer-shell:hover{border-color:#3b3b43}
.d-agent-agent-thinking-drawer-shell.d-agent-agent-thinking-drawer-open{width:calc(100% - 24px);border-radius:10px}
.d-agent-agent-thinking-drawer-trigger{position:relative;width:100%;height:40px;padding:0 11px;display:grid;grid-template-columns:18px minmax(0,1fr) 0 12px;align-items:center;gap:8px;border:0;background:transparent;color:#c7c7ce;font:500 11px/1 'Roboto Mono','JetBrains Mono',ui-monospace,monospace;text-align:left;cursor:pointer;outline:none}
.d-agent-agent-thinking-drawer-trigger:focus-visible{box-shadow:inset 0 0 0 1px #fa7319}
.d-agent-agent-thinking-drawer-shell.d-agent-agent-thinking-drawer-open .d-agent-agent-thinking-drawer-trigger{grid-template-columns:18px minmax(0,1fr) 42px 12px}
.d-agent-agent-thinking-drawer-indicator{position:relative;width:18px;height:18px}
.d-agent-agent-thinking-drawer-orbit{position:absolute;inset:0;border:1px solid rgba(250,115,25,.18);border-radius:50%;animation:d-agent-agent-thinking-drawer-orbit 1.1s linear infinite;transition:opacity .18s ease,transform .18s ease}
.d-agent-agent-thinking-drawer-orbit i{position:absolute;width:3px;height:3px;border-radius:50%;background:#fa7319;box-shadow:0 0 5px rgba(250,115,25,.45)}
.d-agent-agent-thinking-drawer-orbit i:nth-child(1){top:-2px;left:7px}
.d-agent-agent-thinking-drawer-orbit i:nth-child(2){right:0;bottom:1px;opacity:.72}
.d-agent-agent-thinking-drawer-orbit i:nth-child(3){bottom:1px;left:0;opacity:.4}
.d-agent-agent-thinking-drawer-check{position:absolute;inset:0;display:grid;place-items:center;border-radius:50%;background:#161619;color:#b8b8b8;opacity:0;transform:scale(.35);transition:opacity .18s ease,transform .28s cubic-bezier(.2,1.7,.4,1)}
.d-agent-agent-thinking-drawer-check::before{content:'';width:8px;height:4px;border-left:1px solid currentColor;border-bottom:1px solid currentColor;transform:translateY(-1px) rotate(-45deg)}
.d-agent-agent-thinking-drawer-finished .d-agent-agent-thinking-drawer-orbit{opacity:0;transform:scale(.5)}
.d-agent-agent-thinking-drawer-finished .d-agent-agent-thinking-drawer-check{opacity:1;transform:scale(1)}
.d-agent-agent-thinking-drawer-label-wrap{position:relative;height:16px;min-width:0;overflow:hidden}
.d-agent-agent-thinking-drawer-label,.d-agent-agent-thinking-drawer-complete-label{position:absolute;inset:0;display:flex;align-items:center;white-space:nowrap;opacity:0;transform:translateY(3px);transition:opacity .2s ease,transform .2s ease}
.d-agent-agent-thinking-drawer-label{color:transparent;background:linear-gradient(90deg,rgba(155,155,163,.6) 0%,rgba(155,155,163,.6) 34%,#ececef 50%,rgba(155,155,163,.6) 66%,rgba(155,155,163,.6) 100%);background-size:220% 100%;background-clip:text;-webkit-background-clip:text;animation:d-agent-agent-thinking-drawer-shimmer 1.4s linear infinite;animation-play-state:paused}
.d-agent-agent-thinking-drawer-label.d-agent-agent-thinking-drawer-label-active{opacity:1;transform:none;animation-play-state:running}
.d-agent-agent-thinking-drawer-complete-label{color:#c7c7ce}
.d-agent-agent-thinking-drawer-finished .d-agent-agent-thinking-drawer-complete-label{opacity:1;transform:none}
.d-agent-agent-thinking-drawer-meta{overflow:hidden;color:#5c5c66;font-size:8px;letter-spacing:.06em;white-space:nowrap;opacity:0;transition:opacity .18s ease .12s}
.d-agent-agent-thinking-drawer-open .d-agent-agent-thinking-drawer-meta{opacity:1}
.d-agent-agent-thinking-drawer-chevron{width:7px;height:7px;border-right:1px solid #72727c;border-bottom:1px solid #72727c;transform:translateY(-2px) rotate(45deg);transition:transform .25s ease}
.d-agent-agent-thinking-drawer-open .d-agent-agent-thinking-drawer-chevron{transform:translateY(2px) rotate(225deg)}
.d-agent-agent-thinking-drawer-panel{display:grid;grid-template-rows:0fr;visibility:hidden;border-top:1px solid transparent;transition:grid-template-rows .35s ease-in-out,visibility 0s linear .35s,border-color .2s ease}
.d-agent-agent-thinking-drawer-open .d-agent-agent-thinking-drawer-panel{grid-template-rows:1fr;visibility:visible;border-color:#29292f;transition:grid-template-rows .35s ease-in-out,visibility 0s,border-color .2s ease}
.d-agent-agent-thinking-drawer-clip{min-height:0;overflow:hidden}
.d-agent-agent-thinking-drawer-body{padding:8px 12px 7px}
.d-agent-agent-thinking-drawer-lines{margin:0;padding:0;list-style:none}
.d-agent-agent-thinking-drawer-line{position:relative;height:16px;padding-left:13px;overflow:hidden;color:#72727c;font:400 10.5px/16px 'Roboto Mono','JetBrains Mono',ui-monospace,monospace;white-space:nowrap;text-overflow:ellipsis;opacity:0;transform:translateY(6px);transition:opacity .22s ease,transform .22s ease,color .18s ease}
.d-agent-agent-thinking-drawer-line::before{content:'';position:absolute;top:7px;left:1px;width:3px;height:3px;border-radius:50%;background:#4b4b55}
.d-agent-agent-thinking-drawer-line.d-agent-agent-thinking-drawer-line-visible{opacity:1;transform:none}
.d-agent-agent-thinking-drawer-line.d-agent-agent-thinking-drawer-line-latest{color:#c7c7ce}
.d-agent-agent-thinking-drawer-line.d-agent-agent-thinking-drawer-line-latest::before{background:#fa7319;box-shadow:0 0 5px rgba(250,115,25,.45)}
.d-agent-agent-thinking-drawer-finished .d-agent-agent-thinking-drawer-line{color:#85858f}
.d-agent-agent-thinking-drawer-finished .d-agent-agent-thinking-drawer-line-latest{color:#c7c7ce}
.d-agent-agent-thinking-drawer-foot{height:22px;margin-top:4px;padding-top:5px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #232327;color:#5c5c66;font-size:8px;line-height:1;letter-spacing:.06em;font-variant-numeric:tabular-nums}
.d-agent-agent-thinking-drawer-progress{color:#8b8b95}
.d-agent-agent-thinking-drawer-hint{position:absolute;right:16px;bottom:10px;color:#4b4b53;font-size:8px;line-height:1;letter-spacing:.08em}
.d-agent-agent-thinking-drawer-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
@keyframes d-agent-agent-thinking-drawer-orbit{to{transform:rotate(360deg)}}
@keyframes d-agent-agent-thinking-drawer-shimmer{from{background-position:130% 0}to{background-position:-130% 0}}
@container (max-width:340px){.d-agent-agent-thinking-drawer-stage{right:10px;left:10px}.d-agent-agent-thinking-drawer-shell.d-agent-agent-thinking-drawer-open{width:calc(100% - 18px)}.d-agent-agent-thinking-drawer-body{padding-right:9px;padding-left:9px}.d-agent-agent-thinking-drawer-line{font-size:10px}}
@media (prefers-reduced-motion:reduce){.d-agent-agent-thinking-drawer-shell,.d-agent-agent-thinking-drawer-check,.d-agent-agent-thinking-drawer-orbit,.d-agent-agent-thinking-drawer-label,.d-agent-agent-thinking-drawer-complete-label,.d-agent-agent-thinking-drawer-meta,.d-agent-agent-thinking-drawer-chevron,.d-agent-agent-thinking-drawer-panel,.d-agent-agent-thinking-drawer-line{animation:none;transition:none}}
`,
  js:`
const shell=root.querySelector('.d-agent-agent-thinking-drawer-shell'),trigger=root.querySelector('.d-agent-agent-thinking-drawer-trigger'),panel=root.querySelector('.d-agent-agent-thinking-drawer-panel'),phaseLabels=Array.from(root.querySelectorAll('.d-agent-agent-thinking-drawer-label')),lines=Array.from(root.querySelectorAll('.d-agent-agent-thinking-drawer-line')),progress=root.querySelector('.d-agent-agent-thinking-drawer-progress'),status=root.querySelector('.d-agent-agent-thinking-drawer-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,lineTimes=[360,980,1640,2290,3010,3810,4690,5480],duration=6000,controller=new AbortController(),listener={signal:controller.signal};
let elapsed=0,lastWall=0,frameId=0,running=false,opened=false,finished=false,hovered=false,autoCloseAt=0,autoCloseDone=false,phaseIndex=-1,cleaned=false,documentVisible=document.visibilityState!=='hidden';
const rootIndex=Math.max(0,Array.from(document.querySelectorAll('.d-agent-agent-thinking-drawer')).indexOf(root));panel.id='d-agent-agent-thinking-drawer-panel-'+rootIndex;trigger.setAttribute('aria-controls',panel.id);
function currentLabel(){return finished?'Thought for 6 seconds':phaseLabels[Math.max(0,phaseIndex)].textContent}
function syncButtonName(){trigger.setAttribute('aria-label',opened?'Collapse reasoning details':finished?'Open completed reasoning details, Thought for 6 seconds':'Open reasoning details, '+currentLabel())}
function setPhase(index){if(index===phaseIndex||finished)return;phaseIndex=index;phaseLabels.forEach(function(label,labelIndex){label.classList.toggle('d-agent-agent-thinking-drawer-label-active',labelIndex===index)});syncButtonName()}
function setOpen(next,automatic){opened=next;shell.classList.toggle('d-agent-agent-thinking-drawer-open',opened);trigger.setAttribute('aria-expanded',String(opened));panel.setAttribute('aria-hidden',String(!opened));if(finished&&!automatic){autoCloseDone=true;autoCloseAt=0}syncButtonName();status.textContent=opened?(finished?'Completed reasoning details opened':'Reasoning details opened'):(automatic?'Reasoning details collapsed after completion':'Reasoning details collapsed')}
function visibleLineCount(){let count=0;for(const time of lineTimes){if(elapsed>=time)count++;else break}return count}
function renderLines(){const count=visibleLineCount();lines.forEach(function(line,index){const visible=index<count;line.classList.toggle('d-agent-agent-thinking-drawer-line-visible',visible);line.classList.toggle('d-agent-agent-thinking-drawer-line-latest',visible&&index===count-1);line.setAttribute('aria-hidden',String(!visible))});progress.textContent=count+' / '+lines.length}
function complete(now){if(finished)return;finished=true;elapsed=duration;shell.classList.add('d-agent-agent-thinking-drawer-finished');phaseLabels.forEach(function(label){label.classList.remove('d-agent-agent-thinking-drawer-label-active')});renderLines();status.textContent='Reasoning complete. Thought for 6 seconds';if(opened){if(!hovered)autoCloseAt=now+800}else autoCloseDone=true;syncButtonName()}
function render(now){setPhase(Math.min(2,Math.floor(elapsed/2000)));renderLines();if(elapsed>=duration)complete(now)}
function needsFrame(){return!finished||(opened&&!autoCloseDone&&!hovered)}
function start(){if(cleaned||running||!documentVisible||!needsFrame())return;running=true;lastWall=0;frameId=requestAnimationFrame(frame)}
function frame(now){frameId=0;if(cleaned||!root.isConnected){cleanup();return}if(!documentVisible){running=false;lastWall=0;return}if(!lastWall)lastWall=now;const delta=Math.min(50,Math.max(0,now-lastWall));lastWall=now;if(!finished){elapsed=Math.min(duration,elapsed+delta);render(now)}if(finished&&opened&&!autoCloseDone&&!hovered&&autoCloseAt&&now>=autoCloseAt){autoCloseDone=true;autoCloseAt=0;setOpen(false,true)}if(needsFrame()){frameId=requestAnimationFrame(frame)}else{running=false;lastWall=0}}
function onActivate(){setOpen(!opened,false);if(!finished)start()}
function onEnter(){hovered=true;autoCloseAt=0}
function onLeave(){hovered=false;if(finished&&opened&&!autoCloseDone){autoCloseAt=performance.now()+800;start()}}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(!documentVisible){if(frameId)cancelAnimationFrame(frameId);frameId=0;running=false;lastWall=0}else start()}
function cleanup(){if(cleaned)return;cleaned=true;if(frameId)cancelAnimationFrame(frameId);frameId=0;running=false;controller.abort();observer.disconnect()}
trigger.addEventListener('click',onActivate,listener);shell.addEventListener('pointerenter',onEnter,listener);shell.addEventListener('pointerleave',onLeave,listener);document.addEventListener('visibilitychange',onVisibility,listener);
const observer=new MutationObserver(function(){if(!root.isConnected)cleanup()});observer.observe(document.documentElement,{childList:true,subtree:true});
if(reduced){elapsed=duration;render(performance.now())}else{render(0);start()}
`,
  prompt:`Build a self-contained 320px product-UI reasoning disclosure. Start with a soft pill status chip containing three orbiting accent dots and a shimmer label that crossfades through “reasoning…”, “searching files…”, and “synthesizing…” every two seconds. Activating the single accessible control expands the chip to full width over 300ms, rounds it to a 10px drawer header, and unfolds an auto-height panel over 350ms. Reveal eight concise reasoning lines in sequence at 11px with a 6px fade-and-rise; keep the newest line brighter. At six seconds, replace the spinner with a softly popping CSS-drawn check, settle the exact visible label to “Thought for 6s”, and collapse the open drawer after 800ms unless it is hovered. Activating the completed chip reopens the finished trace. Keep aria-expanded and aria-hidden truthful, use a polite atomic status for major events, preserve keyboard operation through a native button, scope every class to the component, avoid external dependencies, clean up listeners and animation work when detached, pause without catch-up while the document is hidden, and render the finished state immediately with all CSS motion disabled when reduced motion is requested. Keep chrome grayscale on #0a0a0b, use Roboto Mono with JetBrains Mono fallback, reserve #fa7319 for live reasoning, focus, and the newest trace line, and communicate completion with neutral linework rather than a colored dingbat.`
});
