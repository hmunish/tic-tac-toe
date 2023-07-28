// import "core-js/stable/promise";
// import "core-js/stable/array/find"
import "core-js/stable";
import "regenerator-runtime/runtime"; // For pollyfilling async functions
import "./css/style.css";
import * as model from "./model";
import GameView from "./Views/GameView";
import AppView from "./Views/AppView";
import BoardView from "./Views/BoardView";

if (module.hot) {
  module.hot.accept();
}

function handleModalSubmit(e) {
  const data = [...new FormData(e.target)]; // storing form data
  const name1 = data[0][1],
    name2 = data[1][1]; // storing players name
  AppView.toggleModal(); // removing modal
  GameView.toggleBlur(); // removing blur effect
  model.startGame(name1, name2); // setting model state for new game
  GameView.setPlayersName(name1, name2);
}

function handleBoardDraw(e) {
  if (e.target.dataset.used) return; // check if box is available to draw if not return
  e.target.setAttribute("used", true); // mark the clicked box as used

  if (model.switchTurn() === "x") {
    BoardView.drawX(e.target);
  }
}

function init() {
  AppView.addModalSubmitHandler(handleModalSubmit);
  BoardView.addDrawClickHandler(handleBoardDraw);
}

init();
