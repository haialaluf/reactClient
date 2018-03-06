import React, { Component } from 'react';
import './PlayPause.css'


function PlayPause(props) {
    return (
        <button className={`o-play-btn ${ props.state? 'o-play-btn--playing' : ''}` } onClick={ props.onClick }>
            <i className="o-play-btn__icon">
                <div className="o-play-btn__mask"></div>
            </i>
        </button>
    )
}


export default PlayPause;
