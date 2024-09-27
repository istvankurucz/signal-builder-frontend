import createXValues from "./createXValues";
import getMinMaxXValue from "./getMinMaxXValue";
import getNumberOfPoints from "./getNumberOfPoints";

export default function sortSignalPoints(signalPoints = []) {
	// Check if there are any points
	if (signalPoints.length === 0) return { x: [], y: [] };

	// Difference between x (time) values
	const dt = signalPoints[0].x[1] - signalPoints[0].x[0];

	// Get the min and max x value
	const { minX, maxX } = getMinMaxXValue(signalPoints);

	// Calculate the number of the points
	const numberOfPoints = getNumberOfPoints(maxX - minX + dt, dt);

	// Create the x, y values for the whole signal
	const xValues = createXValues(numberOfPoints, minX, dt);
	const yValues = new Array(numberOfPoints).fill(null);

	// Sort the signal points
	signalPoints.forEach((functionPoints) => {
		const index = xValues.indexOf(functionPoints.x[0]);

		for (let i = index; i < index + functionPoints.x.length; i++) {
			yValues[i] = functionPoints.y[i - index];
		}
	});

	// Return the sorted values
	return { x: xValues, y: yValues };
}
