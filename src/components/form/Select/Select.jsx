import { useLayoutEffect, useRef, useState } from "react";
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
	fullW = false,
	className = "",
}) {
	const [showOptions, setShowOptions] = useState(false);

	const selectedRef = useRef();

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

	// Show / hide the select if the user navigates with Tab
	useLayoutEffect(() => {
		function navWithKeys(e) {
			if (showOptions) {
				if (e.key === "Enter") {
					if (document.activeElement.matches(".select__option")) {
						const value = document.activeElement.textContent;

						const lowercaseOptions = options.map((option) => option.toLowerCase());
						const newIndex = lowercaseOptions.indexOf(value.toLowerCase());

						setIndex(newIndex);
						setShowOptions(false);
					}
				}

				if (e.key === "Escape") setShowOptions(false);
			} else {
				if (selectedRef.current === document.activeElement && e.key === "Enter") {
					setShowOptions(true);
				}
			}
		}

		window.addEventListener("keydown", navWithKeys);

		return () => window.removeEventListener("keydown", navWithKeys);
	}, [showOptions]);

	return (
		<div
			className={`select select--${direction}${fullW ? " select--full" : ""}${
				className ? ` ${className}` : ""
			}`}
		>
			<label htmlFor={id} className="select__label">
				{label}
			</label>

			<div
				className="select__selected"
				tabIndex={0}
				onClick={() => setShowOptions((show) => !show)}
				ref={selectedRef}
			>
				<input
					type="text"
					id={id}
					value={options[index]}
					className="select__selected__input"
					hidden
					readOnly
				/>
				<div style={{ "--width": width }} className="select__selected__input">
					{options[index]}
				</div>
				<FontAwesomeIcon icon={faCaretDown} />

				{showOptions && (
					<ul className="select__options scrollbar">
						{options.map((option, i) => (
							<li
								key={option}
								className={`select__option${
									index === i ? " select__option--selected" : ""
								}`}
								onClick={() => setIndex(i)}
								tabIndex={0}
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
