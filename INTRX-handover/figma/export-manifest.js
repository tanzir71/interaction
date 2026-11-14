/* Re-export the component manifest from the Figma file.
   Paste into the Figma MCP `use_figma` tool (or a Figma plugin console) with the
   Interaction file open. It returns TSV rows:
     id  node  board  section  title  description  flags(n=new p=pro l=light stage)
   The Figma tool caps a return value at ~48 KB, so set WANT to a subset of boards
   (for example /Interface|Motion/) and run it more than once.
   Board nodes: Interface 110:973 · Motion 72:559 · Pointer & Physics 78:2 · Data & AI 76:257
   Visual FX 82:2 · Collections 88:2 · Extension 92:174 · New 99:299 */
const WANT = /./;
const rows = [];
for (const page of figma.root.children) {
  await page.loadAsync();
  for (const board of page.children) {
    if (!/^Library v4/.test(board.name) || !WANT.test(board.name)) continue;
    const heads = board.children
      .filter((c) => c.type === 'TEXT' && c.fontSize >= 20 && c.y > 100)
      .map((c) => [c.y, c.characters])
      .sort((a, b) => a[0] - b[0]);
    for (const tile of board.children) {
      if (!tile.name.startsWith('Tile · ')) continue;
      const props = tile.children[0].componentProperties;
      let title = '', desc = '', isNew = false, pro = false;
      for (const k in props) {
        if (k.startsWith('Title')) title = props[k].value;
        if (k.startsWith('Description')) desc = props[k].value;
        if (k.startsWith('New')) isNew = props[k].value;
        if (k.startsWith('Pro')) pro = props[k].value;
      }
      let section = '';
      for (const [y, h] of heads) if (y < tile.y) section = h;
      const stage = tile.children[0].children[0];
      const light = !!(stage.fills && stage.fills[0] && stage.fills[0].color && stage.fills[0].color.r > 0.8);
      rows.push([tile.name.slice(7), tile.id, board.name.replace('Library v4 — ', ''), section, title, desc,
        (isNew ? 'n' : '') + (pro ? 'p' : '') + (light ? 'l' : '')].join('\t'));
    }
  }
}
return rows.length + '\n' + rows.join('\n');
