class GameView {
  _parentElement = document.querySelector("#game");
  _player1Element = document.querySelector("#player1");
  _player2Element = document.querySelector("#player2");
  _gameStatusElement = document.querySelector("#game-status");

  toggleBlur() {
    this._parentElement.classList.toggle("delay-blur");
    this._parentElement.classList.toggle("remove-delay-blur");
  }

  setPlayersName(name1, name2) {
    this._player1Element.textContent = name1;
    this._player2Element.textContent = name2;
  }

  setGameStatus(status) {
    this._gameStatusElement.innerHTML = status;
  }
}

export default new GameView();
