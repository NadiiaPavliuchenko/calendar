import { open } from "./modal";

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

const compareDates = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const markToday = (cell, cellDate, curDay) => {
  if (compareDates(cellDate, curDay)) {
    cell.classList.add("today");
  }
};

const fragment = document.createDocumentFragment();

const drawCalendar = (curDay = CURRENTDATE) => {
  refs.calendar.innerHTML = "";

  const curMonth = months[today.getMonth()];
  refs.curDate.innerText = `${curMonth.month} ${year}`;

  const createCell = (day, isCurrentMonth) => {
    const cell = document.createElement("li");
    cell.classList.add("cell");
    if (!isCurrentMonth) cell.classList.add("disabled");

    let cellDate;
    !isCurrentMonth
      ? (cellDate = new Date(year, month - 1, day))
      : (cellDate = new Date(year, month, day));
    markToday(cell, cellDate, curDay);

    cell.setAttribute("data-date", cellDate.toISOString());

    cell.innerHTML = `<div class="cell-features">
                        <p class="cell-date">${day}</p>
                        <p class="cell-month">${days[
                          cellDate.getDay()
                        ].substring(0, 2)}</p>
                      </div>
                      <ul class="tasks-container"></ul>`;
    cell.addEventListener("click", openForm);
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

export const addToCalendar = (task) => {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    const cellDate = container.closest(".cell").getAttribute("data-date");

    if (compareDates(new Date(cellDate), new Date(task.date))) {
      const taskElement = document.createElement("li");
      taskElement.classList.add("task-element");
      taskElement.setAttribute("key", task.id);
      taskElement.innerHTML = `<p class="task-title">${task.title}</p>
                               <p class="task-description">${task.description}</p>`;
      taskElement.addEventListener("click", openEditForm);
      container.appendChild(taskElement);
    }
  });
};

export const repaintTask = (task) => {
  document.querySelectorAll(".task-element").forEach((taskElement) => {
    const key = taskElement.getAttribute("key");

    if (!task.title || !task.description) {
      if (key === task.id) {
        taskElement.remove();
      }
    }

    if (key === task.id) {
      taskElement.querySelector(".task-title").innerHTML = task.title;
      taskElement.querySelector(".task-description").innerHTML =
        task.description;
    }
  });
};

export const eraseTask = (task) => {
  document.querySelectorAll(".task-element").forEach((taskElement) => {
    const key = taskElement.getAttribute("key");

    if (key === task.id) {
      taskElement.remove();
    }
  });
};

const visualizeTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("Tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      addToCalendar(task);
    });
  }
};

visualizeTasks();

refs.buttons.forEach((button) =>
  button.addEventListener("click", () => {
    month = button.classList.contains("prev") ? month - 1 : month + 1;

    today = new Date(year, month, 1);

    year = today.getFullYear();
    month = today.getMonth();

    drawCalendar();
    visualizeTasks();
  })
);

refs.datepicker.addEventListener("change", (e) => {
  today = new Date(e.target.value);

  year = today.getFullYear();
  month = today.getMonth();

  drawCalendar(today);
  visualizeTasks();
});

function openForm(e) {
  const cellDate = e.target.getAttribute("data-date");
  open(new Date(cellDate));
}

function openEditForm(e) {
  const task = e.target.closest(".task-element");

  if (task) {
    e.stopPropagation();
    const cellDate = task.closest(".cell").getAttribute("data-date");
    const taskData = {
      id: task.getAttribute("key"),
      title: task.querySelector(".task-title").textContent,
      description: task.querySelector(".task-description").textContent,
    };
    open(new Date(cellDate), "edit", taskData);
  }
}
