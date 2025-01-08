import handleError from "../error/handleError";
import checkValidSignal from "../signal/checkValidSignal";

function checkSignals(signals = []) {
	let valid = true;
	signals.forEach((signal) => {
		if (!checkValidSignal(signal)) valid = false;
	});

	return valid;
}

export default function saveSignals(signals = []) {
	try {
		// Check if the given signals are valid
		if (!checkSignals(signals)) throw new Error("class/not-an-instance");

		// Save the signals to localstorage
		const avlSignalBuilderData = {
			signals: signals.map((signal) => signal.toJSON()),
			recentImportFilePaths: [],
			updatedAt: new Date(),
		};
		window.localStorage.setItem("AVLSignalBuilderData", JSON.stringify(avlSignalBuilderData));
	} catch (e) {
		handleError(e.message, null);
	}
}
