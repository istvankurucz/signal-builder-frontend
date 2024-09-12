import { useCallback, useEffect } from "react";
import { useStateValue } from "../../../contexts/Context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import "./Feedback.css";

function Feedback({ time = 10 }) {
	const [{ feedback }, dispatch] = useStateValue();

	// Function to hide the feedback and reset its values
	const closeFeedback = useCallback(() => {
		// Slide up the component
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				...feedback,
				show: false,
			},
		});

		// After it has disappeared reset its values
		setTimeout(() => {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: false,
					type: "info",
					message: "",
					details: "",
				},
			});
		}, 200);
	}, [dispatch, feedback]);

	// useEffect to automatically close the feedback after a certain time
	useEffect(() => {
		if (feedback.show) {
			const timer = setTimeout(closeFeedback, time * 1000);

			return () => clearTimeout(timer);
		}
	}, [closeFeedback, feedback.show, time]);

	return (
		<div
			className={`feedback feedback--${feedback.type}${feedback.show ? " feedback--show" : ""}`}
		>
			<header className="feedback__header">
				<h3 className="feedback__message">{feedback.message}</h3>
				<Button variant={feedback.type} round onClick={closeFeedback}>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</header>
			{feedback.details !== "" && <p className="feedback__details">{feedback.details}</p>}
		</div>
	);
}

export default Feedback;
