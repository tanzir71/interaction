window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'ascii-fire',
  title:'ASCII Fire',
  cat:'Raster & Glitch',
  rootClass:'d-ascii-fire',
  tags:['ascii','canvas','fire','demoscene'],
  libs:[],
  desc:'A seeded 64 by 28 heat buffer rises through classic three-cell fire propagation, with local cursor wind, four thermal color bands, and a two-second full-fuel surge.',
  seen:'Seen in demoscene classics and terminal-art accounts',
  hint:'move for wind, click for fuel, or use arrows and Space',
  html:`<div class="d-ascii-fire" tabindex="0" aria-label="Interactive ASCII fire. Move across the field or use arrow keys to set wind. Click, press Space, or press Enter for a fuel surge. Home calms the wind." aria-keyshortcuts="ArrowLeft ArrowRight Home Space Enter">
  <header class="d-ascii-fire-topbar"><span>INTRX / THERMAL FIELD</span><span class="d-ascii-fire-live"><i></i>24 FPS CAP</span></header>
  <div class="d-ascii-fire-scene">
    <canvas class="d-ascii-fire-canvas" role="img" aria-label="Seeded ASCII fire heat field"></canvas>
    <div class="d-ascii-fire-wind" aria-hidden="true"><span>WIND</span><b class="d-ascii-fire-wind-value">+0.00</b><i></i></div>
    <div class="d-ascii-fire-grid" aria-hidden="true"><span>GRID</span><b>064x028</b></div>
    <div class="d-ascii-fire-fuel" aria-hidden="true"><span>FUEL</span><i><b></b></i></div>
    <div class="d-ascii-fire-ramp" aria-hidden="true"><span>RAMP</span><b> .:*#%@</b></div>
    <div class="d-ascii-fire-heat" aria-hidden="true"><span>AVG</span><b>000.0</b></div>
  </div>
  <footer class="d-ascii-fire-footer"><span class="d-ascii-fire-mode">BASE FUEL</span><span class="d-ascii-fire-core">000 CORE</span><span>DECAY 1-4</span></footer>
  <span class="d-ascii-fire-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-ascii-fire{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 10px;outline:none;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate;touch-action:pan-y}
.d-ascii-fire:before{content:'';position:absolute;inset:0;z-index:10;pointer-events:none;background:radial-gradient(ellipse at 50% 76%,rgba(251,191,36,.045),transparent 48%),radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,.35) 100%)}
.d-ascii-fire:focus-visible{box-shadow:inset 0 0 0 2px rgba(250,115,25,.72)}
.d-ascii-fire-topbar,.d-ascii-fire-footer{position:relative;z-index:12;display:flex;align-items:center;justify-content:space-between;min-width:0;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;text-transform:uppercase}
.d-ascii-fire-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-ascii-fire-live i{width:5px;height:5px;border-radius:50%;background:#fa7319;box-shadow:0 0 8px rgba(250,115,25,.35)}
.d-ascii-fire-scene{position:relative;z-index:2;min-width:0;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#101012;cursor:crosshair;user-select:none}.d-ascii-fire:focus-visible .d-ascii-fire-scene,.d-ascii-fire-scene:hover{border-color:#2e2e34}
.d-ascii-fire-canvas{display:block;width:100%;height:100%}
.d-ascii-fire-wind,.d-ascii-fire-grid,.d-ascii-fire-fuel,.d-ascii-fire-ramp,.d-ascii-fire-heat{position:absolute;z-index:3;display:flex;align-items:center;gap:7px;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;pointer-events:none}.d-ascii-fire-wind{top:9px;left:9px}.d-ascii-fire-grid{top:9px;right:9px}.d-ascii-fire-fuel{top:29px;left:9px}.d-ascii-fire-ramp{left:9px;bottom:8px}.d-ascii-fire-heat{right:9px;bottom:8px}
.d-ascii-fire-ramp,.d-ascii-fire-heat{padding:2px 3px;border-radius:4px;background:rgba(16,16,18,.84);box-shadow:0 0 0 1px rgba(35,35,39,.6)}
.d-ascii-fire-wind b,.d-ascii-fire-grid b,.d-ascii-fire-ramp b,.d-ascii-fire-heat b{color:#ececef;font:600 12px/1 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}.d-ascii-fire-ramp b{color:#9b9ba3;letter-spacing:.07em}.d-ascii-fire-wind i{width:34px;height:1px;background:#fa7319;transform:scaleX(0);transform-origin:center}.d-ascii-fire-fuel>i{display:block;width:52px;height:3px;overflow:hidden;border-radius:999px;background:#232327}.d-ascii-fire-fuel>i b{display:block;width:0;height:100%;background:#fbbf24}
.d-ascii-fire-footer{border-top:1px solid #232327}.d-ascii-fire-mode{color:#fa7319}.d-ascii-fire-core{color:#9b9ba3}.d-ascii-fire[data-surge="true"] .d-ascii-fire-mode{color:#fbbf24}.d-ascii-fire-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@container(max-width:340px){.d-ascii-fire-wind i{display:none}.d-ascii-fire-footer span:last-child{display:none}}
@media(prefers-reduced-motion:reduce){.d-ascii-fire *{animation:none!important;transition:none!important}}
`,
  js:`const scene=root.querySelector('.d-ascii-fire-scene');
const canvas=root.querySelector('.d-ascii-fire-canvas');
const context=canvas.getContext('2d',{alpha:false});
const windValue=root.querySelector('.d-ascii-fire-wind-value');
const windLine=root.querySelector('.d-ascii-fire-wind i');
const fuelFill=root.querySelector('.d-ascii-fire-fuel i b');
const heatValue=root.querySelector('.d-ascii-fire-heat b');
const modeLabel=root.querySelector('.d-ascii-fire-mode');
const coreLabel=root.querySelector('.d-ascii-fire-core');
const status=root.querySelector('.d-ascii-fire-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const gridColumns=64;
const gridRows=28;
const cellCount=gridColumns*gridRows;
const glyphRamp=' .:*#%@';
const targetFps=24;
const frameInterval=1000/targetFps;
const initialSeed=12648430;
const bottomMin=70;
const bottomMax=100;
const decayMin=1;
const decayMax=4;
const windMax=2;
const windRadius=120;
const surgeDuration=2000;
const warmupSteps=56;
let heat=new Float32Array(cellCount);
let lastSourceHeat=new Float32Array(cellCount);
let lastDecays=new Int8Array((gridRows-1)*gridColumns);
let lastOffsets=new Int8Array((gridRows-1)*gridColumns);
let lastGlyphIndices=new Int8Array(cellCount);
let lastBuckets=new Int8Array(cellCount);
let rngState=initialSeed;
let rngCalls=0;
let width=1;
let height=1;
let dpr=1;
let pointerX=.5;
let pointerInside=false;
let pointerMoves=0;
let windStrength=0;
let windSource='none';
let renderFrames=0;
let manualFrames=0;
let rafFrames=0;
let simulationTime=0;
let accumulator=0;
let lastRenderAt=0;
let renderGap=0;
let surges=0;
let surgeStartedAt=-1;
let surgeUntil=0;
let fuelFrames=0;
let lastFuelMode='base';
let lastBottomMin=0;
let lastBottomMax=0;
let lastBottomAverage=0;
let lastDecayMin=0;
let lastDecayMax=0;
let lastOffsetMin=0;
let lastOffsetMax=0;
let lastAffectedCells=0;
let averageHeat=0;
let minimumHeat=0;
let maximumHeat=0;
let coolCells=0;
let warmCells=0;
let hotCells=0;
let coreCells=0;
let occupiedGlyphs=0;
let glyphsUsed='';
let glyphChecksum='00000000';
let heatChecksum='00000000';
let initialChecksum='';
let initialHeatChecksum='';
let warmedSeedState=0;
let fontSize=0;
let maxGlyphAdvance=0;
let colorBuckets=0;
let visible=!('IntersectionObserver'in window);
let documentVisible=document.visibilityState!=='hidden';
let running=false;
let source='initial';
let frameId=0;
let lastFrame=0;
let observer=null;
let resizeObserver=null;
let connectionObserver=null;
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function randomInt(min,max){rngState=(Math.imul(rngState,1664525)+1013904223)>>>0;rngCalls++;return min+rngState%(max-min+1)}
function checksum(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')}
function stepFire(forceFuel,countFrame){
  const fuelSurge=forceFuel||surgeUntil>simulationTime;
  lastSourceHeat.set(heat);
  let seedTotal=0;
  lastBottomMin=101;
  lastBottomMax=0;
  for(let x=0;x<gridColumns;x++){
    const normalFuel=randomInt(bottomMin,bottomMax);
    const value=fuelSurge?100:normalFuel;
    heat[(gridRows-1)*gridColumns+x]=value;
    lastSourceHeat[(gridRows-1)*gridColumns+x]=value;
    seedTotal+=value;
    lastBottomMin=Math.min(lastBottomMin,value);
    lastBottomMax=Math.max(lastBottomMax,value);
  }
  lastBottomAverage=seedTotal/gridColumns;
  lastDecayMin=5;
  lastDecayMax=0;
  lastOffsetMin=3;
  lastOffsetMax=-3;
  lastAffectedCells=0;
  for(let y=0;y<gridRows-1;y++)for(let x=0;x<gridColumns;x++){
    const pixelX=(x+.5)*width/gridColumns;
    const distance=Math.abs(pixelX-pointerX);
    const influence=pointerInside?Math.max(0,1-distance/windRadius):0;
    const offset=Math.round(windStrength*influence*influence);
    const below=(y+1)*gridColumns;
    const sampleX=x-offset;
    const left=clamp(sampleX-1,0,gridColumns-1);
    const center=clamp(sampleX,0,gridColumns-1);
    const right=clamp(sampleX+1,0,gridColumns-1);
    const decay=randomInt(decayMin,decayMax);
    const index=y*gridColumns+x;
    heat[index]=clamp(Math.floor((lastSourceHeat[below+left]+lastSourceHeat[below+center]+lastSourceHeat[below+right])/3)-decay,0,100);
    lastDecays[index]=decay;
    lastOffsets[index]=offset;
    lastDecayMin=Math.min(lastDecayMin,decay);
    lastDecayMax=Math.max(lastDecayMax,decay);
    lastOffsetMin=Math.min(lastOffsetMin,offset);
    lastOffsetMax=Math.max(lastOffsetMax,offset);
    if(offset!==0)lastAffectedCells++;
  }
  lastFuelMode=forceFuel&&reduced?'reduced pulse':fuelSurge?'surge':'base';
  if(countFrame&&fuelSurge)fuelFrames++;
}
function renderFire(){
  const cellWidth=width/gridColumns;
  const cellHeight=height/gridRows;
  const fontCeiling=Math.min(11,cellHeight*1.04);
  context.fillStyle='#0a0a0b';
  context.fillRect(0,0,width,height);
  context.font='600 '+fontCeiling.toFixed(2)+'px "JetBrains Mono",monospace';
  const ceilingAdvance=Math.max(...[...glyphRamp].map(function(glyph){return context.measureText(glyph).width}));
  fontSize=Math.min(fontCeiling,fontCeiling*cellWidth/Math.max(.01,ceilingAdvance)*.96);
  context.font='600 '+fontSize.toFixed(2)+'px "JetBrains Mono",monospace';
  maxGlyphAdvance=Math.max(...[...glyphRamp].map(function(glyph){return context.measureText(glyph).width}));
  context.textAlign='center';
  context.textBaseline='middle';
  const glyphIndices=new Int16Array(cellCount);
  const buckets=new Map();
  const used=new Set();
  let totalHeat=0;
  averageHeat=0;
  minimumHeat=101;
  maximumHeat=0;
  coolCells=0;
  warmCells=0;
  hotCells=0;
  coreCells=0;
  occupiedGlyphs=0;
  for(let cell=0;cell<cellCount;cell++){
    const value=clamp(heat[cell],0,100);
    const glyphIndex=clamp(Math.round(value/100*(glyphRamp.length-1)),0,glyphRamp.length-1);
    const glyph=glyphRamp[glyphIndex];
    glyphIndices[cell]=glyphIndex;
    lastGlyphIndices[cell]=glyphIndex;
    totalHeat+=value;
    minimumHeat=Math.min(minimumHeat,value);
    maximumHeat=Math.max(maximumHeat,value);
    let color='';
    if(value<30){coolCells++;color='#5c5c66';lastBuckets[cell]=0}
    else if(value<60){warmCells++;color='rgba(248,113,113,.7)';lastBuckets[cell]=1}
    else if(value<=85){hotCells++;color='#fbbf24';lastBuckets[cell]=2}
    else{coreCells++;color='#ffffff';lastBuckets[cell]=3}
    used.add(glyph);
    if(glyph===' ')continue;
    occupiedGlyphs++;
    if(!buckets.has(color))buckets.set(color,[]);
    const x=cell%gridColumns,y=Math.floor(cell/gridColumns);
    buckets.get(color).push([glyph,(x+.5)*cellWidth,(y+.5)*cellHeight]);
  }
  buckets.forEach(function(cells,color){context.fillStyle=color;cells.forEach(function(cell){context.fillText(cell[0],cell[1],cell[2])})});
  colorBuckets=buckets.size;
  averageHeat=totalHeat/cellCount;
  glyphsUsed=[...glyphRamp].filter(function(glyph){return used.has(glyph)}).join('');
  glyphChecksum=checksum(glyphIndices,1);
  heatChecksum=checksum(heat,10);
  heatValue.textContent=averageHeat.toFixed(1).padStart(5,'0');
  coreLabel.textContent=String(coreCells).padStart(3,'0')+' CORE';
  canvas.setAttribute('aria-label','ASCII fire averaging '+averageHeat.toFixed(1)+' heat with '+coreCells+' white core cells');
}
function expose(nextSource){
  if(nextSource)source=nextSource;
  const surgeRemaining=reduced?0:Math.max(0,surgeUntil-simulationTime);
  const surgeActive=surgeRemaining>0;
  root.dataset.gridColumns=String(gridColumns);
  root.dataset.gridRows=String(gridRows);
  root.dataset.cellCount=String(cellCount);
  root.dataset.glyphRamp=glyphRamp;
  root.dataset.targetFps=String(targetFps);
  root.dataset.frameInterval=frameInterval.toFixed(3);
  root.dataset.initialSeed=String(initialSeed);
  root.dataset.bottomRange=bottomMin+','+bottomMax;
  root.dataset.decayRange=decayMin+','+decayMax;
  root.dataset.windMax=String(windMax);
  root.dataset.windRadius=String(windRadius);
  root.dataset.windFalloff='squared';
  root.dataset.surgeDuration=String(surgeDuration);
  root.dataset.warmupSteps=String(warmupSteps);
  root.dataset.colors='#5c5c66,rgba(248 113 113 / 0.7),#fbbf24,#ffffff';
  root.dataset.renderFrames=String(renderFrames);
  root.dataset.manualFrames=String(manualFrames);
  root.dataset.rafFrames=String(rafFrames);
  root.dataset.simulationTime=simulationTime.toFixed(1);
  root.dataset.lastRenderAt=lastRenderAt.toFixed(1);
  root.dataset.renderGap=renderGap.toFixed(1);
  root.dataset.rngState=String(rngState);
  root.dataset.rngCalls=String(rngCalls);
  root.dataset.warmedSeedState=String(warmedSeedState);
  root.dataset.averageHeat=averageHeat.toFixed(3);
  root.dataset.minimumHeat=minimumHeat.toFixed(3);
  root.dataset.maximumHeat=maximumHeat.toFixed(3);
  root.dataset.coolCells=String(coolCells);
  root.dataset.warmCells=String(warmCells);
  root.dataset.hotCells=String(hotCells);
  root.dataset.coreCells=String(coreCells);
  root.dataset.occupiedGlyphs=String(occupiedGlyphs);
  root.dataset.glyphsUsed=glyphsUsed;
  root.dataset.glyphChecksum=glyphChecksum;
  root.dataset.heatChecksum=heatChecksum;
  root.dataset.initialChecksum=initialChecksum||glyphChecksum;
  root.dataset.initialHeatChecksum=initialHeatChecksum||heatChecksum;
  root.dataset.bottomMin=String(lastBottomMin);
  root.dataset.bottomMax=String(lastBottomMax);
  root.dataset.bottomAverage=lastBottomAverage.toFixed(3);
  root.dataset.decayMin=String(lastDecayMin);
  root.dataset.decayMax=String(lastDecayMax);
  root.dataset.offsetMin=String(lastOffsetMin);
  root.dataset.offsetMax=String(lastOffsetMax);
  root.dataset.affectedCells=String(lastAffectedCells);
  root.dataset.boundaryMode='clamp';
  root.dataset.pointerX=pointerX.toFixed(2);
  root.dataset.pointerInside=String(pointerInside);
  root.dataset.pointerMoves=String(pointerMoves);
  root.dataset.windStrength=windStrength.toFixed(3);
  root.dataset.windSource=windSource;
  root.dataset.surges=String(surges);
  root.dataset.surgeStartedAt=surgeStartedAt.toFixed(1);
  root.dataset.surgeUntil=surgeUntil.toFixed(1);
  root.dataset.surgeRemaining=surgeRemaining.toFixed(1);
  root.dataset.surgeActive=String(surgeActive);
  root.dataset.fuelFrames=String(fuelFrames);
  root.dataset.lastFuelMode=lastFuelMode;
  root.dataset.fontSize=fontSize.toFixed(2);
  root.dataset.maxGlyphAdvance=maxGlyphAdvance.toFixed(3);
  root.dataset.colorBuckets=String(colorBuckets);
  root.dataset.running=String(running);
  root.dataset.reduced=String(reduced);
  root.dataset.source=source;
  root.dataset.canvasWidth=String(canvas.width);
  root.dataset.canvasHeight=String(canvas.height);
  root.dataset.canvasClientWidth=String(canvas.clientWidth);
  root.dataset.canvasClientHeight=String(canvas.clientHeight);
  root.dataset.dpr=dpr.toFixed(2);
  root.dataset.surge=String(surgeActive);
  windValue.textContent=(windStrength>=0?'+':'')+windStrength.toFixed(2);
  windLine.style.transform='scaleX('+Math.min(1,Math.abs(windStrength)/windMax).toFixed(3)+')';
  windLine.style.transformOrigin=windStrength<0?'right center':'left center';
  fuelFill.style.width=(surgeRemaining/surgeDuration*100).toFixed(2)+'%';
  modeLabel.textContent=reduced?'STATIC / TAP FUEL':surgeActive?'FUEL SURGE':pointerInside?'WIND '+(windStrength>=0?'+':'')+windStrength.toFixed(2):'BASE FUEL';
}
function resizeCanvas(){
  width=Math.max(1,scene.clientWidth);
  height=Math.max(1,scene.clientHeight);
  dpr=Math.min(2,window.devicePixelRatio||1);
  pointerX=pointerInside?clamp(pointerX,0,width):width/2;
  canvas.width=Math.round(width*dpr);
  canvas.height=Math.round(height*dpr);
  context.setTransform(dpr,0,0,dpr,0,0);
  renderFire();
  expose('resize');
}
function manualStep(nextSource,forceFuel){stepFire(forceFuel,true);manualFrames++;renderFire();expose(nextSource)}
function triggerFuel(nextSource){
  surges++;
  if(reduced){surgeStartedAt=0;surgeUntil=0;manualStep(nextSource,true);status.textContent='Static fire advanced with full fuel';return}
  surgeStartedAt=simulationTime;
  surgeUntil=simulationTime+surgeDuration;
  status.textContent='Two second fuel surge started';
  expose(nextSource);
}
scene.addEventListener('pointerdown',function(event){if(event.button!==0)return;root.focus({preventScroll:true})},{passive:true});
scene.addEventListener('pointermove',function(event){
  const box=scene.getBoundingClientRect();
  pointerX=clamp(event.clientX-box.left-scene.clientLeft,0,width);
  pointerInside=true;
  pointerMoves++;
  windStrength=clamp((pointerX/width*2-1)*windMax,-windMax,windMax);
  windSource='pointer';
  expose('pointer');
},{passive:true});
scene.addEventListener('pointerleave',function(){pointerInside=false;pointerX=width/2;windStrength=0;windSource='leave';expose('pointer leave')},{passive:true});
scene.addEventListener('click',function(){triggerFuel('pointer fuel')});
root.addEventListener('keydown',function(event){
  const keys=['ArrowLeft','ArrowRight','Home',' ','Enter'];
  if(!keys.includes(event.key))return;
  event.preventDefault();
  if(event.key===' '||event.key==='Enter'){triggerFuel('keyboard fuel');return}
  if(event.key==='Home'){pointerInside=false;pointerX=width/2;windStrength=0;windSource='keyboard calm';status.textContent='Wind calmed';expose('keyboard calm');return}
  else{pointerInside=true;pointerX=event.key==='ArrowLeft'?0:width;windStrength=event.key==='ArrowLeft'?-windMax:windMax;windSource='keyboard';status.textContent='Keyboard wind '+windStrength.toFixed(0)}
  if(reduced)manualStep('keyboard wind',false);else expose('keyboard wind');
});
function canRun(){return !reduced&&visible&&documentVisible&&root.isConnected}
function stop(){if(frameId)cancelAnimationFrame(frameId);frameId=0;running=false;expose('pause')}
function start(){if(!canRun()||running)return;running=true;lastFrame=performance.now();expose('start');frameId=requestAnimationFrame(frame)}
function cleanup(){stop();if(observer)observer.disconnect();if(resizeObserver)resizeObserver.disconnect();if(connectionObserver)connectionObserver.disconnect();document.removeEventListener('visibilitychange',onVisibility)}
function frame(now){
  frameId=0;
  if(!root.isConnected){cleanup();return}
  if(!canRun()){running=false;expose('pause');return}
  const delta=Math.min(50,Math.max(0,now-lastFrame));
  lastFrame=now;
  simulationTime+=delta;
  accumulator+=delta;
  rafFrames++;
  if(accumulator>=frameInterval){
    accumulator%=frameInterval;
    stepFire(false,true);
    renderFrames++;
    renderGap=lastRenderAt?simulationTime-lastRenderAt:0;
    lastRenderAt=simulationTime;
    renderFire();
    expose('frame');
  }
  frameId=requestAnimationFrame(frame);
}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(documentVisible)start();else stop()}
document.addEventListener('visibilitychange',onVisibility);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(scene)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
root.__asciiFireInspect=function(){return{heat:Array.from(heat),sourceHeat:Array.from(lastSourceHeat),decays:Array.from(lastDecays),offsets:Array.from(lastOffsets),glyphIndices:Array.from(lastGlyphIndices),buckets:Array.from(lastBuckets),data:Object.assign({},root.dataset)}};
for(let step=0;step<warmupSteps;step++)stepFire(false,false);
warmedSeedState=rngState;
resizeCanvas();
initialChecksum=glyphChecksum;
initialHeatChecksum=heatChecksum;
expose(reduced?'reduced':'initial');
if(!reduced)start()`,
  prompt:`Build a self-contained 320px-tall demoscene ASCII fire on a DPR-aware canvas. Use an exact 64 by 28 integer-valued heat grid, the seed 12648430, and a 56-step deterministic warmup so the first frame is a mature static flame. On every logical frame advance the LCG state = state * 1664525 + 1013904223 modulo 2 to the 32 once for each of the 64 bottom cells and derive inclusive integer heat 70 through 100. A fuel surge must still consume those same random calls before overriding each bottom value to 100 so later randomness never forks. Copy the pre-step grid, replace its bottom row with the newly seeded values, then update rows zero through 26. For every destination, clamp each horizontal source index to zero through 63, floor the average of the left, center, and right cells one row below, subtract one independently seeded integer decay from 1 through 4, and clamp to 0 through 100.

Map heat through the exact seven-character ramp space-dot-colon-asterisk-hash-percent-at using a rounded normalized index. Batch fillText calls into four exact thermal colors: heat below 30 uses #5c5c66, 30 up to but not including 60 uses rgba(248,113,113,.7), 60 through 85 uses #fbbf24, and above 85 uses #ffffff only as the fire core. Cap the canvas font at 11px and responsively shrink it until the widest measured glyph fits one of the 64 columns.

Run logical fire steps at a measured 24fps cap inside one requestAnimationFrame scheduler. Track active delta only, cap each delta at 50ms, pause while offscreen or document-hidden, never catch up hidden time, and disconnect every observer on removal. All pointer listeners must be passive where possible. Cursor x maps across the canvas to wind from -2 through +2 cells. For each destination cell, compute influence = max(0, 1 - abs(cellPixelX - pointerX) / 120), square it, multiply by wind, and round to an integer offset. Subtract that offset from the destination x before the individually clamped three-cell source sample so positive wind drifts the flame right.

Clicking or pressing Space or Enter starts a 2000ms active-time fuel surge that sets every bottom cell to exactly 100 until simulation time reaches the deadline. Arrow keys set exact -2 or +2 keyboard wind and Home returns wind to zero. Give the single root focus target a visible focus ring, keyboard shortcut metadata, a polite status, compact 10px labels with 12px values, and live wind, fuel, average-heat, and core telemetry. Use the shared 10px panel radius without FUI scanlines or corner brackets.

Expose grid, ramp, seed, fuel, decay, wind, surge, timing, heat-band, glyph, checksum, font-fit, canvas, running, input-source, and lifecycle telemetry for verification. Under prefers-reduced-motion run no animation frame at all: preserve the deterministic warmed fire, let pointer movement update wind telemetry, let arrows apply one immediate propagation step, and make click, Space, or Enter apply one immediate full-fuel step with a truthful static status instead of starting a timed loop.`
});
