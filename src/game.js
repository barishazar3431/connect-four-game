import GameNode, { tokenTypes } from './GameNode.js';
import HumanPlayer from './players/HumanPlayer.js';
import ComputerPlayer from './players/ComputerPlayer.js';

const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const gameNode = new GameNode(initialBoard);

const playerOne = new HumanPlayer(gameNode, tokenTypes.X);
const playerTwo = new HumanPlayer(gameNode, tokenTypes.O);

const computerPlayerOne = new ComputerPlayer(gameNode, tokenTypes.O, 1);
const computerPlayerTwo = new ComputerPlayer(gameNode, tokenTypes.X, 2);

const players = [computerPlayerTwo, computerPlayerOne];

export default function playGame() {
  while (true) {
    for (const player of players) {
      console.log(`\n\nPlayer ${player.tokenType.token} plays...`);

      console.log(player.gameNode.toString());
      // console.log(
      //   gameNode.maxAdjacentHorizontalTokenCount(player.tokenType),
      //   player.tokenType.token
      // );
      // console.log(
      //   gameNode.maxAdjacentVerticalTokenCount(player.tokenType),
      //   player.tokenType.token
      // );
      // console.log(
      //   gameNode.maxAdjacentDiagonalTokenCount(player.tokenType),
      //   player.tokenType.token
      // );
      // console.log(
      //   gameNode.maxAdjacentAntiDiagonalTokenCount(player.tokenType),
      //   player.tokenType.token
      // );
      player.takeTurn();

      if (gameNode.isWinning(player.tokenType)) {
        console.log(gameNode.toString());
        console.log(`Player, ${player.tokenType.token} won the game...`);
        return;
      }

      if (gameNode.isDraw()) {
        console.log('DRAWWWWW');
        return;
      }
    }
  }
}
