import flatpickr from "flatpickr";
import {
  DOM_ID,
  DOM_CLASS,
  FLATPICKR_CONFIG,
  TASK_PROPERTIES,
} from "../config.js";

export const resetModal = (flatpickrInstance) => {
  const form = document.querySelector(DOM_ID.TASK_MODAL);
  form.reset();
  if (flatpickrInstance) {
    flatpickrInstance.clear();
  }
  document.getElementById("taskId").value = "";
};

export const showModal = (modal, modalContainer) => {
  console.log(modal);
  modalContainer.classList.add("show");
  // Delay the modal content animation slightly
  setTimeout(() => {
    modal.style.transform = "scale(1)";
    modal.style.opacity = "1";
  }, 10);
};

export const hideModal = (modal, modalContainer) => {
  modal.style.transform = "scale(0.7)";
  modal.style.opacity = "0";
  setTimeout(() => {
    modalContainer.classList.remove("show");
  }, 300); // Match this delay with your transition duration
};

export const handleDueDate = () => {
  const calendarInput = document.querySelector(DOM_CLASS.DUE_DATE_BUTTON);
  const flatpickrInstance = flatpickr(calendarInput, {
    ...FLATPICKR_CONFIG,
    onReady: function (dateObj, dateStr, instance) {
      instance.calendarContainer.classList.add("centered-calendar");
    },
  });
  return flatpickrInstance;
};

export const handleTaskDescription = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const textArea = document.querySelector(DOM_ID.TASK_DESCRIPTION);

    function autoExpand() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    textArea.addEventListener("input", autoExpand);

    // Call initially in case there's pre-filled content
    autoExpand.call(textArea);
  });
};

export const editModal = (existingTask, flatpickrInstance) => {
  document.getElementById("taskId").value =
    existingTask[TASK_PROPERTIES.ID] || "";
  console.log(existingTask[TASK_PROPERTIES.ID]);
  console.log(document.getElementById("taskId"));
  document.getElementById("task-name").value =
    existingTask[TASK_PROPERTIES.NAME] || "";
  document.getElementById("task-description").value =
    existingTask[TASK_PROPERTIES.DESCRIPTION] || "";
  document.getElementById("task-priority").value =
    existingTask[TASK_PROPERTIES.PRIORITY] || "";
  if (flatpickrInstance && existingTask[TASK_PROPERTIES.DUE_DATE]) {
    flatpickrInstance.setDate(existingTask[TASK_PROPERTIES.DUE_DATE]);
  }
};
