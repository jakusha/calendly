import React, { useState } from "react";
import styled from "styled-components";
const EventForm = () => {
	const [state, setState] = useState({
		title: "",
		startDate: "",
		endDate: "",
		description: "",
	});

	function formhandler(e, name) {
		setState({ ...state, [name]: e.target.value });
	}

	function submitHandler(e) {
		e.preventDefault();
		console.log(state);
	}
	return (
		<StyledForm>
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
			</form>
		</StyledForm>
	);
};

export default EventForm;

const StyledForm = styled.div`
	border: solid;
	position: absolute;
	bottom: 0;
	left: 0;
`;
