/* Use the same responsive overflow menu as a person operating a compact export. */
const assert=require('node:assert/strict');
async function clickDock(page,action){
 const button=page.locator('.stage-dock button[data-action="'+action+'"]');
 assert.equal(await button.count(),1,'One shared Dock action: '+action);
 if(await button.evaluate(node=>!!node.closest('.dock-overflow[hidden]'))){
  const more=page.locator('.stage-dock > button.dock-more');
  await more.click();
  assert.equal(await more.getAttribute('aria-expanded'),'true','Compact Dock menu opens');
 }
 await button.click();
}
module.exports={clickDock};
