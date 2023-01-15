import { playerTypes } from './players/Player.js';
import {
  getCompletableSumOfPlayerType,
  getProbabilitiesArray,
  getCompletableMatrix,
} from './utils.js';

/**Returns the completable score of the given gameBoard.
 * A piece is completable, if you can form a 4 connected pieces
 * that passes within that piece. The maximum score you can get from
 * an individual piece is 4 (completable for all directions), and the less is
 * 0 meaning that it is surrounded by enemy pieces and can't be a part of a solution
 */
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

/**Returns the centrality score of the given GameBoard. We use the getProbabilities array
 * function to generate the 2d probabilities array for the gameboard by traversing
 * through it in four directions. After that, we increment the score for each maximizing piece
 * and decrement for each minimizing piece by looking at the probabilities of their indices.
 */
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

/**This is the combination of the completable score and
 * centrality score.
 */
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
