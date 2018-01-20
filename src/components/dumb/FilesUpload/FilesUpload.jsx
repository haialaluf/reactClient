import React, {Component} from 'react';
import Cropper from 'react-cropper';
import FileDrop from 'react-file-drop';
import Icon from '../Icon/Icon';
import helpers from '../../../helpers';

/*
 Props:
 action: function(item) make addItem post request
 */

class FilesUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
        this.props.link.getFiles = this.getFiles.bind(this)
    }

    getFiles() {
        return this.state.fileList;
        // Blob to Data uri (not in use)
        // return new Promise((resolve, reject) => {
        //     let fileList = this.state.fileList.map(helpers.blobToDataURL);
        //     let postfix = this.state.fileList.map(file => file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length));
        //     Promise.all(fileList).then(values => {
        //         let files = values.map((file, index) => ({
        //             dataURL: file,
        //             type: postfix[index]
        //         }));
        //         resolve(files);
        //     }, reason => {
        //         reject(reason);
        //         console.log(reason)
        //     });
        // })
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
        let allFiles = this.state.fileList.concat();
        Object.keys(fileList).forEach((key)=> allFiles.push(fileList[key]));
        this.setState({fileList: allFiles});
    }

    deleteFile(index) {
        let files = this.state.fileList;
        files.splice(index, 1);
        this.setState({fileList: files})
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

                        <div className="files-list">
                            {
                                this.state.fileList.map((file, index) =>
                                    <div key={ index } className={`file ${file.selected ? 'selected' : ''}`}>
                                        <div className="file-name"
                                             onClick={ () => this.selectFile.bind(this)(index)}>{ file.name }</div>
                                                <span onClick={ () => this.deleteFile.bind(this)(index)}>
                                                    <Icon image="delete"/>
                                                </span>
                                    </div>)
                            }
                        </div>

                    </div>
                </div>
                <div className="cropper-container">
                    <Cropper
                        aspectRatio={16 / 9}
                        ref='cropper'
                        style={ style.imageCropper }
                        src={ this.state.image }/>
                    {this.state.image ? <button type="button" className="button" onClick={ this.crop.bind(this)}>Crop</button> : ''}
                </div>
            </div>
        )
    }
}

let style = {
    imageCropper: {
        maxWidth: '512px',
        maxHeight: '256px'
    },
    component: {},
    input: {
        width: '100%',
        margin: '8px',
        height: '32px'
    }
};

export default FilesUpload;
