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
      expect(() => calculator.calculate(2, 3, 'log')).toThrow('Unsupported operation: log');
    });

    test('should throw error for invalid operation symbol', () => {
      expect(() => calculator.calculate(2, 3, '&')).toThrow('Unsupported operation: &');
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

  describe('Modulo', () => {
    test('should calculate modulo with positive numbers', () => {
      expect(calculator.modulo(5, 2)).toBe(1);
    });

    test('Example: modulo with 5 % 2', () => {
      expect(calculator.modulo(5, 2)).toBe(1);
    });

    test('should calculate modulo resulting in zero', () => {
      expect(calculator.modulo(10, 5)).toBe(0);
    });

    test('should handle modulo with negative dividend', () => {
      expect(calculator.modulo(-10, 3)).toBe(-1);
    });

    test('should handle modulo with negative divisor', () => {
      expect(calculator.modulo(10, -3)).toBe(1);
    });

    test('should handle modulo with both negative numbers', () => {
      expect(calculator.modulo(-10, -3)).toBe(-1);
    });

    test('should throw error when modulo by zero', () => {
      expect(() => calculator.modulo(10, 0)).toThrow('Modulo by zero is not allowed');
    });

    test('should calculate modulo with decimal numbers', () => {
      expect(calculator.modulo(5.5, 2)).toBe(1.5);
    });

    test('should handle modulo using % symbol in calculate', () => {
      expect(calculator.calculate(17, 5, '%')).toBe(2);
    });

    test('should handle modulo using modulo word in calculate', () => {
      expect(calculator.calculate(17, 5, 'modulo')).toBe(2);
    });
  });

  describe('Power (Exponentiation)', () => {
    test('should calculate power with positive exponent', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    test('Example: power with 2 ^ 3', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    test('should calculate power with large exponent', () => {
      expect(calculator.power(2, 8)).toBe(256);
    });

    test('should calculate power with exponent of zero', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    test('should calculate power with exponent of one', () => {
      expect(calculator.power(42, 1)).toBe(42);
    });

    test('should calculate power with negative exponent', () => {
      expect(calculator.power(2, -2)).toBe(0.25);
    });

    test('should calculate power with negative base', () => {
      expect(calculator.power(-2, 3)).toBe(-8);
    });

    test('should calculate power with negative base and even exponent', () => {
      expect(calculator.power(-2, 2)).toBe(4);
    });

    test('should calculate power with decimal base', () => {
      expect(calculator.power(2.5, 2)).toBe(6.25);
    });

    test('should calculate power with decimal exponent', () => {
      expect(Math.abs(calculator.power(4, 0.5) - 2) < 0.0001).toBe(true);
    });

    test('should handle power using ^ symbol in calculate', () => {
      expect(calculator.calculate(2, 8, '^')).toBe(256);
    });

    test('should handle power using power word in calculate', () => {
      expect(calculator.calculate(2, 8, 'power')).toBe(256);
    });
  });

  describe('Square Root', () => {
    test('should calculate square root of perfect squares', () => {
      expect(calculator.squareRoot(16)).toBe(4);
    });

    test('Example: square root with √16', () => {
      expect(calculator.squareRoot(16)).toBe(4);
    });

    test('should calculate square root of 4', () => {
      expect(calculator.squareRoot(4)).toBe(2);
    });

    test('should calculate square root of 25', () => {
      expect(calculator.squareRoot(25)).toBe(5);
    });

    test('should calculate square root of 1', () => {
      expect(calculator.squareRoot(1)).toBe(1);
    });

    test('should calculate square root of 0', () => {
      expect(calculator.squareRoot(0)).toBe(0);
    });

    test('should calculate square root of non-perfect squares', () => {
      expect(Math.abs(calculator.squareRoot(2) - 1.414213562) < 0.000001).toBe(true);
    });

    test('should calculate square root of decimal numbers', () => {
      expect(calculator.squareRoot(2.25)).toBe(1.5);
    });

    test('should throw error when calculating square root of negative number', () => {
      expect(() => calculator.squareRoot(-1)).toThrow('Square root of negative numbers is not allowed');
    });

    test('should throw error when calculating square root of large negative number', () => {
      expect(() => calculator.squareRoot(-100)).toThrow('Square root of negative numbers is not allowed');
    });

    test('should handle squareRoot using squareRoot word in calculate', () => {
      expect(calculator.calculate(16, null, 'squareRoot')).toBe(4);
    });

    test('should handle square root using sqrt word in calculate', () => {
      expect(calculator.calculate(25, null, 'sqrt')).toBe(5);
    });

    test('should handle square root using √ symbol in calculate', () => {
      expect(calculator.calculate(9, null, '√')).toBe(3);
    });
  });

  describe('Calculate Method with Extended Operations', () => {
    test('should calculate modulo with word', () => {
      expect(calculator.calculate(17, 5, 'modulo')).toBe(2);
    });

    test('should calculate modulo with symbol', () => {
      expect(calculator.calculate(17, 5, '%')).toBe(2);
    });

    test('should calculate power with word', () => {
      expect(calculator.calculate(3, 4, 'power')).toBe(81);
    });

    test('should calculate power with symbol', () => {
      expect(calculator.calculate(3, 4, '^')).toBe(81);
    });

    test('should calculate square root with word', () => {
      expect(calculator.calculate(16, null, 'squareRoot')).toBe(4);
    });

    test('should calculate square root with symbol', () => {
      expect(calculator.calculate(16, null, '√')).toBe(4);
    });

    test('should handle case-insensitive extended operations', () => {
      expect(calculator.calculate(17, 5, 'MODULO')).toBe(2);
      expect(calculator.calculate(2, 3, 'POWER')).toBe(8);
      expect(calculator.calculate(9, null, 'SQRT')).toBe(3);
    });

    test('should throw error for unsupported operation', () => {
      expect(() => calculator.calculate(2, 3, 'log')).toThrow('Unsupported operation: log');
    });
  });
});
