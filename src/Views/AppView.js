class AppView {
  _parentElement = document.querySelector("#app");

  renderModal() {
    const markup = `
    <dialog open="">
        <h1>Questions</h1>
    </dialog>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new AppView();
