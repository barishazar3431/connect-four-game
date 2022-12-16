import GameState, { tokenTypes } from './GameBoard.js';
import config from './config.js';
import HumanPlayer from './HumanPlayer.js';
import ComputerPlayer from './ComputerPlayer.js';

const board = new GameState(config.initialState);


const playerOne = new HumanPlayer(board, tokenTypes.X);
const playerTwo = new HumanPlayer(board, tokenTypes.O);

const computerPlayer = new ComputerPlayer(board, tokenTypes.O);

const players = [playerOne, playerTwo];

function playGame() {
  while (true) {
    for (const player of players) {
      console.log(`\n\nPlayer ${player.tokenType} plays...`);
      console.log(board.toString());
      player.takeTurn();

      if (board.isGameOver()) {
        console.log(board.toString());
        console.log(`Player, ${player.tokenType} won the game...`);
        return;
      }
    }
  }
}

playGame();

// const childrenStates = board.getChildrenStates('X');
// childrenStates.forEach(child => console.log(child.toString()));
