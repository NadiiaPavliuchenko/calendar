import { close } from "./modal";

const refs = {
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

refs.form.addEventListener("submit", (e, taskStorage) => {
  e.preventDefault();

  const newTask = {
    title: refs.form.elements.title.value,
    description: refs.form.elements.description.value,
    date: refs.form.elements.date.value,
  };

  taskStorage = getFromLocalStorage();

  taskStorage.push(newTask);

  setToLocalStorage(taskStorage);

  e.target.reset();
  close();
});
