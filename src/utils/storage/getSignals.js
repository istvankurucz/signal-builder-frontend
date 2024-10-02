import Function from "../classes/Function";
import Signal from "../classes/Signal";

export default function getSignals() {
	const signalsString = window.localStorage.getItem("signals");

	// If the item is not defined in localstorage
	if (signalsString == null) return [];

	// Create Signal objects from the strings
	return JSON.parse(signalsString).map((signal) => {
		const functions = signal.functions.map((f) => {
			return new Function(
				f.id,
				f.name,
				f.type,
				f.startTime,
				f.length,
				f.offset,
				f.constValue,
				f.keepLastValue,
				f.slope,
				f.frequency,
				f.amplitude,
				f.phase,
				f.stepValue,
				f.stepTime,
				f.rampStartTime,
				f.rampEndTime
			);
		});

		return new Signal(
			signal.id,
			signal.name,
			signal.offset,
			signal.scale,
			functions,
			signal.visible
		);
	});
}
