import { v4 as uuidv4 } from "uuid";

export default function generateId() {
	const id = uuidv4();
	return id.split("-")[0];
}
