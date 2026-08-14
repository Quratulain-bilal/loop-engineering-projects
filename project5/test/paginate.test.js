const test = require('node:test');
const assert = require('node:assert');
const { paginate } = require('../src/paginate');

// Pages are 1-based: page 1 is the first page.
const items = [1, 2, 3, 4, 5, 6, 7];

test('page 1 returns the first slice', () => {
  assert.deepStrictEqual(paginate(items, 1, 3), [1, 2, 3]);
});

test('page 2 returns the second slice', () => {
  assert.deepStrictEqual(paginate(items, 2, 3), [4, 5, 6]);
});

test('the last page returns only what is left', () => {
  assert.deepStrictEqual(paginate(items, 3, 3), [7]);
});

test('a page past the end is empty', () => {
  assert.deepStrictEqual(paginate(items, 9, 3), []);
});

test('page 0 or below throws', () => {
  assert.throws(() => paginate(items, 0, 3), /page/i);
});

test('does not mutate the input', () => {
  const copy = [...items];
  paginate(items, 1, 3);
  assert.deepStrictEqual(items, copy);
});
