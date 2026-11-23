// Test-only virtual clocks; production perspective modules remain independently portable.
const shared=require('./layout-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__cursorExt.inspect())};}
module.exports={...shared,open};
