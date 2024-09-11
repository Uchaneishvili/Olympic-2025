import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Divider, DownRanking, UpRanking } from "../UI/Icons";
import styles from "./Card.module.css";
import { motion, useAnimation, Reorder } from "framer-motion";
import axios from "axios";

const PlayerRow = React.memo(({ player, index }) => {
	const controls = useAnimation();

	useEffect(() => {
		controls.start({
			opacity: [1, 0.5, 1],
			y: player.rankChange ? -40 * player.rankChange : 0,
			x: 0,
			scale: 1,
			rotate: 0,
			transition: {
				duration: 2,
				opacity: { times: [0, 0.5, 1], duration: 2 },
			},
		});
	}, [player.rankChange, controls]);

	return (
		<Reorder.Item
			className={styles.row}
			key={player.id}
			value={player}
			transition={{ duration: 2 }}
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
		</Reorder.Item>
	);
});

function Card() {
	const [data, setData] = useState([]);
	const [updatedData, setUpdatedData] = useState([]);
	const [isFlipped, setIsFlipped] = useState(false);

	const loadData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/players`
			);
			if (response.status === 200) {
				setData(response.data);
			}
		} catch (error) {
			console.error("Error loading initial data:", error);
		}
	}, []);

	const loadUpdatedData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/updatedPlayers`
			);
			if (response.status === 200) {
				setUpdatedData(response.data);
				setTimeout(() => {
					setData(response.data);
				}, 3000);
			}
		} catch (error) {
			console.error("Error loading updated data:", error);
		}
	}, []);

	useEffect(() => {
		loadData();
		loadUpdatedData();

		const intervalId = setInterval(loadUpdatedData, 3000); // Update every 30 seconds

		return () => clearInterval(intervalId);
	}, [loadData, loadUpdatedData]);

	const commonStyles = useMemo(
		() => ({
			padding: "0px",
			position: "absolute",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			backfaceVisibility: "hidden",
		}),
		[]
	);

	const playerList = useMemo(() => {
		return data.map((player, index) => {
			const updatedIndex = updatedData.findIndex((p) => p.id === player.id);
			const rankChange = updatedIndex !== -1 ? index - updatedIndex : 0;
			return { ...player, rankChange };
		});
	}, [data, updatedData]);

	return (
		<div
			onClick={() => setIsFlipped(!isFlipped)}
			className={styles.mainContainer}
		>
			<Reorder.Group
				style={commonStyles}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6 }}
				values={playerList}
				onReorder={setData}
				className={styles.container}
			>
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
								{playerList.map((player, index) => (
									<PlayerRow key={player.id} player={player} index={index} />
								))}
							</div>
						</div>
					</div>
				</div>
			</Reorder.Group>

			<motion.div
				style={commonStyles}
				initial={{ rotateY: 180 }}
				animate={{ rotateY: isFlipped ? 0 : 180 }}
				transition={{ duration: 0.6 }}
			>
				<video autoPlay loop muted playsInline className={styles.video}>
					<source src="/assets/videos/video.mp4" type="video/mp4" />
				</video>
			</motion.div>
		</div>
	);
}

export default Card;
