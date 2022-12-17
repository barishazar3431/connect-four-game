class ComputerPlayer {
  constructor(gameNode, tokenType) {
    this.gameNode = gameNode;
    this.tokenType = tokenType;
  }

  takeTurn() {
    const childrenGameNodes = this.gameNode.getChildrenGameNodes(
      this.tokenType
    );

    const newBoardIndex = Math.floor(Math.random() * childrenGameNodes.length);
    const newBoard = childrenGameNodes[newBoardIndex].board;

    this.gameNode.board = newBoard;

    return newBoardIndex + 1;
  }
}

export default ComputerPlayer;
