import "./ModalBody.css";

function ModalBody({ className = "", children }) {
	return <div className={`modalBody${className ? ` ${className}` : ""}`}>{children}</div>;
}

export default ModalBody;
