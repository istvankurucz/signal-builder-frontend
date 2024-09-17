import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button/Button";
import "./ModalClose.css";

function ModalClose({ setShow }) {
	return (
		<Button variant="primary" round onClick={() => setShow(false)}>
			<FontAwesomeIcon icon={faXmark} />
		</Button>
	);
}

export default ModalClose;
