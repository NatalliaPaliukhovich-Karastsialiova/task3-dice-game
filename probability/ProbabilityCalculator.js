export default class ProbabilityCalculator {
  static calculate(userDice, opponentDice) {
    let wins = 0;
    let total = 0;

    userDice.getFaces().forEach((u) => {
      opponentDice.getFaces().forEach((o) => {
        if (parseInt(u, 10) > parseInt(o, 10)) wins += 1;
        total += 1;
      });
    });

    return wins / total;
  }
}
