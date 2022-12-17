import promptSync from 'prompt-sync';
import Player from './Player.js';
const prompt = promptSync();

export default class HumanPlayer extends Player {
  constructor(gameNode, tokenType) {
    super(gameNode, tokenType);
  }

  takeTurn() {
    const position = prompt('Position: ');

    try {
      this.gameNode.addTokenToBoard(position, this.tokenType);
    } catch (err) {
      console.log(err.message);
      console.log('Try again.');
      this.takeTurn();
    }

  }
}
