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
			className = "",
			...rest
		},
		ref
	) => {
		return (
			<div
				className={`input input--${direction} input--${variant}${
					className !== "" ? ` ${className}` : ""
				}`}
			>
				<label htmlFor={id} className="input__label">
					{label}
				</label>
				<input
					type={type}
					id={id}
					style={{ "--width": width }}
					className="input__input"
					{...rest}
				/>
			</div>
		);
	}
);

export default Input;
