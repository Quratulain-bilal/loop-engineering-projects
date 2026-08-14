const { calculateAverage, findMax, includes } = require('./utils');

describe('Utility Functions', () => {
  describe('calculateAverage', () => {
    test('should calculate average of numbers', () => {
      expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
    });

    test('should return 0 for empty array', () => {
      expect(calculateAverage([])).toBe(0);
    });

    test('should handle single element', () => {
      expect(calculateAverage([5])).toBe(5);
    });
  });

  describe('findMax', () => {
    test('should find maximum value', () => {
      expect(findMax([1, 5, 3, 9, 2])).toBe(9);
    });

    test('should return null for empty array', () => {
      expect(findMax([])).toBeNull();
    });

    test('should handle single element', () => {
      expect(findMax([7])).toBe(7);
    });
  });

  describe('includes', () => {
    test('should return true if value exists', () => {
      expect(includes([1, 2, 3], 2)).toBe(true);
    });

    test('should return false if value not found', () => {
      expect(includes([1, 2, 3], 4)).toBe(false);
    });

    test('should return false for null array', () => {
      expect(includes(null, 1)).toBe(false);
    });
  });
});