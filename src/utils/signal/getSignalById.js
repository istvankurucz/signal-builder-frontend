import handleError from "../error/handleError";

export default function getSignalById(signals = [], signalId = "") {
	try {
		// Check if there is a given signal ID
		if (signalId === "") throw new Error("signal/id-missing");

		// Get the signal from signals array
		const signal = signals.find((signal) => signal.id === signalId);

		// Check if there is a signal ins signals array with the given ID
		if (signal == undefined) throw new Error("signal/not-found");

		return signal;
	} catch (e) {
		handleError(e.message, null);
		return null;
	}
}
