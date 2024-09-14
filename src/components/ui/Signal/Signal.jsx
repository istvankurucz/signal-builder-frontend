import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ShadowBox from "../../layout/ShadowBox/ShadowBox";
import H2 from "../H2/H2";
import H3 from "../H3/H3";
import Input from "../../form/Input/Input";
import Button from "../Button/Button";
import Accordion from "../Accordion/Accordion";
import Function from "../Function/Function";
import "./Signal.css";

function Signal({ id, name, functions, offset = 0, scale = { x: 0, y: 0 }, className = "" }) {
	return (
		<ShadowBox className={`signal${className !== "" ? ` ${className}` : ""}`}>
			<header className="signal__header">
				<H2 className="signal__title">{name}</H2>

				<Button variant="danger" outlined title="Remove signal">
					<FontAwesomeIcon icon={faTrashCan} />
				</Button>
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
							id={`${id}-name`}
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
							id={`${id}-offset`}
						/>
						<Input
							type="number"
							direction="vertical"
							label="Scale (x):"
							placeholder="Scale (x)"
							width="7rem"
							id={`${id}-scaleX`}
						/>
						<Input
							type="number"
							direction="vertical"
							label="Scale (y):"
							placeholder="Scale (y)"
							width="7rem"
							id={`${id}-scaleY`}
						/>
					</div>
				</Accordion.Body>
			</Accordion>

			<Accordion defaultOpen className="signal__functions">
				<Accordion.Header icon={faCaretRight}>
					<H3 className="signal__subtitle">Functions</H3>
				</Accordion.Header>

				<Accordion.Body className="signal__functions__container">
					<Function id="2" type="const" name="Function 1" />
					<Function id="3" type="linear" name="Function 2" />
					<Function id="4" type="sine" name="Function 3" />
					<Function id="5" type="step" name="Function 4" />
					<Function id="6" type="ramp-up" name="Function 5" />
				</Accordion.Body>
			</Accordion>
		</ShadowBox>
	);
}

export default Signal;
