import generateId from "../general/generateId";

class Function {
	constructor(
		id = generateId(),
		name = "",
		type = "const",
		startTime = 0,
		length = 1,
		offset = 0,
		constValue = 0,
		slope = 1,
		frquency = 1,
		amplitude = 1,
		phase = 0,
		stepValue = 0,
		stepTime = 0,
		rampStartTime = 0,
		rampEndTime = 0
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
		this.frquency = frquency;
		this.amplitude = amplitude;
		this.phase = phase;
		this.stepValue = stepValue;
		this.stepTime = stepTime;
		this.rampStartTime = rampStartTime;
		this.rampEndTime = rampEndTime;
	}
}

export default Function;
