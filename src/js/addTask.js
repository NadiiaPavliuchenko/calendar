const refs = {
  form: document.querySelector(".modal-form"),
};
export const setDateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
  refs.form.elements.date.value = dateString;
};

export const addTask = () => {};
