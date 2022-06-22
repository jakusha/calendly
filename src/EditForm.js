import React, { useState } from "react";
import styled from "styled-components";
import { months, editDateData, deleteDateData } from "./utils/allinfo";
const EditForm = ({ data, globalEvent, setEditFormToggle }) => {
	const [state, setState] = useState({
		title: data.title,
		startDate: data.startDate,
		endDate: data.endDate,
		description: data.description,
	});

	function formhandler(e, name) {
		setState({ ...state, [name]: e.target.value });
	}

	function submitHandler(e) {
		e.preventDefault();
		if (state.title.trim().length < 1) {
			console.log("invalid Input");
		} else {
			editDateData(
				globalEvent.year,
				globalEvent.date,
				data.id,
				months.indexOf(globalEvent.month),
				{
					...globalEvent,
					events: [{ ...state }],
				}
			);
			setEditFormToggle(false);
		}
	}

	function deleteHandler() {
		deleteDateData(
			globalEvent.year,
			globalEvent.date,
			data.id,
			months.indexOf(globalEvent.month),
			{
				...globalEvent,
				events: [{ ...state }],
			}
		);
		setEditFormToggle(false);
	}

	return (
		<StyledDiv>
			<StyledForm>
				<h2>Edit Form</h2>
				<form onSubmit={submitHandler}>
					<div>
						<label>Title</label>
						<input
							type={"text"}
							value={state.title}
							onChange={(e) => formhandler(e, "title")}
						/>
					</div>

					<div>
						<div>
							<label>Begins</label>
							<input
								type="datetime-local"
								value={state.startDate}
								onChange={(e) => formhandler(e, "startDate")}
							/>
						</div>

						<div>
							<label>End</label>
							<input
								type="datetime-local"
								value={state.endDate}
								onChange={(e) => formhandler(e, "endDate")}
							/>
						</div>
					</div>

					<div>
						<label>Description</label>
						<input
							type="text"
							value={state.description}
							onChange={(e) => formhandler(e, "description")}
						/>
					</div>
					<button>Add Event</button>
					<button onClick={() => setEditFormToggle(false)}>
						Close
					</button>

					<button onClick={deleteHandler}>Delete</button>
				</form>
			</StyledForm>
		</StyledDiv>
	);
};

export default EditForm;

const StyledDiv = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: grey;
	opacity: 0.8;
	display: grid;
	place-content: center;
	z-index: 103;
`;
const StyledForm = styled.div`
	border: solid;
	width: 60vw;
	background: white;
	padding: 32px;
	color: black;
	z-index: 105;
`;
