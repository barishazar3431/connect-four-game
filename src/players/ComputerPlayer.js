import Player from './Player.js';

export default class ComputerPlayer extends Player {
  constructor(gameNode, tokenType) {
    super(gameNode, tokenType);
  }

  takeTurn() {
    const childrenGameNodes = this.gameNode.getChildrenGameNodes(
      this.tokenType
    );

    const newBoardIndex = Math.floor(Math.random() * childrenGameNodes.length);
    const newBoard = childrenGameNodes[newBoardIndex].board;

    this.gameNode.board = newBoard;
  }
}
