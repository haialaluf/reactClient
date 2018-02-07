/*
 Props: selected: bool
 Props: addCallback: function
 Props: deleteCallback: function
 */

import React, {Component} from 'react';
import Icon from '../../General/Icon/Icon';
import helpers from '../../../helpers';

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            expand: false
        };
        this.setImage.bind(this)()
    }

    componentWillReceiveProps() {
        this.setImage.bind(this)()
    }

    setImage() {
        let self = this;
        let item = this.props.item ;
        if (! item) return;
        if (item.filesUrl && item.filesUrl.length && item.filesUrl[0]) {
            //case Data from server
            let coverUrl = item.filesUrl[0];
            this.image = coverUrl ? {backgroundImage: `url(${coverUrl})`} : {};
        } else if (item.fileList && this.props.item.fileList.length) {
            //case file is type Blob (new item)
            helpers.blobToDataURL(item.fileList[0]).then(
                (coverDataUrl) => {
                    self.setState({ image: coverDataUrl ? {backgroundImage: `url(${coverDataUrl})`} : {} });
                }
            );
        }
    }

    deleteItem() {
        this.props.deleteCallback(this.props.item._id)
    }

    render() {
        return (
                <div style={ this.image || this.state.image }
                     name={ this.props.item._id }
                     className={`item ${this.props.selected ? ' selected' : ''} ${this.state.expand ? ' expand' : ''}`}>
                    <div className="title">{ this.props.item.name }</div>
                    <div className="description">{ this.props.item.shortDescription }</div>
                    {
                        this.props.deleteCallback &&
                        <span className="left-icon small-icon" onClick={ this.deleteItem.bind(this) }>
                            <Icon image="delete"/>
                        </span>
                    }
                <span className="right-icon small-icon" onClick={ () => this.setState((state) => { expand: !state.expand }) }>
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
