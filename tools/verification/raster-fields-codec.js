const assert = require('node:assert/strict');

// Inspector arrays contain Infinity and signed zero. JSON's numeric encoding
// would silently lose both, so numeric arrays use explicit little-endian bytes.
function unpack(value, pool) {
  if (Array.isArray(value)) return value.map(item => unpack(item, pool));
  if (!value || typeof value !== 'object') return value;
  if (value.$ref !== undefined) {
    assert(pool && pool[value.$ref], 'Missing fixture vector ' + value.$ref);
    return unpack(pool[value.$ref], pool);
  }
  if (value.$number) {
    return { Infinity, '-Infinity': -Infinity, NaN, '-0': -0 }[value.$number];
  }
  if (value.$vector) {
    const bytes = Buffer.from(value.$vector, 'base64');
    assert.equal(bytes.length, value.length * (value.format === 'u8' ? 1 : 8));
    return Array.from({ length: value.length }, (_, i) =>
      value.format === 'u8' ? bytes[i] : bytes.readDoubleLE(i * 8));
  }
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, unpack(item, pool)]));
}

function expand(value, pool) {
  if (Array.isArray(value)) return value.map(item => expand(item, pool));
  if (!value || typeof value !== 'object') return value;
  if (value.$ref !== undefined) return pool[value.$ref];
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, expand(item, pool)]));
}

module.exports = { unpack, expand };
