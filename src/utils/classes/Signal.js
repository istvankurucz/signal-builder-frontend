import generateId from "../general/generateId";
import checkValidFunctions from "../function/checkValidFunctions";

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

	setOffset(offset) {
		if (typeof offset !== "number") {
			console.log("Offset parameter must be a number");
			return;
		}

		if (isNaN(offset)) {
			this.offset = 0;
			return;
		}

		this.offset = offset;
	}

	setScale(scale) {
		if (typeof scale !== "object") {
			console.log("Scale parameter must be an object.");
			return;
		}
		if (!scale.hasOwnProperty("x") || !scale.hasOwnProperty("y")) {
			console.log("Scale parameter must have an 'x' and a 'y' property.");
			return;
		}
		if (typeof scale.x !== "number" || typeof scale.y !== "number") {
			console.log("The values (x, y) for scale must be numbers.");
			return;
		}
		if (isNaN(scale.x)) {
			this.scale.x = 1;
			return;
		}
		if (isNaN(scale.y)) {
			this.scale.y = 1;
			return;
		}

		if (isNaN(scale.x) || isNaN(scale.y)) {
			if (isNaN(scale.x)) this.scale = { ...this.scale, x: 1 };
			if (isNaN(scale.y)) this.scale = { ...this.scale, y: 1 };

			return;
		}

		this.scale = scale;
	}

	setFunctions(functions) {
		if (functions.constructor !== Array) {
			console.log("The given parameter in not an array.");
			return;
		}
		if (!checkValidFunctions(functions)) {
			console.log("The given parameters are not valid instances of class Function.");
			return;
		}

		this.functions = functions;
	}

	setVisible(visible) {
		if (typeof visible !== "boolean") {
			console.log("Visible parameter must be a boolean.");
			return;
		}

		this.visible = visible;
	}
}

export default Signal;
