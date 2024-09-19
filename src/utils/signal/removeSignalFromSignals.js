export default function (signals = [], dispatch, signalId = "") {
	// Check if there is a signal ID
	if (signalId === "") {
		console.log("Signal ID is not provided.");
		return;
	}

	// Remove the signal
	const newSignals = signals.filter((signal) => signal.id !== signalId);

	// Update the local state
	dispatch({
		type: "SET_SIGNALS",
		signals: newSignals,
	});

	// Return the new array of signals
	return newSignals;
}
