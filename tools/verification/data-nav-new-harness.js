// Development fixture only; production demos remain independent plain scripts.
const shared=require('./forms-new-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__dataNav.inspect())};}
module.exports={...shared,open};
