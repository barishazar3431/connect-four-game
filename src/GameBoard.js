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
    // return this.board[0].every((slot) => slot !== 0);
  }

  getChildrenStates(tokenType) {
    const childrenStates = [];
    
    for (let i = 0; i < this.board[0].length; i++) {
      const newBoard = this.board.map(row => row.slice()); //Copy of current board array

      const newGameState = new GameBoard(newBoard);
      newGameState.addToken(i + 1, tokenType);

      childrenStates.push(newGameState);
    }

    return childrenStates;
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
