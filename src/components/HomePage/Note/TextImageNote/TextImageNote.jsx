import React, { Component } from 'react';
import './TextImageNote.css'
import Helpers from '../../../../helpers'

class TextImageNote extends Component {

    componentWillMount () {
        let colors = this.props.colors || {};
        colors = Helpers.setDefaultColors(colors, ['title','text']);
        this.colors = colors;
    }

    render() {
        return (
            <div className={ `text-image-note note ${ this.props.className }` } style={ {backgroundColor: this.colors.background} }>
                {
                    this.props.imageUrl &&
                    <div className="image-container">
                        <img src={ this.props.imageUrl }
                             alt="note"/>
                    </div>
                }
                <div className="text-container">
                    <div className="title" style={ {color: this.colors.title} }>
                        { this.props.title }
                    </div>
                    <div className="text" style={ {color: this.colors.text} }>
                        { this.props.text }
                    </div>
                </div>
                { this.props.children }
            </div>
        )
    }
}

export default TextImageNote;
