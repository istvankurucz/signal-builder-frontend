import { forwardRef } from "react";
import ElementSortButtons from "./ElementSortButtons";
import ElementSortElement from "./ElementSortElement";
import ElementSortBox from "./ElementSortBox";
import "./ElementSort.css";

const ElementSort = forwardRef(({ className = "", children }, ref) => {
	return (
		<div className={`elementSort${className !== "" ? ` ${className}` : ""}`} ref={ref}>
			{children}
		</div>
	);
});

ElementSort.Buttons = ElementSortButtons;
ElementSort.Element = ElementSortElement;
ElementSort.Box = ElementSortBox;

export default ElementSort;
