/* Empty transparent hit areas retain geometry checks but supply no painted fill. */
module.exports=function stageFitInk(element,css,paintedSurface){
 const visible=color=>!!color&&color!=='none'&&color!=='transparent'&&!/^rgba\([^)]*,\s*0(?:\.0+)?\s*\)$/i.test(color)&&!(/\/\s*0(?:\.0+)?\s*\)$/).test(color);
 if(paintedSurface(css))return true;
 if(/^(CANVAS|SVG|IMG|VIDEO|INPUT|TEXTAREA|SELECT)$/i.test(element.tagName)||element.namespaceURI==='http://www.w3.org/2000/svg')return true;
 if(element.textContent.trim()&&visible(css.color))return true;
 if(css.boxShadow&&css.boxShadow!=='none'&&[...css.boxShadow.matchAll(/rgba?\([^)]*\)/gi)].some(m=>visible(m[0])))return true;
 for(const name of['::before','::after']){const pseudo=getComputedStyle(element,name);if(pseudo.display==='none'||pseudo.visibility==='hidden'||+pseudo.opacity===0||['none','normal'].includes(pseudo.content))continue;if(paintedSurface(pseudo))return true;if(pseudo.content.replace(/^['"]|['"]$/g,'').trim()&&visible(pseudo.color))return true;}
 return false;
};
