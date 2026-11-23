// Test-only virtual clocks; production perspective modules remain independently portable.
const shared=require('./layout-ext-harness');
function audioSink(){const Native=window.AudioContext;window.soundExtContexts=[];window.AudioContext=window.webkitAudioContext=function(...args){const ac=new Native(...args),sink=ac.createMediaStreamDestination();Object.defineProperty(ac,'destination',{get:()=>sink});window.soundExtContexts.push(ac);const close=ac.close.bind(ac);ac.close=()=>{sink.stream.getTracks().forEach(t=>t.stop());return close();};return ac;};}
async function open(browser,options){const run=await shared.open(browser,options);await run.page.evaluate(audioSink);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__soundExt.inspect())};}
module.exports={...shared,open};
