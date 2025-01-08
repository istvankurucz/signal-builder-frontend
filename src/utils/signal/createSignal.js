import Signal from "../classes/Signal";
import createFunction from "../function/createFunction";

export default function createSignal(signal) {
	try {
		const functions = signal.functions.map((func) => createFunction(func));

		return new Signal(
			signal.id,
			signal.name,
			signal.offset,
			signal.scale,
			functions,
			signal.autoSort,
			signal.reverseTime,
			signal.visible
		);
	} catch (e) {
		return null;
	}
}
