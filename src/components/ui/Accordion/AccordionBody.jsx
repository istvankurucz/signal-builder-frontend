import "./AccordionBody.css";

function AccordionBody({ isOpen, className = "", children }) {
	return (
		<div
			className={`accordionBody${isOpen ? " accordionBody--open" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
		>
			<div className="accordionBody__content">{children}</div>
		</div>
	);
}

export default AccordionBody;
