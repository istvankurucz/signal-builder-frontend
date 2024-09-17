import ModalHeader from "./ModalHeader";
import ModalTitle from "./ModalTitle";
import ModalClose from "./ModalClose";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import "./Modal.css";

function Modal({ className = "", children }) {
	return <div className={`modal${className !== "" ? ` ${className}` : ""}`}>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Close = ModalClose;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
