// Reuse the source-clock, native asset, font and Stage fixture from the Agent suite.
// It is a development-only harness; the site has no added runtime dependency.
const shared=require('./agents-new-harness');
// Drive WAAPI with the same virtual source clock as model frames. Otherwise a
// second flight can measure an old counter that is still on the real 250ms clock.
const animationClock=`
const originalMicroAnimate=Element.prototype.animate,microAnimations=new Map(),originalMicroAt=root.__AgentAt;
Element.prototype.animate=function(...args){const animation=originalMicroAnimate.apply(this,args);animation.pause();animation.currentTime=0;microAnimations.set(animation,ctx.now());return animation;};
function advanceMicroAnimations(time){for(const[a,start]of microAnimations){if(['idle','finished'].includes(a.playState)){microAnimations.delete(a);continue;}const end=a.effect.getComputedTiming().endTime,elapsed=Math.max(0,time-start);if(Number.isFinite(end)&&elapsed>=end)a.finish();else a.currentTime=elapsed;}}
root.__AgentAt=time=>{if(stage._runtime.suspended||document.hidden)return;advanceMicroAnimations(time);originalMicroAt(time);advanceMicroAnimations(time);};
window.__microRestoreAnimationClock=()=>{Element.prototype.animate=originalMicroAnimate;microAnimations.clear();};
`;
async function open(browser,options){const run=await shared.open(browser,options);return{...run,async mount(d,settings={}){await run.page.evaluate(()=>window.__microRestoreAnimationClock?.());return run.mount(settings.virtual?{...d,js:animationClock+d.js}:d,settings);},inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__micro.inspect())};}
module.exports={...shared,open};
