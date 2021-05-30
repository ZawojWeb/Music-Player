import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong,isPlaying,setIsPlaying}) => {
    // State
    const [songInfo, setSongInfo] = useState({
        currentTime:null,
        duration:null,
    })
    // Ref
    const audioRef = useRef(null);
    // Methods
    const playSongHandler = () =>{
        setIsPlaying(!isPlaying)
        if(isPlaying){
            audioRef.current.pause();
        }else{
            audioRef.current.play();
        }
    }
    const timeUpdateHandler = (e) =>{
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime:current,duration:duration}) // But when we have same name of state and varible we can just write one time. In this case duration:duration => duration
    }
    const getTime = (time) =>{ // Formtaing time looking
        return(
            Math.floor(time/60) +":"+("0" + Math.floor(time%60)).slice(-2)
        )
    }

    return(
        <div className="Player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input type="range" name="" id="" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay}></FontAwesomeIcon>
                <FontAwesomeIcon className="sikp-forward" size="2x" icon={faAngleRight}></FontAwesomeIcon>
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player;