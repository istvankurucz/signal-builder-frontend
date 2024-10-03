export const initialState = {
	signals: [],
	sampling: 100,
	feedback: {
		show: false,
		type: "info",
		message: "",
		details: "",
	},
};

export default function reducer(state, action) {
	switch (action.type) {
		case "SET_SIGNALS":
			return {
				...state,
				signals: action.signals,
			};

		case "SET_SAMPLING":
			return {
				...state,
				sampling: action.sampling,
			};

		case "SET_FEEDBACK":
			return {
				...state,
				feedback: action.feedback,
			};

		default:
			return "Invalid action type!";
	}
}
