import { useLayoutEffect } from "react";
import "./Overlay.css";

function Overlay({ show = false, className = "", children }) {
	// Disable scroll on body if an overlay is shown
	useLayoutEffect(() => {
		document.body.classList.toggle("body--fixed", show);
	}, [show]);

	return (
		<div className={`overlay${show ? " overlay--show" : ""}${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
}

export default Overlay;
