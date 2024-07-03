import "./App.css";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";

function App() {
	return (
		<div>
			<img
				className="background"
				alt="background"
				src="assets/background/background.png"
			/>
			<Header />
			<div className="container">
				<Card />
				{/* <Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card /> */}
			</div>
		</div>
	);
}

export default App;
