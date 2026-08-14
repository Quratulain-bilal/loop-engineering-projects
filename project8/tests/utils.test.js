const { calculateAverage, findMax, processData } = require('../src/utils');

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

  describe('processData', () => {
    test('should double each item', () => {
      expect(processData([1, 2, 3])).toEqual([2, 4, 6]);
    });

    test('should return null for null input', () => {
      expect(processData(null)).toBeNull();
    });
  });
});