import {
  loadFromStorage,
  getTaskById,
  deletefromStorage,
} from "./storageManager.js";
import { DOM_CLASS, DOM_ID, TASK_PROPERTIES } from "../config.js";
import { showModal, editModal } from "./modalManager.js";
import { flatpickrInstance, modalContainer, taskModal } from "../index.js";
import { format } from "date-fns";

function _convertDate(date) {
  //Convert ISO8601 date format to human-friendly date format
  return format(new Date(date), "H:mm MMM d, yyyy");
}

function _createElement(type, container, textContent, className) {
  const newItem = document.createElement(type);
  if (className) {
    newItem.className = className;
  }
  if (textContent) {
    newItem.textContent = textContent;
  }
  container.appendChild(newItem);
  return newItem;
}

export function addToUI(task) {
  //Convert ISO8601 date format to human-friendly date format
  task[TASK_PROPERTIES.DUE_DATE] = _convertDate(task[TASK_PROPERTIES.DUE_DATE]);
  const taskContainer = document.querySelector(DOM_ID.TASKS_CONTAINER);
  const taskCardContainer = _createElement(
    "div",
    taskContainer,
    null,
    DOM_CLASS.TASK_CARD,
  );
  const taskCardStatus = _createElement(
    "div",
    taskCardContainer,
    null,
    DOM_CLASS.TASK_CARD + "-status",
  );
  const taskCardInfo = _createElement(
    "div",
    taskCardContainer,
    null,
    DOM_CLASS.TASK_CARD + "-info",
  );
  const taskCardController = _createElement(
    "div",
    taskCardContainer,
    null,
    DOM_CLASS.TASK_CARD + "-controller",
  );

  taskCardContainer.setAttribute("data-index-number", task[TASK_PROPERTIES.ID]);
  taskCardStatus.classList.add("material-symbols-outlined");

  _createElement(
    "button",
    taskCardController,
    "Edit",
    "card-controller__edit-button",
  );
  _createElement(
    "button",
    taskCardController,
    "Delete",
    "card-controller__delete-button",
  );

  _createElement(
    "h4",
    taskCardInfo,
    task[TASK_PROPERTIES.NAME],
    "card-info__task-name",
  );
  _createElement(
    "p",
    taskCardInfo,
    "Due Date: " + task[TASK_PROPERTIES.DUE_DATE],
    "card-info__task-due-date",
  );
  _createElement(
    "p",
    taskCardInfo,
    "Priority: " + task[TASK_PROPERTIES.PRIORITY],
    "card-info__task-priority",
  );
  _createElement(
    "p",
    taskCardInfo,
    task[TASK_PROPERTIES.DESCRIPTION],
    "card-info__task-description",
  );
}

export function updateToUI(updatedTask) {
  const taskElement = document.querySelector(
    `[data-index-number="${updatedTask[TASK_PROPERTIES.ID]}"]`,
  );
  console.log(taskElement);
  if (taskElement) {
    updatedTask[TASK_PROPERTIES.DUE_DATE] = _convertDate(
      updatedTask[TASK_PROPERTIES.DUE_DATE],
    );
    taskElement.querySelector(".card-info__task-name").textContent =
      updatedTask[TASK_PROPERTIES.NAME];
    taskElement.querySelector(".card-info__task-description").textContent =
      updatedTask[TASK_PROPERTIES.DESCRIPTION];
    taskElement.querySelector(".card-info__task-due-date").textContent =
      "Due Date: " + updatedTask[TASK_PROPERTIES.DUE_DATE] || "No due date";
    taskElement.querySelector(".card-info__task-priority").textContent =
      "Priority: " + updatedTask[TASK_PROPERTIES.PRIORITY] || "No priority";
  }
}

export function deleteFromUI(ID) {
  const taskElement = document.querySelector(`[data-index-number="${ID}"]`);
  if (taskElement) {
    taskElement.remove();
  } else {
    console.log(`Task with ID ${taskId} not found in the DOM`);
  }
}

export function addAllToUI() {
  const allTask = loadFromStorage();
  allTask.forEach((task) => addToUI(task));
}

export function setupEventDelegation() {
  const tasksContainer = document.querySelector(DOM_ID.TASKS_CONTAINER);

  tasksContainer.addEventListener("click", (event) => {
    const taskCard = event.target.closest("." + DOM_CLASS.TASK_CARD);
    if (!taskCard) return;

    const ID = parseInt(taskCard.getAttribute("data-index-number"));

    if (event.target.closest(DOM_CLASS.EDIT_TASK_BUTTON)) {
      showModal(taskModal, modalContainer);
      editModal(getTaskById(ID), flatpickrInstance);
    } else if (event.target.closest(DOM_CLASS.DELETE_TASK_BUTTON)) {
      deletefromStorage(ID);
      deleteFromUI(ID);
    }
  });
}
