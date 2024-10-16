import { useRef, useState } from "react";
import axios from "../../config/axios";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/Input/Input";
import Container from "../../components/layout/Container/Container";
import Page from "../../components/layout/Page/Page";
import ShadowBox from "../../components/layout/ShadowBox/ShadowBox";
import Alert from "../../components/ui/Alert/Alert";
import H2 from "../../components/ui/H2/H2";
import Button from "../../components/ui/Button/Button";
import MainChart from "../../components/ui/MainChart/MainChart";
import useSampling from "../../hooks/chart/useSampling";
import generateExportFileName from "../../utils/general/generateExportFileName";
import P from "../../components/ui/P/P";
import useMainChart from "../../hooks/chart/useMainChart";
import "./Export.css";

function Export() {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	const [sampling, setSampling] = useSampling();
	const [filename, setFileName] = useState(generateExportFileName());
	const [showExportResult, setShowExportResult] = useState(false);
	const [outputFilePath, setOutputFilePath] = useState("");
	const { chartData } = useMainChart();
	//#endregion

	//#region Refs
	const delimiterRef = useRef();
	//#endregion

	//#region Functions
	async function exportData() {
		// Check if there is any signals
		if (signals.length === 0) {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message: "You have no signal.",
					details: "Create one before export.",
				},
			});
			return;
		}

		// Check filename
		if (filename === "") {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message: "Filename is not specified.",
					details: "",
				},
			});
			return;
		}

		// Check delimiter
		const delimiter = delimiterRef.current.value;
		if (delimiter === "") {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message: "Delimiter is not specified.",
					details: "",
				},
			});
			return;
		}

		// Create the data object
		const data = {
			xValues: chartData.labels,
			signals: chartData.datasets
				.filter((signal) => signal.data.length > 0)
				.map((signal) => ({
					name: signal.label,
					data: signal.data,
				})),
		};

		try {
			// Send the request
			const res = await axios.post("/write", {
				filename,
				delimiter,
				data,
			});

			// console.log(res);

			// Check the response
			const { path } = res.data;
			if (path == undefined) {
				dispatch({
					type: "SET_FEEDBACK",
					feedback: {
						show: true,
						type: "error",
						message: "There was an error while exporting the data.",
						details: "",
					},
				});
			} else {
				setOutputFilePath(path.replaceAll("\\", "\\"));
				setFileName(generateExportFileName());
			}

			setShowExportResult(true);
		} catch (e) {
			console.log("Error exporting the signals.\n", e);
		}
	}
	//#endregion

	return (
		<Page className="export">
			<Container centered className="export__container">
				<section className="export__left">
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

					<ShadowBox className="export__file">
						<H2>File</H2>

						<div className="export__file__inputs">
							{/* <Input
								type="text"
								label="Folder"
								id="exportFolder"
								placeholder="Folder"
								fullW
								defaultValue="<FOLDER>"
								readOnly
							/> */}

							<div className="export__file__full">
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
						</div>
					</ShadowBox>

					<Alert variant="info" className="export__alert">
						<P>Only the visible signals will be exported!</P>
						<P>You can change the visibility below the chart.</P>
					</Alert>

					<Button className="export__button" onClick={exportData}>
						<FontAwesomeIcon icon={faArrowRightFromBracket} />
						Export
					</Button>

					{showExportResult &&
						(outputFilePath === "" ? (
							<Alert variant="danger" icon={faXmark} className="export__result">
								<P>Error exporting the file.</P>
							</Alert>
						) : (
							<Alert variant="success" icon={faCheck} className="export__result">
								<P>File was written successfully. Path:</P>
								<P>{outputFilePath}</P>
							</Alert>
						))}
				</section>

				<MainChart />
			</Container>
		</Page>
	);
}

export default Export;
