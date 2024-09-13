import "./ShadowBox.css";

function ShadowBox({ p = "1rem", className = "", children }) {
	return (
		<div style={{ "--p": p }} className={`shadowBox${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
}

export default ShadowBox;
