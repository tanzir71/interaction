// Development-only fixture; production demos stay independent plain scripts.
const shared=require('./fx-new-harness');
const chromium=Object.create(shared.chromium);
chromium.launch=async(options={})=>{const browser=await shared.chromium.launch({...(process.env.INTRX_CHROME_EXECUTABLE?{executablePath:process.env.INTRX_CHROME_EXECUTABLE}:{}),...options});console.log('Agent verifier browser:',browser.version());return browser;};
async function open(browser,options){const run=await shared.open(browser,options);return{...run,inspect:()=>run.page.evaluate(()=>document.querySelector('.stage')._root.__agentExt.inspect())};}
module.exports={...shared,chromium,open};
