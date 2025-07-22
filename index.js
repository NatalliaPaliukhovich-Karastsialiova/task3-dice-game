import DiceParser from './core/DiceParser.js';
import GameEngine from './core/GameEngine.js';
import DiceList from './utils/DiceList.js';

try {
  const diceList = DiceParser.parse(process.argv);
  DiceList.init(diceList);
  const engine = new GameEngine(diceList, 1, 5);
  await engine.start();
} catch (err) {
  console.error('Error:', err.message);
  console.error('Example: node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3');
}
