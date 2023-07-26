class AppView {
  _parentElement = document.querySelector("body");
  _modal = document.querySelector("dialog.start-game");

  constructor() {}

  toggleModal() {
    this._modal.classList.toggle("hidden");
  }
}

export default new AppView();
