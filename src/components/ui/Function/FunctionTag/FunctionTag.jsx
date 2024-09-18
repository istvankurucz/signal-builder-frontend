import "./FunctionTag.css";

function FunctionTag({ name, className = "" }) {
	function getFunctionTag(name) {
		switch (name) {
			case "sine":
				return "sin";
			case "const":
				return "const";
			case "linear":
				return "lin";
			case "step":
				return "step";
			case "ramp-up":
				return "ramp";
		}
	}

	return (
		<span className={`functionTag${className !== "" ? ` ${className}` : ""}`}>
			{getFunctionTag(name)}
		</span>
	);
}

export default FunctionTag;
