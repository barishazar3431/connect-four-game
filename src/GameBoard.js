class GameBoard {
  constructor(board = []) {
    this.board = board;
  }

  addToken(position, tokenType) {
    if (position < 1 || position > this.board[0].length) {
      throw new Error(`Position out of bound (${position})`);
    }

    const colIndex = position - 1;
    let rowIndex = 0;

    while (rowIndex < this.board.length && !this.board[rowIndex][colIndex]) {
      rowIndex++;
    }

    this.board[--rowIndex][colIndex] = tokenType;
  }

  isGameOver() {
    for (let i = 0; i < this.board.length; i++) {
      let horizontalCount = 0;
      let tokenType = '';
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] && this.board[i][j] === tokenType) {
          horizontalCount++;
        } else {
          horizontalCount = 1;
          tokenType = this.board[i][j];
        }
        if (horizontalCount === 4) {
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

    // string += '  ';
    for (let i = 1; i <= this.board[0].length; i++) {
      string += `${i} `;
    }

    return string;
  }
}

export default GameBoard;
