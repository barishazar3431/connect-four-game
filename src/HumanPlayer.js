import promptSync from 'prompt-sync';
const prompt = promptSync();

class HumanPlayer {
  constructor(board, tokenType) {
    this.board = board;
    this.tokenType = tokenType;
  }

  takeTurn() {
    const position = prompt('Position: ');

    try {
      this.board.addToken(position, this.tokenType);
    } catch (err) {
      console.log(err.message);
      console.log('Try again.');
      this.takeTurn();
    }
  }
}

export default HumanPlayer;
