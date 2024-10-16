export default function generateExportFileName() {
	const isoString = new Date().toISOString();
	const dateString = isoString.substring(0, 10).replaceAll("-", "");
	const timeString = isoString.substring(11, 19).replaceAll(":", "");

	return `exported-data-${dateString}-${timeString}`;
}
