class BoardView {
  _parentElement = document.querySelector("#game-board");

  constructor() {}

  addDrawClickHandler(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  drawX(ele) {
    const ctx = ele.getContext("2d");
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 5;

    ctx.moveTo(50, 25);
    ctx.lineTo(250, 125);

    ctx.moveTo(250, 25);
    ctx.lineTo(50, 125);

    ctx.stroke();
  }
}

export default new BoardView();
