import handleError from "../error/handleError";
import checkValidSignal from "../signal/checkValidSignal";
import updateSignals from "../signal/updateSignals";

export default function removeFunction(signals = [], dispatch, signal, functionId = "") {
	try {
		// Check if the signal is valid
		if (!checkValidSignal(signal)) throw new Error("class/not-an-instance");

		// Check if there is a function ID
		if (functionId === "") throw new Error("function/id-missing");

		// Remove the function
		const newFunctions = signal.functions.filter((f) => f.id !== functionId);

		// Update the signal
		signal.functions = newFunctions;

		// Create the new signals array with the updated signal
		updateSignals(signals, dispatch);

		// Return the new array of signals
		return newFunctions;
	} catch (e) {
		handleError(e.message, null);

		switch (e.message) {
			case "class/not-an-instance":
				return [];
			case "function/id-missing":
				return signal.functions;
		}
	}
}
