export default function checkIfElementOverflows(element) {
	if (element == undefined) return false;

	return element.clientWidth < element.scrollWidth;
}
