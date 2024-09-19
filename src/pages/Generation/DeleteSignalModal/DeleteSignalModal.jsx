import { useSearchParams } from "react-router-dom";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import P from "../../../components/ui/P/P";
import "./DeleteSignalModal.css";
import removeSignalFromSignals from "../../../utils/signal/removeSignalFromSignals";

function DeleteSignalModal({ show, setShow }) {
	const [{ signals }, dispatch] = useStateValue();
	const [searchParams, setSearcParams] = useSearchParams();

	function deleteSignal() {
		// Remove the signal from signals array
		const newSignals = removeSignalFromSignals(signals, dispatch, searchParams.get("signalId"));

		// Navigate to the first signal
		if (newSignals.length > 0) setSearcParams({ signalId: newSignals[0].id });
		else setSearcParams({});

		// Hide the modal
		setShow(false);

		// Show feedback
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "Signal deleted.",
				details: "",
			},
		});
	}

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
					<Button variant="danger" onClick={deleteSignal}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default DeleteSignalModal;
