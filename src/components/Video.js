import React from 'react'
import './Video.css';

export const Video = () => {
  return (
    <div className="Video"> 
        <video autoPlay={true} loop={true} playsInline={true} className="Endgame">
            <source src='/videos/Endgame.mp4' type="video/mp4" />
        </video>  
    </div>
  )
}


