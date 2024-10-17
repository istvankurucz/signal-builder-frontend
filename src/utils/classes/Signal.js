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
		autoSort = false,
		reverseTime = null,
		visible = true
	) {
		// Set the properties
		this._id = id;
		if (name === "") this._name = `Signal-${this._id}`;
		else this._name = name;
		this._offset = offset;
		this._scale = scale;
		this._functions = functions;
		this._autoSort = autoSort;
		this._reverseTime = reverseTime;
		this._visible = visible;

		// Increment count
		Signal.count++;
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

	// Offset
	get offset() {
		return this._offset;
	}
	set offset(offset) {
		if (typeof offset !== "number") {
			console.log("Offset parameter must be a number");
			return;
		}

		if (isNaN(offset)) {
			this.offset = 0;
			return;
		}

		this._offset = offset;
	}

	// Scale
	get scale() {
		return this._scale;
	}
	set scale(scale) {
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
			this._scale.x = 1;
			return;
		}
		if (isNaN(scale.y)) {
			this._scale.y = 1;
			return;
		}

		if (isNaN(scale.x) || isNaN(scale.y)) {
			if (isNaN(scale.x)) this._scale = { ...this._scale, x: 1 };
			if (isNaN(scale.y)) this._scale = { ...this._scale, y: 1 };

			return;
		}

		this._scale = scale;
	}

	// Functions
	get functions() {
		return this._functions;
	}
	set functions(functions) {
		if (functions.constructor !== Array) {
			console.log("The given parameter in not an array.");
			return;
		}
		if (!checkValidFunctions(functions)) {
			console.log("The given parameters are not valid instances of class Function.");
			return;
		}

		this._functions = functions;
	}

	// Auto sort
	get autoSort() {
		return this._autoSort;
	}
	set autoSort(autoSort) {
		if (typeof autoSort !== "boolean") {
			console.log("AutoSort parameter must be a boolean.");
			return;
		}

		this._autoSort = autoSort;
	}

	get reverseTime() {
		return this._reverseTime;
	}
	set reverseTime(reverseTime) {
		if (reverseTime != null && typeof reverseTime !== "number") {
			console.log("Reverse time parameter must be a number or null");
			return;
		}

		if (isNaN(reverseTime)) {
			this._reverseTime = null;
		}

		this._reverseTime = reverseTime;
	}

	// Visible
	get visible() {
		return this._visible;
	}
	set visible(visible) {
		if (typeof visible !== "boolean") {
			console.log("Visible parameter must be a boolean.");
			return;
		}

		this._visible = visible;
	}
}

export default Signal;
