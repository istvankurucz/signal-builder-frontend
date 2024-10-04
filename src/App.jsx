import { Navigate, Route, Routes } from "react-router-dom";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import Feedback from "./components/ui/Feedback/Feedback";
import Generation from "./pages/Generation/Generation";
import "./App.css";
import useSaveSignals from "./hooks/storage/useSaveSignals";
import Toggle from "./components/form/Toggle/Toggle";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
	useSaveSignals();

	return (
		<>
			<Feedback />

			<Routes>
				<Route path="/generation" element={<Generation />} />
				<Route
					path="/import"
					element={
						<>
							<h1>import page</h1>
							<Toggle variant="accent" id="toggle" label="Toggle button" />
						</>
					}
				/>
				<Route path="/export" element={<h1>export page</h1>} />

				<Route path="/" element={<Navigate to="/generation" replace />} />
				<Route path="*" element={<h1>Page not found.</h1>} />
			</Routes>
		</>
	);
}

export default App;
