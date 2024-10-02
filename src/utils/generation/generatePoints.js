import checkValidFunction from "../function/checkValidFunction";
import createXValues from "./createXValues";
import getNumberOfPoints from "./getNumberOfPoints";
import roundValues from "./roundValues";

const defaultDt = 0.01;

export default function generatePoints(func, dt = defaultDt) {
	// Check if the parameter is an instance of Function class
	if (!checkValidFunction(func)) return;

	switch (func.type) {
		case "const":
			return generateConstPoints(func.constValue, func.startTime, func.length, dt);
		case "linear":
			return generateLinearPoints(func.slope, func.offset, func.startTime, func.length, dt);
		case "sine":
			return generateSinePoints(
				func.frequency,
				func.amplitude,
				func.phase,
				func.offset,
				func.startTime,
				func.length,
				dt
			);
		case "step":
			return generateStepPoints(
				func.stepValue,
				func.stepTime,
				func.offset,
				func.startTime,
				func.length,
				dt
			);
		case "ramp-up":
			return generateRampUpPoints(
				func.rampStartTime,
				func.rampEndTime,
				func.slope,
				func.offset,
				func.startTime,
				func.length,
				dt
			);
	}
}

function generateConstPoints(constValue = 0, startTime = 0, length = 1, dt) {
	// Get the number of points
	const numberOfPoints = getNumberOfPoints(length, dt);

	// Create the x (time) values
	const xValues = createXValues(numberOfPoints, startTime, dt);

	// Create the y values
	const yValues = new Array(numberOfPoints).fill(null).map((_) => constValue);

	// Return the points in an object
	return { x: xValues, y: roundValues(yValues) };
}

function generateLinearPoints(slope = 1, offset = 0, startTime = 0, length = 1, dt) {
	// Get the number of points
	const numberOfPoints = getNumberOfPoints(length, dt);

	// Create the x (time) values
	const xValues = createXValues(numberOfPoints, startTime, dt);

	// Create the y values
	const yValues = new Array(numberOfPoints).fill(null).map((_, i) => offset + slope * dt * i);

	// Return the points in an object
	return { x: xValues, y: roundValues(yValues) };
}

function generateSinePoints(
	frequency = 1,
	amplitude = 1,
	phase = 0,
	offset = 0,
	startTime = 0,
	length = 1,
	dt
) {
	// Get the number of points
	const numberOfPoints = getNumberOfPoints(length, dt);

	// Create the x (time) values
	let xValues = new Array(numberOfPoints).fill(null).map((_, i) => i * dt);

	// Create the y values
	const yValues = new Array(numberOfPoints)
		.fill(null)
		.map(
			(_, i) =>
				amplitude * Math.sin(2 * Math.PI * frequency * xValues[i] - (phase / 180) * Math.PI) +
				offset
		);

	// Update x values
	xValues = createXValues(numberOfPoints, startTime, dt);

	// Return the points in an object
	return { x: xValues, y: roundValues(yValues) };
}

function generateStepPoints(
	stepValue = 1,
	stepTime = 0.5,
	offset = 0,
	startTime = 0,
	length = 1,
	dt
) {
	// Get the number of points
	const numberOfPoints = getNumberOfPoints(length, dt);

	// Create the x (time) values
	const xValues = createXValues(numberOfPoints, startTime, dt);

	// Create the y values
	const yValues = new Array(numberOfPoints).fill(null).map((_, i) => {
		if (xValues[i] <= stepTime) return offset;
		else return offset + stepValue;
	});

	// Return the points in an object
	return { x: xValues, y: roundValues(yValues) };
}

function generateRampUpPoints(
	rampStartTime = 0.25,
	rampEndTime = 0.75,
	slope = 1,
	offset = 0,
	startTime = 0,
	length = 1,
	dt
) {
	// Get the number of points
	const numberOfPoints = getNumberOfPoints(length, dt);

	// Create the x (time) values
	const xValues = createXValues(numberOfPoints, startTime, dt);

	// Create the y values
	const yValues = new Array(numberOfPoints).fill(null);
	for (let i = 0; i < numberOfPoints; i++) {
		if (xValues[i] <= rampStartTime) yValues[i] = offset;
		else if (xValues[i] > rampStartTime && xValues[i] <= rampEndTime) {
			if (i === 0) yValues[i] = offset;
			else yValues[i] = yValues[i - 1] + slope * dt;
		} else {
			if (i === 0) yValues[i] = offset;
			else yValues[i] = yValues[i - 1];
		}
	}

	// Return the points in an object
	return { x: xValues, y: roundValues(yValues) };
}
