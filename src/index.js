import GameBoard from './GameBoard.js';
import config from './config.js';
import HumanPlayer from './HumanPlayer.js';
import ComputerPlayer from './ComputerPlayer.js';

const board = new GameBoard(config.initialState);

const playerOne = new HumanPlayer(board, 'X');
// const playerTwo = new HumanPlayer(board, 'O');

const computerPlayer = new ComputerPlayer(board, 'O');

const players = [playerOne, computerPlayer];

function playGame() {
  while (true) {
    for (const player of players) {
      console.log(`Player ${player.tokenType} plays...`);
      console.log(board.toString());
      player.takeTurn();
      console.log(board.toString());

      if (board.isGameOver()) {
        console.log(`Player, ${player.tokenType} won the game...`);
        return;
      }
    }
  }
}

playGame();
