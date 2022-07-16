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

  const secondSoundGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
    
    {
      keyCode: 87,
      key: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
    
    {
      keyCode: 69,
      key: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
    
    {
      keyCode: 65,
      key: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
    
    {
      keyCode: 83,
      key: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
    
    {
      keyCode: 68,
      key: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
    
    {
      keyCode: 90,
      key: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
    
    {
      keyCode: 88,
      key: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
    
    {
      keyCode: 67,
      key: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
  ];


function App() {

  const [volume, setVolume] = useState(0.5);
  const [group, setGroup] = useState("control-bank-first-group");
  const [viewDisplay, setViewDisplay] = useState("");
  const [power, setPower] = useState("power-on");

  const powerSwitcher = () => {
    if (power === "power-on") {
      setPower("power-off");
      setViewDisplay("Power: Off");
    } else {
      setPower("power-on");
      setViewDisplay("Power: On");
    }
  }

  const groupSwitcher = () => {
    if (group === "control-bank-first-group" && power === "power-on") {
      setGroup("control-bank-second-group");
      setViewDisplay("Second Sound Group");
    }
    else if (group === "control-bank-second-group" && power === "power-on") {
      setGroup("control-bank-first-group");
      setViewDisplay("First Sound Group");
    }
  }

  const currentGroup = group === "control-bank-first-group" ? firstSoundGroup : secondSoundGroup;

  return (
    <div className="App" id='drum-machine'>
        <div className='drum-keyboard'>
          {currentGroup.map((sound) => (
          <Pad key={sound.id} sound={sound} volume={volume} setViewDisplay={setViewDisplay} power={power} />))}
        </div>
        <div className='drum-control'>
          <div className='control-power'>
            <p>Power</p>
            <div className='switcher'>
              <div className={`switch ${power}`} onClick={powerSwitcher}></div>
            </div>
          </div>
          <div className='display' id='display'>
            {viewDisplay}
          </div>
          <div className='control-volume'>
            <input 
              type="range"
              onChange={(e) => {
                if (power === "power-on") {
                  setVolume(e.target.value);
                  setViewDisplay("Volume: " + Math.round(e.target.value * 100) + "%");
                }
              }}
              value={volume}
              step="0.01"
              min="0"
              max="1" />
          </div>
          <div className='control-bank'>
            <p>Sound Group</p>
            <div className='switcher'>
              <div className={`switch ${group}`} onClick={groupSwitcher}></div>
            </div>
          </div>
        </div>
    </div>
  )
};



function Pad({ sound, volume, setViewDisplay, power }) {

  const [active, setActive] = useState(false);
  const [unactive, setUnactive] = useState(false);

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
    if (power === "power-on") {
      const audio = document.getElementById(sound.key);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    setViewDisplay(sound.id);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    } else {
      setUnactive(true);
      setTimeout(() => setUnactive(false), 200);
    }
  }

  return (
    <div className={`drum-pad ${active && "active-pad"} ${unactive && "unactive-pad"}`} id={sound.id} onClick={playSound}>
      <audio className='clip' id={sound.key} src={sound.url} />
      {sound.key}
    </div>
  )
};

export default App;