import React, {useEffect}  from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'

const Player = ({setSongs,currentSong,isPlaying,setIsPlaying,audioRef,setSongInfo,songInfo,songs,setCurrentSong}) => {
    // State
    // Ref
    // UseEffect
    useEffect(()=>{
        const newSongActive = songs.map((song)=>{
            if (song.id === currentSong.id) {
                return{
                    ...song,
                    active:true,
                }   
            }else{
                return{
                    ...song,
                    active:false,
                }
            }
        })
        // Set all song with changes made upper
        setSongs(newSongActive);
    },[currentSong])
  
    // Methods
    const playSongHandler = () =>{
        setIsPlaying(!isPlaying)
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
    const getTime = (time) =>{ // Formtaing time looking
        return(
            Math.floor(time/60) +":"+("0" + Math.floor(time%60)).slice(-2)
        )
    }
    const dragHandler =(e)=>{
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime:e.target.value})
    }
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
           await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        } 
        if(direction === "skip-back"){
            if ((currentIndex -1) % songs.length === -1) {
               await setCurrentSong(songs[songs.length-1])
                if(isPlaying) audioRef.current.play();

                return;
            }
          await setCurrentSong(songs[(currentIndex - 1) % songs.length])
        }
        if(isPlaying) audioRef.current.play();
        
    }
    // Add the styles
    const trackAnim ={
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return(
        <div className="Player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background:`${currentSong.color[0]}`}} className="track">
                    <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" name="" id="" />
                    <div className="animate-track" style={trackAnim}></div>
                 </div>
                <p>{songInfo.duration ? getTime(songInfo.duration): "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=> skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={()=> skipTrackHandler("skip-forward") } className="sikp-forward" size="2x" icon={faAngleRight}></FontAwesomeIcon>
            </div>

        </div>
    )
}

export default Player;