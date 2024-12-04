import Function from "../classes/Function";
import Signal from "../classes/Signal";
import calcAverage from "../general/calcAverage";
import getDt from "./getDt";
import calculateDifferences from "./identification/calculateDifferences";
import getSineMaxValues from "./identification/getSineMaxValues";
import roundToTolerance from "./roundToTolerance";

//#region Functions
function getSignalValueAtTime(timeData, signalsData, signalIndex, time) {
	const timeIndex = timeData.indexOf(time);
	if (timeIndex === -1) return null;

	return signalsData[signalIndex][timeIndex];
}
//#endregion

export default function getSignalsFromBreakpoints(
	timeData,
	signalsData,
	breakpoints,
	windowSize,
	tolerances
) {
	tolerances = {
		...tolerances,
		general: 1e-4,
	};
	const dt = getDt(timeData);

	return breakpoints.map((signalBeakpoints, i) => {
		// Create a signal with default parameters
		const signal = new Signal();

		const functions = [];
		for (let j = 0; j < signalBeakpoints.length - 1; j++) {
			// Create a funciton with default parameters
			const func = new Function();
			func.type = signalBeakpoints[j].type;
			func.startTime = signalBeakpoints[j].startTime;
			func.length = roundToTolerance(
				signalBeakpoints[j + 1].startTime - signalBeakpoints[j].startTime,
				dt
			);

			switch (signalBeakpoints[j].type) {
				case "const":
					func.constValue = getSignalValueAtTime(
						timeData,
						signalsData,
						i,
						signalBeakpoints[j].startTime
					);
					break;

				case "linear":
					func.slope =
						(getSignalValueAtTime(
							timeData,
							signalsData,
							i,
							signalBeakpoints[j + 1].startTime
						) -
							getSignalValueAtTime(
								timeData,
								signalsData,
								i,
								signalBeakpoints[j].startTime
							)) /
						(signalBeakpoints[j + 1].startTime - signalBeakpoints[j].startTime);
					func.offset = getSignalValueAtTime(
						timeData,
						signalsData,
						i,
						signalBeakpoints[j].startTime
					);
					break;

				case "sine":
					const maxValues = getSineMaxValues(
						timeData,
						signalsData[i],
						signalBeakpoints[j].startTime,
						signalBeakpoints[j + 1].startTime,
						windowSize,
						dt,
						tolerances.general
					);
					const minValues = getSineMaxValues(
						timeData,
						signalsData[i],
						signalBeakpoints[j].startTime,
						signalBeakpoints[j + 1].startTime,
						windowSize,
						dt,
						tolerances.general,
						"min"
					);
					// console.log("Min-max values:", { minValues, maxValues });

					// Check if there are values
					if (maxValues.length === 0 || minValues.length === 0) continue;

					// Calculate the averages
					const maxAvg = calcAverage(...maxValues.map((value) => value.value));
					const minAvg = calcAverage(...minValues.map((value) => value.value));

					// Calculate period time
					const [timeDifferences] = calculateDifferences(
						[maxValues.map((value) => value.time)],
						1
					);
					const periodTime = roundToTolerance(calcAverage(...timeDifferences), dt);

					// Sine parameters
					func.frequency = roundToTolerance(1 / periodTime, tolerances.frequency);
					func.amplitude = roundToTolerance((maxAvg - minAvg) / 2, tolerances.amplitude);
					func.offset = roundToTolerance((maxAvg + minAvg) / 2, tolerances.amplitude);
					break;

				default:
					console.log("Invalid function type.");
			}

			functions.push(func);
		}

		// Set the function of signal
		signal.functions = functions;

		return signal;
	});
}
