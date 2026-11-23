// Development-only fixture; production demos stay independent plain scripts.
const shared=require('./fx-new-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__agentExt.inspect())};}
module.exports={...shared,open};
