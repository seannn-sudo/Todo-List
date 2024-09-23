import "./css/styles.css";
import { DOM_ID, DOM_CLASS, TASK_PROPERTIES } from "./config.js";
import {
  addToUI,
  addAllToUI,
  updateToUI,
  setupEventDelegation,
} from "./modules/domManager.js";
import { saveToStorage } from "./modules/storageManager.js";
import {
  handleDueDate,
  handleTaskDescription,
  resetModal,
  showModal,
  hideModal,
} from "./modules/modalManager.js";

export const modalContainer = document.querySelector(DOM_CLASS.MODAL_CONTAINER);
export const taskModal = document.querySelector(DOM_ID.TASK_MODAL);
export const flatpickrInstance = handleDueDate();
handleTaskDescription();
addAllToUI();

const addTaskButtons = document.querySelectorAll(DOM_ID.ADD_TASK_BUTTON);
const cancelBtn = document.querySelector(DOM_CLASS.CANCEL_BUTTON);

document.addEventListener("DOMContentLoaded", () => {
  modalContainer.classList.remove("initially-hidden");
  setupEventDelegation();
});

addTaskButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showModal(taskModal, modalContainer);
  });
});

cancelBtn.addEventListener("click", () => {
  hideModal(taskModal, modalContainer);
  resetModal(flatpickrInstance);
});

modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    hideModal(taskModal, modalContainer);
    resetModal(flatpickrInstance);
  }
});

taskModal.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = saveToStorage(event);
  if (
    document.querySelector(`[data-index-number="${task[TASK_PROPERTIES.ID]}"]`)
  ) {
    updateToUI(task);
  } else {
    addToUI(task);
  }
  hideModal(taskModal, modalContainer);
  resetModal(flatpickrInstance);
});
