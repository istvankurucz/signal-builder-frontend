import { useRef, useState } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAdd,
	faArrowDown,
	faBan,
	faCaretRight,
	faClone,
	faEllipsisV,
	faSort,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ShadowBox from "../../layout/ShadowBox/ShadowBox";
import H2 from "../H2/H2";
import H3 from "../H3/H3";
import Input from "../../form/Input/Input";
import Button from "../Button/Button";
import Accordion from "../Accordion/Accordion";
import FunctionComponent from "../Function/Function";
import Dropdown from "../Dropdown/Dropdown";
import SortFunctionsModal from "../../../pages/Generation/SortFunctionsModal/SortFunctionsModal";
import DuplicateSignalModal from "../../../pages/Generation/DuplicateSignalModal/DuplicateSignalModal";
import DeleteSignalModal from "../../../pages/Generation/DeleteSignalModal/DeleteSignalModal";
import useSignal from "../../../hooks/signal/useSignal";
import P from "../P/P";
import Function from "../../../utils/classes/Function";
import "./Signal.css";
import addFunction from "../../../utils/function/addFunction";
import updateSignals from "../../../utils/signal/updateSignals";
import useSignalInputs from "../../../hooks/signal/useSignalInputs";
import SineBuilderModal from "../../../pages/Generation/SineBuilderModal/SineBuilderModal";

function Signal({ className = "" }) {
	//#region States
	const [{ signals }, dispatch] = useStateValue();
	const signal = useSignal();
	const { name, setName, offset, setOffset, scale, setScale } = useSignalInputs();
	const [lastUpdatedProperty, setLastUpdatedProperty] = useState("");
	const [showJumpButton, setShowJumpButton] = useState(false);
	const [showSortFunctionsModal, setShowSortFunctionsModal] = useState(false);
	const [showDuplicateSignalModal, setShowDuplicateSignalModal] = useState(false);
	const [showDeleteSignalModal, setShowDeleteSignalModal] = useState(false);
	const [showSineBuilderModal, setShowSineBuilderModal] = useState(false);
	//#endregion

	//#region Refs
	const timeoutRef = useRef();
	//#endregion

	//#region Functions
	function onInputChange(property, value) {
		if (property === "name") {
			updateSignalProperty(property, value);
			return;
		}

		// Clear the current timeout
		if (property === lastUpdatedProperty) clearTimeout(timeoutRef.current);

		// Update the last updated property name
		setLastUpdatedProperty(property);

		// Set a new timeout for update
		timeoutRef.current = setTimeout(() => {
			updateSignalProperty(property, value);
		}, 1000);
	}

	function updateSignalProperty(property, value) {
		// Set the property of the signal
		switch (property) {
			case "name":
				signal.setName(value);
				break;
			case "offset":
				signal.setOffset(value);
				break;
			case "scale":
				signal.setScale(value);
				break;
		}

		// Update signals array
		updateSignals(signals, dispatch);
	}

	function updateSignalName(e) {
		e.preventDefault();

		updateSignalProperty("name", name);
	}

	function jumpToBottom(e) {
		e.stopPropagation();

		window.scrollTo(0, document.documentElement.scrollHeight);
	}

	function createFunction(e) {
		e.stopPropagation();

		// Create the funciton
		const newFunction = new Function();

		// Update the signal
		addFunction(signal, newFunction);

		// Update signals array with the new signal
		updateSignals(signals, dispatch);

		// Show jump button
		setShowJumpButton(true);

		// After 3 seconds hide the jump button
		setTimeout(() => setShowJumpButton(false), 3 * 1000);
	}
	//#endregion

	return (
		<>
			<SortFunctionsModal show={showSortFunctionsModal} setShow={setShowSortFunctionsModal} />
			<DuplicateSignalModal
				show={showDuplicateSignalModal}
				setShow={setShowDuplicateSignalModal}
			/>
			<DeleteSignalModal show={showDeleteSignalModal} setShow={setShowDeleteSignalModal} />
			<SineBuilderModal show={showSineBuilderModal} setShow={setShowSineBuilderModal} />

			<ShadowBox className={`signal${className !== "" ? ` ${className}` : ""}`}>
				<header className="signal__header">
					<H2 className="signal__title">{signal?.name}</H2>

					<Dropdown className="signal__header__more">
						<Dropdown.Button type="icon" className="signal__header__more__button">
							<FontAwesomeIcon icon={faEllipsisV} />
						</Dropdown.Button>

						<Dropdown.Items>
							{signal?.functions.length > 1 && (
								<Dropdown.Item
									className="signal__header__more__item"
									onClick={() => setShowSortFunctionsModal(true)}
								>
									<FontAwesomeIcon icon={faSort} />
									Sort functions
								</Dropdown.Item>
							)}
							<Dropdown.Item
								className="signal__header__more__item"
								onClick={() => setShowDuplicateSignalModal(true)}
							>
								<FontAwesomeIcon icon={faClone} />
								Duplicate
							</Dropdown.Item>
							<Dropdown.Item
								className="signal__header__more__item signal__header__more__item--danger"
								onClick={() => setShowDeleteSignalModal(true)}
							>
								<FontAwesomeIcon icon={faTrashCan} />
								Delete
							</Dropdown.Item>
						</Dropdown.Items>
					</Dropdown>
				</header>

				<Accordion defaultOpen className="signal__settings">
					<Accordion.Header icon={faCaretRight}>
						<H3 className="signal__subtitle">Settings</H3>
					</Accordion.Header>

					<Accordion.Body>
						<form onSubmit={updateSignalName} className="signal__settings__name">
							<Input
								direction="horizontal"
								label="Name:"
								placeholder="Name"
								fullW
								id={`${signal?.id}-name`}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<Button type="submit">Save</Button>
						</form>

						<div className="signal__settings__params">
							<Input
								type="number"
								direction="vertical"
								label="Offset:"
								placeholder="Offset"
								width="7rem"
								id={`${signal?.id}-offset`}
								value={isNaN(offset) ? "" : offset}
								onChange={(e) => {
									setOffset(parseFloat(e.target.value));
									onInputChange("offset", parseFloat(e.target.value));
								}}
							/>
							<Input
								type="number"
								direction="vertical"
								label="Scale (x):"
								placeholder="Scale (x)"
								width="7rem"
								id={`${signal?.id}-scaleX`}
								value={isNaN(scale.x) ? "" : scale.x}
								onChange={(e) => {
									setScale((prev) => ({ ...prev, x: parseFloat(e.target.value) }));
									onInputChange("scale", {
										...scale,
										x: parseFloat(e.target.value),
									});
								}}
							/>
							<Input
								type="number"
								direction="vertical"
								label="Scale (y):"
								placeholder="Scale (y)"
								width="7rem"
								id={`${signal?.id}-scaleY`}
								value={isNaN(scale.y) ? "" : scale.y}
								onChange={(e) => {
									setScale((prev) => ({ ...prev, y: parseFloat(e.target.value) }));
									onInputChange("scale", {
										...scale,
										y: parseFloat(e.target.value),
									});
								}}
							/>
						</div>
					</Accordion.Body>
				</Accordion>

				<Accordion defaultOpen className="signal__functions">
					<Accordion.Header icon={faCaretRight} className="signal__functions__header">
						<H3 className="signal__subtitle">Functions</H3>

						<div className="signal__functions__header__buttons">
							{showJumpButton && (
								<Button
									variant="secondary"
									outlined
									className="signal__functions__jump"
									onClick={jumpToBottom}
								>
									<FontAwesomeIcon icon={faArrowDown} />
									Jump to function
								</Button>
							)}

							<Button
								variant="accent"
								onClick={createFunction}
								className="signal__functions__add"
							>
								<FontAwesomeIcon icon={faAdd} />
								Add function
							</Button>
						</div>
					</Accordion.Header>

					<Accordion.Body className="signal__functions__container">
						{signal?.functions.length === 0 ? (
							<div className="signal__functions__noFunction">
								<FontAwesomeIcon
									icon={faBan}
									className="signal__functions__noFunction__icon"
								/>
								<P>There is no function.</P>
							</div>
						) : (
							signal?.functions.map((f) => (
								<FunctionComponent
									key={f.id}
									func={f}
									setShowSineBuilder={setShowSineBuilderModal}
								/>
							))
						)}
					</Accordion.Body>
				</Accordion>
			</ShadowBox>
		</>
	);
}

export default Signal;
