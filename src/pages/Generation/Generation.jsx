import { useLayoutEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAdd,
	faBan,
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
import { useStateValue } from "../../contexts/Context API/StateProvider";
import Signal from "../../utils/classes/Signal";
import useLoadSignals from "../../hooks/storage/useLoadSignals";
import LoadSignalsModal from "./LoadSignalsModal/LoadSignalsModal";
import { useSearchParams } from "react-router-dom";

// const signals = new Array(10).fill(null).map((_, i) => `Signal ${i + 1}`);

function Generation() {
	// States
	const [{ signals }, dispatch] = useStateValue();
	const [index, setIndex] = useState(0);
	const [showSortSignalsModal, setShowSortSignalsModal] = useState(false);
	const [showLoadSignalsModal, setShowLoadSignalsModal] = useState(false);
	const [zoomChart, setZoomChart] = useState(false);
	useLoadSignals(setShowLoadSignalsModal);
	const [, setSearcParams] = useSearchParams();

	// console.log("Signals: ", signals);

	// Variables
	const chartData = {
		labels: ["1", "2", "3"],
		datasets: [
			{
				label: "Numbers",
				data: [1, 2, 3],
				backgroundColor: "blue",
				borderColor: "lightblue",
			},
		],
	};

	const chartOptions = {
		animation: false,
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Numbers",
				font: {
					size: 20,
				},
				color: "black",
			},
		},
	};

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

		// Add the signal to Context API
		const newSignals = [...signals, newSignal];
		dispatch({
			type: "SET_SIGNALS",
			signals: newSignals,
		});

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
							<SignalComponent id="1" name="Signal 1" />
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
							round
							title={zoomChart ? "Zoom out" : "Zoom in"}
							className="generation__chart__zoom"
							onClick={() => setZoomChart((zoom) => !zoom)}
						>
							<FontAwesomeIcon
								icon={zoomChart ? faMagnifyingGlassMinus : faMagnifyingGlassPlus}
							/>
						</Button>

						<Line data={chartData} options={chartOptions} />
					</ShadowBox>
				</section>
			</Container>
		</Page>
	);
}

export default Generation;
