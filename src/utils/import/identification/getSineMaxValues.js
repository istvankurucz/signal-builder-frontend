import hasNaN from "../../general/hasNaN";

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

function checkSineMin(values) {
	const middleIndex = Math.floor(values.length / 2);

	// Check real min
	let isMin = true;
	for (let i = 0; i < values.length - 1; i++) {
		if (i < middleIndex && values[i] < values[i + 1]) isMin = false;
		if (i >= middleIndex && values[i] > values[i + 1]) isMin = false;
	}

	return isMin;
}

function getInitialSineMaxValues(signalData, timeData, startTime, endTime, windowSize, type) {
	const windowMiddleIndex = Math.floor(windowSize / 2);

	const maxValues = [];
	for (let i = 0; i < signalData.length - windowSize; i++) {
		if (timeData[i] < startTime) continue;
		if (timeData[i + windowSize] >= endTime) break;

		const window = signalData.slice(i, i + windowSize);
		if (hasNaN(window)) continue;

		if (type === "max" && checkSineMax(window)) {
			maxValues.push({
				time: timeData[i + windowMiddleIndex],
				value: signalData[i + windowMiddleIndex],
			});
		}

		if (type === "min" && checkSineMin(window)) {
			maxValues.push({
				time: timeData[i + windowMiddleIndex],
				value: signalData[i + windowMiddleIndex],
			});
		}
	}

	return maxValues;
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

export default function getSineMaxValues(
	timeData,
	signalData,
	startTime,
	endTime,
	windowSize,
	dt,
	tolerance,
	type = "max"
) {
	const initialMaxValues = getInitialSineMaxValues(
		signalData,
		timeData,
		startTime,
		endTime,
		windowSize,
		type
	);
	// console.log("Initial max values:", initialMaxValues);

	return corrigateSineMaxValues(initialMaxValues, dt, tolerance);
}
