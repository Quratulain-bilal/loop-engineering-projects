const { calculateAverage, findMax, includes } = require('./src/utils');

console.log('=== Testing Planted Bugs ===\n');

// Test 1: Off-by-one error in calculateAverage
console.log('Test 1: calculateAverage with off-by-one error');
try {
  const result = calculateAverage([1, 2, 3, 4, 5]);
  console.log(`Result: ${result}`);
  console.log('Expected: 3');
  console.log('Status: BUG PRESENT - Should throw error or return NaN\n');
} catch (error) {
  console.log(`Error caught: ${error.message}`);
  console.log('Status: Bug causes runtime error\n');
}

// Test 2: Missing null check in includes
console.log('Test 2: includes with missing null check');
try {
  const result = includes([1, 2, 3], null);
  console.log(`Result: ${result}`);
  console.log('Expected: false');
  console.log('Status: BUG PRESENT - Should handle null value\n');
} catch (error) {
  console.log(`Error caught: ${error.message}`);
  console.log('Status: Bug causes runtime error\n');
}

// Test 3: findMax (should work correctly)
console.log('Test 3: findMax (control test)');
try {
  const result = findMax([1, 5, 3, 9, 2]);
  console.log(`Result: ${result}`);
  console.log('Expected: 9');
  console.log('Status: OK - No bug\n');
} catch (error) {
  console.log(`Error caught: ${error.message}`);
  console.log('Status: Unexpected error\n');
}

console.log('=== Bug Tests Complete ===');