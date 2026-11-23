// Development-only source-clock fixture; production navigation stays standalone.
const shared=require('./layout-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__navExt.inspect())};}
module.exports={...shared,open};
