// Small utility kit. Three functions, three deliberate bugs.
// The tests in test/kit.test.js describe the intended behaviour.

// Mean of a list of numbers. Empty list has no mean, so throw.
function average(nums) {
  if (nums.length === 0) throw new Error('cannot average an empty list');
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum / nums.length;
}

// Capitalize the first letter of every word, lowercase the rest.
function titleCase(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Return a new array with duplicates removed, original order kept.
// Must not modify the caller's array.
function unique(arr) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

module.exports = { average, titleCase, unique };
