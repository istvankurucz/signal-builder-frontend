import generateId from "../general/generateId";
import checkValidFunctions from "../function/checkValidFunctions";
import handleError from "../error/handleError";

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
		try {
			if (typeof name !== "string") throw new Error("class/invalid-property-type");
			if (name === "") throw new Error("class/property-value-missing");

			this._name = name;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: name");
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
				this.offset = 0;
				return;
			}

			this._offset = offset;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: offset");
		}
	}

	// Scale
	get scale() {
		return this._scale;
	}
	set scale(scale) {
		try {
			if (typeof scale !== "object") throw new Error("class/invalid-property-type");

			if (!scale.hasOwnProperty("x") || !scale.hasOwnProperty("y")) {
				throw new Error("class/invalid-property-value");
			}

			if (typeof scale.x !== "number" || typeof scale.y !== "number") {
				throw new Error("class/invalid-property-type");
			}

			if (isNaN(scale.x) || isNaN(scale.y)) {
				if (isNaN(scale.x)) this._scale = { ...this._scale, x: 1 };
				if (isNaN(scale.y)) this._scale = { ...this._scale, y: 1 };
				return;
			}

			this._scale = scale;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: scale");
		}
	}

	// Functions
	get functions() {
		return this._functions;
	}
	set functions(functions) {
		try {
			if (functions.constructor !== Array) throw new Error("class/invalid-property-type");
			if (!checkValidFunctions(functions)) throw new Error("class/not-an-instance");

			this._functions = functions;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: functions");
		}
	}

	// Auto sort
	get autoSort() {
		return this._autoSort;
	}
	set autoSort(autoSort) {
		try {
			if (typeof autoSort !== "boolean") throw new Error("class/invalid-property-type");

			this._autoSort = autoSort;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: autosort");
		}
	}

	// Reverse time
	get reverseTime() {
		return this._reverseTime;
	}
	set reverseTime(reverseTime) {
		try {
			if (reverseTime != null && typeof reverseTime !== "number") {
				throw new Error("class/invalid-property-type");
			}
			if (isNaN(reverseTime)) {
				this._reverseTime = null;
				return;
			}

			this._reverseTime = reverseTime;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: reverseTime");
		}
	}

	// Visible
	get visible() {
		return this._visible;
	}
	set visible(visible) {
		try {
			if (typeof visible !== "boolean") throw new Error("class/invalid-property-type");

			this._visible = visible;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: visible");
		}
	}
}

export default Signal;
