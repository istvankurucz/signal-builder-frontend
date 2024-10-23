import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { useSearchParams } from "react-router-dom";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Modal from "../../../components/layout/Modal/Modal";
import Button from "../../../components/ui/Button/Button";
import P from "../../../components/ui/P/P";
import Input from "../../../components/form/Input/Input";
import Signal from "../../../utils/classes/Signal";
import getSignalById from "../../../utils/signal/getSignalById";
import addSignalToSignals from "../../../utils/signal/addSignalToSignals";
import useDuplicateSignalName from "../../../hooks/signal/useDuplicateSignalName";
import copyFunctions from "../../../utils/function/copyFunctions";
import "./DuplicateSignalModal.css";

function DuplicateSignalModal({ show, setShow }) {
	const [{ signals }, dispatch] = useStateValue();
	const [searchParams, setSearcParams] = useSearchParams();
	const [name, setName] = useDuplicateSignalName();

	function duplicateSignal(e) {
		e.preventDefault();

		// Create the new signal
		const newSignal = new Signal();

		// Get the signal to be copied
		const signal = getSignalById(signals, searchParams.get("signalId"));

		// Copy the properties
		newSignal.name = name;
		newSignal.offset = signal.offset;
		newSignal.scale = signal.scale;
		newSignal.functions = copyFunctions(signal.functions);

		// Add the new signal to signals
		addSignalToSignals(signals, dispatch, newSignal);

		// Set the signalID in search params
		setSearcParams({ signalId: newSignal.id });

		// Hide the modal
		setShow(false);

		// Show feedback
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "Signal duplicated.",
				details: "",
			},
		});
	}

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Duplicate signal</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<form onSubmit={duplicateSignal}>
					<Modal.Body>
						<P variant="info">Enter the name of the new signal.</P>

						<Input
							label="Name"
							placeholder="Name"
							id="duplicateSignalName"
							fullW
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
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
