// Test-only source, timer and WAAPI clocks; every production text demo is standalone.
const shared=require('./layout-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__typeExt.inspect())};}
module.exports={...shared,open};
