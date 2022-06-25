import React from "react";
import styled from "styled-components";
import { converTimeToAMPm, deleteDateData, months } from "./utils/allinfo";

const EventModal = ({
	item,
	editHandler,
	setEventModalToggle,
	globalEvent,
	data,
}) => {
	function deleteHandler() {
		deleteDateData(
			globalEvent.year,
			globalEvent.date,
			item.id,
			months.indexOf(globalEvent.month),
			{
				...globalEvent,
			}
		);
		setEventModalToggle(false);
	}

	return (
		<StyledDiv>
			<StyledMain>
				<h2>{item.title}</h2>
				<div>
					<span className="item-title">Time: </span>
					<span>
						{converTimeToAMPm(item.startDate)} -{" "}
						{converTimeToAMPm(item.endDate)}
					</span>
				</div>
				<div className="description">
					<div className="item-title">Description:</div>
					<p>{item.description}</p>
				</div>

				<button
					onClick={(e) => editHandler(e, item)}
					className="edit-btn"
				>
					<img src="./images/edit.svg" alt="" />{" "}
				</button>

				<button
					onClick={() => setEventModalToggle(false)}
					className="close-btn"
				>
					<img src="./images/close.svg" alt="close" />
				</button>

				<button onClick={deleteHandler} className="delete-btn">
					<img src="./images/delete.svg" alt="delete" />
				</button>
			</StyledMain>
		</StyledDiv>
	);
};

export default EventModal;

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
const StyledMain = styled.div`
	border-radius: 8px;
	width: min(80vw, 600px);
	min-height: 75vh;
	background: white;
	opacity: 1;
	padding: 40px;
	padding-top: 50px;
	color: black;
	z-index: 105;
	position: relative;
	overflow: hidden;
	z-index: 110;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	h2 {
		font-size: 2rem;
		padding-top: 32px;
		line-height: 1.1;
	}

	.item-title {
		font-size: 1.2rem;
		font-weight: 600;
	}
	.description {
		margin-top: 24px;
		font-size: 1.2rem;

		p {
			overflow-y: auto;
		}
	}

	button {
		cursor: pointer;
		background: transparent;
		border: 0;
		img {
			width: 25px;
		}
	}
	.edit-btn {
		position: absolute;
		right: 16px;
		top: 24px;
	}

	.close-btn {
		position: absolute;
		left: 8px;
		top: 16px;

		img {
			width: 35px;
		}
	}

	button:hover {
		background: lightblue;
		border-radius: 8px;
	}

	.delete-btn {
		position: absolute;
		right: 16px;
		bottom: 16px;
		padding: 8px;
	}

	@media (min-width: 1000px) {
		border-radius: 8px;
		width: 40vw;
		height: 75vh;
		background: white;
		opacity: 1;
		padding: 40px;
		padding-top: 50px;
		color: black;
		z-index: 105;
		position: relative;
		overflow: hidden;
		z-index: 110;

		h2 {
			font-size: 2.5rem;
		}
		button:hover {
			background: lightblue;
			border-radius: 8px;
		}

		.description {
			margin-top: 32px;
			font-size: 1.2rem;

			p {
				max-height: 30vh;
				overflow-y: auto;
			}
		}

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
			left: 8px;
			top: 8px;

			img {
				width: 45px;
			}
		}

		.edit-btn {
			position: absolute;
			right: 32px;
			top: 16px;
		}

		.delete-btn {
			position: absolute;
			right: 16px;
			bottom: 16px;
			padding: 8px;
		}
	}
`;
