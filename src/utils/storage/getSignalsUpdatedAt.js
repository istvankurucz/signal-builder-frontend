import getStorageData from "./getStorageData";

export default function getSignalsUpdatedAt() {
	const { updatedAt } = getStorageData();

	if (updatedAt == null) return null;
	return new Date(updatedAt);
}
