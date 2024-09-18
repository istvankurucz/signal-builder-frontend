import generateId from "../general/generateId";

class Signal {
	static count = 1;

	constructor(
		id = generateId(),
		name = "",
		offset = 0,
		scale = { x: 1, y: 1 },
		functions = [],
		visible = true
	) {
		// Set the properties
		this.id = id;
		if (name === "") this.name = `Signal-${this.id}`;
		else this.name = name;
		this.offset = offset;
		this.scale = scale;
		this.functions = functions;
		this.visible = visible;

		// Increment count
		Signal.count++;
	}
}

export default Signal;
