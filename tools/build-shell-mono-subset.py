"""Reproduce the mobile shell font; requires fontTools 4.63.0 and Brotli.

No Python package is used by the site. Original fonts and portable demo fonts
stay unchanged. Run with --check to compare all three checked-in outputs.
"""
from io import BytesIO
from pathlib import Path
import hashlib
import json
import sys
import unicodedata
from fontTools import subset, version
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/fonts/geist-mono-variable.woff2'
FONT = ROOT / 'assets/fonts/geist-mono-ui.woff2'
META = ROOT / 'assets/fonts/geist-mono-ui.json'
FIXTURE = ROOT / 'tools/fixtures/shell-mono-subset.json'
SOURCE_HASH = 'afaacc4c5fbba89d2ebf7a02dc4070208540874592a5504d57175782fe893101'
RANGES = [(0, 0xff), (0x131, 0x131), (0x152, 0x153), (0x2bb, 0x2bc),
          (0x2c6, 0x2c6), (0x2da, 0x2dc), (0x300, 0x36f), (0x2000, 0x206f),
          (0x20ac, 0x20ac), (0x2122, 0x2122), (0x2190, 0x2193),
          (0x2212, 0x2212), (0xfeff, 0xfeff), (0xfffd, 0xfffd)]
sha = lambda b: hashlib.sha256(b).hexdigest()
assert version == '4.63.0', 'Use the recorded fontTools version for reproducible output'
assert sha(SOURCE.read_bytes()) == SOURCE_HASH, 'Original font changed; review before regenerating'
original = TTFont(SOURCE, recalcTimestamp=False)
font = TTFont(SOURCE, recalcTimestamp=False)
# Keep every original letter/mark together, including complete Cyrillic and
# Latin extensions. Splitting those shaping runs between faces changes paint.
points = {c for a, b in RANGES for c in range(a, b+1)}
points.update(cp for cp in original.getBestCmap()
              if unicodedata.category(chr(cp))[0] in 'LM')
merged = []
for cp in sorted(points):
    if merged and cp == merged[-1][1]+1:
        merged[-1][1] = cp
    else:
        merged.append([cp, cp])
options = subset.Options()
options.retain_gids = True
options.notdef_outline = True
options.recommended_glyphs = True
options.hinting = True
options.glyph_names = False
options.layout_features = ['*']
options.name_IDs = ['*']
options.name_languages = ['*']
options.recalc_timestamp = False
worker = subset.Subsetter(options=options)
worker.populate(unicodes=sorted(points))
worker.subset(font)
font.flavor = 'woff2'
buffer = BytesIO()
font.save(buffer)
data = buffer.getvalue()
result = TTFont(BytesIO(data))
before, after = original.getBestCmap(), result.getBestCmap()
assert set(after).issubset(before)
for cp, name in after.items():
    assert original.getGlyphID(before[cp]) == result.getGlyphID(name), hex(cp)
    assert original['hmtx'][before[cp]] == result['hmtx'][name], hex(cp)
for tag, fields in [('hhea', ['ascent', 'descent', 'lineGap']),
                    ('OS/2', ['sTypoAscender', 'sTypoDescender', 'sTypoLineGap',
                              'usWinAscent', 'usWinDescent'])]:
    for field in fields:
        assert getattr(original[tag], field) == getattr(result[tag], field)
axes = lambda f: [dict(tag=a.axisTag, minimum=a.minValue, default=a.defaultValue,
                       maximum=a.maxValue) for a in f['fvar'].axes]
names = lambda f, n: sorted({x.toUnicode() for x in f['name'].names if x.nameID == n})
assert axes(original) == axes(result)
for name_id in [0, 13, 14]:
    assert names(original, name_id) == names(result, name_id)
meta = dict(source='assets/fonts/geist-mono-variable.woff2', sourceSHA256=SOURCE_HASH,
            sourceBytes=SOURCE.stat().st_size, output='assets/fonts/geist-mono-ui.woff2',
            outputSHA256=sha(data), outputBytes=len(data), fontTools=version,
            recipe='tools/build-shell-mono-subset.py', retainedCharacters=len(after),
            retainedOriginalGlyphIDs=True, retainedOriginalAdvances=True,
            retainedLineMetrics=True, hinting=True, layoutFeatures='*',
            originalTextCharacters=True, glyphNames=False, axes=axes(result),
            unicodeRange=','.join('U+%04X-%04X' % (a, b) if a != b else 'U+%04X' % a
                                  for a, b in merged),
            copyright=names(result, 0), license=names(result, 13),
            licenseURL=names(result, 14), licenseFile='assets/fonts/Geist-OFL.txt',
            scope='Mobile shell text/UI face, including every original letter and mark. The original face covers additional symbols; desktop and portable exports keep the original font.')
fixture = dict(points=sorted(after), outside=sorted(set(before)-set(after)), strings=[
    '520 166 150 93 43 12 56', 'NEW · For agents · Coming soon',
    'npx @tanziro/intrx mcp', 'font-weight: 100 900; // Geist Mono',
    '0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '-> => !== === <= >= && || :: ++ -- ** /* */ // ffi ffl fi fl',
    'é e\u0301 Å A\u030a naïve œ Œ € $ £ ¥ © ™ − → ← ↑ ↓',
    '32px · 0.5× · 1× · 2× · 100% · …',
    ''.join(chr(cp) for cp in sorted(after)),
    ''.join(chr(cp) for cp in sorted(set(before)-set(after))),
    'Latin Ελληνικά Кириллица: Ж Ω щ 123 — 456',
])
outputs = [(FONT, data), (META, (json.dumps(meta, indent=2)+'\n').encode()),
           (FIXTURE, (json.dumps(fixture, ensure_ascii=True, indent=2)+'\n').encode())]
for file, value in outputs:
    if '--check' in sys.argv:
        actual = file.read_bytes()
        if file.suffix == '.json':
            actual = actual.replace(b'\r\n', b'\n')
        assert actual == value, 'Generated output differs: '+str(file)
    else:
        file.write_bytes(value)
print(('Checked' if '--check' in sys.argv else 'Built')+
      ' mobile Mono: %d bytes, %d characters, %s' % (len(data), len(after), sha(data)))
