const refs = {
  openModal: document.querySelector(".js-add-task"),
  backdrop: document.querySelector(".js-backdrop"),
  modal: document.querySelector(".js-modal"),
  closeModal: document.querySelector(".js-close"),
  form: document.querySelector(".modal-form"),
};

const setDateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const open = (date, mode = "add", task) => {
  refs.form.setAttribute("data-mode", mode);
  refs.form.elements.date.value = setDateValue(date);

  if (mode === "edit") {
    refs.modal.setAttribute("data-task", task.id);
    refs.form.elements.title.value = task.title;
    refs.form.elements.description.value = task.description;
  }
  refs.backdrop.classList.add("is-open");
};

export const close = () => {
  refs.backdrop.classList.remove("is-open");
};

refs.openModal.addEventListener("click", () => {
  open(new Date());
});

refs.closeModal.addEventListener("click", () => {
  close();
});

window.addEventListener("click", (e) => {
  if (e.target === refs.backdrop) {
    close();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && refs.backdrop.classList.contains("is-open")) {
    close();
  }
});
