window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'ascii-donut-3d',
  title:'ASCII Donut 3D',
  cat:'Raster & Glitch',
  rootClass:'d-ascii-donut',
  tags:['ascii','canvas','torus','z-buffer'],
  libs:[],
  desc:'A classic luminance-shaded torus is rebuilt from 2,160 deterministic samples into a 48 by 24 character z-buffer, with edge-aware accent light and inertial drag rotation.',
  seen:'Seen in a1k0n\'s donut.c and terminal-art sketches',
  hint:'drag to spin, use arrows, or press Space',
  html:`<div class="d-ascii-donut" tabindex="0" aria-label="Interactive ASCII torus. Drag to spin. Arrow keys rotate, Home resets, and Space pauses or advances the reduced-motion view." aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home Space">
  <header class="d-ascii-donut-topbar"><span>INTRX / TORUS BUFFER</span><span class="d-ascii-donut-live"><i></i>30 FPS CAP</span></header>
  <div class="d-ascii-donut-scene">
    <canvas class="d-ascii-donut-canvas" role="img" aria-label="Rotating ASCII torus rendered with a per-character z-buffer"></canvas>
    <div class="d-ascii-donut-angles" aria-hidden="true"><span>A <b class="d-ascii-donut-angle-a">0.600</b></span><span>B <b class="d-ascii-donut-angle-b">0.200</b></span></div>
    <div class="d-ascii-donut-grid" aria-hidden="true"><span>Z-BUFFER</span><b>048x024</b></div>
    <div class="d-ascii-donut-ramp" aria-hidden="true"><span>LUMA</span><b>.,-~:;=!*#$@</b></div>
    <div class="d-ascii-donut-drag" aria-hidden="true"><i></i><span>DRAG VECTOR</span></div>
  </div>
  <footer class="d-ascii-donut-footer"><span class="d-ascii-donut-mode">AUTO ROTATE</span><span class="d-ascii-donut-cells">000 CELLS</span><span>R1 1 / R2 2</span></footer>
  <span class="d-ascii-donut-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-ascii-donut{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 10px;outline:none;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate;touch-action:none}
.d-ascii-donut:before{content:'';position:absolute;inset:0;z-index:10;pointer-events:none;background:radial-gradient(circle at center,rgba(250,115,25,.045),transparent 46%)}
.d-ascii-donut:focus-visible{box-shadow:inset 0 0 0 2px rgba(250,115,25,.72)}
.d-ascii-donut-topbar,.d-ascii-donut-footer{position:relative;z-index:12;display:flex;align-items:center;justify-content:space-between;min-width:0;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;text-transform:uppercase}
.d-ascii-donut-live{display:flex;align-items:center;gap:6px;color:#9b9ba3}.d-ascii-donut-live i{width:5px;height:5px;border-radius:50%;background:#fa7319;box-shadow:0 0 8px rgba(250,115,25,.4)}
.d-ascii-donut-scene{position:relative;z-index:2;min-width:0;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#101012;cursor:grab;user-select:none}.d-ascii-donut-scene:active{cursor:grabbing}.d-ascii-donut:focus-visible .d-ascii-donut-scene,.d-ascii-donut-scene:hover{border-color:#2e2e34}
.d-ascii-donut-canvas{display:block;width:100%;height:100%}
.d-ascii-donut-angles,.d-ascii-donut-grid,.d-ascii-donut-ramp,.d-ascii-donut-drag{position:absolute;z-index:3;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;pointer-events:none}.d-ascii-donut-angles{top:9px;left:9px;display:flex;gap:10px}.d-ascii-donut-angles b,.d-ascii-donut-grid b,.d-ascii-donut-ramp b{color:#ececef;font:600 12px/1 'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}.d-ascii-donut-grid{top:9px;right:9px;display:flex;gap:7px}.d-ascii-donut-ramp{left:9px;bottom:8px;display:flex;align-items:end;gap:7px}.d-ascii-donut-ramp b{color:#9b9ba3;letter-spacing:.07em}.d-ascii-donut-drag{right:9px;bottom:8px;display:flex;align-items:center;gap:5px}.d-ascii-donut-drag i{width:18px;height:1px;background:#2e2e34;transform-origin:left center}.d-ascii-donut[data-dragging="true"] .d-ascii-donut-drag{color:#fa7319}.d-ascii-donut[data-dragging="true"] .d-ascii-donut-drag i{background:#fa7319}
.d-ascii-donut-footer{border-top:1px solid #232327}.d-ascii-donut-mode{color:#fa7319}.d-ascii-donut-cells{color:#9b9ba3}.d-ascii-donut[data-paused="true"] .d-ascii-donut-mode{color:#fbbf24}.d-ascii-donut-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@container(max-width:340px){.d-ascii-donut-drag span{display:none}.d-ascii-donut-footer span:last-child{display:none}}
@media(prefers-reduced-motion:reduce){.d-ascii-donut *{animation:none!important;transition:none!important}}
`,
  js:`const scene=root.querySelector('.d-ascii-donut-scene');
const canvas=root.querySelector('.d-ascii-donut-canvas');
const context=canvas.getContext('2d',{alpha:false});
const angleALabel=root.querySelector('.d-ascii-donut-angle-a');
const angleBLabel=root.querySelector('.d-ascii-donut-angle-b');
const modeLabel=root.querySelector('.d-ascii-donut-mode');
const cellLabel=root.querySelector('.d-ascii-donut-cells');
const dragVector=root.querySelector('.d-ascii-donut-drag i');
const status=root.querySelector('.d-ascii-donut-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const TAU=Math.PI*2;
const R1=1;
const R2=2;
const gridColumns=48;
const gridRows=24;
const thetaSteps=90;
const phiSteps=24;
const pointCount=thetaSteps*phiSteps;
const glyphRamp='.,-~:;=!*#$@';
const targetFps=30;
const frameInterval=1000/targetFps;
const autoA=.04;
const autoB=.02;
const friction=.95;
const edgeRadius=6;
const accentMix=.3;
const cameraDistance=5;
const projectionX=15;
const projectionY=8;
const initialA=.6;
const initialB=.2;
const dragGain=.008;
const dragClamp=.22;
const lightX=.22;
const lightY=.66;
const lightZ=-.718;
let width=1;
let height=1;
let dpr=1;
let angleA=initialA;
let angleB=initialB;
let velocityA=autoA;
let velocityB=autoB;
let dragging=false;
let dragPointer=-1;
let dragMoves=0;
let dragDistance=0;
let lastPointerX=0;
let lastPointerY=0;
let renderFrames=0;
let manualRenders=0;
let rafFrames=0;
let simulationTime=0;
let accumulator=0;
let lastRenderAt=0;
let renderGap=0;
let visible=!('IntersectionObserver'in window);
let documentVisible=document.visibilityState!=='hidden';
let running=false;
let paused=false;
let source='initial';
let frameId=0;
let lastFrame=0;
let observer=null;
let resizeObserver=null;
let connectionObserver=null;
let occupiedCells=0;
let silhouetteCells=0;
let accentCells=0;
let glyphChecksum='00000000';
let glyphsUsed='';
let silhouetteBounds='0,0,0,0';
let initialChecksum='';
let fontSize=0;
let maxGlyphAdvance=0;
let colorBuckets=0;
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function checksum(values){
  let hash=2166136261;
  for(let index=0;index<values.length;index++){hash^=values[index]+1;hash=Math.imul(hash,16777619)}
  return (hash>>>0).toString(16).toUpperCase().padStart(8,'0');
}
function renderTorus(){
  const cellCount=gridColumns*gridRows;
  const depths=new Float64Array(cellCount);
  depths.fill(-Infinity);
  const glyphIndices=new Int16Array(cellCount);
  glyphIndices.fill(-1);
  const luminances=new Float32Array(cellCount);
  const cosA=Math.cos(angleA),sinA=Math.sin(angleA),cosB=Math.cos(angleB),sinB=Math.sin(angleB);
  for(let thetaIndex=0;thetaIndex<thetaSteps;thetaIndex++){
    const theta=thetaIndex*TAU/thetaSteps;
    const cosTheta=Math.cos(theta),sinTheta=Math.sin(theta);
    const ring=R2+R1*cosTheta;
    for(let phiIndex=0;phiIndex<phiSteps;phiIndex++){
      const phi=phiIndex*TAU/phiSteps;
      const cosPhi=Math.cos(phi),sinPhi=Math.sin(phi);
      const localX=ring*cosPhi;
      const localY=R1*sinTheta;
      const localZ=ring*sinPhi;
      const rotatedY=localY*cosA-localZ*sinA;
      const rotatedZ=localY*sinA+localZ*cosA;
      const rotatedX=localX*cosB+rotatedZ*sinB;
      const depthZ=-localX*sinB+rotatedZ*cosB;
      const depth=cameraDistance+depthZ;
      if(depth<=.1)continue;
      const inverse=1/depth;
      const screenX=Math.round(gridColumns/2+rotatedX*inverse*projectionX);
      const screenY=Math.round(gridRows/2-rotatedY*inverse*projectionY);
      if(screenX<0||screenX>=gridColumns||screenY<0||screenY>=gridRows)continue;
      const normalX=cosTheta*cosPhi;
      const normalY=sinTheta;
      const normalZ=cosTheta*sinPhi;
      const normalRotatedY=normalY*cosA-normalZ*sinA;
      const normalRotatedZ=normalY*sinA+normalZ*cosA;
      const normalRotatedX=normalX*cosB+normalRotatedZ*sinB;
      const normalDepth=-normalX*sinB+normalRotatedZ*cosB;
      const luminance=clamp((normalRotatedX*lightX+normalRotatedY*lightY+normalDepth*lightZ+1)/2,0,1);
      const cell=screenY*gridColumns+screenX;
      if(inverse>depths[cell]){
        depths[cell]=inverse;
        luminances[cell]=luminance;
        glyphIndices[cell]=Math.round(luminance*(glyphRamp.length-1));
      }
    }
  }
  const distances=new Int16Array(cellCount);
  distances.fill(32767);
  const queue=new Int16Array(cellCount);
  let queueStart=0,queueEnd=0;
  occupiedCells=0;
  let minX=gridColumns,minY=gridRows,maxX=0,maxY=0;
  for(let y=0;y<gridRows;y++)for(let x=0;x<gridColumns;x++){
    const cell=y*gridColumns+x;
    if(glyphIndices[cell]<0)continue;
    occupiedCells++;
    minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
    const edge=x===0||x===gridColumns-1||y===0||y===gridRows-1||glyphIndices[cell-1]<0||glyphIndices[cell+1]<0||glyphIndices[cell-gridColumns]<0||glyphIndices[cell+gridColumns]<0;
    if(edge){distances[cell]=0;queue[queueEnd++]=cell}
  }
  while(queueStart<queueEnd){
    const cell=queue[queueStart++];
    const x=cell%gridColumns,y=Math.floor(cell/gridColumns),nextDistance=distances[cell]+1;
    const neighbors=[];
    if(x>0)neighbors.push(cell-1);if(x<gridColumns-1)neighbors.push(cell+1);if(y>0)neighbors.push(cell-gridColumns);if(y<gridRows-1)neighbors.push(cell+gridColumns);
    neighbors.forEach(function(next){if(glyphIndices[next]>=0&&nextDistance<distances[next]){distances[next]=nextDistance;queue[queueEnd++]=next}});
  }
  const cellWidth=width/gridColumns;
  const cellHeight=height/gridRows;
  const fontCeiling=Math.min(11,cellHeight*1.06);
  context.fillStyle='#0a0a0b';
  context.fillRect(0,0,width,height);
  context.font='600 '+fontCeiling.toFixed(2)+'px "JetBrains Mono",monospace';
  const ceilingAdvance=Math.max(...[...glyphRamp].map(function(glyph){return context.measureText(glyph).width}));
  fontSize=Math.min(fontCeiling,fontCeiling*cellWidth/Math.max(.01,ceilingAdvance)*.96);
  context.font='600 '+fontSize.toFixed(2)+'px "JetBrains Mono",monospace';
  maxGlyphAdvance=Math.max(...[...glyphRamp].map(function(glyph){return context.measureText(glyph).width}));
  context.textAlign='center';
  context.textBaseline='middle';
  silhouetteCells=0;
  accentCells=0;
  const used=new Set();
  const buckets=new Map();
  for(let cell=0;cell<cellCount;cell++){
    const glyphIndex=glyphIndices[cell];
    if(glyphIndex<0)continue;
    const distance=distances[cell];
    if(distance===0)silhouetteCells++;
    const edgeAmount=distance<=edgeRadius?accentMix:0;
    if(edgeAmount>0)accentCells++;
    const luminance=luminances[cell];
    let red=Math.round(155+(236-155)*luminance);
    let green=Math.round(155+(236-155)*luminance);
    let blue=Math.round(163+(239-163)*luminance);
    red=Math.round(red+(167-red)*edgeAmount);
    green=Math.round(green+(139-green)*edgeAmount);
    blue=Math.round(blue+(250-blue)*edgeAmount);
    const color='rgb('+red+','+green+','+blue+')';
    const x=cell%gridColumns,y=Math.floor(cell/gridColumns);
    if(!buckets.has(color))buckets.set(color,[]);
    buckets.get(color).push([glyphRamp[glyphIndex],(x+.5)*cellWidth,(y+.54)*cellHeight]);
    used.add(glyphRamp[glyphIndex]);
  }
  buckets.forEach(function(cells,color){context.fillStyle=color;cells.forEach(function(cell){context.fillText(cell[0],cell[1],cell[2])})});
  colorBuckets=buckets.size;
  glyphChecksum=checksum(glyphIndices);
  glyphsUsed=[...glyphRamp].filter(function(glyph){return used.has(glyph)}).join('');
  silhouetteBounds=occupiedCells?minX+','+minY+','+maxX+','+maxY:'0,0,0,0';
  angleALabel.textContent=angleA.toFixed(3);
  angleBLabel.textContent=angleB.toFixed(3);
  cellLabel.textContent=String(occupiedCells).padStart(3,'0')+' CELLS';
  modeLabel.textContent=reduced?'MANUAL VIEW':paused?'PAUSED':dragging?'VECTOR INPUT':'AUTO ROTATE';
  canvas.setAttribute('aria-label','ASCII torus using '+occupiedCells+' occupied z-buffer cells and glyphs '+glyphsUsed);
}
function expose(nextSource){
  if(nextSource)source=nextSource;
  root.dataset.r1=String(R1);
  root.dataset.r2=String(R2);
  root.dataset.gridColumns=String(gridColumns);
  root.dataset.gridRows=String(gridRows);
  root.dataset.thetaSteps=String(thetaSteps);
  root.dataset.phiSteps=String(phiSteps);
  root.dataset.pointCount=String(pointCount);
  root.dataset.glyphRamp=glyphRamp;
  root.dataset.targetFps=String(targetFps);
  root.dataset.frameInterval=frameInterval.toFixed(3);
  root.dataset.autoA=String(autoA);
  root.dataset.autoB=String(autoB);
  root.dataset.friction=String(friction);
  root.dataset.edgeRadius=String(edgeRadius);
  root.dataset.accentMix=String(accentMix);
  root.dataset.cameraDistance=String(cameraDistance);
  root.dataset.projection=projectionX+','+projectionY;
  root.dataset.initialAngles=initialA+','+initialB;
  root.dataset.dragGain=String(dragGain);
  root.dataset.dragClamp=String(dragClamp);
  root.dataset.lightDirection=lightX+','+lightY+','+lightZ;
  root.dataset.angleA=angleA.toFixed(4);
  root.dataset.angleB=angleB.toFixed(4);
  root.dataset.velocityA=velocityA.toFixed(5);
  root.dataset.velocityB=velocityB.toFixed(5);
  root.dataset.renderFrames=String(renderFrames);
  root.dataset.manualRenders=String(manualRenders);
  root.dataset.rafFrames=String(rafFrames);
  root.dataset.simulationTime=simulationTime.toFixed(1);
  root.dataset.lastRenderAt=lastRenderAt.toFixed(1);
  root.dataset.renderGap=renderGap.toFixed(1);
  root.dataset.occupiedCells=String(occupiedCells);
  root.dataset.silhouetteCells=String(silhouetteCells);
  root.dataset.accentCells=String(accentCells);
  root.dataset.glyphChecksum=glyphChecksum;
  root.dataset.initialChecksum=initialChecksum||glyphChecksum;
  root.dataset.glyphsUsed=glyphsUsed;
  root.dataset.silhouetteBounds=silhouetteBounds;
  root.dataset.fontSize=fontSize.toFixed(2);
  root.dataset.maxGlyphAdvance=maxGlyphAdvance.toFixed(3);
  root.dataset.colorBuckets=String(colorBuckets);
  root.dataset.dragging=String(dragging);
  root.dataset.dragPointer=String(dragPointer);
  root.dataset.dragMoves=String(dragMoves);
  root.dataset.dragDistance=dragDistance.toFixed(2);
  root.dataset.paused=String(paused);
  root.dataset.running=String(running);
  root.dataset.reduced=String(reduced);
  root.dataset.source=source;
  root.dataset.canvasWidth=String(canvas.width);
  root.dataset.canvasHeight=String(canvas.height);
  root.dataset.canvasClientWidth=String(canvas.clientWidth);
  root.dataset.canvasClientHeight=String(canvas.clientHeight);
  root.dataset.dpr=dpr.toFixed(2);
}
function resizeCanvas(){
  width=Math.max(1,scene.clientWidth);
  height=Math.max(1,scene.clientHeight);
  dpr=Math.min(2,window.devicePixelRatio||1);
  canvas.width=Math.round(width*dpr);
  canvas.height=Math.round(height*dpr);
  context.setTransform(dpr,0,0,dpr,0,0);
  renderTorus();
  expose('resize');
}
function applyManual(nextSource){renderTorus();manualRenders++;expose(nextSource)}
scene.addEventListener('pointerdown',function(event){
  if(event.button!==0)return;
  const resumeFromPause=paused;
  root.focus({preventScroll:true});
  if(scene.setPointerCapture)try{scene.setPointerCapture(event.pointerId)}catch(error){}
  dragging=true;
  dragPointer=event.pointerId;
  dragMoves=0;
  dragDistance=0;
  lastPointerX=event.clientX;
  lastPointerY=event.clientY;
  if(paused)paused=false;
  expose('pointer start');
  if(resumeFromPause&&!reduced)start('pointer start');
});
scene.addEventListener('pointermove',function(event){
  if(!dragging||event.pointerId!==dragPointer)return;
  const deltaX=event.clientX-lastPointerX;
  const deltaY=event.clientY-lastPointerY;
  lastPointerX=event.clientX;
  lastPointerY=event.clientY;
  if(deltaX===0&&deltaY===0)return;
  dragMoves++;
  dragDistance+=Math.hypot(deltaX,deltaY);
  velocityA=clamp(deltaY*dragGain,-dragClamp,dragClamp);
  velocityB=clamp(deltaX*dragGain,-dragClamp,dragClamp);
  dragVector.style.transform='rotate('+Math.atan2(deltaY,deltaX)*180/Math.PI+'deg) scaleX('+clamp(Math.hypot(deltaX,deltaY)/18,.35,1.7)+')';
  if(reduced){angleA+=velocityA;angleB+=velocityB;applyManual('pointer')}
  else expose('pointer');
},{passive:true});
function finishDrag(cancelled){
  if(!dragging)return;
  const pointer=dragPointer;
  dragging=false;
  dragPointer=-1;
  if(scene.releasePointerCapture)try{if(scene.hasPointerCapture(pointer))scene.releasePointerCapture(pointer)}catch(error){}
  status.textContent=cancelled?'Torus drag cancelled':reduced?'Static torus orientation updated':'Inertial rotation '+velocityA.toFixed(3)+' / '+velocityB.toFixed(3);
  expose(cancelled?'pointer cancel':'pointer release');
}
scene.addEventListener('pointerup',function(event){if(event.pointerId===dragPointer)finishDrag(false)});
scene.addEventListener('pointercancel',function(event){if(event.pointerId===dragPointer)finishDrag(true)});
scene.addEventListener('lostpointercapture',function(event){if(event.pointerId===dragPointer)finishDrag(true)});
root.addEventListener('keydown',function(event){
  const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home',' '];
  if(!keys.includes(event.key))return;
  event.preventDefault();
  if(event.key===' '){
    if(reduced){angleA+=autoA;angleB+=autoB;applyManual('keyboard step');status.textContent='Static torus advanced one frame'}
    else{paused=!paused;status.textContent=paused?'Torus paused':'Torus resumed';renderTorus();if(paused)stop('keyboard pause');else start('keyboard pause');expose('keyboard pause')}
    return;
  }
  if(event.key==='Home'){angleA=initialA;angleB=initialB;velocityA=autoA;velocityB=autoB;status.textContent='Torus orientation reset'}
  else{
    const step=event.shiftKey?.24:.12;
    if(event.key==='ArrowUp')angleA-=step;
    if(event.key==='ArrowDown')angleA+=step;
    if(event.key==='ArrowLeft')angleB-=step;
    if(event.key==='ArrowRight')angleB+=step;
    velocityA=autoA;
    velocityB=autoB;
    status.textContent='Keyboard torus rotation';
  }
  applyManual('keyboard');
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
    if(!paused){
      angleA+=velocityA;
      angleB+=velocityB;
      if(!dragging){velocityA=autoA+(velocityA-autoA)*friction;velocityB=autoB+(velocityB-autoB)*friction}
    }
    renderTorus();
    renderFrames++;
    renderGap=lastRenderAt?simulationTime-lastRenderAt:0;
    lastRenderAt=simulationTime;
    expose('frame');
  }
  frameId=requestAnimationFrame(frame);
}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(documentVisible)start();else stop()}
document.addEventListener('visibilitychange',onVisibility);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(scene)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
resizeCanvas();
initialChecksum=glyphChecksum;
expose(reduced?'reduced':'initial');
if(!reduced)start()`,
  prompt:`Build a self-contained 320px-tall ASCII donut renderer on canvas using the classic donut.c idea. Use an exact 48 by 24 character z-buffer and sample a torus with R1=1 and R2=2 at 90 theta steps by 24 phi steps, or 2,160 deterministic points. Start at A=0.6 and B=0.2. Rotate the position and surface normal by A then B, project from camera distance 5 with horizontal and vertical scales 15 and 8, and retain only the closest inverse-depth sample per character cell. Dot each transformed normal with the normalized light vector (0.22, 0.66, -0.718), normalize luminance as clamp((dot + 1) / 2, 0, 1), and map it through the exact density ramp .,-~:;=!*#$@.

Render at a measured 30fps cap. On every rendered automatic frame advance A by exactly 0.04 and B by exactly 0.02. A pointer-captured drag converts each y and x delta with a 0.008 gain into angular velocities clamped to plus or minus 0.22. After release, decay each velocity back toward its automatic rate with v = auto + (v - auto) * 0.95 on every rendered frame, preserving inertial overshoot. Arrow keys provide a direct 0.12-radian rotation without adding inertia, Shift doubles the step, Home resets, and Space fully pauses and resumes the frame scheduler.

Find occupied silhouette-edge cells in the z-buffer, propagate their inward four-neighbor grid distance, and mix #fa7319 at exactly 30 percent into every occupied cell whose distance from that edge is zero through six. Base ink interpolates between #9b9ba3 and #ececef from luminance. Keep the exact glyph choice driven only by the transformed normal luminance. Batch cells by their computed color before calling fillText, cap the font at 11px, and shrink it responsively so the widest measured glyph never exceeds one cell. Add compact 10px labels, 12px angle, grid, and ramp data, cell and drag-vector telemetry around the canvas with one visible keyboard focus target and a polite status. Use the shared 10px panel radius and do not add FUI scanlines or hard-tech corner brackets.

Use a DPR-aware ResizeObserver, a single visibility-aware active-time requestAnimationFrame scheduler, a 50ms delta cap, no hidden catch-up, and disconnect cleanup. Expose torus constants, sampling, frame cadence, angles, velocities, friction, z-buffer occupancy, edge glow, checksum, drag, canvas, running, source, and timing telemetry. Under prefers-reduced-motion start no frame loop and keep the deterministic initial torus static; pointer drag, arrow keys, reset, and one-frame Space steps must redraw immediately without inertia or automatic motion.`
});
