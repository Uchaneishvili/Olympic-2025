import { Divider } from "../UI/Icons";
import styles from "./Card.module.css";
function Card() {
	return (
		<div className={styles.container}>
			<div style={{ fontSize: "20px", padding: "20px 100px" }}>
				CROSS COUNTRY SKIING
			</div>
			<div className={styles.tableContainer}>
				<Divider />
				<div className={styles.innerContainer}></div>
			</div>
		</div>
	);
}

export default Card;
