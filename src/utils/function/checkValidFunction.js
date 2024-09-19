import Function from "../classes/Function";

export default function checkValidFunction(func) {
	if (func instanceof Function === false) {
		console.log("The given function is not an instance of the Function class.");
		return false;
	}

	return true;
}
