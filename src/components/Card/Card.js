import { Divider } from "../UI/Icons";
import styles from "./Card.module.css";
function Card() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>ALPINE SKIING</div>
			<div className={styles.tableContainer}>
				<Divider />
				<div className={styles.innerContainer}></div>
			</div>
		</div>
	);
}

export default Card;
