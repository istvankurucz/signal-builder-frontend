import { useLayoutEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAdd,
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
import Signal from "../../components/ui/Signal/Signal";
import "./Generation.css";
import SortSignalsModal from "./SortSignalsModal/SortSignalsModal";

const signals = new Array(10).fill(null).map((_, i) => `Signal ${i + 1}`);

function Generation() {
	const [index, setIndex] = useState(0);
	const [showSortSignalsModal, setShowSortSignalsModal] = useState(false);
	const [zoomChart, setZoomChart] = useState(false);

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

	return (
		<Page className="generation">
			<SortSignalsModal show={showSortSignalsModal} setShow={setShowSortSignalsModal} />

			<Container centered className="generation__container">
				<section className="generation__section generation__section--signals">
					<ShadowBox className="generation__signals__general">
						<H2>General settings</H2>

						<P variant="info" className="generation__signals__general__p">
							Create a new signal or change their order.
						</P>

						<div className="generation__signals__general__buttons">
							<Button variant="accent">
								<FontAwesomeIcon icon={faAdd} />
								Add signal
							</Button>

							<Button variant="info" onClick={() => setShowSortSignalsModal(true)}>
								<FontAwesomeIcon icon={faSort} />
								Sort signals
							</Button>
						</div>
					</ShadowBox>

					<SignalTabSelect
						index={index}
						setIndex={setIndex}
						options={signals}
						className="generation__signals__select"
					/>

					<Signal id="1" name="Signal 1" />
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
