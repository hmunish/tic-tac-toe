import "core-js/stable"; // For pollyfilling js features
import "regenerator-runtime/runtime"; // For pollyfilling async functions
import "./css/style.css";
import * as model from "./model";
import GameView from "./Views/GameView";
import AppView from "./Views/AppView";
import BoardView from "./Views/BoardView";

function handleModalSubmit(e) {
  const data = [...new FormData(e.target)]; // storing form data
  const name1 = data[0][1],
    name2 = data[1][1] || data[2][1]; // storing players name
  AppView.toggleModal(); // removing modal
  GameView.toggleBlur(); // removing blur effect
  model.startGame(name1, name2); // setting model state for new game
  if (model.getGameType() === 1 && model.getPlayer1Name() === "computer")
    BoardView.triggerComputerClick(model.getComputerMoveIndex());
  GameView.setPlayersName(
    `${name1}: ${model.getPlayer1Score()}`,
    `${name2}: ${model.getPlayer2Score()}`
  );
}

function handleBoardDraw(e) {
  if (model.getGameStatus() !== "running" || model.getWinStatus() !== null)
    return; // check if game is started
  if (e.target.dataset.used) return; // check if box is available to draw if not return

  const boxNo = Number(e.target.dataset.no);
  model.addAction(boxNo);

  // draw x if turn is x else 0
  if (model.switchTurn() === "x") {
    BoardView.drawX(e.target); // drawing X on the clicked element
    GameView.setGameStatus("TURN 0 &rarr;"); // updating the view to show the game status

    // Checking if the next turn is of computer
    // If true Displaying spinner immediately & triggering a click for computer's move after timer of 1 seconds
    if (
      model.getPlayer2Name() === "computer" &&
      model.getWinStatus() === null
    ) {
      AppView.toggleSpinner();
      GameView.setGameStatus("Computer is thinking");
      setTimeout(() => {
        AppView.toggleSpinner();
        BoardView.triggerComputerClick(model.getComputerMoveIndex());
      }, 1000);
    }
  } else {
    BoardView.draw0(e.target); // drawing 0 on the clicked element
    GameView.setGameStatus("&larr; TURN X"); // updating the view to show the game status

    // Checking if the next turn is of computer
    // If true Displaying spinner immediately & triggering a click for computer's move after timer of 1 seconds
    if (
      model.getPlayer1Name() === "computer" &&
      model.getWinStatus() === null
    ) {
      AppView.toggleSpinner();
      GameView.setGameStatus("Computer is thinking");
      setTimeout(() => {
        BoardView.triggerComputerClick(model.getComputerMoveIndex());
        AppView.toggleSpinner();
      }, 1000);
    }
  }

  e.target.setAttribute("data-used", true); // mark the clicked box as used

  // Checking if win status is not null or game status is draw
  // If true displaying try again modal to start a new game

  if (model.getWinStatus()) {
    GameView.setGameStatus(`${model.getWinStatus()} won`);
    GameView.toggleBlur();
    AppView.toggleTryAgainModal(`${model.getWinStatus()} won, Try again`);
  }
  if (model.getGameStatus() === "draw") {
    GameView.setGameStatus("Game Draw");
    GameView.toggleBlur();
    AppView.toggleTryAgainModal("Game Draw, Try again");
  }
}

// Function to handle click of try again button
function tryAgainHandler() {
  model.startGame();
  const newNames = model.switchPlayers();
  GameView.setPlayersName(
    `${newNames.name1}: ${model.getPlayer1Score()}`,
    `${newNames.name2}: ${model.getPlayer2Score()}`
  );
  BoardView.drawGameBoard();
  GameView.toggleBlur();
  AppView.toggleTryAgainModal("");
  GameView.setGameStatus("&larr; Turn X");
  if (model.getGameType() === 1 && model.getPlayer1Name() === "computer") {
    BoardView.triggerComputerClick(model.getComputerMoveIndex());
  }
}

// Function to handle game type form select change event
function handleGameTypeSelectChange(e) {
  if (e.target.value === "player2") {
    this._player2FormInput.classList.remove("hidden");
    this._player2FormInput.setAttribute("required", "");
  } else {
    this._player2FormInput.classList.add("hidden");
    this._player2FormInput.removeAttribute("required");
  }
}

// Function to publish event handlers to the subcribers (components)
function init() {
  AppView.addModalSubmitHandler(handleModalSubmit);
  AppView.addGameTypeSelectChangeHandler(
    handleGameTypeSelectChange.bind(AppView)
  );
  BoardView.addDrawClickHandler(handleBoardDraw);
  AppView.addTryAgainClickHandler(tryAgainHandler);
}

// Calling init function to initiate the controller
init();
