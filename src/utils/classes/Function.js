import functionTypes from "../../assets/function/functionTypes";
import handleError from "../error/handleError";
import generateId from "../general/generateId";

const defaultValues = {
	type: "const",
	startTime: 0,
	length: 1,
	offset: 0,
	constValue: 0,
	keepLastValue: false,
	slope: 1,
	frequency: 1,
	amplitude: 1,
	phase: 0,
	stepValue: 1,
	stepTime: 0.5,
	rampStartTime: 0.25,
	rampEndTime: 0.75,
};

class Function {
	constructor(
		id = generateId(),
		name = "",
		type = defaultValues.type,
		startTime = defaultValues.startTime,
		length = defaultValues.length,
		offset = defaultValues.offset,
		constValue = defaultValues.constValue,
		keepLastValue = defaultValues.keepLastValue,
		slope = defaultValues.slope,
		frequency = defaultValues.frequency,
		amplitude = defaultValues.amplitude,
		phase = defaultValues.phase,
		stepValue = defaultValues.stepValue,
		stepTime = defaultValues.stepTime,
		rampStartTime = defaultValues.rampStartTime,
		rampEndTime = defaultValues.rampEndTime
	) {
		this._id = id;
		if (name === "") this._name = `Function-${id}`;
		else this._name = name;
		this._type = type;
		this._startTime = startTime;
		this._length = length;
		this._offset = offset;
		this._constValue = constValue;
		this._keepLastValue = keepLastValue;
		this._slope = slope;
		this._frequency = frequency;
		this._amplitude = amplitude;
		this._phase = phase;
		this._stepValue = stepValue;
		this._stepTime = stepTime;
		this._rampStartTime = rampStartTime;
		this._rampEndTime = rampEndTime;
	}

	// Id
	get id() {
		return this._id;
	}

	// Name
	get name() {
		return this._name;
	}
	set name(name) {
		try {
			if (typeof name !== "string") throw new Error("class/invalid-property-type");
			if (name === "") throw new Error("class/property-value-missing");

			this._name = name;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: name");
		}
	}

	// Type
	get type() {
		return this._type;
	}
	set type(type) {
		try {
			if (typeof type !== "string") throw new Error("class/invalid-property-type");
			if (!functionTypes.includes(type)) throw new Error("function/invalid-type");

			this._type = type;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: type");
		}
	}

	// Start time
	get startTime() {
		return this._startTime;
	}
	set startTime(startTime) {
		try {
			if (typeof startTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(startTime)) {
				this._startTime = defaultValues.startTime;
				return;
			}

			this._startTime = startTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: startTime");
		}
	}

	// Length
	get length() {
		return this._length;
	}
	set length(length) {
		try {
			if (typeof length !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(length)) {
				this._length = defaultValues.length;
				return;
			}

			this._length = length;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: length");
		}
	}

	// Offset
	get offset() {
		return this._offset;
	}
	set offset(offset) {
		try {
			if (typeof offset !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(offset)) {
				this._offset = defaultValues.offset;
				return;
			}

			this._offset = offset;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: offset");
		}
	}

	// Const value
	get constValue() {
		return this._constValue;
	}
	set constValue(constValue) {
		try {
			if (typeof constValue !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(constValue)) {
				this._constValue = defaultValues.constValue;
				return;
			}

			this._constValue = constValue;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: constValue");
		}
	}

	// Keep last value
	get keepLastValue() {
		return this._keepLastValue;
	}
	set keepLastValue(keepLastValue) {
		try {
			if (typeof keepLastValue !== "boolean") throw new Error("class/invalid-property-type");

			this._keepLastValue = keepLastValue;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: keepLastValue");
		}
	}

	// Slope
	get slope() {
		return this._slope;
	}
	set slope(slope) {
		try {
			if (typeof slope !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(slope)) {
				this._slope = defaultValues.slope;
				return;
			}

			this._slope = slope;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: slope");
		}
	}

	// Frequency
	get frequency() {
		return this._frequency;
	}
	set frequency(frequency) {
		try {
			if (typeof frequency !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(frequency) || frequency <= 0) {
				this._frequency = defaultValues.frequency;
				return;
			}

			this._frequency = frequency;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: frequency");
		}
	}

	// Amplitude
	get amplitude() {
		return this._amplitude;
	}
	set amplitude(amplitude) {
		try {
			if (typeof amplitude !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(amplitude) || amplitude <= 0) {
				this._amplitude = defaultValues.amplitude;
				return;
			}

			this._amplitude = amplitude;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: amplitude");
		}
	}

	// Phase
	get phase() {
		return this._phase;
	}
	set phase(phase) {
		try {
			if (typeof phase !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(phase)) {
				this._phase = defaultValues.phase;
				return;
			}

			this._phase = phase;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: phase");
		}
	}

	// Step value
	get stepValue() {
		return this._stepValue;
	}
	set stepValue(stepValue) {
		try {
			if (typeof stepValue !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(stepValue)) {
				this._stepValue = defaultValues.stepValue;
				return;
			}

			this._stepValue = stepValue;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: stepValue");
		}
	}

	// Step time
	get stepTime() {
		return this._stepTime;
	}
	set stepTime(stepTime) {
		try {
			if (typeof stepTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(stepTime)) {
				this._stepTime = defaultValues.stepTime;
				return;
			}

			this._stepTime = stepTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: stepTime");
		}
	}

	// Ramp start time
	get rampStartTime() {
		return this._rampStartTime;
	}
	set rampStartTime(rampStartTime) {
		try {
			if (typeof rampStartTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(rampStartTime)) {
				this._rampStartTime = defaultValues.rampStartTime;
				return;
			}

			this._rampStartTime = rampStartTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: rampStartTime");
		}
	}

	// Ramp end time
	get rampEndTime() {
		return this._rampEndTime;
	}
	set rampEndTime(rampEndTime) {
		try {
			if (typeof rampEndTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(rampEndTime)) {
				this._rampEndTime = defaultValues.rampEndTime;
				return;
			}

			this._rampEndTime = rampEndTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: rampEndTime");
		}
	}
}

export default Function;
