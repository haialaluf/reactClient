import React from 'react';
import './PlayPause.scss'


function PlayPause({state, onClick, backgroundColor, size, color}) {
    const style = {};
    style.borderColor = `transparent transparent transparent ${color || '#202020'}`;
    if (size) {
        style.height = size;
        style.borderWidth = state? `0 0 0 ${size}` : `calc(${size} / 2) 0 calc(${size} / 2) calc(${size} / 1.2)`    
    }
    return (
        <div onClick={ onClick } className="play-pause">
            <button className={state? 'paused' : '' } 
                style={ style }>
            </button>
        </div>
    )
}


export default PlayPause;
