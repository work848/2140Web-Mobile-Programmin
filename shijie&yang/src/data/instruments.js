import * as Tone from "tone";

export const toneObject = Tone;

export const toneTransport = toneObject.Transport;

export const InstrumentsType = ["Guitar","Piano","FrenchHorn","Drums"];

export const tonePartGuitar = new toneObject.Part((time, value) => {
    guitar.triggerAttackRelease(value.note, "8n", time);
}, []).start(0);

export const tonePartFrenchHorn = new toneObject.Part((time, value) => {
    FrenchHorn.triggerAttackRelease(value.note, "8n", time);
}, []).start(0);

export const tonePartPiano = new toneObject.Part((time, value) => {
    Piano.triggerAttackRelease(value.note, "8n", time);
}, []).start(0);

export const tonePartDrum = new toneObject.Part((time, value) => {
    drum.triggerAttackRelease(value.note, "8n", time);
}, []).start(0);

export const synth = new toneObject.PolySynth().toDestination();


export const guitar = new toneObject.Sampler({
    urls: {
        "F3": "A2.mp3",
        "F#1": "A3.mp3",
        "F#2": "A4.mp3",
        "F#3": "As2.mp3",
        "G1": "B2.mp3",
        "G2": "B3.mp3",
        "G3": "B4.mp3",
    },
    release: 1,
    baseUrl: "/samples/guitar-acoustic/"
}).toDestination();

export const drum = new toneObject.Sampler({
    urls: {
        "F3": "drums1.mp3",
        "F#1": "drums2.mp3",
        "F#2": "drums3.mp3",
        "F#3": "drums4.mp3",
        "G1": "drums5.mp3",
        "G2": "drums6.mp3",
        "G3": "drums7.mp3",
    },
    release: 1,
    baseUrl: "samples/drum-samples/"
}).toDestination();

export const FrenchHorn = new toneObject.Sampler({
    urls: {
        "F3": "A1.mp3",
        "F#1": "A3.mp3",
        "F#2": "C2.mp3",
        "F#3": "C4.mp3",
        "G1": "D3.mp3",
        "G2": "D5.mp3",
        "G3": "Ds2.mp3",
    },
    release: 1,
    baseUrl: "samples/french-horn/"
}).toDestination();

export const Piano = new toneObject.Sampler({
    urls: {
        "F3": "A1.mp3",
        "F#1": "A2.mp3",
        "F#2": "A3.mp3",
        "F#3": "A4.mp3",
        "G1": "A5.mp3",
        "G2": "A6.mp3",
        "G3": "A7.mp3",
    },
    release: 1,
    baseUrl: "samples/piano/"
}).toDestination();