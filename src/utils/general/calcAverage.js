export default function calcAverage(...items) {
	const sum = items.reduce((total, current) => total + current, 0);
	return sum / items.length || 0;
}
