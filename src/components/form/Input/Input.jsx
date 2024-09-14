import { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(
	(
		{
			direction = "vertical",
			variant = "secondary",
			type = "text",
			label,
			id,
			width = "10rem",
			fullW = false,
			unit = null,
			className = "",
			...rest
		},
		ref
	) => {
		return (
			<div
				className={`input input--${direction} input--${variant}${fullW ? " input--full" : ""}${
					className !== "" ? ` ${className}` : ""
				}`}
			>
				<label htmlFor={id} className="input__label">
					{label}
				</label>

				<div className="input__container">
					<input
						type={type}
						id={id}
						style={{ "--width": width }}
						className="input__input"
						{...rest}
					/>
					{unit != null && <span className="input__unit">{unit}</span>}
				</div>
			</div>
		);
	}
);

export default Input;
