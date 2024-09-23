import "./Tooltip.css";

function Tooltip({ show, position = "top", align = "right", className = "", children, ...rest }) {
	return (
		<div
			className={`tooltip tooltip--${position} tooltip--${align}${show ? " tooltip--show" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
			{...rest}
		>
			{children}
		</div>
	);
}

export default Tooltip;
