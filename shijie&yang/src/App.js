import React from "react";
import "./starterstyles.css";
import { getSamples } from "./apiFunctions/database.js";
import { useState, useEffect } from "react";
import { Card, CreatesampleCard } from "./template/cards";
// comments are genereated by chatGPT, checked by shijie yang
/**
 * The main App component, serving as the entry point of the application.
 * It fetches the sample data and renders the available samples.
 */
function App() {
  // State to hold fetched samples.
	const [samples, setSamples] = useState(null);
  /**
   * Fetch samples from the database when the component mounts.
   */
	useEffect(() => {
		const fetchSamples = async () => {
			try {
				const data = await getSamples();
				setSamples(data);  // Update state with fetched samples.
			} catch (error) {
				console.error("Error fetching samples:", error);
			}
		};

		fetchSamples();
	}, []);
	return (
		<>
			<main>
				<CreatesampleCard />
				<section className="sample">
					{samples ? (
						samples.map((data) => <Card key={data.id} sample={data}></Card>)
					) : (
						<p>Loading...</p>
					)}
				</section>
				<CreatesampleCard />
			</main>
		</>
	);
}

export default App;
