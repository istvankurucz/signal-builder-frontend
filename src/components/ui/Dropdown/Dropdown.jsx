import { Children, cloneElement, useLayoutEffect, useState } from "react";
import DropdownButton from "./DropdownButton";
import DropdownItems from "./DropdownItems";
import DropdownItem from "./DropdownItem";
import "./Dropdown.css";

function Dropdown({ className = "", children }) {
	const [showItems, setShowItems] = useState(false);

	// Close the dropdown if the user clicks out from it
	useLayoutEffect(() => {
		function handleClick(e) {
			if (showItems) {
				const dropdownItem = e.target.closest(".dropdownItem");
				if (dropdownItem != undefined) setShowItems(false);

				const dropdown = e.target.closest(".dropdown");
				if (dropdown == undefined) setShowItems(false);
			}
		}

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [showItems]);

	const childrenWithProps = Children.map(children, (child) =>
		cloneElement(child, { showItems, setShowItems })
	);

	return (
		<div className={`dropdown${className !== "" ? ` ${className}` : ""}`}>
			{childrenWithProps}
		</div>
	);
}

Dropdown.Button = DropdownButton;
Dropdown.Items = DropdownItems;
Dropdown.Item = DropdownItem;

export default Dropdown;
