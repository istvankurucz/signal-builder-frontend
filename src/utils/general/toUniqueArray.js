export default function toUniqueArray(array = []) {
	return array.filter((element, i) => array.indexOf(element) === i);
}
