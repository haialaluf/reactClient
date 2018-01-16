/*
 Props: selected: bool
 Props: addCallback: function
 Props: deleteCallback: function
 */

import React, {Component} from 'react';
import Icon from '../Icon/Icon';
import config from '../../../Config';

const prefix = config.serverUrl;

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false
        };
        this.setImage.bind(this)()
    }

    componentWillReceiveProps({item}) {
        this.setImage.bind(this)()
    }

    setImage() {
        let imageUrl = (this.props.item.filesUrl && this.props.item.filesUrl[0] && prefix + this.props.item.filesUrl[0]) ||
                       (this.props.item.fileList && this.props.item.fileList.length && this.props.item.fileList[0].dataURL);
        this.image = imageUrl ? {backgroundImage: `url(${imageUrl}`} : {};
    }

    deleteItem() {
        this.props.deleteCallback(this.props.item._id)
    }

    render() {
        return (
                <div style={ this.image }
                     name={ this.props.item._id }
                     className={`item ${this.props.selected ? ' selected' : ''} ${this.state.expand ? ' expand' : ''}`}>
                    <div className="title">{ this.props.item.name }</div>
                    <div className="description">{ this.props.item.shortDescription }</div>
                    {
                        this.props.deleteCallback ?
                            <span className="left-icon small-icon" onClick={ this.deleteItem.bind(this) }>
                                <Icon image="delete"/>
                        </span>
                            : ''
                    }
                <span className="right-icon small-icon" onClick={ () => this.setState({ expand: !this.state.expand }) }>
                     <Icon image={ this.state.expand? "close" : "expand" }/>
                </span>
                    {
                        this.props.addCallback ?
                            <span className="left-icon small-icon" onClick={ this.props.addCallback }>
                        <Icon image="add-to-cart" color={ this.props.selected ? '#11ff88' : ''}/>
                    </span>
                            : ''
                    }
                </div>
        )
    }
}

export default Item

/*
 import Scroll from 'react-scroll'; // Imports all Mixins
 import Style from '../../../assets/Styles'

 var scroller = Scroll.scroller;
 let headerOffset = - (parseInt(Style.sizes.menuWidth.substring(0,2), 10) + 32);

 () => setTimeout(()=> this.state.expand && scroller.scrollTo(this.props.item._id, {
 duration: 400,
 smooth: true,
 offset: headerOffset
 }), 144) 

 */
