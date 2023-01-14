import { playerTypes } from './players/Player.js';
import { getCompletableArray, getProbabilitiesArray } from './utils.js';

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
  let weights = getProbabilitiesArray();

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

export function completableCentralityScore(gameBoard) {
  const weights = [0.2, 0.8];

  const combinedScore =
    centralityScore(gameBoard) * weights[0] +
    completableScore(gameBoard) * weights[1];

  return combinedScore;
}
