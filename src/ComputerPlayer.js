class ComputerPlayer {
  constructor(board, tokenType) {
    this.board = board;
    this.tokenType = tokenType;
  }

  takeTurn() {
    const position = Math.floor(Math.random() * 7) + 1;

    try {
      this.board.addToken(position, this.tokenType);
    } catch (err) {
      this.takeTurn();
    }
  }
}

export default ComputerPlayer;
