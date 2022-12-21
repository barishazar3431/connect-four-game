import Player from './Player.js';

export default class ComputerPlayer extends Player {
  constructor(gameBoard, tokenType, depth) {
    super(gameBoard, tokenType);
    this.isMaximizing = tokenType.isMaximizing;
    this.depth = depth;
  }

  takeTurn() {
    const childrenGameNodes = this.gameBoard.getChildrenBoards(
      this.tokenType,
      this.gameBoard.board
    );

    let minEval = Number.POSITIVE_INFINITY;
    let maxEval = Number.NEGATIVE_INFINITY;
    let maxIndex = 0;
    let minIndex = 0;
    childrenGameNodes.forEach((childNode, i) => {
      const evaluation = childNode.minimax(this.depth, this.isMaximizing);
      console.log(evaluation);

      if (evaluation > maxEval) {
        maxEval = evaluation;
        maxIndex = i;
      }

      if (evaluation < minEval) {
        minEval = evaluation;
        minIndex = i;
      }
    });

    let newBoard;
    if (this.isMaximizing) {
      newBoard = childrenGameNodes[maxIndex].board;
    } else {
      newBoard = childrenGameNodes[minIndex].board;
    }

    this.gameBoard.board = newBoard;
  }
}
