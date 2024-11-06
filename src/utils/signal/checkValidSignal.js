import Signal from "../classes/Signal";
import handleError from "../error/handleError";

export default function checkValidSignal(signal) {
	try {
		if (signal instanceof Signal === false) throw new Error("class/not-an-instance");

		return true;
	} catch (e) {
		handleError(e.message, null);
		return false;
	}
}
