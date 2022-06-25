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
	const [inputError, setInputError] = useState(false);

	function formhandler(e, name) {
		setState({ ...state, [name]: e.target.value });
	}

	function submitHandler(e) {
		e.preventDefault();
		if (state.title.trim().length < 1) {
			console.log("hello");
			setInputError(true);
		} else {
			console.log("hello there");
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

		setTimeout(() => {
			setInputError(false);
		}, 1000);
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
			<StyledForm className={inputError ? "error" : null}>
				<h2>Edit Event</h2>
				<form onSubmit={submitHandler}>
					<div className="form-inputs">
						<label htmlFor="title">Title: </label>
						<input
							type={"text"}
							value={state.title}
							onChange={(e) => formhandler(e, "title")}
							id="title"
						/>
					</div>

					<div className="form-inputs">
						<label htmlFor="startdate">Begins: </label>

						<input
							type="time"
							value={state.startDate}
							onChange={(e) => formhandler(e, "startDate")}
							placeholder="hh:mm"
							id="startdate"
						/>
						<img
							src="./images/clock.svg"
							alt="clock"
							className="clock"
						/>
					</div>

					<div className="form-inputs">
						<label htmlFor="enddate">End: </label>
						<input
							type="time"
							value={state.endDate}
							onChange={(e) => formhandler(e, "endDate")}
							placeholder="hh:mm"
							id="enddate"
						/>
						<img
							src="./images/clock.svg"
							alt="clock"
							className="clock"
						/>
					</div>

					<div className="form-inputs description">
						<label htmlFor="description">Description: </label>
						<textarea
							value={state.description}
							onChange={(e) => formhandler(e, "description")}
							className="description"
							id="description"
						/>
					</div>

					<button
						onClick={() => setEditFormToggle(false)}
						className="close-btn"
					>
						<img src="./images/close.svg" alt="close" />
					</button>
					<div className="btn-group">
						<button onClick={deleteHandler} className="delete-btn">
							<img src="./images/delete.svg" alt="delete" />
						</button>
						<button className="edit-add">
							Add Event <img src="./images/add.svg" alt="" />
						</button>
					</div>
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
	min-height: 100vh;
	width: 100vw;
	background: rgb(100 88 88 / 80%);
	display: grid;
	place-content: center;
	z-index: 103;
`;
const StyledForm = styled.div`
	border-radius: 8px;
	width: min(80vw, 600px);
	background: white;
	padding: 32px;
	padding-top: 60px;
	color: black;
	z-index: 105;
	position: relative;

	h2 {
		font-size: 2rem;
	}

	button {
		cursor: pointer;
		background: transparent;
		border: 0;
		img {
			width: 25px;
		}
	}

	.form-inputs {
		display: flex;
		margin-bottom: 16px;
		position: relative;

		label {
			font-size: 1.1rem;
			margin-top: 8px;
			align-self: center;
		}
		input {
			width: 65%;
			margin-left: auto;
			outline: 0;
			border: 0;
			border-bottom: 2px solid;
			padding: 12px;
			font-size: 1.1rem;
		}

		textarea {
			flex-basis: 70%;
			height: 150px;
			outline: 0;
			font-size: 1.1rem;
		}

		&.description {
			display: revert;
			label {
				display: block;
				margin-bottom: 8px;
			}

			textarea {
				width: 100%;
			}
		}
	}

	.close-btn {
		position: absolute;
		left: 12px;
		top: 12px;

		img {
			width: 35px;
		}
	}

	button:hover {
		background: lightblue;
		border-radius: 8px;
	}

	.edit-add {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		border-radius: 8px;
		background: lightblue;

		z-index: 200;
		img {
			width: 20px;
		}
	}

	.btn-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 32px;
	}

	input[type="time"] {
		cursor: pointer;
	}

	input[type="time"]::-webkit-calendar-picker-indicator {
		width: 55%;
		position: absolute;
		background: transparent;
		cursor: pointer;
		padding: 12px;
		right: 40px;
	}

	.clock {
		width: 25px;
		position: absolute;
		right: 16px;
		top: 16px;
	}

	@media (min-width: 1000px) {
		max-width: 600px;
		background: white;
		padding: 40px;
		padding-top: 60px;
		color: black;
		z-index: 105;
		position: relative;

		button {
			cursor: pointer;
			background: transparent;
			border: 0;
			img {
				width: 30px;
			}
		}

		.close-btn {
			position: absolute;
			left: 16px;
			top: 8px;

			img {
				width: 40px;
			}
		}

		.clock {
			width: 30px;
			position: absolute;
			right: 16px;
			top: 8px;
		}
	}

	&.error {
		border: 3px solid red;
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		box-shadow: 0 0 0.5em red;

		input#title {
			box-shadow: 0 0 0.5em red;
			border: 0;
		}
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
`;
