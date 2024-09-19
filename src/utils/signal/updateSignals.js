import checkValidSignal from "./checkValidSignal";

export default function updateSignals(signals = [], dispatch, newSignal) {
	// Check if newSignal is instance of Signal class
	if (!checkValidSignal(newSignal)) return signals;

	// Create the new signals array
	const newSignals = signals.map((signal) => {
		if (signal.id === newSignal.id) return newSignal;
		return signal;
	});

	// Set the local state
	dispatch({
		type: "SET_SIGNALS",
		signals: newSignals,
	});

	// Return the new signals array
	return newSignals;
}
