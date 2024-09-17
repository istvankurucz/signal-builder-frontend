import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faEllipsisV, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import Accordion from "../Accordion/Accordion";
import Input from "../../form/Input/Input";
import H3 from "../H3/H3";
import Select from "../../form/Select/Select";
import Divider from "../Divider/Divider";
import Dropdown from "../Dropdown/Dropdown";
import "./Function.css";

const functionTypes = ["Const", "Linear", "Sine", "Step", "Ramp-up"];

function Function({ id, type = "sine", name, params, className = "" }) {
	const [functionTypeIndex, setFunctionTypeIndex] = useState(0);

	function getFunctionTag(type) {
		switch (type) {
			case "sine":
				return "sin";
			case "const":
				return "const";
			case "linear":
				return "lin";
			case "step":
				return "step";
			case "ramp-up":
				return "ramp-up";
		}
	}

	function removeFunction(e) {
		e.stopPropagation();
		console.log("removed");
	}

	return (
		<Accordion defaultOpen className={`function${className ? ` ${className}` : ""}`}>
			<Accordion.Header icon={faAngleRight} className="function__header">
				<div className="function__type">{getFunctionTag(type)}</div>
				<h4 className="function__title">{name}</h4>

				<Dropdown className="function__options">
					<Dropdown.Button type="icon" onClick={removeFunction}>
						<FontAwesomeIcon icon={faEllipsisV} />
					</Dropdown.Button>
					<Dropdown.Items>
						<Dropdown.Item className="function__option--danger">
							<FontAwesomeIcon icon={faTrashCan} />
							Delete
						</Dropdown.Item>
					</Dropdown.Items>
				</Dropdown>
			</Accordion.Header>

			<Accordion.Body className="function__body">
				<div className="function__settings">
					<H3 className="function__subtitle">Settings</H3>

					<form className="function__settings__name">
						<Input
							direction="horizontal"
							label="Name:"
							placeholder="Name"
							fullW
							id={`${id}--name`}
						/>
						<Button type="submit">Save</Button>
					</form>

					<Select
						index={functionTypeIndex}
						setIndex={setFunctionTypeIndex}
						options={functionTypes}
						direction="horizontal"
						label="Function type:"
						id="22"
						fullW
						className="function__settings__type"
					/>
				</div>

				<Divider variant="info" margin="2rem" />

				<div className="function__params">
					<H3 className="function__subtitle">Parameters</H3>

					<div className="function__params__container">
						{type === "const" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Const:"
									placeholder="Const"
									width="10rem"
									id={`${id}--const`}
									className="function__params__input"
								/>
							</>
						)}
						{type === "linear" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Slope:"
									placeholder="Slope"
									width="10rem"
									id={`${id}--slope`}
									className="function__params__input"
								/>
							</>
						)}
						{type === "sine" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Frequency:"
									placeholder="Frequency"
									width="10rem"
									id={`${id}--frequency`}
									unit="Hz"
									className="function__params__input"
								/>

								<Input
									type="number"
									direction="horizontal"
									label="Amplitude:"
									placeholder="Amplitude"
									width="10rem"
									id={`${id}--amplitude`}
									className="function__params__input"
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Phase:"
									placeholder="Phase"
									width="10rem"
									id={`${id}--phase`}
									unit="deg"
									className="function__params__input"
								/>
							</>
						)}
						{type === "step" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Step value:"
									placeholder="Step value"
									width="10rem"
									id={`${id}--stepValue`}
									className="function__params__input"
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Step time:"
									placeholder="Step time"
									width="10rem"
									id={`${id}--stepTime`}
									unit="s"
									className="function__params__input"
								/>
							</>
						)}
						{type === "ramp-up" && (
							<>
								<Input
									type="number"
									direction="horizontal"
									label="Ramp start:"
									placeholder="Ramp start"
									width="10rem"
									id={`${id}--rampStart`}
									unit="s"
									className="function__params__input"
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Ramp end:"
									placeholder="Ramp end"
									width="10rem"
									id={`${id}--rampEnd`}
									unit="s"
									className="function__params__input"
								/>
								<Input
									type="number"
									direction="horizontal"
									label="Slope:"
									placeholder="Slope"
									width="10rem"
									id={`${id}--slope`}
									className="function__params__input"
								/>
							</>
						)}
						{type !== "const" && (
							<>
								<Input
									direction="horizontal"
									label="Offset:"
									placeholder="Offset"
									width="10rem"
									id={`${id}--offset`}
									className="function__params__input"
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
							id={`${id}--start`}
							className="function__params__input"
						/>
						<Input
							type="number"
							direction="horizontal"
							label="Length:"
							placeholder="Length"
							width="10rem"
							unit="s"
							id={`${id}--length`}
							className="function__params__input"
						/>
					</div>
				</div>
			</Accordion.Body>
		</Accordion>
	);
}

export default Function;
