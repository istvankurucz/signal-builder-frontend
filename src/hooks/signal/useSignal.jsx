import { useSearchParams } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { useEffect, useState } from "react";

function useSignal() {
	const [{ signals }] = useStateValue();
	const [signal, setSignal] = useState(signals[0]);
	const [searchParams] = useSearchParams();

	const signalId = searchParams.get("signalId");

	useEffect(() => {
		const selectedSignal = signals.find((signal) => signal.id === signalId);
		setSignal(selectedSignal);
	}, [signals, signalId]);

	return signal;
}

export default useSignal;
