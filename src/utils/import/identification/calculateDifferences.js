export default function calculateDifferences(data, dt) {
	return data.map((values) => {
		const differences = [];
		for (let i = 0; i < values.length - 1; i++) {
			differences.push((values[i + 1] - values[i]) / dt);
		}

		return differences;
	});
}
