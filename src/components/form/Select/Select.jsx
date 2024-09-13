import { useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./Select.css";

function Select({
	index,
	setIndex,
	options,
	direction = "vertical",
	label,
	id,
	width = "10rem",
	className = "",
}) {
	const [showOptions, setShowOptions] = useState(true);

	// Hide the options if the user clicks out from the select
	useLayoutEffect(() => {
		function handleClick(e) {
			if (showOptions) {
				const select = e.target.closest(".select");

				if (select == undefined) setShowOptions(false);
			}
		}

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [showOptions]);

	return (
		<div className={`select select--${direction}${className ? ` ${className}` : ""}`}>
			<label htmlFor={id} className="select__label">
				{label}
			</label>

			<div className="select__selected" onClick={() => setShowOptions((show) => !show)}>
				<div style={{ "--width": width }} className="select__selected__input">
					{options[index]}
				</div>
				<FontAwesomeIcon icon={faCaretDown} />

				{showOptions && (
					<ul className="select__options">
						{options.map((option, i) => (
							<li
								key={option}
								className={`select__option${
									index === i ? " select__option--selected" : ""
								}`}
								onClick={() => setIndex(i)}
							>
								{option}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Select;
