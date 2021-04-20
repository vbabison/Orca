import React, {useState} from 'react';
const actx = new AudioContext();
const out = actx.destination


const mainGainNode = actx.createGain();
mainGainNode.gain.setValueAtTime(1, 0);
mainGainNode.connect(out);

const soundLibrary = {
  hiHat: "https://unpkg.com/@teropa/drumkit@1.1.0/src/assets/hatOpen.mp3",
  snare: "https://unpkg.com/@teropa/drumkit@1.1.0/src/assets/snare.mp3",
  hatClosed:"https://unpkg.com/@teropa/drumkit@1.1.0/src/assets/hatClosed.mp3"
}


// other effects from the API
// https://unpkg.com/@teropa/drumkit@1.1.0/dist/drumkit.js


const notes = [
  { name: "C", frequency: 49 },
  { name: "C#", frequency: 52 },
  { name: "D", frequency: 55 },
  { name: "D#", frequency: 58 },
  { name: "E", frequency: 61 },
  { name: "F", frequency: 64 },
  { name: "F#", frequency: 68 },
  { name: "G", frequency: 71 },
  { name: "C", frequency: 74 },
  { name: "C#", frequency: 78 },
  { name: "D", frequency: 82 },
  { name: "D#", frequency: 87 },
  { name: "E", frequency: 91 },
  { name: "F", frequency: 96 },
  { name: "F#", frequency: 101 },
  { name: "G", frequency: 107 }
];


export default function DrumModule(){

  // Kick sound
  const kickEvent = () => {
      const kick = actx.createOscillator();
    //hz value
    kick.frequency.setValueAtTime(107, 0);
    kick.frequency.exponentialRampToValueAtTime(
      0.001,
      actx.currentTime + 0.5
    );
    const kickGain = actx.createGain();
    kickGain.gain.setValueAtTime(1, 0);
    // will end the beat fraction of a second earlier to avoid loud speaker pop
    kickGain.gain.exponentialRampToValueAtTime(
      0.001,
      actx.currentTime + 0.5
    );
    kick.connect(kickGain);
    kickGain.connect(mainGainNode);
    kick.start();
    //stops the sound from playing in 0.5 second
    kick.stop(actx.currentTime + 0.5);
  };

  // HiHat, has a bit a of a lag when starting for first time
  const hiHatEvent = (async() => {
    const fetchSound = await fetch(soundLibrary.hiHat);
    const buffered = await fetchSound.arrayBuffer();
    const hiHat = await actx.decodeAudioData(buffered);

    const hiHatOut = actx.createBufferSource();
    hiHatOut.buffer = hiHat;
    hiHatOut.playbackRate.setValueAtTime(2, 0);
    hiHatOut.connect(mainGainNode);
    hiHatOut.start();
  })

  // Snare, has a bit a of a lag when starting for first time
  const snareEvent = (async() => {
    const fetchSound = await fetch(soundLibrary.snare);
    const buffered = await fetchSound.arrayBuffer();
    const snare = await actx.decodeAudioData(buffered);

    const snareOut = actx.createBufferSource();
    snareOut.buffer = snare;
    snareOut.playbackRate.setValueAtTime(2, 0);
    snareOut.connect(mainGainNode);
    snareOut.start();
  })

  // HatClosed, has a bit a of a lag when starting for first time
  const hatClosedEvent = (async() => {
    const fetchSound = await fetch(soundLibrary.hatClosed);
    const buffered = await fetchSound.arrayBuffer();
    const hatClosed = await actx.decodeAudioData(buffered);

    const hatClosedOut = actx.createBufferSource();
    hatClosedOut.buffer = hatClosed;
    hatClosedOut.playbackRate.setValueAtTime(2, 0);
    hatClosedOut.connect(mainGainNode);
    hatClosedOut.start();
  })


  return(
    <div>
      <button onClick={() => hiHatEvent()}>hiHat</button>
      <button onClick={() => kickEvent()}>kick</button>
      <button onClick={() => snareEvent()}>snare</button>
      <button onClick={() => hatClosedEvent()}>hatClosed</button>

    </div>
  )
}