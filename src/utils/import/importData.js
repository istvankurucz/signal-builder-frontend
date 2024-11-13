import papa from "papaparse";

function getHeader(file, delimiter, headerRows) {
	return new Promise((resolve, reject) => {
		papa.parse(file, {
			delimiter,
			preview: headerRows,
			complete: ({ data }) => resolve(data),
			error: (e) => reject(e),
		});
	});
}

function getData(file, delimiter, headerRows) {
	return new Promise((resolve, reject) => {
		papa.parse(file, {
			delimiter,
			skipFirstNLines: headerRows,
			complete: ({ data }) => {
				// Remove the header rows
				for (let i = 0; i < headerRows; i++) {
					data.shift();
				}

				resolve(data);
			},
			error: (e) => reject(e),
		});
	});
}

export default async function importData(file, delimiter, headerRows) {
	const header = await getHeader(file, delimiter, headerRows);
	const data = await getData(file, delimiter, headerRows);

	return { header, data };
}
