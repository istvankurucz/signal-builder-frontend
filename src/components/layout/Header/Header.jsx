import { useLayoutEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faChartLine,
	faFileExport,
	faFileImport,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/avl.png";
import Container from "../Container/Container";
import Button from "../../ui/Button/Button";
import "./Header.css";
import Dropdown from "../../ui/Dropdown/Dropdown";

function Header() {
	const [showNav, setShowNav] = useState(false);
	const location = useLocation();

	// Close menu if the user navigated to a new page
	useLayoutEffect(() => {
		setShowNav(false);
	}, [location.pathname]);

	// Close the menu if the user clicked outside from the menu
	useLayoutEffect(() => {
		function handleClick(e) {
			if (showNav) {
				const header = e.target.closest(".header");
				if (header == null) setShowNav(false);
			}
		}

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [showNav]);

	return (
		<header className="header">
			<Container centered className="header__container">
				<Link className="header__logo">
					<img src={logo} alt="AVL" className="header__logo__img" />
					<span className="header__logo__text">Signal builder</span>
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
						<li className="header__menu__item">
							<Dropdown>
								<Dropdown.Button type="icon" className="header__menu__item__settings">
									<FontAwesomeIcon icon={faGear} />
								</Dropdown.Button>
								<Dropdown.Items>Theme: light - dark</Dropdown.Items>
							</Dropdown>
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
