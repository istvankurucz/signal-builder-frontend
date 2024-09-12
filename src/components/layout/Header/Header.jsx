import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChartLine, faFileExport, faFileImport } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/avl.png";
import Container from "../Container/Container";
import Button from "../../ui/Button/Button";
import "./Header.css";

function Header() {
	const [showNav, setShowNav] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setShowNav(false);
	}, [location.pathname]);

	return (
		<header className="header">
			<Container centered className="header__container">
				<Link className="header__logo">
					<img src={logo} alt="AVL" className="header__logo__img" />
					<span className="header__logo__text">Function generator</span>
				</Link>

				<nav className={`header__nav${showNav ? " header__nav--show" : ""}`}>
					<ul className="header__menu">
						<li className="header__menu__item">
							<NavLink
								to="/generation"
								title="Generation"
								className={({ isActive }) => (isActive ? "active" : "")}
							>
								<FontAwesomeIcon icon={faChartLine} />
								<span>Generation</span>
							</NavLink>
						</li>
						<li className="header__menu__item">
							<NavLink
								to="/import"
								title="Import"
								className={({ isActive }) => (isActive ? "active" : "")}
							>
								<FontAwesomeIcon icon={faFileImport} />
								<span>Import</span>
							</NavLink>
						</li>
						<li className="header__menu__item">
							<NavLink
								to="/export"
								title="Export"
								className={({ isActive }) => (isActive ? "active" : "")}
							>
								<FontAwesomeIcon icon={faFileExport} />
								<span>Export</span>
							</NavLink>
						</li>
					</ul>
				</nav>

				<Button
					variant="primary"
					className="header__ham"
					onClick={() => setShowNav((show) => !show)}
				>
					<FontAwesomeIcon icon={faBars} />
				</Button>
			</Container>
		</header>
	);
}

export default Header;
