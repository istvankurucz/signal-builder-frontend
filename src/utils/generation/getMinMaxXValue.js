export default function getMinMaxXValue(pointsArray = []) {
	// Get the lowest x value
	const firstXValues = pointsArray.map((points) => points.x[0]);
	const minX = Math.min(...firstXValues);

	// Get the highest x value
	const lastXValues = pointsArray.map((points) => points.x[points.x.length - 1]);
	const maxX = Math.max(...lastXValues);

	return { minX, maxX };
}
