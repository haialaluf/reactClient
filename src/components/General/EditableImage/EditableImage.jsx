/*
* Props:
*
* inputRef: the function wil receive new image dataUrl
* imageUrl: default image Url
*
* */

import React, { Component } from 'react';
import FilesUpload from '../FilesUpload/FilesUpload';
import helpers from '../../../helpers';
import './EditableImage.css'

class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            image: null
        };
        this.imageLink = {};
    }

    save() {
        helpers.blobToDataURL(this.imageLink.getFiles()).then((image) => {
            this.setState({edit: false, image: image});
            this.props.inputRef({value: image})
        });
    }

    render() {
        return (
            <div className={ this.props.className + ' editable-image'}>
                <div className="content">
                    <div className="small-buttons">
                        <div onClick={ () => this.setState({edit: true})}
                             style={ this.state.edit ? {display: 'none'} : {} }>
                            EDIT
                        </div>
                        <div onClick={ this.save.bind(this) }
                             style={ !this.state.edit ? {display: 'none'} : {} }>
                            SAVE
                        </div>
                        <div onClick={ () => this.setState({edit: false})}
                             style={ !this.state.edit ? {display: 'none'} : {} }>
                            CANCEL
                        </div>
                    </div>
                    {
                        this.state.edit &&
                        <FilesUpload link={ this.imageLink }/>
                    }
                    <img src={ this.state.image || this.props.imageUrl }
                         alt="editable-cover"/>
                </div>
            </div>
        )
    }
}

export default EditableText;
