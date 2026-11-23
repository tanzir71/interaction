// Development-only fixture; production demos remain independent plain scripts.
const shared=require('./micro-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__formsExt.inspect())};}
module.exports={...shared,open};
