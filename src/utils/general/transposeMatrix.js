export default function transposeMatrix(matrix) {
	const cols = matrix[0].length;
	const transposedArray = new Array(cols);

	for (let i = 0; i < cols; i++) {
		const signalData = matrix.map((row) => row[i]);
		transposedArray[i] = signalData;
	}

	return transposedArray;
}
