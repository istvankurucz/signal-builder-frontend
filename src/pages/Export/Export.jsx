import { useRef, useState } from "react";
import papa from "papaparse";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCheck, faInfo } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/Input/Input";
import Page from "../../components/layout/Page/Page";
import ShadowBox from "../../components/layout/ShadowBox/ShadowBox";
import Alert from "../../components/ui/Alert/Alert";
import H2 from "../../components/ui/H2/H2";
import Button from "../../components/ui/Button/Button";
import useSampling from "../../hooks/chart/useSampling";
import generateExportFileName from "../../utils/general/generateExportFileName";
import P from "../../components/ui/P/P";
import useMainChart from "../../hooks/chart/useMainChart";
import useLoadSignals from "../../hooks/storage/useLoadSignals";
import handleError from "../../utils/error/handleError";
import "./Export.css";

function Export({ setShowLoadSignals }) {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	useLoadSignals(setShowLoadSignals);
	const [sampling, setSampling] = useSampling();
	const [filename, setFileName] = useState(generateExportFileName());
	const [showExportResult, setShowExportResult] = useState(false);
	const { chartData } = useMainChart();
	//#endregion

	//#region Refs
	const delimiterRef = useRef();
	//#endregion

	//#region Functions
	function validateExportInputs() {
		try {
			// Signals
			if (signals.length === 0) throw new Error("export/no-data");

			// Filename
			if (filename === "") throw new Error("export/filename-missing");

			// Delimiter
			const delimiter = delimiterRef.current.value;
			if (delimiter === "") throw new Error("export/delimiter-missing");

			return true;
		} catch (e) {
			handleError(e.message, dispatch);
			return false;
		}
	}

	function getCSVData(chartData) {
		try {
			// Check if there is chart data
			if (chartData == null || chartData.datasets.length === 0) {
				throw new Error("export/no-data");
			}

			// Filter the visible signals
			const visibleSignals = chartData.datasets.filter((signal) => signal.data.length > 0);

			// Header
			const signalNames = visibleSignals.map((signal) => signal.label);
			const header = ["Time [s]", ...signalNames];

			// Records
			const records = chartData.labels.map((time, i) => {
				const signalValues = chartData.datasets.map((signal) => signal.data[i]);
				return [time, ...signalValues];
			});

			// CSV data
			const csvData = [header, ...records];
			return csvData;
		} catch (e) {
			handleError(e.message, dispatch);
			return [];
		}
	}

	function downloadFile(url, filename) {
		// Create an a element to the URL
		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = filename; // name of the file that will be downloaded

		// Trigger the event
		document.body.appendChild(a);
		a.click();

		// Remove the element
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	}

	async function exportData() {
		// Hide the result
		setShowExportResult(false);

		// Check if the inputs to export are correct
		if (!validateExportInputs()) return;

		// Get the CSV data
		const csvData = getCSVData(chartData);
		if (csvData.length === 0) return;

		// Parse the data to CSV string
		const delimiter = delimiterRef.current.value;
		const csvString = papa.unparse(csvData, {
			header: true,
			delimiter,
		});

		// Download the CSV string as a CSV file
		const csvURL = window.URL.createObjectURL(new Blob([csvString], { type: "text/csv" }));
		downloadFile(csvURL, `${filename}.csv`);

		// Download the parameters as a JSON file
		const jsonURL = window.URL.createObjectURL(
			new Blob([JSON.stringify(signals)], { type: "application/json" })
		);
		downloadFile(jsonURL, `${filename}-parameters.json`);

		// Show the result alert
		setShowExportResult(true);

		// Generate a new filename
		setFileName(generateExportFileName());

		// Scroll to the result
		setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
	}
	//#endregion

	return (
		<Page className="export">
			<section className="export__main">
				<ShadowBox className="export__settings">
					<H2>Settings</H2>

					<div className="export__settings__inputs">
						<Input
							type="number"
							min="1"
							label="Sampling"
							id="exportSampling"
							placeholder="Sampling"
							unit="Hz"
							value={sampling}
							onChange={setSampling}
						/>

						<Input
							type="text"
							label="Delimiter"
							id="exportDelimiter"
							placeholder="Delimiter"
							defaultValue=";"
							width="4rem"
							ref={delimiterRef}
						/>
					</div>
				</ShadowBox>

				<Alert variant="info" className="export__alert">
					<P>Only the visible signals will be exported!</P>
					<P>You can change the visibility below the chart.</P>
				</Alert>

				<ShadowBox className="export__file">
					<H2>File</H2>

					<div className="export__file__inputs">
						<Input
							type="text"
							label="Filename"
							id="exportFileName"
							placeholder="Filename"
							fullW
							value={filename}
							onChange={(e) => setFileName(e.target.value)}
						/>
						<Input
							type="text"
							label=""
							id="exportFileExtension"
							width="3.5rem"
							value=".csv"
							readOnly
						/>
					</div>
				</ShadowBox>

				<Alert variant="info" icon={faInfo} className="export__alert export__alert--files">
					<P>2 files will be exported.</P>
					<ul>
						<li>
							<strong>.csv</strong>: Contains the raw data.
						</li>
						<li>
							<strong>.json</strong>: Contains the parameters of the signals, functions.
						</li>
					</ul>
				</Alert>

				<Button className="export__button" onClick={exportData}>
					<FontAwesomeIcon icon={faArrowRightFromBracket} />
					Export
				</Button>

				{showExportResult && (
					<Alert variant="success" icon={faCheck} className="export__result">
						<P>File was written successfully.</P>
						<P>
							Check it in your <strong>Downloads</strong> folder.
						</P>
					</Alert>
				)}
			</section>
		</Page>
	);
}

export default Export;
