import { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import useSignal from "./useSignal";
import updateSignals from "../../utils/signal/updateSignals";

function useSignalProperties() {
	//#region States
	// Signals from local state
	const [{ signals }, dispatch] = useStateValue();
	// Selected signal
	const signal = useSignal();
	// Signal properties
	const [name, setName] = useState("");
	const [offset, setOffset] = useState(0);
	const [scale, setScale] = useState({ x: 1, y: 1 });
	const [hasReverseTime, setHasReverseTime] = useState(false);
	const [reverseTime, setReverseTime] = useState(null);
	// Name of the last updated property
	const [lastUpdated, setLastUpdated] = useState("");
	//#endregion

	//#region Refs
	const timeoutRef = useRef();
	//#endregion

	//#region Variables
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

		// Create a timeout to update the property
		timeoutRef.current = setTimeout(() => {
			// Update the property of the Signal instance
			updateProperty(property, value);
		}, timeoutTime);
	}

	function checkIfPropertyUpdateIsNeeded(property, value) {
		if (property === "name") return false;
		if (property === "hasReverseTime" && value === true) return false;

		return true;
	}

	function updateInputValue(property, value) {
		// Based on the given property update the appropriate state
		switch (property) {
			case "name":
				setName(value);
				break;
			case "offset":
				setOffset(value);
				break;
			case "scale":
				setScale(value);
				break;
			case "hasReverseTime":
				setHasReverseTime(value);
				if (value === false) setReverseTime("");
				break;
			case "reverseTime":
				setReverseTime(value);
				break;
			default:
				console.log(`The given property (${property}) is not found: `);
		}
	}

	function updateProperty(property, value) {
		// Based on the given property update the appropriate property of the Signal
		switch (property) {
			case "name":
				signal.name = value;
				break;
			case "offset":
				signal.offset = parseFloat(value);
				break;
			case "scale":
				const scale = { x: parseFloat(value.x), y: parseFloat(value.y) };
				signal.scale = scale;
				break;
			case "hasReverseTime":
				if (value === false) signal.reverseTime = null;
				break;
			case "reverseTime":
				signal.reverseTime = parseFloat(value);
				break;
			default:
				console.log("Signal class does not have the given property: ", property);
		}

		// Update signals array
		updateSignals(signals, dispatch);
	}
	//#endregion

	//#region Effect
	useEffect(() => {
		// Check if there is a signal
		if (signal == null) return;

		// Initialize the states with the real values of the Signal
		setName(signal.name);
		setOffset(signal.offset);
		setScale(signal.scale);
		setHasReverseTime(signal.reverseTime != null);
		setReverseTime(signal.reverseTime == null ? "" : signal.reverseTime);
	}, [signal]);
	//#endregion

	return {
		name,
		offset,
		scale,
		hasReverseTime,
		reverseTime,
		changeValue,
		updateInputValue,
		updateSignalProperty: updateProperty,
	};
}

export default useSignalProperties;
