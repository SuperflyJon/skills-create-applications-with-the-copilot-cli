const Calculator = require('../calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Addition', () => {
    test('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add two negative numbers', () => {
      expect(calculator.add(-5, -3)).toBe(-8);
    });

    test('should add positive and negative numbers', () => {
      expect(calculator.add(10, -4)).toBe(6);
    });

    test('should add with zero', () => {
      expect(calculator.add(5, 0)).toBe(5);
    });

    test('should add decimal numbers', () => {
      expect(calculator.add(2.5, 1.5)).toBe(4);
    });

    test('should add large numbers', () => {
      expect(calculator.add(1000000, 2000000)).toBe(3000000);
    });
  });

  describe('Subtraction', () => {
    test('should subtract two positive numbers', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract resulting in negative', () => {
      expect(calculator.subtract(5, 10)).toBe(-5);
    });

    test('should subtract two negative numbers', () => {
      expect(calculator.subtract(-5, -3)).toBe(-2);
    });

    test('should subtract with zero', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
    });

    test('should subtract decimal numbers', () => {
      expect(calculator.subtract(10.5, 4.5)).toBe(6);
    });

    test('should subtract same number (result zero)', () => {
      expect(calculator.subtract(42, 42)).toBe(0);
    });
  });

  describe('Multiplication', () => {
    test('should multiply two positive numbers', () => {
      expect(calculator.multiply(45, 2)).toBe(90);
    });

    test('should multiply positive and negative numbers', () => {
      expect(calculator.multiply(5, -3)).toBe(-15);
    });

    test('should multiply two negative numbers', () => {
      expect(calculator.multiply(-5, -3)).toBe(15);
    });

    test('should multiply by zero', () => {
      expect(calculator.multiply(100, 0)).toBe(0);
    });

    test('should multiply decimal numbers', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
    });

    test('should multiply by one', () => {
      expect(calculator.multiply(42, 1)).toBe(42);
    });

    test('should multiply large numbers', () => {
      expect(calculator.multiply(1000, 2000)).toBe(2000000);
    });
  });

  describe('Division', () => {
    test('should divide two positive numbers', () => {
      expect(calculator.divide(20, 5)).toBe(4);
    });

    test('should divide resulting in decimal', () => {
      expect(calculator.divide(10, 4)).toBe(2.5);
    });

    test('should divide positive by negative', () => {
      expect(calculator.divide(10, -2)).toBe(-5);
    });

    test('should divide two negative numbers', () => {
      expect(calculator.divide(-10, -2)).toBe(5);
    });

    test('should divide by one', () => {
      expect(calculator.divide(42, 1)).toBe(42);
    });

    test('should divide zero by a number', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing negative by zero', () => {
      expect(() => calculator.divide(-10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing zero by zero', () => {
      expect(() => calculator.divide(0, 0)).toThrow('Division by zero is not allowed');
    });

    test('should divide decimal numbers', () => {
      expect(calculator.divide(7.5, 2.5)).toBe(3);
    });
  });

  describe('Calculate (main method)', () => {
    test('should calculate addition with word', () => {
      expect(calculator.calculate(2, 3, 'add')).toBe(5);
    });

    test('should calculate addition with symbol', () => {
      expect(calculator.calculate(2, 3, '+')).toBe(5);
    });

    test('should calculate subtraction with word', () => {
      expect(calculator.calculate(10, 4, 'subtract')).toBe(6);
    });

    test('should calculate subtraction with symbol', () => {
      expect(calculator.calculate(10, 4, '-')).toBe(6);
    });

    test('should calculate multiplication with word', () => {
      expect(calculator.calculate(45, 2, 'multiply')).toBe(90);
    });

    test('should calculate multiplication with symbol', () => {
      expect(calculator.calculate(45, 2, '*')).toBe(90);
    });

    test('should calculate division with word', () => {
      expect(calculator.calculate(20, 5, 'divide')).toBe(4);
    });

    test('should calculate division with symbol', () => {
      expect(calculator.calculate(20, 5, '/')).toBe(4);
    });

    test('should handle case-insensitive operation names', () => {
      expect(calculator.calculate(2, 3, 'ADD')).toBe(5);
      expect(calculator.calculate(10, 4, 'SUBTRACT')).toBe(6);
    });

    test('should throw error for unsupported operation', () => {
      expect(() => calculator.calculate(2, 3, 'power')).toThrow('Unsupported operation: power');
    });

    test('should throw error for invalid operation symbol', () => {
      expect(() => calculator.calculate(2, 3, '^')).toThrow('Unsupported operation: ^');
    });
  });

  describe('Edge Cases and Examples from Image', () => {
    test('Example 1: 2 + 3 = 5', () => {
      expect(calculator.calculate(2, 3, '+')).toBe(5);
    });

    test('Example 2: 10 - 4 = 6', () => {
      expect(calculator.calculate(10, 4, '-')).toBe(6);
    });

    test('Example 3: 45 * 2 = 90', () => {
      expect(calculator.calculate(45, 2, '*')).toBe(90);
    });

    test('Example 4: 20 / 5 = 4', () => {
      expect(calculator.calculate(20, 5, '/')).toBe(4);
    });

    test('should handle very small decimal numbers', () => {
      expect(calculator.divide(0.001, 0.001)).toBe(1);
    });

    test('should maintain precision with reasonable decimals', () => {
      const result = calculator.multiply(0.1, 0.2);
      expect(Math.abs(result - 0.02) < 0.0001).toBe(true);
    });
  });
});
