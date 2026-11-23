// Development-only fixture; every production extension remains standalone.
const shared=require('./micro-ext-harness');
const timers=`const layoutTimers=new Map();let layoutTimerSerial=0;const layoutOriginalAt=root.__AgentAt;
setTimeout=(fn,delay=0,...args)=>{const id=++layoutTimerSerial;layoutTimers.set(id,{at:ctx.now()+Math.max(1,delay),fn:()=>fn(...args)});return id;};clearTimeout=id=>layoutTimers.delete(id);
root.__AgentAt=time=>{if(stage._runtime.suspended||document.hidden)return;let guard=0;while(true){const due=[...layoutTimers].filter(([,t])=>t.at<=time).sort((a,b)=>a[1].at-b[1].at||a[0]-b[0])[0];if(!due)break;if(++guard>10000)throw Error('Unbounded virtual timers');layoutOriginalAt(due[1].at);layoutTimers.delete(due[0]);due[1].fn();}layoutOriginalAt(time);};
root.__layoutTimers=()=>[...layoutTimers].map(([id,t])=>({id,at:t.at}));root.__layoutEarlyTimer=()=>{const first=[...layoutTimers].sort((a,b)=>a[1].at-b[1].at)[0];if(first){layoutTimers.delete(first[0]);first[1].fn();}};
`;
async function open(browser,options){const run=await shared.open(browser,options);return{...run,async mount(d,settings={}){return run.mount(settings.virtual?{...d,js:timers+d.js}:d,settings);},inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__layoutExt.inspect())};}
module.exports={...shared,open};
