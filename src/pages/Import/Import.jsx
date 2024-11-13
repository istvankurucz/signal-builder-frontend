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
import "./Import.css";
import importData from "../../utils/import/importData";
import papa from "papaparse";

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

				<ShadowBox className="inport__file">
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
