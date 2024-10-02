import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faEllipsisV, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import Accordion from "../Accordion/Accordion";
import Input from "../../form/Input/Input";
import H3 from "../H3/H3";
import Select from "../../form/Select/Select";
import Divider from "../Divider/Divider";
import Dropdown from "../Dropdown/Dropdown";
import FunctionTag from "./FunctionTag/FunctionTag";
import Checkbox from "../../form/Checkbox/Checkbox";
import FunctionParamsTooltip from "./FunctionParamsTooltip/FunctionParamsTooltip";
import "./Function.css";
import getSignalById from "../../../utils/signal/getSignalById";
import removeFunction from "../../../utils/function/removeFunction";
import updateSignals from "../../../utils/signal/updateSignals";
import functionTypes from "../../../assets/function/functionTypes";
import generatePoints from "../../../utils/generation/generatePoints";

function FunctionComponent({ func, className = "" }) {
	const [{ signals }, dispatch] = useStateValue();
	const [isOpen, setIsOpen] = useState(true);
	const [showParamsTooltip, setShowParamsTooltip] = useState(false);
	const [lastUpdatedProperty, setLastUpdatedProperty] = useState("");
	const [functionTypeIndex, setFunctionTypeIndex] = useState(-1);
	const [constValue, setConstValue] = useState(func.constValue);
	const [searchParams] = useSearchParams();

	//#region Refs
	const timeoutRef = useRef();
	const nameRef = useRef();
	const startTimeRef = useRef();
	const lengthRef = useRef();
	const offsetRef = useRef();
	const constValueRef = useRef();
	const slopeRef = useRef();
	const frequencyRef = useRef();
	const amplitudeRef = useRef();
	const phaseRef = useRef();
	const stepValueRef = useRef();
	const stepTimeRef = useRef();
	const rampStartTimeRef = useRef();
	const rampEndTimeRef = useRef();
	//#endregion

	//#region Functions
	function handleMouseEnter() {
		// Remove overflow hidden from the upper accordion
		const functionsBody = document.querySelector(
			".signal__functions__container.accordionBody__content"
		);
		functionsBody.style.overflow = "visible";

		// Show the tooltip
		setShowParamsTooltip(true);
	}

	function handleMouseLeave() {
		// Set back overflow hidden on the upper accordion
		const functionsBody = document.querySelector(
			".signal__functions__container.accordionBody__content"
		);
		functionsBody.style.overflow = "hidden";

		// Hide the tooltip
		setShowParamsTooltip(false);
	}

	function deleteFunction(e) {
		e.stopPropagation();

		// Get the signal
		const signal = getSignalById(signals, searchParams.get("signalId"));

		// Remove the function
		removeFunction(signals, dispatch, signal, func.id);
	}

	function onInputChange(property, value) {
		if (property === "name" || property === "type" || property === "keepLastValue") {
			updateFunctionProperty(property, value);
			return;
		}

		// Clear the current timeout
		if (property === lastUpdatedProperty) clearTimeout(timeoutRef.current);

		// Update the last updated property name
		setLastUpdatedProperty(property);

		// Set up a new timeout for updating
		timeoutRef.current = setTimeout(() => updateFunctionProperty(property, value), 1000);
	}

	function updateFunctionProperty(property, value) {
		// Set the property of the function
		switch (property) {
			case "name":
				func.setName(value);
				break;
			case "type":
				func.setType(value);
				break;
			case "startTime":
				func.setStartTime(value);
				break;
			case "length":
				func.setLength(value);
				break;
			case "offset":
				func.setOffset(value);
				break;
			case "constValue":
				func.setConstValue(value);
				break;
			case "keepLastValue":
				func.setKeepLastValue(value);
				break;
			case "slope":
				func.setSlope(value);
				break;
			case "frequency":
				func.setFrequency(value);
				break;
			case "amplitude":
				func.setAmplitude(value);
				break;
			case "phase":
				func.setPhase(value);
				break;
			case "stepValue":
				func.setStepValue(value);
				break;
			case "stepTime":
				func.setStepTime(value);
				break;
			case "rampStartTime":
				func.setRampStartTime(value);
				break;
			case "rampEndTime":
				func.setRampEndTime(value);
				break;
		}

		// Update the local signals array
		updateSignals(signals, dispatch);
	}

	function updateFunctionName(e) {
		e.preventDefault();

		updateFunctionProperty("name", nameRef.current.value);
	}

	// Update function type
	useEffect(() => {
		if (functionTypeIndex === -1) return;

		updateFunctionProperty("type", functionTypes[functionTypeIndex]);
	}, [functionTypes, functionTypeIndex]);
	//#endregion

	// Set the default index for function type select if the function is loaded
	useEffect(() => {
		if (func == null) return;

		const defaultIndex = functionTypes.indexOf(func.type);
		setFunctionTypeIndex(defaultIndex);
	}, [signals, functionTypes]);

	// Const keep last value logic
	useEffect(() => {
		if (!func.keepLastValue) return;

		const signal = getSignalById(signals, searchParams.get("signalId"));

		let minDiff = Number.POSITIVE_INFINITY;
		let beforeIndex = 0;
		signal.functions.forEach((f, i) => {
			if (f.startTime + f.length - func.startTime < minDiff) {
				minDiff = f.startTime + f.length - func.startTime;
				beforeIndex = i;
			}
		});
		// console.log("before index: ", beforeIndex);
		// console.log("Before func: ", signal.functions[beforeIndex]);

		const beforeFunctionPoints = generatePoints(signal.functions[beforeIndex], 0.01);
		// console.log("Points: ", beforeFunctionPoints);
		const lastValue = beforeFunctionPoints.y[beforeFunctionPoints.y.length - 1];
		console.log("Last value: ", lastValue);

		setConstValue(lastValue);
		func.setConstValue(lastValue);
	}, [JSON.stringify(signals)]);

	return (
		<Accordion defaultOpen className={`function${className ? ` ${className}` : ""}`}>
			<Accordion.Header
				icon={faAngleRight}
				className="function__header"
				onClick={() => setIsOpen((open) => !open)}>
				<div
					className="function__header__main"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<FunctionTag name={func.type} />
					<h4 className="function__title">{func.name}</h4>

					<FunctionParamsTooltip show={!isOpen && showParamsTooltip} func={func} />
				</div>

				<Dropdown className="function__options">
					<Dropdown.Button type="icon" onClick={(e) => e.stopPropagation()}>
						<FontAwesomeIcon icon={faEllipsisV} />
					</Dropdown.Button>
					<Dropdown.Items>
						<Dropdown.Item className="function__option--danger" onClick={deleteFunction}>
							<FontAwesomeIcon icon={faTrashCan} />
							Delete
						</Dropdown.Item>
					</Dropdown.Items>
				</Dropdown>
			</Accordion.Header>

			<Accordion.Body className="function__body">
				<div className="function__settings">
					<H3 className="function__subtitle">Settings</H3>

					<form onSubmit={updateFunctionName} className="function__settings__name">
						<Input
							direction="horizontal"
							label="Name:"
							placeholder="Name"
							fullW
							id={`${func.id}--name`}
							required
							defaultValue={func.name}
							ref={nameRef}
						/>
						<Button type="submit">Save</Button>
					</form>

					<Select
						index={functionTypeIndex === -1 ? 0 : functionTypeIndex}
						setIndex={setFunctionTypeIndex}
						options={functionTypes}
						direction="horizontal"
						label="Function type:"
						id={`${func.id}--type`}
						fullW
						className="function__settings__type"
					/>
				</div>

				<Divider variant="info" margin="2rem" />

				<div className="function__params">
					<H3 className="function__subtitle">Parameters</H3>

					<div className="function__params__container">
						{func.type === "const" && (
							<div className="function__param function__param--const">
								<Input
									type="number"
									direction="horizontal"
									label="Const:"
									placeholder="Const"
									width="10rem"
									id={`${func.id}--const`}
									className="function__params__input"
									disabled={func.keepLastValue}
									value={constValue}
									onChange={(e) => {
										const value = parseFloat(e.target.value);
										setConstValue(value);
										onInputChange("constValue", value);
									}}
									ref={constValueRef}
								/>
								<Checkbox
									label="Keep last value"
									id={`${func.id}--const-lastValue`}
									checked={func.keepLastValue}
									onChange={(e) => onInputChange("keepLastValue", e.target.checked)}
								/>
							</div>
						)}
						{func.type === "linear" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Slope:"
									placeholder="Slope"
									width="10rem"
									id={`${func.id}--slope`}
									className="function__params__input"
									defaultValue={func.slope}
									onChange={() =>
										onInputChange("slope", parseFloat(slopeRef.current.value))
									}
									ref={slopeRef}
								/>
							</>
						)}
						{func.type === "sine" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Frequency:"
									placeholder="Frequency"
									width="10rem"
									id={`${func.id}--frequency`}
									unit="Hz"
									className="function__params__input"
									defaultValue={func.frequency}
									onChange={() =>
										onInputChange("frequency", parseFloat(frequencyRef.current.value))
									}
									ref={frequencyRef}
								/>

								<Input
									type="number"
									direction="horizontal"
									label="Amplitude:"
									placeholder="Amplitude"
									width="10rem"
									id={`${func.id}--amplitude`}
									className="function__params__input"
									defaultValue={func.amplitude}
									onChange={() =>
										onInputChange("amplitude", parseFloat(amplitudeRef.current.value))
									}
									ref={amplitudeRef}
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Phase:"
									placeholder="Phase"
									width="10rem"
									id={`${func.id}--phase`}
									unit="deg"
									className="function__params__input"
									defaultValue={func.phase}
									onChange={() =>
										onInputChange("phase", parseFloat(phaseRef.current.value))
									}
									ref={phaseRef}
								/>
							</>
						)}
						{func.type === "step" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Step value:"
									placeholder="Step value"
									width="10rem"
									id={`${func.id}--stepValue`}
									className="function__params__input"
									defaultValue={func.stepValue}
									onChange={() =>
										onInputChange("stepValue", parseFloat(stepValueRef.current.value))
									}
									ref={stepValueRef}
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Step time:"
									placeholder="Step time"
									width="10rem"
									id={`${func.id}--stepTime`}
									unit="s"
									className="function__params__input"
									defaultValue={func.stepTime}
									onChange={() =>
										onInputChange("stepTime", parseFloat(stepTimeRef.current.value))
									}
									ref={stepTimeRef}
								/>
							</>
						)}
						{func.type === "ramp-up" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Ramp start:"
									placeholder="Ramp start"
									width="10rem"
									id={`${func.id}--rampStart`}
									unit="s"
									className="function__params__input"
									defaultValue={func.rampStartTime}
									onChange={() =>
										onInputChange(
											"rampStartTime",
											parseFloat(rampStartTimeRef.current.value)
										)
									}
									ref={rampStartTimeRef}
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Ramp end:"
									placeholder="Ramp end"
									width="10rem"
									id={`${func.id}--rampEnd`}
									unit="s"
									className="function__params__input"
									defaultValue={func.rampEndTime}
									onChange={() =>
										onInputChange("rampEndTime", parseFloat(rampEndTimeRef.current.value))
									}
									ref={rampEndTimeRef}
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Slope:"
									placeholder="Slope"
									width="10rem"
									id={`${func.id}--slope`}
									className="function__params__input"
									defaultValue={func.slope}
									onChange={() =>
										onInputChange("slope", parseFloat(slopeRef.current.value))
									}
									ref={slopeRef}
								/>
							</>
						)}
						{func.type !== "const" && (
							<>
								<Input
									direction="horizontal"
									label="Offset:"
									placeholder="Offset"
									width="10rem"
									id={`${func.id}--offset`}
									className="function__params__input"
									defaultValue={func.offset}
									onChange={() =>
										onInputChange("offset", parseFloat(offsetRef.current.value))
									}
									ref={offsetRef}
								/>
							</>
						)}
						<Input
							type="number"
							direction="horizontal"
							label="Start:"
							placeholder="Start"
							width="10rem"
							unit="s"
							id={`${func.id}--start`}
							className="function__params__input"
							defaultValue={func.startTime}
							onChange={() =>
								onInputChange("startTime", parseFloat(startTimeRef.current.value))
							}
							ref={startTimeRef}
						/>
						<Input
							type="number"
							direction="horizontal"
							label="Length:"
							placeholder="Length"
							width="10rem"
							unit="s"
							id={`${func.id}--length`}
							className="function__params__input"
							defaultValue={func.length}
							onChange={() => onInputChange("length", parseFloat(lengthRef.current.value))}
							ref={lengthRef}
						/>
					</div>
				</div>
			</Accordion.Body>
		</Accordion>
	);
}

export default FunctionComponent;
