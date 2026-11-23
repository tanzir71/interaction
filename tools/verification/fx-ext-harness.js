// Development fixture; production extensions remain independent plain scripts.
const shared=require('./forms-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__fxExt.inspect())};}
module.exports={...shared,open};
