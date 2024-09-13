import "./P.css";

function P({ variant = "text", className = "", children }) {
	return <p className={`p p--${variant}${className ? ` ${className}` : ""}`}>{children}</p>;
}

export default P;
