/* v4 · A single perimeter-lit button; the shell owns its stage and controls. */
INTRX.register({
  id:'btn-border-beam',title:'Border Beam',cat:'Buttons & Micro',rootClass:'d-beam-demo',
  tags:['button','border','beam','ambient'],libs:[],
  desc:'A narrow light follows the edge of a charcoal Deploy button. Pause and resume the perimeter loop, or press the button for a quiet squash and release.',
  seen:'Pattern family: perimeter highlights on deployment controls and product calls to action',
  hint:'Ambient · A beam of light travels the button edge',
  html:`<div class="d-beam-demo"><div class="d-beam-demo-wrap"><img class="d-beam-demo-glow" src="{{asset:beam-glow}}" alt=""><button class="d-beam-demo-button" type="button"><img src="{{asset:beam-deploy}}" alt=""><span>Deploy</span></button><div class="d-beam-demo-perimeter"><img class="d-beam-demo-orbit" width="121" height="1" src="{{asset:beam-highlight}}" alt=""></div></div><span class="d-beam-demo-status" role="status"></span></div>`,
  css:`.d-beam-demo{display:grid;place-items:center;position:relative;color:#f1f1f1;font-family:Geist,system-ui,sans-serif}
.d-beam-demo-wrap{position:relative;isolation:isolate;width:160px;height:40px}
.d-beam-demo-button{position:relative;z-index:1;display:flex;align-items:center;gap:8px;width:160px;height:40px;padding:0 17px;border:1px solid #ffffff1c;border-radius:12px;background:#202020;color:inherit;box-shadow:0 16px 22px -9px #0008,0 2px 3px #0003;font:500 13.5px/18px Geist,system-ui,sans-serif;cursor:pointer;transition:transform var(--dur-fast) var(--ease-pop)}
.d-beam-demo-button img{display:block;flex:none}
.d-beam-demo-button:active{transform:scale(.97);transition-duration:var(--dur-micro);transition-timing-function:var(--ease-out)}
.d-beam-demo-button:focus-visible{outline:2px solid var(--focus-ring);outline-offset:4px}
.d-beam-demo-orbit,.d-beam-demo-glow{position:absolute;left:0;top:0;pointer-events:none;offset-path:path('M80 0H148A12 12 0 0 1 160 12V28A12 12 0 0 1 148 40H12A12 12 0 0 1 0 28V12A12 12 0 0 1 12 0Z');offset-anchor:center;offset-rotate:auto;animation:d-beam-demo-orbit 2000ms linear infinite;animation-play-state:paused}
.d-beam-demo-perimeter{position:absolute;z-index:2;inset:0;padding:1px;border-radius:12px;pointer-events:none;mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude}.d-beam-demo-orbit{z-index:2}.d-beam-demo-glow{z-index:0}
.d-beam-demo-wrap.d-beam-demo-running .d-beam-demo-orbit,.d-beam-demo-wrap.d-beam-demo-running>.d-beam-demo-glow{animation-play-state:running}
.d-beam-demo-status{position:absolute;left:50%;top:50%;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);font-size:13px;white-space:nowrap}
@keyframes d-beam-demo-orbit{to{offset-distance:100%}}
@media(prefers-reduced-motion:reduce){.d-beam-demo-orbit,.d-beam-demo-glow{animation:none}.d-beam-demo-button{transition:opacity var(--dur-quick) var(--ease-out)}.d-beam-demo-button:active{transform:none;opacity:.8}}`,
  js:`const wrap=root.querySelector('.d-beam-demo-wrap'),orbit=root.querySelector('.d-beam-demo-orbit'),button=root.querySelector('button'),status=root.querySelector('.d-beam-demo-status');
let running=false,runs=0,activations=0;
function setRunning(next,source){running=next&&!ctx.reducedMotion;if(running)runs++;wrap.classList.toggle('d-beam-demo-running',running);Object.assign(root.dataset,{running:String(running),source,runs:String(runs),activations:String(activations)});status.textContent=ctx.reducedMotion?'Static perimeter highlight. Reduced motion is enabled.':running?'Perimeter light playing':'Perimeter light paused';}
function replay(){for(const image of wrap.querySelectorAll('.d-beam-demo-orbit,.d-beam-demo-glow')){image.style.animation='none';void image.offsetWidth;image.style.animation='';}root.dataset.angle='0';root.dataset.laps='0';setRunning(true,'replay');}
button.addEventListener('click',()=>{activations++;root.dataset.activations=String(activations);status.textContent='Deployment requested';ctx.emit('change',{activations});});
orbit.addEventListener('animationiteration',()=>{root.dataset.angle='360';root.dataset.laps=String(Number(root.dataset.laps||0)+1);});
ctx.onAction('toggle',()=>setRunning(!running,'dock'));ctx.onAction('replay',replay);root.dataset.theme=ctx.theme;root.dataset.angle='0';root.dataset.laps='0';setRunning(true,'initial');`,
  prompt:`Build an original self-contained Border Beam control matching the v4 INTRX tile: one 160 by 40px charcoal Deploy button, 12px corners, a 1px white border at 11% opacity, a white 16px lightning icon and 13.5px medium Geist. Center it on a transparent 260 by 100 design plane. The shell supplies the stage and dock; render no outer panel, header, measurement labels or replay/reset buttons. Use the supplied local SVG icon, 121 by 1px perimeter highlight and 76 by 32px glow without resizing their intrinsic dimensions. A regular rounded-rectangle CSS motion path moves the light around the button over 2000ms linear. Pause/resume retains its current position, and a shell replay action returns to the top-center peak frame. Press scales to .97 over 80ms ease-out; release takes 250ms ease-pop. Expose toggle and replay through ctx.onAction and announce button activation through a live status and ctx.emit. Under reduced motion freeze the top-center highlight, keep keyboard focus and activation feedback, and use a 150ms opacity press response. Support native Enter/Space, runtime suspension, declared geometry and portable local assets.`
});
