import "../scss/style.scss";

const refs = {
  calendar: document.querySelector(".calendar"),
};

const TODAY = new Date();

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

// const getCurrentDate = () => {
//   return {
//     date: TODAY.getDate(),
//     day: days[TODAY.getDay()],
//     month: months[TODAY.getMonth()].month,
//     year: TODAY.getFullYear(),
//   };
// };

const createCells = () => {
  for (let i = 1; i <= months[TODAY.getMonth()].days; i += 1) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    refs.calendar.appendChild(cell);
  }
};

createCells();
