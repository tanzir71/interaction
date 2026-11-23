// Development fixture; each production component stays independently portable.
const shared=require('./data-nav-new-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__fx.inspect())};}
module.exports={...shared,open};
