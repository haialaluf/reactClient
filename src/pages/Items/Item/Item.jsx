import React, { Component } from 'react';
import Style from '../../../assets/Styles';
import Icon from '../../../components/Icon/Icon';

class Item extends Component {

    deleteItem() {
        this.props.deleteItem(this.props.item._id)
    }
    render() {
        let image = this.props.item.imageUrl? {backgroundImage: `url(http://127.0.0.1:1818/${this.props.item.imageUrl}`} : {};
        return (
            <div style={ Object.assign({}, style.box, this.props.style, image ) }>
                <h2>{ this.props.item.name }</h2>
                <div>{ this.props.item.description }</div>
                <span style={ style.deleteIcon } onClick={ this.deleteItem.bind(this) }>
                    <Icon image="delete" style={ style.deleteIcon }/>
                </span>
            </div>
        )
    }
}


let style = {
    box: {
        display: 'inline-block',
        width: '20%',
        border: `solid 1px ${ Style.colors.border }`,
        padding: '8px',
        margin: '8px',
        position: 'relative'
    },
    deleteIcon: {
        position: 'absolute',
        top: '2px',
        right: '2px',
        height: '16px',
        width: '16px',
    }
};

export default Item
