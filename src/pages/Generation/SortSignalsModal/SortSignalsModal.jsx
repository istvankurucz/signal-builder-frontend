import { useEffect, useMemo, useRef } from "react";
import useDragAndDropSort from "../../../hooks/dom/dragAndDrop/useDragAndDropSort";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import ShadowBox from "../../../components/layout/ShadowBox/ShadowBox";
import ElementSort from "../../../components/ui/ElementSort/ElementSort";
import "./SortSignalsModal.css";
import updateSignals from "../../../utils/signal/updateSignals";

function SortSignalsModal({ show, setShow }) {
	const [{ signals }, dispatch] = useStateValue();
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
		if (signals.length === 0) return;

		const newTempSignals = signals.map((signal) => ({
			id: signal.id,
			text: signal.name,
			dragging: false,
		}));
		setTempElements(newTempSignals);
	}, [signals]);

	//#region Functions
	function sortSignals() {
		// Sort the signals
		const sortedSignals = tempElements.map((element) =>
			signals.find((signal) => signal.id === element.id)
		);

		// Update signals array
		updateSignals(sortedSignals, dispatch);

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
					<Modal.Title>Sort signals</Modal.Title>
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
								<ShadowBox className="sortSignals__element">
									<FontAwesomeIcon
										icon={faGripVertical}
										title="Draggable"
										className="sortSignals__element__icon"
									/>
									<span className="sortSignals__element__text">{element.text}</span>
								</ShadowBox>
							</ElementSort.Element>
						))}
					</ElementSort>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button onClick={sortSignals}>Save</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default SortSignalsModal;
