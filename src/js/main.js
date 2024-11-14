import "../scss/style.scss";

const refs = {
  calendar: document.querySelector(".calendar"),
  buttons: document.querySelectorAll(".js-prevnext"),
  curDate: document.querySelector(".js-month"),
  datepicker: document.querySelector(".js-choose-date"),
};

const CURRENTDATE = new Date();

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

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
  const year = today.getFullYear();
  let days = 28;
  if (year % 400 === 0) {
    days = 29;
  }
  return days;
}

const fragment = document.createDocumentFragment();

const markToday = (cell, cellDate, curDay) => {
  if (
    cellDate.getFullYear() === curDay.getFullYear() &&
    cellDate.getMonth() === curDay.getMonth() &&
    cellDate.getDate() === curDay.getDate()
  ) {
    cell.classList.add("today");
  }
};

const drawCalendar = (curDay = CURRENTDATE) => {
  refs.calendar.innerHTML = "";

  const curMonth = months[today.getMonth()];
  refs.curDate.innerText = `${curMonth.month} ${year}`;

  const fragment = document.createDocumentFragment();

  const createCell = (day, isCurrentMonth) => {
    const cell = document.createElement("li");
    cell.classList.add("cell");
    if (!isCurrentMonth) cell.classList.add("disabled");

    let cellDate;
    !isCurrentMonth
      ? (cellDate = new Date(year, month - 1, day))
      : (cellDate = new Date(year, month, day));
    markToday(cell, cellDate, curDay);

    cell.innerHTML = `<div class="cell-features">
                        <p class="cell-date">${day}</p>
                        <p class="cell-month">${days[
                          cellDate.getDay()
                        ].substring(0, 2)}</p>
                      </div>
                      <div class="tasks-container"></div>`;
    return cell;
  };

  const lastDate = new Date(year, month, 0).getDate();
  const lastDay = new Date(year, month, 0).getDay();

  for (let i = lastDate - lastDay; i <= lastDate; i++) {
    fragment.appendChild(createCell(i, false));
  }

  for (let i = 1; i <= curMonth.days; i++) {
    fragment.appendChild(createCell(i, true));
  }

  refs.calendar.appendChild(fragment);
};

drawCalendar();

refs.buttons.forEach((button) =>
  button.addEventListener("click", () => {
    month = button.classList.contains("prev") ? month - 1 : month + 1;

    today = new Date(year, month, 1);

    year = today.getFullYear();
    month = today.getMonth();

    drawCalendar();
  })
);

refs.datepicker.addEventListener("change", (e) => {
  today = new Date(e.target.value);

  year = today.getFullYear();
  month = today.getMonth();

  drawCalendar(today);
});