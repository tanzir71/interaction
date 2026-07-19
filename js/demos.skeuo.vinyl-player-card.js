/* INTRX registry - skeuomorphic vinyl player */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'vinyl-player-card',
  title:'Vinyl Player Card',
  cat:'Skeuomorph',
  rootClass:'d-skeuo-vinyl-player-card',
  tags:['vinyl','scrub','turntable'],
  libs:[],
  desc:'A compact turntable spins at a 33-rpm-inspired pace, moves its tonearm, and turns direct record dragging into a velocity-aware track scrub.',
  seen:"Seen on: Adi's Figma music players and the vinyl-player genre",
  hint:'drag the record to scrub; use the transport buttons or focus the disc and press Space',
  html:`<div class="d-skeuo-vinyl-player-card" role="region" aria-label="Interactive vinyl record player">
  <div class="d-skeuo-vinyl-player-card-head" aria-hidden="true"><span>PHONO / 33</span><span class="d-skeuo-vinyl-player-card-state"><i></i> PLAYING</span></div>
  <div class="d-skeuo-vinyl-player-card-player">
    <div class="d-skeuo-vinyl-player-card-deck">
      <div class="d-skeuo-vinyl-player-card-platter">
        <svg class="d-skeuo-vinyl-player-card-progress" viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="75"></circle></svg>
        <div class="d-skeuo-vinyl-player-card-record" role="slider" tabindex="0" aria-label="Record playback position" aria-valuemin="0" aria-valuemax="204" aria-valuenow="37" aria-valuetext="37 seconds of 204" aria-keyshortcuts="ArrowLeft ArrowRight PageUp PageDown Home End Space">
          <div class="d-skeuo-vinyl-player-card-label" aria-hidden="true"><span>INTRX</span><b>INX-033</b><i></i></div>
        </div>
      </div>
      <div class="d-skeuo-vinyl-player-card-tonearm" aria-hidden="true"><i></i><span></span><b></b></div>
    </div>
    <div class="d-skeuo-vinyl-player-card-info">
      <span class="d-skeuo-vinyl-player-card-kicker">NOW PLAYING / A1</span>
      <h3>Slow<br>Current</h3>
      <p>INTRX Field Unit</p>
      <div class="d-skeuo-vinyl-player-card-time"><strong>00:37</strong><span>/ 03:24</span></div>
      <div class="d-skeuo-vinyl-player-card-controls"><button class="d-skeuo-vinyl-player-card-play" type="button" aria-pressed="true" aria-label="Pause record"><i aria-hidden="true"></i><span>PAUSE</span></button><button class="d-skeuo-vinyl-player-card-rewind" type="button" aria-label="Rewind record">REW</button></div>
    </div>
  </div>
  <div class="d-skeuo-vinyl-player-card-foot" aria-hidden="true"><span>1.8S / REV</span><span>CAT. INX-033</span></div>
  <span class="d-skeuo-vinyl-player-card-status" aria-live="polite" aria-atomic="true">Slow Current playing</span>
</div>`,
  css:`
.d-skeuo-vinyl-player-card{--d-skeuo-vinyl-player-card-record-angle:0deg;--d-skeuo-vinyl-player-card-counter-angle:0deg;--d-skeuo-vinyl-player-card-tonearm-angle:-4deg;--d-skeuo-vinyl-player-card-groove-blur:0px;position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#101012;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate;touch-action:pan-y}
.d-skeuo-vinyl-player-card *{box-sizing:border-box}
.d-skeuo-vinyl-player-card-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-skeuo-vinyl-player-card-state{display:flex;align-items:center;gap:5px;color:#9b9ba3}
.d-skeuo-vinyl-player-card-state i{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 7px rgba(167,139,250,.45)}
.d-skeuo-vinyl-player-card-player{position:absolute;top:38px;right:12px;bottom:25px;left:12px;display:grid;grid-template-columns:3fr 2fr;overflow:hidden;border:1px solid #232327;border-radius:10px;background:linear-gradient(135deg,rgba(255,255,255,.018),transparent 35%),#101012;box-shadow:inset 0 1px rgba(255,255,255,.025)}
.d-skeuo-vinyl-player-card-deck{position:relative;min-width:0;overflow:hidden;border-right:1px solid #232327;background:radial-gradient(circle at 46% 53%,rgba(167,139,250,.055),transparent 46%)}
.d-skeuo-vinyl-player-card-platter{position:absolute;top:50%;left:49%;width:160px;height:160px;transform:translate(-50%,-50%)}
.d-skeuo-vinyl-player-card-platter::before{position:absolute;inset:3px;border:1px solid #232327;border-radius:50%;background:#0d0d0f;box-shadow:0 7px 12px rgba(0,0,0,.35),inset 0 0 0 3px #151518;content:''}
.d-skeuo-vinyl-player-card-record{position:absolute;top:5px;left:5px;width:150px;height:150px;border:1px solid #202024;border-radius:50%;outline:none;background:radial-gradient(circle at 42% 38%,#19191c,#0b0b0d 58%,#070708 100%);box-shadow:inset 0 0 11px #000,0 2px 6px rgba(0,0,0,.55);cursor:grab;touch-action:none;transform:rotate(var(--d-skeuo-vinyl-player-card-record-angle));will-change:transform}
.d-skeuo-vinyl-player-card-record::before{position:absolute;inset:3px;border-radius:50%;background:repeating-radial-gradient(circle,rgba(255,255,255,.034) 0 1px,transparent 1px 4px,rgba(0,0,0,.42) 4px 5px,transparent 5px 8px);filter:blur(var(--d-skeuo-vinyl-player-card-groove-blur));content:''}
.d-skeuo-vinyl-player-card-record::after{position:absolute;top:16px;left:30px;width:50px;height:9px;border-radius:50%;background:rgba(255,255,255,.035);filter:blur(5px);transform:rotate(-28deg);content:''}
.d-skeuo-vinyl-player-card-record:active{cursor:grabbing}
.d-skeuo-vinyl-player-card-record:focus-visible{box-shadow:0 0 0 2px #101012,0 0 0 4px #a78bfa,inset 0 0 11px #000}
.d-skeuo-vinyl-player-card-label{position:absolute;z-index:2;top:50%;left:50%;width:44px;height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:50%;color:#141416;background:#a78bfa;box-shadow:0 0 0 1px #c4a7ff;transform:translate(-50%,-50%) rotate(var(--d-skeuo-vinyl-player-card-counter-angle));pointer-events:none;will-change:transform}
.d-skeuo-vinyl-player-card-label span{font-size:7px;font-weight:800;line-height:1;letter-spacing:.08em}
.d-skeuo-vinyl-player-card-label b{margin-top:4px;font-size:5px;line-height:1;letter-spacing:.05em}
.d-skeuo-vinyl-player-card-label i{position:absolute;top:50%;left:50%;width:2px;height:2px;margin:-1px;border-radius:50%;background:#ececef;box-shadow:0 0 0 1px rgba(0,0,0,.3)}
.d-skeuo-vinyl-player-card-progress{position:absolute;z-index:3;inset:0;width:160px;height:160px;overflow:visible;pointer-events:none;transform:rotate(-90deg)}
.d-skeuo-vinyl-player-card-progress circle{fill:none;stroke:#a78bfa;stroke-width:1.25;stroke-linecap:round;stroke-dasharray:471.24;stroke-dashoffset:386.42;opacity:.32}
.d-skeuo-vinyl-player-card-tonearm{position:absolute;z-index:4;top:28px;left:calc(49% + 54px);width:16px;height:84px;transform:rotate(var(--d-skeuo-vinyl-player-card-tonearm-angle));transform-origin:8px 8px;will-change:transform;pointer-events:none}
.d-skeuo-vinyl-player-card-tonearm i{position:absolute;top:0;left:0;width:16px;height:13px;border:1px solid #33333a;border-radius:5px;background:#19191c;box-shadow:0 2px 3px rgba(0,0,0,.35)}
.d-skeuo-vinyl-player-card-tonearm span{position:absolute;top:8px;left:7px;width:2px;height:70px;border-radius:2px;background:linear-gradient(90deg,#707078,#c6c6cc 55%,#55555c);box-shadow:1px 1px 2px rgba(0,0,0,.25)}
.d-skeuo-vinyl-player-card-tonearm b{position:absolute;top:72px;left:4px;width:8px;height:12px;border-radius:2px;background:#a78bfa;box-shadow:0 1px 2px rgba(0,0,0,.4)}
.d-skeuo-vinyl-player-card-info{min-width:0;padding:24px 13px 15px;display:flex;flex-direction:column;background:linear-gradient(180deg,rgba(255,255,255,.018),transparent)}
.d-skeuo-vinyl-player-card-kicker{color:#a78bfa;font-size:7px;line-height:1;letter-spacing:.1em}
.d-skeuo-vinyl-player-card-info h3{margin:12px 0 0;color:#ececef;font-family:Inter,system-ui,sans-serif;font-size:clamp(15px,5cqw,21px);font-weight:650;line-height:.9;letter-spacing:-.04em}
.d-skeuo-vinyl-player-card-info p{margin:8px 0 0;color:#5c5c66;font-size:7px;line-height:1.3}
.d-skeuo-vinyl-player-card-time{display:flex;align-items:baseline;gap:4px;margin-top:auto;font-variant-numeric:tabular-nums}
.d-skeuo-vinyl-player-card-time strong{color:#ececef;font-size:13px;line-height:1}
.d-skeuo-vinyl-player-card-time span{color:#5c5c66;font-size:7px}
.d-skeuo-vinyl-player-card-controls{display:flex;gap:6px;margin-top:11px}
.d-skeuo-vinyl-player-card-controls button{height:32px;border:1px solid #33333a;border-radius:5px;outline:none;color:#9b9ba3;background:#161619;font-family:inherit;font-size:7px;font-weight:700;letter-spacing:.06em;cursor:pointer}
.d-skeuo-vinyl-player-card-controls button:hover,.d-skeuo-vinyl-player-card-controls button:focus-visible{border-color:#a78bfa;color:#ececef}
.d-skeuo-vinyl-player-card-play{min-width:55px;display:flex;align-items:center;justify-content:center;gap:5px}
.d-skeuo-vinyl-player-card-play i{width:0;height:0;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:6px solid #a78bfa}
.d-skeuo-vinyl-player-card-play[aria-pressed="true"] i{width:6px;height:8px;border:0;border-right:2px solid #a78bfa;border-left:2px solid #a78bfa}
.d-skeuo-vinyl-player-card-rewind{width:35px}
.d-skeuo-vinyl-player-card-foot{position:absolute;right:16px;bottom:9px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-skeuo-vinyl-player-card-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-skeuo-vinyl-player-card-player{right:10px;left:10px}.d-skeuo-vinyl-player-card-head,.d-skeuo-vinyl-player-card-foot{right:13px;left:13px}.d-skeuo-vinyl-player-card-info{padding-right:8px;padding-left:9px}.d-skeuo-vinyl-player-card-info h3{font-size:15px}.d-skeuo-vinyl-player-card-controls{gap:4px}.d-skeuo-vinyl-player-card-play{min-width:49px}.d-skeuo-vinyl-player-card-rewind{width:31px}}
@media(prefers-reduced-motion:reduce){.d-skeuo-vinyl-player-card *,.d-skeuo-vinyl-player-card *::before,.d-skeuo-vinyl-player-card *::after{animation:none!important;transition:none!important}}
`,
  js:`
const record=root.querySelector('.d-skeuo-vinyl-player-card-record'),progressCircle=root.querySelector('.d-skeuo-vinyl-player-card-progress circle'),tonearm=root.querySelector('.d-skeuo-vinyl-player-card-tonearm'),playButton=root.querySelector('.d-skeuo-vinyl-player-card-play'),rewindButton=root.querySelector('.d-skeuo-vinyl-player-card-rewind'),state=root.querySelector('.d-skeuo-vinyl-player-card-state'),readout=root.querySelector('.d-skeuo-vinyl-player-card-time strong'),status=root.querySelector('.d-skeuo-vinyl-player-card-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
const trackSeconds=204,revolutionDuration=1800,blendDuration=400,tonearmDuration=900,circumference=471.24,normalDegreesPerMs=360/revolutionDuration;
let progress=.18,recordAngle=0,playing=!reduced,toneAngle=playing?-4:-22,toneFrom=toneAngle,toneTarget=toneAngle,toneStart=0,toneMoving=false,dragging=false,pointerId=null,lastPointerAngle=0,lastPointerTime=0,dragVelocity=0,grooveBlur=0,blendStart=0,blendFrom=0,blendTarget=playing?1:0,blending=false,activeTime=0,lastWall=0,frameId=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function smooth(value){value=clamp(value,0,1);return value*value*(3-2*value)}
function format(seconds){const whole=Math.round(seconds);return String(Math.floor(whole/60)).padStart(2,'0')+':'+String(whole%60).padStart(2,'0')}
function normalizeAngle(value){while(value>180)value-=360;while(value<-180)value+=360;return value}
function pointerAngle(event){const bounds=record.getBoundingClientRect();return Math.atan2(event.clientY-bounds.top-bounds.height/2,event.clientX-bounds.left-bounds.width/2)*180/Math.PI}
function render(){root.style.setProperty('--d-skeuo-vinyl-player-card-record-angle',recordAngle.toFixed(3)+'deg');root.style.setProperty('--d-skeuo-vinyl-player-card-counter-angle',(-recordAngle).toFixed(3)+'deg');root.style.setProperty('--d-skeuo-vinyl-player-card-tonearm-angle',toneAngle.toFixed(3)+'deg');root.style.setProperty('--d-skeuo-vinyl-player-card-groove-blur',grooveBlur.toFixed(3)+'px');const seconds=progress*trackSeconds;readout.textContent=format(seconds);progressCircle.style.strokeDashoffset=(circumference*(1-progress)).toFixed(2);record.setAttribute('aria-valuenow',String(Math.round(seconds)));record.setAttribute('aria-valuetext',Math.round(seconds)+' seconds of '+trackSeconds)}
function beginTonearm(target){toneFrom=toneAngle;toneTarget=target;toneStart=activeTime;if(reduced){toneAngle=target;toneMoving=false;render()}else{toneMoving=Math.abs(toneTarget-toneFrom)>.01;requestFrame()}}
function setPlaying(next,message){playing=next;playButton.setAttribute('aria-pressed',String(playing));playButton.setAttribute('aria-label',playing?'Pause record':'Play record');playButton.querySelector('span').textContent=playing?'PAUSE':'PLAY';state.lastChild.textContent=playing?' PLAYING':' PAUSED';beginTonearm(playing?-4:-22);if(message)status.textContent=message;requestFrame()}
function setProgress(next,message){progress=clamp(next,0,1);render();if(message)status.textContent=message}
function updateTonearm(){if(!toneMoving)return;const progressValue=clamp((activeTime-toneStart)/tonearmDuration,0,1),direction=toneTarget>=toneFrom?1:-1,overshoot=toneTarget+direction;if(progressValue<.78)toneAngle=toneFrom+(overshoot-toneFrom)*smooth(progressValue/.78);else toneAngle=overshoot+(toneTarget-overshoot)*smooth((progressValue-.78)/.22);if(progressValue>=1){toneAngle=toneTarget;toneMoving=false}}
function currentVelocity(){if(!blending)return playing?1:0;const progressValue=clamp((activeTime-blendStart)/blendDuration,0,1),velocity=blendFrom+(blendTarget-blendFrom)*smooth(progressValue);grooveBlur=Math.max(0,grooveBlur*(1-progressValue));if(progressValue>=1){blending=false;grooveBlur=0;return blendTarget}return velocity}
function beginScrub(event){dragging=true;pointerId=event.pointerId;lastPointerAngle=pointerAngle(event);lastPointerTime=event.timeStamp;dragVelocity=playing?1:0;blending=false;try{record.setPointerCapture(pointerId)}catch(error){}event.preventDefault();status.textContent='Record scrub engaged'}
function moveScrub(event){if(!dragging||event.pointerId!==pointerId)return;const angle=pointerAngle(event),delta=normalizeAngle(angle-lastPointerAngle),elapsed=Math.max(1,event.timeStamp-lastPointerTime);lastPointerAngle=angle;lastPointerTime=event.timeStamp;recordAngle+=delta;progress=clamp(progress+delta/360,0,1);dragVelocity=clamp((delta/elapsed)/normalDegreesPerMs,-3,3);grooveBlur=clamp(Math.abs(dragVelocity)/1.6,0,1);render();status.textContent='Scrubbing at '+format(progress*trackSeconds)}
function endScrub(event){if(!dragging||event.pointerId!==pointerId)return;dragging=false;try{if(record.hasPointerCapture(pointerId))record.releasePointerCapture(pointerId)}catch(error){}pointerId=null;if(reduced){grooveBlur=0;render();status.textContent='Record positioned at '+format(progress*trackSeconds);return}blendStart=activeTime;blendFrom=dragVelocity;blendTarget=playing?1:0;blending=true;status.textContent=playing?'Playback resuming with velocity blend':'Record settling after scrub';requestFrame()}
record.addEventListener('pointerdown',beginScrub,listener);record.addEventListener('pointermove',moveScrub,listener);record.addEventListener('pointerup',endScrub,listener);record.addEventListener('pointercancel',endScrub,listener);record.addEventListener('lostpointercapture',endScrub,listener);
record.addEventListener('keydown',function(event){const keys=['ArrowLeft','ArrowRight','PageDown','PageUp','Home','End',' '];if(!keys.includes(event.key))return;event.preventDefault();if(event.key===' '){setPlaying(!playing,playing?'Playback paused':'Playback started');return}const step=(event.key==='PageUp'||event.key==='PageDown'?15:5)/trackSeconds,next=event.key==='Home'?0:event.key==='End'?1:progress+(event.key==='ArrowRight'||event.key==='PageUp'?step:-step);setProgress(next,'Keyboard scrub at '+format(clamp(next,0,1)*trackSeconds))},listener);
playButton.addEventListener('click',function(){setPlaying(!playing,playing?'Playback paused':'Playback started');record.focus()},listener);rewindButton.addEventListener('click',function(){recordAngle=0;setProgress(0,'Record rewound to the beginning');record.focus()},listener);
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible&&(playing||toneMoving||blending)}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(40,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;activeTime+=delta;updateTonearm();if(!dragging){const velocity=currentVelocity();recordAngle+=delta*normalDegreesPerMs*velocity;if(playing){progress+=delta/(trackSeconds*1000);if(progress>=1)progress-=1}}render();requestFrame()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.05});intersectionObserver.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
setPlaying(playing,reduced?'Record ready with continuous motion disabled':'Slow Current playing');render();requestFrame();
`,
  prompt:`Build one self-contained responsive 320px Skeuomorph record-player card on background-one, with the platter occupying the left sixty percent and track information plus controls on the right. Draw an exactly 150px near-black radial record with approximately eighteen alternating one-pixel groove rings, an exactly 44px accent center label carrying a monospaced catalog number, and a two-pixel spindle. Rotate the record linearly once every 1.8 seconds for a 33-rpm-inspired feel while counter-rotating its label so the text remains legible. Place a 70px tonearm at the platter's upper-right pivot with a visible counterweight. Play must move it from minus 22 to minus 4 degrees over 900 milliseconds ease-in-out, overshoot by one degree, and settle; pause returns it. Direct pointer dragging must capture the disc, derive rotation from atan2, update the playback readout, and blur only the grooves by at most one pixel at high velocity. On release, blend the captured angular velocity back to normal playback speed over 400 milliseconds. Draw a faint accent progress arc around the record edge. Add accessible play and rewind controls plus keyboard scrubbing, pause while hidden, clean up detached instances, and keep reduced motion operable without continuous spinning or animated tonearm movement.`
});
