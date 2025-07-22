export default class Player {
  constructor(cli) {
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
