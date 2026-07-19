/* INTRX registry - editorial caption pull hover */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'caption-pull-hover',
  title:'Caption Pull Hover',
  cat:'Layout & UI',
  rootClass:'d-layout-caption-pull-hover',
  tags:['editorial','caption','word stagger'],
  libs:[],
  desc:'Two independent editorial frames lift their procedural imagery while clipped captions, accent rules, words, and arrows enter and leave in carefully reversed order.',
  seen:'Seen on: editorial portfolio hovers on design X',
  hint:'hover either card or focus it with Tab to pull up its caption; press Escape to release keyboard focus',
  html:`<div class="d-layout-caption-pull-hover" role="region" aria-label="Editorial caption pull hover cards">
  <div class="d-layout-caption-pull-hover-head" aria-hidden="true"><span>EDITORIAL / INDEX</span><span class="d-layout-caption-pull-hover-mode"><i></i> HOVER FIELD</span></div>
  <div class="d-layout-caption-pull-hover-stage" role="group" aria-label="Two independent editorial image cards">
    <article class="d-layout-caption-pull-hover-card" tabindex="0" aria-label="Field Study 01. Hover or focus to reveal: Systems shaped by motion.">
      <div class="d-layout-caption-pull-hover-frame">
        <div class="d-layout-caption-pull-hover-scene d-layout-caption-pull-hover-scene-one" aria-hidden="true"><strong>01</strong><i></i><i></i><span>FIELD<br>STUDY</span></div>
        <div class="d-layout-caption-pull-hover-caption">
          <i class="d-layout-caption-pull-hover-rule" aria-hidden="true"></i>
          <p aria-hidden="true"><span style="--d-layout-caption-pull-hover-i:0;--d-layout-caption-pull-hover-r:3"><i>Systems</i></span><span style="--d-layout-caption-pull-hover-i:1;--d-layout-caption-pull-hover-r:2"><i>shaped</i></span><span style="--d-layout-caption-pull-hover-i:2;--d-layout-caption-pull-hover-r:1"><i>by</i></span><span style="--d-layout-caption-pull-hover-i:3;--d-layout-caption-pull-hover-r:0"><i>motion</i></span></p>
          <small aria-hidden="true">FIELD STUDY / 2026</small><b aria-hidden="true">&#8594;</b>
        </div>
      </div>
    </article>
    <article class="d-layout-caption-pull-hover-card" tabindex="0" aria-label="Object Index 02. Hover or focus to reveal: Objects built for attention.">
      <div class="d-layout-caption-pull-hover-frame">
        <div class="d-layout-caption-pull-hover-scene d-layout-caption-pull-hover-scene-two" aria-hidden="true"><strong>02</strong><i></i><i></i><span>OBJECT<br>INDEX</span></div>
        <div class="d-layout-caption-pull-hover-caption">
          <i class="d-layout-caption-pull-hover-rule" aria-hidden="true"></i>
          <p aria-hidden="true"><span style="--d-layout-caption-pull-hover-i:0;--d-layout-caption-pull-hover-r:3"><i>Objects</i></span><span style="--d-layout-caption-pull-hover-i:1;--d-layout-caption-pull-hover-r:2"><i>built</i></span><span style="--d-layout-caption-pull-hover-i:2;--d-layout-caption-pull-hover-r:1"><i>for</i></span><span style="--d-layout-caption-pull-hover-i:3;--d-layout-caption-pull-hover-r:0"><i>attention</i></span></p>
          <small aria-hidden="true">OBJECT INDEX / 2026</small><b aria-hidden="true">&#8594;</b>
        </div>
      </div>
    </article>
  </div>
  <div class="d-layout-caption-pull-hover-foot" aria-hidden="true"><span>2 FRAMES / INDEPENDENT</span><span>EXIT x 0.7</span></div>
  <span class="d-layout-caption-pull-hover-status" aria-live="polite" aria-atomic="true">Two editorial frames ready</span>
</div>`,
  css:`
.d-layout-caption-pull-hover{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate;touch-action:pan-y}
.d-layout-caption-pull-hover *{box-sizing:border-box}
.d-layout-caption-pull-hover-head{position:absolute;top:14px;right:16px;left:16px;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:10px;line-height:1;letter-spacing:.08em}
.d-layout-caption-pull-hover-mode{display:flex;align-items:center;gap:5px;color:#9b9ba3}
.d-layout-caption-pull-hover-mode i{width:5px;height:5px;border-radius:50%;background:#fa7319;box-shadow:0 0 8px rgba(250,115,25,.45)}
.d-layout-caption-pull-hover-stage{position:absolute;top:38px;right:12px;bottom:25px;left:12px;padding:11px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(circle at 50% 35%,rgba(250,115,25,.055),transparent 58%),#0d0d0f}
.d-layout-caption-pull-hover-card{position:relative;min-width:0;border-radius:9px;outline:none;cursor:pointer}
.d-layout-caption-pull-hover-card:focus-visible{box-shadow:0 0 0 1px #0d0d0f,0 0 0 3px #fa7319}
.d-layout-caption-pull-hover-frame{position:absolute;inset:0;overflow:hidden;border:1px solid #232327;border-radius:9px;background:#101012}
.d-layout-caption-pull-hover-scene{position:absolute;inset:-1px;overflow:hidden;transform:translateY(0) scale(1);transform-origin:center;transition:transform 350ms cubic-bezier(.22,1,.36,1);will-change:transform}
.d-layout-caption-pull-hover-scene-one{background:linear-gradient(110deg,#322746 0 51%,#163039 51% 100%)}
.d-layout-caption-pull-hover-scene-two{background:linear-gradient(145deg,#3b2d20 0 46%,#242844 46% 100%)}
.d-layout-caption-pull-hover-scene::before{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.045),transparent 42%,rgba(0,0,0,.28));content:''}
.d-layout-caption-pull-hover-scene strong{position:absolute;right:-4px;bottom:63px;color:#ececef;font-family:Roboto Mono,JetBrains Mono,monospace;font-size:82px;font-weight:700;line-height:.8;letter-spacing:-.09em;opacity:.15}
.d-layout-caption-pull-hover-scene>i{position:absolute;display:block}
.d-layout-caption-pull-hover-scene>i:first-of-type{top:31px;left:15px;width:55px;height:55px;border:1px solid rgba(236,236,239,.23);border-radius:50%;box-shadow:inset 0 0 0 12px rgba(250,115,25,.08)}
.d-layout-caption-pull-hover-scene>i:nth-of-type(2){top:76px;right:13px;width:48px;height:66px;background:rgba(236,236,239,.075);clip-path:polygon(50% 0,100% 100%,0 100%)}
.d-layout-caption-pull-hover-scene-two>i:first-of-type{border-radius:3px;transform:rotate(18deg)}
.d-layout-caption-pull-hover-scene-two>i:nth-of-type(2){background:rgba(250,115,25,.13);clip-path:polygon(0 22%,78% 0,100% 78%,20% 100%)}
.d-layout-caption-pull-hover-scene>span{position:absolute;top:14px;right:12px;color:rgba(236,236,239,.62);font-size:7px;font-weight:700;line-height:1.25;letter-spacing:.09em;text-align:right}
.d-layout-caption-pull-hover-caption{position:absolute;z-index:2;right:0;bottom:0;left:0;height:86px;padding:14px 11px 10px;border-top:1px solid #232327;background:rgba(16,16,18,.96);transform:translateY(100%);transition:transform 280ms cubic-bezier(.22,1,.36,1);will-change:transform}
.d-layout-caption-pull-hover-rule{position:absolute;top:-1px;right:11px;left:11px;height:1px;background:#fa7319;transform:scaleX(0);transform-origin:left;transition:transform 245ms ease;display:block}
.d-layout-caption-pull-hover-caption p{display:flex;flex-wrap:wrap;gap:3px 4px;margin:0;padding-right:15px;font-family:Roboto Mono,JetBrains Mono,monospace;font-size:14px;font-weight:600;line-height:1;letter-spacing:-.03em}
.d-layout-caption-pull-hover-caption p>span{display:inline-block;overflow:hidden;padding-bottom:2px}
.d-layout-caption-pull-hover-caption p>span>i{display:block;font-style:normal;transform:translateY(100%);transition:transform 280ms cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--d-layout-caption-pull-hover-r)*21ms)}
.d-layout-caption-pull-hover-caption small{position:absolute;left:11px;bottom:9px;color:#5c5c66;font-size:6px;line-height:1;letter-spacing:.07em;opacity:0;transform:translateY(4px);transition:opacity 175ms ease,transform 175ms ease}
.d-layout-caption-pull-hover-caption>b{position:absolute;right:11px;bottom:8px;color:#fa7319;font-size:15px;font-weight:400;line-height:1;opacity:0;transform:translateX(-6px);transition:opacity 140ms ease,transform 140ms ease}
.d-layout-caption-pull-hover-card.d-layout-caption-pull-hover-card-active .d-layout-caption-pull-hover-scene{transform:translateY(-12px) scale(1.03);transition-duration:500ms}
.d-layout-caption-pull-hover-card.d-layout-caption-pull-hover-card-active .d-layout-caption-pull-hover-caption{transform:translateY(0);transition-duration:400ms}
.d-layout-caption-pull-hover-card.d-layout-caption-pull-hover-card-active .d-layout-caption-pull-hover-rule{transform:scaleX(1);transition-duration:350ms;transition-delay:100ms}
.d-layout-caption-pull-hover-card.d-layout-caption-pull-hover-card-active .d-layout-caption-pull-hover-caption p>span>i{transform:translateY(0);transition-duration:400ms;transition-delay:calc(var(--d-layout-caption-pull-hover-i)*30ms)}
.d-layout-caption-pull-hover-card.d-layout-caption-pull-hover-card-active .d-layout-caption-pull-hover-caption small{opacity:1;transform:translateY(0);transition-duration:250ms;transition-delay:340ms}
.d-layout-caption-pull-hover-card.d-layout-caption-pull-hover-card-active .d-layout-caption-pull-hover-caption>b{opacity:1;transform:translateX(0);transition-duration:200ms;transition-delay:500ms}
.d-layout-caption-pull-hover-foot{position:absolute;right:16px;bottom:9px;left:16px;display:flex;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em}
.d-layout-caption-pull-hover-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container(max-width:340px){.d-layout-caption-pull-hover-stage{right:10px;left:10px;padding:8px;gap:7px}.d-layout-caption-pull-hover-head,.d-layout-caption-pull-hover-foot{right:13px;left:13px}.d-layout-caption-pull-hover-caption{height:82px;padding-right:8px;padding-left:8px}.d-layout-caption-pull-hover-caption p{font-size:12px;gap:2px 3px}.d-layout-caption-pull-hover-caption small{left:8px;font-size:5px}.d-layout-caption-pull-hover-caption>b{right:8px}.d-layout-caption-pull-hover-rule{right:8px;left:8px}.d-layout-caption-pull-hover-scene strong{font-size:69px}}
@media(prefers-reduced-motion:reduce){.d-layout-caption-pull-hover *,.d-layout-caption-pull-hover *::before,.d-layout-caption-pull-hover *::after{animation:none!important;transition:none!important}}
`,
  js:`
const cards=Array.from(root.querySelectorAll('.d-layout-caption-pull-hover-card')),status=root.querySelector('.d-layout-caption-pull-hover-status'),controller=new AbortController(),listener={signal:controller.signal},activeClass='d-layout-caption-pull-hover-card-active',states=new Map(),connectionObserver='MutationObserver'in window?new MutationObserver(function(){if(!root.isConnected)cleanup()}):null;
let cleaned=false;
function stateFor(card){if(!states.has(card))states.set(card,{hovered:false,focused:false});return states.get(card)}
function sync(card,message){const state=stateFor(card),active=state.hovered||state.focused;card.classList.toggle(activeClass,active);if(message)status.textContent=message}
cards.forEach(function(card,index){const state=stateFor(card);card.addEventListener('pointerenter',function(){state.hovered=true;sync(card,'Editorial frame '+(index+1)+' caption revealed')},listener);card.addEventListener('pointerleave',function(){state.hovered=false;sync(card,'Editorial frame '+(index+1)+' caption reversing')},listener);card.addEventListener('focus',function(){state.focused=true;sync(card,'Editorial frame '+(index+1)+' focused and revealed')},listener);card.addEventListener('blur',function(){state.focused=false;sync(card,'Editorial frame '+(index+1)+' focus released')},listener);card.addEventListener('keydown',function(event){if(event.key==='Escape'){event.preventDefault();state.focused=false;card.blur();sync(card,'Editorial frame '+(index+1)+' caption released')}},listener)});
function cleanup(){if(cleaned)return;cleaned=true;controller.abort();if(connectionObserver)connectionObserver.disconnect()}
if(connectionObserver)connectionObserver.observe(document.documentElement,{childList:true,subtree:true});
`,
  prompt:`Build one self-contained responsive 320px Layout and UI card with exactly two independent editorial image frames side by side. Each procedural scene combines a split gradient field, geometric forms, and a large index numeral such as 01 at fifteen-percent opacity. Keep an 86px caption bar clipped completely below each frame at rest. Hovering or keyboard-focusing one card must move only its image upward twelve pixels and scale it to 1.03 over 500 milliseconds with a soft ease-out. Pull the caption bar up and reveal every caption word from translateY 100 percent inside its own overflow-hidden mask over 400 milliseconds, staggered by thirty milliseconds. Draw a one-pixel accent rule left-to-right over 350 milliseconds beginning 100 milliseconds after entry. Bring the small right-arrow glyph last from a six-pixel horizontal offset. On leave or blur, use exactly 0.7-times entry durations: image 350, caption and words 280, and rule 245 milliseconds. Reverse the word delays so the last word exits first, followed backward through the sentence; the arrow leaves immediately. Support simultaneous independent card states, pointer and keyboard parity, Escape release, compact typography, detached-instance cleanup, fully scoped styling, and immediate state changes for reduced motion.`
});
