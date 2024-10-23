import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import getSignals from "../../utils/storage/getSignals";
import getSignalsUpdatedAt from "../../utils/storage/getSignalsUpdatedAt";

function useLoadSignals(setShow) {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	const [, setSearchParams] = useSearchParams();
	const location = useLocation();
	//#endregion

	//#region Functions
	function updateSignalIdParam(signalId) {
		if (location.pathname === "/generation") setSearchParams({ signalId });
	}
	//#endregion

	//#region Effect
	useEffect(() => {
		// Check if there are local signals
		if (signals.length > 0) {
			updateSignalIdParam(signals[0].id);
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

			updateSignalIdParam(signalsFromStorage[0].id);
		}
	}, [location.pathname]);
	//#endregion
}

export default useLoadSignals;
