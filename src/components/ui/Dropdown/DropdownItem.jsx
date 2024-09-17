import "./DropdownItem.css";

function DropdownItem({ onClick, className = "", children }) {
	return (
		<li
			className={`dropdownItem${className !== "" ? ` ${className}` : ""}`}
			onClick={onClick}
			tabIndex={0}
		>
			{children}
		</li>
	);
}

export default DropdownItem;
