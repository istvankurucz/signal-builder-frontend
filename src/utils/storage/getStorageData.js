export default function getStorageData() {
	// Get the data from local storage
	const signalBuilderData = window.localStorage.getItem("AVLSignalBuilderData");

	// Check if there is any data
	if (signalBuilderData == null) {
		return {
			signals: [],
			recentImportFilePaths: [],
			updatedAt: null,
		};
	}

	// Returned the parsed data
	return JSON.parse(signalBuilderData);
}
