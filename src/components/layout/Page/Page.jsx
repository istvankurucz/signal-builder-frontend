import Header from "../Header/Header";
import "./Page.css";

function Page({ includeHeader = true, includeFooter = true, className = "", children }) {
	return (
		<>
			{includeHeader && <Header />}
			<main className={`page${className !== "" ? ` ${className}` : ""}`}>{children}</main>
			{/* {includeFooter && <Footer />} */}
		</>
	);
}

export default Page;
