import "./ModalTitle.css";

function ModalTitle({ className = "", children }) {
	return <h2 className={`modalTitle${className !== "" ? ` ${className}` : ""}`}>{children}</h2>;
}

export default ModalTitle;
