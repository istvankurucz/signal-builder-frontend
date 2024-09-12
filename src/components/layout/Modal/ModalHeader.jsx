import "./ModalHeader.css";

function ModalHeader({ className = "", children }) {
	return (
		<header className={`modalHeader${className !== "" ? ` ${className}` : ""}`}>
			{children}
		</header>
	);
}

export default ModalHeader;
