import GameBoard from './GameBoard.js';
import config from './config.js';
import HumanPlayer from './HumanPlayer.js';

const board = new GameBoard(config.initialState);

const playerOne = new HumanPlayer(board, 'X');
const playerTwo = new HumanPlayer(board, 'O');

const players = [playerOne, playerTwo];

while (true) {
  players.forEach((player) => {
    console.log(`Player ${player.tokenType} plays...`);

    console.log(board.toString());
    player.takeTurn();
    console.log(board.toString());
  });
}
