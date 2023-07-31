class AppView {
  _parentElement = document.querySelector("body");
  _modal = document.querySelector("dialog.start-game");
  _player2FormInput = document.querySelector("#player-2-name");
  _gameTypeSelect = document.querySelector("#select-game-type");
  _tryAgain = document.querySelector(".try-again-game");
  _tryAgainIcon = document.querySelector("#try-again-icon");
  _tryAgainMessage = document.querySelector(".try-again-game > h3");
  _spinner = document.querySelector("#spinner-wrapper");

  toggleModal() {
    this._modal.classList.toggle("hidden");
  }

  toggleTryAgainModal(msg) {
    this._tryAgain.classList.toggle("hidden");
    this.setTryAgainMessage(msg);
  }

  setTryAgainMessage(msg) {
    this._tryAgainMessage.textContent = msg;
  }

  addModalSubmitHandler(handler) {
    this._modal.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(e);
    });
  }

  addGameTypeSelectChangeHandler(handler) {
    this._gameTypeSelect.addEventListener("change", (e) => {
      handler(e);
    });
  }

  addTryAgainClickHandler(handler) {
    this._tryAgainIcon.addEventListener("click", handler);
  }

  toggleSpinner() {
    this._spinner.classList.toggle("hidden");
  }
}

export default new AppView();
