import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import swapArrayElements from "../../../utils/general/swapArrayElements";
import "./ElementSortButtons.css";

function ElementSortButtons({
	tempElements,
	setTempElements,
	activeIndex,
	setActiveIndex,
	className = "",
}) {
	function moveElementUp() {
		if (activeIndex === 0) return;

		let newElements = [...tempElements];
		newElements = swapArrayElements(newElements, activeIndex, activeIndex - 1);
		setTempElements(newElements);

		setActiveIndex((index) => index - 1);
	}

	function moveElementDown() {
		if (activeIndex === tempElements.length - 1) return;

		let newElements = [...tempElements];
		newElements = swapArrayElements(newElements, activeIndex, activeIndex + 1);
		setTempElements(newElements);

		setActiveIndex((index) => index + 1);
	}

	return (
		<div className={`elementSortButtons${className !== "" ? ` ${className}` : ""}`}>
			<Button
				outlined
				className={`elementSortButtons__button${className !== "" ? ` ${className}` : ""}`}
				title="Move element up"
				onClick={moveElementUp}
			>
				<FontAwesomeIcon icon={faArrowUp} />
			</Button>
			<Button
				outlined
				className={`elementSortButtons__button${className !== "" ? ` ${className}` : ""}`}
				title="Move element down"
				onClick={moveElementDown}
			>
				<FontAwesomeIcon icon={faArrowDown} />
			</Button>
		</div>
	);
}

export default ElementSortButtons;
