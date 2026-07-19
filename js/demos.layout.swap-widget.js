/* INTRX registry - live token swap widget */
window.INTRX=window.INTRX||{demos:[],register(d){this.demos.push(d)}};
INTRX.register({
  id:'swap-widget',
  title:'Token Swap Widget',
  cat:'Layout & UI',
  rootClass:'d-layout-swap-widget',
  tags:['swap','tokens','finance'],
  libs:[],
  desc:'A compact token swap card exchanges stacked amounts and token chips while its conversion rate drifts with a restrained live-market cadence.',
  seen:"Seen on: Luke's swap component and Uniswap-style interfaces",
  hint:'activate the center control to flip pay and receive',
  html:`<div class="d-layout-swap-widget" role="region" aria-label="Live token swap widget">
  <div class="d-layout-swap-widget-head" aria-hidden="true"><span>LAYOUT / TOKEN SWAP</span><span>LIVE MARKET</span></div>
  <div class="d-layout-swap-widget-stage">
    <div class="d-layout-swap-widget-card">
      <div class="d-layout-swap-widget-row d-layout-swap-widget-row-pay" role="group" aria-label="You pay 1 ETH">
        <span class="d-layout-swap-widget-label">You pay</span>
        <span class="d-layout-swap-widget-amount-stack"><b class="d-layout-swap-widget-amount-current">1.00</b><b class="d-layout-swap-widget-amount-next"></b></span>
        <span class="d-layout-swap-widget-token-stack">
          <span class="d-layout-swap-widget-token d-layout-swap-widget-token-current d-layout-swap-widget-token-eth"><i>E</i><b>ETH</b><em>⌄</em></span>
          <span class="d-layout-swap-widget-token d-layout-swap-widget-token-next d-layout-swap-widget-token-usdc"><i>U</i><b>USDC</b><em>⌄</em></span>
        </span>
      </div>
      <button class="d-layout-swap-widget-flip" type="button" aria-label="Swap ETH and USDC"><span aria-hidden="true">↓</span></button>
      <div class="d-layout-swap-widget-row d-layout-swap-widget-row-receive" role="group" aria-label="You receive 3,209 USDC">
        <span class="d-layout-swap-widget-label">You receive</span>
        <span class="d-layout-swap-widget-amount-stack"><b class="d-layout-swap-widget-amount-current">3,209.00</b><b class="d-layout-swap-widget-amount-next"></b></span>
        <span class="d-layout-swap-widget-token-stack">
          <span class="d-layout-swap-widget-token d-layout-swap-widget-token-current d-layout-swap-widget-token-usdc"><i>U</i><b>USDC</b><em>⌄</em></span>
          <span class="d-layout-swap-widget-token d-layout-swap-widget-token-next d-layout-swap-widget-token-eth"><i>E</i><b>ETH</b><em>⌄</em></span>
        </span>
      </div>
      <div class="d-layout-swap-widget-rate" aria-hidden="true">
        <span class="d-layout-swap-widget-rate-stack"><span class="d-layout-swap-widget-rate-current">1 ETH = 3,209 USDC</span><span class="d-layout-swap-widget-rate-next"></span></span>
        <span class="d-layout-swap-widget-tick">LIVE</span>
      </div>
    </div>
  </div>
  <div class="d-layout-swap-widget-foot" aria-hidden="true"><span>200MS PRICE TWEEN</span><span>3000MS FEED</span></div>
  <span class="d-layout-swap-widget-status" aria-live="polite" aria-atomic="true">Swap ready. One ETH equals 3,209 USDC.</span>
</div>`,
  css:`
.d-layout-swap-widget{position:relative;width:100%;height:320px;box-sizing:border-box;overflow:hidden;contain:layout paint;container-type:inline-size;background:#0a0a0b;color:#ececef;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;isolation:isolate}
.d-layout-swap-widget *{box-sizing:border-box}
.d-layout-swap-widget-head,.d-layout-swap-widget-foot{position:absolute;right:14px;left:14px;z-index:3;display:flex;align-items:center;justify-content:space-between;color:#5c5c66;font-size:9px;line-height:1;letter-spacing:.08em;pointer-events:none}
.d-layout-swap-widget-head{top:15px}.d-layout-swap-widget-foot{bottom:10px;font-size:8px}
.d-layout-swap-widget-stage{position:absolute;top:38px;right:12px;bottom:27px;left:12px;display:grid;place-items:center;overflow:hidden;border:1px solid #232327;border-radius:10px;background:radial-gradient(circle at 50% 42%,rgba(250,115,25,.07),transparent 48%),#101012}
.d-layout-swap-widget-card{position:relative;width:min(280px,calc(100% - 16px));height:184px;padding:10px;border:1px solid #29292f;border-radius:15px;background:#111113;box-shadow:0 16px 35px rgba(0,0,0,.22)}
.d-layout-swap-widget-row{position:absolute;right:10px;left:10px;height:66px;overflow:hidden;border:1px solid #26262c;border-radius:12px;background:#161619;--out:-14px;--in:14px;--delay:0ms}
.d-layout-swap-widget-row-pay{top:10px}.d-layout-swap-widget-row-receive{top:84px;--out:14px;--in:-14px;--delay:40ms}
.d-layout-swap-widget-label{position:absolute;top:10px;left:12px;color:#72727c;font:500 8px/1 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:.02em}
.d-layout-swap-widget-amount-stack{position:absolute;bottom:9px;left:12px;width:138px;height:24px;overflow:hidden}
.d-layout-swap-widget-amount-current,.d-layout-swap-widget-amount-next{position:absolute;inset:0;display:flex;align-items:center;color:#ececef;font:500 22px/24px system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-variant-numeric:tabular-nums;letter-spacing:-.025em;transition:opacity .25s ease-in-out var(--delay),transform .25s ease-in-out var(--delay)}
.d-layout-swap-widget-amount-next{opacity:0;transform:translateY(var(--in))}
.d-layout-swap-widget-token-stack{position:absolute;right:9px;bottom:9px;width:82px;height:29px}
.d-layout-swap-widget-token{position:absolute;inset:0;display:flex;align-items:center;gap:5px;padding:5px 6px;border:1px solid #34343b;border-radius:999px;background:#222226;color:#c7c7ce;transition:opacity .2s ease-in-out var(--delay);white-space:nowrap}
.d-layout-swap-widget-token-next{opacity:0}
.d-layout-swap-widget-token i{display:grid;place-items:center;width:16px;height:16px;flex:0 0 16px;border-radius:50%;color:#fff;font:700 7px/1 system-ui,sans-serif;font-style:normal}
.d-layout-swap-widget-token-eth i{background:linear-gradient(145deg,#fa7319,#5b3f8b)}.d-layout-swap-widget-token-usdc i{background:linear-gradient(145deg,#67e8f9,#2779a4)}
.d-layout-swap-widget-token b{font:650 9px/1 system-ui,-apple-system,sans-serif}.d-layout-swap-widget-token em{margin-left:auto;color:#72727c;font:500 9px/1 system-ui,sans-serif;font-style:normal}
.d-layout-swap-widget-flip{position:absolute;z-index:4;top:62px;left:50%;width:36px;height:36px;padding:0;display:grid;place-items:center;border:1px solid #3b3b43;border-radius:50%;background:#101012;color:#c7c7ce;box-shadow:0 0 0 4px #111113;appearance:none;outline:none;cursor:pointer;transform:translateX(-50%)}
.d-layout-swap-widget-flip:hover{border-color:#fa7319;color:#ececef}.d-layout-swap-widget-flip:focus-visible{border-color:#fa7319;box-shadow:0 0 0 4px #111113,0 0 0 6px rgba(250,115,25,.4)}
.d-layout-swap-widget-flip span{display:block;font:600 16px/1 system-ui,sans-serif;transform:rotate(0deg);will-change:transform}
.d-layout-swap-widget-card.d-layout-swap-widget-flipping .d-layout-swap-widget-amount-current{opacity:0;transform:translateY(var(--out))}
.d-layout-swap-widget-card.d-layout-swap-widget-flipping .d-layout-swap-widget-amount-next{opacity:1;transform:translateY(0)}
.d-layout-swap-widget-card.d-layout-swap-widget-flipping .d-layout-swap-widget-token-current{opacity:0}.d-layout-swap-widget-card.d-layout-swap-widget-flipping .d-layout-swap-widget-token-next{opacity:1}
.d-layout-swap-widget-card.d-layout-swap-widget-settling *{transition:none!important}
.d-layout-swap-widget-rate{position:absolute;right:10px;bottom:7px;left:10px;height:21px;padding:4px 6px;display:flex;align-items:center;justify-content:space-between;border-radius:5px;color:#72727c;font:500 8px/13px 'JetBrains Mono',ui-monospace,monospace;transition:background-color .3s ease}
.d-layout-swap-widget-rate-stack{position:relative;width:190px;height:13px;overflow:hidden}
.d-layout-swap-widget-rate-current,.d-layout-swap-widget-rate-next{position:absolute;inset:0;transition:opacity .3s ease-in-out,transform .3s ease-in-out}
.d-layout-swap-widget-rate-next{opacity:0;transform:translateY(100%)}
.d-layout-swap-widget-flipping .d-layout-swap-widget-rate{background:#2e2e34}.d-layout-swap-widget-flipping .d-layout-swap-widget-rate-current{opacity:0;transform:translateY(-100%)}.d-layout-swap-widget-flipping .d-layout-swap-widget-rate-next{opacity:1;transform:none}
.d-layout-swap-widget-tick{color:#5c5c66;font-weight:700;letter-spacing:.05em}.d-layout-swap-widget-tick.d-layout-swap-widget-tick-up{color:#4ade80}.d-layout-swap-widget-tick.d-layout-swap-widget-tick-down{color:#fb7185}
.d-layout-swap-widget-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}
@container (max-width:340px){.d-layout-swap-widget-head,.d-layout-swap-widget-foot{right:10px;left:10px;font-size:7px}.d-layout-swap-widget-stage{right:9px;left:9px}.d-layout-swap-widget-card{width:min(280px,calc(100% - 12px))}.d-layout-swap-widget-amount-stack{width:125px}.d-layout-swap-widget-amount-current,.d-layout-swap-widget-amount-next{font-size:20px}}
@media (prefers-reduced-motion:reduce){.d-layout-swap-widget-amount-current,.d-layout-swap-widget-amount-next,.d-layout-swap-widget-token,.d-layout-swap-widget-rate,.d-layout-swap-widget-rate-current,.d-layout-swap-widget-rate-next{transition:none}}
`,
  js:`
const card=root.querySelector('.d-layout-swap-widget-card'),flipButton=root.querySelector('.d-layout-swap-widget-flip'),flipIcon=flipButton.querySelector('span'),rows=Array.from(root.querySelectorAll('.d-layout-swap-widget-row')),rateCurrent=root.querySelector('.d-layout-swap-widget-rate-current'),rateNext=root.querySelector('.d-layout-swap-widget-rate-next'),tick=root.querySelector('.d-layout-swap-widget-tick'),status=root.querySelector('.d-layout-swap-widget-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,controller=new AbortController(),listener={signal:controller.signal};
const rowParts=rows.map(function(row){return{row:row,amountCurrent:row.querySelector('.d-layout-swap-widget-amount-current'),amountNext:row.querySelector('.d-layout-swap-widget-amount-next'),tokenCurrent:row.querySelector('.d-layout-swap-widget-token-current'),tokenNext:row.querySelector('.d-layout-swap-widget-token-next')}}),drifts=[.0018,-.0026,.003,-.0013,.0022,-.0017];
let reversed=false,price=3209,flipCount=0,flipping=false,flipElapsed=0,activeTime=0,lastWall=0,frameId=0,nextDrift=3000,driftIndex=0,tweening=false,tweenElapsed=0,priceFrom=price,priceTo=price,tickUntil=0,visible=!('IntersectionObserver'in window),documentVisible=document.visibilityState!=='hidden',cleaned=false,intersectionObserver=null,connectionObserver=null;
function clamp(value,minimum,maximum){return Math.max(minimum,Math.min(maximum,value))}
function mix(from,to,amount){return from+(to-from)*amount}
function easeInOut(value){return value<.5?4*value*value*value:1-Math.pow(-2*value+2,3)/2}
function easeOut(value){return 1-Math.pow(1-value,3)}
function grouped(value,decimals){const fixed=value.toFixed(decimals),parts=fixed.split('.');let whole=parts[0],suffix='';while(whole.length>3){suffix=','+whole.slice(-3)+suffix;whole=whole.slice(0,-3)}parts[0]=whole+suffix;return parts.join('.')}
function amountState(nextReversed){return nextReversed?[{symbol:'USDC',amount:grouped(price,2)},{symbol:'ETH',amount:'1.00'}]:[{symbol:'ETH',amount:'1.00'},{symbol:'USDC',amount:grouped(price,2)}]}
function rateText(nextReversed){return nextReversed?'1 USDC = '+(1/price).toFixed(6)+' ETH':'1 ETH = '+grouped(price,0)+' USDC'}
function paintToken(element,symbol){element.classList.toggle('d-layout-swap-widget-token-eth',symbol==='ETH');element.classList.toggle('d-layout-swap-widget-token-usdc',symbol==='USDC');element.querySelector('i').textContent=symbol.charAt(0);element.querySelector('b').textContent=symbol}
function stableContents(){const state=amountState(reversed);rowParts.forEach(function(parts,index){parts.amountCurrent.textContent=state[index].amount;paintToken(parts.tokenCurrent,state[index].symbol);parts.row.setAttribute('aria-label',(index===0?'You pay ':'You receive ')+state[index].amount+' '+state[index].symbol)});rateCurrent.textContent=rateText(reversed);flipButton.setAttribute('aria-label',reversed?'Swap USDC and ETH':'Swap ETH and USDC')}
function prepareFlip(){if(flipping)return;const nextReversed=!reversed,state=amountState(nextReversed);rowParts.forEach(function(parts,index){parts.amountNext.textContent=state[index].amount;paintToken(parts.tokenNext,state[index].symbol)});rateNext.textContent=rateText(nextReversed);void card.offsetWidth;card.classList.add('d-layout-swap-widget-flipping');flipping=true;flipElapsed=0;status.textContent=nextReversed?'Swapping USDC into the pay row':'Swapping ETH into the pay row';requestFrame()}
function finishFlip(){reversed=!reversed;flipCount++;flipping=false;flipElapsed=0;card.classList.add('d-layout-swap-widget-settling');card.classList.remove('d-layout-swap-widget-flipping');stableContents();void card.offsetWidth;card.classList.remove('d-layout-swap-widget-settling');flipIcon.style.transform='rotate('+(flipCount*180)+'deg)';status.textContent=reversed?'Swap complete. You pay USDC and receive ETH.':'Swap complete. You pay ETH and receive USDC.'}
function renderFlip(){const progress=clamp(flipElapsed/300,0,1),start=flipCount*180,peak=start+195,finish=start+180,angle=progress<.72?mix(start,peak,easeOut(progress/.72)):mix(peak,finish,easeInOut((progress-.72)/.28));flipIcon.style.transform='rotate('+angle.toFixed(3)+'deg)';if(progress===1)finishFlip()}
function startDrift(){const change=drifts[driftIndex++%drifts.length];priceFrom=price;priceTo=price*(1+change);tweenElapsed=0;tweening=true;tickUntil=activeTime+500;tick.textContent=(change>0?'+':'')+(change*100).toFixed(2)+'%';tick.classList.toggle('d-layout-swap-widget-tick-up',change>0);tick.classList.toggle('d-layout-swap-widget-tick-down',change<0);status.textContent=change>0?'Market amount ticked up':'Market amount ticked down'}
function renderMarket(delta){if(!flipping&&activeTime>=nextDrift){startDrift();nextDrift+=3000}if(tweening){tweenElapsed=Math.min(200,tweenElapsed+delta);price=mix(priceFrom,priceTo,easeInOut(tweenElapsed/200));if(!flipping)stableContents();if(tweenElapsed===200){price=priceTo;tweening=false}}if(activeTime>=tickUntil&&tickUntil){tickUntil=0;tick.textContent='LIVE';tick.classList.remove('d-layout-swap-widget-tick-up','d-layout-swap-widget-tick-down')}}
function eligible(){return!reduced&&!cleaned&&visible&&documentVisible}
function requestFrame(){if(!frameId&&eligible())frameId=requestAnimationFrame(frame)}
function frame(wall){frameId=0;if(!eligible()){lastWall=0;return}const delta=lastWall?Math.min(50,Math.max(0,wall-lastWall)):16.6667;lastWall=wall;activeTime+=delta;if(flipping){flipElapsed=Math.min(300,flipElapsed+delta);renderFlip()}renderMarket(delta);requestFrame()}
function onFlip(){if(reduced){reversed=!reversed;flipCount++;stableContents();flipIcon.style.transform='rotate('+(flipCount*180)+'deg)';status.textContent=reversed?'Swap complete without motion. You pay USDC.':'Swap complete without motion. You pay ETH.'}else prepareFlip()}
function onVisibility(){documentVisible=document.visibilityState!=='hidden';lastWall=0;if(documentVisible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}}
function cleanup(){if(cleaned)return;cleaned=true;if(frameId)cancelAnimationFrame(frameId);frameId=0;controller.abort();if(intersectionObserver)intersectionObserver.disconnect();if(connectionObserver)connectionObserver.disconnect()}
flipButton.addEventListener('click',onFlip,listener);document.addEventListener('visibilitychange',onVisibility,listener);
if('IntersectionObserver'in window){intersectionObserver=new IntersectionObserver(function(entries){visible=!!entries.length&&entries[0].isIntersecting;lastWall=0;if(visible)requestFrame();else if(frameId){cancelAnimationFrame(frameId);frameId=0}},{threshold:.04});intersectionObserver.observe(root)}if('MutationObserver'in window){connectionObserver=new MutationObserver(function(){if(!root.isConnected)cleanup()});connectionObserver.observe(document.documentElement,{childList:true,subtree:true})}
stableContents();if(!reduced)requestFrame();
`,
  prompt:`Build a self-contained responsive 320px Layout and UI token-swap card, 280px wide where space allows. Stack two bg2 wells with 12px radii, labels You pay and You receive, 22px tabular amounts on the left, and compact token chips on the right. Each chip includes a procedural 16px two-color gradient coin with its letter, ticker, and chevron. Overlap the wells with one 36px circular bg1 flip button with a line1 border and down arrow. On activation, rotate the arrow forward 180 degrees over 300ms, reaching 195 degrees once before settling. Animate the top outgoing amount up 14px and the bottom outgoing amount down 14px while fading; bring incoming amounts from the opposite directions over 250ms with a 40ms delay on the receive row. Crossfade token chips. Roll the rate line between 1 ETH = 3,209 USDC and its reciprocal while flashing its bg2 background for 300ms. On a deterministic three-second feed, drift the USDC amount by at most plus or minus 0.3 percent, tween it over 200ms, and color the signed tick ok or err for 500ms. Use one capped requestAnimationFrame clock, pause without hidden or offscreen catch-up, clean up detached instances, keep native button focus and dynamic row labels, and announce major changes politely. Under reduced motion, request no frames, freeze the market, and make deliberate swaps update all stable content instantly.`
});
