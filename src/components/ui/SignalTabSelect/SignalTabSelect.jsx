import { useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import checkIfElementOverflows from "../../../utils/dom/checkIfElementOverflows";
import "./SignalTabSelect.css";

function SignalTabSelect({ index = 0, setIndex, options, className = "" }) {
	const [isOverflowing, setIsOverflowing] = useState(false);
	const tabSelectRef = useRef();

	function scrollTabSelect(direction = "right") {
		const dx = direction === "right" ? -75 : 75;
		tabSelectRef.current.scrollLeft += dx;
	}

	// Checks if the content of the tab select element overflows
	useLayoutEffect(() => {
		setIsOverflowing(checkIfElementOverflows(tabSelectRef.current));
	}, [tabSelectRef.current]);

	return (
		<div className={`signalTabSelect${className ? ` ${className}` : ""}`} ref={tabSelectRef}>
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
				{options.map((option, i) => (
					<li
						key={option}
						className={`signalTabSelect__option${
							index === i ? " signalTabSelect__option--selected" : ""
						}`}
						onClick={() => setIndex(i)}
					>
						{option}
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
