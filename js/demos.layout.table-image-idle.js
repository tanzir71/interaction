/* INTRX registry - table with living image previews */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'table-image-idle',
  title:'Table Image Idle',
  cat:'Layout & UI',
  rootClass:'d-layout-table-image-idle',
  tags:['table','preview','hover'],
  libs:[],
  desc:'A compact project table carries one persistent living landscape preview between rows, trailing the cursor with subtle velocity and idle motion.',
  seen:'Seen on: Interactive Table with Image Hover Idle Animation by Filip Zrnzevic on CodePen',
  hint:'hover or focus rows to carry the living preview',
  html:`<div class="d-layout-table-image-idle" role="region" aria-label="Project table with living image previews">
  <div class="d-layout-table-image-idle-head" aria-hidden="true"><span>LAYOUT / LIVING TABLE</span><span>05 PROJECTS</span></div>
  <div class="d-layout-table-image-idle-stage">
    <table class="d-layout-table-image-idle-table" aria-label="Project index">
      <tbody>
        <tr class="d-layout-table-image-idle-row" tabindex="0"><td class="d-layout-table-image-idle-index">01</td><td class="d-layout-table-image-idle-name">Aurora Ridge</td><td><span class="d-layout-table-image-idle-tag">LAND</span></td><td class="d-layout-table-image-idle-value">84</td></tr>
        <tr class="d-layout-table-image-idle-row" tabindex="0"><td class="d-layout-table-image-idle-index">02</td><td class="d-layout-table-image-idle-name">Night Orchard</td><td><span class="d-layout-table-image-idle-tag">EDIT</span></td><td class="d-layout-table-image-idle-value">62</td></tr>
        <tr class="d-layout-table-image-idle-row" tabindex="0"><td class="d-layout-table-image-idle-index">03</td><td class="d-layout-table-image-idle-name">Violet Dune</td><td><span class="d-layout-table-image-idle-tag">MOTION</span></td><td class="d-layout-table-image-idle-value">91</td></tr>
        <tr class="d-layout-table-image-idle-row" tabindex="0"><td class="d-layout-table-image-idle-index">04</td><td class="d-layout-table-image-idle-name">Salt Horizon</td><td><span class="d-layout-table-image-idle-tag">CAMP</span></td><td class="d-layout-table-image-idle-value">73</td></tr>
        <tr class="d-layout-table-image-idle-row" tabindex="0"><td class="d-layout-table-image-idle-index">05</td><td class="d-layout-table-image-idle-name">Quiet Current</td><td><span class="d-layout-table-image-idle-tag">STUDY</span></td><td class="d-layout-table-image-idle-value">58</td></tr>
      </tbody>
    </table>
    <div class="d-layout-table-image-idle-preview" aria-hidden="true">
      <div class="d-layout-table-image-idle-preview-frame">
        <div class="d-layout-table-image-idle-scene d-layout-table-image-idle-scene-active"><i class="d-layout-table-image-idle-sun"></i><span class="d-layout-table-image-idle-clouds"><i></i><i></i><i></i></span><b class="d-layout-table-image-idle-land-far"></b><b class="d-layout-table-image-idle-land-near"></b><small class="d-layout-table-image-idle-scene-label">AURORA RIDGE</small></div>
        <div class="d-layout-table-image-idle-scene"><i class="d-layout-table-image-idle-sun"></i><span class="d-layout-table-image-idle-clouds"><i></i><i></i><i></i></span><b class="d-layout-table-image-idle-land-far"></b><b class="d-layout-table-image-idle-land-near"></b><small class="d-layout-table-image-idle-scene-label"></small></div>
      </div>
    </div>
  </div>
  <div class="d-layout-table-image-idle-foot" aria-hidden="true"><span>FOLLOW .12 / ROTATE ±2°</span><span>6S CLOUD / 4S BREATH</span></div>
  <span class="d-layout-table-image-idle-status" aria-live="polite" aria-atomic="true">Project table ready</span>
</div>`,
  css:`
.d-layout-table-image-idle{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-layout-table-image-idle *{box-sizing:border-box}
.d-layout-table-image-idle-head,.d-layout-table-image-idle-foot{position:absolute;right:14px;left:14px;z-index:4;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em;pointer-events:none}
.d-layout-table-image-idle-head{top:15px}.d-layout-table-image-idle-foot{bottom:10px;font-size:8px}
.d-layout-table-image-idle-stage{position:absolute;top:38px;right:12px;bottom:27px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(circle at 82% 18%,rgba(250,115,25,.05),transparent 42%),#0e0e10}
.d-layout-table-image-idle-table{position:absolute;top:25px;right:10px;left:10px;width:calc(100% - 20px);border-spacing:0;border-collapse:separate;color:#c7c7ce;table-layout:fixed}
.d-layout-table-image-idle-row{position:relative;height:38px;background:#101012;outline:none;transition:background-color .18s ease,transform .18s ease;cursor:default}
.d-layout-table-image-idle-row td{height:38px;padding:0;border-bottom:1px solid #232327;vertical-align:middle}
.d-layout-table-image-idle-row:first-child td:first-child{border-top-left-radius:8px}.d-layout-table-image-idle-row:first-child td:last-child{border-top-right-radius:8px}.d-layout-table-image-idle-row:last-child td:first-child{border-bottom-left-radius:8px}.d-layout-table-image-idle-row:last-child td:last-child{border-bottom-right-radius:8px}
.d-layout-table-image-idle-row:hover,.d-layout-table-image-idle-row:focus,.d-layout-table-image-idle-row.d-layout-table-image-idle-row-active{z-index:2;background:#161619;transform:translateY(-1px)}
.d-layout-table-image-idle-row:focus-visible{box-shadow:inset 0 0 0 1px rgba(250,115,25,.55)}
.d-layout-table-image-idle-index{width:29px;padding-left:9px!important;color:#5c5c66;font:500 8px/1 'JetBrains Mono',ui-monospace,monospace}
.d-layout-table-image-idle-name{overflow:hidden;color:#c7c7ce;font:550 10px/1 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-overflow:ellipsis;white-space:nowrap}
.d-layout-table-image-idle-tag{display:inline-flex;align-items:center;justify-content:center;min-width:39px;padding:4px 5px;border:1px solid #2e2e34;border-radius:999px;color:#72727c;font:600 6px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.06em}
.d-layout-table-image-idle-value{width:29px;padding-right:9px!important;color:#8b8b95;font:600 8px/1 'JetBrains Mono',ui-monospace,monospace;text-align:right;font-variant-numeric:tabular-nums}
.d-layout-table-image-idle-preview{position:absolute;z-index:6;top:0;left:0;width:120px;height:80px;opacity:0;transform:rotate(var(--preview-rotation,0deg));pointer-events:none;transition:opacity .15s ease;will-change:left,top,transform}
.d-layout-table-image-idle-preview.d-layout-table-image-idle-preview-visible{opacity:1}
.d-layout-table-image-idle-preview-frame{position:relative;width:120px;height:80px;overflow:hidden;border:1px solid #3b3b43;border-radius:8px;background:#161619;box-shadow:0 12px 30px rgba(0,0,0,.38);transform:scale(.96);transition:transform .15s ease;transform-origin:center}
.d-layout-table-image-idle-preview-visible .d-layout-table-image-idle-preview-frame{transform:scale(var(--preview-breath,1))}
.d-layout-table-image-idle-scene{position:absolute;inset:0;overflow:hidden;background:linear-gradient(165deg,var(--sky-a,#34314a),var(--sky-b,#161a23));opacity:0;transition:opacity .2s ease}
.d-layout-table-image-idle-scene.d-layout-table-image-idle-scene-active{opacity:1}
.d-layout-table-image-idle-sun{position:absolute;top:14px;left:var(--sun-x,56%);width:19px;height:19px;border-radius:50%;background:radial-gradient(circle,#ececef 0 16%,var(--sun,#fa7319) 22% 46%,transparent 70%);transform:translateX(-50%);opacity:.86}
.d-layout-table-image-idle-clouds{position:absolute;top:26px;left:var(--cloud-x,-24px);width:76px;height:12px;opacity:.28;filter:blur(1px)}
.d-layout-table-image-idle-clouds i{position:absolute;height:4px;border-radius:999px;background:rgba(236,236,239,.72)}.d-layout-table-image-idle-clouds i:nth-child(1){top:1px;left:0;width:32px}.d-layout-table-image-idle-clouds i:nth-child(2){top:5px;left:19px;width:42px}.d-layout-table-image-idle-clouds i:nth-child(3){top:0;left:50px;width:22px}
.d-layout-table-image-idle-land-far,.d-layout-table-image-idle-land-near{position:absolute;right:-8px;bottom:0;left:-8px;display:block}
.d-layout-table-image-idle-land-far{height:40px;background:var(--land-far,#4d4868);clip-path:polygon(0 60%,16% 28%,31% 56%,49% 20%,67% 51%,82% 24%,100% 58%,100% 100%,0 100%)}
.d-layout-table-image-idle-land-near{height:31px;background:var(--land-near,#20202b);clip-path:polygon(0 62%,18% 38%,39% 64%,58% 27%,76% 57%,100% 33%,100% 100%,0 100%)}
.d-layout-table-image-idle-scene-label{position:absolute;right:6px;bottom:5px;color:rgba(236,236,239,.72);font:600 5px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.08em;text-shadow:0 1px 3px rgba(0,0,0,.5)}
.d-layout-table-image-idle-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container (max-width:340px){.d-layout-table-image-idle-head,.d-layout-table-image-idle-foot{right:10px;left:10px;font-size:7px}.d-layout-table-image-idle-stage{right:9px;left:9px}.d-layout-table-image-idle-table{right:7px;left:7px;width:calc(100% - 14px)}.d-layout-table-image-idle-tag{min-width:34px;padding-inline:4px}}
@media (prefers-reduced-motion:reduce){.d-layout-table-image-idle-row,.d-layout-table-image-idle-preview,.d-layout-table-image-idle-preview-frame,.d-layout-table-image-idle-scene{transition:none}}
`,
  js:`
const stageElement=root.querySelector('.d-layout-table-image-idle-stage'),table=root.querySelector('.d-layout-table-image-idle-table'),rows=Array.from(root.querySelectorAll('.d-layout-table-image-idle-row')),preview=root.querySelector('.d-layout-table-image-idle-preview'),frameElement=root.querySelector('.d-layout-table-image-idle-preview-frame'),scenes=Array.from(root.querySelectorAll('.d-layout-table-image-idle-scene')),status=root.querySelector('.d-layout-table-image-idle-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal},passiveListener={signal:controller.signal,passive:true};
const variants=[['#40395a','#151923','#c4b5fd','#615980','#272738','AURORA RIDGE'],['#28364c','#10141b','#67e8f9','#304a55','#18242c','NIGHT ORCHARD'],['#51405f','#211828','#f0abfc','#765172','#33283b','VIOLET DUNE'],['#46515a','#1b242a','#fbbf24','#657078','#2b353b','SALT HORIZON'],['#28434c','#101b20','#67e8f9','#35616a','#18343a','QUIET CURRENT']];
let currentIndex=-1,currentScene=0,previewVisible=false,leaving=false,leaveElapsed=0,x=0,y=0,targetX=0,targetY=0,rotation=0,targetRotation=0,lastClientX=null,activeTime=0,lastWall=0,frameId=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,resizeObserver=null,intersectionObserver=null,connectionObserver=null;
function clamp(value,minimum,maximum){return Math.max(minimum,Math.min(maximum,value))}
function paintScene(scene,index){const variant=variants[index];scene.style.setProperty('--sky-a',variant[0]);scene.style.setProperty('--sky-b',variant[1]);scene.style.setProperty('--sun',variant[2]);scene.style.setProperty('--land-far',variant[3]);scene.style.setProperty('--land-near',variant[4]);scene.querySelector('.d-layout-table-image-idle-scene-label').textContent=variant[5]}
function setTarget(clientX,clientY){const bounds=stageElement.getBoundingClientRect(),cursorX=clientX-bounds.left,cursorY=clientY-bounds.top;targetX=clamp(cursorX+18,6,Math.max(6,bounds.width-126));targetY=clamp(cursorY-40,6,Math.max(6,bounds.height-86));if(reduced){x=targetX;y=targetY;rotation=0;renderPosition()}}
function focusTarget(row){const stageBounds=stageElement.getBoundingClientRect(),rowBounds=row.getBoundingClientRect();targetX=Math.max(6,stageBounds.width-130);targetY=clamp(rowBounds.top-stageBounds.top+rowBounds.height*.5-40,6,Math.max(6,stageBounds.height-86));if(reduced){x=targetX;y=targetY;rotation=0;renderPosition()}}
function activate(index,event){rows.forEach(function(row,rowIndex){row.classList.toggle('d-layout-table-image-idle-row-active',rowIndex===index)});if(!previewVisible){currentScene=0;paintScene(scenes[currentScene],index);scenes[currentScene].classList.add('d-layout-table-image-idle-scene-active');scenes[1-currentScene].classList.remove('d-layout-table-image-idle-scene-active');previewVisible=true;leaving=false;preview.classList.add('d-layout-table-image-idle-preview-visible');if(event){setTarget(event.clientX,event.clientY);x=targetX;y=targetY}else focusTarget(rows[index])}else if(index!==currentIndex){const nextScene=1-currentScene;paintScene(scenes[nextScene],index);void scenes[nextScene].offsetWidth;scenes[nextScene].classList.add('d-layout-table-image-idle-scene-active');scenes[currentScene].classList.remove('d-layout-table-image-idle-scene-active');currentScene=nextScene}currentIndex=index;status.textContent=variants[index][5].toLowerCase()+' preview shown';renderPosition();requestFrame()}
function hidePreview(){if(!previewVisible)return;previewVisible=false;leaving=true;leaveElapsed=0;currentIndex=-1;rows.forEach(function(row){row.classList.remove('d-layout-table-image-idle-row-active')});preview.classList.remove('d-layout-table-image-idle-preview-visible');status.textContent='Living preview closed';if(reduced){leaving=false}else requestFrame()}
function renderPosition(){preview.style.left=x.toFixed(2)+'px';preview.style.top=y.toFixed(2)+'px';preview.style.setProperty('--preview-rotation',rotation.toFixed(3)+'deg');const sunX=50+Math.sin(activeTime/6000*Math.PI*2)*16,cloudX=-32+(activeTime%6000)/6000*184,breath=reduced?1:1.0075+Math.sin(activeTime/4000*Math.PI*2)*.0075;frameElement.style.setProperty('--preview-breath',breath.toFixed(5));scenes.forEach(function(scene){scene.style.setProperty('--sun-x',sunX.toFixed(2)+'%');scene.style.setProperty('--cloud-x',cloudX.toFixed(2)+'px')})}
function needsFrame(){return!reduced&&!cleaned&&visible&&documentVisible&&(previewVisible||leaving)}
function requestFrame(){if(!frameId&&needsFrame())frameId=requestAnimationFrame(frame)}
function frame(wall){frameId=0;if(!needsFrame()){lastWall=0;return}const delta=lastWall?Math.min(50,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;activeTime+=delta;x+=(targetX-x)*.12;y+=(targetY-y)*.12;rotation+=(targetRotation-rotation)*.12;targetRotation*=.9;if(leaving){leaveElapsed+=delta;if(leaveElapsed>=150)leaving=false}renderPosition();requestFrame()}
function onMove(event){if(currentIndex<0||event.isPrimary===false)return;if(lastClientX!==null)targetRotation=clamp((event.clientX-lastClientX)*.18,-2,2);lastClientX=event.clientX;setTarget(event.clientX,event.clientY);requestFrame()}
function onLeave(){lastClientX=null;if(!table.contains(document.activeElement))hidePreview()}
function onFocusIn(event){const row=event.target.closest('.d-layout-table-image-idle-row');if(!row)return;activate(rows.indexOf(row),null)}
function onFocusOut(event){if(!table.contains(event.relatedTarget))hidePreview()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}
function cleanup(){if(cleaned)return;cleaned=true;if(frameId)cancelAnimationFrame(frameId);frameId=0;controller.abort();if(resizeObserver)resizeObserver.disconnect();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
rows.forEach(function(row,index){row.addEventListener('pointerenter',function(event){activate(index,event)},passiveListener)});table.addEventListener('pointermove',onMove,passiveListener);table.addEventListener('pointerleave',onLeave,listener);table.addEventListener('focusin',onFocusIn,listener);table.addEventListener('focusout',onFocusOut,listener);document.addEventListener('visibilitychange',onVisibility,listener);
if('ResizeObserver'in window){resizeObserver=new ResizeObserver(function(){if(currentIndex>=0){focusTarget(rows[currentIndex]);renderPosition()}});resizeObserver.observe(stageElement)}if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){visible=!!entries.length&&entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.04});intersectionObserver.observe(root)}if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
paintScene(scenes[0],0);renderPosition();
`,
  prompt:`Build a self-contained responsive 320px Layout and UI card containing a five-row project table. Give bg1 rows one-pixel line0 separators and columns for a monospaced index, project name, compact tag chip, and value. Make each row keyboard focusable as well as hoverable. Hover or focus lifts the row into bg2 and reveals one persistent 120 by 80 preview card with an 8px radius and line1 border. Position it to the right of the cursor where space allows, clamp it inside the stage, and on each active frame lerp x and y toward the target by 0.12 while deriving a rotation capped at plus or minus two degrees from horizontal cursor velocity. Build each of five registered landscape variants from CSS gradients, a sun, looping cloud band, and two clipped land layers. Fade and scale the preview from 0.96 to 1 over 150ms. When rows change, retain that exact card and crossfade between two internal scene layers over 200ms rather than re-popping it. While visible, drift the sun and loop clouds every six seconds, and breathe the frame scale from 1 to 1.015 on a four-second sine. On table leave, scale and fade out over 150ms. Use one capped requestAnimationFrame only while the preview is active or leaving, pause without hidden or offscreen catch-up, rebuild clamped placement on resize, clean up detached instances, and announce major preview changes politely. Under reduced motion, request no frames and make hover, focus, row changes, and placement snap to stable static states.`
});
