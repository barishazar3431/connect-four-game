import { initialBoard } from './game.js';

/**
 * Traverses through the board array and returns the probability of
 * having a solution that passes through each position
 */
export function getProbabilitiesArray() {
  const probabilitiesArray = Array.from({ length: initialBoard.length }, () =>
    Array(initialBoard[0].length).fill(0)
  );

  horizontalProbabilities(probabilitiesArray);
  verticalProbabilities(probabilitiesArray);
  isWinningDiagonal(probabilitiesArray);
  isWinningAntidiagonal(probabilitiesArray);

  return probabilitiesArray;
}

function horizontalProbabilities(probabilitiesArray) {
  for (let i = 0; i < probabilitiesArray.length; i++) {
    for (let j = 0; j < probabilitiesArray[i].length - 3; j++) {
      probabilitiesArray[i][j]++;
      probabilitiesArray[i][j + 1]++;
      probabilitiesArray[i][j + 2]++;
      probabilitiesArray[i][j + 3]++;
    }
  }
}

function verticalProbabilities(probabilitiesArray) {
  for (let i = 0; i < probabilitiesArray.length - 3; i++) {
    for (let j = 0; j < probabilitiesArray[i].length; j++) {
      probabilitiesArray[i][j]++;
      probabilitiesArray[i + 1][j]++;
      probabilitiesArray[i + 2][j]++;
      probabilitiesArray[i + 3][j]++;
    }
  }
}

function isWinningDiagonal(probabilitiesArray) {
  for (let i = 0; i < probabilitiesArray.length - 3; i++) {
    for (let j = 0; j < probabilitiesArray[i].length - 3; j++) {
      probabilitiesArray[i][j]++;
      probabilitiesArray[i + 1][j + 1]++;
      probabilitiesArray[i + 2][j + 2]++;
      probabilitiesArray[i + 3][j + 3]++;
    }
  }
}

function isWinningAntidiagonal(probabilitiesArray) {
  for (let i = 0; i < probabilitiesArray.length - 3; i++) {
    for (let j = probabilitiesArray[i].length - 1; j > 2; j--) {
      probabilitiesArray[i][j]++;
      probabilitiesArray[i + 1][j - 1]++;
      probabilitiesArray[i + 2][j - 2]++;
      probabilitiesArray[i + 3][j - 3]++;
    }
  }
}

export function getCompletableArray(gameBoard, playerType) {
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
