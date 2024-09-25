import { useEffect, useRef } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import ElementSort from "../../../components/ui/ElementSort/ElementSort";
import useDragAndDropSort from "../../../hooks/dom/dragAndDrop/useDragAndDropSort";
import ShadowBox from "../../../components/layout/ShadowBox/ShadowBox";
import FunctionTag from "../../../components/ui/Function/FunctionTag/FunctionTag";
import "./SortFunctionsModal.css";
import useSignal from "../../../hooks/signal/useSignal";
import updateSignals from "../../../utils/signal/updateSignals";

function SortFunctionsModal({ show, setShow }) {
	const [{ signals }, dispatch] = useStateValue();
	const signal = useSignal();
	const {
		tempElements,
		setTempElements,
		activeIndex,
		setActiveIndex,
		handleDragStart,
		handleDragEnd,
		handleDragOver,
	} = useDragAndDropSort();

	const elementsRef = useRef();

	// Update the initial temp elements when the local states loaded
	useEffect(() => {
		if (signal == null) return;

		const newTempFunctions = signal.functions.map((func) => ({
			id: func.id,
			type: func.type,
			text: func.name,
			dragging: false,
		}));
		setTempElements(newTempFunctions);
	}, [signal]);

	//#region Functions
	function sortFunctions() {
		// Sort the functions
		const sortedFunctions = tempElements.map((element) =>
			signal.functions.find((func) => func.id === element.id)
		);

		// Update the functions of the signal
		signal.setFunctions(sortedFunctions);

		// Update signals array
		updateSignals(signals, dispatch);

		// Reset the active index
		setActiveIndex(-1);

		// Hide the modal
		setShow(false);
	}
	//#endregion

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Sort functions</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<Modal.Body>
					<ElementSort
						tempElements={tempElements}
						setTempElements={setTempElements}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						onDragOver={(e) => handleDragOver(e, elementsRef.current)}
						ref={elementsRef}
					>
						{tempElements.map((element, i) => (
							<ElementSort.Element
								key={i}
								isActive={activeIndex === i}
								isDragging={element.dragging}
								onDragStart={() => handleDragStart(i)}
								onDragEnd={handleDragEnd}
								onClick={() => setActiveIndex(i)}
							>
								<ShadowBox className="sortFunctions__element">
									<FontAwesomeIcon
										icon={faGripVertical}
										title="Draggable"
										className="sortFunctions__element__icon"
									/>
									<FunctionTag
										name={element.type}
										className="sortFunctions__element__tag"
									/>
									<span className="sortFunctions__element__text">{element.text}</span>
								</ShadowBox>
							</ElementSort.Element>
						))}
					</ElementSort>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button onClick={sortFunctions}>Save</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default SortFunctionsModal;
