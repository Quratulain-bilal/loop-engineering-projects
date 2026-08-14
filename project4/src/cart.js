// Shopping cart totals.

// Sum line items, apply a percentage discount, add tax.
// Money is in cents throughout to avoid float drift.
function cartTotal(items, discountPercent, taxPercent) {
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.qty;
  }

  const discounted = subtotal - subtotal * discountPercent;
  const taxed = discounted + discounted * taxPercent;

  return Math.round(taxed);
}

module.exports = { cartTotal };
