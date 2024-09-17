import Overlay from "../../../components/layout/Overlay/Overlay";
import Modal from "../../../components/layout/Modal/Modal";
import Button from "../../../components/ui/Button/Button";
import P from "../../../components/ui/P/P";
import Input from "../../../components/form/Input/Input";
import "./DuplicateSignalModal.css";

function DuplicateSignalModal({ show, setShow }) {
	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Duplicate signal</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<form>
					<Modal.Body>
						<P variant="info">Enter the name of the new signal.</P>

						<Input label="Name" placeholder="Name" id="duplicateSignalName" fullW />
					</Modal.Body>

					<Modal.Footer>
						<Button variant="info" onClick={() => setShow(false)}>
							Cancel
						</Button>
						<Button type="submit" variant="secondary">
							Create
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Overlay>
	);
}

export default DuplicateSignalModal;
