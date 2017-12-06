import React, { Component } from 'react';
import Cropper from 'react-cropper';
import '../../../../node_modules/cropperjs/dist/cropper.css';

/*
 Props:
    action: function(item) make addItem post request
 */

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            properties: []
        };
    }

    addItem () {
        this.props.action({
            name: this.refs.name.value,
            description: this.refs.description.value,
            image: (this.refs.cropper && this.refs.cropper.getCroppedCanvas()) ? this.refs.cropper.getCroppedCanvas().toDataURL() : null,
            properties: this.state.properties
        });
    }

    addProperty () {
        this.setState({
            properties: [...this.state.properties, '']
        })
    }

    loadImage(e) {
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e2) => {
            this.setState({ image: e2.target.result })
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

    render() {
        return (
            <div style={ Object.assign({}, style, this.props.style) }>
                <form>
                    <div>
                        <input style={ style.input } type="text" placeholder="Name" ref="name"/>
                        <textarea style={ style.input } type="text" placeholder="Description" ref="description"/>
                        <input style={ style.input } type="file" ref="image" onChange={ this.loadImage.bind(this) }/>
                        <div>
                            { this.state.properties.map(this.renderPropertyInput.bind(this)) }
                        </div>
                        <button style={ style.input } type="button" onClick={ this.addProperty.bind(this) }>Add Property</button>
                    </div>
                    <button style={ style.input } type="button" onClick={ this.addItem.bind(this) }>Add Item</button>
                </form>
                <Cropper
                    ref='cropper'
                    style={ style.imageCropper }
                    src={ this.state.image } />

            </div>
        )
    }
}

let style = {
    imageCropper: {
        maxWidth: '800px',
        maxHeight: '800px'
    },
    component: {

    },
    input: {
        margin: '8px',
        height: '32px'
    }
};

export default AddItem;
