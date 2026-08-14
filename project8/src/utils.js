// Utility functions

/**
 * Calculate average of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Average value
 */
function calculateAverage(numbers) {
  if (!numbers || numbers.length === 0) {
    return 0;
  }
  
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  
  return sum / numbers.length;
}

/**
 * Find maximum value in array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Maximum value
 */
function findMax(numbers) {
  if (!numbers || numbers.length === 0) {
    return null;
  }
  
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  
  return max;
}

// TODO: fix lint - missing return type annotation
function processData(data) {
  if (!data) {
    return null;
  }
  
  return data.map(item => item * 2);
}

module.exports = {
  calculateAverage,
  findMax,
  processData
};