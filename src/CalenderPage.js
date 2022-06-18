import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DayGrid from "./DayGrid";
import { createCalendarDates, months } from "./utils/allinfo";

const CalenderPage = () => {
	const [calenderDates, setCalenderDates] = useState();
	//count - {month: 0, year: 0}
	const [count, setCount] = useState();

	useEffect(() => {
		//initial render
		const cal = new Date();
		setCount({ month: cal.getMonth(), year: cal.getFullYear() });
		setCalenderDates(() =>
			createCalendarDates(cal.getFullYear(), cal.getMonth())
		);
	}, []);

	useEffect(() => {
		//subsequentrenders
		if (count) {
			console.log("changeing");
			setCalenderDates(() =>
				createCalendarDates(count.year, count.month)
			);
		}
	}, [count]);

	function increaseDate() {
		if (count.month < 11) {
			setCount({ ...count, month: count.month + 1 });
		} else {
			setCount({ month: 0, year: count.year + 1 });
		}
	}

	function decreaseDate() {
		if (count.month > 0) {
			setCount({ ...count, month: count.month - 1 });
		} else {
			setCount({ month: 11, year: count.year - 1 });
		}
	}

	return (
		<StyledCalender>
			<h1> Calender</h1>

			<div>
				<button onClick={decreaseDate}>left</button>
				<span>{count && months[count.month]}</span>
				<span>{count && count.year}</span>

				<button onClick={increaseDate}>right</button>
			</div>
			<div className="calender-days">
				<span>Mon</span> <span>Tue</span> <span>Wed</span>{" "}
				<span>Thur</span> <span>Fri</span> <span>Sat</span>{" "}
				<span>Sun</span>{" "}
			</div>
			<CalenderGrid className="calender-grid">
				{calenderDates &&
					calenderDates.map((item, index) => (
						<DayGrid
							day={item.day}
							events={item.events}
							key={index}
						/>
					))}
			</CalenderGrid>
		</StyledCalender>
	);
};
export default CalenderPage;

const StyledCalender = styled.div`
	border: solid deeppink;
	.calender-days {
		display: flex;
		border-bottom: 1px solid pink;
		margin-bottom: 24px;
		span {
			flex: 1;
			text-align: center;
			padding: 16px 0;
		}
	}

	@media (min-width: 750px) {
		width: max-content;
	}
`;
const CalenderGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	border: solid;
	@media (min-width: 750px) {
		grid-template-columns: repeat(7, 55px);
		grid-template-rows: repeat(5, 50px);
	}

	.day-grid {
		cursor: pointer;
		border: solid;
	}

	.day-grid:hover {
		border: solid green;
	}
`;
