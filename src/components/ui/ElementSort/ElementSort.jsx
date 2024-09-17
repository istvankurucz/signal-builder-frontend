import { forwardRef } from "react";
import ElementSortButtons from "./ElementSortButtons";
import ElementSortElement from "./ElementSortElement";
import "./ElementSort.css";

const ElementSort = forwardRef(
	(
		{
			tempElements,
			setTempElements,
			activeIndex,
			setActiveIndex,
			onDragOver,
			className = "",
			children,
		},
		ref
	) => {
		return (
			<div className={`elementSort${className !== "" ? ` ${className}` : ""}`} ref={ref}>
				<ElementSort.Buttons
					tempElements={tempElements}
					setTempElements={setTempElements}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
				/>
				<div className="elementSort__elements" onDragOver={onDragOver} ref={ref}>
					{children}
				</div>
			</div>
		);
	}
);

ElementSort.Buttons = ElementSortButtons;
ElementSort.Element = ElementSortElement;

export default ElementSort;
