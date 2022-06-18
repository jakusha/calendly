import React, { useState } from "react";
import styled from "styled-components";
// import EventForm from "./EventForm";

const DayGrid = ({ day, events }) => {
	// const [showForm, setShowForm] = useState(false);
	const [clicked, setClicked] = useState(false);

	function handleClick(num) {
		// setShowForm(!showForm);
		setClicked(!clicked);
		console.log(num);
	}

	return (
		<div
			className={day ? "day-grid" : null}
			onClick={() => handleClick(day)}
			style={{ background: clicked ? "green" : null }}
		>
			{day}
			{/* {showForm ? <EventForm /> : null} */}
		</div>
	);
};

export default DayGrid;

const StyledDay = styled.div`
	position: relative;
`;
