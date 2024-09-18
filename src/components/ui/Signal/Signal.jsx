import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAdd,
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
import { useStateValue } from "../../../contexts/Context API/StateProvider";

function Signal({ className = "" }) {
	const [{ signals }, dispatch] = useStateValue();
	const signal = useSignal();
	const [showSortFunctionsModal, setShowSortFunctionsModal] = useState(false);
	const [showDuplicateSignalModal, setShowDuplicateSignalModal] = useState(false);
	const [showDeleteSignalModal, setShowDeleteSignalModal] = useState(false);

	console.log("Signal: ", signal);

	function addFunction(signals = [], signalId = "") {
		// Check if there is a signal
		if (signalId === "") return null;

		// Set the functions of the signal
		const newFunction = new Function();
		const signal = signals.find((signal) => signal.id === signalId);

		const newFunctions = [...signal.functions, newFunction];
		signal.functions = newFunctions;

		// Overwrite the signals
		return signals.map((s) => {
			if (s.id === signalId) return signal;
			else return s;
		});
	}

	function createFunction(e) {
		e.stopPropagation();

		// Create the new signals
		const newSignals = addFunction(signals, signal.id);

		dispatch({
			type: "SET_SIGNALS",
			signals: newSignals,
		});

		// Show feedback
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "Function created.",
				details: "",
			},
		});
	}

	return (
		<>
			<SortFunctionsModal show={showSortFunctionsModal} setShow={setShowSortFunctionsModal} />
			<DuplicateSignalModal
				show={showDuplicateSignalModal}
				setShow={setShowDuplicateSignalModal}
			/>
			<DeleteSignalModal show={showDeleteSignalModal} setShow={setShowDeleteSignalModal} />

			<ShadowBox className={`signal${className !== "" ? ` ${className}` : ""}`}>
				<header className="signal__header">
					<H2 className="signal__title">{signal.name}</H2>

					<Dropdown className="signal__header__more">
						<Dropdown.Button type="icon" className="signal__header__more__button">
							<FontAwesomeIcon icon={faEllipsisV} />
						</Dropdown.Button>

						<Dropdown.Items>
							<Dropdown.Item
								className="signal__header__more__item"
								onClick={() => setShowSortFunctionsModal(true)}
							>
								<FontAwesomeIcon icon={faSort} />
								Sort functions
							</Dropdown.Item>
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
						<form className="signal__settings__name">
							<Input
								direction="horizontal"
								label="Name:"
								placeholder="Name"
								fullW
								id={`${signal.id}-name`}
								defaultValue={signal.name}
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
								id={`${signal.id}-offset`}
								defaultValue={signal.offset}
							/>
							<Input
								type="number"
								direction="vertical"
								label="Scale (x):"
								placeholder="Scale (x)"
								width="7rem"
								id={`${signal.id}-scaleX`}
								defaultValue={signal.scale.x}
							/>
							<Input
								type="number"
								direction="vertical"
								label="Scale (y):"
								placeholder="Scale (y)"
								width="7rem"
								id={`${signal.id}-scaleY`}
								defaultValue={signal.scale.y}
							/>
						</div>
					</Accordion.Body>
				</Accordion>

				<Accordion defaultOpen className="signal__functions">
					<Accordion.Header icon={faCaretRight} className="signal__functions__header">
						<H3 className="signal__subtitle">Functions</H3>

						<Button variant="accent" round title="Add function" onClick={createFunction}>
							<FontAwesomeIcon icon={faAdd} />
						</Button>
					</Accordion.Header>

					<Accordion.Body className="signal__functions__container">
						{signal.functions.length === 0 ? (
							<div className="signal__functions__noFunction">
								<FontAwesomeIcon
									icon={faBan}
									className="signal__functions__noFunction__icon"
								/>
								<P>There is no function.</P>
							</div>
						) : (
							signal.functions.map((f) => (
								<FunctionComponent
									key={f.id}
									id={f.id}
									type={f.type}
									name={f.name}
									params={null}
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
