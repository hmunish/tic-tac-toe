const state = {
  gamePlay: {
    player1Name: "",
    player2Name: "",
    play1: [],
    play2: [],
    game: [],
    gameStatus: null,
    playerWon: null,
  },
};

export const startGame = function (name1, name2) {
  state.gamePlay = {
    player1Name: name1,
    player2Name: name2,
    gameType: name2 === "computer" ? 1 : 2,
    play1: [],
    play2: [],
    game: [],
    gameStatus: "running",
    playerWon: null,
  };
};
