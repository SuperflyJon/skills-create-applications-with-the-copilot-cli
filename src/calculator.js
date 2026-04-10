#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Exponentiation (^)
 * - Square Root (√)
 */

class Calculator {
  /**
   * Adds two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} The sum of a and b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Subtracts two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} The difference of a and b
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * Multiplies two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} The product of a and b
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Divides two numbers
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} The quotient of a divided by b
   * @throws {Error} If attempting to divide by zero
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  /**
   * Returns the remainder of division
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} The remainder of a divided by b
   * @throws {Error} If attempting modulo by zero
   */
  modulo(a, b) {
    if (b === 0) {
      throw new Error('Modulo by zero is not allowed');
    }
    return a % b;
  }

  /**
   * Raises base to the power of exponent
   * @param {number} base - The base number
   * @param {number} exponent - The exponent
   * @returns {number} The result of base raised to the exponent
   */
  power(base, exponent) {
    return Math.pow(base, exponent);
  }

  /**
   * Calculates the square root of a number
   * @param {number} n - The number to find the square root of
   * @returns {number} The square root of n
   * @throws {Error} If attempting to find square root of negative number
   */
  squareRoot(n) {
    if (n < 0) {
      throw new Error('Square root of negative numbers is not allowed');
    }
    return Math.sqrt(n);
  }

  /**
   * Performs calculation based on operation type
   * @param {number} a - First operand
   * @param {number} b - Second operand
   * @param {string} operation - Operation type: 'add', 'subtract', 'multiply', 'divide', 'modulo', 'power', or 'squareRoot'
   * @returns {number} The result of the calculation
   * @throws {Error} If operation is not supported
   */
  calculate(a, b, operation) {
    switch (operation.toLowerCase()) {
      case 'add':
      case '+':
        return this.add(a, b);
      case 'subtract':
      case '-':
        return this.subtract(a, b);
      case 'multiply':
      case '*':
        return this.multiply(a, b);
      case 'divide':
      case '/':
        return this.divide(a, b);
      case 'modulo':
      case '%':
        return this.modulo(a, b);
      case 'power':
      case '^':
        return this.power(a, b);
      case 'squareroot':
      case 'sqrt':
      case '√':
        return this.squareRoot(a);
      default:
        throw new Error(`Unsupported operation: ${operation}. Use: add, subtract, multiply, divide, modulo, power, or squareRoot`);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: calculator.js <number1> <operation> [number2]');
    console.log('Operations (binary): add (+), subtract (-), multiply (*), divide (/), modulo (%), power (^)');
    console.log('Operations (unary): squareRoot (√), sqrt');
    console.log('Examples:');
    console.log('  calculator.js 10 add 5');
    console.log('  calculator.js 17 modulo 5');
    console.log('  calculator.js 2 power 8');
    console.log('  calculator.js 16 squareRoot');
    process.exit(1);
  }

  try {
    const num1 = parseFloat(args[0]);
    const operation = args[1];
    const num2 = args[2] ? parseFloat(args[2]) : null;

    if (isNaN(num1)) {
      console.error('Error: Please provide valid numbers');
      process.exit(1);
    }

    // Check if operation is unary (square root)
    const isUnaryOp = ['squareroot', 'sqrt', '√'].includes(operation.toLowerCase());
    
    if (!isUnaryOp && (args.length < 3 || isNaN(num2))) {
      console.error(`Error: ${operation} requires two numbers`);
      process.exit(1);
    }

    const calculator = new Calculator();
    let result;

    if (isUnaryOp) {
      result = calculator.calculate(num1, null, operation);
      console.log(`√${num1} = ${result}`);
    } else {
      result = calculator.calculate(num1, num2, operation);
      console.log(`${num1} ${operation} ${num2} = ${result}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = Calculator;
