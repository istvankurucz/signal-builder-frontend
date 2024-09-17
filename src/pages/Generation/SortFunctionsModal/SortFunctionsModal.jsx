import { useRef } from "react";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import ElementSort from "../../../components/ui/ElementSort/ElementSort";
import useDragAndDropSort from "../../../hooks/dom/dragAndDrop/useDragAndDropSort";
import "./SortFunctionsModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

const functions = ["sine", "const", "linear", "step", "ramp-up"];
const initialTempFunctions = functions.map((func) => ({
	function: func,
	dragging: false,
}));

function SortFunctionsModal({ show, setShow }) {
	const {
		tempElements,
		setTempElements,
		activeIndex,
		setActiveIndex,
		handleDragStart,
		handleDragEnd,
		handleDragOver,
	} = useDragAndDropSort(initialTempFunctions);

	const elementsRef = useRef();

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
								<div className="sortFunctions__element">
									<FontAwesomeIcon
										icon={faGripVertical}
										title="Draggable"
										className="sortFunctions__element__icon"
									/>
									<span className="sortFunctions__element__text">{element.function}</span>
								</div>
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

export default SortFunctionsModal;
