// import "core-js/stable/promise";
// import "core-js/stable/array/find"
import "core-js/stable";
import "regenerator-runtime/runtime"; // For pollyfilling async functions
import "./css/style.css";
import * as model from "./model";
import GameView from "./Views/GameView";
import AppView from "./Views/AppView";

function handleModalSubmit(e) {
  const data = [...new FormData(e.target)]; // storing form data
  AppView.toggleModal(); // removing modal
  GameView.toggleBlur.call(GameView); // removing blur effect
  model.startGame(data[0][1], data[1][1]); // setting model state for new game
}

function init() {
  AppView.addModalSubmitHandler(handleModalSubmit);
}

init();
