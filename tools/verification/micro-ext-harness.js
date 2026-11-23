// Development-only fixture; the site keeps independent plain demo scripts.
const shared=require('./agent-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__microExt.inspect())};}
module.exports={...shared,open};
