import { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import updateSignals from "../../utils/signal/updateSignals";
import functionTypes from "../../assets/function/functionTypes";
import handleError from "../../utils/error/handleError";

function useFunctionProperties(func) {
	//#region States
	// Signals from local state
	const [{ signals }, dispatch] = useStateValue();
	// Function properties
	const [name, setName] = useState("");
	const [typeIndex, setTypeIndex] = useState(-1);
	const [startTime, setStarTime] = useState(0);
	const [length, setLength] = useState(1);
	const [offset, setOffset] = useState(0);
	const [constValue, setConstValue] = useState(0);
	const [keepLastValue, setKeepLastValue] = useState(false);
	const [slope, setSlope] = useState(1);
	const [frequency, setFrequency] = useState(1);
	const [amplitude, setAmplitude] = useState(1);
	const [phase, setPhase] = useState(0);
	const [stepValue, setStepValue] = useState(1);
	const [stepTime, setStepTime] = useState(0.5);
	const [rampStartTime, setRampStartTime] = useState(0.25);
	const [rampEndTime, setRampEndTime] = useState(0.75);
	// Name of the last updated property
	const [lastUpdated, setLastUpdated] = useState("");
	//#endregion

	//#region Refs
	const timeoutRef = useRef();
	//#endregion

	//#region Variables
	const immediatelyUpdatableProperties = ["type", "keepLastValue"];
	const timeoutTime = 1000; // ms
	//#endregion

	//#region Functions
	function changeValue(property, value) {
		// Update the value of the input field
		updateInputValue(property, value);

		// If the property is name then only update the value of the input field
		if (!checkIfPropertyUpdateIsNeeded(property, value)) return;

		// Clear the timeout if the same property is updated as before
		if (property === lastUpdated) clearTimeout(timeoutRef.current);

		// Update the last updated property if a new property is changed than the previous one
		if (property !== lastUpdated) setLastUpdated(property);

		// Check if the property needs to be updated immediately
		if (immediatelyUpdatableProperties.includes(property)) {
			// Update the property of the Function instance
			updateProperty(property, value);

			return;
		}

		// Create a timeout to update the property
		timeoutRef.current = setTimeout(() => {
			// Update the property of the Function instance
			updateProperty(property, value);
		}, timeoutTime);
	}

	function checkIfPropertyUpdateIsNeeded(property) {
		if (property === "name") return false;

		return true;
	}

	function updateInputValue(property, value) {
		try {
			switch (property) {
				case "name":
					setName(value);
					break;
				case "type":
					break;
				case "startTime":
					setStarTime(value);
					break;
				case "length":
					setLength(value);
					break;
				case "offset":
					setOffset(value);
					break;
				case "constValue":
					setConstValue(value);
					break;
				case "keepLastValue":
					setKeepLastValue(value);
					break;
				case "slope":
					setSlope(value);
					break;
				case "frequency":
					setFrequency(value);
					break;
				case "amplitude":
					setAmplitude(value);
					break;
				case "phase":
					setPhase(value);
					break;
				case "stepValue":
					setStepValue(value);
					break;
				case "stepTime":
					setStepTime(value);
					break;
				case "rampStartTime":
					setRampStartTime(value);
					break;
				case "rampEndTime":
					setRampEndTime(value);
					break;
				default:
					throw new Error("class/invalid-property");
			}
		} catch (e) {
			handleError(e.message, dispatch);
		}
	}

	function updateProperty(property, value) {
		try {
			switch (property) {
				case "name":
					func.name = value;
					break;
				case "type":
					func.type = functionTypes[typeIndex];
					break;
				case "startTime":
					func.startTime = parseFloat(value);
					break;
				case "length":
					func.length = parseFloat(value);
					break;
				case "offset":
					func.offset = parseFloat(value);
					break;
				case "constValue":
					func.constValue = parseFloat(value);
					break;
				case "keepLastValue":
					func.keepLastValue = value;
					break;
				case "slope":
					func.slope = parseFloat(value);
					break;
				case "frequency":
					func.frequency = parseFloat(value);
					break;
				case "amplitude":
					func.amplitude = parseFloat(value);
					break;
				case "phase":
					func.phase = parseFloat(value);
					break;
				case "stepValue":
					func.stepValue = parseFloat(value);
					break;
				case "stepTime":
					func.stepTime = parseFloat(value);
					break;
				case "rampStartTime":
					func.rampStartTime = parseFloat(value);
					break;
				case "rampEndTime":
					func.rampEndTime = parseFloat(value);
					break;
				default:
					throw new Error("class/invalid-property");
			}
		} catch (e) {
			handleError(e.message, dispatch);
		}

		// Update signals array
		updateSignals(signals, dispatch);
	}

	// Update the type property whenever typeIndex changes
	useEffect(() => {
		if (typeIndex === -1) return;

		updateProperty("type", null);
	}, [typeIndex, functionTypes]);

	//#region Effect
	useEffect(() => {
		// Check if there is a function
		if (func == null) return;

		// Initialize the states with the real values of the Function
		setName(func.name);
		setTypeIndex(functionTypes.indexOf(func.type));
		setStarTime(func.startTime);
		setLength(func.length);
		setOffset(func.offset);
		setConstValue(func.constValue);
		setKeepLastValue(func.keepLastValue);
		setSlope(func.slope);
		setFrequency(func.frequency);
		setAmplitude(func.amplitude);
		setPhase(func.phase);
		setStepValue(func.stepValue);
		setStepTime(func.stepTime);
		setRampStartTime(func.rampStartTime);
		setRampEndTime(func.rampEndTime);
	}, [func, functionTypes]);
	//#endregion

	return {
		name,
		typeIndex,
		setTypeIndex,
		startTime,
		length,
		offset,
		constValue,
		keepLastValue,
		slope,
		frequency,
		amplitude,
		phase,
		stepValue,
		stepTime,
		rampStartTime,
		rampEndTime,
		changeValue,
		updateFunctionProperty: updateProperty,
	};
}

export default useFunctionProperties;
