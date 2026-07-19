/* INTRX registry - deterministic agent streaming response */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'agent-streaming-text',
  title:'Agent Streaming Text',
  cat:'Agent & AI UI',
  rootClass:'d-agent-agent-streaming-text',
  tags:['chat','streaming','markdown'],
  libs:[],
  desc:'A realistic burst-cadence assistant response resolves rich text and a code sample while token and latency counters advance in sync.',
  seen:'Seen on: contemporary AI chat products',
  hint:'replay the deterministic response; copy the resolved code sample',
  html:`<div class="d-agent-agent-streaming-text" role="region" aria-label="Agent streaming response">
  <div class="d-agent-agent-streaming-text-head"><span aria-hidden="true">AGENT / RESPONSE</span><div><span class="d-agent-agent-streaming-text-mode" aria-hidden="true">READY</span><button class="d-agent-agent-streaming-text-replay" type="button" aria-label="Replay streaming response">REPLAY</button></div></div>
  <div class="d-agent-agent-streaming-text-stage">
    <article class="d-agent-agent-streaming-text-message" aria-label="Assistant response" aria-busy="true">
      <div class="d-agent-agent-streaming-text-copy" aria-live="off"></div><span class="d-agent-agent-streaming-text-stall" aria-hidden="true" hidden><i></i><i></i><i></i></span>
    </article>
    <div class="d-agent-agent-streaming-text-code" aria-label="Generated JavaScript example" hidden>
      <div class="d-agent-agent-streaming-text-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>
      <pre class="d-agent-agent-streaming-text-lines"><code></code></pre>
      <button class="d-agent-agent-streaming-text-copy-chip" type="button" aria-label="Copy generated code" hidden>COPY</button>
    </div>
    <div class="d-agent-agent-streaming-text-foot" aria-hidden="true"><span class="d-agent-agent-streaming-text-tokens">0 tokens</span><span class="d-agent-agent-streaming-text-time">0.0s</span></div>
  </div>
  <span class="d-agent-agent-streaming-text-status">Response ready to stream</span>
</div>`,
  css:`
.d-agent-agent-streaming-text{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-agent-agent-streaming-text *{box-sizing:border-box}
.d-agent-agent-streaming-text-head{position:absolute;top:12px;right:16px;left:16px;height:20px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-agent-agent-streaming-text-head>div{display:flex;align-items:center;gap:8px}
.d-agent-agent-streaming-text-mode{color:#a78bfa}
.d-agent-agent-streaming-text-replay,.d-agent-agent-streaming-text-copy-chip{appearance:none;border:1px solid #2e2e34;border-radius:5px;background:#161619;color:#9b9ba3;font:600 9px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.06em;cursor:pointer;outline:none}
.d-agent-agent-streaming-text-replay{height:20px;padding:0 7px}
.d-agent-agent-streaming-text-replay:hover,.d-agent-agent-streaming-text-copy-chip:hover{border-color:#a78bfa;color:#ececef}
.d-agent-agent-streaming-text-replay:focus-visible,.d-agent-agent-streaming-text-copy-chip:focus-visible{border-color:#a78bfa;box-shadow:0 0 0 1px #a78bfa}
.d-agent-agent-streaming-text-stage{position:absolute;top:39px;right:12px;bottom:24px;left:12px;display:grid;grid-template-rows:minmax(0,1fr) 64px 18px;gap:6px;min-width:0;padding:12px;border:1px solid #232327;border-radius:10px;overflow:hidden;background:#101012}
.d-agent-agent-streaming-text-message{position:relative;min-height:0;margin:0;padding:10px 11px;border:1px solid #232327;border-radius:8px;overflow:hidden;background:#161619;color:#c7c7ce;font:400 10.5px/1.38 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.d-agent-agent-streaming-text-copy p{margin:0 0 5px}
.d-agent-agent-streaming-text-copy p:last-child{margin-bottom:0}
.d-agent-agent-streaming-text-copy strong{color:#ececef;font-weight:600}
.d-agent-agent-streaming-text-copy code{display:inline;padding:1px 4px;border:1px solid #2e2e34;border-radius:4px;background:#101012;color:#c4b5fd;font:500 9.5px/1.3 'JetBrains Mono',ui-monospace,monospace}
.d-agent-agent-streaming-text-copy ul{margin:3px 0 5px;padding:0 0 0 16px;color:#b2b2bb}
.d-agent-agent-streaming-text-copy li{margin:1px 0;padding-left:1px}
.d-agent-agent-streaming-text-copy li::marker{color:#a78bfa}
.d-agent-agent-streaming-text-caret{display:inline-block;width:2px;height:14px;margin-left:3px;background:#a78bfa;vertical-align:-3px;box-shadow:0 0 7px rgba(167,139,250,.35)}
.d-agent-agent-streaming-text-stall{display:inline-flex;align-items:center;gap:3px;margin:2px 0 0 3px;vertical-align:middle}
.d-agent-agent-streaming-text-stall[hidden]{display:none}
.d-agent-agent-streaming-text-stall i{width:3px;height:3px;border-radius:50%;background:#a78bfa;animation:d-agent-agent-streaming-text-dot .8s ease-in-out infinite}
.d-agent-agent-streaming-text-stall i:nth-child(2){animation-delay:.12s}.d-agent-agent-streaming-text-stall i:nth-child(3){animation-delay:.24s}
.d-agent-agent-streaming-text-code{position:relative;height:64px;padding:16px 10px 6px;border:1px solid #232327;border-radius:8px;overflow:hidden;background:#0d0d0f}
.d-agent-agent-streaming-text-code[hidden]{visibility:hidden}
.d-agent-agent-streaming-text-skeleton{position:absolute;inset:15px 10px 8px;display:flex;flex-direction:column;gap:7px}
.d-agent-agent-streaming-text-skeleton i{height:5px;border-radius:3px;background:linear-gradient(90deg,#1b1b1f 0%,#303038 45%,#1b1b1f 80%);background-size:220% 100%;animation:d-agent-agent-streaming-text-shimmer 1.2s linear infinite}
.d-agent-agent-streaming-text-skeleton i:nth-child(1){width:88%}.d-agent-agent-streaming-text-skeleton i:nth-child(2){width:66%}.d-agent-agent-streaming-text-skeleton i:nth-child(3){width:78%}
.d-agent-agent-streaming-text-code.d-agent-agent-streaming-text-is-resolved .d-agent-agent-streaming-text-skeleton{display:none}
.d-agent-agent-streaming-text-lines{position:relative;margin:0;color:#c7c7ce;font:500 9px/13px 'JetBrains Mono',ui-monospace,monospace;white-space:pre-wrap}
.d-agent-agent-streaming-text-line{display:block;opacity:0;transform:translateY(4px);transition:opacity .18s ease,transform .18s ease}
.d-agent-agent-streaming-text-line.d-agent-agent-streaming-text-is-visible{opacity:1;transform:none}
.d-agent-agent-streaming-text-copy-chip{position:absolute;top:5px;right:6px;height:17px;padding:0 5px;opacity:0;transition:opacity .18s ease}
.d-agent-agent-streaming-text-copy-chip.d-agent-agent-streaming-text-is-visible{opacity:1}
.d-agent-agent-streaming-text-foot{display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:18px;font-variant-numeric:tabular-nums;letter-spacing:.04em}
.d-agent-agent-streaming-text-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
@keyframes d-agent-agent-streaming-text-dot{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-2px)}}
@keyframes d-agent-agent-streaming-text-shimmer{to{background-position:-220% 0}}
@container (max-width:340px){.d-agent-agent-streaming-text-stage{padding:10px}.d-agent-agent-streaming-text-message{padding:8px 9px;font-size:10px;line-height:1.35}.d-agent-agent-streaming-text-copy ul{padding-left:14px}.d-agent-agent-streaming-text-head{right:14px;left:14px}}
@media (prefers-reduced-motion:reduce){.d-agent-agent-streaming-text-stall i,.d-agent-agent-streaming-text-skeleton i{animation:none}.d-agent-agent-streaming-text-line,.d-agent-agent-streaming-text-copy-chip{transition:none}}
`,
  js:`
const messageElement=root.querySelector('.d-agent-agent-streaming-text-message'),copyElement=root.querySelector('.d-agent-agent-streaming-text-copy'),stallElement=root.querySelector('.d-agent-agent-streaming-text-stall'),codeElement=root.querySelector('.d-agent-agent-streaming-text-code'),skeletonElement=root.querySelector('.d-agent-agent-streaming-text-skeleton'),linesElement=root.querySelector('.d-agent-agent-streaming-text-lines code'),copyChip=root.querySelector('.d-agent-agent-streaming-text-copy-chip'),replayButton=root.querySelector('.d-agent-agent-streaming-text-replay'),modeElement=root.querySelector('.d-agent-agent-streaming-text-mode'),tokensElement=root.querySelector('.d-agent-agent-streaming-text-tokens'),timeElement=root.querySelector('.d-agent-agent-streaming-text-time'),statusElement=root.querySelector('.d-agent-agent-streaming-text-status');
const answerParts=['Here is a concise implementation plan. Start with **one deterministic scheduler** so every visual state shares the same clock.','Keep interaction state in '+String.fromCharCode(96)+'requestAnimationFrame'+String.fromCharCode(96)+', pause work when the card is hidden, and preserve three guarantees:','- motion respects reduced preferences','- keyboard actions mirror pointer actions','- cleanup cancels pending work','That keeps the component responsive, inspectable, and easy to replay across layouts.'],answer=answerParts.join(String.fromCharCode(10)),pieces=answer.match(/\\S+\\s*/g)||[],codeLines=["const stream = createStream({ cadence: 'burst' });","stream.pauseWhenHidden();","return stream.replay();"],codeText=codeLines.join(String.fromCharCode(10));
const burstSizes=[4,3,2,4,1,3],gaps=[34,52,78,41,66,89];let cursor=0,time=70,stallStart=0,stallEnd=0,stalled=false,eventIndex=0;const schedule=[];while(cursor<pieces.length){if(!stalled&&cursor>=Math.floor(pieces.length*.48)){stallStart=time;time+=400;stallEnd=time;stalled=true}cursor=Math.min(pieces.length,cursor+burstSizes[eventIndex%burstSizes.length]);schedule.push({time:time,cursor:cursor});time+=gaps[eventIndex%gaps.length];eventIndex++}const textDone=schedule[schedule.length-1].time,skeletonAt=textDone+60,codeAt=skeletonAt+600,totalDuration=3100,lineDelay=80,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
let elapsed=reduced?totalDuration:0,lastWall=0,frameId=0,running=false,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,lastPhase='';
function appendInline(target,text){let index=0;while(index<text.length){const bold=text.indexOf('**',index),code=text.indexOf(String.fromCharCode(96),index),kind=bold!==-1&&(code===-1||bold<code)?'bold':code!==-1?'code':null,start=kind==='bold'?bold:code;if(kind===null){target.appendChild(document.createTextNode(text.slice(index)));break}if(start>index)target.appendChild(document.createTextNode(text.slice(index,start)));const marker=kind==='bold'?'**':String.fromCharCode(96),close=text.indexOf(marker,start+marker.length);if(close===-1){target.appendChild(document.createTextNode(text.slice(start)));break}const node=document.createElement(kind==='bold'?'strong':'code');node.textContent=text.slice(start+marker.length,close);target.appendChild(node);index=close+marker.length}}
function renderMarkdown(source,showCaret){copyElement.replaceChildren();const lines=source.split(String.fromCharCode(10));let list=null,last=copyElement;lines.forEach(function(line){if(line.startsWith('- ')){if(!list){list=document.createElement('ul');copyElement.appendChild(list)}const item=document.createElement('li');appendInline(item,line.slice(2));list.appendChild(item);last=item}else{list=null;const paragraph=document.createElement('p');appendInline(paragraph,line);copyElement.appendChild(paragraph);last=paragraph}});if(showCaret){const caret=document.createElement('i');caret.className='d-agent-agent-streaming-text-caret';caret.setAttribute('aria-hidden','true');last.appendChild(caret)}}
codeLines.forEach(function(line){const span=document.createElement('span');span.className='d-agent-agent-streaming-text-line';span.textContent=line;linesElement.appendChild(span)});const lineElements=Array.from(linesElement.children);
function phaseFor(now,stalling,visibleCount){if(now>=totalDuration)return'done';if(now>=codeAt)return'code';if(now>=skeletonAt)return'skeleton';if(stalling)return'stall';if(visibleCount)return'streaming';return'ready'}
function announce(phase){if(phase===lastPhase)return;lastPhase=phase;modeElement.textContent=phase==='done'?'DONE':phase==='stall'?'THINKING':phase==='skeleton'?'CODE':phase==='code'?'RESOLVING':phase==='streaming'?'STREAMING':'READY';statusElement.textContent=phase==='done'?'Response complete at 2.4 thousand tokens in 3.1 seconds':phase==='stall'?'Response paused briefly while reasoning':phase==='skeleton'?'Code example loading':phase==='code'?'Code example resolved':phase==='streaming'?'Assistant response streaming':'Response ready to stream'}
function render(){let visibleCount=0;for(const event of schedule)if(elapsed>=event.time)visibleCount=event.cursor;else break;const stalling=elapsed>=stallStart&&elapsed<stallEnd&&visibleCount<pieces.length,finishedText=visibleCount===pieces.length;renderMarkdown(pieces.slice(0,visibleCount).join(''),!finishedText&&!stalling);stallElement.hidden=!stalling;messageElement.setAttribute('aria-busy',String(elapsed<totalDuration));codeElement.hidden=elapsed<skeletonAt;const resolved=elapsed>=codeAt;codeElement.classList.toggle('d-agent-agent-streaming-text-is-resolved',resolved);skeletonElement.hidden=resolved;lineElements.forEach(function(line,index){line.classList.toggle('d-agent-agent-streaming-text-is-visible',elapsed>=codeAt+index*lineDelay)});const copyReady=elapsed>=codeAt+(lineElements.length-1)*lineDelay;copyChip.hidden=!copyReady;copyChip.classList.toggle('d-agent-agent-streaming-text-is-visible',copyReady);const progress=Math.min(1,elapsed/totalDuration),tokenCount=Math.round(2400*progress),tokenText=tokenCount>=1000?(tokenCount/1000).toFixed(1)+'k':String(tokenCount);tokensElement.textContent=tokenText+' tokens '+String.fromCharCode(183);timeElement.textContent=(3.1*progress).toFixed(1)+'s';announce(phaseFor(elapsed,stalling,visibleCount))}
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible&&elapsed<totalDuration}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){running=false;lastWall=0;return}running=true;const delta=lastWall?Math.min(50,Math.max(0,wall-lastWall)):0;lastWall=wall;elapsed=Math.min(totalDuration,elapsed+delta);render();if(elapsed<totalDuration)requestFrame();else{running=false;lastWall=0}}
function replay(){if(cleaned)return;if(frameId){cancelAnimationFrame(frameId);frameId=0}elapsed=reduced?totalDuration:0;lastWall=0;lastPhase='';copyChip.textContent='COPY';render();requestFrame()}
replayButton.addEventListener('click',replay,listener);copyChip.addEventListener('click',function(){if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(codeText).catch(function(){});copyChip.textContent='COPIED';statusElement.textContent='Generated code copied';copyChip.blur()},listener);
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0;running=false}}document.addEventListener('visibilitychange',onVisibility,listener);
let intersectionObserver=null,connectionObserver=null;if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0;running=false}},{threshold:.05});intersectionObserver.observe(root)}
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}running=false;controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
render();requestFrame();
`,
  prompt:`Build one self-contained responsive 320px Agent and AI UI response card with no dependencies or external assets. Stream a deterministic roughly sixty-word assistant answer in realistic bursts of one to four tokens separated by irregular 30 to 90 millisecond gaps. Insert one 400 millisecond mid-answer stall with a three-dot shimmer. Resolve closed bold and inline-code markdown immediately, form a three-item list live, and keep a two-by-fourteen-pixel accent caret at the stream edge. After the prose, show a three-bar shimmering code skeleton, replace it after 600 milliseconds with three mono lines using an 80 millisecond line stagger, then reveal a keyboard-accessible copy chip. Count the footer to 2.4k tokens and 3.1 seconds, provide Replay, pause work while hidden, clean up detached instances, and render the complete stable state for reduced motion.`
});
