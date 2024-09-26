import { useEffect, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import generatePoints from "../../utils/generation/generatePoints";
import sortSignalPoints from "../../utils/generation/sortSignalPoints";

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
	const [data, setData] = useState(null);

	// Variables
	const chartOptions = {
		animation: false,
		responsive: true,
		elements: {
			line: {
				backgroundColor: "blue",
				borderColor: "red",
				borderWidth: 3,
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
				ticks: {
					callback: (_, index) => timeValues[index].toFixed(2),
				},
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

	// Update the points if something changes inside signals
	useEffect(() => {
		// Generate the datasets
		const newDatasets = signals.map((signal, i) => {
			// Generate the points
			const signalPoints = signal.functions.map((func) => generatePoints(func, 0.01));

			// Sort the points
			const sortedPoints = sortSignalPoints(signalPoints);

			return {
				label: signal.name,
				data: sortedPoints.y,
				backgroundColor: chartColors[i % chartColors.length],
				borderColor: chartColors[i % chartColors.length],
			};
		});

		setData({
			labels: newDatasets[0].data,
			datasets: newDatasets,
		});
	}, [JSON.stringify(signals)]);

	return { chartData: data };
}

export default useMainChart;
