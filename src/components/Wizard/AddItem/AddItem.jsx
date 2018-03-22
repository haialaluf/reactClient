import React, {Component} from 'react';
import FilesUpload from '../../General/FilesUpload/FilesUpload';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './AddItem.scss'

/*
 Props:
 action: function(item) make addItem post request
 */

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filesU: []
        };
        this.inputs = {};
        this.link = {};
    }

    addItem() {
        let files = this.link.getFiles();
        let tags = this.inputs.tags;
        tags = tags && tags.replace(/ /g, '').split(',');
        this.props.action({
            name: this.inputs.name,
            videoUrl: this.inputs.videoUrl,
            shortDescription: this.inputs.shortDescription,
            description: this.inputs.description,
            itemType: this.inputs.itemType,
            fileList: files,
            tags: tags
        });
    }

    render() {
        return (

            <div className="add-item-container">
                <form>
                    <div>
                        <div className="name-type">
                            <TextField
                                id="name"
                                className="name-input"
                                style={ {width: 'calc(100% - 44px)'} }
                                floatingLabelText="Name"
                                onChange={ (e) => this.inputs.name = e.target.value }
                            />
                            <TextField
                                style={ {width: '32px', margin: '24px 0 0 8px'} }
                                id="itemType"
                                hintText="Type"
                                className="type-input"
                                type="number"
                                onChange={ (e) => this.inputs.itemType = e.target.value }
                            />
                        </div>
                        <TextField
                            id="shortDescription"
                            style={ {width: '100%'} }
                            floatingLabelText="Short description"
                            hintText="Sort description will be presented on the item thumbnail"
                            multiLine={ true }
                            className="textarea"
                            rowsMax={ 4 }
                            onChange={ (e) => this.inputs.shortDescription = e.target.value }
                        />
                        <TextField
                            id="description"
                            style={ {width: '100%'} }
                            floatingLabelText="Description"
                            hintText="Description of the item"
                            multiLine={ true }
                            className="textarea"
                            rowsMax={ 8 }
                            onChange={ (e) => this.inputs.description = e.target.value }
                        />
                        <TextField
                            id="tags"
                            style={ {width: '100%'} }
                            floatingLabelText="Tags"
                            onChange={ (e) => this.inputs.tags = e.target.value }
                        />
                        <TextField
                            id="videoUrl"
                            style={ {width: '100%'} }
                            floatingLabelText="Video URL"
                            hintText="http://example.com/some_path/VideoURL"
                            onChange={ (e) => this.inputs.videoUrl = e.target.value }
                        />
                        <FilesUpload link={ this.link } multiple={ true }/>
                    </div>
                    <div className="button-container">
                        <RaisedButton onClick={ this.addItem.bind(this) } label="Add Item" primary={true} style={ {margin: '4px'} }/>
                        {
                            this.props.cancelAction &&
                            <RaisedButton onClick={ this.props.cancelAction } label="Cancel" style={ {margin: '4px'} }/>
                        }
                    </div>
                </form>
            </div>

        )
    }
}

export default AddItem;
