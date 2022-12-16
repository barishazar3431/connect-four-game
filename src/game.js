import GameNode, { tokenTypes } from './GameBoard.js';
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

const computerPlayer = new ComputerPlayer(gameNode, tokenTypes.O);

const players = [playerOne, computerPlayer];

export default function playGame() {
  while (true) {
    for (const player of players) {
      console.log(`\n\nPlayer ${player.tokenType} plays...`);
      console.log(gameNode.toString());
      player.takeTurn();

      if (gameNode.isGameOver()) {
        console.log(gameNode.toString());
        console.log(`Player, ${player.tokenType} won the game...`);
        return;
      }
    }
  }
}
