const test = require('node:test');
const assert = require('node:assert');
const { slugify } = require('../src/slug');

test('lowercases and joins words with hyphens', () => {
  assert.strictEqual(slugify('Hello World'), 'hello-world');
});

test('handles more than one space', () => {
  assert.strictEqual(slugify('One Two Three Four'), 'one-two-three-four');
});

test('strips punctuation', () => {
  assert.strictEqual(slugify("What's New?"), 'whats-new');
});

test('collapses runs of separators', () => {
  assert.strictEqual(slugify('a --  b'), 'a-b');
});

test('trims leading and trailing separators', () => {
  assert.strictEqual(slugify('  spaced out  '), 'spaced-out');
});

test('empty string stays empty', () => {
  assert.strictEqual(slugify(''), '');
});
