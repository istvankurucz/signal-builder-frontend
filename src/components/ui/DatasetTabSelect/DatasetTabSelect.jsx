import { useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import checkIfElementOverflows from "../../../utils/dom/checkIfElementOverflows";
import "./DatasetTabSelect.css";

function DatasetTabSelect({ index = 0, setIndex, options, className = "" }) {
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
		<div className={`datasetTabSelect${className ? ` ${className}` : ""}`} ref={tabSelectRef}>
			{isOverflowing && (
				<button
					type="button"
					className="datasetTabSelect__arrow datasetTabSelect__arrow--left"
					onClick={() => scrollTabSelect("right")}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
			)}

			<ul className="datasetTabSelect__options">
				{options.map((option, i) => (
					<li
						key={option}
						className={`datasetTabSelect__option${
							index === i ? " datasetTabSelect__option--selected" : ""
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
					className="datasetTabSelect__arrow datasetTabSelect__arrow--right"
					onClick={() => scrollTabSelect("left")}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
			)}
		</div>
	);
}

export default DatasetTabSelect;
