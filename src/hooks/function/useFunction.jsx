import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSignal from "../signal/useSignal";

function useFunction() {
	const signal = useSignal();
	const [func, setFunc] = useState(null);
	const [searchParams] = useSearchParams();

	const functionId = searchParams.get("functionId");

	useEffect(() => {
		if (signal == null) return;

		const result = signal.functions.find((f) => f.id === functionId);
		if (result == undefined) return;

		setFunc(result);
	}, [signal, functionId]);

	return func;
}

export default useFunction;
