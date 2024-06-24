import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function PlayerRow({ player, index }) {
	const controls = useAnimation();

	useEffect(() => {
		controls.start({
			y: -32 * player.rankChange,
			transition: { duration: 2 },
		});
	}, [player.rankChange, controls]);

	return (
		<motion.div className={styles.row} key={index} animate={controls}>
			{/* Row content */}
		</motion.div>
	);
}
