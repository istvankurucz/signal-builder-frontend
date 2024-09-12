export const initialState = {
	feedback: {
		show: false,
		type: "info",
		message: "",
		details: "",
	},
};

export default function reducer(state, action) {
	switch (action.type) {
		case "SET_FEEDBACK":
			return {
				...state,
				feedback: action.feedback,
			};

		default:
			return "Invalid action type!";
	}
}
