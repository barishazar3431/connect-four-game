class ComputerPlayer {
  constructor(board, tokenType) {
    this.board = board;
    this.tokenType = tokenType;
  }

  takeTurn() {
    const position = Math.floor(Math.random() * 7);

    const childrenStates = this.board.getChildrenStates(this.tokenType);
    childrenStates.sort((a, b) => {
      return a.numOfAdjacentTokens(this.tokenType) - b.numOfAdjacentTokens(this.tokenType);
    })

    const board = childrenStates[0];

    this.board.setGameBoard(board);

    // try {
    //   this.board.addToken(position, this.tokenType);
    // } catch (err) {
    //   this.takeTurn();
    // }
  }
}

export default ComputerPlayer;
