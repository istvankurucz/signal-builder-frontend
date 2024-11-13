import { useState } from "react";
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
import Export from "./pages/Export/Export";
import Import from "./pages/Import/Import";
import useSaveSignals from "./hooks/storage/useSaveSignals";
import LoadSignalsModal from "./pages/Generation/LoadSignalsModal/LoadSignalsModal";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
	useSaveSignals();
	const [showLoadSignalsModal, setShowLoadSignalsModal] = useState(false);

	return (
		<>
			<Feedback />
			<LoadSignalsModal show={showLoadSignalsModal} setShow={setShowLoadSignalsModal} />

			<Routes>
				<Route
					path="/generation"
					element={<Generation setShowLoadSignals={setShowLoadSignalsModal} />}
				/>
				<Route
					path="/import"
					setShowLoadSignals={setShowLoadSignalsModal}
					element={<Import />}
				/>
				<Route
					path="/export"
					element={<Export setShowLoadSignals={setShowLoadSignalsModal} />}
				/>

				<Route path="/" element={<Navigate to="/generation" replace />} />
				<Route path="*" element={<h1>Page not found.</h1>} />
			</Routes>
		</>
	);
}

export default App;
