export default function getSignalById(signals = [], signalId = "") {
	// Check if there is a given signal ID
	if (signalId === "") {
		console.log("There was no signal ID provided.");
		return null;
	}

	// Get the signal from signals array
	const signal = signals.find((signal) => signal.id === signalId);

	// Check if there is a signal ins signals array with the given ID
	if (signal == undefined) {
		console.log("Signal with the given ID is not found.");
		return null;
	}

	return signal;
}
