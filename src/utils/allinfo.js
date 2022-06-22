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

const days = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
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

	const month = calender.getMonth();
	const year = calender.getFullYear();

	return { month: months[month], year: year, monthNumber: month };
}

function createCalendarDates(year, month) {
	let mon = month; // months in JS are 0..11, not 1..12
	let d = new Date(year, mon);
	const dateArray = [];

	// let table =// 	"MON-TU-WE-TH<-FR<-SA-SUN";

	// spaces for the first row
	// from Monday till the first day of the month
	// * * * 1  2  3  4
	for (let i = 0; i < getDay(d); i++) {
		dateArray.push({
			date: null,
			events: [],
			month,
			year,
			day: days[d.getDay() - 1] || days[6],
			test: d.getDay(),
		});
	}

	while (d.getMonth() === mon) {
		dateArray.push({
			date: d.getDate(),
			events: [],
			month,
			year,
			day: days[d.getDay() - 1] || days[6],
			test: d.getDay(),
		});
		d.setDate(d.getDate() + 1);
	}

	// add spaces after last days of month for the last row
	// 29 30 31 * * * *
	if (getDay(d) !== 0) {
		for (let i = getDay(d); i < 7; i++) {
			dateArray.push({
				date: null,
				events: [],
				month,
				year,
				day: days[d.getDay() - 1] || days[6],
				test: d.getDay(),
			});
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

//date-storage

// "calender": {"year-month": []}
//store the date is in storage
//calender {}
function saveDateData(year, month, event) {
	const nameTemplate = `${year}-${month}`;

	const dataFromStorage =
		JSON.parse(localStorage.getItem("calender")) === null
			? {}
			: JSON.parse(localStorage.getItem("calender"));

	if (dataFromStorage[nameTemplate] === undefined) {
		const data = { [event.date]: event };
		const gg = { [nameTemplate]: { ...data } };
		localStorage.setItem(
			"calender",
			JSON.stringify({ ...dataFromStorage, ...gg })
		);
	} else {
		const data = { [event.date]: event };

		//checking if the date is not already in the month
		if (
			!Object.keys(dataFromStorage[nameTemplate]).includes(
				event.date.toString()
			)
		) {
			const newData = {
				[nameTemplate]: { ...dataFromStorage[nameTemplate], ...data },
			};

			localStorage.setItem(
				"calender",
				JSON.stringify({ ...dataFromStorage, ...newData })
			);
		} else {
			//checking if the date is  already in the month
			const newData = {
				[event.date]: {
					...dataFromStorage[nameTemplate][event.date],
					events: [
						...dataFromStorage[nameTemplate][event.date].events,
						...event.events,
					],
				},
			};

			localStorage.setItem(
				"calender",
				JSON.stringify({
					...dataFromStorage,
					[nameTemplate]: {
						...dataFromStorage[nameTemplate],
						...newData,
					},
				})
			);
		}
	}
}

//check if the date is in storage
function getDateData(year, month, eventDate) {
	const nameTemplate = `${year}-${month}`;

	const dataFromStorage =
		JSON.parse(localStorage.getItem("calender")) === null
			? {}
			: JSON.parse(localStorage.getItem("calender"));
	if (dataFromStorage[nameTemplate] === undefined) {
		return undefined;
	} else {
		return dataFromStorage[nameTemplate][eventDate];
	}
}

function editDateData(year, eventDate, eventId, month, event) {
	const nameTemplate = `${year}-${month}`;

	const dataFromStorage =
		JSON.parse(localStorage.getItem("calender")) === null
			? {}
			: JSON.parse(localStorage.getItem("calender"));

	const modifyingDate = { ...dataFromStorage[nameTemplate][eventDate] };

	const nn = [];
	for (let index = 0; index < modifyingDate.events.length; index++) {
		const ev = modifyingDate.events[index].id;
		if (ev === eventId) {
			nn.push({ ...event.events[0], id: ev });
		} else {
			nn.push(modifyingDate.events[index]);
		}
	}

	dataFromStorage[nameTemplate][eventDate].events = nn;

	localStorage.setItem(
		"calender",
		JSON.stringify({
			...dataFromStorage,
			[nameTemplate]: {
				...dataFromStorage[nameTemplate],
			},
		})
	);
}

function deleteDateData(year, eventDate, eventId, month, event) {
	const nameTemplate = `${year}-${month}`;

	const dataFromStorage =
		JSON.parse(localStorage.getItem("calender")) === null
			? {}
			: JSON.parse(localStorage.getItem("calender"));

	const modifyingDate = { ...dataFromStorage[nameTemplate][eventDate] };

	const nn = [];
	for (let index = 0; index < modifyingDate.events.length; index++) {
		const ev = modifyingDate.events[index].id;
		if (ev !== eventId) {
			nn.push(modifyingDate.events[index]);
		}
	}

	dataFromStorage[nameTemplate][eventDate].events = nn;

	localStorage.setItem(
		"calender",
		JSON.stringify({
			...dataFromStorage,
			[nameTemplate]: {
				...dataFromStorage[nameTemplate],
			},
		})
	);
}
export {
	monthsYearInfo,
	createCalendarDates,
	months,
	days,
	saveDateData,
	getDateData,
	editDateData,
	deleteDateData,
};
