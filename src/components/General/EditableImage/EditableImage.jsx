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
        let files = this.imageLink.getFiles();
        if (this.props.multiple) {
            files = files.map((file) => helpers.blobToDataURL(file));
            Promise.all(files).then((files) => {
                this.setState({edit: false, image: files[0]});
                this.props.inputRef({value: files})
            });
        } else {
            helpers.blobToDataURL(files).then((image) => {
                this.setState({edit: false, image: image});
                this.props.inputRef({value: image})
            });
        }
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
                        <FilesUpload link={ this.imageLink } multiple={ this.props.multiple }/>
                    }
                    <img src={ this.state.image || this.props.imageUrl }
                         alt="editable-cover"/>
                </div>
            </div>
        )
    }
}

export default EditableText;
