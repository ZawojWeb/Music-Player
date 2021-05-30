import React, {useState} from "react";
import "./style/app.scss";
// Addnig componets
import Player from './components/Player';
import Song from './components/Song';
// Import data

import data from './data';


function App() {

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong}></Song>
      <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}></Player>
    </div>
  );
}

export default App;
