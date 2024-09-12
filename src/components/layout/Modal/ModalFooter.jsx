import "./ModalFooter.css";

function ModalFooter({ className = "", children }) {
	return <footer className={`modalFooter${className ? ` ${className}` : ""}`}>{children}</footer>;
}

export default ModalFooter;
