import GameBoard from './GameBoard.js';
import { playerTypes } from './players/Player.js';
import HumanPlayer from './players/HumanPlayer.js';
import ComputerPlayer from './players/ComputerPlayer.js';

const initialBoard = [
  // [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const gameBoard = new GameBoard(initialBoard);
console.log(gameBoard.evaluationFunction(false));


const playerOne = new HumanPlayer(gameBoard, playerTypes.maximizing);
const playerTwo = new HumanPlayer(gameBoard, playerTypes.minimizing);

const computerPlayerOne = new ComputerPlayer(
  gameBoard,
  playerTypes.maximizing,
  8
);
const computerPlayerTwo = new ComputerPlayer(
  gameBoard,
  playerTypes.minimizing,
  7
);

const players = [computerPlayerOne, computerPlayerTwo];

export default function playGame() {
  while (true) {
    for (const player of players) {
      console.log(`\n\nPlayer ${player.playerType} plays...`);

      console.log(player.gameBoard.toString());
      player.takeTurn();
      // console.log(gameBoard.getAdjacentCounts(player.playerType))

      if (gameBoard.isWinning(player.playerType)) {
        console.log(gameBoard.toString());
        console.log(`Player, ${player.playerType} won the game...`);
        return;
      }

      if (gameBoard.isDraw()) {
        console.log('DRAWWWWW');
        return;
      }
    }
  }
}
