import { useState } from "react";
import swapArrayElements from "../../../utils/general/swapArrayElements";

function useDragAndDropSort(initialElements = []) {
	const [tempElements, setTempElements] = useState(initialElements);
	const [activeIndex, setActiveIndex] = useState(-1);

	function getDraggingIndex(container) {
		const elements = Array.from(container.querySelectorAll(".elementSortElement"));

		return elements.reduce((closest, element, i) => {
			if (element.matches(".elementSortElement--dragging")) return i;
			else return closest;
		}, -1);
	}

	function getDragAfterIndex(container, position, direction) {
		const draggableElements = Array.from(
			container.querySelectorAll(".elementSortElement:not(.elementSortElement--dragging)")
		);

		const dragAfter = draggableElements.reduce(
			(closest, child, i) => {
				const box = child.getBoundingClientRect();
				let offset;
				if (direction === "vertical") offset = position - box.top - box.height / 2;
				else offset = position - box.left - box.width / 2;

				if (offset < 0 && offset > closest.offset) {
					return { offset, index: i };
				} else {
					return closest;
				}
			},
			{ offset: Number.NEGATIVE_INFINITY, index: draggableElements.length }
		);

		return dragAfter.index;
	}

	function handleDragStart(index) {
		setActiveIndex(index);

		setTempElements((elements) =>
			elements.map((element, i) => {
				if (i === index) return { ...element, dragging: true };
				return element;
			})
		);
	}

	function handleDragEnd() {
		setTempElements((element) => element.map((element) => ({ ...element, dragging: false })));
	}

	function handleDragOver(e, container, direction = "vertical") {
		e.preventDefault();

		const draggingIndex = getDraggingIndex(container);
		let afterIndex;
		if (direction === "vertical")
			afterIndex = getDragAfterIndex(container, e.clientY, "vertical");
		else afterIndex = getDragAfterIndex(container, e.clientX, "horizontal");

		if (draggingIndex === afterIndex) return;

		let newElements = [...tempElements];
		newElements = swapArrayElements(newElements, draggingIndex, afterIndex);
		setTempElements(newElements);
		setActiveIndex(afterIndex);
	}

	return {
		tempElements,
		setTempElements,
		activeIndex,
		setActiveIndex,
		handleDragStart,
		handleDragEnd,
		handleDragOver,
	};
}

export default useDragAndDropSort;
