// Development-only fixture. Production demos remain plain, independent modules.
const shared=require('./layout-new-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__forms.inspect())};}
module.exports={...shared,open};
