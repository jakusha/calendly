import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditForm from "./EditForm";
import EventForm from "./EventForm";
import { getDateData, months } from "./utils/allinfo";

const Event = ({ setGlobalEvent, globalEvent }) => {
	const { day, month, date } = globalEvent;
	const [clicked, setClicked] = useState(false);
	const [eventDataToDisplay, setEventDataToDisplay] = useState();
	const [editFormData, seteditFormData] = useState({});
	const [editFormToggle, setEditFormToggle] = useState(false);

	function handleClick() {
		setClicked(true);
	}

	function editHandler(e, item) {
		seteditFormData(item);
		setEditFormToggle(true);
	}

	useEffect(() => {
		if (globalEvent) {
			setEventDataToDisplay(
				getDateData(
					globalEvent.year,
					months.indexOf(globalEvent.month),
					globalEvent.date
				)
			);
		}
	}, [globalEvent, editFormToggle, setGlobalEvent]);

	return (
		<StyledDiv>
			<div>{day}</div>
			<div>
				{month} {date}
			</div>

			{clicked ? (
				<EventForm
					setClicked={setClicked}
					globalEvent={globalEvent}
					setGlobalEvent={setGlobalEvent}
				/>
			) : null}

			{editFormToggle ? (
				<EditForm
					data={editFormData}
					globalEvent={globalEvent}
					setEditFormToggle={setEditFormToggle}
				/>
			) : null}

			<button onClick={handleClick}>Add Event</button>

			<div>
				{" "}
				data to display
				<div>
					{eventDataToDisplay === undefined
						? "no events"
						: eventDataToDisplay.events &&
						  eventDataToDisplay.events.map((item) => (
								<div
									onClick={(e) => editHandler(e, item)}
									key={item.id}
								>
									<h2>{item.title}</h2>
								</div>
						  ))}
					{eventDataToDisplay && eventDataToDisplay.events.length < 1
						? "no events"
						: null}
				</div>
			</div>
		</StyledDiv>
	);
};

export default Event;

const StyledDiv = styled.div`
	border: solid green;
	position: relative;
`;
