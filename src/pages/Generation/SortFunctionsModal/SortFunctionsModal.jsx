import { useRef } from "react";
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
								<ShadowBox className="sortFunctions__element">
									<FontAwesomeIcon
										icon={faGripVertical}
										title="Draggable"
										className="sortFunctions__element__icon"
									/>
									<FunctionTag
										name={element.function}
										className="sortFunctions__element__tag"
									/>
									<span className="sortFunctions__element__text">{element.function}</span>
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

export default SortFunctionsModal;
