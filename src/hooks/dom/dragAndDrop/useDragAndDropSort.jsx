import { useEffect, useState } from "react";
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

	function getDragAfterIndex(container, y) {
		const draggableElements = Array.from(
			container.querySelectorAll(".elementSortElement:not(.elementSortElement--dragging)")
		);

		const dragAfter = draggableElements.reduce(
			(closest, child, i) => {
				const box = child.getBoundingClientRect();
				const offset = y - box.top - box.height / 2;

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

	function handleDragOver(e, container) {
		e.preventDefault();

		const draggingIndex = getDraggingIndex(container);
		const afterIndex = getDragAfterIndex(container, e.clientY);

		if (draggingIndex === afterIndex) return;

		let newElements = [...tempElements];
		newElements = swapArrayElements(newElements, draggingIndex, afterIndex);
		setTempElements(newElements);
		setActiveIndex(afterIndex);
	}

	// useEffect(() => {
	// 	setTempElements(initialElements);
	// }, [initialElements]);

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
