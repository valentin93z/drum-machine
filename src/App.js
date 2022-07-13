import React, { useState } from 'react';
import './index.css';

const firstSoundGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
  ];


function App() {

  const [volume, setVolume] = useState(0.5);

  return (
    <div className="App" id='drum-machine'>
        <div className='drum-keyboard'>
          {firstSoundGroup.map((sound) => (
          <Pad key={sound.id} sound={sound} volume={volume} />))}
        </div>
        <div className='drum-control'>
          <div className='control-power'>
            <p>power</p>
            <div className='switcher'>
              <div className='switch'></div>
            </div>
          </div>
          <div className='display' id='display'>
            text on dispaly
          </div>
          <div className='control-volume'>
            <input 
              type="range"
              onChange={(e) => setVolume(e.target.value)}
              value={volume}
              step="0.01"
              min="0"
              max="1" />
          </div>
          <div className='control-bank'>
            <p>bank</p>
            <div className='switcher'>
              <div className='switch'></div>
            </div>
          </div>
        </div>
    </div>
  )
};



function Pad({ sound, volume }) {

  const [active, setActive] = useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return() => {
      document.removeEventListener("keydown", handleKeydown);
    }
  }, );

  const handleKeydown = (e) => {
    if (e.keyCode === sound.keyCode) {
      playSound();
    }
  }

  const playSound = () => {
    const audio = document.getElementById(sound.key);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
  }

  return (
    <div className={`drum-pad ${active && "active-pad"}`} onClick={playSound}>
      <audio className='clip' id={sound.key} src={sound.url} />
      {sound.key}
    </div>
  )
};

export default App;