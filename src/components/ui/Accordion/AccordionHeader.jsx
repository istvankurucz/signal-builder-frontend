import { useLayoutEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccordionHeader.css";

function AccordionHeader({ isOpen, setIsOpen, icon, onClick, className = "", children, ...rest }) {
	const accordionHeaderRef = useRef();

	// Show / hide accordion body by keyboard navigation
	useLayoutEffect(() => {
		function handleKeydown(e) {
			if (e.key === "Enter" && document.activeElement === accordionHeaderRef.current) {
				setIsOpen((open) => !open);
			}
		}

		window.addEventListener("keydown", handleKeydown);

		return () => window.removeEventListener("keydown", handleKeydown);
	}, [isOpen]);

	return (
		<div
			role="button"
			className={`accordionHeader${isOpen ? " accordionHeader--open" : ""}`}
			onClick={() => {
				setIsOpen((open) => !open);

				if (onClick != null) onClick();
			}}
			tabIndex={0}
			ref={accordionHeaderRef}
			{...rest}
		>
			{icon && <FontAwesomeIcon icon={icon} className="accordionHeader__icon" />}
			<div className={`accordionHeader__content${className !== "" ? ` ${className}` : ""}`}>
				{children}
			</div>
		</div>
	);
}

export default AccordionHeader;
