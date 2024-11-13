import Header from "../Header/Header";
import PageContainer from "./PageContainer/PageContainer";
import MainChart from "../../ui/MainChart/MainChart";
import "./Page.css";

function Page({ hasHeader = true, hasFooter = true, hasChart = true, className = "", children }) {
	return (
		<>
			{hasHeader && <Header />}
			<main className={`page${className !== "" ? ` ${className}` : ""}`}>
				{hasChart ? (
					<>
						<Page.Container className="page__container">
							<div className="page__left">{children}</div>
							<MainChart />
						</Page.Container>
					</>
				) : (
					children
				)}
			</main>
			{/* {hasFooter && <Footer />} */}
		</>
	);
}

Page.Container = PageContainer;

export default Page;
