import { close } from "./modal";
import { addToCalendar, repaintTask } from "./calendar";

const refs = {
  modal: document.querySelector(".js-modal"),
  form: document.querySelector(".modal-form"),
  submitBtn: document.querySelector(".submit"),
};

const getFromLocalStorage = () => {
  let taskStorage = localStorage.getItem("Tasks");
  return taskStorage ? JSON.parse(taskStorage) : [];
};

const setToLocalStorage = (tasks) => {
  localStorage.setItem("Tasks", JSON.stringify(tasks));
};

refs.form.querySelectorAll("input[required]").forEach((input) => {
  input.addEventListener("change", () => {
    if (refs.form.checkValidity()) {
      refs.submitBtn.removeAttribute("disabled");
    }
  });
});

const addTask = (task) => {
  const taskStorage = getFromLocalStorage();
  taskStorage.push(task);
  setToLocalStorage(taskStorage);
  addToCalendar(task);
};

const editTask = (taskId, task) => {
  const taskStorage = getFromLocalStorage();
  const index = taskStorage.findIndex((task) => String(task.id) === taskId);
  if (index !== -1) {
    taskStorage[index] = { id: taskId, ...task };
    setToLocalStorage(taskStorage);
    console.log(taskId);
    repaintTask(taskStorage[index]);
  }
};

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const mode = refs.form.getAttribute("data-mode");

  const newTask = {
    title: refs.form.elements.title.value,
    description: refs.form.elements.description.value,
    date: refs.form.elements.date.value,
  };

  if (mode === "add") {
    addTask({ ...newTask, id: Date.now() });
  }
  if (mode === "edit") {
    const id = refs.modal.getAttribute("data-task");

    editTask(id, newTask);
  }

  e.target.reset();
  close();
});
