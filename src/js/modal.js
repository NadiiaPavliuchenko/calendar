const refs = {
  openModal: document.querySelector(".js-add-task"),
  backdrop: document.querySelector(".js-backdrop"),
  modal: document.querySelector(".js-modal"),
  closeModal: document.querySelector(".js-close"),
};

refs.openModal.addEventListener("click", () => {
  refs.backdrop.classList.add("is-open");
});

refs.closeModal.addEventListener("click", () => {
  refs.backdrop.classList.remove("is-open");
});

window.addEventListener("click", (e) => {
  if (e.target === refs.backdrop) {
    refs.backdrop.classList.remove("is-open");
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && refs.backdrop.classList.contains("is-open")) {
    refs.backdrop.classList.remove("is-open");
  }
});
