class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = document.querySelector(
      settings.submitButtonSelector
    );
    this._inputList = Array.from(formEl.querySelectorAll(this._inputSelector));
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.value = "";
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}

export default FormValidator;
