// Test-only clocks; every production Data extension remains independently portable.
const shared=require('./layout-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__dataExt.inspect())};}
module.exports={...shared,open};
