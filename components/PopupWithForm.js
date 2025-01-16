import Popup from "./Popup.js";
class PoppupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
  }
}

export default PoppupWithForm;
