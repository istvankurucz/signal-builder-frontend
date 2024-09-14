import { useState } from "react";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/layout/Container/Container";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/ui/Button/Button";
import H2 from "../../components/ui/H2/H2";
import ShadowBox from "../../components/layout/ShadowBox/ShadowBox";
import P from "../../components/ui/P/P";
import SignalTabSelect from "../../components/ui/SignalTabSelect/SignalTabSelect";
import Signal from "../../components/ui/Signal/Signal";
import "./Generation.css";

const signals = new Array(10).fill(null).map((_, i) => `Signal ${i + 1}`);

function Generation() {
	const [index, setIndex] = useState(0);

	const chartData = {
		labels: ["1", "2", "3"],
		datasets: [
			{
				label: "Numbers",
				data: [1, 2, 3],
				backgroundColor: "blue",
				borderColor: "lightblue",
			},
		],
	};

	const chartOptions = {
		animation: false,
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Numbers",
				font: {
					size: 20,
				},
				color: "black",
			},
		},
	};

	return (
		<Page className="generation">
			<Container centered className="generation__container">
				<section className="generation__signals">
					<ShadowBox className="generation__signals__new">
						<H2>Add signal</H2>

						<P variant="info">Click on the button below to add a new signal.</P>

						<Button variant="accent">
							<FontAwesomeIcon icon={faAdd} />
							Add signal
						</Button>
					</ShadowBox>

					<SignalTabSelect
						index={index}
						setIndex={setIndex}
						options={signals}
						className="generation__signals__select"
					/>

					<Signal id="1" name="Signal 1" />
				</section>

				<section className="generation__chart">
					<ShadowBox>
						<Line data={chartData} options={chartOptions} />
					</ShadowBox>
				</section>
			</Container>
		</Page>
	);
}

export default Generation;
