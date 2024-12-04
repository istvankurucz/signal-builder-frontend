export default function getDt(timeData) {
	const time0 = parseFloat(timeData[0]);
	const time1 = parseFloat(timeData[1]);

	return time1 - time0;
}
