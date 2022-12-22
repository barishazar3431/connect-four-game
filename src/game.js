import GameBoard, { tokenTypes } from './GameBoard.js';
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

const gameBoard = new GameBoard(initialBoard);

// console.log(gameBoard.isWinning(tokenTypes.X));

const playerOne = new HumanPlayer(gameBoard, tokenTypes.X);
const playerTwo = new HumanPlayer(gameBoard, tokenTypes.O);

const computerPlayerOne = new ComputerPlayer(gameBoard, tokenTypes.O, 0);
const computerPlayerTwo = new ComputerPlayer(gameBoard, tokenTypes.X, 5);

const players = [playerTwo, computerPlayerTwo];

export default function playGame() {
  while (true) {
    for (const player of players) {
      console.log(`\n\nPlayer ${player.tokenType.token} plays...`);

      console.log(player.gameBoard.toString());
      player.takeTurn();

      if (gameBoard.isWinning(player.tokenType)) {
        console.log(gameBoard.toString());
        console.log(`Player, ${player.tokenType.token} won the game...`);
        return;
      }

      if (gameBoard.isDraw()) {
        console.log('DRAWWWWW');
        return;
      }
    }
  }
}
