import { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";

function useSampling() {
	// #region States
	const [{ sampling }, dispatch] = useStateValue();
	const [samplingValue, setSamplingValue] = useState(sampling);
	//#endregion

	//#region Refs
	const timeoutRef = useRef();
	//#endregion

	//#region Functions
	function setSampling(e) {
		// Set the value of the input
		setSamplingValue(e.target.value);

		// Clear the timeout
		clearTimeout(timeoutRef.current);

		// Set a new timer
		timeoutRef.current = setTimeout(() => {
			// Get the input value
			const newSampling = parseFloat(e.target.value);

			// Change the sampling
			if (isNaN(newSampling)) dispatch({ type: "SET_SAMPLING", sampling: 100 });
			else dispatch({ type: "SET_SAMPLING", sampling: newSampling });
		}, 1000);
	}
	//#endregion

	// Update the sampling in every sampling input
	useEffect(() => {
		if (sampling !== parseFloat(samplingValue)) setSamplingValue(sampling);
	}, [sampling]);

	return [samplingValue, setSampling];
}

export default useSampling;
