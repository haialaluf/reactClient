import React, { Component } from 'react';
import AppActions from '../../pages/Items/ItemActions';
import { connect } from 'react-redux';
import Item from "./item/item";

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    componentWillMount() {
        AppActions.getItems()
    }

    componentWillUnmount() {
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton"
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}

//
// // Redux action
// export function uploadSuccess({ data }) {
//     return {
//         type: 'UPLOAD_DOCUMENT_SUCCESS',
//         data,
//     };
// }
//
// export function uploadFail(error) {
//     return {
//         type: 'UPLOAD_DOCUMENT_FAIL',
//         error,
//     };
// }
//
// export function uploadDocumentRequest({ file, name }) {
//     let data = new FormData();
//     data.append('file', document);
//     data.append('name', name);
//
//     return (dispatch) => {
//         axios.post('/files', data)
//             .then(response => dispatch(uploadSuccess(response))
//                 .catch(error => dispatch(uploadFail(error)));
//     };
// }
//
// /*
//  ... A lot of Redux / React boilerplate happens here
//  like mapDispatchToProps and mapStateToProps and @connect ...
//  */
//
// // Component method
//
// // Component render
