const test = require('node:test');
const assert = require('node:assert');
const { daysBetween } = require('../src/dates');

test('same day is zero', () => {
  assert.strictEqual(daysBetween('2026-03-01', '2026-03-01'), 0);
});

test('consecutive days is one', () => {
  assert.strictEqual(daysBetween('2026-03-01', '2026-03-02'), 1);
});

test('a full week is seven', () => {
  assert.strictEqual(daysBetween('2026-03-01', '2026-03-08'), 7);
});

test('reversed order gives a negative count', () => {
  assert.strictEqual(daysBetween('2026-03-08', '2026-03-01'), -7);
});

test('spans a month boundary', () => {
  assert.strictEqual(daysBetween('2026-01-30', '2026-02-02'), 3);
});
