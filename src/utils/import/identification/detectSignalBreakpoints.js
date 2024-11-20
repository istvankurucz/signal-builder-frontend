function getDt(data) {
	const row0Time = parseFloat(data[0][0]);
	const row1Time = parseFloat(data[1][0]);

	return row1Time - row0Time;
}

function parseDataToNumbers(data) {
	return data.map((row) => row.map((element) => parseFloat(element)));
}

function transposeArray(array) {
	const cols = array[0].length;
	const transposedArray = new Array(cols);

	for (let i = 0; i < cols; i++) {
		const signalData = array.map((row) => row[i]);
		transposedArray[i] = signalData;
	}

	return transposedArray;
}

function calculateDifferences(data, dt) {
	return data.map((values) => {
		const differences = new Array(values.length - 1);
		values.forEach((value, i) => {
			if (i === 0) return;

			differences[i - 1] = (value - values[i - 1]) / dt;
		});

		return differences;
	});
}

function checkConst(differences, th) {
	let isConst = true;
	differences.forEach((difference) => {
		if (Math.abs(difference) > th) isConst = false;
	});

	return isConst;
}

function checkLinear(differences, th) {
	let isLinear = true;
	differences.forEach((difference, i) => {
		if (i === 0) return;

		if (Math.abs(difference - differences[i - 1]) > th) isLinear = false;
	});

	return isLinear;
}

function getFunctionType(differences, th) {
	if (checkConst(differences, th)) return "const";
	if (checkLinear(differences, th)) return "linear";
	return "sine";
}

function getInitialBreakpoints(differences, timeValues, windowSize, th) {
	return differences.map((diffs) => {
		const breakpoints = [];
		for (let i = 0; i < diffs.length - windowSize; i++) {
			const window = diffs.slice(i, i + windowSize);
			const newFunctionType = getFunctionType(window, th);

			if (breakpoints.length === 0) {
				breakpoints.push({ time: timeValues[i], type: newFunctionType });
			}
			if (newFunctionType !== breakpoints.at(-1).type) {
				breakpoints.push({ time: timeValues[i], type: newFunctionType });
			}
		}

		return breakpoints;
	});
}

function corrigateSineBreakpoints(breakpoints, windowSize, dt) {
	return breakpoints.map((signalBreakpoints) => {
		return signalBreakpoints.map((breakpoint) => {
			if (breakpoint.type === "sine") {
				const newTime = breakpoint.time + (windowSize - 1) * dt;
				return { ...breakpoint, time: newTime };
			}
			return breakpoint;
		});
	});
}

function filterBreakpoints(breakpoints, dt, th) {
	return breakpoints.map((signalBreakpoints) => {
		return signalBreakpoints.filter(
			(breakpoint, i) =>
				breakpoint.type !== "sine" ||
				i === signalBreakpoints.length - 1 ||
				Math.abs(breakpoint.time - signalBreakpoints[i + 1].time) > dt + th
		);
	});
}

function addEndBreakpoint(breakpoints, endTime) {
	return breakpoints.map((signalBreakpoints) => [
		...signalBreakpoints,
		{ time: endTime, type: "END" },
	]);
}

function getFinalBreakpoints(breakpoints, windowSize, dt, th, endTime) {
	// Corrigate the time values of sine breakpoints
	const corrigatedBreakpoints = corrigateSineBreakpoints(breakpoints, windowSize, dt);

	// Remove invalid sine breakpoints
	const fileredBreakpoint = filterBreakpoints(corrigatedBreakpoints, dt, th);

	// Add the END breakpoint
	const finalBreakpoints = addEndBreakpoint(fileredBreakpoint, endTime);

	return finalBreakpoints;
}

export default function detectSignalBreakpoints(data) {
	// Parameters
	const th = 1e-4;
	const windowSize = 7;
	const dt = getDt(data);

	// Convert the data to numbers
	const parsedData = parseDataToNumbers(data);

	// Group the data by signals
	const groupedData = transposeArray(parsedData);
	const timeData = groupedData[0];
	const signalsData = groupedData.slice(1);

	// Calculate the differences
	const signalsDifferences = calculateDifferences(signalsData, dt);

	// Calculate the breakpoints in first round
	const initialBreakpoints = getInitialBreakpoints(signalsDifferences, timeData, windowSize, th);

	// Filter breakpoints
	const finalBreakpoints = getFinalBreakpoints(
		initialBreakpoints,
		windowSize,
		dt,
		th,
		timeData.at(-1)
	);

	return finalBreakpoints;
}
