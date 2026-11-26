/* Test-only Stage source clock with independently withheld frames and early/stale timers. */
function installFeedbackClock(){
 let feedbackNow=1000,feedbackID=0;const feedbackFrames=new Map(),feedbackTimers=new Map();
 ctx.now=()=>feedbackNow;
 requestAnimationFrame=fn=>{const id=++feedbackID;feedbackFrames.set(id,fn);return id};
 cancelAnimationFrame=id=>feedbackFrames.delete(id);
 setTimeout=(fn,delay=0,...args)=>{const id=++feedbackID;feedbackTimers.set(id,{at:feedbackNow+Math.max(0,delay),fn:()=>fn(...args)});return id};
 clearTimeout=id=>feedbackTimers.delete(id);
 root.__feedbackClock={
  elapse(ms,paint=true){if(stage._runtime.suspended)return;feedbackNow+=ms*stage._runtime.speed;let count=0;for(;;){const due=[...feedbackTimers].filter(([,t])=>t.at<=feedbackNow).sort((a,b)=>a[1].at-b[1].at||a[0]-b[0])[0];if(!due)break;if(++count>100)throw Error('Unbounded feedback timer');feedbackTimers.delete(due[0]);due[1].fn();}if(paint){const frames=[...feedbackFrames.values()];feedbackFrames.clear();for(const fn of frames)fn(feedbackNow)}},
  now(){return feedbackNow},frames(){return feedbackFrames.size},timers(){return feedbackTimers.size},
  timerCallback(){return [...feedbackTimers.values()][0]?.fn},
  early(){const first=[...feedbackTimers][0];if(!first)throw Error('Missing early timer');feedbackTimers.delete(first[0]);first[1].fn()}
 };
}
module.exports='('+installFeedbackClock.toString()+')();\n';
