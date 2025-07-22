import FairRandomProtocol from '../../fair/FairRandomProtocol.js';
import Player from './Player.js';

export default class Computer extends Player {
  constructor(cli, dice) {
    super(cli, dice);
  }

  selectDice(diceList) {
    const index = Math.floor(Math.random() * diceList.length);
    const selectedDice = diceList[index];
    this.setDice(selectedDice);
    return index;
  }

  generateSecretNumber(range) {
    const protocol = new FairRandomProtocol(range);
    const hmac = protocol.commit();
    this.setSecretNumber(protocol);
    return hmac;
  }

  setSecretNumber(protocol) {
    const { number, key } = protocol.reveal();
    this._number = number;
    this._key = key;
  }

  getSecretNumber() {
    return [this._number, this._key];
  }

  finalizeRoll(userValue) {
    const finalIndex = (this._number + userValue) % 6;
    this.finalValue = this.dice.getFace(finalIndex);
    return {
        index: this._number,
        key: this._key,
        module: finalIndex,
        value: this.finalValue
    };
  }
}
