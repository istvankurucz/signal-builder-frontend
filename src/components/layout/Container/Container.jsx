import "./Container.css";

function Container({
	maxWidth = "1440px",
	px = "0",
	py = "0",
	centered = false,
	className = "",
	children,
}) {
	const customSyles = {
		"--max-width": maxWidth,
		"--px": px,
		"--py": py,
	};

	return (
		<div
			className={`container${centered ? " container--centered" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
			style={customSyles}
		>
			{children}
		</div>
	);
}

export default Container;
