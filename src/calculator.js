#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
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
   * Performs calculation based on operation type
   * @param {number} a - First operand
   * @param {number} b - Second operand
   * @param {string} operation - Operation type: 'add', 'subtract', 'multiply', or 'divide'
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
      default:
        throw new Error(`Unsupported operation: ${operation}. Use: add, subtract, multiply, or divide`);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('Usage: calculator.js <number1> <operation> <number2>');
    console.log('Operations: add (+), subtract (-), multiply (*), divide (/)');
    console.log('Example: calculator.js 10 add 5');
    process.exit(1);
  }

  try {
    const num1 = parseFloat(args[0]);
    const operation = args[1];
    const num2 = parseFloat(args[2]);

    if (isNaN(num1) || isNaN(num2)) {
      console.error('Error: Please provide valid numbers');
      process.exit(1);
    }

    const calculator = new Calculator();
    const result = calculator.calculate(num1, num2, operation);
    console.log(`${num1} ${operation} ${num2} = ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = Calculator;
