import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import "./App.css";
import Checkbox from "./components/form/Checkbox/Checkbox";
import Accordion from "./components/ui/Accordion/Accordion";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "./components/form/Input/Input";

function App() {
	return (
		<>
			<Header />

			<Checkbox variant="accent" id="1" label="Checkbox label" />

			<Accordion>
				<Accordion.Header icon={faAngleRight}>Hello</Accordion.Header>
				<Accordion.Body>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, veritatis
					doloribus. Asperiores molestiae pariatur amet ab, praesentium id! Commodi earum sint
					sit fuga numquam exercitationem eos eaque velit odio a.
				</Accordion.Body>
			</Accordion>

			<Input direction="horizontal" variant="accent" label="Input label" id="2" />

			<Routes>
				<Route path="/generation" element={<h1>Generation page</h1>} />
				<Route path="/import" element={<h1>import page</h1>} />
				<Route path="/export" element={<h1>export page</h1>} />

				<Route path="/" element={<Navigate to="/generation" replace />} />
				<Route path="*" element={<h1>Page not found.</h1>} />
			</Routes>
			<h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, obcaecati.</h1>
		</>
	);
}

export default App;
