import Player from './Player.js';
import { playerTypes } from './Player.js';

export default class ComputerPlayer extends Player {
  constructor(gameBoard, playerType, depth) {
    super(gameBoard, playerType);
    this.depth = depth;
    this.isMaximizing = this.playerType === 'X';
  }

  takeTurn() {
    const bestChild = this.getBestChild();

    this.gameBoard.board = bestChild.board;
  }

  getBestChild() {
    const childrenBoards = this.gameBoard.getChildrenBoards(this.playerType);
    childrenBoards.forEach((child) => {
      const score = child.minimax(this.depth, !this.isMaximizing);
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
