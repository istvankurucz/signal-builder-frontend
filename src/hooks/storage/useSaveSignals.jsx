import { useEffect } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import saveSignals from "../../utils/storage/saveToStorage";

function useSaveSignals() {
	const [{ signals }] = useStateValue();

	useEffect(() => {
		function handleUnload(e) {
			e.preventDefault();
			e.returnValue = "";

			saveSignals(signals);
		}

		window.addEventListener("beforeunload", handleUnload);

		return () => window.removeEventListener("beforeunload", handleUnload);
	}, [signals]);
}

export default useSaveSignals;
