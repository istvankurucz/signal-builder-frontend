import "./H2.css";

function H2({ className = "", children }) {
	return <h2 className={`h2${className !== "" ? ` ${className}` : ""}`}>{children}</h2>;
}

export default H2;
