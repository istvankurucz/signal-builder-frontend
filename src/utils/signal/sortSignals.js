import updateSignals from "./updateSignals";

export default function sortSignals(tempElements, signals, dispatch) {
	// Sort the signals
	const sortedSignals = tempElements.map((element) =>
		signals.find((signal) => signal.id === element.id)
	);

	// Update signals array
	updateSignals(sortedSignals, dispatch);
}
