class BoardView {
  _parentElement = document.querySelector("#game-board");

  constructor() {}

  addDrawClickHandler(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  triggerComputerClick(ind) {
    this._parentElement.querySelector(`[data-no='${ind}']`).click();
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

  draw0(ele) {
    const ctx = ele.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(150, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
  }

  drawGameBoard() {
    const markup = `
    <canvas id="b1" data-no="1"></canvas>
    <canvas id="b2" data-no="2"></canvas>
    <canvas id="b3" data-no="3"></canvas>
    <canvas id="b4" data-no="4"></canvas>
    <canvas id="b5" data-no="5"></canvas>
    <canvas id="b6" data-no="6"></canvas>
    <canvas id="b7" data-no="7"></canvas>
    <canvas id="b8" data-no="8"></canvas>
    <canvas id="b9" data-no="9"></canvas>
    `;
    this._parentElement.innerHTML = markup;
  }
}

export default new BoardView();
