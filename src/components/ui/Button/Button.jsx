import { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = forwardRef(
	(
		{
			type = "button",
			variant = "secondary",
			to,
			outlined = false,
			fullW = false,
			centered = false,
			round = false,
			className = "",
			children,
			...rest
		},
		ref
	) => {
		if (variant === "link") {
			return (
				<Link
					to={to}
					className={`button button--${variant}${outlined ? " button--outlined" : ""}${
						fullW ? " button--full" : ""
					}${centered ? " button--centered" : ""}${round ? " button--round" : ""}${
						className !== "" ? ` ${className}` : ""
					}`}
					ref={ref}
					{...rest}
				>
					{children}
				</Link>
			);
		}

		return (
			<button
				type={type}
				className={`button button--${variant}${fullW ? " button--full" : ""}${
					outlined ? " button--outlined" : ""
				}${centered ? " button--centered" : ""}${round ? " button--round" : ""}${
					className !== "" ? ` ${className}` : ""
				}`}
				ref={ref}
				{...rest}
			>
				{children}
			</button>
		);
	}
);

export default Button;
