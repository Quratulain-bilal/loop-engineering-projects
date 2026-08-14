// Utility functions for the project

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

/**
 * Check if value exists in array
 * @param {any[]} arr - Array to search
 * @param {any} value - Value to find
 * @returns {boolean} True if found
 */
function includes(arr, value) {
  if (!arr || value === null || value === undefined) {
    return false;
  }
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  
  return false;
}

module.exports = {
  calculateAverage,
  findMax,
  includes
};