import { useLayoutEffect, useState } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretRight,
	faMagnifyingGlassMinus,
	faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import ShadowBox from "../../layout/ShadowBox/ShadowBox";
import Button from "../Button/Button";
import useSampling from "../../../hooks/chart/useSampling";
import useMainChart from "../../../hooks/chart/useMainChart";
import Input from "../../form/Input/Input";
import Accordion from "../Accordion/Accordion";
import H3 from "../H3/H3";
import Checkbox from "../../form/Checkbox/Checkbox";
import chartColors from "../../../assets/chart/chartColors";
import getSignalById from "../../../utils/signal/getSignalById";
import updateSignals from "../../../utils/signal/updateSignals";
import "./MainChart.css";

function MainChart() {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	const { chartData, chartOptions } = useMainChart();
	const [sampling, setSampling] = useSampling();
	const [zoomChart, setZoomChart] = useState(false);
	//#endregion

	//#region Functions
	function changeSignalVisibility(e, signalId = "") {
		// Check if there is a signal ID
		if (signalId === "") {
			console.log("No signal ID was provided.");
			return;
		}

		// console.log(signalId);

		// Get the signal from state
		const signal = getSignalById(signals, signalId);

		// console.log(signal);

		// Check if the signal exists
		if (signal == null) return;

		// Update the visible property
		signal.visible = e.target.checked;

		// console.log(e.target.checked);

		// Update signals array
		updateSignals(signals, dispatch);
	}
	//#endregion

	//#region Hooks
	// Zoom out from chart if clicked outside
	useLayoutEffect(() => {
		function handleClick(e) {
			if (zoomChart) {
				const chart = e.target.closest(".mainChart");
				if (chart == undefined) setZoomChart(false);
			}
		}

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [zoomChart]);
	//#endregion

	return (
		<div className="mainChart__container">
			<ShadowBox p="0.5rem" className={`mainChart${zoomChart ? " mainChart--zoom" : ""}`}>
				<Button
					variant="primary"
					title={zoomChart ? "Zoom out" : "Zoom in"}
					className="mainChart__zoom"
					onClick={() => setZoomChart((zoom) => !zoom)}
				>
					<span className="mainChart__zoom__text">{zoomChart ? "Zoom out" : "Zoom in"}</span>
					<FontAwesomeIcon icon={zoomChart ? faMagnifyingGlassMinus : faMagnifyingGlassPlus} />
				</Button>

				<Line data={chartData} options={chartOptions} />
			</ShadowBox>

			<Input
				type="number"
				direction="horizontal"
				label="Sampling:"
				id="generationSampling"
				unit="Hz"
				className="mainChart__sampling"
				value={sampling}
				onChange={setSampling}
			/>

			<Accordion defaultOpen className="mainChart__legend">
				<Accordion.Header icon={faCaretRight}>
					<H3 className="mainChart__legend__title">Signals</H3>
				</Accordion.Header>

				<Accordion.Body className="mainChart__legend__container">
					{signals.map((signal, i) => (
						<div key={signal.id} style={{ "--color": chartColors[i] }}>
							<Checkbox
								label={signal.name}
								id={signal.id}
								defaultChecked={signal.visible}
								onChange={(e) => changeSignalVisibility(e, signal.id)}
								className="mainChart__legend__checkbox"
							/>
						</div>
					))}
				</Accordion.Body>
			</Accordion>
		</div>
	);
}

export default MainChart;
