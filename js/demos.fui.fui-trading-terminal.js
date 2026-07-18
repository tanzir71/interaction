window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-trading-terminal',
  title:'FUI Trading Terminal',
  cat:'FUI & Terminal',
  rootClass:'d-fui-trade',
  tags:['fui','trading','FLIP','terminal'],
  libs:[],
  desc:'A deterministic three-widget market terminal shares one active-time clock across a shifting price trace, mirrored order book, and rising trade tape. Every panel remains live while its measured slot can be swapped or collapsed.',
  seen:'Seen in Timothy M.\'s flexible trading terminal work in progress',
  hint:'drag a panel header, double-click to collapse',
  html:`<div class="d-fui-trade" role="region" aria-label="Interactive fictional trading terminal">
  <header class="d-fui-trade-topbar"><span>INTRX / SYNTHETIC MARKET</span><span class="d-fui-trade-live"><i class="d-fui-trade-live-dot"></i>FEED LIVE</span></header>
  <div class="d-fui-trade-workspace" role="list" aria-label="Movable market panels">
    <section class="d-fui-trade-panel d-fui-trade-slot-0" data-panel="price" data-slot="0" role="listitem" aria-label="Price panel">
      <div class="d-fui-trade-shell">
        <i class="d-fui-trade-corner d-fui-trade-corner-tl"></i><i class="d-fui-trade-corner d-fui-trade-corner-tr"></i><i class="d-fui-trade-corner d-fui-trade-corner-bl"></i><i class="d-fui-trade-corner d-fui-trade-corner-br"></i>
        <button class="d-fui-trade-handle" type="button" aria-expanded="true" aria-controls="d-fui-trade-price-body"><span>PRICE <b class="d-fui-trade-price-extra">/ INTRX</b></span><span class="d-fui-trade-price-chip"><b aria-hidden="true">▲</b><span class="d-fui-trade-price-value">127.42</span></span></button>
        <div class="d-fui-trade-body d-fui-trade-price-body" id="d-fui-trade-price-body">
          <div class="d-fui-trade-chart"><canvas class="d-fui-trade-canvas" role="img" aria-label="Sixty point fictional INTRX price chart"></canvas><span class="d-fui-trade-chart-high">134</span><span class="d-fui-trade-chart-low">120</span></div>
          <div class="d-fui-trade-price-meta"><span>60 POINT WINDOW</span><span>800MS FEED</span></div>
        </div>
      </div>
    </section>
    <section class="d-fui-trade-panel d-fui-trade-slot-1" data-panel="book" data-slot="1" role="listitem" aria-label="Order book panel">
      <div class="d-fui-trade-shell">
        <i class="d-fui-trade-corner d-fui-trade-corner-tl"></i><i class="d-fui-trade-corner d-fui-trade-corner-tr"></i><i class="d-fui-trade-corner d-fui-trade-corner-bl"></i><i class="d-fui-trade-corner d-fui-trade-corner-br"></i>
        <button class="d-fui-trade-handle" type="button" aria-expanded="true" aria-controls="d-fui-trade-book-body"><span>BOOK / L2</span><span class="d-fui-trade-panel-state">06 LVL</span></button>
        <div class="d-fui-trade-body d-fui-trade-book-body" id="d-fui-trade-book-body" aria-label="Six bid and ask levels">
          <div class="d-fui-trade-book-head"><span>BID</span><span>PX</span><span>ASK</span></div>
          <div class="d-fui-trade-book-levels"></div>
        </div>
      </div>
    </section>
    <section class="d-fui-trade-panel d-fui-trade-slot-2" data-panel="tape" data-slot="2" role="listitem" aria-label="Trade tape panel">
      <div class="d-fui-trade-shell">
        <i class="d-fui-trade-corner d-fui-trade-corner-tl"></i><i class="d-fui-trade-corner d-fui-trade-corner-tr"></i><i class="d-fui-trade-corner d-fui-trade-corner-bl"></i><i class="d-fui-trade-corner d-fui-trade-corner-br"></i>
        <button class="d-fui-trade-handle" type="button" aria-expanded="true" aria-controls="d-fui-trade-tape-body"><span>TAPE / LAST</span><span class="d-fui-trade-panel-state">UTC+6</span></button>
        <div class="d-fui-trade-body d-fui-trade-tape-body" id="d-fui-trade-tape-body" aria-label="Recent fictional trades">
          <div class="d-fui-trade-tape-head"><span>PRICE</span><span>SIZE</span></div>
          <div class="d-fui-trade-tape-rows"></div>
        </div>
      </div>
    </section>
  </div>
  <footer class="d-fui-trade-footer"><span>INTRX/USD</span><span class="d-fui-trade-direction">MARKET OPEN</span><span>T+0.8S</span></footer>
  <i class="d-fui-trade-scanline" aria-hidden="true"></i>
  <span class="d-fui-trade-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-fui-trade{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px clamp(8px,3%,12px);background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-trade:before{content:'';position:absolute;inset:0;z-index:20;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.018) 2px 3px),radial-gradient(circle at center,transparent 54%,rgba(0,0,0,.35) 100%)}
.d-fui-trade-topbar,.d-fui-trade-footer{position:relative;z-index:21;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;text-transform:uppercase}
.d-fui-trade-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-fui-trade-live-dot{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.35);animation:d-fui-trade-live-pulse 1.6s ease-in-out infinite}
.d-fui-trade-workspace{position:relative;z-index:3;min-width:0;min-height:0;display:grid;grid-template-columns:minmax(0,1.22fr) minmax(0,.96fr);grid-template-rows:repeat(2,minmax(0,1fr));gap:6px;overflow:visible}
.d-fui-trade-panel{position:relative;z-index:1;min-width:0;min-height:0;transform-origin:0 0;will-change:transform}.d-fui-trade-slot-0{grid-area:1/1/3/2}.d-fui-trade-slot-1{grid-area:1/2/2/3}.d-fui-trade-slot-2{grid-area:2/2/3/3}.d-fui-trade-panel.d-fui-trade-is-collapsed{align-self:start;height:27px}
.d-fui-trade-shell{position:relative;width:100%;height:100%;box-sizing:border-box;overflow:hidden;border:1px solid #232327;border-radius:4px;background:#101012;transition:border-color 180ms cubic-bezier(.22,1,.36,1);will-change:transform}
.d-fui-trade-panel:hover .d-fui-trade-shell,.d-fui-trade-panel:focus-within .d-fui-trade-shell,.d-fui-trade-panel.d-fui-trade-is-drop .d-fui-trade-shell,.d-fui-trade-panel.d-fui-trade-is-dragging .d-fui-trade-shell{border-color:#2e2e34}
.d-fui-trade-handle{position:relative;z-index:5;width:100%;height:27px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:5px;padding:0 9px;border:0;border-bottom:1px solid #232327;background:#101012;color:#5c5c66;font:500 10px/1 'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;cursor:grab;touch-action:none;user-select:none}.d-fui-trade-handle:active{cursor:grabbing}.d-fui-trade-handle:focus-visible{outline:2px solid rgba(167,139,250,.72);outline-offset:-3px;color:#ececef}
.d-fui-trade-price-extra{font:inherit}.d-fui-trade-panel:not(.d-fui-trade-slot-0) .d-fui-trade-price-extra{display:none}
.d-fui-trade-panel-state{color:#9b9ba3;font-size:10px;letter-spacing:.04em}.d-fui-trade-price-chip{min-width:57px;height:20px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;gap:4px;padding:0 5px;border:1px solid #232327;border-radius:999px;color:#ececef;font-size:12px;line-height:1;letter-spacing:0;font-variant-numeric:tabular-nums}.d-fui-trade-price-chip b{color:#5c5c66;font-size:8px}.d-fui-trade-price-chip.d-fui-trade-is-up{color:#4ade80}.d-fui-trade-price-chip.d-fui-trade-is-down{color:#f87171}.d-fui-trade-price-chip.d-fui-trade-is-up b{color:#4ade80}.d-fui-trade-price-chip.d-fui-trade-is-down b{color:#f87171}
.d-fui-trade-body{position:absolute;left:0;right:0;top:27px;bottom:0;min-height:0;box-sizing:border-box;opacity:1}.d-fui-trade-panel.d-fui-trade-is-collapsed .d-fui-trade-body{opacity:0;pointer-events:none}
.d-fui-trade-chart{position:absolute;left:7px;right:7px;top:7px;bottom:25px;overflow:hidden;border:1px solid #232327;background:#0a0a0b}.d-fui-trade-canvas{display:block;width:100%;height:100%}.d-fui-trade-chart-high,.d-fui-trade-chart-low{position:absolute;right:4px;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.04em;pointer-events:none}.d-fui-trade-chart-high{top:4px}.d-fui-trade-chart-low{bottom:4px}.d-fui-trade-price-meta{position:absolute;left:8px;right:8px;bottom:6px;display:flex;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-fui-trade-book-body,.d-fui-trade-tape-body{padding:5px 6px 4px}.d-fui-trade-book-head,.d-fui-trade-book-row{display:grid;grid-template-columns:minmax(0,1fr) 43px minmax(0,1fr);align-items:center}.d-fui-trade-book-head{height:11px;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;text-align:center}.d-fui-trade-book-head span:first-child{text-align:right}.d-fui-trade-book-head span:last-child{text-align:left}.d-fui-trade-book-levels{display:grid;grid-template-rows:repeat(6,minmax(0,1fr));height:calc(100% - 11px);min-height:0}.d-fui-trade-book-row{min-height:0;border-top:1px solid rgba(35,35,39,.5);font-variant-numeric:tabular-nums}.d-fui-trade-book-side{position:relative;height:9px;overflow:hidden}.d-fui-trade-book-side i{position:absolute;top:0;bottom:0;width:50%;transition:width 300ms cubic-bezier(.65,0,.35,1)}.d-fui-trade-bid i{right:0;background:rgba(74,222,128,.25);transform-origin:right center}.d-fui-trade-ask i{left:0;background:rgba(248,113,113,.25);transform-origin:left center}.d-fui-trade-book-price{text-align:center;color:#ececef;font-size:12px;line-height:1;letter-spacing:-.06em}
.d-fui-trade-tape-head,.d-fui-trade-tape-row{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center}.d-fui-trade-tape-head{height:13px;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-trade-tape-head span:last-child{text-align:right}.d-fui-trade-tape-rows{height:calc(100% - 13px);display:grid;grid-template-rows:repeat(4,minmax(0,1fr));min-height:0;overflow:hidden}.d-fui-trade-tape-row{min-height:0;border-top:1px solid rgba(35,35,39,.58);font-variant-numeric:tabular-nums}.d-fui-trade-tape-row span:first-child{color:#ececef;font-size:12px;line-height:1}.d-fui-trade-tape-row span:last-child{color:#9b9ba3;font-size:10px;line-height:1}.d-fui-trade-tape-row[data-side="up"] span:last-child{color:#4ade80}.d-fui-trade-tape-row[data-side="down"] span:last-child{color:#f87171}
.d-fui-trade-corner{position:absolute;z-index:8;width:8px;height:8px;pointer-events:none}.d-fui-trade-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-trade-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-trade-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-trade-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-trade-panel:hover .d-fui-trade-corner,.d-fui-trade-panel:focus-within .d-fui-trade-corner,.d-fui-trade-panel.d-fui-trade-is-drop .d-fui-trade-corner,.d-fui-trade-panel.d-fui-trade-is-dragging .d-fui-trade-corner{border-color:#a78bfa}
.d-fui-trade-footer{border-top:1px solid #232327}.d-fui-trade-direction{color:#4ade80}.d-fui-trade-scanline{position:absolute;z-index:19;left:9px;right:9px;top:32px;height:1px;background:#a78bfa;opacity:.08;pointer-events:none;animation:d-fui-trade-scan 5.4s linear infinite}.d-fui-trade-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@keyframes d-fui-trade-live-pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-trade-scan{from{transform:translateY(0)}to{transform:translateY(260px)}}
@container(max-width:340px){.d-fui-trade-workspace{grid-template-columns:minmax(0,1.28fr) minmax(0,.92fr);gap:5px}.d-fui-trade-handle{padding-left:7px;padding-right:7px}.d-fui-trade-price-chip{min-width:54px;padding-left:4px;padding-right:4px}.d-fui-trade-price-meta span:first-child{font-size:0}.d-fui-trade-price-meta span:first-child:after{content:'60 PT';font-size:10px}.d-fui-trade-book-head,.d-fui-trade-book-row{grid-template-columns:minmax(0,1fr) 39px minmax(0,1fr)}.d-fui-trade-footer span:last-child{display:none}}
@media(prefers-reduced-motion:reduce){.d-fui-trade *{animation:none!important;transition:none!important}.d-fui-trade-live-dot{opacity:1}.d-fui-trade-scanline{top:160px}.d-fui-trade-shell{transform:none!important}}
`,
  js:`const workspace=root.querySelector('.d-fui-trade-workspace');
const panels=[...root.querySelectorAll('.d-fui-trade-panel')];
const panelById=new Map(panels.map(function(panel){return [panel.dataset.panel,panel]}));
const handles=new Map(panels.map(function(panel){return [panel.dataset.panel,panel.querySelector('.d-fui-trade-handle')]}));
const status=root.querySelector('.d-fui-trade-status');
const directionLabel=root.querySelector('.d-fui-trade-direction');
const canvas=root.querySelector('.d-fui-trade-canvas');
const context=canvas.getContext('2d');
const priceChip=root.querySelector('.d-fui-trade-price-chip');
const priceValue=root.querySelector('.d-fui-trade-price-value');
const bookNode=root.querySelector('.d-fui-trade-book-levels');
const tapeNode=root.querySelector('.d-fui-trade-tape-rows');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const tickInterval=800;
const chartDuration=300;
const flashDuration=250;
const bookDuration=300;
const tapeDuration=200;
const tapeOffset=8;
const flipDuration=260;
const flipEasing='cubic-bezier(0.65, 0, 0.35, 1)';
const collapseDuration=200;
const pointCount=60;
const bookLevelCount=6;
const tapeLimit=4;
const slots={price:0,book:1,tape:2};
const collapsed=new Set();
const priceRandom=mulberry32(0x18A42C);
const bookRandom=mulberry32(0xB00C51);
const tapeRandom=mulberry32(0x7A9E31);
let price=127.42;
let points=[];
let pendingPrice=null;
let shifting=false;
let shiftStart=0;
let shiftProgress=0;
let flashStart=-1;
let flashActive=false;
let priceDirection='flat';
let flashAnimation=null;
let book=[];
let tape=[];
let tapeSerial=0;
let tapeEntering=false;
let tapeEntryStart=-1;
let tapeAnimation=null;
let simulationTime=0;
let nextTickAt=tickInterval;
let lastTickAt=0;
let previousTickAt=0;
let ticks=0;
let frames=0;
let visible=true;
let documentVisible=document.visibilityState!=='hidden';
let running=false;
let lastFrame=0;
let frameId=0;
let observer=null;
let resizeObserver=null;
let connectionObserver=null;
let layoutMotion=[];
const collapseMotion=new Map();
let pausedMarketMotion=[];
let reorders=0;
let layoutAnimations=0;
let collapses=0;
let collapseAnimations=0;
let collapseAnimating=false;
let drag=null;
let dragTarget='';
let dragMoves=0;
let source='initial';
let actionSource='initial';
let suppressDoubleUntil=0;
function mulberry32(value){return function(){value|=0;value=value+0x6D2B79F5|0;let result=Math.imul(value^value>>>15,1|value);result=result+Math.imul(result^result>>>7,61|result)^result;return ((result^result>>>14)>>>0)/4294967296}}
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function checksum(values){let hash=2166136261;values.forEach(function(value){const text=Number(value).toFixed(3);for(let index=0;index<text.length;index++){hash^=text.charCodeAt(index);hash=Math.imul(hash,16777619)}});return (hash>>>0).toString(16).toUpperCase().padStart(8,'0')}
for(let index=0;index<pointCount;index++){price=clamp(price+(priceRandom()-.48)*.72,120.6,133.4);points.push(price)}
price=points[points.length-1];
const initialPriceChecksum=checksum(points);
function makeBook(){
  book=[];
  for(let index=0;index<bookLevelCount;index++)book.push({bid:30+bookRandom()*62,ask:30+bookRandom()*62});
  bookNode.textContent='';
  book.forEach(function(level,index){
    const row=document.createElement('div');
    row.className='d-fui-trade-book-row';
    row.innerHTML='<span class="d-fui-trade-book-side d-fui-trade-bid" aria-label="Bid depth '+Math.round(level.bid)+' percent"><i></i></span><span class="d-fui-trade-book-price">'+(price-(index-2.5)*.08).toFixed(2)+'</span><span class="d-fui-trade-book-side d-fui-trade-ask" aria-label="Ask depth '+Math.round(level.ask)+' percent"><i></i></span>';
    row.querySelector('.d-fui-trade-bid i').style.width=level.bid.toFixed(1)+'%';
    row.querySelector('.d-fui-trade-ask i').style.width=level.ask.toFixed(1)+'%';
    bookNode.appendChild(row);
  });
}
function makeTrade(initial){
  const delta=(tapeRandom()-.5)*.42;
  const side=delta>=0?'up':'down';
  const trade={id:++tapeSerial,price:clamp(price+delta,120.2,133.8),size:10+Math.floor(tapeRandom()*890),side:side};
  const row=document.createElement('div');
  row.className='d-fui-trade-tape-row';
  row.dataset.id=String(trade.id);
  row.dataset.side=trade.side;
  row.innerHTML='<span>'+trade.price.toFixed(2)+'</span><span>'+(trade.side==='up'?'+':'−')+String(trade.size)+'</span>';
  tape.push(trade);
  if(tape.length>tapeLimit){tape.shift();if(tapeNode.firstElementChild)tapeNode.firstElementChild.remove()}
  tapeNode.appendChild(row);
  if(!initial&&!reduced){
    if(tapeAnimation)tapeAnimation.cancel();
    tapeAnimation=row.animate([{opacity:0,transform:'translateY('+tapeOffset+'px)'},{opacity:1,transform:'translateY(0)'}],{duration:tapeDuration,easing:'cubic-bezier(.22,1,.36,1)'});
    tapeEntering=true;
    tapeEntryStart=simulationTime;
  }
  return row;
}
function bookValues(){return book.map(function(level){return level.bid.toFixed(1)+'/'+level.ask.toFixed(1)}).join(',')}
function tapeSignature(){return tape.map(function(trade){return trade.id+':'+trade.price.toFixed(2)+':'+trade.size+':'+trade.side}).join('|')}
makeBook();
for(let index=0;index<tapeLimit;index++)makeTrade(true);
const initialBookSignature=bookValues();
const initialTapeSignature=tapeSignature();
function order(){return Object.keys(slots).sort(function(a,b){return slots[a]-slots[b]})}
function updateHandleLabel(id){
  const handle=handles.get(id);
  const action=collapsed.has(id)?'expand':'collapse';
  handle.setAttribute('aria-label',id.toUpperCase()+' panel, slot '+(slots[id]+1)+' of 3. Drag or use arrow keys to swap. Press Enter to '+action+'.');
}
function applySlots(){
  const ordered=order();
  ordered.forEach(function(id,index){
    const panel=panelById.get(id);
    panel.classList.remove('d-fui-trade-slot-0','d-fui-trade-slot-1','d-fui-trade-slot-2');
    panel.classList.add('d-fui-trade-slot-'+index);
    panel.dataset.slot=String(index);
    const handle=handles.get(id);
    panel.setAttribute('aria-posinset',String(index+1));
    panel.setAttribute('aria-setsize','3');
    updateHandleLabel(id);
    workspace.appendChild(panel);
  });
}
function expose(nextSource){
  if(nextSource)source=nextSource;
  root.dataset.pointCount=String(points.length);
  root.dataset.tickInterval=String(tickInterval);
  root.dataset.chartDuration=String(chartDuration);
  root.dataset.chartStroke='1.5';
  root.dataset.chartArea='accent-transparent';
  root.dataset.flashDuration=String(flashDuration);
  root.dataset.bookDuration=String(bookDuration);
  root.dataset.tapeDuration=String(tapeDuration);
  root.dataset.tapeOffset=String(tapeOffset);
  root.dataset.flipDuration=String(flipDuration);
  root.dataset.flipEasing=flipEasing;
  root.dataset.collapseDuration=String(collapseDuration);
  root.dataset.priceChecksum=checksum(points);
  root.dataset.initialPriceChecksum=initialPriceChecksum;
  root.dataset.initialBookSignature=initialBookSignature;
  root.dataset.initialTapeSignature=initialTapeSignature;
  root.dataset.price=price.toFixed(2);
  root.dataset.priceDirection=priceDirection;
  root.dataset.shifting=String(shifting);
  root.dataset.shiftProgress=shiftProgress.toFixed(3);
  root.dataset.flashActive=String(flashActive);
  root.dataset.bookValues=bookValues();
  root.dataset.bookTargets=bookValues();
  root.dataset.bookLevels=String(book.length);
  root.dataset.bookAlpha='0.25';
  root.dataset.tapeSequence=tapeSignature();
  root.dataset.tapeRows=String(tape.length);
  root.dataset.tapeLimit=String(tapeLimit);
  root.dataset.tapeEntering=String(tapeEntering);
  root.dataset.ticks=String(ticks);
  root.dataset.frames=String(frames);
  root.dataset.simulationTime=simulationTime.toFixed(1);
  root.dataset.lastTickAt=lastTickAt.toFixed(1);
  root.dataset.tickGap=(lastTickAt&&previousTickAt?lastTickAt-previousTickAt:0).toFixed(1);
  root.dataset.running=String(running);
  root.dataset.marketPaused=String(pausedMarketMotion.length>0);
  root.dataset.reduced=String(reduced);
  root.dataset.order=order().join(',');
  root.dataset.collapsed=order().filter(function(id){return collapsed.has(id)}).join(',');
  root.dataset.reorders=String(reorders);
  root.dataset.layoutAnimations=String(layoutAnimations);
  root.dataset.collapses=String(collapses);
  root.dataset.collapseAnimations=String(collapseAnimations);
  root.dataset.collapseAnimating=String(collapseAnimating);
  root.dataset.dragging=String(Boolean(drag&&drag.dragging));
  root.dataset.dragTarget=dragTarget;
  root.dataset.dragMoves=String(dragMoves);
  root.dataset.source=source;
  root.dataset.actionSource=actionSource;
}
function resizeCanvas(){
  const rect=canvas.getBoundingClientRect();
  if(rect.width<1||rect.height<1)return;
  const ratio=Math.min(2,window.devicePixelRatio||1);
  const width=Math.max(1,Math.round(rect.width*ratio));
  const height=Math.max(1,Math.round(rect.height*ratio));
  if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}
  drawChart();
}
function drawChart(){
  const rect=canvas.getBoundingClientRect();
  if(rect.width<1||rect.height<1)return;
  const ratio=canvas.width/rect.width;
  const width=rect.width;
  const height=rect.height;
  context.setTransform(ratio,0,0,ratio,0,0);
  context.clearRect(0,0,width,height);
  context.strokeStyle='#232327';
  context.lineWidth=1;
  for(let row=1;row<4;row++){const y=Math.round(height*row/4)+.5;context.beginPath();context.moveTo(0,y);context.lineTo(width,y);context.stroke()}
  const series=shifting&&pendingPrice!==null?points.concat([pendingPrice]):points;
  const step=width/(pointCount-1);
  const xOffset=shifting?shiftProgress:0;
  function xAt(index){return (index-xOffset)*step}
  function yAt(value){return 5+(134-value)/14*(height-10)}
  const gradient=context.createLinearGradient(0,0,0,height);
  gradient.addColorStop(0,'rgba(167,139,250,.28)');
  gradient.addColorStop(1,'rgba(167,139,250,0)');
  context.beginPath();
  series.forEach(function(value,index){const x=xAt(index),y=yAt(value);if(index===0)context.moveTo(x,y);else context.lineTo(x,y)});
  context.lineTo(xAt(series.length-1),height);
  context.lineTo(xAt(0),height);
  context.closePath();
  context.fillStyle=gradient;
  context.fill();
  context.beginPath();
  series.forEach(function(value,index){const x=xAt(index),y=yAt(value);if(index===0)context.moveTo(x,y);else context.lineTo(x,y)});
  context.strokeStyle='#a78bfa';
  context.lineWidth=1.5;
  context.lineJoin='round';
  context.lineCap='round';
  context.stroke();
}
function flashPrice(direction){
  if(flashAnimation)flashAnimation.cancel();
  priceChip.classList.remove('d-fui-trade-is-up','d-fui-trade-is-down');
  priceChip.classList.add(direction==='up'?'d-fui-trade-is-up':'d-fui-trade-is-down');
  priceChip.querySelector('b').textContent=direction==='up'?'▲':'▼';
  const color=direction==='up'?'rgba(74,222,128,.32)':'rgba(248,113,113,.32)';
  flashAnimation=priceChip.animate([{backgroundColor:color},{backgroundColor:color,offset:.66},{backgroundColor:'rgba(16,16,18,0)'}],{duration:flashDuration,easing:'linear'});
  flashActive=true;
  flashStart=simulationTime;
}
function updateBook(){
  book.forEach(function(level,index){
    level.bid=clamp(level.bid+(bookRandom()-.5)*34,18,96);
    level.ask=clamp(level.ask+(bookRandom()-.5)*34,18,96);
    const row=bookNode.children[index];
    row.querySelector('.d-fui-trade-bid').setAttribute('aria-label','Bid depth '+Math.round(level.bid)+' percent');
    row.querySelector('.d-fui-trade-ask').setAttribute('aria-label','Ask depth '+Math.round(level.ask)+' percent');
    row.querySelector('.d-fui-trade-bid i').style.width=level.bid.toFixed(1)+'%';
    row.querySelector('.d-fui-trade-ask i').style.width=level.ask.toFixed(1)+'%';
    row.querySelector('.d-fui-trade-book-price').textContent=(price-(index-2.5)*.08).toFixed(2);
  });
}
function marketTick(){
  ticks++;
  previousTickAt=lastTickAt;
  lastTickAt=simulationTime;
  const next=clamp(price+(priceRandom()-.47)*1.08,120.6,133.4);
  priceDirection=next>=price?'up':'down';
  pendingPrice=next;
  shifting=true;
  shiftStart=simulationTime;
  shiftProgress=0;
  price=next;
  priceValue.textContent=price.toFixed(2);
  canvas.setAttribute('aria-label','Sixty point fictional INTRX price chart. Last price '+price.toFixed(2)+', '+priceDirection+'.');
  directionLabel.textContent=priceDirection==='up'?'TICK UP':'TICK DOWN';
  flashPrice(priceDirection);
  updateBook();
  makeTrade(false);
  expose('tick');
}
function updateChoreography(){
  if(shifting){
    shiftProgress=clamp((simulationTime-shiftStart)/chartDuration,0,1);
    if(shiftProgress>=1){
      points=points.slice(1);
      points.push(pendingPrice);
      pendingPrice=null;
      shifting=false;
      shiftProgress=0;
    }
  }
  if(flashActive&&simulationTime-flashStart>=flashDuration){
    flashActive=false;
    priceChip.classList.remove('d-fui-trade-is-up','d-fui-trade-is-down');
  }
  if(tapeEntering&&simulationTime-tapeEntryStart>=tapeDuration)tapeEntering=false;
}
function cancelLayoutAnimations(){layoutMotion.forEach(function(animation){animation.cancel()});layoutMotion=[]}
function cancelCollapseAnimations(id){
  const motion=collapseMotion.get(id);
  if(!motion)return;
  collapseMotion.delete(id);
  motion.forEach(function(animation){animation.cancel()});
  collapseAnimating=collapseMotion.size>0;
}
function settleCollapse(id,motion){
  if(collapseMotion.get(id)!==motion)return;
  collapseMotion.delete(id);
  collapseAnimating=collapseMotion.size>0;
  if(root.isConnected){expose('collapse settled');resizeCanvas()}
}
function swapPanels(firstId,secondId,nextSource){
  if(firstId===secondId||!panelById.has(firstId)||!panelById.has(secondId))return;
  cancelLayoutAnimations();
  const firstRects=new Map(panels.map(function(panel){return [panel,panel.getBoundingClientRect()]}));
  const firstSlot=slots[firstId];
  slots[firstId]=slots[secondId];
  slots[secondId]=firstSlot;
  applySlots();
  void workspace.offsetWidth;
  panels.forEach(function(panel){
    const before=firstRects.get(panel);
    const after=panel.getBoundingClientRect();
    const dx=before.left-after.left;
    const dy=before.top-after.top;
    const sx=after.width?before.width/after.width:1;
    const sy=after.height?before.height/after.height:1;
    if(!reduced&&(Math.abs(dx)>.5||Math.abs(dy)>.5||Math.abs(sx-1)>.01||Math.abs(sy-1)>.01)){
      const animation=panel.animate([{transformOrigin:'0 0',transform:'translate('+dx.toFixed(2)+'px,'+dy.toFixed(2)+'px) scale('+sx.toFixed(4)+','+sy.toFixed(4)+')'},{transformOrigin:'0 0',transform:'translate(0,0) scale(1,1)'}],{duration:flipDuration,easing:flipEasing});
      layoutMotion.push(animation);
      layoutAnimations++;
    }
  });
  reorders++;
  actionSource=nextSource;
  handles.get(firstId).focus({preventScroll:true});
  status.textContent=firstId.toUpperCase()+' moved to slot '+(slots[firstId]+1)+'; '+secondId.toUpperCase()+' moved to slot '+(slots[secondId]+1)+'.';
  expose(nextSource);
}
function toggleCollapse(id,nextSource){
  const panel=panelById.get(id);
  const body=panel.querySelector('.d-fui-trade-body');
  const before=parseFloat(getComputedStyle(panel).height);
  cancelCollapseAnimations(id);
  const willCollapse=!collapsed.has(id);
  if(willCollapse)collapsed.add(id);else collapsed.delete(id);
  panel.classList.toggle('d-fui-trade-is-collapsed',willCollapse);
  handles.get(id).setAttribute('aria-expanded',String(!willCollapse));
  updateHandleLabel(id);
  body.setAttribute('aria-hidden',String(willCollapse));
  void panel.offsetWidth;
  const after=parseFloat(getComputedStyle(panel).height);
  if(!reduced){
    const panelAnimation=panel.animate([{height:before+'px'},{height:after+'px'}],{duration:collapseDuration,easing:'cubic-bezier(.22,1,.36,1)'});
    const bodyAnimation=body.animate([{opacity:willCollapse?1:0},{opacity:willCollapse?0:1}],{duration:collapseDuration,easing:'cubic-bezier(.22,1,.36,1)'});
    const motion=[panelAnimation,bodyAnimation];
    collapseMotion.set(id,motion);
    collapseAnimating=true;
    collapseAnimations++;
    panelAnimation.finished.then(function(){settleCollapse(id,motion)}).catch(function(){settleCollapse(id,motion)});
  }else{collapseAnimating=false;resizeCanvas()}
  collapses++;
  actionSource=nextSource;
  status.textContent=id.toUpperCase()+(willCollapse?' collapsed to its header.':' expanded.');
  expose(nextSource);
}
function clearDrag(cancelled){
  if(!drag)return;
  const panel=panelById.get(drag.id);
  const shell=panel.querySelector('.d-fui-trade-shell');
  shell.style.transform='';
  panel.classList.remove('d-fui-trade-is-dragging');
  panels.forEach(function(item){item.classList.remove('d-fui-trade-is-drop')});
  dragTarget='';
  if(cancelled)actionSource='drag cancel';
  drag=null;
  expose(cancelled?'drag cancel':'drag clear');
}
panels.forEach(function(panel){
  const id=panel.dataset.panel;
  const handle=handles.get(id);
  handle.addEventListener('pointerdown',function(event){
    if(event.button!==0||drag)return;
    drag={id:id,pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,dragging:false};
    dragTarget=id;
    try{handle.setPointerCapture(event.pointerId)}catch(error){}
    expose('press');
  });
  handle.addEventListener('pointermove',function(event){
    if(!drag||drag.pointerId!==event.pointerId)return;
    const dx=event.clientX-drag.startX;
    const dy=event.clientY-drag.startY;
    if(!drag.dragging&&Math.hypot(dx,dy)<6)return;
    drag.dragging=true;
    dragMoves++;
    panel.classList.add('d-fui-trade-is-dragging');
    panel.querySelector('.d-fui-trade-shell').style.transform='translate3d('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px,0) scale(.985)';
    let closest=id;
    let distance=Infinity;
    panels.forEach(function(candidate){
      const rect=candidate.getBoundingClientRect();
      const score=Math.hypot(event.clientX-(rect.left+rect.width/2),event.clientY-(rect.top+rect.height/2));
      if(score<distance){distance=score;closest=candidate.dataset.panel}
    });
    dragTarget=closest;
    panels.forEach(function(candidate){candidate.classList.toggle('d-fui-trade-is-drop',candidate.dataset.panel===closest&&closest!==id)});
    expose('drag');
  });
  handle.addEventListener('pointerup',function(event){
    if(!drag||drag.pointerId!==event.pointerId)return;
    const draggedId=drag.id;
    const targetId=dragTarget;
    const didDrag=drag.dragging;
    clearDrag(false);
    if(didDrag){
      suppressDoubleUntil=performance.now()+350;
      if(targetId&&targetId!==draggedId)swapPanels(draggedId,targetId,'pointer');
      else expose('pointer no swap');
    }
  });
  handle.addEventListener('pointercancel',function(event){if(drag&&drag.pointerId===event.pointerId)clearDrag(true)});
  handle.addEventListener('dblclick',function(event){event.preventDefault();if(performance.now()>=suppressDoubleUntil)toggleCollapse(id,'double-click')});
  handle.addEventListener('keydown',function(event){
    if(event.key==='Escape'&&drag){event.preventDefault();clearDrag(true);return}
    if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleCollapse(id,'keyboard collapse');return}
    const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];
    if(!keys.includes(event.key))return;
    event.preventDefault();
    const current=slots[id];
    let target=current;
    if(event.key==='Home')target=0;
    else if(event.key==='End')target=2;
    else if(event.key==='ArrowLeft'||event.key==='ArrowUp')target=Math.max(0,current-1);
    else target=Math.min(2,current+1);
    const other=order()[target];
    if(other&&other!==id)swapPanels(id,other,'keyboard reorder');
  });
});
function canRun(){return !reduced&&visible&&documentVisible&&root.isConnected}
function marketAnimations(){
  const animations=[];
  [priceChip,...tradeAnimationNodes()].forEach(function(node){node.getAnimations().forEach(function(animation){if(!animations.includes(animation))animations.push(animation)})});
  return animations;
}
function tradeAnimationNodes(){return [...bookNode.querySelectorAll('.d-fui-trade-book-side i'),...tapeNode.querySelectorAll('.d-fui-trade-tape-row')]}
function pauseMarketMotion(){
  pausedMarketMotion=pausedMarketMotion.filter(function(animation){return animation.playState==='paused'});
  marketAnimations().forEach(function(animation){
    if(animation.playState==='running')animation.pause();
    if(animation.playState==='paused'&&!pausedMarketMotion.includes(animation))pausedMarketMotion.push(animation);
  });
}
function resumeMarketMotion(){
  pausedMarketMotion.forEach(function(animation){if(animation.playState==='paused'){try{animation.play()}catch(error){}}});
  pausedMarketMotion=[];
}
function stop(){
  pauseMarketMotion();
  if(frameId)cancelAnimationFrame(frameId);
  frameId=0;
  running=false;
  expose('pause');
}
function start(){
  if(!canRun()||running)return;
  resumeMarketMotion();
  running=true;
  lastFrame=performance.now();
  expose('start');
  frameId=requestAnimationFrame(frame);
}
function cleanup(){
  stop();
  if(observer)observer.disconnect();
  if(resizeObserver)resizeObserver.disconnect();
  if(connectionObserver)connectionObserver.disconnect();
  cancelLayoutAnimations();
  [...collapseMotion.keys()].forEach(cancelCollapseAnimations);
  pausedMarketMotion.forEach(function(animation){animation.cancel()});
  pausedMarketMotion=[];
  document.removeEventListener('visibilitychange',onVisibility);
}
function frame(now){
  frameId=0;
  if(!root.isConnected){cleanup();return}
  if(!canRun()){running=false;expose('pause');return}
  const delta=Math.min(50,Math.max(0,now-lastFrame));
  lastFrame=now;
  simulationTime+=delta;
  if(simulationTime>=nextTickAt){marketTick();nextTickAt+=tickInterval}
  updateChoreography();
  drawChart();
  frames++;
  expose('frame');
  frameId=requestAnimationFrame(frame);
}
function onVisibility(){
  documentVisible=document.visibilityState!=='hidden';
  if(documentVisible)start();else stop();
}
document.addEventListener('visibilitychange',onVisibility);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(function(){resizeCanvas()});resizeObserver.observe(canvas)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
applySlots();
priceValue.textContent=price.toFixed(2);
resizeCanvas();
expose(reduced?'reduced':'initial');
if(!reduced)start()`,
  prompt:`Build a self-contained 320px-tall fictional widget-grid trading terminal using JetBrains Mono and only #0a0a0b, #101012, #161619, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, accent #a78bfa, success #4ade80, warning #fbbf24, information #67e8f9, and error #f87171. Use three hard-tech panels named PRICE, BOOK, and TAPE with 4px radii, 1px frames, four exact 8px by 8px corner ticks made from 2px #2e2e34 borders that brighten to #a78bfa on hover, focus, drag, or drop-target activity. Add restrained scanlines and one persistent accent activity dot. Keep labels 10px uppercase with .08em tracking and visible market values 12px with tabular numerals.

PRICE is a canvas line chart with exactly 60 deterministic seeded random-walk points in a fixed vertical domain. Draw its line at exactly 1.5px in #a78bfa and fill the area beneath it with a vertical #a78bfa-to-transparent gradient. Every exact 800ms of visible active time, append one point just beyond the right edge and shift the 61-point drawing left by one point spacing over exactly 300ms, then remove the first point so the authoritative array remains exactly 60. Update a last-price chip immediately and flash a #4ade80 or #f87171 background for exactly 250ms according to up or down direction.

BOOK contains exactly six mirrored order-book levels. Each bid bar grows leftward from the center using rgba(74,222,128,.25); each ask grows rightward using rgba(248,113,113,.25). Update every level from an independent seeded generator on each 800ms market tick and animate every width to its new target over exactly 300ms using cubic-bezier(.65,0,.35,1). TAPE keeps exactly four recent deterministic rows. Each market tick removes the oldest row, appends the newest at the bottom, and animates it from translateY(8px) and opacity 0 to identity over exactly 200ms. Never put automatic price or tape updates in a live region.

Make each native panel-header button a pointer-captured drag handle with a 6px movement threshold. During drag, move only an inner shell and mark the nearest measured panel. On release, swap the dragged panel's actual grid slot with the target. Capture all First rectangles, mutate slot classes and semantic DOM order, measure Last rectangles, and animate moved outer panels from the inverse translation and scale to identity for exactly 260ms with cubic-bezier(.65,0,.35,1). Cancel stale layout animations before a new swap and preserve focus on the same header. Arrow keys swap with adjacent slots; Home and End swap to boundary slots; Escape cancels an active drag. Announce only deliberate swaps and collapse actions in one polite live region.

Double-click a header to collapse that panel to its exact 27px header height with a measured 200ms height tween and double-click again to expand it. Enter and Space provide the same collapse action. Synchronize aria-expanded, aria-controls, aria-hidden, slot position metadata, focus, and the polite announcement. Continue market state updates behind a collapsed panel.

Drive PRICE, BOOK, and TAPE from one visibility-aware active-time requestAnimationFrame scheduler with independent fixed seeds, exact 800ms tick boundaries, a 50ms delta cap, no hidden-tab catch-up, resize-aware high-DPI canvas drawing, and root-disconnect cleanup. Expose deterministic signatures plus point, timing, progress, order, collapse, drag, animation, running, and source telemetry. Under prefers-reduced-motion, disable CSS and WAAPI motion, start no frame loop, produce no automatic market ticks, keep a representative chart/book/tape state, and make manual swapping and collapse instantaneous.`
});
