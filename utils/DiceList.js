export default class DiceList {
  static originalDiceList = [];

  static init(diceList) {
    DiceList.originalDiceList = [...diceList];
  }

  static getFullDices() {
    return DiceList.originalDiceList;
  }
}
