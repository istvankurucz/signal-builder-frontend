import "./H3.css";

function H3({ className = "", children }) {
	return <h3 className={`h3${className ? ` ${className}` : ""}`}>{children}</h3>;
}

export default H3;
