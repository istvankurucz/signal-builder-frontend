import createSignal from "../signal/createSignal";
import getStorageData from "./getStorageData";

export default function getSignals() {
	// Get the signals from storage
	const { signals } = getStorageData();

	// Create Signal objects from the strings
	return signals.map((signal) => createSignal(signal));
}
