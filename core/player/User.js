import Player from './Player.js';
import ProbabilityTableRenderer from '../../probability/ProbabilityTableRenderer.js';
import DiceList from '../../utils/DiceList.js';

export default class User extends Player {
  async selectDice(diceList) {
    this.cli.showDiceOptions(diceList);
    const index = await this.getAnswer((diceList?.length ?? 0) - 1);
    this.setDice(diceList[index]);
    return index;
  }

  async selectValue(range) {
    const index = await this.getAnswer(range);
    this._number = index;
    return index;
  }

  async getAnswer(topBoundary) {
    while (true) {
      const input = await this.cli.ask('Your selection: ');
      if (input.toLowerCase() === 'x') process.exit(0);
      if (input === '?') {
        ProbabilityTableRenderer.show(DiceList.getFullDices(), this.cli);
        continue;
      }

      const index = parseInt(input, 10);
      if (Number.isNaN(index) || index < 0 || index > topBoundary) {
        this.cli.print('Invalid selection. Try again.');
        continue;
      }

      return index;
    }
  }

  finalizeRoll(computerValue) {
    const finalIndex = (this._number + computerValue) % 6;
    this.finalValue = this.dice.getFace(finalIndex);
    return {
      index: this._number,
      key: null,
      module: finalIndex,
      value: this.finalValue,
    };
  }
}
