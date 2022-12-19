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

  minimax(gameNode, depth, isMaximizing) {
    if (gameNode.isDraw()) {
      return 0;
    }

    if (gameNode.isWinning(tokenTypes.X)) {
      return Number.POSITIVE_INFINITY;
    }

    if (gameNode.isWinning(tokenTypes.O)) {
      return Number.NEGATIVE_INFINITY;
    }

    if (depth === 0) {
      return (
        gameNode.totalMaxAdjacentTokenCounts(tokenTypes.X) -
        gameNode.totalMaxAdjacentTokenCounts(tokenTypes.O)
      );
    }

    if (isMaximizing) {
      let maxEvaluation = Number.NEGATIVE_INFINITY;

      const childrenNodes = gameNode.getChildrenGameNodes(tokenTypes.X);
      for (const childNode of childrenNodes) {
        const evaluation = this.minimax(childNode, depth - 1, false);
        maxEvaluation = Math.max(maxEvaluation, evaluation);
      }
      return maxEvaluation;
    } else {
      let minEvaluation = Number.POSITIVE_INFINITY;

      const childrenNodes = gameNode.getChildrenGameNodes(tokenTypes.O);
      for (const childNode of childrenNodes) {
        const evaluation = this.minimax(childNode, depth - 1, true);
        minEvaluation = Math.min(minEvaluation, evaluation);
      }

      return minEvaluation;
    }
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

  isDraw() {
    return this.board[0].every((slot, i) => this.isPositionFull(i + 1));
  }

  isWinning(tokenType) {
    return (
      Math.max(
        this.maxAdjacentHorizontalTokenCount(tokenType),
        this.maxAdjacentVerticalTokenCount(tokenType),
        this.maxAdjacentDiagonalTokenCount(tokenType),
        this.maxAdjacentAntiDiagonalTokenCount(tokenType)
      ) >= 4
    );
  }

  totalMaxAdjacentTokenCounts(tokenType) {
    return (
      Math.pow(this.maxAdjacentHorizontalTokenCount(tokenType), 2) +
      Math.pow(this.maxAdjacentVerticalTokenCount(tokenType), 2) +
      Math.pow(this.maxAdjacentDiagonalTokenCount(tokenType), 2) +
      Math.pow(this.maxAdjacentAntiDiagonalTokenCount(tokenType), 2)
    );
  }

  maxAdjacentHorizontalTokenCount(tokenType) {
    let maxCount = 0;
    for (let i = 0; i < this.board.length; i++) {
      let adjCount = 0;
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === tokenType) {
          adjCount++;
          maxCount = Math.max(maxCount, adjCount);
        } else {
          adjCount = 0;
        }
      }
    }
    return maxCount;
  }

  maxAdjacentVerticalTokenCount(tokenType) {
    let maxCount = 0;
    for (let i = 0; i < this.board[0].length; i++) {
      let adjCount = 0;
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[j][i] === tokenType) {
          adjCount++;
          maxCount = Math.max(maxCount, adjCount);
        } else {
          adjCount = 0;
        }
      }
    }
    return maxCount;
  }

  maxAdjacentDiagonalTokenCount(tokenType) {
    let maxCount = 0;
    for (let i = 0; i < this.board.length; i++) {
      let adjCount = 0;
      for (
        let j = 0, k = i;
        j < this.board[i].length && k < this.board.length;
        j++, k++
      ) {
        if (this.board[k][j] === tokenType) {
          adjCount++;
          maxCount = Math.max(maxCount, adjCount);
        } else {
          adjCount = 0;
        }
      }
    }
    return maxCount;
  }

  maxAdjacentAntiDiagonalTokenCount(tokenType) {
    let maxCount = 0;
    for (let i = 0; i < this.board.length; i++) {
      let adjCount = 0;
      for (
        let j = this.board[i].length - 1, k = i;
        j >= 0 && k < this.board.length;
        j--, k++
      ) {
        if (this.board[k][j] === tokenType) {
          adjCount++;
          maxCount = Math.max(maxCount, adjCount);
        } else {
          adjCount = 0;
        }
      }
    }
    return maxCount;
  }

  toString() {
    let string = '';

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        const boardValue = this.board[i][j];
        string += `${boardValue === 0 ? ' ' : boardValue.token}|`;
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
  X: {
    isMaximizing: true,
    token: 'X',
  },
  O: {
    isMaximizing: false,
    token: 'O',
  },
};

export default GameNode;
