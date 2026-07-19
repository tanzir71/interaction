/* INTRX registry - agent edit proposal review */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'agent-diff-review',
  title:'Agent Diff Review',
  cat:'Agent & AI UI',
  rootClass:'d-agent-agent-diff-review',
  tags:['diff','review','code'],
  libs:[],
  desc:'A compact AI edit proposal streams a readable diff, then resolves into clean accepted or reverted code before replaying.',
  seen:'Seen on: Cursor and Copilot review interfaces',
  hint:'accept or reject the streamed edit; the proposal restarts after two seconds',
  html:`<div class="d-agent-agent-diff-review" role="region" aria-label="Agent edit proposal">
  <div class="d-agent-agent-diff-review-kicker" aria-hidden="true"><span>AGENT / EDIT</span><span class="d-agent-agent-diff-review-mode">STREAMING</span></div>
  <section class="d-agent-agent-diff-review-card" aria-labelledby="d-agent-agent-diff-review-title">
    <header class="d-agent-agent-diff-review-header">
      <div class="d-agent-agent-diff-review-file"><i aria-hidden="true">TS</i><strong id="d-agent-agent-diff-review-title">utils/format.ts</strong></div>
      <div class="d-agent-agent-diff-review-chips" aria-label="Four additions and two deletions"><span>+4</span><span>&minus;2</span></div>
    </header>
    <div class="d-agent-agent-diff-review-body" role="list" aria-label="Proposed code changes" aria-busy="true">
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-context" role="listitem"><span class="d-agent-agent-diff-review-gutter">11</span><span class="d-agent-agent-diff-review-marker"> </span><code>export function format(value: string) {</code></div>
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-context" role="listitem"><span class="d-agent-agent-diff-review-gutter">12</span><span class="d-agent-agent-diff-review-marker"> </span><code>  const clean = value.trim();</code></div>
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-removed" role="listitem" style="--decision-order:0"><span class="d-agent-agent-diff-review-gutter">13</span><span class="d-agent-agent-diff-review-marker">&minus;</span><code>  return clean.toLowerCase();</code></div>
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-removed" role="listitem" style="--decision-order:1"><span class="d-agent-agent-diff-review-gutter">14</span><span class="d-agent-agent-diff-review-marker">&minus;</span><code>}</code></div>
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-added" role="listitem" style="--decision-order:0"><span class="d-agent-agent-diff-review-gutter">13</span><span class="d-agent-agent-diff-review-marker">+</span><code>  const words = clean.split(' ');</code></div>
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-added" role="listitem" style="--decision-order:1"><span class="d-agent-agent-diff-review-gutter">14</span><span class="d-agent-agent-diff-review-marker">+</span><code>  return words.map(capitalize)</code></div>
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-added" role="listitem" style="--decision-order:2"><span class="d-agent-agent-diff-review-gutter">15</span><span class="d-agent-agent-diff-review-marker">+</span><code>    .join(' ');</code></div>
      <div class="d-agent-agent-diff-review-line d-agent-agent-diff-review-added" role="listitem" style="--decision-order:3"><span class="d-agent-agent-diff-review-gutter">16</span><span class="d-agent-agent-diff-review-marker">+</span><code>}</code></div>
    </div>
    <div class="d-agent-agent-diff-review-actions">
      <button class="d-agent-agent-diff-review-accept" type="button" disabled>ACCEPT</button>
      <button class="d-agent-agent-diff-review-reject" type="button" disabled>REJECT</button>
    </div>
  </section>
  <span class="d-agent-agent-diff-review-status" aria-live="polite" aria-atomic="true">Edit proposal streaming</span>
</div>`,
  css:`
.d-agent-agent-diff-review{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'Roboto Mono','JetBrains Mono',ui-monospace,monospace;isolation:isolate}
.d-agent-agent-diff-review *{box-sizing:border-box}
.d-agent-agent-diff-review-kicker{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-agent-agent-diff-review-mode{color:#fa7319}
.d-agent-agent-diff-review-card{position:absolute;top:38px;right:12px;bottom:14px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#101012;transition:border-color .2s ease,box-shadow .2s ease}
.d-agent-agent-diff-review-header{height:43px;padding:0 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #232327;background:#161619}
.d-agent-agent-diff-review-file{min-width:0;display:flex;align-items:center;gap:8px}
.d-agent-agent-diff-review-file i{display:grid;width:22px;height:22px;place-items:center;border-radius:5px;background:rgba(250,115,25,.12);color:#fa7319;font-family:inherit;font-size:8px;font-style:normal;font-weight:700;line-height:1;letter-spacing:.04em}
.d-agent-agent-diff-review-file strong{overflow:hidden;color:#c7c7ce;font-size:11px;font-weight:600;line-height:1;white-space:nowrap;text-overflow:ellipsis}
.d-agent-agent-diff-review-chips{display:flex;gap:5px;transition:opacity .2s ease}
.d-agent-agent-diff-review-chips span{height:19px;padding:0 6px;display:flex;align-items:center;border-radius:10px;font-size:9px;font-weight:700;line-height:1}
.d-agent-agent-diff-review-chips span:first-child{color:#fa7319;background:rgba(250,115,25,.12)}
.d-agent-agent-diff-review-chips span:last-child{color:#9b9ba3;background:#232327}
.d-agent-agent-diff-review-body{height:183px;padding:7px 0;overflow:hidden;background:#0d0d0f}
.d-agent-agent-diff-review-line{height:21px;padding:0 9px;display:grid;grid-template-columns:20px 10px minmax(0,1fr);align-items:center;overflow:hidden;opacity:0;color:#5c5c66;font-size:9px;line-height:21px;transition:height .3s ease,opacity .2s ease,transform .22s ease,background-color .5s ease,color .5s ease,text-decoration-color .3s ease;transition-delay:0ms}
.d-agent-agent-diff-review-line code{overflow:hidden;color:inherit;font-family:inherit;font-size:9px;font-weight:500;line-height:21px;white-space:pre;text-overflow:clip}
.d-agent-agent-diff-review-gutter{color:#3f3f46;text-align:right;font-variant-numeric:tabular-nums;transition:opacity .3s ease}
.d-agent-agent-diff-review-marker{font-weight:700;text-align:center;transition:opacity .3s ease}
.d-agent-agent-diff-review-context{transform:translateY(3px)}
.d-agent-agent-diff-review-removed{color:#9b9ba3;background:#161619;text-decoration-line:line-through;text-decoration-color:#5c5c66;transform:translateY(3px)}
.d-agent-agent-diff-review-added{color:#fa7319;background:rgba(250,115,25,.06);transform:translateX(-12px)}
.d-agent-agent-diff-review-line.d-agent-agent-diff-review-line-visible{opacity:1;transform:none}
.d-agent-agent-diff-review-actions{height:40px;padding:7px 10px;display:flex;justify-content:flex-end;gap:7px;border-top:1px solid #232327;background:#101012}
.d-agent-agent-diff-review-actions button{height:26px;padding:0 11px;border-radius:6px;font-family:inherit;font-size:9px;font-weight:700;line-height:1;letter-spacing:.06em;cursor:pointer;outline:none;transition:opacity .2s ease,border-color .2s ease,background-color .2s ease}
.d-agent-agent-diff-review-accept{border:1px solid rgba(250,115,25,.45);color:#fa7319;background:rgba(250,115,25,.10)}
.d-agent-agent-diff-review-reject{border:1px solid #2e2e34;color:#9b9ba3;background:transparent}
.d-agent-agent-diff-review-actions button:hover:not(:disabled){border-color:#fa7319;color:#ececef}
.d-agent-agent-diff-review-actions button:focus-visible{box-shadow:0 0 0 2px #0a0a0b,0 0 0 3px #fa7319}
.d-agent-agent-diff-review-actions button:disabled{opacity:.36;cursor:default}
.d-agent-agent-diff-review-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
.d-agent-agent-diff-review.d-agent-agent-diff-review-accepted .d-agent-agent-diff-review-removed,.d-agent-agent-diff-review.d-agent-agent-diff-review-rejected .d-agent-agent-diff-review-added{height:0;opacity:0;transition-delay:calc(var(--decision-order) * 55ms)}
.d-agent-agent-diff-review.d-agent-agent-diff-review-accepted .d-agent-agent-diff-review-added,.d-agent-agent-diff-review.d-agent-agent-diff-review-rejected .d-agent-agent-diff-review-removed{color:#c7c7ce;background:transparent;text-decoration-color:transparent}
.d-agent-agent-diff-review.d-agent-agent-diff-review-rejected .d-agent-agent-diff-review-removed{text-decoration-line:none}
.d-agent-agent-diff-review.d-agent-agent-diff-review-accepted .d-agent-agent-diff-review-marker,.d-agent-agent-diff-review.d-agent-agent-diff-review-rejected .d-agent-agent-diff-review-marker{opacity:0}
.d-agent-agent-diff-review.d-agent-agent-diff-review-accepted .d-agent-agent-diff-review-chips,.d-agent-agent-diff-review.d-agent-agent-diff-review-rejected .d-agent-agent-diff-review-chips{opacity:.35}
.d-agent-agent-diff-review.d-agent-agent-diff-review-accepted .d-agent-agent-diff-review-card{border-color:#fa7319;animation:d-agent-agent-diff-review-border-pulse .65s ease-out 1}
@keyframes d-agent-agent-diff-review-border-pulse{0%{box-shadow:0 0 0 0 rgba(250,115,25,.35)}100%{box-shadow:0 0 0 7px rgba(250,115,25,0)}}
@container(max-width:340px){.d-agent-agent-diff-review-card{right:10px;left:10px}.d-agent-agent-diff-review-line{padding-right:7px;padding-left:7px;grid-template-columns:18px 9px minmax(0,1fr)}.d-agent-agent-diff-review-header{padding:0 10px}}
@media(prefers-reduced-motion:reduce){.d-agent-agent-diff-review *,.d-agent-agent-diff-review *::before,.d-agent-agent-diff-review *::after{animation:none!important;transition:none!important}}
`,
  js:`
const title=root.querySelector('.d-agent-agent-diff-review-file strong'),mode=root.querySelector('.d-agent-agent-diff-review-mode'),body=root.querySelector('.d-agent-agent-diff-review-body'),acceptButton=root.querySelector('.d-agent-agent-diff-review-accept'),rejectButton=root.querySelector('.d-agent-agent-diff-review-reject'),status=root.querySelector('.d-agent-agent-diff-review-status'),lines=Array.from(root.querySelectorAll('.d-agent-agent-diff-review-line'));
const schedule=[140,270,400,530,610,690,770,850],holdDuration=2000,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
let phase=reduced?'ready':'streaming',elapsed=reduced?schedule[schedule.length-1]:0,decisionElapsed=0,lastWall=0,frameId=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function setLineVisibility(count){lines.forEach(function(line,index){line.classList.toggle('d-agent-agent-diff-review-line-visible',index<count)})}
function setReady(){phase='ready';elapsed=schedule[schedule.length-1];setLineVisibility(lines.length);body.setAttribute('aria-busy','false');acceptButton.disabled=false;rejectButton.disabled=false;mode.textContent='REVIEW';status.textContent='Edit proposal ready. Four additions and two deletions.'}
function renderStream(){let count=0;while(count<schedule.length&&elapsed>=schedule[count])count++;setLineVisibility(count);if(count===lines.length)setReady()}
function reset(){root.classList.remove('d-agent-agent-diff-review-accepted','d-agent-agent-diff-review-rejected');title.textContent='utils/format.ts';decisionElapsed=0;lastWall=0;if(reduced){setReady();return}phase='streaming';elapsed=0;setLineVisibility(0);body.setAttribute('aria-busy','true');acceptButton.disabled=true;rejectButton.disabled=true;mode.textContent='STREAMING';status.textContent='Edit proposal streaming';requestFrame()}
function decide(nextPhase){if(phase!=='ready'||cleaned)return;phase=nextPhase;decisionElapsed=0;lastWall=0;const accepted=nextPhase==='accepted';root.classList.add(accepted?'d-agent-agent-diff-review-accepted':'d-agent-agent-diff-review-rejected');title.textContent=accepted?String.fromCharCode(10003)+' Applied':'Reverted';mode.textContent=accepted?'APPLIED':'REVERTED';acceptButton.disabled=true;rejectButton.disabled=true;body.setAttribute('aria-busy','false');status.textContent=accepted?'Edit applied. Proposal will restart shortly.':'Edit reverted. Proposal will restart shortly.';requestFrame()}
function eligible(){return!cleaned&&visible&&documentVisible&&(phase==='streaming'||phase==='accepted'||phase==='rejected')}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(50,Math.max(0,wall-lastWall)):0;lastWall=wall;if(phase==='streaming'){elapsed+=delta;renderStream()}else{decisionElapsed+=delta;if(decisionElapsed>=holdDuration){reset();return}}requestFrame()}
acceptButton.addEventListener('click',function(){decide('accepted')},listener);rejectButton.addEventListener('click',function(){decide('rejected')},listener);
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.05});intersectionObserver.observe(root)}
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
if(reduced)setReady();else{setLineVisibility(0);renderStream();requestFrame()}
`,
  prompt:`Build one self-contained responsive 320px Agent and AI UI card for reviewing an edit to utils/format.ts. Show +4 and minus 2 chips, then stream context, removed, and added lines; removed lines use a grayscale fill and strike-through, while four accent additions slide from the left with an 80 millisecond stagger. Provide keyboard-accessible Accept and Reject controls. Accept collapses deletions, drains addition tints and markers, changes the header to Applied, and pulses a one-pixel accent border. Reject collapses additions, restores deletions as clean code, and changes the header to Reverted. Hold either outcome for two seconds, then reset and re-stream. Respect reduced motion and clean up detached instances. Keep chrome grayscale on #0a0a0b, use Roboto Mono with JetBrains Mono fallback, reserve #fa7319 for live, active, and focused proposal state, and distinguish additions and removals with plus or minus markers and strike-through rather than opposing hues.`
});
