/* Independent RK4 fixtures exercise the renderer in the emitted demo, not a copied engine. */
module.exports=async function verifySpring({browser,open,demos,configs,check,equal}){
  const rig=await open(browser);
  function integrate(x,v,target,ms){
    const count=Math.max(1,Math.ceil(ms/.1)),h=ms/1000/count;
    for(let i=0;i<count;i++){
      const a=(p,w)=>380*(target-p)-32*w;
      const k1x=v,k1v=a(x,v),k2x=v+k1v*h/2,k2v=a(x+k1x*h/2,k2x),k3x=v+k2v*h/2,k3v=a(x+k2x*h/2,k3x),k4x=v+k3v*h,k4v=a(x+k3x*h,k4x);
      x+=h*(k1x+2*k2x+2*k3x+k4x)/6;v+=h*(k1v+2*k2v+2*k3v+k4v)/6;
    }
    return[x,v];
  }
  try{
    for(const d of demos)for(const mode of['thumb','full']){
      const c=configs.find(c=>c.id===d.id),specs=mode==='thumb'?c.nativeChannels:c.fullChannels;
      const moving=specs.some(s=>s.on.some((n,i)=>n!==s.off[i])),scale=Math.max(1,...specs.flatMap(s=>s.on.map((n,i)=>Math.abs(n-s.off[i]))));
      for(const hz of[60,120,240]){
        await rig.mount(d,{mode,width:mode==='thumb'?328:390,height:mode==='thumb'?264:650,clock:true});
        const result=await rig.page.evaluate(({hz,specs,mode})=>{
          const s=document.querySelector('.stage'),r=s._root,b=r.querySelector('.'+r.className+'-input'),initial=r.__SwitchInspect().model.checked,rows=[];
          const packets=[[0,'click'],[180,'click'],[420,'End'],[700,'Home']];let index=0;
          for(let i=0;i<=hz*2;i++){
            if(i)r.__Tick(1000/hz);
            const t=r.__Clock().now;let before=null,after=null;
            while(index<packets.length&&packets[index][0]<=t+.0001){
              before=r.__SwitchInspect().motion.channels[0];const key=packets[index++][1];
              b.dispatchEvent(key==='click'?new MouseEvent('click',{bubbles:true}):new KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));after=r.__SwitchInspect().motion.channels[0];
            }
            const state=r.__SwitchInspect(),source=mode==='thumb'?null:r.querySelector('[role=switch]:not(.'+r.className+'-input)'),matrices=specs.map(spec=>{
              const n=mode==='thumb'?r.querySelector('.'+r.className+'-paint:not(.'+r.className+'-retained) '+spec.selector):spec.path==='button'?source:spec.path.split('.').reduce((n,k)=>n.children[+k],source);
              const m=new DOMMatrixReadOnly(getComputedStyle(n).transform);return[m.m41,m.m42,m.m11,m.m12,m.m22,m.m23];
            });
            rows.push({t,checked:state.model.checked,channel:state.motion.channels[0],matrices,before,after});
          }
          return{initial,rows,final:r.__SwitchInspect(),clock:r.__Clock()};
        },{hz,specs,mode});
        let x=result.initial?1:0,v=0,target=x,last=0;
        equal(result.final.motion.constants,{stiffness:380,damping:32,mass:1},d.id+' recipe');
        for(const row of result.rows){
          if(moving){[x,v]=integrate(x,v,target,row.t-last);const resting=row.channel.kind==='rest';check(Math.abs(row.channel.position[0]-x)<(resting?.01/scale:.000001),d.id+'/'+mode+'/'+hz+' RK4 position at '+row.t);check(Math.abs(row.channel.velocity[0]-v)<(resting?.12/scale:.00001),d.id+' RK4 velocity');}
          else x=row.checked?1:0;
          if(row.before&&moving){check(Math.abs(row.before.position[0]-row.after.position[0])<1e-9,d.id+' retarget keeps position');check(Math.abs(row.before.velocity[0]-row.after.velocity[0])<1e-9,d.id+' retarget keeps velocity');if(row.before.target[0]!==row.after.target[0])check(Math.abs(row.before.velocity[0]-row.after.initialVelocity[0])<1e-9,d.id+' new spring inherits velocity');}
          for(let j=0;j<specs.length;j++){
            const b=specs[j],pose=b.off.map((n,k)=>n+(b.on[k]-n)*x),m=row.matrices[j],rz=pose[2]*Math.PI/180;
            check(Math.abs(m[0]-pose[0])<.012&&Math.abs(m[1]-pose[1])<.012,d.id+' actual painted translation');
            check(Math.abs(m[2]-Math.cos(rz))<.0001&&Math.abs(m[3]-Math.sin(rz))<.0001,d.id+' actual painted rotation');
            if(b.perspective)check(Math.abs(m[5]-Math.sin(pose[3]*Math.PI/180))<.0001,d.id+' actual painted tilt');
          }
          target=row.checked?1:0;if(row.channel.kind==='rest'){x=target;v=0;}last=row.t;
        }
        equal(result.final.motion.active,0,d.id+' no idle spring');equal(result.final.frame,false);equal(result.clock.pending,0,d.id+' no idle animation callback');
      }
    }
  }finally{await rig.close();}
};
