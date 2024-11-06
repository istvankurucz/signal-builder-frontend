import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import swapArrayElements from "../../../utils/general/swapArrayElements";
import handleError from "../../../utils/error/handleError";
import "./ElementSortButtons.css";

function ElementSortButtons({
	tempElements,
	setTempElements,
	activeIndex,
	setActiveIndex,
	className = "",
}) {
	const [, dispatch] = useStateValue();

	function checkActiveIndex() {
		try {
			if (activeIndex < 0) throw new Error("sorting/no-active-item");

			return true;
		} catch (e) {
			handleError(e.message, dispatch);
			return false;
		}
	}

	function moveElementUp() {
		if (!checkActiveIndex()) return;

		// The first is the active element
		if (activeIndex === 0) return;

		let newElements = [...tempElements];
		newElements = swapArrayElements(newElements, activeIndex, activeIndex - 1);
		setTempElements(newElements);

		setActiveIndex((index) => index - 1);
	}

	function moveElementDown() {
		if (!checkActiveIndex()) return;

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
