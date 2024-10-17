import { forwardRef } from "react";
import "./Checkbox.css";

const Checkbox = forwardRef(
	({ variant = "secondary", label, id, className = "", ...rest }, ref) => {
		return (
			<label
				htmlFor={id}
				className={`checkbox checkbox--${variant}${className !== "" ? ` ${className}` : ""}`}
			>
				<input
					type="checkbox"
					name={id}
					id={id}
					className="checkbox__input"
					ref={ref}
					{...rest}
				/>
				<span className="checkbox__marker"></span>
				<span className="checkbox__label">{label}</span>
			</label>
		);
	}
);

export default Checkbox;
