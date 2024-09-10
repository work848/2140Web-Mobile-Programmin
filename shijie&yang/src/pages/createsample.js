import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Createsample,
	getSample,
	Updatesample,
} from "../apiFunctions/database.js";
import { defaultSample } from "../data/samples.js";
import { toneObject, InstrumentsType } from "../data/instruments.js";
import { PlayData } from "../template/Preview";
import { instrumentMapping, noteMapping } from "../template/Playbutton";
import { ToggleButton, InstrumentButton } from "../template/Buttons";
// comments are genereated by chatGPT, checked by shijie yang
/**
 * Display the available instruments and allow for editing samples.
 * @param {Object} props 
 * @param {Object} props.sample - The sample data to be edited.
 * @param {string} props.id - The ID of the sample.
 */
function DisplayInstruments({ sample, id }) {
    // Initial setup for managing the selected instrument's state.
	const [selectedInstrument, setSelectedInstrument] = useState(() => {
		if (sample) {
			return sample.type;
		} else {
			return "Guitar";
		}
	});
	const [isSaving, setIsSaving] = useState(false);
	let inputIntializise;
	if (sample) {
		inputIntializise = sample.name;
	} else {
		inputIntializise = "";
	}
	const [inputValue, setInputValue] = useState(inputIntializise);

	const initialRecordingData = sample ? JSON.parse(sample.recording_data) : [];
	
	const [recordingData, setRecordingData] = useState(initialRecordingData);

	if (sample) {
         // Toggle the state of the current instrument's note.
		const handleToggle = (key, index, boolIndex) => {
			const now = toneObject.now();
			const instrument = instrumentMapping[selectedInstrument];

			if (instrument && noteMapping[key]) {
				instrument.triggerAttackRelease(noteMapping[key], "8n", now);
			}

			const newRecordingData = [...recordingData];
			newRecordingData[index][key][boolIndex] =
				!newRecordingData[index][key][boolIndex];
			setRecordingData(newRecordingData);
		};
         // Save the changes made to the sample.
		async function saveChanges() {
			setIsSaving(true); // Start spinner
			// Existing save logic here...

			if (!id) {
				await Createsample(recordingData, selectedInstrument, inputValue);
			} else {
				await Updatesample(
					sample.id,
					recordingData,
					selectedInstrument,
					inputValue
				);
			}
			setTimeout(() => {
				setIsSaving(false);
			}, 300);
			// Stop spinner after save operation
		}

		const previrewData = {
			type: selectedInstrument,
			recording_data: JSON.stringify(recordingData),
		};

		return (
			<div>
				<main>
					<h2 className="title">Edit Sample:</h2>
					<div className="card edit-card">
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<div className="button-group-container">
							<PlayData data={previrewData} />
							<button
								type="button"
								className="bright-button"
								onClick={() => saveChanges()}
								disabled={isSaving}
							>
								Save
							</button>
							{isSaving && <div className="spinner"></div>}
						</div>
					</div>

					<div className="toggle-row-container">
						<div className="row-label">
							<h4>Instrument</h4>
						</div>
						<div className="sequence-row-container">
                            {InstrumentsType.map((item, key)=> {
                                return (
                                    <InstrumentButton
                                        key={key}
                                        item={item}
                                        selectedInstrument={selectedInstrument}
                                        onInstrumentSelect={setSelectedInstrument}
                                    />
                                );
                            })}
						</div>
					</div>
					{recordingData.map((item, index) => {
						// console.log(recordingData);
						const key = Object.keys(item)[0];
						return (
							<div className="toggle-row-container" key={index}>
								<div className="row-label">
									<h4>{key}</h4>
								</div>
								<div className="sequence-row-container">
									{item[key].map((boolValue, boolIndex) => (
										<ToggleButton
											key={boolIndex}
											selected={boolValue}
											onClick={() => handleToggle(key, index, boolIndex)}
										/>
									))}
								</div>
							</div>
						);
					})}
				</main>
			</div>
		);
	} else {
		return <p>Loading</p>;
	}
}
/**
 * Main function to fetch and display the sample for creation or editing.
 */
function Createsamples() {
	let { id } = useParams();
    // Initialize sample state.
	const [sample, setSamples] = useState(null);
    /**
     * Fetch the sample data based on the provided ID.
     * @async
     */
	useEffect(() => {
		if (id) {
			const fetchSamples = async () => {
				try {
					const data = await getSample(id);

					if (data) {
						setSamples(data);
					}
				} catch (error) {
					console.error("Error fetching samples:", error);
				}
			};

			fetchSamples();
		} else {
			setSamples(defaultSample);
		}
	}, []);

	if (sample) {
		const editSample = sample;
		return (
			<div>
				{editSample && <DisplayInstruments sample={editSample} id={id} />}
			</div>
		);
	} else {
		return <p>Loading</p>;
	}
}

export default Createsamples;
