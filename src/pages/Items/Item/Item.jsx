import React, { Component } from 'react';
import Icon from '../../../components/Icon/Icon';
import config from '../../../Config';

const prefix = config.serverUrl;

class Item extends Component {

    deleteItem() {
        this.props.deleteItem(this.props.item._id)
    }
    render() {
        let image = this.props.item.imageUrl? { backgroundImage: `url(${prefix}${this.props.item.imageUrl}` } : {};
        return (
            <div style={ image } className="item">
                <div className="title">{ this.props.item.name }</div>
                <div className="description">{ this.props.item.description }</div>
                <span className="delete-icon" onClick={ this.deleteItem.bind(this) }>
                    <Icon image="delete" className="delete-icon"/>
                </span>
            </div>
        )
    }
}

export default Item
