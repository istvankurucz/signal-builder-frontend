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
import Checkbox from "../../components/form/Checkbox/Checkbox";
import useMainChart from "../../hooks/chart/useMainChart";
import Tooltip from "../../components/ui/Tooltip/Tooltip";
import "./Export.css";

function Export() {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	const [sampling, setSampling] = useSampling();
	const [useDifferentPath, setUseDifferentPath] = useState(false);
	const [filename, setFileName] = useState(generateExportFileName());
	const [showExportResult, setShowExportResult] = useState(false);
	const [outputFilePath, setOutputFilePath] = useState("");
	const [showCopyTooltip, setShowCopyTooltip] = useState(false);
	const { chartData } = useMainChart();
	//#endregion

	//#region Refs
	const delimiterRef = useRef();
	const directoryPathRef = useRef();
	//#endregion

	//#region Functions
	async function exportData() {
		// Check if there is any signals
		if (signals.length === 0) {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "danger",
					message: "You have no signal.",
					details: "Create one before export.",
				},
			});
			return;
		}

		// Check directory path
		let directory = null;
		if (useDifferentPath) {
			if (directoryPathRef.current.value === "") {
				dispatch({
					type: "SET_FEEDBACK",
					feedback: {
						show: true,
						type: "danger",
						message: "Directory is not specified.",
						details: "Enter a directory or use the default one.",
					},
				});
				return;
			}

			directory = directoryPathRef.current.value;
		}

		// Check filename
		if (filename === "") {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "danger",
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
					type: "danger",
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
				directory,
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
				setOutputFilePath(path);
				setFileName(generateExportFileName());
			}

			setShowExportResult(true);
			window.scrollTo(0, document.body.scrollHeight);
		} catch (e) {
			console.log("Error exporting the signals.\n", e);
		}
	}

	function copyPath() {
		window.navigator.clipboard.writeText(outputFilePath);

		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "Path copied.",
				details: "",
			},
		});
	}
	//#endregion

	return (
		<Page className="export">
			<Page.Container centered className="export__container">
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
							<div className="export__differentDirectory">
								<P variant="info">
									By default the output directory is:{" "}
									<strong>Documents/AVL Signal Builder data</strong>
								</P>
								<Checkbox
									label="Use different path"
									id="exportUseDifferentPath"
									checked={useDifferentPath}
									onChange={(e) => setUseDifferentPath(e.target.checked)}
								/>
								{useDifferentPath && (
									<Input
										type="text"
										label="Directory path"
										id="exportFolder"
										placeholder="Directory path (e.g. C:\Users\...)"
										fullW
										className="export__directory"
										ref={directoryPathRef}
									/>
								)}
							</div>

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
								<div
									className="export__result__file"
									onMouseEnter={() => setShowCopyTooltip(true)}
									onMouseLeave={() => setShowCopyTooltip(false)}
									onClick={copyPath}
								>
									<P>{outputFilePath}</P>
									<Tooltip align="center" show={showCopyTooltip}>
										Click to copy path
									</Tooltip>
								</div>
							</Alert>
						))}
				</section>

				<MainChart />
			</Page.Container>
		</Page>
	);
}

export default Export;
