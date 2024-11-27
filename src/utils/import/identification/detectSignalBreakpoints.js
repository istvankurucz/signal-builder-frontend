//#region Functions
// Returns the time between values
function getDt(data) {
	const row0Time = parseFloat(data[0][0]);
	const row1Time = parseFloat(data[1][0]);

	return row1Time - row0Time;
}

// Parses the string data to numbers
function parseDataToNumbers(data) {
	return data.map((row) => row.map((element) => parseFloat(element)));
}

// Transposes the data array -> data will be grouped by signals
function transposeArray(array) {
	const cols = array[0].length;
	const transposedArray = new Array(cols);

	for (let i = 0; i < cols; i++) {
		const signalData = array.map((row) => row[i]);
		transposedArray[i] = signalData;
	}

	return transposedArray;
}

// Returns the last valid value of the signal
function getLastTimeValueOfSignals(signalsData, timeData, dt) {
	return signalsData.map((signalData) => {
		const reversedData = signalData.toReversed();
		for (let i = 0; i < reversedData.length; i++) {
			if (!isNaN(reversedData[i])) return timeData[reversedData.length - i - 1] + dt;
		}

		return timeData[0];
	});
}

// Calculates the differences between consecutive values
function calculateDifferences(data, dt) {
	return data.map((values) => {
		const differences = [];
		for (let i = 0; i < values.length - 1; i++) {
			differences.push((values[i + 1] - values[i]) / dt);
		}

		return differences;
	});
}

// Checks if the array has NaN value
function hasNaN(array) {
	for (let i = 0; i < array.length; i++) {
		if (isNaN(array[i])) return true;
	}
	return false;
}

// Checks if the values (differences) represent the values of a constant function
function checkConst(differences, tolerance) {
	for (let i = 0; i < differences.length; i++) {
		if (isNaN(differences[i])) return false;
		if (Math.abs(differences[i]) > tolerance) return false;
	}
	return true;
}

// Checks if the values (differences) represent the values of a linear function
function checkLinear(differences, dt, tolerance) {
	const [differences2] = calculateDifferences([differences], dt);
	return checkConst(differences2, tolerance);
}

// Based on the differences return the type of the function
function getFunctionType(differences, dt, tolerance) {
	if (hasNaN(differences)) return "-";
	if (checkConst(differences, tolerance)) return "const";
	if (checkLinear(differences, dt, tolerance)) return "linear";
	return "sine";
}

// Returns the initial breakpoints
function getInitialBreakpoints(differences, timeValues, windowSize, dt, tolerance) {
	return differences.map((diffs) => {
		const breakpoints = [];
		for (let i = 0; i < diffs.length - windowSize; i++) {
			const window = diffs.slice(i, i + windowSize);
			const newFunctionType = getFunctionType(window, dt, tolerance);

			// Check if the function type is valid
			if (newFunctionType === "-") continue;

			// If there is no breakpoint then add the first one
			if (breakpoints.length === 0) {
				breakpoints.push({ startTime: timeValues[i], type: newFunctionType });
				continue;
			}

			// If there is a new function type then add it
			if (newFunctionType !== breakpoints.at(-1).type) {
				breakpoints.push({ startTime: timeValues[i], type: newFunctionType });
			}
		}

		return breakpoints;
	});
}

// Adds an offset to type=sine breakpoints (offset comes from breakpoint detection method)
function offsetSineBreakpoints(breakpoints, windowSize, dt) {
	return breakpoints.map((signalBreakpoints) => {
		return signalBreakpoints.map((breakpoint, i) => {
			if (breakpoint.type === "sine" && i !== 0) {
				const newTime = breakpoint.startTime + (windowSize - 1) * dt;
				return { ...breakpoint, startTime: newTime };
			}
			return breakpoint;
		});
	});
}

// Removes the useless sine breakpoints (behaviour comes from breakpoint detection method)
function filterBreakpoints(breakpoints, dt, tolerance) {
	return breakpoints.map((signalBreakpoints) => {
		return signalBreakpoints.filter(
			(breakpoint, i) =>
				breakpoint.type !== "sine" ||
				i === signalBreakpoints.length - 1 ||
				Math.abs(breakpoint.startTime - signalBreakpoints[i + 1].startTime) > dt + tolerance
		);
	});
}

// Adds an END breakpoint to the end of the list (represents the last valid value of the signal)
function addEndBreakpoint(breakpoints, lastTimeValues) {
	return breakpoints.map((signalBreakpoints, i) => [
		...signalBreakpoints,
		{ startTime: lastTimeValues[i], type: "END" },
	]);
}

// Returns the breakpoints of different typed functions
function getFunctionTypeBreakpoints(breakpoints, windowSize, dt, tolerance, lastTimeValues) {
	// Corrigate the time values of sine breakpoints
	const corrigatedBreakpoints = offsetSineBreakpoints(breakpoints, windowSize, dt);

	// Remove invalid sine breakpoints
	const fileredBreakpoints = filterBreakpoints(corrigatedBreakpoints, dt, tolerance);

	// Add the END breakpoint
	const finalBreakpoints = addEndBreakpoint(fileredBreakpoints, lastTimeValues);

	return finalBreakpoints;
}

function checkSineMax(values) {
	const middleIndex = Math.floor(values.length / 2);

	// Check real max
	let isMax = true;
	for (let i = 0; i < values.length - 1; i++) {
		if (i < middleIndex && values[i] > values[i + 1]) isMax = false;
		if (i >= middleIndex && values[i] < values[i + 1]) isMax = false;
	}

	return isMax;
}

function getInitialSineMaxValues(signalData, timeData, startTime, endTime, windowSize) {
	const windowMiddleIndex = Math.floor(windowSize / 2);

	const maxValues = [];
	for (let i = 0; i < signalData.length - windowSize; i++) {
		if (timeData[i] < startTime) continue;
		if (timeData[i + windowSize] >= endTime) break;

		const window = signalData.slice(i, i + windowSize);
		if (hasNaN(window)) continue;

		if (checkSineMax(window)) {
			maxValues.push({
				time: timeData[i + windowMiddleIndex],
				value: signalData[i + windowMiddleIndex],
			});
		}
	}

	return maxValues;
}

function checkNewMax(maxValue1, maxValue2, tolerance) {
	return Math.abs(maxValue1 - maxValue2) > tolerance;
}

function corrigateSineMaxValues(maxValues, dt, tolerance) {
	const corrigatedMaxValues = [];
	for (let i = 0; i < maxValues.length; i++) {
		if (i === maxValues.length - 1) {
			corrigatedMaxValues.push(maxValues[i]);
			break;
		}

		if (Math.abs(maxValues[i].time - maxValues[i + 1].time) < dt + tolerance) {
			const newMaxValue = (maxValues[i].value + maxValues[i + 1].value) / 2;
			corrigatedMaxValues.push({ time: maxValues[i].time, value: newMaxValue });
			i++;
		} else corrigatedMaxValues.push(maxValues[i]);
	}

	return corrigatedMaxValues;
}

function findSineBreakpoints(maxValues, dt, tolerances) {
	function addBreakpoint(maxValueIndex) {
		const startTime = (maxValues[maxValueIndex].time + maxValues[maxValueIndex + 1].time) / 2;
		breakpoints.push({ startTime, type: "sine" });
	}

	const breakpoints = [];
	let lastFrequency = null;
	for (let i = 0; i < maxValues.length - 1; i++) {
		if (lastFrequency == null) {
			lastFrequency = maxValues[i + 1].time - maxValues[i].time;
		}

		// Amplitude check
		if (checkNewMax(maxValues[i].value, maxValues[i + 1].value, tolerances.amplitude)) {
			addBreakpoint(i);
			lastFrequency = null;
			continue;
		}

		// Frequency check
		const newFrequency = maxValues[i + 1].time - maxValues[i].time;
		if (Math.abs(newFrequency - lastFrequency) > 2 * dt + tolerances.frequency) {
			addBreakpoint(i);
			lastFrequency = null;
		} else lastFrequency = newFrequency;
	}

	return breakpoints;
}

function getFinalBreakpoints(signalsData, timeData, breakpoints, windowSize, dt, tolerances) {
	return signalsData.map((signalData, i) => {
		const newBreakpoints = [];
		// console.log(i + 1, ". signal:");

		for (let j = 0; j < breakpoints[i].length - 1; j++) {
			newBreakpoints.push(breakpoints[i][j]);

			if (breakpoints[i][j].type === "sine") {
				// Get the max values of sine
				const initialMaxValues = getInitialSineMaxValues(
					signalData,
					timeData,
					breakpoints[i][j].startTime,
					breakpoints[i][j + 1].startTime,
					windowSize
				);
				// console.log("Initial max values:", initialMaxValues);

				const maxValues = corrigateSineMaxValues(initialMaxValues, dt, tolerances.amplitude);
				// console.log("Corrigated max values:", maxValues);

				// Calculate the sine breakpoints
				const sineBreakpoints = findSineBreakpoints(maxValues, dt, tolerances);
				// console.log("Sine breakpoints:", sineBreakpoints);

				// Add the new breakpoints to the array
				sineBreakpoints.forEach((breakpoint) => newBreakpoints.push(breakpoint));
			}
		}

		return newBreakpoints;
	});
}
//#endregion

export default function detectSignalBreakpoints(data, windowSize, tolerances) {
	// Parameters
	tolerances = {
		...tolerances,
		general: 1e-4,
	};
	const dt = getDt(data);

	// Convert the data to numbers
	const parsedData = parseDataToNumbers(data);

	// Group the data by signals
	const groupedData = transposeArray(parsedData);
	const timeData = groupedData[0];
	const signalsData = groupedData.slice(1);
	const lastTimeValues = getLastTimeValueOfSignals(signalsData, timeData, dt);

	// Calculate the differences
	const signalsDifferences = calculateDifferences(signalsData, dt);

	// Calculate the breakpoints in first round
	const initialBreakpoints = getInitialBreakpoints(
		signalsDifferences,
		timeData,
		windowSize,
		dt,
		tolerances.general
	);

	// Filter breakpoints
	const functionTypeBreakpoints = getFunctionTypeBreakpoints(
		initialBreakpoints,
		windowSize,
		dt,
		tolerances.general,
		lastTimeValues
	);
	console.log("Filtered breakpoints:\n", functionTypeBreakpoints);

	// Find breakpoints inside sines
	const finalBreakpoints = getFinalBreakpoints(
		signalsData,
		timeData,
		functionTypeBreakpoints,
		windowSize,
		dt,
		tolerances
	);

	return finalBreakpoints;
}
