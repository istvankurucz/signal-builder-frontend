import Function from "../classes/Function";

export default function createFunction(func) {
	try {
		return new Function(
			func._id,
			func._name,
			func._type,
			func._startTime,
			func._length,
			func._offset,
			func._constValue,
			func._keepLastValue,
			func._slope,
			func._frequency,
			func._amplitude,
			func._phase,
			func._stepValue,
			func._stepTime,
			func._rampStartTime,
			func._rampEndTime
		);
	} catch (e) {
		return null;
	}
}
