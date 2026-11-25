/* Compose the exact later title migration over immutable earlier fixtures. */
const assert=require('node:assert/strict'),fixture=require('../fixtures/catalog-title-updates.json'),manifest=require('../../INTRX-handover/manifest/components.json').components;
const byId=new Map(fixture.changes.map(row=>[row.id,row]));assert.equal(byId.size,fixture.changes.length);
for(const row of fixture.changes)assert.equal(manifest.find(item=>item.id===row.id)?.title,row.after,'Current v4 title '+row.id);
module.exports=function currentTitleReference(definition){const row=byId.get(definition.id);if(!row)return definition;assert([row.before,row.after].includes(definition.title),'Exact historical/current title '+definition.id);return{...definition,title:row.after};};
module.exports.original=function originalTitleReference(definition){const row=byId.get(definition.id);if(!row)return definition;assert.equal(definition.title,row.after,'Exact migrated title '+definition.id);return{...definition,title:row.before};};
