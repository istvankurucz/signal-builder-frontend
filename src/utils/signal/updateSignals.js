export default function updateSignals(signals = [], dispatch) {
	dispatch({
		type: "SET_SIGNALS",
		signals: signals,
	});
}
