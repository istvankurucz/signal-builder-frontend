import { useSearchParams } from "react-router-dom";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { useEffect, useState } from "react";
import getSignalById from "../../utils/signal/getSignalById";

function useDuplicateSignalName() {
	// States
	const [{ signals }] = useStateValue();
	const [searchParams] = useSearchParams();
	const [name, setName] = useState("");

	// Variables
	const signalId = searchParams.get("signalId");

	// Functions
	function createDuplicateSignalName() {
		const signal = getSignalById(signals, signalId);

		if (signal == null) return "New signal";
		return `${signal.name}-2`;
	}

	// Hook
	useEffect(() => {
		setName(createDuplicateSignalName());
	}, [signalId]);

	return [name, setName];
}

export default useDuplicateSignalName;
