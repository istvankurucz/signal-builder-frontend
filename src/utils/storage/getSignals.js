import Function from "../classes/Function";
import Signal from "../classes/Signal";

export default function getSignals() {
	const signalsString = window.localStorage.getItem("signals");

	// If the item is not defined in localstorage
	if (signalsString == null) return [];

	// Create Signal objects from the strings
	return JSON.parse(signalsString).map((signal) => {
		const functions = signal._functions.map((f) => {
			return new Function(
				f._id,
				f._name,
				f._type,
				f._startTime,
				f._length,
				f._offset,
				f._constValue,
				f._keepLastValue,
				f._slope,
				f._frequency,
				f._amplitude,
				f._phase,
				f._stepValue,
				f._stepTime,
				f._rampStartTime,
				f._rampEndTime
			);
		});

		return new Signal(
			signal._id,
			signal._name,
			signal._offset,
			signal._scale,
			functions,
			signal._autoSort,
			signal._reverseTime,
			signal._visible
		);
	});
}
