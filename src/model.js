const state = {
  gamePlay: {
    player1Name: "",
    player2Name: "",
    play1: [],
    play2: [],
    game: [],
    gameType: "",
    gameStatus: null,
    playerWon: null,
    turn: "x",
  },
  scores: {
    player1: 0,
    player2: 0,
    draw: 0,
  },
};

export const getDrawScore = function () {
  return state.scores.draw;
};

export const getPlayer1Score = function () {
  return state.scores.player1;
};

export const getPlayer2Score = function () {
  return state.scores.player2;
};

export const startGame = function (
  name1 = state.gamePlay.player1Name,
  name2 = state.gamePlay.player2Name
) {
  state.gamePlay = {
    player1Name: name1,
    player2Name: name2,
    gameType: name1 === "computer" || name2 === "computer" ? 1 : 2,
    play1: [],
    play2: [],
    game: [],
    gameStatus: "running",
    playerWon: null,
    turn: "x",
  };
};

export const getPlayer1Name = function () {
  return state.gamePlay.player1Name;
};
export const getPlayer2Name = function () {
  return state.gamePlay.player2Name;
};

export const getGameType = function () {
  return state.gamePlay.gameType;
};

export const getComputerMoveIndex = function () {
  const allPossibleCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  if (state.gamePlay.player1Name === "computer") {
    for (a of allPossibleCombinations) {
      let count = 0;
      for (b of a) {
        if (state.gamePlay.play1.includes(b)) count++;
      }
      if (count === 2) {
        for (b of a) {
          if (!state.gamePlay.game.includes(b)) return b;
        }
      }
    }
    for (a of allPossibleCombinations) {
      let count = 0;
      for (b of a) {
        if (state.gamePlay.play2.includes(b)) count++;
      }
      if (count === 2) {
        for (b of a) {
          if (!state.gamePlay.game.includes(b)) return b;
        }
      }
    }
    for (a of allPossibleCombinations) {
      for (b of a) {
        if (!state.gamePlay.game.includes(b)) return b;
      }
    }
  } else if (state.gamePlay.player2Name === "computer") {
    for (a of allPossibleCombinations) {
      let count = 0;
      for (b of a) {
        if (state.gamePlay.play2.includes(b)) count++;
      }
      if (count === 2) {
        for (b of a) {
          if (!state.gamePlay.game.includes(b)) return b;
        }
      }
    }
    for (a of allPossibleCombinations) {
      let count = 0;
      for (b of a) {
        if (state.gamePlay.play1.includes(b)) count++;
      }
      if (count === 2) {
        for (b of a) {
          if (!state.gamePlay.game.includes(b)) return b;
        }
      }
    }
    for (a of allPossibleCombinations) {
      for (b of a) {
        if (!state.gamePlay.game.includes(b)) return b;
      }
    }
  }
};

export const switchPlayers = function () {
  let tmp = state.gamePlay.player1Name;
  state.gamePlay.player1Name = state.gamePlay.player2Name;
  state.gamePlay.player2Name = tmp;

  tmp = state.scores.player1;
  state.scores = {
    player1: state.scores.player2,
    player2: tmp,
    draw: state.scores.draw,
  };

  return {
    name1: state.gamePlay.player1Name,
    name2: state.gamePlay.player2Name,
  };
};

export const switchTurn = function () {
  const returnVal = state.gamePlay.turn;
  state.gamePlay.turn = state.gamePlay.turn === "x" ? "0" : "x";
  return returnVal;
};

export const getWinStatus = function () {
  return state.gamePlay.playerWon;
};

export const getGameStatus = function () {
  return state.gamePlay.gameStatus;
};

export const checkDraw = function () {
  if (state.gamePlay.playerWon === null && state.gamePlay.game.length === 9) {
    state.gamePlay.gameStatus = "draw";
    state.scores.draw += 1;
  }
};

const calculateLogic = function (arr) {
  if (arr.length < 3 && arr.length > 5) return; // return if arr.length is not in range of 3-5

  const set = [
    [],
    [
      [2, 3],
      [4, 7],
      [5, 9],
    ],
    [
      [1, 3],
      [5, 8],
    ],
    [
      [1, 2],
      [6, 9],
      [5, 7],
    ],
    [
      [1, 7],
      [5, 6],
    ],
    [
      [4, 6],
      [2, 8],
      [1, 9],
      [3, 7],
    ],
    [
      [4, 5],
      [3, 9],
    ],
    [
      [8, 9],
      [1, 4],
      [3, 5],
    ],
    [
      [7, 9],
      [2, 5],
    ],
    [
      [7, 8],
      [3, 6],
      [1, 5],
    ],
  ];

  for (i of arr) {
    // looping incoming array
    for (j of set[i]) {
      // looping set to check if required match is available
      let isMatch = false;
      for (k of j) {
        isMatch = arr.includes(k);
        if (!isMatch) break;
      }
      if (isMatch) {
        return true;
      }
    }
  }
};

export const checkWin = function () {
  if (state.gamePlay.turn === "x" && state.gamePlay.play1.length >= 3) {
    if (calculateLogic(state.gamePlay.play1)) {
      state.gamePlay.playerWon = state.gamePlay.player1Name;
      state.gamePlay.gameStatus = "won";
      state.scores.player1 += 1;
    }
  } else if (state.gamePlay.turn === "0" && state.gamePlay.play2.length >= 3) {
    if (calculateLogic(state.gamePlay.play2)) {
      state.gamePlay.playerWon = state.gamePlay.player2Name;
      state.gamePlay.gameStatus = "won";
      state.scores.player2 += 1;
    }
  }
};

export const addAction = function (i) {
  if (state.gamePlay.turn === "x") {
    state.gamePlay.play1.push(i);
  } else {
    state.gamePlay.play2.push(i);
  }
  state.gamePlay.game.push(i);
  checkWin();
  checkDraw();
};
