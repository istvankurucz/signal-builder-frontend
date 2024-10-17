import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import getNumberOfPoints from "../../utils/generation/getNumberOfPoints";
import createXValues from "../../utils/generation/createXValues";
import chartColors from "../../assets/chart/chartColors";

function useMainChart() {
	//#region States
	const [{ signals, sampling }] = useStateValue();
	const [data, setData] = useState({ labels: [], datasets: [] });
	//#endregion

	//#region Variables
	const dt = Math.round((1 / sampling) * 10000) / 10000;

	const options = {
		animation: false,
		responsive: true,
		elements: {
			line: {
				backgroundColor: "blue",
				borderColor: "red",
				borderWidth: 2,
			},
			point: {
				radius: 0,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Time [s]",
					padding: {
						top: 0,
						bottom: 0,
					},
				},
				// ticks: {
				// 	callback: (_, index) => timeValues[index].toFixed(2),
				// },
			},
			y: {
				// title: {
				// 	display: true,
				// 	text: "Value",
				// },
			},
		},
		plugins: {
			title: {
				display: false,
				text: "Numbers",
				font: {
					size: 20,
				},
				color: "black",
			},
			legend: {
				display: false,
			},
		},
	};
	//#endregion

	//#region Functions
	function getSignalsMinMax(signals = []) {
		// Init min and max variables
		let minX = Number.POSITIVE_INFINITY;
		let maxX = Number.NEGATIVE_INFINITY;

		// Loop through every signal
		signals.forEach((signal) => {
			// If the signal is not visible skip it
			if (!signal.visible) return;

			// Find the min and max
			signal.functions.forEach((func) => {
				if (func.startTime < minX) minX = func.startTime;
				if (func.startTime + func.length > maxX) maxX = func.startTime + func.length;
			});
		});

		// Return the actual min, max values
		return { minX, maxX };
	}

	function checkSignalsMinMax(minX, maxX) {
		if (!Number.isFinite(minX) || !Number.isFinite(maxX)) {
			// Update the data state
			setData((data) => ({ ...data, datasets: [] }));

			return false;
		}

		return true;
	}

	function getMaxReverseTime(signals = []) {
		const reverseTimes = signals
			.filter((signal) => signal.reverseTime != null)
			.map((signal) => signal.reverseTime);

		if (reverseTimes.length === 0) return null;

		return Math.max(...reverseTimes);
	}

	function getStartIndex(xValues = [], startTime) {
		// Init index
		let index = 0;

		// While the start time os lower than a value in xValues -> increment the index
		while (startTime > xValues[index]) {
			index++;
		}

		// Return the index
		return index;
	}

	function createYValues(signals = [], xValues = []) {
		return signals.map((signal) => {
			// Skip the signal if it is hidden
			if (!signal.visible) return { properties: signal, points: [] };

			// Init an array for y values of signal
			const yValues = new Array(xValues.length).fill(null);

			// Loop through the functions of the signal
			signal.functions.forEach((func) => {
				const startIndex = getStartIndex(xValues, func.startTime);

				const pointsLength = getNumberOfPoints(func.length, dt);
				for (let i = 0; i < pointsLength; i++) {
					const j = startIndex + i; // absolute index (from the beginning of xValues)
					const dx = xValues[j] - func.startTime; // time from the function's startTime property
					const offset = signal.offset + func.offset; // offset of the signal and function

					// Update the yValues array based on function type
					switch (func.type) {
						case "const":
							yValues[j] = func.constValue + signal.offset;
							break;

						case "linear":
							yValues[j] = func.slope * dx + offset;
							break;

						case "sine":
							const amplitude = signal.scale.y * func.amplitude;
							const phase =
								signal.scale.x *
								(2 * Math.PI * func.frequency * dx - (func.phase / 180) * Math.PI);

							yValues[j] = amplitude * Math.sin(phase) + offset;
							break;

						case "step":
							if (xValues[j] <= func.stepTime) yValues[j] = offset;
							else yValues[j] = func.stepValue + offset;
							break;

						case "ramp-up":
							if (xValues[j] <= func.rampStartTime) yValues[j] = offset;
							else if (xValues[j] > func.rampStartTime && xValues[j] <= func.rampEndTime) {
								const dx = xValues[j] - func.rampStartTime;
								yValues[j] = func.slope * dx + offset;
							} else {
								if (j === 0) yValues[j] = offset;
								else yValues[j] = yValues[j - 1];
							}
							break;
					}
				}
			});

			return { properties: signal, points: yValues };
		});
	}

	function createDatasets(yValues = []) {
		return yValues.map((signal, i) => ({
			label: signal.properties.name,
			data: signal.points,
			backgroundColor: chartColors[i % chartColors.length],
			borderColor: chartColors[i % chartColors.length],
		}));
	}
	//#endregion

	// Update the points if something changes inside signals
	useEffect(() => {
		// If there is no signals return
		if (signals.length === 0) return;

		// Get the min and max value along x-axis
		const { minX, maxX } = getSignalsMinMax(signals);

		// Check if there is a valid minX and maxX
		if (!checkSignalsMinMax(minX, maxX)) return;

		// Get the biggest reverse time
		// const maxReverseTime = getMaxReverseTime(signals);
		// const length = maxX - minX;

		// if (maxReverseTime != null) {
		// 	if (maxReverseTime > length / 2) {
		// 		maxX = minX + 2 * maxReverseTime;
		// 	}
		// }

		// Generate the x and y values
		const numberOfPoints = getNumberOfPoints(maxX - minX, dt);
		const xValues = createXValues(numberOfPoints, minX, dt);
		const yValues = createYValues(signals, xValues);

		// Create the datasets for the chart
		const datasets = createDatasets(yValues);

		// Update the data state
		setData({
			labels: xValues,
			datasets: datasets,
		});
	}, [JSON.stringify(signals), sampling]);

	return { chartData: data, chartOptions: options };
}

export default useMainChart;
