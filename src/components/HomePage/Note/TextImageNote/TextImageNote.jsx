import React, { Component } from 'react';
import './TextImageNote.css'

class TextImageNote extends Component {

    componentWillMount () {
        let colors = this.props.colors || {};
        colors = this.setDefaultColors(colors);
        this.colors = colors;
    }

    setDefaultColors(colors) {
        colors.title = colors.title || '#000000';
        colors.text = colors.text || '#000000';
        colors.background = colors.background || '#ffffff';
        return colors
    }

    render() {
        return (
            <div className={ `text-image-note note ${ this.props.className }` } style={ {backgroundColor: this.colors.background} }>
                <div className="text-container">
                    <div className="title" style={ {color: this.colors.title} }>
                        { this.props.title }
                    </div>
                    <div className="text" style={ {color: this.colors.text} }>
                        { this.props.text }
                    </div>
                </div>
                {
                    this.props.imageUrl &&
                    <div className="image-container">
                        <img src={ this.props.imageUrl }
                             alt="note"/>
                    </div>
                }
                { this.props.children }
            </div>
        )
    }
}

export default TextImageNote;
