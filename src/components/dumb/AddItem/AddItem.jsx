import React, {Component} from 'react';
import Cropper from 'react-cropper';
import FileDrop from 'react-file-drop';
import Icon from '../Icon/Icon';
import FilesUpload from '../FilesUpload/FilesUpload';
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
        this.link = {}
    }

    addItem() {
        let self = this;
        this.link.getFiles().then((files) => {
            this.props.action({
                name: this.refs.name.value,
                videoUrl: this.refs.name.videoUrl,
                shortDescription: this.refs.shortDescription.value,
                description: this.refs.description.value,
                itemType: this.refs.itemType.value,
                fileList: files,
                properties: this.state.properties
            });
        });
    }


    addProperty() {
        this.setState({
            properties: [...this.state.properties, '']
        })
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
                        <FilesUpload link={ this.link }/>

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
