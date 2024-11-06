import "./ElementSortElement.css";

function ElementSortElement({ isDragging, className = "", children, ...rest }) {
	return (
		<div
			draggable
			className={`elementSortElement${isDragging ? " elementSortElement--dragging" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
			{...rest}
		>
			{children}
		</div>
	);
}

export default ElementSortElement;
