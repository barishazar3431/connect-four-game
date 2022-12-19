import { tokenTypes } from '../GameNode.js';
import Player from './Player.js';

export default class ComputerPlayer extends Player {
  constructor(gameNode, tokenType, depth) {
    super(gameNode, tokenType);
    this.isMaximizing = tokenType.isMaximizing;
    this.depth = depth;
  }


  takeTurn() {
    const childrenGameNodes = this.gameNode.getChildrenGameNodes(
      this.tokenType,
      this.gameNode.board
    );

    let minEval = Number.POSITIVE_INFINITY;
    let maxEval = Number.NEGATIVE_INFINITY;
    let maxIndex = 0;
    let minIndex = 0;
    childrenGameNodes.forEach((childNode, i) => {
      const evaluation = this.gameNode.minimax(childNode, this.depth, this.isMaximizing);
      console.log(evaluation)
      // console.log(
      //   childNode.totalMaxAdjacentTokenCounts(tokenTypes.X) -
      //     childNode.totalMaxAdjacentTokenCounts(tokenTypes.O)
      // );
      // console.log(childNode.toString())
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

    this.gameNode.board = newBoard;
  }
}
