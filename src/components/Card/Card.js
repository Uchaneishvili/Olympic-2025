import { useState, useEffect } from "react";
import { Divider, DownRanking, UpRanking } from "../UI/Icons";
import styles from "./Card.module.css";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";

function Card() {
	const [data, setData] = useState([]);
	const [updatedData, setUpdatedData] = useState([]);
	const [animate, setAnimate] = useState(false);

	const loadData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/players`
		);

		if (response.status === 200) {
			setData(response.data);
		}
	};

	const loadUpdatedData = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/updatedPlayers`
		);

		if (response.status === 200) {
			setInterval(() => {
				setData(response.data);
			}, 5000);
			setUpdatedData(response.data);
		}
	};
	useEffect(() => {
		loadUpdatedData().then(() => {
			setAnimate(true);
		});
		loadData();
	}, []);

	const PlayerRow = ({ player, index }) => {
		const controls = useAnimation();
		console.log("rank", player.rankChange);
		useEffect(() => {
			controls.start({
				opacity: [1, 0.5, 1],

				y: animate ? -40 * player.rankChange : 0,
				transition: {
					duration: 2,
					opacity: { times: [0, 0.5, 1], duration: 2 },
				},
			});
		}, [player.rankChange, controls]);

		return (
			<motion.div
				className={styles.row}
				key={index}
				animate={controls}
				initial={{ opacity: 1 }}
			>
				<div className={styles.playerInfo}>
					<div
						className={`${styles.ranking} ${index === 0 && styles.first} ${
							index === 1 && styles.second
						} ${index === 2 && styles.third}`}
					>
						<div className={styles.index}>{index + 1}.</div>
						<div className={styles.flag}>
							<img
								className="flag"
								alt="country-flag"
								src={`flags/${player.flag}.png`}
							/>
						</div>
					</div>
					<div className={styles.country}>({player.country})</div>
					<div className={styles.name}>{player.name}</div>
					<div className={styles.name}>
						{player.rankChange > 0 && <UpRanking />}
						{player.rankChange < 0 && <DownRanking />}
					</div>
				</div>
				<div className={styles.result}>{player.time}</div>
			</motion.div>
		);
	};
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

								return <PlayerRow player={player} index={index} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
