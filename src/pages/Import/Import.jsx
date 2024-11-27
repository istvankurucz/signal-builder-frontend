import { useRef, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button/Button";
import Checkbox from "../../components/form/Checkbox/Checkbox";
import Input from "../../components/form/Input/Input";
import Page from "../../components/layout/Page/Page";
import ShadowBox from "../../components/layout/ShadowBox/ShadowBox";
import H2 from "../../components/ui/H2/H2";
import useLoadSignals from "../../hooks/storage/useLoadSignals";
import handleError from "../../utils/error/handleError";
import importData from "../../utils/import/importData";
import detectSignalBreakpoints from "../../utils/import/identification/detectSignalBreakpoints";
import Accordion from "../../components/ui/Accordion/Accordion";
import TabSelect from "../../components/ui/TabSelect/TabSelect";
import createSignal from "../../utils/signal/createSignal";
import updateSignals from "../../utils/signal/updateSignals";
import "./Import.css";

const importFileTypes = [
	{
		id: "csv",
		text: "CSV",
	},
	{
		id: "json",
		text: "JSON",
	},
];

function Import({ setShowLoadSignals }) {
	//#region States
	const [, dispatch] = useStateValue();
	useLoadSignals(setShowLoadSignals);
	const [delimiterAutoDetect, setDelimiterAutoDetect] = useState(true);
	const [fileTypeIndex, setFileTypeIndex] = useState(0);
	const navigate = useNavigate();
	//#endregion

	//#region Refs
	const headerRowsRef = useRef();
	const delimiterRef = useRef();
	const fileRef = useRef();
	const windowSizeRef = useRef();
	const amplitudeToleranceRef = useRef();
	const frequencyToleranceRef = useRef();
	//#endregion

	//#region Variables
	const fileType = importFileTypes[fileTypeIndex].id;
	//#endregion

	//#region Functions
	function setDropElementActiveClass(method) {
		const dropElement = document.querySelector(".import__file");

		if (method === "add") dropElement.classList.add("import__file--dragover");
		else dropElement.classList.remove("import__file--dragover");
	}

	function handleFileDragOver(e) {
		e.preventDefault();

		setDropElementActiveClass("add");
	}

	function handleFileDragLeave(e) {
		e.preventDefault();

		setDropElementActiveClass("remove");
	}

	function handleFileDrop(e) {
		e.preventDefault();

		try {
			// Get the uploaded files
			const files = Array.from(e.dataTransfer.files);

			// Check number of files
			if (files.length > 1) throw new Error("import/many-files");

			// Check the type of the file
			if (fileType === "csv" && files[0].type !== "text/csv") {
				throw new Error("import/invalid-file");
			}
			if (fileType === "json" && files[0].type !== "application/json") {
				throw new Error("import/invalid-file");
			}

			// Set the value of the input
			fileRef.current.files = e.dataTransfer.files;
		} catch (e) {
			handleError(e.message, dispatch);
		}

		setDropElementActiveClass("remove");
	}

	function validateImportInputs() {
		try {
			// File
			const file = fileRef.current.files[0];
			if (file == undefined) throw new Error("import/no-file");

			if (fileType === "json") return true;

			// Delimiter
			if (!delimiterAutoDetect && delimiterRef.current.value === "") {
				throw new Error("import/delimiter-missing");
			}

			// Header rows
			const headerRows = parseInt(headerRowsRef.current.value);
			if (isNaN(headerRows) || headerRows < 0) {
				throw new Error("import/number-of-header-lines-missing");
			}

			// Window size
			const windowSize = parseInt(windowSizeRef.current.value);
			if (isNaN(windowSize) || windowSize < 1) {
				throw new Error("import/invalid-window-size");
			}

			// Amplitude tolerance
			const amplitudeTolerance = parseFloat(amplitudeToleranceRef.current.value);
			if (isNaN(amplitudeTolerance) || amplitudeTolerance < 0) {
				throw new Error("import/invalid-tolerance");
			}

			// Frequency tolerance
			const frequencyTolerance = parseFloat(frequencyToleranceRef.current.value);
			if (isNaN(frequencyTolerance) || frequencyTolerance < 0) {
				throw new Error("import/invalid-tolerance");
			}

			return true;
		} catch (e) {
			handleError(e.message, dispatch);
			return false;
		}
	}

	async function handleImportClick() {
		// Check if the input values are valid
		if (!validateImportInputs()) return;

		// File
		const file = fileRef.current.files[0];

		// Process JSON file
		if (fileType === "json") {
			try {
				const fileReader = new FileReader();
				fileReader.onload = (e) => {
					const data = JSON.parse(e.target.result);
					if (!Array.isArray(data)) throw new Error("import/invalid-json");
					const signals = data.map((signal) => createSignal(signal));

					// Update the local signals
					updateSignals(signals, dispatch);

					// Navigate to /generation
					navigate(`/generation?signalId=${signals[0].id}`);

					// Show feedback
					dispatch({
						type: "SET_FEEDBACK",
						feedback: {
							show: true,
							type: "info",
							message: "Successful import.",
							details: "",
						},
					});
				};
				fileReader.readAsText(file);
			} catch (e) {
				handleError(e.message, dispatch);
				console.log("Error:\n", e);
			}

			return;
		}

		// File settings
		const delimiter = delimiterAutoDetect ? "" : delimiterRef.current.value;
		const headerRows = parseInt(headerRowsRef.current.value);

		// Parse settings
		const windowSize = parseInt(windowSizeRef.current.value);
		const amplitudeTolerance = parseFloat(amplitudeToleranceRef.current.value);
		const frequencyTolerance = parseFloat(frequencyToleranceRef.current.value);

		// Parsed data
		const { header, data } = await importData(file, delimiter, headerRows);

		// Breakpoint detection
		const breakpoints = detectSignalBreakpoints(data, windowSize, {
			amplitude: amplitudeTolerance,
			frequency: frequencyTolerance,
		});
		console.log(breakpoints);
	}
	//#endregion

	return (
		<Page className="import">
			<div className="import__main">
				<ShadowBox
					className="import__file"
					onDragOver={handleFileDragOver}
					onDragLeave={handleFileDragLeave}
					onDrop={handleFileDrop}
				>
					<H2>File</H2>

					<TabSelect
						options={importFileTypes.map((type) => type.text)}
						index={fileTypeIndex}
						setIndex={setFileTypeIndex}
						className="import__file__type"
					/>

					<Input
						type="file"
						id="importFile"
						label={`Select ${fileType === "csv" ? "CSV" : "JSON"} file`}
						fullW
						className="import__file__input"
						ref={fileRef}
					/>
				</ShadowBox>

				{fileType === "csv" && (
					<>
						<ShadowBox className="import__settings">
							<H2>Settings</H2>

							<div className="import__settings__inputs">
								<Input
									type="number"
									id="importHeaderRows"
									label="Number of header rows"
									placeholder="Number of header rows"
									defaultValue="1"
									ref={headerRowsRef}
								/>

								<div className="import__settings__delimiter">
									<Checkbox
										label="Auto detect delimiter"
										id="importDelimiterAutoDetect"
										checked={delimiterAutoDetect}
										onChange={(e) => setDelimiterAutoDetect(e.target.checked)}
									/>
									{!delimiterAutoDetect && (
										<Input
											type="text"
											id="importDelimiter"
											label="Delimiter"
											placeholder="Delimiter"
											defaultValue=";"
											width="4rem"
											className="import__settings__delimiter__input"
											ref={delimiterRef}
										/>
									)}
								</div>
							</div>
						</ShadowBox>

						<ShadowBox>
							<H2>Parsing</H2>

							<Input
								direction="horizontal"
								type="number"
								label="Window size:"
								id="importWindowSize"
								defaultValue={7}
								min={1}
								className="import__parsing__window"
								ref={windowSizeRef}
							/>

							<Accordion>
								<Accordion.Header icon={faCaretRight}>Tolerances</Accordion.Header>
								<Accordion.Body>
									<div className="import__parsing__inputs">
										<Input
											direction="horizontal"
											type="number"
											label="Amplitude:"
											id="importAmplitudeTolerance"
											defaultValue={0.01}
											min={0}
											ref={amplitudeToleranceRef}
										/>
										<Input
											direction="horizontal"
											type="number"
											label="Frequency:"
											id="importAmplitudeTolerance"
											defaultValue={0.01}
											min={0}
											unit="Hz"
											ref={frequencyToleranceRef}
										/>
									</div>
								</Accordion.Body>
							</Accordion>
						</ShadowBox>
					</>
				)}

				<Button className="import__button" onClick={handleImportClick}>
					<FontAwesomeIcon icon={faArrowRightToBracket} />
					Import
				</Button>
			</div>
		</Page>
	);
}

export default Import;
