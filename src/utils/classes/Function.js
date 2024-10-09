import functionTypes from "../../assets/function/functionTypes";
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
		if (typeof name !== "string") {
			console.log("Name parameter must be a string.");
			return;
		}
		if (name === "") {
			console.log("Name parameter cannot be empty.");
			return;
		}

		this._name = name;
	}

	// Type
	get type() {
		return this._type;
	}
	set type(type) {
		if (typeof type !== "string") {
			console.log("Name parameter must be a string.");
			return;
		}
		if (!functionTypes.includes(type)) {
			console.log("The given function type is not supported.");
			return;
		}

		this._type = type;
	}

	// Start time
	get startTime() {
		return this._startTime;
	}
	set startTime(startTime) {
		if (typeof startTime !== "number") {
			console.log("Start time parameter must be a number.");
			return;
		}
		if (isNaN(startTime)) {
			this._startTime = defaultValues.startTime;
			return;
		}

		this._startTime = startTime;
	}

	// Length
	get length() {
		return this._length;
	}
	set length(length) {
		if (typeof length !== "number") {
			console.log("Length parameter must be a number.");
			return;
		}
		if (isNaN(length)) {
			this._length = defaultValues.length;
			return;
		}

		this._length = length;
	}

	// Offset
	get offset() {
		return this._offset;
	}
	set offset(offset) {
		if (typeof offset !== "number") {
			console.log("Offset parameter must be a number.");
			return;
		}
		if (isNaN(offset)) {
			this._offset = defaultValues.offset;
			return;
		}

		this._offset = offset;
	}

	// Const value
	get constValue() {
		return this._constValue;
	}
	set constValue(constValue) {
		if (typeof constValue !== "number") {
			console.log("Const value parameter must be a number.");
			return;
		}
		if (isNaN(constValue)) {
			this._constValue = defaultValues.constValue;
			return;
		}

		this._constValue = constValue;
	}

	// Keep last value
	get keepLastValue() {
		return this._keepLastValue;
	}
	set keepLastValue(keepLastValue) {
		if (typeof keepLastValue !== "boolean") {
			console.log("KeepLastValue parameter must be a boolean.");
			return;
		}

		this._keepLastValue = keepLastValue;
	}

	// Slope
	get slope() {
		return this._slope;
	}
	set slope(slope) {
		if (typeof slope !== "number") {
			console.log("Slope parameter must be a number.");
			return;
		}
		if (isNaN(slope)) {
			this._slope = defaultValues.slope;
			return;
		}

		this._slope = slope;
	}

	// Frequency
	get frequency() {
		return this._frequency;
	}
	set frequency(frequency) {
		if (typeof frequency !== "number") {
			console.log("Frequency parameter must be a number.");
			return;
		}
		if (isNaN(frequency)) {
			this._frequency = defaultValues.frequency;
			return;
		}
		if (frequency <= 0) {
			this._frequency = defaultValues.frequency;
			return;
		}

		this._frequency = frequency;
	}

	// Amplitude
	get amplitude() {
		return this._amplitude;
	}
	set amplitude(amplitude) {
		if (typeof amplitude !== "number") {
			console.log("Amplitude parameter must be a number.");
			return;
		}
		if (isNaN(amplitude)) {
			this._amplitude = defaultValues.amplitude;
			return;
		}
		if (amplitude <= 0) {
			this._amplitude = defaultValues.amplitude;
			return;
		}

		this._amplitude = amplitude;
	}

	// Phase
	get phase() {
		return this._phase;
	}
	set phase(phase) {
		if (typeof phase !== "number") {
			console.log("Phase parameter must be a number.");
			return;
		}
		if (isNaN(phase)) {
			this._phase = defaultValues.phase;
			return;
		}

		this._phase = phase;
	}

	// Step value
	get stepValue() {
		return this._stepValue;
	}
	set stepValue(stepValue) {
		if (typeof stepValue !== "number") {
			console.log("Step value parameter must be a number.");
			return;
		}
		if (isNaN(stepValue)) {
			this._stepValue = defaultValues.stepValue;
			return;
		}

		this._stepValue = stepValue;
	}

	// Step time
	get stepTime() {
		return this._stepTime;
	}
	set stepTime(stepTime) {
		if (typeof stepTime !== "number") {
			console.log("Step time parameter must be a number.");
			return;
		}
		if (isNaN(stepTime)) {
			this._stepTime = defaultValues.stepTime;
			return;
		}

		this._stepTime = stepTime;
	}

	// Ramp start time
	get rampStartTime() {
		return this._rampStartTime;
	}
	set rampStartTime(rampStartTime) {
		if (typeof rampStartTime !== "number") {
			console.log("Ramp start time parameter must be a number.");
			return;
		}
		if (isNaN(rampStartTime)) {
			this._rampStartTime = defaultValues.rampStartTime;
			return;
		}

		this._rampStartTime = rampStartTime;
	}

	// Ramp end time
	get rampEndTime() {
		return this._rampEndTime;
	}
	set rampEndTime(rampEndTime) {
		if (typeof rampEndTime !== "number") {
			console.log("Ramp end time parameter must be a number.");
			return;
		}
		if (isNaN(rampEndTime)) {
			this._rampEndTime = defaultValues.rampEndTime;
			return;
		}

		this._rampEndTime = rampEndTime;
	}
}

export default Function;
