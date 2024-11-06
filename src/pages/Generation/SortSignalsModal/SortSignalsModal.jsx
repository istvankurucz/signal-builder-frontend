import { useEffect, useRef } from "react";
import useDragAndDropSort from "../../../hooks/dom/dragAndDrop/useDragAndDropSort";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import ElementSort from "../../../components/ui/ElementSort/ElementSort";
import sortSignals from "../../../utils/signal/sortSignals";
import "./SortSignalsModal.css";

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

	//#region Functions
	function saveSignals() {
		// Sort the signals
		sortSignals(tempElements, signals, dispatch);

		// Reset the active index
		setActiveIndex(-1);

		// Hide the modal
		setShow(false);
	}
	//#endregion

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

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Sort signals</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<Modal.Body>
					<ElementSort>
						<ElementSort.Buttons
							tempElements={tempElements}
							setTempElements={setTempElements}
							activeIndex={activeIndex}
							setActiveIndex={setActiveIndex}
						/>
						<div
							className="elementSort__elements"
							onDragOver={(e) => handleDragOver(e, elementsRef.current)}
							ref={elementsRef}
						>
							{tempElements.map((element, i) => (
								<ElementSort.Element
									key={i}
									isDragging={element.dragging}
									onDragStart={() => handleDragStart(i)}
									onDragEnd={handleDragEnd}
									onClick={() => setActiveIndex(i)}
								>
									<ElementSort.Box
										isActive={activeIndex === i}
										className="sortSignals__element"
									>
										<span className="sortSignals__element__text">{element.text}</span>
									</ElementSort.Box>
								</ElementSort.Element>
							))}
						</div>
					</ElementSort>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button onClick={saveSignals}>Save</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default SortSignalsModal;
