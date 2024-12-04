function compareFunction(a, b) {
	if (a > b) return 1;
	if (a < b) return -1;
	if (a === b) return 0;
}

export default function checkSameArrayValues(array1, array2) {
	const sortedArray1 = array1.toSorted(compareFunction);
	const sortedArray2 = array2.toSorted(compareFunction);

	return sortedArray1.join("") === sortedArray2.join("");
}
