import { playerTypes } from './players/Player.js';

export function completableAdjacentScore(gameBoard) {
  const maximizingScores = getAdjacentArray(gameBoard, playerTypes.maximizing);
  const minimizingScores = getAdjacentArray(gameBoard, playerTypes.minimizing);

  const weights = [0, 5, 7.5, 11.25]; //Weights of adjacent token counts(2 adjacent's weight is 10, 3 is 20 ...)
  let score = 0;
  for (let i = 0; i < weights.length; i++) {
    score += maximizingScores[i] * weights[i];
    score -= minimizingScores[i] * weights[i];
  }
  return score;
}

export function centralityScore(gameBoard) {
  const weights = [
    [1, 2, 4, 8, 8, 4, 2, 1],
    [2, 4, 8, 16, 16, 8, 4, 2],
    [4, 8, 16, 32, 32, 16, 8, 4],
    [8, 16, 32, 64, 64, 32, 16, 8],
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
  const weights = [0.1, 0.9];

  const combinedScore =
    centralityScore(gameBoard) * weights[0] +
    completableAdjacentScore(gameBoard) * weights[1];

  return combinedScore;
}

function getAdjacentArray(gameBoard, playerType) {
  let adjacentCounts = new Array(gameBoard.board[0].length).fill(0);

  for (let i = 0; i < gameBoard.board.length; i++) {
    for (let j = 0; j < gameBoard.board[i].length; j++) {
      if (gameBoard.board[i][j] === playerType) {
        adjacentCounts[verticalAdjacents(gameBoard, i, j)]++;
        adjacentCounts[horizontalAdjacents(gameBoard, i, j)]++;
        adjacentCounts[diagonalAdjacents(gameBoard, i, j)]++;
        adjacentCounts[antiDiagonalAdjacents(gameBoard, i, j)]++;
      }
    }
  }
  adjacentCounts = adjacentCounts.map((count, i) => {
    return i === 0 ? count : count / i;
  });
  return adjacentCounts;
}

//Get horizontal completable adjacent number of a point
function horizontalAdjacents(gameBoard, row, col) {
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

function verticalAdjacents(gameBoard, row, col) {
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

function diagonalAdjacents(gameBoard, row, col) {
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

function antiDiagonalAdjacents(gameBoard, row, col) {
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
