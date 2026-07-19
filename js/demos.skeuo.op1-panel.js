/* INTRX registry - OP-1 inspired hardware panel */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'op1-panel',
  title:'OP-1 Hardware Panel',
  cat:'Skeuomorph',
  rootClass:'d-skeuo-op1-panel',
  tags:['hardware','synth','dot-matrix'],
  libs:[],
  desc:'A tactile light-faced synth panel pairs depthy keys, a detented encoder, a live dot-matrix display, and tiny gesture-gated WebAudio clicks.',
  seen:"Seen on: Lee Black's OP-1 calculator in Framer",
  hint:'press a key, drag or arrow the encoder, and use the corner switch to mute sounds',
  html:`<div class="d-skeuo-op1-panel" role="region" aria-label="Interactive OP-1 inspired hardware panel">
  <div class="d-skeuo-op1-panel-stage">
    <section class="d-skeuo-op1-panel-face" aria-label="Portable synth control surface">
      <header class="d-skeuo-op1-panel-header"><span aria-hidden="true"><b>OP</b> / CTRL</span><button class="d-skeuo-op1-panel-mute" type="button" role="switch" aria-checked="false" aria-label="Mute panel sounds"><span aria-hidden="true">SND</span><i aria-hidden="true"></i></button></header>
      <div class="d-skeuo-op1-panel-keys" aria-label="Synth keys">
        <button type="button" data-glyph="A" aria-label="Stamp glyph A"><span>A</span></button>
        <button type="button" data-glyph="B" aria-label="Stamp glyph B"><span>B</span></button>
        <button type="button" data-glyph="C" aria-label="Stamp glyph C"><span>C</span></button>
        <button type="button" data-glyph="D" aria-label="Stamp glyph D"><span>D</span></button>
      </div>
      <div class="d-skeuo-op1-panel-encoder-row">
        <div class="d-skeuo-op1-panel-encoder-shell" aria-hidden="true"><div class="d-skeuo-op1-panel-knob" role="slider" tabindex="0" aria-label="Encoder level" aria-valuemin="0" aria-valuemax="23" aria-valuenow="11" aria-valuetext="Detent 12 of 24" aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home End"><i></i></div></div>
        <div class="d-skeuo-op1-panel-encoder-copy" aria-hidden="true"><span>ENCODER / LEVEL</span><strong>12 / 24</strong><small>24 DETENTS · 6°</small></div>
      </div>
      <div class="d-skeuo-op1-panel-screen" role="img" aria-label="Thirty-four by twelve green dot-matrix display"><canvas class="d-skeuo-op1-panel-matrix" width="136" height="48" aria-hidden="true"></canvas></div>
    </section>
  </div>
  <span class="d-skeuo-op1-panel-status" aria-live="polite" aria-atomic="true">Synth panel ready</span>
</div>`,
  css:`
.d-skeuo-op1-panel{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#202024;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-skeuo-op1-panel *{box-sizing:border-box}
.d-skeuo-op1-panel-stage{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 45%,#151519,#0a0a0b 70%)}
.d-skeuo-op1-panel-face{width:calc(100% - 24px);height:286px;padding:9px 11px 10px;display:grid;grid-template-rows:24px 43px 54px minmax(0,1fr);gap:6px;border:1px solid #b8b8bf;border-radius:9px;background:#d8d8dc;box-shadow:inset 1px 1px 0 rgba(255,255,255,.72),inset -1px -1px 0 rgba(120,120,128,.18),0 5px 0 #85858c,0 9px 18px rgba(0,0,0,.38)}
.d-skeuo-op1-panel-header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(80,80,88,.22);color:#55555d;font-size:9px;line-height:1;letter-spacing:.1em}
.d-skeuo-op1-panel-header b{color:#25252a;font-size:11px}
.d-skeuo-op1-panel-mute{display:flex;align-items:center;gap:5px;padding:0;border:0;background:transparent;color:#626269;font-family:inherit;font-size:8px;font-weight:700;line-height:1;letter-spacing:.08em;cursor:pointer;outline:none}
.d-skeuo-op1-panel-mute i{position:relative;width:27px;height:13px;border:1px solid #9d9da4;border-radius:7px;background:#bfc0c5;box-shadow:inset 0 1px 2px rgba(0,0,0,.2)}
.d-skeuo-op1-panel-mute i::after{position:absolute;top:2px;left:2px;width:7px;height:7px;border-radius:50%;background:#f4f4f6;box-shadow:0 1px 1px rgba(0,0,0,.3);content:'';transition:transform .15s ease,background-color .15s ease}
.d-skeuo-op1-panel-mute[aria-checked="true"] i::after{transform:translateX(14px);background:#fa7319}
.d-skeuo-op1-panel-mute:focus-visible{box-shadow:0 0 0 2px #d8d8dc,0 0 0 3px #2a2a2e}
.d-skeuo-op1-panel-keys{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.d-skeuo-op1-panel-keys button{position:relative;height:43px;padding:0;border:1px solid #c4c4ca;border-bottom:2px solid #aaaab2;border-radius:5px;background:#efeff2;color:#313137;box-shadow:inset 0 1px 0 #fff,0 2px 3px rgba(70,70,78,.16);font-family:inherit;font-size:12px;font-weight:700;line-height:1;cursor:pointer;outline:none;transform:translateY(0)}
.d-skeuo-op1-panel-keys button::before{position:absolute;top:7px;left:7px;width:4px;height:4px;border-radius:50%;background:#fa7319;opacity:.55;content:''}
.d-skeuo-op1-panel-keys button:focus-visible{box-shadow:0 0 0 2px #d8d8dc,0 0 0 3px #2a2a2e}
.d-skeuo-op1-panel-keys button:active,.d-skeuo-op1-panel-keys button.d-skeuo-op1-panel-key-pressed{border-bottom-width:0;transform:translateY(2px);box-shadow:inset 0 1px 2px rgba(60,60,68,.14)}
.d-skeuo-op1-panel-encoder-row{display:flex;align-items:center;gap:13px;min-width:0}
.d-skeuo-op1-panel-encoder-shell{position:relative;width:54px;height:54px;flex:none;display:grid;place-items:center;border-radius:50%;background:repeating-conic-gradient(from -72deg,#77777e 0 1deg,transparent 1deg 6deg)}
.d-skeuo-op1-panel-knob{position:relative;width:44px;height:44px;border:1px solid #18181b;border-radius:50%;background:radial-gradient(circle at 35% 30%,#3a3a40,#2a2a2e 58%,#202024);box-shadow:inset 1px 1px 1px rgba(255,255,255,.1),0 2px 3px rgba(0,0,0,.28);outline:none;cursor:grab;touch-action:none;transform:rotate(var(--knob-angle,-3deg))}
.d-skeuo-op1-panel-knob:active{cursor:grabbing}
.d-skeuo-op1-panel-knob:focus-visible{box-shadow:0 0 0 2px #d8d8dc,0 0 0 3px #2a2a2e,inset 1px 1px 1px rgba(255,255,255,.1)}
.d-skeuo-op1-panel-knob i{position:absolute;top:5px;left:50%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:#fa7319;box-shadow:0 0 4px rgba(250,115,25,.55)}
.d-skeuo-op1-panel-encoder-copy{min-width:0;display:flex;flex-direction:column;gap:4px}
.d-skeuo-op1-panel-encoder-copy span{color:#66666d;font-size:8px;line-height:1;letter-spacing:.1em}
.d-skeuo-op1-panel-encoder-copy strong{color:#29292f;font-size:13px;line-height:1;font-weight:700;font-variant-numeric:tabular-nums}
.d-skeuo-op1-panel-encoder-copy small{color:#77777e;font-size:8px;line-height:1;letter-spacing:.06em}
.d-skeuo-op1-panel-screen{min-height:0;display:grid;place-items:center;overflow:hidden;border:1px solid #a9a9b0;border-radius:5px;background:#0a0a0b;box-shadow:inset 0 2px 5px rgba(0,0,0,.75),0 1px 0 rgba(255,255,255,.75)}
.d-skeuo-op1-panel-matrix{display:block;width:min(190px,92%);height:auto;aspect-ratio:34/12;image-rendering:pixelated}
.d-skeuo-op1-panel-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-skeuo-op1-panel-face{width:calc(100% - 20px);padding-right:9px;padding-left:9px}.d-skeuo-op1-panel-keys{gap:7px}.d-skeuo-op1-panel-encoder-row{gap:10px}}
@media(prefers-reduced-motion:reduce){.d-skeuo-op1-panel *,.d-skeuo-op1-panel *::before,.d-skeuo-op1-panel *::after{animation:none!important;transition:none!important}}
`,
  js:`
const keys=Array.from(root.querySelectorAll('.d-skeuo-op1-panel-keys button')),knob=root.querySelector('.d-skeuo-op1-panel-knob'),encoderReadout=root.querySelector('.d-skeuo-op1-panel-encoder-copy strong'),muteButton=root.querySelector('.d-skeuo-op1-panel-mute'),matrix=root.querySelector('.d-skeuo-op1-panel-matrix'),matrixContext=matrix.getContext('2d'),status=root.querySelector('.d-skeuo-op1-panel-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
const columns=34,rows=12,cell=4,tau=Math.PI*2,glyphs={A:['01110','10001','10001','11111','10001','10001','10001'],B:['11110','10001','10001','11110','10001','10001','11110'],C:['01111','10000','10000','10000','10000','10000','01111'],D:['11110','10001','10001','10001','10001','10001','11110']};
let encoderValue=11,screenMode='idle',screenGlyph='A',screenUntil=0,activeTime=0,lastWall=0,frameId=0,muted=false,audioContext=null,dragging=false,dragStartAngle=0,dragStartValue=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;const keyTimers=new Set();
function ensureAudio(){if(muted)return null;if(!audioContext){const AudioCtor=window.AudioContext||window.webkitAudioContext;if(!AudioCtor)return null;audioContext=new AudioCtor()}if(audioContext.state==='suspended')audioContext.resume().catch(function(){});return audioContext}
function tone(frequency,duration,volume){const audio=ensureAudio();if(!audio)return;const now=audio.currentTime,oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.type='square';oscillator.frequency.setValueAtTime(frequency,now);gain.gain.setValueAtTime(volume,now);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(now);oscillator.stop(now+duration)}
function playKey(index){tone(1900+index*100,.02,.032)}function playTick(value){tone(520+value*42,.014,.018)}
function dot(x,y,on){matrixContext.beginPath();matrixContext.arc(x*cell+2,y*cell+2,on?1.35:1.05,0,tau);matrixContext.fillStyle=on?'#4ade80':'rgba(74,222,128,.055)';if(on){matrixContext.shadowColor='rgba(74,222,128,.55)';matrixContext.shadowBlur=3}else matrixContext.shadowBlur=0;matrixContext.fill()}
function screenPixels(){const on=new Set();if(screenMode==='idle'){for(let x=0;x<columns;x++){const bounce=Math.sin(activeTime*.003)*.8,y=Math.max(1,Math.min(rows-2,Math.round(5.5+bounce+Math.sin(x*.43+activeTime*.0045)*3.4)));on.add(x+','+y)}}else if(screenMode==='glyph'){const pattern=glyphs[screenGlyph],startX=12,startY=2;pattern.forEach(function(line,y){for(let x=0;x<line.length;x++)if(line[x]==='1'){on.add(startX+x*2+','+(startY+y));on.add(startX+x*2+1+','+(startY+y))}})}else{const length=Math.round((encoderValue+1)/24*29);for(let x=2;x<=31;x++){on.add(x+',3');on.add(x+',8')}for(let y=4;y<=7;y++)for(let x=2;x<2+length;x++)on.add(x+','+y)}return on}
function drawScreen(){if(!reduced&&screenMode!=='idle'&&activeTime>=screenUntil)screenMode='idle';const on=screenPixels();matrixContext.clearRect(0,0,matrix.width,matrix.height);for(let y=0;y<rows;y++)for(let x=0;x<columns;x++)dot(x,y,on.has(x+','+y));matrixContext.shadowBlur=0}
function showGlyph(glyph){screenMode='glyph';screenGlyph=glyph;screenUntil=activeTime+900;drawScreen()}
function showBar(){screenMode='bar';screenUntil=activeTime+1000;drawScreen()}
function pressKey(button,index){showGlyph(button.dataset.glyph);status.textContent='Key '+button.dataset.glyph+' stamped on the matrix';playKey(index);if(!reduced){button.classList.add('d-skeuo-op1-panel-key-pressed');const timer=setTimeout(function(){button.classList.remove('d-skeuo-op1-panel-key-pressed');keyTimers.delete(timer)},70);keyTimers.add(timer)}requestFrame()}
keys.forEach(function(button,index){button.addEventListener('pointerdown',ensureAudio,listener);button.addEventListener('click',function(){pressKey(button,index)},listener)});
function setEncoder(next,withSound){next=Math.max(0,Math.min(23,next));if(next===encoderValue)return;const previous=encoderValue,direction=next>previous?1:-1;encoderValue=next;knob.style.setProperty('--knob-angle',(-69+encoderValue*6)+'deg');knob.setAttribute('aria-valuenow',String(encoderValue));knob.setAttribute('aria-valuetext','Detent '+(encoderValue+1)+' of 24');encoderReadout.textContent=String(encoderValue+1).padStart(2,'0')+' / 24';showBar();status.textContent='Encoder at detent '+(encoderValue+1)+' of 24';if(withSound)for(let value=previous+direction;direction>0?value<=next:value>=next;value+=direction)playTick(value);requestFrame()}
function pointerAngle(event){const bounds=knob.getBoundingClientRect();return Math.atan2(event.clientY-(bounds.top+bounds.height/2),event.clientX-(bounds.left+bounds.width/2))*180/Math.PI}
knob.addEventListener('pointerdown',function(event){ensureAudio();dragging=true;dragStartAngle=pointerAngle(event);dragStartValue=encoderValue;try{knob.setPointerCapture(event.pointerId)}catch(error){}event.preventDefault()},listener);knob.addEventListener('pointermove',function(event){if(!dragging)return;let delta=pointerAngle(event)-dragStartAngle;if(delta>180)delta-=360;if(delta<-180)delta+=360;setEncoder(Math.round(dragStartValue+delta/6),true)},listener);function endDrag(event){if(!dragging)return;dragging=false;try{if(knob.hasPointerCapture(event.pointerId))knob.releasePointerCapture(event.pointerId)}catch(error){}status.textContent='Encoder settled at detent '+(encoderValue+1)}knob.addEventListener('pointerup',endDrag,listener);knob.addEventListener('pointercancel',endDrag,listener);
knob.addEventListener('keydown',function(event){let next=encoderValue;if(event.key==='ArrowRight'||event.key==='ArrowUp')next++;else if(event.key==='ArrowLeft'||event.key==='ArrowDown')next--;else if(event.key==='Home')next=0;else if(event.key==='End')next=23;else return;event.preventDefault();ensureAudio();setEncoder(next,true)},listener);
muteButton.addEventListener('click',function(){muted=!muted;muteButton.setAttribute('aria-checked',String(muted));status.textContent=muted?'Panel sounds muted':'Panel sounds enabled'},listener);
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(50,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;activeTime+=delta;drawScreen();requestFrame()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();for(const timer of keyTimers)clearTimeout(timer);keyTimers.clear();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect();if(audioContext&&audioContext.state!=='closed')audioContext.close().catch(function(){})}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.05});intersectionObserver.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
knob.style.setProperty('--knob-angle',(-69+encoderValue*6)+'deg');drawScreen();requestFrame();
`,
  prompt:`Build one self-contained responsive 320px Skeuomorph hardware panel on a dark stage. Use a light #d8d8dc face with one-pixel #b8b8bf chamfer borders. Row one has four chunky #efeff2 square keys with a two-pixel darker bottom edge; pressing moves a key down two pixels, collapses the edge, plays a gesture-gated square-wave synth click near two kilohertz for twenty milliseconds, and stamps its glyph on the screen. Row two has one exactly forty-four-pixel #2a2a2e rotary encoder with an accent indicator; pointer drag and arrow keys snap through twenty-four six-degree detents, producing a short rising-pitch tick at each crossed value. Row three is a thirty-four-by-twelve dark dot-matrix well with green token pixels: idle draws a bouncing sine, key presses draw glyphs, and the encoder draws a growing bar. Keep every WebAudio square envelope at forty milliseconds or less and create audio only after a user gesture. Add a tiny accessible mute slide switch, pause rendering while hidden, clean up detached instances, and show a stable screen for reduced motion.`
});
