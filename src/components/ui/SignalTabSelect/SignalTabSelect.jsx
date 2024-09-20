import { useLayoutEffect, useRef, useState } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import checkIfElementOverflows from "../../../utils/dom/checkIfElementOverflows";
import "./SignalTabSelect.css";

function SignalTabSelect({ className = "" }) {
	const [{ signals }] = useStateValue();
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [searchParams, setSearcParams] = useSearchParams();

	const tabSelectRef = useRef();

	function scrollTabSelect(direction = "right") {
		const dx = direction === "right" ? -75 : 75;
		tabSelectRef.current.scrollLeft += dx;
	}

	// Checks if the content of the tab select element overflows
	useLayoutEffect(() => {
		setIsOverflowing(checkIfElementOverflows(tabSelectRef.current));
	}, [tabSelectRef.current, signals]);

	return (
		<div
			className={`signalTabSelect scrollbar${className ? ` ${className}` : ""}`}
			ref={tabSelectRef}
		>
			{isOverflowing && (
				<button
					type="button"
					className="signalTabSelect__arrow signalTabSelect__arrow--left"
					onClick={() => scrollTabSelect("right")}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
			)}

			<ul className="signalTabSelect__options">
				{signals.map((signal) => (
					<li
						key={signal.id}
						title={signal.name}
						className={`signalTabSelect__option${
							searchParams.get("signalId") === signal.id
								? " signalTabSelect__option--selected"
								: ""
						}`}
						onClick={() => setSearcParams({ signalId: signal.id }, { replace: true })}
					>
						{signal.name}
					</li>
				))}
			</ul>

			{isOverflowing && (
				<button
					type="button"
					className="signalTabSelect__arrow signalTabSelect__arrow--right"
					onClick={() => scrollTabSelect("left")}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
			)}
		</div>
	);
}

export default SignalTabSelect;
