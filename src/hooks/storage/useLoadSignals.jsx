import { useEffect } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import getSignals from "../../utils/storage/getSignals";
import getSignalsUpdatedAt from "../../utils/storage/getSignalsUpdatedAt";
import { useLocation, useSearchParams } from "react-router-dom";

function useLoadSignals(setShow) {
	const [{ signals }, dispatch] = useStateValue();
	const [, setSearchParams] = useSearchParams();
	const location = useLocation();

	useEffect(() => {
		// Check if there are local signals
		if (signals.length > 0) {
			// Set the signalId query in the URL
			setSearchParams({ signalId: signals[0].id });

			return;
		}

		// Load the signals from storage
		const signalsFromStorage = getSignals();
		const updatedAt = getSignalsUpdatedAt();
		const difference = new Date() - updatedAt;

		if (difference > 1000 * 60 * 60) {
			// if (difference > 100) {
			if (signalsFromStorage.length > 0) setShow(true);
		} else {
			if (signalsFromStorage.length === 0) return;

			dispatch({
				type: "SET_SIGNALS",
				signals: signalsFromStorage,
			});

			setSearchParams({ signalId: signalsFromStorage[0].id });
		}
	}, [location.pathname]);
}

export default useLoadSignals;
