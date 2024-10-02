import { useLayoutEffect, useRef, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import useLoadSignals from "../../hooks/storage/useLoadSignals";
import LoadSignalsModal from "./LoadSignalsModal/LoadSignalsModal";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Line } from "react-chartjs-2";
import {
	faAdd,
	faBan,
	faCaretRight,
	faMagnifyingGlassMinus,
	faMagnifyingGlassPlus,
	faSort,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/layout/Container/Container";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/ui/Button/Button";
import H2 from "../../components/ui/H2/H2";
import ShadowBox from "../../components/layout/ShadowBox/ShadowBox";
import P from "../../components/ui/P/P";
import SignalTabSelect from "../../components/ui/SignalTabSelect/SignalTabSelect";
import SignalComponent from "../../components/ui/Signal/Signal";
import SortSignalsModal from "./SortSignalsModal/SortSignalsModal";
import "./Generation.css";
import Signal from "../../utils/classes/Signal";
import addSignalToSignals from "../../utils/signal/addSignalToSignals";
import H3 from "../../components/ui/H3/H3";
import Accordion from "../../components/ui/Accordion/Accordion";
import Checkbox from "../../components/form/Checkbox/Checkbox";
import getSignalById from "../../utils/signal/getSignalById";
import updateSignals from "../../utils/signal/updateSignals";
import useMainChart from "../../hooks/chart/useMainChart";
import Input from "../../components/form/Input/Input";
import chartColors from "../../assets/chart/chartColors";

function Generation() {
	// States
	const [{ signals }, dispatch] = useStateValue();
	const [showLoadSignalsModal, setShowLoadSignalsModal] = useState(false);
	const [showSortSignalsModal, setShowSortSignalsModal] = useState(false);
	useLoadSignals(setShowLoadSignalsModal);
	const [zoomChart, setZoomChart] = useState(false);
	const [index, setIndex] = useState(0);
	const { chartData, chartOptions, sampling, setSampling } = useMainChart();
	const [, setSearcParams] = useSearchParams();

	console.log("Chart data: ", chartData);
	// console.log("Signals: ", signals);

	// Refs
	const timeoutRef = useRef();

	// Hooks
	// Zoom out from chart if clicked outside
	useLayoutEffect(() => {
		function handleClick(e) {
			if (zoomChart) {
				const chart = e.target.closest(".generation__chart");
				if (chart == undefined) setZoomChart(false);
			}
		}

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [zoomChart]);

	// Functions
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

	function handleSamplingChange(e) {
		// Clear the timeout
		clearTimeout(timeoutRef.current);

		// Set a new timer
		timeoutRef.current = setTimeout(() => {
			// Get the input value
			const newSampling = parseFloat(e.target.value);

			// Change the sampling
			if (isNaN(newSampling)) setSampling(1);
			else setSampling(newSampling);
		}, 1000);
	}

	function changeSignalVisibility(e, signalId = "") {
		// Check if there is a signal ID
		if (signalId === "") {
			console.log("No signal ID was provided.");
			return;
		}

		// Get the signal from state
		const signal = getSignalById(signals, signalId);

		// Check if the signal exists
		if (signal == null) return;

		// Update the visible property
		signal.setVisible(e.target.checked);

		// Update signals array
		updateSignals(signals, dispatch);
	}

	return (
		<Page className="generation">
			<SortSignalsModal show={showSortSignalsModal} setShow={setShowSortSignalsModal} />
			<LoadSignalsModal show={showLoadSignalsModal} setShow={setShowLoadSignalsModal} />

			<Container centered className="generation__container">
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
							<FontAwesomeIcon
								icon={faBan}
								className="generation__signals__noSignal__icon"
							/>
							<div className="generation__signals__noSignal__description">
								<P className="">There is no signal.</P>
								<P>
									Click on <strong>Add Signal</strong> button to create one.
								</P>
							</div>
						</div>
					)}
				</section>

				<section className="generation__section generation__section--chart">
					<ShadowBox
						p="0.5rem"
						className={`generation__chart${zoomChart ? " generation__chart--zoom" : ""}`}
					>
						<Button
							variant="primary"
							title={zoomChart ? "Zoom out" : "Zoom in"}
							className="generation__chart__zoom"
							onClick={() => setZoomChart((zoom) => !zoom)}
						>
							<span className="generation__chart__zoom__text">
								{zoomChart ? "Zoom out" : "Zoom in"}
							</span>
							<FontAwesomeIcon
								icon={zoomChart ? faMagnifyingGlassMinus : faMagnifyingGlassPlus}
							/>
						</Button>

						<Line data={chartData} options={chartOptions} />
					</ShadowBox>

					<Input
						type="number"
						direction="horizontal"
						label="Sampling:"
						id="generationSampling"
						defaultValue={sampling}
						unit="Hz"
						className="generation__sampling"
						onChange={handleSamplingChange}
					/>

					<Accordion defaultOpen className="generation__legend">
						<Accordion.Header icon={faCaretRight}>
							<H3 className="generation__legend__title">Signals</H3>
						</Accordion.Header>

						<Accordion.Body className="generation__legend__container">
							{signals.map((signal, i) => (
								<div key={signal.id} style={{ "--color": chartColors[i] }}>
									<Checkbox
										label={signal.name}
										id={signal.id}
										defaultChecked={signal.visible}
										onChange={(e) => changeSignalVisibility(e, signal.id)}
										className="generation__legend__checkbox"
									/>
								</div>
							))}
						</Accordion.Body>
					</Accordion>
				</section>
			</Container>
		</Page>
	);
}

export default Generation;
