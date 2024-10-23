import Function from "../classes/Function";
import checkValidFunctions from "./checkValidFunctions";

export default function copyFunctions(functions = []) {
	// Check if the functions are valid instances of Function class
	if (!checkValidFunctions(functions)) {
		console.log("The functions are not valid instances of Function class.");
		return;
	}

	return functions.map((func) => {
		return new Function(
			undefined,
			undefined,
			func.type,
			func.startTime,
			func.length,
			func.offset,
			func.constValue,
			func.keepLastValue,
			func.slope,
			func.frequency,
			func.amplitude,
			func.phase,
			func.stepValue,
			func.stepTime,
			func.rampStartTime,
			func.rampEndTime
		);
	});
}
