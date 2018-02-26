import React, { Component } from 'react';
import './TextNote.css'
import Helpers from '../../../../helpers'

class TextNote extends Component {

    componentWillMount () {
        let colors = this.props.colors || {};
        colors = Helpers.setDefaultColors(colors, ['title','text']);
        this.colors = colors;
    }

    render() {
        return (
            <div className={`text-note note ${ this.props.className }`} style={ {backgroundColor: this.colors.background} }>
                <div>
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

export default TextNote;
