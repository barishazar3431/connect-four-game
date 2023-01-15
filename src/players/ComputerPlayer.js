import Player from './Player.js';

export default class ComputerPlayer extends Player {
  constructor(gameBoard, playerType, plies, evaluationFunction) {
    super(gameBoard, playerType);
    this.plies = plies;
    this.isMaximizing = this.playerType === 'X';
    this.evaluationFunction = evaluationFunction;
  }

  takeTurn() {
    const bestChild = this.getBestChild(); //Find the best child
    this.gameBoard.board = bestChild.board; //Change the board to this new child
  }

  /**Returns the best child by calling minimax for each of them */
  getBestChild() {
    const childrenBoards = this.gameBoard.getChildrenBoards(this.playerType);
    childrenBoards.forEach((child, i) => {
      const score = child.minimax(this.evaluationFunction ,this.plies, !this.isMaximizing);
      console.log(score);
      child.minimaxScore = score;
    });

    childrenBoards.sort((a, b) => b.minimaxScore - a.minimaxScore);

    if (this.isMaximizing) {
      return childrenBoards[0];
    } else {
      return childrenBoards[childrenBoards.length - 1];
    }
  }
}
