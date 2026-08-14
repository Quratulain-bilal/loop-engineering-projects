const test = require('node:test');
const assert = require('node:assert');
const { cartTotal } = require('../src/cart');

// Percentages are whole numbers: 10 means 10%, not 0.10.
// All amounts are integer cents.

test('no discount, no tax', () => {
  assert.strictEqual(cartTotal([{ price: 500, qty: 2 }], 0, 0), 1000);
});

test('applies a percentage discount', () => {
  // 1000 - 10% = 900
  assert.strictEqual(cartTotal([{ price: 500, qty: 2 }], 10, 0), 900);
});

test('applies tax after the discount', () => {
  // 1000 - 10% = 900, +5% tax = 945
  assert.strictEqual(cartTotal([{ price: 500, qty: 2 }], 10, 5), 945);
});

test('handles several line items', () => {
  // 300*3 + 250*2 = 1400, -25% = 1050, +8% = 1134
  assert.strictEqual(
    cartTotal([{ price: 300, qty: 3 }, { price: 250, qty: 2 }], 25, 8),
    1134
  );
});

test('empty cart is zero', () => {
  assert.strictEqual(cartTotal([], 10, 5), 0);
});

test('rejects a discount above 100 percent', () => {
  assert.throws(() => cartTotal([{ price: 100, qty: 1 }], 150, 0), /discount/i);
});
