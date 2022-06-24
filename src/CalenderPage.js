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
			<h1>
				{" "}
				Calendly <img src="./images/calendar.svg" alt="" />
			</h1>

			<div className="calender-month-info">
				<button onClick={decreaseDate}>
					<img src="./images/chevron_left.svg" alt="" />
				</button>

				<div className="calender-month-info-heading">
					<span>{count && months[count.month]}</span>
					<span>{count && count.year}</span>
				</div>

				<button onClick={increaseDate}>
					<img src="./images/chevron_right.svg" alt="" />
				</button>
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
	// border: solid deeppink;
	padding: 16px;
	h1 {
		font-size: 3rem;
		text-align: center;
		margin: 8px 0 8px 0;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 40px;
		}
	}
	.calender-days {
		display: flex;
		border-bottom: 1px solid pink;
		margin-bottom: 16px;
		font-size: 1.2rem;
		// border: solid orange;
		font-weight: 700;
		span {
			flex: 1;
			text-align: center;
			padding: 16px 0;
		}
	}

	.calender-month-info {
		// border: solid;
		display: flex;
		justify-content: space-between;
		align-items: center;

		button {
			background-color: transparent;
			border: none;
			padding: 4px;
		}

		button:hover {
			background: ${({ theme }) => theme.calenderHover};
			border-radius: 4px;
			padding: 4px;
		}
		img {
			width: 40px;
		}
	}

	.calender-month-info-heading {
		font-size: 1.5rem;
		font-weight: 600;
		span {
			margin: 0 8px;
		}
	}

	@media (min-width: 1000px) {
		padding: 0;

		.calender-month-info {
			// border: solid;
			display: flex;
			justify-content: space-between;
			align-items: center;

			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
				padding: 8px;
				margin: 0 32px;
			}

			button:hover {
				background: ${({ theme }) => theme.calenderHover};
				border-radius: 4px;
				padding: 8px;
			}
			img {
				width: 30px;
			}
		}
	}
`;
const CalenderGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(6, 50px);
	gap: 8px;

	// border: solid green;
	@media (min-width: 1000px) {
		grid-template-rows: repeat(6, 60px);
		gap: 8px;
	}

	.day-grid {
		cursor: pointer;
		// border: 1px solid;
		display: grid;
		place-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		border-radius: 4px;
	}

	.day-grid:hover {
		background: ${({ theme }) => theme.calenderHover};
		color: white;
	}
`;
