import "./Overlay.css";

function Overlay({ show = false, className = "", children }) {
	return (
		<div className={`overlay${show ? " overlay--show" : ""}${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
}

export default Overlay;
