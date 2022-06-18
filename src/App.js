import CalenderPage from "./CalenderPage";
import Event from "./Event";
import styled from "styled-components";
import EventForm from "./EventForm";
function App() {
	return (
		<StyledDiv>
			<CalenderPage />
			{/* <EventForm /> */}
			<Event />
		</StyledDiv>
	);
}

export default App;

const StyledDiv = styled.div`
	display: grid;

	@media (min-width: 750px) {
		grid-template-columns: 1fr 1fr;
		border: solid;
	}
`;
