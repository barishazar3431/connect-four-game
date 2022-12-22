export default class Player {
  constructor(gameNode, playerType) {
    this.gameBoard = gameNode;
    this.playerType = playerType;
  }
}

export const  playerTypes = {
  maximizing: 'X',
  minimizing: 'O',
};
