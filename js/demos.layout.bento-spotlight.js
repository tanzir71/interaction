/* INTRX registry - bento spotlight hover field */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'bento-spotlight',
  title:'Bento Spotlight',
  cat:'Layout & UI',
  rootClass:'d-layout-bento-spotlight',
  tags:['bento','spotlight border','hover field'],
  libs:[],
  desc:'Five procedural bento cells share one cursor-positioned border light, handing the glow across gaps while each miniature graphic responds in its own way.',
  seen:"Seen on: SaaS bento layouts and alimdesigner_'s bento post",
  hint:'move across the cells to hand off the spotlight, or Tab through them for keyboard previews',
  html:`<div class="d-layout-bento-spotlight" role="region" aria-label="Interactive bento spotlight grid">
  <div class="d-layout-bento-spotlight-head" aria-hidden="true"><span>BENTO / SIGNALS</span><span class="d-layout-bento-spotlight-mode"><i></i> FIELD READY</span></div>
  <div class="d-layout-bento-spotlight-stage" role="group" aria-label="Five-cell bento grid. Hover a cell or focus it with Tab to animate its procedural graphic and reveal a shared spotlight border.">
    <div class="d-layout-bento-spotlight-grid">
      <article class="d-layout-bento-spotlight-cell d-layout-bento-spotlight-spark" tabindex="0" aria-label="Momentum sparkline, 18 percent increase">
        <span class="d-layout-bento-spotlight-label">MOMENTUM / 18%</span>
        <svg class="d-layout-bento-spotlight-sparkline" viewBox="0 0 120 52" aria-hidden="true"><path d="M4 44H116"></path><polyline points="4,40 20,34 34,37 49,22 65,29 82,13 96,19 116,6"></polyline><circle cx="116" cy="6" r="2.5"></circle></svg>
      </article>
      <article class="d-layout-bento-spotlight-cell d-layout-bento-spotlight-dots" tabindex="0" aria-label="Fifteen-node activity field">
        <span class="d-layout-bento-spotlight-label">NODES / 15</span>
        <div class="d-layout-bento-spotlight-dotgrid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </article>
      <article class="d-layout-bento-spotlight-cell d-layout-bento-spotlight-number" tabindex="0" aria-label="Reliability score 72">
        <span class="d-layout-bento-spotlight-label">SCORE</span><strong aria-hidden="true">72</strong><small aria-hidden="true">+04</small>
      </article>
      <article class="d-layout-bento-spotlight-cell d-layout-bento-spotlight-toggles" tabindex="0" aria-label="Three automation routes">
        <span class="d-layout-bento-spotlight-label">AUTOMATION / ROUTES</span>
        <div class="d-layout-bento-spotlight-toggle-row" aria-hidden="true"><b><i></i></b><b><i></i></b><b><i></i></b></div>
      </article>
      <article class="d-layout-bento-spotlight-cell d-layout-bento-spotlight-gauge" tabindex="0" aria-label="Capacity gauge 68 percent">
        <span class="d-layout-bento-spotlight-label">LOAD</span>
        <svg class="d-layout-bento-spotlight-arc" viewBox="0 0 54 42" aria-hidden="true"><path d="M8 34A20 20 0 1 1 46 34"></path><path d="M8 34A20 20 0 1 1 46 34"></path></svg><b aria-hidden="true">68</b>
      </article>
    </div>
  </div>
  <div class="d-layout-bento-spotlight-foot" aria-hidden="true"><span>5 CELLS / 200PX</span><span>SHARED COORDS</span></div>
  <span class="d-layout-bento-spotlight-status" aria-live="polite" aria-atomic="true">Bento spotlight field ready</span>
</div>`,
  css:`
.d-layout-bento-spotlight{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate;touch-action:pan-y}
.d-layout-bento-spotlight *{box-sizing:border-box}
.d-layout-bento-spotlight-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-layout-bento-spotlight-mode{display:flex;align-items:center;gap:5px;color:#9b9ba3}
.d-layout-bento-spotlight-mode i{width:5px;height:5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.45)}
.d-layout-bento-spotlight-stage{position:absolute;top:38px;right:12px;bottom:25px;left:12px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(circle at 50% 42%,rgba(167,139,250,.05),transparent 62%),#0d0d0f}
.d-layout-bento-spotlight-grid{height:100%;padding:9px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:7px}
.d-layout-bento-spotlight-cell{position:relative;min-width:0;overflow:hidden;padding:11px;border:1px solid #232327;border-radius:10px;outline:none;background:#101012;opacity:1;filter:saturate(1);transform:translateY(0);transition:transform 400ms ease,opacity 400ms ease,filter 400ms ease,border-color 400ms ease;isolation:isolate}
.d-layout-bento-spotlight-cell::before{position:absolute;z-index:4;inset:0;padding:1px;border-radius:inherit;background:radial-gradient(200px circle at var(--d-layout-bento-spotlight-x,50%) var(--d-layout-bento-spotlight-y,50%),rgba(167,139,250,.95) 0 25%,rgba(167,139,250,.42) 42%,transparent 68%);opacity:0;content:'';pointer-events:none;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;transition:opacity 200ms ease}
.d-layout-bento-spotlight-cell:focus-visible{box-shadow:inset 0 0 0 1px #a78bfa}
.d-layout-bento-spotlight.d-layout-bento-spotlight-field-active .d-layout-bento-spotlight-cell{opacity:.6;filter:saturate(.72);transition-duration:200ms,250ms,250ms,250ms}
.d-layout-bento-spotlight.d-layout-bento-spotlight-field-active .d-layout-bento-spotlight-cell.d-layout-bento-spotlight-cell-active{border-color:rgba(167,139,250,.35);opacity:1;filter:saturate(1);transform:translateY(-2px)}
.d-layout-bento-spotlight-cell-active::before{opacity:1}
.d-layout-bento-spotlight-label{position:relative;z-index:2;display:block;overflow:hidden;color:#777781;font-size:7px;line-height:1;letter-spacing:.075em;text-overflow:ellipsis;white-space:nowrap}
.d-layout-bento-spotlight-spark{grid-area:1/1/2/3}
.d-layout-bento-spotlight-dots{grid-area:1/3/3/4}
.d-layout-bento-spotlight-number{grid-area:1/4/2/5}
.d-layout-bento-spotlight-toggles{grid-area:2/1/3/3}
.d-layout-bento-spotlight-gauge{grid-area:2/4/3/5}
.d-layout-bento-spotlight-sparkline{position:absolute;right:10px;bottom:8px;left:10px;width:calc(100% - 20px);height:65%;overflow:visible}
.d-layout-bento-spotlight-sparkline path{fill:none;stroke:#232327;stroke-width:1}
.d-layout-bento-spotlight-sparkline polyline{fill:none;stroke:#a78bfa;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:150;stroke-dashoffset:150;transition:stroke-dashoffset 650ms ease}
.d-layout-bento-spotlight-sparkline circle{fill:#a78bfa;opacity:0;transform:scale(.3);transform-origin:116px 6px;transition:opacity 180ms ease 420ms,transform 180ms ease 420ms}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-sparkline polyline{stroke-dashoffset:0}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-sparkline circle{opacity:1;transform:scale(1)}
.d-layout-bento-spotlight-dotgrid{position:absolute;top:43px;right:10px;bottom:18px;left:10px;display:grid;grid-template-columns:repeat(3,5px);grid-template-rows:repeat(5,5px);align-content:space-between;justify-content:space-between}
.d-layout-bento-spotlight-dotgrid i{width:4px;height:4px;border-radius:50%;background:#5c5c66;opacity:.42;transform:scale(.75);transition:transform 240ms ease,opacity 240ms ease,background-color 240ms ease}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-dotgrid i{background:#a78bfa;opacity:1;transform:scale(1.35)}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-dotgrid i:nth-child(3n+2){transition-delay:55ms}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-dotgrid i:nth-child(3n+3){transition-delay:110ms}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-dotgrid i:nth-child(n+7):nth-child(-n+9){transition-delay:165ms}
.d-layout-bento-spotlight-number strong{position:absolute;right:8px;bottom:8px;color:#ececef;font-family:Inter,system-ui,sans-serif;font-size:32px;font-weight:650;line-height:.8;letter-spacing:-.08em;transform-origin:right bottom;transition:color 280ms ease,transform 280ms ease}
.d-layout-bento-spotlight-number small{position:absolute;top:32px;right:10px;color:#5c5c66;font-size:7px;transition:color 280ms ease,transform 280ms ease}
.d-layout-bento-spotlight-cell-active.d-layout-bento-spotlight-number strong{color:#a78bfa;transform:translateY(-3px) scale(1.08)}
.d-layout-bento-spotlight-cell-active.d-layout-bento-spotlight-number small{color:#ececef;transform:translateY(-2px)}
.d-layout-bento-spotlight-toggle-row{position:absolute;right:11px;bottom:16px;left:11px;display:flex;align-items:center;justify-content:space-between;gap:7px}
.d-layout-bento-spotlight-toggle-row b{position:relative;width:34px;height:16px;border:1px solid #33333a;border-radius:9px;background:#19191c;transition:background-color 260ms ease,border-color 260ms ease}
.d-layout-bento-spotlight-toggle-row i{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#5c5c66;transition:transform 320ms cubic-bezier(.2,.8,.2,1),background-color 220ms ease}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-toggle-row b{border-color:rgba(167,139,250,.42);background:rgba(167,139,250,.13)}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-toggle-row i{background:#a78bfa;transform:translateX(18px)}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-toggle-row b:nth-child(2),.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-toggle-row b:nth-child(2) i{transition-delay:70ms}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-toggle-row b:nth-child(3),.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-toggle-row b:nth-child(3) i{transition-delay:140ms}
.d-layout-bento-spotlight-arc{position:absolute;right:4px;bottom:6px;width:48px;height:42px;overflow:visible}
.d-layout-bento-spotlight-arc path{fill:none;stroke:#232327;stroke-width:3;stroke-linecap:round}
.d-layout-bento-spotlight-arc path:last-child{stroke:#a78bfa;stroke-dasharray:112;stroke-dashoffset:74;transition:stroke-dashoffset 560ms ease}
.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-arc path:last-child{stroke-dashoffset:24}
.d-layout-bento-spotlight-gauge b{position:absolute;right:19px;bottom:9px;color:#9b9ba3;font-size:8px;line-height:1;transition:color 250ms ease}
.d-layout-bento-spotlight-cell-active.d-layout-bento-spotlight-gauge b{color:#ececef}
.d-layout-bento-spotlight-foot{position:absolute;right:16px;bottom:9px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-layout-bento-spotlight-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-layout-bento-spotlight-stage{right:10px;left:10px}.d-layout-bento-spotlight-head,.d-layout-bento-spotlight-foot{right:13px;left:13px}.d-layout-bento-spotlight-grid{padding:7px;gap:6px}.d-layout-bento-spotlight-cell{padding:8px}.d-layout-bento-spotlight-label{font-size:6px}.d-layout-bento-spotlight-number strong{font-size:27px}.d-layout-bento-spotlight-toggle-row{right:8px;left:8px;gap:4px}.d-layout-bento-spotlight-toggle-row b{width:29px}.d-layout-bento-spotlight-cell-active .d-layout-bento-spotlight-toggle-row i{transform:translateX(13px)}}
@media(prefers-reduced-motion:reduce){.d-layout-bento-spotlight *,.d-layout-bento-spotlight *::before,.d-layout-bento-spotlight *::after{animation:none!important;transition:none!important}.d-layout-bento-spotlight-sparkline polyline{stroke-dashoffset:0}}
`,
  js:`
const field=root.querySelector('.d-layout-bento-spotlight-stage'),cells=Array.from(root.querySelectorAll('.d-layout-bento-spotlight-cell')),status=root.querySelector('.d-layout-bento-spotlight-status'),controller=new AbortController(),listener={signal:controller.signal},passiveListener={signal:controller.signal,passive:true},fieldClass='d-layout-bento-spotlight-field-active',activeClass='d-layout-bento-spotlight-cell-active';
let activeCell=null,cleaned=false,connectionObserver=null;
function positionGlow(stageX,stageY){const fieldBounds=field.getBoundingClientRect();for(const cell of cells){const bounds=cell.getBoundingClientRect();cell.style.setProperty('--d-layout-bento-spotlight-x',(stageX-(bounds.left-fieldBounds.left)).toFixed(1)+'px');cell.style.setProperty('--d-layout-bento-spotlight-y',(stageY-(bounds.top-fieldBounds.top)).toFixed(1)+'px')}}
function activate(cell,message){if(!cell)return;if(activeCell!==cell){for(const item of cells)item.classList.toggle(activeClass,item===cell);activeCell=cell}root.classList.add(fieldClass);if(message)status.textContent=message}
function restore(){if(!activeCell&&!root.classList.contains(fieldClass))return;activeCell=null;root.classList.remove(fieldClass);for(const cell of cells)cell.classList.remove(activeClass);status.textContent='Bento spotlight field restored'}
function pointerPosition(event){const bounds=field.getBoundingClientRect();return{x:event.clientX-bounds.left,y:event.clientY-bounds.top}}
field.addEventListener('pointermove',function(event){const point=pointerPosition(event);positionGlow(point.x,point.y);const cell=event.target.closest('.d-layout-bento-spotlight-cell');if(cell&&field.contains(cell))activate(cell,cell.getAttribute('aria-label')+' highlighted')},passiveListener);field.addEventListener('pointerdown',function(event){const point=pointerPosition(event),cell=event.target.closest('.d-layout-bento-spotlight-cell');positionGlow(point.x,point.y);if(cell)activate(cell,cell.getAttribute('aria-label')+' highlighted')},passiveListener);field.addEventListener('pointerleave',restore,listener);
for(const cell of cells){cell.addEventListener('focus',function(){const fieldBounds=field.getBoundingClientRect(),bounds=cell.getBoundingClientRect();positionGlow(bounds.left-fieldBounds.left+bounds.width/2,bounds.top-fieldBounds.top+bounds.height/2);activate(cell,cell.getAttribute('aria-label')+' focused')},listener);cell.addEventListener('blur',function(event){if(!field.contains(event.relatedTarget))restore()},listener);cell.addEventListener('keydown',function(event){if(event.key==='Escape'){event.preventDefault();cell.blur();restore()}},listener)}
function cleanup(){if(cleaned)return;cleaned=true;controller.abort();if(connectionObserver)connectionObserver.disconnect()}
if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
`,
  prompt:`Build one self-contained responsive 320px Layout and UI card containing exactly five background-one bento cells with ten-pixel corners and one-pixel line-zero borders: two cells span two columns, one cell spans both rows, and two cells are small. Give them labels and five distinct procedural graphics: a sparkline, dot grid, large numeral, toggle row, and arc gauge. Track the pointer continuously in stage coordinates and project that one shared point into every cell. The active cell must reveal a 200px radial accent spotlight that is solid through twenty-five percent and fades to transparent, masked to only its one-pixel border ring. Lift it two pixels over 200 milliseconds. Dim siblings to sixty-percent opacity with slight desaturation over 250 milliseconds. Moving through a gap must retain the shared light coordinates so the next cell receives the glow without a position jump; leaving the stage restores all cells over 400 milliseconds. Animate each active mini graphic with an appropriate response, including sparkline redraw, delayed dot ripple, numeral lift, toggle travel, and gauge fill. Add equivalent keyboard-focus previews, Escape release, scoped styles, cleanup for detached instances, responsive compact layout, and immediate states without transitions for reduced motion.`
});
