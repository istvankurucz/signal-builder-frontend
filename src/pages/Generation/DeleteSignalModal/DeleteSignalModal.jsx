import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import P from "../../../components/ui/P/P";
import "./DeleteSignalModal.css";

function DeleteSignalModal({ show, setShow }) {
	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Delete signal</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<Modal.Body>
					<P className="deleteSignal__p">Are you sure you want to delete the signal?</P>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button variant="danger">Delete</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default DeleteSignalModal;
