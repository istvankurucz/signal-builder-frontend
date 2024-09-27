import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import generatePoints from "../../utils/generation/generatePoints";
import sortSignalPoints from "../../utils/generation/sortSignalPoints";
import toUniqueArray from "../../utils/general/toUniqueArray";
import getNumberOfPoints from "../../utils/generation/getNumberOfPoints";
import createXValues from "../../utils/generation/createXValues";

const chartColors = [
	"#0d80f2",
	"#e83030",
	"#2eb82e",
	"#f4c025",
	"#8026d9",
	"#f5993d",
	"#26d9d9",
	"#dd3cdd",
	"#f2f20d",
	"#e05299",
];

function useMainChart() {
	// States
	const [{ signals }] = useStateValue();
	const [data, setData] = useState({ labels: [], datasets: [] });

	// Variables
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

	// Functions
	function getSignalPoints(signals = []) {
		// Generate the points
		let points = generateSignalPoints(signals);

		// Get the min x value for offsetting
		const minX = getGlobalMinX(points);

		// Offset the points along the x axis if needed
		points = offsetSignalPoints(points, minX);

		// Return the created points
		return points;
	}

	function generateSignalPoints(signals = []) {
		return signals.map((signal) => {
			// Generate the points
			const signalPoints = signal.functions.map((func) => generatePoints(func, 0.01));

			// Sort the points
			const sortedPoints = sortSignalPoints(signalPoints);

			// Return the sorted points
			return { properties: signal, points: sortedPoints };
		});
	}

	function getGlobalMinX(points = []) {
		const firstXValues = points.map((signal) => {
			if (signal.points.x.length === 0) return Number.POSITIVE_INFINITY;
			return signal.points.x[0];
		});

		return Math.min(...firstXValues);
	}

	function offsetSignalPoints(points = [], minX) {
		if (points.length === 0) return [];

		return points.map((signal) => {
			// Check if an offsetting is needed
			if (signal.points.x[0] <= minX || signal.points.x.length === 0) return signal;

			// Calculate how many extra points are needed
			const dt = signal.points.x[1] - signal.points.x[0];
			const length = signal.points.x[0] - minX;
			const numberOfPointsNeeded = getNumberOfPoints(length, dt);

			// Generate the needed x and y values
			const xValuesNeeded = createXValues(numberOfPointsNeeded, minX, dt);
			const yValuesNeeded = new Array(numberOfPointsNeeded).fill(null);

			// Construct the new points array
			const newPoints = {
				x: [...xValuesNeeded, ...signal.points.x],
				y: [...yValuesNeeded, ...signal.points.y],
			};

			// Return the updated points
			return { ...signal, points: newPoints };
		});
	}

	function createDatasets(points = []) {
		return points.map((signal, i) => ({
			label: signal.properties.name,
			data: signal.points.y,
			backgroundColor: chartColors[i % chartColors.length],
			borderColor: chartColors[i % chartColors.length],
		}));
	}

	function createLabels(points = []) {
		// Collect all x values
		const labels = [];
		points.forEach((signal) => {
			labels.push(...signal.points.x);
		});

		// Filter and sort the values
		const sortedLabels = toUniqueArray(labels).toSorted((a, b) => a - b);

		// Return the labels
		return sortedLabels;
	}

	// Update the points if something changes inside signals
	useEffect(() => {
		// Update the points
		const points = getSignalPoints(signals);

		// Create the datasets and labels
		const datasets = createDatasets(points);
		const labels = createLabels(points);

		// Update the data state
		setData({
			labels: labels,
			datasets: datasets,
		});
	}, [JSON.stringify(signals)]);

	return { chartData: data, chartOptions: options };
}

export default useMainChart;
