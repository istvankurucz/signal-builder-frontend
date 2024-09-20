import functionTypes from "../../assets/function/functionTypes";
import generateId from "../general/generateId";

const defaultValues = {
	type: "const",
	startTime: 0,
	length: 1,
	offset: 0,
	constValue: 0,
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
		slope = defaultValues.slope,
		frequency = defaultValues.frequency,
		amplitude = defaultValues.amplitude,
		phase = defaultValues.phase,
		stepValue = defaultValues.stepValue,
		stepTime = defaultValues.stepTime,
		rampStartTime = defaultValues.rampStartTime,
		rampEndTime = defaultValues.rampEndTime
	) {
		this.id = id;
		if (name === "") this.name = `Function-${id}`;
		else this.name = name;
		this.type = type;
		this.startTime = startTime;
		this.length = length;
		this.offset = offset;
		this.constValue = constValue;
		this.slope = slope;
		this.frequency = frequency;
		this.amplitude = amplitude;
		this.phase = phase;
		this.stepValue = stepValue;
		this.stepTime = stepTime;
		this.rampStartTime = rampStartTime;
		this.rampEndTime = rampEndTime;
	}

	setName(name) {
		if (typeof name !== "string") {
			console.log("Name parameter must be a string.");
			return;
		}
		if (name === "") {
			console.log("Name parameter cannot be empty.");
			return;
		}

		this.name = name;
	}

	setType(type) {
		if (typeof type !== "string") {
			console.log("Name parameter must be a string.");
			return;
		}
		if (!functionTypes.includes(type)) {
			console.log("The given function type is not supported.");
			return;
		}

		this.type = type;
	}

	setStartTime(startTime) {
		if (typeof startTime !== "number") {
			console.log("Start time parameter must be a number.");
			return;
		}
		if (isNaN(startTime)) {
			this.startTime = defaultValues.startTime;
			return;
		}

		this.startTime = startTime;
	}

	setLength(length) {
		if (typeof length !== "number") {
			console.log("Length parameter must be a number.");
			return;
		}
		if (isNaN(length)) {
			this.length = defaultValues.length;
			return;
		}

		this.length = length;
	}

	setOffset(offset) {
		if (typeof offset !== "number") {
			console.log("Offset parameter must be a number.");
			return;
		}
		if (isNaN(offset)) {
			this.offset = defaultValues.offset;
			return;
		}

		this.offset = offset;
	}

	setConstValue(constValue) {
		if (typeof constValue !== "number") {
			console.log("Const value parameter must be a number.");
			return;
		}
		if (isNaN(constValue)) {
			this.constValue = defaultValues.constValue;
			return;
		}

		this.constValue = constValue;
	}

	setSlope(slope) {
		if (typeof slope !== "number") {
			console.log("Slope parameter must be a number.");
			return;
		}
		if (isNaN(slope)) {
			this.slope = defaultValues.slope;
			return;
		}

		this.slope = slope;
	}

	setFrequency(frequency) {
		if (typeof frequency !== "number") {
			console.log("Frequency parameter must be a number.");
			return;
		}
		if (isNaN(frequency)) {
			this.frequency = defaultValues.frequency;
			return;
		}
		if (frequency <= 0) {
			this.frequency = defaultValues.frequency;
			return;
		}

		this.frequency = frequency;
	}

	setAmplitude(amplitude) {
		if (typeof amplitude !== "number") {
			console.log("Amplitude parameter must be a number.");
			return;
		}
		if (isNaN(amplitude)) {
			this.amplitude = defaultValues.amplitude;
			return;
		}
		if (amplitude <= 0) {
			this.amplitude = defaultValues.amplitude;
			return;
		}

		this.amplitude = amplitude;
	}

	setPhase(phase) {
		if (typeof phase !== "number") {
			console.log("Phase parameter must be a number.");
			return;
		}
		if (isNaN(phase)) {
			this.phase = defaultValues.phase;
			return;
		}

		this.phase = phase;
	}

	setStepValue(stepValue) {
		if (typeof stepValue !== "number") {
			console.log("Step value parameter must be a number.");
			return;
		}
		if (isNaN(stepValue)) {
			this.stepValue = defaultValues.stepValue;
			return;
		}

		this.stepValue = stepValue;
	}

	setStepTime(stepTime) {
		if (typeof stepTime !== "number") {
			console.log("Step time parameter must be a number.");
			return;
		}
		if (isNaN(stepTime)) {
			this.stepTime = defaultValues.stepTime;
			return;
		}

		this.stepTime = stepTime;
	}

	setRampStartTime(rampStartTime) {
		if (typeof rampStartTime !== "number") {
			console.log("Ramp start time parameter must be a number.");
			return;
		}
		if (isNaN(rampStartTime)) {
			this.rampStartTime = defaultValues.rampStartTime;
			return;
		}

		this.rampStartTime = rampStartTime;
	}

	setRampEndTime(rampEndTime) {
		if (typeof rampEndTime !== "number") {
			console.log("Ramp end time parameter must be a number.");
			return;
		}
		if (isNaN(rampEndTime)) {
			this.rampEndTime = defaultValues.rampEndTime;
			return;
		}

		this.rampEndTime = rampEndTime;
	}
}

export default Function;
