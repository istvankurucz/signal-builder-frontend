export default function selectAllTabElements(container) {
	if (container == null) return [];

	const elements = container.querySelectorAll(`a[href]:not([disabled]), 
   button:not([disabled]), 
   input:not([disabled]), 
   select:not([disabled]), 
   textarea:not([disabled]), 
   [tabindex]:not([tabindex="-1"]):not([disabled])`);

	return Array.from(elements);
}
