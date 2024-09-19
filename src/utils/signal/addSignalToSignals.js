import Signal from "../classes/Signal";
import checkValidSignal from "./checkValidSignal";

export default function addSignalToSignals(signals = [], dispatch, newSignal) {
	// Check if the new signal is an instance of Signal class
	if (!checkValidSignal(newSignal)) return signals;

	// Create the new signals array
	const newSignals = [...signals, newSignal];

	// Update the local state
	dispatch({
		type: "SET_SIGNALS",
		signals: newSignals,
	});

	// Return the new signals array
	return newSignals;
}
