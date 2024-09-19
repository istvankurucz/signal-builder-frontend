import checkValidSignal from "../signal/checkValidSignal";

export default function getFunctionById(signal, functionId = "") {
	// Check if there is a function ID
	if (functionId === "") {
		console.log("No function ID was provided.");
		return null;
	}

	// Check if signal is an instace of Signal class
	if (!checkValidSignal(signal)) return null;

	// Get the function
	const func = signal.functions.find((f) => f.id === functionId);

	// Check is the function exists
	if (func == undefined) return null;

	// Return the function
	return func;
}
