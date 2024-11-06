export default function (signals = [], dispatch, signalId = "") {
	try {
		// Check if there is a signal ID
		if (signalId === "") throw new Error("signal/id-missing");

		// Remove the signal
		const newSignals = signals.filter((signal) => signal.id !== signalId);

		// Update the local state
		dispatch({
			type: "SET_SIGNALS",
			signals: newSignals,
		});

		// Return the new array of signals
		return newSignals;
	} catch (e) {
		handleError(e.message, null);
		return [];
	}
}
