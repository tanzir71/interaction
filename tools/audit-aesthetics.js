/* INTRX aesthetic audit — flags demos that break the design law in AESTHETIC_BENCHMARKS.md.
   Run: node tools/audit-aesthetics.js   (from repo root)
   Flags: LIGHT-ROOT, MULTI-HUE:n (>=4 hue families), SAT:n (>=3 saturated colors), NON-MONO-FONT, EMOJI.
   Warnings, not errors — raster/glitch/scene demos are often concept-exempt (KIMI_QA P3). */
const vm = require('vm'), fs = require('fs'), os = require('os'), path = require('path');
const dir = path.join(__dirname, '..', 'js');
const c = {}; c.window = c; vm.createContext(c);
fs.readdirSync(dir).filter(f => f.startsWith('demos.')).forEach(f => {
  try { vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), c, { filename: f }); }
  catch (e) { console.error('LOAD FAIL', f, e.message); }
});
const hexes = s => (s.match(/#[0-9a-fA-F]{3,8}\b/g) || []).map(h => h.toLowerCase());
const toRgb = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); const n = parseInt(h.slice(0, 6), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const lum = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const hueBucket = ([r, g, b]) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); if (mx - mn < 30) return null; let h; if (mx === r) h = ((g - b) / (mx - mn)) % 6; else if (mx === g) h = (b - r) / (mx - mn) + 2; else h = (r - g) / (mx - mn) + 4; h = Math.round(h * 60); if (h < 0) h += 360; return Math.round(h / 30); };
const ACCENT_BUCKET = 1; // ~30deg = orange family, exempt from hue counting? No — counted, single accent allowed via >=4 threshold.
let flagged = 0;
const byCat = {};
const report = [];
c.INTRX.demos.forEach(d => {
  const all = hexes(d.css + ' ' + d.js);
  const buckets = new Set(all.map(h => hueBucket(toRgb(h))).filter(x => x !== null));
  const sat = [...new Set(all)].filter(h => { const [r, g, b] = toRgb(h); const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx > 100 && (mx - mn) / mx > 0.55; });
  const esc = d.rootClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rootRule = (d.css.match(new RegExp('\\.' + esc + '\\s*\\{([^}]*)\\}')) || [])[1] || '';
  const bgm = rootRule.match(/background(?:-color)?\s*:\s*([^;]+)/);
  const bg = bgm ? bgm[1].trim() : '';
  const flags = [];
  const rootHex = (bg.match(/#[0-9a-fA-F]{3,8}\b/) || [])[0];
  if ((rootHex && lum(toRgb(rootHex)) > 0.75) || /\bwhite\b/i.test(bg)) flags.push('LIGHT-ROOT ' + bg.slice(0, 30));
  if (buckets.size >= 4) flags.push('MULTI-HUE:' + buckets.size);
  if (sat.length >= 3) flags.push('SAT:' + sat.length);
  if (/font-family\s*:[^;]*\b(Inter|Impact|Arial|Helvetica)\b/.test(d.css)) flags.push('NON-MONO-FONT');
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(d.html + d.js)) flags.push('EMOJI');
  report.push({ id: d.id, category: d.cat, rootBackground: bg, flags });
  if (flags.length) { flagged++; (byCat[d.cat] = byCat[d.cat] || []).push('  ' + d.id + '  [' + flags.join(', ') + ']'); }
});
Object.keys(byCat).sort().forEach(k => console.log('\n== ' + k + ' (' + byCat[k].length + ')\n' + byCat[k].join('\n')));
console.log('\nTOTAL ' + c.INTRX.demos.length + ' demos, ' + flagged + ' flagged');
const reportPath = path.join(os.tmpdir(), 'audit.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log('REPORT ' + reportPath);
