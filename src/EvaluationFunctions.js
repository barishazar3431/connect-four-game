import { playerTypes } from './players/Player.js';
import {
  getCompletableSumOfPlayerType,
  getProbabilitiesArray,
  getCompletableMatrix,
} from './utils.js';

export function completableScore(gameBoard) {
  const maximizingCompletableSum = getCompletableSumOfPlayerType(
    gameBoard,
    playerTypes.maximizing
  );
  const minimizingCompletableSum = getCompletableSumOfPlayerType(
    gameBoard,
    playerTypes.minimizing
  );

  const score = maximizingCompletableSum - minimizingCompletableSum;
  return score;
}

export function centralityScore(gameBoard) {
  let probabilities = getProbabilitiesArray();

  let score = 0;
  for (let i = 0; i < gameBoard.board.length; i++) {
    for (let j = 0; j < gameBoard.board[i].length; j++) {
      const currentToken = gameBoard.board[i][j];
      if (currentToken === playerTypes.maximizing) {
        score += probabilities[i][j];
      }

      if (currentToken === playerTypes.minimizing) {
        score -= probabilities[i][j];
      }
    }
  }

  return score;
}

export function completableCentralityScore(gameBoard) {
  const maximizingCompletableArray = getCompletableMatrix(
    gameBoard,
    playerTypes.maximizing
  );
  const minimizingCompletableArray = getCompletableMatrix(
    gameBoard,
    playerTypes.minimizing
  );

  const probabilities = getProbabilitiesArray();

  let score = 0;
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length; j++) {
      score += probabilities[i][j] * maximizingCompletableArray[i][j];
      score -= probabilities[i][j] * minimizingCompletableArray[i][j];
    }
  }

  return score;
}
