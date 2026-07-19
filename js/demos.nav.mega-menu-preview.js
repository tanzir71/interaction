/* INTRX registry - split mega menu preview */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'mega-menu-preview',
  title:'Mega Menu Preview',
  cat:'Navigation & Menus',
  rootClass:'d-nav-mega-menu-preview',
  tags:['mega menu','preview pane','navigation'],
  libs:[],
  desc:'A compact product nav opens into a split mega menu whose staggered links drive one persistent, direction-aware procedural preview pane.',
  seen:"Seen on: Marcel's uplinq mega-menu redesign",
  hint:'open Products, then hover or focus the five links to switch the procedural preview; press Escape to close',
  html:`<div class="d-nav-mega-menu-preview" role="region" aria-label="Interactive split mega menu">
  <div class="d-nav-mega-menu-preview-head" aria-hidden="true"><span>NAV / PRODUCT INDEX</span><span class="d-nav-mega-menu-preview-mode"><i></i> CLOSED</span></div>
  <div class="d-nav-mega-menu-preview-shell">
    <nav class="d-nav-mega-menu-preview-bar" aria-label="Primary demonstration navigation">
      <button class="d-nav-mega-menu-preview-products" type="button" aria-expanded="false" aria-controls="d-nav-mega-menu-preview-panel">Products <i aria-hidden="true"></i></button>
      <button type="button">Solutions</button>
      <button type="button">Company</button>
    </nav>
    <div class="d-nav-mega-menu-preview-panel" id="d-nav-mega-menu-preview-panel" aria-hidden="true">
      <div class="d-nav-mega-menu-preview-content">
        <div class="d-nav-mega-menu-preview-links" role="menu" aria-label="Products">
          <button type="button" role="menuitem" data-preview="atlas"><span>Atlas</span><small>Unified workspace</small></button>
          <button type="button" role="menuitem" data-preview="signal"><span>Signal</span><small>Live intelligence</small></button>
          <button type="button" role="menuitem" data-preview="gallery"><span>Gallery</span><small>Asset collections</small></button>
          <button type="button" role="menuitem" data-preview="automate"><span>Automate</span><small>Flow builder</small></button>
          <button type="button" role="menuitem" data-preview="reports"><span>Reports</span><small>Decision tables</small></button>
        </div>
        <div class="d-nav-mega-menu-preview-pane" role="img" aria-label="Atlas dashboard preview">
          <article class="d-nav-mega-menu-preview-scene d-nav-mega-menu-preview-atlas" data-scene="atlas"><div><header><i></i><i></i><i></i></header><section><b></b><b></b><b></b></section><footer><i></i><i></i><i></i><i></i></footer></div></article>
          <article class="d-nav-mega-menu-preview-scene d-nav-mega-menu-preview-signal" data-scene="signal"><div><span></span><svg viewBox="0 0 150 80" aria-hidden="true"><polyline points="4,67 24,55 42,60 61,31 80,43 101,18 119,27 146,8"></polyline></svg><b>+18.4%</b></div></article>
          <article class="d-nav-mega-menu-preview-scene d-nav-mega-menu-preview-gallery" data-scene="gallery"><div><i></i><i></i><i></i><i></i><i></i><i></i></div></article>
          <article class="d-nav-mega-menu-preview-scene d-nav-mega-menu-preview-automate" data-scene="automate"><div><i></i><span></span><i></i><span></span><i></i></div></article>
          <article class="d-nav-mega-menu-preview-scene d-nav-mega-menu-preview-reports" data-scene="reports"><div><header><i></i><b></b></header><span></span><span></span><span></span><span></span></div></article>
        </div>
      </div>
    </div>
  </div>
  <div class="d-nav-mega-menu-preview-foot" aria-hidden="true"><span>5 ROUTES / 40Â·60</span><span>HEIGHT 300MS</span></div>
  <span class="d-nav-mega-menu-preview-status" aria-live="polite" aria-atomic="true">Mega menu closed</span>
</div>`,
  css:`
.d-nav-mega-menu-preview{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate;touch-action:pan-y}
.d-nav-mega-menu-preview *{box-sizing:border-box}
.d-nav-mega-menu-preview-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-nav-mega-menu-preview-mode{display:flex;align-items:center;gap:5px;color:#9b9ba3}
.d-nav-mega-menu-preview-mode i{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.45)}
.d-nav-mega-menu-preview-shell{position:absolute;top:38px;right:12px;bottom:25px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:#0d0d0f}
.d-nav-mega-menu-preview-bar{position:relative;z-index:4;height:42px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-bottom:1px solid #232327;background:#101012}
.d-nav-mega-menu-preview-bar button{position:relative;border:0;border-right:1px solid #232327;outline:none;color:#777781;background:transparent;font-family:inherit;font-size:9px;font-weight:700;line-height:1;text-transform:uppercase;letter-spacing:.05em;cursor:pointer}
.d-nav-mega-menu-preview-bar button:last-child{border-right:0}
.d-nav-mega-menu-preview-bar button:hover,.d-nav-mega-menu-preview-bar button:focus-visible,.d-nav-mega-menu-preview-bar button[aria-expanded="true"]{color:#ececef;background:#161619}
.d-nav-mega-menu-preview-products i{display:inline-block;width:6px;height:6px;margin-left:5px;border-right:1px solid currentColor;border-bottom:1px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform 200ms ease}
.d-nav-mega-menu-preview-products[aria-expanded="true"] i{transform:translateY(1px) rotate(225deg)}
.d-nav-mega-menu-preview-panel{position:relative;z-index:3;height:0;overflow:hidden;background:#101012;pointer-events:none;will-change:height}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-panel{pointer-events:auto}
.d-nav-mega-menu-preview-content{height:100%;display:grid;grid-template-columns:40% 60%;opacity:0;transition:opacity 120ms ease}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-content{opacity:1}
.d-nav-mega-menu-preview-closing .d-nav-mega-menu-preview-content{opacity:0;transition-duration:120ms}
.d-nav-mega-menu-preview-links{min-width:0;padding:8px 8px 7px 10px;border-right:1px solid #232327}
.d-nav-mega-menu-preview-links button{position:relative;width:100%;height:calc(20% - 1px);min-height:31px;padding:4px 4px 4px 10px;display:flex;flex-direction:column;justify-content:center;border:0;border-bottom:1px solid #232327;outline:none;color:#ececef;background:transparent;font-family:inherit;text-align:left;opacity:0;transform:translateY(8px);transition:opacity 190ms ease,transform 190ms ease,padding-left 180ms ease}
.d-nav-mega-menu-preview-links button:last-child{border-bottom:0}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-links button{opacity:1;transform:translateY(0)}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-links button:nth-child(1){transition-delay:70ms}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-links button:nth-child(2){transition-delay:110ms}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-links button:nth-child(3){transition-delay:150ms}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-links button:nth-child(4){transition-delay:190ms}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-links button:nth-child(5){transition-delay:230ms}
.d-nav-mega-menu-preview-links button::before{position:absolute;top:50%;left:1px;width:2px;height:0;border-radius:1px;background:#a78bfa;content:'';transform:translateY(-50%);transition:height 180ms ease}
.d-nav-mega-menu-preview-links button:hover,.d-nav-mega-menu-preview-links button:focus-visible,.d-nav-mega-menu-preview-links button[aria-current="true"]{padding-left:16px}
.d-nav-mega-menu-preview-links button:hover::before,.d-nav-mega-menu-preview-links button:focus-visible::before,.d-nav-mega-menu-preview-links button[aria-current="true"]::before{height:23px}
.d-nav-mega-menu-preview-links span{font-size:13px;font-weight:650;line-height:1}
.d-nav-mega-menu-preview-links small{margin-top:4px;overflow:hidden;color:#777781;font-size:10px;line-height:1;text-overflow:ellipsis;white-space:nowrap}
.d-nav-mega-menu-preview-pane{--d-nav-mega-menu-preview-parallax-x:0px;--d-nav-mega-menu-preview-parallax-y:0px;position:relative;min-width:0;margin:9px;border:1px solid #232327;border-radius:8px;overflow:hidden;background:radial-gradient(circle at 70% 20%,rgba(167,139,250,.11),transparent 34%),#0d0d0f;opacity:0;transition:opacity 200ms ease 280ms}
.d-nav-mega-menu-preview-open .d-nav-mega-menu-preview-pane{opacity:1}
.d-nav-mega-menu-preview-closing .d-nav-mega-menu-preview-pane{opacity:0;transition:opacity 120ms ease}
.d-nav-mega-menu-preview-scene{position:absolute;inset:0;padding:10px;opacity:0;pointer-events:none;transform:translateY(var(--d-nav-mega-menu-preview-scene-shift,0));transition:opacity 250ms ease,transform 250ms ease}
.d-nav-mega-menu-preview-scene.d-nav-mega-menu-preview-scene-active{opacity:1;transform:translateY(0)}
.d-nav-mega-menu-preview-scene.d-nav-mega-menu-preview-scene-departing{opacity:0;transform:translateY(var(--d-nav-mega-menu-preview-departure,0))}
.d-nav-mega-menu-preview-scene.d-nav-mega-menu-preview-scene-arriving{opacity:0;transform:translateY(var(--d-nav-mega-menu-preview-arrival,0))}
.d-nav-mega-menu-preview-scene>div{position:absolute;inset:10px;transform:translate3d(var(--d-nav-mega-menu-preview-parallax-x),var(--d-nav-mega-menu-preview-parallax-y),0);transition:transform 100ms linear}
.d-nav-mega-menu-preview-atlas header{height:16px;display:flex;gap:4px;padding:5px;border-radius:4px;background:#19191c}
.d-nav-mega-menu-preview-atlas header i{width:20px;height:5px;border-radius:3px;background:#33333a}
.d-nav-mega-menu-preview-atlas header i:first-child{width:35px;background:#a78bfa}
.d-nav-mega-menu-preview-atlas section{height:52px;margin-top:6px;display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
.d-nav-mega-menu-preview-atlas section b{border:1px solid #232327;border-radius:4px;background:linear-gradient(180deg,#19191c,#111113)}
.d-nav-mega-menu-preview-atlas footer{position:absolute;right:0;bottom:0;left:0;height:46px;display:flex;align-items:flex-end;gap:5px;padding:6px;border:1px solid #232327;border-radius:4px}
.d-nav-mega-menu-preview-atlas footer i{flex:1;background:#a78bfa;opacity:.38}
.d-nav-mega-menu-preview-atlas footer i:nth-child(1){height:35%}.d-nav-mega-menu-preview-atlas footer i:nth-child(2){height:72%}.d-nav-mega-menu-preview-atlas footer i:nth-child(3){height:50%}.d-nav-mega-menu-preview-atlas footer i:nth-child(4){height:88%}
.d-nav-mega-menu-preview-signal span{position:absolute;inset:10px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.13),transparent 62%)}
.d-nav-mega-menu-preview-signal svg{position:absolute;right:3px;bottom:11px;left:3px;width:calc(100% - 6px);height:75%;overflow:visible}
.d-nav-mega-menu-preview-signal polyline{fill:none;stroke:#a78bfa;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.d-nav-mega-menu-preview-signal b{position:absolute;top:10px;right:7px;color:#a78bfa;font-size:11px}
.d-nav-mega-menu-preview-gallery>div{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:5px}
.d-nav-mega-menu-preview-gallery i{border-radius:4px;background:linear-gradient(145deg,#2e2940,#a78bfa)}
.d-nav-mega-menu-preview-gallery i:nth-child(2),.d-nav-mega-menu-preview-gallery i:nth-child(6){background:linear-gradient(145deg,#12343a,#67e8f9)}
.d-nav-mega-menu-preview-gallery i:nth-child(3),.d-nav-mega-menu-preview-gallery i:nth-child(4){background:linear-gradient(145deg,#392c18,#fbbf24)}
.d-nav-mega-menu-preview-automate>div{display:flex;align-items:center;justify-content:space-between;padding:0 8px}
.d-nav-mega-menu-preview-automate i{width:31px;height:31px;border:1px solid #33333a;border-radius:8px;background:#19191c;box-shadow:inset 0 0 0 8px #101012}
.d-nav-mega-menu-preview-automate i:first-child,.d-nav-mega-menu-preview-automate i:last-child{border-color:#a78bfa}
.d-nav-mega-menu-preview-automate span{width:18px;height:1px;background:#33333a}
.d-nav-mega-menu-preview-reports header{height:30px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #232327}
.d-nav-mega-menu-preview-reports header i{width:48px;height:6px;border-radius:3px;background:#a78bfa}
.d-nav-mega-menu-preview-reports header b{width:23px;height:12px;border:1px solid #33333a;border-radius:6px}
.d-nav-mega-menu-preview-reports>div>span{display:block;height:19px;border-bottom:1px solid #232327;background:linear-gradient(90deg,#33333a 0 25%,transparent 25% 48%,#232327 48% 73%,transparent 73%)}
.d-nav-mega-menu-preview-foot{position:absolute;right:16px;bottom:9px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-nav-mega-menu-preview-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-nav-mega-menu-preview-shell{right:10px;left:10px}.d-nav-mega-menu-preview-head,.d-nav-mega-menu-preview-foot{right:13px;left:13px}.d-nav-mega-menu-preview-bar button{font-size:8px}.d-nav-mega-menu-preview-links{padding-left:7px}.d-nav-mega-menu-preview-links button{padding-left:6px}.d-nav-mega-menu-preview-links button:hover,.d-nav-mega-menu-preview-links button:focus-visible,.d-nav-mega-menu-preview-links button[aria-current="true"]{padding-left:12px}.d-nav-mega-menu-preview-links span{font-size:11px}.d-nav-mega-menu-preview-links small{font-size:8px}.d-nav-mega-menu-preview-pane{margin:7px}}
@media(prefers-reduced-motion:reduce){.d-nav-mega-menu-preview *,.d-nav-mega-menu-preview *::before,.d-nav-mega-menu-preview *::after{animation:none!important;transition:none!important}}
`,
  js:`
const shell=root.querySelector('.d-nav-mega-menu-preview-shell'),bar=root.querySelector('.d-nav-mega-menu-preview-bar'),productButton=root.querySelector('.d-nav-mega-menu-preview-products'),navButtons=Array.from(root.querySelectorAll('.d-nav-mega-menu-preview-bar button')),panel=root.querySelector('.d-nav-mega-menu-preview-panel'),links=Array.from(root.querySelectorAll('.d-nav-mega-menu-preview-links button')),pane=root.querySelector('.d-nav-mega-menu-preview-pane'),scenes=Array.from(root.querySelectorAll('.d-nav-mega-menu-preview-scene')),mode=root.querySelector('.d-nav-mega-menu-preview-mode'),status=root.querySelector('.d-nav-mega-menu-preview-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal},passiveListener={signal:controller.signal,passive:true};
const openClass='d-nav-mega-menu-preview-open',closingClass='d-nav-mega-menu-preview-closing',activeClass='d-nav-mega-menu-preview-scene-active',departingClass='d-nav-mega-menu-preview-scene-departing',arrivingClass='d-nav-mega-menu-preview-scene-arriving';
let opened=false,activeIndex=0,phase='closed',phaseTime=0,phaseFrom=0,targetHeight=1,lastWall=0,frameId=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,resizeObserver=null,intersectionObserver=null,connectionObserver=null;
function clamp(value){return Math.max(0,Math.min(1,value))}
function smooth(value){value=clamp(value);return value*value*(3-2*value)}
function easeOut(value){value=clamp(value);return 1-Math.pow(1-value,3)}
function sceneAt(index){return scenes.find(function(scene){return scene.dataset.scene===links[index].dataset.preview})}
function measure(){targetHeight=Math.max(1,shell.clientHeight-bar.offsetHeight)}
function sync(){productButton.setAttribute('aria-expanded',String(opened));panel.setAttribute('aria-hidden',String(!opened));mode.lastChild.textContent=opened?' PRODUCTS OPEN':' CLOSED'}
function activate(index){if(index===activeIndex)return;const direction=index>activeIndex?1:-1,oldScene=sceneAt(activeIndex),newScene=sceneAt(index);oldScene.style.setProperty('--d-nav-mega-menu-preview-departure',(-direction*12)+'px');oldScene.classList.add(departingClass);oldScene.classList.remove(activeClass);newScene.classList.remove(activeClass,departingClass);newScene.style.setProperty('--d-nav-mega-menu-preview-arrival',(direction*12)+'px');newScene.classList.add(arrivingClass);newScene.offsetWidth;newScene.classList.add(activeClass);newScene.classList.remove(arrivingClass);activeIndex=index;links.forEach(function(link,itemIndex){if(itemIndex===index)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current')});pane.setAttribute('aria-label',links[index].querySelector('span').textContent+' product preview');status.textContent=links[index].querySelector('span').textContent+' preview selected'}
function openMenu(){if(opened)return;measure();opened=true;root.classList.remove(closingClass);root.classList.add(openClass);phase='opening';phaseTime=0;phaseFrom=parseFloat(panel.style.height)||0;sceneAt(activeIndex).classList.add(activeClass);links[activeIndex].setAttribute('aria-current','true');sync();status.textContent='Products mega menu opening';if(reduced){panel.style.height=targetHeight+'px';phase='open'}else requestFrame()}
function closeMenu(message,returnFocus){if(!opened)return;opened=false;root.classList.remove(openClass);root.classList.add(closingClass);phase='closing';phaseTime=0;phaseFrom=panel.getBoundingClientRect().height;sync();status.textContent=message||'Products mega menu closing';if(reduced){panel.style.height='0px';phase='closed';root.classList.remove(closingClass)}else requestFrame();if(returnFocus)productButton.focus()}
productButton.addEventListener('click',function(){if(opened)closeMenu('Products mega menu closed',false);else openMenu()},listener);navButtons.slice(1).forEach(function(button){button.addEventListener('click',function(){if(opened)closeMenu(button.textContent+' selected; mega menu closed',false)},listener)});
links.forEach(function(link,index){link.addEventListener('pointerenter',function(){activate(index)},listener);link.addEventListener('focus',function(){activate(index)},listener);link.addEventListener('click',function(){status.textContent=link.querySelector('span').textContent+' product selected'},listener);link.addEventListener('keydown',function(event){if(event.key!=='ArrowDown'&&event.key!=='ArrowUp')return;event.preventDefault();const next=(index+(event.key==='ArrowDown'?1:-1)+links.length)%links.length;links[next].focus()},listener)});
root.addEventListener('keydown',function(event){if(event.key==='Escape'&&opened){event.preventDefault();closeMenu('Products mega menu closed with Escape',true)}else if(event.key==='ArrowDown'&&document.activeElement===productButton&&opened){event.preventDefault();links[activeIndex].focus()}},listener);
document.addEventListener('pointerdown',function(event){if(opened&&!root.contains(event.target))closeMenu('Products mega menu closed by outside click',false)},listener);
shell.addEventListener('pointermove',function(event){if(!opened)return;const bounds=shell.getBoundingClientRect(),x=((event.clientX-bounds.left)/bounds.width-.5)*8,y=((event.clientY-bounds.top)/bounds.height-.5)*8;pane.style.setProperty('--d-nav-mega-menu-preview-parallax-x',x.toFixed(2)+'px');pane.style.setProperty('--d-nav-mega-menu-preview-parallax-y',y.toFixed(2)+'px')},passiveListener);shell.addEventListener('pointerleave',function(){pane.style.setProperty('--d-nav-mega-menu-preview-parallax-x','0px');pane.style.setProperty('--d-nav-mega-menu-preview-parallax-y','0px')},listener);
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible&&(phase==='opening'||phase==='closing')}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(tick)}
function tick(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(40,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;phaseTime+=delta;if(phase==='opening'){const progress=clamp(phaseTime/300);let height;if(progress<.82)height=phaseFrom+(targetHeight+8-phaseFrom)*easeOut(progress/.82);else height=targetHeight+8+(targetHeight-(targetHeight+8))*smooth((progress-.82)/.18);panel.style.height=height.toFixed(2)+'px';if(progress>=1){panel.style.height=targetHeight+'px';phase='open';status.textContent='Products mega menu open';lastWall=0;return}}else{if(phaseTime<=120)panel.style.height=phaseFrom+'px';else{const progress=clamp((phaseTime-120)/220);panel.style.height=(phaseFrom*(1-smooth(progress))).toFixed(2)+'px';if(progress>=1){panel.style.height='0px';phase='closed';root.classList.remove(closingClass);status.textContent='Products mega menu closed';lastWall=0;return}}}requestFrame()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}document.addEventListener('visibilitychange',onVisibility,listener);
function cleanup(){if(cleaned)return;cleaned=true;if(frameId){cancelAnimationFrame(frameId);frameId=0}controller.abort();if(resizeObserver)resizeObserver.disconnect();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(function(){measure();if(phase==='open')panel.style.height=targetHeight+'px'});resizeObserver.observe(shell)}
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){if(!entries.length||cleaned)return;visible=entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.05});intersectionObserver.observe(root)}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
sceneAt(0).classList.add(activeClass);links[0].setAttribute('aria-current','true');sync();
`,
  prompt:`Build one self-contained responsive 320px Navigation and Menus card with a three-item background-one nav bar and bottom hairline. PRODUCTS opens a full-width background-one mega panel directly below it. Split the interior forty-sixty: the left side has exactly five links with thirteen-pixel primary labels and ten-pixel captions, while the right side is one persistent procedural preview pane. Morph panel height from zero to its available auto height over 300 milliseconds with a soft ease-out curve that overshoots by eight pixels and settles. Reveal links from eight pixels below with forty-millisecond stagger, then fade in the pane. Hovering or focusing a link indents it six pixels, draws an accent left tick, and crossfades to its dashboard, chart, gallery, workflow, or report scene over 250 milliseconds. Move the outgoing scene twelve pixels opposite navigation direction and bring the incoming scene from twelve pixels in that direction. Drift only the active scene by up to four pixels against the fixed pane background from pointer position. On close, fade content completely for 120 milliseconds while holding full panel height, then collapse height to zero over 220 milliseconds so content is never clipped mid-fade. Add synchronized ARIA, arrows, Escape and outside close, reduced-motion immediacy, offscreen pause, responsive height correction, and detached-instance cleanup.`
});
