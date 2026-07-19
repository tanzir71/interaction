/* INTRX registry — published glass refraction card demo only */
window.INTRX = window.INTRX || { demos: [], register(d) { this.demos.push(d); } };

INTRX.register({
  id: 'glass-refraction-card',
  title: 'Glass Refraction Card',
  cat: 'Skeuomorph',
  rootClass: 'd-glass-card',
  tags: ['glass', 'glare', 'refraction'],
  libs: [],
  desc: 'A translucent optical card tracks a local glare, shifts a displaced copy of the scene beneath it, transfers energy between four edge highlights, and tilts gently without losing its glass silhouette.',
  seen: 'Seen on: luxury product launches, spatial interfaces, identity studios, and experimental portfolio covers',
  hint: 'move across the glass — pin the light or change refraction strength',
  html: `
<div class="d-glass-card" tabindex="0" aria-label="Interactive glass refraction card. Move or use arrow keys, Space pins the light, R changes refraction, Home centers, and Escape releases.">
  <svg class="d-glass-card-filter" aria-hidden="true"><filter id="d-glass-card-warp"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.028" numOctaves="2" seed="7" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="13" xChannelSelector="R" yChannelSelector="B"/></filter></svg>
  <div class="d-glass-card-scene" aria-hidden="true">
    <i class="d-glass-card-orb d-glass-card-orb-a"></i><i class="d-glass-card-orb d-glass-card-orb-b"></i>
    <span>REFRACT</span><b>FIELD / 07</b><em></em>
  </div>
  <div class="d-glass-card-pane">
    <div class="d-glass-card-refract" aria-hidden="true"></div>
    <div class="d-glass-card-glare" aria-hidden="true"></div>
    <i class="d-glass-card-edge d-glass-card-edge-t" aria-hidden="true"></i><i class="d-glass-card-edge d-glass-card-edge-r" aria-hidden="true"></i><i class="d-glass-card-edge d-glass-card-edge-b" aria-hidden="true"></i><i class="d-glass-card-edge d-glass-card-edge-l" aria-hidden="true"></i>
    <div class="d-glass-card-content">
      <header><span>OPTICAL OBJECT</span><b>№ 014</b></header>
      <h3>Light bends<br>at the edge.</h3>
      <p>TRANSMISSION <strong>87.4%</strong></p>
      <footer><span>GLASS / CHROMA / DEPTH</span><i></i></footer>
    </div>
  </div>
  <div class="d-glass-card-foot">
    <p class="d-glass-card-status" aria-live="polite">Optical field at rest</p>
    <div><button class="d-glass-card-strength" type="button">Refraction: high</button><button class="d-glass-card-pin" type="button" aria-pressed="false">Pin light</button></div>
  </div>
</div>`,
  css: `
.d-glass-card { --gx:50%;--gy:50%;--tilt-x:0deg;--tilt-y:0deg;--shift-x:0px;--shift-y:0px;--light:0;--distortion:1;--edge-t:0;--edge-r:0;--edge-b:0;--edge-l:0; width:100%;min-height:500px;position:relative;overflow:hidden;box-sizing:border-box;padding:38px 20px 64px;color:#f2f4f7;background:#090c12;outline:none;perspective:900px;font-family:Roboto Mono,JetBrains Mono,monospace }
.d-glass-card:focus-visible{box-shadow:inset 0 0 0 2px #d7e9ff,inset 0 0 0 5px #090c12}.d-glass-card-filter{position:absolute;width:0;height:0}.d-glass-card-scene{position:absolute;inset:0;overflow:hidden;background:linear-gradient(125deg,#0b1020,#16102a 55%,#071b21)}
.d-glass-card-scene::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:34px 34px;mask-image:radial-gradient(circle,#000,transparent 76%)}.d-glass-card-scene>span{position:absolute;left:-2%;top:31%;color:rgba(255,255,255,.055);font:900 clamp(70px,18vw,160px)/1 Impact,sans-serif;letter-spacing:-.06em}.d-glass-card-scene>b{position:absolute;right:20px;top:18px;color:#79839a;font:650 9px/1 ui-monospace,monospace;letter-spacing:.15em}.d-glass-card-scene>em{position:absolute;left:14%;right:14%;top:54%;height:1px;background:linear-gradient(90deg,transparent,#7b8da8,transparent);transform:rotate(-12deg)}
.d-glass-card-orb{position:absolute;border-radius:50%;filter:blur(2px);opacity:.9}.d-glass-card-orb-a{width:240px;height:240px;left:9%;top:10%;background:radial-gradient(circle at 35% 30%,#ffcf8a,#ed526f 46%,transparent 72%)}.d-glass-card-orb-b{width:270px;height:270px;right:5%;bottom:-15%;background:radial-gradient(circle at 40% 36%,#7ff5ec,#3078e9 48%,transparent 72%)}
.d-glass-card-pane{position:relative;z-index:3;width:min(430px,86vw);height:310px;margin:0 auto;border:1px solid rgba(233,247,255,.32);border-radius:28px;overflow:hidden;transform:rotateX(var(--tilt-x)) rotateY(var(--tilt-y));transform-style:preserve-3d;background:linear-gradient(135deg,rgba(255,255,255,.16),rgba(255,255,255,.045) 45%,rgba(149,192,255,.08));backdrop-filter:blur(13px) saturate(1.35);-webkit-backdrop-filter:blur(13px) saturate(1.35);box-shadow:inset 0 1px rgba(255,255,255,.36),inset 0 -1px rgba(124,169,210,.18),0 30px 55px rgba(0,0,0,.34);will-change:transform}
.d-glass-card-refract{position:absolute;inset:-25px;background:radial-gradient(circle at 18% 24%,rgba(255,120,145,.72),transparent 27%),radial-gradient(circle at 83% 76%,rgba(64,183,255,.68),transparent 31%),linear-gradient(125deg,rgba(23,35,70,.5),rgba(33,16,57,.4));transform:translate(var(--shift-x),var(--shift-y)) scale(calc(1.04 + var(--distortion)*.035));filter:url('#d-glass-card-warp') blur(calc(1px + var(--distortion)*1.2px));opacity:calc(.18 + var(--distortion)*.2);mix-blend-mode:screen}
.d-glass-card-glare{position:absolute;inset:0;pointer-events:none;opacity:calc(var(--light)*.88);background:radial-gradient(circle at var(--gx) var(--gy),rgba(255,255,255,.88) 0,rgba(213,238,255,.34) 12%,rgba(160,199,255,.1) 25%,transparent 48%);mix-blend-mode:screen}
.d-glass-card-edge{position:absolute;z-index:4;pointer-events:none;background:#eefaff;filter:drop-shadow(0 0 5px rgba(169,220,255,.75))}.d-glass-card-edge-t{left:28px;right:28px;top:0;height:1px;opacity:calc(.12 + var(--edge-t)*.8)}.d-glass-card-edge-r{top:28px;bottom:28px;right:0;width:1px;opacity:calc(.12 + var(--edge-r)*.8)}.d-glass-card-edge-b{left:28px;right:28px;bottom:0;height:1px;opacity:calc(.12 + var(--edge-b)*.8)}.d-glass-card-edge-l{top:28px;bottom:28px;left:0;width:1px;opacity:calc(.12 + var(--edge-l)*.8)}
.d-glass-card-content{position:relative;z-index:5;height:100%;padding:25px 28px 22px;box-sizing:border-box;display:flex;flex-direction:column;text-shadow:0 1px 8px rgba(5,8,15,.4)}.d-glass-card-content header,.d-glass-card-content footer{display:flex;justify-content:space-between;align-items:center;color:#d8e2ef;font:650 8px/1 ui-monospace,monospace;letter-spacing:.14em}.d-glass-card-content header b{font-weight:650;color:#a8bbcf}.d-glass-card-content h3{margin:47px 0 16px;font:600 clamp(35px,7vw,54px)/.9 Georgia,serif;letter-spacing:-.045em}.d-glass-card-content p{margin:0;color:#b6c5d4;font:600 8px/1 ui-monospace,monospace;letter-spacing:.12em}.d-glass-card-content p strong{color:#fff}.d-glass-card-content footer{margin-top:auto}.d-glass-card-content footer i{width:30px;height:1px;background:#e8f8ff;box-shadow:0 0 7px #b8e8ff}
.d-glass-card-foot{position:absolute;z-index:6;left:20px;right:20px;bottom:17px;display:flex;justify-content:space-between;align-items:center;gap:14px}.d-glass-card-status{margin:0;color:#8895aa;font:600 9px/1.3 ui-monospace,monospace;letter-spacing:.06em}.d-glass-card-foot>div{display:flex;gap:7px}.d-glass-card button{min-height:32px;padding:7px 10px;border:1px solid #39465b;border-radius:3px;color:#a9b8cc;background:rgba(9,13,21,.76);font:650 8px/1 ui-monospace,monospace;letter-spacing:.07em;text-transform:uppercase;cursor:pointer}.d-glass-card button:hover,.d-glass-card button:focus-visible{color:#fff;border-color:#88a4c6;outline:none}.d-glass-card-pin[aria-pressed="true"]{color:#aeeaff;border-color:#78cbe7}
@media(max-width:520px){.d-glass-card{min-height:520px;padding-inline:10px}.d-glass-card-pane{height:325px}.d-glass-card-content{padding-inline:20px}.d-glass-card-foot{align-items:flex-start}.d-glass-card-status{max-width:125px}.d-glass-card-foot>div{flex-direction:column}}
@media(prefers-reduced-motion:reduce){.d-glass-card-pane{will-change:auto}}`,
  js: `
const pane=root.querySelector('.d-glass-card-pane');const status=root.querySelector('.d-glass-card-status');const pinButton=root.querySelector('.d-glass-card-pin');const strengthButton=root.querySelector('.d-glass-card-strength');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let pinned=false,hovering=false,strong=true;let target={x:.5,y:.5,amount:0},current={x:.5,y:.5,amount:0};
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function setPoint(x,y,message){target.x=clamp(x,0,1);target.y=clamp(y,0,1);if(message)status.textContent=message}
function setPinned(next){pinned=next;target.amount=pinned||hovering?1:0;pinButton.setAttribute('aria-pressed',String(pinned));pinButton.textContent=pinned?'Release light':'Pin light';status.textContent=pinned?'Optical field pinned':hovering?'Tracking local glare':'Optical field returning'}
function setStrength(next){strong=next;root.style.setProperty('--distortion',strong?'1':'.45');strengthButton.textContent=strong?'Refraction: high':'Refraction: low';status.textContent=strong?'High refraction field':'Low refraction field'}
pane.addEventListener('pointerenter',function(event){hovering=true;target.amount=1;const box=pane.getBoundingClientRect();setPoint((event.clientX-box.left)/box.width,(event.clientY-box.top)/box.height,'Tracking local glare')});
pane.addEventListener('pointermove',function(event){const box=pane.getBoundingClientRect();setPoint((event.clientX-box.left)/box.width,(event.clientY-box.top)/box.height,'Tracking local glare')},{passive:true});
pane.addEventListener('pointerleave',function(){hovering=false;if(!pinned){target.amount=0;status.textContent='Optical field returning'}});
pinButton.addEventListener('click',function(){setPinned(!pinned);root.focus()});strengthButton.addEventListener('click',function(){setStrength(!strong);root.focus()});
root.addEventListener('keydown',function(event){if(event.target===pinButton||event.target===strengthButton)return;const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home',' ','Escape','r','R'];if(keys.indexOf(event.key)===-1)return;event.preventDefault();if(event.key===' '){setPinned(!pinned);return}if(event.key==='r'||event.key==='R'){setStrength(!strong);return}if(event.key==='Escape'){pinned=false;hovering=false;target.amount=0;pinButton.setAttribute('aria-pressed','false');pinButton.textContent='Pin light';status.textContent='Optical field released';return}if(event.key==='Home')setPoint(.5,.5,'Glare centered');else{const step=event.shiftKey?.2:.1;setPoint(target.x+(event.key==='ArrowRight'?step:event.key==='ArrowLeft'?-step:0),target.y+(event.key==='ArrowDown'?step:event.key==='ArrowUp'?-step:0),'Keyboard optical field')}hovering=true;target.amount=1});
function render(){const x=current.x,y=current.y,a=current.amount;root.style.setProperty('--gx',(x*100).toFixed(2)+'%');root.style.setProperty('--gy',(y*100).toFixed(2)+'%');root.style.setProperty('--tilt-x',((.5-y)*8*a).toFixed(3)+'deg');root.style.setProperty('--tilt-y',((x-.5)*10*a).toFixed(3)+'deg');root.style.setProperty('--shift-x',((.5-x)*18*a).toFixed(3)+'px');root.style.setProperty('--shift-y',((.5-y)*14*a).toFixed(3)+'px');root.style.setProperty('--light',a.toFixed(4));root.style.setProperty('--edge-t',((1-y)*a).toFixed(4));root.style.setProperty('--edge-r',(x*a).toFixed(4));root.style.setProperty('--edge-b',(y*a).toFixed(4));root.style.setProperty('--edge-l',((1-x)*a).toFixed(4))}
function frame(){if(reduced){current.x=target.x;current.y=target.y;current.amount=target.amount}else{current.x+=(target.x-current.x)*.16;current.y+=(target.y-current.y)*.16;current.amount+=(target.amount-current.amount)*.13}render();requestAnimationFrame(frame)}
setStrength(true);requestAnimationFrame(frame);`,
  prompt: `Build a self-contained optical glass card over a colorful scene. Use backdrop-filter blur(13px) saturate(1.35), translucent layered fills, four independent one-pixel edge highlights, and a duplicate colored light field inside the card passed through an SVG turbulence/displacement filter. Shift that refracted field opposite cursor movement: shiftX=(0.5-x)*18*amount pixels and shiftY=(0.5-y)*14*amount pixels. Scale/filter it by a high or low refraction strength.

Track pointer coordinates normalized to the glass bounds. Drive a radial screen-blended glare at x/y, restrained tiltX=(0.5-y)*8*amount degrees and tiltY=(x-0.5)*10*amount degrees, and directional edges: top=(1-y)*amount, right=x*amount, bottom=y*amount, left=(1-x)*amount. Pointerenter activates, passive pointermove updates, and pointerleave decays unless pinned. Ease coordinates by 0.16 and light amount by 0.13 per frame.

Add semantic Pin Light with aria-pressed and a High/Low Refraction control. The focusable root supports arrows by 0.1, Shift arrows by 0.2, Home center, Space pin, R strength, and Escape release without intercepting button-origin keys. Under reduced motion snap directly while preserving optics, pointer tracking, pinning, strength, keyboard control, glare coordinates, opposite refraction shift, and edge-energy math.`
});
