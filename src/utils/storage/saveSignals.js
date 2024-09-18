import Signal from "../classes/Signal";

function checkSignals(signals = []) {
	let valid = true;
	signals.forEach((signal) => {
		if (signal instanceof Signal === false) valid = false;
	});

	return valid;
}

export default function saveSignals(signals = []) {
	// Check if the given signals are valid
	if (!checkSignals(signals)) {
		console.log("The given signals are not an instance of Signal class.");
		return;
	}

	// Save the signals to localstorage
	window.localStorage.setItem("signals", JSON.stringify(signals));
	window.localStorage.setItem("signalsUpdatedAt", JSON.stringify(new Date()));
}
