import generateId from "../general/generateId";
import checkValidFunctions from "../function/checkValidFunctions";
import handleError from "../error/handleError";

class Signal {
	// #region Properties
	#id;
	#name;
	#offset;
	#scale;
	#functions;
	#autoSort;
	#reverseTime;
	#visible;

	static count = 1;
	// #endregion

	// #region Constructor
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
		this.#id = id;
		if (name === "") this.#name = `Signal-${this.#id}`;
		else this.#name = name;
		this.#offset = offset;
		this.#scale = scale;
		this.#functions = functions;
		this.#autoSort = autoSort;
		this.#reverseTime = reverseTime;
		this.#visible = visible;

		// Increment count
		Signal.count++;
	}
	// #endregion

	// #region Getters, setters
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
			handleError(e.message, null, "Class: Signal, property: name");
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
				this.#offset = 0;
				return;
			}

			this.#offset = offset;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: offset");
		}
	}

	// Scale
	get scale() {
		return this.#scale;
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
				if (isNaN(scale.x)) this.#scale = { ...this.#scale, x: 1 };
				if (isNaN(scale.y)) this.#scale = { ...this.#scale, y: 1 };
				return;
			}

			this.#scale = scale;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: scale");
		}
	}

	// Functions
	get functions() {
		return this.#functions;
	}
	set functions(functions) {
		try {
			if (functions.constructor !== Array) throw new Error("class/invalid-property-type");
			if (!checkValidFunctions(functions)) throw new Error("class/not-an-instance");

			this.#functions = functions;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: functions");
		}
	}

	// Auto sort
	get autoSort() {
		return this.#autoSort;
	}
	set autoSort(autoSort) {
		try {
			if (typeof autoSort !== "boolean") throw new Error("class/invalid-property-type");

			this.#autoSort = autoSort;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: autosort");
		}
	}

	// Reverse time
	get reverseTime() {
		return this.#reverseTime;
	}
	set reverseTime(reverseTime) {
		try {
			if (reverseTime != null && typeof reverseTime !== "number") {
				throw new Error("class/invalid-property-type");
			}
			if (isNaN(reverseTime)) {
				this.#reverseTime = null;
				return;
			}

			this.#reverseTime = reverseTime;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: reverseTime");
		}
	}

	// Visible
	get visible() {
		return this.#visible;
	}
	set visible(visible) {
		try {
			if (typeof visible !== "boolean") throw new Error("class/invalid-property-type");

			this.#visible = visible;
		} catch (e) {
			handleError(e.message, null, "Class: Signal, property: visible");
		}
	}
	//#endregion

	//#region Methods
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			offset: this.offset,
			scale: this.scale,
			functions: this.functions.map((func) => func.toJSON()),
			autoSort: this.autoSort,
			reverseTime: this.reverseTime,
			visible: this.visible,
		};
	}
	//#endregion
}

export default Signal;
