import { setDateValue } from "./addTask";

const refs = {
  openModal: document.querySelector(".js-add-task"),
  backdrop: document.querySelector(".js-backdrop"),
  modal: document.querySelector(".js-modal"),
  closeModal: document.querySelector(".js-close"),
};

export const open = (date = new Date()) => {
  setDateValue(date);
  refs.backdrop.classList.add("is-open");
};

const close = () => {
  refs.backdrop.classList.remove("is-open");
};
refs.openModal.addEventListener("click", () => {
  open();
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
