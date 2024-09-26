export default function roundValues(values = [], digits = 4) {
	return values.map((value) => Math.round(value * 10 ** digits) / 10 ** digits);
}
