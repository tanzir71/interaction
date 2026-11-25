/* Independent DOM text measurement, without the component's Canvas measurer. */
async function read(page) {
 const result=await page.evaluate(() => {
  const stage=document.querySelector('.stage'),root=stage._root,native=stage.dataset.mode==='thumb';
  const input=root.querySelector('[data-ui="'+(native?'native-autocomplete-input':'autocomplete-input')+'"]');
  const ghost=root.querySelector('[data-ui="'+(native?'native-ghost':'autocomplete-ghost')+'"]');
  const style=getComputedStyle(input),g=getComputedStyle(ghost),scale=stage._ctx.scale,mirror=document.createElement('span');
  mirror.textContent=input.value;
  Object.assign(mirror.style,{position:'absolute',visibility:'hidden',whiteSpace:'pre',padding:'0',border:'0',margin:'0',width:'max-content'});
  for(const key of ['font','fontKerning','letterSpacing','fontFeatureSettings','fontVariationSettings','fontOpticalSizing'])mirror.style[key]=style[key];
  input.parentElement.append(mirror);
  const textWidth=mirror.getBoundingClientRect().width;mirror.remove();
  const ib=input.getBoundingClientRect(),gb=ghost.getBoundingClientRect(),padding=parseFloat(style.paddingLeft)||0;
  const contentStart=ib.x+((parseFloat(style.borderLeftWidth)||0)+padding)*scale,expectedLeft=contentStart+textWidth-input.scrollLeft*scale;
  const expectedTop=ib.y+(parseFloat(style.height)-parseFloat(style.lineHeight))/2*scale;
  const model=root.__agentExt.inspect(),backing=native?root.querySelector('[data-native-node="144:1230"]'):input;
  return {native,scale,value:input.value,suffix:ghost.textContent,model,font:style.font,ghostFont:g.font,letterSpacing:style.letterSpacing,ghostLetterSpacing:g.letterSpacing,color:g.color,wordOpacities:[...ghost.children].map(n=>getComputedStyle(n).opacity),ghostVisibility:g.visibility,fontStatus:document.fonts.status,held:stage._runtime.suspended,clock:stage._runtime.now(),input:{rect:ib.toJSON(),padding,border:input.clientLeft,scroll:input.scrollLeft,selection:[input.selectionStart,input.selectionEnd],clientWidth:input.clientWidth},ghost:{rect:gb.toJSON(),maxWidth:g.maxWidth},backing:backing.getBoundingClientRect().toJSON(),textWidth,expectedLeft,expectedTop,errorX:gb.x-expectedLeft,errorY:gb.y-expectedTop};
 });
 const session=await page.context().newCDPSession(page);
 try {
  const {root}=await session.send('DOM.getDocument',{depth:-1,pierce:true});let input;
  const ui=result.native?'native-autocomplete-input':'autocomplete-input';
  function walk(node){if(!input&&node.nodeName==='INPUT'&&node.attributes?.includes(ui))input=node;for(const child of [...node.children||[],...node.shadowRoots||[]])walk(child);}
  walk(root);const editor=input.shadowRoots[0].children[0];
  const resolved=await session.send('DOM.resolveNode',{backendNodeId:editor.backendNodeId});
  const response=await session.send('Runtime.callFunctionOn',{objectId:resolved.object.objectId,functionDeclaration:'function(){const range=document.createRange();range.selectNodeContents(this);return{value:this.textContent,editor:this.getBoundingClientRect().toJSON(),text:range.getBoundingClientRect().toJSON(),font:getComputedStyle(this).font};}',returnByValue:true});
  result.paintedInput=response.result.value;
  result.errorPaintX=result.ghost.rect.x-(result.value?result.paintedInput.text.right:result.paintedInput.editor.x);
  await session.send('Runtime.releaseObject',{objectId:resolved.object.objectId});
 } finally {await session.detach();}
 return result;
}
module.exports={read};
