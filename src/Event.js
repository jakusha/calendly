import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditForm from "./EditForm";
import EventForm from "./EventForm";
import EventModal from "./EventModal";

import { getDateData, months, converTimeToAMPm } from "./utils/allinfo";

const Event = ({ setGlobalEvent, globalEvent, theme }) => {
	const { day, month, date } = globalEvent;
	const [clicked, setClicked] = useState(false);
	const [eventDataToDisplay, setEventDataToDisplay] = useState();
	const [editFormData, seteditFormData] = useState({});
	const [editFormToggle, setEditFormToggle] = useState(false);
	const [eventModalToggle, setEventModalToggle] = useState({
		status: false,
	});
	function handleClick() {
		setClicked(true);
	}

	function editHandler(e, item) {
		seteditFormData(item);
		setEditFormToggle(true);
		setEventModalToggle(false);
	}

	function modalHandler(e, item) {
		setEventModalToggle({
			status: true,
			item: { ...item },
		});
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
	}, [globalEvent, editFormToggle, setGlobalEvent, eventModalToggle]);

	return (
		<StyledDiv>
			<div className="event-day">
				<h2>{day}</h2>
				<h3>
					{month} {date}
				</h3>

				<button onClick={handleClick} className="add-event">
					Add Event <img src="./images/add.svg" alt="" />
				</button>
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

			{eventModalToggle.status ? (
				<EventModal
					data={editFormData} //using it to get the data needs refactor
					item={eventModalToggle.item}
					editHandler={editHandler}
					setEventModalToggle={setEventModalToggle}
					globalEvent={globalEvent}
				/>
			) : null}

			<div className="event-data">
				{" "}
				<div>
					{eventDataToDisplay === undefined ? (
						<div className="no-event">
							{" "}
							{theme === "light" ? (
								<img src="./images/calendar.svg" alt="" />
							) : (
								<img src="./images/calendar-light.svg" alt="" />
							)}
							No Events ;)
						</div>
					) : (
						eventDataToDisplay.events &&
						eventDataToDisplay.events.map((item) => (
							<div
								onClick={(e) => modalHandler(e, item)}
								key={item.id}
								className="event-infos"
							>
								<div>
									<h2>{item.title}</h2>
									<span>
										{converTimeToAMPm(item.startDate)}
									</span>
								</div>
								<span className="view">view</span>
							</div>
						))
					)}
					{eventDataToDisplay &&
					eventDataToDisplay.events.length < 1 ? (
						<div className="no-event">
							{" "}
							{theme === "light" ? (
								<img src="./images/calendar.svg" alt="" />
							) : (
								<img src="./images/calendar-light.svg" alt="" />
							)}
							No Events ;)
						</div>
					) : null}
				</div>
			</div>
		</StyledDiv>
	);
};

export default Event;

const StyledDiv = styled.div`
	// border: solid green;
	position: relative;

	padding: 0 16px;

	.event-day {
		// border: solid;
		line-height: 1.4;
		position: relative;

		.add-event {
			position: absolute;
			right: 0;
			top: 16px;

			padding: 12px;
			border-radius: 8px;
			border: none;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.2rem;
			font-weight: 600;
			transition: all 0.3s;
			box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
		  }
		  button:hover {
			box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
			transform: scale(1.03);
		  }
		  button:active {
			box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
			transform: scale(0.98);
		  }
		  
			img {
				width: 20px;
			}
		}

		.add-event:hover {
			opacity: 0.7;
		}
	}
	h2 {
		font-size: 1.8rem;
		font-weight: 600;
		line-height: 1.1;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.no-event {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0.6;
		img {
			width: 60px;
		}
	}

	.event-data {
		height: 65vh;
		padding: 16px;

		padding-top: 32px;
	}

	.event-infos {
		box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
			rgba(0, 0, 0, 0.24) 0px 1px 2px;
		cursor: pointer;
		border-radius: 8px;
		position: relative;
		padding: 12px;
		padding-left: 16px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		line-height: 1.2;
		.view {
			align-self: center;
			margin-right: 8px;
		}

		&:hover {
			.view {
				opacity: 0.7;
			}
		}
	}

	@media (min-width: 1000px) {
		padding: 0 32px;
		padding-top: 80px;

		.event-data {
			margin-top: 16px;
			overflow-y: auto;
			padding-top: 0px;
			max-height: 60vh;

		}

		.event-day {
			// border: solid;
			line-height: 1.4;
			position: relative;

			.add-event {
				position: absolute;
				right: 0px;
				top: 16px;

				padding: 12px;
				border-radius: 8px;
				border: none;
				cursor: pointer;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 1.1rem;
				font-weigth: 400;

				img {
					width: 20px;
				}
			}
		}
	}
`;
