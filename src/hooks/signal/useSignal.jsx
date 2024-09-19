import { useSearchParams } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { useEffect, useState } from "react";

function useSignal() {
	const [{ signals }] = useStateValue();
	const [signal, setSignal] = useState(null);
	const [searchParams] = useSearchParams();

	const signalId = searchParams.get("signalId");

	useEffect(() => {
		const selectedSignal = signals.find((signal) => signal.id === signalId);

		if (selectedSignal == undefined) setSignal(null);
		else setSignal(selectedSignal);
	}, [signals, signalId]);

	return signal;
}

export default useSignal;
