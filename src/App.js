import React, {useState,useRef} from "react";
import "./style/app.scss";
// Addnig componets
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav'
// Import data

import data from './data';


function App() {

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime:0,
    duration:0,
    animationPercentage:0,
  })
  const [libraryStatus, setlibraryStatus] = useState(false);
  // Ref
  const audioRef = useRef(null);
  // Methods
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime
    const duration = e.target.duration
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent / roundedDuration)*100)
    setSongInfo({...songInfo, currentTime:current,duration:duration,animationPercentage:animation}) // But when we have same name of state and varible we can just write one time. In this case duration:duration => duration
  }
  const songEndHandler = async () =>{
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play();
        
  }


  return (
    <div className="App" style={{background:`linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
      <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus}></Nav>
      <Song currentSong={currentSong} isPlaying={isPlaying}></Song>
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}></Player>
     
      <Library libraryStatus={libraryStatus} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong}/>
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
