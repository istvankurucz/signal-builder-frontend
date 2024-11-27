import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { useSearchParams } from "react-router-dom";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Modal from "../../../components/layout/Modal/Modal";
import P from "../../../components/ui/P/P";
import "./DeleteAllSignalsModal.css";
import updateSignals from "../../../utils/signal/updateSignals";
import Button from "../../../components/ui/Button/Button";
import saveSignals from "../../../utils/storage/saveToStorage";

function DeleteAllSignalsModal({ show, setShow }) {
	//#region States
	const [, dispatch] = useStateValue();
	const [, setSearcParams] = useSearchParams();
	//#endregion

	//#region Functions
	function deleteAllSignals() {
		// Remove all the signals
		updateSignals([], dispatch);
		saveSignals([]);

		// Set signal ID in URL
		setSearcParams({});

		// Hide modal
		setShow(false);

		// Show feedback
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "All signals deleted.",
				details: "",
			},
		});
	}
	//#endregion

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Delete all signals</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<Modal.Body>
					<P className="deleteAllSignals__p">
						Are you sure you want to delete all the signals?
					</P>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={deleteAllSignals}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default DeleteAllSignalsModal;
