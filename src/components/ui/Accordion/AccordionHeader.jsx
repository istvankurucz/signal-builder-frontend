import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccordionHeader.css";

function AccordionHeader({ isOpen, setIsOpen, icon, className = "", children }) {
	return (
		<button
			type="button"
			className={`accordionHeader${isOpen ? " accordionHeader--open" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
			onClick={() => setIsOpen((open) => !open)}
		>
			{icon && <FontAwesomeIcon icon={icon} className="accordionHeader__icon" />}
			<div className="accordionHeader__content">{children}</div>
		</button>
	);
}

export default AccordionHeader;
