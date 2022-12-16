import promptSync from 'prompt-sync';
const prompt = promptSync();

class HumanPlayer {
  constructor(gameNode, tokenType) {
    this.gameNode = gameNode;
    this.tokenType = tokenType;
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

export default HumanPlayer;
