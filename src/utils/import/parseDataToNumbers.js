export default function parseDataToNumbers(data) {
	return data.map((row) => row.map((element) => parseFloat(element)));
}
