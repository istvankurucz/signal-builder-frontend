import { Navigate, Route, Routes } from "react-router-dom";
import Feedback from "./components/ui/Feedback/Feedback";
import Generation from "./pages/Generation/Generation";
import "./App.css";

function App() {
	return (
		<>
			<Feedback />

			<Routes>
				<Route path="/generation" element={<Generation />} />
				<Route path="/import" element={<h1>import page</h1>} />
				<Route path="/export" element={<h1>export page</h1>} />

				<Route path="/" element={<Navigate to="/generation" replace />} />
				<Route path="*" element={<h1>Page not found.</h1>} />
			</Routes>
		</>
	);
}

export default App;
