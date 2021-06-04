import React from "react";


const Song = ({currentSong,isPlaying}) =>{
    return(
        <div className="song">
            <div className="songWrapper">
                <img className={isPlaying ? "songImgAnim":""} src={currentSong.cover} alt={"image of song named: "+currentSong.name}></img>
            </div>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    )
}

export default Song;