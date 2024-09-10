import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	getSample,
	getSampleToLocations,
	getlocations,
	SampleLocation,
	SampleLocationDelete,
} from "../apiFunctions/database.js";
import { ShareCard } from "../template/cards";
// comments are genereated by chatGPT, checked by shijie yang
/**
 * Share component allows sharing a sample across various locations.
 */
function Share() {
    // Extracting the ID from the URL using useParams from react-router-dom
	const { id } = useParams();
    // State declarations
	const [locations, setLocation] = useState();
	const [sample, setSample] = useState();
	const [sampleToLocations, setSampleToLocation] = useState();
    
    /**
     * Fetches sample and location data from the API.
     * @async
     * @function
     */
	const fetchData = async () => {
		try {
			const sampleToLocation = await getSampleToLocations();
			const data = await getSample(id);
			const locations = await getlocations();
			if (data && locations) {
				setSample(data);
				setLocation(locations);
				setSampleToLocation(sampleToLocation);
			}
		} catch (error) {
			console.error("Error fetching samples:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

    /**
     * Handles sharing a sample to a location.
     * @param {number} location_id - ID of the location.
     * @param {number} sample_id - ID of the sample.
     */
	const handleToggleShare = (location_id, sample_id) => {
		SampleLocation(sample_id, location_id);
		fetchData();
		fetchData();
	};
    /**
     * Handles removing sharing of a sample from a location.
     * @param {number} id - ID of the mapping between the sample and location to be removed.
     */
	const handleToggleShareDelete = (id) => {
		SampleLocationDelete(id);
		fetchData();
		fetchData();
	};
	if (sample && sampleToLocations && locations) {
		return (
			<div>
				<main>
					<h2 className="title">Share This Sample</h2>

					{sample ? (
						<ShareCard sample={sample}/>
					) : (
						<div className="card">
							<div className="song-details">
								<h3>Sample Name</h3>
								<p>Date Created</p>
							</div>
							<div className="buttons">
								<a href="#" class="bright-button">
									Preview
								</a>
							</div>
						</div>
					)}
					{locations ? (
						locations.map((location) => {
							const toggle =
								sampleToLocations.find(
									(data) =>
										data.sample_id === parseInt(id) &&
										data.location_id === location.id
								) || false;

							return (
								<div className="toggle-row-container">
									<div className="location-name-label">
										<h4>{location.name}</h4>
									</div>
									<div className="sequence-row-container">
										<button
											className={toggle ? "toggle-selected" : "toggle"}
											onClick={
												!toggle
													? () => handleToggleShare(location.id, id)
													: null
											}
										>
											Shared
										</button>
										<button
											className={!toggle ? "toggle-selected" : "toggle"}
											onClick={
												toggle ? () => handleToggleShareDelete(toggle.id) : null
											}
										>
											Not Shared
										</button>
									</div>
								</div>
							);
						})
					) : (
						<div className="toggle-row-container">
							<div className="location-name-label">
								<h4>Loading</h4>
							</div>
							<div className="sequence-row-container">
								<button className="toggle">Shared</button>
								<button className="toggle-selected">Not Shared</button>
							</div>
						</div>
					)}
				</main>
			</div>
		);
	} else {
		return <p>Loading</p>;
	}
}
export default Share;
