import "./AccordionBody.css";

function AccordionBody({ isOpen, className = "", children }) {
	return (
		<div className={`accordionBody${isOpen ? " accordionBody--open" : ""}`}>
			<div className={`accordionBody__content${className !== "" ? ` ${className}` : ""}`}>
				{children}
			</div>
		</div>
	);
}

export default AccordionBody;
