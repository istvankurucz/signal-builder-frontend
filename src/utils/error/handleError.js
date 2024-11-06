import getError from "./getError";

function createErrorMessage(error, details) {
	let message = error.message;
	if (details !== "") message = `${message}\n${details}`;

	return message;
}

export default function handleError(code, dispatch, details = "") {
	// Get the error based on code
	const error = getError(code);

	// Check if the error should be visible for the user or for the developer
	if (error.for === "developer" || dispatch == null) {
		const message = createErrorMessage(error, details);
		console.error(message);
	} else {
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "danger",
				message: error.message,
				details: error.details,
			},
		});
	}
}
