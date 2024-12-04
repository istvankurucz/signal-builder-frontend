export default function roundToTolerance(value, tolerance) {
	const digits = Math.ceil(Math.log10(1 / tolerance));
	const stringValue = value.toFixed(digits);
	return parseFloat(stringValue);
}
