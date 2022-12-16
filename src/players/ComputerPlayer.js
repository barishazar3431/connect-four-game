class ComputerPlayer {
  constructor(gameNode, tokenType) {
    this.gameNode = gameNode;
    this.tokenType = tokenType;
  }

  takeTurn() {
    const position = Math.floor(Math.random() * 7);

    const childrenGameNodes = this.gameNode.getChildrenGameNodes(
      this.tokenType
    );
    const newBoard = childrenGameNodes[position].board;

    this.gameNode.board = newBoard;
  }
}

export default ComputerPlayer;
