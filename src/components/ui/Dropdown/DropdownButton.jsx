import Button from "../Button/Button";
import "./DropdownButton.css";

function DropdownButton({ type = "", setShowItems, onClick, className = "", children }) {
	return (
		<Button
			variant="primary"
			className={`dropdownButton${type !== "" ? ` dropdownButton--${type}` : ""}${
				className ? ` ${className}` : ""
			}`}
			onClick={(e) => {
				setShowItems((show) => !show);
				if (onClick != null) onClick(e);
			}}
		>
			{children}
		</Button>
	);
}

export default DropdownButton;
