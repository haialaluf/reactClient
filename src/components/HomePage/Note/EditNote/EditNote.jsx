import React, { Component } from 'react';
import EditableText from '../../../General/EditableText/EditableText';
import EditableImage from '../../../General/EditableImage/EditableImage';
import ColorTool from '../../../General/ColorTool/ColorTool';
import NoteFactory from '../NoteFactory'
import './EditNote.css'

class EditNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editColors: false,
            colors: {}
        };
        this.inputs = {};
        this.data = {};
    }

    componentWillMount () {
        this.setState((state, props) => {
            let colors = props.colors || {};
            colors = this.setDefaultColors(colors);
            return {colors}
        })
    }

    setDefaultColors(colors) {
        colors.title = colors.title || '#000000';
        colors.text = colors.text || '#000000';
        colors.background = colors.background || '#ffffff';
        return colors
    }

    save() {
        if ( this.state.colors ) {
            this.data.colors = this.state.colors
        }
        if ( this.inputs.text ) {
            this.data.text = this.inputs.text.value
        }
        if ( this.inputs.title ) {
            this.data.title = this.inputs.title.value
        }
        if ( this.inputs.imageUrl ) {
            this.data.imageUrl = this.inputs.imageUrl.value
        }
        this.setState({edit: false})
    }

    render() {
        if (this.state.edit)
            return (
                <div className="note edit"
                     style={ {backgroundColor: this.state.colors.background} }>
                    <div className="small-buttons">
                        <div onClick={ () => this.setState({edit: false})}
                             style={ !this.state.edit ? {display: 'none'} : {} }>
                            CANCEL
                        </div>
                        <div onClick={ this.save.bind(this) }
                             style={ !this.state.edit ? {display: 'none'} : {} }>
                            SAVE
                        </div>
                        <div onClick={ () => this.setState({editColors: true}) }
                            style={ !this.state.edit ? {display: 'none'} : {} }>
                            <span style={{color: '#2CCCE4'}}>C</span>
                            <span style={{color: '#37d67a'}}>O</span>
                            <span style={{color: '#FF8A65'}}>L</span>
                            <span style={{color: '#F47373'}}>O</span>
                            <span style={{color: '#Ba68c8'}}>R</span>
                            <span style={{color: '#D9e3f0'}}>S</span>
                        </div>
                    </div>
                    <div className="text-container">
                        <EditableText className="title"
                                      text={ this.data.title || this.props.title || '' }
                                      color={ this.state.colors.title }
                                      inputRef={ (el) => this.inputs.title = el }>
                        </EditableText>
                        <EditableText textarea={ true }
                                      className="text"
                                      text={ this.data.text || this.props.text || '' }
                                      color={ this.state.colors.text }
                                      inputRef={ (el) => this.inputs.text = el }>
                        </EditableText>
                    </div>
                    <div className="image-container">
                        <EditableImage inputRef={ (el) => this.inputs.imageUrl = el } imageUrl={ this.data.imageUrl || this.props.imageUrl }/>
                    </div>
                    {
                        this.state.editColors && <ColorTool schema={ this.state.colors }
                                                            save={ (colors) => {
                                                                this.setState({editColors: false, colors})
                                                            } }
                                                            cancel={ () => this.setState({editColors: false}) }/>
                    }
                </div>
            );
        else {
            let props = Object.assign({}, this.props, this.data);
            return (
                <NoteFactory { ...props }>
                    <div className="small-buttons">
                        <div onClick={ () => this.setState({edit: true})}
                             style={ this.state.edit ? {display: 'none'} : {} }>
                            EDIT
                        </div>
                    </div>
                </NoteFactory>
            )
        }
    }
}

export default EditNote;
