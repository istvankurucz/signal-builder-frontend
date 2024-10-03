import { useEffect, useMemo, useRef, useState } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { useSearchParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCaretRight, faRemove } from "@fortawesome/free-solid-svg-icons";
import useFunction from "../../../hooks/function/useFunction";
import Modal from "../../../components/layout/Modal/Modal";
import Overlay from "../../../components/layout/Overlay/Overlay";
import Button from "../../../components/ui/Button/Button";
import H3 from "../../../components/ui/H3/H3";
import P from "../../../components/ui/P/P";
import Accordion from "../../../components/ui/Accordion/Accordion";
import Input from "../../../components/form/Input/Input";
import "./SineBuilderModal.css";
import getNumberOfPoints from "../../../utils/generation/getNumberOfPoints";
import createXValues from "../../../utils/generation/createXValues";
import chartColors from "../../../assets/chart/chartColors";
import Divider from "../../../components/ui/Divider/Divider";

function SineBuilderModal({ show, setShow }) {
	//#region States
	const [{ sampling }, dispatch] = useStateValue();
	const func = useFunction();
	const [motorFrequency, setMotorFrequency] = useState(1);
	const [motorAmplitude, setMotorAmplitude] = useState(1);
	const [motorOffset, setMotorOffset] = useState(0);
	const [amplitudes, setAmplitudes] = useState([]);
	const [phases, setPhases] = useState([]);
	const [offsests, setOffsests] = useState([]);
	const [yValues, setYValues] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	//#endregion

	// console.log("Function: ", func);

	//#region Refs
	const timeoutRef = useRef();
	//#endregion

	//#region Variables
	const xValues = useMemo(() => {
		if (func == null) return [];

		const dt = Math.round((1 / sampling) * 10000) / 10000;
		const numberOfPoints = getNumberOfPoints(func.length, dt);
		return createXValues(numberOfPoints, func.startTime, dt);
	}, [func]);

	const chartData = {
		labels: xValues,
		datasets: [
			{
				label: func?.name,
				data: yValues,
				borderColor: chartColors[0],
			},
		],
	};

	const chartOptions = {
		animation: false,
		responsive: true,
		elements: {
			line: {
				backgroundColor: "blue",
				borderColor: "red",
				borderWidth: 2,
			},
			point: {
				radius: 0,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Time [s]",
					padding: {
						top: 0,
						bottom: 0,
					},
				},
			},
		},
		plugins: {
			title: {
				display: false,
			},
			legend: {
				display: false,
			},
		},
	};
	//#endregion

	//#region Functions
	function addProperty(defaultValue, setState) {
		setState((prevState) => [...prevState, defaultValue]);
	}

	function changeProperty(e, index, setState) {
		const value = parseFloat(e.target.value);

		setState((prevState) =>
			prevState.map((amp, i) => {
				if (i === index) return value;
				return amp;
			})
		);
	}

	function removeProperty(index, setState) {
		setState((prevState) => prevState.filter((_, i) => index !== i));
	}

	function getMotorAmplitude() {
		if (isNaN(motorAmplitude)) return 1;
		return motorAmplitude;
	}

	function getMotorOffset() {
		if (isNaN(motorOffset)) return 0;
		return motorOffset;
	}

	function getMotorFrequency() {
		if (isNaN(motorFrequency)) return 1;
		return motorFrequency;
	}

	function calcResultantAmplitude() {
		const motorAmplitude = getMotorAmplitude();

		return (
			motorAmplitude *
			amplitudes.reduce((resultant, current) => {
				if (isNaN(current)) return resultant;
				return resultant * current;
			}, 1)
		);
	}

	function calcResultantPhase() {
		return phases.reduce((resultant, current) => {
			if (isNaN(current)) return resultant;
			return resultant + current;
		}, 0);
	}

	function calcResultantOffset() {
		const motorOffset = getMotorOffset();

		return (
			motorOffset +
			offsests.reduce((resultant, current) => {
				if (isNaN(current)) return resultant;
				return resultant + current;
			}, 0)
		);
	}

	function saveFunction() {
		// Update the function object
		func.setFrequency(getMotorFrequency());
		func.setAmplitude(calcResultantAmplitude());
		func.setPhase(calcResultantPhase());
		func.setOffset(calcResultantOffset());

		// Show feedback
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "Function saved.",
				details: "",
			},
		});

		// Hide the modal
		setShow(false);
	}
	//#endregion

	//#region Hooks
	// Remove function query from URL
	useEffect(() => {
		if (!show) setSearchParams({ signalId: searchParams.get("signalId") });
	}, [show]);

	// Update the initial values for params
	useEffect(() => {
		if (func == null) return;

		setMotorAmplitude(func.amplitude);
		setMotorFrequency(func.frequency);
		setMotorOffset(func.offset);
	}, [func]);

	// Update the chart
	useEffect(() => {
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			// Get motor frequency
			const motorFrequency = getMotorFrequency();

			// Calculate the resultant values
			const A = calcResultantAmplitude();
			const phi = calcResultantPhase();
			const O = calcResultantOffset();

			// Generate the values
			const values = xValues.map((x) => {
				const angle = 2 * Math.PI * motorFrequency * x;
				const phase = (phi / 180) * Math.PI;

				return A * Math.sin(angle + phase) + O;
			});

			// Set the state
			setYValues(values);
		}, 500);
	}, [timeoutRef, motorFrequency, motorAmplitude, motorOffset, amplitudes, phases, offsests]);
	//#endregion

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Sine builder</Modal.Title>
					<Modal.Close setShow={setShow} />
				</Modal.Header>

				<Modal.Body>
					<div className="sineBuilder__fomrula">
						<H3>Formula to use</H3>
						<P className="sineBuilder__fomrula__text">
							Sine = Conversion &times; [{" "}
							<strong className="sineBuilder__fomrula__strong">
								M<sub>A</sub> &middot; A<sub>i</sub> &middot; sin(M<sub>f</sub> &middot; t +
								&phi;<sub>i</sub>) + M<sub>O</sub> + O<sub>i</sub>
							</strong>{" "}
							]
						</P>

						<Accordion className="sineBuilder__formula__params">
							<Accordion.Header icon={faCaretRight}>Parameter description</Accordion.Header>

							<Accordion.Body>
								<ul className="sineBuilder__formula__params__list">
									<li>
										<span className="sineBuilder__forumula__param">Conversion:</span>{" "}
										<span className="sineBuilder__formula__param__description">
											{" "}
											conversion value
										</span>
									</li>
									<li>
										<span className="sineBuilder__forumula__param">
											M<sub>A</sub>:
										</span>{" "}
										<span className="sineBuilder__formula__param__description">
											{" "}
											motor amplitude
										</span>
									</li>
									<li>
										<span className="sineBuilder__forumula__param">
											A<sub>i</sub>:
										</span>{" "}
										<span className="sineBuilder__formula__param__description">
											{" "}
											the user-defined amplitudes
										</span>
									</li>
									<li>
										<span className="sineBuilder__forumula__param">
											M<sub>f</sub>:
										</span>{" "}
										<span className="sineBuilder__formula__param__description">
											{" "}
											motor frequency
										</span>
									</li>
									<li>
										<span className="sineBuilder__forumula__param">
											&phi;<sub>i</sub>:
										</span>{" "}
										<span className="sineBuilder__formula__param__description">
											{" "}
											the user-defined phases
										</span>
									</li>
									<li>
										<span className="sineBuilder__forumula__param">
											M<sub>O</sub>:
										</span>{" "}
										<span className="sineBuilder__formula__param__description">
											{" "}
											motor offset
										</span>
									</li>
									<li>
										<span className="sineBuilder__forumula__param">
											O<sub>i</sub>:
										</span>{" "}
										<span className="sineBuilder__formula__param__description">
											{" "}
											the user-defined offsets
										</span>
									</li>
								</ul>
							</Accordion.Body>
						</Accordion>
					</div>

					<div className="sineBuilder__chart">
						<H3>Chart</H3>

						<div className="sineBuilder__chart__wrapper">
							<div className="sineBuilder__chart__container">
								<Line data={chartData} options={chartOptions} />
							</div>

							<div className="sineBuilder__chart__resultants">
								<div className="sineBuilder__chart__resultants__row">
									<span className="sineBuilder__chart__resultants__property">A: </span>
									<span className="sineBuilder__chart__resultants__value">
										{calcResultantAmplitude()}
									</span>
								</div>
								<div className="sineBuilder__chart__resultants__row">
									<span className="sineBuilder__chart__resultants__property">&phi;: </span>
									<span className="sineBuilder__chart__resultants__value">
										{calcResultantPhase()}&deg;
									</span>
								</div>
								<div className="sineBuilder__chart__resultants__row">
									<span className="sineBuilder__chart__resultants__property">O: </span>
									<span className="sineBuilder__chart__resultants__value">
										{calcResultantOffset()}
									</span>
								</div>
								<Divider variant="primary" />
								<div className="sineBuilder__chart__resultants__row">
									<span className="sineBuilder__chart__resultants__property">Min: </span>
									<span className="sineBuilder__chart__resultants__value">
										{calcResultantOffset() - calcResultantAmplitude()}
									</span>
								</div>
								<div className="sineBuilder__chart__resultants__row">
									<span className="sineBuilder__chart__resultants__property">Max: </span>
									<span className="sineBuilder__chart__resultants__value">
										{calcResultantOffset() + calcResultantAmplitude()}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="sineBuilder__params">
						<H3>Parameters</H3>

						<Accordion className="sineBuilder__params__accordion">
							<Accordion.Header icon={faCaretRight}>Motor</Accordion.Header>

							<Accordion.Body className="sineBuilder__params__group sineBuilder__params__group--motor">
								<Input
									direction="horizontal"
									type="number"
									id="sineBuilderMotorAmplitude"
									label={
										<span className="sineBuilder__params__param">
											M<sub>A</sub>:
										</span>
									}
									placeholder="Motor amp"
									value={isNaN(motorAmplitude) ? "" : motorAmplitude}
									onChange={(e) => setMotorAmplitude(parseFloat(e.target.value))}
									min={0}
								/>
								<Input
									direction="horizontal"
									type="number"
									id="sineBuilderMotorFrequency"
									label={
										<span className="sineBuilder__params__param">
											M<sub>f</sub>:
										</span>
									}
									placeholder="Motor freq"
									defaultValue={func?.frequency}
									min={0}
									unit="Hz"
									value={isNaN(motorFrequency) ? "" : motorFrequency}
									onChange={(e) => setMotorFrequency(parseFloat(e.target.value))}
								/>
								<Input
									direction="horizontal"
									type="number"
									id="sineBuilderMotorOffset"
									label={
										<span className="sineBuilder__params__param">
											M<sub>O</sub>:
										</span>
									}
									placeholder="Motor offset"
									value={isNaN(motorOffset) ? "" : motorOffset}
									onChange={(e) => setMotorOffset(parseFloat(e.target.value))}
								/>
							</Accordion.Body>
						</Accordion>

						<Accordion defaultOpen className="sineBuilder__params__accordion">
							<Accordion.Header icon={faCaretRight}>Amplitudes</Accordion.Header>

							<Accordion.Body className="sineBuilder__params__group sineBuilder__params__group--amplitudes">
								{amplitudes.map((amplitude, i) => (
									<div key={i} className="sineBuilder__param">
										<Input
											direction="horizontal"
											type="number"
											id={`sineBuilderAmplitudes-${i + 1}`}
											label={
												<span className="sineBuilder__params__param">
													A<sub>{i + 1}</sub>:
												</span>
											}
											placeholder={`Amplitude ${i + 1}`}
											value={isNaN(amplitude) ? "" : amplitude}
											onChange={(e) => changeProperty(e, i, setAmplitudes)}
											min={0}
										/>
										<Button
											variant="danger"
											round
											title="Remove parameter"
											onClick={() => removeProperty(i, setAmplitudes)}
										>
											<FontAwesomeIcon icon={faRemove} />
										</Button>
									</div>
								))}

								<Button
									variant="accent"
									round
									title="Add new amplitude"
									className="signalBuilder__params__add"
									onClick={() => addProperty(1, setAmplitudes)}
								>
									<FontAwesomeIcon icon={faAdd} />
								</Button>
							</Accordion.Body>
						</Accordion>

						<Accordion defaultOpen className="sineBuilder__params__accordion">
							<Accordion.Header icon={faCaretRight}>Phases</Accordion.Header>

							<Accordion.Body className="sineBuilder__params__group sineBuilder__params__group--phases">
								{phases.map((phase, i) => (
									<div key={i} className="sineBuilder__param">
										<Input
											direction="horizontal"
											type="number"
											id={`sineBuilderPhases-${i + 1}`}
											label={
												<span className="sineBuilder__params__param">
													&phi;<sub>{i + 1}</sub>:
												</span>
											}
											placeholder={`Phase ${i + 1}`}
											value={isNaN(phase) ? "" : phase}
											onChange={(e) => changeProperty(e, i, setPhases)}
											unit="deg"
										/>
										<Button
											variant="danger"
											round
											title="Remove parameter"
											onClick={() => removeProperty(i, setPhases)}
										>
											<FontAwesomeIcon icon={faRemove} />
										</Button>
									</div>
								))}

								<Button
									variant="accent"
									round
									title="Add new phase"
									className="signalBuilder__params__add"
									onClick={() => addProperty(0, setPhases)}
								>
									<FontAwesomeIcon icon={faAdd} />
								</Button>
							</Accordion.Body>
						</Accordion>

						<Accordion defaultOpen className="sineBuilder__params__accordion">
							<Accordion.Header icon={faCaretRight}>Offsets</Accordion.Header>

							<Accordion.Body className="sineBuilder__params__group sineBuilder__params__group--offsets">
								{offsests.map((offset, i) => (
									<div key={i} className="sineBuilder__param">
										<Input
											direction="horizontal"
											type="number"
											id={`sineBuilderOffsets-${i + 1}`}
											label={
												<span className="sineBuilder__params__param">
													O<sub>{i + 1}</sub>:
												</span>
											}
											placeholder={`Offset ${i + 1}`}
											value={isNaN(offset) ? "" : offset}
											onChange={(e) => changeProperty(e, i, setOffsests)}
										/>
										<Button
											variant="danger"
											round
											title="Remove parameter"
											onClick={() => removeProperty(i, setOffsests)}
										>
											<FontAwesomeIcon icon={faRemove} />
										</Button>
									</div>
								))}

								<Button
									variant="accent"
									round
									title="Add new offset"
									className="signalBuilder__params__add"
									onClick={() => addProperty(0, setOffsests)}
								>
									<FontAwesomeIcon icon={faAdd} />
								</Button>
							</Accordion.Body>
						</Accordion>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button onClick={saveFunction}>Save</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

export default SineBuilderModal;
