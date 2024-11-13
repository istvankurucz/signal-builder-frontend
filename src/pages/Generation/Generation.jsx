import { useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBan, faSort } from "@fortawesome/free-solid-svg-icons";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/ui/Button/Button";
import H2 from "../../components/ui/H2/H2";
import ShadowBox from "../../components/layout/ShadowBox/ShadowBox";
import P from "../../components/ui/P/P";
import SignalTabSelect from "../../components/ui/SignalTabSelect/SignalTabSelect";
import SignalComponent from "../../components/ui/Signal/Signal";
import SortSignalsModal from "./SortSignalsModal/SortSignalsModal";
import Signal from "../../utils/classes/Signal";
import addSignalToSignals from "../../utils/signal/addSignalToSignals";
import useLoadSignals from "../../hooks/storage/useLoadSignals";
import "./Generation.css";

function Generation({ setShowLoadSignals }) {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	useLoadSignals(setShowLoadSignals);
	const [showSortSignalsModal, setShowSortSignalsModal] = useState(false);
	const [index, setIndex] = useState(0);
	const [, setSearcParams] = useSearchParams();
	//#endregion

	//#region Functions
	function createSignal() {
		// Create the new signal
		const newSignal = new Signal();

		// Add the signal to local state
		addSignalToSignals(signals, dispatch, newSignal);

		// Set the signalID in search params
		setSearcParams({ signalId: newSignal.id });

		// Show feedback
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "Signal created.",
				details: "",
			},
		});
	}
	//#endregion

	return (
		<Page className="generation">
			<SortSignalsModal show={showSortSignalsModal} setShow={setShowSortSignalsModal} />

			<section className="generation__section generation__section--signals">
				<ShadowBox className="generation__signals__general">
					<H2>General settings</H2>

					<P variant="info" className="generation__signals__general__p">
						Create a new signal or change their order.
					</P>

					<div className="generation__signals__general__buttons">
						<Button variant="accent" onClick={createSignal}>
							<FontAwesomeIcon icon={faAdd} />
							Add signal
						</Button>

						{signals.length > 1 && (
							<Button variant="info" onClick={() => setShowSortSignalsModal(true)}>
								<FontAwesomeIcon icon={faSort} />
								Sort signals
							</Button>
						)}
					</div>
				</ShadowBox>

				{signals.length > 0 ? (
					<>
						<SignalTabSelect
							index={index}
							setIndex={setIndex}
							options={signals.map((signal) => signal.name)}
							className="generation__signals__select"
						/>
						<SignalComponent />
					</>
				) : (
					<div className="generation__signals__noSignal">
						<FontAwesomeIcon icon={faBan} className="generation__signals__noSignal__icon" />
						<div className="generation__signals__noSignal__description">
							<P className="">There is no signal.</P>
							<P>
								Click on <strong>Add Signal</strong> button to create one.
							</P>
						</div>
					</div>
				)}
			</section>
		</Page>
	);
}

export default Generation;
