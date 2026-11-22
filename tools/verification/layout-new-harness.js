// Development fixture only. Share the Stage and synchronized model/WAAPI clocks
// with the already verified Micro suite; production loads only each demo module.
const shared=require('./micro-new-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__layout.inspect())};}
module.exports={...shared,open};
