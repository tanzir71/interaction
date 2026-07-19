/* INTRX registry - native CSS scroll-snap carousel */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'scrollsnap-carousel',
  title:'Scroll Snap Carousel',
  cat:'Galleries & Sliders',
  rootClass:'d-gallery-scrollsnap-carousel',
  tags:['scroll snap','carousel','native scroll'],
  libs:[],
  desc:'Five editorial cards make native horizontal momentum and snap alignment visible through center-weighted scale, dimming, and a shared progress indicator.',
  seen:"Seen on: Charlie J's scroll-snap carousel thread",
  hint:'swipe or scroll the cards, use the arrow keys, then compare mandatory and proximity snapping',
  html:`<div class="d-gallery-scrollsnap-carousel" role="region" aria-label="Native scroll snap carousel">
  <div class="d-gallery-scrollsnap-carousel-head"><span aria-hidden="true">GALLERY / NATIVE SNAP</span><button class="d-gallery-scrollsnap-carousel-toggle" type="button" role="switch" aria-checked="true" aria-label="Scroll snap mode: mandatory. Activate for proximity."><i aria-hidden="true"><b></b></i><span>MANDATORY</span><em aria-hidden="true">⇄</em><span>PROXIMITY</span></button></div>
  <div class="d-gallery-scrollsnap-carousel-stage">
    <div class="d-gallery-scrollsnap-carousel-track" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Five cards. Scroll horizontally or use left and right arrow keys." aria-keyshortcuts="ArrowLeft ArrowRight Home End">
      <article aria-label="Slide 1 of 5, Quiet Geometry"><div aria-hidden="true"><i></i><i></i><i></i></div><span>01 / FORM STUDY</span><h3>Quiet<br>Geometry</h3><p>LINES / VOLUME / 2026</p></article>
      <article aria-label="Slide 2 of 5, Signal Garden"><div aria-hidden="true"><i></i><i></i><i></i></div><span>02 / FIELD NOTES</span><h3>Signal<br>Garden</h3><p>GROWTH / SYSTEM / 2026</p></article>
      <article aria-label="Slide 3 of 5, Blue Interval"><div aria-hidden="true"><i></i><i></i><i></i></div><span>03 / COLOR INDEX</span><h3>Blue<br>Interval</h3><p>LIGHT / RHYTHM / 2026</p></article>
      <article aria-label="Slide 4 of 5, Soft Circuit"><div aria-hidden="true"><i></i><i></i><i></i></div><span>04 / MATERIAL LOG</span><h3>Soft<br>Circuit</h3><p>TOUCH / CURRENT / 2026</p></article>
      <article aria-label="Slide 5 of 5, After Image"><div aria-hidden="true"><i></i><i></i><i></i></div><span>05 / MOTION TEST</span><h3>After<br>Image</h3><p>TRACE / MEMORY / 2026</p></article>
    </div>
  </div>
  <div class="d-gallery-scrollsnap-carousel-progress" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
  <div class="d-gallery-scrollsnap-carousel-foot" aria-hidden="true"><span class="d-gallery-scrollsnap-carousel-readout">01 / 05</span><span>SCROLL / ARROWS</span></div>
  <span class="d-gallery-scrollsnap-carousel-status" aria-live="polite" aria-atomic="true">Slide 1 of 5 centered. Mandatory snapping enabled.</span>
</div>`,
  css:`
.d-gallery-scrollsnap-carousel{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'Roboto Mono','JetBrains Mono',ui-monospace,monospace;isolation:isolate}
.d-gallery-scrollsnap-carousel *{box-sizing:border-box}
.d-gallery-scrollsnap-carousel-head{position:absolute;z-index:2;top:9px;right:14px;left:14px;height:27px;display:flex;align-items:center;justify-content:space-between;color:#7a7a7f;font-size:8px;line-height:1;letter-spacing:.09em}
.d-gallery-scrollsnap-carousel-toggle{height:27px;padding:0 8px 0 6px;display:flex;align-items:center;gap:5px;border:1px solid #333333;border-radius:0;outline:none;background:#101012;color:#7a7a7f;font:600 6px/1 inherit;letter-spacing:.07em;cursor:pointer}
.d-gallery-scrollsnap-carousel-toggle i{position:relative;width:22px;height:12px;flex:0 0 auto;border-radius:7px;background:#333333}
.d-gallery-scrollsnap-carousel-toggle i b{position:absolute;top:2px;left:2px;width:8px;height:8px;border-radius:50%;background:#fa7319;transition:transform 250ms ease-in-out}
.d-gallery-scrollsnap-carousel-toggle em{color:#7a7a7f;font-style:normal}
.d-gallery-scrollsnap-carousel-toggle span:first-of-type{color:#b8b8b8}
.d-gallery-scrollsnap-carousel-toggle[aria-checked="false"] i b{transform:translateX(10px)}
.d-gallery-scrollsnap-carousel-toggle[aria-checked="false"] span:first-of-type{color:#7a7a7f}
.d-gallery-scrollsnap-carousel-toggle[aria-checked="false"] span:last-of-type{color:#b8b8b8}
.d-gallery-scrollsnap-carousel-toggle:hover,.d-gallery-scrollsnap-carousel-toggle:focus-visible{border-color:#fa7319;box-shadow:0 0 0 1px rgba(250,115,25,.18)}
.d-gallery-scrollsnap-carousel-stage{position:absolute;top:43px;right:8px;bottom:50px;left:8px;overflow:hidden;border:1px solid #333333;border-radius:0;background:#101012}
.d-gallery-scrollsnap-carousel-track{width:70%;height:100%;padding-inline:15%;display:flex;align-items:stretch;gap:16px;box-sizing:content-box;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scroll-padding-inline:15%;overscroll-behavior-x:contain;outline:none;scrollbar-width:none;-ms-overflow-style:none;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 40px,#000 calc(100% - 40px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 40px,#000 calc(100% - 40px),transparent 100%)}
.d-gallery-scrollsnap-carousel-track::-webkit-scrollbar{display:none;width:0;height:0}
.d-gallery-scrollsnap-carousel-track:focus-visible{box-shadow:inset 0 0 0 2px #fa7319}
.d-gallery-scrollsnap-carousel-track article{position:relative;min-width:0;height:100%;flex:0 0 100%;overflow:hidden;border:1px solid #333333;border-radius:0;scroll-snap-align:center;background:#1a1a1b;opacity:.7;transform:scale(.94);transform-origin:center;will-change:transform,opacity}
.d-gallery-scrollsnap-carousel-track article::after{position:absolute;right:-46px;bottom:-55px;width:150px;height:150px;border:24px solid rgba(250,115,25,.12);border-radius:50%;content:''}
.d-gallery-scrollsnap-carousel-track article:nth-child(2){background:#1a1a1b}
.d-gallery-scrollsnap-carousel-track article:nth-child(2)::after{border-color:rgba(250,115,25,.11)}
.d-gallery-scrollsnap-carousel-track article:nth-child(3){background:#1a1a1b}
.d-gallery-scrollsnap-carousel-track article:nth-child(3)::after{border-color:rgba(250,115,25,.11)}
.d-gallery-scrollsnap-carousel-track article:nth-child(4){background:#1a1a1b}
.d-gallery-scrollsnap-carousel-track article:nth-child(4)::after{border-color:rgba(250,115,25,.11)}
.d-gallery-scrollsnap-carousel-track article:nth-child(5){background:#1a1a1b}
.d-gallery-scrollsnap-carousel-track article>div{position:absolute;top:15px;right:15px;width:58px;height:58px}
.d-gallery-scrollsnap-carousel-track article>div i{position:absolute;display:block;border:1px solid #333333;transform:rotate(45deg)}
.d-gallery-scrollsnap-carousel-track article>div i:nth-child(1){inset:0}.d-gallery-scrollsnap-carousel-track article>div i:nth-child(2){inset:10px}.d-gallery-scrollsnap-carousel-track article>div i:nth-child(3){inset:20px;background:#fa7319;border-color:#fa7319}
.d-gallery-scrollsnap-carousel-track article:nth-child(2)>div i:nth-child(3){background:#fa7319;border-color:#fa7319}.d-gallery-scrollsnap-carousel-track article:nth-child(3)>div i:nth-child(3){background:#fa7319;border-color:#fa7319}.d-gallery-scrollsnap-carousel-track article:nth-child(4)>div i:nth-child(3){background:#fa7319;border-color:#fa7319}.d-gallery-scrollsnap-carousel-track article:nth-child(5)>div i:nth-child(3){background:#fa7319;border-color:#fa7319}
.d-gallery-scrollsnap-carousel-track article>span{position:absolute;top:15px;left:16px;color:#fa7319;font-size:10px;line-height:1;letter-spacing:.09em}
.d-gallery-scrollsnap-carousel-track article h3{position:absolute;right:15px;bottom:39px;left:15px;margin:0;color:#ececef;font-family:Roboto Mono,JetBrains Mono,monospace;font-size:25px;line-height:.86;font-weight:550;letter-spacing:-.055em}
.d-gallery-scrollsnap-carousel-track article p{position:absolute;right:15px;bottom:15px;left:15px;margin:0;color:#7a7a7f;font-size:6px;line-height:1;letter-spacing:.09em}
.d-gallery-scrollsnap-carousel-progress{position:absolute;right:0;bottom:29px;left:0;height:8px;display:flex;align-items:center;justify-content:center;gap:5px}
.d-gallery-scrollsnap-carousel-progress i{display:block;width:6px;height:6px;border-radius:0;background:#333333;transition:width 250ms ease-in-out,background-color 250ms ease-in-out}
.d-gallery-scrollsnap-carousel-progress i.d-gallery-scrollsnap-carousel-active{width:16px;background:#fa7319}
.d-gallery-scrollsnap-carousel-foot{position:absolute;right:14px;bottom:9px;left:14px;display:flex;align-items:center;justify-content:space-between;color:#7a7a7f;font-size:7px;line-height:1;letter-spacing:.09em}
.d-gallery-scrollsnap-carousel-readout{color:#b8b8b8}
.d-gallery-scrollsnap-carousel-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-gallery-scrollsnap-carousel-head,.d-gallery-scrollsnap-carousel-foot{right:11px;left:11px}.d-gallery-scrollsnap-carousel-head>span{font-size:7px}.d-gallery-scrollsnap-carousel-toggle{padding-right:6px;gap:4px}.d-gallery-scrollsnap-carousel-stage{right:6px;left:6px}}
@media(prefers-reduced-motion:reduce){.d-gallery-scrollsnap-carousel *,.d-gallery-scrollsnap-carousel *::before,.d-gallery-scrollsnap-carousel *::after{animation:none!important;transition:none!important}.d-gallery-scrollsnap-carousel-track article{will-change:auto}}
`,
  js:`
const track=root.querySelector('.d-gallery-scrollsnap-carousel-track'),cards=[...root.querySelectorAll('.d-gallery-scrollsnap-carousel-track article')],dots=[...root.querySelectorAll('.d-gallery-scrollsnap-carousel-progress i')],toggle=root.querySelector('.d-gallery-scrollsnap-carousel-toggle'),readout=root.querySelector('.d-gallery-scrollsnap-carousel-readout'),status=root.querySelector('.d-gallery-scrollsnap-carousel-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal},passiveListener={signal:controller.signal,passive:true};
let frameId=0,active=-1,mandatory=true,cleaned=false,resizeObserver=null,connectionObserver=null;
function render(){frameId=0;if(cleaned)return;const trackRect=track.getBoundingClientRect(),center=trackRect.left+trackRect.width/2;let nearest=0,nearestDistance=Infinity;cards.forEach(function(card,index){const rect=card.getBoundingClientRect(),distance=Math.abs(rect.left+rect.width/2-center),proximity=1-Math.min(1,distance/(rect.width+16)),scale=.94+.06*proximity,opacity=.7+.3*proximity;card.style.transform='scale('+scale.toFixed(4)+')';card.style.opacity=opacity.toFixed(4);if(distance<nearestDistance){nearestDistance=distance;nearest=index}});if(nearest!==active){active=nearest;dots.forEach(function(dot,index){dot.classList.toggle('d-gallery-scrollsnap-carousel-active',index===active)});root.dataset.index=String(active);readout.textContent=String(active+1).padStart(2,'0')+' / 05';status.textContent='Slide '+(active+1)+' of 5 centered. '+(mandatory?'Mandatory':'Proximity')+' snapping enabled.'}}
function queueRender(){if(!frameId&&!cleaned)frameId=requestAnimationFrame(render)}
function setMode(next,announce){mandatory=next;track.style.scrollSnapType='x '+(mandatory?'mandatory':'proximity');toggle.setAttribute('aria-checked',String(mandatory));toggle.setAttribute('aria-label','Scroll snap mode: '+(mandatory?'mandatory. Activate for proximity.':'proximity. Activate for mandatory.'));root.dataset.snap=mandatory?'mandatory':'proximity';if(announce)status.textContent=(mandatory?'Mandatory':'Proximity')+' scroll snapping enabled. Slide '+(active+1)+' of 5 centered.';queueRender()}
track.addEventListener('scroll',queueRender,passiveListener);
track.addEventListener('keydown',function(event){const step=cards[0].getBoundingClientRect().width+16;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();track.scrollBy({left:(event.key==='ArrowRight'?1:-1)*step,behavior:reduced?'auto':'smooth'});status.textContent='Moving '+(event.key==='ArrowRight'?'forward':'back')+' with native scrolling';return}if(event.key==='Home'||event.key==='End'){event.preventDefault();track.scrollTo({left:event.key==='Home'?0:track.scrollWidth,behavior:reduced?'auto':'smooth'});status.textContent='Moving to '+(event.key==='Home'?'first':'last')+' slide'}},listener);
toggle.addEventListener('click',function(){setMode(!mandatory,true)},listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(resizeObserver)resizeObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(queueRender);resizeObserver.observe(track)}else window.addEventListener('resize',queueRender,listener);
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
setMode(true,false);queueRender();
`,
  prompt:`Build one self-contained responsive 320-pixel Galleries and Sliders scene around a native horizontal scroll container. Hide its scrollbar, set overflow-x auto and scroll-snap-type x mandatory, and place five cards at exactly seventy percent of the stage width with sixteen-pixel gaps and scroll-snap-align center. Pad the scrollable content so the first and last cards can center. Fade the outer forty pixels on both sides with a linear mask. On each passive scroll event, request at most one animation frame; in that frame measure every card's distance from the viewport center and map the nearest card to scale one and full opacity while cards one step away reach scale .94 and opacity .7. Use the same nearest-card calculation to stretch one of five progress dots into a sixteen-pixel accent pill with a 250-millisecond ease-in-out transition. Add a switch chip that swaps the live scroll-snap type between x mandatory and x proximity. Make the focused scroller use smooth scrollBy calls for left and right arrow keys, with Home and End support. Preserve native touch momentum, expose the active index and snap mode, announce changes accessibly, remove motion transitions and use immediate keyboard scrolling under reduced motion, observe resize, and clean up detached instances without dependencies. Use a #0a0a0b root, flat grayscale slide surfaces, hard-edged linework, and oversized mono numerals; reserve #fa7319 for indices, focus, counters, and progress. Do not use per-slide hues or soft radial glow blobs.`
});
