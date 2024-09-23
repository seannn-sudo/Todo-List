import { TASK_PROPERTIES } from "../config.js";

function _getNextId() {
  const database = loadFromStorage();
  if (database.length === 0) return 1;
  return Math.max(...database.map((task) => task[TASK_PROPERTIES.ID])) + 1;
}

function _processTaskData(event) {
  const form = event.target.elements;
  console.log(form);
  const taskID = parseInt(form["taskId"].value) || _getNextId();
  return {
    [TASK_PROPERTIES.ID]: taskID,
    [TASK_PROPERTIES.NAME]: form["task-name"].value,
    [TASK_PROPERTIES.DESCRIPTION]: form["task-description"].value,
    [TASK_PROPERTIES.DUE_DATE]: form["due-date"].value,
    [TASK_PROPERTIES.PRIORITY]: form["task-priority"].value,
    createdAt: new Date().toISOString(),
    completed: false,
  };
}

function _setItemToStorage(storage, item) {
  localStorage.setItem(storage, JSON.stringify(item));
}

export const loadFromStorage = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export function saveToStorage(event) {
  const task = _processTaskData(event);
  const database = loadFromStorage();
  const index = database.findIndex(
    (item) => item[TASK_PROPERTIES.ID] === task[TASK_PROPERTIES.ID],
  );

  if (index !== -1) {
    database[index] = { ...database[index], ...task };
  } else {
    database.push(task);
  }

  _setItemToStorage("tasks", database);
  return task;
}

export function deletefromStorage(ID) {
  const database = loadFromStorage();
  const index = database.findIndex((item) => item[TASK_PROPERTIES.ID] === ID);
  if (index !== -1) {
    database.splice(index, 1);
    _setItemToStorage("tasks", database);
  } else {
    console.log(`Task with ID ${ID} not found in the database`);
  }
}

export function getTaskById(ID) {
  const tasks = loadFromStorage();
  return tasks.find((task) => task[TASK_PROPERTIES.ID] === ID);
}
