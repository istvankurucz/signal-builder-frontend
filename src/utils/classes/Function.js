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
	//#region  Properties
	#id;
	#name;
	#type;
	#startTime;
	#length;
	#offset;
	#constValue;
	#keepLastValue;
	#slope;
	#frequency;
	#amplitude;
	#phase;
	#stepValue;
	#stepTime;
	#rampStartTime;
	#rampEndTime;
	//#endregion

	//#region Constructor
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
		this.#id = id;
		if (name === "") this.#name = `Function-${id}`;
		else this.#name = name;
		this.#type = type;
		this.#startTime = startTime;
		this.#length = length;
		this.#offset = offset;
		this.#constValue = constValue;
		this.#keepLastValue = keepLastValue;
		this.#slope = slope;
		this.#frequency = frequency;
		this.#amplitude = amplitude;
		this.#phase = phase;
		this.#stepValue = stepValue;
		this.#stepTime = stepTime;
		this.#rampStartTime = rampStartTime;
		this.#rampEndTime = rampEndTime;
	}
	//#endregion

	//#region Getters, setters
	// Id
	get id() {
		return this.#id;
	}

	// Name
	get name() {
		return this.#name;
	}
	set name(name) {
		try {
			if (typeof name !== "string") throw new Error("class/invalid-property-type");
			if (name === "") throw new Error("class/property-value-missing");

			this.#name = name;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: name");
		}
	}

	// Type
	get type() {
		return this.#type;
	}
	set type(type) {
		try {
			if (typeof type !== "string") throw new Error("class/invalid-property-type");
			if (!functionTypes.includes(type)) throw new Error("function/invalid-type");

			this.#type = type;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: type");
		}
	}

	// Start time
	get startTime() {
		return this.#startTime;
	}
	set startTime(startTime) {
		try {
			if (typeof startTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(startTime)) {
				this.#startTime = defaultValues.startTime;
				return;
			}

			this.#startTime = startTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: startTime");
		}
	}

	// Length
	get length() {
		return this.#length;
	}
	set length(length) {
		try {
			if (typeof length !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(length)) {
				this.#length = defaultValues.length;
				return;
			}

			this.#length = length;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: length");
		}
	}

	// Offset
	get offset() {
		return this.#offset;
	}
	set offset(offset) {
		try {
			if (typeof offset !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(offset)) {
				this.#offset = defaultValues.offset;
				return;
			}

			this.#offset = offset;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: offset");
		}
	}

	// Const value
	get constValue() {
		return this.#constValue;
	}
	set constValue(constValue) {
		try {
			if (typeof constValue !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(constValue)) {
				this.#constValue = defaultValues.constValue;
				return;
			}

			this.#constValue = constValue;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: constValue");
		}
	}

	// Keep last value
	get keepLastValue() {
		return this.#keepLastValue;
	}
	set keepLastValue(keepLastValue) {
		try {
			if (typeof keepLastValue !== "boolean") throw new Error("class/invalid-property-type");

			this.#keepLastValue = keepLastValue;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: keepLastValue");
		}
	}

	// Slope
	get slope() {
		return this.#slope;
	}
	set slope(slope) {
		try {
			if (typeof slope !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(slope)) {
				this.#slope = defaultValues.slope;
				return;
			}

			this.#slope = slope;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: slope");
		}
	}

	// Frequency
	get frequency() {
		return this.#frequency;
	}
	set frequency(frequency) {
		try {
			if (typeof frequency !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(frequency) || frequency <= 0) {
				this.#frequency = defaultValues.frequency;
				return;
			}

			this.#frequency = frequency;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: frequency");
		}
	}

	// Amplitude
	get amplitude() {
		return this.#amplitude;
	}
	set amplitude(amplitude) {
		try {
			if (typeof amplitude !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(amplitude) || amplitude <= 0) {
				this.#amplitude = defaultValues.amplitude;
				return;
			}

			this.#amplitude = amplitude;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: amplitude");
		}
	}

	// Phase
	get phase() {
		return this.#phase;
	}
	set phase(phase) {
		try {
			if (typeof phase !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(phase)) {
				this.#phase = defaultValues.phase;
				return;
			}

			this.#phase = phase;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: phase");
		}
	}

	// Step value
	get stepValue() {
		return this.#stepValue;
	}
	set stepValue(stepValue) {
		try {
			if (typeof stepValue !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(stepValue)) {
				this.#stepValue = defaultValues.stepValue;
				return;
			}

			this.#stepValue = stepValue;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: stepValue");
		}
	}

	// Step time
	get stepTime() {
		return this.#stepTime;
	}
	set stepTime(stepTime) {
		try {
			if (typeof stepTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(stepTime)) {
				this.#stepTime = defaultValues.stepTime;
				return;
			}

			this.#stepTime = stepTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: stepTime");
		}
	}

	// Ramp start time
	get rampStartTime() {
		return this.#rampStartTime;
	}
	set rampStartTime(rampStartTime) {
		try {
			if (typeof rampStartTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(rampStartTime)) {
				this.#rampStartTime = defaultValues.rampStartTime;
				return;
			}

			this.#rampStartTime = rampStartTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: rampStartTime");
		}
	}

	// Ramp end time
	get rampEndTime() {
		return this.#rampEndTime;
	}
	set rampEndTime(rampEndTime) {
		try {
			if (typeof rampEndTime !== "number") throw new Error("class/invalid-property-type");
			if (isNaN(rampEndTime)) {
				this.#rampEndTime = defaultValues.rampEndTime;
				return;
			}

			this.#rampEndTime = rampEndTime;
		} catch (e) {
			handleError(e.message, null, "Class: Function, property: rampEndTime");
		}
	}
	//#endregion

	//#region Methods
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			type: this.type,
			startTime: this.startTime,
			length: this.length,
			offset: this.offset,
			constValue: this.constValue,
			keepLastValue: this.keepLastValue,
			slope: this.slope,
			frequency: this.frequency,
			amplitude: this.amplitude,
			phase: this.phase,
			stepValue: this.stepValue,
			stepTime: this.stepTime,
			rampStartTime: this.rampStartTime,
			rampEndTime: this.rampEndTime,
		};
	}
	// #endregion
}

export default Function;
