import { useEffect, useState } from "react";
import useSignal from "./useSignal";

function useSignalInputs() {
	const signal = useSignal();
	const [name, setName] = useState("");
	const [offset, setOffset] = useState(0);
	const [scale, setScale] = useState({ x: 1, y: 1 });

	useEffect(() => {
		if (signal == null) return;

		setName(signal.name);
		setOffset(signal.offset);
		setScale(signal.scale);
	}, [signal]);

	return { name, setName, offset, setOffset, scale, setScale };
}

export default useSignalInputs;
