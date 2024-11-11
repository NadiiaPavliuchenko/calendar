import "../scss/style.scss";

const refs = {
  calendar: document.querySelector(".calendar"),
  buttons: document.querySelector(".button-controls"),
  curDate: document.querySelector(".js-month"),
  datepicker: document.querySelector(".js-choose-date"),
};

const TODAY = new Date();
const MONTH = TODAY.getMonth();
const YEAR = TODAY.getFullYear();

const days = [
  "Sunday",
  "Monday",
  "Tueasday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  { month: "January", days: 31 },
  { month: "February", days: isLeapYear() },
  { month: "March", days: 31 },
  { month: "April", days: 30 },
  { month: "May", days: 31 },
  { month: "June", days: 30 },
  { month: "July", days: 31 },
  { month: "August", days: 31 },
  { month: "September", days: 30 },
  { month: "October", days: 31 },
  { month: "November", days: 30 },
  { month: "December", days: 31 },
];

function isLeapYear() {
  const year = TODAY.getFullYear();
  let days = 28;
  if (year % 400 === 0) {
    days = 29;
  }
  return days;
}

const fragment = document.createDocumentFragment();

const createCells = () => {
  // const firstDay = new Date(YEAR, MONTH, 1).getDate();

  // const lastDay = new Date(YEAR, MONTH + 1, 0).getDate();

  for (let i = 1; i <= months[TODAY.getMonth()].days; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const cellDate = new Date(YEAR, MONTH, i);

    if (
      cellDate.getFullYear() === YEAR &&
      cellDate.getMonth() === MONTH &&
      cellDate.getDate() === TODAY.getDate()
    ) {
      cell.classList.add("today");
    }

    cell.innerHTML = `<div class="cell-features">
                    <p class="cell-date">${i}</p>
                    <p class=cell-month>${days[
                      new Date(YEAR, MONTH, i).getDay()
                    ].substring(0, 2)}</p>
                  </div>
                  <div class="tasks-container"></div>`;
    fragment.appendChild(cell);
  }
  refs.calendar.appendChild(fragment);
};

createCells();
