// Development-only source-clock fixture; production galleries remain standalone.
const shared=require('./layout-ext-harness');
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__galleryExt.inspect())};}
module.exports={...shared,open};
