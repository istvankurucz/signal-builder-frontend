import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import "./Modal.css";

function Modal({ className = "", children }) {
	return <div className={`modal${className !== "" ? ` ${className}` : ""}`}>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
