import Container from "../../Container/Container";
import "./PageContainer.css";

function PageContainer({ className = "", children }) {
	return (
		<Container className={`pageContainer${className !== "" ? ` ${className}` : ""}`}>
			{children}
		</Container>
	);
}

export default PageContainer;
