import checkValidSignal from "../signal/checkValidSignal";
import checkValidFunction from "./checkValidFunction";

export default function addFunction(signal, newFunction) {
	// Check if the new signal is an instance of Signal class
	if (!checkValidSignal(signal)) return null;

	// Check if the new signal is an instance of Function class
	if (!checkValidFunction(newFunction)) return signal;

	// Create the new functions array
	const newFunctions = [...signal.functions, newFunction];

	// Set the functions property of the signal
	signal.setFunctions(newFunctions);

	// Return the created array
	return signal;
}
