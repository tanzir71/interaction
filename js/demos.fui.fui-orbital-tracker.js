window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'fui-orbital-tracker',
  title:'FUI Orbital Tracker',
  cat:'FUI & Terminal',
  rootClass:'d-fui-orbit',
  tags:['fui','satellite','orbit','tracker'],
  libs:[],
  desc:'A deterministic three-satellite mission display layers front and occluded orbit halves, fading trails, an active-time telemetry typer, and a ground-station pass over a compact wireframe planet.',
  seen:'Seen in FUI dashboards and NASA mission interfaces',
  hint:'click the tracker to cycle satellites',
  html:`<div class="d-fui-orbit" role="region" aria-label="Interactive fictional orbital tracker">
  <header class="d-fui-orbit-topbar"><span>INTRX / ORBITAL ARRAY</span><span class="d-fui-orbit-live"><i></i>TRACK <b class="d-fui-orbit-track-index">02/03</b></span></header>
  <button class="d-fui-orbit-scene" type="button" aria-label="SAT-02 selected. Activate to select the next satellite.">
    <svg class="d-fui-orbit-svg" aria-hidden="true" focusable="false">
      <g class="d-fui-orbit-back"></g>
      <g class="d-fui-orbit-trails-back"></g>
      <g class="d-fui-orbit-heads-back"></g>
      <g class="d-fui-orbit-planet">
        <circle class="d-fui-orbit-globe" r="24"></circle>
        <ellipse class="d-fui-orbit-latitude" data-latitude="0" rx="21" ry="4"></ellipse>
        <ellipse class="d-fui-orbit-latitude" data-latitude="1" rx="23" ry="6"></ellipse>
        <ellipse class="d-fui-orbit-latitude" data-latitude="2" rx="21" ry="4"></ellipse>
      </g>
      <g class="d-fui-orbit-front"></g>
      <g class="d-fui-orbit-trails-front"></g>
      <g class="d-fui-orbit-heads-front"></g>
      <path class="d-fui-orbit-station"></path>
      <circle class="d-fui-orbit-station-pulse" r="2"></circle>
      <polyline class="d-fui-orbit-leader"></polyline>
    </svg>
    <output class="d-fui-orbit-readout" aria-hidden="true"><span>TARGET LINK</span><b class="d-fui-orbit-readout-text"></b></output>
    <span class="d-fui-orbit-legend" aria-hidden="true"><i></i>FRONT VECTOR <i></i>OCCLUDED 25%</span>
    <i class="d-fui-orbit-corner d-fui-orbit-corner-tl"></i><i class="d-fui-orbit-corner d-fui-orbit-corner-tr"></i><i class="d-fui-orbit-corner d-fui-orbit-corner-bl"></i><i class="d-fui-orbit-corner d-fui-orbit-corner-br"></i>
  </button>
  <footer class="d-fui-orbit-footer"><span class="d-fui-orbit-target">SAT-02 / LOCKED</span><span class="d-fui-orbit-station-state">GS NOMINAL</span><span class="d-fui-orbit-clock">T+000.0</span></footer>
  <span class="d-fui-orbit-status" aria-live="polite" aria-atomic="true"></span>
</div>`,
  css:`
.d-fui-orbit{position:relative;width:100%;height:320px;box-sizing:border-box;container-type:inline-size;display:grid;grid-template-rows:18px minmax(0,1fr) 14px;gap:4px;overflow:hidden;padding:8px 10px;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',monospace;isolation:isolate}
.d-fui-orbit:before{content:'';position:absolute;inset:0;z-index:10;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.018) 2px 3px),radial-gradient(circle at 42% 54%,rgba(167,139,250,.035),transparent 43%)}
.d-fui-orbit-topbar,.d-fui-orbit-footer{position:relative;z-index:12;display:flex;align-items:center;justify-content:space-between;min-width:0;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em;text-transform:uppercase}
.d-fui-orbit-live{display:flex;align-items:center;gap:5px;color:#9b9ba3}.d-fui-orbit-live i{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.42)}.d-fui-orbit-live b{color:#ececef;font:inherit}
.d-fui-orbit-scene{position:relative;z-index:2;display:block;width:100%;height:100%;min-width:0;min-height:0;overflow:hidden;box-sizing:border-box;padding:0;border:1px solid #232327;border-radius:4px;background:#101012;color:inherit;font:inherit;text-align:left;cursor:pointer;touch-action:manipulation}
.d-fui-orbit-scene:hover{border-color:#2e2e34}.d-fui-orbit-scene:focus-visible{outline:2px solid rgba(167,139,250,.72);outline-offset:-3px;border-color:#a78bfa}
.d-fui-orbit-svg{display:block;width:100%;height:100%;overflow:hidden}
.d-fui-orbit-back path,.d-fui-orbit-front path{fill:none;stroke:#2e2e34;stroke-width:1;vector-effect:non-scaling-stroke}.d-fui-orbit-back{opacity:.25}
.d-fui-orbit-globe{fill:#101012;stroke:#2e2e34;stroke-width:1;vector-effect:non-scaling-stroke}.d-fui-orbit-latitude{fill:none;stroke:#2e2e34;stroke-width:1;stroke-dasharray:3 3;vector-effect:non-scaling-stroke}
.d-fui-orbit-trail{fill:#ececef}.d-fui-orbit-trail[data-selected="true"]{fill:#a78bfa}.d-fui-orbit-trails-back,.d-fui-orbit-heads-back{opacity:.25}
.d-fui-orbit-head{fill:#ececef;stroke:#101012;stroke-width:.75;vector-effect:non-scaling-stroke}.d-fui-orbit-head[data-selected="true"]{fill:#a78bfa;filter:drop-shadow(0 0 4px #a78bfa)}
.d-fui-orbit-station{fill:#101012;stroke:#9b9ba3;stroke-width:1;vector-effect:non-scaling-stroke}.d-fui-orbit-station.d-fui-orbit-is-blip{fill:#4ade80;stroke:#4ade80;filter:drop-shadow(0 0 5px #4ade80)}
.d-fui-orbit-station-pulse{fill:none;stroke:#4ade80;stroke-width:1;opacity:0;vector-effect:non-scaling-stroke}
.d-fui-orbit-leader{fill:none;stroke:#a78bfa;stroke-width:1;stroke-opacity:.58;vector-effect:non-scaling-stroke}
.d-fui-orbit-readout{position:absolute;z-index:4;top:12px;right:9px;width:132px;min-height:41px;box-sizing:border-box;padding:6px 6px 5px 9px;border-left:2px solid #a78bfa;background:rgba(10,10,11,.88);color:#ececef;font:500 10px/1.45 'JetBrains Mono',monospace;letter-spacing:.03em;white-space:normal;pointer-events:none}.d-fui-orbit-readout>span{display:block;margin-bottom:2px;color:#5c5c66;font-size:9px;letter-spacing:.08em}.d-fui-orbit-readout-text{font:inherit}.d-fui-orbit[data-typing="true"] .d-fui-orbit-readout-text:after{content:'';display:inline-block;width:2px;height:10px;margin-left:2px;background:#a78bfa;vertical-align:-1px}
.d-fui-orbit-legend{position:absolute;z-index:4;left:9px;bottom:8px;display:flex;align-items:center;gap:5px;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.05em;pointer-events:none}.d-fui-orbit-legend i{width:12px;height:1px;background:#2e2e34}.d-fui-orbit-legend i:last-of-type{opacity:.25}
.d-fui-orbit-corner{position:absolute;z-index:7;width:8px;height:8px;pointer-events:none}.d-fui-orbit-corner-tl{left:3px;top:3px;border-left:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-orbit-corner-tr{right:3px;top:3px;border-right:2px solid #2e2e34;border-top:2px solid #2e2e34}.d-fui-orbit-corner-bl{left:3px;bottom:3px;border-left:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-orbit-corner-br{right:3px;bottom:3px;border-right:2px solid #2e2e34;border-bottom:2px solid #2e2e34}.d-fui-orbit-scene:hover .d-fui-orbit-corner,.d-fui-orbit-scene:focus-visible .d-fui-orbit-corner{border-color:#a78bfa}
.d-fui-orbit-footer{border-top:1px solid #232327}.d-fui-orbit-target{color:#a78bfa}.d-fui-orbit-station-state{color:#9b9ba3}.d-fui-orbit[data-station-blip="true"] .d-fui-orbit-station-state{color:#4ade80}.d-fui-orbit-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@container(max-width:340px){.d-fui-orbit-readout{right:7px;width:122px;padding-left:7px;font-size:9px}.d-fui-orbit-legend{font-size:8px;gap:4px}.d-fui-orbit-footer .d-fui-orbit-clock{display:none}}
@media(prefers-reduced-motion:reduce){.d-fui-orbit *{animation:none!important;transition:none!important}}
`,
  js:`const scene=root.querySelector('.d-fui-orbit-scene');
const svg=root.querySelector('.d-fui-orbit-svg');
const orbitBack=root.querySelector('.d-fui-orbit-back');
const orbitFront=root.querySelector('.d-fui-orbit-front');
const trailsBack=root.querySelector('.d-fui-orbit-trails-back');
const trailsFront=root.querySelector('.d-fui-orbit-trails-front');
const headsBack=root.querySelector('.d-fui-orbit-heads-back');
const headsFront=root.querySelector('.d-fui-orbit-heads-front');
const globe=root.querySelector('.d-fui-orbit-globe');
const latitudes=[...root.querySelectorAll('.d-fui-orbit-latitude')];
const station=root.querySelector('.d-fui-orbit-station');
const stationPulse=root.querySelector('.d-fui-orbit-station-pulse');
const leader=root.querySelector('.d-fui-orbit-leader');
const readout=root.querySelector('.d-fui-orbit-readout');
const readoutText=root.querySelector('.d-fui-orbit-readout-text');
const trackIndex=root.querySelector('.d-fui-orbit-track-index');
const targetLabel=root.querySelector('.d-fui-orbit-target');
const stationState=root.querySelector('.d-fui-orbit-station-state');
const clock=root.querySelector('.d-fui-orbit-clock');
const status=root.querySelector('.d-fui-orbit-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http:'+'//www.w3.org/2000/svg';
const TAU=Math.PI*2;
const RAD=Math.PI/180;
const planetRadius=24;
const latitudeCount=3;
const dashPeriod=20000;
const trailCount=12;
const trailLag=.055;
const orbitBackAlpha=.25;
const headDiameter=3;
const rotationDuration=350;
const rotationEasing='cubic-bezier(0.65, 0, 0.35, 1)';
const typeDelay=22;
const blipDuration=600;
const stationPhase=Math.PI*1.5;
const configs=[
  {id:'SAT-01',period:6000,rx:78,ry:27,tilt:-28,phase:.35,alt:357,vel:'7.8'},
  {id:'SAT-02',period:9000,rx:104,ry:40,tilt:8,phase:4.5684,alt:412,vel:'7.6'},
  {id:'SAT-03',period:13000,rx:132,ry:54,tilt:34,phase:2.4,alt:536,vel:'7.3'}
];
const backPaths=new Map();
const frontPaths=new Map();
const trails=new Map();
const heads=new Map();
configs.forEach(function(config){
  const back=document.createElementNS(NS,'path');
  back.dataset.sat=config.id;
  orbitBack.appendChild(back);
  backPaths.set(config.id,back);
  const front=document.createElementNS(NS,'path');
  front.dataset.sat=config.id;
  orbitFront.appendChild(front);
  frontPaths.set(config.id,front);
  const trailNodes=[];
  for(let index=0;index<trailCount;index++){
    const dot=document.createElementNS(NS,'circle');
    dot.classList.add('d-fui-orbit-trail');
    dot.dataset.sat=config.id;
    dot.dataset.trail=String(index);
    dot.setAttribute('r',index<4?'1.1':'.85');
    trailsFront.appendChild(dot);
    trailNodes.push(dot);
  }
  trails.set(config.id,trailNodes);
  const head=document.createElementNS(NS,'circle');
  head.classList.add('d-fui-orbit-head');
  head.dataset.sat=config.id;
  head.setAttribute('r','1.5');
  headsFront.appendChild(head);
  heads.set(config.id,head);
});
let width=0;
let height=0;
let centerX=0;
let centerY=0;
let selected=1;
let simulationTime=0;
let frames=0;
let selections=0;
let blips=0;
let source='initial';
let visible=true;
let documentVisible=document.visibilityState!=='hidden';
let running=false;
let lastFrame=0;
let frameId=0;
let observer=null;
let resizeObserver=null;
let connectionObserver=null;
let sceneRotation=-configs[selected].tilt;
let rotationFrom=sceneRotation;
let rotationTarget=sceneRotation;
let rotationStart=0;
let rotationProgress=1;
let rotationEase=1;
let rotationAnimating=false;
let readoutTarget=targetText(configs[selected]);
let typedChars=reduced?readoutTarget.length:0;
let typeStart=0;
let typing=!reduced;
let stationArmed=true;
let stationBlip=false;
let blipStart=0;
let blipProgress=0;
let selectedPoint={x:0,y:0,z:0,phase:0};
function targetText(config){return config.id+' / ALT '+config.alt+'KM / VEL '+config.vel}
function createHash(text){
  let hash=2166136261;
  for(let index=0;index<text.length;index++){hash^=text.charCodeAt(index);hash=Math.imul(hash,16777619)}
  return (hash>>>0).toString(16).toUpperCase().padStart(8,'0');
}
const configSignature=createHash(configs.map(function(config){return [config.id,config.period,config.rx,config.ry,config.tilt,config.phase.toFixed(4),config.alt,config.vel].join(':')}).join('|'));
function normalizeAngle(value){value%=TAU;return value<0?value+TAU:value}
function angleDistance(first,second){const diff=Math.abs(normalizeAngle(first)-normalizeAngle(second));return Math.min(diff,TAU-diff)}
function sampleCurve(t,first,second){const inverse=1-t;return 3*inverse*inverse*t*first+3*inverse*t*t*second+t*t*t}
function sampleSlope(t,first,second){return 3*(1-t)*(1-t)*first+6*(1-t)*t*(second-first)+3*t*t*(1-second)}
function easeCamera(value){
  let parameter=value;
  for(let index=0;index<6;index++){
    const slope=sampleSlope(parameter,.65,.35);
    if(Math.abs(slope)<.0001)break;
    parameter-=((sampleCurve(parameter,.65,.35)-value)/slope);
    parameter=Math.max(0,Math.min(1,parameter));
  }
  let low=0,high=1;
  for(let index=0;index<8;index++){
    const estimate=sampleCurve(parameter,.65,.35);
    if(Math.abs(estimate-value)<.00001)break;
    if(estimate<value)low=parameter;else high=parameter;
    parameter=(low+high)/2;
  }
  return sampleCurve(parameter,0,1);
}
function phaseFor(config,time,lag){return normalizeAngle(config.phase+time*TAU/config.period-(lag||0))}
function pointFor(config,phase,camera){
  const angle=(config.tilt+camera)*RAD;
  const baseX=config.rx*Math.cos(phase);
  const baseY=config.ry*Math.sin(phase);
  return {x:centerX+baseX*Math.cos(angle)-baseY*Math.sin(angle),y:centerY+baseX*Math.sin(angle)+baseY*Math.cos(angle),z:Math.sin(phase),phase};
}
function pathFor(config,start,end){
  let path='';
  const steps=72;
  for(let index=0;index<=steps;index++){
    const phase=start+(end-start)*index/steps;
    const point=pointFor(config,phase,sceneRotation);
    path+=(index?'L':'M')+point.x.toFixed(2)+' '+point.y.toFixed(2);
  }
  return path;
}
function updateGeometry(){
  const rect=scene.getBoundingClientRect();
  width=rect.width;
  height=rect.height;
  centerX=Math.max(134,Math.min(150,width*.41));
  centerY=Math.max(132,Math.min(height-84,height*.57));
  svg.setAttribute('width',String(width));
  svg.setAttribute('height',String(height));
  globe.setAttribute('cx',centerX.toFixed(2));
  globe.setAttribute('cy',centerY.toFixed(2));
  latitudes.forEach(function(latitude,index){latitude.setAttribute('cx',centerX.toFixed(2));latitude.setAttribute('cy',(centerY+(index-1)*8).toFixed(2))});
  station.setAttribute('d','M '+(centerX-4).toFixed(2)+' '+(centerY-25).toFixed(2)+' L '+centerX.toFixed(2)+' '+(centerY-33).toFixed(2)+' L '+(centerX+4).toFixed(2)+' '+(centerY-25).toFixed(2)+' Z');
  stationPulse.setAttribute('cx',centerX.toFixed(2));
  stationPulse.setAttribute('cy',(centerY-30).toFixed(2));
  render();
  expose('resize');
}
function updateRotation(){
  if(!rotationAnimating)return;
  rotationProgress=Math.min(1,(simulationTime-rotationStart)/rotationDuration);
  rotationEase=easeCamera(rotationProgress);
  sceneRotation=rotationFrom+(rotationTarget-rotationFrom)*rotationEase;
  if(rotationProgress>=1){sceneRotation=rotationTarget;rotationAnimating=false}
}
function updateTyping(){
  if(reduced){typedChars=readoutTarget.length;typing=false;return}
  typedChars=Math.min(readoutTarget.length,Math.max(0,Math.floor((simulationTime-typeStart)/typeDelay)));
  typing=typedChars<readoutTarget.length;
}
function updateStation(){
  if(reduced){stationBlip=false;blipProgress=0;return}
  const phase=phaseFor(configs[selected],simulationTime,0);
  const distance=angleDistance(phase,stationPhase);
  if(stationArmed&&distance<=.08){stationArmed=false;stationBlip=true;blipStart=simulationTime;blipProgress=0;blips++}
  if(!stationArmed&&distance>=.2)stationArmed=true;
  if(stationBlip){
    blipProgress=Math.min(1,(simulationTime-blipStart)/blipDuration);
    if(blipProgress>=1){stationBlip=false;blipProgress=0}
  }
}
function render(){
  if(!width||!height)return;
  const dashOffset=-(simulationTime%dashPeriod)/dashPeriod*12;
  latitudes.forEach(function(latitude){latitude.setAttribute('stroke-dashoffset',dashOffset.toFixed(3))});
  configs.forEach(function(config,index){
    backPaths.get(config.id).setAttribute('d',pathFor(config,0,Math.PI));
    frontPaths.get(config.id).setAttribute('d',pathFor(config,Math.PI,TAU));
    const isSelected=index===selected;
    const trailNodes=trails.get(config.id);
    trailNodes.forEach(function(dot,trailIndex){
      const point=pointFor(config,phaseFor(config,simulationTime,trailLag*(trailIndex+1)),sceneRotation);
      dot.setAttribute('cx',point.x.toFixed(2));
      dot.setAttribute('cy',point.y.toFixed(2));
      dot.setAttribute('opacity',(0.62*(1-trailIndex/trailCount)).toFixed(3));
      dot.dataset.selected=String(isSelected);
      const parent=point.z>0?trailsBack:trailsFront;
      if(dot.parentNode!==parent)parent.appendChild(dot);
    });
    const point=pointFor(config,phaseFor(config,simulationTime,0),sceneRotation);
    const head=heads.get(config.id);
    head.setAttribute('cx',point.x.toFixed(2));
    head.setAttribute('cy',point.y.toFixed(2));
    head.dataset.selected=String(isSelected);
    const headParent=point.z>0?headsBack:headsFront;
    if(head.parentNode!==headParent)headParent.appendChild(head);
    if(isSelected)selectedPoint=point;
  });
  const anchorX=readout.offsetLeft;
  const anchorY=readout.offsetTop+readout.offsetHeight/2;
  leader.setAttribute('points',selectedPoint.x.toFixed(2)+','+selectedPoint.y.toFixed(2)+' '+(anchorX-13).toFixed(2)+','+anchorY.toFixed(2)+' '+anchorX.toFixed(2)+','+anchorY.toFixed(2));
  station.classList.toggle('d-fui-orbit-is-blip',stationBlip);
  stationPulse.setAttribute('r',stationBlip?(2+blipProgress*12).toFixed(2):'2');
  stationPulse.setAttribute('opacity',stationBlip?(1-blipProgress).toFixed(3):'0');
  readoutText.textContent=readoutTarget.slice(0,typedChars);
  trackIndex.textContent=String(selected+1).padStart(2,'0')+'/03';
  targetLabel.textContent=configs[selected].id+' / LOCKED';
  stationState.textContent=stationBlip?'GS OVERHEAD':'GS NOMINAL';
  clock.textContent='T+'+(simulationTime/1000).toFixed(1).padStart(5,'0');
  scene.setAttribute('aria-label',configs[selected].id+' selected. Activate to select the next satellite.');
}
function positionSignature(){
  return configs.map(function(config){const point=pointFor(config,phaseFor(config,simulationTime,0),sceneRotation);return config.id+':'+(point.x-centerX).toFixed(2)+','+(point.y-centerY).toFixed(2)+','+(point.z>0?'B':'F')}).join('|')
}
const initialLocalSignature=(function(){
  const previousX=centerX,previousY=centerY;
  centerX=0;centerY=0;
  const value=configs.map(function(config){const point=pointFor(config,config.phase,-configs[1].tilt);return config.id+':'+point.x.toFixed(2)+','+point.y.toFixed(2)+','+(point.z>0?'B':'F')}).join('|');
  centerX=previousX;centerY=previousY;
  return value;
})();
function expose(nextSource){
  if(nextSource)source=nextSource;
  root.dataset.planetRadius=String(planetRadius);
  root.dataset.latitudeCount=String(latitudeCount);
  root.dataset.dashPeriod=String(dashPeriod);
  root.dataset.dashOffset=(-(simulationTime%dashPeriod)/dashPeriod*12).toFixed(3);
  root.dataset.orbitPeriods=configs.map(function(config){return config.period}).join(',');
  root.dataset.orbitRadii=configs.map(function(config){return config.rx+'x'+config.ry}).join(',');
  root.dataset.orbitTilts=configs.map(function(config){return config.tilt}).join(',');
  root.dataset.trailCount=String(trailCount);
  root.dataset.trailTotal=String(trailCount*configs.length);
  root.dataset.trailLag=String(trailLag);
  root.dataset.orbitBackAlpha=String(orbitBackAlpha);
  root.dataset.headDiameter=String(headDiameter);
  root.dataset.rotationDuration=String(rotationDuration);
  root.dataset.rotationEasing=rotationEasing;
  root.dataset.typeDelay=String(typeDelay);
  root.dataset.blipDuration=String(blipDuration);
  root.dataset.selected=String(selected);
  root.dataset.selectedId=configs[selected].id;
  root.dataset.phases=configs.map(function(config){return phaseFor(config,simulationTime,0).toFixed(4)}).join(',');
  root.dataset.positions=positionSignature();
  root.dataset.initialPositions=initialLocalSignature;
  root.dataset.cameraAngle=sceneRotation.toFixed(4);
  root.dataset.cameraTarget=rotationTarget.toFixed(4);
  root.dataset.rotationProgress=rotationProgress.toFixed(4);
  root.dataset.rotationEase=rotationEase.toFixed(4);
  root.dataset.rotationAnimating=String(rotationAnimating);
  root.dataset.readoutTarget=readoutTarget;
  root.dataset.readoutText=readoutTarget.slice(0,typedChars);
  root.dataset.typing=String(typing);
  root.dataset.typedChars=String(typedChars);
  root.dataset.blips=String(blips);
  root.dataset.stationBlip=String(stationBlip);
  root.dataset.blipProgress=blipProgress.toFixed(4);
  root.dataset.frames=String(frames);
  root.dataset.simulationTime=simulationTime.toFixed(1);
  root.dataset.selections=String(selections);
  root.dataset.running=String(running);
  root.dataset.reduced=String(reduced);
  root.dataset.source=source;
  root.dataset.configSignature=configSignature;
  root.dataset.width=width.toFixed(2);
  root.dataset.height=height.toFixed(2);
  root.dataset.center=centerX.toFixed(2)+','+centerY.toFixed(2);
  root.dataset.selectedPoint=selectedPoint.x.toFixed(2)+','+selectedPoint.y.toFixed(2)+','+selectedPoint.z.toFixed(4);
  root.dataset.leaderPoints=leader.getAttribute('points')||'';
  root.dataset.stationArmed=String(stationArmed);
  root.dataset.stationPhase=stationPhase.toFixed(4);
  root.dataset.typing=String(typing);
}
function selectNext(nextSource){
  selected=(selected+1)%configs.length;
  selections++;
  rotationFrom=sceneRotation;
  rotationTarget=-configs[selected].tilt;
  rotationStart=simulationTime;
  rotationProgress=reduced?1:0;
  rotationEase=reduced?1:0;
  rotationAnimating=!reduced&&Math.abs(rotationTarget-rotationFrom)>.001;
  if(reduced)sceneRotation=rotationTarget;
  readoutTarget=targetText(configs[selected]);
  typedChars=reduced?readoutTarget.length:0;
  typeStart=simulationTime;
  typing=!reduced;
  stationArmed=angleDistance(phaseFor(configs[selected],simulationTime,0),stationPhase)>.08;
  stationBlip=false;
  blipProgress=0;
  status.textContent=configs[selected].id+' selected. '+readoutTarget+'.';
  scene.focus({preventScroll:true});
  render();
  expose(nextSource);
}
scene.addEventListener('click',function(event){selectNext(event.detail===0?'keyboard':'pointer')});
function canRun(){return !reduced&&visible&&documentVisible&&root.isConnected}
function stop(){
  if(frameId)cancelAnimationFrame(frameId);
  frameId=0;
  running=false;
  expose('pause');
}
function start(){
  if(!canRun()||running)return;
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
  document.removeEventListener('visibilitychange',onVisibility);
}
function frame(now){
  frameId=0;
  if(!root.isConnected){cleanup();return}
  if(!canRun()){running=false;expose('pause');return}
  const delta=Math.min(50,Math.max(0,now-lastFrame));
  lastFrame=now;
  simulationTime+=delta;
  updateRotation();
  updateTyping();
  updateStation();
  render();
  frames++;
  expose('frame');
  frameId=requestAnimationFrame(frame);
}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';if(documentVisible)start();else stop()}
document.addEventListener('visibilitychange',onVisibility);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(updateGeometry);resizeObserver.observe(scene)}
if('IntersectionObserver'in window){observer=new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:.05});observer.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.body,{childList:true,subtree:true})}
updateGeometry();
updateTyping();
render();
expose(reduced?'reduced':'initial');
if(!reduced)start()`,
  prompt:`Build a self-contained 320px-tall fictional orbital tracker in JetBrains Mono using only the site dark palette, #a78bfa accent, and #4ade80 success. The entire scene is one native button with a visible focus ring and a polite live region that announces only deliberate target changes. Its SVG must contain an exact 24px-radius wireframe planet, exactly three dashed latitude ellipses, three deterministic inclined elliptical orbits split into full-opacity front and exactly 25%-opacity occluded halves, three exact 3px satellite heads, and exactly twelve fading trail dots per satellite.

Use fixed tracks SAT-01 (6000ms, 78x27, -28 degrees), SAT-02 (9000ms, 104x40, 8 degrees), and SAT-03 (13000ms, 132x54, 34 degrees). Drift the planet dash texture on an exact 20000ms active-time loop. Start on SAT-02. Its selected head is accent with a glow and a leader reaches an HTML corner readout in the exact form SAT-02 / ALT 412KM / VEL 7.6. Type at 22ms per character and restart on selection without putting the typer in a live region.

Click or native Enter/Space cycles SAT-02 to SAT-03 to SAT-01. On selection, ease the scene camera from its current angle to the negative of the target orbit tilt over exactly 350ms with cubic-bezier(.65,0,.35,1), so the selected orbit faces front. Retarget correctly mid-tween. A ground-station triangle above the planet blips #4ade80 for exactly 600ms whenever the selected phase passes its overhead bearing.

Drive phases, dash drift, typing, camera interpolation, and station blips from one visibility-aware requestAnimationFrame active-time scheduler with a 50ms delta cap, no hidden catch-up, ResizeObserver geometry, and root-disconnect cleanup. Expose exact constants and deterministic phase, position, camera, typing, selection, station, frame, time, running, and source telemetry. Under prefers-reduced-motion start no frame loop, type the representative initial readout fully, produce no automatic pass, and make manual selection, camera, leader, and readout changes instantaneous.`
});
