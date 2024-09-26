export default function getNumberOfPoints(length = 1, dt = 0.01) {
	return Math.round(length / dt);
}
