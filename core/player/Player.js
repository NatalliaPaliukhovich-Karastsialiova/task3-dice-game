import CLIInterface from '../../cli/CLIInterface.js';

export default class Player {
  constructor(cli, dice) {
    this.dice = null;
    this.cli = cli;
  }

  setDice(dice) {
    this.dice = dice;
  }

  getDice() {
    return this.dice;
  }
}
