import React, { Component } from 'react';
import VideoEditorService from './VideoEditorService';

/*
 Props:
 action: function(item) make addItem post request
 */

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            video: ''
        };
    }

    loadVideo(e) {
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e2) => {
            this.setState({ video: e2.target.result })
        };
        VideoEditorService.getImages(file);
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="video-editor">
                <form>
                    <input type="file" onChange={ this.loadVideo.bind(this) }/>
                </form>
                <div className="video-container">
                    <video src={ this.state.video }  ref="video">

                    </video>
                    <div className="controls"></div>
                </div>
            </div>
        )
    }
}

export default AddItem;
