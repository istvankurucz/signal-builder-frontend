import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import checkIfElementOverflows from "../../../utils/dom/checkIfElementOverflows";
import ElementSort from "../ElementSort/ElementSort";
import useDragAndDropSort from "../../../hooks/dom/dragAndDrop/useDragAndDropSort";
import sortSignals from "../../../utils/signal/sortSignals";
import "./SignalTabSelect.css";

function SignalTabSelect({ className = "" }) {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	const [isOverflowing, setIsOverflowing] = useState(false);
	const {
		tempElements,
		setTempElements,
		activeIndex,
		setActiveIndex,
		handleDragStart,
		handleDragEnd,
		handleDragOver,
	} = useDragAndDropSort(signals);
	const [searchParams, setSearcParams] = useSearchParams();
	//#endregion

	//#region States
	const tabSelectRef = useRef();
	const elementsRef = useRef();
	//#endregion

	//#region Functions
	function scrollTabSelect(direction = "right") {
		const dx = direction === "right" ? -75 : 75;
		tabSelectRef.current.scrollLeft += dx;
	}

	function handleSignalDragEnd() {
		handleDragEnd();
		sortSignals(tempElements, signals, dispatch);
	}
	//#endregion

	//#region Hooks
	// Update the initial temp elements when the local states loaded
	useEffect(() => {
		if (signals.length === 0) return;

		const newTempSignals = signals.map((signal) => ({
			id: signal.id,
			text: signal.name,
			dragging: false,
		}));
		setTempElements(newTempSignals);
	}, [signals]);

	// Checks if the content of the tab select element overflows
	useLayoutEffect(() => {
		setIsOverflowing(checkIfElementOverflows(tabSelectRef.current));

		// Scroll to the right if a new signal is added
		tabSelectRef.current.scrollLeft = tabSelectRef.current.scrollWidth;
	}, [tabSelectRef.current, signals]);
	//#endregion

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

			<ElementSort>
				<div
					className="elementSort__elements signalTabSelect__options"
					onDragOver={(e) => handleDragOver(e, elementsRef.current, "horizontal")}
					ref={elementsRef}
				>
					{tempElements.map((element, i) => (
						<ElementSort.Element
							key={i}
							isDragging={element.dragging}
							onDragStart={() => handleDragStart(i)}
							onDragEnd={handleSignalDragEnd}
							onClick={() => setActiveIndex(i)}
						>
							<div
								key={element.id}
								title={element.text}
								className={`signalTabSelect__option${
									searchParams.get("signalId") === element.id
										? " signalTabSelect__option--selected"
										: ""
								}`}
								onClick={() => setSearcParams({ signalId: element.id }, { replace: true })}
							>
								{element.text}
							</div>
						</ElementSort.Element>
					))}
				</div>
			</ElementSort>

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
