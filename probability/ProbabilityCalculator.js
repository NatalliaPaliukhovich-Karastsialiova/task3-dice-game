export default class ProbabilityCalculator {
  static calculate(userDice, opponentDice) {
    let wins = 0;
    let total = 0;

    for (const u of userDice.getFaces()) {
      for (const o of opponentDice.getFaces()) {
        if (parseInt(u) > parseInt(o)) wins++;
        total++;
      }
    }

    return wins / total;
  }
}
