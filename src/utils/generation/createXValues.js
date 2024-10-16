import roundValues from "./roundValues";

export default function createXValues(numberOfPoints = 1, startTime = 0, dt) {
	const xValues = new Array(numberOfPoints).fill(null).map((_, i) => startTime + i * dt);
	return roundValues(xValues);
}
