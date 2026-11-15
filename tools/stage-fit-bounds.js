/* Visible rectangles inside native demo masks. The root and outer stage remain
   acceptance boundaries: clipping there must never excuse an overflowing demo. */
module.exports=function stageFitBounds(element,root){
 const rect=element.getBoundingClientRect(),own=getComputedStyle(element);
 if(own.display==='none'||own.visibility==='hidden'||Number(own.opacity)===0||own.clipPath==='inset(50%)')return null;
 let left=rect.left,right=rect.right,top=rect.top,bottom=rect.bottom;
 for(let parent=element.parentElement;parent;parent=parent.parentElement){
  const css=getComputedStyle(parent);
  if(css.display==='none'||css.visibility==='hidden'||Number(css.opacity)===0)return null;
  if(parent===root)break;
  if(css.clipPath==='inset(50%)')return null;
  const clip=parent.getBoundingClientRect();
  if(/^(hidden|clip|scroll|auto)$/.test(css.overflowX)){left=Math.max(left,clip.left);right=Math.min(right,clip.right);}
  if(/^(hidden|clip|scroll|auto)$/.test(css.overflowY)){top=Math.max(top,clip.top);bottom=Math.min(bottom,clip.bottom);}
  if(right<=left||bottom<=top)return null;
 }
 return right>left&&bottom>top?{left,right,top,bottom,width:right-left,height:bottom-top}:null;
};
