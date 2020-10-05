// developed by ELijah Trillionz
// version: v1.0

// ?DOM collection
const month_h2 = document.querySelectorAll(".month > h2");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const pagin = document.querySelector("#pagin");
const calBody_ul = document.querySelector(".cal-body > ul");

// create special list > headers > S M T W T F S
function createHeaders(letters, breakLine) {
  const listSpec = document.createElement("li");
  listSpec.innerText = letters;
  listSpec.classList.add("spec");
  calBody_ul.appendChild(listSpec);
 // make a line break if at the last element only.
  if (breakLine) {
    const lineBreak = document.createElement("hr");
    calBody_ul.appendChild(lineBreak);
  }
}

// create a days of the week array and poop through
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

daysOfTheWeek.forEach((value, index) => {
		// get the last element > to add line break after it
  if (index === daysOfTheWeek.length - 1) {
    createHeaders(value.substr(0,1), true);
  } else {
    createHeaders(value.substr(0,1), false);
  }
});

// date, month and year guidelines.
const date = new Date();
let monthNo = date.getMonth();
const dateNo = date.getDate();
let year = date.getFullYear();

// get all leap years from 1970 to 2090
function getLeapYear(year) {
for (let i = 1972; i <= year; i += 4) {
  if (i === year) {
   return i;
  }
}
}

let months, currentMonth, noOfDays
function getAllMonths(year, monthIndex) {
		// get all months in the year with their number of days
months = [
  { month: "January", days: 31 },
  { month: "February", days: getLeapYear(year) !== undefined ? 29 : 28 },
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

// organise pagination
pagin.innerText = `${monthIndex + 1}/${months.length}`;

currentMonth = months[monthIndex].month
noOfDays = months[monthIndex].days;
month_h2[0].innerText = currentMonth;
month_h2[1].innerText = year;
getDayOne()
}
getAllMonths(year, monthNo);

// create li elements to display dates in form of numbers
function createListElements(number, active) {
  const list = document.createElement("li");
  list.innerText = number;
  list.classList.add("dates");
  calBody_ul.appendChild(list);
  if (active) {
    list.classList.add("active");
  }
  return list;
}

// create empty elements
function createEmptyElements() {
  const list = document.createElement("li");
  list.classList.add("invisible");
  calBody_ul.appendChild(list);
}

function getDayOne() {
		const lists = document.querySelectorAll(".dates");
		const emptyLists = document.querySelectorAll(".invisible");
		if (lists) {
				lists.forEach((list) => {
						list.remove()
				});
				emptyLists.forEach((emptyList) => {
					emptyList.remove()
				});
		}
		let lastMonthIndex;
//get the last day of the last month > to get the first day of the current displaying month
for (let i = 0; i < months.length; i++) {
  if (i === monthNo) {
  		i !== 0 ? lastMonthIndex = new Date(year, i -1, months[i - 1].days).getDay() : lastMonthIndex = new Date(year - 1, 11, months[11].days).getDay()
  	}
}

// get the position to start the numbering

// add one to the last month's index so as to begin the following month
const incrementDay = lastMonthIndex >= daysOfTheWeek.length - 1 ? 0 : lastMonthIndex + 1;

const num = daysOfTheWeek.slice(0, daysOfTheWeek.indexOf(daysOfTheWeek[incrementDay]));
console.log(incrementDay)
for (let i = 0; i < num.length; i++) {
  createEmptyElements();
}
displayDates()
}

function displayDates() {
// loop through the function to display all numbers.
for (let i = 1; i <= noOfDays; i++) {
  if (i === dateNo) {
  		// display the date as active only if we are in the current month
  		monthNo === new Date().getMonth() ? createListElements(i, true) : createListElements(i)
  } else {
    createListElements(i);
  }
}
}

// next months
function getNextMonth() {
		// increment month index by one if not at the last month
		let nextMonth;
		monthNo >= months.length - 1 ? nextMonth = months.length - 1 : nextMonth = monthNo += 1;
		getAllMonths(year, nextMonth)
}

// previous months
function getPreviousMonth() {
		// decrement the month index by one if not at the first month of the year
		let previousMonth;
		monthNo <= 0 ? previousMonth = 0 : previousMonth = monthNo -= 1
		
		getAllMonths(year, previousMonth)
}

// next button
nextBtn.addEventListener("click", getNextMonth);
// previous button
prevBtn.addEventListener("click", getPreviousMonth)

