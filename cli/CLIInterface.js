import readline from 'node:readline';

export default class CLIInterface {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  close() {
    this.rl.close();
  }

  showDiceOptions(diceList) {
    diceList.forEach((dice, i) => {
      console.log(`${i} - ${dice.toString()}`);
    });
    console.log('X - exit');
    console.log('? - help');
  }

  showOptions(maxOptionValue) {
    for(let i = 0; i <= maxOptionValue; i++){
      console.log(`${i} - ${i}`);
    }
    console.log('X - exit');
    console.log('? - help');
  }

  print(message) {
    console.log(message);
  }

  printChooseFirstPlayerMsg(hmac) {
    console.log(`Let\'s determine who makes the first move.`);
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    console.log('Try to guess my selection.');
    this.showOptions(1);
  }
}
