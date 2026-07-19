window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'ascii-morph',
  title:'ASCII Morph',
  cat:'Raster & Glitch',
  rootClass:'d-ascii-morph',
  tags:['ascii','canvas','morph','radial'],
  libs:[],
  desc:'Two exact 30 by 16 ASCII figures interpolate glyph by glyph through a radial luminance wave with a lavender blank-transition flash.',
  seen:'Seen in terminal-art tool builders and glyph-morph experiments by Fay and Vansh',
  hint:'click to swap from that point, use arrows to move the origin, Space or Enter to swap, Escape to cancel, or R to reset',
  html:`<div class="d-ascii-morph" role="group" tabindex="0" aria-label="Interactive ASCII figure morph. Click to swap from that point. Arrow keys move the keyboard origin, Home centers it, Space or Enter swaps figures, Escape cancels, and R resets." aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home Space Enter Escape R">
  <header class="d-ascii-morph-topbar"><span>INTRX / GLYPH MORPH</span><span>030x016 · RADIAL</span></header>
  <div class="d-ascii-morph-scene">
    <canvas class="d-ascii-morph-canvas" role="img" aria-label="A skull and diamond morphing through a fixed ASCII glyph field"></canvas>
  </div>
  <footer class="d-ascii-morph-footer"><span class="d-ascii-morph-mode">MODE / IDLE</span><span class="d-ascii-morph-figure">FIG / SKULL</span><span class="d-ascii-morph-auto">AUTO 4.0S</span></footer>
  <span class="d-ascii-morph-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-ascii-morph{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 10px;outline:none;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate;touch-action:pan-y}
.d-ascii-morph:before{content:'';position:absolute;inset:0;z-index:10;pointer-events:none;background:radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.3) 100%)}
.d-ascii-morph:focus-visible{box-shadow:inset 0 0 0 2px rgba(250,115,25,.72)}
.d-ascii-morph-topbar,.d-ascii-morph-footer{position:relative;z-index:12;display:flex;align-items:center;justify-content:space-between;min-width:0;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.07em;text-transform:uppercase}
.d-ascii-morph-scene{position:relative;z-index:2;min-width:0;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#0a0a0b;cursor:crosshair;user-select:none}
.d-ascii-morph:focus-visible .d-ascii-morph-scene,.d-ascii-morph-scene:hover{border-color:#2e2e34}
.d-ascii-morph-canvas{display:block;width:100%;height:100%}
.d-ascii-morph-footer{border-top:1px solid #232327;font-variant-numeric:tabular-nums}.d-ascii-morph-mode{color:#9b9ba3}.d-ascii-morph-figure{color:#ececef}.d-ascii-morph[data-flash-cells]:not([data-flash-cells="0"]) .d-ascii-morph-figure{color:#fa7319}
.d-ascii-morph-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@container(max-width:340px){.d-ascii-morph-topbar,.d-ascii-morph-footer{font-size:9px;letter-spacing:.035em}.d-ascii-morph-topbar span,.d-ascii-morph-footer span{white-space:nowrap}}
@media(prefers-reduced-motion:reduce){.d-ascii-morph *{animation:none!important;transition:none!important}}
`,
  js:`const scene=root.querySelector('.d-ascii-morph-scene');
const canvas=root.querySelector('.d-ascii-morph-canvas');
const context=canvas.getContext('2d',{alpha:false});
const modeLabel=root.querySelector('.d-ascii-morph-mode');
const figureLabel=root.querySelector('.d-ascii-morph-figure');
const autoLabel=root.querySelector('.d-ascii-morph-auto');
const status=root.querySelector('.d-ascii-morph-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const eventController=new AbortController();
const passiveListener={passive:true,signal:eventController.signal};
const signalListener={signal:eventController.signal};
const columns=30;
const rows=16;
const cellCount=columns*rows;
const cellWidth=7;
const cellHeight=12;
const fieldWidth=columns*cellWidth;
const fieldHeight=rows*cellHeight;
const glyphRamp=' .:-=+*#%@';
const delayScale=8;
const cellDuration=400;
const flashStart=125;
const flashEnd=275;
const flashDuration=150;
const autoInterval=4000;
const centerX=fieldWidth/2;
const centerY=fieldHeight/2;
const figures=[
  [
    '           .-====-.           ',
    '         .=*######*=.         ',
    '        :*#%%%%%%%%#*:        ',
    '       :#%%@@@@@@@@%%#:       ',
    '       *%@@%%####%%@@%*       ',
    '      :%@%#*=::::=*#%@%:      ',
    '      =%%#+  :..:  +#%%=      ',
    '      +%%#  =#..#=  #%%+      ',
    '      +%%#  =#..#=  #%%+      ',
    '      =%%#+  :==:  +#%%=      ',
    '      :#%%#*=:..:=*#%%#:      ',
    '       +#%%%#*++*#%%%#+       ',
    '        =##%#=::=#%##=        ',
    '         :*##++++##*:         ',
    '           =#%%%%#=           ',
    '            .-==-.            '
  ],
  [
    '              ..              ',
    '             .::.             ',
    '            .:==:.            ',
    '           :-=++=-:           ',
    '          -=+****+=-          ',
    '         =+*######*+=         ',
    '        +*##%%%%%%##*+        ',
    '       *#%%@@@@@@@@%%#*       ',
    '       *#%%@@@@@@@@%%#*       ',
    '        +*##%%%%%%##*+        ',
    '         =+*######*+=         ',
    '          -=+****+=-          ',
    '           :-=++=-:           ',
    '            .:==:.            ',
    '             .::.             ',
    '              ..              '
  ]
];
const figureNames=['skull','diamond'];
const figureGlyphs=[new Int8Array(cellCount),new Int8Array(cellCount)];
const figureValues=[new Float32Array(cellCount),new Float32Array(cellCount)];
const fromValues=new Float32Array(cellCount);
const targetIndices=new Int8Array(cellCount);
const currentValues=new Float32Array(cellCount);
const currentGlyphIndices=new Int8Array(cellCount);
const delays=new Float32Array(cellCount);
const progressValues=new Float32Array(cellCount);
const blankTransitionFlags=new Uint8Array(cellCount);
const flashFlags=new Uint8Array(cellCount);
const renderBuckets=new Int8Array(cellCount);
const lastTriggerBefore=new Float32Array(cellCount);
const lastTriggerFrom=new Float32Array(cellCount);
const bucketCounts=new Uint16Array(glyphRamp.length);
let width=1;
let height=1;
let dpr=1;
let fieldOffsetX=0;
let fieldOffsetY=0;
let fontSize=11;
let maxGlyphAdvance=0;
let activeTime=0;
let morphStart=0;
let nextAutoAt=autoInterval;
let stableFigure=0;
let targetFigure=0;
let morphing=false;
let originX=centerX;
let originY=centerY;
let virtualOriginX=centerX;
let virtualOriginY=centerY;
let delayMinimum=0;
let delayMaximum=0;
let fullDuration=0;
let centerDelayChecksum='';
let initialGlyphChecksum='';
let initialValueChecksum='';
let initialDelayChecksum='';
let currentValueChecksum='';
let currentGlyphChecksum='';
let fromValueChecksum='';
let targetGlyphChecksum='';
let delayChecksum='';
let flashChecksum='';
let renderBucketChecksum='';
let progressMinimum=1;
let progressMaximum=1;
let changedCells=0;
let completedCells=cellCount;
let occupiedCells=0;
let flashCells=0;
let frameId=0;
let running=false;
let lastWall=0;
let visible=true;
let documentVisible=document.visibilityState!=='hidden';
let observer=null;
let resizeObserver=null;
let connectionObserver=null;
let schedulerFrames=0;
let renderFrames=0;
let morphTriggers=0;
let completedMorphs=0;
let autoTriggers=0;
let manualTriggers=0;
let pointerTriggers=0;
let keyboardTriggers=0;
let keyboardMoves=0;
let ignoredInputs=0;
let cancellations=0;
let resets=0;
let resizeEvents=0;
let lastCompletionAt=0;
let lastTriggerSource='initial';
let lastTriggerTime=0;
let lastTriggerTarget=0;
let source='initial';
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function checksum(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')}
function buildFigures(){
  for(let figure=0;figure<2;figure++){
    if(figures[figure].length!==rows)throw new Error('ASCII morph figure row count');
    for(let y=0;y<rows;y++){
      if(figures[figure][y].length!==columns)throw new Error('ASCII morph figure column count');
      for(let x=0;x<columns;x++){
        const glyph=figures[figure][y][x];
        const value=glyphRamp.indexOf(glyph);
        if(value<0)throw new Error('ASCII morph glyph outside ramp');
        const index=y*columns+x;
        figureGlyphs[figure][index]=value;
        figureValues[figure][index]=Math.fround(value);
      }
    }
  }
}
function copyStable(figure){
  fromValues.set(figureValues[figure]);
  targetIndices.set(figureGlyphs[figure]);
  currentValues.set(figureValues[figure]);
  currentGlyphIndices.set(figureGlyphs[figure]);
  renderBuckets.set(figureGlyphs[figure]);
  progressValues.fill(1);
  blankTransitionFlags.fill(0);
  flashFlags.fill(0);
}
function recomputeDelays(nextX,nextY){
  originX=clamp(nextX,0,fieldWidth);
  originY=clamp(nextY,0,fieldHeight);
  delayMinimum=Infinity;
  delayMaximum=0;
  for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){
    const index=y*columns+x;
    const delay=Math.fround(Math.hypot((x+.5)*cellWidth-originX,(y+.5)*cellHeight-originY)*delayScale);
    delays[index]=delay;
    delayMinimum=Math.min(delayMinimum,delay);
    delayMaximum=Math.max(delayMaximum,delay);
  }
  fullDuration=delayMaximum+cellDuration;
  delayChecksum=checksum(delays,1000);
}
function refreshStats(){
  bucketCounts.fill(0);
  progressMinimum=1;
  progressMaximum=0;
  changedCells=0;
  completedCells=0;
  occupiedCells=0;
  flashCells=0;
  for(let index=0;index<cellCount;index++){
    const glyph=currentGlyphIndices[index];
    renderBuckets[index]=glyph;
    bucketCounts[glyph]++;
    progressMinimum=Math.min(progressMinimum,progressValues[index]);
    progressMaximum=Math.max(progressMaximum,progressValues[index]);
    if(Math.round(fromValues[index])!==targetIndices[index])changedCells++;
    if(progressValues[index]>=1)completedCells++;
    if(glyph>0)occupiedCells++;
    if(flashFlags[index])flashCells++;
  }
  currentValueChecksum=checksum(currentValues,1000);
  currentGlyphChecksum=checksum(currentGlyphIndices,1);
  fromValueChecksum=checksum(fromValues,1000);
  targetGlyphChecksum=checksum(targetIndices,1);
  flashChecksum=checksum(flashFlags,1);
  renderBucketChecksum=checksum(renderBuckets,1);
}
function sampleMorph(now){
  if(!morphing)return false;
  const elapsed=Math.max(0,now-morphStart);
  let complete=true;
  for(let index=0;index<cellCount;index++){
    const progress=clamp((elapsed-delays[index])/cellDuration,0,1);
    const value=Math.fround(fromValues[index]+(targetIndices[index]-fromValues[index])*progress);
    const glyph=clamp(Math.round(value),0,glyphRamp.length-1);
    progressValues[index]=Math.fround(progress);
    currentValues[index]=value;
    currentGlyphIndices[index]=glyph;
    flashFlags[index]=blankTransitionFlags[index]&&elapsed>=delays[index]+flashStart&&elapsed<delays[index]+flashEnd?1:0;
    if(progress<1)complete=false;
  }
  if(complete){
    morphing=false;
    stableFigure=targetFigure;
    fromValues.set(figureValues[stableFigure]);
    targetIndices.set(figureGlyphs[stableFigure]);
    currentValues.set(figureValues[stableFigure]);
    currentGlyphIndices.set(figureGlyphs[stableFigure]);
    progressValues.fill(1);
    blankTransitionFlags.fill(0);
    flashFlags.fill(0);
    completedMorphs++;
    lastCompletionAt=activeTime;
  }
  return true;
}
function renderMorph(){
  context.setTransform(dpr,0,0,dpr,0,0);
  context.fillStyle='#0a0a0b';
  context.fillRect(0,0,width,height);
  context.font=fontSize+"px 'JetBrains Mono', monospace";
  context.textAlign='center';
  context.textBaseline='middle';
  for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){
    const index=y*columns+x;
    const glyphIndex=currentGlyphIndices[index];
    if(glyphIndex===0&&!flashFlags[index])continue;
    const drawnGlyphIndex=flashFlags[index]?Math.max(1,glyphIndex):glyphIndex;
    context.fillStyle=flashFlags[index]?'#fa7319':'#9b9ba3';
    context.fillText(glyphRamp[drawnGlyphIndex],fieldOffsetX+(x+.5)*cellWidth,fieldOffsetY+(y+.5)*cellHeight+.5);
  }
  refreshStats();
  renderFrames++;
  modeLabel.textContent='MODE / '+(morphing?'MORPH':'IDLE');
  figureLabel.textContent='FIG / '+figureNames[targetFigure].toUpperCase();
  autoLabel.textContent='AUTO '+(Math.max(0,nextAutoAt-activeTime)/1000).toFixed(1)+'S';
}
function expose(nextSource){
  source=nextSource||source;
  root.dataset.gridColumns=String(columns);root.dataset.gridRows=String(rows);root.dataset.cellCount=String(cellCount);root.dataset.glyphRamp=glyphRamp;root.dataset.cellWidth=String(cellWidth);root.dataset.cellHeight=String(cellHeight);root.dataset.fieldWidth=String(fieldWidth);root.dataset.fieldHeight=String(fieldHeight);
  root.dataset.delayScale=String(delayScale);root.dataset.cellDuration=String(cellDuration);root.dataset.flashStart=String(flashStart);root.dataset.flashEnd=String(flashEnd);root.dataset.flashDuration=String(flashDuration);root.dataset.autoInterval=String(autoInterval);
  root.dataset.figureGlyphChecksums=checksum(figureGlyphs[0],1)+','+checksum(figureGlyphs[1],1);root.dataset.figureValueChecksums=checksum(figureValues[0],1000)+','+checksum(figureValues[1],1000);root.dataset.figureBuckets='266,14,22,4,28,16,14,48,54,14|336,12,12,8,16,16,20,24,20,16';root.dataset.figureChangedCells='222';root.dataset.figureBlankTransitions='102';root.dataset.figureOccupied='214,144';
  root.dataset.centerDelayChecksum=centerDelayChecksum;root.dataset.initialGlyphChecksum=initialGlyphChecksum;root.dataset.initialValueChecksum=initialValueChecksum;root.dataset.initialDelayChecksum=initialDelayChecksum;root.dataset.currentValueChecksum=currentValueChecksum;root.dataset.currentGlyphChecksum=currentGlyphChecksum;root.dataset.fromValueChecksum=fromValueChecksum;root.dataset.targetGlyphChecksum=targetGlyphChecksum;root.dataset.delayChecksum=delayChecksum;root.dataset.flashChecksum=flashChecksum;root.dataset.renderBucketChecksum=renderBucketChecksum;root.dataset.bucketCounts=Array.from(bucketCounts).join(',');
  root.dataset.stableFigure=String(stableFigure);root.dataset.stableName=figureNames[stableFigure];root.dataset.targetFigure=String(targetFigure);root.dataset.targetName=figureNames[targetFigure];root.dataset.morphing=String(morphing);root.dataset.originX=originX.toFixed(3);root.dataset.originY=originY.toFixed(3);root.dataset.originNormalized=(originX/fieldWidth).toFixed(6)+','+(originY/fieldHeight).toFixed(6);root.dataset.virtualOriginX=virtualOriginX.toFixed(3);root.dataset.virtualOriginY=virtualOriginY.toFixed(3);
  root.dataset.delayMinimum=delayMinimum.toFixed(6);root.dataset.delayMaximum=delayMaximum.toFixed(6);root.dataset.fullDuration=fullDuration.toFixed(6);root.dataset.progressMinimum=progressMinimum.toFixed(6);root.dataset.progressMaximum=progressMaximum.toFixed(6);root.dataset.changedCells=String(changedCells);root.dataset.completedCells=String(completedCells);root.dataset.occupiedCells=String(occupiedCells);root.dataset.flashCells=String(flashCells);
  root.dataset.activeTime=activeTime.toFixed(3);root.dataset.morphStart=morphStart.toFixed(3);root.dataset.elapsed=(morphing?Math.max(0,activeTime-morphStart):0).toFixed(3);root.dataset.nextAutoAt=nextAutoAt.toFixed(3);root.dataset.autoRemaining=Math.max(0,nextAutoAt-activeTime).toFixed(3);root.dataset.lastCompletionAt=lastCompletionAt.toFixed(3);
  root.dataset.schedulerFrames=String(schedulerFrames);root.dataset.renderFrames=String(renderFrames);root.dataset.morphTriggers=String(morphTriggers);root.dataset.completedMorphs=String(completedMorphs);root.dataset.autoTriggers=String(autoTriggers);root.dataset.manualTriggers=String(manualTriggers);root.dataset.pointerTriggers=String(pointerTriggers);root.dataset.keyboardTriggers=String(keyboardTriggers);root.dataset.keyboardMoves=String(keyboardMoves);root.dataset.ignoredInputs=String(ignoredInputs);root.dataset.cancellations=String(cancellations);root.dataset.resets=String(resets);root.dataset.resizeEvents=String(resizeEvents);
  root.dataset.lastTriggerSource=lastTriggerSource;root.dataset.lastTriggerTime=lastTriggerTime.toFixed(3);root.dataset.lastTriggerTarget=String(lastTriggerTarget);root.dataset.lastTriggerBeforeChecksum=checksum(lastTriggerBefore,1000);root.dataset.lastTriggerFromChecksum=checksum(lastTriggerFrom,1000);
  root.dataset.canvasWidth=String(canvas.width);root.dataset.canvasHeight=String(canvas.height);root.dataset.canvasClientWidth=String(canvas.clientWidth);root.dataset.canvasClientHeight=String(canvas.clientHeight);root.dataset.fieldOffsetX=fieldOffsetX.toFixed(3);root.dataset.fieldOffsetY=fieldOffsetY.toFixed(3);root.dataset.fontSize=fontSize.toFixed(2);root.dataset.maxGlyphAdvance=maxGlyphAdvance.toFixed(3);root.dataset.dpr=dpr.toFixed(2);
  root.dataset.running=String(running);root.dataset.reduced=String(reduced);root.dataset.visible=String(visible);root.dataset.documentVisible=String(documentVisible);root.dataset.source=source;
}
function canRun(){return !reduced&&visible&&documentVisible&&root.isConnected}
function startScheduler(nextSource){if(!canRun()||running)return;running=true;lastWall=performance.now();expose(nextSource||'scheduler start');frameId=requestAnimationFrame(frame)}
function stopScheduler(nextSource){if(frameId)cancelAnimationFrame(frameId);frameId=0;running=false;lastWall=0;expose(nextSource||'scheduler stop')}
function oppositeDestination(){return morphing?1-targetFigure:1-stableFigure}
function beginMorph(nextFigure,nextX,nextY,nextSource,announce){
  if(morphing)sampleMorph(activeTime);
  lastTriggerBefore.set(currentValues);
  fromValues.set(currentValues);
  lastTriggerFrom.set(fromValues);
  targetFigure=clamp(nextFigure,0,1);
  targetIndices.set(figureGlyphs[targetFigure]);
  virtualOriginX=clamp(nextX,0,fieldWidth);
  virtualOriginY=clamp(nextY,0,fieldHeight);
  recomputeDelays(virtualOriginX,virtualOriginY);
  for(let index=0;index<cellCount;index++)blankTransitionFlags[index]=(Math.round(fromValues[index])===0)!==(targetIndices[index]===0)?1:0;
  morphStart=activeTime;
  nextAutoAt=activeTime+autoInterval;
  morphTriggers++;
  lastTriggerSource=nextSource;
  lastTriggerTime=activeTime;
  lastTriggerTarget=targetFigure;
  if(nextSource==='auto')autoTriggers++;else{manualTriggers++;if(nextSource==='pointer')pointerTriggers++;else if(nextSource==='keyboard')keyboardTriggers++}
  if(reduced){
    stableFigure=targetFigure;
    copyStable(stableFigure);
    morphing=false;
    completedMorphs++;
    lastCompletionAt=activeTime;
  }else{
    morphing=false;
    for(let index=0;index<cellCount;index++)if(Math.abs(fromValues[index]-targetIndices[index])>.000001){morphing=true;break}
    progressValues.fill(morphing?0:1);
    flashFlags.fill(0);
    if(!morphing){stableFigure=targetFigure;completedMorphs++;lastCompletionAt=activeTime}
  }
  renderMorph();
  expose(nextSource);
  if(announce!==false)status.textContent=figureNames[targetFigure][0].toUpperCase()+figureNames[targetFigure].slice(1)+' morph started';
  startScheduler(nextSource);
}
function cancelMorph(nextSource){
  targetFigure=stableFigure;
  copyStable(stableFigure);
  morphing=false;
  morphStart=activeTime;
  nextAutoAt=activeTime+autoInterval;
  cancellations++;
  lastTriggerSource=nextSource||'cancel';
  renderMorph();
  expose(nextSource||'cancel');
  status.textContent='Morph cancelled to '+figureNames[stableFigure];
  startScheduler(nextSource||'cancel');
}
function resetMorph(nextSource){
  activeTime=0;morphStart=0;nextAutoAt=autoInterval;stableFigure=0;targetFigure=0;morphing=false;originX=centerX;originY=centerY;virtualOriginX=centerX;virtualOriginY=centerY;lastWall=running?performance.now():0;schedulerFrames=0;renderFrames=0;morphTriggers=0;completedMorphs=0;autoTriggers=0;manualTriggers=0;pointerTriggers=0;keyboardTriggers=0;keyboardMoves=0;ignoredInputs=0;cancellations=0;lastCompletionAt=0;lastTriggerSource=nextSource||'reset';lastTriggerTime=0;lastTriggerTarget=0;lastTriggerBefore.fill(0);lastTriggerFrom.fill(0);resets++;
  copyStable(0);
  recomputeDelays(centerX,centerY);
  renderMorph();
  expose(nextSource||'reset');
  status.textContent='ASCII morph reset to skull';
  startScheduler(nextSource||'reset');
}
function frame(now){
  frameId=0;
  if(!root.isConnected){cleanup();return}
  if(!canRun()){running=false;lastWall=0;expose('scheduler pause');return}
  const delta=Math.min(50,Math.max(0,now-lastWall));
  lastWall=now;
  activeTime+=delta;
  schedulerFrames++;
  let rendered=false;
  if(morphing){sampleMorph(activeTime);renderMorph();expose('morph frame');rendered=true}
  if(!morphing&&activeTime>=nextAutoAt){beginMorph(oppositeDestination(),centerX,centerY,'auto',false);rendered=true}
  if(!rendered){autoLabel.textContent='AUTO '+(Math.max(0,nextAutoAt-activeTime)/1000).toFixed(1)+'S';expose('idle frame')}
  frameId=requestAnimationFrame(frame);
}
function resizeCanvas(){
  width=Math.max(1,canvas.clientWidth||scene.clientWidth);
  height=Math.max(1,canvas.clientHeight||scene.clientHeight);
  dpr=Math.min(2,window.devicePixelRatio||1);
  canvas.width=Math.round(width*dpr);
  canvas.height=Math.round(height*dpr);
  fieldOffsetX=(width-fieldWidth)/2;
  fieldOffsetY=(height-fieldHeight)/2;
  context.setTransform(dpr,0,0,dpr,0,0);
  context.font=fontSize+"px 'JetBrains Mono', monospace";
  maxGlyphAdvance=0;
  for(const glyph of glyphRamp)maxGlyphAdvance=Math.max(maxGlyphAdvance,context.measureText(glyph).width);
  resizeEvents++;
  renderMorph();
  expose('resize');
}
function pointerOrigin(event){
  const box=canvas.getBoundingClientRect();
  return{x:clamp(event.clientX-box.left-fieldOffsetX,0,fieldWidth),y:clamp(event.clientY-box.top-fieldOffsetY,0,fieldHeight)};
}
scene.addEventListener('pointerdown',function(event){
  if(event.button!==0||event.isPrimary===false){ignoredInputs++;expose('pointer ignored');return}
  root.focus({preventScroll:true});
  const point=pointerOrigin(event);
  beginMorph(oppositeDestination(),point.x,point.y,'pointer',true);
},passiveListener);
root.addEventListener('keydown',function(event){
  const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home',' ','Enter','Escape','r','R'];
  if(!keys.includes(event.key))return;
  event.preventDefault();
  if((event.key===' '||event.key==='Enter'||event.key==='r'||event.key==='R')&&event.repeat){ignoredInputs++;expose('key repeat ignored');return}
  if(event.key==='r'||event.key==='R'){resetMorph('keyboard reset');return}
  if(event.key==='Escape'){cancelMorph('keyboard cancel');return}
  if(event.key===' '||event.key==='Enter'){beginMorph(oppositeDestination(),virtualOriginX,virtualOriginY,'keyboard',true);return}
  if(event.key==='Home'){virtualOriginX=centerX;virtualOriginY=centerY;keyboardMoves++;status.textContent='Morph origin centered';expose('keyboard center');return}
  const multiplier=event.shiftKey?3:1;
  if(event.key==='ArrowLeft')virtualOriginX=clamp(virtualOriginX-cellWidth*multiplier,0,fieldWidth);
  if(event.key==='ArrowRight')virtualOriginX=clamp(virtualOriginX+cellWidth*multiplier,0,fieldWidth);
  if(event.key==='ArrowUp')virtualOriginY=clamp(virtualOriginY-cellHeight*multiplier,0,fieldHeight);
  if(event.key==='ArrowDown')virtualOriginY=clamp(virtualOriginY+cellHeight*multiplier,0,fieldHeight);
  keyboardMoves++;
  status.textContent='Morph origin '+Math.round(virtualOriginX)+' / '+Math.round(virtualOriginY);
  expose('keyboard origin');
},signalListener);
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(documentVisible)startScheduler('document visible');else stopScheduler('document hidden')}
function cleanup(){stopScheduler('cleanup');eventController.abort();if(observer)observer.disconnect();if(resizeObserver)resizeObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
document.addEventListener('visibilitychange',onVisibility,signalListener);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(scene)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)startScheduler('intersection visible');else stopScheduler('intersection hidden')},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
root.__asciiMorphInspect=function(){return{
  figureRows:figures.map(function(figure){return figure.slice()}),
  figureGlyphs:figureGlyphs.map(function(values){return Array.from(values)}),
  figureValues:figureValues.map(function(values){return Array.from(values)}),
  fromValues:Array.from(fromValues),targetIndices:Array.from(targetIndices),currentValues:Array.from(currentValues),currentGlyphIndices:Array.from(currentGlyphIndices),delays:Array.from(delays),progressValues:Array.from(progressValues),blankTransitionFlags:Array.from(blankTransitionFlags),flashFlags:Array.from(flashFlags),renderBuckets:Array.from(renderBuckets),lastTriggerBefore:Array.from(lastTriggerBefore),lastTriggerFrom:Array.from(lastTriggerFrom),data:Object.assign({},root.dataset)
}};
buildFigures();
copyStable(0);
recomputeDelays(centerX,centerY);
centerDelayChecksum=delayChecksum;
initialDelayChecksum=delayChecksum;
initialGlyphChecksum=checksum(figureGlyphs[0],1);
initialValueChecksum=checksum(figureValues[0],1000);
resizeCanvas();
expose(reduced?'reduced':'initial');
if(!reduced)startScheduler('initial')`,
  prompt:`Build a self-contained, responsive 320px-tall canvas interaction that morphs between two exact hand-authored 30 by 16 ASCII figures: a skull and a diamond. Use the ten-character ramp space, dot, colon, hyphen, equals, plus, asterisk, hash, percent, at. Store the figures as exact string arrays and translate every character to its ramp index. The field uses fixed 7 by 12 CSS-pixel cells, an 11px JetBrains Mono font, and is centered inside a DPR-aware canvas.

For each cell center at ((column+0.5)*7,(row+0.5)*12), store delay as Float32(hypot(cellCenter-origin)*8). On every active frame, progress is clamp((activeTime-morphStart-delay)/400,0,1). Store current value as Float32(fromValue+(targetIndex-fromValue)*progress) and render the rounded ramp index. A blank-to-filled or filled-to-blank cell flashes the current non-space glyph in #fa7319 from delay+125ms inclusive through delay+275ms exclusive; otherwise every non-space glyph is #9b9ba3 on #0a0a0b.

Start on the stable skull with a centered field-space origin of 105,96. Auto-alternate from the center every 4000ms of visible active time. Primary-left pointerdown focuses the one role-group root and immediately swaps toward the opposite figure with the radial origin clamped from the clicked field coordinate. A trigger during a morph must first sample all current Float32 values, copy them exactly into the next from-values array, and reverse the destination without a glyph jump. Manual triggers reschedule auto for 4000ms later. Ignore and count secondary, non-primary, and repeated trigger input; hover alone does nothing.

Arrow keys move a virtual field origin one 7 by 12 cell, Shift moves three cells, Home centers it, Space or Enter swaps, Escape instantly cancels to the last stable figure, and R restores the exact initial skull and counters. Give the root a visible focus ring, aria-keyshortcuts, touch-action pan-y, a canvas role img, and an initially empty polite atomic live status.

Use one requestAnimationFrame scheduler only in normal motion. Advance an explicit active clock by visible callback deltas capped at 50ms. Freeze morph and auto timing while offscreen or document-hidden, reset the wall timestamp on resume, never catch up hidden time, and clean up all listeners through one AbortController plus Resize, Intersection, and Mutation observers. Reduced motion schedules zero animation frames, disables auto advancement, performs pointer and keyboard swaps synchronously to exact endpoints, and never shows a flash. Expose copied figure, from, target, current, delay, progress, blank-transition, flash, render-bucket, and trigger-continuity arrays plus exact checksums, buckets, timing, origin, input, scheduler, responsive canvas, accessibility-relevant state, and lifecycle telemetry for independent validation.`
});
