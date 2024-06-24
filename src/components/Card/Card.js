import { useState, useEffect } from "react";
import { Divider, DownRanking, UpRanking } from "../UI/Icons";
import styles from "./Card.module.css";
function Card() {
	const initialData = [
		{
			id: 1,
			country: "SLO",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovenia.png" />
			),
			name: "L. Repinc",
			time: "31:34.07",
		},
		{
			id: 2,
			country: "POL",
			flag: <img className="flag" alt="country-flag" src="flags/Poland.png" />,
			name: "K. Badacz",
			time: "31:34.12",
		},
		{
			id: 3,
			country: "SVK",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovakia.png" />
			),
			name: "J. Borgula",
			time: "31:34:20",
		},
		{
			id: 4,
			country: "SWE",
			flag: <img className="flag" alt="country-flag" src="flags/Sweden.png" />,
			name: "S. Anderson",
			time: "31:34.39",
		},
		{
			id: 5,
			country: "FRA",
			flag: <img className="flag" alt="country-flag" src="flags/France.png" />,
			name: "L. Thievent",
			time: "31:34.59",
		},
		{
			id: 6,
			country: "ITA",
			flag: <img className="flag" alt="country-flag" src="flags/Italy.png" />,
			name: "E. Mondinelli",
			time: "31:35.05",
		},
		{
			id: 7,
			country: "AUT",
			flag: <img className="flag" alt="country-flag" src="flags/Austria.png" />,
			name: "V. Olivier",
			time: "31:35.10",
		},
	];

	const updatedData = [
		{
			id: 4,
			country: "SWE",
			flag: <img className="flag" alt="country-flag" src="flags/Sweden.png" />,
			name: "S. Anderson",
			time: "31:34.39",
		},

		{
			id: 2,
			country: "POL",
			flag: <img className="flag" alt="country-flag" src="flags/Poland.png" />,
			name: "K. Badacz",
			time: "31:34.12",
		},
		{
			id: 3,
			country: "SVK",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovakia.png" />
			),
			name: "J. Borgula",
			time: "31:34:20",
		},

		{
			id: 1,
			country: "SLO",
			flag: (
				<img className="flag" alt="country-flag" src="flags/Slovenia.png" />
			),
			name: "L. Repinc",
			time: "31:34.07",
		},

		{
			id: 7,
			country: "AUT",
			flag: <img className="flag" alt="country-flag" src="flags/Austria.png" />,
			name: "V. Olivier",
			time: "31:35.10",
		},
		{
			id: 5,
			country: "FRA",
			flag: <img className="flag" alt="country-flag" src="flags/France.png" />,
			name: "L. Thievent",
			time: "31:34.59",
		},
		{
			id: 6,
			country: "ITA",
			flag: <img className="flag" alt="country-flag" src="flags/Italy.png" />,
			name: "E. Mondinelli",
			time: "31:35.05",
		},
	];

	const [data, setData] = useState(initialData);
	const [showIcon, setShowIcon] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setData(updatedData);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.title}>ALPINE SKIING</div>
			<div className={styles.tableContainer}>
				<Divider />
				<div className={styles.innerContainer}>
					<div className={styles.table}>
						<div className={styles.subtitleContainer}>
							<div className={styles.subtitleInnerContainer}>
								<div className={styles.dashedLine}></div>
								<div className={styles.subtitle}>
									10 km Individual start free (boys)
								</div>
								<div className={styles.dashedLine}></div>
							</div>
						</div>
						<div className={styles.list}>
							{data.map((player, index) => {
								const updatedIndex = updatedData.findIndex(
									(p) => p.id === player.id
								);
								player.rankChange = index - updatedIndex;
								return (
									<div className={styles.row} key={index}>
										<div className={styles.playerInfo}>
											<div
												className={`${styles.ranking} ${
													index === 0 && styles.first
												} ${index === 1 && styles.second} ${
													index === 2 && styles.third
												}`}
											>
												<div className={styles.index}>{index + 1}.</div>
												<div className={styles.flag}>{player.flag}</div>
											</div>
											<div className={styles.country}>({player.country})</div>
											<div className={styles.name}>{player.name}</div>
											<div className={styles.name}>
												{player.rankChange > 0 && <UpRanking />}
												{player.rankChange < 0 && <DownRanking />}
											</div>
										</div>
										<div className={styles.result}>{player.time}</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
