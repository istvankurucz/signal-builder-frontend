import Signal from "../classes/Signal";
import createFunction from "../function/createFunction";

export default function createSignal(signal) {
	try {
		const functions = signal._functions.map((func) => createFunction(func));

		return new Signal(
			signal._id,
			signal._name,
			signal._offset,
			signal._scale,
			functions,
			signal._autoSort,
			signal._reverseTime,
			signal._visible
		);
	} catch (e) {
		return null;
	}
}
