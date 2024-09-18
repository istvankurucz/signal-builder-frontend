import Signal from "../classes/Signal";

export default function getSignals() {
	const signalsString = window.localStorage.getItem("signals");

	// If the item is not defined in localstorage
	if (signalsString == null) return [];

	// Create Signal objects from the strings
	return JSON.parse(signalsString).map(
		(signal) =>
			new Signal(
				signal.id,
				signal.name,
				signal.offset,
				signal.scacle,
				signal.functions,
				signal.visible
			)
	);
}
