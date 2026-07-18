window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'ascii-type-explode',
  title:'ASCII Type Explode',
  cat:'Raster & Glitch',
  rootClass:'d-ascii-type-explode',
  tags:['ascii','canvas','type','particles'],
  libs:[],
  desc:'A native input builds a live 5 by 7 ASCII banner whose deterministic glyph cells fly in, settle, scatter on deletion, and idle-wave by column.',
  seen:'Seen in figlet and terminal banner culture',
  hint:'focus the bottom input, type up to eight letters or digits, use Backspace to scatter the last character, or Escape to reset',
  html:`<div class="d-ascii-type-explode" role="group" aria-label="Live ASCII banner editor">
  <header class="d-ascii-type-explode-top"><span>INTRX / TYPE EXPLODE</span><span class="d-ascii-type-explode-readout">000/008 · IDLE</span></header>
  <div class="d-ascii-type-explode-stage">
    <canvas class="d-ascii-type-explode-canvas" role="img" aria-label="Empty 5 by 7 ASCII banner"></canvas>
    <div class="d-ascii-type-explode-guide" aria-hidden="true"><span>5x7 CELL FIELD</span><i></i><span>350MS / 008MS</span></div>
  </div>
  <label class="d-ascii-type-explode-well"><span>INPUT</span><input type="text" maxlength="8" pattern="[A-Za-z0-9]{0,8}" placeholder="TYPE" spellcheck="false" autocomplete="off" autocapitalize="characters" inputmode="text" aria-keyshortcuts="Escape" aria-label="ASCII banner text, up to eight letters or digits"><b>MAX 8</b></label>
  <span class="d-ascii-type-explode-help">Letters and digits render above. Backspace scatters the last letter. Escape resets the banner.</span>
  <span class="d-ascii-type-explode-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-ascii-type-explode{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 40px;gap:5px;overflow:hidden;padding:8px 10px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-ascii-type-explode:before{content:'';position:absolute;inset:0;z-index:8;pointer-events:none;background:radial-gradient(ellipse at 50% 42%,transparent 42%,rgba(0,0,0,.34) 100%)}
.d-ascii-type-explode-top{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.07em;text-transform:uppercase;font-variant-numeric:tabular-nums}
.d-ascii-type-explode-readout{color:#9b9ba3}.d-ascii-type-explode[data-flying-cells]:not([data-flying-cells="0"]) .d-ascii-type-explode-readout{color:#ececef}.d-ascii-type-explode[data-scatter-cell-count]:not([data-scatter-cell-count="0"]) .d-ascii-type-explode-readout{color:#a78bfa}
.d-ascii-type-explode-stage{position:relative;z-index:2;min-width:0;min-height:0;overflow:hidden;border:1px solid #232327;border-radius:10px;background:linear-gradient(rgba(35,35,39,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(35,35,39,.1) 1px,transparent 1px),#0a0a0b;background-size:24px 24px;cursor:text}
.d-ascii-type-explode-canvas{display:block;width:100%;height:100%}
.d-ascii-type-explode-guide{position:absolute;left:9px;right:9px;bottom:7px;display:flex;align-items:center;gap:6px;color:#47474f;font-size:7px;line-height:1;letter-spacing:.08em}.d-ascii-type-explode-guide i{height:1px;flex:1;background:#232327}
.d-ascii-type-explode-well{position:relative;z-index:10;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px;min-width:0;height:40px;box-sizing:border-box;padding:0 11px;border:1px solid #232327;border-radius:7px;background:#16161a;color:#5c5c66;font-size:8px;letter-spacing:.1em}
.d-ascii-type-explode-well:focus-within{border-color:#a78bfa;box-shadow:0 0 0 1px rgba(167,139,250,.16)}.d-ascii-type-explode-well>span,.d-ascii-type-explode-well>b{font-size:8px;font-weight:700;white-space:nowrap}.d-ascii-type-explode-well>b{color:#47474f}
.d-ascii-type-explode-well input{min-width:0;width:100%;height:28px;box-sizing:border-box;padding:0;border:0;outline:0;background:transparent;color:#ececef;caret-color:#a78bfa;font:700 14px/28px 'JetBrains Mono',monospace;letter-spacing:.15em;text-transform:uppercase}.d-ascii-type-explode-well input::placeholder{color:#5c5c66;opacity:1}
.d-ascii-type-explode-help,.d-ascii-type-explode-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@container(max-width:340px){.d-ascii-type-explode{padding-inline:7px}.d-ascii-type-explode-top{font-size:9px;letter-spacing:.035em}.d-ascii-type-explode-guide{font-size:6px}.d-ascii-type-explode-well{gap:7px;padding-inline:8px}}
@media(prefers-reduced-motion:reduce){.d-ascii-type-explode *{animation:none!important;transition:none!important}}
`,
  js:`const scene=root.querySelector('.d-ascii-type-explode-stage');
const canvas=root.querySelector('.d-ascii-type-explode-canvas');
const context=canvas.getContext('2d',{alpha:false});
const input=root.querySelector('input');
const readout=root.querySelector('.d-ascii-type-explode-readout');
const status=root.querySelector('.d-ascii-type-explode-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const controller=new AbortController();
const listener={signal:controller.signal};
const passive={passive:true,signal:controller.signal};
const glyphOrder='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const patterns={
A:['01110','10001','10001','11111','10001','10001','10001'],
B:['11110','10001','10001','11110','10001','10001','11110'],
C:['01111','10000','10000','10000','10000','10000','01111'],
D:['11110','10001','10001','10001','10001','10001','11110'],
E:['11111','10000','10000','11110','10000','10000','11111'],
F:['11111','10000','10000','11110','10000','10000','10000'],
G:['01110','10001','10000','10111','10001','10001','01110'],
H:['10001','10001','10001','11111','10001','10001','10001'],
I:['11111','00100','00100','00100','00100','00100','11111'],
J:['00111','00010','00010','00010','10010','10010','01100'],
K:['10001','10010','10100','11000','10100','10010','10001'],
L:['10000','10000','10000','10000','10000','10000','11111'],
M:['10001','11011','10101','10101','10001','10001','10001'],
N:['10001','11001','10101','10011','10001','10001','10001'],
O:['01110','10001','10001','10001','10001','10001','01110'],
P:['11110','10001','10001','11110','10000','10000','10000'],
Q:['01110','10001','10001','10001','10101','10010','01101'],
R:['11110','10001','10001','11110','10100','10010','10001'],
S:['01111','10000','10000','01110','00001','00001','11110'],
T:['11111','00100','00100','00100','00100','00100','00100'],
U:['10001','10001','10001','10001','10001','10001','01110'],
V:['10001','10001','10001','10001','10001','01010','00100'],
W:['10001','10001','10001','10101','10101','10101','01010'],
X:['10001','10001','01010','00100','01010','10001','10001'],
Y:['10001','10001','01010','00100','00100','00100','00100'],
Z:['11111','00001','00010','00100','01000','10000','11111'],
0:['01110','10001','10011','10101','11001','10001','01110'],
1:['00100','01100','00100','00100','00100','00100','01110'],
2:['01110','10001','00001','00010','00100','01000','11111'],
3:['11110','00001','00001','01110','00001','00001','11110'],
4:['00010','00110','01010','10010','11111','00010','00010'],
5:['11111','10000','10000','11110','00001','00001','11110'],
6:['01110','10000','10000','11110','10001','10001','01110'],
7:['11111','00001','00010','00100','01000','01000','01000'],
8:['01110','10001','10001','01110','10001','10001','01110'],
9:['01110','10001','10001','01111','00001','00001','01110']
};
const glyphWidth=5;
const glyphHeight=7;
const glyphGap=1;
const cap=8;
const maxBannerColumns=cap*glyphWidth+(cap-1)*glyphGap;
const flyDuration=350;
const cellStagger=8;
const glowDuration=300;
const scatterDuration=400;
const gravity=260;
const idleDelay=4000;
const waveDuration=1200;
const waveTravel=600;
const waveLobe=waveDuration-waveTravel;
const waveAmplitude=4;
const glyphBits={};
const mapCellCounts=[];
const mapChecksums=[];
let textValue='';
let liveCells=[];
let scatterCells=[];
let liveState=[];
let scatterState=[];
let width=1;
let height=1;
let dpr=1;
let cellWidth=7;
let cellHeight=12;
let fontSize=11;
let bannerColumns=0;
let layoutOffsetX=.5;
let layoutOffsetY=.5;
let activeTime=0;
let lastActivity=0;
let nextWaveAt=idleDelay;
let waveStart=0;
let waving=false;
let visible=true;
let documentVisible=document.visibilityState!=='hidden';
let frameId=0;
let running=false;
let lastWall=0;
let observer=null;
let resizeObserver=null;
let connectionObserver=null;
let cleaned=false;
let insertionSerial=0;
let schedulerFrames=0;
let renderFrames=0;
let resizeEvents=0;
let appendEvents=0;
let deleteEvents=0;
let pasteEvents=0;
let reconcileEvents=0;
let inputEvents=0;
let ignoredInputs=0;
let waveTriggers=0;
let completedWaves=0;
let lastInputSource='initial';
let composing=false;
let suppressCompositionInput=false;
let compositionStarts=0;
let compositionCommits=0;
let resets=0;
let source='initial';
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function checksum(values,scale){let hash=2166136261;for(let index=0;index<values.length;index++){hash^=Math.round(values[index]*scale)+index;hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).toUpperCase().padStart(8,'0')}
function buildGlyphs(){for(const character of glyphOrder){const rows=patterns[character];if(!rows||rows.length!==glyphHeight)throw new Error('ASCII type glyph row count');const bits=new Uint8Array(glyphWidth*glyphHeight);let count=0;for(let y=0;y<glyphHeight;y++){if(rows[y].length!==glyphWidth||/[^01]/.test(rows[y]))throw new Error('ASCII type glyph cell');for(let x=0;x<glyphWidth;x++){const bit=rows[y][x]==='1'?1:0;bits[y*glyphWidth+x]=bit;count+=bit}}glyphBits[character]=bits;mapCellCounts.push(count);mapChecksums.push(checksum(bits,1))}}
function mix32(value){value=Math.imul(value^(value>>>16),0x45d9f3b);value=Math.imul(value^(value>>>16),0x45d9f3b);return(value^(value>>>16))>>>0}
function unit(serial,index,salt){return mix32(Math.imul(serial,0x9e3779b1)^Math.imul(index+1,0x85ebca6b)^salt)/4294967296}
function launchVector(serial,index){const angle=unit(serial,index,0x51ed270b)*Math.PI*2;const radius=Math.min(79.999,20+60*Math.sqrt(unit(serial,index,0x2c1b3c6d)));const x=Math.fround(Math.cos(angle)*radius);const y=Math.fround(Math.sin(angle)*radius);return{x:x,y:y,distance:Math.hypot(x,y)}}
function curve(a,b,t){const inverse=1-t;return 3*inverse*inverse*t*a+3*inverse*t*t*b+t*t*t}
function curveSlope(a,b,t){const inverse=1-t;return 3*inverse*inverse*a+6*inverse*t*(b-a)+3*t*t*(1-b)}
function easeOutSoft(value){const progress=clamp(value,0,1);let parameter=progress;for(let pass=0;pass<8;pass++){const error=curve(.22,.36,parameter)-progress;const slope=curveSlope(.22,.36,parameter);if(Math.abs(slope)<.000001)break;parameter=clamp(parameter-error/slope,0,1)}let low=0,high=1;for(let pass=0;pass<10;pass++){if(curve(.22,.36,parameter)<progress)low=parameter;else high=parameter;parameter=(low+high)/2}return curve(1,1,parameter)}
function calculateLayout(){bannerColumns=textValue.length?textValue.length*glyphWidth+(textValue.length-1)*glyphGap:0;cellWidth=Math.min(7,Math.max(1,width-24)/maxBannerColumns);cellHeight=cellWidth*12/7;fontSize=Math.min(11,cellWidth*1.55);layoutOffsetX=(width-bannerColumns*cellWidth)/2;layoutOffsetY=(height-glyphHeight*cellHeight)/2}
function targetFor(cell){return{x:layoutOffsetX+(cell.charIndex*(glyphWidth+glyphGap)+cell.glyphX+.5)*cellWidth,y:layoutOffsetY+(cell.glyphY+.5)*cellHeight,column:cell.charIndex*(glyphWidth+glyphGap)+cell.glyphX}}
function waveFor(column){if(!waving||bannerColumns<1)return 0;const delay=column/Math.max(1,bannerColumns-1)*waveTravel;const local=(activeTime-waveStart-delay)/waveLobe;return local>0&&local<1?-waveAmplitude*Math.sin(Math.PI*local):0}
function sampleLive(){liveState=liveCells.map(function(cell){const target=targetFor(cell);const elapsed=activeTime-cell.bornAt-cell.delay;let progress,eased,brightness,opacity,phase;if(reduced){progress=1;eased=1;brightness=0;opacity=1;phase='stable'}else if(elapsed<0){progress=0;eased=0;brightness=0;opacity=0;phase='waiting'}else if(elapsed<flyDuration){progress=elapsed/flyDuration;eased=easeOutSoft(progress);brightness=eased;opacity=.3+.7*eased;phase='flying'}else if(elapsed<flyDuration+glowDuration){progress=1;eased=1;brightness=1-(elapsed-flyDuration)/glowDuration;opacity=1;phase='glow'}else{progress=1;eased=1;brightness=0;opacity=1;phase='stable'}const waveY=waveFor(target.column);return{id:cell.id,targetX:Math.fround(target.x),targetY:Math.fround(target.y),currentX:Math.fround(target.x+cell.startOffsetX*(1-eased)),currentY:Math.fround(target.y+cell.startOffsetY*(1-eased)+waveY),waveY:Math.fround(waveY),progress:Math.fround(progress),eased:Math.fround(eased),brightness:Math.fround(brightness),opacity:Math.fround(opacity),phase:phase,column:target.column}})}
function sampleScatter(){scatterState=scatterCells.map(function(cell){const elapsed=clamp(activeTime-cell.startTime,0,scatterDuration);const seconds=elapsed/1000;const progress=elapsed/scatterDuration;return{id:cell.id,currentX:Math.fround(cell.startX+cell.velocityX*seconds),currentY:Math.fround(cell.startY+cell.velocityY*seconds+.5*gravity*seconds*seconds),progress:Math.fround(progress),opacity:Math.fround(1-progress)}})}
function tone(brightness){const amount=clamp(brightness,0,1);const red=Math.round(155+(236-155)*amount);const green=red;const blue=Math.round(163+(239-163)*amount);return'rgb('+red+','+green+','+blue+')'}
function flatten(states,keys){const values=[];for(const state of states)for(const key of keys)values.push(typeof state[key]==='number'?state[key]:0);return values}
function render(nextSource){source=nextSource||source;calculateLayout();sampleLive();sampleScatter();context.setTransform(dpr,0,0,dpr,0,0);context.fillStyle='#0a0a0b';context.fillRect(0,0,width,height);context.font=fontSize+"px 'JetBrains Mono', monospace";context.textAlign='center';context.textBaseline='middle';for(let index=0;index<scatterState.length;index++){const state=scatterState[index];if(state.opacity<=0)continue;context.globalAlpha=state.opacity;context.fillStyle='#9b9ba3';context.fillText('#',state.currentX,state.currentY)}for(let index=0;index<liveState.length;index++){const state=liveState[index];if(state.opacity<=0)continue;context.globalAlpha=state.opacity;context.fillStyle=tone(state.brightness);context.fillText('#',state.currentX,state.currentY)}context.globalAlpha=1;renderFrames++;expose(source)}
function expose(nextSource){source=nextSource||source;let waiting=0,flying=0,glow=0,stable=0,maxDistance=0,minDistance=liveCells.length?Infinity:0;for(let index=0;index<liveState.length;index++){const phase=liveState[index].phase;if(phase==='waiting')waiting++;else if(phase==='flying')flying++;else if(phase==='glow')glow++;else stable++;maxDistance=Math.max(maxDistance,liveCells[index].startDistance);minDistance=Math.min(minDistance,liveCells[index].startDistance)}const expected=textValue.split('').reduce(function(total,character){return total+mapCellCounts[glyphOrder.indexOf(character)]},0);const identity=[];const starts=[];for(const cell of liveCells){identity.push(cell.charIndex,cell.glyphIndex,cell.ordinal,cell.serial);starts.push(cell.startOffsetX,cell.startOffsetY,cell.startDistance,cell.delay)}const scatterIdentity=[];const scatterMotion=[];for(const cell of scatterCells){scatterIdentity.push(cell.charIndex,cell.glyphIndex,cell.ordinal,cell.serial);scatterMotion.push(cell.startX,cell.startY,cell.velocityX,cell.velocityY,cell.startTime)}root.dataset.glyphOrder=glyphOrder;root.dataset.glyphWidth=String(glyphWidth);root.dataset.glyphHeight=String(glyphHeight);root.dataset.glyphGap=String(glyphGap);root.dataset.cap=String(cap);root.dataset.maxBannerColumns=String(maxBannerColumns);root.dataset.flyRadius=String(80);root.dataset.launchRadiusMinimum=String(20);root.dataset.launchRadiusCap=String(79.999);root.dataset.launchFormula='min(79.999,20+60*sqrt(unit))';root.dataset.flyDuration=String(flyDuration);root.dataset.cellStagger=String(cellStagger);root.dataset.glowDuration=String(glowDuration);root.dataset.scatterDuration=String(scatterDuration);root.dataset.gravity=String(gravity);root.dataset.idleDelay=String(idleDelay);root.dataset.waveDuration=String(waveDuration);root.dataset.waveTravel=String(waveTravel);root.dataset.waveLobe=String(waveLobe);root.dataset.waveAmplitude=String(waveAmplitude);root.dataset.ease='cubic-bezier(.22,1,.36,1)';
root.dataset.mapCellCounts=mapCellCounts.join(',');root.dataset.mapChecksums=mapChecksums.join(',');root.dataset.mapChecksum=checksum(Array.from(glyphOrder).flatMap(function(character){return Array.from(glyphBits[character])}),1);root.dataset.text=textValue;root.dataset.textLength=String(textValue.length);root.dataset.textChecksum=checksum(Array.from(textValue).map(function(character){return character.charCodeAt(0)}),1);root.dataset.expectedCellCount=String(expected);root.dataset.liveCellCount=String(liveCells.length);root.dataset.scatterCellCount=String(scatterCells.length);root.dataset.waitingCells=String(waiting);root.dataset.flyingCells=String(flying);root.dataset.glowCells=String(glow);root.dataset.stableCells=String(stable);root.dataset.maxLaunchDistance=maxDistance.toFixed(6);root.dataset.minLaunchDistance=(minDistance===Infinity?0:minDistance).toFixed(6);root.dataset.launchBoundsValid=String(liveCells.every(function(cell){return cell.startDistance>=20&&cell.startDistance<80}));
root.dataset.liveIdentityChecksum=checksum(identity,1);root.dataset.liveStartChecksum=checksum(starts,1000);root.dataset.liveTargetChecksum=checksum(flatten(liveState,['targetX','targetY']),1000);root.dataset.liveCurrentChecksum=checksum(flatten(liveState,['currentX','currentY']),1000);root.dataset.liveProgressChecksum=checksum(flatten(liveState,['progress','eased']),1000000);root.dataset.liveBrightnessChecksum=checksum(flatten(liveState,['brightness','opacity']),1000000);root.dataset.liveWaveChecksum=checksum(flatten(liveState,['waveY']),1000000);root.dataset.scatterIdentityChecksum=checksum(scatterIdentity,1);root.dataset.scatterMotionChecksum=checksum(scatterMotion,1000);root.dataset.scatterCurrentChecksum=checksum(flatten(scatterState,['currentX','currentY','progress','opacity']),1000);
root.dataset.activeTime=activeTime.toFixed(3);root.dataset.lastActivity=lastActivity.toFixed(3);root.dataset.nextWaveAt=nextWaveAt.toFixed(3);root.dataset.waveStart=waveStart.toFixed(3);root.dataset.waveElapsed=(waving?Math.max(0,activeTime-waveStart):0).toFixed(3);root.dataset.waveProgress=(waving?clamp((activeTime-waveStart)/waveDuration,0,1):0).toFixed(6);root.dataset.waving=String(waving);root.dataset.waveTriggers=String(waveTriggers);root.dataset.completedWaves=String(completedWaves);root.dataset.insertionSerial=String(insertionSerial);root.dataset.appendEvents=String(appendEvents);root.dataset.deleteEvents=String(deleteEvents);root.dataset.pasteEvents=String(pasteEvents);root.dataset.reconcileEvents=String(reconcileEvents);root.dataset.inputEvents=String(inputEvents);root.dataset.ignoredInputs=String(ignoredInputs);root.dataset.lastInputSource=lastInputSource;root.dataset.composing=String(composing);root.dataset.suppressCompositionInput=String(suppressCompositionInput);root.dataset.compositionStarts=String(compositionStarts);root.dataset.compositionCommits=String(compositionCommits);root.dataset.resets=String(resets);
root.dataset.bannerColumns=String(bannerColumns);root.dataset.cellWidth=cellWidth.toFixed(6);root.dataset.cellHeight=cellHeight.toFixed(6);root.dataset.fontSize=fontSize.toFixed(6);root.dataset.fieldWidth=(bannerColumns*cellWidth).toFixed(6);root.dataset.fieldHeight=(glyphHeight*cellHeight).toFixed(6);root.dataset.layoutOffsetX=layoutOffsetX.toFixed(6);root.dataset.layoutOffsetY=layoutOffsetY.toFixed(6);root.dataset.canvasWidth=String(canvas.width);root.dataset.canvasHeight=String(canvas.height);root.dataset.canvasClientWidth=String(canvas.clientWidth);root.dataset.canvasClientHeight=String(canvas.clientHeight);root.dataset.dpr=dpr.toFixed(2);root.dataset.schedulerFrames=String(schedulerFrames);root.dataset.renderFrames=String(renderFrames);root.dataset.resizeEvents=String(resizeEvents);root.dataset.running=String(running);root.dataset.reduced=String(reduced);root.dataset.visible=String(visible);root.dataset.documentVisible=String(documentVisible);root.dataset.cleaned=String(cleaned);root.dataset.source=source;root.dataset.inputValue=input.value;root.dataset.placeholder=input.placeholder;root.dataset.maxLength=String(input.maxLength);root.dataset.inputFocused=String(document.activeElement===input);root.dataset.statusText=status.textContent;
const mode=scatterCells.length?'SCATTER':flying||waiting?'FLY':glow?'LAND':waving?'WAVE':'IDLE';readout.textContent=String(textValue.length).padStart(3,'0')+'/008 · '+mode;canvas.setAttribute('aria-label',textValue?'5 by 7 ASCII banner reading '+textValue:'Empty 5 by 7 ASCII banner');input.setAttribute('aria-label','ASCII banner text, '+textValue.length+' of eight characters')}
function markActivity(){lastActivity=activeTime;nextWaveAt=activeTime+idleDelay;waveStart=0;waving=false}
function appendCharacter(value,nextSource){const character=String(value||'').toUpperCase();if(!/^[A-Z0-9]$/.test(character)){ignoredInputs++;status.textContent='Only letters and digits are supported';render('input ignored');return false}if(textValue.length>=cap){ignoredInputs++;status.textContent='Eight character maximum reached';render('cap ignored');return false}const charIndex=textValue.length;insertionSerial++;textValue+=character;input.value=textValue;let ordinal=0;const bits=glyphBits[character];for(let glyphIndex=0;glyphIndex<bits.length;glyphIndex++)if(bits[glyphIndex]){const vector=launchVector(insertionSerial,glyphIndex);liveCells.push({id:insertionSerial*100+glyphIndex,serial:insertionSerial,character:character,charIndex:charIndex,glyphIndex:glyphIndex,glyphX:glyphIndex%glyphWidth,glyphY:Math.floor(glyphIndex/glyphWidth),ordinal:ordinal,bornAt:activeTime,delay:ordinal*cellStagger,startOffsetX:vector.x,startOffsetY:vector.y,startDistance:vector.distance});ordinal++}appendEvents++;lastInputSource=nextSource;markActivity();status.textContent=character+' added, '+textValue.length+' of eight';render(nextSource);placeCaret();startScheduler(nextSource);return true}
function removeLast(nextSource){if(!textValue.length){ignoredInputs++;status.textContent='Banner is already empty';render('delete ignored');return false}calculateLayout();sampleLive();const lastIndex=textValue.length-1;const removed=liveCells.filter(function(cell){return cell.charIndex===lastIndex});const stateById=new Map(liveState.map(function(state){return[state.id,state]}));const centerX=layoutOffsetX+(lastIndex*(glyphWidth+glyphGap)+glyphWidth/2)*cellWidth;const centerY=layoutOffsetY+glyphHeight/2*cellHeight;if(!reduced)for(const cell of removed){const state=stateById.get(cell.id);let dx=state.currentX-centerX,dy=state.currentY-centerY,length=Math.hypot(dx,dy);if(length<.001){const angle=unit(cell.serial,cell.glyphIndex,0x7f4a7c15)*Math.PI*2;dx=Math.cos(angle);dy=Math.sin(angle);length=1}const nx=dx/length,ny=dy/length;const speed=70+55*unit(cell.serial,cell.glyphIndex,0x165667b1);const tangent=(unit(cell.serial,cell.glyphIndex,0xd3a2646c)-.5)*24;const lift=28+24*unit(cell.serial,cell.glyphIndex,0xfd7046c5);scatterCells.push({id:cell.id,serial:cell.serial,character:cell.character,charIndex:cell.charIndex,glyphIndex:cell.glyphIndex,ordinal:cell.ordinal,startTime:activeTime,startX:state.currentX,startY:state.currentY,velocityX:Math.fround(nx*speed-ny*tangent),velocityY:Math.fround(ny*speed+nx*tangent-lift)})}const removedCharacter=textValue[lastIndex];liveCells=liveCells.filter(function(cell){return cell.charIndex!==lastIndex});textValue=textValue.slice(0,-1);input.value=textValue;deleteEvents++;lastInputSource=nextSource;markActivity();status.textContent=removedCharacter+' scattered, '+textValue.length+' remaining';render(nextSource);placeCaret();startScheduler(nextSource);return true}
function placeCaret(){try{input.setSelectionRange(textValue.length,textValue.length)}catch(error){}}
function appendString(value,nextSource){let added=0;for(const character of String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,'')){if(textValue.length>=cap)break;if(appendCharacter(character,nextSource))added++}return added}
function reconcile(){inputEvents++;const desired=String(input.value||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,cap);let common=0;while(common<textValue.length&&common<desired.length&&textValue[common]===desired[common])common++;while(textValue.length>common)removeLast('input reconcile');appendString(desired.slice(common),'input reconcile');input.value=textValue;reconcileEvents++;lastInputSource='input reconcile';render('input reconcile');placeCaret()}
function resetDemo(nextSource){textValue='';liveCells=[];scatterCells=[];liveState=[];scatterState=[];activeTime=0;lastActivity=0;nextWaveAt=idleDelay;waveStart=0;waving=false;insertionSerial=0;schedulerFrames=0;renderFrames=0;appendEvents=0;deleteEvents=0;pasteEvents=0;reconcileEvents=0;inputEvents=0;ignoredInputs=0;waveTriggers=0;completedWaves=0;compositionStarts=0;compositionCommits=0;composing=false;suppressCompositionInput=false;resets=1;lastInputSource=nextSource||'reset';input.value='';lastWall=running?performance.now():0;status.textContent='ASCII banner reset';render(nextSource||'reset');placeCaret();startScheduler(nextSource||'reset')}
function canRun(){return !reduced&&visible&&documentVisible&&root.isConnected&&!cleaned}
function startScheduler(nextSource){if(!canRun()||running)return;running=true;lastWall=performance.now();expose(nextSource||'scheduler start');frameId=requestAnimationFrame(frame)}
function stopScheduler(nextSource){if(frameId)cancelAnimationFrame(frameId);frameId=0;running=false;lastWall=0;expose(nextSource||'scheduler stop')}
function frame(now){frameId=0;if(!root.isConnected){cleanup();return}if(!canRun()){running=false;lastWall=0;expose('scheduler pause');return}const delta=Math.min(50,Math.max(0,now-lastWall));lastWall=now;activeTime+=delta;schedulerFrames++;scatterCells=scatterCells.filter(function(cell){return activeTime-cell.startTime<scatterDuration});if(!waving&&textValue&&activeTime>=nextWaveAt){waving=true;waveStart=nextWaveAt;waveTriggers++}if(waving&&activeTime-waveStart>=waveDuration){waving=false;completedWaves++;lastActivity=activeTime;nextWaveAt=activeTime+idleDelay}if(!textValue&&activeTime>=nextWaveAt)nextWaveAt=activeTime+idleDelay;render('animation frame');frameId=requestAnimationFrame(frame)}
function resizeCanvas(){width=Math.max(1,canvas.clientWidth||scene.clientWidth);height=Math.max(1,canvas.clientHeight||scene.clientHeight);dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);resizeEvents++;render('resize')}
function cleanup(){if(cleaned)return;stopScheduler('cleanup');cleaned=true;controller.abort();if(observer)observer.disconnect();if(resizeObserver)resizeObserver.disconnect();if(connectionObserver)connectionObserver.disconnect();expose('cleanup')}
input.addEventListener('keydown',function(event){if(event.isComposing||composing||event.ctrlKey||event.metaKey||event.altKey)return;if(event.key==='Escape'){event.preventDefault();resetDemo('keyboard reset');return}if(event.key==='Backspace'){event.preventDefault();removeLast('backspace');return}if(/^[A-Za-z0-9]$/.test(event.key)){event.preventDefault();appendCharacter(event.key,'keyboard');return}if(event.key.length===1){event.preventDefault();ignoredInputs++;status.textContent='Only A to Z and 0 to 9 are supported';render('key ignored')}},listener);
input.addEventListener('beforeinput',function(event){if(event.isComposing||composing||event.inputType==='insertCompositionText')return;if(event.inputType==='deleteContentBackward'){event.preventDefault();removeLast('beforeinput delete');return}if(event.inputType&&event.inputType.indexOf('insert')===0&&event.data){event.preventDefault();appendString(event.data,'beforeinput')}},listener);
input.addEventListener('paste',function(event){event.preventDefault();pasteEvents++;const value=event.clipboardData?event.clipboardData.getData('text'):'';const added=appendString(value,'paste');status.textContent=added?added+' characters pasted':'Paste contained no supported characters';render('paste status')},listener);
input.addEventListener('compositionstart',function(){composing=true;suppressCompositionInput=false;compositionStarts++;expose('composition start')},listener);
input.addEventListener('compositionend',function(event){const value=String(event.data||'');composing=false;compositionCommits++;input.value=textValue;appendString(value,'composition');suppressCompositionInput=true;render('composition commit');placeCaret()},listener);
input.addEventListener('input',function(event){if(event.isComposing||composing){inputEvents++;expose('composition interim');return}if(suppressCompositionInput){suppressCompositionInput=false;inputEvents++;input.value=textValue;render('composition duplicate suppressed');placeCaret();return}reconcile()},listener);
input.addEventListener('focus',function(){placeCaret();expose('input focus')},listener);
input.addEventListener('blur',function(){expose('input blur')},listener);
scene.addEventListener('pointerdown',function(event){if(event.button!==0||event.isPrimary===false)return;input.focus({preventScroll:true});placeCaret()},passive);
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(documentVisible)startScheduler('document visible');else stopScheduler('document hidden')}
document.addEventListener('visibilitychange',onVisibility,listener);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(scene)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)startScheduler('intersection visible');else stopScheduler('intersection hidden')},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
root.__asciiTypeExplodeInspect=function(){const copiedPatterns={};const copiedBits={};for(const character of glyphOrder){copiedPatterns[character]=patterns[character].slice();copiedBits[character]=Array.from(glyphBits[character])}return{glyphOrder:glyphOrder,glyphRows:copiedPatterns,glyphBits:copiedBits,liveCells:liveCells.map(function(cell){return Object.assign({},cell)}),scatterCells:scatterCells.map(function(cell){return Object.assign({},cell)}),liveState:liveState.map(function(state){return Object.assign({},state)}),scatterState:scatterState.map(function(state){return Object.assign({},state)}),data:Object.assign({},root.dataset)}};
root.__asciiTypeExplodeReset=function(){resetDemo('inspect reset')};
buildGlyphs();
resizeCanvas();
render(reduced?'reduced':'initial');
if(!reduced)startScheduler('initial')`,
  prompt:`Build a self-contained responsive 320px-tall live ASCII banner. Put a native text input in a bottom well using bg2, a 1px line0 border, and an accent caret; its exact placeholder is TYPE. The canvas stage above renders only a hand-rolled 5 by 7 map covering A through Z and 0 through 9. Sanitize to those characters, uppercase them, preserve native focus semantics, support keyboard, paste, mobile beforeinput, and assistive input reconciliation, and cap the controlled value at exactly 8 characters.

For every occupied cell of a newly appended letter, draw a hash glyph. Use a stateless deterministic hash of insertion serial plus 0 through 34 glyph index to choose an angle and radius = min(79.999, 20 + 60*sqrt(unit)), guaranteeing every Float32 launch offset is strictly within 80 CSS pixels. Stagger occupied cells by ordinal times 8ms. Over exactly 350ms, solve cubic-bezier(.22,1,.36,1) and move from target plus launch offset to target. Land at txt0, then linearly decay brightness over 300ms to txt1.

Backspace always removes the last letter. Sample every removed cell's current position first, then scatter it for exactly 400ms with deterministic outward speed from 70 to 125 pixels per second, tangent jitter, upward lift, and gravity 260 pixels per second squared; fade opacity linearly to zero. Four seconds after the last edit, sweep the whole banner by column: travel left-to-right for 600ms, with each column following one 600ms negative half-sine peaking at -4px, for exactly 1.2 seconds total.

Use a DPR-aware canvas and fixed maximum 7 by 12 CSS-pixel cell geometry that scales down to fit all 47 maximum columns at 320px. Maintain one requestAnimationFrame scheduler in normal motion, an explicit active clock whose visible callback delta is capped at 50ms, IntersectionObserver and document-visibility freezing without catch-up, AbortController listener cleanup, and Resize, Intersection, and Mutation observers. Under reduced motion, schedule zero animation frames, add letters synchronously at their exact stable txt1 endpoints, delete synchronously without particles, and disable idle waves.

Expose copied glyph rows and bits, immutable live and scatter definitions, sampled live and scatter states, exact map/state checksums, timing, input, wave, physics, responsive canvas, accessibility, scheduler, visibility, and cleanup telemetry through root.__asciiTypeExplodeInspect and root.dataset so an independent verifier can recompute every invariant.`
});
