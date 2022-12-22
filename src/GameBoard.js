import { playerTypes } from "./players/Player.js";

export default class GameBoard {
  constructor(board = []) {
    this.board = board;
  }

  addTokenToBoard(position, playerType) {
    if (this.isPositionOutOfBounds(position)) {
      throw new Error(`Position out of bound (${position})`);
    }

    if (this.isPositionFull(position)) {
      throw new Error(`Position ${position} is full! Choose another position`);
    }

    const colIndex = position - 1;
    const rowIndex = this.getRowIndexOfNewToken(position);

    this.board[rowIndex][colIndex] = playerType;
  }

  getRowIndexOfNewToken(position) {
    const colIndex = position - 1;
    let rowIndex = 0;

    while (rowIndex < this.board.length && !this.board[rowIndex][colIndex]) {
      rowIndex++;
    }

    return --rowIndex;
  }

  isPositionOutOfBounds(position) {
    return position < 1 || position > this.board[0].length;
  }

  isPositionFull(position) {
    return this.board[0][position - 1] !== 0;
  }

  emptySlotCount() {
    let count = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {
          count++;
        }
      }
    }
    return count;
  }

  isGameOver() {
    return (
      this.isDraw() ||
      this.isWinning(playerTypes.maximizing) ||
      this.isWinning(playerTypes.minimizing)
    );
  }

  getChildrenBoards(playerType) {
    const childrenBoards = [];

    for (let i = 0; i < this.board[0].length; i++) {
      if (this.isPositionFull(i + 1)) {
        //If current position is full, don't consider it (position = index + 1)
        continue;
      }

      const newBoard = this.board.map((row) => row.slice()); //Copy of current board array

      const newBoardClass = new GameBoard(newBoard);
      newBoardClass.addTokenToBoard(i + 1, playerType);

      childrenBoards.push(newBoardClass);
    }
    return childrenBoards;
  }

  isDraw() {
    return this.board[0].every((slot, i) => this.isPositionFull(i + 1));
  }

  isWinning(playerType) {
    let maxScore = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === playerType) {
          maxScore = Math.max(
            maxScore,
            this.verticalScore(i, j),
            this.horizontalScore(i, j),
            this.diagonalScore(i, j),
            this.antiDiagonalScore(i, j)
          );
        }
      }
    }
    return maxScore >= 4;
  }

  calculateScore(playerType) {
    let sum = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === playerType) {
          sum += Math.pow(this.horizontalScore(i, j), 3);
          sum += Math.pow(this.verticalScore(i, j), 3);
          sum += Math.pow(this.diagonalScore(i, j), 3);
          sum += Math.pow(this.antiDiagonalScore(i, j), 3);
        }
      }
    }
    return sum;
  }

  minimax(depth, isMaximizing) {
    // if (this.isDraw()) {
    //   return 0;
    // }

    // if (this.isWinning(playerTypes.maximizing)) {
    //   return 20 * this.emptySlotCount();
    // }

    // if (this.isWinning(playerTypes.minimizing)) {
    //   return -20 * this.emptySlotCount();
    // }

    if (depth === 0 || this.isGameOver()) {
      return (
        this.calculateScore(playerTypes.maximizing) - this.calculateScore(playerTypes.minimizing)
      );
    }

    if (isMaximizing) {
      let maxEvaluation = Number.NEGATIVE_INFINITY;

      const childrenNodes = this.getChildrenBoards(playerTypes.maximizing);
      for (const childNode of childrenNodes) {
        const evaluation = childNode.minimax(depth - 1, false);
        maxEvaluation = Math.max(maxEvaluation, evaluation);
      }
      return maxEvaluation;
    } else {
      let minEvaluation = Number.POSITIVE_INFINITY;

      const childrenNodes = this.getChildrenBoards(playerTypes.minimizing);
      for (const childNode of childrenNodes) {
        const evaluation = childNode.minimax(depth - 1, true);
        minEvaluation = Math.min(minEvaluation, evaluation);
      }

      return minEvaluation;
    }
  }

  //Get horizontal score of a point
  horizontalScore(row, col) {
    const tokenType = this.board[row][col];
    let [low, high] = [col - 1, col + 1];
    let [lowFast, highFast] = [col - 1, col + 1];

    while (low >= 0 && this.board[row][low] === tokenType) {
      low--;
    }

    while (high < this.board[0].length && this.board[row][high] === tokenType) {
      high++;
    }

    while (
      lowFast >= 0 &&
      (this.board[row][lowFast] === tokenType || this.board[row][lowFast] === 0)
    ) {
      lowFast--;
    }

    while (
      highFast < this.board[0].length &&
      (this.board[row][highFast] === tokenType ||
        this.board[row][highFast] === 0)
    ) {
      highFast++;
    }

    const adjacentCount = high - low - 1;
    const potentialCount = highFast - lowFast - 1;
    if (potentialCount < 4) {
      return 0;
    }

    return adjacentCount;
  }

  verticalScore(row, col) {
    const tokenType = this.board[row][col];

    let low = row - 1,
      lowFast = row - 1;
    let high = row + 1,
      highFast = row + 1;

    while (low >= 0 && this.board[low][col] === tokenType) {
      low--;
    }

    while (high < this.board.length && this.board[high][col] === tokenType) {
      high++;
    }

    while (
      lowFast >= 0 &&
      (this.board[lowFast][col] === tokenType || this.board[lowFast][col] === 0)
    ) {
      lowFast--;
    }

    while (
      highFast < this.board.length &&
      (this.board[highFast][col] === tokenType ||
        this.board[highFast][col] === 0)
    ) {
      highFast++;
    }

    const adjacentCount = high - low - 1;
    const potentialCount = highFast - lowFast - 1;

    if (potentialCount < 4) {
      return 0;
    }

    return adjacentCount;
  }

  diagonalScore(row, col) {
    const tokenType = this.board[row][col];

    let lowI = row - 1,
      lowJ = col - 1,
      lowIFast = row - 1,
      lowJFast = col - 1;
    let highI = row + 1,
      highIFast = row + 1,
      highJ = col + 1,
      highJFast = col + 1;

    while (lowI >= 0 && lowJ >= 0 && this.board[lowI][lowJ] === tokenType) {
      lowI--;
      lowJ--;
    }

    while (
      highI < this.board.length &&
      highJ < this.board[0].length &&
      this.board[highI][highJ] === tokenType
    ) {
      highI++;
      highJ++;
    }

    while (
      lowIFast >= 0 &&
      lowJFast >= 0 &&
      (this.board[lowIFast][lowJFast] === tokenType ||
        this.board[lowIFast][lowJFast] === 0)
    ) {
      lowIFast--;
      lowJFast--;
    }

    while (
      highIFast < this.board.length &&
      highJFast < this.board[0].length &&
      (this.board[highIFast][highJFast] === tokenType ||
        this.board[highIFast][highJFast] === 0)
    ) {
      highIFast++;
      highJFast++;
    }

    const adjacentCount = highI - lowI - 1;
    const potentialCount = highIFast - lowIFast - 1;

    if (potentialCount < 4) {
      return 0;
    }

    return adjacentCount;
  }

  antiDiagonalScore(row, col) {
    const tokenType = this.board[row][col];

    let lowI = row - 1,
      lowJ = col + 1,
      lowIFast = row - 1,
      lowJFast = col + 1;
    let highI = row + 1,
      highIFast = row + 1,
      highJ = col - 1,
      highJFast = col - 1;

    while (
      lowI >= 0 &&
      lowJ < this.board[0].length &&
      this.board[lowI][lowJ] === tokenType
    ) {
      lowI--;
      lowJ++;
    }

    while (
      highI < this.board.length &&
      highJ >= 0 &&
      this.board[highI][highJ] === tokenType
    ) {
      highI++;
      highJ--;
    }

    while (
      lowIFast >= 0 &&
      lowJFast < this.board[0].length &&
      (this.board[lowIFast][lowJFast] === tokenType ||
        this.board[lowIFast][lowJFast] === 0)
    ) {
      lowIFast--;
      lowJFast++;
    }

    while (
      highIFast < this.board.length &&
      highJFast >= 0 &&
      (this.board[highIFast][highJFast] === tokenType ||
        this.board[highIFast][highJFast] === 0)
    ) {
      highIFast++;
      highJFast--;
    }

    const adjacentCount = highI - lowI - 1;
    const potentialCount = highIFast - lowIFast - 1;

    if (potentialCount < 4) {
      return 0;
    }

    return adjacentCount;
  }

  toString() {
    let string = '';

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        const boardValue = this.board[i][j];
        string += `${boardValue === 0 ? ' ' : boardValue}|`;
      }
      string += '\n';
    }

    for (let i = 1; i <= this.board[0].length; i++) {
      string += `${i} `;
    }

    return string;
  }
}


