import "./DropdownItems.css";

function DropdownItems({ showItems, className = "", children }) {
	return (
		<ul
			className={`dropdownItems${showItems ? " dropdownItems--show" : ""}${
				className !== "" ? ` ${className}` : ""
			}`}
		>
			{children}
		</ul>
	);
}

export default DropdownItems;
