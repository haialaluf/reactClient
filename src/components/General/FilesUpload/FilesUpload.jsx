import React, {Component} from 'react';
import Cropper from 'react-cropper';
import FileDrop from 'react-file-drop';
import Icon from '../Icon/Icon';
import helpers from '../../../helpers';
import './FilesUpload.scss';

/*
 Props:
 link: object to link father Component to Component getFiles method
 multiple: if suport multiple files
 aspectRatio: ratio for image crop
 */

class FilesUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
        if (this.props.link) {
            this.props.link.getFiles = this.getFiles.bind(this)
        }
        this.selectFile = this.selectFile.bind(this)
    }

    getFiles() {
        return this.props.multiple ? this.state.fileList : this.state.fileList[0];
    }

    crop() {
        let fileList = this.state.fileList;
        let file = fileList.find(file => file.selected);
        let fileIndex = fileList.indexOf(file);
        let croppedImage = (this.refs.cropper && this.refs.cropper.getCroppedCanvas()) ? this.refs.cropper.getCroppedCanvas().toDataURL() : null;
        let newFile = helpers.dataURLtoBlob(croppedImage);
        newFile.selected = file.selected;
        newFile.name = file.name;
        fileList[fileIndex] = newFile;
        this.setState({fileList: fileList});
        this.loadImage(newFile)
    }

    loadImage(file) {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e2) => {
            this.setState({image: e2.target.result})
        };
        reader.readAsDataURL(file);
    }

    addFiles(fileList) {
        let self = this;
        let allFiles = this.props.multiple ? this.state.fileList.concat() : [];
        Object.keys(fileList).forEach((key)=> allFiles.push(fileList[key]));
        this.setState({fileList: allFiles}, () => {
            if (!self.props.multiple) {
                self.selectFile(0);
            }
        });
    }

    deleteFile(index) {
        let files = this.state.fileList;
        files.splice(index, 1);
        this.setState({fileList: files}, () => this.selectFile(0));
    }

    selectFile(index) {
        let files = this.state.fileList;
        files.forEach((file, i) => {
            file.selected = i === index
        });
        this.setState({fileList: files});
        this.loadImage(files[index]);
    }

    render() {
        return (
            <div className="files-upload-container">
                <div className="file-drop-container">
                    <FileDrop onDrop={ this.addFiles.bind(this) }/>
                    <div className="file-drop-view">
                        <div className="instructions"
                             style={this.state.fileList.length ? {display: 'none'} : {}}>
                            <div>Drop files here</div>
                            <div>or</div>
                            <div className="input-file-container">
                                <input style={ style.input } multiple type="file" ref="image"
                                       onChange={ (e) => this.addFiles.bind(this)(e.target.files) }/>
                            </div>
                        </div>
                        {
                            this.props.multiple &&
                            <div className="files-list">
                                {
                                    this.state.fileList.map((file, index) =>
                                        <div key={ index } className={`file ${file.selected ? 'selected' : ''}`}>
                                            <div className="file-name"
                                                 onClick={ () => this.selectFile(index)}>{ file.name }</div>
                                                <span onClick={ () => this.deleteFile.bind(this)(index)}>
                                                    <Icon image="delete"/>
                                                </span>
                                        </div>)
                                }
                            </div>
                        }

                    </div>
                </div>
                <div className="cropper-container">
                    <Cropper
                        aspectRatio={ this.props.aspectRatio }
                        ref='cropper'
                        style={ style.imageCropper }
                        responsive={ true }
                        zoomOnWheel={ false }
                        src={ this.state.image }/>
                    { this.state.image && <button type="button" className="button" onClick={ this.crop.bind(this)}>Crop</button> }
                </div>
            </div>
        )
    }
}

let style = {
    imageCropper: {
        width: '100%',
        height: '100%'
    },
    component: {},
    input: {
        width: '84px',
        margin: '8px',
        height: '32px'
    }
};

export default FilesUpload;
