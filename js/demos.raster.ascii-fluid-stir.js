window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'ascii-fluid-stir',
  title:'ASCII Fluid Stir',
  cat:'Raster & Glitch',
  rootClass:'d-ascii-fluid',
  tags:['ascii','canvas','fluid','advection'],
  libs:[],
  desc:'A deterministic 48 by 24 density and velocity field uses semi-Lagrangian advection, four-step pressure projection, two living emitters, and a pointer-driven velocity splat.',
  seen:'Seen in ASCII studio tools and glyph-fluid sketches by Vansh and itsgalo',
  hint:'drag to stir, use arrows, press Space to pause or step, and R to reset',
  html:`<div class="d-ascii-fluid" role="group" tabindex="0" aria-label="Interactive ASCII fluid. Drag to stir the velocity field. Arrow keys stir from the keyboard, Home centers the stirrer, Space pauses or advances the reduced-motion solver, Escape cancels a drag, and R resets." aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home Space Escape R">
  <header class="d-ascii-fluid-topbar"><span>INTRX / FLUID STIR</span><span>048x024 · 4J</span></header>
  <div class="d-ascii-fluid-scene">
    <canvas class="d-ascii-fluid-canvas" role="img" aria-label="Deterministic ASCII density and velocity field"></canvas>
    <div class="d-ascii-fluid-reticle" aria-hidden="true"><i></i></div>
  </div>
  <footer class="d-ascii-fluid-footer"><span class="d-ascii-fluid-density">DENSITY 0.000</span><span class="d-ascii-fluid-velocity">VELOCITY 0.000</span><span class="d-ascii-fluid-divergence">DIVERGENCE 0.0000</span></footer>
  <span class="d-ascii-fluid-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-ascii-fluid{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 10px;outline:none;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate;touch-action:none}
.d-ascii-fluid:before{content:'';position:absolute;inset:0;z-index:10;pointer-events:none;background:radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,.35) 100%)}
.d-ascii-fluid:focus-visible{box-shadow:inset 0 0 0 2px rgba(167,139,250,.72)}
.d-ascii-fluid-topbar,.d-ascii-fluid-footer{position:relative;z-index:12;display:flex;align-items:center;justify-content:space-between;min-width:0;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;text-transform:uppercase}
.d-ascii-fluid-scene{position:relative;z-index:2;min-width:0;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#101012;cursor:grab;user-select:none}.d-ascii-fluid-scene:active{cursor:grabbing}.d-ascii-fluid:focus-visible .d-ascii-fluid-scene,.d-ascii-fluid-scene:hover{border-color:#2e2e34}
.d-ascii-fluid-canvas{display:block;width:100%;height:100%}
.d-ascii-fluid-reticle{position:absolute;z-index:4;left:50%;top:50%;box-sizing:border-box;border:1px solid rgba(167,139,250,.72);border-radius:50%;opacity:0;box-shadow:0 0 12px rgba(167,139,250,.18);transform:translate(-50%,-50%);pointer-events:none}.d-ascii-fluid-reticle i{position:absolute;left:50%;top:50%;width:3px;height:3px;border-radius:50%;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.35);transform:translate(-50%,-50%)}.d-ascii-fluid[data-reticle-active="true"] .d-ascii-fluid-reticle{opacity:.9}
.d-ascii-fluid-footer{border-top:1px solid #232327;font-variant-numeric:tabular-nums}.d-ascii-fluid-density{color:#9b9ba3}.d-ascii-fluid-velocity{color:#ececef}.d-ascii-fluid-divergence{color:#5c5c66}.d-ascii-fluid[data-paused="true"] .d-ascii-fluid-velocity{color:#fbbf24}.d-ascii-fluid-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@container(max-width:340px){.d-ascii-fluid-footer{font-size:9px;letter-spacing:.04em}.d-ascii-fluid-footer span{white-space:nowrap}}
@media(prefers-reduced-motion:reduce){.d-ascii-fluid *{animation:none!important;transition:none!important}}
`,
  js:`const scene=root.querySelector('.d-ascii-fluid-scene');
const canvas=root.querySelector('.d-ascii-fluid-canvas');
const context=canvas.getContext('2d',{alpha:false});
const reticle=root.querySelector('.d-ascii-fluid-reticle');
const velocityLabel=root.querySelector('.d-ascii-fluid-velocity');
const divergenceLabel=root.querySelector('.d-ascii-fluid-divergence');
const densityLabel=root.querySelector('.d-ascii-fluid-density');
const status=root.querySelector('.d-ascii-fluid-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const gridColumns=48;
const gridRows=24;
const cellCount=gridColumns*gridRows;
const glyphRamp=' .:-=+*#%@';
const dissipation=.98;
const jacobiIterations=4;
const emitterDensity=.3;
const emitterHorizontalForce=.04;
const emitterUpwardForce=-.08;
const emitterDriftRate=.03;
const emitterCarrierRadius=3;
const emitterPositions=[[15,20],[32,20]];
const emitterPhases=[0,Math.PI];
const pointerGain=.6;
const splatRadius=3;
const velocityThreshold=.12;
const infoMix=.4;
const brightDensityThreshold=.72;
const divergenceScale=-.5;
const projectionScale=.5;
const targetFps=30;
const frameInterval=1000/targetFps;
const warmupSteps=180;
const interiorCount=(gridColumns-2)*(gridRows-2);
let density=new Float32Array(cellCount);
let densitySource=new Float32Array(cellCount);
let densityNext=new Float32Array(cellCount);
let velocityX=new Float32Array(cellCount);
let velocityY=new Float32Array(cellCount);
let velocitySourceX=new Float32Array(cellCount);
let velocitySourceY=new Float32Array(cellCount);
let velocityNextX=new Float32Array(cellCount);
let velocityNextY=new Float32Array(cellCount);
let divergence=new Float32Array(cellCount);
let projectedDivergence=new Float32Array(cellCount);
let pressure=new Float32Array(cellCount);
let pressureNext=new Float32Array(cellCount);
let preEmitterDensity=new Float32Array(cellCount);
let preEmitterVelocityX=new Float32Array(cellCount);
let preEmitterVelocityY=new Float32Array(cellCount);
let advectedVelocityX=new Float32Array(cellCount);
let advectedVelocityY=new Float32Array(cellCount);
let pressurePasses=Array.from({length:jacobiIterations},function(){return new Float32Array(cellCount)});
let projectedVelocityX=new Float32Array(cellCount);
let projectedVelocityY=new Float32Array(cellCount);
let advectedDensity=new Float32Array(cellCount);
let lastGlyphIndices=new Int8Array(cellCount);
let lastInfoFlags=new Uint8Array(cellCount);
let lastGlyphBuckets=new Int8Array(cellCount);
let lastSplatWeights=new Float32Array(cellCount);
let lastSplatBeforeVelocityX=new Float32Array(cellCount);
let lastSplatBeforeVelocityY=new Float32Array(cellCount);
let lastSplatAfterVelocityX=new Float32Array(cellCount);
let lastSplatAfterVelocityY=new Float32Array(cellCount);
let lastSplatBeforeDensity=new Float32Array(cellCount);
let lastSplatAfterDensity=new Float32Array(cellCount);
let width=1;
let height=1;
let dpr=1;
let solverStep=0;
let renderFrames=0;
let manualFrames=0;
let rafFrames=0;
let simulationTime=0;
let accumulator=0;
let lastRenderAt=0;
let renderGap=0;
let emitterHorizontalA=0;
let emitterHorizontalB=0;
let lastEmitterStep=-1;
let divergenceBeforeAverage=0;
let divergenceBeforeMaximum=0;
let divergenceAfterAverage=0;
let divergenceAfterMaximum=0;
let pressureIterationsLast=0;
let densityMinimum=0;
let densityMaximum=0;
let densityAverage=0;
let densityTotal=0;
let velocityAverage=0;
let velocityMaximum=0;
let velocityEnergy=0;
let highVelocityCells=0;
let infoGlyphCells=0;
let occupiedGlyphs=0;
let glyphsUsed='';
let glyphBucketCounts='0,0,0,0';
let densityChecksum='00000000';
let velocityXChecksum='00000000';
let velocityYChecksum='00000000';
let pressureChecksum='00000000';
let glyphChecksum='00000000';
let initialDensityChecksum='';
let initialVelocityXChecksum='';
let initialVelocityYChecksum='';
let initialGlyphChecksum='';
let fontSize=0;
let maxGlyphAdvance=0;
let colorBuckets=0;
let dragging=false;
let dragPointer=-1;
let pointerInside=false;
let reticleActive=false;
let pointerMoves=0;
let pointerDistance=0;
let pointerGridX=(gridColumns-1)/2;
let pointerGridY=(gridRows-1)/2;
let lastPointerGridX=pointerGridX;
let lastPointerGridY=pointerGridY;
let lastPointerDeltaX=0;
let lastPointerDeltaY=0;
let lastInjectedX=0;
let lastInjectedY=0;
let lastSplatCells=0;
let lastSplatWeight=0;
let lastSplatCenterX=pointerGridX;
let lastSplatCenterY=pointerGridY;
let splats=0;
let captures=0;
let nativeCaptures=0;
let releases=0;
let cancels=0;
let ignoredPointers=0;
let resets=0;
let paused=false;
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
function checksum(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')}
function sampleBilinear(field,x,y){
  const sampleX=clamp(x,0,gridColumns-1);
  const sampleY=clamp(y,0,gridRows-1);
  const x0=Math.floor(sampleX),y0=Math.floor(sampleY);
  const x1=Math.min(gridColumns-1,x0+1),y1=Math.min(gridRows-1,y0+1);
  const tx=sampleX-x0,ty=sampleY-y0;
  const top=field[y0*gridColumns+x0]*(1-tx)+field[y0*gridColumns+x1]*tx;
  const bottom=field[y1*gridColumns+x0]*(1-tx)+field[y1*gridColumns+x1]*tx;
  return top*(1-ty)+bottom*ty;
}
function enforceVelocityBoundaries(fieldX,fieldY){
  for(let x=0;x<gridColumns;x++){fieldX[x]=0;fieldY[x]=0;const bottom=(gridRows-1)*gridColumns+x;fieldX[bottom]=0;fieldY[bottom]=0}
  for(let y=0;y<gridRows;y++){const left=y*gridColumns,right=left+gridColumns-1;fieldX[left]=0;fieldY[left]=0;fieldX[right]=0;fieldY[right]=0}
}
function stepFluid(){
  preEmitterDensity.set(density);
  preEmitterVelocityX.set(velocityX);
  preEmitterVelocityY.set(velocityY);
  densitySource.set(density);
  velocitySourceX.set(velocityX);
  velocitySourceY.set(velocityY);
  lastEmitterStep=solverStep;
  emitterHorizontalA=Math.sin(lastEmitterStep*emitterDriftRate+emitterPhases[0])*emitterHorizontalForce;
  emitterHorizontalB=Math.sin(lastEmitterStep*emitterDriftRate+emitterPhases[1])*emitterHorizontalForce;
  for(let emitter=0;emitter<emitterPositions.length;emitter++){
    const position=emitterPositions[emitter],index=position[1]*gridColumns+position[0];
    densitySource[index]=clamp(densitySource[index]+emitterDensity,0,1);
    const horizontal=emitter===0?emitterHorizontalA:emitterHorizontalB;
    for(let y=Math.max(0,position[1]-emitterCarrierRadius);y<=Math.min(gridRows-1,position[1]+emitterCarrierRadius);y++)for(let x=Math.max(0,position[0]-emitterCarrierRadius);x<=Math.min(gridColumns-1,position[0]+emitterCarrierRadius);x++){
      const distance=Math.hypot(x-position[0],y-position[1]);
      if(distance>=emitterCarrierRadius)continue;
      const influence=1-distance/emitterCarrierRadius;
      const weight=influence*influence;
      const carrierIndex=y*gridColumns+x;
      velocitySourceX[carrierIndex]+=horizontal*weight;
      velocitySourceY[carrierIndex]+=emitterUpwardForce*weight;
    }
  }
  velocityNextX.fill(0);
  velocityNextY.fill(0);
  for(let y=1;y<gridRows-1;y++)for(let x=1;x<gridColumns-1;x++){
    const index=y*gridColumns+x;
    const backX=x-velocitySourceX[index],backY=y-velocitySourceY[index];
    velocityNextX[index]=sampleBilinear(velocitySourceX,backX,backY)*dissipation;
    velocityNextY[index]=sampleBilinear(velocitySourceY,backX,backY)*dissipation;
  }
  enforceVelocityBoundaries(velocityNextX,velocityNextY);
  advectedVelocityX.set(velocityNextX);
  advectedVelocityY.set(velocityNextY);
  divergence.fill(0);
  pressure.fill(0);
  pressureNext.fill(0);
  let divergenceTotal=0,divergenceMaximum=0;
  for(let y=1;y<gridRows-1;y++)for(let x=1;x<gridColumns-1;x++){
    const index=y*gridColumns+x;
    const value=divergenceScale*((velocityNextX[index+1]-velocityNextX[index-1])+(velocityNextY[index+gridColumns]-velocityNextY[index-gridColumns]));
    divergence[index]=value;
    const absolute=Math.abs(value);
    divergenceTotal+=absolute;
    divergenceMaximum=Math.max(divergenceMaximum,absolute);
  }
  divergenceBeforeAverage=divergenceTotal/interiorCount;
  divergenceBeforeMaximum=divergenceMaximum;
  for(let iteration=0;iteration<jacobiIterations;iteration++){
    pressureNext.fill(0);
    for(let y=1;y<gridRows-1;y++)for(let x=1;x<gridColumns-1;x++){
      const index=y*gridColumns+x;
      pressureNext[index]=(divergence[index]+pressure[index-1]+pressure[index+1]+pressure[index-gridColumns]+pressure[index+gridColumns])*.25;
    }
    pressurePasses[iteration].set(pressureNext);
    const swap=pressure;pressure=pressureNext;pressureNext=swap;
  }
  pressureIterationsLast=jacobiIterations;
  for(let y=1;y<gridRows-1;y++)for(let x=1;x<gridColumns-1;x++){
    const index=y*gridColumns+x;
    velocityNextX[index]-=projectionScale*(pressure[index+1]-pressure[index-1]);
    velocityNextY[index]-=projectionScale*(pressure[index+gridColumns]-pressure[index-gridColumns]);
  }
  enforceVelocityBoundaries(velocityNextX,velocityNextY);
  velocityX.set(velocityNextX);
  velocityY.set(velocityNextY);
  projectedVelocityX.set(velocityX);
  projectedVelocityY.set(velocityY);
  projectedDivergence.fill(0);
  let projectedTotal=0,projectedMaximum=0;
  for(let y=1;y<gridRows-1;y++)for(let x=1;x<gridColumns-1;x++){
    const index=y*gridColumns+x;
    const value=divergenceScale*((velocityX[index+1]-velocityX[index-1])+(velocityY[index+gridColumns]-velocityY[index-gridColumns]));
    projectedDivergence[index]=value;
    const absolute=Math.abs(value);
    projectedTotal+=absolute;
    projectedMaximum=Math.max(projectedMaximum,absolute);
  }
  divergenceAfterAverage=projectedTotal/interiorCount;
  divergenceAfterMaximum=projectedMaximum;
  for(let y=0;y<gridRows;y++)for(let x=0;x<gridColumns;x++){
    const index=y*gridColumns+x;
    densityNext[index]=clamp(sampleBilinear(densitySource,x-velocityX[index],y-velocityY[index])*dissipation,0,1);
  }
  const densitySwap=density;density=densityNext;densityNext=densitySwap;
  advectedDensity.set(density);
  solverStep++;
}
function applySplat(gridX,gridY,deltaX,deltaY){
  lastSplatBeforeVelocityX.set(velocityX);
  lastSplatBeforeVelocityY.set(velocityY);
  lastSplatBeforeDensity.set(density);
  lastSplatWeights.fill(0);
  lastSplatCenterX=gridX;
  lastSplatCenterY=gridY;
  lastPointerDeltaX=deltaX;
  lastPointerDeltaY=deltaY;
  lastInjectedX=deltaX*pointerGain;
  lastInjectedY=deltaY*pointerGain;
  lastSplatCells=0;
  lastSplatWeight=0;
  if(deltaX===0&&deltaY===0){
    lastSplatAfterVelocityX.set(velocityX);
    lastSplatAfterVelocityY.set(velocityY);
    lastSplatAfterDensity.set(density);
    return false;
  }
  const minX=Math.max(0,Math.floor(gridX-splatRadius)),maxX=Math.min(gridColumns-1,Math.ceil(gridX+splatRadius));
  const minY=Math.max(0,Math.floor(gridY-splatRadius)),maxY=Math.min(gridRows-1,Math.ceil(gridY+splatRadius));
  for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
    const distance=Math.hypot(x-gridX,y-gridY);
    if(distance>=splatRadius)continue;
    const influence=Math.max(0,1-distance/splatRadius);
    const weight=influence*influence;
    if(weight<=0)continue;
    const index=y*gridColumns+x;
    velocityX[index]+=lastInjectedX*weight;
    velocityY[index]+=lastInjectedY*weight;
    lastSplatWeights[index]=weight;
    lastSplatCells++;
    lastSplatWeight+=weight;
  }
  enforceVelocityBoundaries(velocityX,velocityY);
  lastSplatAfterVelocityX.set(velocityX);
  lastSplatAfterVelocityY.set(velocityY);
  lastSplatAfterDensity.set(density);
  splats++;
  return true;
}
function renderFluid(){
  const cellWidth=width/gridColumns,cellHeight=height/gridRows;
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
  const buckets=new Map(),used=new Set(),bucketCounts=[0,0,0,0];
  let totalDensity=0,totalVelocity=0,totalEnergy=0;
  densityMinimum=1;
  densityMaximum=0;
  velocityMaximum=0;
  highVelocityCells=0;
  infoGlyphCells=0;
  occupiedGlyphs=0;
  for(let index=0;index<cellCount;index++){
    const value=clamp(density[index],0,1);
    const speed=Math.hypot(velocityX[index],velocityY[index]);
    const glyphIndex=clamp(Math.round(value*(glyphRamp.length-1)),0,glyphRamp.length-1);
    const glyph=glyphRamp[glyphIndex];
    const info=speed>velocityThreshold;
    const bright=value>=brightDensityThreshold;
    lastGlyphIndices[index]=glyphIndex;
    lastInfoFlags[index]=info?1:0;
    const bucket=info?(bright?3:2):(bright?1:0);
    lastGlyphBuckets[index]=bucket;
    bucketCounts[bucket]++;
    totalDensity+=value;
    totalVelocity+=speed;
    totalEnergy+=speed*speed;
    densityMinimum=Math.min(densityMinimum,value);
    densityMaximum=Math.max(densityMaximum,value);
    velocityMaximum=Math.max(velocityMaximum,speed);
    if(info)highVelocityCells++;
    used.add(glyph);
    if(glyph===' ')continue;
    occupiedGlyphs++;
    if(info)infoGlyphCells++;
    const color=info?(bright?'rgb(183,234,243)':'rgb(134,186,197)'):(bright?'#ececef':'#9b9ba3');
    if(!buckets.has(color))buckets.set(color,[]);
    const x=index%gridColumns,y=Math.floor(index/gridColumns);
    buckets.get(color).push([glyph,(x+.5)*cellWidth,(y+.5)*cellHeight]);
  }
  buckets.forEach(function(cells,color){context.fillStyle=color;cells.forEach(function(cell){context.fillText(cell[0],cell[1],cell[2])})});
  densityTotal=totalDensity;
  densityAverage=totalDensity/cellCount;
  velocityAverage=totalVelocity/cellCount;
  velocityEnergy=totalEnergy/cellCount;
  colorBuckets=buckets.size;
  glyphBucketCounts=bucketCounts.join(',');
  glyphsUsed=[...glyphRamp].filter(function(glyph){return used.has(glyph)}).join('');
  densityChecksum=checksum(density,10000);
  velocityXChecksum=checksum(velocityX,10000);
  velocityYChecksum=checksum(velocityY,10000);
  pressureChecksum=checksum(pressure,10000);
  glyphChecksum=checksum(lastGlyphIndices,1);
  velocityLabel.textContent='VELOCITY '+velocityMaximum.toFixed(3);
  divergenceLabel.textContent='DIVERGENCE '+divergenceAfterAverage.toFixed(4);
  densityLabel.textContent='DENSITY '+densityAverage.toFixed(3);
  reticle.style.left=((pointerGridX+.5)*cellWidth).toFixed(2)+'px';
  reticle.style.top=((pointerGridY+.5)*cellHeight).toFixed(2)+'px';
  reticle.style.width=(splatRadius*2*cellWidth).toFixed(2)+'px';
  reticle.style.height=(splatRadius*2*cellHeight).toFixed(2)+'px';
}
function expose(nextSource){
  if(nextSource)source=nextSource;
  root.dataset.gridColumns=String(gridColumns);
  root.dataset.gridRows=String(gridRows);
  root.dataset.cellCount=String(cellCount);
  root.dataset.glyphRamp=glyphRamp;
  root.dataset.dissipation=String(dissipation);
  root.dataset.jacobiIterations=String(jacobiIterations);
  root.dataset.emitterCount=String(emitterPositions.length);
  root.dataset.emitterPositions=emitterPositions.map(function(position){return position.join(',')}).join(';');
  root.dataset.emitterDensity=String(emitterDensity);
  root.dataset.emitterHorizontalForce=String(emitterHorizontalForce);
  root.dataset.emitterUpwardForce=String(emitterUpwardForce);
  root.dataset.emitterDriftRate=String(emitterDriftRate);
  root.dataset.emitterCarrierRadius=String(emitterCarrierRadius);
  root.dataset.emitterCarrierFalloff='squared';
  root.dataset.emitterHorizontal=emitterHorizontalA.toFixed(5)+','+emitterHorizontalB.toFixed(5);
  root.dataset.emitterPhases='0,pi';
  root.dataset.emitterStep=String(lastEmitterStep);
  root.dataset.pointerGain=String(pointerGain);
  root.dataset.splatRadius=String(splatRadius);
  root.dataset.splatFalloff='squared';
  root.dataset.velocityThreshold=String(velocityThreshold);
  root.dataset.infoMix=String(infoMix);
  root.dataset.brightDensityThreshold=String(brightDensityThreshold);
  root.dataset.divergenceScale=String(divergenceScale);
  root.dataset.projectionScale=String(projectionScale);
  root.dataset.renderColors='#9b9ba3,#ececef,rgb(134 186 197),rgb(183 234 243)';
  root.dataset.targetFps=String(targetFps);
  root.dataset.frameInterval=frameInterval.toFixed(3);
  root.dataset.warmupSteps=String(warmupSteps);
  root.dataset.boundaryMode='solid-clamp';
  root.dataset.advection='semi-lagrangian';
  root.dataset.interpolation='bilinear';
  root.dataset.solverStep=String(solverStep);
  root.dataset.renderFrames=String(renderFrames);
  root.dataset.manualFrames=String(manualFrames);
  root.dataset.rafFrames=String(rafFrames);
  root.dataset.simulationTime=simulationTime.toFixed(1);
  root.dataset.lastRenderAt=lastRenderAt.toFixed(1);
  root.dataset.renderGap=renderGap.toFixed(1);
  root.dataset.pressureIterationsLast=String(pressureIterationsLast);
  root.dataset.divergenceBeforeAverage=divergenceBeforeAverage.toFixed(6);
  root.dataset.divergenceBeforeMaximum=divergenceBeforeMaximum.toFixed(6);
  root.dataset.divergenceAfterAverage=divergenceAfterAverage.toFixed(6);
  root.dataset.divergenceAfterMaximum=divergenceAfterMaximum.toFixed(6);
  root.dataset.densityMinimum=densityMinimum.toFixed(6);
  root.dataset.densityMaximum=densityMaximum.toFixed(6);
  root.dataset.densityAverage=densityAverage.toFixed(6);
  root.dataset.densityTotal=densityTotal.toFixed(6);
  root.dataset.velocityAverage=velocityAverage.toFixed(6);
  root.dataset.velocityMaximum=velocityMaximum.toFixed(6);
  root.dataset.velocityEnergy=velocityEnergy.toFixed(6);
  root.dataset.highVelocityCells=String(highVelocityCells);
  root.dataset.infoGlyphCells=String(infoGlyphCells);
  root.dataset.occupiedGlyphs=String(occupiedGlyphs);
  root.dataset.glyphsUsed=glyphsUsed;
  root.dataset.colorBuckets=String(colorBuckets);
  root.dataset.glyphBucketCounts=glyphBucketCounts;
  root.dataset.densityChecksum=densityChecksum;
  root.dataset.velocityXChecksum=velocityXChecksum;
  root.dataset.velocityYChecksum=velocityYChecksum;
  root.dataset.pressureChecksum=pressureChecksum;
  root.dataset.glyphChecksum=glyphChecksum;
  root.dataset.initialDensityChecksum=initialDensityChecksum||densityChecksum;
  root.dataset.initialVelocityXChecksum=initialVelocityXChecksum||velocityXChecksum;
  root.dataset.initialVelocityYChecksum=initialVelocityYChecksum||velocityYChecksum;
  root.dataset.initialGlyphChecksum=initialGlyphChecksum||glyphChecksum;
  root.dataset.dragging=String(dragging);
  root.dataset.dragPointer=String(dragPointer);
  root.dataset.pointerInside=String(pointerInside);
  root.dataset.reticleActive=String(reticleActive);
  root.dataset.pointerMoves=String(pointerMoves);
  root.dataset.pointerDistance=pointerDistance.toFixed(4);
  root.dataset.pointerGrid=pointerGridX.toFixed(4)+','+pointerGridY.toFixed(4);
  root.dataset.lastPointerDelta=lastPointerDeltaX.toFixed(4)+','+lastPointerDeltaY.toFixed(4);
  root.dataset.lastInjectedVelocity=lastInjectedX.toFixed(4)+','+lastInjectedY.toFixed(4);
  root.dataset.lastSplatCells=String(lastSplatCells);
  root.dataset.lastSplatWeight=lastSplatWeight.toFixed(6);
  root.dataset.splats=String(splats);
  root.dataset.captures=String(captures);
  root.dataset.nativeCaptures=String(nativeCaptures);
  root.dataset.releases=String(releases);
  root.dataset.cancels=String(cancels);
  root.dataset.ignoredPointers=String(ignoredPointers);
  root.dataset.resets=String(resets);
  root.dataset.fontSize=fontSize.toFixed(2);
  root.dataset.maxGlyphAdvance=maxGlyphAdvance.toFixed(3);
  root.dataset.canvasWidth=String(canvas.width);
  root.dataset.canvasHeight=String(canvas.height);
  root.dataset.canvasClientWidth=String(canvas.clientWidth);
  root.dataset.canvasClientHeight=String(canvas.clientHeight);
  root.dataset.cellWidth=(width/gridColumns).toFixed(4);
  root.dataset.cellHeight=(height/gridRows).toFixed(4);
  root.dataset.dpr=dpr.toFixed(2);
  root.dataset.paused=String(paused);
  root.dataset.running=String(running);
  root.dataset.reduced=String(reduced);
  root.dataset.visible=String(visible);
  root.dataset.documentVisible=String(documentVisible);
  root.dataset.source=source;
  root.dataset.pointerInside=String(pointerInside);
}
function resizeCanvas(){
  width=Math.max(1,scene.clientWidth);
  height=Math.max(1,scene.clientHeight);
  dpr=Math.min(2,window.devicePixelRatio||1);
  canvas.width=Math.round(width*dpr);
  canvas.height=Math.round(height*dpr);
  context.setTransform(dpr,0,0,dpr,0,0);
  renderFluid();
  expose('resize');
}
function gridPoint(event){
  const box=scene.getBoundingClientRect();
  const localX=event.clientX-box.left-scene.clientLeft;
  const localY=event.clientY-box.top-scene.clientTop;
  return{x:clamp(localX/Math.max(1,scene.clientWidth)*gridColumns-.5,0,gridColumns-1),y:clamp(localY/Math.max(1,scene.clientHeight)*gridRows-.5,0,gridRows-1)};
}
function manualStep(nextSource){stepFluid();manualFrames++;renderFluid();expose(nextSource)}
function renderInput(nextSource){renderFluid();expose(nextSource)}
function finishDrag(cancelled){
  if(!dragging)return;
  const pointer=dragPointer;
  dragging=false;
  dragPointer=-1;
  reticleActive=false;
  if(cancelled)cancels++;else releases++;
  if(scene.releasePointerCapture)try{if(scene.hasPointerCapture(pointer))scene.releasePointerCapture(pointer)}catch(error){}
  status.textContent=cancelled?'Fluid stir cancelled':reduced?'Static fluid updated':'Velocity splat released';
  expose(cancelled?'pointer cancel':'pointer release');
}
scene.addEventListener('pointerdown',function(event){
  if(event.button!==0||event.isPrimary===false||dragging){ignoredPointers++;expose('pointer ignored');return}
  root.focus({preventScroll:true});
  const point=gridPoint(event);
  pointerGridX=point.x;
  pointerGridY=point.y;
  lastPointerGridX=point.x;
  lastPointerGridY=point.y;
  pointerInside=true;
  reticleActive=true;
  dragging=true;
  dragPointer=event.pointerId;
  captures++;
  if(scene.setPointerCapture)try{scene.setPointerCapture(event.pointerId);nativeCaptures++}catch(error){}
  status.textContent='Fluid stir captured';
  expose('pointer start');
},{passive:true});
scene.addEventListener('pointermove',function(event){
  if(!dragging)return;
  if(event.pointerId!==dragPointer){ignoredPointers++;expose('pointer ignored');return}
  const point=gridPoint(event),deltaX=point.x-lastPointerGridX,deltaY=point.y-lastPointerGridY;
  pointerGridX=point.x;
  pointerGridY=point.y;
  lastPointerGridX=point.x;
  lastPointerGridY=point.y;
  if(deltaX===0&&deltaY===0)return;
  pointerMoves++;
  pointerDistance+=Math.hypot(deltaX,deltaY);
  if(!applySplat(point.x,point.y,deltaX,deltaY))return;
  status.textContent='Velocity '+lastInjectedX.toFixed(2)+' / '+lastInjectedY.toFixed(2);
  if(reduced)manualStep('pointer stir');else renderInput('pointer stir');
},{passive:true});
scene.addEventListener('pointerup',function(event){if(event.pointerId===dragPointer)finishDrag(false);else if(dragging){ignoredPointers++;expose('pointer ignored')}},{passive:true});
scene.addEventListener('pointercancel',function(event){if(event.pointerId===dragPointer)finishDrag(true);else if(dragging){ignoredPointers++;expose('pointer ignored')}},{passive:true});
scene.addEventListener('lostpointercapture',function(event){if(event.pointerId===dragPointer)finishDrag(true);else if(dragging){ignoredPointers++;expose('pointer ignored')}},{passive:true});
scene.addEventListener('pointerenter',function(event){if(dragging)return;const point=gridPoint(event);pointerGridX=point.x;pointerGridY=point.y;pointerInside=true;reticleActive=false;renderInput('pointer enter')},{passive:true});
scene.addEventListener('pointerleave',function(){if(dragging)return;pointerInside=false;reticleActive=false;expose('pointer leave')},{passive:true});
root.addEventListener('keydown',function(event){
  const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home',' ','Escape','r','R'];
  if(!keys.includes(event.key))return;
  event.preventDefault();
  if(event.key==='Escape'){
    if(dragging)finishDrag(true);else{reticleActive=false;expose('keyboard cancel')}
    status.textContent='Fluid stir cancelled';
    return;
  }
  if(event.key==='r'||event.key==='R'){if(event.repeat)return;resetField('keyboard reset');return}
  if(event.key===' '){
    if(event.repeat)return;
    if(reduced){manualStep('keyboard step');status.textContent='Static solver advanced one frame'}
    else{paused=!paused;status.textContent=paused?'Fluid solver paused':'Fluid solver resumed';if(paused)stop('keyboard pause');else start('keyboard pause')}
    return;
  }
  if(event.key==='Home'){
    pointerGridX=(gridColumns-1)/2;
    pointerGridY=(gridRows-1)/2;
    pointerInside=true;
    reticleActive=false;
    status.textContent='Stirrer centered';
    renderInput('keyboard center');
    return;
  }
  const amount=event.shiftKey?3:1;
  const deltaX=event.key==='ArrowRight'?amount:event.key==='ArrowLeft'?-amount:0;
  const deltaY=event.key==='ArrowDown'?amount:event.key==='ArrowUp'?-amount:0;
  const nextX=clamp(pointerGridX+deltaX,0,gridColumns-1),nextY=clamp(pointerGridY+deltaY,0,gridRows-1);
  const actualX=nextX-pointerGridX,actualY=nextY-pointerGridY;
  pointerGridX=nextX;
  pointerGridY=nextY;
  pointerInside=true;
  reticleActive=true;
  pointerMoves++;
  pointerDistance+=Math.hypot(actualX,actualY);
  if(!applySplat(pointerGridX,pointerGridY,actualX,actualY)){renderInput('keyboard boundary');return}
  status.textContent='Keyboard velocity '+lastInjectedX.toFixed(2)+' / '+lastInjectedY.toFixed(2);
  if(reduced)manualStep('keyboard stir');else renderInput('keyboard stir');
});
function canRun(){return !reduced&&!paused&&visible&&documentVisible&&root.isConnected}
function stop(nextSource){if(frameId)cancelAnimationFrame(frameId);frameId=0;running=false;expose(nextSource||'pause')}
function start(nextSource){if(!canRun()||running)return;running=true;lastFrame=performance.now();expose(nextSource||'start');frameId=requestAnimationFrame(frame)}
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
    stepFluid();
    renderFrames++;
    renderGap=lastRenderAt?simulationTime-lastRenderAt:0;
    lastRenderAt=simulationTime;
    renderFluid();
    expose('frame');
  }
  frameId=requestAnimationFrame(frame);
}
function resetField(nextSource){
  const capturedPointer=dragPointer;
  if(dragging&&scene.releasePointerCapture)try{if(scene.hasPointerCapture(capturedPointer))scene.releasePointerCapture(capturedPointer)}catch(error){}
  stop('reset');
  density.fill(0);densitySource.fill(0);densityNext.fill(0);
  velocityX.fill(0);velocityY.fill(0);velocitySourceX.fill(0);velocitySourceY.fill(0);velocityNextX.fill(0);velocityNextY.fill(0);
  divergence.fill(0);projectedDivergence.fill(0);pressure.fill(0);pressureNext.fill(0);
  preEmitterDensity.fill(0);preEmitterVelocityX.fill(0);preEmitterVelocityY.fill(0);advectedVelocityX.fill(0);advectedVelocityY.fill(0);projectedVelocityX.fill(0);projectedVelocityY.fill(0);advectedDensity.fill(0);
  pressurePasses.forEach(function(pass){pass.fill(0)});lastSplatWeights.fill(0);lastSplatBeforeVelocityX.fill(0);lastSplatBeforeVelocityY.fill(0);lastSplatAfterVelocityX.fill(0);lastSplatAfterVelocityY.fill(0);lastSplatBeforeDensity.fill(0);lastSplatAfterDensity.fill(0);
  solverStep=0;renderFrames=0;manualFrames=0;rafFrames=0;simulationTime=0;accumulator=0;lastRenderAt=0;renderGap=0;
  dragging=false;dragPointer=-1;pointerInside=false;reticleActive=false;pointerMoves=0;pointerDistance=0;pointerGridX=(gridColumns-1)/2;pointerGridY=(gridRows-1)/2;lastPointerGridX=pointerGridX;lastPointerGridY=pointerGridY;
  lastPointerDeltaX=0;lastPointerDeltaY=0;lastInjectedX=0;lastInjectedY=0;lastSplatCells=0;lastSplatWeight=0;lastSplatCenterX=pointerGridX;lastSplatCenterY=pointerGridY;splats=0;captures=0;nativeCaptures=0;releases=0;cancels=0;ignoredPointers=0;paused=false;resets++;
  for(let step=0;step<warmupSteps;step++)stepFluid();
  renderFluid();
  expose(nextSource||'reset');
  status.textContent=reduced?'Static fluid reset':'Fluid field reset';
  if(!reduced)start(nextSource||'reset');
}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(documentVisible)start();else stop()}
document.addEventListener('visibilitychange',onVisibility);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(scene)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
root.__asciiFluidInspect=function(){return{
  preEmitterDensity:Array.from(preEmitterDensity),
  preEmitterVelocityX:Array.from(preEmitterVelocityX),
  preEmitterVelocityY:Array.from(preEmitterVelocityY),
  postEmitterDensity:Array.from(densitySource),
  postEmitterVelocityX:Array.from(velocitySourceX),
  postEmitterVelocityY:Array.from(velocitySourceY),
  advectedVelocityX:Array.from(advectedVelocityX),
  advectedVelocityY:Array.from(advectedVelocityY),
  divergence:Array.from(divergence),
  pressurePasses:pressurePasses.map(function(pass){return Array.from(pass)}),
  pressure:Array.from(pressure),
  projectedVelocityX:Array.from(projectedVelocityX),
  projectedVelocityY:Array.from(projectedVelocityY),
  projectedDivergence:Array.from(projectedDivergence),
  advectedDensity:Array.from(advectedDensity),
  density:Array.from(density),
  velocityX:Array.from(velocityX),
  velocityY:Array.from(velocityY),
  glyphIndices:Array.from(lastGlyphIndices),
  infoFlags:Array.from(lastInfoFlags),
  glyphBuckets:Array.from(lastGlyphBuckets),
  splat:{
    beforeVelocityX:Array.from(lastSplatBeforeVelocityX),
    beforeVelocityY:Array.from(lastSplatBeforeVelocityY),
    afterVelocityX:Array.from(lastSplatAfterVelocityX),
    afterVelocityY:Array.from(lastSplatAfterVelocityY),
    beforeDensity:Array.from(lastSplatBeforeDensity),
    afterDensity:Array.from(lastSplatAfterDensity),
    weights:Array.from(lastSplatWeights),
    center:[lastSplatCenterX,lastSplatCenterY],
    delta:[lastPointerDeltaX,lastPointerDeltaY],
    impulse:[lastInjectedX,lastInjectedY],
    cells:lastSplatCells,
    weight:lastSplatWeight
  },
  data:Object.assign({},root.dataset)
}};
for(let step=0;step<warmupSteps;step++)stepFluid();
resizeCanvas();
initialDensityChecksum=densityChecksum;
initialVelocityXChecksum=velocityXChecksum;
initialVelocityYChecksum=velocityYChecksum;
initialGlyphChecksum=glyphChecksum;
expose(reduced?'reduced':'initial');
if(!reduced)start()`,
  prompt:`Build a self-contained 320px-tall ASCII fluid solver on a DPR-aware canvas. Use exact 48 by 24 Float32 density, horizontal-velocity, and vertical-velocity fields, the exact density ramp space-dot-colon-hyphen-equals-plus-asterisk-hash-percent-at, a fixed logical timestep, 0.98 dissipation, semi-Lagrangian bilinear advection, solid zero-velocity boundaries, clamped sample coordinates, and exactly four Jacobi pressure iterations. Warm the deterministic field for exactly 180 logical steps before its first paint so normal and reduced-motion modes share the same mature initial checksums.

On each logical step copy the current fields to source arrays. At fixed grid anchors (15,20) and (32,20), set each source density to clamp(source+0.3,0,1). Give each emitter a deterministic radius-three carrier field with squared falloff: add horizontal velocity sin(step*0.03+phase)*0.04 with phases zero and pi, plus vertical velocity -0.08, multiplied at each carrier cell by (1-distance/3)^2. Self-advect both source velocity components by tracing from each interior destination to x-u and y-v, bilinearly sampling, and multiplying by 0.98. Zero all velocity boundary cells. Compute divergence as -0.5 times the sum of the centered horizontal and vertical velocity differences, clear pressure, run exactly four Jacobi swaps using (divergence plus the four neighboring pressures)/4, subtract the centered pressure gradient from velocity, and zero velocity boundaries again. Finally advect the emitter-injected density source through the projected velocity, multiply by 0.98, and clamp density to zero through one. This makes an unforced disturbance retain roughly 0.98^180 after six seconds at 30fps while two localized emitter wisps remain alive.

Map rounded normalized density through the exact ten-character glyph ramp. Use exactly four render buckets: density below 0.72 uses #9b9ba3 and density at or above 0.72 uses #ececef; when velocity magnitude is strictly greater than 0.12, replace those with their exact 40-percent info mixes rgb(134,186,197) and rgb(183,234,243). Skip space glyphs and batch fillText calls by these four colors. Draw every glyph at the exact center of its cell. Clear with #0a0a0b, cap the font at 11px and by cell height, and shrink it until the widest measured ramp glyph fits one of the 48 responsive columns. Keep the scene visually sparse: two pale braided plumes, no grid, scanlines, corner brackets, live dot, or HUD overlays. Put 048x024 and 4J in the 10px header; put density, maximum velocity, and projected divergence in the 10px footer. Lavender appears only as the soft active radius-three stir halo and its center dot.

Make the single role-group root the only focus target and give it an accessible label, visible focus ring, keyboard shortcut metadata, and an initially empty polite atomic status. Pointerdown on the scene accepts only the primary left pointer, focuses the root, and captures that pointer ID; mismatched or secondary events are ignored and counted. Convert CSS coordinates into cell-center grid coordinates with x/width*48-0.5 and y/height*24-0.5. During a captured drag, derive pointer delta in grid cells and inject velocity delta*0.6. Visit every integer cell strictly within radius three and multiply the injected vector by the squared falloff (1-distance/3)^2, then reassert solid zero velocity at boundary cells while preserving their attempted splat weights in inspection telemetry. Pointer listeners are passive where possible, and pointerup, cancel, lost capture, Escape, or a reset during capture end cleanly with native capture release plus capture, release, cancel, and ignored-event telemetry. Arrow keys move a virtual stirrer by one cell, Shift by three, and apply the same gain and splat; Home centers without injection; Space pauses or resumes; R performs an exact deterministic reset.

Run at a measured 30fps cap inside one active-time requestAnimationFrame scheduler. Cap each active delta at 50ms, perform at most one logical step per callback, pause completely while offscreen, document-hidden, explicitly paused, or disconnected, never catch up hidden time, reset the timestamp on resume, and disconnect ResizeObserver, IntersectionObserver, MutationObserver, and the document visibility listener on removal. Resize changes only canvas metrics and repaints; it never advances or resets the field.

Expose constants, emitter forces and phase, solver and render counters, pressure iterations, divergence before and after projection, density and velocity statistics, four-bucket glyph counts, quantized checksums, pointer capture and splat telemetry, responsive font and canvas metrics, pause, visibility, running, reduced-motion, and source state. Provide an inspection method returning copied Float32 evidence for pre-emitter density and velocity, post-emitter sources, advected velocity, divergence, all four pressure passes, projected velocity, advected/current density, glyph bucket codes, and the last splat's before/after velocity and density, center, deltas, impulse, and weights. Under prefers-reduced-motion schedule no animation frame at all: preserve the warmed field, make each pointer drag move or Arrow key apply its splat and exactly one immediate solver step, make Space advance one emitter-only step, keep Home instantaneous without a step, and make R restore the exact warmed checksums.`
});
