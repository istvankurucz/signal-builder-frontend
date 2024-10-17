import { useEffect, useState } from "react";
import useSignal from "./useSignal";

function useSignalInputs() {
	const signal = useSignal();
	const [name, setName] = useState("");
	const [offset, setOffset] = useState(0);
	const [scale, setScale] = useState({ x: 1, y: 1 });
	const [isReversed, setIsReversed] = useState(false);
	const [reverseTime, setReverseTime] = useState(null);

	useEffect(() => {
		if (signal == null) return;

		setName(signal.name);
		setOffset(signal.offset);
		setScale(signal.scale);
		setIsReversed(signal.reverseTime != null);
		setReverseTime(signal.reverseTime);
	}, [signal]);

	return {
		name,
		setName,
		offset,
		setOffset,
		scale,
		setScale,
		reverseTime,
		setReverseTime,
		isReversed,
		setIsReversed,
	};
}

export default useSignalInputs;
