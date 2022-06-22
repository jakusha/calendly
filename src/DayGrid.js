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
						? "green"
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

	.active {
		width: 8px;
		border-radius: 50%;
		height: 8px;
		position: absolute;
		bottom: 5px;
		background-color: red;
		left: 45%;
	}
`;
