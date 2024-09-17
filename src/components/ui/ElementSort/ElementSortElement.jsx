import "./ElementSortElement.css";

function ElementSortElement({ isActive, isDragging, className = "", children, ...rest }) {
	return (
		<div
			draggable
			className={`elementSortElement${isActive ? " elementSortElement--active" : ""}${
				isDragging ? " elementSortElement--dragging" : ""
			}${className !== "" ? ` ${className}` : ""}`}
			{...rest}
		>
			{children}
		</div>
	);
}

export default ElementSortElement;
