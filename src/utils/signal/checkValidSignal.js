import Signal from "../classes/Signal";

export default function checkValidSignal(signal) {
	if (signal instanceof Signal === false) {
		console.log("The given signal is not an instance of Signal class.");
		return false;
	}

	return true;
}
