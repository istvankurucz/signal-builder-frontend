import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import ShadowBox from "../../layout/ShadowBox/ShadowBox";
import "./ElementSortBox.css";

function ElementSortBox({ isActive, className = "", children }) {
	return (
		<ShadowBox
			className={`elementSortBox${isActive ? " elementSortBox--active" : ""}${
				className === "" ? "" : ` ${className}`
			}`}
		>
			<FontAwesomeIcon
				icon={faGripVertical}
				title="Draggable"
				className="elementSortBox__icon"
			/>
			{children}
		</ShadowBox>
	);
}

export default ElementSortBox;
