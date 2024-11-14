const refs = {
  form: document.querySelector(".modal-form"),
};
export const setDateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dateString = `${year}-${month}-${day}T0${hours}:0${minutes}`;
  refs.form.elements.date.value = dateString;
};

export const addTask = () => {};
