import Function from "../classes/Function";

export default function createFunction(func) {
	try {
		return new Function(
			func.id,
			func.name,
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
	} catch (e) {
		return null;
	}
}
