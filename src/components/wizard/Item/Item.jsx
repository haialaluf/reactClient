/*
 Props: selected: bool
 Props: addCallback: function
 Props: deleteCallback: function
 */

import React, {Component} from 'react';
import Icon from '../../General/Icon/Icon';
import helpers from '../../../helpers';
import { Carousel } from 'react-responsive-carousel';

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: null,
            expand: false
        };
    }

    componentWillMount() {
        this.setImage.bind(this)()
    }

    setImage() {
        let item = this.props.item;
        let files = item && (item.filesUrl || item.fileList);
        if (files && files.length && files[0]) {
            //case Data from server
            if ( typeof files[0] === 'string') {
                this.setState({images: files});
            } else if (files[0] instanceof Blob) {
                let imagesPromise = files.map(helpers.blobToDataURL);
                Promise.all(imagesPromise).then((imagesDataUrl) => {
                    this.setState({images: imagesDataUrl});
                })
            }
        }
    }

    deleteItem() {
        this.props.deleteCallback(this.props.item._id)
    }

    render() {
        const item = this.props.item;
        return (
                <div name={ item._id }
                     className={`item ${this.props.selected ? ' selected' : ''} ${this.state.expand ? ' expand' : 'collapse'}`}>
                    {
                        this.state.images && this.state.images.length && this.state.images[0] &&
                        (
                            this.state.expand ?
                                <Carousel showArrows={ false }
                                          showStatus={ false }
                                          showThumbs={ this.state.expand }
                                          autoPlay={ true }>
                                    {
                                        this.state.images.map( (imageUrl, index) =>
                                            <div className="image-container" key={ index }>
                                                <img src={ imageUrl }
                                                     alt="note"/>
                                            </div>
                                        )
                                    }
                                </Carousel>
                                :
                                <div className="image-container">
                                    <div className="gradient"></div>
                                    <img src={ this.state.images[0] }
                                         alt="note"/>
                                </div>
                        )
                    }
                    <div className="title">{ item.name }</div>
                    <div className="description">{ item.shortDescription }</div>
                    {
                        this.state.expand &&
                        <div className="description">{ item.description }</div>
                    }
                    {
                        this.props.deleteCallback &&
                        <span className="left-icon small-icon" onClick={ this.deleteItem.bind(this) }>
                            <Icon image="delete"/>
                        </span>
                    }
                    <span className="right-icon small-icon" onClick={ () => this.setState((state) => ({ expand: !state.expand })) }>
                         <Icon image={ this.state.expand? "close" : "expand" }/>
                    </span>
                    {
                        this.props.addCallback &&
                        <span className="left-icon small-icon" onClick={ this.props.addCallback }>
                            <Icon image="add-to-cart" color={ this.props.selected ? '#11ff88' : ''}/>
                        </span>
                    }
                </div>
        )
    }
}

export default Item
