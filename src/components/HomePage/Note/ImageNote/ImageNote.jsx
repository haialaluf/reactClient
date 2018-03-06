import React, { Component } from 'react';
import './ImageNote.css'

class ImageNote extends Component {

    render() {
        return (
            <div className={`image-note note ${ this.props.className }`} style={ this.props.style } >
                {
                    this.props.imageUrl &&
                    <div>
                            <img src={ this.props.imageUrl }
                                 alt="animated-cover"
                                 style={ {bottom: `-${ Math.max(Math.min(this.props.position * 4, 20), 0)}%`} }/>
                    </div>
                }
                { this.props.children }
            </div>
        )
    }
}

export default ImageNote;
