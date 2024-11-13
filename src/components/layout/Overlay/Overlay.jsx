import { useLayoutEffect, useRef } from "react";
import selectAllTabElements from "../../../utils/dom/selectAllTabElements";
import "./Overlay.css";

function Overlay({ show = false, className = "", children }) {
	const overlayRef = useRef();

	// Disable scroll on body if an overlay is shown
	useLayoutEffect(() => {
		document.body.classList.toggle("body--fixed", show);
	}, [show]);

	// Tab inside the overlay
	/*useLayoutEffect(() => {
		// When the overlay becomes visible select the first tabable element
		if (show) {
			const tabElements = selectAllTabElements(overlayRef.current);
			tabElements[0].focus();
		}

		function handleKeydown(e) {
			if (show && e.key === "Tab") {
				// Get all the accessible elements using Tab from the modal
				const tabElements = selectAllTabElements(overlayRef.current);
				const index = tabElements.indexOf(document.activeElement);

				if (!e.shiftKey) {
					if (index === tabElements.length - 1) {
						tabElements[0].focus();
						e.preventDefault();
					}
				} else {
					if (index === 0) {
						e.preventDefault();
						tabElements[tabElements.length - 1].focus();
					}
				}
			}
		}

		window.addEventListener("keydown", handleKeydown);

		return () => window.addEventListener("keydown", handleKeydown);
	}, [show]);*/

	return (
		<div
			className={`overlay${show ? " overlay--show" : ""}${className ? ` ${className}` : ""}`}
			ref={overlayRef}
		>
			{children}
		</div>
	);
}

export default Overlay;
