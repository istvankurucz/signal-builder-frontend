import { useSearchParams } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { useEffect, useMemo, useState } from "react";
import getSignalById from "../../utils/signal/getSignalById";

function useDuplicateSignalName() {
	// States
	const [{ signals }] = useStateValue();
	const [searchParams] = useSearchParams();
	const [name, setName] = useState("");

	// Variables
	const signalId = searchParams.get("signalId");
	const signal = useMemo(() => {
		if (signalId == null) return null;

		return getSignalById(signals, signalId);
	}, [signals, signalId]);

	// Functions
	function createDuplicateSignalName() {
		if (signal == null) return "New signal";
		return `${signal.name}-2`;
	}

	// Hook
	useEffect(() => {
		if (signalId == null) return;

		setName(createDuplicateSignalName());
	}, [signalId, signal?.name]);

	return [name, setName];
}

export default useDuplicateSignalName;
