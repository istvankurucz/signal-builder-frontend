export default function swapArrayElements(array, firstIndex, secondIndex) {
	const temp = array[firstIndex];
	array[firstIndex] = array[secondIndex];
	array[secondIndex] = temp;

	return array;
}
