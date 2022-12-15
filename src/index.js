import GameState from "./GameState.js";
import config from './config.js';

const board = new GameState(config.initialState);


board.addToken(1, 'X');
console.log(board.toString());

board.addToken(2, 'O');
console.log(board.toString());

board.addToken(8, 'O');
console.log(board.toString());