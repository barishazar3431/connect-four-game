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
