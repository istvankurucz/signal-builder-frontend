import { Children, cloneElement, useState } from "react";
import AccordionHeader from "./AccordionHeader";
import AccordionBody from "./AccordionBody";
import "./Accordion.css";

function Accordion({ defaultOpen = false, className = "", children }) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const childrenWithProps = Children.map(children, (child) =>
		cloneElement(child, { isOpen, setIsOpen })
	);

	return (
		<div className={`accordion${className !== "" ? ` ${className}` : ""}`}>
			{childrenWithProps}
		</div>
	);
}

Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
