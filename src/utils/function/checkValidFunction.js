import Function from "../classes/Function";
import handleError from "../error/handleError";

export default function checkValidFunction(func) {
	try {
		if (func instanceof Function === false) throw new Error("class/not-an-instance");

		return true;
	} catch (e) {
		handleError(e.message, null, "Class: Function");
		return false;
	}
}
