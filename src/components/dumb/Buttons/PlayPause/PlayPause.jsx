import React, { Component } from 'react';
import './PlayPause.css'

class PlayPause extends Component {

    render() {
        return (
        <button className={`o-play-btn ${ this.props.state? 'o-play-btn--playing' : ''}` } onClick={ this.props.onClick }>
            <i className="o-play-btn__icon">
                <div className="o-play-btn__mask"></div>
            </i>
        </button>
        )
    }
}

export default PlayPause;
