import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import ShadowBox from "../../../components/layout/ShadowBox/ShadowBox";
import ElementSort from "../../../components/ui/ElementSort/ElementSort";
import "./SortSignalsModal.css";
import useDragAndDropSort from "../../../hooks/dom/dragAndDrop/useDragAndDropSort";

const signals = new Array(5).fill(null).map((_, i) => `Signal ${i + 1}`);
const initialTempSignals = signals.map((signal) => ({
	text: signal,
	id: signal.split(" ")[1],
	dragging: false,
}));

function SortSignalsModal({ show, setShow }) {
	const {
		tempElements,
		setTempElements,
		activeIndex,
		setActiveIndex,
		handleDragStart,
		handleDragEnd,
		handleDragOver,
	} = useDragAndDropSort(initialTempSignals);

	const elementsRef = useRef();

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
					<Button>Save</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default SortSignalsModal;
