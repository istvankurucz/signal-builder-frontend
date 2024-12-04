export default function hasNaN(array) {
	for (let i = 0; i < array.length; i++) {
		if (isNaN(array[i])) return true;
	}
	return false;
}
