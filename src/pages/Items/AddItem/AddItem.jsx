import React, {Component} from 'react';
import Cropper from 'react-cropper';
import FileDrop from 'react-file-drop';
import Icon from '../../../components/Icon/Icon';
import helpers from '../../../helpers';

/*
 Props:
 action: function(item) make addItem post request
 */

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            properties: [],
            fileList: []
        };
    }

    addItem() {
        let fileList = this.state.fileList.map(helpers.blobToDataURL);
        let postfix = this.state.fileList.map(file => file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length));
        Promise.all(fileList).then(values => {
            let files = values.map((file, index) => ({
                dataURL: file,
                type: postfix[index]
            }));
            this.props.action({
                name: this.refs.name.value,
                videoUrl: this.refs.name.videoUrl,
                shortDescription: this.refs.shortDescription.value,
                description: this.refs.description.value,
                itemType: this.refs.itemType.value,
                fileList: files,
                properties: this.state.properties
            });
        }, reason => {
            console.log(reason)
        });
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

    addProperty() {
        this.setState({
            properties: [...this.state.properties, '']
        })
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

    renderPropertyInput(property, index) {
        return <input style={ style.input }
                      type="text"
                      key={ index }
                      placeholder="Property Name"
                      onChange={ (event) => {
                                            let properties = this.state.properties;
                                            properties[index] = event.currentTarget.value;
                                            this.setState({properties}) } }/>
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
            <div className="add-item">
                <form>
                    <div>
                        <div className="name-type">
                            <input type="text" placeholder="Name" ref="name"/>
                            <select placeholder="Type" ref="itemType">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <textarea type="text" placeholder="Short description" ref="shortDescription"/>
                        <textarea className="long" type="text" placeholder="Description" ref="description"/>
                        <input type="text" placeholder="Video URL" ref="videoUrl"/>
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
                                                <div className="file-name" onClick={ () => this.selectFile.bind(this)(index)}>{ file.name }</div>
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
                                ref='cropper'
                                style={ style.imageCropper }
                                src={ this.state.image }/>
                            {this.state.image? <button type="button" onClick={ this.crop.bind(this)}>Crop</button> : ''}
                        </div>

                        <div>
                            { this.state.properties.map(this.renderPropertyInput.bind(this)) }
                        </div>
                        <button style={ style.input } type="button" onClick={ this.addProperty.bind(this) }>Add
                            Property
                        </button>
                    </div>
                    <button style={ style.input } type="button" onClick={ this.addItem.bind(this) }>Add Item</button>
                </form>
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

export default AddItem;
