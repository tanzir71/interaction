/* A visible background or border contributes fill even when it has children. */
module.exports=function paintedStageSurface(css){
 const visible=color=>!!color&&color!=='transparent'&&!/^rgba\([^)]*,\s*0(?:\.0+)?\s*\)$/i.test(color)&&!(/\/\s*0(?:\.0+)?\s*\)$/).test(color);
 if(css.backgroundImage!=='none'||visible(css.backgroundColor))return true;
 return ['Top','Right','Bottom','Left'].some(side=>parseFloat(css['border'+side+'Width'])>0&&css['border'+side+'Style']!=='none'&&visible(css['border'+side+'Color']));
};
