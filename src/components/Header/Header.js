import { useState, useEffect } from "react";
import FormatData from "../../util/FormatData";
import { CalendarIcon } from "../UI/Icons";
import styles from "./Header.module.css";

function Header() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<header>
			<div className={styles.container}>
				<div>
					<img className={styles.logo} src="assets/logo/Logo.png" alt="logo" />
				</div>
				<div className={styles.calendarContainer}>
					<div className={styles.dateContainer}>
						<div className={styles.date}>{FormatData.formatDate(date)}</div>
						<div className={styles.time}>{FormatData.formatTime(date)}</div>
					</div>
					<div>
						<CalendarIcon />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
