import { useRef, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
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
import "./Import.css";

function Import({ setShowLoadSignals }) {
	//#region States
	const [, dispatch] = useStateValue();
	useLoadSignals(setShowLoadSignals);
	const [delimiterAutoDetect, setDelimiterAutoDetect] = useState(true);
	//#endregion

	//#region Refs
	const headerRowsRef = useRef();
	const delimiterRef = useRef();
	const fileRef = useRef();
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
			// Get the files to be uploaded
			const files = e.dataTransfer.files;

			// Select the first one (only one file can be uploaded)
			const file = Array.from(files)[0];

			// Check file type
			if (file.type !== "text/csv") throw new Error("import/invalid-file");

			// Set the value of the input
			fileRef.current.files = files;
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

			// Delimiter
			if (!delimiterAutoDetect && delimiterRef.current.value === "") {
				throw new Error("import/delimiter-missing");
			}

			// Header rows
			const headerRows = parseInt(headerRowsRef.current.value);
			if (isNaN(headerRows) || headerRows < 0) {
				throw new Error("import/number-of-header-lines-missing");
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

		// Parse params
		const file = fileRef.current.files[0];
		const delimiter = delimiterAutoDetect ? "" : delimiterRef.current.value;
		const headerRows = parseInt(headerRowsRef.current.value);

		// Parsed data
		const { header, data } = await importData(file, delimiter, headerRows);
		console.log({ header, data });

		// Breakpoint detection
		const breakpoints = detectSignalBreakpoints(data);
		console.log(breakpoints);
	}
	//#endregion

	return (
		<Page className="import">
			<div className="import__main">
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

				<ShadowBox
					className="import__file"
					onDragOver={handleFileDragOver}
					onDragLeave={handleFileDragLeave}
					onDrop={handleFileDrop}
				>
					<H2>File</H2>

					<Input
						type="file"
						id="importFile"
						label="Select file"
						fullW
						className="import__file__input"
						ref={fileRef}
					/>
				</ShadowBox>

				<Button className="import__button" onClick={handleImportClick}>
					<FontAwesomeIcon icon={faArrowRightToBracket} />
					Import
				</Button>
			</div>
		</Page>
	);
}

export default Import;
