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

const computerPlayerOne = new ComputerPlayer(gameNode, tokenTypes.O);
const computerPlayerTwo = new ComputerPlayer(gameNode, tokenTypes.X);

const players = [computerPlayerOne, computerPlayerTwo];

export default function playGame() {
  while (true) {
    for (const player of players) {
      console.log(`\n\nPlayer ${player.tokenType} plays...`);
      
      console.log(player.gameNode.toString());
      player.takeTurn();

      if (player.isWinning(player.tokenType)) {
        console.log(gameNode.toString());
        console.log(`Player, ${player.tokenType} won the game...`);
        return;
      }
    }
  }
}
