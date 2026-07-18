window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-data-stream',
  title:'FUI Data Stream',
  cat:'FUI & Terminal',
  rootClass:'d-fui-stream',
  tags:['fui','telemetry','terminal','data'],
  libs:[],
  desc:'Four independently clocked telemetry lanes recycle seeded packets at distinct rates. Hover or focus isolates one stream for inspection without perturbing the other generators, while a separate active-time channel surfaces transient packet flashes.',
  seen:'Seen in Steve Lauda’s FUI explorations and dense professional trading terminals',
  hint:'hover a telemetry lane',
  html:`<div class="d-fui-stream" role="region" aria-label="Interactive telemetry data stream">
  <header class="d-fui-stream-topbar"><span>INTRX / TELEMETRY BUS</span><span class="d-fui-stream-live"><i class="d-fui-stream-live-dot"></i>LINK ACTIVE</span></header>
  <section class="d-fui-stream-panel" aria-label="Four live telemetry channels">
    <i class="d-fui-stream-corner d-fui-stream-corner-tl"></i><i class="d-fui-stream-corner d-fui-stream-corner-tr"></i><i class="d-fui-stream-corner d-fui-stream-corner-bl"></i><i class="d-fui-stream-corner d-fui-stream-corner-br"></i>
    <div class="d-fui-stream-panel-head"><span>PACKET MONITOR / CH.04</span><span>SEED 0x42</span></div>
    <div class="d-fui-stream-window">
      <div class="d-fui-stream-columns">
        <article class="d-fui-stream-column" data-column="0" tabindex="0" role="listbox" aria-label="HEX packets, 18 pixels per second"><header><span>HEX</span><small>18PX/S</small></header><div class="d-fui-stream-viewport"><div class="d-fui-stream-track"></div></div></article>
        <article class="d-fui-stream-column" data-column="1" tabindex="0" role="listbox" aria-label="COORD packets, 24 pixels per second"><header><span>COORD</span><small>24PX/S</small></header><div class="d-fui-stream-viewport"><div class="d-fui-stream-track"></div></div></article>
        <article class="d-fui-stream-column" data-column="2" tabindex="0" role="listbox" aria-label="TIME packets, 30 pixels per second"><header><span>TIME</span><small>30PX/S</small></header><div class="d-fui-stream-viewport"><div class="d-fui-stream-track"></div></div></article>
        <article class="d-fui-stream-column" data-column="3" tabindex="0" role="listbox" aria-label="STATUS packets, 22 pixels per second"><header><span>STATUS</span><small>22PX/S</small></header><div class="d-fui-stream-viewport"><div class="d-fui-stream-track"></div></div></article>
      </div>
      <i class="d-fui-stream-mask d-fui-stream-mask-top" aria-hidden="true"></i><i class="d-fui-stream-mask d-fui-stream-mask-bottom" aria-hidden="true"></i>
    </div>
    <output class="d-fui-stream-decoder" aria-hidden="true" hidden>→ PACKET VALID</output><span class="d-fui-stream-announcement" aria-live="polite"></span>
  </section>
  <footer class="d-fui-stream-footer"><span>4 CHANNELS</span><span>ROW 16PX</span><span>CRC PASS</span><span class="d-fui-stream-state">STREAMING</span></footer>
  <i class="d-fui-stream-scanline" aria-hidden="true"></i>
</div>`,
  css:`
.d-fui-stream{position:relative;width:100%;height:320px;box-sizing:border-box;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 12px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-stream:before{content:'';position:absolute;inset:0;z-index:12;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.018) 2px 3px),radial-gradient(circle at center,transparent 52%,rgba(0,0,0,.34) 100%)}
.d-fui-stream-topbar,.d-fui-stream-footer{position:relative;z-index:13;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-stream-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-fui-stream-live-dot{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.35);animation:d-fui-stream-live-pulse 1.6s ease-in-out infinite}
.d-fui-stream-panel{position:relative;z-index:2;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:4px;background:#101012}.d-fui-stream-panel-head{position:absolute;z-index:7;left:10px;right:10px;top:8px;display:flex;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-fui-stream-window{position:absolute;left:8px;right:8px;top:25px;bottom:8px;overflow:hidden;border-top:1px solid #232327;border-bottom:1px solid #232327;background:#0a0a0b}.d-fui-stream-columns{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.25fr) minmax(0,1.2fr) minmax(0,.9fr)}.d-fui-stream-column{position:relative;min-width:0;overflow:hidden;border-left:1px solid #232327;outline:none}.d-fui-stream-column:first-child{border-left:0}.d-fui-stream-column>header{position:relative;z-index:6;height:18px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;padding:0 5px;border-bottom:1px solid #232327;background:#101012;color:#9b9ba3;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-stream-column>header small{color:#5c5c66;font:10px/1 'JetBrains Mono',monospace;letter-spacing:.08em}.d-fui-stream-column:focus-visible>header,.d-fui-stream-column.d-fui-stream-is-paused>header span{color:#a78bfa}
.d-fui-stream-viewport{position:absolute;left:0;right:0;top:18px;bottom:0;overflow:hidden}.d-fui-stream-track{position:absolute;left:0;right:0;top:-16px;will-change:transform}.d-fui-stream-row{position:relative;width:100%;height:16px;box-sizing:border-box;display:flex;align-items:center;overflow:hidden;isolation:isolate;padding:0 3px 0 4px;border-left:2px solid transparent;color:#9b9ba3;font:10px/16px 'JetBrains Mono',monospace;letter-spacing:-.04em;white-space:nowrap;font-variant-numeric:tabular-nums}.d-fui-stream-row:after{content:'';position:absolute;inset:0;z-index:0;background:rgba(167,139,250,.10);opacity:0;pointer-events:none}.d-fui-stream-row.d-fui-stream-is-flash:after{opacity:1}.d-fui-stream-row.d-fui-stream-is-inspected{background:#161619;border-left-color:#2e2e34;color:#ececef}.d-fui-stream-status-ok{color:#4ade80}.d-fui-stream-status-warn{color:#fbbf24}.d-fui-stream-status-info{color:#67e8f9}
.d-fui-stream-mask{position:absolute;z-index:5;left:0;right:0;height:32px;pointer-events:none}.d-fui-stream-mask-top{top:18px;background:linear-gradient(to bottom,#0a0a0b,rgba(10,10,11,0))}.d-fui-stream-mask-bottom{bottom:0;background:linear-gradient(to top,#0a0a0b,rgba(10,10,11,0))}.d-fui-stream-decoder{position:absolute;z-index:10;left:0;top:0;box-sizing:border-box;min-width:76px;padding:3px 5px;border:1px solid #2e2e34;border-radius:2px;background:#0a0a0b;color:#4ade80;font:10px/1 'JetBrains Mono',monospace;white-space:nowrap;opacity:0;transform:translate3d(-120px,-120px,0);pointer-events:none}.d-fui-stream-decoder.d-fui-stream-is-visible{opacity:1}.d-fui-stream-announcement{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.d-fui-stream-footer{border-top:1px solid #232327}.d-fui-stream-state{color:#4ade80}.d-fui-stream.d-fui-stream-has-pause .d-fui-stream-state{color:#fbbf24}.d-fui-stream-corner{position:absolute;z-index:9;width:8px;height:8px;pointer-events:none}.d-fui-stream-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-stream-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-stream-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-stream-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-stream.d-fui-stream-has-pause .d-fui-stream-corner{border-color:#a78bfa}
.d-fui-stream-scanline{position:absolute;z-index:11;left:13px;right:13px;top:31px;height:1px;background:#a78bfa;opacity:.07;pointer-events:none;animation:d-fui-stream-stage-line 5.2s linear infinite}@keyframes d-fui-stream-live-pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-stream-stage-line{from{transform:translateY(0)}to{transform:translateY(256px)}}
@media(max-width:520px){.d-fui-stream{padding-inline:8px}.d-fui-stream-column>header small{display:none}.d-fui-stream-footer span:nth-child(2){display:none}}
@media(prefers-reduced-motion:reduce){.d-fui-stream *{animation:none!important;transition:none!important}.d-fui-stream-live-dot{opacity:1}.d-fui-stream-scanline{top:160px}}
`,
  js:`const columnNodes=[...root.querySelectorAll('.d-fui-stream-column')];
const panel=root.querySelector('.d-fui-stream-panel');
const decoder=root.querySelector('.d-fui-stream-decoder');
const announcement=root.querySelector('.d-fui-stream-announcement');
const stateLabel=root.querySelector('.d-fui-stream-state');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const rowHeight=16;
const rowCount=18;
const fadeHeight=32;
const configs=[{type:'HEX',speed:18,seed:0x4801},{type:'COORD',speed:24,seed:0xC002},{type:'TIME',speed:30,seed:0x7103},{type:'STATUS',speed:22,seed:0x5704}];
const states=[];
let visible=true;
let running=false;
let last=0;
let simulationTime=0;
let frames=0;
let flashes=0;
let flashNode=null;
let flashColumn=-1;
let flashStart=0;
let flashEnd=0;
let nextFlashAt=Infinity;
let nextFlashDelay=0;
let observer=null;
const flashRandom=mulberry32(0xF1A542);
root.dataset.columnCount='4';
root.dataset.speeds=configs.map(function(config){return config.speed}).join(',');
root.dataset.rowHeight=String(rowHeight);
root.dataset.rowFont='10';
root.dataset.fadeHeight=String(fadeHeight);
root.dataset.flashMin='2700';
root.dataset.flashMax='3300';
root.dataset.flashDuration='400';
root.dataset.reduced=String(reduced);
function mulberry32(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let value=Math.imul(seed^seed>>>15,1|seed);value=value+Math.imul(value^value>>>7,61|value)^value;return ((value^value>>>14)>>>0)/4294967296}}
function pad(value,size){return String(value).padStart(size,'0')}
function packet(state){
  const random=state.random;
  if(state.type==='HEX')return {text:'0x'+Math.floor(random()*65536).toString(16).toUpperCase().padStart(4,'0'),tone:''};
  if(state.type==='COORD')return {text:(random()*180-90).toFixed(2)+','+(random()*360-180).toFixed(1),tone:''};
  if(state.type==='TIME'){
    const stamp=Math.floor(random()*86400000);
    const hours=Math.floor(stamp/3600000);
    const minutes=Math.floor(stamp%3600000/60000);
    const seconds=Math.floor(stamp%60000/1000);
    return {text:pad(hours,2)+':'+pad(minutes,2)+':'+pad(seconds,2)+'.'+pad(stamp%1000,3),tone:''};
  }
  const statuses=[['VALID','ok'],['SYNC','info'],['NOMINAL','ok'],['QUEUED',''],['RETRY','warn']];
  const status=statuses[Math.floor(random()*statuses.length)];
  return {text:status[0],tone:status[1]};
}
function fillRow(row,state){
  const value=packet(state);
  state.sequence++;
  row.textContent=value.text;
  row.classList.remove('d-fui-stream-status-ok','d-fui-stream-status-warn','d-fui-stream-status-info');
  if(value.tone)row.classList.add('d-fui-stream-status-'+value.tone);
  row.dataset.sequence=String(state.sequence);
  row.setAttribute('aria-label',state.type+' packet '+value.text);
}
configs.forEach(function(config,index){
  const node=columnNodes[index];
  const track=node.querySelector('.d-fui-stream-track');
  const state={index:index,type:config.type,speed:config.speed,random:mulberry32(config.seed),distance:0,recycled:0,offset:0,sequence:0,hovered:false,focused:false,paused:false,selected:null,node:node,track:track,rows:[]};
  for(let rowIndex=0;rowIndex<rowCount;rowIndex++){
    const row=document.createElement('span');
    row.className='d-fui-stream-row';
    row.id='d-fui-stream-'+index+'-'+rowIndex;
    row.setAttribute('role','option');
    row.setAttribute('aria-selected','false');
    fillRow(row,state);
    track.appendChild(row);
    state.rows.push(row);
  }
  states.push(state);
});
root.dataset.initialRows=states.map(function(state){return state.rows.slice(0,4).map(function(row){return row.textContent}).join('~')}).join('|');
function expose(source){
  const pausedStates=states.filter(function(state){return state.paused});
  root.dataset.distances=states.map(function(state){return state.distance.toFixed(2)}).join(',');
  root.dataset.offsets=states.map(function(state){return state.offset.toFixed(2)}).join(',');
  root.dataset.sequences=states.map(function(state){return state.sequence}).join(',');
  root.dataset.paused=states.map(function(state){return state.paused?'1':'0'}).join(',');
  root.dataset.pausedCount=String(pausedStates.length);
  root.dataset.frames=String(frames);
  root.dataset.flashes=String(flashes);
  root.dataset.flashActive=String(Boolean(flashNode));
  root.dataset.flashColumn=String(flashColumn);
  root.dataset.nextFlashDelay=String(nextFlashDelay);
  root.dataset.simulationTime=simulationTime.toFixed(0);
  root.dataset.running=String(running);
  root.dataset.source=source;
  root.classList.toggle('d-fui-stream-has-pause',pausedStates.length>0);
  stateLabel.textContent=pausedStates.length?'CHANNEL HOLD':'STREAMING';
}
function renderState(state){
  while(state.distance-state.recycled>=rowHeight){
    state.recycled+=rowHeight;
    const row=state.rows.shift();
    if(row===flashNode){row.classList.remove('d-fui-stream-is-flash');flashNode=null;flashColumn=-1}
    fillRow(row,state);
    state.track.appendChild(row);
    state.rows.push(row);
  }
  state.offset=state.distance-state.recycled;
  state.track.style.transform='translate3d(0,'+(-state.offset).toFixed(2)+'px,0)';
}
function planFlash(){
  nextFlashDelay=Math.floor(2700+flashRandom()*601);
  nextFlashAt=simulationTime+nextFlashDelay;
  root.dataset.nextFlashDelay=String(nextFlashDelay);
}
function beginFlash(){
  if(flashNode)flashNode.classList.remove('d-fui-stream-is-flash');
  flashColumn=Math.floor(flashRandom()*states.length);
  const candidates=states[flashColumn].rows.slice(4,11);
  flashNode=candidates[Math.floor(flashRandom()*candidates.length)];
  flashNode.classList.add('d-fui-stream-is-flash');
  flashStart=simulationTime;
  flashEnd=simulationTime+400;
  flashes++;
  planFlash();
}
function updateFlash(){
  if(flashNode){
    root.dataset.flashProgress=Math.min(1,(simulationTime-flashStart)/400).toFixed(3);
    if(simulationTime>=flashEnd){flashNode.classList.remove('d-fui-stream-is-flash');flashNode=null;flashColumn=-1}
  }
  if(!flashNode&&simulationTime>=nextFlashAt)beginFlash();
}
function clearInspection(state){
  if(state.selected){state.selected.classList.remove('d-fui-stream-is-inspected');state.selected.setAttribute('aria-selected','false')}
  state.selected=null;
  state.node.removeAttribute('aria-activedescendant');
  decoder.classList.remove('d-fui-stream-is-visible');
  decoder.hidden=true;
  root.dataset.inspectedColumn='-1';
  root.dataset.inspectedPacket='';
  root.dataset.decoderVisible='false';
}
function inspectableRows(state){
  const viewportRect=state.node.querySelector('.d-fui-stream-viewport').getBoundingClientRect();
  return state.rows.filter(function(row){const rowRect=row.getBoundingClientRect();const center=rowRect.top+rowRect.height/2;return center>=viewportRect.top+fadeHeight&&center<=viewportRect.bottom-fadeHeight});
}
function inspect(state,row,source){
  if(!row||!state.rows.includes(row))return;
  if(state.selected===row&&!decoder.hidden)return;
  const viewportRect=state.node.querySelector('.d-fui-stream-viewport').getBoundingClientRect();
  const rowRect=row.getBoundingClientRect();
  const rowCenter=rowRect.top+rowRect.height/2;
  if(source!=='pointer'&&(rowCenter<viewportRect.top+fadeHeight||rowCenter>viewportRect.bottom-fadeHeight)){if(state.selected)clearInspection(state);return}
  if(state.selected&&state.selected!==row){state.selected.classList.remove('d-fui-stream-is-inspected');state.selected.setAttribute('aria-selected','false')}
  state.selected=row;
  row.classList.add('d-fui-stream-is-inspected');
  row.setAttribute('aria-selected','true');
  state.node.setAttribute('aria-activedescendant',row.id);
  decoder.hidden=false;
  decoder.classList.add('d-fui-stream-is-visible');
  const panelRect=panel.getBoundingClientRect();
  const columnRect=state.node.getBoundingClientRect();
  const decoderRect=decoder.getBoundingClientRect();
  let x=columnRect.right-panelRect.left+4;
  if(x+decoderRect.width>panelRect.width-8)x=columnRect.left-panelRect.left-decoderRect.width-4;
  x=Math.max(8,Math.min(panelRect.width-decoderRect.width-8,x));
  const y=Math.max(25,Math.min(panelRect.height-decoderRect.height-8,rowRect.top-panelRect.top+rowRect.height/2-decoderRect.height/2));
  decoder.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';
  announcement.textContent='Packet valid, '+row.textContent;
  root.dataset.inspectedColumn=String(state.index);
  root.dataset.inspectedPacket=row.textContent;
  root.dataset.inspectionSource=source;
  root.dataset.decoderVisible='true';
}
function syncPause(state,source){
  state.paused=state.hovered||state.focused;
  state.node.classList.toggle('d-fui-stream-is-paused',state.paused);
  expose(source);
}
states.forEach(function(state){
  state.node.addEventListener('pointerenter',function(){state.hovered=true;syncPause(state,'pointer enter')},{passive:true});
  state.node.addEventListener('pointermove',function(event){const row=event.target.closest('.d-fui-stream-row');if(row)inspect(state,row,'pointer')},{passive:true});
  state.node.addEventListener('pointerleave',function(){state.hovered=false;if(!state.focused)clearInspection(state);syncPause(state,'pointer leave')},{passive:true});
  state.node.addEventListener('focus',function(){state.focused=true;const rows=inspectableRows(state);inspect(state,rows[Math.floor(rows.length/2)],'focus');syncPause(state,'focus')});
  state.node.addEventListener('blur',function(){state.focused=false;if(!state.hovered)clearInspection(state);syncPause(state,'blur')});
  state.node.addEventListener('keydown',function(event){
    if(event.key==='ArrowUp'||event.key==='ArrowDown'){
      event.preventDefault();
      const rows=inspectableRows(state);
      const current=Math.max(0,rows.indexOf(state.selected));
      const next=Math.max(0,Math.min(rows.length-1,current+(event.key==='ArrowUp'?-1:1)));
      inspect(state,rows[next],'keyboard');
      expose('keyboard');
    }else if(event.key==='Escape'){event.preventDefault();state.node.blur()}
  });
});
function start(){if(reduced||!visible||running||!root.isConnected)return;running=true;last=performance.now();requestAnimationFrame(frame)}
function frame(now){
  if(!root.isConnected){running=false;if(observer)observer.disconnect();return}
  if(!visible){running=false;return}
  const delta=Math.min(50,Math.max(0,now-last));
  last=now;
  simulationTime+=delta;
  frames++;
  states.forEach(function(state){if(!state.paused)state.distance+=state.speed*delta/1000;renderState(state)});
  updateFlash();
  expose('stream');
  requestAnimationFrame(frame);
}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start()},{threshold:.05});observer.observe(root)}
states.forEach(renderState);
if(reduced){expose('reduced')}else{planFlash();start()}`,
  prompt:`Build a self-contained 320px-tall fictional telemetry terminal using JetBrains Mono and only #0a0a0b, #101012, #161619, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, accent #a78bfa, info #67e8f9, success #4ade80, warning #fbbf24, and error #f87171. Use a 4px-radius hard-tech frame, four 8px corner ticks, restrained scanlines, and an always-visible accent activity marker. Render labels and captions at 10px uppercase with 0.08em tracking.

Split the data window into exactly four columns labeled HEX, COORD, TIME, and STATUS. Render seeded-random 10px JetBrains Mono rows in deterministic formats such as 0x4F2A, 52.51,-13.4, 14:02:11.482, and meaningful status words. Give every row an exact 16px line box and keep buffered rows above and below the viewport. Move the columns continuously upward at exactly 18, 24, 30, and 22 pixels per second. Track cumulative distance independently for each column, recycle rows with a while loop at every 16px crossing, and give every column its own seeded PRNG so pausing one stream freezes both its pixels and generator sequence without perturbing the other three. Overlay exact 32px pointer-transparent fades into #0a0a0b at the top and bottom of the row area.

About every three active seconds, use a fifth seeded PRNG to choose one visible middle row and flash a #a78bfa background at exactly 10% alpha for 400ms. Drive scrolling and flash timing from one visibility-aware active-time requestAnimationFrame loop, cap frame deltas, reset the timestamp on resume, and disconnect cleanly with the root. Never fast-forward hidden time.

Hovering a column pauses only that column. The actual row under the pointer receives a #161619 background and exact 2px #2e2e34 left border while a panel-local, edge-clamped gutter label reads → PACKET VALID in #4ade80. Pointer leave clears the inspection before resuming. Make all four columns keyboard focusable: focus also pauses and inspects a visible row between the two fades, ArrowUp and ArrowDown move among only those visible rows, Escape releases it, and aria-activedescendant plus aria-selected expose the state without making every row tabbable. Keep the visual decoder hidden from assistive technology and announce the inspected packet through a separate polite live region. Under prefers-reduced-motion, start no frame loop and no flashes; retain stable seeded rows plus instantaneous pointer and keyboard inspection.`
});
