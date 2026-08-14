const test = require('node:test');
const assert = require('node:assert');
const { average, titleCase, unique } = require('../src/kit');

test('average returns the mean', () => {
  assert.strictEqual(average([2, 4, 6]), 4);
  assert.strictEqual(average([10]), 10);
});

test('average throws on an empty list', () => {
  assert.throws(() => average([]), /empty/i);
});

test('titleCase capitalizes every word and lowercases the rest', () => {
  assert.strictEqual(titleCase('hello world'), 'Hello World');
  assert.strictEqual(titleCase('gOOd MORNing'), 'Good Morning');
  assert.strictEqual(titleCase(''), '');
});

test('unique removes duplicates, keeps order, does not mutate input', () => {
  const input = [3, 1, 3, 2, 1, 3];
  assert.deepStrictEqual(unique(input), [3, 1, 2]);
  assert.deepStrictEqual(input, [3, 1, 3, 2, 1, 3], 'input array must not be modified');
});
