import "./Divider.css";

function Divider({
	direction = "horizontal",
	variant = "info",
	length = "100%",
	margin = "1.5rem",
	text = "",
	className = "",
}) {
	return (
		<div
			style={{ "--length": length, "--margin": margin }}
			className={`divider divider--${direction} divider--${variant}${
				className !== "" ? ` ${className}` : ""
			}`}
		>
			{text !== "" && <span className="divider__text">{text}</span>}
		</div>
	);
}

export default Divider;
