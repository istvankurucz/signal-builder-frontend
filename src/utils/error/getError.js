import errors from "../../assets/error/errorMessages.json";

//#region Helper uncitons
function findError(code) {
	return errors.find((error) => error.code === code);
}

function updateErrorDetails(error, newDetails) {
	error.details = newDetails;
}
//#endregion

export default function getError(code, details = "") {
	// Find the one based on error code
	const error = findError(code);

	// Check if the error exists
	if (error == undefined) return new Error("An unknown error happened");

	// Update the details of the error if details are provided
	if (details !== "") updateErrorDetails(error, details);

	// Return the error
	return error;
}
