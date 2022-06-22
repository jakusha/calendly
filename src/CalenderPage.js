import React from "react";
import styled from "styled-components";
import DayGrid from "./DayGrid";
import { v4 as uuidv4 } from "uuid";
import { getDateData } from "./utils/allinfo";

const CalenderPage = ({
	count,
	increaseDate,
	decreaseDate,
	calenderDates,
	months,
	globalEvent,
	setGlobalEvent,
}) => {
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
					calenderDates.map((item) => {
						const dataFromDb = getDateData(
							count.year,
							count.month,
							item.date
						);

						return dataFromDb === undefined ? (
							<DayGrid
								currentitem={item}
								key={uuidv4()}
								globalEvent={globalEvent}
								setGlobalEvent={setGlobalEvent}
							/>
						) : (
							<DayGrid
								currentitem={{
									...dataFromDb,
									month: count.month,
								}} //had to do this getDateData returns month in words instead of numbers
								key={uuidv4()}
								globalEvent={globalEvent}
								setGlobalEvent={setGlobalEvent}
							/>
						);
					})}
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
