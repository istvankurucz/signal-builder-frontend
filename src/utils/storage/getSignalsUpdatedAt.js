export default function getSignalsUpdatedAt() {
	const signalsUpdatedAtString = window.localStorage.getItem("signalsUpdatedAt");

	if (signalsUpdatedAtString == null) return null;
	return new Date(JSON.parse(signalsUpdatedAtString));
}
