window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-hex-dump',
  title:'FUI Hex Dump',
  cat:'FUI & Terminal',
  rootClass:'d-fui-hex',
  tags:['fui','hex dump','memory','terminal'],
  libs:[],
  desc:'A virtualized memory window derives every byte from its absolute address, so recycling never changes the dump. Pointer and keyboard inspection bind hexadecimal and ASCII twins while a separate active-time channel marks transient four-byte signatures.',
  seen:'Seen in terminal-aesthetic posts and the interface work of itsgalo',
  hint:'hover a byte or use arrow keys',
  html:`<div class="d-fui-hex" role="region" aria-label="Interactive hexadecimal memory dump">
  <header class="d-fui-hex-topbar"><span>INTRX / MEMORY BUS</span><span class="d-fui-hex-live"><i class="d-fui-hex-live-dot"></i>BUFFER LIVE</span></header>
  <section class="d-fui-hex-panel" aria-label="Virtual memory monitor">
    <i class="d-fui-hex-corner d-fui-hex-corner-tl"></i><i class="d-fui-hex-corner d-fui-hex-corner-tr"></i><i class="d-fui-hex-corner d-fui-hex-corner-bl"></i><i class="d-fui-hex-corner d-fui-hex-corner-br"></i>
    <div class="d-fui-hex-panel-head"><span>MEMORY / SEGMENT 0x0000</span><span>SEED 0xC0DE</span></div>
    <div class="d-fui-hex-frame">
      <div class="d-fui-hex-column-head" aria-hidden="true"><span>OFFSET</span><span>00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</span><span>ASCII</span></div>
      <div class="d-fui-hex-viewport" tabindex="0" role="grid" aria-label="Memory bytes; use arrow keys to inspect" aria-rowcount="4096" aria-colcount="16">
        <div class="d-fui-hex-rows"></div><i class="d-fui-hex-link" aria-hidden="true"></i>
      </div>
    </div>
    <span class="d-fui-hex-announcement" aria-live="polite" aria-atomic="true"></span>
  </section>
  <footer class="d-fui-hex-footer"><span>64KB RANGE</span><span>16 BYTES / ROW</span><span>14PX/S</span><span class="d-fui-hex-state">SCANNING</span></footer>
  <i class="d-fui-hex-scanline" aria-hidden="true"></i>
</div>`,
  css:`
.d-fui-hex{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px clamp(8px,3%,12px);background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-hex:before{content:'';position:absolute;inset:0;z-index:12;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.018) 2px 3px),radial-gradient(circle at center,transparent 52%,rgba(0,0,0,.34) 100%)}
.d-fui-hex-topbar,.d-fui-hex-footer{position:relative;z-index:13;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-hex-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-fui-hex-live-dot{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.35);animation:d-fui-hex-live-pulse 1.6s ease-in-out infinite}
.d-fui-hex-panel{position:relative;z-index:2;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:4px;background:#101012}.d-fui-hex-panel-head{position:absolute;z-index:7;left:10px;right:10px;top:8px;display:flex;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-fui-hex-frame{position:absolute;left:8px;right:8px;top:25px;bottom:8px;overflow:hidden;border:1px solid #232327;background:#0a0a0b}.d-fui-hex-column-head,.d-fui-hex-row{display:grid;grid-template-columns:42px minmax(0,1fr) 88px;column-gap:6px}.d-fui-hex-column-head{position:absolute;z-index:8;left:0;right:0;top:0;height:19px;box-sizing:border-box;align-items:center;padding:0 4px;border-bottom:1px solid #232327;background:#101012;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}.d-fui-hex-column-head span:nth-child(2){overflow:hidden;color:#9b9ba3;font-size:7px;letter-spacing:0;white-space:nowrap}.d-fui-hex-column-head span:last-child{text-align:center}
.d-fui-hex-viewport{position:absolute;left:0;right:0;top:19px;bottom:0;overflow:hidden;outline:none}.d-fui-hex-viewport:focus-visible{box-shadow:inset 0 0 0 2px rgba(167,139,250,.4)}.d-fui-hex-rows{position:absolute;left:0;right:0;top:0;will-change:transform}.d-fui-hex-row{height:16px;box-sizing:border-box;align-items:center;padding:0 4px;border-bottom:1px solid rgba(35,35,39,.45);font-variant-numeric:tabular-nums}
.d-fui-hex-offset{color:#5c5c66;font:9px/16px 'JetBrains Mono',monospace;letter-spacing:.03em}.d-fui-hex-bytes,.d-fui-hex-ascii{position:relative;display:grid;grid-template-columns:repeat(16,minmax(0,1fr));height:16px;min-width:0}.d-fui-hex-byte,.d-fui-hex-char{display:grid;min-width:0;height:16px;place-items:center;box-sizing:border-box;color:#9b9ba3;font:9px/16px 'JetBrains Mono',monospace;line-height:16px}.d-fui-hex-byte{cursor:crosshair}.d-fui-hex-char{color:#5c5c66;pointer-events:none}
.d-fui-hex-byte.d-fui-hex-near-1{color:#cfcfd4}.d-fui-hex-byte.d-fui-hex-near-2{color:#b8b8be}.d-fui-hex-byte.d-fui-hex-near-3{color:#a8a8af}.d-fui-hex-byte.d-fui-hex-near-4{color:#9e9ea6}.d-fui-hex-byte.d-fui-hex-is-selected,.d-fui-hex-char.d-fui-hex-is-selected{background:#161619;color:#a78bfa}
.d-fui-hex-link{position:absolute;z-index:9;height:1px;background:#a78bfa;opacity:0;pointer-events:none;transform:scaleX(0);transform-origin:left center}.d-fui-hex-link.d-fui-hex-is-active{animation:d-fui-hex-link-run 360ms cubic-bezier(.22,1,.36,1) both}.d-fui-hex-pattern{position:absolute;z-index:4;top:1px;bottom:1px;left:var(--pattern-left,0%);width:25%;box-sizing:border-box;border:1px solid #fbbf24;opacity:0;pointer-events:none}.d-fui-hex-pattern.d-fui-hex-is-match{opacity:var(--pattern-opacity,1)}
.d-fui-hex-announcement{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.d-fui-hex-footer{border-top:1px solid #232327}.d-fui-hex-state{color:#4ade80}.d-fui-hex.d-fui-hex-has-match .d-fui-hex-state{color:#fbbf24}.d-fui-hex-corner{position:absolute;z-index:9;width:8px;height:8px;pointer-events:none}.d-fui-hex-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-hex-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-hex-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-hex-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}
.d-fui-hex-scanline{position:absolute;z-index:11;left:13px;right:13px;top:31px;height:1px;background:#a78bfa;opacity:.06;pointer-events:none;animation:d-fui-hex-stage-line 5.2s linear infinite}@keyframes d-fui-hex-live-pulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes d-fui-hex-link-run{0%{opacity:0;transform:scaleX(0)}18%,58%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(1)}}@keyframes d-fui-hex-stage-line{from{transform:translateY(0)}to{transform:translateY(256px)}}
@container(max-width:520px){.d-fui-hex-column-head,.d-fui-hex-row{grid-template-columns:38px minmax(0,1fr) 84px;column-gap:4px}.d-fui-hex-footer span:nth-child(2){display:none}.d-fui-hex-column-head span:nth-child(2){font-size:6px}}
@container(max-width:340px){.d-fui-hex-column-head,.d-fui-hex-row{grid-template-columns:34px minmax(0,1fr) 80px;column-gap:3px}.d-fui-hex-byte,.d-fui-hex-char{font-size:7.5px}.d-fui-hex-offset{font-size:8px}.d-fui-hex-column-head span:first-child,.d-fui-hex-column-head span:last-child{font-size:8px}.d-fui-hex-column-head span:nth-child(2){font-size:5px}}
@media(prefers-reduced-motion:reduce){.d-fui-hex *{animation:none!important;transition:none!important}.d-fui-hex-live-dot{opacity:1}.d-fui-hex-scanline{top:160px}.d-fui-hex-link.d-fui-hex-is-active{opacity:1;transform:scaleX(1)}}
`,
  js:`const viewport=root.querySelector('.d-fui-hex-viewport');
const rowsNode=root.querySelector('.d-fui-hex-rows');
const link=root.querySelector('.d-fui-hex-link');
const announcement=root.querySelector('.d-fui-hex-announcement');
const stateLabel=root.querySelector('.d-fui-hex-state');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const rowHeight=16;
const bytesPerRow=16;
const totalRows=4096;
const totalBytes=totalRows*bytesPerRow;
const renderedRows=19;
const scrollSpeed=14;
const matchInterval=5000;
const matchLength=4;
const matchDecay=1000;
const seed=0xC0DE42;
let visible=true;
let running=false;
let last=0;
let simulationTime=0;
let distance=0;
let baseRow=0;
let renderedBase=-1;
let frames=0;
let matches=0;
let matchStart=-1;
let nextMatchAt=matchInterval;
let patternRow=-1;
let patternStart=-1;
let patternAddress=-1;
let patternOpacity=0;
let selectedAddress=-1;
let selectedByte='';
let selectedAscii='';
let selectionSource='';
let nearCount=0;
let links=0;
let pointerActive=false;
let pointerX=0;
let pointerY=0;
let focused=false;
let observer=null;
const byteMap=new Map();
const asciiMap=new Map();
const rowMap=new Map();
const matchRandom=mulberry32(0xD00F5EED);
root.dataset.scrollSpeed=String(scrollSpeed);
root.dataset.rowHeight=String(rowHeight);
root.dataset.bytesPerRow=String(bytesPerRow);
root.dataset.totalRows=String(totalRows);
root.dataset.renderedRows=String(renderedRows);
root.dataset.neighborCount='8';
root.dataset.matchInterval=String(matchInterval);
root.dataset.matchLength=String(matchLength);
root.dataset.matchDecay=String(matchDecay);
root.dataset.seed='0xC0DE42';
root.dataset.reduced=String(reduced);
function mulberry32(value){return function(){value|=0;value=value+0x6D2B79F5|0;let result=Math.imul(value^value>>>15,1|value);result=result+Math.imul(result^result>>>7,61|result)^result;return ((result^result>>>14)>>>0)/4294967296}}
function wrap(value,size){return (value%size+size)%size}
function byteAt(address){let value=(wrap(address,totalBytes)^seed)>>>0;value=Math.imul(value^value>>>16,0x45D9F3B)>>>0;value=Math.imul(value^value>>>16,0x45D9F3B)>>>0;return (value^value>>>16)&255}
function hex(value,size){return value.toString(16).toUpperCase().padStart(size,'0')}
function ascii(value){return value>=32&&value<=126?String.fromCharCode(value):'.'}
function signature(start,count){let value='';for(let index=0;index<count;index++)value+=hex(byteAt(start+index),2);return value}
root.dataset.initialSignature=signature(0,32);
root.dataset.stableCheck=String(signature(0,32)===signature(0,32));
function makeRow(rowIndex){
  const row=document.createElement('div');
  row.className='d-fui-hex-row';
  row.setAttribute('role','row');
  row.dataset.row=String(rowIndex);
  const startAddress=rowIndex*bytesPerRow;
  const offset=document.createElement('span');
  offset.className='d-fui-hex-offset';
  offset.setAttribute('aria-hidden','true');
  offset.textContent=hex(startAddress,4);
  const bytes=document.createElement('span');
  bytes.className='d-fui-hex-bytes';
  const gutter=document.createElement('span');
  gutter.className='d-fui-hex-ascii';
  gutter.setAttribute('aria-hidden','true');
  for(let column=0;column<bytesPerRow;column++){
    const address=startAddress+column;
    const value=byteAt(address);
    const cell=document.createElement('span');
    cell.className='d-fui-hex-byte';
    cell.id='d-fui-hex-byte-'+hex(address,4);
    cell.dataset.address=String(address);
    cell.dataset.value=hex(value,2);
    cell.setAttribute('role','gridcell');
    cell.setAttribute('aria-selected','false');
    cell.setAttribute('aria-label','Address '+hex(address,4)+', hexadecimal '+hex(value,2)+', ASCII '+(value>=32&&value<=126?ascii(value):'non-printable'));
    cell.textContent=hex(value,2);
    bytes.appendChild(cell);
    byteMap.set(address,cell);
    const twin=document.createElement('span');
    twin.className='d-fui-hex-char';
    twin.dataset.address=String(address);
    twin.textContent=ascii(value);
    gutter.appendChild(twin);
    asciiMap.set(address,twin);
  }
  const pattern=document.createElement('i');
  pattern.className='d-fui-hex-pattern';
  pattern.setAttribute('aria-hidden','true');
  bytes.appendChild(pattern);
  row.append(offset,bytes,gutter);
  rowMap.set(rowIndex,row);
  return row;
}
function renderRows(){
  byteMap.clear();
  asciiMap.clear();
  rowMap.clear();
  rowsNode.textContent='';
  const fragment=document.createDocumentFragment();
  for(let index=-1;index<renderedRows-1;index++)fragment.appendChild(makeRow(wrap(baseRow+index,totalRows)));
  rowsNode.appendChild(fragment);
  renderedBase=baseRow;
  applyPattern();
  applySelection('recycle',false);
}
function setRowsTransform(){const offset=distance%rowHeight;rowsNode.style.transform='translate3d(0,'+(-rowHeight-offset).toFixed(2)+'px,0)'}
function clearSelection(source){
  byteMap.forEach(function(cell){cell.className='d-fui-hex-byte';cell.removeAttribute('data-influence');cell.setAttribute('aria-selected','false')});
  asciiMap.forEach(function(cell){cell.classList.remove('d-fui-hex-is-selected')});
  selectedAddress=-1;
  selectedByte='';
  selectedAscii='';
  if(source!=='recycle')selectionSource=source;
  nearCount=0;
  viewport.removeAttribute('aria-activedescendant');
  link.classList.remove('d-fui-hex-is-active');
  expose(source);
}
function positionLink(){
  const cell=byteMap.get(selectedAddress),twin=asciiMap.get(selectedAddress);
  if(!cell||!twin)return;
  const viewRect=viewport.getBoundingClientRect(),cellRect=cell.getBoundingClientRect(),twinRect=twin.getBoundingClientRect();
  const left=cellRect.right-viewRect.left;
  const right=twinRect.left-viewRect.left;
  link.style.left=left.toFixed(1)+'px';
  link.style.top=(cellRect.bottom-viewRect.top-2).toFixed(1)+'px';
  link.style.width=Math.max(1,right-left).toFixed(1)+'px';
}
function applySelection(source,animate){
  byteMap.forEach(function(cell){cell.className='d-fui-hex-byte';cell.removeAttribute('data-influence');cell.setAttribute('aria-selected','false')});
  asciiMap.forEach(function(cell){cell.classList.remove('d-fui-hex-is-selected')});
  const cell=byteMap.get(selectedAddress),twin=asciiMap.get(selectedAddress);
  if(!cell||!twin){if(selectedAddress>=0&&source==='recycle')clearSelection('scrolled out');return}
  for(let distanceFrom=1;distanceFrom<=4;distanceFrom++){
    [wrap(selectedAddress-distanceFrom,totalBytes),wrap(selectedAddress+distanceFrom,totalBytes)].forEach(function(address){const neighbor=byteMap.get(address);if(neighbor){neighbor.classList.add('d-fui-hex-near-'+distanceFrom);neighbor.dataset.influence=Math.pow(1-distanceFrom/5,2).toFixed(2)}});
  }
  cell.classList.add('d-fui-hex-is-selected');
  cell.setAttribute('aria-selected','true');
  twin.classList.add('d-fui-hex-is-selected');
  viewport.setAttribute('aria-activedescendant',cell.id);
  selectedByte=cell.dataset.value;
  selectedAscii=twin.textContent;
  if(source!=='recycle')selectionSource=source;
  nearCount=[...byteMap.values()].filter(function(node){return /d-fui-hex-near-/.test(node.className)}).length;
  positionLink();
  if(animate){link.classList.remove('d-fui-hex-is-active');void link.offsetWidth;link.classList.add('d-fui-hex-is-active');links++}
  if(source==='keyboard'||source==='focus')announcement.textContent='Address '+hex(selectedAddress,4)+', byte '+selectedByte+', ASCII '+(parseInt(selectedByte,16)>=32&&parseInt(selectedByte,16)<=126?selectedAscii:'non-printable')+'.';
  expose(source);
}
function inspect(address,source){if(address===selectedAddress&&byteMap.has(address))return;selectedAddress=address;applySelection(source,true)}
function hitTestPointer(){
  if(!pointerActive)return;
  const hit=document.elementFromPoint(pointerX,pointerY);
  const cell=hit&&hit.closest?hit.closest('.d-fui-hex-byte'):null;
  if(cell&&root.contains(cell))inspect(Number(cell.dataset.address),'pointer');
}
function beginPattern(){
  matches++;
  const middleOffset=3+Math.floor(matchRandom()*7);
  patternRow=wrap(baseRow+middleOffset,totalRows);
  patternStart=Math.floor(matchRandom()*13);
  patternAddress=patternRow*bytesPerRow+patternStart;
  patternOpacity=1;
  matchStart=simulationTime;
  applyPattern();
}
function applyPattern(){
  root.classList.toggle('d-fui-hex-has-match',patternOpacity>0);
  stateLabel.textContent=patternOpacity>0?'PATTERN MATCH':'SCANNING';
  rowMap.forEach(function(row){const pattern=row.querySelector('.d-fui-hex-pattern');pattern.classList.remove('d-fui-hex-is-match');pattern.style.removeProperty('--pattern-opacity')});
  if(patternOpacity<=0)return;
  const row=rowMap.get(patternRow);
  if(!row)return;
  const pattern=row.querySelector('.d-fui-hex-pattern');
  pattern.style.setProperty('--pattern-left',(patternStart*6.25).toFixed(2)+'%');
  pattern.style.setProperty('--pattern-opacity',patternOpacity.toFixed(3));
  pattern.classList.add('d-fui-hex-is-match');
}
function updatePattern(){
  if(matchStart>=0){patternOpacity=Math.max(0,1-(simulationTime-matchStart)/matchDecay);if(patternOpacity<=0){matchStart=-1;patternRow=-1;patternStart=-1}applyPattern()}
  if(matchStart<0&&simulationTime>=nextMatchAt){beginPattern();nextMatchAt+=matchInterval}
}
function expose(source){
  root.dataset.distance=distance.toFixed(2);
  root.dataset.offset=(distance%rowHeight).toFixed(2);
  root.dataset.baseRow=String(baseRow);
  root.dataset.firstAddress=hex(baseRow*bytesPerRow,4);
  root.dataset.frames=String(frames);
  root.dataset.matches=String(matches);
  root.dataset.matchActive=String(patternOpacity>0);
  root.dataset.matchOpacity=patternOpacity.toFixed(3);
  root.dataset.patternAddress=patternAddress>=0?hex(patternAddress,4):'';
  root.dataset.patternValues=patternAddress>=0?signature(patternAddress,matchLength):'';
  root.dataset.selectedAddress=selectedAddress>=0?hex(selectedAddress,4):'';
  root.dataset.selectedByte=selectedByte;
  root.dataset.selectedAscii=selectedAscii;
  root.dataset.inspectionSource=selectionSource;
  root.dataset.nearCount=String(nearCount);
  root.dataset.links=String(links);
  root.dataset.pointerActive=String(pointerActive);
  root.dataset.running=String(running);
  root.dataset.simulationTime=simulationTime.toFixed(0);
  root.dataset.source=source;
}
viewport.addEventListener('pointerenter',function(event){pointerActive=true;pointerX=event.clientX;pointerY=event.clientY;hitTestPointer()},{passive:true});
viewport.addEventListener('pointermove',function(event){pointerActive=true;pointerX=event.clientX;pointerY=event.clientY;hitTestPointer()},{passive:true});
viewport.addEventListener('pointerleave',function(){pointerActive=false;if(!focused)clearSelection('pointer leave');else expose('pointer leave')},{passive:true});
viewport.addEventListener('pointerdown',function(){viewport.focus()});
viewport.addEventListener('focus',function(){focused=true;if(selectedAddress<0){const row=wrap(baseRow+Math.floor(renderedRows/2),totalRows);inspect(row*bytesPerRow+8,'focus')}else expose('focus')});
viewport.addEventListener('blur',function(){focused=false;if(!pointerActive)clearSelection('blur')});
viewport.addEventListener('keydown',function(event){
  const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','Escape'];
  if(!keys.includes(event.key))return;
  event.preventDefault();
  if(event.key==='Escape'){viewport.blur();return}
  if(selectedAddress<0){const row=wrap(baseRow+Math.floor(renderedRows/2),totalRows);selectedAddress=row*bytesPerRow+8}
  let next=selectedAddress;
  if(event.key==='ArrowLeft')next=wrap(next-1,totalBytes);
  if(event.key==='ArrowRight')next=wrap(next+1,totalBytes);
  if(event.key==='ArrowUp')next=wrap(next-bytesPerRow,totalBytes);
  if(event.key==='ArrowDown')next=wrap(next+bytesPerRow,totalBytes);
  if(event.key==='Home')next=Math.floor(next/bytesPerRow)*bytesPerRow;
  if(event.key==='End')next=Math.floor(next/bytesPerRow)*bytesPerRow+bytesPerRow-1;
  if(byteMap.has(next)){selectedAddress=next;applySelection('keyboard',true)}
});
function start(){if(reduced||!visible||running||!root.isConnected)return;running=true;last=performance.now();expose('start');requestAnimationFrame(frame)}
function frame(now){
  if(!root.isConnected){running=false;if(observer)observer.disconnect();return}
  if(!visible){running=false;return}
  const delta=Math.min(50,Math.max(0,now-last));
  last=now;
  simulationTime+=delta;
  distance+=scrollSpeed*delta/1000;
  baseRow=Math.floor(distance/rowHeight)%totalRows;
  if(baseRow!==renderedBase)renderRows();
  setRowsTransform();
  if(selectedAddress>=0)positionLink();
  hitTestPointer();
  updatePattern();
  frames++;
  expose('scroll');
  requestAnimationFrame(frame);
}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start()},{threshold:.05});observer.observe(root)}
renderRows();
setRowsTransform();
expose(reduced?'reduced':'initial');
if(!reduced)start()`,
  prompt:`Build a self-contained 320px-tall fictional hexadecimal memory terminal using JetBrains Mono and only #0a0a0b, #101012, #161619, #232327, #2e2e34, #ececef, #9b9ba3, #5c5c66, accent #a78bfa, success #4ade80, warning #fbbf24, information #67e8f9, and error #f87171. Use a 4px-radius hard-tech panel, four exact 8px corner ticks, restrained scanlines, an always-visible accent activity dot, 10px uppercase labels, and one keyboard focus ring.

Build a classic three-zone dump: a dim four-digit hexadecimal offset column, exactly 16 two-digit uppercase hexadecimal byte pairs per row, and exactly 16 ASCII twins in a right gutter. Use exact 16px rows. Derive every byte statelessly from its absolute 16-bit address and a fixed integer seed; never use generation history for byte content. Printable byte values 32 through 126 show their character and all others show a period. Virtualize buffered rows around a 4096-row, 64KB range and move the track continuously upward at exactly 14 pixels per active second. Absolute offsets and bytes must survive every DOM recycle unchanged.

Hover the byte actually beneath the pointer, including while transformed rows move under a stationary pointer. Highlight that hexadecimal cell and its address-matched ASCII twin with #a78bfa text on #161619. Brighten exactly four preceding and four following linear-memory bytes toward #ececef with monotonic distance falloff. Draw one panel-local 1px #a78bfa connector from the selected byte underline toward its ASCII twin and animate it for exactly 360ms. Clear pointer inspection on leave unless keyboard focus owns the grid.

Make the memory viewport the only focusable grid target. Use stable address-derived gridcell IDs, aria-activedescendant, aria-selected, useful cell labels, and one polite live region used only for deliberate keyboard inspection. Focus selects a visible middle byte. ArrowLeft and ArrowRight move one byte, ArrowUp and ArrowDown move 16 bytes, Home and End choose row bounds, and Escape releases inspection without adding hundreds of tab stops.

From the same visibility-aware active-time requestAnimationFrame loop, use a separate mulberry32 stream to choose one visible middle-row run of exactly four contiguous bytes every exact 5000ms. Surround the run with one #fbbf24 box, show PATTERN MATCH, and decay its opacity linearly from 1 to 0 over exactly 1000ms. Use cumulative simulation time, a 50ms frame-delta cap, timestamp reset on visibility resume, one rAF, and clean root-disconnect handling so hidden time never fast-forwards. Expose address, scroll, selection, stability, match, and timing telemetry for verification. Under prefers-reduced-motion, disable all CSS animation, start no frame loop, do not scroll or schedule matches, and retain the same deterministic dump plus instantaneous pointer and keyboard inspection.`
});
