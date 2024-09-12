import { forwardRef } from "react";
import "./Checkbox.css";

const Checkbox = forwardRef(
	({ variant = "secondary", label, id, className = "", ...rest }, ref) => {
		return (
			<div className={`checkbox checkbox--${variant}${className !== "" ? ` ${className}` : ""}`}>
				<input
					type="checkbox"
					name={id}
					id={id}
					className="checkbox__input"
					ref={ref}
					{...rest}
				/>
				<span className="checkbox__marker"></span>
				<label htmlFor={id} className="checkbox__label">
					{label}
				</label>
			</div>
		);
	}
);

export default Checkbox;
