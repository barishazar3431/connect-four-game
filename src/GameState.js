class GameState {
  constructor(board = []) {
    this.board = board;
  }

  addToken(position, tokenType) {
    const colIndex = position - 1;

    let rowIndex = 0;

    while (rowIndex < this.board.length && !this.board[rowIndex][colIndex]) {
      rowIndex++;
    }

    this.board[--rowIndex][colIndex] = tokenType;
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

    return string;
  }
}

export default GameState;
