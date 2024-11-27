import "./TabSelect.css";

function TabSelect({ options = [], index, setIndex, className = "" }) {
	return (
		<nav className={`tabSelect${className !== "" ? ` ${className}` : ""}`}>
			<ul className="tabSelect__items">
				{options.map((option, i) => (
					<li
						key={i}
						className={`tabSelect__item${i === index ? " tabSelect__item--active" : ""}`}
						onClick={() => setIndex(i)}
					>
						{option}
					</li>
				))}
			</ul>
		</nav>
	);
}

export default TabSelect;
