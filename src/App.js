import CalenderPage from "./CalenderPage";
import Event from "./Event";
import styled, { ThemeProvider } from "styled-components";

import { lightMode, darkMode } from "./Themes";
import { createCalendarDates, months, days } from "./utils/allinfo";

import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./globalStyles";
function App() {
	const [calenderDates, setCalenderDates] = useState();
	//count - {month: 0, year: 0}
	const [globalEvent, setGlobalEvent] = useState();
	const [count, setCount] = useState();
	const [theme, setTheme] = useState("light");

	const setMode = (mode) => {
		window.localStorage.setItem("theme", mode);
		setTheme(mode);
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme");
		localTheme && setTheme(localTheme);
	}, []);

	const themeToggler = () => {
		theme === "light" ? setMode("dark") : setMode("light");
	};

	useEffect(() => {
		//initial render
		const cal = new Date();

		setCount({ month: cal.getMonth(), year: cal.getFullYear() });
		setCalenderDates(() =>
			createCalendarDates(cal.getFullYear(), cal.getMonth())
		);
		setGlobalEvent({
			day: days[cal.getDay() - 1],
			date: cal.getDate(),
			month: months[cal.getMonth()],
			events: [],
			year: cal.getFullYear(),
		});
	}, []);

	useEffect(() => {
		//subsequentrenders
		if (count) {
			setCalenderDates(() =>
				createCalendarDates(count.year, count.month)
			);
		}
	}, [count]);

	function increaseDate() {
		if (count.month < 11) {
			setCount({ ...count, month: count.month + 1 });
		} else {
			setCount({ month: 0, year: count.year + 1 });
		}
	}

	function decreaseDate() {
		if (count.month > 0) {
			setCount({ ...count, month: count.month - 1 });
		} else {
			setCount({ month: 11, year: count.year - 1 });
		}
	}

	return (
		<ThemeProvider theme={theme === "light" ? lightMode : darkMode}>
			<GlobalStyles />
			<StyledMain>
				<StyledDiv>
					<button onClick={themeToggler} className="mode-toggle">
						{theme === "light" ? (
							<img src="./images/dark_mode.svg" alt="" />
						) : (
							<img src="./images/light_mode.svg" alt="" />
						)}
					</button>
					<CalenderPage
						count={count}
						increaseDate={increaseDate}
						decreaseDate={decreaseDate}
						calenderDates={calenderDates}
						months={months}
						globalEvent={globalEvent}
						setGlobalEvent={setGlobalEvent}
						theme={theme}
					/>
					{globalEvent && (
						<Event
							globalEvent={globalEvent}
							setGlobalEvent={setGlobalEvent}
							theme={theme}
						/>
					)}
				</StyledDiv>
				<p className="ebube">
					Coded by{" "}
					<a
						href="https://github.com/Bube-create/calendly"
						className="e"
					>
						Ebube{" "}
					</a>{" "}
				</p>
			</StyledMain>
		</ThemeProvider>
	);
}

export default App;

const StyledMain = styled.div`
	position: realtive;

	.ebube {
		display: none;
	}
	@media (min-width: 1000px) {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-conetnt: center;

		.ebube {
			display: revert;
			position: absolute;
			bottom: 40px;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;
const StyledDiv = styled.div`
	display: grid;
	position: relative;

	.mode-toggle {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 3;
		cursor: pointer;
		background: transparent;
		border: 0;

		img {
			width: 40px;
		}
	}

	@media (min-width: 1000px) {
		grid-template-columns: 1fr 1fr;
		width: 900px;
		margin: 0 auto;
		place-content: center;
		height: 90vh;
		padding: 8px;
		border-radius: 8px;
		box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
			rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
		.mode-toggle {
			position: absolute;
			top: 16px;
			right: 16px;
			z-index: 3;
		}
	}

	@media (min-width: 1200px) {
		grid-template-columns: 1fr 1fr;
		width: 1200px;
		margin: 0 auto;
		place-content: center;
		height: 90vh;
		padding: 8px;
		border-radius: 8px;
	}
`;
