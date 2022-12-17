class GameNode {
  constructor(board = []) {
    this.board = board;
  }

  addTokenToBoard(position, tokenType) {
    if (this.isPositionOutOfBounds(position)) {
      throw new Error(`Position out of bound (${position})`);
    }

    if (this.isPositionFull(position)) {
      throw new Error(`Position ${position} is full! Choose another position`);
    }

    const colIndex = position - 1;
    const rowIndex = this.getRowIndexOfNewToken(position);

    this.board[rowIndex][colIndex] = tokenType;
  }

  getRowIndexOfNewToken(position) {
    const colIndex = position - 1;
    let rowIndex = 0;

    while (rowIndex < this.board.length && !this.board[rowIndex][colIndex]) {
      rowIndex++;
    }

    return --rowIndex;
  }

  // getRowIndexOfLastToken(position) {
  //   const rowIndex = this.getRowIndexOfNewToken(position) + 1;

  //   if (rowIndex < 0 || rowIndex >= this.board.length) {
  //     throw new Error(`Position ${position} is empty or full!`);
  //   }
  //   return rowIndex;
  // }

  isPositionOutOfBounds(position) {
    return position < 1 || position > this.board[0].length;
  }

  isPositionFull(position) {
    return this.board[0][position - 1] !== 0;
  }

  getChildrenGameNodes(tokenType) {
    const childrenGameNodes = [];

    for (let i = 0; i < this.board[0].length; i++) {
      if (this.isPositionFull(i + 1)) {
        //If current position is full, don't consider it (position = index + 1)
        continue;
      }

      const newBoard = this.board.map((row) => row.slice()); //Copy of current board array
      const newGameNode = new GameNode(newBoard);
      newGameNode.addTokenToBoard(i + 1, tokenType);

      childrenGameNodes.push(newGameNode);
    }
    return childrenGameNodes;
  }

  isGameOver() {
    //Not complete!!
    return this.board[0].every((slot, i) => this.isPositionFull(i + 1));
  }

  numOfAdjacentTokens(tokenType) {
    //TODO
  }

  isWinning(tokenType) {
    return (
      this.isWinningHorizontal(tokenType) ||
      this.isWinningVertical(tokenType) ||
      this.isWinningDiagonal(tokenType) ||
      this.isWinningAntidiagonal(tokenType)
    );
  }

  isWinningHorizontal(tokenType) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length - 3; j++) {
        if (
          this.board[i][j] === tokenType &&
          this.board[i][j + 1] === tokenType &&
          this.board[i][j + 2] === tokenType &&
          this.board[i][j + 3] === tokenType
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isWinningVertical(tokenType) {
    for (let i = 0; i < this.board.length - 3; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (
          this.board[i][j] === tokenType &&
          this.board[i + 1][j] === tokenType &&
          this.board[i + 2][j] === tokenType &&
          this.board[i + 3][j] === tokenType
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isWinningDiagonal(tokenType) {
    for (let i = 0; i < this.board.length - 3; i++) {
      for (let j = 0; j < this.board[i].length - 3; j++) {
        if (
          this.board[i][j] === tokenType &&
          this.board[i + 1][j + 1] === tokenType &&
          this.board[i + 2][j + 2] === tokenType &&
          this.board[i + 3][j + 3] === tokenType
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isWinningAntidiagonal(tokenType) {
    for (let i = 0; i < this.board.length - 3; i++) {
      for (let j = this.board[i].length - 1; j > 2; j--) {
        if (
          this.board[i][j] === tokenType &&
          this.board[i + 1][j - 1] === tokenType &&
          this.board[i + 2][j - 2] === tokenType &&
          this.board[i + 3][j - 3] === tokenType
        ) {
          return true;
        }
      }
    }
    return false;
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

export const tokenTypes = {
  X: 'X',
  O: 'O',
};

export default GameNode;
