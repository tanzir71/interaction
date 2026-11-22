const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto'),{intrinsicControl,validate}=require('./stage-component-controls');
const html='<button type="button" data-action="reset">Reset</button>',sha=crypto.createHash('sha256').update(html).digest('hex'),entry={label:'Reset',buttonSHA256:sha,figmaNode:'1:2',figmaUrl:'https://www.figma.com/design/test',reason:'An intrinsic formatting command.'},policy={keyboard:[entry]};
test('an intrinsic component command requires its exact reviewed markup and identity',()=>{
 assert.deepEqual(validate([{id:'keyboard',html}],policy),[]);assert.equal(intrinsicControl('keyboard',html,policy),entry);
 assert.equal(intrinsicControl('another',html,policy),undefined);assert.equal(intrinsicControl('keyboard',html.replace('reset','replay'),policy),undefined);
});
test('changed, duplicated, undocumented or unknown commands fail validation',()=>{
 assert(validate([{id:'keyboard',html:html+html}],policy).length);assert(validate([{id:'keyboard',html:html.replace('Reset','Replay')}],policy).length);assert(validate([] ,policy).length);
 assert(validate([{id:'keyboard',html}],{keyboard:[{...entry,reason:''}]}).length);
});
