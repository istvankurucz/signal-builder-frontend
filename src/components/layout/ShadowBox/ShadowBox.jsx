import "./ShadowBox.css";

function ShadowBox({ p = "1rem", className = "", children, ...rest }) {
	return (
		<div
			style={{ "--p": p }}
			className={`shadowBox${className ? ` ${className}` : ""}`}
			{...rest}
		>
			{children}
		</div>
	);
}

export default ShadowBox;
