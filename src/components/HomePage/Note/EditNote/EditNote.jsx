import React, { Component } from 'react';
import EditableText from '../../../General/EditableText/EditableText';
import EditableImage from '../../../General/EditableImage/EditableImage';
import Helpers from '../../../../helpers'
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
        this.data = { ...this.props };
    }

    componentWillMount () {
        this.setState((state, props) => {
            let colors = props.colors || {};
            colors = Helpers.setDefaultColors(colors, ['title','text']);
            return {colors}
        })
    }
    
    save() {
        if ( this.state.colors ) {
            this.data.colors = this.state.colors
        }
        if ( this.inputs.text ) {
            this.data.text = this.inputs.text.value
        }
        if ( this.inputs.longText ) {
            this.data.longText = this.inputs.longText.value
        }
        if ( this.inputs.title ) {
            this.data.title = this.inputs.title.value
        }
        if ( this.inputs.imageUrl ) {
            this.data.imageUrl = this.inputs.imageUrl.value
        }
        this.props.saveCallback(this.data);
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
                    <div className="image-container">
                        <EditableImage multiple={ !!this.props.longText }
                            inputRef={ (el) => this.inputs.imageUrl = el } imageUrl={ this.data.imageUrl || this.props.imageUrl }/>
                    </div>
                    <div className="text-container">
                        <EditableText className="title"
                                      text={ this.data.title || '' }
                                      color={ this.state.colors.title }
                                      inputRef={ (el) => this.inputs.title = el }>
                        </EditableText>
                        <EditableText textarea={ true }
                                      className="text"
                                      text={ this.data.text || '' }
                                      color={ this.state.colors.text }
                                      inputRef={ (el) => this.inputs.text = el }>
                        </EditableText>
                        {
                            this.props.longText &&
                            <EditableText textarea={ true }
                                          className="text"
                                          text={ this.data.longText || '' }
                                          color={ this.state.colors.text }
                                          inputRef={ (el) => this.inputs.longText = el }>
                            </EditableText>
                        }
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
            props.animation = 'none'
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
