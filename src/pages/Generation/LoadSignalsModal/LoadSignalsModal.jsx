import { useSearchParams } from "react-router-dom";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import H3 from "../../../components/ui/H3/H3";
import P from "../../../components/ui/P/P";
import getSignals from "../../../utils/storage/getSignals";
import getSignalsUpdatedAt from "../../../utils/storage/getSignalsUpdatedAt";
import "./LoadSignalsModal.css";

function LoadSignalsModal({ show, setShow }) {
	// States
	const [, dispatch] = useStateValue();
	const [, setSearcParams] = useSearchParams();

	// Variables
	const signals = getSignals();
	const lastSessionDate = getSignalsUpdatedAt().toLocaleString();

	// Functions
	function goBack() {
		window.localStorage.removeItem("signals");
		setShow(false);
	}

	function loadSignals() {
		dispatch({
			type: "SET_SIGNALS",
			signals,
		});

		setSearcParams({ signalId: signals[0].id });

		setShow(false);
	}

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Load signals?</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<Modal.Body>
					<P className="loadSignals__time">Last session: {lastSessionDate}</P>

					<H3>Signals</H3>
					<ul className="loadSignals__signals">
						{signals.map((signal) => (
							<li key={signal.id}>{signal.name}</li>
						))}
					</ul>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" onClick={goBack}>
						No
					</Button>
					<Button onClick={loadSignals}>Load</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default LoadSignalsModal;
