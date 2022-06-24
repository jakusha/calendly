import React from "react";
import styled from "styled-components";
import { months } from "./utils/allinfo";

const DayGrid = ({ currentitem, globalEvent, setGlobalEvent }) => {
	const { date, events } = currentitem;

	function handleClick() {
		setGlobalEvent({
			day: currentitem.day, //means day of the week
			date: currentitem.date, //means date
			month: months[currentitem.month],
			events: [...events],
			year: currentitem.year,
		});
	}

	return (
		<StyledDay
			className={date ? "day-grid" : null}
			onClick={currentitem.date && handleClick}
			style={{
				background:
					globalEvent.date === date &&
					globalEvent.year === currentitem.year &&
					globalEvent.month === months[currentitem.month]
						? "#046e8f"
						: null,
				color:
					globalEvent.date === date &&
					globalEvent.year === currentitem.year &&
					globalEvent.month === months[currentitem.month]
						? "#fff"
						: null,
			}}
		>
			{date}
			{currentitem.events.length >= 1 ? (
				<div className="active"></div>
			) : null}
		</StyledDay>
	);
};

export default DayGrid;

const StyledDay = styled.div`
	position: relative;
	padding: 4px 0;
	.active {
		width: 8px;
		border-radius: 50%;
		height: 8px;
		position: absolute;
		bottom: 4px;
		background-color: #990100;
		left: 16px;
	}

	@media (min-width: 400px) {
		.active {
			left: 45%;
		}
	}
	@media (min-width: 1000px) {
		.active {
			bottom: 4px;
			left: 36px;
		}
	}
`;
