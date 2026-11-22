/* Intrinsic component commands need exact, reviewed markup and a design reason. */
const crypto=require('node:crypto');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const buttons=html=>[...html.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/gi)].map(m=>m[0]);
const label=html=>html.replace(/^<button\b[^>]*>|<\/button>$/gi,'').replace(/<[^>]*>/g,'').trim();
function intrinsicControl(id,html,policy){return(policy[id]||[]).find(r=>r.label===label(html)&&r.buttonSHA256===hash(html));}
function validate(demos,policy){const errors=[];for(const[id,entries]of Object.entries(policy)){
 const d=demos.find(d=>d.id===id);if(!d){errors.push(id+': unknown intrinsic control');continue;}
 if(!Array.isArray(entries)){errors.push(id+': intrinsic controls must be an array');continue;}
 for(const entry of entries){if(!entry.reason?.trim()||!entry.label?.trim()||!/^\d+:\d+$/.test(entry.figmaNode)||!entry.figmaUrl?.startsWith('https://www.figma.com/design/')||!/^[a-f0-9]{64}$/.test(entry.buttonSHA256))errors.push(id+': intrinsic command needs exact markup and a design reason');
 if(buttons(d.html).filter(b=>hash(b)===entry.buttonSHA256&&label(b)===entry.label).length!==1)errors.push(id+': intrinsic command markup changed or duplicated');}
}return errors;}
module.exports={buttons,label,intrinsicControl,validate};
