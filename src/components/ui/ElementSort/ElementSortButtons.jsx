import { useStateValue } from "../../../contexts/Context API/StateProvider";
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
	const [, dispatch] = useStateValue();

	function checkActiveIndex() {
		if (activeIndex < 0) {
			// Show feedback
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "info",
					message: "You have to select an element before moving it.",
					details: "Try to click on one of them.",
				},
			});

			return false;
		}

		return true;
	}

	function moveElementUp() {
		if (!checkActiveIndex()) return;

		// The first is the activ óe element
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
