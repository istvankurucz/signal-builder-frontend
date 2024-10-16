import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import Divider from "../Divider/Divider";
import Button from "../Button/Button";
import "./Alert.css";

function Alert({
	variant = "info",
	icon = faExclamation,
	closeable = false,
	className = "",
	children,
}) {
	const [show, setShow] = useState(true);

	return (
		<div
			className={`alert alert--${variant}${show ? " alert--show" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
		>
			<FontAwesomeIcon icon={icon} className="alert__icon" />
			<Divider direction="vertical" variant="primary" className="alert__divider" />

			<div className="alert__content">{children}</div>

			{closeable && (
				<Button round className="alert__close" onClick={() => setShow((show) => !show)}>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			)}
		</div>
	);
}

export default Alert;
