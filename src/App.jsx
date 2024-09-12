import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Feedback from "./components/ui/Feedback/Feedback";
import "./App.css";

function App() {
	return (
		<>
			<Feedback />

			<Header />

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
