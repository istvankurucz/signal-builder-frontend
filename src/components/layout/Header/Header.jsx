import { Link } from "react-router-dom";
import logo from "../../../assets/images/avl.png";
import Container from "../Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faFileExport, faFileImport } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
	return (
		<header className="header">
			<Container centered className="header__container">
				<Link className="header__logo">
					<img src={logo} alt="AVL" className="header__logo__img" />
					<span className="header__logo__text">Function generator</span>
				</Link>

				<nav className="header__nav">
					<ul className="header__menu">
						<li className="header__menu__item">
							<Link to="/generation" title="Generation">
								<FontAwesomeIcon icon={faChartLine} />
								<span>Generation</span>
							</Link>
						</li>
						<li className="header__menu__item">
							<Link to="/import" title="Import">
								<FontAwesomeIcon icon={faFileImport} />
								<span>Import</span>
							</Link>
						</li>
						<li className="header__menu__item">
							<Link to="/export" title="Export">
								<FontAwesomeIcon icon={faFileExport} />
								<span>Export</span>
							</Link>
						</li>
					</ul>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
