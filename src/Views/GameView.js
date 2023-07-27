class GameView {
  _parentElement = document.querySelector("#game");

  toggleBlur() {
    this._parentElement.classList.toggle("delay-blur");
    this._parentElement.classList.toggle("remove-delay-blur");
  }
}

export default new GameView();
