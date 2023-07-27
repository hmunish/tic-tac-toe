class AppView {
  _parentElement = document.querySelector("body");
  _modal = document.querySelector("dialog.start-game");

  constructor() {}

  toggleModal() {
    this._modal.classList.toggle("hidden");
  }

  addModalSubmitHandler(handler) {
    this._modal.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(e);
    });
  }
}

export default new AppView();
