import checkValidFunction from "./checkValidFunction";

export default function checkValidFunctions(functions = []) {
	let validFunctions = true;
	functions.forEach((f) => {
		if (!checkValidFunction(f)) validFunctions = false;
	});

	return validFunctions;
}
