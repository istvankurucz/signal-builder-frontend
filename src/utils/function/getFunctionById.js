import checkValidSignal from "../signal/checkValidSignal";

export default function getFunctionById(signal, functionId = "") {
	try {
		// Check if there is a function ID
		if (functionId === "") throw new Error("function/id-missing");

		// Check if signal is an instace of Signal class
		if (!checkValidSignal(signal)) throw new Error("class/not-an-instance");

		// Get the function
		const func = signal.functions.find((f) => f.id === functionId);

		// Check is the function exists
		if (func == undefined) throw new Error("function/not-found");

		// Return the function
		return func;
	} catch (e) {
		handleError(e.message, null);
		return null;
	}
}
