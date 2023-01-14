import { playerTypes } from './players/Player.js';

export function completableScore(gameBoard) {
  const maximizingCompletables = getCompletableArray(
    gameBoard,
    playerTypes.maximizing
  );
  const minimizingCompletables = getCompletableArray(
    gameBoard,
    playerTypes.minimizing
  );

  let score = 0;
  maximizingCompletables.forEach((completable) => (score += completable));
  minimizingCompletables.forEach((completable) => (score -= completable));

  return score;
}

export function centralityScore(gameBoard) {
  const weights = [
    [1, 2, 4, 8, 8, 4, 2, 1],
    [2, 4, 8, 16, 16, 8, 4, 2],
    [4, 8, 16, 32, 32, 16, 8, 4],
    [8, 16, 32, 128, 128, 32, 16, 8],
    [4, 8, 16, 32, 32, 16, 8, 4],
    [2, 4, 8, 16, 16, 8, 4, 2],
    [1, 2, 4, 8, 8, 4, 2, 1],
  ];
  let score = 0;
  for (let i = 0; i < gameBoard.board.length; i++) {
    for (let j = 0; j < gameBoard.board[i].length; j++) {
      const currentToken = gameBoard.board[i][j];
      if (currentToken === playerTypes.maximizing) {
        score += weights[i][j];
      }

      if (currentToken === playerTypes.minimizing) {
        score -= weights[i][j];
      }
    }
  }

  return score;
}

export function combined(gameBoard) {
  const weights = [0.05, 0.95];

  const combinedScore =
    centralityScore(gameBoard) * weights[0] +
    completableScore(gameBoard) * weights[1];

  return combinedScore;
}

function getCompletableArray(gameBoard, playerType) {
  let adjacentCounts = new Array(4).fill(0);

  for (let i = 0; i < gameBoard.board.length; i++) {
    for (let j = 0; j < gameBoard.board[i].length; j++) {
      if (gameBoard.board[i][j] === playerType) {
        adjacentCounts[verticalCompletableScore(gameBoard, i, j)]++;
        adjacentCounts[horizontalCompletableScore(gameBoard, i, j)]++;
        adjacentCounts[diagonalCompletableScore(gameBoard, i, j)]++;
        adjacentCounts[antiDiagonalCompletableScore(gameBoard, i, j)]++;
      }
    }
  }

  //Normalize counts which are repeated
  adjacentCounts = adjacentCounts.slice(1).map((count, i) => count / (i + 1));

  return adjacentCounts;
}

//Get horizontal completable adjacent number of a point
function horizontalCompletableScore(gameBoard, row, col) {
  const tokenType = gameBoard.board[row][col];
  let [low, high] = [col - 1, col + 1];
  let [lowFast, highFast] = [col - 1, col + 1];

  while (low >= 0 && gameBoard.board[row][low] === tokenType) {
    low--;
  }

  while (
    high < gameBoard.board[0].length &&
    gameBoard.board[row][high] === tokenType
  ) {
    high++;
  }

  while (
    lowFast >= 0 &&
    (gameBoard.board[row][lowFast] === tokenType ||
      gameBoard.board[row][lowFast] === 0)
  ) {
    lowFast--;
  }

  while (
    highFast < gameBoard.board[0].length &&
    (gameBoard.board[row][highFast] === tokenType ||
      gameBoard.board[row][highFast] === 0)
  ) {
    highFast++;
  }

  const adjacentCount = high - low - 1;
  const potentialCount = highFast - lowFast - 1;
  const completableAdjacentCount = potentialCount < 4 ? 0 : adjacentCount;

  return completableAdjacentCount;
}

function verticalCompletableScore(gameBoard, row, col) {
  const tokenType = gameBoard.board[row][col];

  let low = row - 1,
    lowFast = row - 1;
  let high = row + 1,
    highFast = row + 1;

  while (low >= 0 && gameBoard.board[low][col] === tokenType) {
    low--;
  }

  while (
    high < gameBoard.board.length &&
    gameBoard.board[high][col] === tokenType
  ) {
    high++;
  }

  while (
    lowFast >= 0 &&
    (gameBoard.board[lowFast][col] === tokenType ||
      gameBoard.board[lowFast][col] === 0)
  ) {
    lowFast--;
  }

  while (
    highFast < gameBoard.board.length &&
    (gameBoard.board[highFast][col] === tokenType ||
      gameBoard.board[highFast][col] === 0)
  ) {
    highFast++;
  }

  const adjacentCount = high - low - 1;
  const potentialCount = highFast - lowFast - 1;
  const completableAdjacentCount = potentialCount < 4 ? 0 : adjacentCount;

  return completableAdjacentCount;
}

function diagonalCompletableScore(gameBoard, row, col) {
  const tokenType = gameBoard.board[row][col];

  let lowI = row - 1,
    lowJ = col - 1,
    lowIFast = row - 1,
    lowJFast = col - 1;
  let highI = row + 1,
    highIFast = row + 1,
    highJ = col + 1,
    highJFast = col + 1;

  while (lowI >= 0 && lowJ >= 0 && gameBoard.board[lowI][lowJ] === tokenType) {
    lowI--;
    lowJ--;
  }

  while (
    highI < gameBoard.board.length &&
    highJ < gameBoard.board[0].length &&
    gameBoard.board[highI][highJ] === tokenType
  ) {
    highI++;
    highJ++;
  }

  while (
    lowIFast >= 0 &&
    lowJFast >= 0 &&
    (gameBoard.board[lowIFast][lowJFast] === tokenType ||
      gameBoard.board[lowIFast][lowJFast] === 0)
  ) {
    lowIFast--;
    lowJFast--;
  }

  while (
    highIFast < gameBoard.board.length &&
    highJFast < gameBoard.board[0].length &&
    (gameBoard.board[highIFast][highJFast] === tokenType ||
      gameBoard.board[highIFast][highJFast] === 0)
  ) {
    highIFast++;
    highJFast++;
  }

  const adjacentCount = highI - lowI - 1;
  const potentialCount = highIFast - lowIFast - 1;
  const completableAdjacentCount = potentialCount < 4 ? 0 : adjacentCount;

  return completableAdjacentCount;
}

function antiDiagonalCompletableScore(gameBoard, row, col) {
  const tokenType = gameBoard.board[row][col];

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
    lowJ < gameBoard.board[0].length &&
    gameBoard.board[lowI][lowJ] === tokenType
  ) {
    lowI--;
    lowJ++;
  }

  while (
    highI < gameBoard.board.length &&
    highJ >= 0 &&
    gameBoard.board[highI][highJ] === tokenType
  ) {
    highI++;
    highJ--;
  }

  while (
    lowIFast >= 0 &&
    lowJFast < gameBoard.board[0].length &&
    (gameBoard.board[lowIFast][lowJFast] === tokenType ||
      gameBoard.board[lowIFast][lowJFast] === 0)
  ) {
    lowIFast--;
    lowJFast++;
  }

  while (
    highIFast < gameBoard.board.length &&
    highJFast >= 0 &&
    (gameBoard.board[highIFast][highJFast] === tokenType ||
      gameBoard.board[highIFast][highJFast] === 0)
  ) {
    highIFast++;
    highJFast--;
  }

  const adjacentCount = highI - lowI - 1;
  const potentialCount = highIFast - lowIFast - 1;
  const completableAdjacentCount = potentialCount < 4 ? 0 : adjacentCount;

  return completableAdjacentCount;
}
