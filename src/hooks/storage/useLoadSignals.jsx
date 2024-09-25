import { useEffect } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import getSignals from "../../utils/storage/getSignals";
import getSignalsUpdatedAt from "../../utils/storage/getSignalsUpdatedAt";
import { useSearchParams } from "react-router-dom";

function useLoadSignals(setShow) {
	const [, dispatch] = useStateValue();
	const [, setSearcParams] = useSearchParams();

	useEffect(() => {
		const signals = getSignals();
		const updatedAt = getSignalsUpdatedAt();
		const difference = new Date() - updatedAt;

		if (difference > 1000 * 60 * 60) {
			// if (difference > 100) {
			if (signals.length > 0) setShow(true);
		} else {
			if (signals.length === 0) return;

			dispatch({
				type: "SET_SIGNALS",
				signals: signals,
			});

			setSearcParams({ signalId: signals[0].id });
		}
	}, []);
}

export default useLoadSignals;
