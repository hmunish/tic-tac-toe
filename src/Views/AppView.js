class AppView {
  _parentElement = document.querySelector("body");
  _modal = document.querySelector("dialog.start-game");
  _tryAgain = document.querySelector(".try-again-game");
  _tryAgainIcon = document.querySelector("#try-again-icon");
  _tryAgainMessage = document.querySelector(".try-again-game > h3");

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

  addTryAgainClickHandler(handler) {
    this._tryAgainIcon.addEventListener("click", handler);
  }
}

export default new AppView();
