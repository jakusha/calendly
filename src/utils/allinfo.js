// const calender = new Date();

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function monthsYearInfo(calender) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	// const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
	const month = calender.getMonth();
	const year = calender.getFullYear();
	// const date = calender.getDate();
	// const day = calender.getDay();
	// console.log(months[month], year, date, days[day - 1]);
	return { month: months[month], year: year, monthNumber: month };
}

function createCalendarDates(year, month) {
	let mon = month; // months in JS are 0..11, not 1..12
	let d = new Date(year, mon);
	const dateArray = [];

	// let table =
	// 	"<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>";

	// spaces for the first row
	// from Monday till the first day of the month
	// * * * 1  2  3  4
	for (let i = 0; i < getDay(d); i++) {
		dateArray.push({ day: null, events: [] });
	}

	while (d.getMonth() === mon) {
		dateArray.push({ day: d.getDate(), events: [] });
		d.setDate(d.getDate() + 1);
	}

	// add spaces after last days of month for the last row
	// 29 30 31 * * * *
	if (getDay(d) !== 0) {
		for (let i = getDay(d); i < 7; i++) {
			dateArray.push({ day: null, events: [] });
		}
	}
	return dateArray;
}

function getDay(date) {
	// get day number from 0 (monday) to 6 (sunday)
	let day = date.getDay();
	if (day === 0) day = 7; // make Sunday (0) the last day
	return day - 1;
}

// console.log(createCalendar(2022, 6));

export { monthsYearInfo, createCalendarDates, months };
