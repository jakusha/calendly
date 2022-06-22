import CalenderPage from "./CalenderPage";
import Event from "./Event";
import styled from "styled-components";
import { createCalendarDates, months, days } from "./utils/allinfo";

import React, { useState, useEffect } from "react";
function App() {
	const [calenderDates, setCalenderDates] = useState();
	//count - {month: 0, year: 0}
	const [globalEvent, setGlobalEvent] = useState();
	const [count, setCount] = useState();
	useEffect(() => {
		//initial render
		const cal = new Date();

		setCount({ month: cal.getMonth(), year: cal.getFullYear() });
		setCalenderDates(() =>
			createCalendarDates(cal.getFullYear(), cal.getMonth())
		);
		setGlobalEvent({
			day: days[cal.getDay() - 1],
			date: cal.getDate(),
			month: months[cal.getMonth()],
			events: [],
			year: cal.getFullYear(),
		});
	}, []);

	useEffect(() => {
		//subsequentrenders
		if (count) {
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
		<StyledDiv>
			<CalenderPage
				count={count}
				increaseDate={increaseDate}
				decreaseDate={decreaseDate}
				calenderDates={calenderDates}
				months={months}
				globalEvent={globalEvent}
				setGlobalEvent={setGlobalEvent}
			/>
			{globalEvent && (
				<Event
					globalEvent={globalEvent}
					setGlobalEvent={setGlobalEvent}
				/>
			)}
		</StyledDiv>
	);
}

export default App;

const StyledDiv = styled.div`
	display: grid;

	@media (min-width: 750px) {
		grid-template-columns: 1fr 1fr;
		border: solid;
	}
`;
