import React from "react";
import "../starterstyles.css";
import { useState, useEffect } from "react";
import {
	tonePartPiano,
	tonePartDrum,
	tonePartFrenchHorn,
	tonePartGuitar,
	toneObject,
	toneTransport,
} from "../data/instruments";
import * as Tone from "tone";
// comments are genereated by chatGPT, checked by shijie yang
// Preview component to control playback (start/stop) of a music sample.
function Preview({ previewing, setPreviewing, toneObject, toneTransport }) {
    // Handler for the Preview/Stop button click
	const handleButtonClick = async () => {
		// Ensure the audio context is started as a result of user interaction
		if (Tone.context.state !== "running") {
			await toneObject.start();
			console.log("Audio context started.");
		}
        // Stop any ongoing playback.
		toneTransport.stop();
        // Toggle the previewing state.
		if (previewing) {
			setPreviewing(false);
			console.log("Preview stopped manually.");
		} else {
			setPreviewing(true);
			console.log("Preview started.");
			toneTransport.start();
		}
	};

	return (
		<button onClick={handleButtonClick}>
			{previewing ? "Stop Previewing" : "Preview"}
		</button>
	);
}
// PlayData component to preview a given musical data sample.
export function PlayData({ data }) {
    // State to keep track of whether we are currently previewing or not.
	const initialPreviewing = false;
	const [previewing, setPreviewing] = useState(initialPreviewing);
    // Determine which instrument type the sample belongs to.
	let part;
	if (data.type === "Piano") {
		part = tonePartPiano;
	} else if (data.type === "Drums") {
		part = tonePartDrum;
	} else if (data.type === "Guitar") {
		part = tonePartGuitar;
	} else if (data.type === "FrenchHorn") {
		part = tonePartFrenchHorn;
	}
    // Translate musical notes to the corresponding sampler notes.
	const getSamplerNote = (note) => {
		switch (note) {
			case "B":
				return "F3";
			case "A":
				return "F#1";
			case "G":
				return "F#2";
			case "F":
				return "F#3";
			case "E":
				return "G1";
			case "D":
				return "G2";
			case "C":
				return "G3";
			default:
				return "";
		}
	};
    // Process the recording data to create a flattened sequence of notes and timings.
	const flattenedData = [];
	const parsedData = JSON.parse(data.recording_data);
	parsedData.forEach((data) => {
		let type = Object.keys(data)[0];
		data[type].forEach((value, index) => {
			if (value) {
				flattenedData.push({
					time: `0:0:${index}`,
					note: getSamplerNote(type),
				});
			}
		});
	});

    // Side effect to update the part sequence whenever data changes.
	useEffect(() => {
		part.clear();
		toneTransport.cancel();
		flattenedData.forEach((data) => part.add(data));
		toneTransport.schedule((time) => {
			setPreviewing(false);
			console.log("Preview stopped automatically.");
		}, 16 / 2);
	});

	return (
		<>
			<Preview
				previewing={previewing}
				setPreviewing={setPreviewing}
				toneObject={toneObject}
				toneTransport={toneTransport}
			/>
		</>
	);
}
