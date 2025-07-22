import Table from 'cli-table3';
import ProbabilityCalculator from './ProbabilityCalculator.js';

export default class ProbabilityTableRenderer {
  static show(diceList, cli) {
    const table = new Table({
      head: ['User dice v', ...diceList.map(d => d.getFaces().join(','))],
      style: {
        head: ['green'],
        border: ['white'],
        compact: false,
        'padding-left': 1,
        'padding-right': 1,
        wordWrap: true
      },
    });
    for (const userDice of diceList) {
      const row = [userDice.getFaces().join(',')];

      for (const opponentDice of diceList) {
        const prob = ProbabilityCalculator.calculate(userDice, opponentDice);
        row.push(prob.toFixed(4));
      }

      table.push(row);
    }

    cli.print(`Probability of the win for the user:`);
    cli.print(table.toString());
  }
}
