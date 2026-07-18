window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'ascii-portrait-reveal',
  title:'ASCII Portrait Reveal',
  cat:'Raster & Glitch',
  rootClass:'d-ascii-portrait',
  tags:['ascii','canvas','portrait','reveal'],
  libs:[],
  desc:'A deterministic abstract bust is averaged from a 192 by 96 grayscale source into a 48 by 24 glyph field, then develops into sampled tone beneath a squared cursor reveal.',
  seen:'Seen in luxury ASCII landing pages and resolve-under-cursor studies by Basit A. Khan',
  hint:'move to develop, use arrows, press Space to toggle, Escape to clear, or R to reset',
  html:`<div class="d-ascii-portrait" role="group" tabindex="0" aria-label="Interactive abstract ASCII portrait. Move the pointer to develop sampled grayscale cells. Arrow keys move a keyboard reveal, Home centers it, Space toggles it, Escape clears it, and R resets." aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home Space Escape R">
  <header class="d-ascii-portrait-topbar"><span>INTRX / PORTRAIT STUDY</span><span>192x096 → 048x024</span></header>
  <div class="d-ascii-portrait-scene">
    <canvas class="d-ascii-portrait-canvas" role="img" aria-label="Procedural abstract bust rendered as responsive ASCII glyphs"></canvas>
  </div>
  <footer class="d-ascii-portrait-footer"><span class="d-ascii-portrait-mode">MODE / ASCII</span><span class="d-ascii-portrait-reveal-readout">REVEAL 000</span><span class="d-ascii-portrait-trail">TRAIL 600MS</span></footer>
  <span class="d-ascii-portrait-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-ascii-portrait{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 10px;outline:none;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate;touch-action:pan-y}
.d-ascii-portrait:before{content:'';position:absolute;inset:0;z-index:10;pointer-events:none;background:radial-gradient(ellipse at center,transparent 44%,rgba(0,0,0,.3) 100%)}
.d-ascii-portrait:focus-visible{box-shadow:inset 0 0 0 2px rgba(167,139,250,.72)}
.d-ascii-portrait-topbar,.d-ascii-portrait-footer{position:relative;z-index:12;display:flex;align-items:center;justify-content:space-between;min-width:0;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.07em;text-transform:uppercase}
.d-ascii-portrait-scene{position:relative;z-index:2;min-width:0;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#0a0a0b;cursor:crosshair;user-select:none}.d-ascii-portrait:focus-visible .d-ascii-portrait-scene,.d-ascii-portrait-scene:hover{border-color:#2e2e34}
.d-ascii-portrait-canvas{display:block;width:100%;height:100%}
.d-ascii-portrait-footer{border-top:1px solid #232327;font-variant-numeric:tabular-nums}.d-ascii-portrait-mode{color:#9b9ba3}.d-ascii-portrait-reveal-readout{color:#ececef}.d-ascii-portrait[data-pointer-active="true"] .d-ascii-portrait-reveal-readout{color:#a78bfa}.d-ascii-portrait-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@container(max-width:340px){.d-ascii-portrait-topbar,.d-ascii-portrait-footer{font-size:9px;letter-spacing:.035em}.d-ascii-portrait-topbar span,.d-ascii-portrait-footer span{white-space:nowrap}}
@media(prefers-reduced-motion:reduce){.d-ascii-portrait *{animation:none!important;transition:none!important}}
`,
  js:`const scene=root.querySelector('.d-ascii-portrait-scene');
const canvas=root.querySelector('.d-ascii-portrait-canvas');
const context=canvas.getContext('2d',{alpha:false});
const modeLabel=root.querySelector('.d-ascii-portrait-mode');
const revealLabel=root.querySelector('.d-ascii-portrait-reveal-readout');
const status=root.querySelector('.d-ascii-portrait-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const eventController=new AbortController();
const passiveListener={passive:true,signal:eventController.signal};
const signalListener={signal:eventController.signal};
const sourceWidth=192;
const sourceHeight=96;
const sourceSeed=0x9e3779b9;
const sourceScale=4;
const gridColumns=48;
const gridRows=24;
const cellCount=gridColumns*gridRows;
const sourceCount=sourceWidth*sourceHeight;
const glyphRamp=' .:-=+*#%@';
const revealRadius=90;
const accentAnnulus=12;
const trailDuration=600;
const fineNoiseAmplitude=.025;
const coarseNoiseAmplitude=.07;
const paletteLow=[22,22,25];
const paletteHigh=[236,236,239];
const luminanceWeights=[.2126,.7152,.0722];
const paletteLowLuminance=paletteLow[0]*luminanceWeights[0]+paletteLow[1]*luminanceWeights[1]+paletteLow[2]*luminanceWeights[2];
const paletteHighLuminance=paletteHigh[0]*luminanceWeights[0]+paletteHigh[1]*luminanceWeights[1]+paletteHigh[2]*luminanceWeights[2];
const keyboardStep=12;
const sourcePixels=new Uint8ClampedArray(sourceCount*4);
const cellSampleRgb=new Uint8ClampedArray(cellCount*3);
const cellAverageLuma=new Float32Array(cellCount);
const cellLuminance=new Float32Array(cellCount);
const glyphIndices=new Int8Array(cellCount);
const directWeights=new Float32Array(cellCount);
const revealStrengths=new Float32Array(cellCount);
const trailStartStrengths=new Float32Array(cellCount);
const trailStartedAt=new Float64Array(cellCount);
const cellDistances=new Float32Array(cellCount);
const accentFlags=new Uint8Array(cellCount);
const renderBuckets=new Uint8Array(cellCount);
const lastUpdateBefore=new Float32Array(cellCount);
const lastUpdateTarget=new Float32Array(cellCount);
const lastUpdateAfter=new Float32Array(cellCount);
const lastUpdateDelta=new Float32Array(cellCount);
let width=1;
let height=1;
let dpr=1;
let fontSize=0;
let maxGlyphAdvance=0;
let pointerX=.5;
let pointerY=.5;
let pointerNormalizedX=.5;
let pointerNormalizedY=.5;
let pointerActive=false;
let pointerInside=false;
let dragging=false;
let dragPointer=-1;
let activeTime=0;
let lastWall=0;
let frameId=0;
let running=false;
let schedulerFrames=0;
let renderFrames=0;
let inputUpdates=0;
let pointerMoves=0;
let keyboardMoves=0;
let captures=0;
let nativeCaptures=0;
let releases=0;
let cancels=0;
let ignoredPointers=0;
let resets=0;
let visible=!('IntersectionObserver'in window);
let documentVisible=document.visibilityState!=='hidden';
let source='initial';
let lastUpdateSource='initial';
let lastUpdateTime=0;
let lastUpdateAffected=0;
let lastUpdateIncrease=0;
let lastUpdateDecrease=0;
let revealCells=0;
let accentCells=0;
let filledCells=0;
let glyphCells=cellCount;
let trailCells=0;
let revealTotal=0;
let revealMaximum=0;
let sourceChannelMinimum=255;
let sourceChannelMaximum=0;
let cellLuminanceMinimum=1;
let cellLuminanceMaximum=0;
let sourceChecksum='00000000';
let cellChecksum='00000000';
let glyphChecksum='00000000';
let revealChecksum='00000000';
let targetChecksum='00000000';
let edgeChecksum='00000000';
let renderBucketChecksum='00000000';
let renderBucketCounts='0,0,0,0';
let initialRevealChecksum='';
let resizeObserver=null;
let observer=null;
let connectionObserver=null;
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function smoothstep(edge0,edge1,value){const amount=clamp((value-edge0)/(edge1-edge0),0,1);return amount*amount*(3-2*amount)}
function ellipse(u,v,cx,cy,rx,ry){return 1-smoothstep(.84,1.08,Math.hypot((u-cx)/rx,(v-cy)/ry))}
function pixelNoise(x,y){let hash=(Math.imul(x+1,374761393)^Math.imul(y+1,668265263)^sourceSeed)>>>0;hash=Math.imul(hash^(hash>>>13),1274126177);return((hash^(hash>>>16))>>>0)/4294967296}
function checksum(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')}
function buildSource(){
  for(let y=0;y<sourceHeight;y++)for(let x=0;x<sourceWidth;x++){
    const u=(x+.5)/sourceWidth,v=(y+.5)/sourceHeight;
    const head=ellipse(u,v,.5,.39,.17,.28);
    const neck=ellipse(u,v,.5,.67,.095,.18);
    const shoulders=ellipse(u,v,.5,.91,.47,.29);
    const bust=Math.max(head,neck,shoulders);
    const backgroundDistance=Math.hypot((u-.72)/.88,(v-.24)/.82);
    const keyDistance=Math.hypot((u-.42)/.34,(v-.31)/.52);
    const rimDistance=Math.hypot((u-.63)/.20,(v-.39)/.40);
    const backgroundLight=.27+.58*Math.pow(Math.max(0,1-backgroundDistance),2);
    const keyLight=Math.pow(Math.max(0,1-keyDistance),2);
    const rimLight=Math.pow(Math.max(0,1-rimDistance),2);
    const bustLight=.05+.26*keyLight+.14*rimLight;
    const noise=(pixelNoise(x,y)-.5)*fineNoiseAmplitude+(pixelNoise(Math.floor(x/4),Math.floor(y/4))-.5)*coarseNoiseAmplitude;
    const tone=clamp(backgroundLight*(1-bust)+bustLight*bust+noise,0,1);
    const red=Math.round(paletteLow[0]+(paletteHigh[0]-paletteLow[0])*tone);
    const green=Math.round(paletteLow[1]+(paletteHigh[1]-paletteLow[1])*tone);
    const blue=Math.round(paletteLow[2]+(paletteHigh[2]-paletteLow[2])*tone);
    const offset=(y*sourceWidth+x)*4;
    sourcePixels[offset]=red;sourcePixels[offset+1]=green;sourcePixels[offset+2]=blue;sourcePixels[offset+3]=255;
    sourceChannelMinimum=Math.min(sourceChannelMinimum,red,green,blue);
    sourceChannelMaximum=Math.max(sourceChannelMaximum,red,green,blue);
  }
  for(let gy=0;gy<gridRows;gy++)for(let gx=0;gx<gridColumns;gx++){
    let totalRed=0,totalGreen=0,totalBlue=0;
    for(let sy=0;sy<sourceScale;sy++)for(let sx=0;sx<sourceScale;sx++){
      const sourceX=gx*sourceScale+sx,sourceY=gy*sourceScale+sy;
      const sourceOffset=(sourceY*sourceWidth+sourceX)*4;
      totalRed+=sourcePixels[sourceOffset];totalGreen+=sourcePixels[sourceOffset+1];totalBlue+=sourcePixels[sourceOffset+2];
    }
    const index=gy*gridColumns+gx;
    const sampleCount=sourceScale*sourceScale;
    const averageRed=totalRed/sampleCount,averageGreen=totalGreen/sampleCount,averageBlue=totalBlue/sampleCount;
    const luminance=averageRed*luminanceWeights[0]+averageGreen*luminanceWeights[1]+averageBlue*luminanceWeights[2];
    const normalized=clamp((luminance-paletteLowLuminance)/(paletteHighLuminance-paletteLowLuminance),0,1);
    cellAverageLuma[index]=luminance;
    cellLuminance[index]=normalized;
    glyphIndices[index]=clamp(Math.round(cellLuminance[index]*(glyphRamp.length-1)),0,glyphRamp.length-1);
    cellSampleRgb[index*3]=Math.round(averageRed);cellSampleRgb[index*3+1]=Math.round(averageGreen);cellSampleRgb[index*3+2]=Math.round(averageBlue);
    cellLuminanceMinimum=Math.min(cellLuminanceMinimum,normalized);
    cellLuminanceMaximum=Math.max(cellLuminanceMaximum,normalized);
  }
  sourceChecksum=checksum(sourcePixels,1);
  cellChecksum=checksum(cellSampleRgb,1);
  glyphChecksum=checksum(glyphIndices,1);
}
function trailValue(index,time){const strength=trailStartStrengths[index];if(strength<=0)return 0;return strength*clamp(1-(time-trailStartedAt[index])/trailDuration,0,1)}
function currentReveal(index,time){return Math.max(directWeights[index],trailValue(index,time))}
function computeTarget(localX,localY,target,distances){
  const cellWidth=width/gridColumns,cellHeight=height/gridRows;
  for(let index=0;index<cellCount;index++){
    const x=index%gridColumns,y=Math.floor(index/gridColumns);
    const distance=Math.hypot((x+.5)*cellWidth-localX,(y+.5)*cellHeight-localY);
    distances[index]=distance;
    const influence=Math.max(0,1-distance/revealRadius);
    target[index]=distance<revealRadius?influence*influence:0;
  }
}
function updateReveal(localX,localY,active,nextSource,countInput){
  const updateAt=activeTime;
  const nextTarget=new Float32Array(cellCount);
  const nextDistances=new Float32Array(cellCount);
  if(active)computeTarget(localX,localY,nextTarget,nextDistances);else nextDistances.fill(Infinity);
  lastUpdateAffected=0;lastUpdateIncrease=0;lastUpdateDecrease=0;
  for(let index=0;index<cellCount;index++){
    const before=currentReveal(index,updateAt);
    const target=nextTarget[index];
    lastUpdateBefore[index]=before;
    lastUpdateTarget[index]=target;
    if(reduced){trailStartStrengths[index]=0;trailStartedAt[index]=updateAt}
    else{
      const residual=trailValue(index,updateAt);
      if(directWeights[index]>target&&directWeights[index]>=residual){trailStartStrengths[index]=directWeights[index];trailStartedAt[index]=updateAt}
      else if(residual<=0){trailStartStrengths[index]=0;trailStartedAt[index]=updateAt}
    }
    directWeights[index]=target;
    cellDistances[index]=nextDistances[index];
    const after=reduced?target:currentReveal(index,updateAt);
    lastUpdateAfter[index]=after;
    lastUpdateDelta[index]=after-before;
    revealStrengths[index]=after;
    if(Math.abs(after-before)>1e-7)lastUpdateAffected++;
    if(after>before)lastUpdateIncrease+=after-before;
    if(after<before)lastUpdateDecrease+=before-after;
  }
  pointerX=localX;pointerY=localY;pointerNormalizedX=width?localX/width:.5;pointerNormalizedY=height?localY/height:.5;pointerActive=active;
  if(countInput!==false)inputUpdates++;lastUpdateSource=nextSource;lastUpdateTime=updateAt;
  renderPortrait();expose(nextSource);
  if(!reduced&&hasResidual())startScheduler(nextSource);
}
function hasResidual(){for(let index=0;index<cellCount;index++)if(trailStartStrengths[index]>0&&activeTime-trailStartedAt[index]<trailDuration)return true;return false}
function updateRenderEvidence(){
  revealCells=0;accentCells=0;filledCells=0;glyphCells=0;trailCells=0;revealTotal=0;revealMaximum=0;
  const bucketCounts=[0,0,0,0];
  for(let index=0;index<cellCount;index++){
    const reveal=currentReveal(index,activeTime);
    const edge=pointerActive&&glyphIndices[index]>0&&cellDistances[index]>=revealRadius-accentAnnulus&&cellDistances[index]<revealRadius;
    const bucket=edge?3:reveal>=.999?2:reveal>0?1:0;
    revealStrengths[index]=reveal;
    accentFlags[index]=edge?1:0;
    renderBuckets[index]=bucket;bucketCounts[bucket]++;
    if(reveal>0){revealCells++;revealTotal+=reveal;revealMaximum=Math.max(revealMaximum,reveal)}
    if(edge)accentCells++;
    if(reveal>=.5)filledCells++;
    if(glyphIndices[index]>0&&reveal<.999)glyphCells++;
    if(trailValue(index,activeTime)>directWeights[index]+1e-7)trailCells++;
    if(trailStartStrengths[index]>0&&activeTime-trailStartedAt[index]>=trailDuration)trailStartStrengths[index]=0;
  }
  revealChecksum=checksum(revealStrengths,10000);
  targetChecksum=checksum(directWeights,10000);
  edgeChecksum=checksum(accentFlags,1);
  renderBucketChecksum=checksum(renderBuckets,1);
  renderBucketCounts=bucketCounts.join(',');
}
function renderPortrait(){
  updateRenderEvidence();
  const cellWidth=width/gridColumns,cellHeight=height/gridRows;
  const fontCeiling=Math.min(11,cellHeight*1.02);
  context.globalAlpha=1;context.fillStyle='#0a0a0b';context.fillRect(0,0,width,height);
  context.font='600 '+fontCeiling.toFixed(2)+'px "JetBrains Mono",monospace';
  const ceilingAdvance=Math.max(...[...glyphRamp].map(function(glyph){return context.measureText(glyph).width}));
  fontSize=Math.min(fontCeiling,fontCeiling*cellWidth/Math.max(.01,ceilingAdvance)*.96);
  context.font='600 '+fontSize.toFixed(2)+'px "JetBrains Mono",monospace';
  maxGlyphAdvance=Math.max(...[...glyphRamp].map(function(glyph){return context.measureText(glyph).width}));
  context.textAlign='center';context.textBaseline='middle';
  for(let index=0;index<cellCount;index++){
    const reveal=revealStrengths[index],x=index%gridColumns,y=Math.floor(index/gridColumns);
    const left=x*cellWidth,top=y*cellHeight;
    if(reveal>0){const colorOffset=index*3;context.globalAlpha=reveal;context.fillStyle='rgb('+cellSampleRgb[colorOffset]+','+cellSampleRgb[colorOffset+1]+','+cellSampleRgb[colorOffset+2]+')';context.fillRect(left,top,cellWidth+.35,cellHeight+.35)}
    const glyph=glyphRamp[glyphIndices[index]];
    if(glyph!==' '&&reveal<.999){context.globalAlpha=1-reveal;context.fillStyle=accentFlags[index]?'#a78bfa':'#9b9ba3';context.fillText(glyph,(x+.5)*cellWidth,(y+.5)*cellHeight+.5)}
  }
  context.globalAlpha=1;
  renderFrames++;
  modeLabel.textContent='MODE / '+(pointerActive?'DEVELOP':'ASCII');
  revealLabel.textContent='REVEAL '+String(revealCells).padStart(3,'0');
}
function expose(nextSource){
  source=nextSource||source;
  root.dataset.sourceWidth=String(sourceWidth);root.dataset.sourceHeight=String(sourceHeight);root.dataset.sourceScale=String(sourceScale);root.dataset.sourceSeed='0x9E3779B9';root.dataset.sourceFormula='portrait-v2';root.dataset.sourceNoiseAmplitudes=fineNoiseAmplitude+','+coarseNoiseAmplitude;root.dataset.sourcePalette='#161619,#ececef';root.dataset.sourceMasks='head:.5,.39,.17,.28;neck:.5,.67,.095,.18;shoulders:.5,.91,.47,.29;edge:.84,1.08';root.dataset.sourceLighting='background:.27,.58,.72,.24,.88,.82;key:.42,.31,.34,.52,.26;rim:.63,.39,.20,.40,.14;bustBase:.05';root.dataset.luminanceWeights=luminanceWeights.join(',');
  root.dataset.gridColumns=String(gridColumns);root.dataset.gridRows=String(gridRows);root.dataset.cellCount=String(cellCount);root.dataset.glyphRamp=glyphRamp;root.dataset.revealRadius=String(revealRadius);root.dataset.revealFalloff='squared';root.dataset.accentAnnulus=String(accentAnnulus);root.dataset.trailDuration=String(trailDuration);
  root.dataset.sourceChecksum=sourceChecksum;root.dataset.cellChecksum=cellChecksum;root.dataset.glyphChecksum=glyphChecksum;root.dataset.revealChecksum=revealChecksum;root.dataset.targetChecksum=targetChecksum;root.dataset.edgeChecksum=edgeChecksum;root.dataset.renderBucketChecksum=renderBucketChecksum;root.dataset.renderBucketCounts=renderBucketCounts;root.dataset.initialRevealChecksum=initialRevealChecksum||revealChecksum;
  root.dataset.sourceChannelMinimum=String(sourceChannelMinimum);root.dataset.sourceChannelMaximum=String(sourceChannelMaximum);root.dataset.cellLuminanceMinimum=cellLuminanceMinimum.toFixed(6);root.dataset.cellLuminanceMaximum=cellLuminanceMaximum.toFixed(6);
  root.dataset.pointerActive=String(pointerActive);root.dataset.pointerInside=String(pointerInside);root.dataset.pointerX=pointerX.toFixed(3);root.dataset.pointerY=pointerY.toFixed(3);root.dataset.pointerNormalized=pointerNormalizedX.toFixed(6)+','+pointerNormalizedY.toFixed(6);root.dataset.dragging=String(dragging);root.dataset.dragPointer=String(dragPointer);
  root.dataset.revealCells=String(revealCells);root.dataset.accentCells=String(accentCells);root.dataset.filledCells=String(filledCells);root.dataset.glyphCells=String(glyphCells);root.dataset.trailCells=String(trailCells);root.dataset.revealTotal=revealTotal.toFixed(6);root.dataset.revealMaximum=revealMaximum.toFixed(6);
  root.dataset.activeTime=activeTime.toFixed(3);root.dataset.schedulerFrames=String(schedulerFrames);root.dataset.renderFrames=String(renderFrames);root.dataset.inputUpdates=String(inputUpdates);root.dataset.pointerMoves=String(pointerMoves);root.dataset.keyboardMoves=String(keyboardMoves);
  root.dataset.lastUpdateSource=lastUpdateSource;root.dataset.lastUpdateTime=lastUpdateTime.toFixed(3);root.dataset.lastUpdateAffected=String(lastUpdateAffected);root.dataset.lastUpdateIncrease=lastUpdateIncrease.toFixed(6);root.dataset.lastUpdateDecrease=lastUpdateDecrease.toFixed(6);root.dataset.lastUpdateBeforeChecksum=checksum(lastUpdateBefore,10000);root.dataset.lastUpdateTargetChecksum=checksum(lastUpdateTarget,10000);root.dataset.lastUpdateAfterChecksum=checksum(lastUpdateAfter,10000);root.dataset.lastUpdateDeltaChecksum=checksum(lastUpdateDelta,10000);
  root.dataset.captures=String(captures);root.dataset.nativeCaptures=String(nativeCaptures);root.dataset.releases=String(releases);root.dataset.cancels=String(cancels);root.dataset.ignoredPointers=String(ignoredPointers);root.dataset.resets=String(resets);
  root.dataset.fontSize=fontSize.toFixed(2);root.dataset.maxGlyphAdvance=maxGlyphAdvance.toFixed(3);root.dataset.canvasWidth=String(canvas.width);root.dataset.canvasHeight=String(canvas.height);root.dataset.canvasClientWidth=String(canvas.clientWidth);root.dataset.canvasClientHeight=String(canvas.clientHeight);root.dataset.cellWidth=(width/gridColumns).toFixed(4);root.dataset.cellHeight=(height/gridRows).toFixed(4);root.dataset.dpr=dpr.toFixed(2);
  root.dataset.running=String(running);root.dataset.reduced=String(reduced);root.dataset.visible=String(visible);root.dataset.documentVisible=String(documentVisible);root.dataset.source=source;
}
function resizeCanvas(){width=Math.max(1,scene.clientWidth);height=Math.max(1,scene.clientHeight);dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0);pointerX=clamp(pointerNormalizedX*width,0,width);pointerY=clamp(pointerNormalizedY*height,0,height);if(pointerActive)updateReveal(pointerX,pointerY,true,'resize',false);else{renderPortrait();expose('resize')}}
function localPoint(event){const box=scene.getBoundingClientRect();return{x:clamp(event.clientX-box.left-scene.clientLeft,0,scene.clientWidth),y:clamp(event.clientY-box.top-scene.clientTop,0,scene.clientHeight)}}
function canAnimate(){return !reduced&&visible&&documentVisible&&root.isConnected}
function stopScheduler(nextSource){if(frameId)cancelAnimationFrame(frameId);frameId=0;running=false;lastWall=0;expose(nextSource||'scheduler stop')}
function startScheduler(nextSource){if(!canAnimate()||running||!hasResidual())return;running=true;lastWall=performance.now();source=nextSource||source;frameId=requestAnimationFrame(frame)}
function frame(now){frameId=0;if(!root.isConnected){cleanup();return}if(!canAnimate()){running=false;lastWall=0;expose('scheduler pause');return}const delta=Math.min(50,Math.max(0,now-lastWall));lastWall=now;activeTime+=delta;schedulerFrames++;renderPortrait();expose('trail frame');if(hasResidual())frameId=requestAnimationFrame(frame);else{running=false;lastWall=0;expose('trail complete')}}
function clearReveal(nextSource){pointerInside=false;updateReveal(pointerX,pointerY,false,nextSource)}
function pointInsideScene(event){const box=scene.getBoundingClientRect();return event.clientX>=box.left+scene.clientLeft&&event.clientX<=box.left+scene.clientLeft+scene.clientWidth&&event.clientY>=box.top+scene.clientTop&&event.clientY<=box.top+scene.clientTop+scene.clientHeight}
function finishDrag(cancelled,event){if(!dragging)return;const pointer=dragPointer,releasedInside=!event||pointInsideScene(event);dragging=false;dragPointer=-1;if(cancelled)cancels++;else releases++;if(scene.releasePointerCapture)try{if(scene.hasPointerCapture(pointer))scene.releasePointerCapture(pointer)}catch(error){}if(cancelled||!releasedInside){pointerInside=false;clearReveal(cancelled?'pointer cancel':'pointer release outside')}else expose('pointer release');status.textContent=cancelled?'Portrait reveal cancelled':releasedInside?'Portrait reveal released':'Portrait reveal released outside'}
scene.addEventListener('pointerenter',function(event){if(dragging)return;if(event.isPrimary===false){ignoredPointers++;expose('pointer ignored');return}const point=localPoint(event);pointerInside=true;pointerMoves++;updateReveal(point.x,point.y,true,'pointer enter');status.textContent='Portrait reveal active'},passiveListener);
scene.addEventListener('pointermove',function(event){if(event.isPrimary===false||(dragging&&event.pointerId!==dragPointer)){ignoredPointers++;expose('pointer ignored');return}const point=localPoint(event);pointerInside=true;pointerMoves++;updateReveal(point.x,point.y,true,'pointer move')},passiveListener);
scene.addEventListener('pointerleave',function(event){if(dragging)return;if(event.isPrimary===false){ignoredPointers++;expose('pointer ignored');return}pointerInside=false;clearReveal('pointer leave');status.textContent=reduced?'Portrait reveal cleared':'Portrait reveal trailing'},passiveListener);
scene.addEventListener('pointerdown',function(event){if(event.button!==0||event.isPrimary===false||dragging){ignoredPointers++;expose('pointer ignored');return}root.focus({preventScroll:true});const point=localPoint(event);pointerInside=true;dragging=true;dragPointer=event.pointerId;captures++;if(scene.setPointerCapture)try{scene.setPointerCapture(event.pointerId);nativeCaptures++}catch(error){}updateReveal(point.x,point.y,true,'pointer start');status.textContent='Portrait reveal captured'},passiveListener);
scene.addEventListener('pointerup',function(event){if(event.pointerId===dragPointer)finishDrag(false,event);else if(dragging){ignoredPointers++;expose('pointer ignored')}},passiveListener);
scene.addEventListener('pointercancel',function(event){if(event.pointerId===dragPointer)finishDrag(true,event);else if(dragging){ignoredPointers++;expose('pointer ignored')}},passiveListener);
scene.addEventListener('lostpointercapture',function(event){if(event.pointerId===dragPointer)finishDrag(true,event);else if(dragging){ignoredPointers++;expose('pointer ignored')}},passiveListener);
root.addEventListener('keydown',function(event){
  const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home',' ','Escape','r','R'];if(!keys.includes(event.key))return;event.preventDefault();
  if(event.key==='r'||event.key==='R'){if(!event.repeat)resetPortrait('keyboard reset');return}
  if(event.key==='Escape'){if(dragging)finishDrag(true);else clearReveal('keyboard clear');status.textContent='Portrait reveal cleared';return}
  if(event.key===' '){if(event.repeat)return;if(pointerActive)clearReveal('keyboard toggle off');else{pointerInside=true;updateReveal(pointerX,pointerY,true,'keyboard toggle on')}status.textContent=pointerActive?'Portrait reveal active':'Portrait reveal cleared';return}
  if(event.key==='Home'){pointerInside=true;keyboardMoves++;updateReveal(width/2,height/2,true,'keyboard center');status.textContent='Portrait reveal centered';return}
  const amount=keyboardStep*(event.shiftKey?3:1);const nextX=clamp(pointerX+(event.key==='ArrowRight'?amount:event.key==='ArrowLeft'?-amount:0),0,width);const nextY=clamp(pointerY+(event.key==='ArrowDown'?amount:event.key==='ArrowUp'?-amount:0),0,height);pointerInside=true;keyboardMoves++;updateReveal(nextX,nextY,true,'keyboard move');status.textContent='Portrait reveal '+Math.round(nextX)+' / '+Math.round(nextY);
},signalListener);
function resetPortrait(nextSource){const pointer=dragPointer;if(dragging&&scene.releasePointerCapture)try{if(scene.hasPointerCapture(pointer))scene.releasePointerCapture(pointer)}catch(error){}stopScheduler('reset');directWeights.fill(0);revealStrengths.fill(0);trailStartStrengths.fill(0);trailStartedAt.fill(0);cellDistances.fill(Infinity);accentFlags.fill(0);renderBuckets.fill(0);lastUpdateBefore.fill(0);lastUpdateTarget.fill(0);lastUpdateAfter.fill(0);lastUpdateDelta.fill(0);activeTime=0;lastWall=0;pointerNormalizedX=.5;pointerNormalizedY=.5;pointerX=width/2;pointerY=height/2;pointerActive=false;pointerInside=false;dragging=false;dragPointer=-1;inputUpdates=0;pointerMoves=0;keyboardMoves=0;captures=0;nativeCaptures=0;releases=0;cancels=0;ignoredPointers=0;lastUpdateSource=nextSource||'reset';lastUpdateTime=0;lastUpdateAffected=0;lastUpdateIncrease=0;lastUpdateDecrease=0;resets++;renderPortrait();expose(nextSource||'reset');status.textContent='Portrait reset to ASCII'}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(documentVisible)startScheduler('document visible');else stopScheduler('document hidden')}
function cleanup(){stopScheduler('cleanup');eventController.abort();if(observer)observer.disconnect();if(resizeObserver)resizeObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
document.addEventListener('visibilitychange',onVisibility,signalListener);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(scene)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)startScheduler('intersection visible');else stopScheduler('intersection hidden')},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
root.__asciiPortraitInspect=function(){return{
  sourcePixels:Array.from(sourcePixels),cellSampleRgb:Array.from(cellSampleRgb),cellAverageLuma:Array.from(cellAverageLuma),cellLuminance:Array.from(cellLuminance),glyphIndices:Array.from(glyphIndices),directWeights:Array.from(directWeights),revealStrengths:Array.from(revealStrengths),trailStartStrengths:Array.from(trailStartStrengths),trailStartedAt:Array.from(trailStartedAt),cellDistances:Array.from(cellDistances),accentFlags:Array.from(accentFlags),renderBuckets:Array.from(renderBuckets),lastUpdate:{before:Array.from(lastUpdateBefore),target:Array.from(lastUpdateTarget),after:Array.from(lastUpdateAfter),delta:Array.from(lastUpdateDelta),source:lastUpdateSource,time:lastUpdateTime,affected:lastUpdateAffected,increase:lastUpdateIncrease,decrease:lastUpdateDecrease},data:Object.assign({},root.dataset)
}};
cellDistances.fill(Infinity);
buildSource();
resizeCanvas();
pointerX=width/2;
pointerY=height/2;
initialRevealChecksum=revealChecksum;
expose(reduced?'reduced':'initial')`,
  prompt:`Build a self-contained, responsive 320px-tall abstract ASCII portrait with a single focusable role-group root and a DPR-aware canvas. Numerically generate a deterministic 192 by 96 RGB source; never use a browser gradient or a real face. For each source-pixel center u=(x+0.5)/192 and v=(y+0.5)/96, define ellipse(cx,cy,rx,ry) as 1-smoothstep(0.84,1.08,hypot((u-cx)/rx,(v-cy)/ry)). The abstract bust mask is max(head,neck,shoulders) for head=(0.50,0.39,0.17,0.28), neck=(0.50,0.67,0.095,0.18), and shoulders=(0.50,0.91,0.47,0.29). Background light is 0.27+0.58*max(0,1-hypot((u-0.72)/0.88,(v-0.24)/0.82))^2. Bust light is 0.05+0.26*max(0,1-hypot((u-0.42)/0.34,(v-0.31)/0.52))^2+0.14*max(0,1-hypot((u-0.63)/0.20,(v-0.39)/0.40))^2.

Hash a coordinate with h=imul(x+1,374761393) XOR imul(y+1,668265263) XOR 0x9E3779B9, then h=imul(h XOR h>>>13,1274126177), and normalize (h XOR h>>>16) unsigned by 2^32. Add (fine-0.5)*0.025 plus the same hash at floor(x/4),floor(y/4) times 0.07. Tone is clamp(backgroundLight*(1-bust)+bustLight*bust+noise,0,1). Map tone channel-wise from bg2 [22,22,25] to txt0 [236,236,239] with rounded bytes. Average each non-overlapping 4 by 4 source block into one of exactly 48 by 24 sampled RGB cells. Compute Rec.709 luminance with [0.2126,0.7152,0.0722], normalize between the two palette endpoint luminances, and map through the rounded ten-step glyph ramp space-dot-colon-hyphen-equals-plus-asterisk-hash-percent-at. The default frame draws every non-space glyph once in #9b9ba3 on #0a0a0b and must read as a substantial abstract bust.

For a pointer at CSS-local coordinates, measure distance from every responsive cell center. Strictly inside radius 90px, target reveal is (1-distance/90)^2. Crossfade each cell from its one glyph into a full-cell rectangle using the actual rounded averaged grayscale. In the inner 12px of the radius boundary, choose #a78bfa as that cell's single glyph color; do not paint a txt1 glyph beneath it. When direct influence decreases, preserve the prior direct strength as a residual and linearly decay it to zero over exactly 600ms of active time; immediate increases are applied synchronously. Keep copied arrays for every source pixel, cell average, glyph, current direct target, distance, reveal, trail start and timestamp, accent flag, render bucket, plus coherent last-update before, target, after, and applied-delta evidence.

Use an event-driven scheduler: request animation frames only while a residual trail has time remaining. Advance an explicit active clock by each visible callback delta capped at 50ms, freeze it while offscreen or document-hidden, reset the wall timestamp on resume, and never catch up hidden time. Pointer input paints synchronously. Reduced motion schedules no animation frame at all: moving replaces the reveal instantly and leaving or clearing returns instantly to ASCII with no residual. Store the pointer normalized to scene width and height; a ResizeObserver changes canvas metrics, restores its CSS position from those normalized coordinates, and recomputes direct weights without advancing active time. Intersection, visibility, disconnection, and mutation lifecycles must stop scheduling and all observers/listeners must be disconnected on removal.

Pointer hover develops the portrait. Primary-left pointerdown focuses the root and captures one pointer ID; mismatched, secondary, cancel, lost-capture, release, and Escape paths are deterministic and counted. A captured release outside the scene clears the reveal, while an inside release preserves hover development. Register every scene, root, and document listener through one AbortController signal and abort it during cleanup. Arrow keys move a virtual cursor 12 CSS pixels, Shift by 36; Home centers it, Space toggles it, Escape clears it, and R returns to an inactive centered pointer with zero direct/reveal/trail arrays and the exact initial reveal checksum. Keep the polite status initially empty. Expose source formula constants and checksums, responsive metrics, render and input counts, reveal/accent/trail statistics, pointer and capture state, scheduler/visibility/reduced state, last-update scalar deltas, and a copied inspection hook for independent numerical validation.`
});
