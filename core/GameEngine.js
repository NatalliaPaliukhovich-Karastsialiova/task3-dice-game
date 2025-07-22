import CLIInterface from '../cli/CLIInterface.js';
import Computer from '../core/player/Computer.js';
import User from '../core/player/User.js';

export default class GameEngine {

  static originalDiceList = [];

  constructor(diceList, usersRange, facesRange) {
    this.diceList = diceList;
    GameEngine.originalDiceList = [...diceList];
    this.cli = new CLIInterface();
    this.computer = new Computer(this.cli);
    this.user = new User(this.cli);
    this.usersRange = usersRange;
    this.facesRange = facesRange;
  }

  static getFullDices() {
    return GameEngine.originalDiceList;
  }

  removeDice(excludeIndex) {
    this.diceList.splice(excludeIndex, this.usersRange);
  }

  async determineFirstPlayer() {
    const hmac = this.computer.generateSecretNumber(this.usersRange);
    this.cli.printChooseFirstPlayerMsg(hmac);
    let userInput = await this.user.selectValue(this.usersRange);
    const userGuess = parseInt(userInput);
    const [ secret, key ] = this.computer.getSecretNumber();
    this.cli.print(`My selection: ${secret} (KEY=${key}).`);
    const userGoesFirst = userGuess === secret;
    this.userGoesFirst = userGoesFirst;
    return userGoesFirst;
  }

  async start() {
    const userGoesFirst = await this.determineFirstPlayer();
    let userDiceIndex, computerDiceIndex;

    if (userGoesFirst) {
      this.cli.print('You go first!');
      this.cli.print('Choose your dice:');
      userDiceIndex = await this.user.selectDice(this.diceList);
      this.removeDice(userDiceIndex);
      computerDiceIndex = this.computer.selectDice(this.diceList);
      this.cli.print(`You choose the ${this.user.dice.toString()} dice.`);
      this.cli.print(`I choose the ${this.computer.dice.toString()} dice.`);
    } else {
      computerDiceIndex = this.computer.selectDice(this.diceList);
      this.cli.print(`I make the first move and choose the ${this.computer.dice.toString()} dice.`);
      this.removeDice(computerDiceIndex);
      userDiceIndex = await this.user.selectDice(this.diceList);
      this.cli.print(`You choose the ${this.user.dice.toString()} dice.`);
    }

    await this.makeTurn(this.facesRange, userGoesFirst);
    await this.makeTurn(this.facesRange, !userGoesFirst);
    this.checkWinner(this.computer, this.user);
    process.exit(0);
  }

  checkWinner(computerInst, userInst) {
    const computer = parseInt(computerInst.finalValue, 10);
    const user = parseInt(userInst.finalValue, 10);

    if (computer === user) {
      this.cli.print(`Draw (${computer} = ${user})`);
      return;
    }

    const winner = computer > user ? 'I' : 'You';
    const winStr = computer > user
      ? `${computer} > ${user}`
      : `${user} > ${computer}`;

    this.cli.print(`${winner} win (${winStr})`);
  }

  async makeTurn(range, isUser = false) {
    this.cli.print(isUser ? `It's time for your roll.` : `It's time for my roll.`);
    const hmac = this.computer.generateSecretNumber(range);
    this.cli.print(`I selected a random value in the range 0..${range} (HMAC=${hmac}).`);
    this.cli.print('Add your number modulo 6.');
    this.cli.showOptions(range);
    const moduleIndex = await this.user.selectValue(range);
    const [computerNumber, computerKey] = this.computer.getSecretNumber();
    this.cli.print(`My number is: ${computerNumber} (KEY=${computerKey}).`);
    const final = isUser ? this.user.finalizeRoll(computerNumber) : this.computer.finalizeRoll(moduleIndex);
    this.cli.print(`The fair number generation result is ${computerNumber} + ${moduleIndex} = ${final.module} (mod 6).`);
    this.cli.print(isUser ? `Your roll result is ${final.value}.` : `My roll result is ${final.value}.`);
  }
}
