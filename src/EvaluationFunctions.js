import { playerTypes } from './players/Player.js';

export function evaluationFunction(gameBoard) {
  const maximizingScores = getAdjacentCounts(gameBoard, playerTypes.maximizing);
  const minimizingScores = getAdjacentCounts(gameBoard, playerTypes.minimizing);

  const weights = [0, 5, 10, 20];
  let score = 0;
  for (let i = 0; i < weights.length; i++) {
    score += maximizingScores[i] * weights[i];
    score -= minimizingScores[i] * weights[i];
  }
  return score;
}

function getAdjacentCounts(gameBoard, playerType) {
  let adjacentCounts = new Array(gameBoard.board[0].length).fill(0);
  for (let i = 0; i < gameBoard.board.length; i++) {
    for (let j = 0; j < gameBoard.board[i].length; j++) {
      if (gameBoard.board[i][j] === playerType) {
        adjacentCounts[verticalScore(gameBoard, i, j)]++;
        adjacentCounts[horizontalScore(gameBoard, i, j)]++;
        adjacentCounts[diagonalScore(gameBoard, i, j)]++;
        adjacentCounts[antiDiagonalScore(gameBoard, i, j)]++;
      }
    }
  }
  adjacentCounts = adjacentCounts.map((count, i) => {
    return i === 0 ? count : count / i;
  });
  return adjacentCounts;
}

//Get horizontal score of a point
function horizontalScore(gameBoard, row, col) {
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
  if (potentialCount < 4) {
    return 0;
  }

  return adjacentCount;
}

function verticalScore(gameBoard, row, col) {
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

  if (potentialCount < 4) {
    return 0;
  }

  return adjacentCount;
}

function diagonalScore(gameBoard, row, col) {
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

  if (potentialCount < 4) {
    return 0;
  }

  return adjacentCount;
}

function antiDiagonalScore(gameBoard, row, col) {
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

  if (potentialCount < 4) {
    return 0;
  }

  return adjacentCount;
}
