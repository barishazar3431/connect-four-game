export default class Player {
  constructor(gameNode, tokenType) {
    this.gameNode = gameNode;
    this.tokenType = tokenType;
  }

  isWinning() {
    return (
      this.isWinningHorizontal(this.tokenType) ||
      this.isWinningVertical(this.tokenType) ||
      this.isWinningDiagonal(this.tokenType) ||
      this.isWinningAntidiagonal(this.tokenType)
    );
  }

  isWinningHorizontal() {
    for (let i = 0; i < this.gameNode.board.length; i++) {
      for (let j = 0; j < this.gameNode.board[i].length - 3; j++) {
        if (
          this.gameNode.board[i][j] === this.tokenType &&
          this.gameNode.board[i][j + 1] === this.tokenType &&
          this.gameNode.board[i][j + 2] === this.tokenType &&
          this.gameNode.board[i][j + 3] === this.tokenType
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isWinningVertical() {
    for (let i = 0; i < this.gameNode.board.length - 3; i++) {
      for (let j = 0; j < this.gameNode.board[i].length; j++) {
        if (
          this.gameNode.board[i][j] === this.tokenType &&
          this.gameNode.board[i + 1][j] === this.tokenType &&
          this.gameNode.board[i + 2][j] === this.tokenType &&
          this.gameNode.board[i + 3][j] === this.tokenType
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isWinningDiagonal() {
    for (let i = 0; i < this.gameNode.board.length - 3; i++) {
      for (let j = 0; j < this.gameNode.board[i].length - 3; j++) {
        if (
          this.gameNode.board[i][j] === this.tokenType &&
          this.gameNode.board[i + 1][j + 1] === this.tokenType &&
          this.gameNode.board[i + 2][j + 2] === this.tokenType &&
          this.gameNode.board[i + 3][j + 3] === this.tokenType
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isWinningAntidiagonal() {
    for (let i = 0; i < this.gameNode.board.length - 3; i++) {
      for (let j = this.gameNode.board[i].length - 1; j > 2; j--) {
        if (
          this.gameNode.board[i][j] === this.tokenType &&
          this.gameNode.board[i + 1][j - 1] === this.tokenType &&
          this.gameNode.board[i + 2][j - 2] === this.tokenType &&
          this.gameNode.board[i + 3][j - 3] === this.tokenType
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
