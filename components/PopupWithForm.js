import Popup from "./Popup.js";
class PoppupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
  }

  setEventListeners(){
    super.setEventListeners();
    addTodoForm.addEventListener("submit", (evt) => {}
  }
}

export default PoppupWithForm;
