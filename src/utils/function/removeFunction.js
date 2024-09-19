import checkValidSignal from "../signal/checkValidSignal";
import updateSignals from "../signal/updateSignals";

export default function removeFunction(signals = [], dispatch, signal, functionId = "") {
	// Check if the signal is valid
	if (!checkValidSignal(signal)) return [];

	// Check if there is a function ID
	if (functionId === "") {
		console.log("Function ID is not provided.");
		return signal.functions;
	}

	// Remove the function
	const newFunctions = signal.functions.filter((f) => f.id !== functionId);

	// Update the signal
	signal.setFunctions(newFunctions);

	// Create the new signals array with the updated signal
	const newSignals = updateSignals(signals, dispatch, signal);

	// Update the local state
	dispatch({
		type: "SET_SIGNALS",
		signals: newSignals,
	});

	// Return the new array of signals
	return newFunctions;
}
