import Dice from './Dice.js';

export default class DiceParser {

  static parse(argv) {

    const args = argv.slice(2);

    if (args.length < 3) {
      throw new Error('You must provide at least 3 dice. Example: 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3');
    }

    const diceList = args.map((arg, index) => {
      const parts = arg.split(',');
      if (parts.length !== 6) {
        throw new Error(`Dice #${index + 1} must contain exactly 6 integers.`);
      }

      const numbers = parts.map((n) => {
        const value = parseInt(n);
        if (isNaN(value)) {
          throw new Error(`Non-integer value in dice #${index + 1}: "${n}"`);
        }
        return value;
      });

      return new Dice(numbers);
    });

    return diceList;
  }

}
