import { forwardRef } from "react";
import "./Toggle.css";

const Toggle = forwardRef(({ variant = "secondary", label, id, className = "", ...rest }, ref) => {
	return (
		<div className={`toggle toggle--${variant}${className !== "" ? ` ${className}` : ""}`}>
			<input type="checkbox" name={id} id={id} className="toggle__input" ref={ref} {...rest} />

			<label htmlFor={id} className="toggle__label">
				{label}
				<span className="toggle__marker"></span>
			</label>
		</div>
	);
});

export default Toggle;
