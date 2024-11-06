import Function from "../classes/Function";
import handleError from "../error/handleError";
import checkValidFunctions from "./checkValidFunctions";

export default function copyFunctions(functions = []) {
	try {
		// Check if the functions are valid instances of Function class
		if (!checkValidFunctions(functions)) throw new Error("class/not-an-instance");

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
	} catch (e) {
		handleError(e.message, null, "Class: Function");
	}
}
